"use client";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { gsap } from "@/lib/gsap";

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [hover, setHover] = useState(false);
  const [inv, setInv] = useState(false);
  const enabled = useSyncExternalStore(
    () => () => {},
    () => window.matchMedia("(hover: hover) and (pointer: fine)").matches,
    () => false,
  );

  useEffect(() => {
    if (!enabled) return;
    document.body.classList.add("has-cursor");
    const el = dot.current;
    if (!el) return;
    gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 0 });
    const x = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3" });
    const move = (e: PointerEvent) => {
      gsap.to(el, { opacity: 1, duration: 0.2, overwrite: "auto" });
      x(e.clientX);
      y(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      const c = t.closest<HTMLElement>("[data-cursor]");
      setLabel(c?.dataset.cursor ?? "");
      setHover(!!t.closest("a,button,[data-cursor]"));
      setInv(!!t.closest("[data-cursor-dark]"));
    };
    const leave = () => gsap.to(el, { opacity: 0, duration: 0.2 });
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      document.body.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div
      ref={dot}
      aria-hidden="true"
      className={`pointer-events-none fixed left-0 top-0 z-[90] flex items-center justify-center rounded-full border-2 transition-[width,height,opacity,background-color] duration-300 ${
        label
          ? inv ? "border-black bg-black text-lime" : "border-lime bg-lime text-black"
          : hover
            ? inv ? "border-black bg-transparent" : "border-lime bg-transparent"
            : inv ? "border-black bg-black" : "border-lime bg-lime"
      }`}
      style={{ width: label ? 92 : hover ? 56 : 14, height: label ? 92 : hover ? 56 : 14 }}
    >
      <span className="label text-[0.62rem]">{label}</span>
    </div>
  );
}

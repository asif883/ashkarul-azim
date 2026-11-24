"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, prefersReduced } from "@/lib/gsap";

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const logo = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const done = () => {
      document.documentElement.dataset.loaded = "1";
      window.dispatchEvent(new Event("preloaded"));
      setGone(true);
    };
    if (prefersReduced()) {
      done();
      return;
    }
    const state = { v: 0 };
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: done });
      tl.from(logo.current, { scale: 0.85, opacity: 0, duration: 0.8, ease: "power3.out" }, 0)
        .to(state, { v: 100, duration: 1.7, ease: "power2.inOut", onUpdate: () => setCount(Math.round(state.v)) }, 0)
        .to(bar.current, { scaleX: 1, duration: 1.7, ease: "power2.inOut" }, 0)
        .to(logo.current, { opacity: 0, y: -20, duration: 0.35, ease: "power2.in" }, 1.85)
        .to(root.current, { clipPath: "inset(0 0 100% 0)", duration: 0.9, ease: "expo.inOut" }, 2.0);
    }, root);
    return () => ctx.revert();
  }, []);

  if (gone) return null;
  return (
    <div
      ref={root}
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#050505] p-5 text-paper md:p-10"
      style={{ clipPath: "inset(0 0 0% 0)" }}
    >
      <div className="label flex justify-between text-paper/60">
        <span>Ashkarul Azim</span>
        <span>Quality Portfolio</span>
      </div>
      <div ref={logo} className="display text-center text-[clamp(5rem,22vw,18rem)]">
        A<span className="text-lime">A</span>
      </div>
      <div>
        <div className="display mb-4 text-right text-[clamp(3rem,10vw,8rem)] tabular-nums">
          {String(count).padStart(3, "0")}
          <span className="text-lime">%</span>
        </div>
        <div className="h-px w-full bg-paper/15">
          <div ref={bar} className="h-full origin-left scale-x-0 bg-lime" />
        </div>
      </div>
    </div>
  );
}

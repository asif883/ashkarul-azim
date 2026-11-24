"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReduced } from "@/lib/gsap";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (prefersReduced()) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  return <>{children}</>;
}

export function scrollToHash(href: string) {
  const el = document.querySelector(href);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el as HTMLElement, { offset: -60, duration: 1.4 });
  else el.scrollIntoView({ behavior: "smooth" });
}

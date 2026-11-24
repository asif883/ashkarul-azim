"use client";
import { useEffect, useRef } from "react";
import { gsap, prefersReduced } from "@/lib/gsap";
import { principles } from "@/lib/data";
import { FadeUp, Line, SectionLabel, SplitWords } from "@/components/ui";

export default function Philosophy() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    if (prefersReduced() || !root.current) return;
    const ctx = gsap.context(() => {
      gsap.to(".ph-marquee", { xPercent: -30, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.6 } });
      gsap.from(".ph-p", { yPercent: 100, stagger: 0.1, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: ".ph-list", start: "top 80%", once: true } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="philosophy" className="relative overflow-hidden bg-dark py-24 text-paper md:py-40">
      <div aria-hidden="true" className="ph-marquee display pointer-events-none absolute left-0 top-6 whitespace-nowrap text-[18vw] leading-none text-paper/[0.04]">
        Precision · Compliance · Accountability · Collaboration · Improvement ·
      </div>
      <div className="wrap relative">
        <SectionLabel n="08" dark>
          Quality Philosophy
        </SectionLabel>
        <SplitWords as="h2" text="QUALITY IS BUILT INTO *EVERY STEP.*" className="display mb-10 mt-6 max-w-6xl text-[clamp(2.6rem,8vw,8.5rem)]" />
        <FadeUp className="mb-16 max-w-2xl md:mb-24">
          <p className="text-lg leading-relaxed text-paper/60">
            From identifying production defects to supporting factory QC teams, effective quality management requires consistency, technical understanding, collaboration, and continuous improvement.
          </p>
        </FadeUp>
        <ul className="ph-list">
          {principles.map((p, i) => (
            <li key={p} className="group">
              <Line dark />
              <div className="flex items-baseline gap-6 overflow-hidden py-5 transition-transform duration-500 md:gap-12 md:py-7 md:hover:translate-x-4">
                <span className="ph-p label w-8 shrink-0 text-lime">0{i + 1}</span>
                <span className="ph-p display text-[clamp(1.7rem,6.2vw,6rem)] leading-[1] transition-colors group-hover:text-lime">{p}</span>
              </div>
            </li>
          ))}
          <li>
            <Line dark />
          </li>
        </ul>
      </div>
    </section>
  );
}

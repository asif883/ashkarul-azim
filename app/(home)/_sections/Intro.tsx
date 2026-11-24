"use client";
import { useEffect, useRef } from "react";
import { gsap, prefersReduced, revealStart, mDur } from "@/lib/gsap";
import { FadeUp, Line, SectionLabel } from "@/components/ui";

const statement = "QUALITY IS MORE THAN INSPECTION. IT IS A COMMITMENT TO *CONSISTENCY,* *COMPLIANCE* AND *CONTINUOUS IMPROVEMENT.*";

export default function Intro() {
  const root = useRef<HTMLElement>(null);
  const words = statement.split(/(\*[^*]+\*)/g).filter(Boolean).flatMap((p) => {
    const hl = p.startsWith("*");
    return (hl ? p.slice(1, -1) : p).split(/\s+/).filter(Boolean).map((w) => ({ w, hl }));
  });

  useEffect(() => {
    if (prefersReduced() || !root.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".intro-word",
        { opacity: 0.14 },
        { opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: { trigger: ".intro-statement", start: "top 80%", end: "bottom 45%", scrub: true } },
      );
      gsap.from(".intro-up", { y: 50, opacity: 0, duration: mDur(1.1), ease: "power3.out", scrollTrigger: { trigger: ".intro-up", start: revealStart("top 90%"), once: true } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="introduction" className="on-light bg-white py-24 md:py-40">
      <div className="wrap">
        <SectionLabel n="01">Introduction</SectionLabel>
        <Line className="mb-10 mt-6 md:mb-16" />
        <p className="intro-statement display text-[clamp(1.9rem,6.4vw,6.6rem)] leading-[0.98]" aria-label={statement.replace(/\*/g, "")}>
          {words.map((t, i) => (
            <span key={i} aria-hidden="true" className="intro-word">
              <span className={t.hl ? "hl-bg" : ""}>{t.w}</span>{" "}
            </span>
          ))}
        </p>
        <div className="intro-up mt-14 grid gap-8 md:mt-24 md:grid-cols-12">
          <FadeUp className="md:col-span-5 md:col-start-8">
            <p className="text-base leading-relaxed text-mute md:text-xl">
              With professional experience across apparel quality control, quality assurance, and inspection services, I focus on identifying production issues, preventing defects, and helping suppliers maintain buyer requirements.
            </p>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

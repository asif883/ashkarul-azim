"use client";
import { useEffect, useRef } from "react";
import { Award } from "lucide-react";
import { gsap, prefersReduced } from "@/lib/gsap";
import { certifications } from "@/lib/data";
import { FadeUp, Line, SectionLabel, SplitWords } from "@/components/ui";

export default function Achievements() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReduced() || !root.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".ac-big", { yPercent: 110, duration: 1.4, ease: "expo.out", stagger: 0.15, scrollTrigger: { trigger: ".ac-feature", start: "top 75%", once: true } });
      gsap.to(".ac-bg-a", { yPercent: -25, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.to(".ac-bg-b", { yPercent: 18, xPercent: -6, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.from(".ac-cert", { x: -30, opacity: 0, stagger: 0.12, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ".ac-certs", start: "top 80%", once: true } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="achievements" className="relative overflow-hidden bg-[#050505] py-24 text-paper md:py-40">
      <span aria-hidden="true" className="ac-bg-a display pointer-events-none absolute -left-10 top-[18%] select-none text-[38vw] leading-none text-paper/[0.03]">
        01
      </span>
      <span aria-hidden="true" className="ac-bg-b pointer-events-none absolute -right-40 top-[40%] h-[40rem] w-[40rem] rounded-full bg-lime/10 blur-3xl" />

      <div className="wrap relative">
        <SectionLabel n="05" dark>
          Achievements &amp; Recognition
        </SectionLabel>
        <SplitWords as="h2" text="RECOGNITION THAT *MATTERS.*" className="display mb-16 mt-6 text-[clamp(2.4rem,7vw,7.5rem)] md:mb-28" />

        {/* Featured */}
        <div className="ac-feature grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="label mb-6 flex items-center gap-3 text-lime">
              <Award size={16} aria-hidden="true" /> Featured achievement
            </p>
            <div className="mask block">
              <p className="ac-big display text-[clamp(6rem,15vw,16rem)] leading-[0.8] text-lime">2025</p>
            </div>
            <h3 className="display mt-8 text-[clamp(1.6rem,4vw,3.6rem)] leading-[1]">
              Best Quality Control Inspector of the Year
            </h3>
            <p className="label mt-5 flex flex-wrap gap-x-6 gap-y-1 text-paper/60">
              <span>V-Trust Inspection Service Ltd.</span>
              <span className="text-lime">Asia Region</span>
            </p>
          </div>

          <div className="flex flex-col justify-end lg:col-span-5">
            <div className="border-t border-paper/20 pt-8">
              <p className="label mb-4 text-paper/60">Ranking</p>
              <div className="mask block">
                <p className="ac-big display text-[clamp(5rem,12vw,12rem)] leading-[0.85]">
                  NO<span className="text-lime">.</span>1
                </p>
              </div>
              <p className="display mt-4 text-[clamp(1.2rem,2.4vw,2rem)]">Inspector Ranking — 2026</p>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-24 md:mt-40">
          <Line dark />
          <div className="grid gap-10 pt-10 lg:grid-cols-12">
            <FadeUp className="lg:col-span-4">
              <p className="label text-lime">Certifications &amp; Training</p>
              <p className="display mt-4 text-[clamp(1.6rem,3vw,2.6rem)]">Credentials that support the work.</p>
            </FadeUp>
            <ul className="ac-certs lg:col-span-8">
              {certifications.map((c, i) => (
                <li key={c.title} className="ac-cert group grid grid-cols-[2.5rem_1fr] gap-4 border-b border-paper/15 py-6 first:pt-0 md:grid-cols-[3rem_1fr_auto]">
                  <span className="label pt-1 text-lime">0{i + 1}</span>
                  <p className="text-lg leading-snug transition-colors group-hover:text-lime">{c.title}</p>
                  <p className="label col-start-2 text-paper/50 md:col-start-auto md:text-right">{c.by}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReduced, revealStart, mDur } from "@/lib/gsap";
import { education } from "@/lib/data";
import { SectionLabel, SplitWords } from "@/components/ui";

export default function Education() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReduced() || !root.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".ed-line", { scaleY: 0 }, { scaleY: 1, transformOrigin: "top", ease: "none", scrollTrigger: { trigger: ".ed-list", start: "top 60%", end: "bottom 60%", scrub: true } });
      gsap.utils.toArray<HTMLElement>(".ed-item").forEach((item) => {
        const year = item.querySelector(".ed-year");
        gsap.from(item.querySelectorAll(".ed-fade"), { y: 30, opacity: 0, stagger: 0.1, duration: mDur(0.9), ease: "power3.out", scrollTrigger: { trigger: item, start: revealStart("top 85%"), once: true } });
        const marks = [year, item.querySelector(".ed-dot")];
        ScrollTrigger.create({ trigger: item, start: "top 62%", onEnter: () => marks.forEach((m) => m?.classList.add("is-on")), onLeaveBack: () => marks.forEach((m) => m?.classList.remove("is-on")) });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="education" className="on-light bg-paper py-24 md:py-40">
      <div className="wrap">
        <SectionLabel n="06">Education &amp; Professional Development</SectionLabel>
        <SplitWords as="h2" text="KNOWLEDGE THAT BUILDS *EXPERTISE.*" hl="bg" className="display mb-16 mt-6 max-w-6xl text-[clamp(2.4rem,7vw,7rem)] md:mb-28" />

        <ol className="ed-list relative">
          <span aria-hidden="true" className="absolute left-[7px] top-2 h-full w-px bg-line md:left-[calc(25%-0.5px)]" />
          <span aria-hidden="true" className="ed-line absolute left-[7px] top-2 h-full w-px bg-ink md:left-[calc(25%-0.5px)]" />
          {education.map((e) => (
            <li key={e.title} className="ed-item relative grid gap-3 pb-14 pl-10 last:pb-0 md:grid-cols-4 md:gap-0 md:pl-0">
              <span aria-hidden="true" className="absolute left-0 top-3 z-10 ed-dot h-[15px] w-[15px] rounded-full border-2 border-ink bg-paper transition-colors duration-500 [&.is-on]:bg-lime md:left-[calc(25%-7.5px)]" />
              <p className="ed-year display text-[clamp(2.6rem,6vw,5.5rem)] leading-none transition-colors duration-500 md:pr-14 md:text-right">
                <span className="ed-fade inline-block px-2 transition-colors duration-500 [.is-on_&]:bg-lime">{e.year}</span>
              </p>
              <div className="md:col-span-3 md:pl-14">
                <h3 className="ed-fade display text-[clamp(1.3rem,2.6vw,2.4rem)] leading-[1.05]">{e.title}</h3>
                <p className="ed-fade mt-3 text-mute md:text-lg">{e.inst}</p>
                {e.note && <p className="ed-fade label mt-3 inline-block border border-ink px-2 py-1">{e.note}</p>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

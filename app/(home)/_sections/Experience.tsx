"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReduced, revealStart, mDur } from "@/lib/gsap";
import { experience } from "@/lib/data";
import { FadeUp, SectionLabel, SplitWords } from "@/components/ui";

export default function Experience() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReduced() || !root.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".tl-line", { scaleY: 0 }, { scaleY: 1, transformOrigin: "top", ease: "none", scrollTrigger: { trigger: ".tl-list", start: "top 60%", end: "bottom 60%", scrub: true } });
      gsap.utils.toArray<HTMLElement>(".tl-item").forEach((item) => {
        const dot = item.querySelector(".tl-dot");
        ScrollTrigger.create({ trigger: item, start: "top 62%", onEnter: () => dot?.classList.add("is-on"), onLeaveBack: () => dot?.classList.remove("is-on") });
        const tl = gsap.timeline({ scrollTrigger: { trigger: item, start: revealStart("top 80%"), once: true } });
        tl.from(item.querySelector(".tl-dot"), { scale: 0, duration: mDur(0.6), ease: "back.out(2)" })
          .from(item.querySelector(".tl-date"), { yPercent: 100, duration: mDur(1), ease: "expo.out" }, 0)
          .from(item.querySelectorAll(".tl-fade"), { y: 30, opacity: 0, stagger: 0.08, duration: mDur(0.9), ease: "power3.out" }, 0.15)
          .from(item.querySelectorAll(".tl-pt"), { x: -16, opacity: 0, stagger: 0.05, duration: mDur(0.7), ease: "power2.out" }, 0.4);
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="experience" className="on-light bg-white py-24 md:py-40">
      <div className="wrap">
        <SectionLabel n="04">Professional Experience</SectionLabel>
        <div className="mb-16 mt-6 grid gap-8 md:mb-28 lg:grid-cols-12">
          <SplitWords as="h2" text="THE JOURNEY *SO FAR.*" hl="bg" className="display text-[clamp(2.6rem,8vw,8.5rem)] lg:col-span-8" />
          <FadeUp className="self-end text-mute lg:col-span-4">
            <p>Professional experience across apparel quality assurance, inspection, and production quality management.</p>
          </FadeUp>
        </div>

        <ol className="tl-list relative">
          <span aria-hidden="true" className="absolute left-[7px] top-2 h-full w-px bg-line md:left-[calc(33.333%-0.5px)]" />
          <span aria-hidden="true" className="tl-line absolute left-[7px] top-2 h-full w-px bg-ink md:left-[calc(33.333%-0.5px)]" />
          {experience.map((x) => (
            <li key={x.company} className="tl-item relative grid gap-6 pb-20 pl-10 last:pb-0 md:grid-cols-3 md:gap-0 md:pl-0">
              <span
                aria-hidden="true"
                className={`tl-dot absolute left-0 top-2 z-10 h-[15px] w-[15px] rounded-full border-2 border-ink md:left-[calc(33.333%-7.5px)] ${x.current ? "bg-lime shadow-[0_0_0_6px_rgba(215,255,0,.35)]" : "bg-white transition-colors duration-500 [&.is-on]:bg-ink"}`}
              />
              <div className="md:pr-14 md:text-right">
                <div className="mask">
                  <p className="tl-date display text-[clamp(2.6rem,7vw,6.5rem)] leading-none">{x.start}</p>
                </div>
                <p className="tl-fade label mt-3 text-mute">{x.period}</p>
                {x.current && (
                  <p className="tl-fade label mt-3 inline-block bg-lime px-2 py-1 text-black">● Current position</p>
                )}
              </div>
              <div className="md:col-span-2 md:pl-14">
                <h3 className="tl-fade display text-[clamp(1.6rem,3.4vw,3.2rem)] leading-[1]">{x.company}</h3>
                <p className="tl-fade label mt-3 flex flex-wrap items-center gap-x-3 text-mute">
                  <span className="text-ink">{x.role}</span>
                </p>
                <p className="tl-fade mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">{x.desc}</p>
                <ul className="mt-6 grid gap-x-10 gap-y-3 lg:grid-cols-2">
                  {x.points.map((p) => (
                    <li key={p} className="tl-pt flex gap-3 text-sm leading-relaxed text-mute">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink" aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

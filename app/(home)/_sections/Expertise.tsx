"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { gsap, prefersReduced, revealStart, mDur } from "@/lib/gsap";
import { expertise } from "@/lib/data";
import { FadeUp, SectionLabel, SplitWords } from "@/components/ui";

export default function Expertise() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(0);

  useEffect(() => {
    if (prefersReduced() || !root.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".ex-row").forEach((row) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: revealStart("top 88%"), once: true } });
        tl.from(row.querySelector(".ex-line"), { scaleX: 0, transformOrigin: "left", duration: mDur(1.2), ease: "expo.out" })
          .from(row.querySelector(".ex-n"), { yPercent: 120, duration: mDur(0.8), ease: "expo.out" }, 0.1)
          .from(row.querySelector(".ex-title"), { yPercent: 110, duration: mDur(1), ease: "expo.out" }, 0.15)
          .from(row.querySelector(".ex-img"), { clipPath: "inset(0 0 100% 0)", duration: mDur(1.2), ease: "expo.inOut" }, 0.2);
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="expertise" className="relative bg-dark py-24 text-paper md:py-40">
      <div className="wrap">
        <SectionLabel n="02" dark>
          Professional Expertise
        </SectionLabel>
        <div className="mb-16 mt-6 grid gap-8 md:mb-24 lg:grid-cols-12">
          <SplitWords as="h2" text="WHERE QUALITY MEETS *PRECISION.*" className="display text-[clamp(2.6rem,8vw,8.5rem)] lg:col-span-9" />
          <FadeUp className="self-end lg:col-span-3">
            <p className="text-base leading-relaxed text-paper/60">
              Technical expertise and practical knowledge across apparel inspection, quality management, and factory assessment.
            </p>
          </FadeUp>
        </div>

        <ul>
          {expertise.map((e, i) => {
            const isOpen = open === i;
            return (
              <li key={e.n} className="ex-row group/row">
                <div className="ex-line h-px w-full bg-paper/20" aria-hidden="true" />

                <div className="grid gap-x-8 py-6 md:grid-cols-[3.5rem_1fr_auto] md:py-10 lg:gap-x-12">
                  {/* title row */}
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`ex-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group/btn col-span-full grid grid-cols-[auto_1fr_auto] items-center gap-4 text-left md:col-span-2 md:col-start-1 md:row-start-1 md:cursor-default md:gap-10 md:pointer-events-none"
                  >
                    <span className="mask label text-lime">
                      <span className="ex-n inline-block">{e.n}</span>
                    </span>
                    <span className="mask">
                      <span className="ex-title display block text-[clamp(1.5rem,4vw,4rem)] leading-[1] transition-colors duration-300 group-hover/row:text-lime">
                        {e.title}
                      </span>
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className={`h-7 w-7 transition-transform duration-500 md:hidden ${isOpen ? "rotate-45 text-lime" : ""}`}
                    />
                  </button>

                  {/* image — always visible */}
                  <div className="ex-img relative mt-5 aspect-[16/9] w-full overflow-hidden bg-paper/10 md:col-start-3 md:row-span-2 md:row-start-1 md:mt-0 md:aspect-[4/3] md:w-[clamp(220px,24vw,420px)] md:transition-[width] md:duration-700 md:ease-[cubic-bezier(.7,0,.2,1)] md:group-hover/row:w-[clamp(260px,30vw,520px)]">
                    <Image
                      src={e.img}
                      alt={`${e.title} — field photography`}
                      fill
                      sizes="(min-width:768px) 30vw, 100vw"
                      className="object-cover md:grayscale-[40%] transition-[transform,filter] duration-700 group-hover/row:scale-105 group-hover/row:grayscale-0"
                    />
                    <span className="label absolute bottom-0 left-0 bg-lime px-2 py-1 text-[0.58rem] text-black">Field photography</span>
                  </div>

                  {/* skills — accordion on mobile, always open on desktop */}
                  <div
                    id={`ex-${i}`}
                    className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.7,0,.2,1)] md:col-start-2 md:row-start-2 md:grid-rows-[1fr] ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <ul className="flex flex-wrap gap-2 pt-5 md:gap-3 md:pt-6">
                        {e.items.map((it) => (
                          <li key={it} className="label rounded-full border border-paper/25 px-4 py-2 text-paper/80 transition-colors hover:border-lime hover:text-lime">
                            {it}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
          <li className="h-px w-full bg-paper/20" aria-hidden="true" />
        </ul>
      </div>
    </section>
  );
}

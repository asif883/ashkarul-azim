"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { gsap, prefersReduced } from "@/lib/gsap";
import { heroMeta, images, profile } from "@/lib/data";
import { Button } from "@/components/ui";
import { scrollToHash } from "@/components/Providers";

const lines = ["Ensuring", "Quality.", "Building", "Trust."];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReduced()) return;
    let startFn: (() => void) | undefined;
    const onLoaded = () => startFn && ctx.add(startFn);
    const ctx = gsap.context(() => {
      const intro = () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.from(".h-meta", { opacity: 0, y: 14, stagger: 0.08, duration: 0.9 })
          .from(".h-char", { yPercent: 120, duration: 1.2, stagger: { each: 0.025, from: "start" } }, "-=0.5")
          .from(".h-portrait", { clipPath: "inset(100% 0 0 0)", duration: 1.5, ease: "expo.inOut" }, "-=1.3")
          .from(".h-portrait-img", { scale: 1.3, duration: 1.8 }, "<")
          .from(".h-copy", { opacity: 0, y: 24, duration: 1 }, "-=0.8")
          .from(".h-cta", { opacity: 0, y: 24, stagger: 0.1, duration: 0.9 }, "-=0.7");
      };
      gsap.set(".h-char, .h-meta, .h-portrait, .h-copy, .h-cta", { visibility: "hidden" });
      function start() {
        gsap.set(".h-char, .h-meta, .h-portrait, .h-copy, .h-cta", { visibility: "visible" });
        intro();
      }
      startFn = start;
      if (document.documentElement.dataset.loaded === "1") start();
      else window.addEventListener("preloaded", onLoaded, { once: true });

      // scroll interactions
      const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
      gsap.to(".h-title", { scale: 0.88, opacity: 0.35, transformOrigin: "left top", ease: "none", scrollTrigger: st });
      gsap.to(".h-portrait-wrap", { yPercent: 14, ease: "none", scrollTrigger: st });
      gsap.to(".h-meta-a", { y: -60, ease: "none", scrollTrigger: st });
      gsap.to(".h-meta-b", { y: -120, ease: "none", scrollTrigger: st });
    }, root);
    return () => {
      window.removeEventListener("preloaded", onLoaded);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={root} id="home" className="on-light relative flex min-h-[calc(100svh-4.5rem)] flex-col overflow-hidden bg-paper pb-8 pt-6 md:pt-8">
      <div className="wrap relative flex flex-1 flex-col">
        {/* metadata */}
        <div className="label grid grid-cols-2 gap-x-6 gap-y-2 text-[0.66rem] text-mute md:grid-cols-5">
          {heroMeta.map((m, i) => (
            <span key={m} className={`h-meta ${i % 2 ? "h-meta-b" : "h-meta-a"} ${i === 4 ? "col-span-2 md:col-span-1" : ""} ${i === 0 ? "text-ink" : ""}`}>
              {m}
            </span>
          ))}
        </div>

        <div className="relative mt-6 flex flex-1 flex-col lg:mt-4 lg:block">
          {/* portrait */}
          <div className="h-portrait-wrap relative z-0 ml-auto w-[62%] max-w-[300px] sm:max-w-[360px] lg:absolute lg:right-0 lg:top-0 lg:w-[34vw] lg:max-w-[560px]">
            <div className="h-portrait relative aspect-[4/5] w-full overflow-hidden bg-line">
              <div className="h-portrait-img absolute inset-0">
                <Image src={images.hero} alt="Portrait of Md Ashkarul Azim" fill priority sizes="(min-width:1024px) 34vw, 62vw" className="object-cover object-top" />
              </div>
              <div className="label absolute bottom-3 left-3 bg-ink px-2 py-1 text-[0.6rem] text-lime">QC Engineer</div>
            </div>
          </div>

          {/* headline */}
          <h1 className="h-title display relative z-10 mt-6 lg:max-w-[75%]" aria-label="Ensuring quality. Building trust.">
            {lines.map((line, li) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]" aria-hidden="true">
                <span className="hero-h block">
                  {line.split("").map((c, i) => (
                    <span key={i} className={`h-char inline-block ${li % 2 ? "text-ink" : ""} ${c === "." ? "text-lime [-webkit-text-stroke:0.03em_#111]" : ""}`}>
                      {c}
                    </span>
                  ))}
                </span>
              </span>
            ))}
          </h1>
        </div>

        {/* copy + CTA */}
        <div className="relative z-10 mt-8 grid items-end gap-8 lg:mt-2 lg:grid-cols-12">
          <p className="h-copy max-w-md text-base leading-relaxed text-mute md:text-lg lg:col-span-4">
            Dedicated to maintaining apparel quality standards through inspection, technical audits, production monitoring, and continuous improvement.
          </p>
          <div className="flex flex-wrap gap-3 lg:col-span-5">
            <span className="h-cta">
              <a
                href="#expertise"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToHash("#expertise");
                }}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-ink bg-ink px-6 py-3.5 text-paper transition-colors duration-500 hover:text-black"
              >
                <span className="absolute inset-0 translate-y-full rounded-full bg-lime transition-transform duration-500 group-hover:translate-y-0" />
                <span className="label relative">Explore My Expertise</span>
                <ArrowDown size={16} className="relative transition-transform duration-500 group-hover:translate-y-1" aria-hidden="true" />
              </a>
            </span>
            <span className="h-cta">
              <Button href={profile.resume} variant="outline" external cursor="Resume">
                Download Resume
              </Button>
            </span>
          </div>
          <div className="label flex items-center gap-3 text-mute lg:col-span-3 lg:justify-end">
            <span className="inline-block h-2 w-2 rounded-full bg-lime ring-1 ring-black/30" aria-hidden="true" />
            Quality Control Engineer · V-Trust
            <span className="hidden items-center gap-2 border-l border-line pl-3 sm:flex">
              Scroll <ArrowDown size={14} className="animate-bounce" aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

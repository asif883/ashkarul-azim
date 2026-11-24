"use client";
import { useEffect, useRef, type ElementType } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { gsap, prefersReduced, revealStart, mDur } from "@/lib/gsap";

/** Parses "*word*" markers into highlighted tokens. */
function tokens(text: string) {
  return text.split(/(\*[^*]+\*)/g).filter(Boolean).flatMap((part) => {
    const hl = part.startsWith("*") && part.endsWith("*");
    const clean = hl ? part.slice(1, -1) : part;
    return clean.split(/\s+/).filter(Boolean).map((w) => ({ w, hl }));
  });
}

type SplitProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "div" | "span";
  className?: string;
  /** "bg" = lime marker (light sections), "text" = lime text (dark sections) */
  hl?: "bg" | "text";
  stagger?: number;
  delay?: number;
};

/** Word-by-word masked reveal triggered on scroll. */
export function SplitWords({ text, as = "h2", className = "", hl = "text", stagger = 0.06, delay = 0 }: SplitProps) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (prefersReduced() || !ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current!.querySelectorAll(".mask > span"), {
        yPercent: 115,
        duration: mDur(1),
        ease: "expo.out",
        stagger,
        delay,
        scrollTrigger: { trigger: ref.current, start: revealStart("top 88%"), once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, [stagger, delay]);

  const hlClass = hl === "bg" ? "hl-bg" : "text-lime";
  const Tag = as as ElementType;
  return (
    <Tag ref={ref} className={className} aria-label={text.replace(/\*/g, "")}>
      {tokens(text).map((t, i) => (
        <span key={i} aria-hidden="true">
          <span className="mask">
            <span className={t.hl ? hlClass : ""}>{t.w}</span>
          </span>{" "}
        </span>
      ))}
    </Tag>
  );
}

/** Generic fade-up on scroll. */
export function FadeUp({ children, className = "", delay = 0, y = 40, as = "div" }: { children: React.ReactNode; className?: string; delay?: number; y?: number; as?: "div" | "li" | "p" | "span" }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (prefersReduced() || !ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current!, {
        y,
        opacity: 0,
        duration: mDur(1),
        delay,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: revealStart("top 90%"), once: true },
      });
    });
    return () => ctx.revert();
  }, [delay, y]);
  const Tag = as as ElementType;
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

/** Horizontal divider that draws itself. */
export function Line({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (prefersReduced() || !ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current!, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: mDur(1.4),
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: revealStart("top 95%"), once: true },
      });
    });
    return () => ctx.revert();
  }, []);
  return <div ref={ref} aria-hidden="true" className={`h-px w-full ${dark ? "bg-paper/20" : "bg-line"} ${className}`} />;
}

/** Image with clip-path reveal, inner scale and optional parallax. */
export function RevealImage({
  src,
  alt,
  className = "",
  sizes = "(min-width:1024px) 40vw, 100vw",
  priority = false,
  parallax = true,
  position = "center",
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  parallax?: boolean;
  position?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (prefersReduced() || !wrap.current || !inner.current) return;
    const ctx = gsap.context(() => {
      gsap.from(wrap.current!, {
        clipPath: "inset(100% 0 0 0)",
        duration: mDur(1.4),
        ease: "expo.inOut",
        scrollTrigger: { trigger: wrap.current, start: revealStart("top 85%"), once: true },
      });
      gsap.from(inner.current!, {
        scale: 1.35,
        duration: mDur(1.8),
        ease: "expo.out",
        scrollTrigger: { trigger: wrap.current, start: revealStart("top 85%"), once: true },
      });
      if (parallax && true) {
        gsap.fromTo(
          inner.current!.firstElementChild,
          { yPercent: -7 },
          { yPercent: 7, ease: "none", scrollTrigger: { trigger: wrap.current, start: "top bottom", end: "bottom top", scrub: true } },
        );
      }
    });
    return () => ctx.revert();
  }, [parallax]);
  return (
    <div ref={wrap} className={`relative overflow-hidden ${className}`}>
      <div ref={inner} className="absolute inset-0">
        <div className="absolute inset-x-0 -inset-y-[8%]">
          <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" style={{ objectPosition: position }} />
        </div>
      </div>
    </div>
  );
}

/** Pill button with fill transition + arrow. */
export function Button({
  href,
  children,
  variant = "dark",
  external = false,
  download = false,
  className = "",
  cursor,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "dark" | "lime" | "outline" | "outline-light";
  external?: boolean;
  download?: boolean;
  className?: string;
  cursor?: string;
}) {
  const styles = {
    dark: "bg-ink text-paper border-ink before:bg-lime hover:text-black",
    lime: "bg-lime text-black border-lime before:bg-ink hover:text-lime",
    outline: "bg-transparent text-ink border-ink before:bg-ink hover:text-paper",
    "outline-light": "bg-transparent text-paper border-paper/40 before:bg-lime hover:text-black hover:border-lime",
  }[variant];
  return (
    <a
      href={href}
      data-cursor={cursor}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...(download ? { download: true } : {})}
      className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full border px-6 py-3.5 transition-colors duration-500 before:absolute before:inset-0 before:-z-0 before:translate-y-[110%] before:rounded-full before:transition-transform before:duration-500 before:ease-[cubic-bezier(.7,0,.2,1)] hover:before:translate-y-0 ${styles} ${className}`}
    >
      <span className="label relative z-10">{children}</span>
      <ArrowUpRight size={16} className="relative z-10 transition-transform duration-500 group-hover:rotate-45" aria-hidden="true" />
    </a>
  );
}

export function SectionLabel({ n, children, dark = false }: { n?: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <FadeUp className={`label flex items-center gap-3 ${dark ? "text-paper/60" : "text-mute"}`} y={16}>
      <span className="inline-block h-2 w-2 rounded-full bg-lime ring-1 ring-black/20" aria-hidden="true" />
      {n && <span>{n} /</span>}
      <span>{children}</span>
    </FadeUp>
  );
}

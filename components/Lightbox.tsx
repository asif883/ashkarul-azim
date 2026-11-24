"use client";
import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

export type LightboxItem = { src: string; alt: string; caption?: string };

type Props = {
  items: LightboxItem[];
  index: number | null;
  onIndexChange: (i: number | null) => void;
};

export default function Lightbox({ items, index, onIndexChange }: Props) {
  const open = index !== null;
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      onIndexChange((index + dir + items.length) % items.length);
    },
    [index, items.length, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement as HTMLElement | null;
    window.__lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onIndexChange(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      window.__lenis?.start();
      lastFocus.current?.focus?.();
    };
  }, [open, go, onIndexChange]);

  const item = index !== null ? items[index] : null;

  return (
    <AnimatePresence>
      {item && index !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={item.alt}
          className="fixed inset-0 z-[80] flex flex-col bg-black/92 p-4 text-paper backdrop-blur-sm md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={() => onIndexChange(null)}
        >
          <div className="flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
            <p className="label text-paper/60">
              {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={() => onIndexChange(null)}
              aria-label="Close image"
              className="grid h-11 w-11 place-items-center rounded-full border border-paper/30 transition-colors hover:border-lime hover:bg-lime hover:text-black"
            >
              <X size={18} />
            </button>
          </div>

          <div className="relative my-4 flex-1" onClick={(e) => e.stopPropagation()}>
            <AnimatePresence mode="wait">
              <motion.div
                key={item.src}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image src={item.src} alt={item.alt} fill sizes="100vw" className="object-contain" priority />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between gap-4" onClick={(e) => e.stopPropagation()}>
            <p className="display text-[clamp(1rem,2.2vw,1.6rem)] normal-case leading-tight tracking-tight">{item.caption ?? item.alt}</p>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous image"
                className="grid h-11 w-11 place-items-center rounded-full border border-paper/30 transition-colors hover:border-lime hover:bg-lime hover:text-black"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next image"
                className="grid h-11 w-11 place-items-center rounded-full border border-paper/30 transition-colors hover:border-lime hover:bg-lime hover:text-black"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

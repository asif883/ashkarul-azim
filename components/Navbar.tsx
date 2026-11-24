"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { nav } from "@/lib/data";
import { scrollToHash } from "./Providers";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (open) window.__lenis?.stop();
    else if (document.documentElement.dataset.loaded === "1") window.__lenis?.start();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setOpen(false);
    setTimeout(() => scrollToHash(href), open ? 350 : 0);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-500 ${
          scrolled ? "border-line bg-paper/85 shadow-[0_8px_30px_-18px_rgba(0,0,0,.25)] backdrop-blur-md" : "border-line/70 bg-transparent"
        }`}
      >
        <div className="wrap flex h-[72px] items-center justify-between gap-6">
          <a href="#home" onClick={(e) => go(e, "#home")} aria-label="Md Ashkarul Azim — home" className="display flex items-center gap-2 text-xl">
            <span className="flex items-baseline gap-2 leading-none">
              <span className="font-serif text-[1.9rem] font-normal normal-case italic tracking-normal sm:text-[2.2rem]">Ashkarul</span>
              <span className="relative text-xl font-bold uppercase tracking-[-0.04em] sm:text-2xl">
                Azim
                <span aria-hidden="true" className="absolute -bottom-1 left-0 h-[3px] w-full bg-lime" />
              </span>
            </span>
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {nav.map((n) => {
                const isActive = active === n.href.slice(1);
                return (
                  <li key={n.href}>
                    <a href={n.href} onClick={(e) => go(e, n.href)} aria-current={isActive ? "true" : undefined} className="label group relative inline-flex items-center overflow-hidden py-1">
                      <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full">{n.label}</span>
                      <span className="absolute left-0 top-full inline-block transition-transform duration-500 group-hover:-translate-y-full">{n.label}</span>
                      <span className={`absolute -bottom-0.5 left-0 h-[3px] bg-lime transition-all duration-500 ${isActive ? "w-full" : "w-0"}`} />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <span className="label hidden items-center gap-2 text-mute xl:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-90" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-lime ring-1 ring-black/30" />
              </span>
              Open to connect
            </span>
            <a
              href="#contact"
              onClick={(e) => go(e, "#contact")}
              className="label group relative hidden overflow-hidden rounded-full border border-ink px-5 py-2.5 transition-colors duration-500 hover:text-black sm:inline-block"
            >
              <span className="absolute inset-0 -z-0 translate-y-full bg-lime transition-transform duration-500 group-hover:translate-y-0" />
              <span className="relative">Let’s Connect</span>
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="grid h-11 w-11 place-items-center rounded-full border border-ink lg:hidden"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] flex flex-col bg-dark p-5 text-paper"
          >
            <div className="flex items-center justify-between">
              <span className="label text-paper/60">Menu</span>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="grid h-11 w-11 place-items-center rounded-full border border-paper/30">
                <X size={18} />
              </button>
            </div>
            <ul className="mt-8 flex flex-1 flex-col justify-center gap-1">
              {nav.map((n, i) => (
                <li key={n.href} className="overflow-hidden">
                  <motion.a
                    href={n.href}
                    onClick={(e) => go(e, n.href)}
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.25 + i * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="display flex items-baseline gap-3 py-1 text-[clamp(2.4rem,12vw,4.5rem)] hover:text-lime"
                  >
                    <span className="label text-lime">0{i + 1}</span>
                    {n.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <p className="label text-paper/50">Quality Control Engineer · Dhaka, Bangladesh</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

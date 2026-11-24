"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { scrollToHash } from "./Providers";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      data-cursor="Top"
      tabIndex={show ? 0 : -1}
      onClick={() => scrollToHash("#home")}
      className={`group fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-lime text-black shadow-[0_10px_30px_-10px_rgba(0,0,0,.5)] transition-all duration-500 hover:bg-black hover:text-lime md:bottom-8 md:right-8 md:h-14 md:w-14 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <ArrowUp size={20} className="transition-transform duration-300 group-hover:-translate-y-1" aria-hidden="true" />
    </button>
  );
}

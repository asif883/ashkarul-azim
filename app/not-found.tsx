import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "404 — Page not found | Md Ashkarul Azim",
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-dark p-5 text-paper md:p-10">
      <span aria-hidden="true" className="display pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 select-none text-[48vw] leading-none text-paper/[0.04]">
        404
      </span>

      <header className="relative flex items-center justify-between">
        <Link href="/" className="flex items-baseline gap-2 leading-none" aria-label="Md Ashkarul Azim — home">
          <span className="font-serif text-3xl italic">Ashkarul</span>
          <span className="display relative text-xl">
            Azim
            <span aria-hidden="true" className="absolute -bottom-1 left-0 h-[3px] w-full bg-lime" />
          </span>
        </Link>
        <span className="label text-paper/50">Error 404</span>
      </header>

      <section className="relative my-16">
        <p className="label mb-6 flex items-center gap-3 text-lime">
          <span className="inline-block h-2 w-2 rounded-full bg-lime" aria-hidden="true" />
          Inspection result: rejected
        </p>
        <h1 className="display text-[clamp(3.2rem,12vw,12rem)]">
          Page not
          <br />
          <span className="hl-bg">found.</span>
        </h1>
        <p className="mt-8 max-w-md text-lg leading-relaxed text-paper/60">
          This page didn’t pass inspection — it may have moved, or the link may be wrong. Let’s get you back to something that meets the standard.
        </p>
        <Link
          href="/"
          className="group relative mt-10 inline-flex items-center gap-3 overflow-hidden rounded-full border border-lime bg-lime px-7 py-4 text-black transition-colors duration-500 hover:text-lime"
        >
          <span className="absolute inset-0 translate-y-[110%] bg-dark transition-transform duration-500 group-hover:translate-y-0" />
          <span className="label relative">Back to home</span>
          <ArrowUpRight size={16} className="relative transition-transform duration-500 group-hover:rotate-45" aria-hidden="true" />
        </Link>
      </section>

      <footer className="label relative flex flex-wrap justify-between gap-2 text-paper/40">
        <span>Quality Control Engineer · Dhaka, Bangladesh</span>
        <span>Ensuring quality. Building trust.</span>
      </footer>
    </main>
  );
}

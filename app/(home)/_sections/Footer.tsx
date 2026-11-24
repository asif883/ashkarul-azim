"use client";
import { useSyncExternalStore } from "react";
import Image from "next/image";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { nav, profile } from "@/lib/data";
import { scrollToHash } from "@/components/Providers";

export default function Footer() {
  const year = useSyncExternalStore(
    () => () => {},
    () => new Date().getFullYear(),
    () => null,
  );

  const go = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    scrollToHash(href);
  };

  return (
    <footer className="bg-dark text-paper">
      <div className="wrap pb-8 pt-24 md:pt-36">
        <div className="flex flex-col gap-10 border-b border-paper/15 pb-16 md:pb-24">
          <a href="#contact" onClick={(e) => go(e, "#contact")} className="group display block text-[clamp(3rem,13vw,14rem)] leading-[0.85] transition-colors duration-500 hover:text-lime" data-cursor="Contact">
            Let’s <br className="sm:hidden" />
            Connect<span className="text-lime">.</span>
          </a>
          <div className="flex flex-wrap items-center justify-between gap-6">
            <a href={`mailto:${profile.email}`} className="label normal-case! group inline-flex items-center gap-3 rounded-full border border-paper/30 px-6 py-3.5 transition-colors hover:border-lime hover:bg-lime hover:text-black">
              {profile.email}
              <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:rotate-45" aria-hidden="true" />
            </a>
            <span className="label flex items-center gap-2 text-paper/60">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
              </span>
              Open to professional conversations
            </span>
          </div>
        </div>

        <div className="grid gap-12 py-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="flex items-center gap-3">
              <div>
                <p className="display text-[clamp(1.6rem,2.6vw,2.4rem)] normal-case leading-none tracking-tight">{profile.name}</p>
                <p className="label mt-2 text-paper/50">Quality Control Engineer</p>
              </div>
            </div>
            <a
                            href={profile.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Md Ashkarul Azim on LinkedIn"
                            className="mt-4 grid h-11 w-11 place-items-center rounded-full border border-paper/30 text-paper transition-colors duration-300 hover:border-lime hover:bg-lime hover:text-black"
                          >
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                            </svg>
                          </a>
          </div>
          <nav aria-label="Footer" className="md:col-span-4">
            <ul className="grid grid-cols-2 gap-y-3">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} onClick={(e) => go(e, n.href)} className="label u-link text-paper/70 hover:text-lime">{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <ul className="space-y-4 md:col-span-4">
            <li className="group/addr flex items-start gap-3 text-paper/70 transition-colors hover:text-lime">
              <MapPin size={18} className="mt-0.5 shrink-0 text-paper transition-colors group-hover/addr:text-lime" aria-hidden="true" />
              <span className="text-sm leading-snug">{profile.location}</span>
            </li>
            <li>
              <a href={profile.phoneHref} className="group flex items-center gap-3 text-paper/70 transition-colors hover:text-lime">
                <Phone size={18} className="shrink-0 text-paper transition-colors group-hover:text-lime" aria-hidden="true" />
                <span className="u-link text-sm">{profile.phone}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${profile.email}`} className="group flex items-center gap-3 text-paper/70 transition-colors hover:text-lime">
                <Mail size={18} className="shrink-0 text-paper transition-colors group-hover:text-lime" aria-hidden="true" />
                <span className="u-link break-all text-sm lowercase">{profile.email}</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="label flex flex-col items-start justify-between gap-4 border-t border-paper/15 pt-6 pr-16 text-paper/50 sm:flex-row sm:items-center md:pr-24">
          <p>© {year ?? ""} {profile.name}. All rights reserved.</p>
          <p className="flex items-center gap-2 normal-case! tracking-wide text-paper/70">
            <span>Designed &amp; built by</span>
            <a
              href="https://webbriks.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-paper transition-colors hover:text-lime"
            >
              <Image src="/webbriks.png" alt="" width={22} height={22} className="h-[22px] w-[22px] rounded-[5px] object-contain" />
              <span className="u-link font-semibold">Webbriks</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

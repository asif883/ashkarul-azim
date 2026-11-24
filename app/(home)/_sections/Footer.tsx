"use client";
import { useSyncExternalStore } from "react";
import { ArrowUp, ArrowUpRight } from "lucide-react";
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
          <a href={`mailto:${profile.email}`} className="group display block text-[clamp(3rem,13vw,14rem)] leading-[0.85] transition-colors duration-500 hover:text-lime" data-cursor="Email">
            Let’s <br className="sm:hidden" />
            Connect<span className="text-lime">.</span>
          </a>
          <div className="flex flex-wrap items-center justify-between gap-6">
            <a href={`mailto:${profile.email}`} className="label group inline-flex items-center gap-3 rounded-full border border-paper/30 px-6 py-3.5 transition-colors hover:border-lime hover:bg-lime hover:text-black">
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
                <p className="display text-lg normal-case tracking-tight">{profile.name}</p>
                <p className="label text-paper/50">Quality Control Engineer</p>
              </div>
            </div>
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
          <ul className="space-y-3 md:col-span-4">
            <li><a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="label u-link text-paper/70 hover:text-lime">LinkedIn</a></li>
            <li><a href={`mailto:${profile.email}`} className="label u-link break-all text-paper/70 hover:text-lime">{profile.email}</a></li>
            <li><a href={profile.phoneHref} className="label u-link text-paper/70 hover:text-lime">{profile.phone}</a></li>
            <li className="label text-paper/40">{profile.location}</li>
          </ul>
        </div>

        <div className="label flex flex-col items-start justify-between gap-4 border-t border-paper/15 pt-6 text-paper/50 sm:flex-row sm:items-center">
          <p>© {year ?? ""} {profile.name}. All rights reserved.</p>
          <p>Designed &amp; built for Ashkarul Azim</p>
          <a href="#home" onClick={(e) => go(e, "#home")} className="group inline-flex items-center gap-2 text-paper hover:text-lime">
            Back to top <ArrowUp size={14} className="transition-transform duration-300 group-hover:-translate-y-1" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}

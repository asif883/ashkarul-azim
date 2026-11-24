"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  // mobile URL-bar show/hide must not trigger full ScrollTrigger refreshes while scrolling
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger };
/** Mouse-driven large screens only: heavy scrub/parallax effects are skipped on touch devices. */
export const isDesktop = () =>
  typeof window !== "undefined" && window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)").matches;
export const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Scroll-reveal start position. On desktop elements animate once they are well inside the viewport;
 * on touch devices (fast momentum scrolling) they start the moment they touch the bottom edge of the screen (with faster
 * timings, see mDur) so the content is never left blank for long while the user scrolls.
 */
export const revealStart = (desktop = "top 88%") => (isDesktop() ? desktop : "top 103%");
/** Slightly snappier timings on touch devices. */
export const mDur = (d: number) => (isDesktop() ? d : d * 0.7);

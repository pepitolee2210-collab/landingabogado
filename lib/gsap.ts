"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";

let registered = false;

/** Registra plugins y eases custom (idénticas al original) una sola vez. */
export function setupGsap() {
  if (registered) return;
  registered = true;
  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);
  CustomEase.create("InOut", "0.76,0,0.24,1");
  CustomEase.create("Out", "0.25,1,0.5,1");
  CustomEase.create("In", "0.5,0,0.75,0");
  CustomEase.create("Write", "0.333,0,0.667,1");
}

/* Los efectos de componentes hijos corren antes que el del Shell:
   registrar en cuanto el módulo carga en el navegador. */
if (typeof window !== "undefined") setupGsap();

/** Tokens de motion compartidos con el CSS. */
export const DUR = { s: 0.4, m: 0.6, l: 1.2 } as const;
export const STAGGER = 0.08;
export const DELAY_REVEAL = 0.1;

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export { gsap, ScrollTrigger, SplitText };

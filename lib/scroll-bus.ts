"use client";

import type Lenis from "lenis";

/** Puente mínimo para que cualquier sección pida scroll suave a un ancla. */
let lenisInstance: Lenis | null = null;

export function registerLenis(lenis: Lenis | null) {
  lenisInstance = lenis;
}

export function scrollToTarget(selector: string) {
  if (lenisInstance) {
    lenisInstance.scrollTo(selector, { duration: 1.6 });
    return;
  }
  document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
}

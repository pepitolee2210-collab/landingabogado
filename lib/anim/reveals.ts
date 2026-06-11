"use client";

import { gsap, ScrollTrigger, SplitText, DUR, STAGGER } from "@/lib/gsap";

/**
 * Reveals declarativos por atributo (mismo vocabulario que el original):
 *  data-reveal="h"    → palabras dispersas que convergen (títulos)
 *  data-reveal="p"    → líneas que suben (párrafos)
 *  data-reveal="ctn"  → fade + subida (contenedores)
 *  data-reveal="line" → wipe de clip-path (divisores)
 * data-reveal-delay="0.2" opcional.
 */
export function initReveals(scope: HTMLElement) {
  const targets = scope.querySelectorAll<HTMLElement>("[data-reveal]");
  targets.forEach((el) => {
    const kind = el.dataset.reveal;
    const delay = parseFloat(el.dataset.revealDelay ?? "0");
    const play = buildReveal(el, kind ?? "ctn", delay);
    if (!play) return;
    ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: play,
    });
  });
}

function buildReveal(
  el: HTMLElement,
  kind: string,
  delay: number,
): (() => void) | null {
  switch (kind) {
    case "h": {
      const split = new SplitText(el, {
        type: "words",
        wordsClass: "split-word",
      });
      gsap.set(split.words, {
        yPercent: gsap.utils.wrap([-130, 70, -70, 130]),
        scale: 0,
        opacity: 0,
      });
      gsap.set(el, { visibility: "visible" });
      return () =>
        gsap.to(split.words, {
          yPercent: 0,
          scale: 1,
          opacity: 1,
          duration: DUR.l,
          delay,
          stagger: { each: STAGGER * 0.25, from: "random" },
          ease: "Out",
        });
    }
    case "chars": {
      const split = new SplitText(el, {
        type: "chars",
        charsClass: "split-char",
      });
      gsap.set(split.chars, {
        yPercent: gsap.utils.wrap([90, -90, 60, -60]),
        opacity: 0,
        scale: 0.6,
      });
      gsap.set(el, { visibility: "visible" });
      return () =>
        gsap.to(split.chars, {
          yPercent: 0,
          opacity: 1,
          scale: 1,
          duration: DUR.l,
          delay,
          stagger: { each: STAGGER * 0.4, from: "random" },
          ease: "Out",
        });
    }
    case "type": {
      const split = new SplitText(el, {
        type: "chars",
        charsClass: "split-char",
      });
      gsap.set(split.chars, { autoAlpha: 0 });
      gsap.set(el, { visibility: "visible" });
      return () => {
        el.classList.add("typing");
        gsap.to(split.chars, {
          autoAlpha: 1,
          duration: 0.01,
          delay,
          stagger: 0.04,
          ease: "none",
          onComplete: () => el.classList.remove("typing"),
        });
      };
    }
    case "p": {
      const split = new SplitText(el, {
        type: "lines",
        linesClass: "split-line",
      });
      gsap.set(split.lines, { yPercent: 130, opacity: 0 });
      gsap.set(el, { visibility: "visible" });
      return () =>
        gsap.to(split.lines, {
          yPercent: 0,
          opacity: 1,
          duration: DUR.l,
          delay,
          stagger: STAGGER * 0.5,
          ease: "Out",
        });
    }
    case "line": {
      gsap.set(el, {
        clipPath: "inset(0% 100% -1px 0%)",
        visibility: "visible",
      });
      return () =>
        gsap.to(el, {
          clipPath: "inset(0% 0% -1px 0%)",
          duration: DUR.l,
          delay,
          ease: "Out",
        });
    }
    default: {
      gsap.set(el, { opacity: 0, yPercent: 60, visibility: "visible" });
      return () =>
        gsap.to(el, {
          opacity: 1,
          yPercent: 0,
          duration: DUR.l,
          delay,
          ease: "Out",
        });
    }
  }
}

/** data-highlight: caracteres que pasan de tinta apagada a plena con el scroll. */
export function initHighlights(scope: HTMLElement) {
  scope.querySelectorAll<HTMLElement>("[data-highlight]").forEach((el) => {
    /* words+chars: los chars animan pero las palabras envuelven completas */
    const split = new SplitText(el, {
      type: "words,chars",
      charsClass: "split-char",
    });
    gsap.set(el, { visibility: "visible" });
    gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 78%",
        end: "bottom 45%",
        scrub: true,
      },
    }).from(split.chars, {
      opacity: 0.12,
      stagger: STAGGER,
      ease: "none",
    });
  });
}

/** data-count: contadores que suben al entrar (stats). */
export function initCounters(scope: HTMLElement) {
  const els = scope.querySelectorAll<HTMLElement>("[data-count]");
  if (!els.length) return;
  /* IntersectionObserver: dispara aunque el scroll no pase por Lenis */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        io.unobserve(el);
        const target = parseFloat(el.dataset.count ?? "0");
        const suffix = el.dataset.countSuffix ?? "";
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: DUR.l * 1.5,
          ease: "Out",
          onUpdate: () => {
            el.textContent =
              Math.round(obj.v).toLocaleString("en-US") + suffix;
          },
        });
      });
    },
    { threshold: 0.4 },
  );
  els.forEach((el) => io.observe(el));
}

/**
 * data-parallax="12": deriva vertical sutil ligada al scroll.
 * El valor es el yPercent total de recorrido (positivo = empieza abajo).
 */
export function initParallax(scope: HTMLElement) {
  scope.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
    const drift = parseFloat(el.dataset.parallax ?? "10");
    gsap.fromTo(
      el,
      { yPercent: drift },
      {
        yPercent: -drift,
        ease: "none",
        scrollTrigger: {
          trigger: el.closest("section") ?? el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );
  });
}

/** Modo sin animaciones: todo visible, sin splits. */
export function revealAllStatic(scope: HTMLElement) {
  scope
    .querySelectorAll<HTMLElement>("[data-reveal], [data-highlight]")
    .forEach((el) => {
      el.style.visibility = "visible";
    });
  scope.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
    const target = parseFloat(el.dataset.count ?? "0");
    el.textContent =
      Math.round(target).toLocaleString("en-US") + (el.dataset.countSuffix ?? "");
  });
}

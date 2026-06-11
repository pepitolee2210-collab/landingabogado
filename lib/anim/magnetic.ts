"use client";

import { gsap } from "@/lib/gsap";

/**
 * Botones magnéticos (port del original):
 * [data-magnetic="25"] → fuerza; el elemento sigue al cursor en em
 * y vuelve con elastic.out(1, 0.3).
 */
export function initMagnetic(scope: HTMLElement) {
  if (!window.matchMedia("(pointer: fine)").matches) return;

  scope.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
    const strength = parseFloat(el.dataset.magnetic ?? "25");

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * (strength / 16);
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * (strength / 16);
      gsap.to(el, {
        x: `${x}em`,
        y: `${y}em`,
        ease: "power4.out",
        duration: 1.6,
      });
    };

    const onLeave = () => {
      gsap.to(el, {
        x: "0em",
        y: "0em",
        ease: "elastic.out(1, 0.3)",
        duration: 1.6,
        clearProps: "x,y",
      });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
  });
}

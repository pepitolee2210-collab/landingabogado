"use client";

import { useEffect, useRef } from "react";
import DitherCanvas from "@/lib/dither/DitherCanvas";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import styles from "./Manifesto.module.css";

const DRIFTS = [-14, 10, -10] as const;

/** Manifiesto: líneas display gigantes que derivan en direcciones opuestas. */
export default function Manifesto() {
  const { dict } = useLang();
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      root.querySelectorAll<HTMLElement>("[data-drift]").forEach((line) => {
        const drift = parseFloat(line.dataset.drift ?? "0");
        gsap.fromTo(
          line,
          { xPercent: drift },
          {
            xPercent: -drift,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} data-theme="dark" className={styles.root}>
      <DitherCanvas
        src="procedural:wasatch"
        mode="dark"
        className={styles.scene}
        layers={[
          { y: 0.55, h: 0.45, blackPoint: 60, whitePoint: 150, xSquares: 170, ySquares: 80, bgOpacity: 0 },
        ]}
      />
      <div className={styles.lines}>
        {dict.manifesto.lines.map((line, i) => (
          <p
            key={line.em}
            className={`t-display ${styles.line} ${styles[`line${i}` as "line0"]}`}
            data-drift={DRIFTS[i]}
          >
            {line.pre} <em>{line.em}</em>
          </p>
        ))}
      </div>
      <p className={`t-p6 t-muted ${styles.tag}`} data-reveal="ctn">
        {dict.manifesto.tag}
      </p>
    </section>
  );
}

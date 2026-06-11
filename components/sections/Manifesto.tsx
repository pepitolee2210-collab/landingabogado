"use client";

import { useEffect, useRef } from "react";
import DitherCanvas from "@/lib/dither/DitherCanvas";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import styles from "./Manifesto.module.css";

const LINES = [
  { pre: "La IA", em: "prepara", drift: -14 },
  { pre: "Tú", em: "decides", drift: 10 },
  { pre: "Nosotros", em: "pagamos", drift: -10 },
] as const;

/** Manifiesto: líneas display gigantes que derivan en direcciones opuestas. */
export default function Manifesto() {
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
        {LINES.map((line, i) => (
          <p
            key={line.em}
            className={`t-display ${styles.line} ${styles[`line${i}` as "line0"]}`}
            data-drift={line.drift}
          >
            {line.pre} <em>{line.em}</em>
          </p>
        ))}
      </div>
      <p className={`t-p6 t-muted ${styles.tag}`} data-reveal="ctn">
        ✦ Revisión legal de expedientes migratorios · abogados.usalatinoprime.com
      </p>
    </section>
  );
}

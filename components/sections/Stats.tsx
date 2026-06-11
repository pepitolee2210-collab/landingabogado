"use client";

import { useEffect, useRef } from "react";
import DitherCanvas, { type DitherHandle } from "@/lib/dither/DitherCanvas";
import { ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { IMG, STATS } from "@/lib/content";
import styles from "./Stats.module.css";

const HIVE = { x: 0.58, w: 0.38, y: 0.08, maxH: 0.88 };

/** Resultados: contadores + colmena de Utah que se teje con el scroll. */
export default function Stats() {
  const rootRef = useRef<HTMLElement>(null);
  const ditherRef = useRef<DitherHandle>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (prefersReducedMotion()) {
      ditherRef.current?.setLayer(0, { h: HIVE.maxH });
      return;
    }

    const st = ScrollTrigger.create({
      trigger: root,
      start: "top 85%",
      end: "center center",
      scrub: 0.5,
      onUpdate(self) {
        ditherRef.current?.setLayer(0, { h: self.progress * HIVE.maxH });
      },
    });
    return () => st.kill();
  }, []);

  return (
    <section ref={rootRef} data-theme="dark" className={styles.root}>
      <div className="comb" aria-hidden="true" />
      <DitherCanvas
        ref={ditherRef}
        src={IMG.stats}
        mode="dark"
        className={styles.scene}
        label="Colmena de Utah en arte de tramas"
        layers={[
          { x: HIVE.x, w: HIVE.w, y: HIVE.y, h: 0, blackPoint: 60, whitePoint: 150, xSquares: 90, ySquares: 110, bgOpacity: 0 },
        ]}
      />
      <div className={`${styles.inner} shell`}>
        <p className="section-label t-p6">Los números de la red</p>
        <dl className={styles.grid}>
          {STATS.map((stat) => (
            <div key={stat.label} className={styles.cell}>
              <dt className={`t-p5 t-muted ${styles.label}`} data-reveal="ctn">
                {stat.label}
              </dt>
              <dd
                className="t-num"
                data-count={stat.value}
                data-count-suffix={stat.suffix}
              >
                0
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

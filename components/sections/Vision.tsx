"use client";

import DitherCanvas from "@/lib/dither/DitherCanvas";
import { useLang } from "@/lib/i18n";
import { IMG } from "@/lib/content";
import styles from "./Vision.module.css";

/**
 * Quiénes somos + la visión — la causa que enamora al abogado,
 * sobre una multitud de la comunidad tejida en tramas.
 */
export default function Vision() {
  const { dict } = useLang();
  const t = dict.vision;

  return (
    <section id="vision" data-theme="dark" className={`${styles.root} shell`}>
      <DitherCanvas
        src={IMG.vision}
        mode="dark"
        className={styles.scene}
        label={t.sceneLabel}
        layers={[
          { y: 0.55, h: 0.45, blackPoint: 50, whitePoint: 165, xSquares: 170, ySquares: 80, bgOpacity: 0 },
        ]}
      />

      <p className="section-label t-p6">{t.label}</p>

      <blockquote className={`t-quote ${styles.statement}`} data-highlight>
        {t.statementA}
        <em>{t.statementEm}</em>
        {t.statementB}
      </blockquote>

      <div className={styles.grid}>
        <div className={styles.visionCol} data-reveal="ctn">
          <p className="t-p6 t-muted">{t.visionLabel}</p>
          <p className={`${styles.visionLine}`}>“{t.visionLine}”</p>
        </div>
        <div className={styles.bodyCol}>
          <p className="t-p4" data-reveal="p">
            {t.body1}
          </p>
          <p className="t-p4 t-muted" data-reveal="p">
            {t.body2}
          </p>
          <div className={styles.facts} data-reveal="ctn">
            {t.facts.map((fact) => (
              <span key={fact} className="chip t-p6">
                ✦ {fact}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

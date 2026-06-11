"use client";

import { useState } from "react";
import { MODULES } from "@/lib/content";
import styles from "./Visas.module.css";

/** Los cuatro pilares del panel del revisor (eco del configurador original). */
export default function Visas() {
  const [active, setActive] = useState(0);
  const tab = MODULES[active];

  return (
    <section id="modulos" data-theme="light" className={`${styles.root} shell`}>
      <div className="comb" aria-hidden="true" />
      <p className="section-label t-p6">Por dentro</p>
      <h2 className={`t-h2 ${styles.title}`} data-reveal="h">
        Así es tu <em>día</em>
      </h2>

      <div className={styles.panel}>
        <nav className={styles.tabs} aria-label="Módulos del panel">
          <p className="t-p6 t-muted">Módulos</p>
          {MODULES.map((t, i) => (
            <button
              key={t.id}
              className={`t-p1 ${styles.tab} ${i === active ? styles.tabActive : ""}`}
              aria-pressed={i === active}
              onClick={() => setActive(i)}
            >
              {i === active && <span aria-hidden="true">✦ </span>}
              {t.label}
            </button>
          ))}
        </nav>

        <div className={styles.detail} key={tab.id}>
          <p className={`t-p6 t-muted ${styles.timeLabel}`}>Lo esencial</p>
          <p className={styles.time}>
            <span className={`t-num ${styles.timeNum}`}>{tab.big}</span>
          </p>
          <p className={`t-p4 ${styles.copy}`}>{tab.copy}</p>
          <div className={styles.chips}>
            {tab.codes.map((code) => (
              <span key={code} className="chip chip--solid t-p6">
                {code}
              </span>
            ))}
            {tab.chips.map((chip) => (
              <span key={chip} className="chip t-p5">
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

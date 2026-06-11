"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";
import styles from "./Visas.module.css";

/** Los cuatro pilares del panel del revisor (eco del configurador original). */
export default function Visas() {
  const { dict } = useLang();
  const t = dict.modules;
  const [active, setActive] = useState(0);
  const tab = t.tabs[active];

  return (
    <section id="modulos" data-theme="light" className={`${styles.root} shell`}>
      <div className="comb" aria-hidden="true" />
      <p className="section-label t-p6">{t.label}</p>
      <h2 className={`t-h2 ${styles.title}`} data-reveal="h">
        {t.titleA}
        <em>{t.titleEm}</em>
      </h2>

      <div className={styles.panel}>
        <nav className={styles.tabs} aria-label={t.tabsLabel}>
          <p className="t-p6 t-muted">{t.tabsLabel}</p>
          {t.tabs.map((item, i) => (
            <button
              key={item.id}
              className={`t-p1 ${styles.tab} ${i === active ? styles.tabActive : ""}`}
              aria-pressed={i === active}
              onClick={() => setActive(i)}
            >
              {i === active && <span aria-hidden="true">✦ </span>}
              {item.label}
            </button>
          ))}
        </nav>

        <div className={styles.detail} key={tab.id}>
          <p className={`t-p6 t-muted ${styles.timeLabel}`}>{t.essential}</p>
          <p className={styles.time}>
            <span className={`t-num ${styles.timeNum}`}>{tab.big}</span>
          </p>
          <p className={`t-p4 ${styles.copy}`}>{tab.copy}</p>
          <div className={styles.chips}>
            <span className="chip chip--solid t-p6">{tab.code}</span>
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

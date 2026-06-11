"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";
import styles from "./Faq.module.css";

/** Preguntas de colegas — acordeón numerado estilo formulario. */
export default function Faq() {
  const { dict } = useLang();
  const t = dict.faq;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="preguntas" data-theme="light" className={`${styles.root} shell`}>
      <div className="comb" aria-hidden="true" />
      <p className="section-label t-p6">{t.label}</p>
      <h2 className={`t-h2 ${styles.title}`} data-reveal="h">
        {t.titleA}
        <em>{t.titleEm}</em>
      </h2>

      <div className={styles.list}>
        {t.items.map((faq, i) => {
          const isOpen = open === i;
          return (
            <div key={faq.q} className={styles.item}>
              <hr className="rule" data-reveal="line" />
              <button
                className={styles.q}
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="t-p5 t-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={`t-p2 ${styles.qText}`}>{faq.q}</span>
                <span className={`${styles.plus} ${isOpen ? styles.plusOpen : ""}`}>
                  +
                </span>
              </button>
              <div
                id={`faq-${i}`}
                className={styles.a}
                data-open={isOpen || undefined}
              >
                <p className={`t-p4 ${styles.aText}`}>{faq.a}</p>
              </div>
            </div>
          );
        })}
        <hr className="rule" data-reveal="line" />
      </div>
    </section>
  );
}

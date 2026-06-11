"use client";

import { useLang } from "@/lib/i18n";
import styles from "./Requirements.module.css";

/** Requisitos del freelance — claros, pocos y honestos. */
export default function Requirements() {
  const { dict } = useLang();
  const t = dict.requirements;

  return (
    <section id="requisitos" data-theme="light" className={`${styles.root} shell`}>
      <div className={styles.intro}>
        <p className="section-label t-p6">{t.label}</p>
        <h2 className="t-h2" data-reveal="h">
          {t.titleA}
          <em>{t.titleEm}</em>
        </h2>
      </div>

      <ol className={styles.list}>
        {t.items.map((item, i) => (
          <li key={item.title} className={styles.row}>
            <hr className="rule" data-reveal="line" />
            <div className={styles.rowInner}>
              <span className={`t-p5 t-muted ${styles.num}`}>
                REQ-{String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="t-h4">
                {item.title}
                {i === 3 && (
                  <span className={styles.plus} aria-hidden="true">
                    {" "}
                    ✦
                  </span>
                )}
              </h3>
              <p className={`t-p4 t-muted ${styles.copy}`}>{item.copy}</p>
            </div>
          </li>
        ))}
        <hr className="rule" data-reveal="line" />
      </ol>
    </section>
  );
}

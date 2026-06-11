"use client";

import { useLang } from "@/lib/i18n";
import styles from "./Testimonials.module.css";

/** Voces de la red — abogados freelance que ya revisan. */
export default function Testimonials() {
  const { dict } = useLang();
  const t = dict.testimonials;

  return (
    <section data-theme="dark" className={`${styles.root} shell`}>
      <div className="comb" aria-hidden="true" />
      <p className="section-label t-p6">{t.label}</p>
      <div className={styles.grid}>
        {t.items.map((item, i) => (
          <figure
            key={item.name}
            className={styles.card}
            data-parallax={[6, 16, 10][i]}
          >
            <hr className="rule" data-reveal="line" />
            <blockquote className={`t-quote ${styles.quote}`} data-reveal="p">
              “{item.quote}”
            </blockquote>
            <figcaption className={styles.caption} data-reveal="ctn">
              <span className="t-p5">{item.name}</span>
              <span className="t-p6 t-muted">{item.detail}</span>
              <span className={`t-p6 t-stamp ${styles.approved}`}>{t.stamp}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

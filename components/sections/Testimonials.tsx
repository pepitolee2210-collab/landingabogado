import { TESTIMONIALS } from "@/lib/content";
import styles from "./Testimonials.module.css";

/** Testimonios editoriales — tarjetas de expediente resuelto. */
export default function Testimonials() {
  return (
    <section data-theme="dark" className={`${styles.root} shell`}>
      <div className="comb" aria-hidden="true" />
      <p className="section-label t-p6">La red habla</p>
      <div className={styles.grid}>
        {TESTIMONIALS.map((t, i) => (
          <figure
            key={t.name}
            className={styles.card}
            data-parallax={[6, 16, 10][i]}
          >
            <hr className="rule" data-reveal="line" />
            <blockquote className={`t-quote ${styles.quote}`} data-reveal="p">
              “{t.quote}”
            </blockquote>
            <figcaption className={styles.caption} data-reveal="ctn">
              <span className="t-p5">{t.name}</span>
              <span className="t-p6 t-muted">{t.detail}</span>
              <span className={`t-p6 t-stamp ${styles.approved}`}>
                [ Revisor activo ]
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

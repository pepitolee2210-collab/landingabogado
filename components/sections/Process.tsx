"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { PROCESS } from "@/lib/content";
import styles from "./Process.module.css";

/**
 * El camino — scrollytelling pinned: los pasos 01→04 se suceden
 * mientras un riel dorado registra el avance. En móvil y con
 * reduced-motion se muestra la lista estática.
 */
export default function Process() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    if (window.matchMedia("(max-width: 767px)").matches) return;

    const ctx = gsap.context(() => {
      const groups = gsap.utils.toArray<HTMLElement>(`.${styles.step}`);
      const fill = root.querySelector(`.${styles.railFill}`);
      const dots = gsap.utils.toArray<HTMLElement>(`.${styles.dot}`);
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.4,
        },
      });
      tl.fromTo(fill, { scaleY: 0 }, { scaleY: 1, ease: "none", duration: 4 }, 0);
      groups.forEach((group, i) => {
        tl.fromTo(
          group,
          { autoAlpha: 0, y: 70 },
          { autoAlpha: 1, y: 0, duration: 0.32, ease: "Out" },
          i + 0.04,
        );
        tl.to(dots[i], { scale: 1.8, color: "var(--rock)", duration: 0.1 }, i + 0.2);
        if (i < groups.length - 1) {
          tl.to(
            group,
            { autoAlpha: 0, y: -70, duration: 0.32, ease: "In" },
            i + 0.78,
          );
        }
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="proceso" data-theme="light" className={styles.outer}>
      <div className={styles.sticky}>
        <header className={styles.head}>
          <p className="section-label t-p6">Cómo entras</p>
          <h2 className="t-h2" data-reveal="h">
            De tu licencia a tu primer <em>veredicto</em>
          </h2>
        </header>

        <div className={styles.stage}>
          <div className={styles.rail} aria-hidden="true">
            <span className={styles.railFill} />
            {PROCESS.map((step) => (
              <span key={step.n} className={styles.dot}>
                ✦
              </span>
            ))}
          </div>

          <div className={styles.steps}>
            {PROCESS.map((step) => (
              <article key={step.n} className={styles.step}>
                <span className={`t-num ${styles.num}`}>{step.n}</span>
                <h3 className="t-h3">{step.title}</h3>
                <p className={`t-p4 t-muted ${styles.copy}`}>{step.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* fallback estático: móvil y reduced-motion */}
      <ol className={styles.list}>
        {PROCESS.map((step) => (
          <li key={step.n} className={styles.row}>
            <hr className="rule" />
            <span className={`t-num ${styles.rowNum}`}>{step.n}</span>
            <h3 className="t-h4">{step.title}</h3>
            <p className={`t-p4 t-muted ${styles.copy}`}>{step.copy}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

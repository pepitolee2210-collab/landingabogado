"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import styles from "./Services.module.css";

/** La plataforma — galería horizontal conducida por el scroll. */
export default function Services() {
  const { dict } = useLang();
  const cards = dict.platform.cards;
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track || prefersReducedMotion()) return;
    if (window.matchMedia("(max-width: 767px)").matches) return;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.4,
          invalidateOnRefresh: true,
          onUpdate(self) {
            const current = 1 + Math.round(self.progress * (cards.length - 1));
            if (indexRef.current) {
              indexRef.current.textContent = String(current).padStart(2, "0");
            }
            if (lineRef.current) {
              lineRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });
    }, root);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      ref={rootRef}
      id="plataforma"
      data-theme="light"
      className={styles.outer}
    >
      <div className="comb" aria-hidden="true" />
      <div className={styles.sticky}>
        <header className={`${styles.head} shell`}>
          <p className="section-label t-p6">{dict.platform.label}</p>
          <h2 className="t-h2" data-reveal="h">
            {dict.platform.titleA}
            <em>{dict.platform.titleEm}</em>
          </h2>
        </header>

        <div ref={trackRef} className={styles.track}>
          {cards.map((service, i) => (
            <article key={service.code} className={styles.card}>
              <div className={styles.cardTop}>
                <span className="chip t-p6">{service.code}</span>
                <span className="t-p6 t-muted">
                  {String(i + 1).padStart(2, "0")} / {cards.length}
                </span>
              </div>
              <h3 className="t-h4">{service.title}</h3>
              <p className={`t-p4 t-muted ${styles.copy}`}>{service.copy}</p>
              <span className={styles.plus} aria-hidden="true">
                +
              </span>
            </article>
          ))}
        </div>

        <div className={styles.progress} aria-hidden="true">
          <span className="t-p5">
            <span ref={indexRef}>01</span> / {String(cards.length).padStart(2, "0")}
          </span>
          <span className={styles.progressLine}>
            <span ref={lineRef} className={styles.progressFill} />
          </span>
        </div>
      </div>
    </section>
  );
}

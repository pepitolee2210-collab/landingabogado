"use client";

import { useEffect, useRef } from "react";
import DitherCanvas, { type DitherHandle } from "@/lib/dither/DitherCanvas";
import RotatingBadge from "@/components/fx/RotatingBadge";
import { gsap, ScrollTrigger, DUR, prefersReducedMotion } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import { scrollToTarget } from "@/lib/scroll-bus";
import { IMG } from "@/lib/content";
import styles from "./Hero.module.css";

/**
 * Hero de la convocatoria: la balanza de la justicia tejida en tramas,
 * glitch que sigue al cursor, lockup pixel y CTA directo a la llamada.
 */
export default function Hero() {
  const { dict } = useLang();
  const outerRef = useRef<HTMLElement>(null);
  const ditherRef = useRef<DitherHandle>(null);

  /* tejido de entrada: la balanza aparece barriendo de arriba a abajo */
  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;
    if (prefersReducedMotion()) {
      ditherRef.current?.setLayer(0, { h: 1 });
      return;
    }
    const ditherReady = new Promise<void>((resolve) =>
      outer.addEventListener("dither:ready", () => resolve(), { once: true }),
    );
    const appReady = new Promise<void>((resolve) =>
      window.addEventListener("app:ready", () => resolve(), { once: true }),
    );
    let killed = false;
    Promise.all([ditherReady, appReady]).then(() => {
      if (killed) return;
      gsap.to(
        { p: 0 },
        {
          p: 1,
          duration: DUR.l * 1.4,
          ease: "InOut",
          onUpdate() {
            ditherRef.current?.setLayer(0, { h: this.targets()[0].p });
          },
        },
      );
    });
    return () => {
      killed = true;
    };
  }, []);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: outer,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3,
          },
        })
        .to(`.${styles.content}`, { scale: 0.55, yPercent: -6, ease: "none" }, 0)
        .to(
          `.${styles.frame}`,
          {
            clipPath: "inset(16% 22% 16% 22%)",
            scale: 0.96,
            ease: "none",
          },
          0,
        )
        .to(`.${styles.aside}`, { opacity: 0, ease: "none" }, 0.5);
    }, outer);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section
      ref={outerRef}
      id="inicio"
      data-theme="dark"
      className={styles.outer}
    >
      <div className={styles.sticky}>
        <div className={styles.frame}>
          <DitherCanvas
            ref={ditherRef}
            src={IMG.hero}
            mode="dark"
            glitch
            interactive
            className={styles.canvas}
            label={dict.hero.sceneLabel}
            layers={[
              { h: 0, blackPoint: 55, whitePoint: 150, xSquares: 150, ySquares: 130 },
            ]}
          />
          <div className={styles.scrim} aria-hidden="true" />
        </div>

        <div className={styles.content}>
          <p className="t-p3" data-reveal="type">
            {dict.hero.kicker}
          </p>
          <h1 className={styles.lockup}>
            <span className={`t-wordmark ${styles.title}`} data-reveal="chars">
              Usalatino
            </span>
            <em className={styles.prime} data-reveal="ctn" data-reveal-delay="0.8">
              Prime
            </em>
          </h1>
          <div className={styles.labels}>
            {dict.hero.labels.map((pair, i) => (
              <p
                key={pair[0]}
                className="t-p6"
                data-reveal="ctn"
                data-reveal-delay={String(0.5 + i * 0.1)}
              >
                {pair[0]}
                <br />
                {pair[1]}
              </p>
            ))}
          </div>
          <div className={styles.ctas} data-reveal="ctn" data-reveal-delay="0.9">
            <button
              className="btn btn--gold"
              data-magnetic="22"
              onClick={() => scrollToTarget("#consulta")}
            >
              {dict.hero.cta1}
            </button>
            <button
              className="btn btn--ghost"
              onClick={() => scrollToTarget("#plataforma")}
            >
              {dict.hero.cta2}
            </button>
          </div>
        </div>

        <div className={styles.aside}>
          <div className={styles.hint} data-reveal="ctn" data-reveal-delay="1.1">
            <span className={styles.barcode} aria-hidden="true" />
          </div>
          <RotatingBadge text={dict.hero.badge} className={styles.badge} />
        </div>
      </div>
    </section>
  );
}

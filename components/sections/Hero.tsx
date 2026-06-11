"use client";

import { useEffect, useRef } from "react";
import DitherCanvas, { type DitherHandle } from "@/lib/dither/DitherCanvas";
import RotatingBadge from "@/components/fx/RotatingBadge";
import { gsap, ScrollTrigger, DUR, prefersReducedMotion } from "@/lib/gsap";
import { IMG } from "@/lib/content";
import styles from "./Hero.module.css";

/**
 * Hero pinned: arte dither que se teje al entrar, glitch, wordmark
 * pixel y shrink-to-frame al scrollear (firma de sondaven).
 */
export default function Hero() {
  const outerRef = useRef<HTMLElement>(null);
  const ditherRef = useRef<DitherHandle>(null);

  /* tejido de entrada: la estatua aparece barriendo de arriba a abajo */
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
            className={styles.canvas}
            label="Estatua de la Libertad en arte de tramas"
            layers={[
              { h: 0, blackPoint: 35, whitePoint: 165, xSquares: 150, ySquares: 120 },
            ]}
          />
          <div className={styles.scrim} aria-hidden="true" />
        </div>

        <div className={styles.content}>
          <p className="t-p3" data-reveal="type">
            Red de revisión legal para abogados de inmigración
          </p>
          <h1 className={styles.lockup}>
            <span
              className={`t-wordmark ${styles.title}`}
              data-reveal="chars"
            >
              Usalatino
            </span>
            <em className={styles.prime} data-reveal="ctn" data-reveal-delay="0.8">
              Prime
            </em>
          </h1>
          <div className={styles.labels}>
            <p className="t-p6" data-reveal="ctn" data-reveal-delay="0.5">
              Expedientes listos
              <br />
              pre-revisados con IA
            </p>
            <p className="t-p6" data-reveal="ctn" data-reveal-delay="0.6">
              Tu veredicto
              <br />
              tu tarifa
            </p>
            <p className="t-p6" data-reveal="ctn" data-reveal-delay="0.7">
              100% remoto
              <br />
              Sede en Utah
            </p>
          </div>
        </div>

        <div className={styles.aside}>
          <div className={styles.hint} data-reveal="ctn" data-reveal-delay="0.9">
            <span className={styles.barcode} aria-hidden="true" />
            <span className="t-p6 t-muted">Desplaza para abrir el expediente</span>
          </div>
          <RotatingBadge
            text="Únete a la red — cupos por cohortes"
            className={styles.badge}
          />
        </div>
      </div>
    </section>
  );
}

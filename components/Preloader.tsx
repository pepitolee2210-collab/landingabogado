"use client";

import { useEffect, useRef } from "react";
import { gsap, DUR, prefersReducedMotion } from "@/lib/gsap";
import { IMG } from "@/lib/content";
import styles from "./Preloader.module.css";

const COLS = 16;
const ROWS = 10;
const MIN_SHOW_MS = 1500;

/**
 * Preloader "EL EXPEDIENTE": contador % ligado a la carga real
 * (fuentes + imagen del hero) y salida con cortina de celdas pixeladas.
 */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (prefersReducedMotion()) {
      doneRef.current();
      return;
    }

    document.documentElement.style.overflow = "hidden";

    const heroImg = new Promise<void>((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve();
      img.onerror = () => resolve();
      img.src = IMG.hero;
    });
    const minTime = new Promise((r) => setTimeout(r, MIN_SHOW_MS));

    const counter = { v: 0 };
    const tick = () => {
      if (pctRef.current) {
        pctRef.current.textContent = `${Math.round(counter.v)}%`;
      }
    };
    const crawl = gsap.to(counter, {
      v: 88,
      duration: 2.4,
      ease: "Out",
      onUpdate: tick,
    });

    let cancelled = false;
    Promise.all([document.fonts.ready, heroImg, minTime]).then(() => {
      if (cancelled) return;
      crawl.kill();
      const cells = root.querySelectorAll(`.${styles.cell}`);
      gsap
        .timeline({
          onComplete: () => {
            document.documentElement.style.overflow = "";
            doneRef.current();
          },
        })
        .to(counter, { v: 100, duration: 0.4, ease: "Out", onUpdate: tick })
        .to(`.${styles.content}`, {
          yPercent: -120,
          opacity: 0,
          duration: DUR.m,
          ease: "In",
        })
        .to(cells, {
          scaleX: 0,
          duration: DUR.s,
          ease: "InOut",
          stagger: { each: 0.012, from: "end", grid: [ROWS, COLS] },
        });
    });

    return () => {
      cancelled = true;
      crawl.kill();
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.root} aria-hidden="true">
      <div className={styles.grid}>
        {Array.from({ length: COLS * ROWS }, (_, i) => (
          <span key={i} className={styles.cell} />
        ))}
      </div>
      <div className={styles.content}>
        <p className="t-p6 t-muted">Red de revisión legal · Salt Lake City, UT</p>
        <p className={`t-wordmark ${styles.mark}`}>
          Usalatino
          <em className={styles.prime}>Prime</em>
        </p>
        <div className={styles.foot}>
          <span className="t-p6 t-muted">Preparando tu panel</span>
          <span ref={pctRef} className={`t-p2 ${styles.pct}`}>
            0%
          </span>
        </div>
      </div>
    </div>
  );
}

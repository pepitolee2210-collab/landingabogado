"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, DUR, prefersReducedMotion } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import { IMG } from "@/lib/content";
import styles from "./Preloader.module.css";

const COLS = 16;
const ROWS = 10;
const MIN_SHOW_MS = 1500;

/**
 * Preloader con compuerta: la cortina no se abre hasta que los assets
 * estén listos Y el visitante haya elegido idioma (gate).
 */
export default function Preloader({
  gate,
  onDone,
}: {
  gate: boolean;
  onDone: () => void;
}) {
  const { dict } = useLang();
  const rootRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const [assetsDone, setAssetsDone] = useState(false);
  const exitedRef = useRef(false);
  const counterRef = useRef({ v: 0 });
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
      if (IMG.hero.startsWith("procedural:")) {
        resolve();
        return;
      }
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve();
      img.onerror = () => resolve();
      img.src = IMG.hero;
    });
    const minTime = new Promise((r) => setTimeout(r, MIN_SHOW_MS));

    const tick = () => {
      if (pctRef.current) {
        pctRef.current.textContent = `${Math.round(counterRef.current.v)}%`;
      }
    };
    const crawl = gsap.to(counterRef.current, {
      v: 88,
      duration: 2.4,
      ease: "Out",
      onUpdate: tick,
    });

    let cancelled = false;
    Promise.all([document.fonts.ready, heroImg, minTime]).then(() => {
      if (!cancelled) setAssetsDone(true);
    });

    return () => {
      cancelled = true;
      crawl.kill();
      document.documentElement.style.overflow = "";
    };
  }, []);

  /* salida: solo cuando assets listos + idioma elegido */
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !assetsDone || !gate || exitedRef.current) return;
    exitedRef.current = true;

    const tick = () => {
      if (pctRef.current) {
        pctRef.current.textContent = `${Math.round(counterRef.current.v)}%`;
      }
    };
    const cells = root.querySelectorAll(`.${styles.cell}`);
    gsap
      .timeline({
        onComplete: () => {
          document.documentElement.style.overflow = "";
          doneRef.current();
        },
      })
      .to(counterRef.current, { v: 100, duration: 0.4, ease: "Out", onUpdate: tick })
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
  }, [assetsDone, gate]);

  return (
    <div ref={rootRef} className={styles.root} aria-hidden="true">
      <div className={styles.grid}>
        {Array.from({ length: COLS * ROWS }, (_, i) => (
          <span key={i} className={styles.cell} />
        ))}
      </div>
      <div className={styles.content}>
        <p className="t-p6 t-muted">{dict.preloader.sub}</p>
        <p className={`t-wordmark ${styles.mark}`}>
          Usalatino
          <em className={styles.prime}>Prime</em>
        </p>
        <div className={styles.foot}>
          <span className="t-p6 t-muted">{dict.preloader.preparing}</span>
          <span ref={pctRef} className={`t-p2 ${styles.pct}`}>
            0%
          </span>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import styles from "./Marquee.module.css";

/**
 * Cinta infinita de códigos de formulario que acelera con la
 * velocidad del scroll y decae suavemente de vuelta.
 */
export default function Marquee({ items }: { items: readonly string[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || prefersReducedMotion()) return;

    const tween = gsap.to(track, {
      xPercent: -50,
      duration: 24,
      ease: "none",
      repeat: -1,
    });
    let speed = 1;
    const st = ScrollTrigger.create({
      onUpdate(self) {
        speed = 1 + Math.min(Math.abs(self.getVelocity()) / 400, 4);
      },
    });
    const decay = gsap.ticker.add(() => {
      speed += (1 - speed) * 0.06;
      tween.timeScale(speed);
    });

    return () => {
      gsap.ticker.remove(decay);
      st.kill();
      tween.kill();
    };
  }, []);

  const row = (key: string, hidden = false) => (
    <ul key={key} className={styles.list} aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={`${key}-${item}`} className={`${styles.item} t-p2`}>
          {item} <span className={styles.sep}>✦</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={styles.root}>
      <div ref={trackRef} className={styles.track}>
        {row("a")}
        {row("b", true)}
      </div>
    </div>
  );
}

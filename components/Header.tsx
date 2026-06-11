"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, DUR, prefersReducedMotion } from "@/lib/gsap";
import SwapText from "@/components/fx/SwapText";
import styles from "./Header.module.css";

const LINKS = [
  { label: "Plataforma", target: "#plataforma" },
  { label: "Proceso", target: "#proceso" },
  { label: "Módulos", target: "#modulos" },
  { label: "Preguntas", target: "#preguntas" },
] as const;

export default function Header({
  onNavigate,
}: {
  onNavigate: (selector: string) => void;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = ref.current;
    if (!header || prefersReducedMotion()) return;

    /* tema según la sección bajo el header */
    const sections = document.querySelectorAll<HTMLElement>("section[data-theme]");
    const triggers: ScrollTrigger[] = [];
    sections.forEach((section) => {
      triggers.push(
        ScrollTrigger.create({
          trigger: section,
          start: "top 40",
          end: "bottom 40",
          onToggle: (self) => {
            if (self.isActive) header.dataset.on = section.dataset.theme;
          },
        }),
      );
    });

    /* ocultar al bajar, mostrar al subir */
    let last = window.scrollY;
    let hidden = false;
    triggers.push(
      ScrollTrigger.create({
        start: "top top",
        end: "max",
        onUpdate: (self) => {
          const y = self.scroll();
          if (Math.abs(y - last) < 40) return;
          const down = y > last && y > 600;
          if (down !== hidden) {
            hidden = down;
            gsap.to(header, {
              yPercent: down ? -110 : 0,
              duration: DUR.m,
              ease: "Out",
            });
          }
          last = y;
        },
      }),
    );

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <header ref={ref} className={styles.root} data-on="dark">
      <button
        className={`${styles.logo} t-p3`}
        onClick={() => onNavigate("#inicio")}
        aria-label="Volver al inicio"
      >
        Usalatino <span className={styles.star}>✦</span> Prime
      </button>

      <nav className={styles.nav} aria-label="Secciones">
        {LINKS.map((link) => (
          <button
            key={link.target}
            className={`${styles.navLink} t-p6 swap-trigger`}
            onClick={() => onNavigate(link.target)}
          >
            <SwapText text={link.label} />
          </button>
        ))}
      </nav>

      <div className={styles.right}>
        <span className={`${styles.file} t-p6 t-muted`}>EXP № 2026-ULP</span>
        <button
          className="btn btn--gold"
          data-magnetic="30"
          onClick={() => onNavigate("#consulta")}
        >
          Solicita acceso
        </button>
      </div>
    </header>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, DUR, prefersReducedMotion } from "@/lib/gsap";
import { useLang, type Lang } from "@/lib/i18n";
import { scrollToTarget } from "@/lib/scroll-bus";
import SwapText from "@/components/fx/SwapText";
import styles from "./Header.module.css";

const LANGS: Lang[] = ["en", "es"];

export default function Header() {
  const { lang, dict, setLang } = useLang();
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
        onClick={() => scrollToTarget("#inicio")}
        aria-label="Usalatino Prime — top"
      >
        Usalatino <span className={styles.star}>✦</span> Prime
      </button>

      <nav className={styles.nav} aria-label="Sections">
        {dict.nav.links.map((link) => (
          <button
            key={link.target}
            className={`${styles.navLink} t-p6 swap-trigger`}
            onClick={() => scrollToTarget(link.target)}
          >
            <SwapText text={link.label} />
          </button>
        ))}
      </nav>

      <div className={styles.right}>
        <div className={styles.langs} role="group" aria-label="Language">
          {LANGS.map((code) => (
            <button
              key={code}
              className={`t-p6 ${styles.lang} ${lang === code ? styles.langActive : ""}`}
              aria-pressed={lang === code}
              onClick={() => setLang(code)}
            >
              {code.toUpperCase()}
            </button>
          ))}
        </div>
        <button
          className="btn btn--gold"
          data-magnetic="30"
          onClick={() => scrollToTarget("#consulta")}
        >
          {dict.nav.cta}
        </button>
      </div>
    </header>
  );
}

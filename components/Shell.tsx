"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, setupGsap, prefersReducedMotion } from "@/lib/gsap";
import {
  DICTS,
  LangContext,
  readStoredLang,
  storeLang,
  type Lang,
} from "@/lib/i18n";
import { registerLenis } from "@/lib/scroll-bus";
import {
  initReveals,
  initHighlights,
  initCounters,
  initParallax,
  revealAllStatic,
} from "@/lib/anim/reveals";
import { initMagnetic } from "@/lib/anim/magnetic";
import Preloader from "@/components/Preloader";
import LangModal from "@/components/LangModal";
import Header from "@/components/Header";
import Cursor from "@/components/fx/Cursor";
import ScrollProgress from "@/components/fx/ScrollProgress";

/**
 * Raíz cliente: idioma (modal de entrada + contexto), preloader con
 * compuerta de idioma, Lenis y animaciones declarativas.
 */
export default function Shell({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  /* null = aún no sabemos; false = primera visita (mostrar modal); true = elegido */
  const [chosen, setChosen] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const stored = readStoredLang();
    if (stored) {
      setLangState(stored);
      setChosen(true);
    } else {
      setChosen(false);
    }
  }, []);

  useEffect(() => {
    setupGsap();
    if (prefersReducedMotion()) {
      document.documentElement.classList.add("reduced-motion");
      if (mainRef.current) revealAllStatic(mainRef.current);
      return;
    }
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      touchMultiplier: 2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;
    registerLenis(lenis);
    lenis.stop();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      registerLenis(null);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const setLang = (next: Lang) => {
    setLangState(next);
    storeLang(next);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const handleChoose = (next: Lang) => {
    setLang(next);
    setChosen(true);
  };

  const handleReady = () => {
    setLoading(false);
    const scope = mainRef.current;
    if (scope && !prefersReducedMotion()) {
      initReveals(scope);
      initHighlights(scope);
      initCounters(scope);
      initParallax(scope);
      initMagnetic(scope);
    }
    lenisRef.current?.start();
    ScrollTrigger.refresh();
    window.dispatchEvent(new CustomEvent("app:ready"));
  };

  const ctx = useMemo(
    () => ({ lang, dict: DICTS[lang], setLang }),
    [lang],
  );

  return (
    <LangContext.Provider value={ctx}>
      {loading && <Preloader gate={chosen === true} onDone={handleReady} />}
      {chosen === false && <LangModal onChoose={handleChoose} />}
      <Cursor />
      <ScrollProgress />
      <Header />
      <div ref={mainRef}>{children}</div>
    </LangContext.Provider>
  );
}

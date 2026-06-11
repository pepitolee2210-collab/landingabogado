"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, setupGsap, prefersReducedMotion } from "@/lib/gsap";
import {
  initReveals,
  initHighlights,
  initCounters,
  initParallax,
  revealAllStatic,
} from "@/lib/anim/reveals";
import { initMagnetic } from "@/lib/anim/magnetic";
import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Cursor from "@/components/fx/Cursor";
import ScrollProgress from "@/components/fx/ScrollProgress";

/**
 * Raíz cliente: gestiona preloader, Lenis y la inicialización
 * de todas las animaciones declarativas una vez cargada la página.
 */
export default function Shell({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    setupGsap();
    const scope = mainRef.current;
    if (!scope) return;

    if (prefersReducedMotion()) {
      document.documentElement.classList.add("reduced-motion");
      revealAllStatic(scope);
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      touchMultiplier: 2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;
    lenis.stop();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

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

  const scrollTo = (selector: string) => {
    const lenis = lenisRef.current;
    if (lenis) lenis.scrollTo(selector, { duration: 1.6 });
    else document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {loading && <Preloader onDone={handleReady} />}
      <Cursor />
      <ScrollProgress />
      <Header onNavigate={scrollTo} />
      <div ref={mainRef}>{children}</div>
    </>
  );
}

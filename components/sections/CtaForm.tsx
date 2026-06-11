"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import DitherCanvas, { type DitherHandle } from "@/lib/dither/DitherCanvas";
import { ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import { IMG } from "@/lib/content";
import styles from "./CtaForm.module.css";

type Status = "idle" | "error" | "sent";

/** CTA principal: solicitar la llamada con Henry — card de papel con sello. */
export default function CtaForm() {
  const { dict } = useLang();
  const t = dict.cta;
  const [status, setStatus] = useState<Status>("idle");
  const rootRef = useRef<HTMLElement>(null);
  const archRef = useRef<DitherHandle>(null);

  /* el arco se levanta desde el suelo conforme entra la sección */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (prefersReducedMotion()) {
      archRef.current?.setLayer(0, { y: 0, h: 1 });
      return;
    }
    const st = ScrollTrigger.create({
      trigger: root,
      start: "top 80%",
      end: "top 15%",
      scrub: 0.5,
      onUpdate(self) {
        const p = self.progress;
        archRef.current?.setLayer(0, { y: 1 - p, h: p });
      },
    });
    return () => st.kill();
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const bar = String(data.get("bar") ?? "").trim();
    if (name.length < 2 || bar.length < 3) {
      setStatus("error");
      return;
    }
    /* Entrega real pendiente de backend (ver tasks/todo.md → Supabase). */
    setStatus("sent");
  };

  return (
    <section
      ref={rootRef}
      id="consulta"
      data-theme="dark"
      className={`${styles.root} shell`}
    >
      <DitherCanvas
        ref={archRef}
        src={IMG.arch}
        mode="dark"
        className={styles.arch}
        label={t.sceneLabel}
        layers={[
          { y: 1, h: 0, blackPoint: 60, whitePoint: 150, xSquares: 110, ySquares: 90, bgOpacity: 0 },
        ]}
      />
      <div className={styles.head}>
        <p className="section-label t-p6">{t.label}</p>
        <h2 className="t-h2" data-reveal="h">
          {t.titleA}
          <em>{t.titleEm}</em>
        </h2>
        <p className={`t-p4 t-muted ${styles.sub}`} data-reveal="p">
          {t.sub}
        </p>
        <p className={`t-p5 ${styles.direct}`} data-reveal="ctn">
          {t.direct}
        </p>
      </div>

      <div className={styles.paper} data-reveal="ctn" data-form-title={t.formTitle}>
        {status === "sent" ? (
          <div className={styles.sentBox} role="status">
            <span className={`${styles.stamp} t-p2`}>{t.sentStamp}</span>
            <p className="t-p4">{t.sentBody}</p>
            <p className="t-p6 t-muted">
              {t.sentFolio}
              {Date.now() % 10000}
            </p>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <label className={styles.field}>
              <span className="t-p6 t-muted">{t.fields.name}</span>
              <input
                name="name"
                type="text"
                required
                minLength={2}
                autoComplete="name"
                className={`t-p3 ${styles.input}`}
                placeholder={t.fields.namePh}
              />
            </label>
            <label className={styles.field}>
              <span className="t-p6 t-muted">{t.fields.email}</span>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                className={`t-p3 ${styles.input}`}
                placeholder={t.fields.emailPh}
              />
            </label>
            <label className={styles.field}>
              <span className="t-p6 t-muted">{t.fields.bar}</span>
              <input
                name="bar"
                type="text"
                required
                minLength={3}
                className={`t-p3 ${styles.input}`}
                placeholder={t.fields.barPh}
              />
            </label>
            <label className={styles.field}>
              <span className="t-p6 t-muted">{t.fields.time}</span>
              <select name="time" className={`t-p3 ${styles.input}`}>
                {t.fields.times.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </label>
            {status === "error" && (
              <p className={`t-p5 t-stamp`} role="alert">
                {t.error}
              </p>
            )}
            <button
              type="submit"
              className={`btn ${styles.submit}`}
              data-magnetic="20"
            >
              {t.submit}
            </button>
            <p className="t-p6 t-muted">{t.privacy}</p>
          </form>
        )}
      </div>
    </section>
  );
}

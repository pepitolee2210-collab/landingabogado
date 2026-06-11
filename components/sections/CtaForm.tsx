"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import DitherCanvas, { type DitherHandle } from "@/lib/dither/DitherCanvas";
import { ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { IMG, PRACTICE_AREAS } from "@/lib/content";
import styles from "./CtaForm.module.css";

type Status = "idle" | "error" | "sent";

/** CTA principal: solicitud de acreditación — card de papel con sello. */
export default function CtaForm() {
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
        label="Arco Delicado de Utah en arte de tramas"
        layers={[
          { y: 1, h: 0, blackPoint: 60, whitePoint: 150, xSquares: 110, ySquares: 90, bgOpacity: 0 },
        ]}
      />
      <div className={styles.head}>
        <p className="section-label t-p6">Solicitud de acreditación</p>
        <h2 className="t-h2" data-reveal="h">
          Tu lugar en la red está <em>abierto</em>
        </h2>
        <p className={`t-p4 t-muted ${styles.sub}`} data-reveal="p">
          Cupos por cohortes: verificamos cada licencia, porque la red vale lo
          que valen sus abogados. Respuesta en menos de 72 horas.
        </p>
      </div>

      <div className={styles.paper} data-reveal="ctn">
        {status === "sent" ? (
          <div className={styles.sentBox} role="status">
            <span className={`${styles.stamp} t-p2`}>En cola</span>
            <p className="t-p4">
              Tu solicitud entró a la cola de acreditación. Verificamos tu
              licencia y te contactamos en menos de 72 horas.
            </p>
            <p className="t-p6 t-muted">Folio AB-2026-{Date.now() % 10000}</p>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <label className={styles.field}>
              <span className="t-p6 t-muted">01 — Nombre completo</span>
              <input
                name="name"
                type="text"
                required
                minLength={2}
                autoComplete="name"
                className={`t-p3 ${styles.input}`}
                placeholder="Escribe aquí"
              />
            </label>
            <label className={styles.field}>
              <span className="t-p6 t-muted">02 — Email profesional</span>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                className={`t-p3 ${styles.input}`}
                placeholder="tu@bufete.com"
              />
            </label>
            <label className={styles.field}>
              <span className="t-p6 t-muted">
                03 — Nº de licencia (bar) y estado
              </span>
              <input
                name="bar"
                type="text"
                required
                minLength={3}
                className={`t-p3 ${styles.input}`}
                placeholder="Ej. 123456 — Texas"
              />
            </label>
            <label className={styles.field}>
              <span className="t-p6 t-muted">04 — Área de práctica principal</span>
              <select name="area" className={`t-p3 ${styles.input}`}>
                {PRACTICE_AREAS.map((area) => (
                  <option key={area.id} value={area.id}>
                    {area.label}
                  </option>
                ))}
              </select>
            </label>
            {status === "error" && (
              <p className={`t-p5 t-stamp`} role="alert">
                [ ! ] Revisa tu nombre y número de licencia — sin ellos no
                podemos acreditarte.
              </p>
            )}
            <button type="submit" className={`btn ${styles.submit}`} data-magnetic="20">
              Solicitar acceso →
            </button>
            <p className="t-p6 t-muted">
              Datos protegidos. Solo usamos tu licencia para la verificación.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

"use client";

import type { Lang } from "@/lib/i18n";
import styles from "./LangModal.module.css";

/**
 * Modal de idioma — aparece sobre el preloader en la primera visita.
 * El inglés va primero: la mayoría de los abogados son estadounidenses.
 */
export default function LangModal({
  onChoose,
}: {
  onChoose: (lang: Lang) => void;
}) {
  return (
    <div
      className={styles.root}
      role="dialog"
      aria-modal="true"
      aria-label="Choose your language / Elige tu idioma"
    >
      <div className={styles.card}>
        <p className="t-p6 t-muted">Usalatino ✦ Prime</p>
        <h2 className={`t-h4 ${styles.title}`}>
          Choose your <em>language</em>
        </h2>
        <p className={`t-p5 t-muted ${styles.alt}`}>Elige tu idioma</p>
        <div className={styles.buttons}>
          <button
            className="btn btn--gold"
            onClick={() => onChoose("en")}
            autoFocus
          >
            English →
          </button>
          <button className={`btn ${styles.btnEs}`} onClick={() => onChoose("es")}>
            Español →
          </button>
        </div>
        <p className={`t-p6 t-muted ${styles.note}`}>
          You can switch anytime · Puedes cambiarlo cuando quieras
        </p>
      </div>
    </div>
  );
}

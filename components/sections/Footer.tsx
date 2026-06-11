"use client";

import DitherCanvas from "@/lib/dither/DitherCanvas";
import Marquee from "@/components/fx/Marquee";
import { useLang } from "@/lib/i18n";
import { CONTACT, FORM_CODES, IMG } from "@/lib/content";
import styles from "./Footer.module.css";

/** Cierre: marquee de formularios, mazo en tramas y contactos gigantes. */
export default function Footer() {
  const { dict } = useLang();
  const t = dict.footer;

  return (
    <footer data-theme="dark" className={styles.root}>
      <Marquee items={FORM_CODES} />

      <div className={`${styles.body} shell`}>
        <div className={styles.cols}>
          <div className={styles.col}>
            <p className="t-p6 t-muted">{t.network}</p>
            {t.networkItems.map((item) => (
              <p key={item} className="t-p5">
                {item}
              </p>
            ))}
          </div>
          <div className={`${styles.col} ${styles.colRight}`}>
            <p className="t-p6 t-muted">{t.follow}</p>
            <a className="t-p5 link-rule" href="https://linkedin.com" rel="noreferrer" target="_blank">
              LinkedIn
            </a>
            <a className="t-p5 link-rule" href="https://instagram.com" rel="noreferrer" target="_blank">
              Instagram
            </a>
            <a className="t-p5 link-rule" href="https://facebook.com" rel="noreferrer" target="_blank">
              Facebook
            </a>
          </div>
        </div>

        <DitherCanvas
          src={IMG.footer}
          mode="dark"
          className={styles.scene}
          label={t.sceneLabel}
          layers={[
            { blackPoint: 60, whitePoint: 150, xSquares: 150, ySquares: 100, bgOpacity: 0 },
          ]}
        />

        <div className={styles.contacts}>
          <a className={`t-h3 ${styles.contact} link-rule`} href={CONTACT.phoneHref}>
            {CONTACT.phone}
          </a>
          <a className={`t-h3 ${styles.contact} link-rule`} href={CONTACT.emailHref}>
            {CONTACT.email}
          </a>
        </div>
      </div>

      <p className={`t-wordmark ${styles.outro} shell`} data-reveal="chars">
        Usalatino <span className={styles.outroStar}>✦</span> Prime
      </p>

      <div className={`${styles.legal} shell`}>
        <span className="t-p6 t-muted">{t.copyright}</span>
        <span className={`t-p6 t-muted ${styles.disclaimer}`}>{t.disclaimer}</span>
        <span className="t-p6 t-muted">EXP № 2026-ULP</span>
      </div>

      <div className={styles.fence} aria-hidden="true" />
    </footer>
  );
}

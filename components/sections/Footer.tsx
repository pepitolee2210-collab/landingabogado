import DitherCanvas from "@/lib/dither/DitherCanvas";
import Marquee from "@/components/fx/Marquee";
import { CONTACT, FORM_CODES, IMG } from "@/lib/content";
import styles from "./Footer.module.css";

/** Cierre: marquee de formularios, contactos gigantes y arte dither final. */
export default function Footer() {
  return (
    <footer data-theme="dark" className={styles.root}>
      <Marquee items={FORM_CODES} />

      <div className={`${styles.body} shell`}>
        <div className={styles.cols}>
          <div className={styles.col}>
            <p className="t-p6 t-muted">La red</p>
            {CONTACT.offices.map((office) => (
              <p key={office} className="t-p5">
                {office}
              </p>
            ))}
          </div>
          <div className={`${styles.col} ${styles.colRight}`}>
            <p className="t-p6 t-muted">Síguenos</p>
            <a className="t-p5 link-rule" href="https://instagram.com" rel="noreferrer" target="_blank">
              Instagram
            </a>
            <a className="t-p5 link-rule" href="https://facebook.com" rel="noreferrer" target="_blank">
              Facebook
            </a>
            <a className="t-p5 link-rule" href="https://tiktok.com" rel="noreferrer" target="_blank">
              TikTok
            </a>
          </div>
        </div>

        <DitherCanvas
          src={IMG.footer}
          mode="dark"
          className={styles.scene}
          label="Firma de documentos en arte de tramas"
          layers={[
            { blackPoint: 40, whitePoint: 230, xSquares: 150, ySquares: 100, bgOpacity: 0 },
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
        <span className="t-p6 t-muted">© 2026 Usalatino Prime · Utah</span>
        <span className={`t-p6 t-muted ${styles.disclaimer}`}>
          Plataforma de revisión profesional — requiere licencia activa
        </span>
        <span className="t-p6 t-muted">EXP № 2026-ULP</span>
      </div>

      <div className={styles.fence} aria-hidden="true" />
    </footer>
  );
}

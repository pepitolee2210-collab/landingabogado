import styles from "./RotatingBadge.module.css";

/** Insignia circular con texto rotatorio (firma del original). */
export default function RotatingBadge({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const repeated = `${text} · ${text} · `;
  return (
    <div className={`${styles.root} ${className ?? ""}`} aria-hidden="true">
      <svg viewBox="0 0 100 100" className={styles.spin}>
        <defs>
          <path
            id="badge-circle"
            d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
          />
        </defs>
        <text className={styles.text}>
          <textPath href="#badge-circle">{repeated}</textPath>
        </text>
      </svg>
      <span className={styles.star}>✦</span>
    </div>
  );
}

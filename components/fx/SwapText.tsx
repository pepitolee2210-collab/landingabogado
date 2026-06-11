import styles from "./SwapText.module.css";

/**
 * Texto con intercambio de caracteres al hover (firma de sondaven):
 * dos copias apiladas; cada char sube con un delay escalonado.
 * El padre debe tener la clase global "swap-trigger".
 */
export default function SwapText({ text }: { text: string }) {
  const chars = [...text];
  const row = (cls: string) => (
    <span className={cls} aria-hidden="true">
      {chars.map((c, i) => (
        <span
          key={i}
          className={styles.char}
          style={{ transitionDelay: `${i * 22}ms` }}
        >
          {c === " " ? " " : c}
        </span>
      ))}
    </span>
  );
  return (
    <span className={styles.root} aria-label={text}>
      {row(styles.rowA)}
      {row(`${styles.rowA} ${styles.rowB}`)}
    </span>
  );
}

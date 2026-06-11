import DitherCanvas from "@/lib/dither/DitherCanvas";
import { IMG } from "@/lib/content";
import styles from "./Prologue.module.css";

/** Cita editorial con highlight por scroll sobre escena dither. */
export default function Prologue() {
  return (
    <section data-theme="dark" className={`${styles.root} shell`}>
      <DitherCanvas
        src={IMG.prologue}
        mode="dark"
        className={styles.scene}
        layers={[
          { y: 0.55, h: 0.45, blackPoint: 60, whitePoint: 150, xSquares: 150, ySquares: 70, bgOpacity: 0 },
        ]}
      />
      <p className="section-label t-p6">Prólogo</p>
      <blockquote className={`t-quote ${styles.quote}`} data-highlight>
        “Detrás de cada expediente hay una familia que espera. La tecnología
        prepara el caso, lo ordena y lo analiza — pero solo la firma de un
        abogado lo <em>hace contar</em>. Buscamos a los abogados que firman.”
      </blockquote>
      <p className={`t-p5 t-muted ${styles.sign}`} data-reveal="ctn">
        — Fundador, Usalatino Prime · Salt Lake City
      </p>
    </section>
  );
}

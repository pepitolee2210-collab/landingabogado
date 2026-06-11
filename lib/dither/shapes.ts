/**
 * Storyboard de arte procedural — todas las escenas dither de la landing
 * se dibujan a código (sin fotos), tematizadas en la abogacía y Utah:
 *
 *   Hero      → balanza de la justicia (procedural:scales)
 *   Visión    → multitud de la comunidad (procedural:crowd)
 *   Manifesto → cordillera Wasatch (ridge genérico)
 *   Stats     → colmena de Utah (procedural:beehive)
 *   CTA       → Arco Delicado (procedural:arch)
 *   Footer    → mazo de juez (procedural:gavel)
 */

type Ctx = CanvasRenderingContext2D;

export function paintSky(ctx: Ctx, W: number, H: number, to = "#c8c8c8") {
  const sky = ctx.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0, "#ffffff");
  sky.addColorStop(1, to);
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);
}

/** Balanza de la justicia — el hero de la convocatoria. */
export function drawScales(ctx: Ctx, W: number, H: number) {
  paintSky(ctx, W, H);
  ctx.fillStyle = "#3a3a3a";
  ctx.strokeStyle = "#3a3a3a";
  const cx = W / 2;

  ctx.beginPath();
  ctx.arc(cx, H * 0.085, W * 0.02, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(cx - W * 0.013, H * 0.1, W * 0.026, H * 0.62);
  ctx.fillRect(cx - W * 0.31, H * 0.155, W * 0.62, H * 0.018);

  for (const side of [-1, 1]) {
    const px = cx + side * W * 0.31;
    ctx.lineWidth = Math.max(2, W * 0.004);
    for (const dx of [-0.07, 0.07]) {
      ctx.beginPath();
      ctx.moveTo(px, H * 0.17);
      ctx.lineTo(px + dx * W, H * 0.4);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.ellipse(px, H * 0.4, W * 0.085, H * 0.014, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(px, H * 0.4, W * 0.085, 0, Math.PI);
    ctx.fill();
  }

  ctx.beginPath();
  ctx.moveTo(cx - W * 0.1, H * 0.72);
  ctx.lineTo(cx + W * 0.1, H * 0.72);
  ctx.lineTo(cx + W * 0.17, H * 0.8);
  ctx.lineTo(cx - W * 0.17, H * 0.8);
  ctx.closePath();
  ctx.fill();
  ctx.fillRect(cx - W * 0.22, H * 0.8, W * 0.44, H * 0.028);
}

/** Multitud — la comunidad latina a la que sirve la red (con profundidad por filas). */
export function drawCrowd(ctx: Ctx, W: number, H: number) {
  paintSky(ctx, W, H, "#e2e2e2");
  let seed = 7;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const rows: Array<{ y: number; r: number; shade: number }> = [
    { y: 0.52, r: 0.026, shade: 150 },
    { y: 0.62, r: 0.034, shade: 120 },
    { y: 0.74, r: 0.044, shade: 92 },
    { y: 0.88, r: 0.058, shade: 70 },
  ];
  for (const row of rows) {
    const g = `rgb(${row.shade},${row.shade},${row.shade})`;
    ctx.fillStyle = g;
    let x = -rand() * 0.05 * W;
    while (x < W * 1.05) {
      const r = row.r * H * (0.85 + rand() * 0.4);
      const headY = row.y * H;
      ctx.beginPath();
      ctx.arc(x, headY, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x, headY + r * 2.1, r * 1.9, Math.PI, 0);
      ctx.fill();
      ctx.fillRect(x - r * 1.9, headY + r * 2.1, r * 3.8, H - headY);
      x += r * (2.1 + rand() * 1.4);
    }
  }
}

/** Mazo de juez — el cierre del footer. */
export function drawGavel(ctx: Ctx, W: number, H: number) {
  paintSky(ctx, W, H);
  ctx.fillStyle = "#3a3a3a";

  ctx.save();
  ctx.translate(W * 0.44, H * 0.42);
  ctx.rotate(-Math.PI / 5.5);
  ctx.fillRect(-W * 0.025, -H * 0.05, W * 0.05, H * 0.52);
  ctx.fillRect(-W * 0.1, -H * 0.21, W * 0.2, H * 0.17);
  ctx.fillRect(-W * 0.125, -H * 0.23, W * 0.05, H * 0.21);
  ctx.fillRect(W * 0.075, -H * 0.23, W * 0.05, H * 0.21);
  ctx.restore();

  ctx.beginPath();
  ctx.ellipse(W * 0.68, H * 0.78, W * 0.16, H * 0.035, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(W * 0.52, H * 0.78, W * 0.32, H * 0.07);
  ctx.beginPath();
  ctx.ellipse(W * 0.68, H * 0.85, W * 0.16, H * 0.035, 0, 0, Math.PI * 2);
  ctx.fill();
}

/**
 * Carga de texturas para DitherCanvas con fallback procedural:
 * si la imagen remota falla, se genera un "paisaje" abstracto en canvas 2D
 * para que la escena dither nunca quede vacía.
 */

import { drawCrowd, drawGavel, drawScales } from "./shapes";

export type TextureSource = {
  source: TexImageSource;
  width: number;
  height: number;
};

/** Renderiza una forma del storyboard; `noise` rompe siluetas planas en tramas. */
function shapeTexture(
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void,
  W: number,
  H: number,
  noise: boolean,
): TextureSource {
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;
  draw(ctx, W, H);
  if (noise) noisify(ctx, W, H);
  return { source: canvas, width: W, height: H };
}

export function loadImageTexture(src: string): Promise<TextureSource> {
  if (src.startsWith("procedural:")) {
    if (src.includes("arch")) return Promise.resolve(archTexture());
    if (src.includes("beehive")) return Promise.resolve(beehiveTexture());
    if (src.includes("scales")) return Promise.resolve(shapeTexture(drawScales, 640, 800, true));
    if (src.includes("crowd")) return Promise.resolve(shapeTexture(drawCrowd, 880, 480, false));
    if (src.includes("gavel")) return Promise.resolve(shapeTexture(drawGavel, 640, 480, true));
    return Promise.resolve(proceduralTexture(src));
  }
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () =>
      resolve({ source: img, width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = () => resolve(proceduralTexture(src));
    img.src = src;
  });
}

function makeCanvas(w: number, h: number) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  return { canvas, ctx: canvas.getContext("2d")! };
}

/**
 * Rompe las zonas oscuras con ruido de tono medio: si la silueta es
 * uniforme y muy oscura, todas las barras salen al 100% y se funden
 * en una masa sólida — el ruido devuelve la textura de tramas.
 */
function noisify(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const img = ctx.getImageData(0, 0, w, h);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    if (d[i] < 200) {
      const v = 70 + Math.random() * 70;
      d[i] = d[i + 1] = d[i + 2] = v;
    }
  }
  ctx.putImageData(img, 0, 0);
}

/** Silueta del Arco Delicado (Utah) — patrimonio dibujado a código. */
export function archTexture(): TextureSource {
  const W = 640;
  const H = 480;
  const { canvas, ctx } = makeCanvas(W, H);

  const sky = ctx.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0, "#ffffff");
  sky.addColorStop(1, "#cfcfcf");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = "#2a2a2a";
  ctx.fillRect(0, H * 0.86, W, H * 0.14);

  ctx.beginPath();
  ctx.moveTo(W * 0.2, H * 0.88);
  ctx.bezierCurveTo(W * 0.16, H * 0.42, W * 0.3, H * 0.18, W * 0.5, H * 0.16);
  ctx.bezierCurveTo(W * 0.7, H * 0.14, W * 0.8, H * 0.3, W * 0.78, H * 0.88);
  ctx.lineTo(W * 0.64, H * 0.88);
  ctx.bezierCurveTo(W * 0.68, H * 0.42, W * 0.62, H * 0.32, W * 0.5, H * 0.32);
  ctx.bezierCurveTo(W * 0.36, H * 0.32, W * 0.32, H * 0.5, W * 0.34, H * 0.88);
  ctx.closePath();
  ctx.fill();

  noisify(ctx, W, H);
  return { source: canvas, width: W, height: H };
}

/** Colmena de Utah ("Industry") — silueta de skep apilado. */
export function beehiveTexture(): TextureSource {
  const W = 480;
  const H = 480;
  const { canvas, ctx } = makeCanvas(W, H);

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#2a2a2a";

  const cx = W / 2;
  const rows: Array<[number, number]> = [
    [0.18, 0.2],
    [0.3, 0.34],
    [0.42, 0.42],
    [0.56, 0.46],
    [0.7, 0.44],
    [0.82, 0.38],
  ];
  for (const [cy, rw] of rows) {
    ctx.beginPath();
    ctx.ellipse(cx, cy * H, rw * W, 0.085 * H, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(cx, H * 0.72, W * 0.085, Math.PI, 0);
  ctx.rect(cx - W * 0.085, H * 0.72, W * 0.17, H * 0.1);
  ctx.fill();

  noisify(ctx, W, H);
  return { source: canvas, width: W, height: H };
}

/** Paisaje abstracto determinista (semilla = string src) en tonos de gris. */
export function proceduralTexture(seed: string): TextureSource {
  const W = 640;
  const H = 480;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  let s = 0;
  for (const ch of seed) s = (s * 31 + ch.charCodeAt(0)) % 2147483647;
  const rand = () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };

  const sky = ctx.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0, "#fafafa");
  sky.addColorStop(1, "#9a9a9a");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);

  for (let m = 0; m < 3; m++) {
    const base = H * (0.45 + m * 0.18);
    const shade = 140 - m * 45;
    ctx.fillStyle = `rgb(${shade},${shade},${shade})`;
    ctx.beginPath();
    ctx.moveTo(0, H);
    let y = base;
    for (let x = 0; x <= W; x += 16) {
      y += (rand() - 0.5) * 36;
      y = Math.min(Math.max(y, base - 70), base + 70);
      ctx.lineTo(x, y);
    }
    ctx.lineTo(W, H);
    ctx.closePath();
    ctx.fill();
  }

  return { source: canvas, width: W, height: H };
}

export function uploadTexture(
  gl: WebGLRenderingContext,
  tex: TextureSource,
): WebGLTexture | null {
  const texture = gl.createTexture();
  if (!texture) return null;
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, tex.source);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  return texture;
}

/** Escala/offset UV para que la textura cubra los bounds sin deformarse (cover). */
export function coverUv(
  texW: number,
  texH: number,
  boundsW: number,
  boundsH: number,
): { scale: [number, number]; offset: [number, number] } {
  const texAspect = texW / texH;
  const boundsAspect = boundsW / boundsH;
  if (texAspect > boundsAspect) {
    const sx = boundsAspect / texAspect;
    return { scale: [sx, 1], offset: [(1 - sx) / 2, 0] };
  }
  const sy = texAspect / boundsAspect;
  return { scale: [1, sy], offset: [0, (1 - sy) / 2] };
}

"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import {
  compileProgram,
  getUniforms,
  hexToRgb,
  type UniformMap,
} from "./shader";
import { coverUv, loadImageTexture, uploadTexture } from "./texture";

export type DitherLayer = {
  /** bounds como fracciones 0..1 del canvas (desde arriba-izquierda) */
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  gamma?: number;
  blackPoint?: number;
  whitePoint?: number;
  threshold?: number;
  xSquares?: number;
  ySquares?: number;
  bgOpacity?: number;
  fillOpacity?: number;
  /** intercambia tinta/papel en esta capa */
  invert?: boolean;
  /** pinta las barras en dorado Utah */
  gold?: boolean;
};

type Props = {
  src: string;
  /** tema del fondo donde vive el canvas: decide qué color es fondo y cuál barra */
  mode?: "dark" | "light";
  layers?: DitherLayer[];
  /** bandas glitch aleatorias intermitentes (firma del original) */
  glitch?: boolean;
  /** bandas glitch que siguen al cursor dentro del canvas */
  interactive?: boolean;
  className?: string;
  label?: string;
};

/** API imperativa para animar capas con GSAP/ScrollTrigger (firma del original). */
export type DitherHandle = {
  setLayer: (index: number, patch: Partial<DitherLayer>) => void;
  render: () => void;
};

const DPR_CAP = 1.5;
const GLITCH_VISIBLE_MS = 130;

const DitherCanvas = forwardRef<DitherHandle, Props>(function DitherCanvas(
  {
    src,
    mode = "dark",
    layers = [{}],
    glitch = false,
    interactive = false,
    className,
    label,
  },
  handleRef,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const layersRef = useRef<DitherLayer[]>(layers.map((l) => ({ ...l })));
  const renderRef = useRef<() => void>(() => {});

  useImperativeHandle(handleRef, () => ({
    setLayer(index, patch) {
      const layer = layersRef.current[index];
      if (layer) Object.assign(layer, patch);
      renderRef.current();
    },
    render: () => renderRef.current(),
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      premultipliedAlpha: false,
      powerPreference: "high-performance",
    });
    if (!gl) return;

    const program = compileProgram(gl);
    if (!program) return;
    gl.useProgram(program);

    const uniforms = getUniforms(gl, program);
    const aPos = gl.getAttribLocation(program, "a_position");
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const css = getComputedStyle(document.documentElement);
    const paper = hexToRgb(css.getPropertyValue("--paper").trim() || "#f2ead3");
    const ink = hexToRgb(css.getPropertyValue("--ink").trim() || "#0f2148");
    const gold = hexToRgb(css.getPropertyValue("--gold").trim() || "#f3b229");
    const baseBg = mode === "dark" ? ink : paper;
    const baseFill = mode === "dark" ? paper : ink;

    let texW = 1;
    let texH = 1;
    let ready = false;
    let visible = false;
    let glitchLayers: DitherLayer[] = [];
    let hoverLayers: DitherLayer[] = [];
    let glitchTimer: ReturnType<typeof setTimeout> | null = null;
    let hoverTimer: ReturnType<typeof setTimeout> | null = null;
    let destroyed = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const drawLayer = (layer: DitherLayer, W: number, H: number) => {
      const { x = 0, y = 0, w = 1, h = 1 } = layer;
      const bx0 = x * W;
      const by1 = H - y * H;
      const bx1 = (x + w) * W;
      const by0 = H - (y + h) * H;
      const bw = bx1 - bx0;
      const bh = by1 - by0;
      if (bw <= 0 || bh <= 0) return;

      const gridX = layer.xSquares ?? 110;
      const gridY = layer.ySquares ?? 110;
      const cellW = bw / gridX;
      const bg = layer.invert ? baseFill : baseBg;
      const fill = layer.gold ? gold : layer.invert ? baseBg : baseFill;
      const uv = coverUv(texW, texH, bw, bh);

      gl.uniform2f(uniforms.u_gridSize, gridX, gridY);
      gl.uniform1f(uniforms.u_minWidth, -0.02 * cellW);
      gl.uniform1f(uniforms.u_maxWidth, 1.02 * cellW);
      gl.uniform1f(uniforms.u_threshold, layer.threshold ?? 255);
      gl.uniform1f(uniforms.u_gamma, layer.gamma ?? 1);
      gl.uniform1f(uniforms.u_blackPoint, layer.blackPoint ?? 0);
      gl.uniform1f(uniforms.u_whitePoint, layer.whitePoint ?? 255);
      gl.uniform3fv(uniforms.u_bgColor, bg);
      gl.uniform3fv(uniforms.u_fillColor, fill);
      gl.uniform1f(uniforms.u_bgOpacity, layer.bgOpacity ?? 1);
      gl.uniform1f(uniforms.u_fillOpacity, layer.fillOpacity ?? 1);
      gl.uniform4f(uniforms.u_bounds, bx0, by0, bx1, by1);
      gl.uniform2fv(uniforms.u_uvScale, uv.scale);
      gl.uniform2fv(uniforms.u_uvOffset, uv.offset);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const render = () => {
      if (!ready || destroyed) return;
      const W = canvas.width;
      const H = canvas.height;
      gl.viewport(0, 0, W, H);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      for (const layer of layersRef.current) drawLayer(layer, W, H);
      for (const layer of glitchLayers) drawLayer(layer, W, H);
      for (const layer of hoverLayers) drawLayer(layer, W, H);
    };
    renderRef.current = render;

    /* bandas que siguen al cursor: el visitante "interfiere" la señal */
    let hoverRaf = 0;
    const onPointerMove = (e: PointerEvent) => {
      if (destroyed || !visible || hoverRaf) return;
      hoverRaf = requestAnimationFrame(() => {
        hoverRaf = 0;
        const rect = canvas.getBoundingClientRect();
        const py = (e.clientY - rect.top) / rect.height;
        if (py < 0 || py > 1) return;
        hoverLayers = [
          { x: 0, w: 1, y: py - 0.012, h: 0.024, xSquares: 130, ySquares: 5, gold: true, bgOpacity: 0 },
          { x: 0, w: 1, y: py + 0.03, h: 0.012, xSquares: 170, ySquares: 4, invert: true, bgOpacity: 0 },
        ];
        render();
        if (hoverTimer) clearTimeout(hoverTimer);
        hoverTimer = setTimeout(() => {
          hoverLayers = [];
          render();
        }, 180);
      });
    };
    const interactiveOn =
      interactive && !reduced && window.matchMedia("(pointer: fine)").matches;
    if (interactiveOn) window.addEventListener("pointermove", onPointerMove);

    const scheduleGlitch = () => {
      if (destroyed || reduced || !glitch) return;
      const delay = 700 + Math.random() * 1800;
      glitchTimer = setTimeout(() => {
        if (destroyed || !visible) {
          scheduleGlitch();
          return;
        }
        glitchLayers = Array.from(
          { length: 1 + Math.floor(Math.random() * 2) },
          () => ({
            x: Math.random() * 0.55,
            y: Math.random() * 0.9,
            w: 0.3 + Math.random() * 0.45,
            h: 0.015 + Math.random() * 0.05,
            xSquares: 90 + Math.floor(Math.random() * 80),
            ySquares: 6,
            invert: Math.random() > 0.6,
            gold: Math.random() > 0.55,
            bgOpacity: 0,
          }),
        );
        render();
        glitchTimer = setTimeout(() => {
          glitchLayers = [];
          render();
          scheduleGlitch();
        }, GLITCH_VISIBLE_MS);
      }, delay);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
      const w = Math.round(canvas.offsetWidth * dpr);
      const h = Math.round(canvas.offsetHeight * dpr);
      if (w === 0 || h === 0 || (canvas.width === w && canvas.height === h)) return;
      canvas.width = w;
      canvas.height = h;
      render();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? false;
        if (visible) render();
      },
      { rootMargin: "20% 0px 20% 0px", threshold: 0.01 },
    );
    io.observe(canvas);

    loadImageTexture(src).then((tex) => {
      if (destroyed) return;
      const texture = uploadTexture(gl, tex);
      if (!texture) return;
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.uniform1i(uniforms.u_texture, 0);
      texW = tex.width;
      texH = tex.height;
      ready = true;
      canvas.dispatchEvent(new CustomEvent("dither:ready", { bubbles: true }));
      resize();
      render();
      scheduleGlitch();
    });

    return () => {
      destroyed = true;
      renderRef.current = () => {};
      if (glitchTimer) clearTimeout(glitchTimer);
      if (hoverTimer) clearTimeout(hoverTimer);
      if (hoverRaf) cancelAnimationFrame(hoverRaf);
      if (interactiveOn) window.removeEventListener("pointermove", onPointerMove);
      ro.disconnect();
      io.disconnect();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, mode, glitch, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      role={label ? "img" : "presentation"}
      aria-label={label}
    />
  );
});

export default DitherCanvas;

/**
 * Shader del efecto dither "barras verticales" (port del original de sondaven).
 * Cada celda de la grilla dibuja una barra centrada cuyo ancho es
 * proporcional a la oscuridad de la imagen en ese punto.
 */

export const VERTEX_SRC = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

export const FRAGMENT_SRC = `
precision mediump float;
uniform sampler2D u_texture;
uniform vec2 u_gridSize;
uniform float u_minWidth;
uniform float u_maxWidth;
uniform float u_threshold;
uniform float u_gamma;
uniform float u_blackPoint;
uniform float u_whitePoint;
uniform vec3 u_bgColor;
uniform vec3 u_fillColor;
uniform float u_bgOpacity;
uniform float u_fillOpacity;
uniform vec4 u_bounds;
uniform vec2 u_uvScale;
uniform vec2 u_uvOffset;

void main() {
  vec2 p = gl_FragCoord.xy;
  vec2 b0 = u_bounds.xy;
  vec2 b1 = u_bounds.zw;
  if (p.x < b0.x || p.x > b1.x || p.y < b0.y || p.y > b1.y) discard;

  vec2 lc = (p - b0) / (b1 - b0);
  vec2 cs = 1.0 / u_gridSize;
  vec2 ci = floor(lc / cs);
  vec2 cc = (ci + 0.5) * cs;

  vec4 tc = texture2D(u_texture, cc * u_uvScale + u_uvOffset);
  if (tc.a < 0.01) discard;

  vec3 rgb = tc.rgb;
  if (u_gamma != 1.0) rgb = pow(rgb, vec3(u_gamma));
  float range = u_whitePoint - u_blackPoint;
  if (range != 0.0) {
    rgb = clamp((rgb * 255.0 - u_blackPoint) / range, 0.0, 1.0);
  }

  float br = dot(rgb, vec3(0.333)) * tc.a;
  if (br > u_threshold / 255.0) {
    gl_FragColor = vec4(u_bgColor, u_bgOpacity);
    return;
  }

  vec2 cl = (lc - ci * cs) / cs;
  float lw = ((1.0 - br) * (u_maxWidth - u_minWidth) + u_minWidth)
    / (b1.x - b0.x) * u_gridSize.x;

  gl_FragColor = abs(cl.x - 0.5) < lw * 0.5
    ? vec4(u_fillColor, u_fillOpacity)
    : vec4(u_bgColor, u_bgOpacity);
}
`;

export function compileProgram(gl: WebGLRenderingContext): WebGLProgram | null {
  const compile = (type: number, src: string) => {
    const sh = gl.createShader(type);
    if (!sh) return null;
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      gl.deleteShader(sh);
      return null;
    }
    return sh;
  };
  const vs = compile(gl.VERTEX_SHADER, VERTEX_SRC);
  const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT_SRC);
  if (!vs || !fs) return null;
  const prog = gl.createProgram();
  if (!prog) return null;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  return prog;
}

export type UniformMap = Record<string, WebGLUniformLocation | null>;

export const UNIFORM_NAMES = [
  "u_texture",
  "u_gridSize",
  "u_minWidth",
  "u_maxWidth",
  "u_threshold",
  "u_gamma",
  "u_blackPoint",
  "u_whitePoint",
  "u_bgColor",
  "u_fillColor",
  "u_bgOpacity",
  "u_fillOpacity",
  "u_bounds",
  "u_uvScale",
  "u_uvOffset",
] as const;

export function getUniforms(
  gl: WebGLRenderingContext,
  prog: WebGLProgram,
): UniformMap {
  const map: UniformMap = {};
  for (const name of UNIFORM_NAMES) {
    map[name] = gl.getUniformLocation(prog, name);
  }
  return map;
}

export function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "").trim();
  const full =
    h.length === 3 ? h[0] + h[0] + h[1] + h[1] + h[2] + h[2] : h;
  return [
    parseInt(full.slice(0, 2), 16) / 255,
    parseInt(full.slice(2, 4), 16) / 255,
    parseInt(full.slice(4, 6), 16) / 255,
  ];
}

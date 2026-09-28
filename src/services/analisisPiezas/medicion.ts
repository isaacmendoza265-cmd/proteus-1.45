/**
 * MEDICIÓN de piezas (imagen y video): cálculos deterministas, sin IA. Mismo resultado siempre.
 * Es la capa "Medido" del análisis; lo que interpreta Gemini va aparte y se marca "Estimado".
 *
 * Color: sRGB → CIELAB (D65) y diferencia ΔE2000 (CIE 2000). Paleta por k-means con semilla fija.
 * Contraste: fórmula de WCAG 2.x. Temperatura: aproximación de McCamy desde xy de CIE 1931.
 * Composición: energía de bordes (Sobel) por tercios, y cercanía del centro de masa visual a los
 * puntos fuertes de la regla de tercios. Video: cortes por distancia entre histogramas de fotogramas.
 */

export type RGB = [number, number, number];
export type Lab = [number, number, number];

// ---------- Conversión de color ------------------------------------------------------------------

const lin = (c: number) => { const v = c / 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };

export function rgbAXyz([r, g, b]: RGB): [number, number, number] {
  const R = lin(r), G = lin(g), B = lin(b);
  return [0.4124564 * R + 0.3575761 * G + 0.1804375 * B, 0.2126729 * R + 0.7151522 * G + 0.072175 * B, 0.0193339 * R + 0.119192 * G + 0.9503041 * B];
}

export function rgbALab(rgb: RGB): Lab {
  const [x, y, z] = rgbAXyz(rgb);
  const f = (t: number) => (t > 216 / 24389 ? Math.cbrt(t) : (24389 / 27 * t + 16) / 116);
  const fx = f(x / 0.95047), fy = f(y / 1.0), fz = f(z / 1.08883);
  return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)];
}

export function hexARgb(hex: string): RGB | null {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export const rgbAHex = ([r, g, b]: RGB) => `#${[r, g, b].map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('')}`.toUpperCase();

/** ΔE2000 (Sharma, Wu y Dalal, 2005). < 2: casi imperceptible; 2-10: perceptible; > 10: otro color */
export function deltaE2000([L1, a1, b1]: Lab, [L2, a2, b2]: Lab): number {
  const rad = Math.PI / 180;
  const C1 = Math.hypot(a1, b1), C2 = Math.hypot(a2, b2);
  const Cm = (C1 + C2) / 2;
  const G = 0.5 * (1 - Math.sqrt(Cm ** 7 / (Cm ** 7 + 25 ** 7)));
  const a1p = (1 + G) * a1, a2p = (1 + G) * a2;
  const C1p = Math.hypot(a1p, b1), C2p = Math.hypot(a2p, b2);
  const h = (a: number, b: number) => { if (a === 0 && b === 0) return 0; const t = Math.atan2(b, a) / rad; return t < 0 ? t + 360 : t; };
  const h1p = h(a1p, b1), h2p = h(a2p, b2);
  const dLp = L2 - L1, dCp = C2p - C1p;
  let dhp = 0;
  if (C1p * C2p !== 0) { dhp = h2p - h1p; if (dhp > 180) dhp -= 360; else if (dhp < -180) dhp += 360; }
  const dHp = 2 * Math.sqrt(C1p * C2p) * Math.sin((dhp / 2) * rad);
  const Lm = (L1 + L2) / 2, Cmp = (C1p + C2p) / 2;
  let hm = h1p + h2p;
  if (C1p * C2p !== 0) { if (Math.abs(h1p - h2p) > 180) hm += h1p + h2p < 360 ? 360 : -360; hm /= 2; }
  const T = 1 - 0.17 * Math.cos((hm - 30) * rad) + 0.24 * Math.cos(2 * hm * rad) + 0.32 * Math.cos((3 * hm + 6) * rad) - 0.2 * Math.cos((4 * hm - 63) * rad);
  const dTheta = 30 * Math.exp(-(((hm - 275) / 25) ** 2));
  const Rc = 2 * Math.sqrt(Cmp ** 7 / (Cmp ** 7 + 25 ** 7));
  const Sl = 1 + (0.015 * (Lm - 50) ** 2) / Math.sqrt(20 + (Lm - 50) ** 2), Sc = 1 + 0.045 * Cmp, Sh = 1 + 0.015 * Cmp * T;
  const Rt = -Math.sin(2 * dTheta * rad) * Rc;
  return Math.sqrt((dLp / Sl) ** 2 + (dCp / Sc) ** 2 + (dHp / Sh) ** 2 + Rt * (dCp / Sc) * (dHp / Sh));
}

/** Luminancia relativa y contraste de WCAG 2.x (texto normal pide 4,5:1; grande, 3:1) */
export const luminancia = (rgb: RGB) => rgbAXyz(rgb)[1];
export function contrasteWcag(a: RGB, b: RGB): number {
  const [l1, l2] = [luminancia(a), luminancia(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

/** Temperatura de color correlacionada (K), fórmula de McCamy; útil para cálido/frío, no para calibrar */
export function temperaturaK(rgb: RGB): number | null {
  const [X, Y, Z] = rgbAXyz(rgb);
  const s = X + Y + Z;
  if (s < 1e-6) return null;
  const x = X / s, y = Y / s;
  const n = (x - 0.332) / (0.1858 - y);
  return 449 * n ** 3 + 3525 * n ** 2 + 6823.3 * n + 5520.33;
}

export function saturacionHsl([r, g, b]: RGB): number {
  const mx = Math.max(r, g, b) / 255, mn = Math.min(r, g, b) / 255, l = (mx + mn) / 2;
  if (mx === mn) return 0;
  return (mx - mn) / (1 - Math.abs(2 * l - 1));
}

// ---------- Paleta dominante -------------------------------------------------------------------------

export interface ColorDominante { hex: string; rgb: RGB; lab: Lab; peso: number }

/** Muestreo regular de píxeles (RGBA) sin los transparentes */
export function muestrearPixeles(data: Uint8ClampedArray | number[], maximo = 12000): RGB[] {
  const n = Math.floor(data.length / 4);
  const paso = Math.max(1, Math.floor(n / maximo));
  const out: RGB[] = [];
  for (let i = 0; i < n; i += paso) {
    if (data[i * 4 + 3] < 128) continue;
    out.push([data[i * 4], data[i * 4 + 1], data[i * 4 + 2]]);
  }
  return out;
}

/** k-means en CIELAB con arranque k-means++ de semilla fija: la misma imagen da siempre la misma paleta */
export function paletaDominante(pixeles: RGB[], k = 6, iteraciones = 12): ColorDominante[] {
  if (!pixeles.length) return [];
  const labs = pixeles.map(rgbALab);
  let semilla = 7;
  const azar = () => { semilla = (semilla * 16807) % 2147483647; return semilla / 2147483647; };
  const d2 = (p: Lab, q: Lab) => (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2 + (p[2] - q[2]) ** 2;
  const centros: Lab[] = [labs[Math.floor(azar() * labs.length)]];
  while (centros.length < Math.min(k, labs.length)) {
    const dist = labs.map((p) => Math.min(...centros.map((c) => d2(p, c))));
    const total = dist.reduce((a, b) => a + b, 0);
    if (total === 0) break;
    let r = azar() * total, j = 0;
    while (r > dist[j] && j < dist.length - 1) { r -= dist[j]; j++; }
    centros.push(labs[j]);
  }
  const asignacion = new Array(labs.length).fill(0);
  for (let it = 0; it < iteraciones; it++) {
    labs.forEach((p, i) => { let mejor = 0, md = Infinity; centros.forEach((c, j) => { const d = d2(p, c); if (d < md) { md = d; mejor = j; } }); asignacion[i] = mejor; });
    const suma = centros.map(() => [0, 0, 0, 0]);
    labs.forEach((p, i) => { const s = suma[asignacion[i]]; s[0] += p[0]; s[1] += p[1]; s[2] += p[2]; s[3]++; });
    suma.forEach((s, j) => { if (s[3]) centros[j] = [s[0] / s[3], s[1] / s[3], s[2] / s[3]]; });
  }
  const rgbSuma = centros.map(() => [0, 0, 0, 0]);
  pixeles.forEach((p, i) => { const s = rgbSuma[asignacion[i]]; s[0] += p[0]; s[1] += p[1]; s[2] += p[2]; s[3]++; });
  return rgbSuma
    .map((s, j) => {
      const rgb: RGB = s[3] ? [s[0] / s[3], s[1] / s[3], s[2] / s[3]] : [0, 0, 0];
      return { hex: rgbAHex(rgb), rgb: rgb.map(Math.round) as RGB, lab: centros[j], peso: s[3] / pixeles.length };
    })
    .filter((c) => c.peso > 0)
    .sort((a, b) => b.peso - a.peso);
}

// ---------- Adherencia a la paleta de marca -----------------------------------------------------

export interface AdherenciaColor {
  /** Fracción de la imagen cubierta por colores a ΔE ≤ tolerancia de algún color de marca */
  cobertura: number;
  porColorMarca: { hex: string; rol: string; presencia: number; dEMin: number | null }[];
  /** Colores dominantes que no son de la marca (peso > 5 %) */
  ajenos: { hex: string; peso: number; dEMarca: number }[];
}

export function adherenciaPaleta(dominantes: ColorDominante[], marca: { hex: string; rol: string }[], tolerancia: number): AdherenciaColor {
  const m = marca.map((c) => ({ ...c, rgb: hexARgb(c.hex) })).filter((c): c is typeof c & { rgb: RGB } => !!c.rgb).map((c) => ({ ...c, lab: rgbALab(c.rgb) }));
  if (!m.length) return { cobertura: 0, porColorMarca: [], ajenos: [] };
  let cobertura = 0;
  const ajenos: AdherenciaColor['ajenos'] = [];
  const presencia = m.map(() => 0);
  const dMin: (number | null)[] = m.map(() => null);
  for (const d of dominantes) {
    const ds = m.map((c) => deltaE2000(d.lab, c.lab));
    const j = ds.indexOf(Math.min(...ds));
    ds.forEach((x, k) => { if (dMin[k] == null || x < dMin[k]!) dMin[k] = x; });
    if (ds[j] <= tolerancia) { cobertura += d.peso; presencia[j] += d.peso; } else if (d.peso > 0.05) ajenos.push({ hex: d.hex, peso: d.peso, dEMarca: ds[j] });
  }
  return { cobertura, porColorMarca: m.map((c, k) => ({ hex: c.hex.toUpperCase(), rol: c.rol, presencia: presencia[k], dEMin: dMin[k] })), ajenos };
}

// ---------- Luz, contraste y composición -----------------------------------------------------------

export interface Tonalidad {
  brilloMedio: number; // 0-1 (luminancia relativa media)
  contrasteRms: number; // desviación típica de la luminosidad L* (0-100)
  saturacionMedia: number; // 0-1
  temperaturaK: number | null;
  clave: 'baja' | 'media' | 'alta'; // clave tonal (low key / high key)
  sombrasRecortadas: number; // fracción de píxeles casi negros
  lucesRecortadas: number; // fracción de píxeles casi blancos
}

export function tonalidad(pixeles: RGB[]): Tonalidad {
  const n = pixeles.length || 1;
  let lum = 0, sat = 0, sombras = 0, luces = 0;
  const Ls: number[] = [];
  let R = 0, G = 0, B = 0;
  for (const p of pixeles) {
    const y = luminancia(p);
    lum += y; sat += saturacionHsl(p); R += p[0]; G += p[1]; B += p[2];
    const L = rgbALab(p)[0]; Ls.push(L);
    if (L < 4) sombras++;
    if (L > 97) luces++;
  }
  const Lm = Ls.reduce((a, b) => a + b, 0) / n;
  const rms = Math.sqrt(Ls.reduce((a, b) => a + (b - Lm) ** 2, 0) / n);
  return {
    brilloMedio: lum / n,
    contrasteRms: rms,
    saturacionMedia: sat / n,
    temperaturaK: temperaturaK([R / n, G / n, B / n]),
    clave: Lm < 35 ? 'baja' : Lm > 65 ? 'alta' : 'media',
    sombrasRecortadas: sombras / n,
    lucesRecortadas: luces / n,
  };
}

export interface Composicion {
  /** Energía de bordes por celda de la cuadrícula 3×3 (suma 1), por filas */
  tercios: number[];
  /** Centro de masa visual (0-1, 0-1) */
  centro: [number, number];
  /** Distancia del centro de masa al punto fuerte más cercano de la regla de tercios (0 = sobre él) */
  distanciaPuntoFuerte: number;
  /** Desequilibrio izquierda/derecha (−1 todo a la izquierda … 1 todo a la derecha) */
  balanceHorizontal: number;
  /** Fracción de la imagen con poca información (espacio negativo) */
  espacioNegativo: number;
}

/** Composición a partir de una imagen en escala de grises (w × h, valores 0-255) */
export function composicion(gris: Float32Array | number[], w: number, h: number): Composicion {
  const celdas = new Array(9).fill(0);
  let total = 0, cx = 0, cy = 0, izq = 0, der = 0, planos = 0, cuenta = 0;
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const g = (i: number, j: number) => gris[j * w + i];
      const gx = -g(x - 1, y - 1) - 2 * g(x - 1, y) - g(x - 1, y + 1) + g(x + 1, y - 1) + 2 * g(x + 1, y) + g(x + 1, y + 1);
      const gy = -g(x - 1, y - 1) - 2 * g(x, y - 1) - g(x + 1, y - 1) + g(x - 1, y + 1) + 2 * g(x, y + 1) + g(x + 1, y + 1);
      const e = Math.hypot(gx, gy);
      cuenta++;
      if (e < 24) planos++;
      total += e; cx += e * x; cy += e * y;
      celdas[Math.min(2, Math.floor((3 * y) / h)) * 3 + Math.min(2, Math.floor((3 * x) / w))] += e;
      if (x < w / 2) izq += e; else der += e;
    }
  }
  if (!total) return { tercios: celdas.map(() => 1 / 9), centro: [0.5, 0.5], distanciaPuntoFuerte: Math.hypot(1 / 6, 1 / 6), balanceHorizontal: 0, espacioNegativo: 1 };
  const c: [number, number] = [cx / total / w, cy / total / h];
  const fuertes = [[1 / 3, 1 / 3], [2 / 3, 1 / 3], [1 / 3, 2 / 3], [2 / 3, 2 / 3]];
  return {
    tercios: celdas.map((v) => v / total),
    centro: c,
    distanciaPuntoFuerte: Math.min(...fuertes.map(([a, b]) => Math.hypot(c[0] - a, c[1] - b))),
    balanceHorizontal: (der - izq) / (der + izq),
    espacioNegativo: planos / cuenta,
  };
}

// ---------- Video: cortes y ritmo -------------------------------------------------------------------

/** Histograma de 4×4×4 bins normalizado, para comparar fotogramas */
export function histograma(pixeles: RGB[]): number[] {
  const h = new Array(64).fill(0);
  for (const [r, g, b] of pixeles) h[(r >> 6) * 16 + (g >> 6) * 4 + (b >> 6)]++;
  const n = pixeles.length || 1;
  return h.map((v) => v / n);
}

/** Distancia entre histogramas (mitad de la suma de diferencias absolutas: 0 iguales … 1 disjuntos) */
export const distanciaHist = (a: number[], b: number[]) => a.reduce((s, v, i) => s + Math.abs(v - b[i]), 0) / 2;

export interface RitmoVideo {
  cortes: number[]; // segundos donde hay corte
  planos: number; // número de planos
  duracionMediaPlano: number; // segundos
  cortesPorMinuto: number;
}

/** Cortes: saltos de histograma por encima del umbral entre fotogramas consecutivos muestreados */
export function detectarCortes(hists: { t: number; h: number[] }[], umbral = 0.35): RitmoVideo {
  const cortes: number[] = [];
  for (let i = 1; i < hists.length; i++) if (distanciaHist(hists[i - 1].h, hists[i].h) > umbral) cortes.push(hists[i].t);
  const dur = hists.length ? hists[hists.length - 1].t - hists[0].t : 0;
  const planos = cortes.length + 1;
  return { cortes, planos, duracionMediaPlano: dur / planos, cortesPorMinuto: dur > 0 ? (cortes.length * 60) / dur : 0 };
}

// ---------- Oratoria (a partir de una transcripción con tiempos) -----------------------------------

export interface MetricasOratoria { palabras: number; palabrasPorMinuto: number; muletillas: { termino: string; veces: number }[]; prohibidas: { termino: string; veces: number }[] }

const escaparRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const normaliza = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

export function metricasOratoria(texto: string, segundos: number, muletillas: string[], prohibidas: string[]): MetricasOratoria {
  const t = ` ${normaliza(texto).replace(/[^a-zñ0-9\s]/g, ' ').replace(/\s+/g, ' ')} `;
  const palabras = t.trim() ? t.trim().split(' ').length : 0;
  const contar = (xs: string[]) => xs.map((x) => x.trim()).filter(Boolean).map((termino) => {
    const re = new RegExp('(?<= )' + escaparRegex(normaliza(termino)) + '(?= )', 'g');
    return { termino, veces: (t.match(re) ?? []).length };
  }).filter((x) => x.veces > 0);
  return { palabras, palabrasPorMinuto: segundos > 0 ? (palabras * 60) / segundos : 0, muletillas: contar(muletillas), prohibidas: contar(prohibidas) };
}

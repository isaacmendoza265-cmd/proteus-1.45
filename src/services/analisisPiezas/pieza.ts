/**
 * Medición completa de una pieza en el navegador (imagen o video local) y su resumen en texto para Gemini.
 * La lectura de píxeles usa <canvas>; el video se recorre con <video> saltando cada N segundos.
 * Los enlaces de YouTube no se pueden medir aquí (el navegador no deja leer sus píxeles): solo los analiza Gemini.
 */
import {
  adherenciaPaleta, composicion, contrasteWcag, detectarCortes, histograma, muestrearPixeles, paletaDominante, tonalidad,
  type AdherenciaColor, type ColorDominante, type Composicion, type RGB, type RitmoVideo, type Tonalidad,
} from './medicion';

export interface MedicionPieza {
  tipo: 'imagen' | 'video';
  ancho: number;
  alto: number;
  proporcion: string;
  duracionSeg?: number;
  paleta: ColorDominante[];
  adherencia: AdherenciaColor | null;
  tonalidad: Tonalidad;
  composicion: Composicion;
  /** Mayor contraste WCAG entre dos colores dominantes con peso > 5 % (referencia para texto sobre fondo) */
  contrasteMaximo: number;
  ritmo?: RitmoVideo;
  /** Color dominante de cada fotograma muestreado (video) */
  lineaColor?: { t: number; hex: string }[];
  /** Miniaturas de algunos fotogramas (video) */
  miniaturas?: { t: number; url: string }[];
}

const LADO = 320;

function proporcion(w: number, h: number): string {
  const r = w / h;
  const conocidas: [string, number][] = [['9:16', 9 / 16], ['4:5', 4 / 5], ['1:1', 1], ['4:3', 4 / 3], ['16:9', 16 / 9]];
  const [nombre, v] = conocidas.reduce((a, b) => (Math.abs(b[1] - r) < Math.abs(a[1] - r) ? b : a));
  return Math.abs(v - r) < 0.04 ? nombre : `${w}×${h}`;
}

function lienzo(w: number, h: number) {
  const c = document.createElement('canvas');
  const k = Math.min(1, LADO / Math.max(w, h));
  c.width = Math.max(1, Math.round(w * k));
  c.height = Math.max(1, Math.round(h * k));
  const ctx = c.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw new Error('El navegador no permite leer la imagen.');
  return { c, ctx };
}

function gris(data: Uint8ClampedArray): Float32Array {
  const g = new Float32Array(data.length / 4);
  for (let i = 0; i < g.length; i++) g[i] = 0.299 * data[i * 4] + 0.587 * data[i * 4 + 1] + 0.114 * data[i * 4 + 2];
  return g;
}

function contrasteMax(p: ColorDominante[]): number {
  const fuertes = p.filter((c) => c.peso > 0.05);
  let m = 1;
  for (let i = 0; i < fuertes.length; i++) for (let j = i + 1; j < fuertes.length; j++) m = Math.max(m, contrasteWcag(fuertes[i].rgb, fuertes[j].rgb));
  return m;
}

type Marca = { hex: string; rol: string }[];

export async function medirImagen(archivo: Blob, marca: Marca, tolerancia: number): Promise<MedicionPieza> {
  const bmp = await createImageBitmap(archivo);
  const { c, ctx } = lienzo(bmp.width, bmp.height);
  ctx.drawImage(bmp, 0, 0, c.width, c.height);
  const { data } = ctx.getImageData(0, 0, c.width, c.height);
  const px = muestrearPixeles(data);
  const paleta = paletaDominante(px, 6);
  return {
    tipo: 'imagen', ancho: bmp.width, alto: bmp.height, proporcion: proporcion(bmp.width, bmp.height),
    paleta, adherencia: marca.length ? adherenciaPaleta(paleta, marca, tolerancia) : null,
    tonalidad: tonalidad(px), composicion: composicion(gris(data), c.width, c.height), contrasteMaximo: contrasteMax(paleta),
  };
}

const esperar = (v: HTMLVideoElement, ev: string) => new Promise<void>((ok, mal) => {
  const f = () => { v.removeEventListener(ev, f); v.removeEventListener('error', e); ok(); };
  const e = () => { v.removeEventListener(ev, f); v.removeEventListener('error', e); mal(new Error('El navegador no pudo leer el video (formato no compatible).')); };
  v.addEventListener(ev, f); v.addEventListener('error', e);
});

/** Recorre el video cada `paso` segundos (máximo 240 fotogramas) */
export async function medirVideo(archivo: Blob, marca: Marca, tolerancia: number, alAvanzar?: (f: number) => void): Promise<MedicionPieza> {
  const url = URL.createObjectURL(archivo);
  const v = document.createElement('video');
  v.muted = true; v.preload = 'auto'; v.src = url; v.playsInline = true;
  try {
    await esperar(v, 'loadeddata');
    const dur = v.duration;
    if (!isFinite(dur) || dur <= 0) throw new Error('No se pudo leer la duración del video.');
    const paso = Math.max(0.5, dur / 240);
    const { c, ctx } = lienzo(v.videoWidth, v.videoHeight);
    const hists: { t: number; h: number[] }[] = [];
    const todos: RGB[] = [];
    const lineaColor: { t: number; hex: string }[] = [];
    const miniaturas: { t: number; url: string }[] = [];
    let gMedio: Float32Array | null = null;
    const cadaMini = Math.max(1, Math.round(dur / paso / 8));
    let n = 0;
    for (let t = 0; t < dur; t += paso) {
      v.currentTime = Math.min(t, dur - 0.05);
      await esperar(v, 'seeked');
      ctx.drawImage(v, 0, 0, c.width, c.height);
      const { data } = ctx.getImageData(0, 0, c.width, c.height);
      const px = muestrearPixeles(data, 1500);
      hists.push({ t, h: histograma(px) });
      for (let i = 0; i < px.length; i += 3) todos.push(px[i]);
      lineaColor.push({ t, hex: paletaDominante(px, 3, 6)[0]?.hex ?? '#000000' });
      const g = gris(data);
      if (!gMedio) gMedio = new Float32Array(g.length);
      for (let i = 0; i < g.length; i++) gMedio[i] += g[i];
      if (n % cadaMini === 0) miniaturas.push({ t, url: c.toDataURL('image/jpeg', 0.6) });
      n++;
      alAvanzar?.(Math.min(1, t / dur));
    }
    if (gMedio) for (let i = 0; i < gMedio.length; i++) gMedio[i] /= n;
    const paleta = paletaDominante(todos, 6);
    return {
      tipo: 'video', ancho: v.videoWidth, alto: v.videoHeight, proporcion: proporcion(v.videoWidth, v.videoHeight), duracionSeg: dur,
      paleta, adherencia: marca.length ? adherenciaPaleta(paleta, marca, tolerancia) : null,
      tonalidad: tonalidad(todos), composicion: composicion(gMedio ?? new Float32Array(c.width * c.height), c.width, c.height),
      contrasteMaximo: contrasteMax(paleta), ritmo: detectarCortes(hists), lineaColor, miniaturas,
    };
  } finally {
    URL.revokeObjectURL(url);
  }
}

const pct = (x: number) => `${Math.round(x * 100)} %`;
const mmss = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

/** Las mediciones en frases cortas para la sección MEDICIONES del comando */
export function medicionesEnTexto(m: MedicionPieza): string[] {
  const t = m.tonalidad, c = m.composicion;
  const out = [
    `Formato: ${m.ancho}×${m.alto} px, proporción ${m.proporcion}${m.duracionSeg ? `, duración ${mmss(m.duracionSeg)}` : ''}.`,
    `Paleta dominante (medida): ${m.paleta.map((p) => `${p.hex} ${pct(p.peso)}`).join(', ')}.`,
    `Tonalidad: brillo medio ${pct(t.brilloMedio)}, contraste RMS de luminosidad ${t.contrasteRms.toFixed(1)}, saturación media ${pct(t.saturacionMedia)}, clave ${t.clave}${t.temperaturaK ? `, temperatura aproximada ${Math.round(t.temperaturaK / 100) * 100} K` : ''}; sombras recortadas ${pct(t.sombrasRecortadas)}, luces recortadas ${pct(t.lucesRecortadas)}.`,
    `Composición: centro de masa visual en (${c.centro[0].toFixed(2)}, ${c.centro[1].toFixed(2)}), a ${c.distanciaPuntoFuerte.toFixed(2)} del punto fuerte de tercios más cercano; balance horizontal ${c.balanceHorizontal.toFixed(2)} (−1 izquierda, 1 derecha); espacio negativo ${pct(c.espacioNegativo)}.`,
    `Mayor contraste WCAG entre colores dominantes: ${m.contrasteMaximo.toFixed(1)}:1.`,
  ];
  if (m.adherencia) {
    const a = m.adherencia;
    out.push(`Adherencia a la paleta de marca: ${pct(a.cobertura)} de la pieza en colores de marca. ${a.porColorMarca.map((x) => `${x.rol} ${x.hex}: ${pct(x.presencia)} (ΔE mínimo ${x.dEMin?.toFixed(1) ?? '—'})`).join('; ')}.${a.ajenos.length ? ` Colores ajenos dominantes: ${a.ajenos.map((x) => `${x.hex} ${pct(x.peso)} (ΔE ${x.dEMarca.toFixed(1)})`).join(', ')}.` : ''}`);
  }
  if (m.ritmo) out.push(`Edición: ${m.ritmo.planos} planos, ${m.ritmo.cortesPorMinuto.toFixed(1)} cortes por minuto, plano medio de ${m.ritmo.duracionMediaPlano.toFixed(1)} s; cortes en ${m.ritmo.cortes.slice(0, 30).map(mmss).join(', ')}${m.ritmo.cortes.length > 30 ? '…' : ''}.`);
  return out;
}

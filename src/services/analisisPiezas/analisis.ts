/**
 * Análisis de una pieza: mide en el navegador (sin IA) y, si se pide, llama a Gemini con el libro de reglas
 * a través del servidor (/api/piezas/*): la clave de Gemini no sale del servidor.
 * Los análisis se guardan en este navegador (localStorage) si la identidad lo permite.
 */
import { esquemaRespuesta, instruccionAnalisis, libroEnTexto, puntajeGlobal, type RespuestaAnalisis, type TipoPieza } from '../../data/analisisPiezas/libroDeReglas';
import type { IdentidadCandidato } from '../identidad/identidad';
import { medicionesEnTexto, type MedicionPieza } from './pieza';
import { reglasPiso3 } from '../marcoService';

export type FuentePieza =
  | { clase: 'archivo'; archivo: File }
  | { clase: 'youtube'; url: string }
  | { clase: 'texto'; texto: string };

export interface PiezaAnalizada {
  id: string;
  fecha: string;
  nombre: string;
  tipo: TipoPieza;
  canal: string;
  propia: boolean;
  origen: string; // nombre del archivo o enlace
  medicion: MedicionPieza | null;
  ia: { analisis: RespuestaAnalisis; modelo: string; global: number | null; tokens: number | null } | null;
}

export const INLINE_MAX = 9 * 1024 * 1024; // ~9 MB en base64 cabe en el límite de 15 MB del servidor

export const tipoDeArchivo = (f: File): TipoPieza | null =>
  f.type.startsWith('image/') ? 'imagen' : f.type.startsWith('video/') ? 'video' : f.type.startsWith('audio/') ? 'audio' : null;

function aBase64(f: Blob): Promise<string> {
  return new Promise((ok, mal) => {
    const r = new FileReader();
    r.onload = () => ok(String(r.result).split(',')[1] ?? '');
    r.onerror = () => mal(new Error('No se pudo leer el archivo.'));
    r.readAsDataURL(f);
  });
}

async function json(r: Response) {
  const cuerpo = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(cuerpo.error || `Error ${r.status}`);
  return cuerpo;
}

export async function analizarConGemini(args: {
  identidad: IdentidadCandidato;
  tipo: TipoPieza;
  canal: string;
  propia: boolean;
  contexto: string;
  fuente: FuentePieza;
  medicion: MedicionPieza | null;
}): Promise<NonNullable<PiezaAnalizada['ia']>> {
  const { identidad, tipo, fuente } = args;
  if (fuente.clase === 'archivo' && tipo === 'imagen' && !identidad.privacidad.enviarFotosAIA) throw new Error('La identidad no permite enviar imágenes a la IA (Privacidad).');
  if (fuente.clase === 'archivo' && (tipo === 'video' || tipo === 'audio') && !identidad.privacidad.enviarVideosAIA) throw new Error('La identidad no permite enviar videos ni audios a la IA (Privacidad).');
  const sistema = libroEnTexto(tipo, reglasPiso3());
  const instruccion = [
    instruccionAnalisis({ identidad, tipo, canal: args.canal, propia: args.propia, contexto: args.contexto, mediciones: args.medicion ? medicionesEnTexto(args.medicion) : [] }),
    ...(fuente.clase === 'texto' ? ['', 'TEXTO DE LA PIEZA:', fuente.texto] : []),
  ].join('\n');
  const cuerpo: Record<string, unknown> = { sistema, instruccion, esquema: esquemaRespuesta(tipo) };
  if (fuente.clase === 'youtube') cuerpo.youtubeUrl = fuente.url;
  if (fuente.clase === 'archivo') {
    if (fuente.archivo.size <= INLINE_MAX) cuerpo.archivo = { mimeType: fuente.archivo.type, base64: await aBase64(fuente.archivo) };
    else {
      cuerpo.subido = await json(await fetch('/api/piezas/subir', { method: 'POST', headers: { 'Content-Type': 'application/octet-stream', 'x-mime-type': fuente.archivo.type }, body: fuente.archivo }));
    }
  }
  const r = await json(await fetch('/api/piezas/analizar', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(cuerpo) }));
  const analisis = r.analisis as RespuestaAnalisis;
  return { analisis, modelo: r.modelo, global: puntajeGlobal(analisis), tokens: r.uso?.totalTokenCount ?? null };
}

// ---------- Archivo local de piezas --------------------------------------------------------------

const CLAVE = 'proteus_piezas_analizadas';

export function leerPiezas(): PiezaAnalizada[] {
  try { return JSON.parse(localStorage.getItem(CLAVE) || '[]'); } catch { return []; }
}

export function guardarPieza(p: PiezaAnalizada): PiezaAnalizada[] {
  // Solo dos miniaturas por pieza para no llenar el almacenamiento del navegador
  const liviana: PiezaAnalizada = p.medicion?.miniaturas ? { ...p, medicion: { ...p.medicion, miniaturas: p.medicion.miniaturas.slice(0, 2) } } : p;
  const lista = [liviana, ...leerPiezas().filter((x) => x.id !== p.id)].slice(0, 40);
  try { localStorage.setItem(CLAVE, JSON.stringify(lista)); } catch { /* sin espacio: se queda en memoria */ }
  return lista;
}

export function borrarPieza(id: string): PiezaAnalizada[] {
  const lista = leerPiezas().filter((x) => x.id !== id);
  try { localStorage.setItem(CLAVE, JSON.stringify(lista)); } catch { /* sin almacenamiento */ }
  return lista;
}

/**
 * Análisis de una pieza: mide en el navegador (sin IA) y, si se pide, llama a Gemini con el libro de reglas
 * a través del servidor (/api/piezas/*): la clave de Gemini no sale del servidor.
 * Los análisis se guardan en la base de Proteus (/api/datos/piezas) si la identidad lo permite; los ve todo el equipo.
 */
import { esquemaRespuesta, instruccionAnalisis, libroEnTexto, puntajeGlobal, type RespuestaAnalisis, type TipoPieza } from '../../data/analisisPiezas/libroDeReglas';
import type { IdentidadCandidato } from '../identidad/identidad';
import { medicionesEnTexto, type MedicionPieza } from './pieza';
import { reglasPiso3 } from '../marcoService';
import { api, borrarLocal, leerLocal } from '../sesionCliente';

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
  // Las tres macrofuentes (datos del territorio activo, perfil y marco completo) y, encima, el libro de reglas del tipo
  const { armarMacrofuentes, sistemaConMacrofuentes, anotarLlamada } = await import('../ia/macrofuentes');
  const m = await armarMacrofuentes({ tarea: 'evaluar' });
  anotarLlamada({ tarea: 'evaluar', territorio: m.territorio, caracteres: m.caracteres, cuando: new Date().toISOString() });
  const sistema = sistemaConMacrofuentes(m, libroEnTexto(tipo, reglasPiso3()));
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

// ---------- Archivo de piezas (base de Proteus) ---------------------------------------------------

// Clave con la que las piezas vivían en el navegador antes de guardarse en la base (se migran una vez)
const CLAVE_LOCAL = 'proteus_piezas_analizadas';

const listar = () => api<{ piezas: PiezaAnalizada[] }>('/api/datos/piezas').then((r) => r.piezas);
const subir = (p: PiezaAnalizada) => api('/api/datos/piezas', { method: 'POST', json: { pieza: p } });

export async function leerPiezas(): Promise<PiezaAnalizada[]> {
  const piezas = await listar();
  const locales = leerLocal<PiezaAnalizada[]>(CLAVE_LOCAL);
  if (!locales?.length) return piezas;
  // Primera vez de este navegador: sus piezas locales pasan a la base (de la más vieja a la más nueva)
  for (const p of [...locales].reverse()) if (!piezas.some((x) => x.id === p.id)) await subir(p);
  borrarLocal(CLAVE_LOCAL);
  return listar();
}

export async function guardarPieza(p: PiezaAnalizada): Promise<PiezaAnalizada[]> {
  // Solo dos miniaturas por pieza: bastan para el historial y aligeran la base
  const liviana: PiezaAnalizada = p.medicion?.miniaturas ? { ...p, medicion: { ...p.medicion, miniaturas: p.medicion.miniaturas.slice(0, 2) } } : p;
  await subir(liviana);
  return listar();
}

export async function borrarPieza(id: string): Promise<PiezaAnalizada[]> {
  await api(`/api/datos/piezas/${encodeURIComponent(id)}`, { method: 'DELETE' });
  return listar();
}

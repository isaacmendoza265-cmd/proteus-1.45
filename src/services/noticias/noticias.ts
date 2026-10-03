/**
 * NOTICIAS POR UNIDAD TERRITORIAL (búsqueda de Google desde Gemini). Código compartido por el servidor y el cliente.
 *
 * Reglas (decisión de Isaac, 2-oct-2026, opción A: bajo demanda desde el mapa):
 *  - Nivel: municipio, comuna o corregimiento (y las divisiones de otros municipios), subregión y Antioquia. Un barrio
 *    o vereda no se busca: hereda las noticias de su comuna, rotuladas como de su comuna (nombres que se repiten).
 *  - Solo se muestran enlaces que devolvió Google (groundingChunks), nunca uno escrito por Gemini. Una noticia sin
 *    enlace verificado se descarta y se cuenta.
 *  - Se guardan solo titular, medio, fecha, tema, un resumen sin nombres de particulares y el enlace.
 *  - Son fuente AUXILIAR: entran al motor de análisis rotuladas así, nunca como dato oficial.
 *  - Google exige mostrar sus sugerencias de búsqueda (searchEntryPoint) junto al resultado.
 */

export const TEMAS_NOTICIA = [
  'seguridad', 'orden público', 'política', 'obras e infraestructura', 'servicios públicos', 'economía y empleo',
  'educación', 'salud', 'ambiente', 'social', 'otro',
] as const;
export type TemaNoticia = (typeof TEMAS_NOTICIA)[number];

export interface Noticia {
  fecha: string | null; // AAAA-MM-DD o null si Gemini no la dio
  medio: string;
  titular: string;
  tema: TemaNoticia;
  resumen: string;
  enlace: string;
}

export interface RegistroNoticias {
  unidadId: string;
  nombre: string;
  buscadoEn: string; // ISO
  noticias: Noticia[];
  /** Noticias que Gemini listó sin un enlace de Google que las respalde (no se muestran) */
  descartadas: number;
  consultas: string[];
  /** HTML de las sugerencias de búsqueda de Google (obligatorio mostrarlo) */
  sugerenciasHtml: string | null;
  modelo: string;
}

export const DIAS_VENTANA = 60;
export const MAX_NOTICIAS = 12;

/** Lo que interesa de la respuesta de @google/genai */
export interface RespuestaBusqueda {
  text?: string;
  candidates?: {
    groundingMetadata?: {
      webSearchQueries?: string[];
      groundingChunks?: { web?: { uri?: string; title?: string } }[];
      groundingSupports?: { segment?: { text?: string }; groundingChunkIndices?: number[] }[];
      searchEntryPoint?: { renderedContent?: string };
    };
  }[] | null;
}

export function promptNoticias(consulta: string, hoy: string): string {
  return [
    `Busca en Google noticias publicadas en los últimos ${DIAS_VENTANA} días (hoy es ${hoy}) sobre: ${consulta}.`,
    'Prefiere medios de Antioquia y nacionales y fuentes oficiales. Solo noticias de ese territorio; descarta las de lugares con el mismo nombre en otra parte.',
    `Responde con hasta ${MAX_NOTICIAS} noticias, una por línea, sin texto antes ni después, con este formato exacto:`,
    'NOTICIA | AAAA-MM-DD | Medio | Titular tal como lo publicó el medio | tema | resumen de una línea',
    `El tema es uno de: ${TEMAS_NOTICIA.join(', ')}.`,
    'En el resumen no escribas nombres de personas particulares (víctimas, capturados, testigos, menores); sí puedes nombrar autoridades, candidatos y funcionarios en su cargo.',
    'Si no encuentras noticias de ese territorio en ese periodo, responde solo: SIN NOTICIAS',
  ].join('\n');
}

const normal = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();

function tema(s: string): TemaNoticia {
  const n = normal(s);
  return (TEMAS_NOTICIA.find((t) => normal(t) === n) ?? TEMAS_NOTICIA.find((t) => n.includes(normal(t).split(' ')[0])) ?? 'otro') as TemaNoticia;
}

const fechaValida = (s: string) => (/^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s)) ? s : null);

/**
 * Convierte la respuesta de Gemini con búsqueda en noticias. El enlace sale de los fragmentos de Google que
 * respaldan la línea (groundingSupports → groundingChunks); sin respaldo, la noticia se descarta.
 */
export function extraerNoticias(r: RespuestaBusqueda): { noticias: Noticia[]; descartadas: number; consultas: string[]; sugerenciasHtml: string | null } {
  const meta = r.candidates?.[0]?.groundingMetadata;
  const chunks = meta?.groundingChunks ?? [];
  const soportes = (meta?.groundingSupports ?? []).filter((s) => s.segment?.text && s.groundingChunkIndices?.length);
  const noticias: Noticia[] = [];
  let descartadas = 0;
  const vistos = new Set<string>();
  for (const linea of (r.text ?? '').split('\n')) {
    const partes = linea.split('|').map((x) => x.trim());
    if (partes.length < 6 || !/^NOTICIA$/i.test(partes[0].replace(/[*#\-\s]/g, ''))) continue;
    const [, f, medio, titular, t, ...resto] = partes;
    if (!titular) continue;
    const nl = normal(linea);
    const indices = soportes
      .filter((s) => { const ns = normal(s.segment!.text!); return ns.length >= 12 && (nl.includes(ns) || ns.includes(normal(titular))); })
      .flatMap((s) => s.groundingChunkIndices!);
    const web = indices.map((i) => chunks[i]?.web).find((w) => w?.uri && /^https:\/\//.test(w.uri));
    if (!web?.uri) { descartadas += 1; continue; }
    const clave = normal(titular);
    if (vistos.has(clave)) continue;
    vistos.add(clave);
    noticias.push({
      fecha: fechaValida(f),
      medio: (medio || web.title || '').slice(0, 80),
      titular: titular.slice(0, 300),
      tema: tema(t),
      resumen: resto.join(' | ').slice(0, 400),
      enlace: web.uri,
    });
  }
  noticias.sort((a, b) => (b.fecha ?? '').localeCompare(a.fecha ?? ''));
  return {
    noticias: noticias.slice(0, MAX_NOTICIAS),
    descartadas,
    consultas: meta?.webSearchQueries ?? [],
    sugerenciasHtml: meta?.searchEntryPoint?.renderedContent ?? null,
  };
}

/** Los enlaces de Google llegan como redirección temporal (vertexaisearch); solo esos se resuelven en el servidor. */
export const esRedireccionGoogle = (uri: string) => /^https:\/\/vertexaisearch\.cloud\.google\.com\/grounding-api-redirect\//.test(uri);

// ---- Qué unidad se busca -------------------------------------------------------------------------------------

export interface ObjetivoNoticias {
  /** Clave con la que se guardan: 'muni:05001', 'comuna-14', 'bello-div-4', 'sub:Oriente', 'antioquia' */
  unidadId: string;
  nombre: string;
  consulta: string;
  /** Si la unidad elegida es un barrio o vereda, el nombre de esa unidad (las noticias son de su comuna) */
  heredadaDe: string | null;
}

export interface FichaMinima { tipo: string; id: string; nombre: string; dane: string; municipio: string; padreId?: string }

const limpiarNombre = (n: string) => n.replace(/^Comuna\s+\d+\s*-\s*/i, '').replace(/^Corregimiento\s+(de\s+)?/i, '').trim();

/** Objetivo de búsqueda para una ficha (municipio, división o subdivisión) o para una subregión / Antioquia. */
export function objetivoNoticias(ficha: FichaMinima | null, subregion: string | null, fichaPadre?: FichaMinima | null): ObjetivoNoticias {
  if (!ficha) {
    return subregion
      ? { unidadId: `sub:${subregion}`, nombre: `Subregión ${subregion}`, consulta: `subregión ${subregion} de Antioquia (sus municipios)`, heredadaDe: null }
      : { unidadId: 'antioquia', nombre: 'Antioquia', consulta: 'departamento de Antioquia, Colombia (Gobernación, Asamblea y hechos de alcance departamental)', heredadaDe: null };
  }
  if (ficha.tipo === 'municipio') {
    return { unidadId: `muni:${ficha.dane}`, nombre: ficha.nombre, consulta: `municipio de ${ficha.nombre}, Antioquia, Colombia`, heredadaDe: null };
  }
  if (ficha.tipo === 'subdivision' && fichaPadre) {
    return { ...objetivoNoticias(fichaPadre, subregion), heredadaDe: ficha.nombre };
  }
  const corto = limpiarNombre(ficha.nombre);
  const comuna = /^Comuna\s+(\d+)/i.exec(ficha.nombre)?.[1];
  return {
    unidadId: ficha.id,
    nombre: ficha.nombre,
    consulta: `${comuna ? `comuna ${comuna} (${corto})` : corto} de ${ficha.municipio}, Antioquia, Colombia`,
    heredadaDe: null,
  };
}

// ---- Texto para el motor de análisis ---------------------------------------------------------------------------

const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
export const fechaCorta = (iso: string | null) => {
  if (!iso) return 'sin fecha';
  // Un instante (buscadoEn) se lee en hora de Colombia; una fecha AAAA-MM-DD se deja tal cual
  const dia = iso.length > 10 ? new Date(iso).toLocaleDateString('en-CA', { timeZone: 'America/Bogota' }) : iso;
  const [y, m, d] = dia.split('-');
  return `${Number(d)}-${MESES[Number(m) - 1]}-${y}`;
};

export function lineasNoticias(r: RegistroNoticias, rotulo = '', max = MAX_NOTICIAS): string[] {
  const cab = `${rotulo}Búsqueda de Google del ${fechaCorta(r.buscadoEn)} sobre ${r.nombre}: ${r.noticias.length} noticia(s) con enlace verificado.`;
  if (!r.noticias.length) return [`${cab} No se encontraron noticias de los últimos ${DIAS_VENTANA} días.`];
  return [cab, ...r.noticias.slice(0, max).map((n) => `${rotulo}${fechaCorta(n.fecha)} · ${n.medio} · [${n.tema}] ${n.titular}. ${n.resumen} (${n.enlace})`)];
}

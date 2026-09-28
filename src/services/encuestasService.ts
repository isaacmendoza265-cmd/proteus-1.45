/**
 * ENCUESTAS 2026 (módulo <voto-correlaciones>) Y SU CRUCE CON EL RESULTADO OFICIAL
 *
 * Datos: public/modulos/voto-correlaciones/ (scripts/importar_voto_correlaciones.py). Son AGREGADOS ponderados
 * (Σw, Σw², n por celda; celdas con n < 30 suprimidas en origen) de los microdatos que las firmas publican en el
 * Registro Nacional de Encuestas del CNE (Ley 2494 de 2025, art. 12). Proteus nunca recibe microdatos.
 *
 * Qué hace este servicio (sin inventar ni repartir nada):
 *  - Estima, para un municipio o para Antioquia, la intención de voto de las encuestas ACUMULADAS de la fase que
 *    precede a cada elección (Senado ← precampaña; 1.ª vuelta ← del Congreso a la 1.ª vuelta; 2.ª vuelta ← entre
 *    vueltas), con IC 95 % de Wilson sobre el n efectivo de Kish (el mismo cálculo del módulo).
 *  - La pone al lado del escrutinio/preconteo oficial de la Registraduría del mismo territorio.
 * Reglamento de interpretación v1.2: los microdatos CNE calibran a municipio, área metropolitana o departamento;
 * nunca se pintan a barrio (por eso aquí no hay nivel comuna/barrio).
 */
import rawIndice from '../data/electoral/resultadosPuesto/indice.json';

export const URL_MODULO_ENCUESTAS = `${import.meta.env.BASE_URL}modulos/voto-correlaciones/`;
export const URL_AGREGADOS = `${URL_MODULO_ENCUESTAS}data/agregados.json`;

/** [territorio | grupo, opción, Σw, Σw², n] */
export type FilaAgregada = [string, string, number, number, number];

export interface EncuestaAgregada {
  id: string;
  firma: string;
  firma_corta?: string;
  tipo: 'encuesta' | 'acumulado';
  ambito: string;
  realizado: string;
  n: number;
  ponderada: boolean;
  ficha_cne?: string;
  notas?: string;
  ventana?: { tipo: string; etiqueta: string; desde: string; hasta: string };
  componentes?: string[];
  preguntas: Record<string, string>;
  tablas: Record<string, FilaAgregada[]>;
  codigos?: Record<string, Record<string, string>>;
}

export interface Agregados {
  generado: string;
  fuente: string;
  n_min: number;
  encuestas: EncuestaAgregada[];
}

let cacheAgregados: Promise<Agregados> | null = null;

export function cargarAgregados(): Promise<Agregados> {
  if (!cacheAgregados) {
    cacheAgregados = fetch(URL_AGREGADOS)
      .then((r) => {
        if (!r.ok) throw new Error(`No se pudieron cargar las encuestas (${r.status})`);
        return r.json() as Promise<Agregados>;
      })
      .catch((e) => { cacheAgregados = null; throw e; });
  }
  return cacheAgregados;
}

// --- Qué se compara con qué ------------------------------------------------------------------

export type PreguntaComparable = 'voto_senado' | 'voto_1v' | 'voto_2v';

export interface Comparacion {
  pregunta: PreguntaComparable;
  /** Encuesta acumulada de la ventana que precede a la elección */
  acumulado: string;
  eleccionId: 'senado-2026' | 'presidente-2026-1' | 'presidente-2026-2';
  titulo: string;
  fechaEleccion: string;
  ventana: string;
  /** Cómo se reparte el 100 % en los dos lados, para que sean comparables */
  base: string;
}

export const COMPARACIONES: Comparacion[] = [
  {
    pregunta: 'voto_senado', acumulado: 'acum-fase-1', eleccionId: 'senado-2026',
    titulo: 'Senado 2026 (partido)', fechaEleccion: '8 de marzo', ventana: 'hechas en la precampaña, hasta el 8 de marzo',
    base: 'Porcentaje sobre votos a partidos y en blanco; sin NS/NR, ninguno, nulo ni "otro".',
  },
  {
    pregunta: 'voto_1v', acumulado: 'acum-fase-2', eleccionId: 'presidente-2026-1',
    titulo: 'Presidencia · 1.ª vuelta', fechaEleccion: '31 de mayo', ventana: 'hechas del 9 de marzo al 31 de mayo',
    base: 'Porcentaje sobre votos a candidatos y en blanco; sin NS/NR, ninguno, nulo ni "otro".',
  },
  {
    pregunta: 'voto_2v', acumulado: 'acum-fase-3', eleccionId: 'presidente-2026-2',
    titulo: 'Presidencia · 2.ª vuelta', fechaEleccion: '21 de junio', ventana: 'hechas del 1 al 21 de junio',
    base: 'Porcentaje entre los dos candidatos (las encuestas agrupan blanco, nulo y NS/NR en una sola respuesta).',
  },
];

/** Respuestas que no son un voto válido: salen de la base en los dos lados */
const NO_VALIDAS = new Set(['NS/NR', 'Ninguno / no votaría', 'Voto nulo', 'Otro', 'Otros', 'Blanco / nulo / NS / ninguno']);
export const VOTO_BLANCO = 'Voto en blanco';

/** Por debajo de este n efectivo no se muestra el territorio (el IC pasaría de ±18 pts) */
export const N_EFECTIVO_MIN = 30;

// --- Estadística (igual que el módulo) ---------------------------------------------------------

/** Intervalo de Wilson al 95 % para una proporción con n efectivo `n` */
export function wilson(p: number, n: number): [number, number] {
  if (!(n > 0)) return [0, 1];
  const z = 1.96, z2 = z * z;
  const den = 1 + z2 / n;
  const centro = (p + z2 / (2 * n)) / den;
  const margen = (z * Math.sqrt((p * (1 - p)) / n + z2 / (4 * n * n))) / den;
  return [Math.max(0, centro - margen), Math.min(1, centro + margen)];
}

export interface OpcionEstimada { opcion: string; p: number; lo: number; hi: number; n: number }

export interface EstimacionTerritorio {
  encuestaId: string;
  etiqueta: string;
  territorio: string;
  codigo: string;
  nivel: 'municipio' | 'departamento';
  /** Casos con respuesta válida y n efectivo de Kish sobre esa base */
  n: number;
  nEfectivo: number;
  /** Encuestas que forman el acumulado */
  componentes: number;
  opciones: OpcionEstimada[];
}

/**
 * Intención de voto de una encuesta (o acumulado) en un territorio, sobre respuestas válidas.
 * null si no hay tabla para ese territorio o si el n efectivo no alcanza N_EFECTIVO_MIN.
 */
export function estimarTerritorio(
  ag: Agregados, encuestaId: string, pregunta: PreguntaComparable,
  nivel: 'municipio' | 'departamento', codigo: string,
): EstimacionTerritorio | null {
  const e = ag.encuestas.find((x) => x.id === encuestaId);
  const filas = e?.tablas?.[`${nivel}|${pregunta}`];
  if (!e || !filas) return null;
  const nombre = Object.entries(e.codigos?.[nivel] ?? {}).find(([, c]) => c === codigo)?.[0];
  if (!nombre) return null;
  const porOpcion = new Map<string, { sw: number; sw2: number; n: number }>();
  let SW = 0, SW2 = 0, N = 0;
  for (const [t, o, sw, sw2, n] of filas) {
    if (t !== nombre || NO_VALIDAS.has(o)) continue;
    const a = porOpcion.get(o) ?? { sw: 0, sw2: 0, n: 0 };
    a.sw += sw; a.sw2 += sw2; a.n += n;
    porOpcion.set(o, a);
    SW += sw; SW2 += sw2; N += n;
  }
  if (!(SW > 0)) return null;
  const nEfectivo = (SW * SW) / SW2;
  if (nEfectivo < N_EFECTIVO_MIN) return null;
  const opciones = [...porOpcion.entries()]
    .map(([opcion, a]) => { const p = a.sw / SW; const [lo, hi] = wilson(p, nEfectivo); return { opcion, p, lo, hi, n: a.n }; })
    .sort((a, b) => b.p - a.p);
  return {
    encuestaId: e.id, etiqueta: e.ventana?.etiqueta ?? e.firma, territorio: nombre.replace(/ \(.*\)$/, ''), codigo, nivel,
    n: N, nEfectivo: Math.round(nEfectivo), componentes: Array.isArray(e.componentes) ? e.componentes.length : 0, opciones,
  };
}

// --- Resultado oficial -------------------------------------------------------------------------

interface FilaOficial { votantes: number; blanco: number; partidos?: [number, number][]; candidatos?: [number, number][] }
interface ArchivoOficial {
  meta: { fuente?: string; nota?: string };
  elecciones: Record<string, { nombre: string; partidos: string[]; candidatos: { n: string; p: number }[]; municipio: FilaOficial; fuente?: string }>;
}
type Indice = Record<string, { nombre: string; '2026'?: string; pres2026?: string }>;
const INDICE = rawIndice as unknown as Indice;
const cargadores2026 = import.meta.glob<{ default: ArchivoOficial }>('../data/electoral/resultadosPuesto2026/*.json');
const cargadoresPres = import.meta.glob<{ default: ArchivoOficial }>('../data/electoral/resultadosPuestoPresidencial2026/*.json');

export interface ResultadoOficial {
  eleccionId: string;
  territorio: string;
  fuente: string;
  /** Votos por opción (candidato o partido, más "Voto en blanco" si entra en la base) */
  votos: { nombre: string; votos: number; pct: number }[];
  base: number;
  municipios: number;
}

const esPresidencial = (id: string) => id.startsWith('presidente');

function cargadorDe(dane: string, eleccionId: string) {
  const e = INDICE[dane];
  if (!e) return undefined;
  return esPresidencial(eleccionId)
    ? e.pres2026 ? cargadoresPres[`../data/electoral/resultadosPuestoPresidencial2026/${e.pres2026}.json`] : undefined
    : e['2026'] ? cargadores2026[`../data/electoral/resultadosPuesto2026/${e['2026']}.json`] : undefined;
}

/** Suma el total municipal oficial de una elección en uno o varios municipios (código DANE) */
export async function resultadoOficial(danes: string[], eleccionId: Comparacion['eleccionId'], territorio: string): Promise<ResultadoOficial | null> {
  const suma = new Map<string, number>();
  let blanco = 0, municipios = 0, fuente = '';
  const archivos = await Promise.all(danes.map((d) => cargadorDe(d, eleccionId)?.().then((m) => m.default)));
  for (const a of archivos) {
    const el = a?.elecciones?.[eleccionId];
    if (!el) continue;
    municipios++;
    fuente = el.fuente ?? a!.meta?.fuente ?? fuente;
    const f = el.municipio;
    if (esPresidencial(eleccionId)) for (const [i, v] of f.candidatos ?? []) { const n = el.candidatos[i]?.n; if (n) suma.set(n, (suma.get(n) ?? 0) + v); }
    else for (const [i, v] of f.partidos ?? []) { const n = el.partidos[i]; if (n) suma.set(n, (suma.get(n) ?? 0) + v); }
    blanco += f.blanco;
  }
  if (!municipios) return null;
  // 2.ª vuelta: base = los dos candidatos (así lo trae la encuesta); en las demás, candidatos o partidos + blanco
  if (eleccionId !== 'presidente-2026-2' && blanco > 0) suma.set(VOTO_BLANCO, blanco);
  const base = [...suma.values()].reduce((s, v) => s + v, 0);
  const votos = [...suma.entries()].map(([nombre, v]) => ({ nombre, votos: v, pct: base ? v / base : 0 })).sort((a, b) => b.votos - a.votos);
  return { eleccionId, territorio, fuente: fuente || 'Registraduría Nacional del Estado Civil', votos, base, municipios };
}

/** Códigos DANE de Antioquia con resultados 2026 cargados */
export const DANES_ANTIOQUIA_2026 = Object.keys(INDICE).filter((d) => d.startsWith('05'));

// --- Emparejar nombres de encuesta y de la Registraduría ---------------------------------------

const VACIAS = new Set(['partido', 'politico', 'movimiento', 'colombiano', 'coalicion', 'senado', 'antioquia', 'la', 'el', 'de', 'del', 'por', 'y', 'lista']);
const normalizar = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9 ]+/g, ' ')
  .split(/\s+/).filter((w) => w && !VACIAS.has(w));

/** Nombres de la encuesta que no se pueden emparejar por palabras */
const ALIAS: Record<string, string> = {
  'Pacto Histórico': 'pacto historico',
  '¡Ahora Colombia! (MIRA, NL, Dignidad)': 'ahora colombia',
  'Partido de la U': 'union gente',
  'Con Toda por Colombia': 'toda colombia',
  'Cambio Radical': 'cambio radical',
};

/** Busca el nombre oficial que corresponde a una opción de la encuesta (todas sus palabras deben estar) */
export function emparejar(opcion: string, oficiales: string[]): string | null {
  if (opcion === VOTO_BLANCO) return oficiales.includes(VOTO_BLANCO) ? VOTO_BLANCO : null;
  const buscadas = normalizar(ALIAS[opcion] ?? opcion);
  if (!buscadas.length) return null;
  const hits = oficiales.filter((o) => { const t = new Set(normalizar(o)); return buscadas.every((w) => t.has(w)); });
  return hits.length === 1 ? hits[0] : null;
}

export interface FilaComparada {
  opcion: string;
  oficial: string | null;
  encuesta: OpcionEstimada | null;
  resultado: number | null;
  /** Encuesta − resultado, en puntos porcentuales */
  diferencia: number | null;
  /** ¿El resultado cae dentro del IC 95 % de la encuesta? */
  dentroIC: boolean | null;
}

/** Une estimación y resultado: primero las opciones con más peso en cualquiera de los dos lados */
export function compararOpciones(est: EstimacionTerritorio, res: ResultadoOficial | null, max = 6): FilaComparada[] {
  const oficiales = res?.votos.map((v) => v.nombre) ?? [];
  const usados = new Set<string>();
  const filas: FilaComparada[] = est.opciones.map((o) => {
    const oficial = res ? emparejar(o.opcion, oficiales) : null;
    if (oficial) usados.add(oficial);
    const r = oficial ? res!.votos.find((v) => v.nombre === oficial)!.pct : null;
    return {
      opcion: o.opcion, oficial, encuesta: o, resultado: r,
      diferencia: r == null ? null : 100 * (o.p - r),
      dentroIC: r == null ? null : r >= o.lo && r <= o.hi,
    };
  });
  // Opciones que ganaron votos pero que la encuesta no trae (o suprimió por n < 30)
  for (const v of res?.votos ?? []) {
    if (!usados.has(v.nombre) && v.pct >= 0.03) filas.push({ opcion: v.nombre, oficial: v.nombre, encuesta: null, resultado: v.pct, diferencia: null, dentroIC: null });
  }
  const peso = (f: FilaComparada) => Math.max(f.encuesta?.p ?? 0, f.resultado ?? 0);
  return filas.sort((a, b) => peso(b) - peso(a)).slice(0, max);
}

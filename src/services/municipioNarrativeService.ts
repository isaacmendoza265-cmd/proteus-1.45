/**
 * ANÁLISIS NARRATIVO POR MUNICIPIO (y por comuna en Medellín)
 *
 * Aplica el Reglamento de interpretación vigente (Capa 1, `src/data/marco/capa1/reglamento-*.md`,
 * leído por `marcoService.ts`): cada afirmación lleva un verbo epistémico (observa / deduce /
 * hipotetiza / apuesta / no afirma), cada cifra lleva año, fuente y contienda (Regla 9), y las
 * cuatro familias de correlación (temporal, mismo ciclo, ecológica, arrastre) se calculan siempre
 * (Regla 17) con los datos que Proteus ya tiene: no se inventa nada que falte.
 *
 * No usa Gemini: el texto se compone de estos cálculos con una plantilla determinista (reproducible
 * y sin riesgo de que una IA invente una cifra). Capa 3 (retórica y creación publicitaria) todavía
 * no está ingestada, así que "Tonos narrativos" se deriva solo de los patrones de datos de la Capa 1.
 *
 * Alcance (pedido de Isaac, 27-sep-2026): el Valle de Aburrá (10 municipios) y los 30 municipios de
 * Antioquia con mayor censo electoral (los 10 del Valle ya están dentro de esos 30). Medellín se
 * analiza aparte, comuna por comuna (16 comunas + 5 corregimientos).
 */
import { ANTIOQUIA_125_MUNICIPIOS_GEOJSON, MEDELLIN_16_COMUNAS_OFFICIAL_GEOJSON } from '../data/geojson';
import { colorDePartido } from '../data/electoral/partidoColors';
import { getDaneMunicipio } from './daneMunicipalService';
import {
  cargarElecciones,
  sumarEleccion,
  tieneResultadosPorPuesto,
  tipoEleccion,
  type EleccionPuestos,
  type FilaEleccion,
} from './electionResultsService';
import { ganadoresPorTerritorio } from './winnersService';
import {
  actoresDeTerritorio,
  cargarDemografia,
  cargarEconomia,
  demografia,
  economia,
  municipioFichaPorDane,
  territorioFicha,
  type TerritorioFicha,
} from './territoryProfileService';
import { valorDemografico, valorSubdivision } from './mapColorService';
import rawIndice from '../data/territorio/indiceTerritorios.json';

// --- Territorios del análisis --------------------------------------------------------------------

export interface MunicipioAnalisis { dane: string; nombre: string; subregion: string; censo: number }

/** Los 30 municipios de Antioquia con mayor censo electoral (incluye los 10 del Valle de Aburrá) */
export const TOP30_ANTIOQUIA: MunicipioAnalisis[] = ANTIOQUIA_125_MUNICIPIOS_GEOJSON.features
  .map((f) => ({
    dane: String((f.properties as { daneCode?: string }).daneCode),
    nombre: f.properties.name,
    subregion: String(f.properties.subregion ?? ''),
    censo: Number(f.properties.electoralCensus ?? 0),
  }))
  .sort((a, b) => b.censo - a.censo)
  .slice(0, 30);

const DANES_ANALISIS = new Set(TOP30_ANTIOQUIA.map((m) => m.dane));
export const esMunicipioDelAnalisis = (dane: string) => DANES_ANALISIS.has(dane);
export const esMedellin = (dane: string) => dane === '05001';

/** Comunas y corregimientos de Medellín (21 zonas) para el análisis por comuna */
export const ZONAS_MEDELLIN = MEDELLIN_16_COMUNAS_OFFICIAL_GEOJSON.features
  .filter((f) => f.id !== 'medellin-base-outline')
  .map((f) => ({ id: String(f.id), nombre: f.properties.name, esCorregimiento: Boolean((f.properties as { isCorregimiento?: boolean }).isCorregimiento) }));

// --- Oraciones con verbo epistémico (Reglamento, sección 2) -------------------------------------

export type Verbo = 'observa' | 'deduce' | 'hipotetiza' | 'apuesta' | 'no afirma';
export interface Oracion { verbo: Verbo; texto: string }
const o = (verbo: Verbo, texto: string): Oracion => ({ verbo, texto });

export interface AnalisisNarrativo {
  id: string;
  nombre: string;
  ambito: 'municipio' | 'comuna' | 'corregimiento';
  contextoPolitico: Oracion[];
  contextoSocial: Oracion[];
  panorama2027: Oracion[];
  areasClave: Oracion[];
  tonos: Oracion[];
}

// --- Utilidades numéricas ------------------------------------------------------------------------

const fmt = (n: number) => Math.round(n).toLocaleString('es-CO');
const pct = (n: number) => `${n.toFixed(1).replace('.', ',')} %`;

function pearson(xs: number[], ys: number[]): number | null {
  const n = xs.length;
  if (n < 6) return null;
  const mx = xs.reduce((a, b) => a + b, 0) / n, my = ys.reduce((a, b) => a + b, 0) / n;
  let num = 0, dx2 = 0, dy2 = 0;
  for (let i = 0; i < n; i++) {
    const dx = xs[i] - mx, dy = ys[i] - my;
    num += dx * dy; dx2 += dx * dx; dy2 += dy * dy;
  }
  return dx2 && dy2 ? num / Math.sqrt(dx2 * dy2) : null;
}

/** % de una lista [índice, votos][] sobre los votos válidos (partidos/candidatos + blanco) de la fila */
const shareDeIndice = (lista: [number, number][] | undefined, blanco: number, idx: number): number => {
  const l = lista ?? [];
  const total = l.reduce((s, [, v]) => s + v, 0) + blanco;
  const v = l.find(([i]) => i === idx)?.[1] ?? 0;
  return total ? (100 * v) / total : 0;
};

interface Arrastre { r: number | null; n: number; partido: string; sinLista: boolean }

/**
 * Correlación de Pearson, puesto por puesto, entre el % del candidato ganador de `eUninominal`
 * (alcaldía o gobernación) y el % de su mismo partido en `eCorporacion` (concejo o asamblea). Las
 * dos elecciones vienen del mismo archivo del año (mismo catálogo de partidos y candidatos), así
 * que el índice de partido es directamente comparable entre ambas (Regla 13, familia "mismo ciclo").
 * `sinLista`: el partido ganador no sacó un solo voto a la corporación en ningún puesto comparado
 * (típico de un movimiento solo-alcaldía, sin lista propia): la correlación no se puede calcular,
 * pero el hallazgo en sí (alcalde sin bancada) es del propio análisis, no un vacío de datos.
 */
function correlacionMismoCiclo(eUninominal: EleccionPuestos, eCorporacion: EleccionPuestos): Arrastre | null {
  const m = eUninominal.municipio;
  const idxCand = (m.candidatos ?? []).reduce((mx, [i, v]) => (v > (mx.v ?? -1) ? { i, v } : mx), {} as { i?: number; v?: number }).i;
  if (idxCand === undefined) return null;
  const partido = eUninominal.candidatos[idxCand]?.p;
  const nombrePartido = partido !== undefined ? eUninominal.partidos[partido] : undefined;
  if (partido === undefined || !nombrePartido) return null;
  const xs: number[] = [], ys: number[] = [];
  for (const cod of Object.keys(eUninominal.puestos)) {
    const filaU = eUninominal.puestos[cod], filaC = eCorporacion.puestos[cod];
    if (!filaU || !filaC || filaU.habilitados < 50) continue;
    xs.push(shareDeIndice(filaU.candidatos, filaU.blanco, idxCand));
    ys.push(shareDeIndice(filaC.partidos, filaC.blanco, partido));
  }
  return { r: pearson(xs, ys), n: xs.length, partido: nombrePartido, sinLista: xs.length > 0 && ys.every((y) => y === 0) };
}

const calidadCorrelacion = (r: number) => (Math.abs(r) >= 0.6 ? 'fuerte' : Math.abs(r) >= 0.3 ? 'moderada' : 'débil');

// --- Contexto político -----------------------------------------------------------------------

const NOMBRE_TIPO: Record<string, string> = {
  alcaldia: 'Alcaldía', concejo: 'Concejo', gobernacion: 'Gobernación', asamblea: 'Asamblea',
  senado: 'Senado', camara: 'Cámara', 'presidente-1': 'Presidencia (1.ª vuelta)', 'presidente-2': 'Presidencia (2.ª vuelta)',
};

/** Serie de una contienda (alcaldía, gobernación...) a través de los años cargados, más reciente primero */
function serieDe(es: EleccionPuestos[], tipo: string) {
  return es.filter((e) => tipoEleccion(e.id) === tipo).sort((a, b) => b.anio - a.anio).map((e) => {
    const r = sumarEleccion(e, 'todos')!;
    const lider = e.porCandidato ? r.candidatos[0] : r.partidos[0];
    return { e, r, lider };
  }).filter((x) => x.lider);
}

function contextoPolitico(nombre: string, dane: string, es: EleccionPuestos[], t: TerritorioFicha): Oracion[] {
  const out: Oracion[] = [];
  const serieAlc = serieDe(es, 'alcaldia');
  if (serieAlc.length) {
    const [ultima, ...resto] = serieAlc;
    out.push(o('observa', `Alcaldía ${ultima.e.anio} (Registraduría, ${ultima.e.tipo}): ganó ${ultima.lider!.nombre}${'partido' in ultima.lider! ? ` (${ultima.lider!.partido})` : ''} con ${pct(ultima.lider!.pct)} de los votos válidos y ${pct((100 * ultima.r.votantes) / Math.max(1, ultima.r.habilitados))} de participación sobre ${fmt(ultima.r.habilitados)} habilitados.`));
    const mismoPartido = resto.filter((x) => 'partido' in x.lider! && 'partido' in ultima.lider! && x.lider!.partido === ultima.lider!.partido).length;
    if (resto.length) {
      out.push(o('deduce', mismoPartido >= Math.ceil(resto.length / 2)
        ? `En la serie ${resto.map((x) => x.e.anio).reverse().join('-')}-${ultima.e.anio} de Alcaldía, el mismo partido ganó ${mismoPartido} de ${resto.length + 1} veces: hay continuidad, no ruptura reciente.`
        : `En la serie ${resto.map((x) => x.e.anio).reverse().join('-')}-${ultima.e.anio} de Alcaldía, el ganador cambió de partido la mayoría de las veces: es un municipio de alternancia, no de maquinaria estable.`));
    }
  } else {
    out.push(o('no afirma', 'Sin resultados de Alcaldía por puesto cargados para este municipio en Proteus.'));
  }

  const serieGob = serieDe(es, 'gobernacion');
  if (serieGob.length) {
    const g = serieGob[0];
    out.push(o('observa', `Gobernación ${g.e.anio}: ${g.lider!.nombre}${'partido' in g.lider! ? ` (${g.lider!.partido})` : ''} obtuvo ${pct(g.lider!.pct)} de los votos válidos en este municipio.`));
  }

  // Familia "mismo ciclo": Alcaldía↔Concejo y Gobernación↔Asamblea, 2023 (Regla 13, la más accionable)
  const al23 = es.find((e) => e.id === 'alcaldia-2023'), co23 = es.find((e) => e.id === 'concejo-2023');
  if (al23 && co23) {
    const c = correlacionMismoCiclo(al23, co23);
    if (c?.sinLista) {
      out.push(o('observa', `${c.partido}, el partido que ganó la Alcaldía 2023, no sacó votos al Concejo en ninguno de los puestos comparados (Registraduría): es un movimiento solo de alcaldía, sin lista propia.`));
      out.push(o('deduce', 'Sin lista propia, no hay arrastre que medir de la Alcaldía al Concejo: la bancada del alcalde depende por completo de alianzas con otras listas (Regla 13).'));
    } else if (c?.r !== null && c) {
      out.push(o('deduce', `El arrastre de ${c.partido} de la Alcaldía a su lista al Concejo (2023, ${c.n} puestos, correlación de Pearson) es ${calidadCorrelacion(c.r)} (r = ${c.r.toFixed(2)}).${Math.abs(c.r) < 0.3 ? ' Con un arrastre tan débil, el concejo no se gana con la foto del alcalde: necesita su propia estrategia de lista.' : ''}`));
    } else out.push(o('no afirma', 'No hay suficientes puestos comparables para medir el arrastre Alcaldía↔Concejo 2023 en este municipio.'));
  }
  const go23 = es.find((e) => e.id === 'gobernacion-2023'), as23 = es.find((e) => e.id === 'asamblea-2023');
  if (go23 && as23) {
    const c = correlacionMismoCiclo(go23, as23);
    if (c?.sinLista) out.push(o('observa', `${c.partido}, el partido que ganó la Gobernación 2023, no sacó votos a la Asamblea en ninguno de los puestos comparados de este municipio.`));
    else if (c?.r !== null && c) out.push(o('deduce', `El arrastre de Gobernación a Asamblea (2023, ${c.n} puestos) es ${calidadCorrelacion(c.r)} (r = ${c.r.toFixed(2)}) para ${c.partido}.`));
  }

  // Familia "arrastre" nacional→local: rastro, no arrastre en sentido estricto (advertencia del dossier)
  const pres26 = es.find((e) => e.id === 'presidente-2026-1') ?? es.find((e) => e.id === 'senado-2026');
  if (pres26 && al23) {
    const rNac = sumarEleccion(pres26, 'todos')!, rLoc = sumarEleccion(al23, 'todos')!;
    const liderNac = pres26.porCandidato ? rNac.candidatos[0] : rNac.partidos[0];
    const liderLoc = rLoc.candidatos[0];
    if (liderNac && liderLoc) {
      const nombrePartidoNac: string = 'partido' in liderNac ? (liderNac as { partido: string }).partido : liderNac.nombre;
      const famNac = colorDePartido(nombrePartidoNac).etiqueta;
      const famLoc = colorDePartido(liderLoc.partido).etiqueta;
      out.push(o('observa', `${NOMBRE_TIPO[tipoEleccion(pres26.id)] ?? pres26.nombre} ${pres26.anio} en este municipio: lidera ${liderNac.nombre} con ${pct(liderNac.pct)}. Alcaldía 2023: ganó ${liderLoc.nombre} (${liderLoc.partido}) con ${pct(liderLoc.pct)}.`));
      out.push(o('hipotetiza', famNac === famLoc
        ? `Colombia no vota lo nacional y lo local el mismo día (elecciones no concurrentes): esta coincidencia de familia política (${famNac}) es un rastro, no un arrastre medido; puede ser la misma base electoral votando en ambas, o coincidencia entre dos años sin relación causal probada.`
        : `La familia política que domina en ${pres26.anio} (${famNac}) no es la que ganó la Alcaldía en 2023 (${famLoc}): no hay señal de arrastre nacional hacia esa fuerza en este municipio, aunque tampoco se puede afirmar que la perjudique sin una elección concurrente para medirlo.`));
      out.push(o('apuesta', famNac === famLoc
        ? 'No dar por hecho que la marca nacional garantiza el voto local en 2027: testear mensaje local antes de reciclar el discurso presidencial.'
        : 'No asumir que la fuerza nacional dominante hoy define 2027 aquí: priorizar la marca y la red local sobre la etiqueta nacional en la pauta de este municipio.'));
    }
  }

  const actores = actoresDeTerritorio(t);
  out.push(actores.length
    ? o('observa', `Base curada de casas políticas (sin verificar): ${actores.slice(0, 8).map((a) => `${a.nombre} (${a.cargo}, casa ${a.casa})`).join('; ')}${actores.length > 8 ? `, y ${actores.length - 8} más` : ''}.`)
    : o('no afirma', 'Sin actores de la base curada de casas políticas asociados a este municipio.'));

  return out;
}

// --- Contexto social y económico ----------------------------------------------------------------

function contextoSocial(t: TerritorioFicha, subregion: string): Oracion[] {
  const out: Oracion[] = [];
  const dane = getDaneMunicipio(t.dane);
  if (dane) {
    out.push(o('observa', `DANE proyecta ${fmt(dane.poblacion)} habitantes para ${t.municipio} en 2026: ${fmt(dane.poblacionCabecera)} en la cabecera (${pct((100 * dane.poblacionCabecera) / dane.poblacion)}) y ${fmt(dane.poblacionRural)} en la zona rural.`));
    out.push(o('observa', `NBI municipal (DANE, Censo 2018): ${pct(dane.nbi2018)}. Miseria: ${pct(dane.miseria2018)}.`));
  }
  const dem = demografia(t);
  if (dem.datos && dem.conDetalle) {
    const m = valorDemografico(dem.datos, 'mujeres'), j = valorDemografico(dem.datos, 'jovenes'), may = valorDemografico(dem.datos, 'mayores');
    out.push(o('observa', `Censo 2018 por manzana (DANE): ${fmt(dem.datos.personas)} personas registradas${m !== null ? `, ${pct(m)} mujeres` : ''}${j !== null ? `, ${pct(j)} de 20 a 29 años` : ''}${may !== null ? `, ${pct(may)} de 60 años o más` : ''}.`));
  }
  const eco = economia(t);
  if (eco) {
    if (eco.estratoModa) out.push(o('observa', `Estrato típico de las viviendas (factura de energía, Censo 2018): ${eco.estratoModa}, promedio ${eco.estratoPromedio!.toFixed(1).replace('.', ',')}. No es la estratificación oficial vigente.`));
    if (eco.ipm !== null) out.push(o('observa', `Pobreza multidimensional (IPM, DANE por manzana): ${pct(eco.ipm)}.`));
    const superior = eco.educacion.filter((x) => x.nombre === 'Técnica o universitaria' || x.nombre === 'Posgrado').reduce((s, x) => s + x.pct, 0);
    if (eco.educacion.some((x) => x.pct > 0)) out.push(o('observa', `Educación técnica o universitaria (Censo 2018): ${pct(superior)} de las personas con dato.`));
    const energiaBaja = eco.servicios.find((s) => s.nombre === 'Internet');
    if (energiaBaja) out.push(o('observa', `Acceso a internet en la vivienda (Censo 2018): ${pct(energiaBaja.pct)}.`));
  }
  if (dane) {
    const munisSubregion = ANTIOQUIA_125_MUNICIPIOS_GEOJSON.features.filter((f) => f.properties.subregion === subregion);
    const nbiProm = munisSubregion.reduce((s, f) => s + (Number(f.properties.nbiPercentage) || 0), 0) / Math.max(1, munisSubregion.length);
    out.push(o('deduce', dane.nbi2018 > nbiProm + 3
      ? `El NBI de este municipio (${pct(dane.nbi2018)}) está por encima del promedio de la subregión ${subregion} (${pct(nbiProm)}): tiene más carencias estructurales que sus vecinos.`
      : dane.nbi2018 < nbiProm - 3
        ? `El NBI de este municipio (${pct(dane.nbi2018)}) está por debajo del promedio de la subregión ${subregion} (${pct(nbiProm)}): tiene menos carencias estructurales que sus vecinos.`
        : `El NBI de este municipio (${pct(dane.nbi2018)}) es similar al promedio de la subregión ${subregion} (${pct(nbiProm)}).`));
  }
  return out;
}

// --- Panorama 2027 ---------------------------------------------------------------------------

function panorama2027(nombre: string, es: EleccionPuestos[]): Oracion[] {
  const out: Oracion[] = [];
  const serieAlc = serieDe(es, 'alcaldia');
  if (!serieAlc.length) { out.push(o('no afirma', 'Sin serie de Alcaldía suficiente para un panorama 2027.')); return out; }
  const ultima = serieAlc[0];
  const margen = 'partido' in ultima.lider! ? ultima.r.candidatos[0].pct - (ultima.r.candidatos[1]?.pct ?? 0) : 0;
  const participacion = (100 * ultima.r.votantes) / Math.max(1, ultima.r.habilitados);
  out.push(o('hipotetiza', margen > 25
    ? `Con un margen de ${margen.toFixed(1)} puntos en 2023, la hipótesis con más apoyo es continuidad del bloque ganador en 2027, salvo ruptura interna de esa casa política (rival: fragmentación de la coalición actual).`
    : margen > 10
      ? `Con un margen de ${margen.toFixed(1)} puntos en 2023, la hipótesis con más apoyo es una disputa cerrada en 2027 entre el bloque ganador y el segundo lugar (rival: que un tercer nombre capitalice el voto de opinión).`
      : `Con un margen de solo ${margen.toFixed(1)} puntos en 2023, no hay favorito claro para 2027: es de las contiendas más abiertas del maestro (rival de esta lectura: que la incumbencia local dé una ventaja no visible en 2023).`));
  out.push(o('apuesta', participacion < 50
    ? 'Priorizar movilización sobre persuasión: con participación por debajo de la mitad del censo, hay más votos por sacar de abstencionistas que por convencer contrarios.'
    : 'La participación ya es alta: priorizar persuasión de indecisos y trabajo fino de lista, no solo movilización.'));
  out.push(o('apuesta', margen <= 10
    ? 'Empezar la campaña de 2027 temprano y con presencia territorial: en un recorte tan cerrado, el terreno pesa más que la pauta masiva.'
    : 'Usar el margen de 2023 para consolidar la red de concejales y liderazgos locales antes de que se abra la carrera de 2027.'));
  return out;
}

// --- Tonos narrativos (solo Capa 1: sin retórica ni colorimetría, eso es Capa 3) -----------------

function tonosGenerales(es: EleccionPuestos[], dane: ReturnType<typeof getDaneMunicipio>): Oracion[] {
  const out: Oracion[] = [];
  out.push(o('no afirma', 'Capa 3 (retórica, colorimetría y creación publicitaria) todavía no está ingestada: estos tonos se derivan solo del patrón de datos de la Capa 1, no de teoría de persuasión.'));
  const al23 = es.find((e) => e.id === 'alcaldia-2023');
  if (al23) {
    const r = sumarEleccion(al23, 'todos')!;
    const margen = r.candidatos[0].pct - (r.candidatos[1]?.pct ?? 0);
    const participacion = (100 * r.votantes) / Math.max(1, r.habilitados);
    const co23 = es.find((e) => e.id === 'concejo-2023');
    const rc = co23 ? sumarEleccion(co23, 'todos') : null;
    const fragmentado = rc ? rc.partidos.filter((p) => p.pct >= 8).length : 0;
    out.push(o('apuesta', margen <= 10
      ? 'Tono de contraste y urgencia: la contienda es cerrada, el mensaje puede nombrar diferencias concretas con el rival sin quedar frágil.'
      : 'Tono de continuidad y gestión: con margen amplio, conviene un mensaje de resultados y estabilidad más que de ruptura.'));
    out.push(o('apuesta', participacion < 50
      ? 'Tono de movilización directa (por qué votar importa aquí) antes que de propuesta detallada.'
      : 'Tono de propuesta y detalle: el electorado ya participa; conviene diferenciar con contenido, no solo con llamado al voto.'));
    if (fragmentado >= 5) out.push(o('deduce', `El Concejo 2023 quedó repartido entre ${fragmentado} partidos con 8 % o más de la votación: es un mercado de listas fragmentado (Regla 13). El tono de la campaña a Concejo debe ser propio, no una copia del mensaje de Alcaldía.`));
  }
  if (dane && dane.nbi2018 > 20) out.push(o('apuesta', 'Con NBI por encima del 20 %, el eje de servicio (acceso, infraestructura básica) pesa más que el eje identitario en el mensaje.'));
  return out;
}

// --- Construcción del análisis por municipio ------------------------------------------------------

const cacheMunicipio = new Map<string, Promise<AnalisisNarrativo>>();

export async function analizarMunicipio(dane: string): Promise<AnalisisNarrativo> {
  if (!cacheMunicipio.has(dane)) cacheMunicipio.set(dane, construirMunicipio(dane));
  return cacheMunicipio.get(dane)!;
}

async function construirMunicipio(dane: string): Promise<AnalisisNarrativo> {
  const id = municipioFichaPorDane(dane);
  const t = id ? territorioFicha(id) : null;
  const meta = TOP30_ANTIOQUIA.find((m) => m.dane === dane);
  const nombre = t?.municipio ?? meta?.nombre ?? dane;
  if (!t) {
    return {
      id: dane, nombre, ambito: 'municipio',
      contextoPolitico: [o('no afirma', 'Sin ficha territorial para este municipio.')],
      contextoSocial: [], panorama2027: [], areasClave: [], tonos: [],
    };
  }
  await Promise.all([cargarDemografia(dane), cargarEconomia(dane)]);
  const es = tieneResultadosPorPuesto(dane) ? await cargarElecciones(dane) : [];
  const dpto = getDaneMunicipio(dane);
  return {
    id: dane, nombre, ambito: 'municipio',
    contextoPolitico: contextoPolitico(nombre, dane, es, t),
    contextoSocial: contextoSocial(t, meta?.subregion ?? ''),
    panorama2027: panorama2027(nombre, es),
    areasClave: areasClaveDelMunicipio(t, es),
    tonos: tonosGenerales(es, dpto),
  };
}

/** Puestos de mayor censo (prioridad de visita) y, si hay cartografía, la comuna/vereda más carenciada */
function areasClaveDelMunicipio(t: TerritorioFicha, es: EleccionPuestos[]): Oracion[] {
  const out: Oracion[] = [];
  const al23 = es.find((e) => e.id === 'alcaldia-2023');
  if (al23) {
    const nombres = al23.nombres ?? {};
    const top = Object.entries(al23.puestos)
      .map(([cod, f]) => ({ cod, nombre: nombres[cod] ?? cod, habilitados: f.habilitados }))
      .sort((a, b) => b.habilitados - a.habilitados)
      .slice(0, 3);
    if (top.length) out.push(o('observa', `Los puestos de mayor censo (Alcaldía 2023, Registraduría) son ${top.map((p) => `${p.nombre} (${fmt(p.habilitados)} habilitados)`).join(', ')}: son la prioridad física de visita por volumen de votantes.`));
  }
  // Comuna/corregimiento o vereda con mayor IPM (si el municipio tiene división cartografiada)
  const divisiones = Object.entries(divisionesDe(t.id));
  if (divisiones.length) {
    const conIpm = divisiones
      .map(([id]) => ({ id, v: valorSubdivision(id, 'economico', 'ipm') }))
      .filter((x) => x.v.valor !== null)
      .sort((a, b) => b.v.valor! - a.v.valor!);
    if (conIpm.length) {
      const peor = conIpm[0];
      out.push(o('deduce', `${nombreDivision(t.id, peor.id)} tiene el IPM más alto de las divisiones cartografiadas del municipio (${peor.v.texto}, DANE por manzana): es la zona con más carencias y la de mayor prioridad para un mensaje de servicio.`));
    }
  }
  return out;
}

// Acceso liviano al índice de divisiones y subdivisiones (mismo JSON que usa territoryProfileService)
interface IndiceMunicipioDivisiones {
  dane: string;
  divisiones: Record<string, { nombre: string; tipo: string }>;
  subdivisiones: Record<string, { nombre: string; tipo: string; padre: string }>;
}
const INDICE_DIVISIONES = rawIndice as unknown as Record<string, IndiceMunicipioDivisiones>;
const divisionesDe = (muniId: string): Record<string, { nombre: string; tipo: string }> => INDICE_DIVISIONES[muniId]?.divisiones ?? {};
const nombreDivision = (muniId: string, divId: string): string => INDICE_DIVISIONES[muniId]?.divisiones[divId]?.nombre ?? divId;
const subdivisionesDe = (muniId: string, padreId: string): { id: string; nombre: string }[] =>
  Object.entries(INDICE_DIVISIONES[muniId]?.subdivisiones ?? {}).filter(([, s]) => s.padre === padreId).map(([id, s]) => ({ id, nombre: s.nombre }));

// --- Construcción del análisis por comuna de Medellín --------------------------------------------

const cacheComuna = new Map<string, Promise<AnalisisNarrativo>>();
const MEDELLIN_DANE = '05001';

export async function analizarComunaMedellin(comunaId: string): Promise<AnalisisNarrativo> {
  if (!cacheComuna.has(comunaId)) cacheComuna.set(comunaId, construirComuna(comunaId));
  return cacheComuna.get(comunaId)!;
}

async function construirComuna(comunaId: string): Promise<AnalisisNarrativo> {
  const zona = ZONAS_MEDELLIN.find((z) => z.id === comunaId);
  const nombreZona = zona?.nombre ?? comunaId;
  await Promise.all([cargarDemografia(MEDELLIN_DANE), cargarEconomia(MEDELLIN_DANE)]);
  const es = await cargarElecciones(MEDELLIN_DANE);
  const dpto = getDaneMunicipio(MEDELLIN_DANE);
  const out: Oracion[] = [];

  const al23 = es.find((e) => e.id === 'alcaldia-2023');
  if (al23) {
    const ganadores = ganadoresPorTerritorio(al23, MEDELLIN_16_COMUNAS_OFFICIAL_GEOJSON.features, []);
    const g = ganadores[comunaId];
    out.push(g
      ? o('observa', `Alcaldía 2023 en ${nombreZona}: ganó ${g.ganador}${g.partido !== g.ganador ? ` (${g.partido})` : ''} con ${pct(g.pct)} de los votos válidos, sumando los ${g.puestos} puestos que caen dentro (Registraduría).`)
      : o('no afirma', `Ningún puesto de la Alcaldía 2023 cae dentro de ${nombreZona} según la Divipole 2023: no se puede afirmar un ganador propio.`));
  }
  // Serie temporal y arrastre mismo ciclo: a escala de todo Medellín (no hay resultados por comuna en otros años)
  out.push(...contextoPolitico('Medellín', MEDELLIN_DANE, es, territorioFicha('medellin')!).filter((s) => !s.texto.startsWith('Base curada')));
  const actores = actoresDeTerritorio(territorioFicha('medellin')!);
  out.push(actores.length
    ? o('observa', `Actores de la base curada (sin verificar, a escala de todo Medellín, no específicos de ${nombreZona}): ${actores.slice(0, 5).map((a) => `${a.nombre} (${a.cargo})`).join('; ')}.`)
    : o('no afirma', 'Sin actores de la base curada para Medellín.'));

  const social: Oracion[] = [];
  const vDem = valorSubdivision(comunaId, 'demografico', 'mujeres');
  if (vDem.valor !== null) social.push(o('observa', `${nombreZona}: ${vDem.texto} (${vDem.fuente}).`));
  const vEstrato = valorSubdivision(comunaId, 'economico', 'estrato');
  if (vEstrato.valor !== null) social.push(o('observa', `Estrato típico: ${vEstrato.texto}.`));
  const vIpm = valorSubdivision(comunaId, 'economico', 'ipm');
  if (vIpm.valor !== null) social.push(o('observa', `IPM: ${vIpm.texto}.`));
  const vSup = valorSubdivision(comunaId, 'economico', 'superior');
  if (vSup.valor !== null) social.push(o('observa', vSup.texto + '.'));
  if (dpto) social.push(o('deduce', vEstrato.valor !== null
    ? `Con estrato típico ${vEstrato.valor} en una ciudad con NBI del ${pct(dpto.nbi2018)}, ${nombreZona} ${(vEstrato.valor as number) <= 2 ? 'está entre las comunas más vulnerables de Medellín: el estrato-resultado es de las correlaciones más operativas del maestro (Regla 4)' : (vEstrato.valor as number) >= 5 ? 'está entre las comunas de mayor estrato de Medellín' : 'tiene un perfil socioeconómico medio dentro de Medellín'}.`
    : 'Sin estrato agregado para esta zona.'));

  // Barrio o vereda con mayor IPM dentro de la comuna
  const areas: Oracion[] = [];
  const subs = subdivisionesDe('medellin', comunaId);
  if (subs.length) {
    const conIpm = subs.map((s) => ({ ...s, v: valorSubdivision(s.id, 'economico', 'ipm') })).filter((s) => s.v.valor !== null).sort((a, b) => b.v.valor! - a.v.valor!);
    if (conIpm.length) areas.push(o('deduce', `Dentro de ${nombreZona}, ${conIpm[0].nombre} tiene el IPM más alto (${conIpm[0].v.texto}): prioridad de mensaje de servicio dentro de la comuna.`));
    const conEstratoBajo = subs.map((s) => ({ ...s, v: valorSubdivision(s.id, 'economico', 'estrato') })).filter((s) => s.v.valor !== null).sort((a, b) => a.v.valor! - b.v.valor!);
    if (conEstratoBajo.length) areas.push(o('observa', `El barrio de menor estrato dentro de ${nombreZona} es ${conEstratoBajo[0].nombre} (estrato ${conEstratoBajo[0].v.valor}).`));
  } else {
    areas.push(o('no afirma', `Sin barrios o veredas cartografiados por separado dentro de ${nombreZona}.`));
  }

  return {
    id: `05001:${comunaId}`, nombre: `Medellín, ${nombreZona}`, ambito: zona?.esCorregimiento ? 'corregimiento' : 'comuna',
    contextoPolitico: out,
    contextoSocial: social,
    panorama2027: panorama2027nomedellin(al23, comunaId, nombreZona),
    areasClave: areas,
    tonos: tonosComuna(vEstrato.valor, vIpm.valor, nombreZona),
  };
}

function panorama2027nomedellin(al23: EleccionPuestos | undefined, comunaId: string, nombreZona: string): Oracion[] {
  const out: Oracion[] = [];
  if (!al23) { out.push(o('no afirma', 'Sin datos suficientes para un panorama 2027 en esta comuna.')); return out; }
  const ganadores = ganadoresPorTerritorio(al23, MEDELLIN_16_COMUNAS_OFFICIAL_GEOJSON.features, []);
  const g = ganadores[comunaId];
  if (!g) { out.push(o('no afirma', `Sin puestos propios dentro de ${nombreZona} en 2023: el panorama de esta zona depende del municipal.`)); return out; }
  out.push(o('hipotetiza', g.pct > 60
    ? `Con ${pct(g.pct)} para ${g.ganador} en 2023, la hipótesis con más apoyo es continuidad de ese bloque en ${nombreZona} para 2027 (rival: desgaste de gestión en el cuatrienio).`
    : `Con ${pct(g.pct)} para ${g.ganador} en 2023, ${nombreZona} no es un feudo cerrado: cabe disputa real en 2027.`));
  out.push(o('apuesta', 'Cruzar este resultado con el de Concejo en los mismos puestos antes de decidir si la pieza de comuna reutiliza la marca de Alcaldía o construye una propia.'));
  return out;
}

function tonosComuna(estrato: number | null, ipm: number | null, nombreZona: string): Oracion[] {
  const out: Oracion[] = [o('no afirma', 'Capa 3 (retórica, colorimetría y creación publicitaria) todavía no está ingestada: tono derivado solo de datos de la Capa 1.')];
  if (estrato !== null) out.push(o('apuesta', estrato <= 2
    ? `Tono de servicio y cercanía en ${nombreZona}: estrato bajo, el eje de necesidades básicas pesa más que el de identidad de marca.`
    : estrato >= 5
      ? `Tono de gestión y calidad de vida en ${nombreZona}: estrato alto, el eje de seguridad, movilidad y valorización pesa más que el asistencial.`
      : `Tono mixto en ${nombreZona}: estrato medio, combinar servicio con propuesta de desarrollo.`));
  if (ipm !== null && ipm > 15) out.push(o('apuesta', `Con IPM de ${pct(ipm)}, ${nombreZona} admite un mensaje directo de carencias resueltas, no solo aspiracional.`));
  return out;
}

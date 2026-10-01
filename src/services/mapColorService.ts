/**
 * COLOR DEL MAPA POR CAPA (electoral, demográfica, económica, institucional)
 *
 * Cada territorio (barrio, vereda, comuna o municipio) y cada puesto se colorea con un dato de
 * fuente conocida. Si no hay dato, va en gris ("Sin información"); nunca se inventa un valor.
 * - Barrios, veredas y comunas: DANE, CNPV 2018 por manzana (demografía y economía).
 * - Municipios: proyección DANE 2026 por sexo y edad; NBI del DANE; capa institucional (solo por municipio):
 *   presupuesto por habitante (Contraloría, CUIPO), categoría (Contaduría) y curules del concejo (Registraduría).
 * - Puestos: su propio resultado electoral o su censo 2026 (sexo). Para los demás indicadores el
 *   puesto no tiene dato propio y toma el color del barrio o vereda donde está (se dice en la leyenda).
 * Las clases de las escalas continuas son quintiles de los valores visibles.
 */
import { COLOR_SIN_DATO } from '../data/electoral/partidoColors';
import {
  demografia,
  economia,
  municipioFichaPorDane,
  piramide2026,
  territorioFicha,
  type Demografia,
} from './territoryProfileService';
import { sumarEleccion, tipoEleccion, type EleccionPuestos } from './electionResultsService';
import { CATEGORIA_TEXTO, categoriaMunicipio, curulesConcejo, pesos, presupuestoMunicipio } from './perfilMunicipalService';
import { tieneCoordenadas, type PuestoVotacion } from './pollingStationsService';

export type MetricaDemografica = 'mujeres' | 'jovenes' | 'mayores';
export type MetricaEconomica = 'estrato' | 'ipm' | 'superior' | 'nbi';

export const METRICAS_DEMOGRAFICAS: { id: MetricaDemografica; nombre: string }[] = [
  { id: 'mujeres', nombre: '% de mujeres' },
  { id: 'jovenes', nombre: '% de 20 a 29 años' },
  { id: 'mayores', nombre: '% de 60 años o más' },
];

/** Métricas económicas por escala: por manzana solo en la escala municipal; NBI solo por municipio */
export const METRICAS_ECONOMICAS: { id: MetricaEconomica; nombre: string; escala: 'municipal' | 'departamental' }[] = [
  { id: 'estrato', nombre: 'Estrato típico (factura de energía, 2018)', escala: 'municipal' },
  { id: 'ipm', nombre: 'Pobreza multidimensional (IPM)', escala: 'municipal' },
  { id: 'superior', nombre: '% con educación técnica o universitaria', escala: 'municipal' },
  { id: 'nbi', nombre: 'Necesidades básicas insatisfechas (NBI)', escala: 'departamental' },
];

export type MetricaInstitucional = 'presupuestoHab' | 'categoria' | 'curules';

/** Capa institucional: solo existe por municipio (escala departamental) */
export const METRICAS_INSTITUCIONALES: { id: MetricaInstitucional; nombre: string }[] = [
  { id: 'presupuestoHab', nombre: 'Presupuesto 2025 por habitante' },
  { id: 'categoria', nombre: 'Categoría del municipio (2026)' },
  { id: 'curules', nombre: 'Curules del Concejo 2023' },
];

export const PALETA_DEMOGRAFICA = ['#e6e3f5', '#b9b1e3', '#8a7fcf', '#5f53b0', '#3a2f86'];
export const PALETA_ECONOMICA = ['#fde7c8', '#f6b27a', '#e97c4c', '#c9502e', '#8f2d1f'];
/** Estratos 1 a 6 (misma paleta que ya usaba el mapa) */
export const COLORES_ESTRATO = ['#9B2C2C', '#C05621', '#B7791F', '#2F855A', '#2B6CB0', '#553C9A'];
export const PALETA_INSTITUCIONAL = ['#dcebf0', '#a6ccd9', '#6ea6bd', '#3f7f9c', '#1f5670'];
/** Categoría: especial (0) y primera a sexta (1-6), de oscuro a claro */
export const COLORES_CATEGORIA = ['#2e1747', '#4b2470', '#6a3592', '#8a52ad', '#a370c0', '#bd93d2', '#d6b8e4'];
/** Curules posibles por la Ley 136 de 1994, art. 22 */
export const CURULES_LEY_136 = [7, 9, 11, 13, 15, 17, 19, 21];
export const COLORES_CURULES = ['#efe7d8', '#dccaa9', '#c6aa7c', '#ad8a55', '#916d3a', '#735227', '#553b19', '#3a270e'];
export { COLOR_SIN_DATO };

// --- Valores por territorio -------------------------------------------------------------------

const suma = (xs: number[]) => xs.reduce((a, b) => a + b, 0);

/** Índices de los grupos de edad (quinquenales de 17 o decenales de 9) */
function gruposEdad(n: number, metrica: 'jovenes' | 'mayores'): number[] {
  if (n === 9) return metrica === 'jovenes' ? [2] : [6, 7, 8];
  return metrica === 'jovenes' ? [4, 5] : [12, 13, 14, 15, 16];
}

/** % de la métrica demográfica a partir de los conteos del CNPV 2018 (null si el DANE no da sexo ni edad) */
export function valorDemografico(d: Pick<Demografia, 'hombres' | 'mujeres' | 'edades'>, metrica: MetricaDemografica): number | null {
  if (metrica === 'mujeres') {
    const base = d.hombres + d.mujeres;
    return base ? (100 * d.mujeres) / base : null;
  }
  const base = suma(d.edades);
  return base ? (100 * suma(gruposEdad(d.edades.length, metrica).map((i) => d.edades[i]))) / base : null;
}

export interface ValorTerritorio {
  valor: number | null;
  /** Texto para el tooltip */
  texto: string;
  fuente: string;
}

const SIN_INFO: ValorTerritorio = { valor: null, texto: 'Sin información', fuente: '' };
const fmtPct = (v: number) => `${v.toFixed(1).replace('.', ',')} %`;

/** Barrio, vereda o comuna (escala municipal): CNPV 2018 por manzana */
export function valorSubdivision(id: string, capa: 'demografico' | 'economico', metrica: MetricaDemografica | MetricaEconomica): ValorTerritorio {
  const t = territorioFicha(id);
  if (!t) return SIN_INFO;
  if (capa === 'demografico') {
    const s = demografia(t);
    if (!s.datos || !s.conDetalle) return { ...SIN_INFO, texto: 'Sin información (el DANE no publica sexo ni edad aquí)' };
    const v = valorDemografico(s.datos, metrica as MetricaDemografica);
    return v === null ? SIN_INFO : { valor: v, texto: fmtPct(v), fuente: 'DANE, CNPV 2018' };
  }
  const e = economia(t);
  if (!e) return SIN_INFO;
  if (metrica === 'estrato') return e.estratoModa ? { valor: e.estratoModa, texto: `Estrato típico ${e.estratoModa} (promedio ${e.estratoPromedio!.toFixed(1).replace('.', ',')})`, fuente: 'DANE, CNPV 2018' } : SIN_INFO;
  if (metrica === 'ipm') return e.ipm !== null ? { valor: e.ipm, texto: `IPM ${fmtPct(e.ipm)}`, fuente: 'DANE, IPM por manzana' } : SIN_INFO;
  if (metrica === 'superior') {
    const v = e.educacion.filter((x) => x.nombre === 'Técnica o universitaria' || x.nombre === 'Posgrado').reduce((a, x) => a + x.pct, 0);
    const conDato = e.educacion.some((x) => x.pct > 0);
    return conDato ? { valor: v, texto: `${fmtPct(v)} con educación técnica o universitaria`, fuente: 'DANE, CNPV 2018' } : SIN_INFO;
  }
  return SIN_INFO;
}

/** Municipio (escala departamental): proyección DANE 2026 por sexo y edad, o NBI */
export function valorMunicipio(dane: string, nbi: number | undefined, capa: 'demografico' | 'economico', metrica: MetricaDemografica | MetricaEconomica): ValorTerritorio {
  if (capa === 'economico') {
    if (metrica !== 'nbi' || nbi == null) return SIN_INFO;
    return { valor: nbi, texto: `NBI ${fmtPct(nbi)}`, fuente: 'DANE, NBI municipal' };
  }
  const id = municipioFichaPorDane(dane);
  const t = id ? territorioFicha(id) : null;
  const p = t ? piramide2026(t) : null;
  if (!p) return SIN_INFO;
  const edades = p.hombres.map((h, i) => h + p.mujeres[i]);
  const v = valorDemografico({ hombres: suma(p.hombres), mujeres: suma(p.mujeres), edades }, metrica as MetricaDemografica);
  return v === null ? SIN_INFO : { valor: v, texto: `${fmtPct(v)} (2026)`, fuente: 'DANE, proyección 2026' };
}

/** Capa institucional de un municipio. Presupuesto: definitivo 2025 / población DANE 2026 */
export function valorInstitucional(dane: string, metrica: MetricaInstitucional): ValorTerritorio {
  if (metrica === 'presupuestoHab') {
    const a = presupuestoMunicipio(dane)?.anios.find((x) => x.anio === '2025')?.datos;
    return a ? { valor: a.porHabitante, texto: `${pesos(a.porHabitante)} por habitante (2025)`, fuente: 'Contraloría, CUIPO' } : SIN_INFO;
  }
  if (metrica === 'categoria') {
    const c = categoriaMunicipio(dane)?.lista[0];
    if (!c) return SIN_INFO;
    return { valor: c.categoria === 'E' ? 0 : Number(c.categoria), texto: `Categoría ${(CATEGORIA_TEXTO[c.categoria] ?? c.categoria).toLowerCase()} (${c.vigencia})`, fuente: 'Contaduría General de la Nación' };
  }
  const k = curulesConcejo(dane, '2023');
  return k ? { valor: k.curules, texto: `${k.curules} curules en el Concejo 2023`, fuente: 'Registraduría' } : SIN_INFO;
}

/** Color de las métricas institucionales por clase (categoría y curules) */
export function colorInstitucional(metrica: MetricaInstitucional, valor: number | null): string {
  if (valor === null) return COLOR_SIN_DATO;
  if (metrica === 'categoria') return COLORES_CATEGORIA.at(valor) ?? COLOR_SIN_DATO;
  const i = CURULES_LEY_136.indexOf(valor);
  return i === -1 ? COLOR_SIN_DATO : COLORES_CURULES.at(i) ?? COLOR_SIN_DATO;
}

/** Leyenda de las métricas institucionales por clase */
export function leyendaInstitucional(metrica: 'categoria' | 'curules'): { color: string; texto: string }[] {
  if (metrica === 'categoria') return ['E', '1', '2', '3', '4', '5', '6'].map((c, i) => ({ color: COLORES_CATEGORIA.at(i)!, texto: CATEGORIA_TEXTO[c] }));
  return CURULES_LEY_136.map((n, i) => ({ color: COLORES_CURULES.at(i)!, texto: `${n} curules` }));
}

// --- Escalas ----------------------------------------------------------------------------------

/** Cortes superiores de 5 clases por quintiles (sin repetir); el último es el máximo */
export function cortesQuintiles(valores: number[]): number[] {
  const v = valores.filter((x) => Number.isFinite(x)).sort((a, b) => a - b);
  if (!v.length) return [];
  const cortes = [1, 2, 3, 4, 5].map((k) => v[Math.min(v.length - 1, Math.ceil((k * v.length) / 5) - 1)]);
  return [...new Set(cortes)];
}

export function colorPorCortes(valor: number | null, cortes: number[], paleta: string[]): string {
  if (valor === null || !cortes.length) return COLOR_SIN_DATO;
  const i = cortes.findIndex((c) => valor <= c);
  const clase = i === -1 ? cortes.length - 1 : i;
  // Con menos de 5 clases se reparten los tonos de la paleta a lo ancho
  const tono = cortes.length === 1 ? paleta.length - 1 : Math.round((clase * (paleta.length - 1)) / (cortes.length - 1));
  return paleta[tono];
}

export function colorEstrato(estrato: number | null): string {
  return estrato ? COLORES_ESTRATO[estrato - 1] : COLOR_SIN_DATO;
}

const fmtPctCorto = (v: number) => `${v.toFixed(1).replace('.', ',')} %`;

/** Rangos de la leyenda: "18,2 – 24,0 %" (o con el formato que se pase, p. ej. pesos) */
export function rangosLeyenda(valores: number[], cortes: number[], paleta: string[], formato: (v: number) => string = fmtPctCorto): { color: string; texto: string }[] {
  const min = Math.min(...valores.filter((x) => Number.isFinite(x)));
  const f = (v: number) => formato(v).replace(/ %$/, '');
  return cortes.map((c, i) => ({
    color: colorPorCortes(c, cortes, paleta),
    texto: formato === fmtPctCorto ? `${f(i === 0 ? min : cortes[i - 1])} – ${f(c)} %` : `${formato(i === 0 ? min : cortes[i - 1])} – ${formato(c)}`,
  }));
}

// --- Elecciones: año y tipo ---------------------------------------------------------------------

const anioDe = (id: string) => Number(/-(\d{4})(?:-\d)?$/.exec(id)?.[1] ?? 0);
/** "Presidencia 2026 · 1.ª vuelta" -> "Presidencia · 1.ª vuelta" */
export const nombreTipo = (nombre: string) => nombre.replace(/\s+\d{4}\b/, '').trim();

/** Años disponibles (más reciente primero) y, por año, sus tipos de elección */
export function aniosYTipos(elecciones: { id: string; nombre: string }[]): { anio: number; tipos: { id: string; tipo: string; nombre: string }[] }[] {
  const porAnio = new Map<number, { id: string; tipo: string; nombre: string }[]>();
  for (const e of elecciones) {
    const a = anioDe(e.id);
    if (!a) continue;
    porAnio.set(a, [...(porAnio.get(a) ?? []), { id: e.id, tipo: tipoEleccion(e.id), nombre: nombreTipo(e.nombre) }]);
  }
  return [...porAnio.entries()].sort((a, b) => b[0] - a[0]).map(([anio, tipos]) => ({ anio, tipos }));
}

/** Elección de otro año conservando el tipo si existe (si no, la primera de ese año) */
export function eleccionDelAnio(elecciones: { id: string; nombre: string }[], anio: number, tipoActual: string): string | null {
  const t = aniosYTipos(elecciones).find((x) => x.anio === anio)?.tipos;
  if (!t?.length) return null;
  return (t.find((x) => x.tipo === tipoActual) ?? t[0]).id;
}

// --- Puestos de una elección --------------------------------------------------------------------

export interface PuntoEleccion {
  cod: string;
  nombre: string;
  lat: number;
  lon: number;
  aproximado: boolean;
  habilitados: number;
  ganador: string | null;
  partido: string | null;
  pct: number | null;
  /** Puesto del censo 2026 (abre la ficha de puesto); null en elecciones de otros años */
  puesto2026: PuestoVotacion | null;
}

/**
 * Puestos de la elección con su resultado. Los códigos y la ubicación de los puestos cambian por
 * elección: 2026 usa los puestos del censo 2026; los demás años, los de ese año con su ubicación.
 */
export function puntosEleccion(e: EleccionPuestos, puestos2026: PuestoVotacion[]): PuntoEleccion[] {
  const lider = (cod: string) => {
    const r = sumarEleccion(e, [cod]);
    const l = r && (e.porCandidato ? r.candidatos[0] : r.partidos[0]);
    return l ? { ganador: l.nombre, partido: 'partido' in l ? String(l.partido) : l.nombre, pct: l.pct } : { ganador: null, partido: null, pct: null };
  };
  if (e.codigos === '2026') {
    return puestos2026.filter(tieneCoordenadas).map((p) => {
      const d = p.divipole2023;
      return {
        cod: p.codPuesto, nombre: p.puesto, lat: d.lat, lon: d.lon,
        aproximado: d.cruce === 'aproximado' || d.precision === 'aproximada',
        habilitados: e.puestos[p.codPuesto]?.habilitados ?? p.total,
        ...(e.puestos[p.codPuesto] ? lider(p.codPuesto) : { ganador: null, partido: null, pct: null }),
        puesto2026: p,
      };
    });
  }
  return Object.entries(e.ubicaciones ?? {})
    .filter(([c]) => e.puestos[c])
    .map(([c, u]) => ({
      cod: c, nombre: e.nombres[c] ?? c, lat: u.lat, lon: u.lon, aproximado: Boolean(u.a),
      habilitados: e.puestos[c].habilitados, ...lider(c), puesto2026: null,
    }));
}

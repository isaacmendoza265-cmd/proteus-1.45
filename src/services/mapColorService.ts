/**
 * COLOR DEL MAPA POR CAPA (electoral, demográfica, económica)
 *
 * Cada territorio (barrio, vereda, comuna o municipio) y cada puesto se colorea con un dato de
 * fuente conocida. Si no hay dato, va en gris ("Sin información"); nunca se inventa un valor.
 * - Barrios, veredas y comunas: DANE, CNPV 2018 por manzana (demografía y economía).
 * - Municipios: proyección DANE 2026 por sexo y edad; NBI del DANE.
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

export const PALETA_DEMOGRAFICA = ['#e6e3f5', '#b9b1e3', '#8a7fcf', '#5f53b0', '#3a2f86'];
export const PALETA_ECONOMICA = ['#fde7c8', '#f6b27a', '#e97c4c', '#c9502e', '#8f2d1f'];
/** Estratos 1 a 6 (misma paleta que ya usaba el mapa) */
export const COLORES_ESTRATO = ['#9B2C2C', '#C05621', '#B7791F', '#2F855A', '#2B6CB0', '#553C9A'];
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

/** Rangos de la leyenda: "18,2 – 24,0 %" */
export function rangosLeyenda(valores: number[], cortes: number[], paleta: string[]): { color: string; texto: string }[] {
  const min = Math.min(...valores.filter((x) => Number.isFinite(x)));
  return cortes.map((c, i) => ({
    color: colorPorCortes(c, cortes, paleta),
    texto: `${(i === 0 ? min : cortes[i - 1]).toFixed(1).replace('.', ',')} – ${c.toFixed(1).replace('.', ',')} %`,
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

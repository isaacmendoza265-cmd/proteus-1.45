/**
 * VALOR DEL SUELO POR BARRIO Y VEREDA (Mapa de Valores de Suelo Metropolitano del AMVA).
 *
 * src/data/valoresSuelo/<municipio>.json, generados con `python3 scripts/build_valores_suelo_amva.py`. Sustituye a la
 * estratificación oficial en los 8 municipios del Valle de Aburrá que no la publican; Medellín y Sabaneta usan la suya.
 * Cada municipio reporta un solo tipo de valor (catastral o comercial): no se comparan municipios de tipo distinto.
 */
import { idsBarrios, territorioFicha, type TerritorioFicha } from './territoryProfileService';

interface Celda { area: number; suma: number; areaTotal?: number }
interface Archivo {
  meta: { fuente: string; url: string; licencia: string; tipo: 'catastral' | 'comercial'; zonas: number; nota: string };
  municipio: Celda;
  porTerritorio: Record<string, Celda>;
}
const ARCHIVOS = import.meta.glob<Archivo>('../data/valoresSuelo/*.json', { eager: true, import: 'default' });

export interface ValorSuelo {
  /** Pesos por m², promedio ponderado por área */
  valorM2: number;
  tipo: 'catastral' | 'comercial';
  /** % del área del territorio cubierta por zonas con valor (null en el municipio) */
  cobertura: number | null;
  fuente: string;
  url: string;
  nota: string;
  /** Barrios y veredas del territorio ordenados del más caro al más barato (para el municipio o una comuna) */
  ranking: { id: string; valorM2: number }[];
  /** Promedio de los barrios (zona urbana) y de las veredas, cuando el territorio tiene ambos */
  urbano: number | null;
  rural: number | null;
}

const prom = (cs: Celda[]) => {
  const a = cs.reduce((s, c) => s + c.area, 0);
  return a ? cs.reduce((s, c) => s + c.suma, 0) / a : null;
};

export function valorSuelo(t: TerritorioFicha, slug: string | null): ValorSuelo | null {
  const a = slug ? ARCHIVOS[`../data/valoresSuelo/${slug}.json`] : undefined;
  if (!a) return null;
  const ids = idsBarrios(t).filter((id) => a.porTerritorio[id]);
  const celdas = t.tipo === 'municipio' ? [a.municipio] : ids.map((id) => a.porTerritorio[id]);
  const v = prom(celdas);
  if (v == null) return null;
  const areaTotal = ids.reduce((s, id) => s + (a.porTerritorio[id].areaTotal ?? 0), 0);
  const esRural = (id: string) => /vereda|rural|corregimiento/i.test(territorioFicha(id)?.clase ?? '');
  return {
    valorM2: v,
    tipo: a.meta.tipo,
    cobertura: t.tipo === 'municipio' || !areaTotal ? null : (100 * celdas.reduce((s, c) => s + c.area, 0)) / areaTotal,
    fuente: a.meta.fuente,
    url: a.meta.url,
    nota: a.meta.nota,
    ranking: ids.map((id) => ({ id, valorM2: a.porTerritorio[id].suma / a.porTerritorio[id].area })).sort((x, y) => y.valorM2 - x.valorM2),
    urbano: prom(ids.filter((id) => !esRural(id)).map((id) => a.porTerritorio[id])),
    rural: prom(ids.filter(esRural).map((id) => a.porTerritorio[id])),
  };
}

/**
 * DATOS OFICIALES DEL DANE POR MUNICIPIO (Antioquia)
 * - Población: proyecciones municipales por área 2018-2042 (actualización 30-jul-2025), año 2026.
 * - NBI y miseria: Censo Nacional de Población y Vivienda 2018.
 * Se generan con `python3 scripts/build_datos_dane.py` desde _originales/dane/.
 */
import raw from '../data/dane/antioquiaDane.json';
import { getMunicipalCensus } from './electoralCensusService';

export interface DaneMunicipio {
  nombre: string;
  poblacion: number;
  poblacionCabecera: number;
  poblacionRural: number;
  nbi2018: number;
  miseria2018: number;
}

const DATA = raw as unknown as { meta: { fuentePoblacion: string; fuenteNbi: string; anioPoblacion: number }; municipios: Record<string, DaneMunicipio> };

export const DANE_META = DATA.meta;

/** Por código DANE ('05001'), id 'mpio-05001' o nombre (se resuelve con los alias del censo electoral) */
export function getDaneMunicipio(nameOrCode: string): DaneMunicipio | undefined {
  const code = /(\d{5})$/.exec(nameOrCode)?.[1] ?? getMunicipalCensus(nameOrCode)?.dane ?? undefined;
  return code ? DATA.municipios[code] : undefined;
}

export function getAllDaneMunicipios(): Record<string, DaneMunicipio> {
  return DATA.municipios;
}

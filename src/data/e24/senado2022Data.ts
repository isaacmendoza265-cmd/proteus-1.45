/**
 * Senado 2022 en Medellín por zona electoral: escrutinio mesa a mesa REAL (Observatorio de la
 * Registraduría, MMV_CONGRESO_2022_ANTIOQUIA), con votos solo por la lista y por cada candidato.
 * Antes: totales por zona transcritos del E-24 y votos "solo por la lista" estimados con porcentajes
 * fijos por partido. Datos: src/data/e24/medellinZonasReales.json (scripts/build_e24_medellin_zonas.py).
 */
import { ZoneId } from './types';
import { buildRealZoneDataset } from './realZoneDatasets';

export const ZONE_IDS_2022: ZoneId[] = [
  '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16',
  '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32',
  '90', '98', '99',
];

const DATASET = buildRealZoneDataset('senado-2022');
export const SENADO_2022_PARTIES = DATASET.parties;
export const SENADO_2022_CANDIDATES = DATASET.candidates;
export const SENADO_2022_ZONE_VOTES = DATASET.zoneVotes;
export const SENADO_2022_COMUNA_AGGREGATIONS = DATASET.comunaAggregations;
export const SENADO_2022_MUNICIPAL_SUMMARY = DATASET.municipalSummary;

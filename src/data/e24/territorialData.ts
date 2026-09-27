import { Party, Candidate, ZoneVotes, ZoneId, ComunaPartySummary, ComunaVotesAggregation, MunicipalSummary, ElectionType } from './types';
import { buildRealZoneDataset } from './realZoneDatasets';
import { getMedellinZoneCensus } from '../../services/electoralCensusService';

export const TERRITORIAL_YEARS = [2023, 2019, 2015] as const;
export type TerritorialYear = typeof TERRITORIAL_YEARS[number];

// Peso de cada zona electoral de Medellín = su participación en el censo oficial
// (Registraduría, corte 30-abr-2026). Antes eran pesos estimados a mano.
const ZONE_IDS: ZoneId[] = [
  '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16',
  '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32',
  '90', '98', '99',
];
const MEDELLIN_CENSUS_TOTAL = ZONE_IDS.reduce((sum, z) => sum + (getMedellinZoneCensus(z)?.total ?? 0), 0);
export const ZONE_POPULATION_WEIGHTS: Record<ZoneId, number> = Object.fromEntries(
  ZONE_IDS.map((z) => [z, (getMedellinZoneCensus(z)?.total ?? 0) / MEDELLIN_CENSUS_TOTAL]),
) as Record<ZoneId, number>;


// -------------------------------------------------------------
// Resultados REALES por zona (Alcaldía, Gobernación, Concejo, Asamblea x 2023, 2019, 2015), sumados
// desde los resultados por puesto de la Registraduría (ver realZoneDatasets.ts). Reemplaza el modelo
// anterior, que repartía totales municipales escritos a mano entre zonas con pesos de censo y
// "afinidades" ideológicas inventadas.
// -------------------------------------------------------------
type TipoTerritorial = 'alcaldia' | 'gobernacion' | 'concejo' | 'asamblea';
export const TERRITORIAL_DATASETS: Record<TipoTerritorial, Record<TerritorialYear, ReturnType<typeof buildRealZoneDataset>>> = Object.fromEntries(
  (['alcaldia', 'gobernacion', 'concejo', 'asamblea'] as const).map((t) => [t, Object.fromEntries(TERRITORIAL_YEARS.map((y) => [y, buildRealZoneDataset(`${t}-${y}`)]))]),
) as Record<TipoTerritorial, Record<TerritorialYear, ReturnType<typeof buildRealZoneDataset>>>;

// Accessor helpers
export function isTerritorialElection(type?: ElectionType | string): type is 'alcaldia' | 'gobernacion' | 'concejo' | 'asamblea' {
  return ['alcaldia', 'gobernacion', 'concejo', 'asamblea'].includes(type as any);
}

export function getTerritorialDataset(type: 'alcaldia' | 'gobernacion' | 'concejo' | 'asamblea', year: number = 2023) {
  const validYear: TerritorialYear = ([2023, 2019, 2015].includes(year as any) ? year : 2023) as TerritorialYear;
  return TERRITORIAL_DATASETS[type]?.[validYear] || TERRITORIAL_DATASETS[type][2023];
}

export function getTerritorialParties(type: 'alcaldia' | 'gobernacion' | 'concejo' | 'asamblea', year: number = 2023): Party[] {
  return getTerritorialDataset(type, year).parties;
}

export function getTerritorialCandidates(type: 'alcaldia' | 'gobernacion' | 'concejo' | 'asamblea', year: number = 2023): Record<string, Candidate[]> {
  return getTerritorialDataset(type, year).candidates;
}

export function getTerritorialComunaAggregations(type: 'alcaldia' | 'gobernacion' | 'concejo' | 'asamblea', year: number = 2023): Record<number, ComunaVotesAggregation> {
  return getTerritorialDataset(type, year).comunaAggregations;
}

export function getTerritorialMunicipalSummary(type: 'alcaldia' | 'gobernacion' | 'concejo' | 'asamblea', year: number = 2023): MunicipalSummary {
  return getTerritorialDataset(type, year).municipalSummary;
}

export function getTerritorialZoneVotes(type: 'alcaldia' | 'gobernacion' | 'concejo' | 'asamblea', year: number = 2023): Record<ZoneId, ZoneVotes> {
  return getTerritorialDataset(type, year).zoneVotes;
}

export function getTerritorialZonePartySummary(type: 'alcaldia' | 'gobernacion' | 'concejo' | 'asamblea', zoneId: ZoneId = '01', year: number = 2023): {
  zone: ZoneId;
  parties: ComunaPartySummary[];
  votosBlanco: number;
  votosNulos: number;
  votosNoMarcados: number;
  votosValidos: number;
  totalVotos: number;
  winnerParty: ComunaPartySummary;
} {
  const dataset = getTerritorialDataset(type, year);
  const zv = dataset.zoneVotes[zoneId] || {
    zone: zoneId,
    votosBlanco: 0,
    votosNulos: 0,
    votosNoMarcados: 0,
    votosValidos: 0,
    totalVotos: 0,
    parties: {}
  };

  const list: ComunaPartySummary[] = dataset.parties.map(p => {
    const pz = zv.parties[p.id];
    return {
      partyId: p.id,
      partyName: p.name,
      shortName: p.shortName,
      color: p.color,
      partyOnly: pz ? pz.partyOnly : 0,
      candidateVotes: pz ? pz.candidateVotes : {},
      totalPartyVotes: pz ? pz.totalPartyVotes : 0,
      percentageValidos: zv.votosValidos > 0 && pz ? (pz.totalPartyVotes / zv.votosValidos) * 100 : 0,
      municipalPercentage: dataset.municipalSummary.votosValidos > 0 && pz ? (pz.totalPartyVotes / dataset.municipalSummary.votosValidos) * 100 : 0
    };
  }).sort((a, b) => b.totalPartyVotes - a.totalPartyVotes);

  const defaultWinner: ComunaPartySummary = {
    partyId: '',
    partyName: 'N/A',
    shortName: 'N/A',
    color: '#6b7280',
    partyOnly: 0,
    candidateVotes: {},
    totalPartyVotes: 0,
    percentageValidos: 0,
    municipalPercentage: 0
  };

  return {
    zone: zoneId,
    parties: list,
    votosBlanco: zv.votosBlanco,
    votosNulos: zv.votosNulos,
    votosNoMarcados: zv.votosNoMarcados,
    votosValidos: zv.votosValidos,
    totalVotos: zv.totalVotos,
    winnerParty: list[0] || defaultWinner
  };
}

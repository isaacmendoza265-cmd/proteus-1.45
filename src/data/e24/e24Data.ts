import { ComunaInfo, ZoneId, ZoneVotes, ComunaVotesAggregation, MunicipalSummary, ComunaPartySummary, ElectionType, Candidate, Party } from './types';
import { COMUNAS_INFO } from './comunasData';
import { PARTIES, PARTY_CANDIDATES, ALL_PROMINENT_CANDIDATES } from './partiesData';
import { ALL_ZONES, RAW_E24_PARTIES, RAW_VOTOS_EN_BLANCO, RAW_VOTOS_NO_MARCADOS, RAW_VOTOS_NULOS } from './e24RawData';
import { 
  PRESIDENCIA_CANDIDATES, 
  RAW_ZONE_VOTES_PRESIDENCIA, 
  MUNICIPAL_SUMMARY_PRESIDENCIA, 
  COMUNA_AGGREGATIONS_PRESIDENCIA, 
  getZonePartySummaryPresidencia, 
  PRESIDENTIAL_STAGES,
  COMUNA_AGGREGATIONS_PRESIDENCIA_2022_1V,
  COMUNA_AGGREGATIONS_PRESIDENCIA_2022_2V,
  MUNICIPAL_SUMMARY_PRESIDENCIA_2022_1V,
  MUNICIPAL_SUMMARY_PRESIDENCIA_2022_2V
} from './presidenciaData';
import {
  isTerritorialElection,
  getTerritorialParties,
  getTerritorialCandidates,
  getTerritorialMunicipalSummary,
  getTerritorialComunaAggregations,
  getTerritorialZoneVotes,
  getTerritorialZonePartySummary,
  TERRITORIAL_YEARS,
  TerritorialYear
} from './territorialData';
import {
  CAMARA_2022_PARTIES,
  CAMARA_2022_CANDIDATES,
  CAMARA_2022_COMUNA_AGGREGATIONS,
  CAMARA_2022_ZONE_VOTES,
  CAMARA_2022_MUNICIPAL_SUMMARY
} from './camara2022Data';
import {
  SENADO_2022_PARTIES,
  SENADO_2022_CANDIDATES,
  SENADO_2022_COMUNA_AGGREGATIONS,
  SENADO_2022_ZONE_VOTES,
  SENADO_2022_MUNICIPAL_SUMMARY
} from './senado2022Data';

export { COMUNAS_INFO };
export { PARTIES, PARTY_CANDIDATES, ALL_PROMINENT_CANDIDATES };
export { CAMARA_PARTIES, CAMARA_CANDIDATES, PRESIDENCIA_CANDIDATES, PRESIDENTIAL_STAGES };
export {
  isTerritorialElection,
  getTerritorialParties,
  getTerritorialCandidates,
  getTerritorialMunicipalSummary,
  getTerritorialComunaAggregations,
  getTerritorialZoneVotes,
  getTerritorialZonePartySummary,
  TERRITORIAL_YEARS
};

// Build structured ZoneVotes
export const RAW_ZONE_VOTES: Record<ZoneId, ZoneVotes> = (() => {
  const result: Partial<Record<ZoneId, ZoneVotes>> = {};

  ALL_ZONES.forEach((zone, index) => {
    const partiesMap: Record<string, { partyOnly: number; candidateVotes: Record<string, number>; totalPartyVotes: number }> = {};
    let totalPartyVotosInZone = 0;

    PARTIES.forEach(party => {
      const rawParty = RAW_E24_PARTIES[party.id];
      const partyOnly = rawParty ? rawParty.partyOnlyVotes[index] : 0;
      const candidateVotes: Record<string, number> = {};

      if (rawParty && rawParty.candidates) {
        Object.entries(rawParty.candidates).forEach(([candId, votesArr]) => {
          candidateVotes[candId] = votesArr[index] || 0;
        });
      }

      const totalPartyVotes = rawParty ? rawParty.totalVotes[index] : partyOnly;
      totalPartyVotosInZone += totalPartyVotes;

      partiesMap[party.id] = {
        partyOnly,
        candidateVotes,
        totalPartyVotes
      };
    });

    const blanco = RAW_VOTOS_EN_BLANCO[index];
    const nulos = RAW_VOTOS_NULOS[index];
    const noMarcados = RAW_VOTOS_NO_MARCADOS[index];
    const validos = totalPartyVotosInZone + blanco;
    const totalVotos = validos + nulos + noMarcados;

    result[zone] = {
      zone,
      parties: partiesMap,
      votosBlanco: blanco,
      votosNulos: nulos,
      votosNoMarcados: noMarcados,
      votosValidos: validos,
      totalVotos
    };
  });

  return result as Record<ZoneId, ZoneVotes>;
})();

// Calculate Municipal Summary
export const MUNICIPAL_SUMMARY: MunicipalSummary = (() => {
  const partiesSummary: Record<string, {
    partyId: string;
    partyName: string;
    shortName: string;
    color: string;
    partyOnly: number;
    candidateVotes: Record<string, number>;
    totalPartyVotes: number;
    percentageValidos: number;
  }> = {};

  let sumBlanco = 0;
  let sumNulos = 0;
  let sumNoMarcados = 0;
  let sumValidos = 0;
  let sumTotal = 0;

  ALL_ZONES.forEach((zone) => {
    const zv = RAW_ZONE_VOTES[zone];
    sumBlanco += zv.votosBlanco;
    sumNulos += zv.votosNulos;
    sumNoMarcados += zv.votosNoMarcados;
    sumValidos += zv.votosValidos;
    sumTotal += zv.totalVotos;
  });

  PARTIES.forEach((party) => {
    const rawParty = RAW_E24_PARTIES[party.id];
    let totalPartyVotes = 0;
    let partyOnly = 0;
    const candidateVotes: Record<string, number> = {};

    if (rawParty) {
      partyOnly = rawParty.partyOnlyVotes.reduce((a, b) => a + b, 0);
      totalPartyVotes = rawParty.totalVotes.reduce((a, b) => a + b, 0);

      Object.entries(rawParty.candidates).forEach(([candId, votesArr]) => {
        candidateVotes[candId] = votesArr.reduce((a, b) => a + b, 0);
      });
    }

    partiesSummary[party.id] = {
      partyId: party.id,
      partyName: party.name,
      shortName: party.shortName,
      color: party.color,
      partyOnly,
      candidateVotes,
      totalPartyVotes,
      percentageValidos: (totalPartyVotes / sumValidos) * 100
    };
  });

  const sortedParties = Object.values(partiesSummary).sort((a, b) => b.totalPartyVotes - a.totalPartyVotes);

  return {
    totalMesas: 5499,
    mesasEscrutadas: 5499,
    porcentajeEscrutado: 100.0,
    parties: partiesSummary,
    sortedParties,
    totalPorPartidos: sumValidos - sumBlanco,
    votosBlanco: sumBlanco,
    votosNulos: sumNulos,
    votosNoMarcados: sumNoMarcados,
    votosValidos: sumValidos,
    totalVotos: sumTotal
  };
})();

// Aggregate Comunas (summing corresponding 2 zones, or 1 zone for special ones)
export const COMUNA_AGGREGATIONS: Record<number, ComunaVotesAggregation> = (() => {
  const result: Record<number, ComunaVotesAggregation> = {};

  COMUNAS_INFO.forEach((comuna) => {
    const partiesMap: Record<string, ComunaPartySummary> = {};
    let votosBlanco = 0;
    let votosNulos = 0;
    let votosNoMarcados = 0;
    let votosValidos = 0;
    let totalVotos = 0;

    // Initialize party map
    PARTIES.forEach(party => {
      partiesMap[party.id] = {
        partyId: party.id,
        partyName: party.name,
        shortName: party.shortName,
        color: party.color,
        partyOnly: 0,
        candidateVotes: {},
        totalPartyVotes: 0,
        percentageValidos: 0,
        municipalPercentage: 0
      };
    });

    comuna.zones.forEach((zone) => {
      const zv = RAW_ZONE_VOTES[zone];
      votosBlanco += zv.votosBlanco;
      votosNulos += zv.votosNulos;
      votosNoMarcados += zv.votosNoMarcados;
      votosValidos += zv.votosValidos;
      totalVotos += zv.totalVotos;

      PARTIES.forEach((party) => {
        const zp = zv.parties[party.id];
        if (zp) {
          partiesMap[party.id].partyOnly += zp.partyOnly;
          partiesMap[party.id].totalPartyVotes += zp.totalPartyVotes;

          Object.entries(zp.candidateVotes).forEach(([candId, count]) => {
            partiesMap[party.id].candidateVotes[candId] = (partiesMap[party.id].candidateVotes[candId] || 0) + count;
          });
        }
      });
    });

    // Calculate percentages
    Object.values(partiesMap).forEach(p => {
      p.percentageValidos = votosValidos > 0 ? (p.totalPartyVotes / votosValidos) * 100 : 0;
      p.municipalPercentage = MUNICIPAL_SUMMARY.votosValidos > 0 ? (p.totalPartyVotes / MUNICIPAL_SUMMARY.votosValidos) * 100 : 0;
    });

    const sorted = Object.values(partiesMap).sort((a, b) => b.totalPartyVotes - a.totalPartyVotes);
    const winner = sorted[0];
    const runnerUp = sorted[1] || sorted[0];

    result[comuna.id] = {
      comunaId: comuna.id,
      comunaName: comuna.comunaName,
      officialName: comuna.officialName,
      zones: comuna.zones,
      parties: partiesMap,
      sortedParties: sorted,
      votosBlanco,
      votosNulos,
      votosNoMarcados,
      votosValidos,
      totalVotos,
      winnerPartyId: winner.partyId,
      winnerPartyName: winner.shortName,
      winnerPartyVotes: winner.totalPartyVotes,
      winnerPartyPercentage: winner.percentageValidos,
      runnerUpPartyId: runnerUp.partyId,
      runnerUpPartyName: runnerUp.shortName,
      runnerUpPartyVotes: runnerUp.totalPartyVotes,
      runnerUpPartyPercentage: runnerUp.percentageValidos
    };
  });

  return result;
})();

// Helper function to get Zone votes formatted cleanly
export function getZonePartySummary(zoneId: ZoneId): {
  zone: ZoneId;
  parties: ComunaPartySummary[];
  votosBlanco: number;
  votosNulos: number;
  votosNoMarcados: number;
  votosValidos: number;
  totalVotos: number;
  winnerParty: ComunaPartySummary;
} {
  const zv = RAW_ZONE_VOTES[zoneId];
  const list: ComunaPartySummary[] = PARTIES.map(party => {
    const zp = zv.parties[party.id] || { partyOnly: 0, candidateVotes: {}, totalPartyVotes: 0 };
    return {
      partyId: party.id,
      partyName: party.name,
      shortName: party.shortName,
      color: party.color,
      partyOnly: zp.partyOnly,
      candidateVotes: zp.candidateVotes,
      totalPartyVotes: zp.totalPartyVotes,
      percentageValidos: zv.votosValidos > 0 ? (zp.totalPartyVotes / zv.votosValidos) * 100 : 0,
      municipalPercentage: MUNICIPAL_SUMMARY.votosValidos > 0 ? (zp.totalPartyVotes / MUNICIPAL_SUMMARY.votosValidos) * 100 : 0
    };
  }).sort((a, b) => b.totalPartyVotes - a.totalPartyVotes);

  return {
    zone: zoneId,
    parties: list,
    votosBlanco: zv.votosBlanco,
    votosNulos: zv.votosNulos,
    votosNoMarcados: zv.votosNoMarcados,
    votosValidos: zv.votosValidos,
    totalVotos: zv.totalVotos,
    winnerParty: list[0]
  };
}

// Unified Multi-Election API
export function getElectionParties(type?: ElectionType | string, year?: number): Party[] {
  if (isTerritorialElection(type)) {
    return getTerritorialParties(type, year);
  }
  if (year === 2022) {
    if (type === 'camara') return CAMARA_2022_PARTIES;
    if (type === 'senado') return SENADO_2022_PARTIES;
  }
  switch (type) {
    case 'camara':
      return CAMARA_PARTIES;
    case 'presidencia':
      return PRESIDENCIA_CANDIDATES;
    case 'senado':
    default:
      return PARTIES;
  }
}

export function getElectionCandidates(type?: ElectionType | string, year?: number): Record<string, Candidate[]> {
  if (isTerritorialElection(type)) {
    return getTerritorialCandidates(type, year);
  }
  if (year === 2022) {
    if (type === 'camara') return CAMARA_2022_CANDIDATES;
    if (type === 'senado') return SENADO_2022_CANDIDATES;
  }
  switch (type) {
    case 'camara':
      return CAMARA_CANDIDATES;
    case 'presidencia':
      return {};
    case 'senado':
    default:
      return PARTY_CANDIDATES;
  }
}

export function getElectionMunicipalSummary(type?: ElectionType | string, year?: number, stage?: string): MunicipalSummary {
  if (isTerritorialElection(type)) {
    return getTerritorialMunicipalSummary(type, year);
  }
  if (year === 2022) {
    if (type === 'camara') return CAMARA_2022_MUNICIPAL_SUMMARY;
    if (type === 'senado') return SENADO_2022_MUNICIPAL_SUMMARY;
    if (type === 'presidencia') {
      return stage === 'segunda_vuelta' 
        ? MUNICIPAL_SUMMARY_PRESIDENCIA_2022_2V 
        : MUNICIPAL_SUMMARY_PRESIDENCIA_2022_1V;
    }
  }
  switch (type) {
    case 'camara':
      return MUNICIPAL_SUMMARY_CAMARA;
    case 'presidencia':
      return MUNICIPAL_SUMMARY_PRESIDENCIA;
    case 'senado':
    default:
      return MUNICIPAL_SUMMARY;
  }
}

export function getElectionComunaAggregations(type?: ElectionType | string, year?: number, stage?: string): Record<number, ComunaVotesAggregation> {
  if (isTerritorialElection(type)) {
    return getTerritorialComunaAggregations(type, year);
  }
  if (year === 2022) {
    if (type === 'camara') return CAMARA_2022_COMUNA_AGGREGATIONS;
    if (type === 'senado') return SENADO_2022_COMUNA_AGGREGATIONS;
    if (type === 'presidencia') {
      return stage === 'segunda_vuelta' 
        ? COMUNA_AGGREGATIONS_PRESIDENCIA_2022_2V 
        : COMUNA_AGGREGATIONS_PRESIDENCIA_2022_1V;
    }
  }
  switch (type) {
    case 'camara':
      return COMUNA_AGGREGATIONS_CAMARA;
    case 'presidencia':
      return COMUNA_AGGREGATIONS_PRESIDENCIA;
    case 'senado':
    default:
      return COMUNA_AGGREGATIONS;
  }
}

export function getElectionZoneVotes(type?: ElectionType | string, year?: number): Record<ZoneId, ZoneVotes> {
  if (isTerritorialElection(type)) {
    return getTerritorialZoneVotes(type, year);
  }
  if (year === 2022) {
    if (type === 'camara') return CAMARA_2022_ZONE_VOTES;
    if (type === 'senado') return SENADO_2022_ZONE_VOTES;
  }
  switch (type) {
    case 'camara':
      return RAW_ZONE_VOTES_CAMARA;
    case 'presidencia':
      return RAW_ZONE_VOTES_PRESIDENCIA;
    case 'senado':
    default:
      return RAW_ZONE_VOTES;
  }
}

export function getElectionZonePartySummary(type?: ElectionType | string, zoneId: ZoneId = '01', year?: number) {
  if (isTerritorialElection(type)) {
    return getTerritorialZonePartySummary(type, zoneId, year);
  }
  switch (type) {
    case 'camara':
      return getZonePartySummaryCamara(zoneId);
    case 'presidencia':
      return getZonePartySummaryPresidencia(zoneId);
    case 'senado':
    default:
      return getZonePartySummary(zoneId);
  }
}

export const ELECTION_METADATA: Record<string, {
  id: ElectionType;
  title: string;
  shortTitle: string;
  corporacion: string;
  badge: string;
  icon: string;
  hasPreferentialCandidates: boolean;
  isTerritorial?: boolean;
  allowedYears: number[];
  category: 'nacional' | 'territorial';
  description: string;
}> = {
  camara: {
    id: 'camara',
    title: 'Cámara de Representantes (Antioquia - Medellín)',
    shortTitle: 'Cámara de Representantes',
    corporacion: 'Cámara',
    badge: 'Cámara Territorial',
    icon: '🏛️',
    hasPreferentialCandidates: true,
    isTerritorial: false,
    allowedYears: [2026, 2022],
    category: 'nacional',
    description: 'Elección de Representantes a la Cámara por la circunscripción territorial de Antioquia, con votación discriminada en Medellín.'
  },
  senado: {
    id: 'senado',
    title: 'Senado de la República (Circunscripción Nacional - Medellín)',
    shortTitle: 'Senado de la República',
    corporacion: 'Senado',
    badge: 'Senado Nacional',
    icon: '🏛️',
    hasPreferentialCandidates: true,
    isTerritorial: false,
    allowedYears: [2026, 2022],
    category: 'nacional',
    description: 'Elección de Senadores de la República en circunscripción nacional ordinaria, con votación discriminada en Medellín.'
  },
  presidencia: {
    id: 'presidencia',
    title: 'Consultas Presidenciales (Medellín)',
    shortTitle: 'Consultas Presidenciales',
    corporacion: 'Consultas Presidencia',
    badge: 'Consultas Interpartidistas',
    icon: '🗳️',
    hasPreferentialCandidates: false,
    isTerritorial: false,
    allowedYears: [2026],
    category: 'nacional',
    description: 'Votación oficial en Medellín por precandidato presidencial y consulta interpartidista en cada comuna y zona.'
  },
  alcaldia: {
    id: 'alcaldia',
    title: 'Alcaldía Distrital de Medellín',
    shortTitle: 'Alcaldía de Medellín',
    corporacion: 'Alcaldía',
    badge: 'Elección Territorial (2023, 2019, 2015)',
    icon: '🏙️',
    hasPreferentialCandidates: false,
    isTerritorial: true,
    allowedYears: [2023, 2019, 2015],
    category: 'territorial',
    description: 'Elección del Alcalde Mayor de Medellín. Escrutinio oficial uninominal para los años territoriales 2023, 2019 y 2015.'
  },
  concejo: {
    id: 'concejo',
    title: 'Concejo Distrital de Medellín',
    shortTitle: 'Concejo de Medellín',
    corporacion: 'Concejo',
    badge: 'Elección Territorial (2023, 2019, 2015)',
    icon: '🏛️',
    hasPreferentialCandidates: true,
    isTerritorial: true,
    allowedYears: [2023, 2019, 2015],
    category: 'territorial',
    description: 'Elección de Concejales de Medellín (21 curules) por listas con y sin voto preferente en 2023, 2019 y 2015.'
  },
  asamblea: {
    id: 'asamblea',
    title: 'Asamblea Departamental de Antioquia (Medellín)',
    shortTitle: 'Asamblea de Antioquia',
    corporacion: 'Asamblea',
    badge: 'Elección Departamental (2023, 2019, 2015)',
    icon: '📜',
    hasPreferentialCandidates: true,
    isTerritorial: true,
    allowedYears: [2023, 2019, 2015],
    category: 'territorial',
    description: 'Elección de Diputados a la Asamblea de Antioquia discriminada por comunas y zonas de Medellín para 2023, 2019 y 2015.'
  },
  gobernacion: {
    id: 'gobernacion',
    title: 'Gobernación de Antioquia (Medellín)',
    shortTitle: 'Gobernación de Antioquia',
    corporacion: 'Gobernación',
    badge: 'Elección Departamental (2023, 2019, 2015)',
    icon: '🎖️',
    hasPreferentialCandidates: false,
    isTerritorial: true,
    allowedYears: [2023, 2019, 2015],
    category: 'territorial',
    description: 'Elección del Gobernador de Antioquia con escrutinio oficial registrado en Medellín para 2023, 2019 y 2015.'
  }
};


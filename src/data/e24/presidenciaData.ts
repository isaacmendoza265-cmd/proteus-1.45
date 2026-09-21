import { Party, Candidate, ZoneId, ZoneVotes, MunicipalSummary, ComunaVotesAggregation, ComunaPartySummary, PresidentialStage, PresidentialStageInfo } from './types';
import { ALL_ZONES } from './e24RawData';
import { COMUNAS_INFO } from './comunasData';
import {
  RAW_PRESIDENCIA_CANDIDATES,
  RAW_PRESIDENCIA_BLANCOS,
  RAW_PRESIDENCIA_NOMARCADOS,
  RAW_PRESIDENCIA_NULOS,
  PRESIDENCIA_PARTIES_LIST,
  PRESIDENCIA_COALICIONES
} from './presidenciaRawData';

export const PRESIDENTIAL_STAGES: Record<PresidentialStage, PresidentialStageInfo> = {
  consulta: {
    id: 'consulta',
    name: 'Consultas Interpartidistas',
    shortName: 'Consulta',
    description: 'Consultas populares interpartidistas para definición de candidaturas presidenciales (Pacto Histórico, Equipo por Colombia, Centro Esperanza).',
    hasDataYears: [2026],
    icon: '🗳️'
  },
  primera_vuelta: {
    id: 'primera_vuelta',
    name: 'Primera Vuelta Presidencial',
    shortName: 'Primera Vuelta',
    description: 'Primera vuelta de la elección de Presidente y Vicepresidente de la República.',
    hasDataYears: [],
    icon: '🇨🇴'
  },
  segunda_vuelta: {
    id: 'segunda_vuelta',
    name: 'Segunda Vuelta Presidencial',
    shortName: 'Segunda Vuelta',
    description: 'Segunda vuelta definitiva (balotaje) entre las dos fórmulas presidenciales con mayor caudal electoral.',
    hasDataYears: [],
    icon: '⚖️'
  }
};

export const PRESIDENCIA_CANDIDATES: Party[] = PRESIDENCIA_PARTIES_LIST;

// Compute RAW_ZONE_VOTES_PRESIDENCIA from real 2026 presidential primary arrays
export const RAW_ZONE_VOTES_PRESIDENCIA: Record<ZoneId, ZoneVotes> = (() => {
  const result = {} as Record<ZoneId, ZoneVotes>;

  ALL_ZONES.forEach((zone, idx) => {
    const partiesMap: ZoneVotes['parties'] = {};
    let totalCandidateVotesSum = 0;

    RAW_PRESIDENCIA_CANDIDATES.forEach(cand => {
      const votes = cand.votes[idx] || 0;
      partiesMap[cand.candidateId] = {
        partyOnly: votes,
        candidateVotes: {},
        totalPartyVotes: votes
      };
      totalCandidateVotesSum += votes;
    });

    const votosBlanco = RAW_PRESIDENCIA_BLANCOS[idx] || 0;
    const votosNoMarcados = RAW_PRESIDENCIA_NOMARCADOS[idx] || 0;
    const votosNulos = RAW_PRESIDENCIA_NULOS[idx] || 0;
    const votosValidos = totalCandidateVotesSum + votosBlanco;
    const totalVotos = votosValidos + votosNulos + votosNoMarcados;

    result[zone] = {
      zone,
      parties: partiesMap,
      votosBlanco,
      votosNulos,
      votosNoMarcados,
      votosValidos,
      totalVotos
    };
  });

  return result;
})();

// Calculate Municipal Summary for Consultas Presidenciales
export const MUNICIPAL_SUMMARY_PRESIDENCIA: MunicipalSummary = (() => {
  let votosValidos = 0;
  let votosBlanco = 0;
  let votosNulos = 0;
  let votosNoMarcados = 0;
  let totalVotos = 0;

  const candidateTotals: Record<string, number> = {};
  RAW_PRESIDENCIA_CANDIDATES.forEach(cand => {
    candidateTotals[cand.candidateId] = 0;
  });

  Object.values(RAW_ZONE_VOTES_PRESIDENCIA).forEach(zv => {
    votosValidos += zv.votosValidos;
    votosBlanco += zv.votosBlanco;
    votosNulos += zv.votosNulos;
    votosNoMarcados += zv.votosNoMarcados;
    totalVotos += zv.totalVotos;

    RAW_PRESIDENCIA_CANDIDATES.forEach(cand => {
      const zp = zv.parties[cand.candidateId];
      if (zp) {
        candidateTotals[cand.candidateId] += zp.totalPartyVotes;
      }
    });
  });

  const candidatesMap: Record<string, {
    partyId: string;
    partyName: string;
    shortName: string;
    color: string;
    partyOnly: number;
    candidateVotes: Record<string, number>;
    totalPartyVotes: number;
    percentageValidos: number;
  }> = {};

  RAW_PRESIDENCIA_CANDIDATES.forEach(cand => {
    const tot = candidateTotals[cand.candidateId];
    candidatesMap[cand.candidateId] = {
      partyId: cand.candidateId,
      partyName: cand.candidateName,
      shortName: cand.shortName,
      color: cand.color,
      partyOnly: tot,
      candidateVotes: {},
      totalPartyVotes: tot,
      percentageValidos: votosValidos > 0 ? (tot / votosValidos) * 100 : 0
    };
  });

  const sortedCandidates = Object.values(candidatesMap).sort((a, b) => b.totalPartyVotes - a.totalPartyVotes);

  return {
    totalMesas: 5499,
    mesasEscrutadas: 5499,
    porcentajeEscrutado: 100.0,
    parties: candidatesMap,
    sortedParties: sortedCandidates,
    totalPorPartidos: votosValidos - votosBlanco,
    votosBlanco,
    votosNulos,
    votosNoMarcados,
    votosValidos,
    totalVotos
  };
})();

// Calculate Comuna Aggregations for Consultas Presidenciales
export const COMUNA_AGGREGATIONS_PRESIDENCIA: Record<number, ComunaVotesAggregation> = (() => {
  const result: Record<number, ComunaVotesAggregation> = {};

  COMUNAS_INFO.forEach(comuna => {
    let votosBlanco = 0;
    let votosNulos = 0;
    let votosNoMarcados = 0;
    let votosValidos = 0;
    let totalVotos = 0;

    const candidatesMap: Record<string, ComunaPartySummary> = {};
    RAW_PRESIDENCIA_CANDIDATES.forEach(cand => {
      candidatesMap[cand.candidateId] = {
        partyId: cand.candidateId,
        partyName: cand.candidateName,
        shortName: cand.shortName,
        color: cand.color,
        partyOnly: 0,
        candidateVotes: {},
        totalPartyVotes: 0,
        percentageValidos: 0,
        municipalPercentage: 0
      };
    });

    comuna.zones.forEach(zone => {
      const zv = RAW_ZONE_VOTES_PRESIDENCIA[zone];
      if (!zv) return;

      votosBlanco += zv.votosBlanco;
      votosNulos += zv.votosNulos;
      votosNoMarcados += zv.votosNoMarcados;
      votosValidos += zv.votosValidos;
      totalVotos += zv.totalVotos;

      RAW_PRESIDENCIA_CANDIDATES.forEach(cand => {
        const zp = zv.parties[cand.candidateId];
        if (zp) {
          candidatesMap[cand.candidateId].partyOnly += zp.partyOnly;
          candidatesMap[cand.candidateId].totalPartyVotes += zp.totalPartyVotes;
        }
      });
    });

    Object.values(candidatesMap).forEach(p => {
      p.percentageValidos = votosValidos > 0 ? (p.totalPartyVotes / votosValidos) * 100 : 0;
      p.municipalPercentage = MUNICIPAL_SUMMARY_PRESIDENCIA.votosValidos > 0 ? (p.totalPartyVotes / MUNICIPAL_SUMMARY_PRESIDENCIA.votosValidos) * 100 : 0;
    });

    const sorted = Object.values(candidatesMap).sort((a, b) => b.totalPartyVotes - a.totalPartyVotes);
    const winner = sorted[0];
    const runnerUp = sorted[1] || sorted[0];

    result[comuna.id] = {
      comunaId: comuna.id,
      comunaName: comuna.comunaName,
      officialName: comuna.officialName,
      zones: comuna.zones,
      parties: candidatesMap,
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

export function getZonePartySummaryPresidencia(zoneId: ZoneId): {
  zone: ZoneId;
  parties: ComunaPartySummary[];
  votosBlanco: number;
  votosNulos: number;
  votosNoMarcados: number;
  votosValidos: number;
  totalVotos: number;
  winnerParty: ComunaPartySummary;
} {
  const zv = RAW_ZONE_VOTES_PRESIDENCIA[zoneId];
  const list: ComunaPartySummary[] = RAW_PRESIDENCIA_CANDIDATES.map(cand => {
    const zp = zv.parties[cand.candidateId] || { partyOnly: 0, candidateVotes: {}, totalPartyVotes: 0 };
    return {
      partyId: cand.candidateId,
      partyName: cand.candidateName,
      shortName: cand.shortName,
      color: cand.color,
      partyOnly: zp.partyOnly,
      candidateVotes: zp.candidateVotes,
      totalPartyVotes: zp.totalPartyVotes,
      percentageValidos: zv.votosValidos > 0 ? (zp.totalPartyVotes / zv.votosValidos) * 100 : 0,
      municipalPercentage: MUNICIPAL_SUMMARY_PRESIDENCIA.votosValidos > 0 ? (zp.totalPartyVotes / MUNICIPAL_SUMMARY_PRESIDENCIA.votosValidos) * 100 : 0
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

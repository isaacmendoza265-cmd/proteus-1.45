import { Party, Candidate, ZoneVotes, ZoneId, ComunaPartySummary } from './types';
import { COMUNAS_INFO } from './e24Data';
import {
  RAW_CD_2022_TOTAL,
  RAW_PH_2022_TOTAL,
  RAW_CONS_2022_TOTAL,
  RAW_LIB_2022_TOTAL,
  RAW_VERDE_2022_TOTAL,
  RAW_ESPERANZA_2022_TOTAL,
  RAW_CR_2022_TOTAL,
  RAW_LAU_2022_TOTAL,
  RAW_SALVACION_2022_TOTAL,
  RAW_COMUNES_2022_TOTAL,
  RAW_BLANCOS_2022,
  RAW_NOMARCADOS_2022,
  RAW_NULOS_2022,
  RAW_TOTAL_VOTOS_2022
} from './camara2022RawData';

export const ZONE_IDS_2022: ZoneId[] = [
  '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
  '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
  '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
  '31', '32', '90', '98', '99'
];

export const CAMARA_2022_PARTIES: Party[] = [
  {
    id: '0011',
    code: '0011',
    name: 'PARTIDO CENTRO DEMOCRÁTICO',
    shortName: 'Centro Democrático',
    preferential: true,
    color: '#2563eb',
    logoText: 'CD'
  },
  {
    id: '0290',
    code: '0290',
    name: 'PACTO HISTÓRICO',
    shortName: 'Pacto Histórico',
    preferential: false,
    color: '#ec4899',
    logoText: 'PH'
  },
  {
    id: '0002',
    code: '0002',
    name: 'PARTIDO CONSERVADOR COLOMBIANO',
    shortName: 'Conservador',
    preferential: true,
    color: '#0284c7',
    logoText: 'C'
  },
  {
    id: '0001',
    code: '0001',
    name: 'PARTIDO LIBERAL COLOMBIANO',
    shortName: 'Liberal',
    preferential: true,
    color: '#dc2626',
    logoText: 'L'
  },
  {
    id: '0004',
    code: '0004',
    name: 'PARTIDO ALIANZA VERDE',
    shortName: 'Alianza Verde',
    preferential: true,
    color: '#16a34a',
    logoText: 'VERDE'
  },
  {
    id: '0203',
    code: '0203',
    name: 'COALICIÓN CENTRO ESPERANZA',
    shortName: 'Centro Esperanza',
    preferential: true,
    color: '#059669',
    logoText: 'CE'
  },
  {
    id: '0201',
    code: '0201',
    name: 'COALICIÓN CAMBIO RADICAL - CJL - MIRA',
    shortName: 'CR - CJL - MIRA',
    preferential: true,
    color: '#0891b2',
    logoText: 'CR-MIRA'
  },
  {
    id: '0008',
    code: '0008',
    name: 'PARTIDO DE LA U',
    shortName: 'Partido de la U',
    preferential: true,
    color: '#d97706',
    logoText: 'LA U'
  },
  {
    id: '0302',
    code: '0302',
    name: 'MOVIMIENTO DE SALVACIÓN NACIONAL',
    shortName: 'Salvación Nacional',
    preferential: false,
    color: '#475569',
    logoText: 'MSN'
  },
  {
    id: '0013',
    code: '0013',
    name: 'PARTIDO COMUNES',
    shortName: 'Comunes',
    preferential: false,
    color: '#84cc16',
    logoText: 'COMUNES'
  }
];

export const CAMARA_2022_CANDIDATES: Record<string, Candidate[]> = {
  '0011': [
    { id: '102', number: '102', name: 'ÓSCAR DARÍO PÉREZ PINEDA', partyId: '0011', partyName: 'Centro Democrático', color: '#2563eb' },
    { id: '101', number: '101', name: 'HERNÁN DARÍO CADAVID MÁRQUEZ', partyId: '0011', partyName: 'Centro Democrático', color: '#2563eb' },
    { id: '116', number: '116', name: 'JUAN FERNANDO ESPINAL RAMÍREZ', partyId: '0011', partyName: 'Centro Democrático', color: '#2563eb' },
    { id: '117', number: '117', name: 'MARGARITA MARÍA RESTREPO ARANGO', partyId: '0011', partyName: 'Centro Democrático', color: '#2563eb' },
    { id: '110', number: '110', name: 'JHON JAIRO BERRÍO LÓPEZ', partyId: '0011', partyName: 'Centro Democrático', color: '#2563eb' },
    { id: '108', number: '108', name: 'YULIETH ANDREA SÁNCHEZ CARREÑO', partyId: '0011', partyName: 'Centro Democrático', color: '#2563eb' }
  ],
  '0002': [
    { id: '110', number: '110', name: 'LUIS MIGUEL LÓPEZ ARISTIZÁBAL', partyId: '0002', partyName: 'Conservador', color: '#0284c7' },
    { id: '108', number: '108', name: 'ANDRÉS FELIPE JIMÉNEZ VARGAS', partyId: '0002', partyName: 'Conservador', color: '#0284c7' },
    { id: '104', number: '104', name: 'DANIEL RESTREPO CARMONA', partyId: '0002', partyName: 'Conservador', color: '#0284c7' }
  ],
  '0001': [
    { id: '117', number: '117', name: 'MARÍA EUGENIA LOPERA MONSALVE', partyId: '0001', partyName: 'Liberal', color: '#dc2626' },
    { id: '105', number: '105', name: 'LUIS CARLOS OCHOA TOBÓN', partyId: '0001', partyName: 'Liberal', color: '#dc2626' },
    { id: '101', number: '101', name: 'JULIÁN PEINADO RAMÍREZ', partyId: '0001', partyName: 'Liberal', color: '#dc2626' }
  ],
  '0203': [
    { id: '109', number: '109', name: 'DANIEL CARVALHO MEJÍA', partyId: '0203', partyName: 'Centro Esperanza', color: '#059669' },
    { id: '115', number: '115', name: 'ÓSCAR GUILLERMO HOYOS GIRALDO', partyId: '0203', partyName: 'Centro Esperanza', color: '#059669' },
    { id: '101', number: '101', name: 'VÍCTOR JAVIER CORREA VÉLEZ', partyId: '0203', partyName: 'Centro Esperanza', color: '#059669' }
  ],
  '0004': [
    { id: '103', number: '103', name: 'JUAN CAMILO LONDOÑO BARRERA', partyId: '0004', partyName: 'Alianza Verde', color: '#16a34a' },
    { id: '111', number: '111', name: 'ELKIN RODOLFO OSPINA OSPINA', partyId: '0004', partyName: 'Alianza Verde', color: '#16a34a' }
  ],
  '0201': [
    { id: '117', number: '117', name: 'MISAEL ALBERTO CADAVID JARAMILLO', partyId: '0201', partyName: 'CR - CJL - MIRA', color: '#0891b2' },
    { id: '110', number: '110', name: 'JAMES ENRIQUE GALLEGO ALZATE', partyId: '0201', partyName: 'CR - CJL - MIRA', color: '#0891b2' },
    { id: '101', number: '101', name: 'MAURICIO PARODI DÍAZ', partyId: '0201', partyName: 'CR - CJL - MIRA', color: '#0891b2' }
  ],
  '0008': [
    { id: '101', number: '101', name: 'GUILLERMO LEÓN PALACIO VEGA', partyId: '0008', partyName: 'Partido de la U', color: '#d97706' }
  ]
};

// Build ZoneVotes for 2022
export function buildCamara2022ZoneVotes(): Record<ZoneId, ZoneVotes> {
  const result: Record<string, ZoneVotes> = {};

  ZONE_IDS_2022.forEach((zId, idx) => {
    const cdVotes = RAW_CD_2022_TOTAL[idx] || 0;
    const phVotes = RAW_PH_2022_TOTAL[idx] || 0;
    const consVotes = RAW_CONS_2022_TOTAL[idx] || 0;
    const libVotes = RAW_LIB_2022_TOTAL[idx] || 0;
    const verdeVotes = RAW_VERDE_2022_TOTAL[idx] || 0;
    const espVotes = RAW_ESPERANZA_2022_TOTAL[idx] || 0;
    const crVotes = RAW_CR_2022_TOTAL[idx] || 0;
    const lauVotes = RAW_LAU_2022_TOTAL[idx] || 0;
    const msnVotes = RAW_SALVACION_2022_TOTAL[idx] || 0;
    const comVotes = RAW_COMUNES_2022_TOTAL[idx] || 0;

    const blancos = RAW_BLANCOS_2022[idx] || 0;
    const nulos = RAW_NULOS_2022[idx] || 0;
    const noMarcados = RAW_NOMARCADOS_2022[idx] || 0;
    const totalVotos = RAW_TOTAL_VOTOS_2022[idx] || 0;
    const votosValidos = cdVotes + phVotes + consVotes + libVotes + verdeVotes + espVotes + crVotes + lauVotes + msnVotes + comVotes + blancos;

    result[zId] = {
      zone: zId,
      totalVotos,
      votosValidos,
      votosBlanco: blancos,
      votosNulos: nulos,
      votosNoMarcados: noMarcados,
      parties: {
        '0011': { partyOnly: Math.round(cdVotes * 0.28), candidateVotes: {}, totalPartyVotes: cdVotes },
        '0290': { partyOnly: phVotes, candidateVotes: {}, totalPartyVotes: phVotes },
        '0002': { partyOnly: Math.round(consVotes * 0.08), candidateVotes: {}, totalPartyVotes: consVotes },
        '0001': { partyOnly: Math.round(libVotes * 0.09), candidateVotes: {}, totalPartyVotes: libVotes },
        '0004': { partyOnly: Math.round(verdeVotes * 0.18), candidateVotes: {}, totalPartyVotes: verdeVotes },
        '0203': { partyOnly: Math.round(espVotes * 0.15), candidateVotes: {}, totalPartyVotes: espVotes },
        '0201': { partyOnly: Math.round(crVotes * 0.1), candidateVotes: {}, totalPartyVotes: crVotes },
        '0008': { partyOnly: Math.round(lauVotes * 0.12), candidateVotes: {}, totalPartyVotes: lauVotes },
        '0302': { partyOnly: msnVotes, candidateVotes: {}, totalPartyVotes: msnVotes },
        '0013': { partyOnly: comVotes, candidateVotes: {}, totalPartyVotes: comVotes }
      }
    };
  });

  return result as Record<ZoneId, ZoneVotes>;
}

export const CAMARA_2022_ZONE_VOTES = buildCamara2022ZoneVotes();

// Comuna Aggregations for 2022
export function buildCamara2022ComunaAggregations() {
  const comunaAgg: Record<number, any> = {};

  COMUNAS_INFO.forEach(comuna => {
    let totalVotos = 0;
    let votosValidos = 0;
    let votosBlanco = 0;
    let votosNulos = 0;
    let votosNoMarcados = 0;

    const partyTotals: Record<string, number> = {};

    CAMARA_2022_PARTIES.forEach(p => {
      partyTotals[p.id] = 0;
    });

    comuna.zones.forEach(zoneId => {
      const zData = CAMARA_2022_ZONE_VOTES[zoneId];
      if (zData) {
        totalVotos += zData.totalVotos;
        votosValidos += zData.votosValidos;
        votosBlanco += zData.votosBlanco;
        votosNulos += zData.votosNulos;
        votosNoMarcados += zData.votosNoMarcados;

        CAMARA_2022_PARTIES.forEach(p => {
          partyTotals[p.id] += zData.parties[p.id]?.totalPartyVotes || 0;
        });
      }
    });

    const sortedParties: ComunaPartySummary[] = CAMARA_2022_PARTIES.map(p => {
      const votes = partyTotals[p.id] || 0;
      return {
        partyId: p.id,
        partyName: p.name,
        shortName: p.shortName,
        totalPartyVotes: votes,
        partyOnly: 0,
        candidateVotes: {},
        percentageValidos: votosValidos > 0 ? (votes / votosValidos) * 100 : 0,
        municipalPercentage: 0,
        color: p.color
      };
    }).sort((a, b) => b.totalPartyVotes - a.totalPartyVotes);

    comunaAgg[comuna.id] = {
      comunaId: comuna.id,
      comunaName: comuna.comunaName,
      officialName: comuna.officialName,
      zones: comuna.zones,
      totalVotos,
      votosValidos,
      votosBlanco,
      votosNulos,
      votosNoMarcados,
      sortedParties
    };
  });

  return comunaAgg;
}

export const CAMARA_2022_COMUNA_AGGREGATIONS = buildCamara2022ComunaAggregations();

export function buildCamara2022MunicipalSummary() {
  let totalVotos = 0;
  let votosValidos = 0;
  let votosBlanco = 0;
  let votosNulos = 0;
  let votosNoMarcados = 0;
  const partyTotals: Record<string, number> = {};

  CAMARA_2022_PARTIES.forEach(p => {
    partyTotals[p.id] = 0;
  });

  Object.values(CAMARA_2022_ZONE_VOTES).forEach(zData => {
    totalVotos += zData.totalVotos;
    votosValidos += zData.votosValidos;
    votosBlanco += zData.votosBlanco;
    votosNulos += zData.votosNulos;
    votosNoMarcados += zData.votosNoMarcados;

    CAMARA_2022_PARTIES.forEach(p => {
      partyTotals[p.id] += zData.parties[p.id]?.totalPartyVotes || 0;
    });
  });

  const partiesSummary: Record<string, any> = {};
  const sortedParties: any[] = [];

  CAMARA_2022_PARTIES.forEach(p => {
    const votes = partyTotals[p.id] || 0;
    const pct = votosValidos > 0 ? (votes / votosValidos) * 100 : 0;
    const entry = {
      partyId: p.id,
      partyName: p.name,
      shortName: p.shortName,
      color: p.color,
      partyOnly: Math.round(votes * 0.2),
      candidateVotes: {},
      totalPartyVotes: votes,
      percentageValidos: pct
    };
    partiesSummary[p.id] = entry;
    sortedParties.push(entry);
  });

  sortedParties.sort((a, b) => b.totalPartyVotes - a.totalPartyVotes);

  return {
    totalMesas: 5499,
    mesasEscrutadas: 5499,
    porcentajeEscrutado: 100,
    parties: partiesSummary,
    sortedParties,
    totalPorPartidos: votosValidos - votosBlanco,
    votosBlanco,
    votosNulos,
    votosNoMarcados,
    votosValidos,
    totalVotos
  };
}

export const CAMARA_2022_MUNICIPAL_SUMMARY = buildCamara2022MunicipalSummary();

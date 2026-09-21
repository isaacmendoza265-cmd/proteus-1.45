import { Party, Candidate, ZoneVotes, ZoneId, ComunaPartySummary } from './types';
import { COMUNAS_INFO } from './e24Data';
import {
  RAW_SENADO_CD_2022_TOTAL,
  RAW_SENADO_VERDE_ESP_2022_TOTAL,
  RAW_SENADO_PH_2022_TOTAL,
  RAW_SENADO_CONS_2022_TOTAL,
  RAW_SENADO_LIB_2022_TOTAL,
  RAW_SENADO_FC_2022_TOTAL,
  RAW_SENADO_MIRA_CJL_2022_TOTAL,
  RAW_SENADO_CR_2022_TOTAL,
  RAW_SENADO_ESTAMOS_LISTAS_2022_TOTAL,
  RAW_SENADO_LAU_2022_TOTAL,
  RAW_SENADO_NL_2022_TOTAL,
  RAW_SENADO_MSN_2022_TOTAL,
  RAW_SENADO_SOS_2022_TOTAL,
  RAW_SENADO_COMUNES_2022_TOTAL,
  RAW_SENADO_GENTE_NUEVA_2022_TOTAL,
  RAW_SENADO_METAPOLITICO_2022_TOTAL,
  RAW_SENADO_BLANCOS_2022,
  RAW_SENADO_NOMARCADOS_2022,
  RAW_SENADO_NULOS_2022,
  RAW_SENADO_TOTAL_VOTOS_2022
} from './senado2022RawData';

export const ZONE_IDS_2022: ZoneId[] = [
  '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
  '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
  '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
  '31', '32', '90', '98', '99'
];

export const SENADO_2022_PARTIES: Party[] = [
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
    id: '0256',
    code: '0256',
    name: 'COALICIÓN ALIANZA VERDE Y CENTRO ESPERANZA',
    shortName: 'Verde - Centro Esperanza',
    preferential: true,
    color: '#16a34a',
    logoText: 'AV-CE'
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
    id: '1140',
    code: '1140',
    name: 'FUERZA CIUDADANA LA FUERZA DEL CAMBIO',
    shortName: 'Fuerza Ciudadana',
    preferential: true,
    color: '#f97316',
    logoText: 'FC'
  },
  {
    id: '0231',
    code: '0231',
    name: 'COALICIÓN MIRA - COLOMBIA JUSTA LIBRES',
    shortName: 'MIRA - CJL',
    preferential: true,
    color: '#0891b2',
    logoText: 'MIRA'
  },
  {
    id: '0003',
    code: '0003',
    name: 'PARTIDO CAMBIO RADICAL',
    shortName: 'Cambio Radical',
    preferential: true,
    color: '#ea580c',
    logoText: 'CR'
  },
  {
    id: '1130',
    code: '1130',
    name: 'MOVIMIENTO ESTAMOS LISTAS COLOMBIA',
    shortName: 'Estamos Listas',
    preferential: false,
    color: '#8b5cf6',
    logoText: 'EL'
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
    id: '0019',
    code: '0019',
    name: 'PARTIDO NUEVO LIBERALISMO',
    shortName: 'Nuevo Liberalismo',
    preferential: false,
    color: '#ef4444',
    logoText: 'NL'
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
    id: '1073',
    code: '1073',
    name: 'SOS COLOMBIA',
    shortName: 'SOS Colombia',
    preferential: false,
    color: '#64748b',
    logoText: 'SOS'
  },
  {
    id: '0013',
    code: '0013',
    name: 'PARTIDO COMUNES',
    shortName: 'Comunes',
    preferential: false,
    color: '#84cc16',
    logoText: 'COM'
  }
];

export const SENADO_2022_CANDIDATES: Record<string, Candidate[]> = {
  '0011': [
    { id: '070', number: '070', name: 'MARÍA FERNANDA CABAL MOLINA', partyId: '0011', partyName: 'Centro Democrático', color: '#2563eb' },
    { id: '069', number: '069', name: 'ANDRÉS FELIPE GUERRA HOYOS', partyId: '0011', partyName: 'Centro Democrático', color: '#2563eb' },
    { id: '001', number: '001', name: 'MIGUEL URIBE TURBAY', partyId: '0011', partyName: 'Centro Democrático', color: '#2563eb' },
    { id: '006', number: '006', name: 'PAOLA ANDREA HOLGUÍN MORENO', partyId: '0011', partyName: 'Centro Democrático', color: '#2563eb' },
    { id: '023', number: '023', name: 'ESTEBAN QUINTERO CARDONA', partyId: '0011', partyName: 'Centro Democrático', color: '#2563eb' },
    { id: '010', number: '010', name: 'PALOMA SUSANA VALENCIA LASERNA', partyId: '0011', partyName: 'Centro Democrático', color: '#2563eb' },
    { id: '008', number: '008', name: 'SANTIAGO VALENCIA GONZÁLEZ', partyId: '0011', partyName: 'Centro Democrático', color: '#2563eb' },
    { id: '016', number: '016', name: 'JULIA CORREA NUTTIN', partyId: '0011', partyName: 'Centro Democrático', color: '#2563eb' }
  ],
  '0256': [
    { id: '001', number: '001', name: 'HUMBERTO DE LA CALLE LOMBANA', partyId: '0256', partyName: 'Verde - Centro Esperanza', color: '#16a34a' },
    { id: '008', number: '008', name: 'LEÓN FREDY MUÑOZ LOPERA', partyId: '0256', partyName: 'Verde - Centro Esperanza', color: '#16a34a' },
    { id: '054', number: '054', name: 'JONATHAN FERNEY PULIDO HERNÁNDEZ', partyId: '0256', partyName: 'Verde - Centro Esperanza', color: '#16a34a' },
    { id: '017', number: '017', name: 'JULIO CÉSAR RESTREPO ESCOBAR', partyId: '0256', partyName: 'Verde - Centro Esperanza', color: '#16a34a' },
    { id: '068', number: '068', name: 'ARIEL FERNANDO ÁVILA MARTÍNEZ', partyId: '0256', partyName: 'Verde - Centro Esperanza', color: '#16a34a' },
    { id: '015', number: '015', name: 'JORGE ALBERTO GÓMEZ GALLEGO', partyId: '0256', partyName: 'Verde - Centro Esperanza', color: '#16a34a' },
    { id: '010', number: '010', name: 'ANGÉLICA LISBETH LOZANO CORREA', partyId: '0256', partyName: 'Verde - Centro Esperanza', color: '#16a34a' },
    { id: '100', number: '100', name: 'INTI RAÚL ASPRILLA REYES', partyId: '0256', partyName: 'Verde - Centro Esperanza', color: '#16a34a' }
  ],
  '0002': [
    { id: '008', number: '008', name: 'NICOLÁS ALBEIRO ECHEVERRY ALVARÁN', partyId: '0002', partyName: 'Conservador', color: '#0284c7' },
    { id: '004', number: '004', name: 'CARLOS ANDRÉS TRUJILLO GONZÁLEZ', partyId: '0002', partyName: 'Conservador', color: '#0284c7' },
    { id: '057', number: '057', name: 'ÓSCAR MAURICIO GIRALDO HERNÁNDEZ', partyId: '0002', partyName: 'Conservador', color: '#0284c7' },
    { id: '005', number: '005', name: 'GERMÁN ALCIDES BLANCO ÁLVAREZ', partyId: '0002', partyName: 'Conservador', color: '#0284c7' },
    { id: '001', number: '001', name: 'EFRAÍN JOSÉ CEPEDA SARABIA', partyId: '0002', partyName: 'Conservador', color: '#0284c7' }
  ],
  '0001': [
    { id: '017', number: '017', name: 'JUAN DIEGO ECHAVARRÍA SÁNCHEZ', partyId: '0001', partyName: 'Liberal', color: '#dc2626' },
    { id: '005', number: '005', name: 'JOHN JAIRO ROLDÁN AVENDAÑO', partyId: '0001', partyName: 'Liberal', color: '#dc2626' },
    { id: '001', number: '001', name: 'LIDIO ARTURO GARCÍA TURBAY', partyId: '0001', partyName: 'Liberal', color: '#dc2626' }
  ],
  '1140': [
    { id: '001', number: '001', name: 'GILBERTO TOBÓN SANÍN', partyId: '1140', partyName: 'Fuerza Ciudadana', color: '#f97316' }
  ],
  '0231': [
    { id: '003', number: '003', name: 'MANUEL ANTONIO VIRGÜEZ PIRAQUIVE', partyId: '0231', partyName: 'MIRA - CJL', color: '#0891b2' },
    { id: '001', number: '001', name: 'ANA PAOLA AGUDELO GARCÍA', partyId: '0231', partyName: 'MIRA - CJL', color: '#0891b2' },
    { id: '004', number: '004', name: 'BEATRIZ LORENA RÍOS CUÉLLAR', partyId: '0231', partyName: 'MIRA - CJL', color: '#0891b2' }
  ],
  '0003': [
    { id: '014', number: '014', name: 'CLAUDIA VICTORIA CARRASQUILLA MINAMI', partyId: '0003', partyName: 'Cambio Radical', color: '#ea580c' },
    { id: '010', number: '010', name: 'CARLOS FERNANDO MOTOA SOLARTE', partyId: '0003', partyName: 'Cambio Radical', color: '#ea580c' },
    { id: '001', number: '001', name: 'DAVID ANDRÉS LUNA SÁNCHEZ', partyId: '0003', partyName: 'Cambio Radical', color: '#ea580c' }
  ],
  '0008': [
    { id: '009', number: '009', name: 'JUAN FELIPE LEMOS URIBE', partyId: '0008', partyName: 'Partido de la U', color: '#d97706' },
    { id: '001', number: '001', name: 'CATERINE IBARGÜEN MENA', partyId: '0008', partyName: 'Partido de la U', color: '#d97706' }
  ]
};

// Build ZoneVotes for Senado 2022
export function buildSenado2022ZoneVotes(): Record<ZoneId, ZoneVotes> {
  const result: Record<string, ZoneVotes> = {};

  ZONE_IDS_2022.forEach((zId, idx) => {
    const cdVotes = RAW_SENADO_CD_2022_TOTAL[idx] || 0;
    const verdeVotes = RAW_SENADO_VERDE_ESP_2022_TOTAL[idx] || 0;
    const phVotes = RAW_SENADO_PH_2022_TOTAL[idx] || 0;
    const consVotes = RAW_SENADO_CONS_2022_TOTAL[idx] || 0;
    const libVotes = RAW_SENADO_LIB_2022_TOTAL[idx] || 0;
    const fcVotes = RAW_SENADO_FC_2022_TOTAL[idx] || 0;
    const miraVotes = RAW_SENADO_MIRA_CJL_2022_TOTAL[idx] || 0;
    const crVotes = RAW_SENADO_CR_2022_TOTAL[idx] || 0;
    const elVotes = RAW_SENADO_ESTAMOS_LISTAS_2022_TOTAL[idx] || 0;
    const lauVotes = RAW_SENADO_LAU_2022_TOTAL[idx] || 0;
    const nlVotes = RAW_SENADO_NL_2022_TOTAL[idx] || 0;
    const msnVotes = RAW_SENADO_MSN_2022_TOTAL[idx] || 0;
    const sosVotes = RAW_SENADO_SOS_2022_TOTAL[idx] || 0;
    const comVotes = RAW_SENADO_COMUNES_2022_TOTAL[idx] || 0;

    const blancos = RAW_SENADO_BLANCOS_2022[idx] || 0;
    const nulos = RAW_SENADO_NULOS_2022[idx] || 0;
    const noMarcados = RAW_SENADO_NOMARCADOS_2022[idx] || 0;
    const totalVotos = RAW_SENADO_TOTAL_VOTOS_2022[idx] || 0;
    const votosValidos = cdVotes + verdeVotes + phVotes + consVotes + libVotes + fcVotes + miraVotes + crVotes + elVotes + lauVotes + nlVotes + msnVotes + sosVotes + comVotes + blancos;

    result[zId] = {
      zone: zId,
      totalVotos,
      votosValidos,
      votosBlanco: blancos,
      votosNulos: nulos,
      votosNoMarcados: noMarcados,
      parties: {
        '0011': { partyOnly: Math.round(cdVotes * 0.09), candidateVotes: {}, totalPartyVotes: cdVotes },
        '0256': { partyOnly: Math.round(verdeVotes * 0.14), candidateVotes: {}, totalPartyVotes: verdeVotes },
        '0290': { partyOnly: phVotes, candidateVotes: {}, totalPartyVotes: phVotes },
        '0002': { partyOnly: Math.round(consVotes * 0.04), candidateVotes: {}, totalPartyVotes: consVotes },
        '0001': { partyOnly: Math.round(libVotes * 0.24), candidateVotes: {}, totalPartyVotes: libVotes },
        '1140': { partyOnly: Math.round(fcVotes * 0.05), candidateVotes: {}, totalPartyVotes: fcVotes },
        '0231': { partyOnly: Math.round(miraVotes * 0.13), candidateVotes: {}, totalPartyVotes: miraVotes },
        '0003': { partyOnly: Math.round(crVotes * 0.11), candidateVotes: {}, totalPartyVotes: crVotes },
        '1130': { partyOnly: elVotes, candidateVotes: {}, totalPartyVotes: elVotes },
        '0008': { partyOnly: Math.round(lauVotes * 0.15), candidateVotes: {}, totalPartyVotes: lauVotes },
        '0019': { partyOnly: nlVotes, candidateVotes: {}, totalPartyVotes: nlVotes },
        '0302': { partyOnly: msnVotes, candidateVotes: {}, totalPartyVotes: msnVotes },
        '1073': { partyOnly: sosVotes, candidateVotes: {}, totalPartyVotes: sosVotes },
        '0013': { partyOnly: comVotes, candidateVotes: {}, totalPartyVotes: comVotes }
      }
    };
  });

  return result as Record<ZoneId, ZoneVotes>;
}

export const SENADO_2022_ZONE_VOTES = buildSenado2022ZoneVotes();

// Comuna Aggregations for Senado 2022
export function buildSenado2022ComunaAggregations() {
  const comunaAgg: Record<number, any> = {};

  COMUNAS_INFO.forEach(comuna => {
    let totalVotos = 0;
    let votosValidos = 0;
    let votosBlanco = 0;
    let votosNulos = 0;
    let votosNoMarcados = 0;

    const partyTotals: Record<string, number> = {};

    SENADO_2022_PARTIES.forEach(p => {
      partyTotals[p.id] = 0;
    });

    comuna.zones.forEach(zoneId => {
      const zData = SENADO_2022_ZONE_VOTES[zoneId];
      if (zData) {
        totalVotos += zData.totalVotos;
        votosValidos += zData.votosValidos;
        votosBlanco += zData.votosBlanco;
        votosNulos += zData.votosNulos;
        votosNoMarcados += zData.votosNoMarcados;

        SENADO_2022_PARTIES.forEach(p => {
          partyTotals[p.id] += zData.parties[p.id]?.totalPartyVotes || 0;
        });
      }
    });

    const sortedParties: ComunaPartySummary[] = SENADO_2022_PARTIES.map(p => {
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

export const SENADO_2022_COMUNA_AGGREGATIONS = buildSenado2022ComunaAggregations();

export function buildSenado2022MunicipalSummary() {
  let totalVotos = 0;
  let votosValidos = 0;
  let votosBlanco = 0;
  let votosNulos = 0;
  let votosNoMarcados = 0;
  const partyTotals: Record<string, number> = {};

  SENADO_2022_PARTIES.forEach(p => {
    partyTotals[p.id] = 0;
  });

  Object.values(SENADO_2022_ZONE_VOTES).forEach(zData => {
    totalVotos += zData.totalVotos;
    votosValidos += zData.votosValidos;
    votosBlanco += zData.votosBlanco;
    votosNulos += zData.votosNulos;
    votosNoMarcados += zData.votosNoMarcados;

    SENADO_2022_PARTIES.forEach(p => {
      partyTotals[p.id] += zData.parties[p.id]?.totalPartyVotes || 0;
    });
  });

  const partiesSummary: Record<string, any> = {};
  const sortedParties: any[] = [];

  SENADO_2022_PARTIES.forEach(p => {
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

export const SENADO_2022_MUNICIPAL_SUMMARY = buildSenado2022MunicipalSummary();

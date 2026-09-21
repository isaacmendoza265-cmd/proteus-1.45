import { Party, Candidate, ZoneVotes, ZoneId, ComunaPartySummary, ComunaVotesAggregation, MunicipalSummary, ElectionType } from './types';
import { COMUNAS_INFO } from './comunasData';
import { buildOfficialConcejo2019Dataset } from './officialConcejo2019';
import { buildOfficialAlcaldia2019Dataset } from './officialAlcaldia2019';

export const TERRITORIAL_YEARS = [2023, 2019, 2015] as const;
export type TerritorialYear = typeof TERRITORIAL_YEARS[number];

// Zone distribution weight profiles for realistic demographic simulation in Medellin
// Normalized zone weights summing to ~1.0
export const ZONE_POPULATION_WEIGHTS: Record<ZoneId, number> = {
  '01': 0.038, '02': 0.035, '03': 0.034, '04': 0.032, '05': 0.036, '06': 0.033,
  '07': 0.039, '08': 0.037, '09': 0.042, '10': 0.038, '11': 0.037, '12': 0.034,
  '13': 0.045, '14': 0.041, '15': 0.035, '16': 0.033, '17': 0.038, '18': 0.035,
  '19': 0.026, '20': 0.024, '21': 0.048, '22': 0.045, '23': 0.036, '24': 0.034,
  '25': 0.041, '26': 0.039, '27': 0.052, '28': 0.050, '29': 0.028, '30': 0.027,
  '31': 0.046, '32': 0.044, '90': 0.062, '98': 0.003, '99': 0.015
};

// Socio-political skew per zone: higher Poblado/Laureles skew (zones 21,22,27,28), higher Popular/SanJavier skew (01-06, 25,26)
export const ZONE_AFFINITY_PROFILE: Record<ZoneId, { centerRight: number; alternativo: number; tradicional: number }> = {
  '01': { centerRight: 0.62, alternativo: 1.35, tradicional: 1.05 },
  '02': { centerRight: 0.65, alternativo: 1.30, tradicional: 1.08 },
  '03': { centerRight: 0.68, alternativo: 1.28, tradicional: 1.10 },
  '04': { centerRight: 0.70, alternativo: 1.25, tradicional: 1.05 },
  '05': { centerRight: 0.75, alternativo: 1.22, tradicional: 1.08 },
  '06': { centerRight: 0.78, alternativo: 1.20, tradicional: 1.06 },
  '07': { centerRight: 0.85, alternativo: 1.15, tradicional: 1.04 },
  '08': { centerRight: 0.88, alternativo: 1.12, tradicional: 1.02 },
  '09': { centerRight: 0.90, alternativo: 1.10, tradicional: 1.00 },
  '10': { centerRight: 0.92, alternativo: 1.08, tradicional: 0.98 },
  '11': { centerRight: 0.86, alternativo: 1.14, tradicional: 1.02 },
  '12': { centerRight: 0.89, alternativo: 1.12, tradicional: 1.01 },
  '13': { centerRight: 0.95, alternativo: 1.05, tradicional: 0.98 },
  '14': { centerRight: 0.98, alternativo: 1.02, tradicional: 0.96 },
  '15': { centerRight: 0.82, alternativo: 1.18, tradicional: 1.05 },
  '16': { centerRight: 0.85, alternativo: 1.15, tradicional: 1.04 },
  '17': { centerRight: 0.88, alternativo: 1.12, tradicional: 1.02 },
  '18': { centerRight: 0.90, alternativo: 1.10, tradicional: 1.00 },
  '19': { centerRight: 1.05, alternativo: 0.95, tradicional: 1.00 },
  '20': { centerRight: 1.08, alternativo: 0.92, tradicional: 0.98 },
  '21': { centerRight: 1.45, alternativo: 0.55, tradicional: 0.90 },
  '22': { centerRight: 1.48, alternativo: 0.52, tradicional: 0.88 },
  '23': { centerRight: 1.15, alternativo: 0.85, tradicional: 0.95 },
  '24': { centerRight: 1.18, alternativo: 0.82, tradicional: 0.94 },
  '25': { centerRight: 0.72, alternativo: 1.32, tradicional: 1.02 },
  '26': { centerRight: 0.76, alternativo: 1.28, tradicional: 1.00 },
  '27': { centerRight: 1.85, alternativo: 0.32, tradicional: 0.75 },
  '28': { centerRight: 1.88, alternativo: 0.30, tradicional: 0.72 },
  '29': { centerRight: 1.12, alternativo: 0.88, tradicional: 0.96 },
  '30': { centerRight: 1.15, alternativo: 0.85, tradicional: 0.95 },
  '31': { centerRight: 1.25, alternativo: 0.75, tradicional: 0.92 },
  '32': { centerRight: 1.28, alternativo: 0.72, tradicional: 0.90 },
  '90': { centerRight: 1.02, alternativo: 0.98, tradicional: 1.10 },
  '98': { centerRight: 0.80, alternativo: 1.20, tradicional: 1.00 },
  '99': { centerRight: 1.30, alternativo: 0.70, tradicional: 0.90 }
};

// -------------------------------------------------------------
// 1. ALCALDÍA DE MEDELLÍN (2023, 2019, 2015)
// -------------------------------------------------------------

export interface TerritorialCandidateConfig {
  id: string;
  name: string;
  partyId: string;
  partyName: string;
  shortName: string;
  color: string;
  logoText: string;
  baseTotalVotes: number;
  ideology: 'centerRight' | 'alternativo' | 'tradicional';
  formula?: string;
}

export const ALCALDIA_DATA_BY_YEAR: Record<TerritorialYear, {
  totalVotos: number;
  votosValidos: number;
  votosBlanco: number;
  votosNulos: number;
  votosNoMarcados: number;
  candidates: TerritorialCandidateConfig[];
}> = {
  2023: {
    totalVotos: 978430,
    votosValidos: 939882,
    votosBlanco: 49812,
    votosNulos: 18450,
    votosNoMarcados: 10098,
    candidates: [
      { id: 'FICO_2023', name: 'FEDERICO GUTIÉRREZ ZULUAGA', partyId: 'CREEMOS', partyName: 'CREEMOS', shortName: 'Federico Gutiérrez', color: '#8b5cf6', logoText: 'CREEMOS', baseTotalVotes: 689519, ideology: 'centerRight' },
      { id: 'UPEGUI_2023', name: 'JUAN CARLOS UPEGUI', partyId: 'INDEPENDIENTES', partyName: 'PARTIDO INDEPENDIENTES', shortName: 'Juan Carlos Upegui', color: '#06b6d4', logoText: 'INDEP', baseTotalVotes: 95393, ideology: 'alternativo' },
      { id: 'CORREDOR_2023', name: 'ALBERT CORREDOR', partyId: 'MED_NOS_UNE', partyName: 'MEDELLÍN NOS UNE', shortName: 'Albert Corredor', color: '#f59e0b', logoText: 'MNU', baseTotalVotes: 27112, ideology: 'alternativo' },
      { id: 'AGUINAGA_2023', name: 'PAULINA AGUINAGA', partyId: 'POR_MEDELLIN', partyName: 'POR MEDELLÍN', shortName: 'Paulina Aguinaga', color: '#ec4899', logoText: 'PM', baseTotalVotes: 13485, ideology: 'tradicional' },
      { id: 'RODOLFO_2023', name: 'RODOLFO CORREA', partyId: 'COL_RENACIENTE', partyName: 'COLOMBIA RENACIENTE', shortName: 'Rodolfo Correa', color: '#10b981', logoText: 'CR', baseTotalVotes: 11894, ideology: 'tradicional' },
      { id: 'TOBON_2023', name: 'GILBERTO TOBÓN SANÍN', partyId: 'FUERZA_CIUDADANA', partyName: 'FUERZA CIUDADANA', shortName: 'Gilberto Tobón', color: '#ef4444', logoText: 'FC', baseTotalVotes: 9560, ideology: 'alternativo' },
      { id: 'BALLESTEROS_2023', name: 'CARLOS BALLESTEROS', partyId: 'PACTO_HISTORICO', partyName: 'PACTO HISTÓRICO', shortName: 'Carlos Ballesteros', color: '#db2777', logoText: 'PH', baseTotalVotes: 9200, ideology: 'alternativo' },
      { id: 'RESTREPO_2023', name: 'JAIME MEJÍA ALVARÍN', partyId: 'SUMAMOS', partyName: 'SUMAMOS POR MEDELLÍN', shortName: 'Jaime Mejía', color: '#6366f1', logoText: 'SUM', baseTotalVotes: 3907, ideology: 'centerRight' }
    ]
  },
  2019: {
    totalVotos: 818450,
    votosValidos: 786850,
    votosBlanco: 45950,
    votosNulos: 16500,
    votosNoMarcados: 9100,
    candidates: [
      { id: 'QUINTERO_2019', name: 'DANIEL QUINTERO CALLE', partyId: 'INDEPENDIENTES', partyName: 'MOVIMIENTO INDEPENDIENTES', shortName: 'Daniel Quintero', color: '#06b6d4', logoText: 'INDEP', baseTotalVotes: 303420, ideology: 'alternativo' },
      { id: 'RAMOS_2019', name: 'ALFREDO RAMOS MAYA', partyId: 'CENTRO_DEMOCRATICO', partyName: 'PARTIDO CENTRO DEMOCRÁTICO', shortName: 'Alfredo Ramos', color: '#2563eb', logoText: 'CD', baseTotalVotes: 235144, ideology: 'centerRight' },
      { id: 'SANTIAGO_2019', name: 'SANTIAGO GÓMEZ BARRERA', partyId: 'SEGUIMOS', partyName: 'SEGUIMOS CONTANDO CON VOS', shortName: 'Santiago Gómez', color: '#8b5cf6', logoText: 'SEGUIMOS', baseTotalVotes: 95082, ideology: 'centerRight' },
      { id: 'VELEZ_2019', name: 'JUAN CARLOS VÉLEZ URIBE', partyId: 'MED_AVANZA', partyName: 'MEDELLÍN AVANZA', shortName: 'Juan Carlos Vélez', color: '#3b82f6', logoText: 'MA', baseTotalVotes: 34225, ideology: 'centerRight' },
      { id: 'BEATRIZ_2019', name: 'BEATRIZ RAVE', partyId: 'ALIANZA_VERDE', partyName: 'PARTIDO ALIANZA VERDE', shortName: 'Beatriz Rave', color: '#10b981', logoText: 'VERDE', baseTotalVotes: 25600, ideology: 'alternativo' },
      { id: 'JESUS_2019', name: 'JESÚS RAMÍREZ', partyId: 'MAIS', partyName: 'MOVIMIENTO MAIS', shortName: 'Jesús Ramírez', color: '#f97316', logoText: 'MAIS', baseTotalVotes: 26050, ideology: 'alternativo' },
      { id: 'CORREA_2019', name: 'VÍCTOR CORREA VÉLEZ', partyId: 'POLO', partyName: 'POLO DEMOCRÁTICO ALTERNATIVO', shortName: 'Víctor Correa', color: '#eab308', logoText: 'POLO', baseTotalVotes: 15200, ideology: 'alternativo' },
      { id: 'JARAMILLO_2019', name: 'JORGE JARAMILLO', partyId: 'COL_JUSTA_LIBRES', partyName: 'COLOMBIA JUSTA LIBRES', shortName: 'Jorge Jaramillo', color: '#64748b', logoText: 'CJL', baseTotalVotes: 6179, ideology: 'tradicional' }
    ]
  },
  2015: {
    totalVotos: 712300,
    votosValidos: 687400,
    votosBlanco: 25120,
    votosNulos: 14800,
    votosNoMarcados: 6100,
    candidates: [
      { id: 'FICO_2015', name: 'FEDERICO GUTIÉRREZ ZULUAGA', partyId: 'CREEMOS', partyName: 'MOVIMIENTO CREEMOS', shortName: 'Federico Gutiérrez', color: '#8b5cf6', logoText: 'CREEMOS', baseTotalVotes: 246221, ideology: 'centerRight' },
      { id: 'VELEZ_2015', name: 'JUAN CARLOS VÉLEZ URIBE', partyId: 'CENTRO_DEMOCRATICO', partyName: 'PARTIDO CENTRO DEMOCRÁTICO', shortName: 'Juan Carlos Vélez', color: '#2563eb', logoText: 'CD', baseTotalVotes: 236632, ideology: 'centerRight' },
      { id: 'RICO_2015', name: 'GABRIEL JAIME RICO', partyId: 'JUNTOS_MED', partyName: 'JUNTOS POR MEDELLÍN (U - CONS - CR)', shortName: 'Gabriel Jaime Rico', color: '#0284c7', logoText: 'JUNTOS', baseTotalVotes: 111794, ideology: 'tradicional' },
      { id: 'ALONSO_2015', name: 'ALONSO SALAZAR JARAMILLO', partyId: 'VERDE_ASI', partyName: 'ALIANZA VERDE - ASI', shortName: 'Alonso Salazar', color: '#10b981', logoText: 'VERDE', baseTotalVotes: 52381, ideology: 'alternativo' },
      { id: 'HOYOS_2015', name: 'HÉCTOR HOYOS', partyId: 'POLO', partyName: 'POLO DEMOCRÁTICO ALTERNATIVO', shortName: 'Héctor Hoyos', color: '#eab308', logoText: 'POLO', baseTotalVotes: 9840, ideology: 'alternativo' }
    ]
  }
};

// -------------------------------------------------------------
// 2. GOBERNACIÓN DE ANTIOQUIA (2023, 2019, 2015 - Medellín)
// -------------------------------------------------------------

export const GOBERNACION_DATA_BY_YEAR: Record<TerritorialYear, {
  totalVotos: number;
  votosValidos: number;
  votosBlanco: number;
  votosNulos: number;
  votosNoMarcados: number;
  candidates: TerritorialCandidateConfig[];
}> = {
  2023: {
    totalVotos: 965200,
    votosValidos: 914800,
    votosBlanco: 65200,
    votosNulos: 21800,
    votosNoMarcados: 13400,
    candidates: [
      { id: 'RENDON_2023', name: 'ANDRÉS JULIÁN RENDÓN CARDONA', partyId: 'POR_ANTIOQUIA_FIRME', partyName: 'POR ANTIOQUIA FIRME / CD / CREEMOS', shortName: 'Andrés Julián Rendón', color: '#2563eb', logoText: 'RENDÓN', baseTotalVotes: 495210, ideology: 'centerRight' },
      { id: 'LUIS_PEREZ_2023', name: 'LUIS PÉREZ GUTIÉRREZ', partyId: 'PIENSA_EN_GRANDE', partyName: 'PIENSA EN GRANDE (ASI - CR - COL RENACIENTE)', shortName: 'Luis Pérez', color: '#f59e0b', logoText: 'L. PÉREZ', baseTotalVotes: 238400, ideology: 'tradicional' },
      { id: 'RESTREPO_GOB_2023', name: 'ESTEBAN RESTREPO', partyId: 'INDEPENDIENTES', partyName: 'PARTIDO INDEPENDIENTES', shortName: 'Esteban Restrepo', color: '#06b6d4', logoText: 'INDEP', baseTotalVotes: 82150, ideology: 'alternativo' },
      { id: 'TOBON_GOB_2023', name: 'MAURICIO TOBÓN FRANCO', partyId: 'EL_PARCHE', partyName: 'EL PARCHE POR ANTIOQUIA', shortName: 'Mauricio Tobón', color: '#ec4899', logoText: 'PARCHE', baseTotalVotes: 38400, ideology: 'centerRight' },
      { id: 'JORGE_GOMEZ_2023', name: 'JORGE GÓMEZ GALLEGO', partyId: 'DIGNIDAD_COMPROMISO', partyName: 'DIGNIDAD & COMPROMISO', shortName: 'Jorge Gómez', color: '#10b981', logoText: 'DIGNIDAD', baseTotalVotes: 21300, ideology: 'alternativo' },
      { id: 'HALABY_2023', name: 'CRISTIAN HALABY', partyId: 'NUEVA_FUERZA', partyName: 'NUEVA FUERZA DEMOCRÁTICA / MSV', shortName: 'Cristian Halaby', color: '#6366f1', logoText: 'NFD', baseTotalVotes: 15400, ideology: 'centerRight' }
    ]
  },
  2019: {
    totalVotos: 812400,
    votosValidos: 768200,
    votosBlanco: 58100,
    votosNulos: 18200,
    votosNoMarcados: 11900,
    candidates: [
      { id: 'ANIBAL_2019', name: 'ANÍBAL GAVIRIA CORREA', partyId: 'ES_EL_MOMENTO', partyName: 'ES EL MOMENTO DE ANTIOQUIA (LIB - VERDE - U - CR)', shortName: 'Aníbal Gaviria', color: '#ef4444', logoText: 'GAVIRIA', baseTotalVotes: 392450, ideology: 'tradicional' },
      { id: 'GUERRA_2019', name: 'ANDRÉS GUERRA HOYOS', partyId: 'CENTRO_DEMOCRATICO', partyName: 'PARTIDO CENTRO DEMOCRÁTICO', shortName: 'Andrés Guerra', color: '#2563eb', logoText: 'CD', baseTotalVotes: 285120, ideology: 'centerRight' },
      { id: 'TOBON_2019', name: 'MAURICIO TOBÓN', partyId: 'TU_PUEDES', partyName: 'TÚ PUEDES', shortName: 'Mauricio Tobón', color: '#f59e0b', logoText: 'TOBÓN', baseTotalVotes: 86300, ideology: 'centerRight' },
      { id: 'RESTREPO_2019', name: 'JUAN CAMILO RESTREPO', partyId: 'CONSERVADOR', partyName: 'PARTIDO CONSERVADOR COLOMBIANO', shortName: 'Juan Camilo Restrepo', color: '#0284c7', logoText: 'C', baseTotalVotes: 38200, ideology: 'tradicional' },
      { id: 'PEREZ_2019', name: 'IVÁN MAURICIO PÉREZ', partyId: 'COMPROMISO_CIUDADANO', partyName: 'COMPROMISO CIUDADANO', shortName: 'Iván M. Pérez', color: '#10b981', logoText: 'CC', baseTotalVotes: 34100, ideology: 'alternativo' },
      { id: 'CORREA_GOB_2019', name: 'RODOLFO CORREA', partyId: 'ASI', partyName: 'ALIANZA SOCIAL INDEPENDIENTE (ASI)', shortName: 'Rodolfo Correa', color: '#06b6d4', logoText: 'ASI', baseTotalVotes: 24500, ideology: 'tradicional' }
    ]
  },
  2015: {
    totalVotos: 704100,
    votosValidos: 668900,
    votosBlanco: 42300,
    votosNulos: 15400,
    votosNoMarcados: 9500,
    candidates: [
      { id: 'LUIS_PEREZ_2015', name: 'LUIS PÉREZ GUTIÉRREZ', partyId: 'GANAS_CON_LUCHO', partyName: 'GANAS CON LUCHO (LIB - CR - U)', shortName: 'Luis Pérez', color: '#ef4444', logoText: 'LUCHO', baseTotalVotes: 280450, ideology: 'tradicional' },
      { id: 'GUERRA_2015', name: 'ANDRÉS GUERRA HOYOS', partyId: 'CENTRO_DEMOCRATICO', partyName: 'PARTIDO CENTRO DEMOCRÁTICO', shortName: 'Andrés Guerra', color: '#2563eb', logoText: 'CD', baseTotalVotes: 265300, ideology: 'centerRight' },
      { id: 'RESTREPO_2015', name: 'FEDERICO RESTREPO POSADA', partyId: 'COMPROMISO_ANTIOQUIA', partyName: 'COMPROMISO POR ANTIOQUIA (VERDE - FAJARDO)', shortName: 'Federico Restrepo', color: '#10b981', logoText: 'FAJARDO', baseTotalVotes: 148200, ideology: 'alternativo' },
      { id: 'OLMEDO_2015', name: 'OLMEDO LÓPEZ', partyId: 'POLO', partyName: 'POLO DEMOCRÁTICO ALTERNATIVO', shortName: 'Olmedo López', color: '#eab308', logoText: 'POLO', baseTotalVotes: 12400, ideology: 'alternativo' }
    ]
  }
};

// -------------------------------------------------------------
// 3. CONCEJO DE MEDELLÍN (2023, 2019, 2015)
// -------------------------------------------------------------

export interface TerritorialPartyConfig {
  id: string;
  name: string;
  shortName: string;
  color: string;
  logoText: string;
  preferential: boolean;
  baseVotes: number;
  ideology: 'centerRight' | 'alternativo' | 'tradicional';
  curules?: number;
  sampleCandidates?: { number: string; name: string; votesRatio: number }[];
}

export const CONCEJO_DATA_BY_YEAR: Record<TerritorialYear, {
  totalVotos: number;
  votosValidos: number;
  votosBlanco: number;
  votosNulos: number;
  votosNoMarcados: number;
  parties: TerritorialPartyConfig[];
}> = {
  2023: {
    totalVotos: 934500,
    votosValidos: 865200,
    votosBlanco: 85200,
    votosNulos: 23100,
    votosNoMarcados: 16200,
    parties: [
      {
        id: 'CON_CREEMOS_2023',
        name: 'CREEMOS EQUIPO FEDERICO GUTIÉRREZ',
        shortName: 'Creemos',
        color: '#8b5cf6',
        logoText: 'CREEMOS',
        preferential: true,
        baseVotes: 223450,
        ideology: 'centerRight',
        curules: 7,
        sampleCandidates: [
          { number: '1', name: 'ANDRÉS FELIPE TOBÓN VILLADA', votesRatio: 0.22 },
          { number: '2', name: 'MARÍA PAULINA SUÁREZ', votesRatio: 0.16 },
          { number: '3', name: 'SANTIAGO PERDOMO', votesRatio: 0.14 },
          { number: '4', name: 'ALEJANDRO DE BEDOUT', votesRatio: 0.12 },
          { number: '5', name: 'JUAN RAMÓN JIMÉNEZ LARA', votesRatio: 0.10 },
          { number: '6', name: 'DAMIÁN PÉREZ ARROYAVE', votesRatio: 0.08 },
          { number: '7', name: 'CAMILA GAVIRIA BARRENECHE', votesRatio: 0.07 }
        ]
      },
      {
        id: 'CON_CD_2023',
        name: 'PARTIDO CENTRO DEMOCRÁTICO',
        shortName: 'Centro Democrático',
        color: '#2563eb',
        logoText: 'CD',
        preferential: true,
        baseVotes: 162300,
        ideology: 'centerRight',
        curules: 5,
        sampleCandidates: [
          { number: '1', name: 'SEBASTIÁN LÓPEZ VALENCIA', votesRatio: 0.28 },
          { number: '2', name: 'LETICIA ORREGO PÉREZ', votesRatio: 0.20 },
          { number: '3', name: 'CLAUDIA VICTORIA CARRASQUILLA', votesRatio: 0.18 },
          { number: '4', name: 'LUIS GUILLERMO VÉLEZ', votesRatio: 0.14 },
          { number: '5', name: 'ANDRÉS RODRÍGUEZ (GRINGO)', votesRatio: 0.10 }
        ]
      },
      {
        id: 'CON_CONS_2023',
        name: 'PARTIDO CONSERVADOR COLOMBIANO',
        shortName: 'Conservador',
        color: '#0284c7',
        logoText: 'C',
        preferential: true,
        baseVotes: 61200,
        ideology: 'tradicional',
        curules: 2,
        sampleCandidates: [
          { number: '1', name: 'BRISVANY ARENAS SALVADOR', votesRatio: 0.40 },
          { number: '2', name: 'JUAN RAMÓN JIMÉNEZ', votesRatio: 0.35 }
        ]
      },
      {
        id: 'CON_LIB_2023',
        name: 'PARTIDO LIBERAL COLOMBIANO',
        shortName: 'Liberal',
        color: '#ef4444',
        logoText: 'L',
        preferential: true,
        baseVotes: 58400,
        ideology: 'tradicional',
        curules: 2,
        sampleCandidates: [
          { number: '1', name: 'FABIO HUMBERTO RIVERA RIVERA', votesRatio: 0.45 },
          { number: '2', name: 'FARLEY MACÍAS', votesRatio: 0.32 }
        ]
      },
      {
        id: 'CON_VERDE_2023',
        name: 'PARTIDO ALIANZA VERDE',
        shortName: 'Alianza Verde',
        color: '#10b981',
        logoText: 'VERDE',
        preferential: true,
        baseVotes: 48100,
        ideology: 'alternativo',
        curules: 1,
        sampleCandidates: [
          { number: '1', name: 'JAIME ROBERTO CUARTAS OCHOA', votesRatio: 0.42 }
        ]
      },
      {
        id: 'CON_PH_2023',
        name: 'PACTO HISTÓRICO MEDELLÍN',
        shortName: 'Pacto Histórico',
        color: '#db2777',
        logoText: 'PH',
        preferential: false,
        baseVotes: 44200,
        ideology: 'alternativo',
        curules: 1,
        sampleCandidates: [
          { number: '1', name: 'JOSÉ LUIS MARÍN MORALES (AQUÍNOTICIAS)', votesRatio: 1.0 }
        ]
      },
      {
        id: 'CON_INDEP_2023',
        name: 'PARTIDO INDEPENDIENTES',
        shortName: 'Independientes',
        color: '#06b6d4',
        logoText: 'INDEP',
        preferential: true,
        baseVotes: 41800,
        ideology: 'alternativo',
        curules: 1,
        sampleCandidates: [
          { number: '1', name: 'CARLOS ALBERTO GUTIÉRREZ', votesRatio: 0.46 }
        ]
      },
      {
        id: 'CON_ASI_2023',
        name: 'ALIANZA SOCIAL INDEPENDIENTE - EN MARCHA',
        shortName: 'ASI - En Marcha',
        color: '#f59e0b',
        logoText: 'ASI',
        preferential: true,
        baseVotes: 32100,
        ideology: 'tradicional',
        curules: 1,
        sampleCandidates: [
          { number: '1', name: 'JUAN CARLOS DE LA CUESTA', votesRatio: 0.50 }
        ]
      },
      {
        id: 'CON_JUNTOS_2023',
        name: 'JUNTOS PODEMOS MÁS (MIRA - CAMBIO RADICAL)',
        shortName: 'Mira - Cambio Radical',
        color: '#6366f1',
        logoText: 'MIRA-CR',
        preferential: true,
        baseVotes: 28400,
        ideology: 'tradicional',
        curules: 1,
        sampleCandidates: [
          { number: '1', name: 'JUAN FELIPE BETANCUR CORREA', votesRatio: 0.48 }
        ]
      }
    ]
  },
  2019: {
    totalVotos: 792400,
    votosValidos: 724100,
    votosBlanco: 74200,
    votosNulos: 19800,
    votosNoMarcados: 13800,
    parties: [
      {
        id: 'CON_CD_2019',
        name: 'PARTIDO CENTRO DEMOCRÁTICO',
        shortName: 'Centro Democrático',
        color: '#2563eb',
        logoText: 'CD',
        preferential: true,
        baseVotes: 164300,
        ideology: 'centerRight',
        curules: 8,
        sampleCandidates: [
          { number: '1', name: 'SEBASTIÁN LÓPEZ VALENCIA', votesRatio: 0.25 },
          { number: '2', name: 'GABRIEL DIB DÍAZ', votesRatio: 0.18 },
          { number: '3', name: 'NATALIA SÁNCHEZ GÓMEZ', votesRatio: 0.15 },
          { number: '4', name: 'SIMÓN MOLINA GÓMEZ', votesRatio: 0.14 }
        ]
      },
      {
        id: 'CON_CONS_2019',
        name: 'PARTIDO CONSERVADOR COLOMBIANO',
        shortName: 'Conservador',
        color: '#0284c7',
        logoText: 'C',
        preferential: true,
        baseVotes: 83400,
        ideology: 'tradicional',
        curules: 3,
        sampleCandidates: [
          { number: '1', name: 'JUAN RAMÓN JIMÉNEZ', votesRatio: 0.38 },
          { number: '2', name: 'JOHN JAIME MONCADA', votesRatio: 0.34 }
        ]
      },
      {
        id: 'CON_LIB_2019',
        name: 'PARTIDO LIBERAL COLOMBIANO',
        shortName: 'Liberal',
        color: '#ef4444',
        logoText: 'L',
        preferential: true,
        baseVotes: 78200,
        ideology: 'tradicional',
        curules: 3,
        sampleCandidates: [
          { number: '1', name: 'FABIO HUMBERTO RIVERA RIVERA', votesRatio: 0.44 },
          { number: '2', name: 'AURA MARLENY ARCILA', votesRatio: 0.36 }
        ]
      },
      {
        id: 'CON_VERDE_2019',
        name: 'PARTIDO ALIANZA VERDE',
        shortName: 'Alianza Verde',
        color: '#10b981',
        logoText: 'VERDE',
        preferential: true,
        baseVotes: 75600,
        ideology: 'alternativo',
        curules: 2,
        sampleCandidates: [
          { number: '1', name: 'DANIEL DUQUE VELÁSQUEZ', votesRatio: 0.40 },
          { number: '2', name: 'JAIME ROBERTO CUARTAS', votesRatio: 0.36 }
        ]
      },
      {
        id: 'CON_INDEP_2019',
        name: 'MOVIMIENTO INDEPENDIENTES',
        shortName: 'Independientes',
        color: '#06b6d4',
        logoText: 'INDEP',
        preferential: true,
        baseVotes: 44100,
        ideology: 'alternativo',
        curules: 2,
        sampleCandidates: [
          { number: '1', name: 'ÁLEX FLÓREZ HERNÁNDEZ', votesRatio: 0.48 },
          { number: '2', name: 'LINA MARCELA GARCÍA', votesRatio: 0.35 }
        ]
      },
      {
        id: 'CON_ESTAMOS_2019',
        name: 'MOVIMIENTO ESTAMOS LISTAS',
        shortName: 'Estamos Listas',
        color: '#a855f7',
        logoText: 'LISTAS',
        preferential: false,
        baseVotes: 28300,
        ideology: 'alternativo',
        curules: 1,
        sampleCandidates: [
          { number: '1', name: 'DORA CECILIA SALDARRIAGA', votesRatio: 1.0 }
        ]
      },
      {
        id: 'CON_LAU_2019',
        name: 'PARTIDO DE LA U',
        shortName: 'Partido de la U',
        color: '#f97316',
        logoText: 'U',
        preferential: true,
        baseVotes: 36400,
        ideology: 'tradicional',
        curules: 1,
        sampleCandidates: [
          { number: '1', name: 'LUIS CARLOS HERNÁNDEZ', votesRatio: 0.42 }
        ]
      },
      {
        id: 'CON_CR_2019',
        name: 'PARTIDO CAMBIO RADICAL',
        shortName: 'Cambio Radical',
        color: '#3b82f6',
        logoText: 'CR',
        preferential: true,
        baseVotes: 26100,
        ideology: 'tradicional',
        curules: 1,
        sampleCandidates: [
          { number: '1', name: 'RICARDO LEÓN YEPES', votesRatio: 0.45 }
        ]
      }
    ]
  },
  2015: {
    totalVotos: 684200,
    votosValidos: 631400,
    votosBlanco: 62400,
    votosNulos: 17200,
    votosNoMarcados: 11100,
    parties: [
      {
        id: 'CON_CD_2015',
        name: 'PARTIDO CENTRO DEMOCRÁTICO',
        shortName: 'Centro Democrático',
        color: '#2563eb',
        logoText: 'CD',
        preferential: true,
        baseVotes: 148200,
        ideology: 'centerRight',
        curules: 6,
        sampleCandidates: [
          { number: '1', name: 'NATALIA VÉLEZ LONDOÑO', votesRatio: 0.30 },
          { number: '2', name: 'SIMÓN MOLINA GÓMEZ', votesRatio: 0.24 },
          { number: '3', name: 'MARÍA PAULINA AGUINAGA', votesRatio: 0.20 }
        ]
      },
      {
        id: 'CON_LIB_2015',
        name: 'PARTIDO LIBERAL COLOMBIANO',
        shortName: 'Liberal',
        color: '#ef4444',
        logoText: 'L',
        preferential: true,
        baseVotes: 94500,
        ideology: 'tradicional',
        curules: 4,
        sampleCandidates: [
          { number: '1', name: 'FABIO HUMBERTO RIVERA', votesRatio: 0.38 },
          { number: '2', name: 'AURA MARLENY ARCILA', votesRatio: 0.32 }
        ]
      },
      {
        id: 'CON_CONS_2015',
        name: 'PARTIDO CONSERVADOR COLOMBIANO',
        shortName: 'Conservador',
        color: '#0284c7',
        logoText: 'C',
        preferential: true,
        baseVotes: 86100,
        ideology: 'tradicional',
        curules: 3,
        sampleCandidates: [
          { number: '1', name: 'JOHN JAIME MONCADA', votesRatio: 0.40 },
          { number: '2', name: 'CARLOS ALBERTO ZULUAGA', votesRatio: 0.36 }
        ]
      },
      {
        id: 'CON_CREEMOS_2015',
        name: 'MOVIMIENTO CREEMOS',
        shortName: 'Creemos',
        color: '#8b5cf6',
        logoText: 'CREEMOS',
        preferential: true,
        baseVotes: 65400,
        ideology: 'centerRight',
        curules: 2,
        sampleCandidates: [
          { number: '1', name: 'DANIEL CARVALHO MEJÍA', votesRatio: 0.45 },
          { number: '2', name: 'ROBERTO CARLOS MONTOYA', votesRatio: 0.35 }
        ]
      },
      {
        id: 'CON_LAU_2015',
        name: 'PARTIDO DE LA U',
        shortName: 'Partido de la U',
        color: '#f97316',
        logoText: 'U',
        preferential: true,
        baseVotes: 58300,
        ideology: 'tradicional',
        curules: 2,
        sampleCandidates: [
          { number: '1', name: 'JESÚS ANÍBAL ECHEVERRI', votesRatio: 0.48 }
        ]
      },
      {
        id: 'CON_VERDE_2015',
        name: 'PARTIDO ALIANZA VERDE',
        shortName: 'Alianza Verde',
        color: '#10b981',
        logoText: 'VERDE',
        preferential: true,
        baseVotes: 52100,
        ideology: 'alternativo',
        curules: 2,
        sampleCandidates: [
          { number: '1', name: 'JAIME ROBERTO CUARTAS', votesRatio: 0.44 }
        ]
      },
      {
        id: 'CON_CR_2015',
        name: 'PARTIDO CAMBIO RADICAL',
        shortName: 'Cambio Radical',
        color: '#3b82f6',
        logoText: 'CR',
        preferential: true,
        baseVotes: 44300,
        ideology: 'tradicional',
        curules: 2,
        sampleCandidates: [
          { number: '1', name: 'ROBERTO CARLOS ZAPATA', votesRatio: 0.42 }
        ]
      }
    ]
  }
};

// -------------------------------------------------------------
// 4. ASAMBLEA DE ANTIOQUIA (2023, 2019, 2015 - Medellín)
// -------------------------------------------------------------

export const ASAMBLEA_DATA_BY_YEAR: Record<TerritorialYear, {
  totalVotos: number;
  votosValidos: number;
  votosBlanco: number;
  votosNulos: number;
  votosNoMarcados: number;
  parties: TerritorialPartyConfig[];
}> = {
  2023: {
    totalVotos: 912300,
    votosValidos: 824500,
    votosBlanco: 92400,
    votosNulos: 25800,
    votosNoMarcados: 18400,
    parties: [
      {
        id: 'ASA_CREEMOS_2023',
        name: 'CREEMOS ASAMBLEA DE ANTIOQUIA',
        shortName: 'Creemos',
        color: '#8b5cf6',
        logoText: 'CREEMOS',
        preferential: true,
        baseVotes: 185400,
        ideology: 'centerRight',
        curules: 5,
        sampleCandidates: [
          { number: '51', name: 'MATEO ESCOBAR URIBE', votesRatio: 0.28 },
          { number: '52', name: 'JULIÁN PEINADO RAMÍREZ', votesRatio: 0.22 }
        ]
      },
      {
        id: 'ASA_CD_2023',
        name: 'PARTIDO CENTRO DEMOCRÁTICO',
        shortName: 'Centro Democrático',
        color: '#2563eb',
        logoText: 'CD',
        preferential: true,
        baseVotes: 142300,
        ideology: 'centerRight',
        curules: 4,
        sampleCandidates: [
          { number: '51', name: 'VERÓNICA ARANGO GARCÍA', votesRatio: 0.32 },
          { number: '52', name: 'LUIS GABRIEL GÓMEZ', votesRatio: 0.25 }
        ]
      },
      {
        id: 'ASA_CONS_2023',
        name: 'PARTIDO CONSERVADOR COLOMBIANO',
        shortName: 'Conservador',
        color: '#0284c7',
        logoText: 'C',
        preferential: true,
        baseVotes: 68400,
        ideology: 'tradicional',
        curules: 3,
        sampleCandidates: [
          { number: '51', name: 'JAIME ENRIQUE DUQUE', votesRatio: 0.35 }
        ]
      },
      {
        id: 'ASA_LIB_2023',
        name: 'PARTIDO LIBERAL COLOMBIANO',
        shortName: 'Liberal',
        color: '#ef4444',
        logoText: 'L',
        preferential: true,
        baseVotes: 62100,
        ideology: 'tradicional',
        curules: 3,
        sampleCandidates: [
          { number: '51', name: 'ANDRÉS FELIPE MESA', votesRatio: 0.40 }
        ]
      },
      {
        id: 'ASA_VERDE_2023',
        name: 'PARTIDO ALIANZA VERDE',
        shortName: 'Alianza Verde',
        color: '#10b981',
        logoText: 'VERDE',
        preferential: true,
        baseVotes: 51200,
        ideology: 'alternativo',
        curules: 2,
        sampleCandidates: [
          { number: '51', name: 'CAMILO CALLE OCHOA', votesRatio: 0.42 }
        ]
      },
      {
        id: 'ASA_PH_2023',
        name: 'PACTO HISTÓRICO ANTIOQUIA',
        shortName: 'Pacto Histórico',
        color: '#db2777',
        logoText: 'PH',
        preferential: false,
        baseVotes: 42800,
        ideology: 'alternativo',
        curules: 2,
        sampleCandidates: [
          { number: '51', name: 'MANUEL GARCÍA', votesRatio: 1.0 }
        ]
      },
      {
        id: 'ASA_ALIANZA_2023',
        name: 'ALIANZA POR ANTIOQUIA (MIRA - CAMBIO RADICAL)',
        shortName: 'Mira - Cambio Radical',
        color: '#6366f1',
        logoText: 'MIRA-CR',
        preferential: true,
        baseVotes: 34200,
        ideology: 'tradicional',
        curules: 1,
        sampleCandidates: [
          { number: '51', name: 'JULIO RESTREPO', votesRatio: 0.45 }
        ]
      }
    ]
  },
  2019: {
    totalVotos: 785400,
    votosValidos: 702400,
    votosBlanco: 82400,
    votosNulos: 22100,
    votosNoMarcados: 16200,
    parties: [
      {
        id: 'ASA_CD_2019',
        name: 'PARTIDO CENTRO DEMOCRÁTICO',
        shortName: 'Centro Democrático',
        color: '#2563eb',
        logoText: 'CD',
        preferential: true,
        baseVotes: 154200,
        ideology: 'centerRight',
        curules: 6,
        sampleCandidates: [
          { number: '51', name: 'JOSÉ LUIS NOREÑA', votesRatio: 0.32 },
          { number: '52', name: 'VERÓNICA ARANGO', votesRatio: 0.28 }
        ]
      },
      {
        id: 'ASA_LIB_2019',
        name: 'PARTIDO LIBERAL COLOMBIANO',
        shortName: 'Liberal',
        color: '#ef4444',
        logoText: 'L',
        preferential: true,
        baseVotes: 92400,
        ideology: 'tradicional',
        curules: 5,
        sampleCandidates: [
          { number: '51', name: 'RUBÉN DARÍO CALLEJAS', votesRatio: 0.35 }
        ]
      },
      {
        id: 'ASA_CONS_2019',
        name: 'PARTIDO CONSERVADOR COLOMBIANO',
        shortName: 'Conservador',
        color: '#0284c7',
        logoText: 'C',
        preferential: true,
        baseVotes: 88100,
        ideology: 'tradicional',
        curules: 4,
        sampleCandidates: [
          { number: '51', name: 'JAIME ENRIQUE DUQUE', votesRatio: 0.38 }
        ]
      },
      {
        id: 'ASA_VERDE_2019',
        name: 'PARTIDO ALIANZA VERDE',
        shortName: 'Alianza Verde',
        color: '#10b981',
        logoText: 'VERDE',
        preferential: true,
        baseVotes: 68400,
        ideology: 'alternativo',
        curules: 3,
        sampleCandidates: [
          { number: '51', name: 'CAMILO CALLE', votesRatio: 0.40 }
        ]
      },
      {
        id: 'ASA_LAU_2019',
        name: 'PARTIDO DE LA U',
        shortName: 'Partido de la U',
        color: '#f97316',
        logoText: 'U',
        preferential: true,
        baseVotes: 42100,
        ideology: 'tradicional',
        curules: 2,
        sampleCandidates: [
          { number: '51', name: 'RODRIGO MENDOZA', votesRatio: 0.42 }
        ]
      },
      {
        id: 'ASA_CR_2019',
        name: 'PARTIDO CAMBIO RADICAL',
        shortName: 'Cambio Radical',
        color: '#3b82f6',
        logoText: 'CR',
        preferential: true,
        baseVotes: 36500,
        ideology: 'tradicional',
        curules: 2,
        sampleCandidates: [
          { number: '51', name: 'JOHN JAIRO BERRÍO', votesRatio: 0.45 }
        ]
      }
    ]
  },
  2015: {
    totalVotos: 678900,
    votosValidos: 615400,
    votosBlanco: 68200,
    votosNulos: 19400,
    votosNoMarcados: 13200,
    parties: [
      {
        id: 'ASA_CD_2015',
        name: 'PARTIDO CENTRO DEMOCRÁTICO',
        shortName: 'Centro Democrático',
        color: '#2563eb',
        logoText: 'CD',
        preferential: true,
        baseVotes: 138400,
        ideology: 'centerRight',
        curules: 6,
        sampleCandidates: [
          { number: '51', name: 'ANA CRISTINA MORENO', votesRatio: 0.35 }
        ]
      },
      {
        id: 'ASA_LIB_2015',
        name: 'PARTIDO LIBERAL COLOMBIANO',
        shortName: 'Liberal',
        color: '#ef4444',
        logoText: 'L',
        preferential: true,
        baseVotes: 104200,
        ideology: 'tradicional',
        curules: 5,
        sampleCandidates: [
          { number: '51', name: 'RIGOBERTO ARROYAVE', votesRatio: 0.36 }
        ]
      },
      {
        id: 'ASA_CONS_2015',
        name: 'PARTIDO CONSERVADOR COLOMBIANO',
        shortName: 'Conservador',
        color: '#0284c7',
        logoText: 'C',
        preferential: true,
        baseVotes: 96300,
        ideology: 'tradicional',
        curules: 5,
        sampleCandidates: [
          { number: '51', name: 'JUAN ESTEBAN VILLEGAS', votesRatio: 0.38 }
        ]
      },
      {
        id: 'ASA_VERDE_2015',
        name: 'PARTIDO ALIANZA VERDE',
        shortName: 'Alianza Verde',
        color: '#10b981',
        logoText: 'VERDE',
        preferential: true,
        baseVotes: 58400,
        ideology: 'alternativo',
        curules: 3,
        sampleCandidates: [
          { number: '51', name: 'ROGELIO ZAPATA', votesRatio: 0.42 }
        ]
      },
      {
        id: 'ASA_LAU_2015',
        name: 'PARTIDO DE LA U',
        shortName: 'Partido de la U',
        color: '#f97316',
        logoText: 'U',
        preferential: true,
        baseVotes: 54100,
        ideology: 'tradicional',
        curules: 3,
        sampleCandidates: [
          { number: '51', name: 'NORMAN HARRY POSADA', votesRatio: 0.40 }
        ]
      },
      {
        id: 'ASA_CR_2015',
        name: 'PARTIDO CAMBIO RADICAL',
        shortName: 'Cambio Radical',
        color: '#3b82f6',
        logoText: 'CR',
        preferential: true,
        baseVotes: 41200,
        ideology: 'tradicional',
        curules: 2,
        sampleCandidates: [
          { number: '51', name: 'JORGE IGNACIO MONTOYA', votesRatio: 0.44 }
        ]
      }
    ]
  }
};

// -------------------------------------------------------------
// HELPER: BUILD FULL AGGREGATIONS & ZONE DATA FOR TERRITORIAL
// -------------------------------------------------------------

function buildTerritorialDataset(
  electionType: 'alcaldia' | 'gobernacion' | 'concejo' | 'asamblea',
  year: TerritorialYear
) {
  const allZones = Object.keys(ZONE_POPULATION_WEIGHTS) as ZoneId[];

  // Retrieve raw config
  let rawParties: {
    id: string;
    name: string;
    shortName: string;
    color: string;
    logoText: string;
    preferential: boolean;
    baseVotes: number;
    ideology: 'centerRight' | 'alternativo' | 'tradicional';
    formula?: string;
    sampleCandidates?: { number: string; name: string; votesRatio: number }[];
  }[] = [];

  let metaTotals = {
    totalVotos: 0,
    votosValidos: 0,
    votosBlanco: 0,
    votosNulos: 0,
    votosNoMarcados: 0
  };

  if (electionType === 'alcaldia') {
    const d = ALCALDIA_DATA_BY_YEAR[year];
    metaTotals = d;
    rawParties = d.candidates.map(c => ({
      id: c.partyId,
      name: c.partyName,
      shortName: c.shortName,
      color: c.color,
      logoText: c.logoText,
      preferential: false,
      baseVotes: c.baseTotalVotes,
      ideology: c.ideology,
      formula: c.name,
      sampleCandidates: [{ number: '1', name: c.name, votesRatio: 1.0 }]
    }));
  } else if (electionType === 'gobernacion') {
    const d = GOBERNACION_DATA_BY_YEAR[year];
    metaTotals = d;
    rawParties = d.candidates.map(c => ({
      id: c.partyId,
      name: c.partyName,
      shortName: c.shortName,
      color: c.color,
      logoText: c.logoText,
      preferential: false,
      baseVotes: c.baseTotalVotes,
      ideology: c.ideology,
      formula: c.name,
      sampleCandidates: [{ number: '1', name: c.name, votesRatio: 1.0 }]
    }));
  } else if (electionType === 'concejo') {
    const d = CONCEJO_DATA_BY_YEAR[year];
    metaTotals = d;
    rawParties = d.parties.map(p => ({
      id: p.id,
      name: p.name,
      shortName: p.shortName,
      color: p.color,
      logoText: p.logoText,
      preferential: p.preferential,
      baseVotes: p.baseVotes,
      ideology: p.ideology,
      sampleCandidates: p.sampleCandidates
    }));
  } else if (electionType === 'asamblea') {
    const d = ASAMBLEA_DATA_BY_YEAR[year];
    metaTotals = d;
    rawParties = d.parties.map(p => ({
      id: p.id,
      name: p.name,
      shortName: p.shortName,
      color: p.color,
      logoText: p.logoText,
      preferential: p.preferential,
      baseVotes: p.baseVotes,
      ideology: p.ideology,
      sampleCandidates: p.sampleCandidates
    }));
  }

  // Build ZoneVotes
  const zoneVotes: Record<ZoneId, ZoneVotes> = {} as any;
  const rawSumPartyVotes = rawParties.reduce((sum, p) => sum + p.baseVotes, 0);

  allZones.forEach(z => {
    const popWeight = ZONE_POPULATION_WEIGHTS[z] || 0.03;
    const affinity = ZONE_AFFINITY_PROFILE[z] || { centerRight: 1, alternativo: 1, tradicional: 1 };

    const partiesVoteRecord: Record<string, { partyOnly: number; candidateVotes: Record<string, number>; totalPartyVotes: number }> = {};
    let zValidos = 0;

    rawParties.forEach(p => {
      const skew = affinity[p.ideology] || 1.0;
      const zonePartyVotes = Math.round(p.baseVotes * popWeight * skew);
      
      const candidateVotesMap: Record<string, number> = {};
      if (p.sampleCandidates && p.sampleCandidates.length > 0) {
        if (p.preferential) {
          const partyOnlyVotes = Math.round(zonePartyVotes * 0.20);
          const candTotalPool = zonePartyVotes - partyOnlyVotes;
          p.sampleCandidates.forEach(cand => {
            candidateVotesMap[cand.number] = Math.round(candTotalPool * cand.votesRatio);
          });
          partiesVoteRecord[p.id] = {
            partyOnly: partyOnlyVotes,
            candidateVotes: candidateVotesMap,
            totalPartyVotes: zonePartyVotes
          };
        } else {
          candidateVotesMap['1'] = zonePartyVotes;
          partiesVoteRecord[p.id] = {
            partyOnly: zonePartyVotes,
            candidateVotes: candidateVotesMap,
            totalPartyVotes: zonePartyVotes
          };
        }
      } else {
        candidateVotesMap['1'] = zonePartyVotes;
        partiesVoteRecord[p.id] = {
          partyOnly: zonePartyVotes,
          candidateVotes: candidateVotesMap,
          totalPartyVotes: zonePartyVotes
        };
      }

      zValidos += zonePartyVotes;
    });

    const zBlanco = Math.round(metaTotals.votosBlanco * popWeight);
    const zNulos = Math.round(metaTotals.votosNulos * popWeight);
    const zNoMarc = Math.round(metaTotals.votosNoMarcados * popWeight);
    const zTotal = zValidos + zBlanco + zNulos + zNoMarc;

    zoneVotes[z] = {
      zone: z,
      parties: partiesVoteRecord,
      votosBlanco: zBlanco,
      votosNulos: zNulos,
      votosNoMarcados: zNoMarc,
      votosValidos: zValidos + zBlanco,
      totalVotos: zTotal
    };
  });

  // Build Comuna Aggregations
  const comunaAggregations: Record<number, ComunaVotesAggregation> = {};

  COMUNAS_INFO.forEach(comuna => {
    let cValidos = 0;
    let cBlanco = 0;
    let cNulos = 0;
    let cNoMarc = 0;
    let cTotal = 0;

    const partyTotals: Record<string, { partyOnly: number; candidateVotes: Record<string, number>; totalPartyVotes: number }> = {};
    rawParties.forEach(p => {
      partyTotals[p.id] = { partyOnly: 0, candidateVotes: {}, totalPartyVotes: 0 };
    });

    comuna.zones.forEach(z => {
      const zv = zoneVotes[z];
      if (zv) {
        cBlanco += zv.votosBlanco;
        cNulos += zv.votosNulos;
        cNoMarc += zv.votosNoMarcados;
        cTotal += zv.totalVotos;

        rawParties.forEach(p => {
          const pz = zv.parties[p.id];
          if (pz) {
            partyTotals[p.id].partyOnly += pz.partyOnly;
            partyTotals[p.id].totalPartyVotes += pz.totalPartyVotes;
            cValidos += pz.totalPartyVotes;

            Object.entries(pz.candidateVotes).forEach(([cNum, votes]) => {
              partyTotals[p.id].candidateVotes[cNum] = (partyTotals[p.id].candidateVotes[cNum] || 0) + votes;
            });
          }
        });
      }
    });

    const totalValidosConBlanco = cValidos + cBlanco;

    const partiesSummaries: Record<string, ComunaPartySummary> = {};
    const sortedParties: ComunaPartySummary[] = [];

    rawParties.forEach(p => {
      const pt = partyTotals[p.id];
      const pVotes = pt ? pt.totalPartyVotes : 0;
      const pct = totalValidosConBlanco > 0 ? (pVotes / totalValidosConBlanco) * 100 : 0;
      const munPct = rawSumPartyVotes > 0 ? (p.baseVotes / rawSumPartyVotes) * 100 : 0;

      const summary: ComunaPartySummary = {
        partyId: p.id,
        partyName: p.name,
        shortName: p.shortName,
        color: p.color,
        partyOnly: pt ? pt.partyOnly : 0,
        candidateVotes: pt ? pt.candidateVotes : {},
        totalPartyVotes: pVotes,
        percentageValidos: pct,
        municipalPercentage: munPct
      };

      partiesSummaries[p.id] = summary;
      sortedParties.push(summary);
    });

    sortedParties.sort((a, b) => b.totalPartyVotes - a.totalPartyVotes);

    const winner = sortedParties[0] || { partyId: '', partyName: 'N/A', shortName: 'N/A', totalPartyVotes: 0, percentageValidos: 0 };
    const runnerUp = sortedParties[1] || { partyId: '', partyName: 'N/A', shortName: 'N/A', totalPartyVotes: 0, percentageValidos: 0 };

    comunaAggregations[comuna.id] = {
      comunaId: comuna.id,
      comunaName: comuna.comunaName,
      officialName: comuna.officialName,
      zones: comuna.zones,
      parties: partiesSummaries,
      sortedParties,
      votosBlanco: cBlanco,
      votosNulos: cNulos,
      votosNoMarcados: cNoMarc,
      votosValidos: totalValidosConBlanco,
      totalVotos: cTotal,
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

  // Build Municipal Summary
  const municipalParties: Record<string, any> = {};
  const municipalSorted: any[] = [];
  let munTotalValidos = 0;

  rawParties.forEach(p => {
    const totalVotesInCity = Object.values(comunaAggregations).reduce((sum, c) => sum + (c.parties[p.id]?.totalPartyVotes || 0), 0);
    const partyOnlyInCity = Object.values(comunaAggregations).reduce((sum, c) => sum + (c.parties[p.id]?.partyOnly || 0), 0);
    const candidateVotesMap: Record<string, number> = {};

    Object.values(comunaAggregations).forEach(c => {
      const cp = c.parties[p.id];
      if (cp && cp.candidateVotes) {
        Object.entries(cp.candidateVotes).forEach(([cNum, votes]) => {
          candidateVotesMap[cNum] = (candidateVotesMap[cNum] || 0) + votes;
        });
      }
    });

    munTotalValidos += totalVotesInCity;

    const entry = {
      partyId: p.id,
      partyName: p.name,
      shortName: p.shortName,
      color: p.color,
      partyOnly: partyOnlyInCity,
      candidateVotes: candidateVotesMap,
      totalPartyVotes: totalVotesInCity,
      percentageValidos: 0
    };

    municipalParties[p.id] = entry;
    municipalSorted.push(entry);
  });

  const cityBlanco = Object.values(comunaAggregations).reduce((sum, c) => sum + c.votosBlanco, 0);
  const cityNulos = Object.values(comunaAggregations).reduce((sum, c) => sum + c.votosNulos, 0);
  const cityNoMarc = Object.values(comunaAggregations).reduce((sum, c) => sum + c.votosNoMarcados, 0);
  const totalValidosCityConBlanco = munTotalValidos + cityBlanco;

  municipalSorted.forEach(p => {
    p.percentageValidos = totalValidosCityConBlanco > 0 ? (p.totalPartyVotes / totalValidosCityConBlanco) * 100 : 0;
    municipalParties[p.partyId].percentageValidos = p.percentageValidos;
  });

  municipalSorted.sort((a, b) => b.totalPartyVotes - a.totalPartyVotes);

  const municipalSummary: MunicipalSummary = {
    totalMesas: 5499,
    mesasEscrutadas: 5499,
    porcentajeEscrutado: 100,
    parties: municipalParties,
    sortedParties: municipalSorted,
    totalPorPartidos: munTotalValidos,
    votosBlanco: cityBlanco,
    votosNulos: cityNulos,
    votosNoMarcados: cityNoMarc,
    votosValidos: totalValidosCityConBlanco,
    totalVotos: totalValidosCityConBlanco + cityNulos + cityNoMarc
  };

  // Convert rawParties to Party[]
  const partyList: Party[] = rawParties.map(p => ({
    id: p.id,
    code: p.id,
    name: p.name,
    partyName: p.name,
    shortName: p.shortName,
    preferential: p.preferential,
    isPreferential: p.preferential,
    color: p.color,
    logoText: p.logoText,
    formula: p.formula
  }));

  // Build candidate records
  const candidatesRecord: Record<string, Candidate[]> = {};
  rawParties.forEach(p => {
    if (p.sampleCandidates) {
      candidatesRecord[p.id] = p.sampleCandidates.map(c => ({
        id: c.number,
        number: c.number,
        name: c.name,
        partyId: p.id,
        partyName: p.name,
        color: p.color,
        bio: `${p.shortName} (${year})`
      }));
    }
  });

  return {
    parties: partyList,
    candidates: candidatesRecord,
    comunaAggregations,
    zoneVotes,
    municipalSummary
  };
}

// Pre-compute datasets for (Alcaldia, Concejo, Asamblea, Gobernacion) x (2023, 2019, 2015)
export const TERRITORIAL_DATASETS: Record<
  'alcaldia' | 'gobernacion' | 'concejo' | 'asamblea',
  Record<TerritorialYear, ReturnType<typeof buildTerritorialDataset>>
> = {
  alcaldia: {
    2023: buildTerritorialDataset('alcaldia', 2023),
    2019: buildOfficialAlcaldia2019Dataset() as any,
    2015: buildTerritorialDataset('alcaldia', 2015)
  },
  gobernacion: {
    2023: buildTerritorialDataset('gobernacion', 2023),
    2019: buildTerritorialDataset('gobernacion', 2019),
    2015: buildTerritorialDataset('gobernacion', 2015)
  },
  concejo: {
    2023: buildTerritorialDataset('concejo', 2023),
    2019: buildOfficialConcejo2019Dataset() as any,
    2015: buildTerritorialDataset('concejo', 2015)
  },
  asamblea: {
    2023: buildTerritorialDataset('asamblea', 2023),
    2019: buildTerritorialDataset('asamblea', 2019),
    2015: buildTerritorialDataset('asamblea', 2015)
  }
};

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

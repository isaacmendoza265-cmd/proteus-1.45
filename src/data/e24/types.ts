export type ElectionType = 
  | 'camara' 
  | 'senado' 
  | 'presidencia' 
  | 'alcaldia' 
  | 'concejo' 
  | 'asamblea' 
  | 'gobernacion';

export type ElectionCategory = 'nacional' | 'territorial';

export const NATIONAL_ELECTIONS: ElectionType[] = ['camara', 'senado', 'presidencia'];
export const TERRITORIAL_ELECTIONS: ElectionType[] = ['alcaldia', 'concejo', 'asamblea', 'gobernacion'];

export const ELECTION_ALLOWED_YEARS: Record<ElectionType, number[]> = {
  camara: [2026, 2022],
  senado: [2026, 2022],
  presidencia: [2026],
  alcaldia: [2023, 2019, 2015],
  concejo: [2023, 2019, 2015],
  asamblea: [2023, 2019, 2015],
  gobernacion: [2023, 2019, 2015]
};

export type PresidentialStage = 'consulta' | 'primera_vuelta' | 'segunda_vuelta';

export interface PresidentialStageInfo {
  id: PresidentialStage;
  name: string;
  shortName: string;
  description: string;
  hasDataYears: number[];
  icon?: string;
}

export interface Candidate {
  id: string; // e.g. "101", "102"
  number: string;
  name: string;
  partyId: string;
  partyName: string;
  color: string;
  role?: string;
  bio?: string;
}

export interface PresidentialCandidate {
  id: string;
  name: string;
  formula: string;
  party: string;
  coalition?: string;
  color: string;
  logoText: string;
}

export interface Party {
  id: string;
  code: string;
  name: string;
  partyName?: string;
  shortName: string;
  preferential: boolean; // true if voto preferente, false if lista cerrada
  isPreferential?: boolean;
  color: string;
  logoText: string;
  formula?: string; // Optional for presidential
}

export type ZoneId = 
  | '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10'
  | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20'
  | '21' | '22' | '23' | '24' | '25' | '26' | '27' | '28' | '29' | '30'
  | '31' | '32' | '90' | '98' | '99';

export interface ComunaInfo {
  id: number;
  comunaName: string;
  officialName: string;
  zones: [ZoneId, ZoneId] | [ZoneId];
  type: 'comuna' | 'rural' | 'carcelario' | 'censo';
  description?: string;
  coordinates?: { x: number; y: number }; // For visual diagram layout
}

export interface ZonePartyVote {
  partyOnly: number;
  candidateVotes: Record<string, number>;
  totalPartyVotes: number;
}

export interface ZoneVotes {
  zone: ZoneId;
  parties: Record<string, ZonePartyVote>;
  votosBlanco: number;
  votosNulos: number;
  votosNoMarcados: number;
  votosValidos: number;
  totalVotos: number;
}

export interface ComunaPartySummary {
  partyId: string;
  partyName: string;
  shortName: string;
  color: string;
  partyOnly: number;
  candidateVotes: Record<string, number>;
  totalPartyVotes: number;
  percentageValidos: number;
  municipalPercentage: number;
}

export interface ComunaVotesAggregation {
  comunaId: number;
  comunaName: string;
  officialName: string;
  zones: ZoneId[];
  parties: Record<string, ComunaPartySummary>;
  sortedParties: ComunaPartySummary[];
  votosBlanco: number;
  votosNulos: number;
  votosNoMarcados: number;
  votosValidos: number;
  totalVotos: number;
  winnerPartyId: string;
  winnerPartyName: string;
  winnerPartyVotes: number;
  winnerPartyPercentage: number;
  runnerUpPartyId: string;
  runnerUpPartyName: string;
  runnerUpPartyVotes: number;
  runnerUpPartyPercentage: number;
}

export interface MunicipalSummary {
  totalMesas: number;
  mesasEscrutadas: number;
  porcentajeEscrutado: number;
  parties: Record<string, {
    partyId: string;
    partyName: string;
    shortName: string;
    color: string;
    partyOnly: number;
    candidateVotes: Record<string, number>;
    totalPartyVotes: number;
    percentageValidos: number;
  }>;
  sortedParties: {
    partyId: string;
    partyName: string;
    shortName: string;
    color: string;
    partyOnly: number;
    candidateVotes: Record<string, number>;
    totalPartyVotes: number;
    percentageValidos: number;
  }[];
  totalPorPartidos: number;
  votosBlanco: number;
  votosNulos: number;
  votosNoMarcados: number;
  votosValidos: number;
  totalVotos: number;
}

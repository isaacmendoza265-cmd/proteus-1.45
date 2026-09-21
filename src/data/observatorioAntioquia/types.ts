export interface CandidateVotes {
  name: string;
  party: string;
  votes: number;
  isElected?: boolean;
  percentageValid?: number;
  percentageTotal?: number;
  notes?: string;
  cedula?: string;
}

export interface CouncilMember {
  name: string;
  party: string;
  cedula?: string;
  votes: number;
  isOppositionSeat?: boolean;
  notes?: string;
}

export interface PartyCouncilVotes {
  party: string;
  votes: number;
  seats: number;
  percentageValid?: number;
  color?: string;
  councilors: CouncilMember[];
}

export interface MayorResult {
  electedMayor: string;
  electedParty: string;
  votes: number;
  percentageOfValidVotes: number;
  percentageOfTotalVotes: number;
  runnerUp?: {
    name: string;
    party: string;
    votes: number;
    percentageOfValidVotes: number;
    acceptedOppositionSeat: boolean;
  };
  totalCandidatesVotes: number;
  blankVotes: number;
  nullVotes: number;
  unmarkedVotes: number;
  totalValidVotes: number;
  totalVotes: number;
  allCandidates: CandidateVotes[];
}

export interface GovernorResult {
  totalVotes: number;
  totalValidVotes: number;
  blankVotes: number;
  topCandidates: CandidateVotes[];
}

export interface AssemblyResult {
  totalVotes: number;
  totalValidVotes: number;
  blankVotes: number;
  topParties: { party: string; votes: number }[];
  topCandidates?: CandidateVotes[];
}

export interface MunicipalityData {
  id: string;
  name: string;
  subregion: string;
  department: string;
  badgeColor: string;
  summary: string;
  stats: {
    totalVotersEscrutados: number;
    totalValidCouncilVotes: number;
    totalCouncilSeats: number;
  };
  mayor: MayorResult;
  council: {
    totalVotes: number;
    validVotes: number;
    partyVotes: number;
    blankVotes: number;
    nullVotes: number;
    unmarkedVotes: number;
    parties: PartyCouncilVotes[];
    allElectedCouncilors: CouncilMember[];
  };
  governor: GovernorResult;
  assembly: AssemblyResult;
}

export type PoliticalRole =
  | 'gobernador'
  | 'alcalde'
  | 'exalcalde'
  | 'concejal'
  | 'concejal_reemplazo'
  | 'senador'
  | 'exsenador'
  | 'representante'
  | 'lider_historico'
  | 'diputado'
  | 'excandidato';

export interface PowerActor {
  id: string;
  name: string;
  role: PoliticalRole;
  roleLabel: string;
  municipality?: string;
  status?: string;
  votes?: number;
  cedula?: string;
  notes?: string;
  subGroup?: string;
}

export interface PowerHouseNode {
  id: string;
  number?: number;
  name: string;
  description?: string;
  color?: string;
  leader?: string;
  actors: PowerActor[];
}

export interface PartyPowerNetwork {
  id: string;
  name: string;
  shortName: string;
  color: string;
  logoInitial: string;
  rank: number;
  totalCouncilVotes: number;
  totalCouncilSeats: number;
  municipalitiesWithSeats: number;
  mayorsWonCount: number;
  powerHouses?: PowerHouseNode[];
  presenceByMunicipality: {
    municipalityId: string;
    municipalityName: string;
    councilVotes: number;
    councilSeats: number;
    councilors: CouncilMember[];
    isMayorParty?: boolean;
    mayorName?: string;
  }[];
}

export interface SocialSearchResult {
  name: string;
  role?: string;
  municipality?: string;
  party?: string;
  facebookUrl: string | null;
  facebookHandle: string | null;
  facebookSearchUrl?: string;
  directFacebookSearchUrl?: string;
  instagramUrl: string | null;
  instagramHandle: string | null;
  instagramSearchUrl?: string;
  directInstagramSearchUrl?: string;
  twitterUrl?: string | null;
  twitterHandle?: string | null;
  googleSearchUrl?: string;
  summary?: string;
  confidence?: string;
  source?: string;
  sources?: string[];
}

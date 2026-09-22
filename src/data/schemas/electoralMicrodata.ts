/**
 * PROTOCOLO PA-002: ESQUEMA UNIFICADO DE MICRODATOS ELECTORALES Y AUDITORÍA FORENSE
 * Proyecto Proteus - Unidad de Automejora
 */

export type AnomalySeverity = 'BAJO' | 'MEDIO' | 'ALTO' | 'CRITICO';

export type TableDiscrepancyType = 
  | 'EXACTO' 
  | 'DISCREPANCIA_LEVE' 
  | 'VOTOS_FALTANTES' 
  | 'SOBREVOTACION' 
  | 'ALTERACION_DIGITOS' 
  | 'CENSO_SUPERADO';

export interface PollingTableRecord {
  tableNumber: number;
  census: number;
  votersInE11: number;
  votesE14Transmision: number;
  votesE14Claveros: number;
  votesE24Comision: number;
  discrepancy: number; // votesE24Comision - votesE14Claveros
  discrepancyType: TableDiscrepancyType;
  nullVotes: number;
  blankVotes: number;
  candidateVotes: { [partyOrCandidate: string]: number };
  hasReclamation: boolean;
  reclamationLegalBasis?: string;
  anomalyTags: string[];
}

export interface PollingStationRecord {
  id: string;
  municipality: string;
  daneCode: string;
  zone: string;
  stationName: string;
  address: string;
  tablesCount: number;
  electoralCensus: number;
  totalVotesCast: number;
  turnoutPercentage: number;
  coordinates: [number, number]; // [lat, lng]
  riskLevel: AnomalySeverity;
  tables: PollingTableRecord[];
  benfordChiSquare: number;
  benfordPValue: number;
  isBenfordAnomalous: boolean;
  historicalDominantParty: string;
}

export interface BenfordDigitDistribution {
  digit: number;
  observedCount: number;
  observedPercentage: number;
  theoreticalPercentage: number;
  difference: number;
}

export interface BenfordTestResult {
  digitPosition: 1 | 2;
  totalNumbersAnalyzed: number;
  chiSquare: number;
  degreesOfFreedom: number;
  pValue: number;
  criticalValue95: number;
  isAnomalous: boolean;
  interpretation: string;
  distribution: BenfordDigitDistribution[];
}

export interface ElectoralReclamationDraft {
  id: string;
  timestamp: string;
  candidateName: string;
  municipality: string;
  stationName: string;
  tableNumber: number;
  commissionName: string;
  causalCodigoElectoral: string; // ej. "Artículo 192, Causal 7"
  descripcionHechos: string[];
  cuantificacionPerdida: number;
  pretensiones: string;
  fundamentoJuridico: string;
  pruebasAportadas: string[];
}

export type CommuneType = 'comuna' | 'corregimiento' | 'total' | 'Urbana' | 'Rural';

export type ZoneName =
  | 'Zona Nororiental'
  | 'Zona Noroccidental'
  | 'Zona Centro Oriental'
  | 'Zona Centro Occidental'
  | 'Zona Suroriental'
  | 'Zona Suroccidental'
  | 'Corregimientos'
  | 'Total Ciudad';

export interface Commune {
  id: number;
  code: string;
  name: string;
  type: CommuneType;
  zone: ZoneName | string;
  description: string;
  estratoPredominante: string;
  barriosCount: number;
  areaKm2: number;
}

export type CommuneInfo = Commune;

export interface YearPopulation {
  hombres: number;
  mujeres: number;
  total: number;
}

export interface PopulationRecord {
  year: number;
  men: number;
  women: number;
  total: number;
  hombres: number;
  mujeres: number;
}

export interface AgeGroupDistribution {
  range: string; // e.g. '0 a 4 años', etc.
  hombres: number;
  mujeres: number;
  total: number;
  men?: number;
  women?: number;
}

export interface YearHousing {
  urbano: number;
  rural: number;
  total: number;
}

export interface HousingRecord {
  year: number;
  urban: number;
  rural: number;
  totalDwellings: number;
  urbano: number;
  total: number;
}

export interface IPMRecord {
  year: number;
  ipmGlobal: number;
  bajoLogroEducativo: number;
  analfabetismo: number;
  inasistenciaEscolar: number;
  rezagoEscolar: number;
  barrerasPrimeraInfancia: number;
  trabajoInfantil: number;
  desempleoLargaDuracion: number;
  empleoInformal: number;
  sinAseguramientoSalud: number;
  barrerasSalud: number;
  accesoAgua: number;
  accesoAlcantarillado: number;
  pisosInadecuados: number;
  paredesInadecuadas: number;
  hacinamiento: number;
}

export interface CriminalityRecord {
  communeId: number;
  communeName: string;
  extorsionHogaresPct: number; // Encuesta CIEF 2019 / PDF Tabla 2
  extorsionNegociosPct: number; // Encuesta CIEF 2019 / PDF Tabla 2
  extorsionAlcaldiaPct: number; // Encuesta victimización Alcaldía 2019 (Tabla 2)
  extorsionDenunciasPct: number; // Denuncias registradas SISC 2018 (Tabla 2)
  extorsionLevel: 'Muy Alto' | 'Alto' | 'Moderado' | 'Bajo' | 'Mínimo';
  
  indiceGobiernoCombo: number; // 0.0 a 1.0 (PDF CIEF)
  indiceGobiernoEstado: number; // 0.0 a 1.0 (PDF CIEF)
  indiceGobiernoRelativo: number; // Estado - Combo (-1.0 a +1.0)
  
  combosCountEst: number;
  bandasDominantes: string[];
  funcionesGobiernoEjercidas: string[];
  
  governanceLevel: 'Dominante' | 'Alto' | 'Moderado' | 'Focalizado/Bajo' | 'Mínimo/Residual';
  
  summaryPDF: string;
  summaryPeerReviewed: string;
  summaryPressAndOfficial: string;
  
  sourcesHierarchy: {
    pdf: string;
    peerReviewed: string;
    press: string;
    official: string;
  };
}

export interface ResearchSource {
  title: string;
  url: string;
}

export interface ResearchResponse {
  communeName: string;
  communeNumber?: number;
  content: string;
  sources: ResearchSource[];
  searchQueries: string[];
  isQuotaFallback?: boolean;
  generatedAt: string;
}

export type ResearchResult = ResearchResponse;

export interface IPMDimensionMeta {
  key: string;
  name: string;
  shortName: string;
  category: 'Educación' | 'Salud' | 'Trabajo' | 'Vivienda y Servicios' | 'Niñez y Juventud';
  description: string;
  unit: string;
}

export interface DemographicCohort {
  ageGroup: string; // e.g. '0-4', '5-9', ..., '80+'
  label: string;    // '0 a 4 años'
  order: number;
  hombres: number;
  mujeres: number;
  total: number;
  hombresPct: number;
  mujeresPct: number;
  totalPct: number;
}

export interface DemographicIndicators {
  medianAge: number;
  agingIndex: number;
  dependencyRatio: number;
  sexRatio: number; // hombres por 100 mujeres
  youthShare: number; // % 0-14
  workingAgeShare: number; // % 15-64
  elderlyShare: number; // % 65+
}

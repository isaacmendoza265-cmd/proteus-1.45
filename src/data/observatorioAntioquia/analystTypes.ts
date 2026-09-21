export interface SexDistribution {
  hombres: string;
  mujeres: string;
}

export interface AgeGroupsDistribution {
  rango0_14: string;
  rango15_29: string;
  rango30_59: string;
  rango60_mas: string;
}

export interface StrataDistribution {
  estrato1: string;
  estrato2: string;
  estrato3: string;
  estrato4: string;
  estrato5: string;
  estrato6: string;
}

export interface EducationDistribution {
  primaria: string;
  secundariaMedia: string;
  tecnicoTecnologico: string;
  universitarioPosgrado: string;
}

export interface HousingFormality {
  formal: string;
  informal: string;
}

export interface HealthRegimeDistribution {
  contributivo: string;
  subsidiado: string;
  noAsegurado?: string;
}

export interface PublicServicesCoverage {
  acueducto: string;
  alcantarillado: string;
  energiaElectrica: string;
  gasNatural: string;
  internetBandaAncha: string;
}

export interface CriminalityData {
  nivelGobernanzaCriminal: string;
  estructurasCombosPresentes: string;
  modalidadesPrincipales: string;
  indiceExtorsionEstimada: string;
  controlTerritorialRegulacion: string;
  fuenteInforme: string;
}

export interface PartyVotesBreakdown {
  partido: string;
  votos: number | string;
  porcentaje?: string;
  curules?: number;
}

export interface CandidateVotesBreakdown {
  candidato: string;
  partido: string;
  votos: number | string;
  porcentaje?: string;
  esElecto?: boolean;
}

export interface ElectionDataSection {
  votosTotales: number | string;
  distribucionPartidos: PartyVotesBreakdown[];
  distribucionCandidatos: CandidateVotesBreakdown[];
}

export interface PresidentialElectionData {
  votosTotales: number | string;
  distribucionCandidatos: CandidateVotesBreakdown[];
}

export interface ElectoralVariables {
  nacionales2026: {
    senado: ElectionDataSection;
    camara: ElectionDataSection;
    presidencia: PresidentialElectionData;
  };
  locales2023: {
    concejo: ElectionDataSection;
    asamblea: ElectionDataSection;
    alcaldia: {
      votosTotales: number | string;
      distribucionCandidatos: CandidateVotesBreakdown[];
    };
  };
}

export interface ComunaAnalysisData {
  id: string;
  numero: number;
  nombre: string;
  poblacionEstimada: string;
  barriosPrincipales: string[];
  
  // 1.1 Variables Demográficas
  demografia: {
    distribucionSexo: SexDistribution;
    distribucionGruposEtarios: AgeGroupsDistribution;
    areasMaximaConcentracion: string;
    fuenteNota?: string;
  };

  // 1.2 Variables Económicas
  economia: {
    distribucionEstratos: StrataDistribution;
    estadioIngresos: string;
    distribucionNivelEducativo: EducationDistribution;
    gradoFormalidadVivienda: HousingFormality;
    distribucionActividadPrincipal: string;
    fuenteNota?: string;
  };

  // 1.3 Variables Sociales
  social: {
    distribucionRegimenSalud: HealthRegimeDistribution;
    gradoCoberturaServicios: PublicServicesCoverage;
    analfabetismoPorcentaje: string;
    empleoInformalPorcentaje: string;
    desempleoLargaDuracionPorcentaje: string;
    hacinamientoPorcentaje: string;
    inasistenciaEscolarPorcentaje: string;
    fuenteNota?: string;
  };

  // 1.4 Criminalidad (Informe Gobernanza Criminal EAFIT)
  criminalidad: CriminalityData;

  // 1.5 Variables Electorales
  electoral: ElectoralVariables;
}

export interface MunicipalityGeneralAnalysis {
  // 2.1 Censo Poblacional
  censoPoblacional: {
    poblacionTotal: string;
    censoElectoral: string;
    distribucionSexo: SexDistribution;
    distribucionEdades: AgeGroupsDistribution;
    fuenteNota?: string;
  };

  // 2.2 Economía General
  economia: {
    actividadesEconomicasPrincipales: string;
    desempleo: string;
    distribucionIngresos: string;
    fuenteNota?: string;
  };

  // 2.3 Historial Electoral General
  electoral: ElectoralVariables;
}

export interface MunicipalityAnalystItem {
  id: string;
  name: string;
  subregion: string;
  badgeColor: string;
  poblacionEstimada: number;
  censoElectoral: number;
  tieneComunas: boolean;
  cantidadComunas: number;
  detalleComunasOBarrios: string;
  comunas: ComunaAnalysisData[];
  panelGeneral: MunicipalityGeneralAnalysis;
}

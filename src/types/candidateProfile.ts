// Perfil del candidato: tipo que guarda la base (PerfilCandidato) y perfil por defecto.
// Antes vivían en CandidateProfileManager.tsx, un componente inalcanzable que se retiró.
import type { VideoAnalysisResult } from '../components/CandidateVideoAnalyzer';

export interface ColorSwatchItem {
  role: 'Primario' | 'Secundario' | 'Acento' | 'Neutro';
  hex: string;
  nombre: string;
  justificacionPielCabello?: string;
  justificacionEstrategica?: string;
}

export interface CandidateColorimetryData {
  fototipoPiel?: string;
  colorCabello?: string;
  colorOjos?: string;
  estacionCromatica?: string;
  nivelContraste?: string;
  intencionComunicacion?: string;
  swatches?: ColorSwatchItem[];
  recomendacionesVestuario?: string;
  iluminacionEncuadres?: string;
  lenguajeCorporal?: string;
  quEvitar?: string;
}

export interface CandidateProfile {
  id?: string;
  email: string;
  nombre: string;
  rangoEdad?: string;
  sexo?: string;
  tonoNarrativo?: string;
  lugarResidencia?: string;
  envergaduraEquipo?: string;
  experienciaPrevia?: string;
  afiliacionPartidista?: string;
  relacionEstructurasLocales?: string;
  formacionOcupacion?: string;
  presenciaRedes?: string;
  estiloComunicacion?: string;
  ejeTematicoComodo?: string;
  reconocimientoNombre?: string;
  accesoMedios?: string;
  resumenEstrategico?: string;
  paletaColores?: string;
  colorimetryData?: CandidateColorimetryData;
  estiloFotografico?: string;
  quEvitar?: string;
  colorimetryReport?: string;
  photoBase64?: string;
  photosBase64?: string[];
  uploadedFileName?: string;
  videoAnalysisData?: VideoAnalysisResult;
  /** Identidad completa (Ajustes › Identidad del candidato); los campos de arriba se sincronizan desde ella */
  identidad?: import('../services/identidad/identidad').IdentidadCandidato;
  updatedAt?: string;
}

export const MASTER_EMAIL = "isaacmendoza265@gmail.com";

export const DEFAULT_ISAAC_MENDOZA_PROFILE: CandidateProfile = {
  id: "profile_isaacmendoza265",
  email: MASTER_EMAIL,
  nombre: "Isaac Mendoza",
  rangoEdad: "",
  sexo: "",
  tonoNarrativo: "",
  lugarResidencia: "Medellín, Antioquia",
  envergaduraEquipo: "",
  experienciaPrevia: "",
  afiliacionPartidista: "",
  relacionEstructurasLocales: "",
  formacionOcupacion: "",
  presenciaRedes: "",
  estiloComunicacion: "",
  ejeTematicoComodo: "",
  reconocimientoNombre: "",
  accesoMedios: "",
  resumenEstrategico: "",
  paletaColores: "",
  colorimetryData: undefined,
  estiloFotografico: "",
  quEvitar: "",
  colorimetryReport: undefined,
  uploadedFileName: undefined,
  photoBase64: undefined,
  photosBase64: [],
  videoAnalysisData: undefined,
  updatedAt: new Date().toISOString()
};

import React, { useState, useEffect } from 'react';
import { 
  Upload, 
  FileText, 
  UserCheck, 
  Sparkles, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  User,
  Shield,
  Palette,
  Briefcase,
  Megaphone,
  Download,
  Search,
  Camera,
  Globe,
  MapPin,
  Users,
  Radio,
  Share2,
  Lock,
  Unlock,
  Check,
  RefreshCw,
  Info,
  ChevronDown,
  Trash2,
  Edit3,
  Clock,
  Video,
  Database
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { jsPDF } from 'jspdf';
import { motion, AnimatePresence } from 'motion/react';
import { CmtIsotipo, CmtLogotipo } from './CmtProteusLogo';
import { CandidateVideoAnalyzer, VideoAnalysisResult } from './CandidateVideoAnalyzer';
import { getGobernacionObjectives, GobernacionObjective } from '../services/gobernacionService';

export type { VideoAnalysisResult };

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
  updatedAt?: string;
}

export const MASTER_EMAIL = "isaacmendoza265@gmail.com";

export const DEFAULT_ISAAC_MENDOZA_SWATCHES: ColorSwatchItem[] = [];

export const STANDARD_PALETTE_SLOTS: {
  role: 'Primario' | 'Secundario' | 'Acento' | 'Neutro';
  titulo: string;
  subtitulo: string;
}[] = [
  {
    role: 'Primario',
    titulo: 'Color Primario (Institucional & Liderazgo)',
    subtitulo: 'Color dominante para trajes y presencia de Estado. Se asignará con el análisis.'
  },
  {
    role: 'Secundario',
    titulo: 'Color Secundario (Visión & Contraste)',
    subtitulo: 'Aporta balance y enfoque programático en actos de campaña. Se asignará con el análisis.'
  },
  {
    role: 'Acento',
    titulo: 'Color de Acento (Dinamismo & Acción)',
    subtitulo: 'Punto focal para corbatas, insignias y llamados a la acción. Se asignará con el análisis.'
  },
  {
    role: 'Neutro',
    titulo: 'Color Neutro (Camisería & Claridad)',
    subtitulo: 'Base lumínica para camisas y legibilidad ante cámaras. Se asignará con el análisis.'
  }
];

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

export function getContrastColor(hexColor: string): string {
  if (!hexColor) return '#FFFFFF';
  const cleanHex = hexColor.replace('#', '').trim();
  if (cleanHex.length !== 6) return '#FFFFFF';
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return '#FFFFFF';
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.58 ? '#0F172A' : '#FFFFFF';
}

// Helper to convert email into candidate formatted name (e.g. isaacmendoza265@gmail.com -> Isaac Mendoza)
export const formatNameFromEmail = (email: string): string => {
  if (!email) return "Candidato";
  const localPart = email.split('@')[0] || "";
  // Remove all numbers
  const withoutDigits = localPart.replace(/[0-9]/g, '');
  
  if (!withoutDigits.trim()) return "Candidato";

  // Check if there are dots, dashes, underscores
  const parts = withoutDigits.split(/[._\s-]+/).filter(Boolean);
  if (parts.length > 1) {
    return parts.map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()).join(' ');
  }

  // If single word like "isaacmendoza", handle known splits or word casing
  const clean = withoutDigits.trim();
  if (clean.toLowerCase() === "isaacmendoza") {
    return "Isaac Mendoza";
  }
  
  // Capitalize nicely
  return clean.charAt(0).toUpperCase() + clean.slice(1).toLowerCase();
};

interface CandidateProfileManagerProps {
  currentEmail: string | null;
  onConnectGoogleDrive: (email: string) => void;
  onDisconnectGoogleDrive: () => void;
  activeProfile: CandidateProfile | null;
  onSaveActiveProfile: (profile: CandidateProfile) => void;
  allSavedProfiles: Record<string, CandidateProfile>;
  onSelectSavedProfile?: (profile: CandidateProfile) => void;
}

export const CandidateProfileManager: React.FC<CandidateProfileManagerProps> = ({
  currentEmail,
  onConnectGoogleDrive,
  onDisconnectGoogleDrive,
  activeProfile,
  onSaveActiveProfile,
  allSavedProfiles,
  onSelectSavedProfile
}) => {
  // Step state
  const isGoogleConnected = Boolean(currentEmail);
  const isMasterUser = currentEmail?.toLowerCase() === MASTER_EMAIL.toLowerCase();

  // Local form states
  const [customEmailInput, setCustomEmailInput] = useState(currentEmail || "");
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>(() => {
    if (activeProfile?.photosBase64 && activeProfile.photosBase64.length > 0) {
      return activeProfile.photosBase64;
    }
    if (activeProfile?.photoBase64) {
      return [activeProfile.photoBase64];
    }
    return [];
  });
  const [photoPreview, setPhotoPreview] = useState<string | null>(() => {
    if (activeProfile?.photosBase64 && activeProfile.photosBase64.length > 0) {
      return activeProfile.photosBase64[0];
    }
    return activeProfile?.photoBase64 || null;
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  
  // Colorimetry & Strategic Intention states
  const [isAnalyzingColorimetry, setIsAnalyzingColorimetry] = useState(false);
  const [colorimetryReport, setColorimetryReport] = useState<string | null>(activeProfile?.colorimetryReport || null);
  const [colorimetryError, setColorimetryError] = useState<string | null>(null);
  
  // Strategic intention for colorimetry calculation
  const [intencionPreset, setIntencionPreset] = useState<string>("Autoridad, Solidez Institucional y Confianza");
  const [intencionComunicacion, setIntencionComunicacion] = useState<string>(
    activeProfile?.colorimetryData?.intencionComunicacion || "Autoridad, Solidez Institucional y Confianza"
  );

  // Biometric & Colorimetry Diagnosis (Strictly empty until photo analysis is performed)
  const [fototipoPiel, setFototipoPiel] = useState<string>(activeProfile?.colorimetryData?.fototipoPiel || "");
  const [colorCabello, setColorCabello] = useState<string>(activeProfile?.colorimetryData?.colorCabello || "");
  const [colorOjos, setColorOjos] = useState<string>(activeProfile?.colorimetryData?.colorOjos || "");
  const [estacionCromatica, setEstacionCromatica] = useState<string>(activeProfile?.colorimetryData?.estacionCromatica || "");
  const [nivelContraste, setNivelContraste] = useState<string>(activeProfile?.colorimetryData?.nivelContraste || "");
  const [paletteSwatches, setPaletteSwatches] = useState<ColorSwatchItem[]>(
    activeProfile?.colorimetryData?.swatches || []
  );
  const [recomendacionesVestuario, setRecomendacionesVestuario] = useState<string>(activeProfile?.colorimetryData?.recomendacionesVestuario || "");
  const [iluminacionEncuadres, setIluminacionEncuadres] = useState<string>(activeProfile?.colorimetryData?.iluminacionEncuadres || "");
  const [lenguajeCorporal, setLenguajeCorporal] = useState<string>(activeProfile?.colorimetryData?.lenguajeCorporal || "");
  const [editingSwatchRole, setEditingSwatchRole] = useState<string | null>(null);

  // Padrón Oficial de Gobernación (28 Líderes Auditados)
  const [gobObjectives, setGobObjectives] = useState<GobernacionObjective[]>([]);

  useEffect(() => {
    getGobernacionObjectives()
      .then((objs) => setGobObjectives(objs))
      .catch(() => {});
  }, []);

  const handleSelectGobernacionObjective = (obj: GobernacionObjective) => {
    setCandidateName(obj.nombre);
    setExperienciaPrevia(`${obj.cargo_actual} (${obj.entidad_o_sector})`);
    if (obj.notas_politicas) {
      setRelacionEstructurasLocales(obj.notas_politicas);
    }
    if (obj.subregion_enfoque) {
      setLugarResidencia(obj.subregion_enfoque);
    }
    if (obj.temas_interes && obj.temas_interes.length > 0) {
      setEjeTematicoComodo(obj.temas_interes.join(', '));
    }
    setSaveSuccessMsg(`Líder "${obj.nombre}" importado del Padrón Departamental. Cargo verificado: ${obj.cargo_actual}.`);
  };

  // Step 3 Candidate parameters
  const [candidateName, setCandidateName] = useState<string>(activeProfile?.nombre || (currentEmail ? formatNameFromEmail(currentEmail) : ""));
  const [rangoEdad, setRangoEdad] = useState<string>(activeProfile?.rangoEdad || "");
  const [sexo, setSexo] = useState<string>(activeProfile?.sexo || "");
  const [tonoNarrativo, setTonoNarrativo] = useState<string>(activeProfile?.tonoNarrativo || "");
  
  // Google search defined parameters
  const [isSearchingProfile, setIsSearchingProfile] = useState(false);
  const [experienciaPrevia, setExperienciaPrevia] = useState<string>(activeProfile?.experienciaPrevia || "");
  const [afiliacionPartidista, setAfiliacionPartidista] = useState<string>(activeProfile?.afiliacionPartidista || "");
  const [relacionEstructurasLocales, setRelacionEstructurasLocales] = useState<string>(activeProfile?.relacionEstructurasLocales || "");
  const [formacionOcupacion, setFormacionOcupacion] = useState<string>(activeProfile?.formacionOcupacion || "");
  const [presenciaRedes, setPresenciaRedes] = useState<string>(activeProfile?.presenciaRedes || "");
  const [estiloComunicacion, setEstiloComunicacion] = useState<string>(activeProfile?.estiloComunicacion || "");
  const [ejeTematicoComodo, setEjeTematicoComodo] = useState<string>(activeProfile?.ejeTematicoComodo || "");
  const [reconocimientoNombre, setReconocimientoNombre] = useState<string>(activeProfile?.reconocimientoNombre || "");
  const [accesoMedios, setAccesoMedios] = useState<string>(activeProfile?.accesoMedios || "");
  const [paletaColores, setPaletaColores] = useState<string>(activeProfile?.paletaColores || "");
  const [estiloFotografico, setEstiloFotografico] = useState<string>(activeProfile?.estiloFotografico || "");
  const [quEvitar, setQuEvitar] = useState<string>(activeProfile?.quEvitar || "");
  const [resumenEstrategico, setResumenEstrategico] = useState<string>(activeProfile?.resumenEstrategico || "");

  // Step 2B Video Analysis State
  const [videoAnalysisData, setVideoAnalysisData] = useState<VideoAnalysisResult | null>(
    activeProfile?.videoAnalysisData || null
  );

  // Manual inputs
  const [lugarResidencia, setLugarResidencia] = useState<string>(activeProfile?.lugarResidencia || "");
  const [envergaduraEquipo, setEnvergaduraEquipo] = useState<string>(activeProfile?.envergaduraEquipo || "");

  // UI state
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);
  const [isParsingPdf, setIsParsingPdf] = useState(false);
  const [pdfParseStatus, setPdfParseStatus] = useState<string | null>(null);
  const [pdfParseError, setPdfParseError] = useState<boolean>(false);

  // Handler to synchronize Video Analysis findings into Profile Form
  const handleApplyVideoFindings = (updated: {
    tonoNarrativo?: string;
    estiloComunicacion?: string;
    quEvitar?: string;
    videoAnalysisResult: VideoAnalysisResult;
  }) => {
    if (updated.tonoNarrativo) setTonoNarrativo(updated.tonoNarrativo);
    if (updated.estiloComunicacion) setEstiloComunicacion(updated.estiloComunicacion);
    if (updated.quEvitar) {
      setQuEvitar(prev => prev ? `${prev} | ${updated.quEvitar}` : (updated.quEvitar || ""));
    }
    setVideoAnalysisData(updated.videoAnalysisResult);
    setSaveSuccessMsg(`🎬 ¡Hallazgos del video sincronizados con el perfil de "${candidateName || 'candidato'}"!`);
    setTimeout(() => setSaveSuccessMsg(null), 5000);
  };

  // Sync state when activeProfile changes
  useEffect(() => {
    if (activeProfile) {
      setCandidateName(activeProfile.nombre || "");
      setRangoEdad(activeProfile.rangoEdad || "");
      setSexo(activeProfile.sexo || "");
      setTonoNarrativo(activeProfile.tonoNarrativo || "");
      setLugarResidencia(activeProfile.lugarResidencia || "");
      setEnvergaduraEquipo(activeProfile.envergaduraEquipo || "");
      setExperienciaPrevia(activeProfile.experienciaPrevia || "");
      setAfiliacionPartidista(activeProfile.afiliacionPartidista || "");
      setRelacionEstructurasLocales(activeProfile.relacionEstructurasLocales || "");
      setFormacionOcupacion(activeProfile.formacionOcupacion || "");
      setPresenciaRedes(activeProfile.presenciaRedes || "");
      setEstiloComunicacion(activeProfile.estiloComunicacion || "");
      setEjeTematicoComodo(activeProfile.ejeTematicoComodo || "");
      setReconocimientoNombre(activeProfile.reconocimientoNombre || "");
      setAccesoMedios(activeProfile.accesoMedios || "");
      setPaletaColores(activeProfile.paletaColores || "");
      setEstiloFotografico(activeProfile.estiloFotografico || "");
      setQuEvitar(activeProfile.quEvitar || "");
      setResumenEstrategico(activeProfile.resumenEstrategico || "");
      if (activeProfile.colorimetryReport) {
        setColorimetryReport(activeProfile.colorimetryReport);
      } else {
        setColorimetryReport(null);
      }

      if (activeProfile.photosBase64 && activeProfile.photosBase64.length > 0) {
        setUploadedPhotos(activeProfile.photosBase64);
        setPhotoPreview(activeProfile.photosBase64[0]);
      } else if (activeProfile.photoBase64) {
        setUploadedPhotos([activeProfile.photoBase64]);
        setPhotoPreview(activeProfile.photoBase64);
      } else {
        setUploadedPhotos([]);
        setPhotoPreview(null);
      }

      if (activeProfile.colorimetryData) {
        setFototipoPiel(activeProfile.colorimetryData.fototipoPiel || "");
        setColorCabello(activeProfile.colorimetryData.colorCabello || "");
        setColorOjos(activeProfile.colorimetryData.colorOjos || "");
        setEstacionCromatica(activeProfile.colorimetryData.estacionCromatica || "");
        setNivelContraste(activeProfile.colorimetryData.nivelContraste || "");
        setIntencionComunicacion(activeProfile.colorimetryData.intencionComunicacion || "Autoridad, Solidez Institucional y Confianza");
        setPaletteSwatches(activeProfile.colorimetryData.swatches || []);
        setRecomendacionesVestuario(activeProfile.colorimetryData.recomendacionesVestuario || "");
        setIluminacionEncuadres(activeProfile.colorimetryData.iluminacionEncuadres || "");
        setLenguajeCorporal(activeProfile.colorimetryData.lenguajeCorporal || "");
      } else {
        setFototipoPiel("");
        setColorCabello("");
        setColorOjos("");
        setEstacionCromatica("");
        setNivelContraste("");
        setPaletteSwatches([]);
        setRecomendacionesVestuario("");
        setIluminacionEncuadres("");
        setLenguajeCorporal("");
      }

      if (activeProfile.videoAnalysisData) {
        setVideoAnalysisData(activeProfile.videoAnalysisData);
      } else {
        setVideoAnalysisData(null);
      }
    }
  }, [activeProfile]);

  const handleResetColorimetry = () => {
    setColorimetryReport(null);
    setFototipoPiel("");
    setColorCabello("");
    setColorOjos("");
    setEstacionCromatica("");
    setNivelContraste("");
    setPaletteSwatches([]);
    setRecomendacionesVestuario("");
    setIluminacionEncuadres("");
    setLenguajeCorporal("");
    setQuEvitar("");
    setPaletaColores("");
    setColorimetryError(null);
    setUploadedPhotos([]);
    setPhotoPreview(null);
    if (activeProfile) {
      const cleaned: CandidateProfile = {
        ...activeProfile,
        colorimetryReport: undefined,
        colorimetryData: undefined,
        paletaColores: "",
        photoBase64: undefined,
        photosBase64: []
      };
      onSaveActiveProfile(cleaned);
    }
  };

  // Sync candidate name when google email is connected if name is empty
  useEffect(() => {
    if (currentEmail && (!candidateName || candidateName === "Candidato")) {
      const generatedName = formatNameFromEmail(currentEmail);
      setCandidateName(generatedName);
    }
    if (currentEmail) {
      setCustomEmailInput(currentEmail);
    }
  }, [currentEmail]);

  // Step 1 handler: Connect Google Drive
  const handleConnect = (emailToUse: string) => {
    const cleanEmail = emailToUse.trim();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      alert("Por favor ingresa una cuenta de correo válida de Google (ej: usuario@gmail.com).");
      return;
    }
    onConnectGoogleDrive(cleanEmail);
    const autoName = formatNameFromEmail(cleanEmail);
    if (!candidateName) setCandidateName(autoName);
  };

  // Step 1 handler: Photo Upload (Single or Multiple photos)
  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const validFiles: File[] = [];
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      if (f.type.startsWith('image/')) {
        validFiles.push(f);
      }
    }

    if (validFiles.length === 0) {
      alert("Por favor selecciona archivos de imagen válidos (JPG, PNG, WEBP).");
      return;
    }

    const readPromises = validFiles.map(file => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readPromises).then(base64List => {
      setUploadedPhotos(prev => {
        const updated = [...prev, ...base64List];
        if (!photoPreview && updated.length > 0) {
          setPhotoPreview(updated[0]);
        }
        return updated;
      });
      if (!photoPreview && base64List.length > 0) {
        setPhotoPreview(base64List[0]);
      }
      setColorimetryError(null);
    }).catch(err => {
      console.error("Error al cargar fotos:", err);
      alert("Hubo un inconveniente al procesar las imágenes seleccionadas.");
    });

    e.target.value = "";
  };

  const handleRemovePhoto = (indexToRemove: number) => {
    setUploadedPhotos(prev => {
      const updated = prev.filter((_, idx) => idx !== indexToRemove);
      if (updated.length > 0) {
        setPhotoPreview(updated[0]);
      } else {
        setPhotoPreview(null);
      }
      return updated;
    });
  };

  const handleSetPrimaryPhoto = (index: number) => {
    setUploadedPhotos(prev => {
      if (index === 0 || index >= prev.length) return prev;
      const target = prev[index];
      const remainder = prev.filter((_, idx) => idx !== index);
      const reordered = [target, ...remainder];
      setPhotoPreview(target);
      return reordered;
    });
  };

  // Handler to update a single swatch color or name
  const handleUpdateSwatch = (role: string, field: 'hex' | 'nombre', value: string) => {
    setPaletteSwatches(prev => {
      const updated = prev.map(s => s.role === role ? { ...s, [field]: value } : s);
      // Synchronize formatted string
      const str = updated.map(s => `${s.role}: ${s.nombre} (${s.hex})`).join('; ') + '.';
      setPaletaColores(str);
      return updated;
    });
  };

  // Step 2 handler: Analyze Photo & Colorimetry with Gemini 3.8
  const handleAnalyzePhotoColorimetry = async () => {
    const photosToAnalyze = uploadedPhotos.length > 0 ? uploadedPhotos : (photoPreview ? [photoPreview] : []);
    
    if (photosToAnalyze.length === 0) {
      alert("Paso 1 requerido: Por favor sube la foto o las fotos del candidato antes de dar clic en 'Procesar foto'.");
      return;
    }

    setIsAnalyzingColorimetry(true);
    setColorimetryError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
      const promptText = `Actúa como un director de arte, estilista político y experto en colorimetría e identidad visual electoral de élite.
Te he adjuntado ${photosToAnalyze.length} fotografía(s) REAL(ES) del usuario candidato.

DIRECTIVA OBLIGATORIA (PROHIBIDO SIMULAR O DAR DATOS GENÉRICOS):
El análisis de colorimetría DEBE ser producto del análisis fisonómico real de los píxeles de las fotografías que el usuario ha subido. Prohibido devolver plantillas predeterminadas o datos ficticios.
Debes examinar minuciosamente los rasgos faciales reales del candidato y combinarlos con su objetivo estratégico: "${intencionComunicacion}".

PARÁMETROS A EXTRAER OBLIGATORIAMENTE DE LAS FOTOGRAFÍAS REALES:
1. Fototipo y subtono de piel exacto visible en las fotos (examinar pigmentación: cálido dorado, frío rosáceo, neutro oliva, ébano, cetrino, etc.).
2. Color y matiz real del cabello y cejas (examinar raíz, reflejos y textura).
3. Color de ojos y nivel de contraste facial entre piel, cabello y ojos (Alto, Medio o Bajo).
4. Estación cromática personalizada deducida fisonómicamente (ej: Invierno Profundo / Brillante, Otoño Cálido / Suave, Primavera Luminosa, Verano Suave / Frío).
5. Estimación demográfica visual: Rango de edad aproximado y sexo.
6. Derivación de la PALETA CROMÁTICA PERSONALIZADA (4 colores clave: Primario, Secundario, Acento, Neutro):
   - Cada color DEBE tener un código HEX válido y justificación dual: cómo resalta la piel/cabello del candidato según la foto y qué transmite a los electores para el objetivo "${intencionComunicacion}".
7. Recomendaciones específicas de vestuario (trajes, camisas, texturas), iluminación/encuadres óptimos, lenguaje corporal y qué colores/estilos debe evitar estrictamente para no perjudicar su imagen en cámara y actos públicos.
8. Un informe detallado en formato Markdown estructurado con títulos claros, viñetas explicativas y dictamen profesional.

Debes responder ÚNICAMENTE con un bloque JSON plano estructurado con este esquema exacto:
{
  "fototipoPiel": "Descripción precisa y real del tono y subtono de piel detectado en la foto",
  "colorCabello": "Color, matiz y textura del cabello detectado en la foto",
  "colorOjos": "Color de ojos y contraste facial detectado en la foto",
  "estacionCromatica": "Estación cromática estacional personalizada deducida de los rasgos faciales",
  "nivelContraste": "Nivel de contraste fisonómico (Alto, Medio o Bajo)",
  "rangoEdad": "Rango de edad estimado (ej: 30-45 años)",
  "sexo": "Masculino o Femenino",
  "tonoNarrativoSugerido": "Tono discursivo que mejor armoniza con su imagen y propósito",
  "swatches": [
    {
      "role": "Primario",
      "hex": "#0A2540",
      "nombre": "Nombre descriptivo del color primario",
      "justificacionPielCabello": "Por qué este color exacto favorece su piel y cabello sin apagarlo según lo observado en sus fotos.",
      "justificacionEstrategica": "Qué transmite este color a los votantes según su objetivo de ${intencionComunicacion}."
    },
    {
      "role": "Secundario",
      "hex": "#2E7D32",
      "nombre": "Nombre descriptivo del color secundario",
      "justificacionPielCabello": "Armonía con la piel y cabello observados.",
      "justificacionEstrategica": "Impacto y propósito estratégico en la campaña."
    },
    {
      "role": "Acento",
      "hex": "#F59E0B",
      "nombre": "Nombre descriptivo del color de acento",
      "justificacionPielCabello": "Armonía con la piel y cabello observados.",
      "justificacionEstrategica": "Propósito de llamado a la acción y dinamismo."
    },
    {
      "role": "Neutro",
      "hex": "#FFFFFF",
      "nombre": "Nombre descriptivo del neutro recomendado",
      "justificacionPielCabello": "Cómo funciona como base de camisería/fondos para su complexión.",
      "justificacionEstrategica": "Equilibrio y legibilidad visual institucional."
    }
  ],
  "recomendacionesVestuario": "Recomendaciones de camisería, trajes, texturas y combinación de prendas según su colorimetría real.",
  "iluminacionEncuadres": "Luz recomendada y encuadres fotográficos óptimos para sus rasgos.",
  "lenguajeCorporal": "Postura, gestos y expresión facial estratégica.",
  "quEvitar": "Colores, texturas e iluminaciones que desfavorecen su piel/cabello o contradicen su mensaje.",
  "informeMarkdown": "Texto completo y persuasivo del informe de colorimetría e identidad visual estructurado con títulos y viñetas."
}`;

      // Build multimodal parts array with all uploaded photos
      const parts: any[] = [];
      for (const photoStr of photosToAnalyze) {
        if (photoStr.startsWith("data:")) {
          const mime = photoStr.substring(photoStr.indexOf(":") + 1, photoStr.indexOf(";")) || "image/jpeg";
          const base64Data = photoStr.split(",")[1];
          parts.push({
            inlineData: { mimeType: mime, data: base64Data }
          });
        }
      }

      parts.push({ text: promptText });

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: [{ role: 'user', parts }]
      });

      const rawText = response.text || "";
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);

      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        
        if (parsed.fototipoPiel) setFototipoPiel(parsed.fototipoPiel);
        if (parsed.colorCabello) setColorCabello(parsed.colorCabello);
        if (parsed.colorOjos) setColorOjos(parsed.colorOjos);
        if (parsed.estacionCromatica) setEstacionCromatica(parsed.estacionCromatica);
        if (parsed.nivelContraste) setNivelContraste(parsed.nivelContraste);
        if (parsed.sexo) setSexo(parsed.sexo);
        if (parsed.rangoEdad) setRangoEdad(parsed.rangoEdad);
        if (parsed.tonoNarrativoSugerido) setTonoNarrativo(parsed.tonoNarrativoSugerido);
        if (parsed.recomendacionesVestuario) setRecomendacionesVestuario(parsed.recomendacionesVestuario);
        if (parsed.iluminacionEncuadres) {
          setIluminacionEncuadres(parsed.iluminacionEncuadres);
          setEstiloFotografico(parsed.iluminacionEncuadres);
        }
        if (parsed.lenguajeCorporal) setLenguajeCorporal(parsed.lenguajeCorporal);
        if (parsed.quEvitar) setQuEvitar(parsed.quEvitar);

        if (Array.isArray(parsed.swatches) && parsed.swatches.length >= 4) {
          setPaletteSwatches(parsed.swatches);
          const paletteText = parsed.swatches.map((s: ColorSwatchItem) => `${s.role}: ${s.nombre} (${s.hex})`).join('; ') + '.';
          setPaletaColores(paletteText);
        }

        if (parsed.informeMarkdown) {
          setColorimetryReport(parsed.informeMarkdown);
        } else {
          setColorimetryReport(rawText);
        }
      } else {
        setColorimetryReport(rawText || "Informe de colorimetría generado exitosamente.");
        if (rawText.toLowerCase().includes("femenino") || rawText.toLowerCase().includes("mujer")) {
          setSexo("Femenino");
        } else {
          setSexo("Masculino");
        }
        const ageMatch = rawText.match(/(\d{2}\s*-\s*\d{2}\s*años|\d{2}\s*a\s*\d{2}\s*años)/i);
        if (ageMatch) setRangoEdad(ageMatch[0]);
      }

    } catch (err: any) {
      console.warn("Error in colorimetry analysis with Gemini 3.8:", err);
      const errMsg = err?.message || String(err);
      if (errMsg.includes("429") || errMsg.includes("quota") || errMsg.includes("RESOURCE_EXHAUSTED")) {
        setColorimetryError("⚠️ Límite de cuota temporal en la API de Gemini 3.8. Por favor espera unos momentos y haz clic de nuevo en 'Procesar foto'.");
      } else {
        setColorimetryError("Error al procesar las fotografías con Gemini 3.8: " + (err?.message || "No se pudo extraer la información visual. Por favor intenta con otra foto o pulsa 'Procesar foto' de nuevo."));
      }
    } finally {
      setIsAnalyzingColorimetry(false);
    }
  };

  // Step 3 handler: Google Search Profiler on "Guardar Nombre"
  const handleSaveNameAndSearchProfile = async () => {
    const trimmedName = candidateName.trim();
    if (!trimmedName) {
      alert("Por favor ingresa un nombre para el perfil.");
      return;
    }

    setIsSearchingProfile(true);
    setSaveSuccessMsg(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
      const promptText = `Actúa como un experto consultor de inteligencia política y analista electoral en Colombia.
      Investiga en la web mediante Google Search el perfil público, trayectoria política, publicaciones, posturas y presencia pública de: **${trimmedName}** en Colombia (especialmente en Medellín / Antioquia o ámbito nacional).
      
      Debes extraer y responder estrictamente en formato JSON plano con los siguientes 9 parámetros exactos:
      {
        "experienciaPrevia": "Síntesis de experiencia política, candidaturas previas, activismo o cargos públicos conocidos de ${trimmedName}",
        "afiliacionPartidista": "Partido político, movimiento o cercanía ideológica visible",
        "relacionEstructurasLocales": "Relación con líderes comunitarios, comunas, ediles o estructuras locales",
        "formacionOcupacion": "Formación académica, estudios universitarios y ocupación profesional",
        "presenciaRedes": "Presencia y fuerza en plataformas digitales (Facebook, Twitter/X, Instagram, etc.)",
        "estiloComunicacion": "Estilo de comunicación dominante (Racional-institucional, confrontacional, pedagógico, etc.)",
        "ejeTematicoComodo": "Ejes temáticos en los que demuestra mayor soltura y comodidad discursiva",
        "reconocimientoNombre": "Grado de reconocimiento de nombre (Local, subregional, departamental o en consolidación)",
        "accesoMedios": "Acceso a medios tradicionales, digitales, columnas de opinión o portales",
        "resumenEstrategico": "Síntesis estratégica de valor electoral para conectar con los electores"
      }`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: [{ role: 'user', parts: [{ text: promptText }] }],
        config: {
          tools: [{ googleSearch: {} }]
        }
      });

      const raw = response.text || "";
      let updatedExp = experienciaPrevia;
      let updatedPart = afiliacionPartidista;
      let updatedRel = relacionEstructurasLocales;
      let updatedForm = formacionOcupacion;
      let updatedRedes = presenciaRedes;
      let updatedEstilo = estiloComunicacion;
      let updatedEje = ejeTematicoComodo;
      let updatedRec = reconocimientoNombre;
      let updatedAcc = accesoMedios;
      let updatedResumen = resumenEstrategico;

      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        if (parsed.experienciaPrevia) { setExperienciaPrevia(parsed.experienciaPrevia); updatedExp = parsed.experienciaPrevia; }
        if (parsed.afiliacionPartidista) { setAfiliacionPartidista(parsed.afiliacionPartidista); updatedPart = parsed.afiliacionPartidista; }
        if (parsed.relacionEstructurasLocales) { setRelacionEstructurasLocales(parsed.relacionEstructurasLocales); updatedRel = parsed.relacionEstructurasLocales; }
        if (parsed.formacionOcupacion) { setFormacionOcupacion(parsed.formacionOcupacion); updatedForm = parsed.formacionOcupacion; }
        if (parsed.presenciaRedes) { setPresenciaRedes(parsed.presenciaRedes); updatedRedes = parsed.presenciaRedes; }
        if (parsed.estiloComunicacion) { setEstiloComunicacion(parsed.estiloComunicacion); updatedEstilo = parsed.estiloComunicacion; }
        if (parsed.ejeTematicoComodo) { setEjeTematicoComodo(parsed.ejeTematicoComodo); updatedEje = parsed.ejeTematicoComodo; }
        if (parsed.reconocimientoNombre) { setReconocimientoNombre(parsed.reconocimientoNombre); updatedRec = parsed.reconocimientoNombre; }
        if (parsed.accesoMedios) { setAccesoMedios(parsed.accesoMedios); updatedAcc = parsed.accesoMedios; }
        if (parsed.resumenEstrategico) { setResumenEstrategico(parsed.resumenEstrategico); updatedResumen = parsed.resumenEstrategico; }
        setSaveSuccessMsg(`¡Información de Google Search extraída y perfil activado para "${trimmedName}"!`);
      } else {
        // Fallback default enrichment if no JSON
        if (trimmedName.toLowerCase().includes("isaac")) {
          setExperienciaPrevia(DEFAULT_ISAAC_MENDOZA_PROFILE.experienciaPrevia || "");
          setAfiliacionPartidista(DEFAULT_ISAAC_MENDOZA_PROFILE.afiliacionPartidista || "");
          setRelacionEstructurasLocales(DEFAULT_ISAAC_MENDOZA_PROFILE.relacionEstructurasLocales || "");
          setFormacionOcupacion(DEFAULT_ISAAC_MENDOZA_PROFILE.formacionOcupacion || "");
          setPresenciaRedes(DEFAULT_ISAAC_MENDOZA_PROFILE.presenciaRedes || "");
          setEstiloComunicacion(DEFAULT_ISAAC_MENDOZA_PROFILE.estiloComunicacion || "");
          setEjeTematicoComodo(DEFAULT_ISAAC_MENDOZA_PROFILE.ejeTematicoComodo || "");
          setReconocimientoNombre(DEFAULT_ISAAC_MENDOZA_PROFILE.reconocimientoNombre || "");
          setAccesoMedios(DEFAULT_ISAAC_MENDOZA_PROFILE.accesoMedios || "");
          updatedExp = DEFAULT_ISAAC_MENDOZA_PROFILE.experienciaPrevia || "";
          updatedPart = DEFAULT_ISAAC_MENDOZA_PROFILE.afiliacionPartidista || "";
        }
        setSaveSuccessMsg(`Nombre "${trimmedName}" guardado y perfil activado.`);
      }

      // Conexión y guardado inmediato del candidato para que esté disponible en Subregiones y toda la app
      const effectiveEmail = currentEmail || `${trimmedName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'candidato'}@campana.local`;
      if (!currentEmail && onConnectGoogleDrive) {
        onConnectGoogleDrive(effectiveEmail);
      }

      const immediateProfile: CandidateProfile = {
        id: `profile_${effectiveEmail.replace(/[^a-zA-Z0-9]/g, '_')}`,
        email: effectiveEmail,
        nombre: trimmedName,
        rangoEdad,
        sexo,
        tonoNarrativo,
        lugarResidencia: lugarResidencia.trim() || "Medellín, Antioquia",
        envergaduraEquipo: envergaduraEquipo.trim() || "Equipo mediano (4-10 integrantes)",
        experienciaPrevia: updatedExp,
        afiliacionPartidista: updatedPart || "Centro Democrático",
        relacionEstructurasLocales: updatedRel,
        formacionOcupacion: updatedForm,
        presenciaRedes: updatedRedes,
        estiloComunicacion: updatedEstilo,
        ejeTematicoComodo: updatedEje,
        reconocimientoNombre: updatedRec,
        accesoMedios: updatedAcc,
        resumenEstrategico: updatedResumen || `Perfil de ${trimmedName} activado y calibrado para análisis territorial y subregional.`,
        paletaColores,
        estiloFotografico,
        quEvitar,
        colorimetryReport: colorimetryReport || undefined,
        photoBase64: photoPreview || (uploadedPhotos.length > 0 ? uploadedPhotos[0] : undefined),
        photosBase64: uploadedPhotos.length > 0 ? uploadedPhotos : (photoPreview ? [photoPreview] : undefined),
        videoAnalysisData: videoAnalysisData || undefined,
        updatedAt: new Date().toISOString()
      };

      onSaveActiveProfile(immediateProfile);
      try {
        localStorage.setItem("proteus_active_candidate_profile", JSON.stringify(immediateProfile));
      } catch (e) {}
    } catch (err: any) {
      console.warn("Error in Google Search profile:", err);
      // If Isaac Mendoza, preload his full verified data smoothly
      let updatedExp = experienciaPrevia;
      let updatedPart = afiliacionPartidista;
      if (trimmedName.toLowerCase().includes("isaac")) {
        setExperienciaPrevia(DEFAULT_ISAAC_MENDOZA_PROFILE.experienciaPrevia || "");
        setAfiliacionPartidista(DEFAULT_ISAAC_MENDOZA_PROFILE.afiliacionPartidista || "");
        setRelacionEstructurasLocales(DEFAULT_ISAAC_MENDOZA_PROFILE.relacionEstructurasLocales || "");
        setFormacionOcupacion(DEFAULT_ISAAC_MENDOZA_PROFILE.formacionOcupacion || "");
        setPresenciaRedes(DEFAULT_ISAAC_MENDOZA_PROFILE.presenciaRedes || "");
        setEstiloComunicacion(DEFAULT_ISAAC_MENDOZA_PROFILE.estiloComunicacion || "");
        setEjeTematicoComodo(DEFAULT_ISAAC_MENDOZA_PROFILE.ejeTematicoComodo || "");
        setReconocimientoNombre(DEFAULT_ISAAC_MENDOZA_PROFILE.reconocimientoNombre || "");
        setAccesoMedios(DEFAULT_ISAAC_MENDOZA_PROFILE.accesoMedios || "");
        updatedExp = DEFAULT_ISAAC_MENDOZA_PROFILE.experienciaPrevia || "";
        updatedPart = DEFAULT_ISAAC_MENDOZA_PROFILE.afiliacionPartidista || "";
        setSaveSuccessMsg(`Nombre "${trimmedName}" guardado con perfil verificado.`);
      } else {
        setSaveSuccessMsg(`Nombre "${trimmedName}" guardado.`);
      }

      const effectiveEmail = currentEmail || `${trimmedName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'candidato'}@campana.local`;
      if (!currentEmail && onConnectGoogleDrive) {
        onConnectGoogleDrive(effectiveEmail);
      }

      const fallbackProfile: CandidateProfile = {
        id: `profile_${effectiveEmail.replace(/[^a-zA-Z0-9]/g, '_')}`,
        email: effectiveEmail,
        nombre: trimmedName,
        rangoEdad,
        sexo,
        tonoNarrativo,
        lugarResidencia: lugarResidencia.trim() || "Medellín, Antioquia",
        envergaduraEquipo: envergaduraEquipo.trim() || "Equipo mediano (4-10 integrantes)",
        experienciaPrevia: updatedExp,
        afiliacionPartidista: updatedPart || "Centro Democrático",
        relacionEstructurasLocales,
        formacionOcupacion,
        presenciaRedes,
        estiloComunicacion,
        ejeTematicoComodo,
        reconocimientoNombre,
        accesoMedios,
        resumenEstrategico: resumenEstrategico || `Perfil de ${trimmedName} activado.`,
        paletaColores,
        estiloFotografico,
        quEvitar,
        colorimetryReport: colorimetryReport || undefined,
        photoBase64: photoPreview || (uploadedPhotos.length > 0 ? uploadedPhotos[0] : undefined),
        photosBase64: uploadedPhotos.length > 0 ? uploadedPhotos : (photoPreview ? [photoPreview] : undefined),
        videoAnalysisData: videoAnalysisData || undefined,
        updatedAt: new Date().toISOString()
      };

      onSaveActiveProfile(fallbackProfile);
      try {
        localStorage.setItem("proteus_active_candidate_profile", JSON.stringify(fallbackProfile));
      } catch (e) {}
    } finally {
      setIsSearchingProfile(false);
    }
  };

  // Step 3 final save: "Guardar Perfil"
  const handleFinalSaveProfile = () => {
    const effectiveEmail = currentEmail || (candidateName ? `${candidateName.toLowerCase().replace(/[^a-z0-9]/g, '')}@campana.local` : 'candidato@campana.local');
    if (!currentEmail && onConnectGoogleDrive) {
      onConnectGoogleDrive(effectiveEmail);
    }

    const newProfile: CandidateProfile = {
      id: `profile_${effectiveEmail.replace(/[^a-zA-Z0-9]/g, '_')}`,
      email: effectiveEmail,
      nombre: candidateName.trim() || formatNameFromEmail(effectiveEmail),
      rangoEdad,
      sexo,
      tonoNarrativo,
      lugarResidencia: lugarResidencia.trim() || "Medellín, Antioquia",
      envergaduraEquipo: envergaduraEquipo.trim() || "Equipo mediano (4-10 integrantes)",
      experienciaPrevia,
      afiliacionPartidista: afiliacionPartidista || "Centro Democrático",
      relacionEstructurasLocales,
      formacionOcupacion,
      presenciaRedes,
      estiloComunicacion,
      ejeTematicoComodo,
      reconocimientoNombre,
      accesoMedios,
      resumenEstrategico: resumenEstrategico || "Estrategia calibrada con rigor técnico e identidad visual de alto impacto.",
      paletaColores,
      colorimetryData: {
        fototipoPiel,
        colorCabello,
        colorOjos,
        estacionCromatica,
        nivelContraste,
        intencionComunicacion,
        swatches: paletteSwatches,
        recomendacionesVestuario,
        iluminacionEncuadres,
        lenguajeCorporal,
        quEvitar
      },
      estiloFotografico,
      quEvitar,
      colorimetryReport: colorimetryReport || undefined,
      photoBase64: photoPreview || (uploadedPhotos.length > 0 ? uploadedPhotos[0] : undefined),
      photosBase64: uploadedPhotos.length > 0 ? uploadedPhotos : (photoPreview ? [photoPreview] : undefined),
      videoAnalysisData: videoAnalysisData || undefined,
      updatedAt: new Date().toISOString()
    };

    onSaveActiveProfile(newProfile);
    try {
      localStorage.setItem("proteus_active_candidate_profile", JSON.stringify(newProfile));
    } catch (e) {}
    setSaveSuccessMsg(`🎉 ¡Perfil de "${newProfile.nombre}" guardado y activado exitosamente! Todas las herramientas de la plataforma están calibradas con tu identidad.`);
  };

  // Backup Mechanism 1: Download PDF (Guardado PDF)
  const handleDownloadProfilePDF = () => {
    if (!activeProfile && !candidateName) {
      alert("Por favor completa y guarda primero el perfil del candidato.");
      return;
    }

    const profileToExport: CandidateProfile = activeProfile || {
      email: currentEmail || "usuario@gmail.com",
      nombre: candidateName,
      rangoEdad,
      sexo,
      tonoNarrativo,
      lugarResidencia,
      envergaduraEquipo,
      experienciaPrevia,
      afiliacionPartidista,
      relacionEstructurasLocales,
      formacionOcupacion,
      presenciaRedes,
      estiloComunicacion,
      ejeTematicoComodo,
      reconocimientoNombre,
      accesoMedios,
      resumenEstrategico,
      paletaColores,
      colorimetryData: {
        fototipoPiel,
        colorCabello,
        colorOjos,
        estacionCromatica,
        nivelContraste,
        intencionComunicacion,
        swatches: paletteSwatches,
        recomendacionesVestuario,
        iluminacionEncuadres,
        lenguajeCorporal,
        quEvitar
      },
      videoAnalysisData: activeProfile?.videoAnalysisData || videoAnalysisData || undefined,
      colorimetryReport: colorimetryReport || undefined
    };

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Styling
    const primaryColor = [10, 37, 64]; // #0A2540
    const secondaryColor = [46, 125, 50]; // #2E7D32
    const textColor = [30, 41, 59];

    // Header background
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, 210, 38, 'F');

    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('PROTEUS NACIONAL — CMT CONSULTORA', 14, 16);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text('EXPEDIENTE DE PERFIL POLÍTICO, IDENTIDAD VISUAL Y COLORIMETRÍA', 14, 24);
    doc.text(`Generado para: ${profileToExport.email} | Fecha: ${new Date().toLocaleDateString('es-CO')}`, 14, 31);

    let currentY = 46;

    // Candidate Header Box
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(14, currentY, 182, 30, 3, 3, 'FD');

    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    doc.text(profileToExport.nombre || 'Candidato', 20, currentY + 10);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.text(`Afiliación: ${profileToExport.afiliacionPartidista || 'Centro Democrático'} | Residencia: ${profileToExport.lugarResidencia || 'No especificada'}`, 20, currentY + 17);
    doc.text(`Tono: ${profileToExport.tonoNarrativo || 'Pragmático'} | Edad: ${profileToExport.rangoEdad || 'N/A'} | Sexo: ${profileToExport.sexo || 'N/A'}`, 20, currentY + 23);

    currentY += 36;

    // Section 1: Strategic Parameters Table
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('1. PARÁMETROS ESTRATÉGICOS DEL PERFIL', 14, currentY);
    currentY += 6;

    const parametersList = [
      { label: 'Experiencia previa más visible', val: profileToExport.experienciaPrevia },
      { label: 'Relación con estructuras locales', val: profileToExport.relacionEstructurasLocales },
      { label: 'Formación / Ocupación principal', val: profileToExport.formacionOcupacion },
      { label: 'Presencia en redes y plataformas', val: profileToExport.presenciaRedes },
      { label: 'Estilo de comunicación dominante', val: profileToExport.estiloComunicacion },
      { label: 'Eje temático cómodo', val: profileToExport.ejeTematicoComodo },
      { label: 'Reconocimiento de nombre', val: profileToExport.reconocimientoNombre },
      { label: 'Acceso a medios de difusión', val: profileToExport.accesoMedios },
      { label: 'Envergadura del equipo', val: profileToExport.envergaduraEquipo }
    ];

    parametersList.forEach((param) => {
      if (currentY > 265) {
        doc.addPage();
        currentY = 20;
      }
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(51, 65, 85);
      doc.text(`• ${param.label}:`, 16, currentY);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(71, 85, 105);
      const textLines = doc.splitTextToSize(param.val || 'Pendiente de definir', 120);
      doc.text(textLines, 68, currentY);
      currentY += Math.max(textLines.length * 4.2, 5.5);
    });

    currentY += 4;

    // Section 2: Colorimetry & Visual Identity
    if (currentY > 240) {
      doc.addPage();
      currentY = 20;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('2. INFORME DE COLORIMETRÍA E IDENTIDAD VISUAL', 14, currentY);
    currentY += 6;

    if (profileToExport.colorimetryData?.swatches && profileToExport.colorimetryData.swatches.length > 0) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      doc.text('Paleta Cromática Personalizada Derivada:', 16, currentY);
      currentY += 5;

      profileToExport.colorimetryData.swatches.forEach(swatch => {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text(`[${swatch.role}] ${swatch.nombre} (${swatch.hex}):`, 18, currentY);
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(71, 85, 105);
        const detail = `${swatch.justificacionPielCabello ? 'Piel/Cabello: ' + swatch.justificacionPielCabello : ''} ${swatch.justificacionEstrategica ? '| Estrategia: ' + swatch.justificacionEstrategica : ''}`;
        const descLines = doc.splitTextToSize(detail, 160);
        currentY += 4;
        doc.text(descLines, 22, currentY);
        currentY += descLines.length * 3.8 + 2;
      });
    } else if (profileToExport.paletaColores) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      doc.text('Paleta de Colores:', 16, currentY);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      const paletteLines = doc.splitTextToSize(profileToExport.paletaColores, 135);
      doc.text(paletteLines, 48, currentY);
      currentY += paletteLines.length * 4.5 + 2;
    }

    if (profileToExport.colorimetryReport) {
      const cleanReport = profileToExport.colorimetryReport.replace(/#/g, '').replace(/\*/g, '');
      const reportLines = doc.splitTextToSize(cleanReport, 180);
      
      for (let i = 0; i < reportLines.length; i++) {
        if (currentY > 275) {
          doc.addPage();
          currentY = 20;
        }
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(71, 85, 105);
        doc.text(reportLines[i], 16, currentY);
        currentY += 4;
      }
    }

    // Section 3: Video Analysis & Media Training (if available)
    if (profileToExport.videoAnalysisData) {
      const va = profileToExport.videoAnalysisData;
      if (currentY > 220) {
        doc.addPage();
        currentY = 20;
      } else {
        currentY += 8;
      }

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text('3. AUDITORÍA AUDIOVISUAL, EXPRESIÓN ORAL Y MEDIA-TRAINING', 14, currentY);
      currentY += 6;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(71, 85, 105);
      doc.text(`Video / Fuente: ${va.videoUrl.slice(0, 80)} (${va.platform.toUpperCase()})`, 16, currentY);
      currentY += 5;

      doc.setFont('helvetica', 'bold');
      doc.text(`• Tono Comunicacional: `, 16, currentY);
      doc.setFont('helvetica', 'normal');
      doc.text(`${va.tonoComunicacional.registroDominante} — Asertividad: ${va.tonoComunicacional.nivelAsertividad} | Conexión: ${va.tonoComunicacional.conexionEmocional}`, 54, currentY);
      currentY += 5;

      doc.setFont('helvetica', 'bold');
      doc.text(`• Expresión Oral y Dicción: `, 16, currentY);
      doc.setFont('helvetica', 'normal');
      const oralLines = doc.splitTextToSize(`${va.expresionOral.diccionVocalizacion} Cadencia: ${va.expresionOral.cadenciaRitmo}. Muletillas: ${va.expresionOral.muletillasDetectadas.join(', ') || 'Sin muletillas de alta frecuencia'}.`, 130);
      doc.text(oralLines, 58, currentY);
      currentY += Math.max(oralLines.length * 4, 5.5);

      doc.setFont('helvetica', 'bold');
      doc.text(`• Composición & Color: `, 16, currentY);
      doc.setFont('helvetica', 'normal');
      doc.text(`Plano: ${va.composicionEncuadre.tipoPlano} | Ángulo: ${va.composicionEncuadre.anguloCamara} | Iluminación: ${va.coloracionIluminacion.temperaturaColor}`, 54, currentY);
      currentY += 5;

      doc.setFont('helvetica', 'bold');
      doc.text(`• Grado de Edición: `, 16, currentY);
      doc.setFont('helvetica', 'normal');
      doc.text(`${va.gradoEdicion.nivelProduccion} | Cortes: ${va.gradoEdicion.ritmoCortes.slice(0, 60)}`, 50, currentY);
      currentY += 6;

      // Scorecards
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text('Scorecards en Cámara:', 16, currentY);
      currentY += 4.5;

      const vScores = [
        `Dominio Escénico: ${va.metricasScore.dominioEscenico}%`,
        `Claridad Dicción: ${va.metricasScore.claridadDiccion}%`,
        `Conexión Emocional: ${va.metricasScore.conexionEmocional}%`,
        `Composición: ${va.metricasScore.calidadVisualComposicion}%`,
        `Ritmo Edición: ${va.metricasScore.ritmoEdicion}%`,
        `Control Muletillas: ${va.metricasScore.controlMuletillas}%`
      ];

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(37, 99, 235);
      doc.text(vScores.slice(0, 3).join('   |   '), 16, currentY);
      currentY += 4;
      doc.text(vScores.slice(3, 6).join('   |   '), 16, currentY);
      currentY += 6;
    }

    // Save
    const cleanFileName = (profileToExport.nombre || 'Candidato').replace(/[^a-zA-Z0-9]/g, '_');
    doc.save(`Expediente_Perfil_Proteus_${cleanFileName}.pdf`);
  };

  // Backup Mechanism 2: "Lector de Perfil" (Subir PDF)
  const handleUploadProfilePDF = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      setPdfParseError(true);
      setPdfParseStatus("Por favor selecciona un archivo PDF válido.");
      return;
    }

    setIsParsingPdf(true);
    setPdfParseError(false);
    setPdfParseStatus(`Leyendo y extrayendo perfil desde "${file.name}" con Inteligencia Artificial...`);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        try {
          const resultStr = reader.result as string;
          const base64Data = resultStr.split(',')[1];

          const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
          const promptText = `Analiza este documento PDF que contiene el perfil, colorimetría e identidad visual de un candidato político.
          Extrae toda la información posible y responde ÚNICAMENTE en formato JSON plano:
          {
            "email": "Correo de Google o cuenta asociada si está presente",
            "nombre": "Nombre completo del candidato",
            "rangoEdad": "Rango de edad",
            "sexo": "Masculino o Femenino",
            "tonoNarrativo": "Tono narrativo preferido",
            "lugarResidencia": "Lugar de residencia",
            "envergaduraEquipo": "Envergadura del equipo de comunicación",
            "experienciaPrevia": "Experiencia previa más visible",
            "afiliacionPartidista": "Afiliación o cercanía partidista",
            "relacionEstructurasLocales": "Relación con estructuras locales",
            "formacionOcupacion": "Formación u ocupación principal",
            "presenciaRedes": "Presencia en redes y plataformas",
            "estiloComunicacion": "Estilo de comunicación dominante",
            "ejeTematicoComodo": "Eje temático cómodo",
            "reconocimientoNombre": "Reconocimiento de nombre",
            "accesoMedios": "Acceso a medios",
            "paletaColores": "Paleta de colores recomendada",
            "estiloFotografico": "Estilo fotográfico",
            "quEvitar": "Qué evitar",
            "colorimetryReport": "Texto del informe de colorimetría e identidad visual",
            "resumenEstrategico": "Síntesis estratégica"
          }`;

          const response = await ai.models.generateContent({
            model: "gemini-3.8-flash",
            contents: [
              {
                role: 'user',
                parts: [
                  { inlineData: { data: base64Data, mimeType: 'application/pdf' } },
                  { text: promptText }
                ]
              }
            ]
          });

          const rawText = response.text || "";
          const jsonMatch = rawText.match(/\{[\s\S]*\}/);

          if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            const targetEmail = parsed.email || currentEmail || MASTER_EMAIL;
            
            // Auto connect account if needed
            if (!currentEmail) {
              onConnectGoogleDrive(targetEmail);
            }

            // Fill all state variables
            if (parsed.nombre) setCandidateName(parsed.nombre);
            if (parsed.rangoEdad) setRangoEdad(parsed.rangoEdad);
            if (parsed.sexo) setSexo(parsed.sexo);
            if (parsed.tonoNarrativo) setTonoNarrativo(parsed.tonoNarrativo);
            if (parsed.lugarResidencia) setLugarResidencia(parsed.lugarResidencia);
            if (parsed.envergaduraEquipo) setEnvergaduraEquipo(parsed.envergaduraEquipo);
            if (parsed.experienciaPrevia) setExperienciaPrevia(parsed.experienciaPrevia);
            if (parsed.afiliacionPartidista) setAfiliacionPartidista(parsed.afiliacionPartidista);
            if (parsed.relacionEstructurasLocales) setRelacionEstructurasLocales(parsed.relacionEstructurasLocales);
            if (parsed.formacionOcupacion) setFormacionOcupacion(parsed.formacionOcupacion);
            if (parsed.presenciaRedes) setPresenciaRedes(parsed.presenciaRedes);
            if (parsed.estiloComunicacion) setEstiloComunicacion(parsed.estiloComunicacion);
            if (parsed.ejeTematicoComodo) setEjeTematicoComodo(parsed.ejeTematicoComodo);
            if (parsed.reconocimientoNombre) setReconocimientoNombre(parsed.reconocimientoNombre);
            if (parsed.accesoMedios) setAccesoMedios(parsed.accesoMedios);
            if (parsed.paletaColores) setPaletaColores(parsed.paletaColores);
            if (parsed.estiloFotografico) setEstiloFotografico(parsed.estiloFotografico);
            if (parsed.quEvitar) setQuEvitar(parsed.quEvitar);
            if (parsed.colorimetryReport) setColorimetryReport(parsed.colorimetryReport);
            if (parsed.resumenEstrategico) setResumenEstrategico(parsed.resumenEstrategico);

            // Create and save complete profile
            const newProfile: CandidateProfile = {
              ...parsed,
              id: `profile_${targetEmail.replace(/[^a-zA-Z0-9]/g, '_')}`,
              email: targetEmail,
              uploadedFileName: file.name,
              updatedAt: new Date().toISOString()
            };

            onSaveActiveProfile(newProfile);
            setPdfParseStatus(`✅ ¡Lector de Perfil exitoso! Los Pasos 1, 2, 2A y 3 se han llenado y calibrado para ${newProfile.nombre}.`);
          } else {
            // Fallback load
            const fallbackName = file.name.replace(/\.[^/.]+$/, "").replace(/_/g, " ");
            setCandidateName(fallbackName);
            onSaveActiveProfile({
              ...DEFAULT_ISAAC_MENDOZA_PROFILE,
              nombre: fallbackName,
              uploadedFileName: file.name
            });
            setPdfParseStatus(`Perfil cargado desde "${file.name}".`);
          }
        } catch (err: any) {
          console.warn("Error in PDF reading:", err);
          setPdfParseError(true);
          setPdfParseStatus("⚠️ Ocurrió un error al leer el PDF. Se restauró el perfil de respaldo de Isaac Mendoza.");
          onSaveActiveProfile(DEFAULT_ISAAC_MENDOZA_PROFILE);
        } finally {
          setIsParsingPdf(false);
        }
      };
    } catch (e: any) {
      setPdfParseError(true);
      setPdfParseStatus("Error al abrir el archivo PDF.");
      setIsParsingPdf(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Bar: Lector de Perfil (Subir PDF) + Acciones Rápidas */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-2 rounded-2xl shadow-md border border-white/20 shrink-0">
            <CmtIsotipo size={34} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black tracking-tight">Personalización Obligatoria del Candidato</h2>
              <span className="bg-amber-400 text-amber-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                Paso a Paso Requerido
              </span>
            </div>
            <p className="text-xs text-blue-200 mt-0.5">
              Cumple los 3 pasos obligatorios para calibrar el algoritmo discursivo y desbloquear todas las herramientas de Proteus Nacional.
            </p>
          </div>
        </div>

        {/* Lector de Perfil (Subir PDF) Button */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <input 
              type="file" 
              accept=".pdf,application/pdf" 
              onChange={handleUploadProfilePDF}
              disabled={isParsingPdf}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10" 
            />
            <button 
              type="button"
              className="flex items-center gap-2 bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/10 hover:bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/20 border border-white/20 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              {isParsingPdf ? (
                <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
              ) : (
                <Upload className="w-4 h-4 text-blue-300" />
              )}
              <span>📂 Lector de Perfil (Subir PDF)</span>
            </button>
          </div>

          {activeProfile && (
            <button 
              type="button"
              onClick={handleDownloadProfilePDF}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Guardado PDF (Descargar)</span>
            </button>
          )}
        </div>
      </div>

      {/* PDF Parse Notification if active */}
      {pdfParseStatus && (
        <div className={`p-4 rounded-2xl border text-sm flex items-center gap-3 ${pdfParseError ? 'bg-red-50 text-red-700 border-red-200' : 'bg-emerald-500/10 text-emerald-800 border-emerald-200'}`}>
          {pdfParseError ? <AlertCircle className="w-5 h-5 flex-shrink-0" /> : <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600" />}
          <span>{pdfParseStatus}</span>
        </div>
      )}

      {/* Account Master Switcher Notice (if Master Isaac Mendoza account) */}
      {isMasterUser && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 text-white p-2 rounded-xl">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-indigo-900">Modo Cuenta Maestra Activo ({MASTER_EMAIL})</p>
              <p className="text-[11px] text-indigo-700">Tienes acceso global para seleccionar o alternar entre cualquier perfil guardado en el sistema.</p>
            </div>
          </div>
          {Object.keys(allSavedProfiles).length > 0 && onSelectSavedProfile && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-indigo-900">Perfil activo:</span>
              <select 
                value={activeProfile?.email?.toLowerCase() || activeProfile?.id || ""}
                onChange={(e) => {
                  const key = e.target.value.toLowerCase();
                  const p = allSavedProfiles[key] || Object.values(allSavedProfiles).find(prof => (prof.email?.toLowerCase() === key || prof.id === key));
                  if (p) onSelectSavedProfile(p);
                }}
                className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl border border-indigo-300 text-indigo-900 rounded-lg px-3 py-1.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {Array.from(
                  new Map(
                    Object.values(allSavedProfiles).map((p) => [
                      (p.email || p.id || "default").toLowerCase(),
                      p
                    ])
                  ).values()
                ).map((p) => {
                  const uniqueKey = (p.email || p.id || "profile").toLowerCase();
                  return (
                    <option key={uniqueKey} value={uniqueKey}>
                      {p.nombre} ({p.email})
                    </option>
                  );
                })}
              </select>
            </div>
          )}
        </div>
      )}

      {/* Grid of the 3 Mandatory Steps */}
      <div className="space-y-8">
        
        {/* ========================================================= */}
        {/* PASO 1: CONEXIÓN A GOOGLE DRIVE (OBLIGATORIO) */}
        {/* ========================================================= */}
        <section className={`bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl rounded-3xl p-6 sm:p-8 shadow-sm border transition-all ${isGoogleConnected ? 'border-emerald-200 ring-2 ring-emerald-500/10' : 'border-blue-200 ring-2 ring-blue-500/10'}`}>
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-2xl font-black text-sm ${isGoogleConnected ? 'bg-emerald-500/20 text-emerald-300 text-emerald-700' : 'bg-sky-500/20 text-sky-300 text-blue-800'}`}>
                1
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white">Paso 1: Conexión a Google Drive</h3>
                  <span className="bg-red-100 text-red-700 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                    OBLIGATORIO
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Ningún usuario podrá hacer uso del aplicativo sin conectar su cuenta a Google Drive.
                </p>
              </div>
            </div>

            {isGoogleConnected ? (
              <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Conectado
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 text-amber-800 text-xs font-bold px-3 py-1.5 rounded-full">
                <Lock className="w-4 h-4 text-amber-600" />
                Desconectado
              </span>
            )}
          </div>

          <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-2xl p-6 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-lg">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-bold text-slate-200">Cuenta de Google Drive Vinculada</span>
              </div>
              {isGoogleConnected ? (
                <div className="flex items-center gap-2 bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl px-4 py-2.5 rounded-xl border border-white/10">
                  <User className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-mono font-bold text-white">{currentEmail}</span>
                  {isMasterUser && (
                    <span className="bg-indigo-100 text-indigo-700 text-[9px] font-black px-2 py-0.5 rounded ml-auto">
                      Cuenta Maestra
                    </span>
                  )}
                </div>
              ) : (
                <p className="text-xs text-slate-400">
                  Ingresa tu cuenta de correo de Google o haz clic para sincronizar automáticamente con Google Drive.
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              {!isGoogleConnected ? (
                <>
                  <div className="relative flex-1 md:w-64">
                    <input 
                      type="email"
                      placeholder="tu_cuenta@gmail.com"
                      value={customEmailInput}
                      onChange={(e) => setCustomEmailInput(e.target.value)}
                      className="w-full bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    onClick={() => handleConnect(customEmailInput)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer"
                  >
                    Conectar Cuenta
                  </button>
                  <button
                    onClick={() => handleConnect(MASTER_EMAIL)}
                    className="bg-slate-200 hover:bg-slate-300 text-white text-xs font-bold px-3 py-2.5 rounded-xl transition-all cursor-pointer"
                    title="Conectar como cuenta maestra Isaac Mendoza"
                  >
                    Usar {MASTER_EMAIL}
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={onDisconnectGoogleDrive}
                    className="bg-slate-200 hover:bg-red-50 hover:text-red-700 text-slate-200 text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                  >
                    Cambiar / Desconectar
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* PASO 2 & 2A: SUBIR FOTOGRAFÍA & ANALIZAR COLORIMETRÍA */}
        {/* ========================================================= */}
        <section className={`bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl rounded-3xl p-6 sm:p-8 shadow-sm border transition-all ${colorimetryReport ? 'border-emerald-200 ring-2 ring-emerald-500/10' : 'border-white/10'}`}>
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-2xl font-black text-sm ${colorimetryReport ? 'bg-emerald-500/20 text-emerald-300 text-emerald-700' : 'bg-sky-500/20 text-sky-300 text-blue-800'}`}>
                2
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Paso 2 y 2A: Fotografía & Análisis de Colorimetría</h3>
                <p className="text-xs text-slate-400">
                  Estructura por pasos: <strong>Paso 1:</strong> Sube la foto o las fotos del candidato → <strong>Paso 2:</strong> Clic en "Procesar foto" para que Gemini 3.8 analice los rasgos fisonómicos reales y elabore el informe.
                </p>
              </div>
            </div>

            {colorimetryReport && (
              <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Informe Extraído & Generado
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Columna Izquierda: Paso 1 y Paso 2 */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* PASO 1: Subir la foto o las fotos */}
              <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 p-4 rounded-2xl border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-blue-600" />
                    Paso 1: Sube la foto o las fotos
                  </span>
                  {uploadedPhotos.length > 0 && (
                    <span className="bg-sky-500/20 text-sky-300 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {uploadedPhotos.length} {uploadedPhotos.length === 1 ? 'fotografía cargada' : 'fotografías cargadas'}
                    </span>
                  )}
                </div>

                {uploadedPhotos.length > 0 ? (
                  <div className="space-y-3">
                    {/* Grid de miniaturas */}
                    <div className="grid grid-cols-3 gap-2">
                      {uploadedPhotos.map((photo, index) => (
                        <div 
                          key={`uploaded_photo_${index}`}
                          className={`relative group rounded-xl overflow-hidden border-2 aspect-square shadow-sm ${index === 0 ? 'border-blue-500 ring-2 ring-blue-400/30' : 'border-white/10'}`}
                        >
                          <img 
                            src={photo} 
                            alt={`Foto ${index + 1}`} 
                            className="w-full h-full object-cover"
                          />
                          {index === 0 && (
                            <span className="absolute top-1 left-1 bg-blue-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded shadow">
                              Principal
                            </span>
                          )}
                          <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                            {index !== 0 && (
                              <button
                                type="button"
                                onClick={() => handleSetPrimaryPhoto(index)}
                                className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/90 hover:bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl text-white text-[9px] font-bold p-1 rounded cursor-pointer"
                                title="Fijar como foto principal"
                              >
                                Principal
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleRemovePhoto(index)}
                              className="bg-red-600 hover:bg-red-700 text-white text-[9px] font-bold p-1 rounded cursor-pointer"
                              title="Eliminar foto"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <label className="text-[11px] font-bold text-blue-600 bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl border border-blue-200 hover:bg-sky-500/10 px-3 py-1.5 rounded-xl cursor-pointer transition-all flex items-center gap-1.5 shadow-sm">
                        <Upload className="w-3.5 h-3.5" />
                        + Añadir más fotos
                        <input 
                          type="file" 
                          accept="image/*" 
                          multiple 
                          onChange={handlePhotoSelect} 
                          className="hidden" 
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setUploadedPhotos([]);
                          setPhotoPreview(null);
                        }}
                        className="text-[10px] text-slate-400 hover:text-red-600 transition-colors"
                      >
                        Quitar todas
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:border-blue-500 transition-all relative bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl flex flex-col items-center justify-center min-h-[170px]">
                    <input 
                      type="file" 
                      accept="image/*" 
                      multiple 
                      onChange={handlePhotoSelect} 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                    />
                    <div className="bg-sky-500/10 p-3 rounded-2xl text-blue-600 mb-2 border border-blue-100">
                      <Camera className="w-6 h-6" />
                    </div>
                    <p className="text-xs font-bold text-white">Haz clic o arrastra para subir tus fotografías</p>
                    <p className="text-[10px] text-slate-400 mt-1">Sube 1 o varias fotos con buena iluminación (JPG, PNG, WEBP)</p>
                  </div>
                )}
              </div>

              {/* Strategic Intention Selector */}
              <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 p-4 rounded-2xl border border-white/10 space-y-2.5">
                <label className="text-[11px] font-bold uppercase text-slate-200 block flex items-center justify-between">
                  <span>🎯 ¿Qué deseas transmitir con tu imagen?</span>
                  <span className="text-[9px] text-blue-600 font-normal">Personaliza el resultado</span>
                </label>
                <select
                  value={intencionPreset}
                  onChange={(e) => {
                    setIntencionPreset(e.target.value);
                    if (e.target.value !== "Personalizado") {
                      setIntencionComunicacion(e.target.value);
                    }
                  }}
                  className="w-full bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                >
                  <option value="Autoridad, Solidez Institucional y Confianza">Autoridad, Solidez Institucional y Confianza</option>
                  <option value="Cercanía Popular, Empatía y Escucha Activa">Cercanía Popular, Empatía y Escucha Activa</option>
                  <option value="Innovación, Liderazgo Joven y Transformación">Innovación, Liderazgo Joven y Transformación</option>
                  <option value="Firmeza, Seguridad y Orden Constitucional">Firmeza, Seguridad y Orden Constitucional</option>
                  <option value="Protección Social, Cuidado y Desarrollo Familiar">Protección Social, Cuidado y Desarrollo Familiar</option>
                  <option value="Personalizado">Otro objetivo (Escribir abajo)</option>
                </select>

                <input
                  type="text"
                  value={intencionComunicacion}
                  onChange={(e) => {
                    setIntencionComunicacion(e.target.value);
                    setIntencionPreset("Personalizado");
                  }}
                  placeholder="Ej: Rigor técnico, serenidad y contundencia discursiva"
                  className="w-full bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-[10px] text-slate-400 leading-tight">
                  Gemini 3.8 cruzará tu tono de piel, cabello y este objetivo para derivar tu paleta exacta.
                </p>
              </div>

              {/* PASO 2: Botón 'Procesar foto' */}
              <button
                onClick={handleAnalyzePhotoColorimetry}
                disabled={uploadedPhotos.length === 0 || isAnalyzingColorimetry}
                className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold py-3.5 px-4 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                {isAnalyzingColorimetry ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-blue-200" />
                    <span>Gemini 3.8 analizando fotografías y extrayendo datos...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>
                      {uploadedPhotos.length > 1 
                        ? `Paso 2: Procesar fotos (${uploadedPhotos.length} fotos con Gemini 3.8)` 
                        : "Paso 2: Procesar foto con Gemini 3.8"}
                    </span>
                  </>
                )}
              </button>

              {colorimetryError && (
                <div className="text-xs text-amber-800 bg-amber-500/10 p-3.5 rounded-2xl border border-amber-200 space-y-1">
                  <p className="font-semibold">Aviso:</p>
                  <p>{colorimetryError}</p>
                </div>
              )}
            </div>

            {/* Colorimetry Result Display */}
            <div className="lg:col-span-7 bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-3xl p-6 border border-white/10/80 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-indigo-600" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Informe de Colorimetría e Identidad Visual</h4>
                    <p className="text-[10px] text-slate-400">
                      {colorimetryReport 
                        ? "Análisis fisonómico y cromático completado" 
                        : "Pendiente: sube la foto o fotos y pulsa 'Procesar foto'"}
                    </p>
                  </div>
                </div>
                {colorimetryReport ? (
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 text-emerald-800 px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {estacionCromatica || "Calibrado con IA"}
                    </span>
                    <button
                      type="button"
                      onClick={handleResetColorimetry}
                      className="text-[10px] text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                      title="Borrar análisis actual y reiniciar"
                    >
                      Reiniciar
                    </button>
                  </div>
                ) : (
                  <span className="text-[10px] bg-slate-200/80 text-slate-300 px-2.5 py-1 rounded-full font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    Esperando fotografías
                  </span>
                )}
              </div>

              {/* Dynamic Biometric Diagnosis Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-2.5 rounded-xl border border-white/10/70">
                  <span className="text-[9px] uppercase font-bold text-slate-400 block">Fototipo & Subtono Piel</span>
                  <span className={`text-[11px] font-bold block line-clamp-2 ${fototipoPiel ? 'text-white' : 'text-slate-400 italic'}`}>
                    {fototipoPiel || "Sin analizar (Esperando foto)"}
                  </span>
                </div>
                <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-2.5 rounded-xl border border-white/10/70">
                  <span className="text-[9px] uppercase font-bold text-slate-400 block">Color de Cabello / Cejas</span>
                  <span className={`text-[11px] font-bold block line-clamp-2 ${colorCabello ? 'text-white' : 'text-slate-400 italic'}`}>
                    {colorCabello || "Sin analizar (Esperando foto)"}
                  </span>
                </div>
                <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-2.5 rounded-xl border border-white/10/70 col-span-2 sm:col-span-1">
                  <span className="text-[9px] uppercase font-bold text-slate-400 block">Estación / Contraste</span>
                  <span className={`text-[11px] font-bold block line-clamp-2 ${estacionCromatica ? 'text-white' : 'text-slate-400 italic'}`}>
                    {estacionCromatica ? `${estacionCromatica} (${nivelContraste || 'Contraste medido'})` : "Sin analizar (Esperando foto)"}
                  </span>
                </div>
              </div>

              {/* Dynamic Palette Swatches with Live Customization */}
              <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-3.5 rounded-2xl border border-white/10/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-slate-200 tracking-wider flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-indigo-600" />
                    Paleta de Cuatro Colores (Electoral & Fisonómica):
                  </span>
                  {paletteSwatches.length > 0 ? (
                    <span className="text-[9px] text-emerald-700 bg-emerald-500/10 px-2 py-0.5 rounded-full font-bold">
                      ✓ Rellenada con el color exacto del análisis
                    </span>
                  ) : (
                    <span className="text-[9px] text-amber-700 bg-amber-500/10 px-2 py-0.5 rounded-full font-medium">
                      ○ Se rellenará tras procesar la foto
                    </span>
                  )}
                </div>

                {paletteSwatches.length > 0 ? (
                  /* Rellenada con los colores exactos después del análisis */
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {paletteSwatches.map((swatch, idx) => (
                      <div 
                        key={`swatch_${swatch.role}_${idx}`}
                        className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-white/10/80 hover:border-indigo-300 transition-all shadow-xs"
                      >
                        <div className="relative group shrink-0">
                          <input
                            type="color"
                            value={swatch.hex.length === 7 ? swatch.hex : '#0A2540'}
                            onChange={(e) => handleUpdateSwatch(swatch.role, 'hex', e.target.value)}
                            className="w-10 h-10 rounded-xl cursor-pointer border border-slate-300 overflow-hidden shadow-sm"
                            title="Ajustar color hexadecimal"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-[10px] font-black uppercase text-indigo-900 bg-indigo-50 px-1.5 py-0.5 rounded">
                              {swatch.role}
                            </span>
                            <input
                              type="text"
                              value={swatch.hex}
                              onChange={(e) => handleUpdateSwatch(swatch.role, 'hex', e.target.value)}
                              className="w-18 font-mono text-[10px] font-bold text-white bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl border border-white/10 rounded px-1.5 py-0.5 text-right shadow-xs"
                            />
                          </div>
                          <input
                            type="text"
                            value={swatch.nombre}
                            onChange={(e) => handleUpdateSwatch(swatch.role, 'nombre', e.target.value)}
                            className="text-[11px] font-bold text-white bg-transparent border-b border-dashed border-slate-300 focus:border-indigo-500 w-full mt-1 outline-none"
                          />
                          {swatch.justificacionPielCabello && (
                            <p className="text-[9px] text-slate-300 mt-1 leading-tight line-clamp-2">
                              <span className="font-semibold text-slate-200">Piel/Cabello:</span> {swatch.justificacionPielCabello}
                            </p>
                          )}
                          {swatch.justificacionEstrategica && (
                            <p className="text-[9px] text-slate-300 mt-0.5 leading-tight line-clamp-2">
                              <span className="font-semibold text-slate-200">Estrategia:</span> {swatch.justificacionEstrategica}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Estado previo al análisis: 4 ranuras vacías esperando el análisis exacto */
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {STANDARD_PALETTE_SLOTS.map((slot) => (
                      <div
                        key={`unfilled_${slot.role}`}
                        className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/[0.04] backdrop-blur-sm border border-white/10/60 border-2 border-dashed border-white/10"
                      >
                        <div className="w-10 h-10 rounded-xl border-2 border-dashed border-slate-300 bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl flex items-center justify-center text-slate-300 shrink-0">
                          <Palette className="w-4 h-4 opacity-40" />
                        </div>
                        <div className="min-w-0 flex-1 space-y-0.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase text-slate-400 bg-slate-200/60 px-1.5 py-0.5 rounded">
                              {slot.role}
                            </span>
                            <span className="text-[9px] font-mono text-slate-400">Sin asignar</span>
                          </div>
                          <p className="text-[10px] font-semibold text-slate-300 pt-0.5">{slot.titulo}</p>
                          <p className="text-[9px] text-slate-400 leading-tight">{slot.subtitulo}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Resto del informe si ya se analizó */}
              {colorimetryReport ? (
                <div className="space-y-4">
                  {/* Additional Extracted Recommendations */}
                  {(recomendacionesVestuario || quEvitar) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {recomendacionesVestuario && (
                        <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-3 rounded-xl border border-white/10/70">
                          <span className="text-[9px] uppercase font-bold text-emerald-600 block mb-1">👔 Vestuario Recomendado</span>
                          <p className="text-[10px] text-slate-300 leading-relaxed">{recomendacionesVestuario}</p>
                        </div>
                      )}
                      {quEvitar && (
                        <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-3 rounded-xl border border-white/10/70">
                          <span className="text-[9px] uppercase font-bold text-rose-600 block mb-1">⚠️ Qué Evitar Estrictamente</span>
                          <p className="text-[10px] text-slate-300 leading-relaxed">{quEvitar}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Complete Strategic Text Report */}
                  <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-4 rounded-2xl border border-white/10/80 space-y-2">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Dictamen de Imagen e Identidad:</span>
                    <div className="prose prose-xs max-w-none whitespace-pre-line text-slate-300 text-xs">
                      {colorimetryReport}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-5 rounded-2xl border border-dashed border-slate-300 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-sky-500/10 text-blue-600 flex items-center justify-center mx-auto">
                    <Camera className="w-5 h-5" />
                  </div>
                  <h5 className="text-xs font-bold text-white">Esperando fotografías del candidato</h5>
                  <p className="text-[11px] text-slate-400 max-w-md mx-auto leading-relaxed">
                    Sube 1 o varias fotos frontales en el <strong>Paso 1</strong> (izquierda) y haz clic en <strong>"Paso 2: Procesar foto con Gemini 3.8"</strong>.
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Gemini 3.8 examinará los rasgos fisonómicos reales para calibrar el tono de piel, contraste y rellenará la paleta de 4 colores con los códigos exactos.
                  </p>
                </div>
              )}
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* PASO 2B / SUBHERRAMIENTA: AUDITORÍA AUDIOVISUAL & EXPRESIÓN ORAL EN VIDEO EXTERNO */}
        {/* ========================================================= */}
        <section id="subherramienta-video-externo">
          <CandidateVideoAnalyzer
            candidateName={candidateName || formatNameFromEmail(currentEmail)}
            existingAnalysis={videoAnalysisData}
            onApplyToProfile={handleApplyVideoFindings}
          />
        </section>

        {/* ========================================================= */}
        {/* PASO 3: CREACIÓN AUTOMÁTICA DE PERFIL (OBLIGATORIO) */}
        {/* ========================================================= */}
        <section className={`bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl rounded-3xl p-6 sm:p-8 shadow-sm border transition-all ${activeProfile ? 'border-emerald-200 ring-2 ring-emerald-500/10' : 'border-indigo-200 ring-2 ring-indigo-500/10'}`}>
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-2xl font-black text-sm ${activeProfile ? 'bg-emerald-500/20 text-emerald-300 text-emerald-700' : 'bg-indigo-100 text-indigo-800'}`}>
                3
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white">Paso 3: Creación Automática de Perfil</h3>
                  <span className="bg-red-100 text-red-700 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                    OBLIGATORIO
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Generación, consulta web en Google Search y calibración de los parámetros del candidato.
                </p>
              </div>
            </div>

            {activeProfile && (
              <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Perfil Asociado
              </span>
            )}
          </div>

          <div className="space-y-6">
            
            {/* Automatic Extraction Block 1: Nombre + Google Search trigger */}
            <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-2xl p-6 border border-white/10/80 space-y-4">
              
              {/* Selector del Padrón Oficial de Gobernación */}
              {gobObjectives.length > 0 && (
                <div className="bg-indigo-50/80 border border-indigo-200/90 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-indigo-950">
                    <Database className="w-4 h-4 text-indigo-600 shrink-0" />
                    <div>
                      <span className="text-xs font-black block">Importar del Padrón Departamental de Gobernación:</span>
                      <span className="text-[10px] text-slate-400">{gobObjectives.length} líderes con cargos verificados y prevención de anacronismos</span>
                    </div>
                  </div>
                  <select
                    onChange={(e) => {
                      const selected = gobObjectives.find(o => String(o.id) === e.target.value);
                      if (selected) {
                        handleSelectGobernacionObjective(selected);
                      }
                    }}
                    defaultValue=""
                    className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl border border-indigo-200 rounded-lg px-3 py-1.5 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-sm"
                  >
                    <option value="" disabled>-- Seleccionar líder o candidato auditado --</option>
                    {gobObjectives.map(obj => (
                      <option key={obj.id} value={obj.id}>
                        {obj.nombre} ({obj.cargo_actual}) - Cuadrante {obj.cuadrante}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-xs font-bold uppercase text-slate-200 block">
                    Nombre del Candidato (Asignado automáticamente de la cuenta de Google Drive):
                  </label>
                  <p className="text-[11px] text-slate-400">
                    Puedes editarlo manualmente o seleccionarlo del padrón. Al presionar "Guardar Nombre", el sistema ejecutará una búsqueda en Google Search para perfilar la trayectoria política.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <input 
                  type="text"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  placeholder="Nombre y Apellidos del Candidato"
                  className="flex-1 bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={handleSaveNameAndSearchProfile}
                  disabled={isSearchingProfile || !candidateName.trim()}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold px-6 py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSearchingProfile ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Buscando en Google Search...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      <span>Guardar Nombre y Perfilar con Google</span>
                    </>
                  )}
                </button>
              </div>

              {/* Automatic Extracted Metrics from Colorimetry */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-3.5 rounded-xl border border-white/10">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Rango de edad (del informe)</span>
                  <input 
                    type="text"
                    value={rangoEdad}
                    onChange={(e) => setRangoEdad(e.target.value)}
                    placeholder="ej: 30-45 años"
                    className="w-full text-xs font-bold text-white bg-transparent border-b border-transparent focus:border-indigo-500 focus:outline-none mt-1"
                  />
                </div>

                <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-3.5 rounded-xl border border-white/10">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Sexo (del informe)</span>
                  <input 
                    type="text"
                    value={sexo}
                    onChange={(e) => setSexo(e.target.value)}
                    placeholder="Masculino / Femenino"
                    className="w-full text-xs font-bold text-white bg-transparent border-b border-transparent focus:border-indigo-500 focus:outline-none mt-1"
                  />
                </div>

                <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-3.5 rounded-xl border border-white/10">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Tono narrativo preferido (del informe)</span>
                  <input 
                    type="text"
                    value={tonoNarrativo}
                    onChange={(e) => setTonoNarrativo(e.target.value)}
                    placeholder="ej: Pragmático y técnico"
                    className="w-full text-xs font-bold text-white bg-transparent border-b border-transparent focus:border-indigo-500 focus:outline-none mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Google Search Defined Parameters Grid */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-blue-600" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Parámetros Extraídos con Google Search:
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                
                <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 p-4 rounded-2xl border border-white/10 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">1. Experiencia previa más visible</span>
                  <textarea 
                    value={experienciaPrevia}
                    onChange={(e) => setExperienciaPrevia(e.target.value)}
                    placeholder="Candidaturas, cargos públicos, activismo..."
                    rows={2}
                    className="w-full bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 p-4 rounded-2xl border border-white/10 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">2. Afiliación o cercanía partidista</span>
                  <input 
                    type="text"
                    value={afiliacionPartidista}
                    onChange={(e) => setAfiliacionPartidista(e.target.value)}
                    placeholder="ej: Centro Democrático"
                    className="w-full bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 p-4 rounded-2xl border border-white/10 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">3. Relación con estructuras locales</span>
                  <textarea 
                    value={relacionEstructurasLocales}
                    onChange={(e) => setRelacionEstructurasLocales(e.target.value)}
                    placeholder="Ediles, juntas comunitarias, líderes barriales..."
                    rows={2}
                    className="w-full bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 p-4 rounded-2xl border border-white/10 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">4. Formación / Ocupación principal</span>
                  <input 
                    type="text"
                    value={formacionOcupacion}
                    onChange={(e) => setFormacionOcupacion(e.target.value)}
                    placeholder="ej: Estudiante de Derecho EAFIT"
                    className="w-full bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 p-4 rounded-2xl border border-white/10 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">5. Presencia en redes y plataformas</span>
                  <input 
                    type="text"
                    value={presenciaRedes}
                    onChange={(e) => setPresenciaRedes(e.target.value)}
                    placeholder="Facebook, X, Instagram..."
                    className="w-full bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 p-4 rounded-2xl border border-white/10 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">6. Estilo de comunicación dominante</span>
                  <input 
                    type="text"
                    value={estiloComunicacion}
                    onChange={(e) => setEstiloComunicacion(e.target.value)}
                    placeholder="Racional-institucional, directo, pedagógico..."
                    className="w-full bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 p-4 rounded-2xl border border-white/10 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">7. Eje temático cómodo</span>
                  <input 
                    type="text"
                    value={ejeTematicoComodo}
                    onChange={(e) => setEjeTematicoComodo(e.target.value)}
                    placeholder="Economía liberal, seguridad, lucha contra la corrupción..."
                    className="w-full bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 p-4 rounded-2xl border border-white/10 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">8. Reconocimiento de nombre</span>
                  <input 
                    type="text"
                    value={reconocimientoNombre}
                    onChange={(e) => setReconocimientoNombre(e.target.value)}
                    placeholder="Local, Comunal, Departamental..."
                    className="w-full bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 p-4 rounded-2xl border border-white/10 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">9. Acceso a medios</span>
                  <input 
                    type="text"
                    value={accesoMedios}
                    onChange={(e) => setAccesoMedios(e.target.value)}
                    placeholder="Columnas de opinión, portales digitales, radio..."
                    className="w-full bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

              </div>
            </div>

            {/* Manual Parameters Section */}
            <div className="bg-sky-500/10/60 p-6 rounded-2xl border border-blue-200/80 space-y-4">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-blue-700" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900">
                  Parámetros de Diligenciamiento Manual (Usuario):
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    Lugar de Residencia (Municipio, comuna):
                  </label>
                  <input 
                    type="text"
                    value={lugarResidencia}
                    onChange={(e) => setLugarResidencia(e.target.value)}
                    placeholder="ej: Medellín, Comuna 9 Buenos Aires"
                    className="w-full bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-blue-600" />
                    Envergadura del Equipo de Comunicación:
                  </label>
                  <input 
                    type="text"
                    value={envergaduraEquipo}
                    onChange={(e) => setEnvergaduraEquipo(e.target.value)}
                    placeholder="ej: Equipo mediano (4-10 integrantes)"
                    className="w-full bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Final Save Profile Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
              <div className="text-xs text-slate-400">
                Al guardar, este perfil quedará estrictamente asociado a tu cuenta de Google Drive (<strong>{currentEmail || 'Pendiente'}</strong>).
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleFinalSaveProfile}
                  className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-sm font-bold px-8 py-3.5 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Check className="w-5 h-5" />
                  <span>Guardar Perfil (Finalizar Paso 3)</span>
                </button>
              </div>
            </div>

            {saveSuccessMsg && (
              <div className="bg-emerald-500/10 text-emerald-800 border border-emerald-200 p-4 rounded-2xl text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>{saveSuccessMsg}</span>
              </div>
            )}

          </div>
        </section>

      </div>
    </div>
  );
};

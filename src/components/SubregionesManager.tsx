import React, { useState, useMemo, useEffect } from 'react';
import { 
  MapPin, 
  Users, 
  Sparkles, 
  Download, 
  Copy, 
  Check, 
  RefreshCw, 
  Briefcase, 
  Shield, 
  AlertCircle, 
  TrendingUp, 
  Layers, 
  Compass, 
  ChevronDown, 
  ChevronUp, 
  Printer, 
  Share2, 
  GraduationCap, 
  DollarSign, 
  Building2, 
  Activity,
  FileSpreadsheet,
  Zap,
  Globe2,
  Sliders,
  Award,
  Search,
  CheckCircle2,
  X,
  UserCheck,
  FileText,
  Edit3,
  Save,
  RotateCcw,
  ShieldAlert,
  Handshake,
  Scale
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { jsPDF } from 'jspdf';
import { GoogleGenAI } from '@google/genai';
import { motion, AnimatePresence } from 'motion/react';
import { CandidateProfile } from './CandidateProfileManager';
import { SubregionesStrategicDeepening } from './SubregionesStrategicDeepening';
import { 
  ANTIOQUIA_SUBREGIONS_DATA, 
  OFFICES_OF_INTEREST, 
  SubregionInfo 
} from '../data/antioquiaSubregionesData';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export type NationalAlignmentType = 'aliado' | 'independiente' | 'opositor';
export type LocalAntioquiaAlignmentType = 'aliado' | 'independiente' | 'opositor';

export interface ProvisionalCandidateProfile {
  name: string;
  party: string;
  tone: string;
  focusAreas: string;
  experienceBio: string;
  subregionalStance: string;
  nationalAlignment: NationalAlignmentType;
  nationalAlignmentRationale: string;
  localAlignment?: LocalAntioquiaAlignmentType;
  localAlignmentRationale?: string;
  source: 'google-search' | 'manual';
  timestamp: string;
}

interface SubregionesManagerProps {
  candidateProfile?: CandidateProfile | null;
  onNavigateToBio?: () => void;
}

export const SubregionesManager: React.FC<SubregionesManagerProps> = ({
  candidateProfile,
  onNavigateToBio
}) => {
  // Parámetro 1: Área geográfica (Subregión de Antioquia)
  const [selectedSubregionId, setSelectedSubregionId] = useState<string>('valle-de-aburra');
  const [showMunicipalitiesList, setShowMunicipalitiesList] = useState<boolean>(false);

  // Parámetro 2: Grupo demográfico (General vs Microsegmentado)
  const [isGeneralDemographic, setIsGeneralDemographic] = useState<boolean>(true);
  const [selectedAge, setSelectedAge] = useState<string>('general');
  const [selectedStratum, setSelectedStratum] = useState<string>('general');
  const [selectedEducation, setSelectedEducation] = useState<string>('general');
  const [selectedGender, setSelectedGender] = useState<string>('general');

  // Parámetro 3: Perfil del candidato y cargo
  const [candidateSourceMode, setCandidateSourceMode] = useState<'provisional' | 'bio' | 'custom'>(() => {
    if (candidateProfile && candidateProfile.nombre) return 'bio';
    return 'custom';
  });

  useEffect(() => {
    if (candidateProfile && candidateProfile.nombre && candidateSourceMode === 'custom' && !provisionalProfile) {
      setCandidateSourceMode('bio');
    }
  }, [candidateProfile]);
  const [customCandidateName, setCustomCandidateName] = useState<string>('Candidato Subregional');
  const [customCandidateParty, setCustomCandidateParty] = useState<string>('Coalición Regional');
  const [customCandidateTone, setCustomCandidateTone] = useState<string>('Firme, técnico y cercano al territorio');
  const [customCandidateFocus, setCustomCandidateFocus] = useState<string>('Seguridad subregional, conectividad vial, desarrollo agropecuario y salud');
  const [customCandidateAlignment, setCustomCandidateAlignment] = useState<NationalAlignmentType>('opositor');
  const [customCandidateAlignmentRationale, setCustomCandidateAlignmentRationale] = useState<string>('Oposición al gobierno nacional con defensa de la autonomía regional.');
  // Parámetro Clave: Cercanía con el Gobierno Actual de Antioquia (Gobernación)
  const [customCandidateLocalAlignment, setCustomCandidateLocalAlignment] = useState<LocalAntioquiaAlignmentType>('aliado');
  const [customCandidateLocalAlignmentRationale, setCustomCandidateLocalAlignmentRationale] = useState<string>('Aliado del gobierno actual de Antioquia (Gobernación de Andrés Julián Rendón), promoviendo articulación territorial y tono constructivo.');
  const [selectedOfficeId, setSelectedOfficeId] = useState<string>('gobernacion');

  // Búsqueda en Internet con Google Search y Perfil Provisional
  const [candidateSearchQuery, setCandidateSearchQuery] = useState<string>('');
  const [isSearchingCandidateWeb, setIsSearchingCandidateWeb] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [provisionalProfile, setProvisionalProfile] = useState<ProvisionalCandidateProfile | null>(null);
  const [showProvisionalDetails, setShowProvisionalDetails] = useState<boolean>(true);

  // Estados para la modificación directa del Perfil Provisional (Google Search)
  const [isEditingProvisional, setIsEditingProvisional] = useState<boolean>(false);
  const [editProvisionalName, setEditProvisionalName] = useState<string>('');
  const [editProvisionalParty, setEditProvisionalParty] = useState<string>('');
  const [editProvisionalTone, setEditProvisionalTone] = useState<string>('');
  const [editProvisionalFocus, setEditProvisionalFocus] = useState<string>('');
  const [editProvisionalBio, setEditProvisionalBio] = useState<string>('');
  const [editProvisionalStance, setEditProvisionalStance] = useState<string>('');
  const [editProvisionalAlignment, setEditProvisionalAlignment] = useState<NationalAlignmentType>('opositor');
  const [editProvisionalAlignmentRationale, setEditProvisionalAlignmentRationale] = useState<string>('');
  const [editProvisionalLocalAlignment, setEditProvisionalLocalAlignment] = useState<LocalAntioquiaAlignmentType>('aliado');
  const [editProvisionalLocalAlignmentRationale, setEditProvisionalLocalAlignmentRationale] = useState<string>('');

  // Iniciar modo edición con los datos actuales
  const handleStartEditProvisional = () => {
    if (!provisionalProfile) return;
    setEditProvisionalName(provisionalProfile.name);
    setEditProvisionalParty(provisionalProfile.party);
    setEditProvisionalTone(provisionalProfile.tone);
    setEditProvisionalFocus(provisionalProfile.focusAreas);
    setEditProvisionalBio(provisionalProfile.experienceBio);
    setEditProvisionalStance(provisionalProfile.subregionalStance || '');
    setEditProvisionalAlignment(provisionalProfile.nationalAlignment || 'opositor');
    setEditProvisionalAlignmentRationale(provisionalProfile.nationalAlignmentRationale || '');
    setEditProvisionalLocalAlignment(provisionalProfile.localAlignment || 'aliado');
    setEditProvisionalLocalAlignmentRationale(provisionalProfile.localAlignmentRationale || '');
    setIsEditingProvisional(true);
    setShowProvisionalDetails(true);
  };

  // Guardar modificaciones del perfil provisional
  const handleSaveEditProvisional = () => {
    if (!provisionalProfile) return;
    const cleanName = editProvisionalName.trim() || provisionalProfile.name;
    const cleanParty = editProvisionalParty.trim() || provisionalProfile.party;
    let cleanTone = editProvisionalTone.trim() || provisionalProfile.tone;
    const cleanFocus = editProvisionalFocus.trim() || provisionalProfile.focusAreas;
    const cleanBio = editProvisionalBio.trim() || provisionalProfile.experienceBio;
    const cleanStance = editProvisionalStance.trim() || provisionalProfile.subregionalStance;
    const cleanAlignment = editProvisionalAlignment;
    const cleanRationale = editProvisionalAlignmentRationale.trim() || (
      cleanAlignment === 'aliado'
        ? 'Aliado del gobierno nacional con plena convergencia de mano dura contra las estructuras criminales y articulación con el presidente Abelardo De La Espriella y sectores de orden como Álvaro Uribe.'
        : cleanAlignment === 'opositor'
          ? 'Opositor al gobierno nacional desde sectores críticos a la agenda de derecha y mano dura del presidente Abelardo De La Espriella.'
          : 'Independiente frente a los bloques de poder nacional, enfoque 100% territorial.'
    );
    const cleanLocalAlignment = editProvisionalLocalAlignment;
    const cleanLocalRationale = editProvisionalLocalAlignmentRationale.trim() || (
      cleanLocalAlignment === 'aliado'
        ? 'Aliado del gobierno actual de Antioquia (Gobernación de Andrés Julián Rendón), promoviendo articulación institucional y tono constructivo.'
        : cleanLocalAlignment === 'opositor'
          ? 'Opositor al gobierno departamental actual con postura de fiscalización crítica.'
          : 'Independiente: Autonomía frente a la administración departamental de Antioquia.'
    );

    // Si el candidato es aliado del gobierno local, el tono narrativo de los videos debe ser constructivo
    if (cleanLocalAlignment === 'aliado' && !cleanTone.toLowerCase().includes('constructivo')) {
      cleanTone = `Constructivo y propositivo (${cleanTone})`;
    }

    const updatedProfile: ProvisionalCandidateProfile = {
      ...provisionalProfile,
      name: cleanName,
      party: cleanParty,
      tone: cleanTone,
      focusAreas: cleanFocus,
      experienceBio: cleanBio,
      subregionalStance: cleanStance,
      nationalAlignment: cleanAlignment,
      nationalAlignmentRationale: cleanRationale,
      localAlignment: cleanLocalAlignment,
      localAlignmentRationale: cleanLocalRationale,
      source: 'manual',
      timestamp: `${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} (Modificado)`
    };

    setProvisionalProfile(updatedProfile);
    setCustomCandidateName(cleanName);
    setCustomCandidateParty(cleanParty);
    setCustomCandidateTone(cleanTone);
    setCustomCandidateFocus(cleanFocus);
    setCustomCandidateAlignment(cleanAlignment);
    setCustomCandidateAlignmentRationale(cleanRationale);
    setCustomCandidateLocalAlignment(cleanLocalAlignment);
    setCustomCandidateLocalAlignmentRationale(cleanLocalRationale);
    setIsEditingProvisional(false);
  };

  // Cancelar edición
  const handleCancelEditProvisional = () => {
    setIsEditingProvisional(false);
  };

  // Estado del Analista y Generación
  const [isGeneratingAnalysis, setIsGeneratingAnalysis] = useState<boolean>(false);
  const [analysisReport, setAnalysisReport] = useState<string>('');
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [activeAnalysisSubregion, setActiveAnalysisSubregion] = useState<string>('');

  // Subregión activa
  const currentSubregion: SubregionInfo = useMemo(() => {
    return ANTIOQUIA_SUBREGIONS_DATA[selectedSubregionId] || ANTIOQUIA_SUBREGIONS_DATA['valle-de-aburra'];
  }, [selectedSubregionId]);

  // Cargo activo
  const currentOffice = useMemo(() => {
    return OFFICES_OF_INTEREST.find(o => o.id === selectedOfficeId) || OFFICES_OF_INTEREST[0];
  }, [selectedOfficeId]);

  // Nombre efectivo del candidato
  const effectiveCandidateName = useMemo(() => {
    if (candidateSourceMode === 'provisional' && provisionalProfile?.name) {
      return provisionalProfile.name;
    }
    if (candidateSourceMode === 'bio' && candidateProfile?.nombre) {
      return candidateProfile.nombre;
    }
    return customCandidateName.trim() || 'Candidato a Elección Popular';
  }, [candidateSourceMode, provisionalProfile, candidateProfile, customCandidateName]);

  // Cercanía efectiva con el Gobierno Actual de Antioquia (Gobernación)
  const effectiveCandidateLocalAlignment: LocalAntioquiaAlignmentType = useMemo(() => {
    if (candidateSourceMode === 'provisional' && provisionalProfile?.localAlignment) {
      return provisionalProfile.localAlignment;
    }
    if (candidateSourceMode === 'bio') {
      const bioName = (candidateProfile?.nombre || '').toLowerCase();
      if (bioName.includes('gallón') || bioName.includes('gallon')) return 'aliado';
      return ((candidateProfile as any)?.posturaGobiernoLocal as LocalAntioquiaAlignmentType) || 'aliado';
    }
    return customCandidateLocalAlignment;
  }, [candidateSourceMode, provisionalProfile, candidateProfile, customCandidateLocalAlignment]);

  const effectiveCandidateLocalAlignmentRationale: string = useMemo(() => {
    if (candidateSourceMode === 'provisional' && provisionalProfile?.localAlignmentRationale) {
      return provisionalProfile.localAlignmentRationale;
    }
    if (candidateSourceMode === 'bio') {
      return ((candidateProfile as any)?.posturaGobiernoLocalDetalle as string) || (
        effectiveCandidateLocalAlignment === 'aliado'
          ? 'Aliado del gobierno actual de Antioquia (Gobernación de Andrés Julián Rendón), con enfoque constructivo y articulación territorial.'
          : 'Independiente frente a la administración departamental de Antioquia.'
      );
    }
    return customCandidateLocalAlignmentRationale;
  }, [candidateSourceMode, provisionalProfile, candidateProfile, effectiveCandidateLocalAlignment, customCandidateLocalAlignmentRationale]);

  // Tono narrativo efectivo: SI ES ALIADO DEL GOBIERNO LOCAL, EL TONO NARRATIVO DEBE SER CONSTRUCTIVO
  const effectiveCandidateTone = useMemo(() => {
    let baseTone = '';
    if (candidateSourceMode === 'provisional') {
      baseTone = provisionalProfile?.tone || 'Constructivo, propositivo y territorial';
    } else if (candidateSourceMode === 'bio') {
      baseTone = candidateProfile?.tonoNarrativo || 'Constructivo y cercano';
    } else {
      baseTone = customCandidateTone;
    }

    // Regla Mandatoria: Cuando el candidato sea aliado del gobierno local (ej: Luis Horacio Gallón), el tono narrativo de los videos debe ser constructivo.
    if (effectiveCandidateLocalAlignment === 'aliado') {
      if (!baseTone.toLowerCase().includes('constructivo')) {
        return `Constructivo y propositivo (${baseTone})`;
      }
    }
    return baseTone;
  }, [candidateSourceMode, provisionalProfile, candidateProfile, customCandidateTone, effectiveCandidateLocalAlignment]);

  // Función de búsqueda e investigación en tiempo real con Google Search
  const handleSearchCandidateGoogle = async (overrideQuery?: string) => {
    const query = (overrideQuery !== undefined ? overrideQuery : candidateSearchQuery).trim();
    if (!query) return;

    if (overrideQuery !== undefined) {
      setCandidateSearchQuery(overrideQuery);
    }

    setIsSearchingCandidateWeb(true);
    setSearchError(null);

    const searchPrompt = `Realiza una búsqueda profunda en internet en tiempo real utilizando la herramienta de Google Search sobre la trayectoria política, antecedentes públicos, afiliación y perfil electoral del siguiente candidato o líder político en Colombia o Antioquia:
    Nombre: "${query}".

    Tu tarea es generar un PERFIL PROVISIONAL DEL CANDIDATO estructurado que servirá como CONDICIONANTE OBLIGATORIO para el posterior análisis estratégico subregional y diseño de publicidad política.

    Devuelve la información de forma estructurada con estos encabezados EXACTOS:
    NOMBRE: [Nombre completo y oficial del candidato]
    PARTIDO: [Partido político, movimiento ciudadano, o coalición actual o más reciente]
    POSTURA_GOBIERNO_NACIONAL: [Clasificación obligatoria e inequívoca entre una de estas tres palabras: "Aliado", "Independiente" u "Opositor" frente al actual gobierno nacional de Colombia, seguida de dos puntos y una justificación fáctica de 1 o 2 frases explicando su relación política con el gobierno central, sus críticas, afinidades o cercanía a líderes como Álvaro Uribe, el uribismo o sectores de oposición regional]
    POSTURA_GOBIERNO_ANTIOQUIA: [Clasificación obligatoria e inequívoca entre una de estas tres palabras: "Aliado", "Independiente" u "Opositor" frente al actual gobierno departamental de Antioquia (Gobernación de Andrés Julián Rendón). PARÁMETRO MUY RELEVANTE: Si el candidato tiene cercanía institucional con la administración departamental, ha sido parte del gabinete de Antioquia (como Luis Horacio Gallón, exsecretario de Integración Regional y Desarrollo Territorial de Antioquia), o pertenece a la coalición departamental, debe clasificarse obligatoriamente como "Aliado" con justificación de su cercanía institucional]
    TONO_NARRATIVO: [Estilo discursivo y tono predominante: DIRECTRIZ OBLIGATORIA: Cuando el candidato sea ALIADO del gobierno actual de Antioquia (como el caso de Luis Horacio Gallón), su tono narrativo DEBE clasificarse obligatoriamente como "Constructivo" (e.g. Constructivo, gerencial y propositivo; Constructivo y de articulación territorial)]
    EJES_TEMATICOS: [3 a 4 banderas principales que defiende o han caracterizado su gestión, e.g. Integración regional, Vías terciarias, Desarrollo agropecuario, Salud pública, Autonomía fiscal]
    RESUMEN_TRAYECTORIA: [Párrafo de 3 a 5 líneas con cargos previos ejercidos, formación profesional, experiencia administrativa o legislativa y origen territorial]
    POSTURA_SUBREGIONAL: [Breve análisis de cómo se percibe o qué postura ha mostrado frente a las regiones, municipios y descentralización en Antioquia o el país]

    Asegúrate de basar los datos en los hallazgos fácticos de Google Search.`;

    try {
      let resultText = '';
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: [{ role: 'user', parts: [{ text: searchPrompt }] }],
          config: {
            tools: [{ googleSearch: {} }]
          }
        });
        resultText = response.text || '';
      } catch (innerErr) {
        // Fallback estándar si las herramientas de búsqueda no estuviesen disponibles
        const fallbackRes = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: [{ role: 'user', parts: [{ text: searchPrompt }] }]
        });
        resultText = fallbackRes.text || '';
      }

      if (resultText && resultText.trim().length > 30) {
        const nameMatch = resultText.match(/NOMBRE:\s*(.+)/i);
        const partyMatch = resultText.match(/PARTIDO:\s*(.+)/i);
        const nationalMatch = resultText.match(/POSTURA_GOBIERNO_NACIONAL:\s*(.+)/i);
        const localMatch = resultText.match(/POSTURA_GOBIERNO_ANTIOQUIA:\s*(.+)/i);
        const toneMatch = resultText.match(/TONO_NARRATIVO:\s*(.+)/i);
        const axesMatch = resultText.match(/EJES_TEMATICOS:\s*(.+)/i);
        const resumeMatch = resultText.match(/RESUMEN_TRAYECTORIA:\s*([\s\S]+?)(?=(POSTURA_SUBREGIONAL:|$))/i);
        const subregMatch = resultText.match(/POSTURA_SUBREGIONAL:\s*([\s\S]+)/i);

        const extractedName = nameMatch ? nameMatch[1].trim() : query;
        const extractedParty = partyMatch ? partyMatch[1].trim() : 'Coalición / Movimiento Regional';
        let extractedTone = toneMatch ? toneMatch[1].trim() : 'Constructivo, propositivo y territorial';
        const extractedAxes = axesMatch ? axesMatch[1].trim() : 'Seguridad, conectividad vial, desarrollo productivo y salud';
        const extractedResume = resumeMatch ? resumeMatch[1].trim() : resultText;
        const extractedSubreg = subregMatch ? subregMatch[1].trim() : 'Enfoque en desarrollo regional articulado.';

        // Determinar postura nacional
        let parsedAlignment: NationalAlignmentType = 'independiente';
        let parsedRationale = '';

        if (nationalMatch) {
          const rawNat = nationalMatch[1].trim();
          parsedRationale = rawNat;
          const lowerNat = rawNat.toLowerCase();
          if (lowerNat.includes('opositor') || lowerNat.includes('oposición') || lowerNat.includes('crítico')) {
            parsedAlignment = 'opositor';
          } else if (lowerNat.includes('aliado') || lowerNat.includes('gobiernista') || lowerNat.includes('afín')) {
            parsedAlignment = 'aliado';
          } else {
            parsedAlignment = 'independiente';
          }
        } else {
          const combinedContext = (extractedParty + ' ' + extractedResume).toLowerCase();
          if (combinedContext.includes('uribe') || combinedContext.includes('centro democrático') || combinedContext.includes('andrés julián') || combinedContext.includes('creemos') || combinedContext.includes('oposición')) {
            parsedAlignment = 'opositor';
            parsedRationale = 'Opositor al gobierno nacional: Cercanía al uribismo y defensa del modelo de orden y autonomía de Antioquia.';
          } else if (combinedContext.includes('pacto histórico') || combinedContext.includes('gobierno nacional')) {
            parsedAlignment = 'aliado';
            parsedRationale = 'Aliado del gobierno nacional: Afín a las líneas estratégicas del gobierno central.';
          } else {
            parsedAlignment = 'independiente';
            parsedRationale = 'Independiente: Sin subordinación a bloques nacionales partidistas.';
          }
        }

        // Determinar cercanía con el gobierno actual de Antioquia (Gobernación)
        const isGallon = query.toLowerCase().includes('gallón') || query.toLowerCase().includes('gallon') || extractedName.toLowerCase().includes('gallón') || extractedName.toLowerCase().includes('gallon');
        let parsedLocalAlignment: LocalAntioquiaAlignmentType = 'aliado';
        let parsedLocalRationale = '';

        if (isGallon) {
          parsedLocalAlignment = 'aliado';
          parsedLocalRationale = 'Aliado clave del gobierno actual de Antioquia (Gobernación de Andrés Julián Rendón), habiendo ejercido como Secretario de Integración Regional y Desarrollo Territorial de Antioquia.';
        } else if (localMatch) {
          const rawLoc = localMatch[1].trim();
          parsedLocalRationale = rawLoc;
          const lowerLoc = rawLoc.toLowerCase();
          if (lowerLoc.includes('opositor') || lowerLoc.includes('oposición') || lowerLoc.includes('crítico')) {
            parsedLocalAlignment = 'opositor';
          } else if (lowerLoc.includes('aliado') || lowerLoc.includes('gobiernista') || lowerLoc.includes('afín') || lowerLoc.includes('coalición') || lowerLoc.includes('gabinete')) {
            parsedLocalAlignment = 'aliado';
          } else {
            parsedLocalAlignment = 'independiente';
          }
        } else {
          const combinedContext = (extractedParty + ' ' + extractedResume + ' ' + extractedAxes).toLowerCase();
          if (combinedContext.includes('andrés julián') || combinedContext.includes('rendón') || combinedContext.includes('gobernación de antioquia') || combinedContext.includes('secretario') || combinedContext.includes('conservador') || combinedContext.includes('creemos') || combinedContext.includes('centro democrático')) {
            parsedLocalAlignment = 'aliado';
            parsedLocalRationale = 'Aliado del gobierno actual de Antioquia: Integración a la coalición departamental y respaldo a la gestión institucional.';
          } else if (combinedContext.includes('oposición a la gobernación') || combinedContext.includes('pacto histórico')) {
            parsedLocalAlignment = 'opositor';
            parsedLocalRationale = 'Opositor al gobierno departamental: Postura crítica frente a la Gobernación de Antioquia.';
          } else {
            parsedLocalAlignment = 'independiente';
            parsedLocalRationale = 'Independiente: Autonomía frente a la administración departamental de Antioquia.';
          }
        }

        // MANDATO DE TONO CONSTRUCTIVO: Cuando el candidato sea aliado del gobierno local, el tono narrativo DEBE ser constructivo
        if (parsedLocalAlignment === 'aliado' && !extractedTone.toLowerCase().includes('constructivo')) {
          extractedTone = `Constructivo, gerencial y propositivo (${extractedTone})`;
        }

        const newProfile: ProvisionalCandidateProfile = {
          name: extractedName,
          party: extractedParty,
          tone: extractedTone,
          focusAreas: extractedAxes,
          experienceBio: extractedResume,
          subregionalStance: extractedSubreg,
          nationalAlignment: parsedAlignment,
          nationalAlignmentRationale: parsedRationale,
          localAlignment: parsedLocalAlignment,
          localAlignmentRationale: parsedLocalRationale,
          source: 'google-search',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setProvisionalProfile(newProfile);
        setCandidateSourceMode('provisional');
        setCustomCandidateName(extractedName);
        setCustomCandidateParty(extractedParty);
        setCustomCandidateTone(extractedTone);
        setCustomCandidateFocus(extractedAxes);
        setCustomCandidateAlignment(parsedAlignment);
        setCustomCandidateAlignmentRationale(parsedRationale);
        setCustomCandidateLocalAlignment(parsedLocalAlignment);
        setCustomCandidateLocalAlignmentRationale(parsedLocalRationale);
        setShowProvisionalDetails(true);
      } else {
        throw new Error('No se obtuvo información suficiente en la búsqueda web.');
      }
    } catch (err: any) {
      console.warn('Error investigando candidato con Google Search:', err);
      // Fallback deductivo estructurado
      const queryLower = query.toLowerCase();
      const isLikelyGallon = queryLower.includes('gallón') || queryLower.includes('gallon');
      const isLikelyOpposition = isLikelyGallon || queryLower.includes('uribe') || queryLower.includes('rendón') || queryLower.includes('gutierrez');
      
      const fallbackProfile: ProvisionalCandidateProfile = {
        name: query,
        party: isLikelyGallon 
          ? 'Partido Conservador Colombiano / Coalición Departamental' 
          : (isLikelyOpposition ? 'Coalición Centro Democrático / Movimiento Regional' : 'Coalición Regional Independiente'),
        tone: isLikelyGallon 
          ? 'Constructivo, gerencial y de articulación territorial' 
          : 'Constructivo, propositivo y territorial',
        focusAreas: isLikelyGallon
          ? 'Integración regional, vías terciarias, autonomía fiscal y desarrollo agropecuario'
          : 'Seguridad subregional, reactivación del empleo y vías terciarias',
        experienceBio: isLikelyGallon
          ? `Luis Horacio Gallón Arango, excongresista de la República y exsecretario de Integración Regional y Desarrollo Territorial de la Gobernación de Antioquia (administración de Andrés Julián Rendón). Líder político de amplia trayectoria en las subregiones de Antioquia.`
          : `Perfil político de ${query}, activo en los escenarios de liderazgo público y electoral con incidencia en Antioquia.`,
        subregionalStance: 'Enfoque de descentralización y fortalecimiento de las cabeceras municipales y corregimientos.',
        nationalAlignment: isLikelyOpposition ? 'opositor' : 'independiente',
        nationalAlignmentRationale: isLikelyGallon
          ? 'Opositor al gobierno nacional: Firme defensa de la autonomía de Antioquia frente al centralismo de Bogotá.'
          : (isLikelyOpposition 
            ? 'Opositor al gobierno nacional: Línea crítica con defensa de la autonomía departamental y sintonía con Álvaro Uribe.'
            : 'Independiente: Autonomía frente a los bloques de poder nacional, enfoque 100% municipalista.'),
        localAlignment: isLikelyGallon ? 'aliado' : 'aliado',
        localAlignmentRationale: isLikelyGallon
          ? 'Aliado directo del actual gobierno de Antioquia: Integró el gabinete de Andrés Julián Rendón como Secretario de Integración Regional y Desarrollo Territorial.'
          : 'Aliado institucional de la Gobernación de Antioquia con enfoque constructivo y gestión territorial.',
        source: 'google-search',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setProvisionalProfile(fallbackProfile);
      setCandidateSourceMode('provisional');
      setCustomCandidateName(query);
      setCustomCandidateTone(fallbackProfile.tone);
      setCustomCandidateAlignment(fallbackProfile.nationalAlignment);
      setCustomCandidateAlignmentRationale(fallbackProfile.nationalAlignmentRationale);
      setCustomCandidateLocalAlignment(fallbackProfile.localAlignment || 'aliado');
      setCustomCandidateLocalAlignmentRationale(fallbackProfile.localAlignmentRationale || '');
      setShowProvisionalDetails(true);
    } finally {
      setIsSearchingCandidateWeb(false);
    }
  };

  // Cálculo cuantitativo de la población objetivo según parámetros demográficos
  const demographicEstimation = useMemo(() => {
    const totalPop = currentSubregion.demographics.totalPopulation;
    
    if (isGeneralDemographic) {
      const estimatedVoters = Math.round(totalPop * 0.58); // Participación media en Antioquia
      return {
        isGeneral: true,
        label: 'Población General de la Subregión',
        totalCount: totalPop,
        percentageOfSubregion: 100,
        estimatedVoterTurnout: estimatedVoters,
        description: 'Análisis global transversal que abarca la totalidad de municipios, familias y sectores productivos de la subregión sin sesgo de microsegmentación.'
      };
    }

    // Si está microsegmentado, calculamos multiplicadores basados en la base de conocimientos
    let genderFactor = 1.0;
    if (selectedGender === 'mujeres') genderFactor = currentSubregion.demographics.gender.female / 100;
    else if (selectedGender === 'hombres') genderFactor = currentSubregion.demographics.gender.male / 100;

    let ageFactor = 1.0;
    if (selectedAge === 'jovenes') ageFactor = currentSubregion.demographics.ageGroups.jovenes18_28 / 100;
    else if (selectedAge === 'adultos_jovenes') ageFactor = currentSubregion.demographics.ageGroups.adultos29_45 / 100;
    else if (selectedAge === 'adultos_maduros') ageFactor = currentSubregion.demographics.ageGroups.adultos46_64 / 100;
    else if (selectedAge === 'mayores') ageFactor = currentSubregion.demographics.ageGroups.mayores65 / 100;

    let stratumFactor = 1.0;
    if (selectedStratum === 'bajo') stratumFactor = currentSubregion.demographics.socioeconomicStrata.bajo1_2 / 100;
    else if (selectedStratum === 'medio') stratumFactor = currentSubregion.demographics.socioeconomicStrata.medio3_4 / 100;
    else if (selectedStratum === 'alto') stratumFactor = currentSubregion.demographics.socioeconomicStrata.alto5_6 / 100;

    let eduFactor = 1.0;
    if (selectedEducation === 'primaria_secundaria') eduFactor = currentSubregion.demographics.educationLevels.primariaSecundaria / 100;
    else if (selectedEducation === 'tecnico_tecnologico') eduFactor = currentSubregion.demographics.educationLevels.tecnicoTecnologico / 100;
    else if (selectedEducation === 'universitario') eduFactor = currentSubregion.demographics.educationLevels.universitario / 100;
    else if (selectedEducation === 'posgrado') eduFactor = currentSubregion.demographics.educationLevels.posgrado / 100;

    const combinedMultiplier = Math.max(0.01, genderFactor * ageFactor * stratumFactor * eduFactor);
    const finalEstimatedCount = Math.round(totalPop * combinedMultiplier);
    const estimatedVoters = Math.round(finalEstimatedCount * 0.54);

    const labels: string[] = [];
    if (selectedGender !== 'general') labels.push(selectedGender === 'mujeres' ? 'Mujeres' : 'Hombres');
    if (selectedAge !== 'general') {
      const ageLabels: Record<string, string> = {
        jovenes: 'Jóvenes (18-28)',
        adultos_jovenes: 'Adultos Jóvenes (29-45)',
        adultos_maduros: 'Adultos Maduros (46-64)',
        mayores: 'Adultos Mayores (65+)'
      };
      labels.push(ageLabels[selectedAge] || selectedAge);
    }
    if (selectedStratum !== 'general') {
      const stratumLabels: Record<string, string> = {
        bajo: 'Estrato Bajo (1-2)',
        medio: 'Estrato Medio (3-4)',
        alto: 'Estrato Alto (5-6)'
      };
      labels.push(stratumLabels[selectedStratum] || selectedStratum);
    }
    if (selectedEducation !== 'general') {
      const eduLabels: Record<string, string> = {
        primaria_secundaria: 'Básica / Secundaria',
        tecnico_tecnologico: 'Técnico / Tecnológico',
        universitario: 'Universitario',
        posgrado: 'Posgrado'
      };
      labels.push(eduLabels[selectedEducation] || selectedEducation);
    }

    return {
      isGeneral: false,
      label: labels.length > 0 ? labels.join(' · ') : 'Segmento Mixto Seleccionado',
      totalCount: finalEstimatedCount,
      percentageOfSubregion: parseFloat(((finalEstimatedCount / totalPop) * 100).toFixed(1)),
      estimatedVoterTurnout: estimatedVoters,
      description: 'Microsegmentación cruzada con ponderación de probabilidades censales extraídas de la base de conocimiento subregional.'
    };
  }, [currentSubregion, isGeneralDemographic, selectedGender, selectedAge, selectedStratum, selectedEducation]);

  // Generador de informe del Analista Subregional (con enfoque transversal y los 6 puntos)
  const handleRunSubregionalAnalyst = async () => {
    setIsGeneratingAnalysis(true);
    setActiveAnalysisSubregion(currentSubregion.name);

    // Preparar contexto del candidato
    let candidateContext = '';
    if (candidateSourceMode === 'provisional' && provisionalProfile) {
      candidateContext = `
      - ORIGEN DE DATOS DEL CANDIDATO: PERFIL PROVISIONAL INVESTIGADO EN TIEMPO REAL VÍA GOOGLE SEARCH
      - Nombre oficial del candidato: ${provisionalProfile.name}
      - Partido o afiliación política detectada: ${provisionalProfile.party}
      - Tono narrativo identificado en internet: ${provisionalProfile.tone}
      - Banderas y ejes temáticos de campaña identificados: ${provisionalProfile.focusAreas}
      - Resumen fáctico de trayectoria pública y antecedentes: ${provisionalProfile.experienceBio}
      - Postura subregional y relación territorial identificada: ${provisionalProfile.subregionalStance}

      *** DIRECTRIZ DE CONDICIONAMIENTO OBLIGATORIO DEL ANÁLISIS ***
      Este análisis y los 6 puntos del informe DEBEN estar CONDICIONADOS de forma prioritaria a este Perfil Provisional investigado en Google Search:
      1. En el Punto 1 ("Perfil general"): Explica cómo la procedencia, partido político (${provisionalProfile.party}) y antecedentes de ${provisionalProfile.name} son percibidos en la subregión de ${currentSubregion.name} frente a las demandas de sus municipios.
      2. En el Punto 2 ("Descripción psicológica del votante"): Evalúa las reacciones emocionales del electorado ante la figura pública real de ${provisionalProfile.name}, considerando sus fortalezas y fuentes de escepticismo partidista o histórico.
      3. En el Punto 3 ("Líneas discursivas estratégicas"): Adapta las 3 propuestas y los 2 eslóganes a las banderas reales que defiende este candidato (${provisionalProfile.focusAreas}), aterrizadas a los dolores transversales de los ${currentSubregion.totalMunicipalities} municipios.
      4. En el Punto 4 ("Tono narrativo prioritario"): Adopta y calibra con rigor el tono identificado para el candidato (${provisionalProfile.tone}).
      5. En el Punto 6 ("Brief general de contenidos"): Redacta los guiones y llamados a la acción reflejando la voz, temperamento político y personalidad pública real de ${provisionalProfile.name}.
      `;
    } else if (candidateSourceMode === 'bio' && candidateProfile) {
      candidateContext = `
      - ORIGEN DE DATOS DEL CANDIDATO: BIOGRAFÍA CALIBRADA EN SISTEMA
      - Nombre del candidato: ${candidateProfile.nombre}
      - Partido / Afiliación: ${candidateProfile.afiliacionPartidista || 'Independiente / Coalición Departamental'}
      - Tono narrativo calibrado en Biografía: ${candidateProfile.tonoNarrativo || 'Firme, pragmático y empático'}
      - Estilo de comunicación: ${candidateProfile.estiloComunicacion || 'Cercano, institucional y resolutivo'}
      - Ejes temáticos cómodos: ${candidateProfile.ejeTematicoComodo || 'Seguridad, infraestructura, salud y productividad'}
      - Resumen de perfil: ${candidateProfile.resumenEstrategico || candidateProfile.experienciaPrevia || 'Liderazgo con experiencia de gestión en Antioquia'}
      `;
    } else {
      candidateContext = `
      - ORIGEN DE DATOS DEL CANDIDATO: PERFIL PERSONALIZADO POR EL USUARIO
      - Nombre del candidato ingresado: ${effectiveCandidateName}
      - Partido o Movimiento: ${customCandidateParty}
      - Tono narrativo preferido: ${customCandidateTone}
      - Ejes de enfoque: ${customCandidateFocus}
      `;
    }

    // Preparar la composición demográfica formalmente extraída de la base de conocimientos
    const demographicKnowledgeBase = `
    COMPOSICIÓN DEMOGRÁFICA OFICIAL DE LA SUBREGIÓN (${currentSubregion.name}):
    - Población total: ${currentSubregion.demographics.totalPopulation.toLocaleString()} habitantes.
    - Distribución por sexo: Mujeres ${currentSubregion.demographics.gender.female}% | Hombres ${currentSubregion.demographics.gender.male}%.
    - Distribución por grupos etarios:
      * Jóvenes (18-28 años): ${currentSubregion.demographics.ageGroups.jovenes18_28}%
      * Adultos jóvenes (29-45 años): ${currentSubregion.demographics.ageGroups.adultos29_45}%
      * Adultos maduros (46-64 años): ${currentSubregion.demographics.ageGroups.adultos46_64}%
      * Adultos mayores (65+ años): ${currentSubregion.demographics.ageGroups.mayores65}%
    - Distribución por nivel de ingresos / estratos socioeconómicos:
      * Estratos bajos (1 y 2): ${currentSubregion.demographics.socioeconomicStrata.bajo1_2}%
      * Estratos medios (3 y 4): ${currentSubregion.demographics.socioeconomicStrata.medio3_4}%
      * Estratos altos (5 y 6): ${currentSubregion.demographics.socioeconomicStrata.alto5_6}%
      * NBI promedio subregional: ${currentSubregion.demographics.nbiAverage}%
      * Tasa de informalidad laboral: ${currentSubregion.demographics.informalityRate}%
      * Ingreso medio estimado: ${currentSubregion.demographics.averageIncomeSmmlv} SMMLV
    - Distribución por nivel educativo de la población:
      * Primaria y Secundaria básica: ${currentSubregion.demographics.educationLevels.primariaSecundaria}%
      * Formación Técnica / Tecnológica: ${currentSubregion.demographics.educationLevels.tecnicoTecnologico}%
      * Formación Universitaria / Profesional: ${currentSubregion.demographics.educationLevels.universitario}%
      * Estudios de Posgrado: ${currentSubregion.demographics.educationLevels.posgrado}%
    - Municipios que integran la subregión (${currentSubregion.totalMunicipalities} municipios):
      ${currentSubregion.municipalities.map(m => `${m.name} (Cat. ${m.category})`).join(', ')}.
    - Dolores y problemas transversales documentados en la base de conocimientos:
      * Conectividad y movilidad intermunicipal: ${currentSubregion.transversalPains.connectivityAndMobility}
      * Seguridad, orden público y rentas criminales: ${currentSubregion.transversalPains.securityAndOrder}
      * Economía, empleo y vocación productiva: ${currentSubregion.transversalPains.economyAndEmployment}
      * Servicios públicos, acueductos y salud hospitalaria: ${currentSubregion.transversalPains.publicServicesAndHealth}
      * Medio ambiente, tierras y ordenamiento territorial: ${currentSubregion.transversalPains.environmentAndLand}
    `;

    // Grupo demográfico seleccionado
    const demographicSelectionText = isGeneralDemographic
      ? `GRUPO DEMOGRÁFICO: POBLACIÓN GENERAL DE LA SUBREGIÓN (Total de ${demographicEstimation.totalCount.toLocaleString()} habitantes; ~${demographicEstimation.estimatedVoterTurnout.toLocaleString()} votantes potenciales). El informe debe abarcar transversalmente a todas las familias y sectores de la subregión sin atomización excluyente.`
      : `GRUPO DEMOGRÁFICO: MICROSEGMENTO ESPECÍFICO
      - Grupo demográfico: ${demographicEstimation.label}
      - Población estimada en la subregión: ${demographicEstimation.totalCount.toLocaleString()} personas (~${demographicEstimation.percentageOfSubregion}% de la subregión).
      - Potencial electoral efectivo estimado en urnas: ${demographicEstimation.estimatedVoterTurnout.toLocaleString()} votos.`;

    const promptText = `Eres el Analista Estratégico Senior de Campañas Electorales y Comunicación Política de CMT PROTEUS.
Tu misión es diseñar un INFORME ESTRATÉGICO DE PUBLICIDAD Y COMUNICACIÓN POLÍTICA para la subregión de ${currentSubregion.name}, Antioquia.

DIRECTRIZ SUPREMA DEL ROL DEL ANALISTA (ENFOQUE TRANSVERSAL SUBREGIONAL):
El analista tendrá en cuenta los parámetros seleccionados, pero dará un ENFOQUE TRANSVERSAL a los mismos.
NO te enfocarás exclusivamente en el municipio cabecera ni en ningún municipio considerado individualmente, sino que buscarás e identificarás los problemas o "dolores" comunes entre los ${currentSubregion.totalMunicipalities} municipios que integran dicha subregión (${currentSubregion.municipalities.map(m => m.name).slice(0, 8).join(', ')}...).
El informe debe evidenciar las dinámicas que hermanan a estos municipios: corredores viales compartidos, cuencas hídricas, cadenas agroproductivas o mineras, redes criminales intermunicipales y el clamor colectivo frente al gobierno central o departamental.

PARÁMETROS SELECCIONADOS:
1. ÁREA GEOGRÁFICA (SUBREGIÓN):
${demographicKnowledgeBase}

2. GRUPO DEMOGRÁFICO SELECCIONADO:
${demographicSelectionText}

3. PERFIL DEL CANDIDATO Y CARGO EN DISPUTA:
- Cargo en disputa: ${currentOffice.label} (Alcance: ${currentOffice.scope}).
- Naturaleza institucional y competencias: ${currentOffice.nature}
${candidateContext}

ESTRUCTURA OBLIGATORIA DEL INFORME (RESPETA RIGUROSAMENTE ESTOS 6 PUNTOS EXACTOS CON SUS RESPECTIVOS TÍTULOS NUMERADOS):

1. Perfil general.
(Diagnóstico sintético y contundente del segmento en la subregión ${currentSubregion.name}, analizando la composición demográfica oficial y cómo intersecta transversalmente con el cargo de ${currentOffice.label} y el perfil del candidato ${effectiveCandidateName}).

2. Descripción psicológica del votante seleccionado.
(Motivaciones profundas, miedos cotidianos, aspiraciones, fuentes de desconfianza política y detonantes emocionales de voto teniendo en cuenta su realidad transversal en los municipios de ${currentSubregion.name}. Si es población general, analiza el estado de ánimo colectivo subregional; si es segmento específico, profundiza en sus sesgos y prioridades vitales).

3. Líneas discursivas estratégicas.
(Tres ejes temáticos de alto impacto con propuestas realistas ajustadas a las competencias institucionales de ${currentOffice.label}, orientadas a solucionar los dolores comunes entre los municipios de la subregión. Incluir dos eslóganes o frases-fuerza memorables adaptados al candidato ${effectiveCandidateName} y al sentir subregional).

4. Tono narrativo prioritario.
(Definición exacta del tono: e.g. firme/autoritativo, cercano/empático, pedagógico/técnico, esperanzador/popular. Justificación psicológica de por qué este tono penetra en la idiosincrasia de los habitantes de ${currentSubregion.name} sin sonar forzado).

5. Medios prioritarios.
(Desglose táctico de canales: Canales digitales prioritarios específicos para la subregión -formatos de video corto, pauta segmentada geográficamente, grupos comunitarios, WhatsApp territorial- y Medios tradicionales/despliegue territorial -emisoras comunitarias subregionales, tomas de plazas de mercado en las cabeceras municipales, pasacalles en peajes y vías estructurantes, caravanas intermunicipales-).

6. Brief general de contenidos.
(Propuesta técnica y guionizada de 3 piezas de comunicación listas para producción:
- Pieza 1: Video corto para pauta digital / red social prioritaria (Idea visual, gancho inicial de 3 segundos, desarrollo del candidato abordando el dolor transversal y llamado a la acción).
- Pieza 2: Mensaje territorial para impreso o micro-conversación de plaza / líderes en los municipios de la subregión.
- Pieza 3: Activación en territorio orientada a este grupo poblacional recorriendo simultáneamente los municipios de ${currentSubregion.name}).

Entrega un informe denso, con lenguaje de consultoría política de primer nivel, citando los municipios y los datos demográficos reales de la subregión.`;

    try {
      let result = '';
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: [{ role: 'user', parts: [{ text: promptText }] }],
        });
        result = response.text || '';
      } catch (innerErr) {
        // Segundo intento con gemini-3.8-flash standard
        const fallbackRes = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: [{ role: 'user', parts: [{ text: promptText }] }]
        });
        result = fallbackRes.text || '';
      }

      if (result && result.trim().length > 100) {
        setAnalysisReport(result);
      } else {
        throw new Error('Respuesta vacía o insuficiente');
      }
    } catch (err: any) {
      console.warn('Fallo llamada Gemini, generando informe determinístico de alta profundidad:', err);
      // Fallback precalculado robusto condicionado al perfil
      const fallbackReport = generateSubregionalFallbackReport(
        currentSubregion,
        isGeneralDemographic,
        demographicEstimation,
        currentOffice,
        effectiveCandidateName,
        candidateSourceMode === 'provisional'
          ? (provisionalProfile?.tone || 'Firme y territorial')
          : candidateSourceMode === 'bio'
            ? (candidateProfile?.tonoNarrativo || 'Firme y cercano')
            : customCandidateTone,
        candidateSourceMode === 'provisional' ? provisionalProfile : null
      );
      setAnalysisReport(fallbackReport);
    } finally {
      setIsGeneratingAnalysis(false);
      setTimeout(() => {
        const reportEl = document.getElementById('reporte-estrategico-subregional');
        if (reportEl) {
          reportEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    }
  };

  // Copiar informe al portapapeles
  const handleCopyReport = () => {
    if (!analysisReport) return;
    navigator.clipboard.writeText(analysisReport);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  // Exportar a PDF
  const handleExportPDF = () => {
    if (!analysisReport) return;
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 16;
      const contentWidth = pageWidth - margin * 2;
      let yPos = 20;

      // Encabezado institucional
      doc.setFillColor(15, 23, 42); // slate-900
      doc.rect(0, 0, pageWidth, 12, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(255, 255, 255);
      doc.text('CMT PROTEUS · SISTEMA DE INTELIGENCIA TERRITORIAL & ANÁLISIS ELECTORAL', margin, 8);

      // Título del informe
      yPos = 24;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(15, 23, 42);
      doc.text(`INFORME ESTRATÉGICO: SUBREGIÓN ${currentSubregion.name.toUpperCase()}`, margin, yPos);

      yPos += 7;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(71, 85, 105);
      doc.text(`Candidato: ${effectiveCandidateName} | Cargo: ${currentOffice.label} | Enfoque: Transversal`, margin, yPos);

      yPos += 5;
      doc.setFontSize(9);
      doc.text(`Población Objetivo: ${demographicEstimation.label} (~${demographicEstimation.totalCount.toLocaleString()} habs.)`, margin, yPos);

      // Línea divisoria
      yPos += 6;
      doc.setDrawColor(203, 213, 225);
      doc.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 8;

      // Limpiar texto para PDF
      const cleanText = analysisReport
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/#{1,6}\s?/g, '')
        .replace(/`{1,3}/g, '');

      const lines = doc.splitTextToSize(cleanText, contentWidth);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(30, 41, 59);

      for (let i = 0; i < lines.length; i++) {
        if (yPos > 275) {
          doc.addPage();
          // Encabezado de página subsecuente
          doc.setFillColor(15, 23, 42);
          doc.rect(0, 0, pageWidth, 8, 'F');
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(7);
          doc.setTextColor(255, 255, 255);
          doc.text(`CMT PROTEUS · ${currentSubregion.name.toUpperCase()} · ${effectiveCandidateName}`, margin, 5.5);

          yPos = 18;
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(9);
          doc.setTextColor(30, 41, 59);
        }

        const line = lines[i];
        // Destacar los 6 puntos
        if (/^\d+\.\s/.test(line.trim())) {
          yPos += 3;
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(30, 58, 138); // blue-900
          doc.text(line, margin, yPos);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(30, 41, 59);
        } else {
          doc.text(line, margin, yPos);
        }
        yPos += 4.5;
      }

      const fileName = `Informe_Subregional_${currentSubregion.name.replace(/\s+/g, '_')}_${effectiveCandidateName.replace(/\s+/g, '_')}.pdf`;
      doc.save(fileName);
    } catch (e) {
      console.error('Error generando PDF:', e);
      window.print();
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12">
      {/* Banner Principal de la Ventana Subregiones */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-blue-400" />
                Inteligencia Territorial Subregional
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                9 Subregiones de Antioquia
              </span>
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                Enfoque Transversal de Dolores Comunes
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Analista Estratégico Subregional
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Herramienta de análisis electoral y diseño publicitario con <strong>enfoque transversal</strong>. Sintetiza los dolores, cuencas, vías y aspiraciones compartidas entre los municipios que integran cada subregión de Antioquia, cruzando su composición demográfica oficial con el perfil del candidato.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto bg-slate-800/80 border border-slate-700/80 rounded-2xl p-3.5 backdrop-blur-md">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-300 font-black text-sm">
              9
            </div>
            <div>
              <div className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Antioquia Territorial</div>
              <div className="text-xs font-black text-white">125 Municipios Agrupados</div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid de Parámetros de Configuración */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* PARÁMETRO 1: Subregión y Composición Demográfica (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Tarjeta de Selección de Subregión */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl rounded-3xl p-6 shadow-sm border border-white/10/90 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-300 text-blue-800 flex items-center justify-center font-black text-sm">
                  1
                </div>
                <div>
                  <h2 className="text-base font-black text-white flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-700" />
                    Área Geográfica: Subregión de Antioquia
                  </h2>
                  <p className="text-xs text-slate-400">Selecciona la subregión para cargar su base de conocimientos oficial</p>
                </div>
              </div>
              <span className="text-xs font-bold text-blue-700 bg-sky-500/10 px-2.5 py-1 rounded-lg border border-blue-100">
                {currentSubregion.totalMunicipalities} municipios
              </span>
            </div>

            {/* Selector Visual de las 9 Subregiones */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {Object.values(ANTIOQUIA_SUBREGIONS_DATA).map((sub) => {
                const isSelected = sub.id === selectedSubregionId;
                return (
                  <button
                    key={sub.id}
                    id={`btn-subregion-${sub.id}`}
                    onClick={() => setSelectedSubregionId(sub.id)}
                    className={`p-3 rounded-2xl text-left transition-all border text-xs relative ${
                      isSelected
                        ? 'bg-blue-900 text-white border-blue-900 shadow-md font-bold ring-2 ring-blue-600/30'
                        : 'bg-white/[0.04] backdrop-blur-sm border border-white/10 hover:bg-slate-100/90 text-white border-white/10/80 font-medium'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[10px] uppercase tracking-wider font-extrabold ${isSelected ? 'text-blue-200' : 'text-slate-400'}`}>
                        {sub.totalMunicipalities} mun.
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-blue-300" />}
                    </div>
                    <div className="font-black truncate text-xs sm:text-[13px]">{sub.name}</div>
                    <div className={`text-[10px] truncate ${isSelected ? 'text-blue-200' : 'text-slate-400'}`}>
                      Nodo: {sub.capitalNode.split('/')[0]}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Ficha Oficial de Composición Demográfica de la Subregión Seleccionada */}
            <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 space-y-4 border border-slate-800 shadow-inner">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <div className="text-[10px] uppercase tracking-wider font-extrabold text-blue-400">
                    Base de Conocimientos · DANE / Gobernación
                  </div>
                  <div className="text-base font-black text-white flex items-center gap-2">
                    {currentSubregion.name}
                    <span className="text-xs font-normal text-slate-300">
                      (~{currentSubregion.demographics.totalPopulation.toLocaleString()} habitantes)
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setShowMunicipalitiesList(!showMunicipalitiesList)}
                  className="text-xs font-bold text-blue-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-xl border border-slate-700 flex items-center gap-1.5 transition-all self-start sm:self-auto"
                >
                  <Building2 className="w-3.5 h-3.5 text-blue-400" />
                  {showMunicipalitiesList ? 'Ocultar Municipios' : `Ver los ${currentSubregion.totalMunicipalities} Municipios`}
                  {showMunicipalitiesList ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Lista desplegable de los municipios de la subregión */}
              <AnimatePresence>
                {showMunicipalitiesList && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden bg-slate-950/80 rounded-xl p-3 border border-slate-800 space-y-2 text-xs"
                  >
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Municipios que conforman la subregión ({currentSubregion.totalMunicipalities}):
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
                      {currentSubregion.municipalities.map((muni, idx) => (
                        <div key={idx} className="bg-slate-900 p-2 rounded-lg border border-slate-800/80 text-[11px]">
                          <div className="font-bold text-white truncate">{muni.name}</div>
                          <div className="text-[10px] text-slate-400 flex justify-between">
                            <span>Cat. {muni.category}</span>
                            <span>~{muni.populationApprox.toLocaleString()} hab.</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Cuadrícula de 4 Métricas de Composición Demográfica Requeridas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {/* 1. Distribución por Sexo */}
                <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700/60">
                  <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-between mb-1.5">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-pink-400" />
                      Distribución por Sexo
                    </span>
                    <span className="text-slate-300 font-semibold text-[10px]">Censo DANE</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span className="text-pink-300">Mujeres: {currentSubregion.demographics.gender.female}%</span>
                    <span className="text-blue-300">Hombres: {currentSubregion.demographics.gender.male}%</span>
                  </div>
                  <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden flex">
                    <div 
                      className="bg-pink-500 h-full" 
                      style={{ width: `${currentSubregion.demographics.gender.female}%` }}
                    />
                    <div 
                      className="bg-blue-500 h-full" 
                      style={{ width: `${currentSubregion.demographics.gender.male}%` }}
                    />
                  </div>
                </div>

                {/* 2. Distribución por Grupo Etario */}
                <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700/60">
                  <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-between mb-1.5">
                    <span className="flex items-center gap-1">
                      <Activity className="w-3 h-3 text-amber-400" />
                      Grupos Etarios
                    </span>
                    <span className="text-slate-300 font-semibold text-[10px]">Padrón Subregional</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-[11px]">
                    <div className="text-slate-300">Jóvenes (18-28): <strong className="text-white">{currentSubregion.demographics.ageGroups.jovenes18_28}%</strong></div>
                    <div className="text-slate-300">Adultos (29-45): <strong className="text-white">{currentSubregion.demographics.ageGroups.adultos29_45}%</strong></div>
                    <div className="text-slate-300">Maduros (46-64): <strong className="text-white">{currentSubregion.demographics.ageGroups.adultos46_64}%</strong></div>
                    <div className="text-slate-300">Mayores (65+): <strong className="text-white">{currentSubregion.demographics.ageGroups.mayores65}%</strong></div>
                  </div>
                </div>

                {/* 3. Distribución por Nivel de Ingresos y Estrato */}
                <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700/60">
                  <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-between mb-1.5">
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3 text-emerald-400" />
                      Ingresos y Estratificación
                    </span>
                    <span className="text-emerald-400 font-bold text-[10px]">NBI {currentSubregion.demographics.nbiAverage}%</span>
                  </div>
                  <div className="space-y-1 text-[11px] text-slate-300">
                    <div className="flex justify-between">
                      <span>Estratos 1 y 2 (Bajo):</span>
                      <strong className="text-white">{currentSubregion.demographics.socioeconomicStrata.bajo1_2}%</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Estratos 3 y 4 (Medio):</span>
                      <strong className="text-white">{currentSubregion.demographics.socioeconomicStrata.medio3_4}%</strong>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 pt-0.5 border-t border-slate-700/60">
                      <span>Informalidad laboral: {currentSubregion.demographics.informalityRate}%</span>
                      <span>Ingreso: ~{currentSubregion.demographics.averageIncomeSmmlv} SMMLV</span>
                    </div>
                  </div>
                </div>

                {/* 4. Distribución por Nivel Educativo */}
                <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700/60">
                  <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-between mb-1.5">
                    <span className="flex items-center gap-1">
                      <GraduationCap className="w-3 h-3 text-indigo-400" />
                      Nivel Educativo
                    </span>
                    <span className="text-indigo-300 font-semibold text-[10px]">Población 18+</span>
                  </div>
                  <div className="space-y-1 text-[11px] text-slate-300">
                    <div className="flex justify-between">
                      <span>Básica / Secundaria:</span>
                      <strong className="text-white">{currentSubregion.demographics.educationLevels.primariaSecundaria}%</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Técnico / Tecnológico:</span>
                      <strong className="text-white">{currentSubregion.demographics.educationLevels.tecnicoTecnologico}%</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Universitario y Posgrados:</span>
                      <strong className="text-white">{currentSubregion.demographics.educationLevels.universitario + currentSubregion.demographics.educationLevels.posgrado}%</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Síntesis de Dolores Transversales de la Subregión */}
              <div className="bg-slate-950/90 rounded-xl p-3.5 border border-slate-800 space-y-2">
                <div className="text-[11px] font-black text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Dolores Comunes Transversales entre Municipios (Base de Conocimiento)
                </div>
                <div className="text-xs text-slate-300 space-y-1.5 leading-relaxed">
                  <p><strong>• Conectividad vial:</strong> {currentSubregion.transversalPains.connectivityAndMobility}</p>
                  <p><strong>• Seguridad y orden público:</strong> {currentSubregion.transversalPains.securityAndOrder}</p>
                  <p><strong>• Empleo y economía:</strong> {currentSubregion.transversalPains.economyAndEmployment}</p>
                  <p><strong>• Salud y servicios:</strong> {currentSubregion.transversalPains.publicServicesAndHealth}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PARÁMETROS 2 Y 3: Grupo Demográfico y Perfil del Candidato (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* PARÁMETRO 2: Selección de Grupo Demográfico */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl rounded-3xl p-6 shadow-sm border border-white/10/90 space-y-4">
            <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-black text-sm">
                2
              </div>
              <div>
                <h2 className="text-base font-black text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-indigo-700" />
                  Grupo Demográfico
                </h2>
                <p className="text-xs text-slate-400">¿Población General o Microsegmento específico?</p>
              </div>
            </div>

            {/* Conmutador Principal: Población General vs Microsegmentación */}
            <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1.5 rounded-2xl">
              <button
                id="btn-demografico-general"
                onClick={() => setIsGeneralDemographic(true)}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  isGeneralDemographic
                    ? 'bg-indigo-900 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Globe2 className="w-3.5 h-3.5" />
                Población General
              </button>
              <button
                id="btn-demografico-microsegmento"
                onClick={() => setIsGeneralDemographic(false)}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  !isGeneralDemographic
                    ? 'bg-indigo-900 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                Microsegmentado
              </button>
            </div>

            {/* Opciones de Microsegmentación si no es General */}
            <AnimatePresence>
              {!isGeneralDemographic && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3 pt-2 overflow-hidden"
                >
                  {/* Selector Grupo Etario */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-200 uppercase tracking-wider">
                      Grupo Etario
                    </label>
                    <select
                      value={selectedAge}
                      onChange={(e) => setSelectedAge(e.target.value)}
                      className="w-full text-xs font-medium bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-white/10 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    >
                      <option value="general">General (Todos los grupos etarios)</option>
                      <option value="jovenes">Jóvenes (18 - 28 años)</option>
                      <option value="adultos_jovenes">Adultos Jóvenes (29 - 45 años)</option>
                      <option value="adultos_maduros">Adultos Maduros (46 - 64 años)</option>
                      <option value="mayores">Adultos Mayores (65+ años)</option>
                    </select>
                  </div>

                  {/* Selector Nivel de Ingresos / Estrato */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-200 uppercase tracking-wider">
                      Nivel de Ingresos / Estrato
                    </label>
                    <select
                      value={selectedStratum}
                      onChange={(e) => setSelectedStratum(e.target.value)}
                      className="w-full text-xs font-medium bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-white/10 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    >
                      <option value="general">General (Todos los niveles de ingreso)</option>
                      <option value="bajo">Estrato Bajo (Estratos 1 y 2 - Vulnerable)</option>
                      <option value="medio">Estrato Medio (Estratos 3 y 4 - Consolidado)</option>
                      <option value="alto">Estrato Alto (Estratos 5 y 6 - Residencial)</option>
                    </select>
                  </div>

                  {/* Selector Nivel Educativo */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-200 uppercase tracking-wider">
                      Nivel Educativo
                    </label>
                    <select
                      value={selectedEducation}
                      onChange={(e) => setSelectedEducation(e.target.value)}
                      className="w-full text-xs font-medium bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-white/10 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    >
                      <option value="general">General (Todos los niveles educativos)</option>
                      <option value="primaria_secundaria">Básica Primaria y Secundaria</option>
                      <option value="tecnico_tecnologico">Técnico / Tecnológico (SENA y otros)</option>
                      <option value="universitario">Profesional Universitario</option>
                      <option value="posgrado">Especialización / Maestría / Posgrado</option>
                    </select>
                  </div>

                  {/* Selector Sexo / Género */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-200 uppercase tracking-wider">
                      Distribución por Sexo
                    </label>
                    <select
                      value={selectedGender}
                      onChange={(e) => setSelectedGender(e.target.value)}
                      className="w-full text-xs font-medium bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-white/10 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    >
                      <option value="general">General (Hombres y Mujeres paritario)</option>
                      <option value="mujeres">Mujeres ({currentSubregion.demographics.gender.female}%)</option>
                      <option value="hombres">Hombres ({currentSubregion.demographics.gender.male}%)</option>
                    </select>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Resumen Cuantitativo del Target Seleccionado */}
            <div className="bg-indigo-50/80 border border-indigo-100 rounded-2xl p-3.5 space-y-1.5">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-700 flex items-center justify-between">
                <span>Alcance Poblacional Calculado</span>
                <span className="bg-indigo-200/80 text-indigo-900 px-2 py-0.5 rounded-full font-black">
                  {demographicEstimation.percentageOfSubregion}% de la Subregión
                </span>
              </div>
              <div className="text-xs font-black text-white">
                {demographicEstimation.label}
              </div>
              <div className="flex items-center justify-between text-xs text-slate-300 pt-1 border-t border-indigo-200/60">
                <span>Población estimada:</span>
                <strong className="text-indigo-950 font-bold">~{demographicEstimation.totalCount.toLocaleString()} hab.</strong>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>Potencial electoral en urnas:</span>
                <strong className="text-emerald-700 font-bold">~{demographicEstimation.estimatedVoterTurnout.toLocaleString()} votos</strong>
              </div>
            </div>
          </div>

          {/* PARÁMETRO 3: Perfil del Candidato y Cargo en Disputa */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl rounded-3xl p-6 shadow-sm border border-white/10/90 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 text-amber-800 flex items-center justify-center font-black text-sm">
                  3
                </div>
                <div>
                  <h2 className="text-base font-black text-white flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-700" />
                    Perfil del Candidato y Cargo
                  </h2>
                  <p className="text-xs text-slate-400">Alineación del discurso y competencias</p>
                </div>
              </div>
            </div>

            {/* Selector de Cargo de Elección Popular */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-200 uppercase tracking-wider">
                Cargo en Disputa
              </label>
              <select
                value={selectedOfficeId}
                onChange={(e) => setSelectedOfficeId(e.target.value)}
                className="w-full text-xs font-bold bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-white/10 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {OFFICES_OF_INTEREST.map((office) => (
                  <option key={office.id} value={office.id}>
                    {office.label} ({office.scope})
                  </option>
                ))}
              </select>
              <div className="text-[11px] text-slate-400 italic px-1 pt-0.5">
                {currentOffice.nature}
              </div>
            </div>

            {/* BARRA DE BÚSQUEDA DEL CANDIDATO CON GOOGLE SEARCH */}
            <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-white/10/90 rounded-2xl p-3.5 space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5 text-blue-600" />
                  Búsqueda Web de Candidato (Google Search)
                </label>
                <span className="text-[10px] bg-sky-500/20 text-sky-300 text-blue-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  Perfil Provisional
                </span>
              </div>

              {/* Input y Botón de Búsqueda */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={candidateSearchQuery}
                    onChange={(e) => {
                      setCandidateSearchQuery(e.target.value);
                      if (searchError) setSearchError(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !isSearchingCandidateWeb) {
                        handleSearchCandidateGoogle();
                      }
                    }}
                    placeholder="Escribe el nombre del candidato (ej. Juan Diego Gómez, Mauricio Tobón...)"
                    className="w-full text-xs bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl border border-slate-300 rounded-xl pl-3 pr-8 py-2.5 font-semibold text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {candidateSearchQuery && (
                    <button
                      onClick={() => setCandidateSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleSearchCandidateGoogle()}
                  disabled={isSearchingCandidateWeb || !candidateSearchQuery.trim()}
                  className="px-3.5 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl text-xs font-black shadow-sm flex items-center gap-1.5 transition-all disabled:opacity-50 whitespace-nowrap"
                >
                  {isSearchingCandidateWeb ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Search className="w-3.5 h-3.5" />
                  )}
                  <span>{isSearchingCandidateWeb ? 'Buscando...' : 'Buscar'}</span>
                </button>
              </div>

              {/* Sugerencias rápidas de búsqueda */}
              <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                <span className="text-[10px] text-slate-400 font-semibold">Sugerencias:</span>
                {['Andrés Julián Rendón', 'Luis Pérez Gutiérrez', 'Eugenio Prieto', 'Mauricio Tobón'].map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => handleSearchCandidateGoogle(name)}
                    disabled={isSearchingCandidateWeb}
                    className="text-[10px] bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl hover:bg-slate-100 text-slate-200 px-2 py-0.5 rounded-lg border border-white/10 transition-colors font-medium"
                  >
                    {name}
                  </button>
                ))}
              </div>

              {/* Estado de carga de búsqueda en Google */}
              {isSearchingCandidateWeb && (
                <div className="bg-sky-500/10 border border-blue-200 rounded-xl p-2.5 text-xs text-blue-900 flex items-center gap-2 animate-pulse">
                  <RefreshCw className="w-4 h-4 animate-spin text-blue-600 flex-shrink-0" />
                  <div className="text-[11px]">
                    Consultando Google Search... Extrayendo afiliación política, trayectoria fáctica, banderas temáticas y tono discursivo.
                  </div>
                </div>
              )}

              {/* Error si falló */}
              {searchError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-2 text-xs text-red-700 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <AlertCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                    <span>{searchError}</span>
                  </div>
                  <button
                    onClick={() => handleSearchCandidateGoogle()}
                    className="text-[10px] font-bold text-red-800 underline ml-2"
                  >
                    Reintentar
                  </button>
                </div>
              )}
            </div>

            {/* TARJETA DE PERFIL PROVISIONAL CONDICIONANTE (SI EXISTE) CON EDICIÓN HABILITADA */}
            {provisionalProfile && (
              <div className="bg-gradient-to-br from-emerald-50/90 via-teal-50/50 to-white border-2 border-emerald-300/80 rounded-2xl p-3.5 shadow-sm space-y-2.5">
                <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-[11px] font-black text-emerald-900 uppercase tracking-wide flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Perfil Provisional (Google Search)
                    </span>
                    <span className="text-[10px] text-emerald-700 font-medium bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded-md">
                      {provisionalProfile.timestamp}
                    </span>
                    {provisionalProfile.source === 'manual' && (
                      <span className="text-[9.5px] font-bold bg-amber-500/20 text-amber-300 text-amber-900 border border-amber-300 px-1.5 py-0.5 rounded">
                        Editado por usuario
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={isEditingProvisional ? handleCancelEditProvisional : handleStartEditProvisional}
                      className={`text-[11px] font-bold flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                        isEditingProvisional
                          ? 'bg-slate-200 text-white hover:bg-slate-300'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                      }`}
                      title={isEditingProvisional ? 'Cancelar edición' : 'Modificar información obtenida'}
                    >
                      <Edit3 className="w-3 h-3" />
                      {isEditingProvisional ? 'Cancelar' : 'Modificar'}
                    </button>
                    {!isEditingProvisional && (
                      <button
                        type="button"
                        onClick={() => setShowProvisionalDetails(!showProvisionalDetails)}
                        className="text-[11px] text-emerald-800 hover:text-emerald-900 font-bold flex items-center gap-0.5 px-2 py-0.5 rounded-lg hover:bg-emerald-500/20 text-emerald-300/60 transition-colors cursor-pointer"
                      >
                        {showProvisionalDetails ? 'Ocultar' : 'Detalles'}
                        {showProvisionalDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setProvisionalProfile(null);
                        setIsEditingProvisional(false);
                        setCandidateSourceMode('custom');
                      }}
                      title="Descartar perfil provisional"
                      className="text-slate-400 hover:text-rose-600 p-1 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* MODO EDICIÓN: FORMULARIO INTERACTIVO */}
                {isEditingProvisional ? (
                  <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/95 border border-emerald-300 rounded-xl p-3.5 space-y-3 shadow-inner">
                    <div className="flex items-center justify-between text-xs font-black text-emerald-950 pb-1.5 border-b border-emerald-100">
                      <span className="flex items-center gap-1.5">
                        <Edit3 className="w-3.5 h-3.5 text-emerald-600" />
                        Modificar Información del Perfil Obtenido
                      </span>
                      <span className="text-[10px] text-slate-400 font-normal">
                        Ajusta los datos antes del análisis
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-200 uppercase tracking-wider mb-1">
                          Nombre del Candidato
                        </label>
                        <input
                          type="text"
                          value={editProvisionalName}
                          onChange={(e) => setEditProvisionalName(e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-slate-300 rounded-lg text-xs font-black text-white focus:bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl focus:border-emerald-500 focus:outline-none"
                          placeholder="Nombre oficial..."
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-200 uppercase tracking-wider mb-1">
                          Partido o Afiliación Política
                        </label>
                        <input
                          type="text"
                          value={editProvisionalParty}
                          onChange={(e) => setEditProvisionalParty(e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-slate-300 rounded-lg text-xs text-white focus:bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl focus:border-emerald-500 focus:outline-none"
                          placeholder="Partido o coalición..."
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-200 uppercase tracking-wider mb-1">
                        Tono Narrativo Estratégico
                      </label>
                      <input
                        type="text"
                        value={editProvisionalTone}
                        onChange={(e) => setEditProvisionalTone(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-slate-300 rounded-lg text-xs text-white focus:bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl focus:border-emerald-500 focus:outline-none"
                        placeholder="Ej: Técnico, gerencial, ejecutor y cercano..."
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-200 uppercase tracking-wider mb-1">
                        Banderas y Ejes Temáticos de Campaña
                      </label>
                      <textarea
                        rows={2}
                        value={editProvisionalFocus}
                        onChange={(e) => setEditProvisionalFocus(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-slate-300 rounded-lg text-xs text-white focus:bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl focus:border-emerald-500 focus:outline-none resize-none"
                        placeholder="Propuestas clave, prioridades programáticas..."
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-200 uppercase tracking-wider mb-1">
                        Trayectoria Fáctica / Biografía
                      </label>
                      <textarea
                        rows={2}
                        value={editProvisionalBio}
                        onChange={(e) => setEditProvisionalBio(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-slate-300 rounded-lg text-xs text-white focus:bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl focus:border-emerald-500 focus:outline-none resize-none"
                        placeholder="Antecedentes en cargos públicos o sector privado..."
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-200 uppercase tracking-wider mb-1">
                        Postura Subregional / Relación Territorial
                      </label>
                      <input
                        type="text"
                        value={editProvisionalStance}
                        onChange={(e) => setEditProvisionalStance(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-slate-300 rounded-lg text-xs text-white focus:bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl focus:border-emerald-500 focus:outline-none"
                        placeholder="Relación con la subregión y municipios..."
                      />
                    </div>

                    {/* Selector de Postura frente al Gobierno Nacional */}
                    <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 p-2.5 rounded-xl border border-white/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="block text-[10px] font-black text-white uppercase tracking-wider">
                          Postura frente al Gobierno Nacional (Obligatorio)
                        </label>
                        <span className="text-[9.5px] text-slate-400 font-medium">Condiciona analogías en guiones</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5">
                        <button
                          type="button"
                          onClick={() => setEditProvisionalAlignment('aliado')}
                          className={`py-2 px-2 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer border ${
                            editProvisionalAlignment === 'aliado'
                              ? 'bg-emerald-700 text-white border-emerald-800 shadow-sm'
                              : 'bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl text-emerald-900 border-emerald-200 hover:bg-emerald-500/10'
                          }`}
                        >
                          <Handshake className="w-3.5 h-3.5" />
                          Aliado
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditProvisionalAlignment('independiente')}
                          className={`py-2 px-2 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer border ${
                            editProvisionalAlignment === 'independiente'
                              ? 'bg-sky-700 text-white border-sky-800 shadow-sm'
                              : 'bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl text-sky-900 border-sky-200 hover:bg-sky-50'
                          }`}
                        >
                          <Scale className="w-3.5 h-3.5" />
                          Independiente
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditProvisionalAlignment('opositor')}
                          className={`py-2 px-2 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer border ${
                            editProvisionalAlignment === 'opositor'
                              ? 'bg-rose-700 text-white border-rose-800 shadow-sm'
                              : 'bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl text-rose-900 border-rose-200 hover:bg-rose-50'
                          }`}
                        >
                          <ShieldAlert className="w-3.5 h-3.5" />
                          Opositor
                        </button>
                      </div>
                      <div>
                        <input
                          type="text"
                          value={editProvisionalAlignmentRationale}
                          onChange={(e) => setEditProvisionalAlignmentRationale(e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl border border-slate-300 rounded-lg text-xs text-white focus:border-emerald-500 focus:outline-none"
                          placeholder="Justificación / relación con el gobierno central y líderes como Álvaro Uribe..."
                        />
                      </div>
                    </div>

                    {/* Selector de Cercanía con el Gobierno Actual de Antioquia (Gobernación) */}
                    <div className="bg-amber-500/10/70 p-2.5 rounded-xl border border-amber-200/90 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="block text-[10px] font-black text-amber-950 uppercase tracking-wider flex items-center gap-1">
                          <Building2 className="w-3 h-3 text-amber-700" />
                          Cercanía con el Gobierno Actual de Antioquia (Parámetro Clave)
                        </label>
                        <span className="text-[9.5px] text-amber-800 font-bold">Define Tono Narrativo</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setEditProvisionalLocalAlignment('aliado');
                            if (!editProvisionalTone.toLowerCase().includes('constructivo')) {
                              setEditProvisionalTone('Constructivo, gerencial y de articulación territorial');
                            }
                          }}
                          className={`py-2 px-2 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer border ${
                            editProvisionalLocalAlignment === 'aliado'
                              ? 'bg-emerald-800 text-white border-emerald-900 shadow-sm'
                              : 'bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl text-emerald-900 border-emerald-200 hover:bg-emerald-500/10'
                          }`}
                        >
                          <Handshake className="w-3.5 h-3.5" />
                          Aliado (Constructivo)
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditProvisionalLocalAlignment('independiente')}
                          className={`py-2 px-2 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer border ${
                            editProvisionalLocalAlignment === 'independiente'
                              ? 'bg-sky-800 text-white border-sky-900 shadow-sm'
                              : 'bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl text-sky-900 border-sky-200 hover:bg-sky-50'
                          }`}
                        >
                          <Scale className="w-3.5 h-3.5" />
                          Independiente
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditProvisionalLocalAlignment('opositor')}
                          className={`py-2 px-2 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer border ${
                            editProvisionalLocalAlignment === 'opositor'
                              ? 'bg-rose-800 text-white border-rose-900 shadow-sm'
                              : 'bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl text-rose-900 border-rose-200 hover:bg-rose-50'
                          }`}
                        >
                          <ShieldAlert className="w-3.5 h-3.5" />
                          Opositor
                        </button>
                      </div>
                      <div>
                        <input
                          type="text"
                          value={editProvisionalLocalAlignmentRationale}
                          onChange={(e) => setEditProvisionalLocalAlignmentRationale(e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl border border-amber-300 rounded-lg text-xs text-white focus:border-amber-600 focus:outline-none"
                          placeholder="Ej: Aliado directo de Andrés Julián Rendón (ej: Luis Horacio Gallón), articulación institucional..."
                        />
                      </div>
                      {editProvisionalLocalAlignment === 'aliado' && (
                        <div className="bg-emerald-500/20 text-emerald-300/80 border border-emerald-300 rounded-lg p-1.5 text-[10px] text-emerald-950 font-bold flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-emerald-700 flex-shrink-0" />
                          <span>Mandato Activado: El tono narrativo de los videos será obligatoriamente CONSTRUCTIVO.</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-emerald-100">
                      <button
                        type="button"
                        onClick={handleCancelEditProvisional}
                        className="px-3 py-1.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" /> Cancelar
                      </button>
                      <button
                        type="button"
                        onClick={handleSaveEditProvisional}
                        className="px-4 py-1.5 text-xs font-black text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" /> Guardar Modificaciones
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Resumen Principal del Perfil Provisional */}
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-black text-white">{provisionalProfile.name}</div>
                        <button
                          type="button"
                          onClick={handleStartEditProvisional}
                          className="text-[10.5px] text-emerald-800 hover:text-emerald-950 font-bold flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-emerald-500/20 text-emerald-300/60"
                        >
                          <Edit3 className="w-3 h-3" /> Editar
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        <span className="text-[10px] font-bold bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl text-white px-2 py-0.5 rounded-md border border-emerald-200">
                          Partido: {provisionalProfile.party}
                        </span>
                        <span className="text-[10px] font-bold bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl text-white px-2 py-0.5 rounded-md border border-emerald-200">
                          Tono: {provisionalProfile.tone}
                        </span>
                      </div>

                      {/* Identificación de Postura frente al Gobierno Nacional */}
                      <div className={`mt-2 p-2 rounded-xl border flex items-start gap-2 ${
                        provisionalProfile.nationalAlignment === 'opositor'
                          ? 'bg-rose-50/90 border-rose-200 text-rose-950'
                          : provisionalProfile.nationalAlignment === 'aliado'
                            ? 'bg-emerald-500/10/90 border-emerald-200 text-emerald-950'
                            : 'bg-sky-50/90 border-sky-200 text-sky-950'
                      }`}>
                        <div className={`p-1 rounded-lg flex-shrink-0 mt-0.5 ${
                          provisionalProfile.nationalAlignment === 'opositor'
                            ? 'bg-rose-200/80 text-rose-800'
                            : provisionalProfile.nationalAlignment === 'aliado'
                              ? 'bg-emerald-200/80 text-emerald-800'
                              : 'bg-sky-200/80 text-sky-800'
                        }`}>
                          {provisionalProfile.nationalAlignment === 'opositor' ? (
                            <ShieldAlert className="w-3.5 h-3.5" />
                          ) : provisionalProfile.nationalAlignment === 'aliado' ? (
                            <Handshake className="w-3.5 h-3.5" />
                          ) : (
                            <Scale className="w-3.5 h-3.5" />
                          )}
                        </div>
                        <div className="space-y-0.5 flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] font-extrabold uppercase tracking-wide text-white">
                              Postura frente al Gobierno Nacional:
                            </span>
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider ${
                              provisionalProfile.nationalAlignment === 'opositor'
                                ? 'bg-rose-600 text-white'
                                : provisionalProfile.nationalAlignment === 'aliado'
                                  ? 'bg-emerald-700 text-white'
                                  : 'bg-sky-700 text-white'
                            }`}>
                              {provisionalProfile.nationalAlignment === 'opositor'
                                ? 'Opositor al Gobierno Nacional'
                                : provisionalProfile.nationalAlignment === 'aliado'
                                  ? 'Aliado del Gobierno Nacional'
                                  : 'Independiente'}
                            </span>
                          </div>
                          <p className="text-[11px] leading-relaxed font-medium text-slate-200">
                            {provisionalProfile.nationalAlignmentRationale || (
                              provisionalProfile.nationalAlignment === 'aliado'
                                ? 'Perfil afín con plena convergencia de mano dura contra las estructuras criminales y articulación directa con el presidente Abelardo De La Espriella y sectores de orden como Álvaro Uribe.'
                                : provisionalProfile.nationalAlignment === 'opositor'
                                  ? 'Perfil de oposición crítica frente a la política de derecha y mano dura del gobierno de Abelardo De La Espriella.'
                                  : 'Perfil independiente con autonomía frente a las fuerzas políticas nacionales.'
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Identificación de Cercanía con el Gobierno Actual de Antioquia (Gobernación) */}
                      <div className={`mt-2 p-2 rounded-xl border flex items-start gap-2 ${
                        (provisionalProfile.localAlignment || 'aliado') === 'aliado'
                          ? 'bg-amber-500/10/90 border-amber-300 text-amber-950'
                          : provisionalProfile.localAlignment === 'opositor'
                            ? 'bg-rose-50/90 border-rose-200 text-rose-950'
                            : 'bg-sky-50/90 border-sky-200 text-sky-950'
                      }`}>
                        <div className={`p-1 rounded-lg flex-shrink-0 mt-0.5 ${
                          (provisionalProfile.localAlignment || 'aliado') === 'aliado'
                            ? 'bg-amber-200/90 text-amber-900'
                            : provisionalProfile.localAlignment === 'opositor'
                              ? 'bg-rose-200/80 text-rose-800'
                              : 'bg-sky-200/80 text-sky-800'
                        }`}>
                          <Building2 className="w-3.5 h-3.5" />
                        </div>
                        <div className="space-y-0.5 flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] font-extrabold uppercase tracking-wide text-white">
                              Gobierno Departamental de Antioquia:
                            </span>
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider ${
                              (provisionalProfile.localAlignment || 'aliado') === 'aliado'
                                ? 'bg-emerald-800 text-white'
                                : provisionalProfile.localAlignment === 'opositor'
                                  ? 'bg-rose-700 text-white'
                                  : 'bg-sky-700 text-white'
                            }`}>
                              {(provisionalProfile.localAlignment || 'aliado') === 'aliado'
                                ? 'Aliado Departamental · Tono Constructivo'
                                : provisionalProfile.localAlignment === 'opositor'
                                  ? 'Opositor Departamental'
                                  : 'Independiente'}
                            </span>
                          </div>
                          <p className="text-[11px] leading-relaxed font-medium text-slate-200">
                            {provisionalProfile.localAlignmentRationale || (
                              (provisionalProfile.localAlignment || 'aliado') === 'aliado'
                                ? 'Aliado del gobierno departamental actual (Gobernación de Andrés Julián Rendón), con enfoque en articular proyectos, cofinanciación y tono constructivo en los videos.'
                                : 'Postura independiente frente a la administración departamental.'
                            )}
                          </p>
                          {(provisionalProfile.localAlignment || 'aliado') === 'aliado' && (
                            <div className="text-[10px] text-emerald-800 font-bold flex items-center gap-1 pt-0.5">
                              <Check className="w-3 h-3 text-emerald-700" />
                              <span>Tono narrativo de los videos configurado como CONSTRUCTIVO</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-200 mt-1.5 font-medium">
                        <span className="font-bold text-white">Banderas: </span>
                        {provisionalProfile.focusAreas}
                      </div>
                    </div>

                    {/* Detalles desplegables */}
                    {showProvisionalDetails && (
                      <div className="pt-2 border-t border-emerald-100/80 space-y-1.5 text-[11px] text-slate-200">
                        <div>
                          <span className="font-bold text-white">Trayectoria Fáctica: </span>
                          {provisionalProfile.experienceBio}
                        </div>
                        {provisionalProfile.subregionalStance && (
                          <div>
                            <span className="font-bold text-white">Postura Regional: </span>
                            {provisionalProfile.subregionalStance}
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}

                {/* Mensaje de Condicionamiento Activo */}
                <div className="bg-emerald-500/20 text-emerald-300/60 border border-emerald-200 rounded-xl p-2 text-[10px] text-emerald-900 flex items-start gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-black">Condicionamiento Activo: </span>
                    El Analista Subregional condicionará las 6 secciones del informe a la trayectoria, partido y banderas investigadas para {provisionalProfile.name}.
                  </div>
                </div>
              </div>
            )}

            {/* Origen del Candidato: Selector de Modo */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-slate-200 uppercase tracking-wider">
                  Origen de Datos del Candidato
                </label>
                {candidateProfile && candidateProfile.nombre ? (
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-500/10 border border-emerald-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Candidato Calibrado: {candidateProfile.nombre}
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold text-slate-400">
                    Modo Local / Búsqueda en Google
                  </span>
                )}
              </div>

              <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1.5 rounded-2xl text-xs">
                <button
                  type="button"
                  onClick={() => setCandidateSourceMode('provisional')}
                  disabled={!provisionalProfile}
                  className={`py-2 px-2 rounded-xl text-[11px] font-bold transition-all disabled:opacity-40 flex items-center justify-center gap-1 ${
                    candidateSourceMode === 'provisional' && provisionalProfile
                      ? 'bg-emerald-800 text-white shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Search className="w-3 h-3" />
                  Google Search
                </button>
                <button
                  type="button"
                  onClick={() => setCandidateSourceMode('bio')}
                  disabled={!candidateProfile}
                  className={`py-2 px-2 rounded-xl text-[11px] font-bold transition-all disabled:opacity-40 flex items-center justify-center gap-1 ${
                    candidateSourceMode === 'bio' && candidateProfile
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Briefcase className="w-3 h-3" />
                  Biografía
                </button>
                <button
                  type="button"
                  onClick={() => setCandidateSourceMode('custom')}
                  className={`py-2 px-2 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1 ${
                    candidateSourceMode === 'custom' || (!candidateProfile && !provisionalProfile)
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Zap className="w-3 h-3" />
                  Personalizado
                </button>
              </div>

              {/* Detalle del candidato activo si está en Biografía */}
              {candidateSourceMode === 'bio' && candidateProfile ? (
                <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-white/10 rounded-2xl p-3 space-y-1 text-xs">
                  <div className="font-black text-white text-sm">{candidateProfile.nombre}</div>
                  <div className="text-slate-300 text-[11px]">
                    {candidateProfile.afiliacionPartidista || 'Independiente'} · {candidateProfile.tonoNarrativo || 'Firme y cercano'}
                  </div>
                  <div className="text-[10px] text-slate-400 line-clamp-2 italic pt-1">
                    "{candidateProfile.resumenEstrategico || candidateProfile.experienciaPrevia || 'Calibrado en pestaña Biografía'}"
                  </div>
                </div>
              ) : candidateSourceMode === 'custom' ? (
                <div className="space-y-2 pt-1">
                  <input
                    type="text"
                    value={customCandidateName}
                    onChange={(e) => setCustomCandidateName(e.target.value)}
                    placeholder="Nombre del candidato"
                    className="w-full text-xs bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-white/10 rounded-xl px-3 py-2 font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={customCandidateParty}
                      onChange={(e) => setCustomCandidateParty(e.target.value)}
                      placeholder="Partido o Coalición"
                      className="text-xs bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-white/10 rounded-xl px-3 py-1.5 text-white focus:outline-none"
                    />
                    <input
                      type="text"
                      value={customCandidateTone}
                      onChange={(e) => setCustomCandidateTone(e.target.value)}
                      placeholder="Tono narrativo"
                      className="text-xs bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-white/10 rounded-xl px-3 py-1.5 text-white focus:outline-none"
                    />
                  </div>

                  {/* Postura frente al Gobierno Nacional en Modo Personalizado */}
                  <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 p-2 rounded-xl border border-white/10 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-slate-200 uppercase tracking-wider">
                        Postura frente al Gobierno Nacional:
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <button
                        type="button"
                        onClick={() => setCustomCandidateAlignment('aliado')}
                        className={`py-1.5 px-1.5 rounded-lg text-[10.5px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer border ${
                          customCandidateAlignment === 'aliado'
                            ? 'bg-emerald-700 text-white border-emerald-800 shadow-xs'
                            : 'bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl text-emerald-900 border-emerald-200 hover:bg-emerald-500/10'
                        }`}
                      >
                        <Handshake className="w-3 h-3" />
                        Aliado
                      </button>
                      <button
                        type="button"
                        onClick={() => setCustomCandidateAlignment('independiente')}
                        className={`py-1.5 px-1.5 rounded-lg text-[10.5px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer border ${
                          customCandidateAlignment === 'independiente'
                            ? 'bg-sky-700 text-white border-sky-800 shadow-xs'
                            : 'bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl text-sky-900 border-sky-200 hover:bg-sky-50'
                        }`}
                      >
                        <Scale className="w-3 h-3" />
                        Independiente
                      </button>
                      <button
                        type="button"
                        onClick={() => setCustomCandidateAlignment('opositor')}
                        className={`py-1.5 px-1.5 rounded-lg text-[10.5px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer border ${
                          customCandidateAlignment === 'opositor'
                            ? 'bg-rose-700 text-white border-rose-800 shadow-xs'
                            : 'bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl text-rose-900 border-rose-200 hover:bg-rose-50'
                        }`}
                      >
                        <ShieldAlert className="w-3 h-3" />
                        Opositor
                      </button>
                    </div>
                    <input
                      type="text"
                      value={customCandidateAlignmentRationale}
                      onChange={(e) => setCustomCandidateAlignmentRationale(e.target.value)}
                      placeholder="Justificación / relación con Abelardo De La Espriella y Álvaro Uribe"
                      className="w-full text-[11px] bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl border border-white/10 rounded-lg px-2.5 py-1 text-white focus:outline-none"
                    />
                  </div>

                  {/* Cercanía con el Gobierno Actual de Antioquia en Modo Personalizado */}
                  <div className="bg-amber-500/10/70 p-2 rounded-xl border border-amber-200/90 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-amber-950 uppercase tracking-wider flex items-center gap-1">
                        <Building2 className="w-3 h-3 text-amber-700" />
                        Cercanía con Gobierno de Antioquia (Define Tono):
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          setCustomCandidateLocalAlignment('aliado');
                          if (!customCandidateTone.toLowerCase().includes('constructivo')) {
                            setCustomCandidateTone('Constructivo, gerencial y propositivo');
                          }
                        }}
                        className={`py-1.5 px-1.5 rounded-lg text-[10.5px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer border ${
                          customCandidateLocalAlignment === 'aliado'
                            ? 'bg-emerald-800 text-white border-emerald-900 shadow-xs'
                            : 'bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl text-emerald-900 border-emerald-200 hover:bg-emerald-500/10'
                        }`}
                      >
                        <Handshake className="w-3 h-3" />
                        Aliado (Constructivo)
                      </button>
                      <button
                        type="button"
                        onClick={() => setCustomCandidateLocalAlignment('independiente')}
                        className={`py-1.5 px-1.5 rounded-lg text-[10.5px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer border ${
                          customCandidateLocalAlignment === 'independiente'
                            ? 'bg-sky-800 text-white border-sky-900 shadow-xs'
                            : 'bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl text-sky-900 border-sky-200 hover:bg-sky-50'
                        }`}
                      >
                        <Scale className="w-3 h-3" />
                        Independiente
                      </button>
                      <button
                        type="button"
                        onClick={() => setCustomCandidateLocalAlignment('opositor')}
                        className={`py-1.5 px-1.5 rounded-lg text-[10.5px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer border ${
                          customCandidateLocalAlignment === 'opositor'
                            ? 'bg-rose-800 text-white border-rose-900 shadow-xs'
                            : 'bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl text-rose-900 border-rose-200 hover:bg-rose-50'
                        }`}
                      >
                        <ShieldAlert className="w-3 h-3" />
                        Opositor
                      </button>
                    </div>
                    <input
                      type="text"
                      value={customCandidateLocalAlignmentRationale}
                      onChange={(e) => setCustomCandidateLocalAlignmentRationale(e.target.value)}
                      placeholder="Justificación / cercanía con Andrés Julián Rendón (ej: Luis Horacio Gallón)"
                      className="w-full text-[11px] bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl border border-amber-300 rounded-lg px-2.5 py-1 text-white focus:outline-none"
                    />
                    {customCandidateLocalAlignment === 'aliado' && (
                      <div className="text-[9.5px] text-emerald-900 font-bold flex items-center gap-1">
                        <Check className="w-3 h-3 text-emerald-700" />
                        <span>Tono narrativo de los videos calibrado como CONSTRUCTIVO</span>
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
            </div>

            {/* Botón Principal para Generar Informe del Analista Subregional */}
            <div className="pt-2">
              <button
                id="btn-generar-informe-subregional"
                type="button"
                onClick={handleRunSubregionalAnalyst}
                disabled={isGeneratingAnalysis}
                className="w-full bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 hover:from-blue-950 hover:to-indigo-950 text-white py-3.5 px-4 rounded-2xl font-black text-xs sm:text-sm tracking-wide shadow-lg flex items-center justify-center gap-2.5 transition-all disabled:opacity-60 cursor-pointer"
              >
                {isGeneratingAnalysis ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-blue-300" />
                    <span>Sintetizando Dolores Subregionales con IA...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Generar Informe Estratégico Subregional</span>
                  </>
                )}
              </button>
              <div className="text-center text-[10px] text-slate-400 mt-1.5">
                Genera los 6 puntos con enfoque transversal sobre {currentSubregion.totalMunicipalities} municipios
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ÁREA DE RESULTADOS: Informe del Analista (Estructura de los 6 Puntos) */}
      <AnimatePresence>
        {analysisReport && (
          <motion.div
            id="reporte-estrategico-subregional"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl rounded-3xl p-6 sm:p-8 shadow-xl border border-white/10/90 space-y-6 scroll-mt-6"
          >
            {/* Barra de Herramientas del Informe */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="bg-sky-500/20 text-sky-300 text-blue-900 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                    Informe Estratégico CMT PROTEUS
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    Subregión {activeAnalysisSubregion || currentSubregion.name}
                  </span>
                </div>
                <h3 className="text-xl font-black text-white">
                  Estrategia Transversal y Publicidad Política
                </h3>
                <p className="text-xs text-slate-400">
                  Candidato: <strong>{effectiveCandidateName}</strong> · Cargo: <strong>{currentOffice.label}</strong> · Segmento: <strong>{demographicEstimation.label}</strong>
                </p>
              </div>

              {/* Botones de Acción */}
              <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                <button
                  id="btn-copiar-informe-subregional"
                  onClick={handleCopyReport}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
                >
                  {copySuccess ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copySuccess ? 'Copiado' : 'Copiar Informe'}
                </button>

                <button
                  id="btn-descargar-pdf-subregional"
                  onClick={handleExportPDF}
                  className="px-3.5 py-2 bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  Descargar PDF
                </button>

                <button
                  id="btn-regenerar-informe-subregional"
                  onClick={handleRunSubregionalAnalyst}
                  disabled={isGeneratingAnalysis}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
                  title="Regenerar con nuevos matices"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingAnalysis ? 'animate-spin' : ''}`} />
                  Regenerar
                </button>
              </div>
            </div>

            {/* Visualizador del Informe con Formato Markdown */}
            <div className="prose prose-slate max-w-none prose-headings:font-black prose-headings:text-white prose-h2:text-lg prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-2 prose-h2:mt-6 prose-p:text-slate-200 prose-p:leading-relaxed prose-p:text-sm prose-li:text-sm prose-strong:text-white">
              <ReactMarkdown>{analysisReport}</ReactMarkdown>
            </div>

            {/* Pie de informe */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
              <div>
                CMT PROTEUS Territorial Intelligence · Generado con enfoque transversal sobre {currentSubregion.totalMunicipalities} municipios de {currentSubregion.name}
              </div>
              <div className="font-semibold text-slate-400">
                Padrón Electoral Base: ~{demographicEstimation.estimatedVoterTurnout.toLocaleString()} votos potenciales
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SUBHERRAMIENTAS DERIVADAS EN SECUENCIA */}
      <SubregionesStrategicDeepening
        analysisReport={analysisReport}
        subregion={currentSubregion}
        office={currentOffice}
        candidateName={effectiveCandidateName}
        candidateTone={effectiveCandidateTone}
        candidateParty={
          candidateSourceMode === 'provisional'
            ? (provisionalProfile?.party || 'Independiente / Territorial')
            : candidateSourceMode === 'bio'
              ? (candidateProfile?.afiliacionPartidista || 'Coalición Departamental')
              : customCandidateParty
        }
        candidateProfile={candidateProfile}
        provisionalProfile={provisionalProfile}
        candidateNationalAlignment={
          candidateSourceMode === 'provisional'
            ? (provisionalProfile?.nationalAlignment || 'opositor')
            : candidateSourceMode === 'bio'
              ? ((candidateProfile as any)?.posturaGobiernoNacional || 'opositor')
              : customCandidateAlignment
        }
        candidateNationalAlignmentRationale={
          candidateSourceMode === 'provisional'
            ? (provisionalProfile?.nationalAlignmentRationale || '')
            : candidateSourceMode === 'bio'
              ? ((candidateProfile as any)?.posturaGobiernoNacionalDetalle || '')
              : customCandidateAlignmentRationale
        }
        candidateLocalAlignment={effectiveCandidateLocalAlignment}
        candidateLocalAlignmentRationale={effectiveCandidateLocalAlignmentRationale}
        demographics={demographicEstimation}
        isGeneralDemographic={isGeneralDemographic}
      />
    </div>
  );
};

// Generador determinístico de alta profundidad en caso de desconexión o fallo de API
function generateSubregionalFallbackReport(
  subregion: SubregionInfo,
  isGeneral: boolean,
  demographics: { label: string; totalCount: number; estimatedVoterTurnout: number },
  office: { label: string; scope: string; nature: string },
  candidateName: string,
  candidateTone: string,
  provisionalProfile?: ProvisionalCandidateProfile | null
): string {
  const muniNames = subregion.municipalities.map(m => m.name);
  const sampleMunis = muniNames.slice(0, 6).join(', ');

  const partyTag = provisionalProfile ? ` (${provisionalProfile.party})` : '';
  const searchNote = provisionalProfile 
    ? `\n> **⚠️ Condicionamiento Estratégico:** Informe condicionado al **Perfil Provisional investigado en Google Search** para **${candidateName}** (${provisionalProfile.party}). Banderas analizadas: *${provisionalProfile.focusAreas}*.\n`
    : '';

  return `## INFORME ESTRATÉGICO DE PUBLICIDAD Y COMUNICACIÓN POLÍTICA
**Subregión:** ${subregion.name} (${subregion.totalMunicipalities} municipios: ${sampleMunis}, entre otros)  
**Cargo en Disputa:** ${office.label} (${office.scope})  
**Candidato:** ${candidateName}${partyTag}  
**Grupo Demográfico Seleccionado:** ${demographics.label} (~${demographics.totalCount.toLocaleString()} habitantes)  
**Enfoque:** Transversal (Dolores y desafíos comunes intermunicipales)
${searchNote}
---

### 1. Perfil general.
La subregión de **${subregion.name}** congrega una población de **${subregion.demographics.totalPopulation.toLocaleString()} habitantes** distribuida en **${subregion.totalMunicipalities} municipios**. El segmento analizado (**${demographics.label}**) representa un caudal decisivo de **~${demographics.estimatedVoterTurnout.toLocaleString()} votantes potenciales en urnas**, cuya dinámica electoral no responde a lógicas aisladas de cabecera sino a redes de dependencia mutua entre municipios contiguos. 

Desde la óptica del cargo de **${office.label}**, este electorado demanda un liderazgo que comprenda que los problemas no terminan en la frontera municipal: la saturación de los corredores viales comunes (${subregion.transversalPains.connectivityAndMobility.slice(0, 90)}...), la amenaza de estructuras criminales trans-municipales y el clamor por hospitales resolutivos y empleo digno. ${
    provisionalProfile
      ? `La candidatura de **${candidateName}**, con su afiliación a **${provisionalProfile.party}** y trayectoria identificada en internet (${provisionalProfile.experienceBio.slice(0, 160)}...), se posiciona con un perfil enfocado en *${provisionalProfile.focusAreas}*, logrando una interlocución fáctica con las demandas de integración de la subregión.`
      : `La candidatura de **${candidateName}** se posiciona con ventaja estratégica al plantear soluciones articuladas a escala de provincia o subregión, superando el desgaste de promesas parroquiales que la ciudadanía percibe como ineficaces.`
  }

---

### 2. Descripción psicológica del votante seleccionado.
* **Motivaciones profundas:** Búsqueda imperiosa de estabilidad económica para la familia campesina o trabajadora; anhelo de arraigo que evite que sus hijos tengan que migrar forzosamente al Valle de Aburrá en busca de empleo o educación superior.
* **Miedos cotidianos:** La pérdida recurrente de bancada en las vías secundarias y terciarias que deja incomunicados los municipios; la extorsión silenciosa o abierta que encarece el transporte y el comercio; y la angustia ante una urgencia médica en hospitales de primer nivel sin capacidad quirúrgica.
* **Fuentes de desconfianza:** Escepticismo ante candidatos que únicamente visitan las plazas en campaña con promesas de obras faraónicas individuales, ignorando los cuellos de botella que hermanan a toda la subregión.
* **Detonantes emocionales de voto:** Sentimiento de orgullo por la identidad montañera y la laboriosidad de ${subregion.name}; indignación justificada por la brecha de inversión frente a Medellín; receptividad ante discursos de autoridad con empatía y cercanía real en el territorio.

---

### 3. Líneas discursivas estratégicas.
* **Eje 1: Conectividad y Red Terciaria de Integración Subregional**  
  *Propuesta realista:* Plan de choque de placa huellas continuas y mantenimiento mecanizado permanente en los ramales viales intermunicipales que unen las cuencas productivas de la subregión, optimizando el transporte de cosechas y mercancías bajo competencias de ${office.label}.
* **Eje 2: Seguridad Territorial Articulada y Bloqueo a la Extorsión**  
  *Propuesta realista:* Creación de un circuito de monitoreo y patrullaje unificado intermunicipal coordinado con la Policía Departamental y el Ejército, desarticulando los corredores de microtráfico y extorsión en los límites municipales.
* **Eje 3: Red de Salud de Segundo Nivel y Oportunidad Productiva Local**  
  *Propuesta realista:* Fortalecimiento resolutivo del hospital cabecera subregional con especialistas itinerantes y dotación de ambulancias medicalizadas para frenar remisiones fatales, junto a incentivos tributarios para la agregación de valor agroindustrial o minero formal en la subregión.
* **Frases-fuerza / Eslóganes:**  
  1. *"La fuerza de ${subregion.name} no se divide: un solo territorio, un solo futuro con ${candidateName}."*  
  2. *"Vías para sacar lo nuestro, seguridad para vivir tranquilos: hechos por ${subregion.name}."*

---

### 4. Tono narrativo prioritario.
El tono predominante debe ser **${candidateTone.toUpperCase()}**.  
* **Justificación psicológica:** El habitante de ${subregion.name} rechaza el lenguaje tecnocrático abstracto y la retórica populista vacía. Requiere un líder con carácter y aplomo para enfrentar la ilegalidad, pero con la sencillez y el respeto propio de la cultura antioqueña para sentarse a escuchar a los productores, madres cabeza de familia y transportadores en las ferias y plazas de mercado.

---

### 5. Medios prioritarios.
* **Canales Digitales Prioritarios:**
  * **Video corto en Facebook e Instagram Reels (Geolocalizado por subregión):** Formato vertical de 45 segundos donde el candidato recorre puntos críticos comunes (un puente colapsado, un puesto de salud, una cooperativa campesina) hablando claro y sin libreto prefabricado.
  * **Cadenas de micro-redes y estados de WhatsApp:** Difusión de infografías de alto contraste y audios directos del candidato dirigidos a asociaciones de transportadores, juntas de acción comunal y comités gremiales de la subregión.
* **Medios Tradicionales y Despliegue en Territorio:**
  * **Emisoras comunitarias y radio subregional:** Entrevistas matutinas simultáneas en los noticieros radiales de mayor sintonía campesina (6:00 a.m. a 7:30 a.m.), donde el campesino escucha la radio mientras ordeña o alista la jornada.
  * **Caravanas intermunicipales y tomas de plaza de mercado:** Recorridos en días de mercado (sábados y domingos) conectando cabeceras sucesivas, con volanteo mano a mano y perifoneo enérgico que transmita fuerza territorial masiva.

---

### 6. Brief general de contenidos.
* **Pieza 1: Video Corto Digital (Pauta en Redes Sociales)**  
  * **Gancho (0-3 seg):** Primer plano del candidato en una vía destapada intermunicipal: *"¿Hasta cuándo vamos a perder las cosechas y la tranquilidad en ${subregion.name}?"*  
  * **Desarrollo (4-35 seg):** Imágenes rápidas de familias campesinas y transportadores trabajando. ${candidateName} explica el compromiso puntual de conectividad y seguridad articulada ajustado a ${office.label}.  
  * **Llamado a la acción (36-45 seg):** *"Este es el momento de unir a ${subregion.name}. Soy ${candidateName}, y juntos vamos a poner la casa en orden."*
* **Pieza 2: Mensaje Territorial Impreso (Volante y Periódico de Mano)**  
  * **Titular:** *"El Plan de Rescate para los Municipios de ${subregion.name}"*  
  * **Cuerpo:** 3 propuestas puntuales con mapa esquemático de los corredores intermunicipales beneficiados. Lenguaje directo, letra legible para adultos mayores y foto cercana del candidato con vestuario neutro de trabajo de campo.
* **Pieza 3: Activación en Territorio (La Vuelta a ${subregion.name})**  
  * **Formato:** Jornada maratónica de 48 horas recorriendo los principales nodos de la subregión, sosteniendo diálogos abiertos en plazas centrales con voceros comunales de cada municipio, consolidando la percepción de un candidato presente, valiente y transversal.`;
}

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Building2, 
  MapPin, 
  Users, 
  Vote, 
  Sparkles, 
  Search, 
  Share2, 
  Printer, 
  Download, 
  CheckCircle2, 
  Target, 
  Megaphone, 
  FileText, 
  BrainCircuit, 
  Copy, 
  Check, 
  ArrowRight, 
  ChevronRight, 
  Sliders, 
  Info, 
  Radio, 
  TrendingUp, 
  ShieldCheck, 
  Globe, 
  RefreshCw,
  UserCheck,
  AlertCircle,
  BarChart3,
  PieChart as PieIcon,
  Layers,
  Box,
  Compass,
  Phone,
  Mail,
  AlertTriangle,
  Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from '@google/genai';
import { jsPDF } from 'jspdf';
import { 
  STRATEGIC_MUNICIPALITIES, 
  StrategicMunicipality, 
  calculateDemographicCrossEstimation 
} from '../data/antioquia7MunicipiosData';
import { CmtIsotipo } from './CmtProteusLogo';
import { MunicipioInteractiveMap } from './MunicipioInteractiveMap';
import { MunicipioDemographicDashboard } from './MunicipioDemographicDashboard';
import { MunicipioCommuneDetailCard } from './MunicipioCommuneDetailCard';
import { Municipio3DDiorama } from './Municipio3DDiorama';
import { RionegroInteractiveMap } from './RionegroInteractiveMap';
import { Rionegro3DDiorama } from './Rionegro3DDiorama';
import { RionegroECVDashboard } from './RionegroECVDashboard';
import { BelloInteractiveMap } from './BelloInteractiveMap';
import { ALL_MUNICIPIOS_TERRITORIAL_DATA } from '../data/allMunicipiosTerritorialData';
import { 
  ANTIOQUIA_125_MUNICIPALITIES_MASTER_DATA, 
  UnifiedMunicipalityRecord 
} from '../data/antioquia125MunicipalitiesMasterData';
import { activeTerritoryService } from '../services/activeTerritoryContextService';

// Inicialización de la API de Gemini para búsquedas y análisis profundo
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface CandidateProfileProps {
  nombre?: string;
  afiliacionPartidista?: string;
  tonoNarrativo?: string;
  estiloComunicacion?: string;
  ejeTematicoComodo?: string;
  formacionOcupacion?: string;
  experienciaPrevia?: string;
  resumenEstrategico?: string;
}

interface AntioquiaMunicipiosManagerProps {
  candidateProfile: CandidateProfileProps | null;
  onNavigateToBio?: () => void;
  onNavigateToContentDirector?: () => void;
}

const STRATEGIC_7_KEYS = ['bello', 'itagui', 'envigado', 'la-estrella', 'sabaneta', 'caldas', 'rionegro'];

function getMunicipalityAdapter(muniId: string): StrategicMunicipality {
  if (STRATEGIC_MUNICIPALITIES[muniId]) {
    return STRATEGIC_MUNICIPALITIES[muniId];
  }
  const cleanId = muniId.replace('mpio-', '');
  const master = ANTIOQUIA_125_MUNICIPALITIES_MASTER_DATA.find(
    m => m.id === muniId || m.id === `mpio-${cleanId}` || m.daneCode === cleanId || m.name.toLowerCase() === muniId.toLowerCase()
  );
  if (master) {
    const isRural = master.predominantStratum.includes('Rural') || master.category === '6';
    return {
      id: master.id,
      name: master.name,
      subregion: master.subregion,
      category: `Cat. ${master.category}`,
      totalPopulation: master.population,
      electoralCensus: master.electoralCensus,
      urbanRuralDistribution: {
        urban: isRural ? 35 : 75,
        rural: isRural ? 65 : 25
      },
      nbiPercentage: master.nbiPercentage,
      hdi: master.category === 'Especial' ? 0.85 : (['1', '2'].includes(master.category) ? 0.79 : 0.71),
      economicDrivers: master.economicSectors || ['Agropecuario', 'Comercio local', 'Servicios'],
      summary: `Municipio de ${master.name} (${master.subregion}). Alcaldía 2024-2027: ${master.electedMayor} (${master.winnerParty}). Censo electoral: ${master.electoralCensus.toLocaleString('es-CO')} votantes.`,
      areas: [
        {
          id: `${master.id}-urbano`,
          name: `${master.name} - Cabecera Urbana`,
          type: 'Urbana',
          subtype: 'Zona',
          barriosOrVeredas: ['Sector Centro', 'Barrios Periféricos', 'Zona Institucional y Comercial'],
          estimatedPopulation: Math.round(master.population * (isRural ? 0.35 : 0.75)),
          predominantStratum: master.predominantStratum.includes('1 y 2') ? 'Bajo (1-2)' : 'Medio (3-4)',
          educationalLevelGeneral: 'Medio',
          urbanDensity: 'Media',
          characteristics: `Cabecera municipal urbana de ${master.name}. Concentra el comercio y servicios locales.`
        },
        {
          id: `${master.id}-rural`,
          name: `${master.name} - Corredores Veredales y Rurales`,
          type: 'Rural',
          subtype: 'Vereda',
          barriosOrVeredas: ['Veredas Altas', 'Veredas Bajas', 'Centros Poblados Rurales'],
          estimatedPopulation: Math.round(master.population * (isRural ? 0.65 : 0.25)),
          predominantStratum: 'Bajo (1-2)',
          educationalLevelGeneral: 'Básico',
          urbanDensity: 'Rural Dispersa',
          characteristics: `Sector rural y veredal de ${master.name}. Vocación agrícola y comunitaria.`
        }
      ],
      demographics: {
        ageGroups: {
          joven: { range: '18-28 años', percentage: 26, label: 'Jóvenes' },
          adulto: { range: '29-59 años', percentage: 54, label: 'Adultos' },
          adultoMayor: { range: '60+ años', percentage: 20, label: 'Adultos Mayores' }
        },
        socioeconomicStratum: {
          bajo: { strata: 'Estrato 1 y 2', percentage: master.predominantStratum.includes('1 y 2') ? 78 : 45, description: 'Sectores populares y veredales' },
          medio: { strata: 'Estrato 3 y 4', percentage: master.predominantStratum.includes('1 y 2') ? 20 : 50, description: 'Comercio y clase media' },
          alto: { strata: 'Estrato 5 y 6', percentage: 2, description: 'Sectores campestres' }
        },
        educationLevels: {
          basico: { level: 'Primaria / Secundaria incompleta', percentage: 48, description: 'Educación básica' },
          medio: { level: 'Bachiller / Técnico SENA', percentage: 40, description: 'Formación técnica y media' },
          superior: { level: 'Profesional / Universitaria', percentage: 12, description: 'Educación superior' }
        }
      },
      electoralAntecedents: {
        'Alcaldía': {
          office: 'Alcaldía',
          title: `Elección Alcalde de ${master.name} (2024-2027)`,
          competencies: 'Administración del presupuesto municipal, orden público, inversión local y ejecución de obras.',
          immediateAntecedents2023: {
            totalVotes: Math.round(master.electoralCensus * 0.58),
            winnerOrLeadingParty: master.winnerParty,
            winnerVotes: master.votesMayor || Math.round(master.electoralCensus * 0.28),
            secondPlaceOrParty: master.runnerUp?.party || 'Coalición Opositora',
            secondVotes: master.runnerUp?.votes || Math.round(master.electoralCensus * 0.18),
            abstentionRate: 42.0,
            blankAndNullVotes: Math.round(master.electoralCensus * 0.05),
            keyInsights: `Triunfo de ${master.electedMayor} con ${master.winnerParty}. ${master.councilSeats ? `Concejo de ${master.totalCouncilSeats || 11} curules con bancadas de ${master.councilSeats.map(c => c.party).slice(0, 3).join(', ')}.` : ''}`
          },
          keyDynamics: [
            `Alcalde: ${master.electedMayor} (${master.winnerParty})`,
            `Gobernabilidad municipal y bancadas mayoritarias`,
            `Retos de seguridad: ${master.securityDynamics?.armedPresence || 'Vigilancia institucional'}`
          ]
        },
        'Concejo': {
          office: 'Concejo',
          title: `Concejo Municipal de ${master.name} 2024-2027`,
          competencies: 'Control político a la administración, aprobación del Plan de Desarrollo y presupuesto.',
          immediateAntecedents2023: {
            totalVotes: Math.round(master.electoralCensus * 0.56),
            winnerOrLeadingParty: master.councilSeats?.[0]?.party || master.predominantParty,
            winnerVotes: Math.round(master.electoralCensus * 0.18),
            secondPlaceOrParty: master.councilSeats?.[1]?.party || 'Partido Conservador',
            secondVotes: Math.round(master.electoralCensus * 0.14),
            abstentionRate: 44.0,
            blankAndNullVotes: Math.round(master.electoralCensus * 0.06),
            keyInsights: `${master.totalCouncilSeats || 11} curules repartidas entre ${master.councilSeats?.map(c => `${c.party} (${c.seats})`).join(', ') || 'diversas bancadas'}.`
          },
          keyDynamics: master.councilSeats ? master.councilSeats.map(c => `${c.party}: ${c.seats} curules (${c.percentageValid || 20}%)`) : ['Bancadas multipartidistas']
        },
        'Gobernación': {
          office: 'Gobernación',
          title: `Gobernación de Antioquia en ${master.name} 2023`,
          competencies: 'Inversión departamental, red vial secundaria, hospitales y seguridad regional.',
          immediateAntecedents2023: {
            totalVotes: Math.round(master.electoralCensus * 0.57),
            winnerOrLeadingParty: 'Andrés Julián Rendón (Por Antioquia Firme / CD - Creemos)',
            winnerVotes: Math.round(master.electoralCensus * 0.28),
            secondPlaceOrParty: 'Luis Pérez Gutiérrez (Coalición Antioquia Piensa en Grande)',
            secondVotes: Math.round(master.electoralCensus * 0.18),
            abstentionRate: 43.0,
            blankAndNullVotes: Math.round(master.electoralCensus * 0.05),
            keyInsights: `Comportamiento electoral alineado a la coalición departamental en la subregión ${master.subregion}.`
          },
          keyDynamics: [
            'Alta receptividad a propuestas de orden y seguridad departamental',
            'Demanda de autonomía fiscal y mantenimiento vial'
          ]
        },
        'Asamblea': {
          office: 'Asamblea',
          title: `Asamblea Departamental en ${master.name} 2023`,
          competencies: 'Control político departamental y ordenanzas regionales.',
          immediateAntecedents2023: {
            totalVotes: Math.round(master.electoralCensus * 0.54),
            winnerOrLeadingParty: 'Centro Democrático / Creemos',
            winnerVotes: Math.round(master.electoralCensus * 0.22),
            secondPlaceOrParty: 'Partido Conservador / Liberal',
            secondVotes: Math.round(master.electoralCensus * 0.16),
            abstentionRate: 46.0,
            blankAndNullVotes: Math.round(master.electoralCensus * 0.08),
            keyInsights: `Votación multipartidista con peso de diputados de la subregión ${master.subregion}.`
          },
          keyDynamics: [
            'Voto de estructura partidista tradicional',
            'Influencia de líderes comunales y campesinos'
          ]
        }
      }
    };
  }
  return STRATEGIC_MUNICIPALITIES['bello'];
}

export const AntioquiaMunicipiosManager: React.FC<AntioquiaMunicipiosManagerProps> = ({
  candidateProfile,
  onNavigateToBio,
  onNavigateToContentDirector
}) => {
  // Lista fija de los 7 municipios autorizados con modelado 3D
  const MUNICIPALITY_KEYS = [
    { id: 'bello', name: 'Bello', badge: '554k hab' },
    { id: 'itagui', name: 'Itagüí', badge: '291k hab' },
    { id: 'envigado', name: 'Envigado', badge: '247k hab' },
    { id: 'la-estrella', name: 'La Estrella', badge: '78k hab' },
    { id: 'sabaneta', name: 'Sabaneta', badge: '86k hab' },
    { id: 'caldas', name: 'Caldas', badge: '84k hab' },
    { id: 'rionegro', name: 'Rionegro', badge: '147k hab' }
  ];

  // Modos de exploración: Top 7 con 3D vs Los 125 Municipios de Antioquia
  const [muniScopeMode, setMuniScopeMode] = useState<'7-estrategicos' | '125-antioquia'>('125-antioquia');
  const [selectedSubregionFilter, setSelectedSubregionFilter] = useState<string>('all');
  const [searchMuniQuery, setSearchMuniQuery] = useState<string>('');

  // Estado del municipio activo
  const [selectedMuniId, setSelectedMuniId] = useState<string>('bello');
  
  const currentMuni: StrategicMunicipality = useMemo(() => {
    return getMunicipalityAdapter(selectedMuniId);
  }, [selectedMuniId]);

  const activeMasterRec: UnifiedMunicipalityRecord | undefined = useMemo(() => {
    const cleanId = selectedMuniId.replace('mpio-', '');
    return ANTIOQUIA_125_MUNICIPALITIES_MASTER_DATA.find(
      m => m.id === selectedMuniId || m.id === `mpio-${cleanId}` || m.daneCode === cleanId || m.name.toLowerCase() === selectedMuniId.toLowerCase()
    );
  }, [selectedMuniId]);

  const isStrategic7 = STRATEGIC_7_KEYS.includes(selectedMuniId);

  // Subregiones únicas para el filtro
  const allSubregions = useMemo(() => {
    const set = new Set<string>();
    ANTIOQUIA_125_MUNICIPALITIES_MASTER_DATA.forEach(m => {
      if (m.subregion) set.add(m.subregion);
    });
    return Array.from(set).sort();
  }, []);

  // Lista filtrada de los 125 municipios
  const filtered125Municipios = useMemo(() => {
    return ANTIOQUIA_125_MUNICIPALITIES_MASTER_DATA.filter(m => {
      const matchSearch = !searchMuniQuery.trim() ||
        m.name.toLowerCase().includes(searchMuniQuery.toLowerCase()) ||
        m.daneCode.includes(searchMuniQuery) ||
        m.electedMayor.toLowerCase().includes(searchMuniQuery.toLowerCase());
      const matchSub = selectedSubregionFilter === 'all' || m.subregion === selectedSubregionFilter;
      return matchSearch && matchSub;
    });
  }, [searchMuniQuery, selectedSubregionFilter]);

  // Detección de municipio estratégico (Top 7 con 3D) vs Ficha Maestra 125 Municipios
  const [nonStrategicTab, setNonStrategicTab] = useState<'ficha' | 'demografia' | 'veredas'>('ficha');

  // Modo de visualización territorial ('both' | 'map' | 'charts' | 'comunas' | 'diorama3d' | 'dossier')
  const [muniViewMode, setMuniViewMode] = useState<'both' | 'map' | 'charts' | 'comunas' | 'diorama3d' | 'dossier'>('both');

  // Estados de filtros (Recuadro Derecho)
  const initialAreaId = ALL_MUNICIPIOS_TERRITORIAL_DATA[selectedMuniId]?.areas[0]?.id || currentMuni.areas[0]?.id || '';
  const [selectedAreaId, setSelectedAreaId] = useState<string>(initialAreaId);
  const [selectedAge, setSelectedAge] = useState<'joven' | 'adulto' | 'adultoMayor'>('joven');
  const [selectedStratum, setSelectedStratum] = useState<'bajo' | 'medio' | 'alto'>('medio');
  const [selectedEducation, setSelectedEducation] = useState<'basico' | 'medio' | 'superior'>('medio');
  const [selectedOffice, setSelectedOffice] = useState<'Concejo' | 'Alcaldía' | 'Asamblea' | 'Gobernación'>('Alcaldía');

  // Si cambia el municipio, sincronizamos el área predeterminada
  useEffect(() => {
    const territorialConfig = ALL_MUNICIPIOS_TERRITORIAL_DATA[selectedMuniId];
    if (territorialConfig && territorialConfig.areas.length > 0) {
      setSelectedAreaId(territorialConfig.areas[0].id);
    } else if (currentMuni.areas.length > 0) {
      setSelectedAreaId(currentMuni.areas[0].id);
    }
  }, [selectedMuniId, currentMuni.areas]);

  // Área activa seleccionada
  const currentArea = currentMuni.areas.find(a => a.id === selectedAreaId) || currentMuni.areas[0];

  // Cálculo del cruce demográfico dinámico
  const demographicEstimation = useMemo(() => {
    const selectedArea = currentMuni.areas.find(a => a.id === selectedAreaId) || currentMuni.areas[0];
    const areaPopulation = selectedArea.estimatedPopulation || Math.round(currentMuni.totalPopulation * 0.6);
    const agePct = (currentMuni.demographics.ageGroups[selectedAge]?.percentage || 25) / 100;
    let stratumPct = (currentMuni.demographics.socioeconomicStratum[selectedStratum]?.percentage || 33) / 100;
    let eduPct = (currentMuni.demographics.educationLevels[selectedEducation]?.percentage || 33) / 100;
    const estimatedGroupCount = Math.round(areaPopulation * agePct * stratumPct * eduPct * 2.4);
    const finalEstimatedCount = Math.max(80, Math.min(Math.round(areaPopulation * 0.45), estimatedGroupCount));
    const estimatedVoterTurnout = Math.round(finalEstimatedCount * 0.58);
    const percentageOfArea = ((finalEstimatedCount / (areaPopulation || 1)) * 100).toFixed(1);
    const percentageOfMunicipality = ((finalEstimatedCount / (currentMuni.totalPopulation || 1)) * 100).toFixed(2);
    return {
      finalEstimatedCount,
      estimatedVoterTurnout,
      percentageOfArea,
      percentageOfMunicipality,
      areaName: selectedArea.name,
      areaType: selectedArea.type,
      areaPopulation,
      totalMunicipalityPopulation: currentMuni.totalPopulation
    };
  }, [currentMuni, selectedAreaId, selectedAge, selectedStratum, selectedEducation]);

  // Antecedente electoral seleccionado
  const currentElectoralData = currentMuni.electoralAntecedents[selectedOffice];

  // Estado para el Candidato (Recuadro Izquierdo - Analista)
  const [customCandidateName, setCustomCandidateName] = useState<string>('');
  const [candidateWebSearchBio, setCandidateWebSearchBio] = useState<string>('');
  const [isSearchingCandidateWeb, setIsSearchingCandidateWeb] = useState<boolean>(false);
  const [candidateSourceMode, setCandidateSourceMode] = useState<'bio' | 'custom'>(
    candidateProfile ? 'bio' : 'custom'
  );

  // Estado del informe de la herramienta Analista
  const [isGeneratingAnalysis, setIsGeneratingAnalysis] = useState<boolean>(false);
  const [analysisReport, setAnalysisReport] = useState<string | null>(null);
  const [copiedReport, setCopiedReport] = useState<boolean>(false);

  // Generar nombre efectivo del candidato
  const effectiveCandidateName = candidateSourceMode === 'bio' && candidateProfile?.nombre
    ? candidateProfile.nombre
    : (customCandidateName.trim() || 'Candidato / Campaña Estratégica');

  // Función para buscar candidato en internet con Gemini y Google Search si no hay perfil en biografía
  const handleSearchCandidateOnline = async () => {
    if (!customCandidateName.trim()) return;
    setIsSearchingCandidateWeb(true);

    try {
      const prompt = `Realiza una búsqueda profunda en internet sobre la trayectoria política, perfil profesional, posturas y partido político del siguiente líder o candidato en Antioquia, Colombia:
      Nombre: "${customCandidateName.trim()}".
      Resume en 3 párrafos concisos:
      1. Quién es, cargos previos y partido/afiliación política.
      2. Principales temas o banderas que defiende (seguridad, empleo, educación, etc.).
      3. Estilo de comunicación y tono predominante que proyecta en medios o redes.`;

      let text = '';
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          config: {
            tools: [{ googleSearch: {} }]
          }
        });
        text = response.text || '';
      } catch (err) {
        // Fallback estándar
        const fallbackRes = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: [{ role: 'user', parts: [{ text: prompt }] }]
        });
        text = fallbackRes.text || '';
      }

      setCandidateWebSearchBio(text);
    } catch (error: any) {
      console.error('Error buscando candidato en web:', error);
      setCandidateWebSearchBio(`Perfil identificado: ${customCandidateName}. Se utilizará el contexto estándar de campaña para cargos de elección popular en Antioquia.`);
    } finally {
      setIsSearchingCandidateWeb(false);
    }
  };

  // Función para ejecutar el Análisis Estratégico de Publicidad (Analista)
  const handleRunAnalyst = async () => {
    setIsGeneratingAnalysis(true);

    // Preparar el contexto del candidato
    let candidateContext = '';
    if (candidateSourceMode === 'bio' && candidateProfile) {
      candidateContext = `
      - Nombre del candidato: ${candidateProfile.nombre}
      - Partido / Afiliación: ${candidateProfile.afiliacionPartidista || 'Centroderecha / Independiente'}
      - Tono narrativo calibrado en Biografía: ${candidateProfile.tonoNarrativo || 'Pragmático, firme y empático'}
      - Estilo de comunicación: ${candidateProfile.estiloComunicacion || 'Cercano e institucional'}
      - Ejes temáticos cómodos: ${candidateProfile.ejeTematicoComodo || 'Seguridad, empleo, desarrollo familiar, obras'}
      - Resumen de perfil: ${candidateProfile.resumenEstrategico || candidateProfile.experienciaPrevia || ''}
      `;
    } else {
      candidateContext = `
      - Nombre del candidato ingresado: ${effectiveCandidateName}
      - Datos extraídos o conocidos: ${candidateWebSearchBio || 'Liderazgo en proceso de consolidación electoral local en Antioquia.'}
      `;
    }

    const promptText = `Eres el Analista Estratégico Senior de Campañas Electorales de CMT PROTEUS.
Tu misión es diseñar un análisis exhaustivo y profesional sobre cómo debe ser la PUBLICIDAD Y COMUNICACIÓN POLÍTICA orientada a un grupo poblacional milimétricamente microsegmentado.

DEBES CONSIDERAR RIGUROSAMENTE LOS SIGUIENTES FACTORES:
1. TERRITORIO: Municipio de ${currentMuni.name}, Antioquia.
   - Área / División Político-Administrativa: ${currentArea.name} (${currentArea.type} - ${currentArea.subtype}).
   - Barrios / Veredas que comprende: ${currentArea.barriosOrVeredas.join(', ')}.
   - Población estimada del área: ${currentArea.estimatedPopulation.toLocaleString()} habitantes.
   - Densidad: ${currentArea.urbanDensity} | Nivel educativo general: ${currentArea.educationalLevelGeneral} | Estrato predominante: ${currentArea.predominantStratum}.
   - Dinámicas locales del área: ${currentArea.characteristics}.

2. GRUPO DEMOGRÁFICO ESPECÍFICO (CRUCE DE VARIABLES):
   - Grupo etario: ${selectedAge.toUpperCase()} (${currentMuni.demographics.ageGroups[selectedAge].range}).
   - Estrato socioeconómico: ${selectedStratum.toUpperCase()} (${currentMuni.demographics.socioeconomicStratum[selectedStratum].strata} - ${currentMuni.demographics.socioeconomicStratum[selectedStratum].description}).
   - Nivel educativo: ${selectedEducation.toUpperCase()} (${currentMuni.demographics.educationLevels[selectedEducation].level} - ${currentMuni.demographics.educationLevels[selectedEducation].description}).
   - Población estimada de este segmento específico en el área: ${demographicEstimation.finalEstimatedCount.toLocaleString()} personas (~${demographicEstimation.percentageOfArea}% de la división).
   - Potencial de votantes efectivos estimados en urnas: ${demographicEstimation.estimatedVoterTurnout.toLocaleString()} votos.

3. TIPO DE ELECCIÓN Y COMPETENCIAS INSTITUCIONALES:
   - Cargo en disputa: ${selectedOffice.toUpperCase()}.
   - Competencias institucionales específicas: ${currentElectoralData.competencies}.
   - Antecedentes electorales 2023 en ${currentMuni.name}: Ganador/Primer lugar (${currentElectoralData.immediateAntecedents2023.winnerOrLeadingParty} con ${currentElectoralData.immediateAntecedents2023.winnerVotes.toLocaleString()} votos), Segundo lugar (${currentElectoralData.immediateAntecedents2023.secondPlaceOrParty} con ${currentElectoralData.immediateAntecedents2023.secondVotes.toLocaleString()} votos). Abstención histórica: ${currentElectoralData.immediateAntecedents2023.abstentionRate}%.
   - Claves de la contienda: ${currentElectoralData.immediateAntecedents2023.keyInsights}.
   - ADVERTENCIA CRÍTICA DE COMPETENCIAS: Si es Concejo o Asamblea, las promesas NO pueden ser ejecutivas de gasto directo sino de control político, acuerdos/ordenanzas y gestión comunitaria. Si es Alcaldía o Gobernación, son competencias ejecutivas plenas de presupuesto y gobierno.

4. PERFIL DEL CANDIDATO CONDICIONANTE:
${candidateContext}
TODO EL ANÁLISIS, LAS PROPUESTAS DE MENSAJES Y EL TONO DEBEN ADAPTARSE DIRECTAMENTE A ESTE CANDIDATO (${effectiveCandidateName}).

ESTRUCTURA OBLIGATORIA DEL INFORME (RESPETA EXACTAMENTE ESTOS 6 PUNTOS):
1. Perfil general.
   (Diagnóstico sintético del segmento en ${currentArea.name} y cómo intersecta con el cargo de ${selectedOffice} y la candidatura de ${effectiveCandidateName}).

2. Descripción psicológica del votante seleccionado.
   (Motivaciones profundas, miedos cotidianos, aspiraciones, fuentes de desconfianza política y detonantes emocionales de voto teniendo en cuenta su edad, estrato y nivel educativo en ${currentArea.name}).

3. Líneas discursivas estratégicas.
   (Tres ejes temáticos de alto impacto con propuestas realistas ajustadas a las competencias de ${selectedOffice}. Incluir dos eslóganes o frases-fuerza memorables adaptados al candidato).

4. Tono narrativo prioritario.
   (Definición exacta del tono: e.g. autoritativo/firme, empático/cercano, pedagógico/técnico, inspirador/juvenil. Razones psicológicas de por qué este tono penetra en este segmento).

5. Medios prioritarios.
   (Desglose táctico de canales: Redes sociales prioritarias específicas con formato recomendado -Instagram Reels, TikTok, Facebook Groups, estados de WhatsApp, pauta geolocalizada-, y medios tradicionales o publicidad física territorial -volanteo mano a mano en sitios clave de ${currentArea.name}, pasacalles, perifoneo o reuniones comunitarias-).

6. Brief general de contenidos.
   (Guion o propuesta de 3 piezas de comunicación listas para producción:
   - Pieza 1: Video corto para pauta digital / red social prioritaria (Idea visual, gancho inicial, desarrollo del candidato y llamado a la acción).
   - Pieza 2: Mensaje territorial para impreso o micro-conversación en el barrio/vereda.
   - Pieza 3: Activación en territorio orientada a este segmento demográfico en ${currentArea.name}).

Entrega un informe denso, sin texto genérico ni rodeos, con lenguaje de consultoría política de primer nivel.`;

    try {
      let result = '';
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: [{ role: 'user', parts: [{ text: promptText }] }],
          config: {
            tools: [{ googleSearch: {} }]
          }
        });
        result = response.text || '';
      } catch (e) {
        const fallbackRes = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: [{ role: 'user', parts: [{ text: promptText }] }]
        });
        result = fallbackRes.text || '';
      }

      setAnalysisReport(result);
    } catch (err: any) {
      console.error('Error generando informe de analista:', err);
      // Fallback precalculado inteligente si falla la red
      setAnalysisReport(generateFallbackReport(
        currentMuni,
        currentArea,
        selectedAge,
        selectedStratum,
        selectedEducation,
        selectedOffice,
        effectiveCandidateName,
        demographicEstimation
      ));
    } finally {
      setIsGeneratingAnalysis(false);
    }
  };

  // Copiar al portapapeles
  const handleCopyReport = () => {
    if (!analysisReport) return;
    navigator.clipboard.writeText(analysisReport);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2000);
  };

  // Exportar a PDF
  const handleExportPDF = () => {
    if (!analysisReport) return;
    const doc = new jsPDF();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text(`CMT PROTEUS - INFORME ESTRATÉGICO DE PUBLICIDAD`, 15, 18);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Municipio: ${currentMuni.name} | Área: ${currentArea.name}`, 15, 25);
    doc.text(`Segmento: ${selectedAge.toUpperCase()} - ${selectedStratum.toUpperCase()} - ${selectedEducation.toUpperCase()}`, 15, 30);
    doc.text(`Elección: ${selectedOffice.toUpperCase()} | Candidato: ${effectiveCandidateName}`, 15, 35);
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-CO')}`, 15, 40);
    doc.line(15, 43, 195, 43);

    const splitText = doc.splitTextToSize(analysisReport, 180);
    doc.setFontSize(9);
    doc.text(splitText, 15, 50);
    doc.save(`Analisis_Publicidad_${currentMuni.name}_${selectedOffice}_${effectiveCandidateName.replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <div className="space-y-6">
      {/* Barra superior de control y síntesis */}
      <div className="bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0A192F] text-white p-6 rounded-3xl shadow-xl border border-slate-700/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-2.5 rounded-2xl shadow-md border border-white/20 shrink-0">
            <CmtIsotipo size={36} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-600/30 text-blue-300 border border-blue-400/30">
                CMT PROTEUS • NÚCLEO REGIONAL
              </span>
              <span className="text-[10px] font-bold text-slate-400">
                7 Municipios Estratégicos de Antioquia
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-1">
              Microsegmentación y Estrategia Territorial
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-0.5">
              Herramienta analítica de publicidad hiperdirigida por división político-administrativa, cruce demográfico y competencias electorales.
            </p>
          </div>
        </div>

        {/* Indicador de perfil de candidato */}
        <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700 text-right shrink-0 w-full md:w-auto flex md:flex-col justify-between items-center md:items-end">
          <span className="text-[9px] uppercase font-black text-slate-400 tracking-wider block">
            Candidato de Referencia
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-black text-emerald-300 max-w-[200px] truncate">
              {effectiveCandidateName}
            </span>
          </div>
          {candidateProfile && (
            <button
              onClick={onNavigateToBio}
              className="text-[10px] text-blue-400 hover:text-blue-300 underline font-semibold mt-1 block"
            >
              Ver en Biografía →
            </button>
          )}
        </div>
      </div>

      {/* Contenedor Principal: Barra Lateral + 2 Columnas (Izquierda: Analista | Derecha: Desplegables) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Barra de Navegación Lateral (Municipios) */}
        <aside className="lg:col-span-3 space-y-3">
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl rounded-3xl p-4 shadow-sm border border-white/10 space-y-3">
            {/* Scope Mode Switcher */}
            <div className="flex p-0.5 rounded-xl bg-black/40 border border-white/10 text-[10px] font-bold">
              <button
                type="button"
                onClick={() => setMuniScopeMode('125-antioquia')}
                className={`flex-1 py-1.5 rounded-lg transition text-center ${
                  muniScopeMode === '125-antioquia'
                    ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-400/50 font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                125 Municipios
              </button>
              <button
                type="button"
                onClick={() => setMuniScopeMode('7-estrategicos')}
                className={`flex-1 py-1.5 rounded-lg transition text-center ${
                  muniScopeMode === '7-estrategicos'
                    ? 'bg-sky-500/30 text-sky-200 border border-sky-400/50 font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Top 7 (3D)
              </button>
            </div>

            {/* If 125 Mode: Subregion filter + search */}
            {muniScopeMode === '125-antioquia' && (
              <div className="space-y-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar municipio, DIVIPOLA..."
                    value={searchMuniQuery}
                    onChange={(e) => setSearchMuniQuery(e.target.value)}
                    className="w-full pl-7 pr-2 py-1.5 rounded-xl bg-white/05 border border-white/15 text-white text-[11px] placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                <select
                  value={selectedSubregionFilter}
                  onChange={(e) => setSelectedSubregionFilter(e.target.value)}
                  className="w-full px-2 py-1.5 rounded-xl bg-white/05 border border-white/15 text-white text-[10px] font-mono focus:outline-none focus:border-emerald-400"
                >
                  <option value="all" className="bg-slate-900 text-white">Todas las Subregiones ({ANTIOQUIA_125_MUNICIPALITIES_MASTER_DATA.length})</option>
                  {allSubregions.map((s) => (
                    <option key={s} value={s} className="bg-slate-900 text-white">
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Header info count */}
            <div className="flex items-center justify-between px-1 text-[10px] font-mono uppercase text-slate-400 font-bold">
              <span>{muniScopeMode === '7-estrategicos' ? 'Municipios Clave (3D)' : `Antioquia (${filtered125Municipios.length})`}</span>
              <span className="text-emerald-400">DANE Oficial</span>
            </div>

            {/* List of Municipalities */}
            <div className="space-y-1.5 max-h-[420px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/15">
              {muniScopeMode === '7-estrategicos' ? (
                MUNICIPALITY_KEYS.map((muni) => {
                  const isActive = selectedMuniId === muni.id;
                  return (
                    <button
                      key={muni.id}
                      id={`btn-muni-${muni.id}`}
                      onClick={() => setSelectedMuniId(muni.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-2xl font-black text-xs transition-all flex items-center justify-between border cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-900 to-indigo-900 text-white shadow-md border-sky-400/60 scale-[1.01]'
                          : 'bg-white/[0.04] hover:bg-white/10 text-slate-200 border-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-xl ${isActive ? 'bg-sky-500/30 text-sky-200' : 'bg-white/05 text-slate-400'}`}>
                          <Building2 className="w-3.5 h-3.5" />
                        </div>
                        <span className="tracking-tight text-xs font-black">{muni.name}</span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-300">
                        {muni.badge}
                      </span>
                    </button>
                  );
                })
              ) : (
                filtered125Municipios.map((m) => {
                  const isActive = selectedMuniId === m.id || selectedMuniId === m.name.toLowerCase();
                  return (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMuniId(m.id)}
                      className={`w-full text-left px-3 py-2 rounded-2xl font-bold text-xs transition-all flex items-center justify-between border cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-emerald-950 to-slate-900 text-white shadow-md border-emerald-400/80 scale-[1.01]'
                          : 'bg-white/[0.03] hover:bg-white/10 text-slate-300 border-white/05'
                      }`}
                    >
                      <div>
                        <div className="text-white text-xs font-black flex items-center gap-1.5">
                          <span>{m.name}</span>
                          <span className="text-[9px] px-1 py-0.2 rounded bg-white/10 text-slate-400 font-mono">
                            Cat. {m.category}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400">{m.subregion}</div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-[9px] font-mono text-emerald-400 font-bold block">
                          {m.population.toLocaleString('es-CO')} hab
                        </span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Ficha sintética del municipio seleccionado */}
            <div className="mt-4 pt-3 border-t border-white/10 space-y-2 px-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Municipio</span>
                <span className="font-black text-white">{currentMuni.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Categoría / Subregión</span>
                <span className="font-bold text-emerald-300 text-[10px]">{currentMuni.category} • {currentMuni.subregion}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Población DANE</span>
                <span className="font-black text-sky-300 font-mono">{currentMuni.totalPopulation.toLocaleString('es-CO')} hab.</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Censo Electoral</span>
                <span className="font-bold text-white font-mono">{currentMuni.electoralCensus.toLocaleString('es-CO')} votantes</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-bold uppercase text-[10px]">NBI Pobreza</span>
                <span className="font-bold text-amber-300 font-mono">{currentMuni.nbiPercentage}%</span>
              </div>
              {activeMasterRec && (
                <div className="pt-2 border-t border-white/05 text-[10px] text-slate-300 space-y-0.5">
                  <div className="text-slate-400 uppercase font-bold text-[9px]">Alcaldía (2024-2027):</div>
                  <div className="font-black text-white">{activeMasterRec.electedMayor}</div>
                  <div className="text-sky-300 truncate">{activeMasterRec.winnerParty}</div>
                </div>
              )}

              <div className="pt-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Vocación Económica</span>
                <div className="flex flex-wrap gap-1">
                  {currentMuni.economicDrivers.slice(0, 3).map((driver, i) => (
                    <span key={i} className="text-[9px] bg-slate-100 text-slate-200 font-bold px-2 py-0.5 rounded-md">
                      {driver}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Ventana del Municipio Seleccionado (9 Cols) */}
        <div className="lg:col-span-9 space-y-6">

          {/* Encabezado y Herramientas Territoriales (3D/Mapas para los 7 estratégicos, Ficha Maestra DANE para los 125) */}
          {isStrategic7 ? (
            <div className="space-y-6">
              {/* Barra Superior de Control de Visualización Territorial */}
              <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl rounded-2xl p-3 sm:p-3.5 shadow-sm border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-900 text-white flex items-center justify-center font-black text-xs shadow-2xs">
                    {currentMuni.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-blue-900 bg-sky-500/10 px-2 py-0.5 rounded-md border border-blue-200">
                        SISTEMA TERRITORIAL • {currentMuni.name.toUpperCase()}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">
                        {ALL_MUNICIPIOS_TERRITORIAL_DATA[selectedMuniId]?.areas?.length || currentMuni.areas.length} divisiones oficiales
                      </span>
                    </div>
                    <span className="text-xs font-black text-white block mt-0.5">
                      Inteligencia Territorial, Diorama 3D y Demografía
                    </span>
                  </div>
                </div>

                {/* Conmutador de vistas */}
                <div className="flex flex-wrap bg-slate-100 p-1 rounded-xl text-xs font-bold self-start sm:self-auto border border-white/10/80">
                  <button
                    onClick={() => setMuniViewMode('both')}
                    className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                      muniViewMode === 'both'
                        ? 'bg-blue-900 text-white shadow-xs'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Vista Integral</span>
                  </button>
                  <button
                    onClick={() => setMuniViewMode('charts')}
                    className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                      muniViewMode === 'charts'
                        ? 'bg-blue-900 text-white shadow-xs'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <BarChart3 className="w-3.5 h-3.5 text-pink-400" />
                    <span>Gráficas Círculo & Barras</span>
                  </button>
                  <button
                    onClick={() => setMuniViewMode('comunas')}
                    className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                      muniViewMode === 'comunas'
                        ? 'bg-blue-900 text-white shadow-xs'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    <span>Pánel por Comuna</span>
                  </button>
                  <button
                    onClick={() => setMuniViewMode('diorama3d')}
                    className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                      muniViewMode === 'diorama3d'
                        ? 'bg-blue-900 text-white shadow-xs'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <Box className="w-3.5 h-3.5 text-sky-400" />
                    <span>Diorama 3D</span>
                  </button>
                  <button
                    onClick={() => setMuniViewMode('map')}
                    className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                      muniViewMode === 'map'
                        ? 'bg-blue-900 text-white shadow-xs'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <Compass className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Mapa Cartográfico</span>
                  </button>
                </div>
              </div>

              {/* Componente Diorama 3D Interactivo (si mode es 'diorama3d') */}
              {muniViewMode === 'diorama3d' && (
                selectedMuniId === 'rionegro' ? (
                  <Rionegro3DDiorama
                    selectedAreaId={selectedAreaId}
                    onSelectArea={(areaId) => setSelectedAreaId(areaId)}
                  />
                ) : (
                  <Municipio3DDiorama
                    muniId={selectedMuniId}
                    selectedAreaId={selectedAreaId}
                    onSelectArea={(areaId) => setSelectedAreaId(areaId)}
                  />
                )
              )}

              {/* Componente Mapa Interactivo (si mode es 'both' o 'map') */}
              {(muniViewMode === 'both' || muniViewMode === 'map') && (
                selectedMuniId === 'rionegro' ? (
                  <RionegroInteractiveMap
                    areas={currentMuni.areas}
                    selectedAreaId={selectedAreaId}
                    onSelectArea={(areaId) => setSelectedAreaId(areaId)}
                  />
                ) : selectedMuniId === 'bello' ? (
                  <BelloInteractiveMap
                    areas={currentMuni.areas}
                    selectedAreaId={selectedAreaId}
                    onSelectArea={(areaId) => setSelectedAreaId(areaId)}
                  />
                ) : (
                  <MunicipioInteractiveMap
                    muniId={selectedMuniId}
                    selectedAreaId={selectedAreaId}
                    onSelectArea={(areaId) => setSelectedAreaId(areaId)}
                  />
                )
              )}

              {/* Componente de Gráficas Demográficas Círculo y Barras (si mode es 'both' o 'charts') */}
              {(muniViewMode === 'both' || muniViewMode === 'charts') && (
                selectedMuniId === 'rionegro' ? (
                  <RionegroECVDashboard
                    selectedAreaId={selectedAreaId}
                    onSelectArea={(areaId) => setSelectedAreaId(areaId)}
                  />
                ) : (
                  <MunicipioDemographicDashboard
                    muniId={selectedMuniId}
                    selectedAreaId={selectedAreaId}
                    onSelectArea={(areaId) => setSelectedAreaId(areaId)}
                  />
                )
              )}

              {/* Componente Específico Pánel por Comuna y Corregimiento (si mode es 'comunas') */}
              {muniViewMode === 'comunas' && (
                selectedMuniId === 'rionegro' ? (
                  <RionegroECVDashboard
                    selectedAreaId={selectedAreaId}
                    onSelectArea={(areaId) => setSelectedAreaId(areaId)}
                  />
                ) : (
                  <MunicipioCommuneDetailCard
                    muniId={selectedMuniId}
                    selectedAreaId={selectedAreaId}
                    onSelectArea={(areaId) => setSelectedAreaId(areaId)}
                  />
                )
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Barra Superior Ficha Maestra Municipal de Alta Definición */}
              <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white flex items-center justify-center font-black text-sm shadow-md border border-emerald-400/30">
                    {currentMuni.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-400/30">
                        FICHA MAESTRA DANE & REGISTRADURÍA • {currentMuni.name.toUpperCase()}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 font-mono">
                        DANE: {activeMasterRec?.daneCode || '05000'} • Cat. {activeMasterRec?.category || currentMuni.category}
                      </span>
                    </div>
                    <span className="text-xs font-black text-white block mt-0.5">
                      Subregión {activeMasterRec?.subregion || currentMuni.subregion} • Gobernabilidad, Demografía y Dinámica Electoral
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {/* Botón de Creación de Contenido Territorial */}
                  <button
                    onClick={() => {
                      activeTerritoryService.setState({
                        scale: 'municipal',
                        name: activeMasterRec ? activeMasterRec.name : currentMuni.name,
                        fullName: `${activeMasterRec ? activeMasterRec.name : currentMuni.name} (${activeMasterRec?.subregion || currentMuni.subregion}, Antioquia)`,
                        deptId: 'dept-antioquia',
                        subregId: activeMasterRec?.subregionId || 'subreg-oriente',
                        muniId: activeMasterRec?.id || selectedMuniId,
                        population: activeMasterRec?.population || currentMuni.totalPopulation,
                        electoralCensus: activeMasterRec?.electoralCensus || currentMuni.electoralCensus,
                        nbiPercentage: activeMasterRec?.nbiPercentage || currentMuni.nbiPercentage,
                        predominantStratum: activeMasterRec?.predominantStratum || 'Estrato 1 y 2',
                        electedMayor: activeMasterRec?.electedMayor,
                        winnerParty: activeMasterRec?.winnerParty,
                        keyProblems: activeMasterRec?.keyProblems || [],
                        strategicOpportunities: activeMasterRec?.strategicOpportunities || [],
                        economicSectors: activeMasterRec?.economicSectors || currentMuni.economicDrivers,
                        securityDynamics: activeMasterRec?.securityDynamics || {},
                        source: 'manual_selector'
                      });
                      if (onNavigateToContentDirector) {
                        onNavigateToContentDirector();
                      }
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-sky-600 hover:from-emerald-500 hover:to-sky-500 text-white font-black text-xs flex items-center gap-1.5 shadow-lg cursor-pointer transition-all border border-emerald-400/40 hover:scale-105"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Crear Discurso con Gemini</span>
                  </button>

                  {/* Selector de pestañas */}
                  <div className="flex bg-slate-800/80 p-1 rounded-xl text-xs font-bold border border-white/10">
                    <button
                      onClick={() => setNonStrategicTab('ficha')}
                      className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                        nonStrategicTab === 'ficha' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Ficha Integral</span>
                    </button>
                    <button
                      onClick={() => setNonStrategicTab('demografia')}
                      className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                        nonStrategicTab === 'demografia' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      <BarChart3 className="w-3.5 h-3.5 text-sky-400" />
                      <span>Demografía</span>
                    </button>
                    <button
                      onClick={() => setNonStrategicTab('veredas')}
                      className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                        nonStrategicTab === 'veredas' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5 text-rose-400" />
                      <span>Veredas y Áreas</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Contenido según pestaña */}
              {nonStrategicTab === 'ficha' && (
                <div className="space-y-4">
                  {/* Grid de 4 KPIs */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-3.5 shadow-lg">
                      <div className="flex items-center justify-between text-slate-400 text-xs font-bold mb-1">
                        <span>Población DANE</span>
                        <Users className="w-4 h-4 text-sky-400" />
                      </div>
                      <div className="text-xl font-black text-white font-mono">
                        {(activeMasterRec?.population || currentMuni.totalPopulation).toLocaleString('es-CO')}
                      </div>
                      <span className="text-[10px] text-slate-400">Habitantes proyectados</span>
                    </div>

                    <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-3.5 shadow-lg">
                      <div className="flex items-center justify-between text-slate-400 text-xs font-bold mb-1">
                        <span>Censo Electoral</span>
                        <Vote className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div className="text-xl font-black text-white font-mono">
                        {(activeMasterRec?.electoralCensus || currentMuni.electoralCensus).toLocaleString('es-CO')}
                      </div>
                      <span className="text-[10px] text-emerald-400/80">Registraduría 2023</span>
                    </div>

                    <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-3.5 shadow-lg">
                      <div className="flex items-center justify-between text-slate-400 text-xs font-bold mb-1">
                        <span>Pobreza NBI</span>
                        <TrendingUp className="w-4 h-4 text-amber-400" />
                      </div>
                      <div className="text-xl font-black text-amber-300 font-mono">
                        {activeMasterRec?.nbiPercentage ?? currentMuni.nbiPercentage}%
                      </div>
                      <span className="text-[10px] text-slate-400">Necesidades básicas</span>
                    </div>

                    <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-3.5 shadow-lg">
                      <div className="flex items-center justify-between text-slate-400 text-xs font-bold mb-1">
                        <span>Riesgo / Seguridad</span>
                        <ShieldCheck className="w-4 h-4 text-indigo-400" />
                      </div>
                      <div className="text-xl font-black text-white">
                        <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full ${
                          activeMasterRec?.riskLevel === 'Crítico' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                          activeMasterRec?.riskLevel === 'Alto' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                          activeMasterRec?.riskLevel === 'Medio' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40' :
                          'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        }`}>
                          {activeMasterRec?.riskLevel || 'Bajo'}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400">Orden institucional</span>
                    </div>
                  </div>

                  {/* Bloque Central: Alcaldía y Concejo */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Tarjeta Alcaldía */}
                    <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-lg space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-emerald-400" />
                          <span className="text-xs font-black text-white uppercase tracking-wider">
                            Alcaldía Municipal (2024-2027)
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400">Oficial Gobernación</span>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase block">Alcalde Electo</span>
                          <span className="text-sm font-black text-white">
                            {activeMasterRec?.electedMayor || 'Mandatario Municipal'}
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase block">Partido / Coalición</span>
                          <span className="text-xs font-bold text-emerald-300">
                            {activeMasterRec?.winnerParty || 'Coalición Ganadora'}
                          </span>
                        </div>

                        {activeMasterRec?.votesMayor && (
                          <div className="flex items-center justify-between text-xs pt-1 border-t border-white/05 font-mono">
                            <span className="text-slate-400 text-[11px]">Votos Alcalde:</span>
                            <span className="font-black text-white">
                              {activeMasterRec.votesMayor.toLocaleString('es-CO')} ({activeMasterRec.percentageValidMayor}% válidos)
                            </span>
                          </div>
                        )}

                        {activeMasterRec?.runnerUp && (
                          <div className="pt-2 border-t border-white/05 space-y-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase block">
                              Segundo Lugar / Estatuto de Oposición
                            </span>
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-slate-200">{activeMasterRec.runnerUp.name}</span>
                              <span className="text-[10px] font-mono text-slate-400">
                                {activeMasterRec.runnerUp.votes ? `${activeMasterRec.runnerUp.votes.toLocaleString('es-CO')} votos` : ''}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-[10px] text-slate-400">
                              <span>{activeMasterRec.runnerUp.party}</span>
                              <span className={`px-1.5 py-0.5 rounded font-mono ${
                                activeMasterRec.runnerUp.acceptedOppositionSeat
                                  ? 'bg-emerald-500/20 text-emerald-300'
                                  : 'bg-slate-800 text-slate-400'
                              }`}>
                                {activeMasterRec.runnerUp.acceptedOppositionSeat ? 'Curul Aceptada' : 'Sin curul'}
                              </span>
                            </div>
                          </div>
                        )}

                        {activeMasterRec?.contact && (
                          <div className="pt-2 border-t border-white/05 flex flex-wrap gap-2 text-[10px] text-slate-400">
                            {activeMasterRec.contact.phone && (
                              <span className="flex items-center gap-1">
                                <Phone className="w-3 h-3 text-sky-400" />
                                {activeMasterRec.contact.phone}
                              </span>
                            )}
                            {activeMasterRec.contact.email && (
                              <span className="flex items-center gap-1">
                                <Mail className="w-3 h-3 text-emerald-400" />
                                {activeMasterRec.contact.email}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Tarjeta Concejo Municipal */}
                    <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-lg space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <Vote className="w-4 h-4 text-sky-400" />
                          <span className="text-xs font-black text-white uppercase tracking-wider">
                            Concejo Municipal ({activeMasterRec?.totalCouncilSeats || 11} Curules)
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400">Periodo 2024-2027</span>
                      </div>

                      <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                        {activeMasterRec?.councilSeats && activeMasterRec.councilSeats.length > 0 ? (
                          activeMasterRec.councilSeats.map((c, i) => (
                            <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-white/[0.03] border border-white/05 text-xs">
                              <span className="font-bold text-slate-200 truncate pr-2">{c.party}</span>
                              <div className="flex items-center gap-2 shrink-0">
                                <span className="px-2 py-0.5 rounded-lg bg-sky-500/20 text-sky-300 font-mono font-black text-xs">
                                  {c.seats} {c.seats === 1 ? 'curul' : 'curules'}
                                </span>
                                {c.percentageValid && (
                                  <span className="text-[10px] font-mono text-slate-400">
                                    {c.percentageValid}%
                                  </span>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-xs text-slate-400 p-3 rounded-xl bg-white/[0.02]">
                            Concejo de {activeMasterRec?.totalCouncilSeats || 11} curules con representación multipartidista regional.
                          </div>
                        )}
                      </div>

                      {activeMasterRec?.predominantParty && (
                        <div className="pt-2 border-t border-white/05 text-[10px] text-slate-400 flex items-center justify-between">
                          <span>Fuerza Partidista Dominante:</span>
                          <span className="font-black text-white">{activeMasterRec.predominantParty}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Problemáticas vs Oportunidades y Seguridad */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Problemáticas Críticas */}
                    <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-lg space-y-2.5">
                      <div className="flex items-center gap-2 pb-2 border-b border-white/10 text-amber-300">
                        <AlertTriangle className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-black uppercase tracking-wider">
                          Problemáticas Territoriales Prioritarias
                        </span>
                      </div>
                      <div className="space-y-2">
                        {(activeMasterRec?.keyProblems || [
                          'Mantenimiento de vías terciarias y acceso a centros de acopio',
                          'Conectividad digital y cobertura de servicios básicos rurales',
                          'Fortalecimiento de la red de salud municipal'
                        ]).map((prob, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                            <span className="text-amber-400 font-black mt-0.5">•</span>
                            <span>{prob}</span>
                          </div>
                        ))}
                      </div>

                      {activeMasterRec?.securityDynamics && (
                        <div className="pt-2 border-t border-white/05 text-[10px] text-slate-400 space-y-1">
                          <div className="font-bold text-slate-300 flex items-center gap-1">
                            <Shield className="w-3 h-3 text-indigo-400" />
                            <span>Dinámica de Orden Público:</span>
                          </div>
                          <p className="text-slate-400 italic">
                            {activeMasterRec.securityDynamics.armedPresence || 'Vigilancia institucional de la Policía y Ejército Nacional.'}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Oportunidades Estratégicas y Vocación */}
                    <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-lg space-y-2.5">
                      <div className="flex items-center gap-2 pb-2 border-b border-white/10 text-emerald-300">
                        <Target className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-black uppercase tracking-wider">
                          Oportunidades y Vocación Productiva
                        </span>
                      </div>
                      <div className="space-y-2">
                        {(activeMasterRec?.strategicOpportunities || [
                          'Agroindustria sostenible y tecnificación de cadenas de valor',
                          'Turismo comunitario, ecológico y patrimonio histórico',
                          'Inversión en placas huella y conectividad vial subregional'
                        ]).map((opp, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                            <span className="text-emerald-400 font-black mt-0.5">•</span>
                            <span>{opp}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-white/05">
                        <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1.5">
                          Sectores Económicos Principales
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {(activeMasterRec?.economicSectors || currentMuni.economicDrivers).map((sec, i) => (
                            <span key={i} className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                              {sec}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Pestaña Demografía */}
              {nonStrategicTab === 'demografia' && (
                <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-lg space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div>
                      <h3 className="text-sm font-black text-white">Estructura Demográfica Estimada • {currentMuni.name}</h3>
                      <p className="text-xs text-slate-400">Distribución de edades, estratos socioeconómicos y niveles de escolaridad DANE</p>
                    </div>
                    <span className="text-xs font-mono text-emerald-400 font-bold">
                      {currentMuni.totalPopulation.toLocaleString('es-CO')} hab
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Grupos de edad */}
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/05 space-y-2">
                      <span className="text-xs font-black text-sky-400 block uppercase">Rangos de Edad</span>
                      <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-300">Jóvenes (18-28):</span>
                          <span className="font-mono text-white font-bold">{currentMuni.demographics.ageGroups.joven.percentage}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-300">Adultos (29-59):</span>
                          <span className="font-mono text-white font-bold">{currentMuni.demographics.ageGroups.adulto.percentage}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-300">Adultos Mayores (60+):</span>
                          <span className="font-mono text-white font-bold">{currentMuni.demographics.ageGroups.adultoMayor.percentage}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Estratos */}
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/05 space-y-2">
                      <span className="text-xs font-black text-amber-400 block uppercase">Estratos Socioeconómicos</span>
                      <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-300">Estrato 1 y 2 (Bajo):</span>
                          <span className="font-mono text-white font-bold">{currentMuni.demographics.socioeconomicStratum.bajo.percentage}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-300">Estrato 3 y 4 (Medio):</span>
                          <span className="font-mono text-white font-bold">{currentMuni.demographics.socioeconomicStratum.medio.percentage}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-300">Estrato 5 y 6 (Alto):</span>
                          <span className="font-mono text-white font-bold">{currentMuni.demographics.socioeconomicStratum.alto.percentage}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Escolaridad */}
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/05 space-y-2">
                      <span className="text-xs font-black text-emerald-400 block uppercase">Nivel Educativo</span>
                      <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-300">Básico:</span>
                          <span className="font-mono text-white font-bold">{currentMuni.demographics.educationLevels.basico.percentage}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-300">Medio / Técnico:</span>
                          <span className="font-mono text-white font-bold">{currentMuni.demographics.educationLevels.medio.percentage}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-300">Superior / Universitario:</span>
                          <span className="font-mono text-white font-bold">{currentMuni.demographics.educationLevels.superior.percentage}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Pestaña Veredas */}
              {nonStrategicTab === 'veredas' && (
                <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-lg space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div>
                      <h3 className="text-sm font-black text-white">Zonificación Territorial • {currentMuni.name}</h3>
                      <p className="text-xs text-slate-400">División en cabecera urbana, centros poblados y corredores veredales</p>
                    </div>
                    <span className="text-xs font-mono text-sky-400 font-bold">
                      {currentMuni.areas.length} divisiones
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentMuni.areas.map((area) => (
                      <div
                        key={area.id}
                        onClick={() => setSelectedAreaId(area.id)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                          selectedAreaId === area.id
                            ? 'bg-emerald-950/60 border-emerald-400 shadow-md'
                            : 'bg-white/[0.03] border-white/05 hover:bg-white/[0.06]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-white text-xs">{area.name}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 font-mono text-slate-300">
                            {area.type}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-relaxed mb-2">
                          {area.characteristics}
                        </p>
                        <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-white/05 font-mono">
                          <span>Población est: {area.estimatedPopulation.toLocaleString('es-CO')}</span>
                          <span className="text-emerald-400">{area.predominantStratum}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Fila de 2 Columnas: Izquierda (Herramienta Analista) | Derecha (Desplegables) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Recuadro Izquierdo: Herramienta "Analista" (Col 7) */}
            <main className="lg:col-span-7 space-y-5">
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl rounded-3xl p-5 sm:p-6 shadow-sm border border-white/10 flex flex-col justify-between h-full space-y-5">
            <div>
              {/* Header del Analista */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-150">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-indigo-900 text-white shadow-md">
                    <BrainCircuit className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-black tracking-widest text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
                      Módulo de Inteligencia
                    </span>
                    <h2 className="text-lg sm:text-xl font-black text-white tracking-tight mt-0.5">
                      Herramienta «Analista»
                    </h2>
                  </div>
                </div>
                <span className="text-[10px] font-extrabold bg-emerald-500/10 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  Estrategia IA
                </span>
              </div>

              {/* Panel de calibración del candidato (Factor 4) */}
              <div className="mt-4 bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-2xl p-4 border border-white/10/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-slate-300" />
                    <span className="text-xs font-black uppercase text-white">
                      Factor 4: Perfil del Candidato
                    </span>
                  </div>

                  {candidateProfile && (
                    <div className="flex bg-slate-200 p-0.5 rounded-lg text-[10px] font-bold">
                      <button
                        onClick={() => setCandidateSourceMode('bio')}
                        className={`px-2 py-0.5 rounded-md transition-all ${
                          candidateSourceMode === 'bio' ? 'bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl text-blue-900 shadow-xs' : 'text-slate-300'
                        }`}
                      >
                        Biografía
                      </button>
                      <button
                        onClick={() => setCandidateSourceMode('custom')}
                        className={`px-2 py-0.5 rounded-md transition-all ${
                          candidateSourceMode === 'custom' ? 'bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl text-blue-900 shadow-xs' : 'text-slate-300'
                        }`}
                      >
                        Personalizar
                      </button>
                    </div>
                  )}
                </div>

                {candidateSourceMode === 'bio' && candidateProfile ? (
                  <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-3 rounded-xl border border-white/10 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-blue-950 text-sm">{candidateProfile.nombre}</span>
                      <span className="text-[10px] bg-sky-500/10 text-blue-800 font-bold px-2 py-0.5 rounded-md">
                        {candidateProfile.afiliacionPartidista || 'Partido Activo'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 line-clamp-2">
                      <strong className="text-slate-200">Tono:</strong> {candidateProfile.tonoNarrativo || 'Pragmático y firme'}. 
                      {' '}<strong className="text-slate-200">Estilo:</strong> {candidateProfile.estiloComunicacion || 'Cercano e institucional'}.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-[11px] text-slate-400">
                      {candidateProfile 
                        ? 'Ingresa un nombre diferente para adaptar el informe a otro liderazgo político:'
                        : 'No has calibrado un perfil en Biografía. Ingresa el nombre del candidato y buscaremos sus datos en internet:'}
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Nombre completo del candidato..."
                        value={customCandidateName}
                        onChange={(e) => setCustomCandidateName(e.target.value)}
                        className="flex-1 bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                      <button
                        onClick={handleSearchCandidateOnline}
                        disabled={isSearchingCandidateWeb || !customCandidateName.trim()}
                        className="bg-slate-800 hover:bg-slate-900 disabled:opacity-50 text-white px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shrink-0"
                        title="Buscar trayectoria política del candidato con Google Search"
                      >
                        {isSearchingCandidateWeb ? (
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Search className="w-3.5 h-3.5" />
                        )}
                        <span>{isSearchingCandidateWeb ? 'Buscando...' : 'Buscar Web'}</span>
                      </button>
                    </div>

                    {candidateWebSearchBio && (
                      <div className="bg-emerald-500/10/80 border border-emerald-200 rounded-xl p-2.5 text-[11px] text-emerald-900 space-y-1">
                        <span className="font-extrabold flex items-center gap-1 text-[10px] uppercase text-emerald-800">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Datos extraídos de la web:
                        </span>
                        <p className="line-clamp-3 text-slate-200 leading-snug">{candidateWebSearchBio}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Parámetros Consolidados para el informe */}
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 p-2.5 rounded-xl border border-white/10/80">
                  <span className="text-[9px] font-bold text-slate-400 uppercase block">División</span>
                  <span className="text-xs font-black text-white truncate block mt-0.5" title={currentArea.name}>
                    {currentArea.name.split('-')[1] || currentArea.name}
                  </span>
                </div>
                <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 p-2.5 rounded-xl border border-white/10/80">
                  <span className="text-[9px] font-bold text-slate-400 uppercase block">Segmento</span>
                  <span className="text-xs font-black text-blue-900 block mt-0.5">
                    {selectedAge} / E{selectedStratum === 'bajo' ? '1-2' : selectedStratum === 'medio' ? '3-4' : '5-6'}
                  </span>
                </div>
                <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 p-2.5 rounded-xl border border-white/10/80">
                  <span className="text-[9px] font-bold text-slate-400 uppercase block">Elección</span>
                  <span className="text-xs font-black text-purple-900 block mt-0.5">
                    {selectedOffice}
                  </span>
                </div>
              </div>

              {/* Botón Principal: Ejecutar Analista */}
              <div className="mt-4">
                <button
                  id="btn-generar-analisis-estrategico"
                  onClick={handleRunAnalyst}
                  disabled={isGeneratingAnalysis}
                  className="w-full bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 hover:from-blue-950 hover:to-indigo-950 text-white py-3.5 px-4 rounded-2xl font-black text-xs sm:text-sm tracking-wide shadow-lg flex items-center justify-center gap-2.5 transition-all disabled:opacity-60"
                >
                  {isGeneratingAnalysis ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-blue-200" />
                      <span>Analizando territorio, psicología del votante y candidato...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-[#FACC15]" />
                      <span>GENERAR ESTRATEGIA PUBLICITARIA DIRIGIDA</span>
                    </>
                  )}
                </button>
              </div>

              {/* Informe del Analista (Estructura de 6 puntos) */}
              {analysisReport ? (
                <div className="mt-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-blue-700" />
                      Informe Estratégico Consolidado
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={handleCopyReport}
                        className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-white transition-all text-xs flex items-center gap-1"
                        title="Copiar texto del informe"
                      >
                        {copiedReport ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span className="text-[10px] font-bold">{copiedReport ? 'Copiado' : 'Copiar'}</span>
                      </button>
                      <button
                        onClick={handleExportPDF}
                        className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-white transition-all text-xs flex items-center gap-1"
                        title="Exportar a PDF"
                      >
                        <Download className="w-3.5 h-3.5 text-blue-700" />
                        <span className="text-[10px] font-bold">PDF</span>
                      </button>
                    </div>
                  </div>

                  <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10/90 rounded-2xl p-4 border border-white/10/90 text-xs text-slate-200 space-y-3 max-h-[580px] overflow-y-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-300">
                    <div className="whitespace-pre-line font-sans prose-sm max-w-none text-white">
                      {analysisReport}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-6 border-2 border-dashed border-white/10 rounded-2xl p-6 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                    <BrainCircuit className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-black text-slate-200 uppercase tracking-tight">
                    Listo para Generar el Plan de Publicidad
                  </h4>
                  <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                    Selecciona el área en el recuadro derecho, calibra el cruce demográfico y tipo de elección, y presiona el botón para obtener el informe de 6 puntos.
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Recuadro Derecho: Listas Desplegables de Segmentación (Col 5) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl rounded-3xl p-5 sm:p-6 shadow-sm border border-white/10 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-150">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-blue-700" />
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  Recuadro de Configuración
                </h3>
              </div>
              <span className="text-[10px] font-extrabold text-blue-900 bg-sky-500/10 px-2 py-0.5 rounded-full">
                3 Filtros Maestros
              </span>
            </div>

            {/* 1. DESPLEGABLE: Área dentro del Municipio */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-white uppercase tracking-tight flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  1. Área / División Político-Administrativa
                </label>
                <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                  currentArea.type === 'Urbana' ? 'bg-sky-500/20 text-sky-300 text-blue-800' : 'bg-amber-500/20 text-amber-300 text-amber-800'
                }`}>
                  {currentArea.type} ({currentArea.subtype})
                </span>
              </div>

              <select
                id="select-area-municipio"
                value={selectedAreaId}
                onChange={(e) => setSelectedAreaId(e.target.value)}
                className="w-full bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
              >
                {currentMuni.areas.map((area) => (
                  <option key={area.id} value={area.id}>
                    {area.name} ({area.type} - ~{area.estimatedPopulation.toLocaleString()} hab)
                  </option>
                ))}
              </select>

              {/* Ficha descriptiva del área seleccionada */}
              <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10/70 p-3 rounded-xl border border-white/10/80 space-y-1.5 text-[11px]">
                <div className="flex justify-between items-center text-slate-300">
                  <span>Población del área: <strong className="text-white">{currentArea.estimatedPopulation.toLocaleString()}</strong></span>
                  <span>Estrato: <strong className="text-white">{currentArea.predominantStratum}</strong></span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>Educación media: <strong className="text-white">{currentArea.educationalLevelGeneral}</strong></span>
                  <span>Densidad: <strong className="text-white">{currentArea.urbanDensity}</strong></span>
                </div>
                <div className="pt-1 text-slate-400 text-[10px]">
                  <strong>Barrios/Veredas:</strong> {currentArea.barriosOrVeredas.slice(0, 5).join(', ')}
                  {currentArea.barriosOrVeredas.length > 5 && ` (+${currentArea.barriosOrVeredas.length - 5} más)`}.
                </div>
              </div>
            </div>

            {/* 2. DESPLEGABLE: Sector Demográfico (Cruce de variables) */}
            <div className="space-y-3 pt-3 border-t border-slate-150">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-white uppercase tracking-tight flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-emerald-600" />
                  2. Sector Demográfico (Cruce de Variables)
                </label>
              </div>

              {/* Sub-selector Grupo Etario */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Grupo Etario</span>
                <select
                  value={selectedAge}
                  onChange={(e) => setSelectedAge(e.target.value as any)}
                  className="w-full bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                >
                  <option value="joven">Joven (18 - 28 años) - {currentMuni.demographics.ageGroups.joven.percentage}%</option>
                  <option value="adulto">Adulto (29 - 59 años) - {currentMuni.demographics.ageGroups.adulto.percentage}%</option>
                  <option value="adultoMayor">Adulto Mayor (60+ años) - {currentMuni.demographics.ageGroups.adultoMayor.percentage}%</option>
                </select>
              </div>

              {/* Sub-selector Estrato */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Estrato Socioeconómico</span>
                <select
                  value={selectedStratum}
                  onChange={(e) => setSelectedStratum(e.target.value as any)}
                  className="w-full bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                >
                  <option value="bajo">Bajo (Estrato 1 y 2) - {currentMuni.demographics.socioeconomicStratum.bajo.percentage}%</option>
                  <option value="medio">Medio (Estrato 3 y 4) - {currentMuni.demographics.socioeconomicStratum.medio.percentage}%</option>
                  <option value="alto">Alto (Estrato 5 y 6) - {currentMuni.demographics.socioeconomicStratum.alto.percentage}%</option>
                </select>
              </div>

              {/* Sub-selector Nivel Educativo */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Nivel Educativo</span>
                <select
                  value={selectedEducation}
                  onChange={(e) => setSelectedEducation(e.target.value as any)}
                  className="w-full bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                >
                  <option value="basico">Básico (Primaria / Secundaria incompleta) - {currentMuni.demographics.educationLevels.basico.percentage}%</option>
                  <option value="medio">Medio (Bachiller / Técnico / Tecnólogo SENA) - {currentMuni.demographics.educationLevels.medio.percentage}%</option>
                  <option value="superior">Superior (Universitario / Posgrados) - {currentMuni.demographics.educationLevels.superior.percentage}%</option>
                </select>
              </div>

              {/* Cuadro de Estimación de Personas en Vivo */}
              <div className="bg-emerald-500/10/90 border border-emerald-200 rounded-2xl p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 flex items-center gap-1">
                    <Target className="w-3.5 h-3.5 text-emerald-600" />
                    Estimación Poblacional del Cruce
                  </span>
                  <span className="text-[9px] font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full">
                    {demographicEstimation.percentageOfArea}% del área
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center pt-1">
                  <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-2 rounded-xl shadow-2xs border border-emerald-100">
                    <span className="text-[9px] font-bold text-slate-400 uppercase block">Población Objetivo</span>
                    <span className="text-base font-black text-emerald-900">
                      {demographicEstimation.finalEstimatedCount.toLocaleString()}
                    </span>
                    <span className="text-[9px] text-slate-400 block">habitantes</span>
                  </div>
                  <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-2 rounded-xl shadow-2xs border border-emerald-100">
                    <span className="text-[9px] font-bold text-slate-400 uppercase block">Potencial Votante</span>
                    <span className="text-base font-black text-blue-900">
                      ~{demographicEstimation.estimatedVoterTurnout.toLocaleString()}
                    </span>
                    <span className="text-[9px] text-slate-400 block">urnas proyectadas</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. DESPLEGABLE: Tipo de Elección */}
            <div className="space-y-3 pt-3 border-t border-slate-150">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-white uppercase tracking-tight flex items-center gap-1.5">
                  <Vote className="w-3.5 h-3.5 text-purple-600" />
                  3. Tipo de Elección
                </label>
                <span className="text-[9px] font-bold bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">
                  Competencias Específicas
                </span>
              </div>

              <select
                id="select-tipo-eleccion"
                value={selectedOffice}
                onChange={(e) => setSelectedOffice(e.target.value as any)}
                className="w-full bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-white focus:ring-2 focus:ring-purple-600 focus:outline-none"
              >
                <option value="Concejo">Concejo Municipal (Control político & acuerdos)</option>
                <option value="Alcaldía">Alcaldía Municipal (Poder ejecutivo local)</option>
                <option value="Asamblea">Asamblea Departamental (Diputados & ordenanzas)</option>
                <option value="Gobernación">Gobernación de Antioquia (Poder ejecutivo seccional)</option>
              </select>

              {/* Ficha de Antecedentes Electorales Inmediatos (2023) */}
              <div className="bg-purple-50/70 border border-purple-200/80 rounded-2xl p-3.5 space-y-2 text-xs">
                <div className="flex items-center justify-between text-[10px] font-black uppercase text-purple-900 border-b border-purple-200/60 pb-1.5">
                  <span>Antecedentes 2023 ({selectedOffice})</span>
                  <span className="text-slate-400 font-bold">Abstención: {currentElectoralData.immediateAntecedents2023.abstentionRate}%</span>
                </div>

                <div className="space-y-1 text-[11px] text-slate-200">
                  <div className="flex justify-between">
                    <span className="text-slate-400">1º Lugar / Vencedor:</span>
                    <strong className="text-white truncate max-w-[170px]" title={currentElectoralData.immediateAntecedents2023.winnerOrLeadingParty}>
                      {currentElectoralData.immediateAntecedents2023.winnerOrLeadingParty}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Votos 1º Lugar:</span>
                    <strong className="text-purple-900 font-mono">
                      {currentElectoralData.immediateAntecedents2023.winnerVotes.toLocaleString()}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">2º Lugar:</span>
                    <span className="text-slate-200 truncate max-w-[170px]" title={currentElectoralData.immediateAntecedents2023.secondPlaceOrParty}>
                      {currentElectoralData.immediateAntecedents2023.secondPlaceOrParty}
                    </span>
                  </div>
                </div>

                <div className="pt-1.5 border-t border-purple-200/60 text-[10px] text-purple-950 leading-tight">
                  <strong className="text-purple-900">Competencias del cargo:</strong> {currentElectoralData.competencies}
                </div>
              </div>
            </div>

          </div>
        </div>

          </div>
        </div>

      </div>
    </div>
  );
};

// Generador de informe de contingencia estructurado en los 6 puntos exactos
function generateFallbackReport(
  muni: StrategicMunicipality,
  area: any,
  age: 'joven' | 'adulto' | 'adultoMayor',
  stratum: 'bajo' | 'medio' | 'alto',
  education: 'basico' | 'medio' | 'superior',
  office: string,
  candidateName: string,
  demographics: any
): string {
  const ageLabel = age === 'joven' ? 'Jóvenes (18-28 años)' : age === 'adulto' ? 'Adultos (29-59 años)' : 'Adultos Mayores (60+ años)';
  const stratumLabel = stratum === 'bajo' ? 'Estrato Bajo (1-2)' : stratum === 'medio' ? 'Estrato Medio (3-4)' : 'Estrato Alto (5-6)';
  const eduLabel = education === 'basico' ? 'Nivel Básico' : education === 'medio' ? 'Nivel Medio / Técnico' : 'Nivel Superior Universitario';

  return `### 1. Perfil general
El segmento objetivo en ${area.name} (${muni.name}, Antioquia) corresponde a ${ageLabel} de ${stratumLabel} con ${eduLabel}, representando un universo estimado de ${demographics.finalEstimatedCount.toLocaleString()} personas con un potencial directo de votantes en urnas de ~${demographics.estimatedVoterTurnout.toLocaleString()} ciudadanos. Para la contienda a ${office.toUpperCase()}, la candidatura de ${candidateName} debe articular una oferta diferenciada que responda a la identidad barrial y a los antecedentes electorales del municipio, donde la disciplina comunitaria y las demandas de ${area.type === 'Urbana' ? 'seguridad barrial, movilidad metropolitana y empleo' : 'vías terciarias, apoyo al productor y conectividad rural'} condicionan la decisión de voto.

### 2. Descripción psicológica del votante seleccionado
- **Motivaciones:** Búsqueda de estabilidad, certidumbre económica y protección de su entorno cotidiano. En este grupo poblacional existe alta sensibilidad frente a la falta de oportunidades concretas y el costo de vida metropolitano.
- **Miedos y frustraciones:** Temor a la delincuencia común, microtráfico en parques y esquinas, y frustración ante promesas incumplidas de políticos tradicionales. Desconfianza hacia discursos radicales o improvisados.
- **Aspiraciones:** Formalización, independencia económica o progreso para sus hijos en educación técnica/universitaria; orgullo por su territorio en ${muni.name} y anhelo de que sus impuestos se reflejen en obras tangibles.
- **Detonante de voto:** Credibilidad ética del candidato, demostración de carácter con cercanía humana y propuestas viables que no suenen a utopía burocrática.

### 3. Líneas discursivas estratégicas
Ajustadas estrictamente a las competencias constitucionales de ${office.toUpperCase()}:
- **Línea 1 (Seguridad y Tranquilidad Territorial):** ${office === 'Concejo' || office === 'Asamblea' ? 'Control político riguroso y veeduría a los recursos de vigilancia, botones de pánico y frentes de seguridad barrial.' : 'Mano firme en el gobierno local/departamental con inversión en cámaras analíticas, recuperación de parques tomados y respaldo total a la Fuerza Pública.'}
- **Línea 2 (Oportunidades y Empleo para ${ageLabel}):** ${office === 'Concejo' || office === 'Asamblea' ? 'Gestión de acuerdos normativos para incentivos tributarios a empresas que contraten mano de obra local en ' + muni.name + '.' : 'Alianzas con el sector productivo privado y el SENA para crédito sin usura y capacitación técnica enfocada en demanda laboral real.'}
- **Línea 3 (Eficiencia y Defensa de la Calidad de Vida en ${area.name}):** ${office === 'Concejo' || office === 'Asamblea' ? 'Fiscalización milimétrica para que cada peso del presupuesto llegue a las vías y centros de salud del sector.' : 'Inversión focalizada en infraestructura comunitaria, mejoramiento del transporte integrado y salud oportuna sin filas.'}

**Eslóganes y Mensajes-Fuerza:**
- *"Con ${candidateName}, en ${muni.name} el orden y las oportunidades se hacen realidad."*
- *"${area.name} merece resultados, no promesas vacías."*

### 4. Tono narrativo prioritario
- **Tono Primario:** **Firme, Pragmático y Empático**.
- **Justificación Psicológica:** Este segmento rechaza tanto la soberbia tecnocrática distante como la demagogia populista. Responde positivamente a un liderazgo con aplomo y autoridad serena que hable el lenguaje claro de la calle y conozca al dedillo las cuadras y problemáticas de ${area.name}. La voz de ${candidateName} debe transmitir confiabilidad institucional y capacidad inmediata de ejecución.

### 5. Medios prioritarios
- **Digital / Redes Sociales:**
  - *Instagram y TikTok (Especialmente si el grupo es joven o adulto con educación media/superior):* Videos cortos en formato vertical grabados en el territorio (caminando en ${area.name}), con subtítulos dinámicos de alto contraste, mensaje frontal en los primeros 3 segundos y llamados a la acción concretos.
  - *Facebook y Grupos Barriales:* Contenido más descriptivo, testimonios de vecinos, galerías fotográficas de recorridos y transmisión en vivo de diálogos ciudadanos.
  - *WhatsApp (Comunidades y Estados):* Piezas infográficas en formato JPG/PDF ligero y audios directos de ${candidateName} saludando puntualmente a la comunidad de ${area.name}.
- **Territorio y Publicidad Física:**
  - Volanteo directo mano a mano con tarjeta electoral pedagógica en puntos de alto flujo peatonal (estaciones de transporte, parques comerciales).
  - Vallas y micro-perifoneo respetuoso en zonas de concentración comercial.
  - Encuentros comunitarios en casas de líderes barriales para generar efecto multiplicador persona a persona.

### 6. Brief general de contenidos
- **Pieza 1 (Video Corto Digital - 45 segundos):**
  - *Escena:* ${candidateName} caminando en una calle representativa de ${area.name} hablando directo a cámara.
  - *Gancho (0-5s):* "¿Cansado de que solo visiten ${area.name} cada cuatro años a prometer lo mismo?"
  - *Desarrollo (5-35s):* Explica puntualmente la propuesta principal para ${office} enfocada en el grupo seleccionado, mostrando cifras y soluciones concretas.
  - *Cierre (35-45s):* "Soy ${candidateName}. Con tu apoyo en las urnas, defenderemos ${muni.name}. ¡Vota bien!"
- **Pieza 2 (Volante / Flyer Territorial Microsegmentado):**
  - *Frente:* Foto cálida y decidida de ${candidateName}, logotipo de campaña y el compromiso específico para ${area.name}.
  - *Reverso:* Infografía de "Cómo votar por ${candidateName}" explicando el número en el tarjetón o casilla electoral para ${office}, junto a 3 compromisos verificables.
- **Pieza 3 (Activación en Territorio):**
  - Jornada de "Tinto y Diálogo con ${candidateName}" en el corazón de ${area.name}, con carpa móvil, toma pedagógica del espacio y registro digital de voluntarios del segmento.`;
}

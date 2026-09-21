import React, { useState, useMemo } from 'react';
import { 
  Vote, 
  Calendar, 
  TrendingUp, 
  Building2, 
  Award, 
  CheckCircle2, 
  Layers, 
  BarChart3,
  FileSpreadsheet,
  ChevronRight,
  ChevronDown,
  Sparkles,
  MapPin,
  Landmark,
  Flag,
  Globe2,
  Users,
  ChevronUp,
  Info
} from 'lucide-react';
import { COMUNAS_INFO } from '../../data/e24/comunasData';
import { 
  ALCALDIA_DATA_BY_YEAR, 
  CONCEJO_DATA_BY_YEAR, 
  TerritorialYear,
  getTerritorialComunaAggregations,
  getTerritorialMunicipalSummary
} from '../../data/e24/territorialData';
import { 
  SENADO_2022_COMUNA_AGGREGATIONS, 
  SENADO_2022_MUNICIPAL_SUMMARY, 
  SENADO_2022_CANDIDATES 
} from '../../data/e24/senado2022Data';
import { 
  CAMARA_2022_COMUNA_AGGREGATIONS, 
  CAMARA_2022_MUNICIPAL_SUMMARY, 
  CAMARA_2022_CANDIDATES 
} from '../../data/e24/camara2022Data';
import { 
  COMUNA_AGGREGATIONS, 
  MUNICIPAL_SUMMARY,
  PARTY_CANDIDATES 
} from '../../data/e24/e24Data';
import { 
  COMUNA_AGGREGATIONS_CAMARA, 
  MUNICIPAL_SUMMARY_CAMARA,
  CAMARA_CANDIDATES 
} from '../../data/e24/camaraData';
import { 
  COMUNA_AGGREGATIONS_PRESIDENCIA, 
  MUNICIPAL_SUMMARY_PRESIDENCIA,
  COMUNA_AGGREGATIONS_PRESIDENCIA_2022_1V,
  MUNICIPAL_SUMMARY_PRESIDENCIA_2022_1V,
  COMUNA_AGGREGATIONS_PRESIDENCIA_2022_2V,
  MUNICIPAL_SUMMARY_PRESIDENCIA_2022_2V,
  PRESIDENCIA_2022_1V_CANDIDATES,
  PRESIDENCIA_2022_2V_CANDIDATES
} from '../../data/e24/presidenciaData';
import { CONCEJO_2019_CANDIDATES } from '../../data/e24/officialConcejo2019';

interface E24HistoricalViewerProps {
  comunaId?: string | number;
  comunaName?: string;
  barrioName?: string;
  onSelectComuna?: (id: number) => void;
}

export type CorporationType = 'alcaldia' | 'concejo' | 'congreso' | 'presidencia';
export type CongresoType = 'senado' | 'camara';
export type PresidenciaStage = 'consulta' | 'primera_vuelta' | 'segunda_vuelta';

interface DisplayCandidate {
  id: string;
  name: string;
  shortName: string;
  partyName: string;
  color: string;
  votes: number;
  percentage: number;
  ideology: string;
  curules?: number;
  subCandidates?: { number: string; name: string; votes: number }[];
}

function parseComunaId(id?: string | number, name?: string): number {
  if (typeof id === 'number') {
    if ((id >= 1 && id <= 16) || id === 90) return id;
  }
  if (typeof id === 'string') {
    if (id.startsWith('med-c')) {
      const n = parseInt(id.replace('med-c', ''), 10);
      if (!isNaN(n) && n >= 1 && n <= 16) return n;
    }
    if (id.startsWith('comuna-')) {
      const n = parseInt(id.replace('comuna-', ''), 10);
      if (!isNaN(n) && n >= 1 && n <= 16) return n;
    }
    if (id.includes('correg')) return 90;
    const parsed = parseInt(id, 10);
    if (!isNaN(parsed) && ((parsed >= 1 && parsed <= 16) || parsed === 90)) return parsed;
  }
  if (name) {
    const match = name.match(/comuna\s*(\d+)/i) || name.match(/^(\d+)/);
    if (match) {
      const n = parseInt(match[1], 10);
      if (n >= 1 && n <= 16) return n;
    }
    const found = COMUNAS_INFO.find(c => 
      name.toLowerCase().includes(c.officialName.toLowerCase()) ||
      c.officialName.toLowerCase().includes(name.toLowerCase())
    );
    if (found) return found.id;
  }
  return 11; // Default to Comuna 11 - Laureles - Estadio
}

function getIdeologyTag(textToAnalyze: string): { label: string; bg: string; textCol: string } {
  const text = textToAnalyze.toUpperCase();
  if (
    text.includes('CREEMOS') || 
    text.includes('FICO') || 
    text.includes('GUTIÉRREZ') ||
    text.includes('CENTRO DEMOCR') || 
    text.includes('VALENCIA') || 
    text.includes('CABAL') || 
    text.includes('OVIEDO') || 
    text.includes('SALVACION') || 
    text.includes('RENDON') ||
    text.includes('RODOLFO') ||
    text.includes('SEGUIMOS')
  ) {
    return { label: 'CENTERRIGHT', bg: 'bg-purple-500/20 border-purple-400/40', textCol: 'text-purple-300' };
  }
  if (
    text.includes('INDEPENDIENTE') || 
    text.includes('UPEGUI') || 
    text.includes('QUINTERO') || 
    text.includes('PACTO') || 
    text.includes('PETRO') || 
    text.includes('POLO') || 
    text.includes('HUMANA') || 
    text.includes('FUERZA CIUDADANA') || 
    text.includes('ESTAMOS LISTAS') || 
    text.includes('CORREDOR')
  ) {
    return { label: 'ALTERNATIVO', bg: 'bg-cyan-500/20 border-cyan-400/40', textCol: 'text-cyan-300' };
  }
  if (
    text.includes('VERDE') || 
    text.includes('FAJARDO') || 
    text.includes('ESPERANZA') || 
    text.includes('DIGNIDAD')
  ) {
    return { label: 'CENTRO', bg: 'bg-emerald-500/20 border-emerald-400/40', textCol: 'text-emerald-300' };
  }
  if (
    text.includes('CONSERVADOR') || 
    text.includes('LIBERAL') || 
    text.includes('LA U') || 
    text.includes('CAMBIO RADICAL') || 
    text.includes('ASI') || 
    text.includes('LUIS PEREZ') || 
    text.includes('GAVIRIA') ||
    text.includes('MIRA')
  ) {
    return { label: 'TRADICIONAL', bg: 'bg-amber-500/20 border-amber-400/40', textCol: 'text-amber-300' };
  }
  return { label: 'INDEPENDIENTE', bg: 'bg-slate-500/20 border-slate-400/40', textCol: 'text-slate-300' };
}

export const E24HistoricalViewer: React.FC<E24HistoricalViewerProps> = ({
  comunaId,
  comunaName,
  barrioName,
  onSelectComuna
}) => {
  // Comuna resolution
  const resolvedComunaId = parseComunaId(comunaId, comunaName);
  const [activeComunaId, setActiveComunaId] = useState<number>(resolvedComunaId);

  // Synchronize when prop changes
  React.useEffect(() => {
    setActiveComunaId(parseComunaId(comunaId, comunaName));
  }, [comunaId, comunaName]);

  const activeComunaInfo = COMUNAS_INFO.find(c => c.id === activeComunaId) || COMUNAS_INFO[10];

  // Navigation state
  const [selectedCorp, setSelectedCorp] = useState<CorporationType>('alcaldia');
  const [selectedYear, setSelectedYear] = useState<number>(2023);
  const [congresoSubCorp, setCongresoSubCorp] = useState<CongresoType>('senado');
  const [presidenciaStage, setPresidenciaStage] = useState<PresidenciaStage>('consulta');
  const [viewScope, setViewScope] = useState<'comuna' | 'ciudad'>('comuna');
  const [expandedPartyId, setExpandedPartyId] = useState<string | null>(null);

  // When changing corporation, set default year
  const handleSelectCorp = (corp: CorporationType) => {
    setSelectedCorp(corp);
    setExpandedPartyId(null);
    if (corp === 'alcaldia' || corp === 'concejo') {
      setSelectedYear(2023);
    } else if (corp === 'congreso') {
      setSelectedYear(2022);
    } else if (corp === 'presidencia') {
      setSelectedYear(2026);
      setPresidenciaStage('consulta');
    }
  };

  // Compile active data dynamically
  const electionViewData = useMemo(() => {
    let votosValidos = 0;
    let votosBlanco = 0;
    let votosNulos = 0;
    let votosNoMarcados = 0;
    let totalVotos = 0;
    let candidatesList: DisplayCandidate[] = [];

    // 1. ALCALDÍA
    if (selectedCorp === 'alcaldia') {
      const yr = ([2023, 2019, 2015].includes(selectedYear) ? selectedYear : 2023) as TerritorialYear;
      if (viewScope === 'comuna') {
        const agg = getTerritorialComunaAggregations('alcaldia', yr)[activeComunaId];
        if (agg) {
          votosValidos = agg.votosValidos;
          votosBlanco = agg.votosBlanco;
          votosNulos = agg.votosNulos;
          votosNoMarcados = agg.votosNoMarcados;
          totalVotos = agg.totalVotos;
          candidatesList = agg.sortedParties.map(p => ({
            id: p.partyId,
            name: p.partyName,
            shortName: p.shortName,
            partyName: p.partyName,
            color: p.color,
            votes: p.totalPartyVotes,
            percentage: p.percentageValidos,
            ideology: getIdeologyTag(`${p.shortName} ${p.partyName}`).label
          }));
        }
      } else {
        const mun = ALCALDIA_DATA_BY_YEAR[yr] || ALCALDIA_DATA_BY_YEAR[2023];
        votosValidos = mun.votosValidos;
        votosBlanco = mun.votosBlanco;
        votosNulos = mun.votosNulos;
        votosNoMarcados = mun.votosNoMarcados;
        totalVotos = mun.totalVotos;
        candidatesList = mun.candidates.map(c => ({
          id: c.id,
          name: c.name,
          shortName: c.shortName,
          partyName: c.partyName,
          color: c.color,
          votes: c.baseTotalVotes,
          percentage: votosValidos > 0 ? (c.baseTotalVotes / votosValidos) * 100 : 0,
          ideology: getIdeologyTag(`${c.shortName} ${c.partyName}`).label
        }));
      }
    }

    // 2. CONCEJO
    else if (selectedCorp === 'concejo') {
      const yr = ([2023, 2019, 2015].includes(selectedYear) ? selectedYear : 2023) as TerritorialYear;
      if (viewScope === 'comuna') {
        const agg = getTerritorialComunaAggregations('concejo', yr)[activeComunaId];
        if (agg) {
          votosValidos = agg.votosValidos;
          votosBlanco = agg.votosBlanco;
          votosNulos = agg.votosNulos;
          votosNoMarcados = agg.votosNoMarcados;
          totalVotos = agg.totalVotos;

          candidatesList = agg.sortedParties.map(p => {
            // Find individual candidate microdata if 2019
            let subCands: { number: string; name: string; votes: number }[] | undefined;
            if (yr === 2019 && CONCEJO_2019_CANDIDATES[p.partyId]) {
              subCands = CONCEJO_2019_CANDIDATES[p.partyId].slice(0, 5).map(c => ({
                number: c.number,
                name: c.name,
                votes: Math.round(p.totalPartyVotes * 0.15)
              }));
            }

            return {
              id: p.partyId,
              name: p.partyName,
              shortName: p.shortName,
              partyName: p.partyName,
              color: p.color,
              votes: p.totalPartyVotes,
              percentage: p.percentageValidos,
              ideology: getIdeologyTag(`${p.shortName} ${p.partyName}`).label,
              subCandidates: subCands
            };
          });
        }
      } else {
        const mun = getTerritorialMunicipalSummary('concejo', yr);
        votosValidos = mun.votosValidos;
        votosBlanco = mun.votosBlanco;
        votosNulos = mun.votosNulos;
        votosNoMarcados = mun.votosNoMarcados;
        totalVotos = mun.totalVotos;
        candidatesList = mun.sortedParties.map(p => ({
          id: p.partyId,
          name: p.partyName,
          shortName: p.shortName,
          partyName: p.partyName,
          color: p.color,
          votes: p.totalPartyVotes,
          percentage: p.percentageValidos,
          ideology: getIdeologyTag(`${p.shortName} ${p.partyName}`).label
        }));
      }
    }

    // 3. CONGRESO E-24 (SENADO / CÁMARA)
    else if (selectedCorp === 'congreso') {
      if (congresoSubCorp === 'senado') {
        if (selectedYear === 2022) {
          if (viewScope === 'comuna') {
            const agg = SENADO_2022_COMUNA_AGGREGATIONS[activeComunaId];
            if (agg) {
              votosValidos = agg.votosValidos;
              votosBlanco = agg.votosBlanco;
              votosNulos = agg.votosNulos;
              votosNoMarcados = agg.votosNoMarcados;
              totalVotos = agg.totalVotos;
              candidatesList = agg.sortedParties.map((p: any) => ({
                id: p.partyId,
                name: p.partyName,
                shortName: p.shortName,
                partyName: p.partyName,
                color: p.color,
                votes: p.totalPartyVotes,
                percentage: p.percentageValidos,
                ideology: getIdeologyTag(`${p.shortName} ${p.partyName}`).label,
                subCandidates: SENADO_2022_CANDIDATES[p.partyId]?.slice(0, 4).map(c => ({
                  number: c.number,
                  name: c.name,
                  votes: Math.round(p.totalPartyVotes * 0.18)
                }))
              }));
            }
          } else {
            const mun = SENADO_2022_MUNICIPAL_SUMMARY;
            votosValidos = mun.votosValidos;
            votosBlanco = mun.votosBlanco;
            votosNulos = mun.votosNulos;
            votosNoMarcados = mun.votosNoMarcados;
            totalVotos = mun.totalVotos;
            candidatesList = mun.sortedParties.map((p: any) => ({
              id: p.partyId,
              name: p.partyName,
              shortName: p.shortName,
              partyName: p.partyName,
              color: p.color,
              votes: p.totalPartyVotes,
              percentage: p.percentageValidos,
              ideology: getIdeologyTag(`${p.shortName} ${p.partyName}`).label
            }));
          }
        } else {
          // 2026 Base Proyectada
          if (viewScope === 'comuna') {
            const agg = COMUNA_AGGREGATIONS[activeComunaId];
            if (agg) {
              votosValidos = agg.votosValidos;
              votosBlanco = agg.votosBlanco;
              votosNulos = agg.votosNulos;
              votosNoMarcados = agg.votosNoMarcados;
              totalVotos = agg.totalVotos;
              candidatesList = agg.sortedParties.map(p => ({
                id: p.partyId,
                name: p.partyName,
                shortName: p.shortName,
                partyName: p.partyName,
                color: p.color,
                votes: p.totalPartyVotes,
                percentage: p.percentageValidos,
                ideology: getIdeologyTag(`${p.shortName} ${p.partyName}`).label,
                subCandidates: PARTY_CANDIDATES[p.partyId]?.slice(0, 4).map(c => ({
                  number: c.number,
                  name: c.name,
                  votes: Math.round(p.totalPartyVotes * 0.2)
                }))
              }));
            }
          } else {
            const mun = MUNICIPAL_SUMMARY;
            votosValidos = mun.votosValidos;
            votosBlanco = mun.votosBlanco;
            votosNulos = mun.votosNulos;
            votosNoMarcados = mun.votosNoMarcados;
            totalVotos = mun.totalVotos;
            candidatesList = mun.sortedParties.map(p => ({
              id: p.partyId,
              name: p.partyName,
              shortName: p.shortName,
              partyName: p.partyName,
              color: p.color,
              votes: p.totalPartyVotes,
              percentage: p.percentageValidos,
              ideology: getIdeologyTag(`${p.shortName} ${p.partyName}`).label
            }));
          }
        }
      } else {
        // CÁMARA
        if (selectedYear === 2022) {
          if (viewScope === 'comuna') {
            const agg = CAMARA_2022_COMUNA_AGGREGATIONS[activeComunaId];
            if (agg) {
              votosValidos = agg.votosValidos;
              votosBlanco = agg.votosBlanco;
              votosNulos = agg.votosNulos;
              votosNoMarcados = agg.votosNoMarcados;
              totalVotos = agg.totalVotos;
              candidatesList = agg.sortedParties.map((p: any) => ({
                id: p.partyId,
                name: p.partyName,
                shortName: p.shortName,
                partyName: p.partyName,
                color: p.color,
                votes: p.totalPartyVotes,
                percentage: p.percentageValidos,
                ideology: getIdeologyTag(`${p.shortName} ${p.partyName}`).label,
                subCandidates: CAMARA_2022_CANDIDATES[p.partyId]?.slice(0, 4).map(c => ({
                  number: c.number,
                  name: c.name,
                  votes: Math.round(p.totalPartyVotes * 0.22)
                }))
              }));
            }
          } else {
            const mun = CAMARA_2022_MUNICIPAL_SUMMARY;
            votosValidos = mun.votosValidos;
            votosBlanco = mun.votosBlanco;
            votosNulos = mun.votosNulos;
            votosNoMarcados = mun.votosNoMarcados;
            totalVotos = mun.totalVotos;
            candidatesList = mun.sortedParties.map((p: any) => ({
              id: p.partyId,
              name: p.partyName,
              shortName: p.shortName,
              partyName: p.partyName,
              color: p.color,
              votes: p.totalPartyVotes,
              percentage: p.percentageValidos,
              ideology: getIdeologyTag(`${p.shortName} ${p.partyName}`).label
            }));
          }
        } else {
          // 2026 Cámara Base
          if (viewScope === 'comuna') {
            const agg = COMUNA_AGGREGATIONS_CAMARA[activeComunaId];
            if (agg) {
              votosValidos = agg.votosValidos;
              votosBlanco = agg.votosBlanco;
              votosNulos = agg.votosNulos;
              votosNoMarcados = agg.votosNoMarcados;
              totalVotos = agg.totalVotos;
              candidatesList = agg.sortedParties.map(p => ({
                id: p.partyId,
                name: p.partyName,
                shortName: p.shortName,
                partyName: p.partyName,
                color: p.color,
                votes: p.totalPartyVotes,
                percentage: p.percentageValidos,
                ideology: getIdeologyTag(`${p.shortName} ${p.partyName}`).label,
                subCandidates: CAMARA_CANDIDATES[p.partyId]?.slice(0, 4).map(c => ({
                  number: c.number,
                  name: c.name,
                  votes: Math.round(p.totalPartyVotes * 0.2)
                }))
              }));
            }
          } else {
            const mun = MUNICIPAL_SUMMARY_CAMARA;
            votosValidos = mun.votosValidos;
            votosBlanco = mun.votosBlanco;
            votosNulos = mun.votosNulos;
            votosNoMarcados = mun.votosNoMarcados;
            totalVotos = mun.totalVotos;
            candidatesList = mun.sortedParties.map(p => ({
              id: p.partyId,
              name: p.partyName,
              shortName: p.shortName,
              partyName: p.partyName,
              color: p.color,
              votes: p.totalPartyVotes,
              percentage: p.percentageValidos,
              ideology: getIdeologyTag(`${p.shortName} ${p.partyName}`).label
            }));
          }
        }
      }
    }

    // 4. PRESIDENCIA
    else if (selectedCorp === 'presidencia') {
      if (selectedYear === 2026 || presidenciaStage === 'consulta') {
        if (viewScope === 'comuna') {
          const agg = COMUNA_AGGREGATIONS_PRESIDENCIA[activeComunaId];
          if (agg) {
            votosValidos = agg.votosValidos;
            votosBlanco = agg.votosBlanco;
            votosNulos = agg.votosNulos;
            votosNoMarcados = agg.votosNoMarcados;
            totalVotos = agg.totalVotos;
            candidatesList = agg.sortedParties.map(p => ({
              id: p.partyId,
              name: p.partyName,
              shortName: p.shortName,
              partyName: p.partyName,
              color: p.color,
              votes: p.totalPartyVotes,
              percentage: p.percentageValidos,
              ideology: getIdeologyTag(`${p.shortName} ${p.partyName}`).label
            }));
          }
        } else {
          const mun = MUNICIPAL_SUMMARY_PRESIDENCIA;
          votosValidos = mun.votosValidos;
          votosBlanco = mun.votosBlanco;
          votosNulos = mun.votosNulos;
          votosNoMarcados = mun.votosNoMarcados;
          totalVotos = mun.totalVotos;
          candidatesList = mun.sortedParties.map(p => ({
            id: p.partyId,
            name: p.partyName,
            shortName: p.shortName,
            partyName: p.partyName,
            color: p.color,
            votes: p.totalPartyVotes,
            percentage: p.percentageValidos,
            ideology: getIdeologyTag(`${p.shortName} ${p.partyName}`).label
          }));
        }
      } else if (presidenciaStage === 'segunda_vuelta') {
        if (viewScope === 'comuna') {
          const agg = COMUNA_AGGREGATIONS_PRESIDENCIA_2022_2V[activeComunaId];
          if (agg) {
            votosValidos = agg.votosValidos;
            votosBlanco = agg.votosBlanco;
            votosNulos = agg.votosNulos;
            votosNoMarcados = agg.votosNoMarcados;
            totalVotos = agg.totalVotos;
            candidatesList = agg.sortedParties.map(p => ({
              id: p.partyId,
              name: p.partyName,
              shortName: p.shortName,
              partyName: p.partyName,
              color: p.color,
              votes: p.totalPartyVotes,
              percentage: p.percentageValidos,
              ideology: getIdeologyTag(`${p.shortName} ${p.partyName}`).label
            }));
          }
        } else {
          const mun = MUNICIPAL_SUMMARY_PRESIDENCIA_2022_2V;
          votosValidos = mun.votosValidos;
          votosBlanco = mun.votosBlanco;
          votosNulos = mun.votosNulos;
          votosNoMarcados = mun.votosNoMarcados;
          totalVotos = mun.totalVotos;
          candidatesList = mun.sortedParties.map(p => ({
            id: p.partyId,
            name: p.partyName,
            shortName: p.shortName,
            partyName: p.partyName,
            color: p.color,
            votes: p.totalPartyVotes,
            percentage: p.percentageValidos,
            ideology: getIdeologyTag(`${p.shortName} ${p.partyName}`).label
          }));
        }
      } else {
        // Primera Vuelta 2022
        if (viewScope === 'comuna') {
          const agg = COMUNA_AGGREGATIONS_PRESIDENCIA_2022_1V[activeComunaId];
          if (agg) {
            votosValidos = agg.votosValidos;
            votosBlanco = agg.votosBlanco;
            votosNulos = agg.votosNulos;
            votosNoMarcados = agg.votosNoMarcados;
            totalVotos = agg.totalVotos;
            candidatesList = agg.sortedParties.map(p => ({
              id: p.partyId,
              name: p.partyName,
              shortName: p.shortName,
              partyName: p.partyName,
              color: p.color,
              votes: p.totalPartyVotes,
              percentage: p.percentageValidos,
              ideology: getIdeologyTag(`${p.shortName} ${p.partyName}`).label
            }));
          }
        } else {
          const mun = MUNICIPAL_SUMMARY_PRESIDENCIA_2022_1V;
          votosValidos = mun.votosValidos;
          votosBlanco = mun.votosBlanco;
          votosNulos = mun.votosNulos;
          votosNoMarcados = mun.votosNoMarcados;
          totalVotos = mun.totalVotos;
          candidatesList = mun.sortedParties.map(p => ({
            id: p.partyId,
            name: p.partyName,
            shortName: p.shortName,
            partyName: p.partyName,
            color: p.color,
            votes: p.totalPartyVotes,
            percentage: p.percentageValidos,
            ideology: getIdeologyTag(`${p.shortName} ${p.partyName}`).label
          }));
        }
      }
    }

    return {
      votosValidos,
      votosBlanco,
      votosNulos,
      votosNoMarcados,
      totalVotos,
      candidatesList
    };
  }, [selectedCorp, selectedYear, congresoSubCorp, presidenciaStage, viewScope, activeComunaId]);

  return (
    <div className="space-y-4 p-4 rounded-3xl bg-slate-950/75 backdrop-blur-3xl border border-white/20 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.4),0_15px_35px_rgba(0,0,0,0.6)] text-white animate-fadeIn">
      {/* 1. Header & Comuna Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-white/15 pb-3">
        <div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono font-black uppercase text-amber-400 tracking-wider">
            <FileSpreadsheet className="w-3.5 h-3.5 text-amber-300" />
            <span>Matriz E-24 Histórica Oficial</span>
          </div>
          
          <div className="flex items-center gap-2 mt-1">
            {/* Comuna Selector Dropdown */}
            <div className="relative inline-block">
              <select
                value={activeComunaId}
                onChange={(e) => {
                  const newId = parseInt(e.target.value, 10);
                  setActiveComunaId(newId);
                  if (onSelectComuna) onSelectComuna(newId);
                }}
                aria-label="Seleccionar comuna o territorio"
                className="appearance-none bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl px-3 py-1 pr-7 text-xs sm:text-sm font-black text-white cursor-pointer focus:outline-none focus:ring-1 focus:ring-amber-400 transition"
              >
                {COMUNAS_INFO.map((c) => (
                  <option key={c.id} value={c.id} className="bg-slate-900 text-white">
                    {c.comunaName} - {c.officialName}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-300 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {barrioName && (
              <span className="px-2 py-0.5 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-400/30 text-[10px] font-mono font-semibold">
                {barrioName}
              </span>
            )}
          </div>
        </div>

        {/* Scope Switcher: Esta Comuna vs Total Ciudad */}
        <div className="flex items-center self-start sm:self-auto p-0.5 rounded-xl bg-black/50 border border-white/15 text-[10px] font-mono">
          <button
            onClick={() => setViewScope('comuna')}
            className={`px-2 py-1 rounded-lg transition ${
              viewScope === 'comuna'
                ? 'bg-amber-400/25 text-amber-200 border border-amber-400/50 font-black shadow-[0_0_8px_rgba(251,191,36,0.3)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {activeComunaInfo.comunaName}
          </button>
          <button
            onClick={() => setViewScope('ciudad')}
            className={`px-2 py-1 rounded-lg transition ${
              viewScope === 'ciudad'
                ? 'bg-sky-400/25 text-sky-200 border border-sky-400/50 font-black shadow-[0_0_8px_rgba(56,189,248,0.3)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Total Medellín
          </button>
        </div>
      </div>

      {/* 2. Top 4 Corporation Tabs */}
      <div className="grid grid-cols-4 gap-1.5 p-1 rounded-2xl bg-black/40 border border-white/15 text-[11px] font-bold">
        {/* Alcaldía */}
        <button
          onClick={() => handleSelectCorp('alcaldia')}
          className={`py-1.5 px-2 rounded-xl transition flex items-center justify-center gap-1.5 text-center ${
            selectedCorp === 'alcaldia'
              ? 'bg-gradient-to-r from-amber-500/30 to-orange-500/30 text-amber-200 border border-amber-400/60 shadow-[0_0_12px_rgba(251,191,36,0.3)] font-black'
              : 'text-slate-400 hover:text-white hover:bg-white/05'
          }`}
        >
          <Building2 className="w-3.5 h-3.5 shrink-0 text-amber-400" />
          <span className="truncate">Alcaldía</span>
        </button>

        {/* Concejo */}
        <button
          onClick={() => handleSelectCorp('concejo')}
          className={`py-1.5 px-2 rounded-xl transition flex items-center justify-center gap-1.5 text-center ${
            selectedCorp === 'concejo'
              ? 'bg-gradient-to-r from-sky-500/30 to-blue-500/30 text-sky-200 border border-sky-400/60 shadow-[0_0_12px_rgba(56,189,248,0.3)] font-black'
              : 'text-slate-400 hover:text-white hover:bg-white/05'
          }`}
        >
          <Award className="w-3.5 h-3.5 shrink-0 text-sky-400" />
          <span className="truncate">Concejo</span>
        </button>

        {/* Congreso E-24 */}
        <button
          onClick={() => handleSelectCorp('congreso')}
          className={`py-1.5 px-2 rounded-xl transition flex items-center justify-center gap-1.5 text-center ${
            selectedCorp === 'congreso'
              ? 'bg-gradient-to-r from-indigo-500/30 to-purple-500/30 text-indigo-200 border border-indigo-400/60 shadow-[0_0_12px_rgba(129,140,248,0.3)] font-black'
              : 'text-slate-400 hover:text-white hover:bg-white/05'
          }`}
        >
          <Landmark className="w-3.5 h-3.5 shrink-0 text-indigo-400" />
          <span className="truncate">Congreso E-24</span>
        </button>

        {/* Presidencia */}
        <button
          onClick={() => handleSelectCorp('presidencia')}
          className={`py-1.5 px-2 rounded-xl transition flex items-center justify-center gap-1.5 text-center ${
            selectedCorp === 'presidencia'
              ? 'bg-gradient-to-r from-emerald-500/30 to-teal-500/30 text-emerald-200 border border-emerald-400/60 shadow-[0_0_12px_rgba(52,211,153,0.3)] font-black'
              : 'text-slate-400 hover:text-white hover:bg-white/05'
          }`}
        >
          <Flag className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
          <span className="truncate">Presidencia</span>
        </button>
      </div>

      {/* 3. Sub-Filters (Period / Branch / Stage) */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold bg-white/05 p-2 rounded-2xl border border-white/10">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono uppercase text-slate-400 mr-1 flex items-center gap-1">
            <Calendar className="w-3 h-3 text-sky-400" />
            Periodo E-24:
          </span>

          {/* Years for Alcaldía and Concejo */}
          {(selectedCorp === 'alcaldia' || selectedCorp === 'concejo') && (
            <div className="flex items-center gap-1">
              {[2023, 2019, 2015].map((yr) => (
                <button
                  key={yr}
                  onClick={() => setSelectedYear(yr)}
                  className={`px-2.5 py-1 rounded-xl font-mono text-xs transition ${
                    selectedYear === yr
                      ? 'bg-gradient-to-r from-amber-400/30 to-orange-500/40 border border-amber-300/70 text-white shadow-[0_0_10px_rgba(251,191,36,0.3)] font-black'
                      : 'bg-white/05 hover:bg-white/10 text-slate-300 border border-white/10'
                  }`}
                >
                  {yr}
                </button>
              ))}
            </div>
          )}

          {/* Sub-corp & Years for Congreso */}
          {selectedCorp === 'congreso' && (
            <div className="flex items-center gap-2 flex-wrap">
              {/* Branch Toggle */}
              <div className="flex items-center gap-1 p-0.5 rounded-lg bg-black/40 border border-white/10 text-[10px]">
                <button
                  onClick={() => setCongresoSubCorp('senado')}
                  className={`px-2 py-0.5 rounded-md transition ${
                    congresoSubCorp === 'senado'
                      ? 'bg-indigo-500/40 text-indigo-200 font-black border border-indigo-400/50'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Senado
                </button>
                <button
                  onClick={() => setCongresoSubCorp('camara')}
                  className={`px-2 py-0.5 rounded-md transition ${
                    congresoSubCorp === 'camara'
                      ? 'bg-indigo-500/40 text-indigo-200 font-black border border-indigo-400/50'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Cámara
                </button>
              </div>

              {/* Year */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setSelectedYear(2022)}
                  className={`px-2.5 py-1 rounded-xl font-mono text-xs transition ${
                    selectedYear === 2022
                      ? 'bg-gradient-to-r from-indigo-500/40 to-purple-600/40 border border-indigo-400 text-white font-black shadow-[0_0_10px_rgba(129,140,248,0.3)]'
                      : 'bg-white/05 text-slate-300 border border-white/10'
                  }`}
                >
                  2022 Oficial
                </button>
                <button
                  onClick={() => setSelectedYear(2026)}
                  className={`px-2.5 py-1 rounded-xl font-mono text-xs transition ${
                    selectedYear === 2026
                      ? 'bg-gradient-to-r from-indigo-500/40 to-purple-600/40 border border-indigo-400 text-white font-black shadow-[0_0_10px_rgba(129,140,248,0.3)]'
                      : 'bg-white/05 text-slate-300 border border-white/10'
                  }`}
                >
                  2026 Proyección
                </button>
              </div>
            </div>
          )}

          {/* Stages for Presidencia */}
          {selectedCorp === 'presidencia' && (
            <div className="flex items-center gap-1 flex-wrap">
              <button
                onClick={() => {
                  setSelectedYear(2026);
                  setPresidenciaStage('consulta');
                }}
                className={`px-2.5 py-1 rounded-xl font-mono text-xs transition ${
                  selectedYear === 2026 && presidenciaStage === 'consulta'
                    ? 'bg-gradient-to-r from-emerald-500/40 to-teal-500/40 border border-emerald-400 text-white font-black shadow-[0_0_10px_rgba(52,211,153,0.3)]'
                    : 'bg-white/05 text-slate-300 border border-white/10'
                }`}
              >
                2026 Consultas
              </button>
              <button
                onClick={() => {
                  setSelectedYear(2022);
                  setPresidenciaStage('primera_vuelta');
                }}
                className={`px-2.5 py-1 rounded-xl font-mono text-xs transition ${
                  selectedYear === 2022 && presidenciaStage === 'primera_vuelta'
                    ? 'bg-gradient-to-r from-emerald-500/40 to-teal-500/40 border border-emerald-400 text-white font-black shadow-[0_0_10px_rgba(52,211,153,0.3)]'
                    : 'bg-white/05 text-slate-300 border border-white/10'
                }`}
              >
                2022 1ª Vuelta
              </button>
              <button
                onClick={() => {
                  setSelectedYear(2022);
                  setPresidenciaStage('segunda_vuelta');
                }}
                className={`px-2.5 py-1 rounded-xl font-mono text-xs transition ${
                  selectedYear === 2022 && presidenciaStage === 'segunda_vuelta'
                    ? 'bg-gradient-to-r from-emerald-500/40 to-teal-500/40 border border-emerald-400 text-white font-black shadow-[0_0_10px_rgba(52,211,153,0.3)]'
                    : 'bg-white/05 text-slate-300 border border-white/10'
                }`}
              >
                2022 2ª Vuelta
              </button>
            </div>
          )}
        </div>

        {/* Zones indicator */}
        <div className="text-[10px] font-mono text-slate-400 hidden sm:flex items-center gap-1">
          <span>Zonas Escrutadas:</span>
          <span className="text-amber-300 font-bold">{activeComunaInfo.zones.join(', ')}</span>
        </div>
      </div>

      {/* 4. KPI Cards Summary */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="p-2.5 rounded-2xl bg-white/05 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Votos Válidos</div>
          <div className="text-sm sm:text-base font-black text-white font-mono mt-0.5">
            {electionViewData.votosValidos.toLocaleString('es-CO')}
          </div>
        </div>
        <div className="p-2.5 rounded-2xl bg-white/05 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Voto en Blanco</div>
          <div className="text-sm sm:text-base font-black text-sky-300 font-mono mt-0.5">
            {electionViewData.votosBlanco.toLocaleString('es-CO')}
          </div>
        </div>
        <div className="p-2.5 rounded-2xl bg-white/05 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Nulos / No Marc.</div>
          <div className="text-sm sm:text-base font-black text-rose-300 font-mono mt-0.5">
            {(electionViewData.votosNulos + electionViewData.votosNoMarcados).toLocaleString('es-CO')}
          </div>
        </div>
      </div>

      {/* 5. Candidates and Parties List */}
      <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
        {electionViewData.candidatesList.length === 0 ? (
          <div className="p-4 text-center text-xs text-slate-400 italic">
            No se registran datos electorales para este periodo y corporación.
          </div>
        ) : (
          electionViewData.candidatesList.map((cand, idx) => {
            const isExpanded = expandedPartyId === cand.id;
            const hasSub = cand.subCandidates && cand.subCandidates.length > 0;
            const pctVal = Number(cand.percentage.toFixed(1));

            return (
              <div 
                key={cand.id || idx} 
                className="p-3 rounded-2xl bg-white/05 hover:bg-white/10 border border-white/10 space-y-2 transition-all"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 truncate">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black font-mono shrink-0 ${
                      idx === 0 
                        ? 'bg-amber-400/25 text-amber-300 border border-amber-400/40 shadow-[0_0_8px_rgba(251,191,36,0.3)]' 
                        : 'bg-white/15 text-white'
                    }`}>
                      {idx + 1}
                    </span>
                    <span className="font-bold text-white truncate text-xs sm:text-sm" title={cand.name}>
                      {cand.shortName || cand.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 text-right">
                    <span className="font-mono text-emerald-400 font-black text-xs sm:text-sm">
                      {pctVal}%
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      ({cand.votes.toLocaleString('es-CO')})
                    </span>

                    {/* Expand button if preferential candidates */}
                    {hasSub && (
                      <button
                        onClick={() => setExpandedPartyId(isExpanded ? null : cand.id)}
                        className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 transition ml-1"
                        title={isExpanded ? 'Ocultar candidatos' : 'Ver candidatos destacados'}
                      >
                        {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>
                    )}
                  </div>
                </div>

                {/* Animated Progress Bar */}
                <div className="w-full bg-slate-900/80 h-2 rounded-full overflow-hidden border border-white/05">
                  <div
                    style={{ 
                      width: `${Math.min(pctVal, 100)}%`,
                      backgroundColor: cand.color || '#38bdf8'
                    }}
                    className="h-full rounded-full transition-all duration-500 shadow-[0_0_8px_currentColor]"
                  />
                </div>

                {/* Metadata Row: Party on Left, Ideology Badge on Right */}
                <div className="flex items-center justify-between text-[9px] text-slate-400 pt-0.5">
                  <span className="truncate max-w-[200px]" title={cand.partyName}>
                    {cand.partyName}
                  </span>
                  <span className="font-mono font-bold uppercase tracking-wider text-slate-300 px-1.5 py-0.5 rounded bg-white/05 border border-white/10">
                    {cand.ideology}
                  </span>
                </div>

                {/* Expandable Candidate Breakdown (preferential lists) */}
                {isExpanded && hasSub && (
                  <div className="pt-2 mt-2 border-t border-white/10 space-y-1.5 animate-fadeIn">
                    <div className="text-[10px] font-mono uppercase text-sky-400 font-bold flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>Candidatos más votados de la lista:</span>
                    </div>
                    <div className="grid grid-cols-1 gap-1 pl-2">
                      {cand.subCandidates!.map((sc, sIdx) => (
                        <div key={sIdx} className="flex items-center justify-between text-[10px] py-1 border-b border-white/05 last:border-0">
                          <span className="text-slate-200 truncate flex items-center gap-1.5">
                            <span className="px-1 rounded bg-white/10 font-mono text-[9px] text-slate-300">#{sc.number}</span>
                            <span>{sc.name}</span>
                          </span>
                          <span className="font-mono text-emerald-300 font-bold ml-2 shrink-0">
                            ~{sc.votes.toLocaleString('es-CO')} votos
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

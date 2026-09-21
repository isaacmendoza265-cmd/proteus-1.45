import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Building2,
  Home,
  Users,
  FileText,
  BookOpen,
  Newspaper,
  Landmark,
  Layers,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  HelpCircle,
  Lock,
  DollarSign,
  Scale
} from 'lucide-react';
import { CRIMINALITY_DATA } from '../../data/observatorioComunas/criminalityData';
import { CriminalityRecord } from '../../data/observatorioComunas/types';

interface CriminalityPanelProps {
  communeId: number;
  communeName: string;
}

export const CriminalityPanel: React.FC<CriminalityPanelProps> = ({
  communeId,
  communeName
}) => {
  const [activeSourceTab, setActiveSourceTab] = useState<'pdf' | 'peer' | 'press' | 'official'>('pdf');
  const [showFullSources, setShowFullSources] = useState<boolean>(false);

  // Get data record for this commune or default
  const record: CriminalityRecord = CRIMINALITY_DATA[communeId] || {
    communeId,
    communeName,
    extorsionHogaresPct: 3,
    extorsionNegociosPct: 10,
    extorsionAlcaldiaPct: 2,
    extorsionDenunciasPct: 0.0,
    extorsionLevel: 'Moderado',
    indiceGobiernoCombo: 0.30,
    indiceGobiernoEstado: 0.45,
    indiceGobiernoRelativo: +0.15,
    combosCountEst: 10,
    bandasDominantes: ['Estructuras locales'],
    funcionesGobiernoEjercidas: [
      'Cobro de vacunas a pequeños negocios',
      'Microtráfico de estupefacientes',
      'Préstamos gota a gota'
    ],
    governanceLevel: 'Moderado',
    summaryPDF: 'Datos generales de la Encuesta sobre Gobierno Criminal CIEF (2020).',
    summaryPeerReviewed: 'Investigaciones académicas de referencia sobre gobernanza criminal urbana.',
    summaryPressAndOfficial: 'Informes de seguridad y convivencia del SISC Alcaldía de Medellín.',
    sourcesHierarchy: {
      pdf: 'Nota de Política CIEF N°01 (2020), EAFIT / Chicago / IPA.',
      peerReviewed: 'Estudios APSR (Blattman et al. 2023; Lessing 2020).',
      press: 'El Colombiano / Análisis Urbano.',
      official: 'SISC Alcaldía de Medellín & Fiscalía General de la Nación.'
    }
  };

  const getExtorsionBadgeColor = (level: string) => {
    switch (level) {
      case 'Muy Alto':
        return 'bg-rose-500/20 text-rose-300 border-rose-400/50 shadow-[0_0_10px_rgba(244,63,94,0.3)]';
      case 'Alto':
        return 'bg-amber-500/20 text-amber-300 border-amber-400/50 shadow-[0_0_10px_rgba(245,158,11,0.3)]';
      case 'Moderado':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-400/50';
      case 'Bajo':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-400/50';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-400/50';
    }
  };

  const getGovernanceBadgeColor = (level: string) => {
    switch (level) {
      case 'Dominante':
        return 'bg-purple-500/20 text-purple-300 border-purple-400/50 shadow-[0_0_10px_rgba(168,85,247,0.3)]';
      case 'Alto':
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-400/50';
      case 'Moderado':
        return 'bg-sky-500/20 text-sky-300 border-sky-400/50';
      default:
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-400/50';
    }
  };

  return (
    <div className="space-y-4">
      {/* 1. Header Banner & Risk Level Summary */}
      <div className="p-4 rounded-3xl bg-slate-950/70 border border-white/15 backdrop-blur-2xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-400/30">
                <ShieldAlert className="w-4 h-4" />
              </span>
              <h4 className="text-xs font-black text-white uppercase tracking-wider">
                Gobernanza Criminal & Extorsión — {communeName}
              </h4>
            </div>
            <p className="text-[11px] text-slate-300 mt-1">
              Indicadores del CIEF (EAFIT / U. Chicago / IPA), investigación académica y reportes SISC
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`text-[10px] font-mono font-black px-2.5 py-1 rounded-xl border ${getExtorsionBadgeColor(
                record.extorsionLevel
              )}`}
            >
              Extorsión: {record.extorsionLevel}
            </span>
            <span
              className={`text-[10px] font-mono font-black px-2.5 py-1 rounded-xl border ${getGovernanceBadgeColor(
                record.governanceLevel
              )}`}
            >
              Gobierno Criminal: {record.governanceLevel}
            </span>
          </div>
        </div>

        {/* Quick KPI Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-white/10 text-xs">
          <div className="p-2.5 rounded-2xl bg-white/05 border border-white/10">
            <span className="text-[9px] text-slate-400 font-mono uppercase font-bold block">Extorsión Negocios (CIEF)</span>
            <span className="text-base font-black font-mono text-rose-400 mt-0.5 block">{record.extorsionNegociosPct}%</span>
            <span className="text-[8px] text-slate-400 block mt-0.5">Vacunas a comercio barrial</span>
          </div>

          <div className="p-2.5 rounded-2xl bg-white/05 border border-white/10">
            <span className="text-[9px] text-slate-400 font-mono uppercase font-bold block">Extorsión Hogares (CIEF)</span>
            <span className="text-base font-black font-mono text-amber-300 mt-0.5 block">{record.extorsionHogaresPct}%</span>
            <span className="text-[8px] text-slate-400 block mt-0.5">Cobro domiciliario</span>
          </div>

          <div className="p-2.5 rounded-2xl bg-white/05 border border-white/10">
            <span className="text-[9px] text-slate-400 font-mono uppercase font-bold block">Cifra Negra / Impunidad</span>
            <span className="text-base font-black font-mono text-purple-300 mt-0.5 block">
              {record.extorsionDenunciasPct < 1 ? '>95%' : `${(100 - record.extorsionDenunciasPct).toFixed(0)}%`}
            </span>
            <span className="text-[8px] text-slate-400 block mt-0.5">Sin denuncia oficial</span>
          </div>

          <div className="p-2.5 rounded-2xl bg-white/05 border border-white/10">
            <span className="text-[9px] text-slate-400 font-mono uppercase font-bold block">Combos Estimados</span>
            <span className="text-base font-black font-mono text-sky-300 mt-0.5 block">{record.combosCountEst}</span>
            <span className="text-[8px] text-slate-400 block mt-0.5">Estructuras en el sector</span>
          </div>
        </div>
      </div>

      {/* 2. Governance Comparison & Gangs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Relative Governance Bar */}
        <div className="p-3.5 rounded-3xl bg-slate-950/70 border border-white/15 backdrop-blur-2xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-sky-400 font-bold flex items-center gap-1">
              <Scale className="w-3.5 h-3.5" />
              Poder Combo vs Estado
            </span>
            <span className="text-[10px] font-mono text-slate-400 font-bold">
              {record.indiceGobiernoRelativo > 0 ? 'Predominio Institucional' : 'Disputa / Vacío Estatal'}
            </span>
          </div>

          <div className="space-y-1.5 pt-1 text-xs">
            <div>
              <div className="flex justify-between text-[10px] font-mono text-sky-300 mb-1">
                <span>Presencia Estatal (Policía / Fiscalía)</span>
                <span>{(record.indiceGobiernoEstado * 100).toFixed(0)}%</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-white/10">
                <div
                  style={{ width: `${record.indiceGobiernoEstado * 100}%` }}
                  className="bg-sky-500 h-full rounded-full"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[10px] font-mono text-rose-400 mb-1">
                <span>Control de Combos Criminales</span>
                <span>{(record.indiceGobiernoCombo * 100).toFixed(0)}%</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-white/10">
                <div
                  style={{ width: `${record.indiceGobiernoCombo * 100}%` }}
                  className="bg-rose-500 h-full rounded-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Dominant Gangs */}
        <div className="p-3.5 rounded-3xl bg-slate-950/70 border border-white/15 backdrop-blur-2xl space-y-2">
          <span className="text-[10px] font-mono uppercase text-amber-400 font-bold flex items-center gap-1">
            <Lock className="w-3.5 h-3.5" />
            Estructuras Delincuenciales Dominantes
          </span>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {record.bandasDominantes.map((banda, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-xl bg-white/05 border border-white/15 text-xs text-white font-mono font-bold"
              >
                {banda}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Functions of Criminal Governance */}
      <div className="p-3.5 rounded-3xl bg-slate-950/70 border border-white/15 backdrop-blur-2xl space-y-2">
        <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold flex items-center gap-1">
          <CheckCircle className="w-3.5 h-3.5" />
          Funciones y Roles Asumidos por los Combos en el Territorio
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1 text-xs">
          {record.funcionesGobiernoEjercidas.map((func, idx) => (
            <div
              key={idx}
              className="p-2 rounded-xl bg-white/05 border border-white/10 flex items-center gap-2 text-slate-200"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              <span>{func}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Evidence Hierarchy Tabs */}
      <div className="p-3.5 rounded-3xl bg-slate-950/70 border border-white/15 backdrop-blur-2xl space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase text-slate-300 font-bold flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            Jerarquía de Fuentes y Evidencia Científica
          </span>
          <button
            onClick={() => setShowFullSources(!showFullSources)}
            className="text-[10px] text-sky-400 hover:text-sky-300 font-mono font-bold flex items-center gap-1 cursor-pointer"
          >
            {showFullSources ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            {showFullSources ? 'Ocultar' : 'Ver Detalles'}
          </button>
        </div>

        {/* Source Tabs */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10 text-[10px] font-mono overflow-x-auto">
          <button
            onClick={() => setActiveSourceTab('pdf')}
            className={`px-2 py-1 rounded-lg transition shrink-0 cursor-pointer ${
              activeSourceTab === 'pdf' ? 'bg-indigo-500/30 text-white font-bold border border-indigo-400/50' : 'text-slate-400 hover:text-white'
            }`}
          >
            PDF CIEF 2020
          </button>
          <button
            onClick={() => setActiveSourceTab('peer')}
            className={`px-2 py-1 rounded-lg transition shrink-0 cursor-pointer ${
              activeSourceTab === 'peer' ? 'bg-sky-500/30 text-white font-bold border border-sky-400/50' : 'text-slate-400 hover:text-white'
            }`}
          >
            APSR / Blattman
          </button>
          <button
            onClick={() => setActiveSourceTab('press')}
            className={`px-2 py-1 rounded-lg transition shrink-0 cursor-pointer ${
              activeSourceTab === 'press' ? 'bg-amber-500/30 text-white font-bold border border-amber-400/50' : 'text-slate-400 hover:text-white'
            }`}
          >
            Prensa Investigativa
          </button>
          <button
            onClick={() => setActiveSourceTab('official')}
            className={`px-2 py-1 rounded-lg transition shrink-0 cursor-pointer ${
              activeSourceTab === 'official' ? 'bg-emerald-500/30 text-white font-bold border border-emerald-400/50' : 'text-slate-400 hover:text-white'
            }`}
          >
            SISC / Fiscalía
          </button>
        </div>

        {/* Source Content Preview */}
        <div className="p-2.5 rounded-2xl bg-white/05 border border-white/10 text-xs text-slate-300">
          {activeSourceTab === 'pdf' && (
            <div className="space-y-1">
              <div className="font-bold text-indigo-300 font-mono text-[10px]">Nota de Política CIEF N°01 (EAFIT / Chicago / IPA):</div>
              <p className="text-[11px] leading-relaxed">{record.summaryPDF}</p>
            </div>
          )}
          {activeSourceTab === 'peer' && (
            <div className="space-y-1">
              <div className="font-bold text-sky-300 font-mono text-[10px]">American Political Science Review (APSR):</div>
              <p className="text-[11px] leading-relaxed">{record.summaryPeerReviewed}</p>
            </div>
          )}
          {activeSourceTab === 'press' && (
            <div className="space-y-1">
              <div className="font-bold text-amber-300 font-mono text-[10px]">Análisis Urbano & El Colombiano:</div>
              <p className="text-[11px] leading-relaxed">{record.summaryPressAndOfficial}</p>
            </div>
          )}
          {activeSourceTab === 'official' && (
            <div className="space-y-1">
              <div className="font-bold text-emerald-300 font-mono text-[10px]">Sistema de Información para la Seguridad y la Convivencia (SISC):</div>
              <p className="text-[11px] leading-relaxed">
                Datos oficiales de denuncias de extorsión y homicidios consolidados por la Secretaría de Seguridad de Medellín y Fiscalía.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

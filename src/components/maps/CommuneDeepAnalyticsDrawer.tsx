import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Users, 
  Vote, 
  TrendingUp, 
  Building2, 
  Home, 
  ShieldCheck, 
  ArrowRight,
  Sparkles, 
  Layers,
  FileSpreadsheet,
  ShieldAlert,
  Award,
  Landmark,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { TerritoryGeoFeature, ZoomLevelId } from '../../data/geojson';
import { MEDELLIN_COMUNAS_DATA, METROPOLITAN_MUNICIPALITIES_DATA } from '../../data/metropolitanAndMedellinData';
import { MUNICIPALITIES_DATA } from '../../data/observatorioAntioquia/municipalitiesData';
import { E24HistoricalViewer } from './E24HistoricalViewer';
import { IPM_DATA } from '../../data/observatorioComunas/ipmData';
import { CRIMINALITY_DATA } from '../../data/observatorioComunas/criminalityData';
import { POPULATION_DATA, getDemographicIndicators } from '../../data/observatorioComunas/populationData';
import { DemographicPyramid } from '../observatorioComunas/DemographicPyramid';
import { IpmVariableEvolution } from '../observatorioComunas/IpmVariableEvolution';
import { CriminalityPanel } from '../observatorioComunas/CriminalityPanel';
import { CommuneReportModal } from '../observatorioComunas/CommuneReportModal';
import { COMMUNES } from '../../data/observatorioComunas/communeList';

interface CommuneDeepAnalyticsDrawerProps {
  feature: TerritoryGeoFeature | null;
  onClose: () => void;
  onDrillDown?: (targetLevel: ZoomLevelId, featureId: string) => void;
}

type DrawerTab = 'resumen' | 'e24' | 'ipm' | 'seguridad' | 'demografia' | 'alcaldia-concejo';

const CORREGIMIENTO_NUMBERS: Record<string, number> = {
  'med-correg-palmitas': 50,
  'med-correg-san-cristobal': 60,
  'med-correg-altavista': 70,
  'med-correg-san-antonio': 80,
  'med-correg-san-antonio-de-prado': 80,
  'med-correg-santa-elena': 90
};

export const CommuneDeepAnalyticsDrawer: React.FC<CommuneDeepAnalyticsDrawerProps> = ({
  feature,
  onClose,
  onDrillDown
}) => {
  const [activeTab, setActiveTab] = useState<DrawerTab>('resumen');
  const [showReportModal, setShowReportModal] = useState<boolean>(false);

  if (!feature) return null;

  const props = feature.properties;
  const isComuna = feature.id.startsWith('med-c') || feature.id.startsWith('med-correg') || feature.id.startsWith('comuna-');
  const isBarrio = feature.id.startsWith('barrio-');
  const isMpio = feature.id.startsWith('mpio-');
  const isMetroMuni = props.level === 'metropolitano';
  const isSubregion = props.level === 'departamental' && !isMpio;
  const isDepartment = props.level === 'nacional';

  // Corregimiento / Comuna number lookup
  const comunaNumber = props.number || 
    CORREGIMIENTO_NUMBERS[feature.id] ||
    (feature.id.startsWith('comuna-') ? parseInt(feature.id.replace('comuna-', '')) : null) ||
    (isComuna && !feature.id.includes('correg') ? parseInt(feature.id.replace('med-c', '')) : null);

  const comunaData = isComuna ? (
    MEDELLIN_COMUNAS_DATA[feature.id] || 
    MEDELLIN_COMUNAS_DATA[feature.id.replace('-de-prado', '')] ||
    (comunaNumber ? MEDELLIN_COMUNAS_DATA[`med-c${comunaNumber}`] : null) ||
    (comunaNumber === 80 ? MEDELLIN_COMUNAS_DATA['med-correg-san-antonio'] : null)
  ) : null;

  // Active Commune Object for full reports
  const activeCommuneObj = comunaNumber ? (
    COMMUNES.find((c) => c.id === comunaNumber) || {
      id: comunaNumber,
      code: String(comunaNumber).padStart(2, '0'),
      name: props.comunaName || props.name,
      type: (comunaNumber >= 50 ? 'corregimiento' : 'comuna') as any,
      zone: props.zone || 'Medellín',
      description: comunaData?.keyDynamics || '',
      estratoPredominante: comunaData?.predominantStratum || 'Estrato 3',
      barriosCount: props.barriosCount || 8,
      areaKm2: props.areaKm2 || 4.5
    }
  ) : null;

  // Municipality match (Observatorio Antioquia / AMVA)
  const muniMatch = (isMpio || isMetroMuni) 
    ? MUNICIPALITIES_DATA.find(m => 
        m.id === feature.id || 
        m.name.toLowerCase() === props.name.toLowerCase() ||
        feature.id.replace('mpio-', '') === m.id
      )
    : null;

  const metroData = isMetroMuni ? METROPOLITAN_MUNICIPALITIES_DATA[feature.id] : null;

  // IPM microdata (Comunas 1-16 & Corregimientos 50, 60, 70, 80, 90)
  const ipmRecords = (comunaNumber && IPM_DATA[comunaNumber]) ? IPM_DATA[comunaNumber] : null;
  const latestIpm = ipmRecords ? ipmRecords[ipmRecords.length - 1] : null;

  // Criminality / Extortion study (CIEF EAFIT / Chicago / IPA / SISC)
  const crimeRecord = (comunaNumber && CRIMINALITY_DATA[comunaNumber]) ? CRIMINALITY_DATA[comunaNumber] : null;

  // Population Projections (DANE 2018 - 2030)
  const popProjections = (comunaNumber && POPULATION_DATA[comunaNumber]) ? POPULATION_DATA[comunaNumber] : null;
  const pop2026 = popProjections ? popProjections.find(p => p.year === 2026) : null;
  const demoIndicators = comunaNumber ? getDemographicIndicators(comunaNumber, 2026) : null;

  // Determine drill-down capabilities across the 5 levels
  const getDrillDownTarget = (): { level: ZoomLevelId; label: string } | null => {
    if (isDepartment && feature.id === 'antioquia') {
      return { level: 'departamental', label: 'Explorar 9 Subregiones / 125 Municipios' };
    }
    if (isSubregion && feature.id === 'valle-de-aburra') {
      return { level: 'metropolitano', label: 'Explorar 10 Municipios del Valle de Aburrá' };
    }
    if ((isMetroMuni && feature.id === 'medellin') || (isMpio && feature.id === 'mpio-05001')) {
      return { level: 'municipal', label: 'Explorar 16 Comunas y 5 Corregimientos' };
    }
    if (isMpio && props.subregion === 'Valle de Aburrá' && feature.id !== 'mpio-05001') {
      return { level: 'metropolitano', label: 'Ver en Conurbación Metropolitana AMVA' };
    }
    if (isComuna) {
      return { level: 'comunas-barrios', label: `Zoom a Barrios de ${props.name}` };
    }
    return null;
  };

  const drillTarget = getDrillDownTarget();

  return (
    <div className={`w-full ${activeTab === 'resumen' ? 'lg:w-[420px]' : 'lg:w-[600px]'} flex flex-col max-h-[820px] overflow-hidden rounded-3xl bg-slate-950/85 backdrop-blur-3xl border border-white/25 shadow-[0_20px_50px_0_rgba(0,0,0,0.6),inset_0_1.5px_2px_0_rgba(255,255,255,0.45)] text-white transition-all duration-300`}>
      {/* Header */}
      <div className="p-4 border-b border-white/15 flex items-start justify-between gap-2 bg-gradient-to-r from-amber-500/20 via-sky-500/10 to-transparent">
        <div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">
            <MapPin className="w-3.5 h-3.5" />
            <span>Nivel: {props.level.toUpperCase()}</span>
            {props.zone && (
              <span className="px-1.5 py-0.5 rounded-full bg-white/10 text-white text-[9px]">
                {props.zone}
              </span>
            )}
            {(props as any).daneCode && (
              <span className="px-1.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-[9px] border border-sky-400/30">
                DANE: {(props as any).daneCode}
              </span>
            )}
          </div>
          <h3 className="text-base font-black tracking-tight text-white mt-0.5">
            {props.name}
          </h3>
          {props.comunaName && (
            <p className="text-xs text-sky-300 font-semibold">{props.comunaName}</p>
          )}
          {props.subregion && (
            <p className="text-xs text-slate-300 font-medium">Subregión: {props.subregion}</p>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          {activeCommuneObj && (
            <button
              onClick={() => setShowReportModal(true)}
              className="px-2.5 py-1.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-400/40 text-[10px] font-mono font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
              title="Abrir Informe Diagnóstico Completo (Imprimir / Guardar en PDF / Descargar HTML)"
            >
              <FileText className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden sm:inline">Informe Completo</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-slate-300 hover:text-white transition cursor-pointer"
            title="Cerrar panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Drill-Down Action Button */}
      {drillTarget && onDrillDown && (
        <div className="p-2.5 bg-gradient-to-r from-amber-500/20 to-sky-500/20 border-b border-white/15">
          <button
            onClick={() => onDrillDown(drillTarget.level, feature.id)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-2xl bg-gradient-to-r from-amber-500/35 via-sky-500/35 to-blue-600/35 border border-amber-300/60 hover:border-white text-white text-xs font-black shadow-[0_0_20px_rgba(251,191,36,0.3),inset_0_1px_1px_0_rgba(255,255,255,0.5)] transition-all transform hover:scale-[1.01] active:scale-95"
          >
            <div className="flex items-center gap-2 truncate">
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin shrink-0" />
              <span className="truncate">{drillTarget.label}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-white shrink-0" />
          </button>
        </div>
      )}

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1 p-2 bg-black/30 border-b border-white/15 overflow-x-auto text-[11px] font-bold">
        <button
          onClick={() => setActiveTab('resumen')}
          className={`px-2.5 py-1 rounded-xl transition shrink-0 ${
            activeTab === 'resumen'
              ? 'bg-sky-500/30 text-white border border-sky-400/60 shadow-[0_0_10px_rgba(56,189,248,0.3)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Resumen
        </button>

        {/* Tabs for Comunas and Corregimientos */}
        {(isComuna || isBarrio) && (
          <>
            <button
              onClick={() => setActiveTab('e24')}
              className={`px-2.5 py-1 rounded-xl transition shrink-0 flex items-center gap-1 ${
                activeTab === 'e24'
                  ? 'bg-amber-500/30 text-amber-200 border border-amber-400/60 shadow-[0_0_10px_rgba(251,191,36,0.3)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileSpreadsheet className="w-3 h-3 text-amber-400" />
              E-24 Histórico
            </button>
            <button
              onClick={() => setActiveTab('ipm')}
              className={`px-2.5 py-1 rounded-xl transition shrink-0 ${
                activeTab === 'ipm'
                  ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-400/60 shadow-[0_0_10px_rgba(52,211,153,0.3)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Pobreza IPM
            </button>
            <button
              onClick={() => setActiveTab('seguridad')}
              className={`px-2.5 py-1 rounded-xl transition shrink-0 ${
                activeTab === 'seguridad'
                  ? 'bg-rose-500/30 text-rose-200 border border-rose-400/60 shadow-[0_0_10px_rgba(244,63,94,0.3)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Seguridad
            </button>
            <button
              onClick={() => setActiveTab('demografia')}
              className={`px-2.5 py-1 rounded-xl transition shrink-0 ${
                activeTab === 'demografia'
                  ? 'bg-indigo-500/30 text-indigo-200 border border-indigo-400/60 shadow-[0_0_10px_rgba(129,140,248,0.3)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Demografía
            </button>
          </>
        )}

        {/* Tabs for Municipalities */}
        {(isMpio || isMetroMuni) && (
          <>
            <button
              onClick={() => setActiveTab('alcaldia-concejo')}
              className={`px-2.5 py-1 rounded-xl transition shrink-0 flex items-center gap-1 ${
                activeTab === 'alcaldia-concejo'
                  ? 'bg-amber-500/30 text-amber-200 border border-amber-400/60 shadow-[0_0_10px_rgba(251,191,36,0.3)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Vote className="w-3 h-3 text-amber-400" />
              Alcaldía & Concejo
            </button>
            <button
              onClick={() => setActiveTab('demografia')}
              className={`px-2.5 py-1 rounded-xl transition shrink-0 ${
                activeTab === 'demografia'
                  ? 'bg-indigo-500/30 text-indigo-200 border border-indigo-400/60 shadow-[0_0_10px_rgba(129,140,248,0.3)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Demografía
            </button>
          </>
        )}
      </div>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {/* TAB 1: RESUMEN GENERAL */}
        {activeTab === 'resumen' && (
          <>
            {/* Core KPIs */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-2.5 rounded-2xl bg-white/05 border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase">
                  <Users className="w-3 h-3 text-sky-400" />
                  Población
                </div>
                <div className="text-base font-black text-white mt-1">
                  {(props.population || 0).toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-400">Habitantes DANE</div>
              </div>

              <div className="p-2.5 rounded-2xl bg-white/05 border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase">
                  <Vote className="w-3 h-3 text-emerald-400" />
                  Censo Electoral
                </div>
                <div className="text-base font-black text-white mt-1">
                  {(props.electoralCensus || 0).toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-400">Potencial votante</div>
              </div>

              <div className="p-2.5 rounded-2xl bg-white/05 border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase">
                  <TrendingUp className="w-3 h-3 text-amber-400" />
                  NBI / IPM
                </div>
                <div className="text-base font-black text-amber-300 mt-1">
                  {latestIpm ? `${latestIpm.ipmGlobal}%` : props.nbiPercentage ? `${props.nbiPercentage}%` : 'N/D'}
                </div>
                <div className="text-[10px] text-slate-400">Incidencia de Pobreza</div>
              </div>

              <div className="p-2.5 rounded-2xl bg-white/05 border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase">
                  <ShieldCheck className="w-3 h-3 text-rose-400" />
                  Riesgo
                </div>
                <div className="text-base font-black text-rose-300 mt-1">
                  {props.riskLevel || 'Medio'}
                </div>
                <div className="text-[10px] text-slate-400">Semáforo operativo</div>
              </div>
            </div>

            {/* If Municipality: Alcalde & Coalición Summary */}
            {(isMpio || isMetroMuni) && (
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-white/05 to-white/10 border border-white/15 space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase text-amber-400 font-bold">
                  <span className="flex items-center gap-1">
                    <Landmark className="w-3.5 h-3.5" />
                    Gobierno Local (2024-2027)
                  </span>
                  <span>{props.subregion || 'Antioquia'}</span>
                </div>
                <div className="text-sm font-black text-white">
                  {muniMatch?.mayor?.electedMayor || (props as any).mayorName || props.winnerCandidate || 'Administración Municipal'}
                </div>
                <div className="text-xs text-sky-300 font-medium">
                  {muniMatch?.mayor?.electedParty || props.predominantParty || props.winnerParty || 'Coalición Ganadora'}
                </div>
                {muniMatch?.mayor?.votes && (
                  <div className="text-[11px] text-slate-300 pt-1 border-t border-white/10 flex justify-between">
                    <span>Votación Obtenida:</span>
                    <strong className="font-mono text-white">{muniMatch.mayor.votes.toLocaleString()} votos ({muniMatch.mayor.percentageOfValidVotes}%)</strong>
                  </div>
                )}
                {metroData?.keyDynamics && (
                  <div className="text-[10px] text-slate-300 italic pt-1 border-t border-white/10">
                    {metroData.keyDynamics}
                  </div>
                )}
              </div>
            )}

            {/* If Barrio: Details */}
            {isBarrio && (
              <div className="p-3.5 rounded-2xl bg-white/05 border border-white/15 space-y-2">
                <div className="text-[10px] font-mono uppercase text-amber-400 font-bold">Ficha Barrial</div>
                <div className="text-xs text-slate-200">
                  <strong>Estrato Predominante:</strong> {props.predominantStratum}
                </div>
                <div className="text-xs text-slate-200">
                  <strong>Puestos de Votación:</strong> {props.votingStationsCount || '2'} puestos
                </div>
                <div className="text-xs text-slate-200">
                  <strong>Hito Territorial:</strong> {props.keyLandmark || 'Sector Residencial y Comercial'}
                </div>
                <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-200 text-xs">
                  ✔ Ganador 2023: {props.winner2023}
                </div>
              </div>
            )}

            {/* If Comuna or Corregimiento: Strata Distribution */}
            {comunaData && (
              <div className="p-3.5 rounded-2xl bg-white/05 border border-white/15 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <Home className="w-3.5 h-3.5 text-indigo-400" />
                    Estratificación Socioeconómica
                  </span>
                  <span className="text-[10px] font-mono text-indigo-300">{comunaData.predominantStratum}</span>
                </div>
                <div className="h-2.5 w-full bg-slate-900/60 rounded-full overflow-hidden flex border border-white/10">
                  <div style={{ width: `${comunaData.strataDistribution.bajo}%` }} className="bg-amber-500 h-full" title={`Bajo: ${comunaData.strataDistribution.bajo}%`} />
                  <div style={{ width: `${comunaData.strataDistribution.medio}%` }} className="bg-sky-500 h-full" title={`Medio: ${comunaData.strataDistribution.medio}%`} />
                  <div style={{ width: `${comunaData.strataDistribution.alto}%` }} className="bg-emerald-500 h-full" title={`Alto: ${comunaData.strataDistribution.alto}%`} />
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                  <span>E1-2: {comunaData.strataDistribution.bajo}%</span>
                  <span>E3-4: {comunaData.strataDistribution.medio}%</span>
                  <span>E5-6: {comunaData.strataDistribution.alto}%</span>
                </div>
                {comunaData.keyDynamics && (
                  <div className="text-[10px] text-slate-300 italic pt-1 border-t border-white/10">
                    "{comunaData.keyDynamics}"
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* TAB 2: HISTÓRICO E-24 (COMUNAS & CORREGIMIENTOS) */}
        {activeTab === 'e24' && (
          <E24HistoricalViewer
            comunaId={feature.id}
            comunaName={props.comunaName || props.name}
            barrioName={isBarrio ? props.name : undefined}
          />
        )}

        {/* TAB 3: ÍNDICE DE POBREZA MULTIDIMENSIONAL (IPM) */}
        {activeTab === 'ipm' && (
          comunaNumber ? (
            <IpmVariableEvolution
              communeId={comunaNumber}
              communeName={props.comunaName || props.name}
            />
          ) : latestIpm ? (
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-400/25 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-emerald-300 uppercase font-bold">Incidencia de Pobreza Global ({latestIpm.year})</div>
                  <div className="text-xl font-black text-white font-mono mt-0.5">{latestIpm.ipmGlobal}%</div>
                </div>
                <div className="text-right text-[10px] text-slate-300 font-medium">
                  DANE / Alcaldía
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-white/05 text-slate-400 text-xs text-center">
              No hay microdatos IPM detallados para este nivel territorial.
            </div>
          )
        )}

        {/* TAB 4: SEGURIDAD Y GOBERNANZA CRIMINAL (CIEF EAFIT / CHICAGO) */}
        {activeTab === 'seguridad' && (
          comunaNumber ? (
            <CriminalityPanel
              communeId={comunaNumber}
              communeName={props.comunaName || props.name}
            />
          ) : crimeRecord ? (
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-400/25 space-y-2">
              <span className="text-xs font-bold text-rose-300">
                Gobernanza Criminal: {crimeRecord.governanceLevel}
              </span>
              <p className="text-xs text-slate-300">{crimeRecord.summaryPDF}</p>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-white/05 text-slate-400 text-xs text-center">
              No hay microdatos de gobernanza criminal CIEF disponibles para este nivel.
            </div>
          )
        )}

        {/* TAB 5: DEMOGRAFÍA & PIRÁMIDES POBLACIONALES DINÁMICAS */}
        {activeTab === 'demografia' && (
          comunaNumber ? (
            <DemographicPyramid
              communeId={comunaNumber}
              communeName={props.comunaName || props.name}
              initialYear={2026}
            />
          ) : (
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-white/05 border border-white/15 space-y-2">
                <div className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-indigo-400" />
                  Consolidado Poblacional Territorial
                </div>
                <div className="text-xs text-slate-200">
                  Población Oficial DANE: <strong className="font-mono text-white">{(props.population || 0).toLocaleString()} habitantes</strong>
                </div>
                <div className="text-xs text-slate-200">
                  Censo Electoral Registraduría: <strong className="font-mono text-emerald-300">{(props.electoralCensus || 0).toLocaleString()} votantes</strong>
                </div>
              </div>
            </div>
          )
        )}

        {/* TAB 6: ALCALDÍA & CONCEJO (MUNICIPIOS) */}
        {activeTab === 'alcaldia-concejo' && (
          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-500/15 via-sky-500/10 to-transparent border border-amber-400/30 space-y-2">
              <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-amber-400 font-bold">
                <Vote className="w-3.5 h-3.5" />
                Alcalde Electo (2024 - 2027)
              </div>
              <div className="text-sm font-black text-white">
                {muniMatch?.mayor?.electedMayor || (props as any).mayorName || props.winnerCandidate || 'Alcaldía Municipal'}
              </div>
              <div className="text-xs text-sky-300 font-medium">
                {muniMatch?.mayor?.electedParty || props.predominantParty || props.winnerParty || 'Coalición de Gobierno'}
              </div>
              {muniMatch?.mayor?.votes && (
                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-white/10 text-slate-300">
                  <span>Votos Obtenidos:</span>
                  <span className="font-mono font-bold text-white">{muniMatch.mayor.votes.toLocaleString()} ({muniMatch.mayor.percentageOfValidVotes}%)</span>
                </div>
              )}
              {muniMatch?.mayor?.runnerUp && (
                <div className="p-2 rounded-xl bg-white/05 border border-white/10 text-[11px] text-slate-300 mt-2">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Segundo Lugar / Oposición:</div>
                  <div className="font-semibold text-slate-200">{muniMatch.mayor.runnerUp.name} ({muniMatch.mayor.runnerUp.party})</div>
                  <div className="text-[10px] text-emerald-300">
                    {muniMatch.mayor.runnerUp.votes.toLocaleString()} votos • {muniMatch.mayor.runnerUp.acceptedOppositionSeat ? 'Curul de Oposición aceptada' : ''}
                  </div>
                </div>
              )}
            </div>

            {/* Council seats if available */}
            {muniMatch?.council?.parties && muniMatch.council.parties.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-white/05 border border-white/15 space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase text-slate-300 font-bold">
                  <span>Bancadas del Concejo ({muniMatch.stats?.totalCouncilSeats || 21} Curules)</span>
                  <span className="text-sky-400 font-mono">{muniMatch.council.validVotes?.toLocaleString()} votos válidos</span>
                </div>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {muniMatch.council.parties.map((p, i) => (
                    <div key={i} className="flex items-center justify-between p-1.5 rounded-xl bg-black/25 border border-white/05 text-xs">
                      <span className="font-medium text-slate-200 truncate pr-2">{p.party}</span>
                      <div className="flex items-center gap-2 shrink-0 font-mono">
                        <span className="text-slate-400 text-[10px]">{p.votes.toLocaleString()} v.</span>
                        <span className="px-1.5 py-0.5 rounded-md bg-sky-500/20 text-sky-300 font-black text-[11px] border border-sky-400/30">
                          {p.seats} curules
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Quick Action: Full Diagnostic Report */}
      {activeCommuneObj && (
        <div className="p-3 bg-slate-900/80 border-t border-white/10 flex items-center justify-between text-xs">
          <div className="text-[10px] text-slate-400 font-mono">
            Comuna {activeCommuneObj.code} • {activeCommuneObj.name}
          </div>
          <button
            onClick={() => setShowReportModal(true)}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-sky-500/30 to-indigo-500/30 hover:from-sky-500/40 hover:to-indigo-500/40 text-white font-bold border border-sky-400/40 flex items-center gap-1.5 text-xs transition cursor-pointer shadow-xs"
          >
            <FileText className="w-3.5 h-3.5 text-sky-400" />
            <span>Ver Informe Completo (PDF / HTML)</span>
          </button>
        </div>
      )}

      {/* Full Commune Diagnostic Report Modal */}
      {showReportModal && activeCommuneObj && (
        <CommuneReportModal
          commune={activeCommuneObj}
          selectedYear={2026}
          onClose={() => setShowReportModal(false)}
        />
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  Search, 
  Sparkles, 
  Globe, 
  ShieldCheck, 
  AlertTriangle, 
  Users, 
  Building2, 
  MapPin, 
  Vote, 
  Share2, 
  Flame, 
  CheckCircle2, 
  Clock, 
  RefreshCw,
  Send,
  Linkedin
} from 'lucide-react';
import { GraphNodeActor, GraphEdgeRelation, PoliticalHouse, ActorOSINTReport } from '../../data/politicalHouses/types';
import { PoliticalActorIntelligenceService } from '../../services/politicalActorIntelligenceService';

interface ActorDossierDrawerProps {
  actor: GraphNodeActor | null;
  house?: PoliticalHouse;
  allEdges: GraphEdgeRelation[];
  allNodes: GraphNodeActor[];
  onClose: () => void;
  onSelectRelatedActor: (actor: GraphNodeActor) => void;
  onNavigateToContentDirector?: (actor: GraphNodeActor) => void;
}

export const ActorDossierDrawer: React.FC<ActorDossierDrawerProps> = ({
  actor,
  house,
  allEdges,
  allNodes,
  onClose,
  onSelectRelatedActor,
  onNavigateToContentDirector
}) => {
  const [osintReport, setOsintReport] = useState<ActorOSINTReport | null>(null);
  const [isSearchingOsint, setIsSearchingOsint] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'perfil' | 'relaciones' | 'osint'>('perfil');

  if (!actor) return null;

  // Filtrar relaciones de este actor
  const actorEdges = allEdges.filter(e => e.source === actor.id || e.target === actor.id);
  const nodeMap = new Map(allNodes.map(n => [n.id, n]));

  // Disparar rastreo en tiempo real con Google Search Grounding
  const handleTriggerLiveOSINT = async () => {
    setIsSearchingOsint(true);
    setActiveTab('osint');
    try {
      const report = await PoliticalActorIntelligenceService.searchActorIntelligence(actor);
      setOsintReport(report);
    } catch (err) {
      console.error('Error al rastrear OSINT:', err);
    } finally {
      setIsSearchingOsint(false);
    }
  };

  const getLevelBadge = (level: number) => {
    switch (level) {
      case 1: return { text: 'Nivel 1 • Cúpula / Patriarca', bg: 'bg-amber-500/20 text-amber-300 border-amber-500/40' };
      case 2: return { text: 'Nivel 2 • Poder Extramunicipal / Congreso', bg: 'bg-sky-500/20 text-sky-300 border-sky-500/40' };
      case 3: return { text: 'Nivel 3 • Poder Departamental / Asamblea', bg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40' };
      case 4: return { text: 'Nivel 4 • Poder Municipal / Alcaldía & Concejo', bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' };
      case 5: return { text: 'Nivel 5 • Operador Territorial / Base', bg: 'bg-slate-500/20 text-slate-300 border-slate-500/40' };
      default: return { text: `Nivel ${level}`, bg: 'bg-slate-800 text-slate-300 border-slate-700' };
    }
  };

  const levelInfo = getLevelBadge(actor.level);

  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-xl bg-slate-950/95 backdrop-blur-3xl border-l border-white/20 shadow-2xl z-50 flex flex-col animate-fadeIn">
      {/* Header del Expediente */}
      <div className="p-5 border-b border-white/10 flex items-start justify-between gap-4 bg-slate-900/50">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold border ${levelInfo.bg}`}>
              {levelInfo.text}
            </span>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-white/10 text-slate-300 uppercase">
              Esfera: {actor.sphere}
            </span>
          </div>

          <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
            <span>{actor.name}</span>
            {actor.alias && (
              <span className="text-xs font-normal text-amber-300 italic">
                «{actor.alias}»
              </span>
            )}
          </h2>

          <p className="text-xs text-sky-300 font-bold">
            {actor.roleLabel} • {actor.municipality} ({actor.department})
          </p>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
          title="Cerrar Expediente"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Selector de Pestañas del Expediente */}
      <div className="flex border-b border-white/10 bg-slate-900/30 px-5 pt-2 gap-2 text-xs font-bold">
        <button
          onClick={() => setActiveTab('perfil')}
          className={`pb-2.5 px-3 border-b-2 transition flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'perfil'
              ? 'border-sky-400 text-white'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Ficha de Poder</span>
        </button>
        <button
          onClick={() => setActiveTab('relaciones')}
          className={`pb-2.5 px-3 border-b-2 transition flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'relaciones'
              ? 'border-sky-400 text-white'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Share2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Vínculos en Grafo ({actorEdges.length})</span>
        </button>
        <button
          onClick={() => {
            setActiveTab('osint');
            if (!osintReport && !isSearchingOsint) {
              handleTriggerLiveOSINT();
            }
          }}
          className={`pb-2.5 px-3 border-b-2 transition flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'osint'
              ? 'border-amber-400 text-amber-300'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>OSINT & Redes en Vivo</span>
        </button>
      </div>

      {/* Cuerpo Desplazable del Expediente */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {/* ==================================================== */}
        {/* TAB 1: PERFIL Y ARTICULACIÓN DE PODER */}
        {/* ==================================================== */}
        {activeTab === 'perfil' && (
          <div className="space-y-4">
            {/* Casa Política Perteneciente */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-bold">
                Casa Política / Estructura Matriz
              </span>
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-white" style={{ color: house?.color || '#38bdf8' }}>
                  {actor.houseName}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-slate-300 font-mono">
                  Cuartel: {house?.headquarters || actor.municipality}
                </span>
              </div>
              {house && (
                <p className="text-xs text-slate-300 leading-relaxed pt-1 border-t border-white/05">
                  {house.description}
                </p>
              )}
            </div>

            {/* Cruce Dual: Poder Municipal vs Poder Extramunicipal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-sky-950/30 border border-sky-500/20 space-y-1.5">
                <div className="flex items-center gap-1.5 text-sky-400 text-xs font-black uppercase">
                  <Building2 className="w-4 h-4" />
                  <span>Poder Municipal</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {actor.municipalAnchor}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 space-y-1.5">
                <div className="flex items-center gap-1.5 text-indigo-400 text-xs font-black uppercase">
                  <Globe className="w-4 h-4" />
                  <span>Poder Extramunicipal</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {actor.extramunicipalConnection}
                </p>
              </div>
            </div>

            {/* Resumen Biográfico */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-400 uppercase block font-mono">
                Perfil Político & Trayectoria
              </span>
              <p className="text-xs text-slate-300 leading-relaxed bg-white/[0.02] p-3 rounded-xl border border-white/05">
                {actor.bio}
              </p>
            </div>

            {/* Datos Electorales */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/05">
                <span className="text-[10px] text-slate-400 font-mono uppercase block">Votación Obtenida</span>
                <span className="text-base font-black text-white font-mono">
                  {actor.votes2023 ? `${actor.votes2023.toLocaleString('es-CO')} votos` : 'Liderazgo Orgánico'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/05">
                <span className="text-[10px] text-slate-400 font-mono uppercase block">Estado Político</span>
                <span className="text-xs font-bold text-emerald-400">
                  {actor.status}
                </span>
              </div>
            </div>

            {/* Botón de Acción de Rastreo en Vivo */}
            <button
              onClick={handleTriggerLiveOSINT}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-sky-600 to-indigo-600 hover:brightness-110 text-white font-black text-xs flex items-center justify-center gap-2 shadow-xl cursor-pointer transition-all border border-amber-400/40"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Rastrear Redes Sociales y Noticias con Google Search</span>
            </button>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 2: VÍNCULOS EN EL GRAFO (ARISTAS) */}
        {/* ==================================================== */}
        {activeTab === 'relaciones' && (
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase text-slate-400 block font-bold">
              Conexiones Directas en el Grafo ({actorEdges.length})
            </span>

            {actorEdges.length === 0 ? (
              <p className="text-xs text-slate-400 p-4 rounded-xl bg-white/[0.02]">
                No hay conexiones directas registradas en los filtros actuales.
              </p>
            ) : (
              actorEdges.map(edge => {
                const isOutgoing = edge.source === actor.id;
                const relatedId = isOutgoing ? edge.target : edge.source;
                const relatedNode = nodeMap.get(relatedId);
                if (!relatedNode) return null;

                const isTension = edge.type === 'tension_disputa';
                const isHierarchy = edge.type === 'jerarquia_directa';

                return (
                  <div
                    key={edge.id}
                    onClick={() => onSelectRelatedActor(relatedNode)}
                    className={`p-3 rounded-2xl border transition cursor-pointer hover:scale-[1.01] ${
                      isTension 
                        ? 'bg-rose-950/30 border-rose-500/40 hover:bg-rose-950/50' 
                        : isHierarchy 
                        ? 'bg-emerald-950/30 border-emerald-500/40 hover:bg-emerald-950/50' 
                        : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.07]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-black text-white flex items-center gap-1.5">
                        {isTension ? <Flame className="w-3.5 h-3.5 text-rose-400" /> : <Users className="w-3.5 h-3.5 text-sky-400" />}
                        {relatedNode.name}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-slate-300">
                        {isOutgoing ? 'Emite orden / alianza' : 'Recibe subordinación'}
                      </span>
                    </div>

                    <div className="text-[11px] font-bold text-sky-300">
                      {edge.label} • Fuerza: {edge.strength}/5
                    </div>

                    <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                      {edge.description}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 3: INTELIGENCIA OSINT & REDES EN TIEMPO REAL */}
        {/* ==================================================== */}
        {activeTab === 'osint' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-black text-white uppercase tracking-wider">
                  Auditoría Digital SO-NEWS (Google Search Grounding)
                </span>
              </div>
              <button
                onClick={handleTriggerLiveOSINT}
                disabled={isSearchingOsint}
                className="p-1 text-slate-400 hover:text-white rounded-lg transition"
                title="Actualizar búsqueda en vivo"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSearchingOsint ? 'animate-spin text-amber-400' : ''}`} />
              </button>
            </div>

            {isSearchingOsint ? (
              <div className="p-8 text-center space-y-3 bg-slate-900/40 rounded-2xl border border-white/10">
                <RefreshCw className="w-8 h-8 text-amber-400 animate-spin mx-auto" />
                <h4 className="text-sm font-black text-white">Rastreando Redes Sociales y Noticias con Google Search...</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  La subunidad SO-NEWS está verificando cuentas en X, Facebook e Instagram, y analizando titulares recientes de prensa sobre {actor.name}.
                </p>
              </div>
            ) : osintReport ? (
              <div className="space-y-4">
                {/* Cuentas Sociales Verificadas */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-bold">
                    Perfiles Digitales y Redes Sociales Detectadas
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {osintReport.socialHandlesFound.map((soc, idx) => (
                      <a
                        key={idx}
                        href={soc.handleOrUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex items-center justify-between transition group cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <Globe className="w-3.5 h-3.5 text-sky-400" />
                          <span className="text-xs font-bold text-white group-hover:text-sky-300">
                            {soc.platform}
                          </span>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Noticias Recientes de Prensa */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-bold">
                    Titulares Recientes de Prensa (Corroboración de Alianzas)
                  </span>
                  <div className="space-y-2">
                    {osintReport.recentHeadlines.map((head, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-white/05 space-y-1">
                        <div className="flex items-center justify-between text-[10px] font-mono text-amber-400">
                          <span>{head.source}</span>
                          <span className="text-slate-500">Noticia Verificada</span>
                        </div>
                        <h5 className="text-xs font-black text-white leading-tight">
                          {head.headline}
                        </h5>
                        <p className="text-[11px] text-slate-300">
                          {head.dateOrSnippet}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Evaluación Dialéctica */}
                <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-500/30 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-amber-400 text-xs font-black uppercase">
                    <Sparkles className="w-4 h-4" />
                    <span>Síntesis Dialéctica SO-NEWS</span>
                  </div>
                  <p className="text-xs text-amber-200/90 leading-relaxed">
                    {osintReport.contradictionAnalysis}
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center text-xs text-slate-400">
                Presiona el botón para auditar en tiempo real a este actor con Google Search.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer del Drawer con acción estratégica */}
      <div className="p-4 border-t border-white/10 bg-slate-900/60 flex items-center justify-between gap-3">
        <span className="text-[10px] text-slate-400 font-mono">
          Expediente Proteus • Protocolo PA-009
        </span>
        {onNavigateToContentDirector && (
          <button
            onClick={() => onNavigateToContentDirector(actor)}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center gap-1.5 transition cursor-pointer shadow-lg"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Crear Contenido vs/pro este Actor</span>
          </button>
        )}
      </div>
    </div>
  );
};

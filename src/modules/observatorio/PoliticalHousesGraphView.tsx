import React, { useState, useMemo } from 'react';
import { 
  Network, 
  Layers, 
  Workflow, 
  Search, 
  Filter, 
  Building2, 
  Users, 
  Globe, 
  Sparkles, 
  Share2, 
  Eye, 
  Flame, 
  ShieldCheck, 
  Download, 
  HelpCircle,
  Box,
  Compass,
  ArrowRight
} from 'lucide-react';
import { 
  MASTER_POLITICAL_GRAPH, 
  POLITICAL_HOUSES_DATA, 
  GRAPH_NODES_DATA, 
  GRAPH_EDGES_DATA 
} from '../../data/politicalHouses/politicalHousesMasterData';
import { GraphNodeActor, PoliticalHouse, HierarchyLevel } from '../../data/politicalHouses/types';
import { PoliticalHouse2DGraph } from '../../components/graphs/PoliticalHouse2DGraph';
import { PoliticalHouse3DGraph } from '../../components/graphs/PoliticalHouse3DGraph';
import { ActorDossierDrawer } from '../../components/graphs/ActorDossierDrawer';
import { DialecticalAnalysisCard } from '../../components/graphs/DialecticalAnalysisCard';
import { CandidateProfile } from '../../components/CandidateProfileManager';
import { activeTerritoryService } from '../../services/activeTerritoryContextService';

interface PoliticalHousesGraphViewProps {
  candidateProfile?: CandidateProfile;
  onNavigateToContentDirector?: () => void;
}

export const PoliticalHousesGraphView: React.FC<PoliticalHousesGraphViewProps> = ({
  candidateProfile,
  onNavigateToContentDirector
}) => {
  const [viewMode, setViewMode] = useState<'2D' | '3D'>('2D');
  const [selectedActor, setSelectedActor] = useState<GraphNodeActor | null>(null);
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>('all');
  const [selectedHouseId, setSelectedHouseId] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<HierarchyLevel | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Municipios únicos representados
  const uniqueMunicipalities = useMemo(() => {
    const set = new Set(GRAPH_NODES_DATA.map(n => n.municipality));
    return Array.from(set).sort();
  }, []);

  // Nodos filtrados por búsqueda textual
  const searchedNodes = useMemo(() => {
    if (!searchQuery.trim()) return GRAPH_NODES_DATA;
    const q = searchQuery.toLowerCase();
    return GRAPH_NODES_DATA.filter(n => 
      n.name.toLowerCase().includes(q) ||
      (n.alias && n.alias.toLowerCase().includes(q)) ||
      n.municipality.toLowerCase().includes(q) ||
      n.houseName.toLowerCase().includes(q) ||
      n.roleLabel.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Casa activa para el análisis dialéctico
  const activeHouseForDialectics = useMemo(() => {
    if (selectedHouseId !== 'all') {
      return POLITICAL_HOUSES_DATA.find(h => h.id === selectedHouseId) || POLITICAL_HOUSES_DATA[0];
    }
    if (selectedActor) {
      return POLITICAL_HOUSES_DATA.find(h => h.id === selectedActor.houseId) || POLITICAL_HOUSES_DATA[0];
    }
    return POLITICAL_HOUSES_DATA[0];
  }, [selectedHouseId, selectedActor]);

  // Navegar al Director de Contenido precargando el territorio del actor
  const handleNavigateToContent = (actor: GraphNodeActor) => {
    activeTerritoryService.setState({
      scale: actor.sphere === 'extramunicipal' ? 'departamental' : 'municipal',
      name: actor.municipality,
      fullName: `${actor.municipality} (Área Metropolitana, Antioquia)`,
      deptId: 'dept-antioquia',
      subregId: 'subreg-valle-de-aburra',
      keyProblems: [
        `Tensión política con la ${actor.houseName}`,
        `Disputa de liderazgo y avales con ${actor.name}`
      ],
      source: 'manual_selector'
    });
    if (onNavigateToContentDirector) {
      onNavigateToContentDirector();
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* 1. Header Institucional Glassmorphism Frost */}
      <div className="relative overflow-hidden rounded-3xl p-6 md:p-8 bg-slate-950/40 backdrop-blur-3xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1.5px_2px_rgba(255,255,255,0.4)]">
        {/* Ambient Glowing Orbs */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-24 left-1/3 w-80 h-80 bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-wider bg-gradient-to-r from-sky-400/25 via-indigo-500/25 to-purple-500/30 text-sky-300 border border-sky-400/50 shadow-[0_0_15px_rgba(56,189,248,0.35)] flex items-center gap-1.5">
                <Network className="w-3.5 h-3.5 text-sky-400" />
                Observatorio Electoral • Redes de Poder & Casas Políticas
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white/10 text-slate-300 border border-white/20">
                Protocolo PA-009
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              MAPEO RELACIONAL DE CASAS POLÍTICAS
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Visualización topológica de la articulación entre los <strong className="text-sky-300">poderes municipales</strong> (alcaldías, concejos y contratación local) y los <strong className="text-amber-300">poderes extramunicipales</strong> (senadores, representantes, ministerios y gobernación) en el Valle de Aburrá y Antioquia.
            </p>
          </div>

          {/* Conmutador 2D / 3D */}
          <div className="shrink-0 flex items-center bg-slate-900/80 p-1.5 rounded-2xl border border-white/15 shadow-xl">
            <button
              onClick={() => setViewMode('2D')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
                viewMode === '2D'
                  ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Workflow className="w-4 h-4" />
              <span>Grafo Relacional 2D</span>
            </button>
            <button
              onClick={() => setViewMode('3D')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
                viewMode === '3D'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Box className="w-4 h-4" />
              <span>Constelación 3D</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Grid de 4 Macro KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-lg space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold font-mono">
            <span>Casas Mapeadas</span>
            <Building2 className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {POLITICAL_HOUSES_DATA.length}
          </div>
          <span className="text-[10px] text-sky-300">Hegemonías activas en Antioquia</span>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-lg space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold font-mono">
            <span>Actores en Grafo</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {GRAPH_NODES_DATA.length}
          </div>
          <span className="text-[10px] text-emerald-400">Jerarquizados del Nivel 1 al 5</span>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-lg space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold font-mono">
            <span>Aristas Relacionales</span>
            <Share2 className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {GRAPH_EDGES_DATA.length}
          </div>
          <span className="text-[10px] text-purple-300">Líneas de mando, alianzas y disputas</span>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-lg space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold font-mono">
            <span>Municipios con Feudo</span>
            <Compass className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {uniqueMunicipalities.length}
          </div>
          <span className="text-[10px] text-amber-300">Valle de Aburrá & Subregiones</span>
        </div>
      </div>

      {/* 3. Barra de Filtros y Búsqueda */}
      <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-lg">
        {/* Buscador Textual */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar actor, apodo, casa política o municipio..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-sky-400 transition"
          />
        </div>

        {/* Filtros en Cascada */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Filtro Municipio */}
          <select
            value={selectedMunicipality}
            onChange={(e) => setSelectedMunicipality(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-800/80 border border-white/10 text-white text-xs font-bold focus:outline-none focus:border-sky-400 cursor-pointer"
          >
            <option value="all">📍 Todos los Municipios</option>
            {uniqueMunicipalities.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>

          {/* Filtro Casa Política */}
          <select
            value={selectedHouseId}
            onChange={(e) => setSelectedHouseId(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-800/80 border border-white/10 text-white text-xs font-bold focus:outline-none focus:border-sky-400 cursor-pointer max-w-[220px] truncate"
          >
            <option value="all">🏛️ Todas las Casas Políticas</option>
            {POLITICAL_HOUSES_DATA.map(h => (
              <option key={h.id} value={h.id}>{h.name}</option>
            ))}
          </select>

          {/* Filtro Nivel Jerárquico */}
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value === 'all' ? 'all' : (Number(e.target.value) as HierarchyLevel))}
            className="px-3 py-2 rounded-xl bg-slate-800/80 border border-white/10 text-white text-xs font-bold focus:outline-none focus:border-sky-400 cursor-pointer"
          >
            <option value="all">⭐ Todos los Niveles</option>
            <option value="1">N1: Cúpula / Patriarca</option>
            <option value="2">N2: Congreso Nacional</option>
            <option value="3">N3: Asamblea Departamental</option>
            <option value="4">N4: Alcaldía & Concejo</option>
            <option value="5">N5: Operadores de Base</option>
          </select>
        </div>
      </div>

      {/* 4. Visualizador Central de Grafos (2D o 3D) */}
      <div className="relative">
        {viewMode === '2D' ? (
          <PoliticalHouse2DGraph
            nodes={searchedNodes}
            edges={GRAPH_EDGES_DATA}
            houses={POLITICAL_HOUSES_DATA}
            selectedActorId={selectedActor?.id}
            onSelectActor={(actor) => setSelectedActor(actor)}
            filterMunicipality={selectedMunicipality}
            filterHouseId={selectedHouseId}
            filterLevel={selectedLevel}
          />
        ) : (
          <PoliticalHouse3DGraph
            nodes={searchedNodes}
            edges={GRAPH_EDGES_DATA}
            houses={POLITICAL_HOUSES_DATA}
            selectedActorId={selectedActor?.id}
            onSelectActor={(actor) => setSelectedActor(actor)}
            filterMunicipality={selectedMunicipality}
            filterHouseId={selectedHouseId}
            filterLevel={selectedLevel}
          />
        )}
      </div>

      {/* 5. Tarjeta de Análisis Dialéctico de la Casa Activa */}
      <DialecticalAnalysisCard
        house={activeHouseForDialectics}
        candidateName={candidateProfile?.nombre || 'Isaac Mendoza'}
      />

      {/* 6. Drawer Lateral del Expediente del Actor (al hacer clic) */}
      {selectedActor && (
        <ActorDossierDrawer
          actor={selectedActor}
          house={POLITICAL_HOUSES_DATA.find(h => h.id === selectedActor.houseId)}
          allEdges={GRAPH_EDGES_DATA}
          allNodes={GRAPH_NODES_DATA}
          onClose={() => setSelectedActor(null)}
          onSelectRelatedActor={(relActor) => setSelectedActor(relActor)}
          onNavigateToContentDirector={handleNavigateToContent}
        />
      )}
    </div>
  );
};

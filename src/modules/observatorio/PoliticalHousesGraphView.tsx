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

export interface PartyFilterConfig {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  color: string;
  leader: string;
  description: string;
}

export const POLITICAL_PARTIES_CONFIG: PartyFilterConfig[] = [
  {
    id: 'all',
    name: 'Red General Completa',
    shortName: '🌐 Red General',
    icon: '🌐',
    color: '#38bdf8',
    leader: 'Inter-partidista',
    description: 'Vista sistémica integrada de todas las casas políticas y sus interacciones territoriales en Antioquia.'
  },
  {
    id: 'centro-democratico',
    name: 'Centro Democrático',
    shortName: '🟦 Centro Democrático',
    icon: '🟦',
    color: '#0284c7',
    leader: 'Álvaro Uribe Vélez',
    description: 'Estructura vertical CD: Uribe Vélez, Gobernador Andrés Julián Rendón, Senadores (Holguín, Quintero) y Bancada de Concejales de Medellín (Sebastián López, Claudia Carrasquilla, Luis Guillermo Vélez, Andrés "Gury" Rodríguez, Leticia Orrego).'
  },
  {
    id: 'creemos',
    name: 'Creemos',
    shortName: '🟩 Creemos (Fico)',
    icon: '🟩',
    color: '#10b981',
    leader: 'Federico Gutiérrez Zuluaga',
    description: 'Estructura hegemónica de Medellín: Alcalde Federico Gutiérrez y Bancada mayoritaria en el Concejo de Medellín (Andrés Felipe Tobón, María Paulina Suárez, Santiago Perdomo, Alejandro De Bedout, Alliday Tobón, Iván Alonso Montoya).'
  },
  {
    id: 'conservador',
    name: 'Partido Conservador',
    shortName: '🔷 Partido Conservador',
    icon: '🔷',
    color: '#3b82f6',
    leader: 'Carlos Andrés Trujillo',
    description: 'Feudo territorial de Itagüí y Sur del Valle de Aburrá: Senador Trujillo, Alcalde Diego Torres, Lorena González (Bello) y bancada de concejales conservadores.'
  },
  {
    id: 'liberal',
    name: 'Partido Liberal',
    shortName: '🔴 Partido Liberal',
    icon: '🔴',
    color: '#ef4444',
    leader: 'Julián Bedoya / Envigado',
    description: 'Red liberal de Antioquia: Equipo de Envigado (Braulio Espinosa, Farley Macías, Pablo Restrepo), maquinaria de Julián Bedoya y disputas locales.'
  },
  {
    id: 'pacto-historico',
    name: 'Pacto Histórico',
    shortName: '🟪 Pacto Histórico',
    icon: '🟪',
    color: '#a855f7',
    leader: 'José Luis Marín / Oposición',
    description: 'Bancada de oposición en Medellín: Concejal José Luis Marín (Aquineto), Juan Carlos Upegui y articulación con el Gobierno Nacional.'
  },
  {
    id: 'verde',
    name: 'Alianza Verde',
    shortName: '🟢 Alianza Verde',
    icon: '🟢',
    color: '#14b8a6',
    leader: 'Camilo Londoño',
    description: 'Bancada ciudadana y ambiental: Concejal Camilo Londoño y movimientos cívicos alternativos.'
  }
];

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
  const [selectedParty, setSelectedParty] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<'all' | 'concejales' | 'congresistas' | 'cupula'>('all');
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>('all');
  const [selectedHouseId, setSelectedHouseId] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<HierarchyLevel | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Municipios únicos representados
  const uniqueMunicipalities = useMemo(() => {
    const set = new Set(GRAPH_NODES_DATA.map(n => n.municipality));
    return Array.from(set).sort();
  }, []);

  // Filtrado de nodos con soporte prioritario de GRAFO POR PARTIDO y concejales
  const searchedNodes = useMemo(() => {
    let list = GRAPH_NODES_DATA;

    // 1. Filtro estricto por Partido
    if (selectedParty !== 'all') {
      list = list.filter(n => n.partyId === selectedParty);
    }

    // 2. Filtro por Rol / Jerarquía (Concejales, Congresistas, Cúpula)
    if (roleFilter === 'concejales') {
      list = list.filter(n => 
        n.roleLabel.toLowerCase().includes('concejal') || 
        n.name.toLowerCase().includes('concejal') || 
        n.level === 4
      );
    } else if (roleFilter === 'congresistas') {
      list = list.filter(n => 
        n.roleLabel.toLowerCase().includes('senad') || 
        n.roleLabel.toLowerCase().includes('represent') || 
        n.level === 2
      );
    } else if (roleFilter === 'cupula') {
      list = list.filter(n => 
        n.level === 1 || 
        n.roleLabel.toLowerCase().includes('alcald') || 
        n.roleLabel.toLowerCase().includes('gobernador')
      );
    }

    // 3. Búsqueda textual
    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase();
    return list.filter(n => 
      n.name.toLowerCase().includes(q) ||
      (n.alias && n.alias.toLowerCase().includes(q)) ||
      n.municipality.toLowerCase().includes(q) ||
      n.houseName.toLowerCase().includes(q) ||
      n.roleLabel.toLowerCase().includes(q)
    );
  }, [selectedParty, roleFilter, searchQuery]);

  // Conteo de concejales y congresistas en la vista activa
  const concejalesCount = useMemo(() => {
    const base = selectedParty === 'all' 
      ? GRAPH_NODES_DATA 
      : GRAPH_NODES_DATA.filter(n => n.partyId === selectedParty);
    return base.filter(n => n.roleLabel.toLowerCase().includes('concejal') || n.level === 4).length;
  }, [selectedParty]);

  const activePartyConfig = useMemo(() => {
    return POLITICAL_PARTIES_CONFIG.find(p => p.id === selectedParty) || POLITICAL_PARTIES_CONFIG[0];
  }, [selectedParty]);

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
              Casas políticas
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

      {/* 2.5. SELECTOR MAESTRO: UN SOLO GRAFO POR PARTIDO (Requerimiento de Usuario) */}
      <div className="bg-slate-950/70 backdrop-blur-2xl border border-sky-400/40 rounded-3xl p-5 shadow-[0_10px_35px_rgba(0,0,0,0.5)] space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-400/30">
              <Workflow className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-black uppercase tracking-wider text-sky-300">
                  Un Solo Grafo por Partido Político
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 font-mono font-bold">
                  Bancada Concejales Integrada
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Aísla la jerarquía limpia de cada partido: desde el patriarca o jefe natural, senadores y representantes, hasta los concejales de Medellín y el Valle de Aburrá.
              </p>
            </div>
          </div>

          {/* Role Quick Selector */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/[0.04] border border-white/10 shrink-0">
            <button
              onClick={() => setRoleFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                roleFilter === 'all'
                  ? 'bg-sky-500/30 text-sky-200 border border-sky-400/50'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Todos ({searchedNodes.length})
            </button>
            <button
              onClick={() => setRoleFilter('concejales')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                roleFilter === 'concejales'
                  ? 'bg-amber-500/30 text-amber-200 border border-amber-400/50 shadow-[0_0_12px_rgba(251,191,36,0.3)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🎖️ Concejales ({concejalesCount})</span>
            </button>
            <button
              onClick={() => setRoleFilter('congresistas')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                roleFilter === 'congresistas'
                  ? 'bg-purple-500/30 text-purple-200 border border-purple-400/50'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🏛️ Congreso
            </button>
            <button
              onClick={() => setRoleFilter('cupula')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                roleFilter === 'cupula'
                  ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-400/50'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              👑 Cúpula
            </button>
          </div>
        </div>

        {/* Party Selector Buttons */}
        <div className="flex flex-wrap gap-2 pt-1">
          {POLITICAL_PARTIES_CONFIG.map((p) => {
            const isSelected = selectedParty === p.id;
            return (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedParty(p.id);
                  if (p.id !== 'all') {
                    if (p.id === 'creemos') setSelectedHouseId('casa-fico');
                    else if (p.id === 'centro-democratico') setSelectedHouseId('casa-uribismo');
                    else if (p.id === 'conservador') setSelectedHouseId('casa-trujillo');
                    else if (p.id === 'liberal') setSelectedHouseId('casa-envigado');
                    else setSelectedHouseId('all');
                  } else {
                    setSelectedHouseId('all');
                  }
                }}
                className={`px-3.5 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'scale-[1.03] shadow-lg border text-white'
                    : 'bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-800/80 border border-white/10'
                }`}
                style={isSelected ? {
                  backgroundColor: `${p.color}35`,
                  borderColor: p.color,
                  boxShadow: `0 0 16px ${p.color}40`
                } : {}}
              >
                <span>{p.icon}</span>
                <span>{p.name}</span>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: p.color }} />
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Party Dossier Summary Banner */}
        {selectedParty !== 'all' && (
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs animate-fadeIn">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-black text-white text-sm" style={{ color: activePartyConfig.color }}>
                  {activePartyConfig.name}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  • Liderazgo Principal: <strong className="text-white">{activePartyConfig.leader}</strong>
                </span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {activePartyConfig.description}
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-2">
              <div className="text-right">
                <div className="text-xs font-mono font-black text-white">{searchedNodes.length} Actores</div>
                <div className="text-[10px] text-amber-300 font-bold">{concejalesCount} Concejales</div>
              </div>
              <button
                onClick={() => {
                  setSelectedParty('all');
                  setSelectedHouseId('all');
                  setRoleFilter('all');
                }}
                className="px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white text-[10px] font-bold border border-white/15 transition cursor-pointer"
              >
                Ver Todo
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 3. Barra de Filtros y Búsqueda */}
      <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-lg">
        {/* Buscador Textual */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar actor, concejal, apodo, casa política o municipio..."
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

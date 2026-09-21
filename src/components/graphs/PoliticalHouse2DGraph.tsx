import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Layers, 
  Info, 
  Search, 
  Sliders, 
  Users, 
  Building2, 
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Flame,
  Handshake,
  Workflow
} from 'lucide-react';
import { GraphNodeActor, GraphEdgeRelation, PoliticalHouse, HierarchyLevel } from '../../data/politicalHouses/types';

interface PoliticalHouse2DGraphProps {
  nodes: GraphNodeActor[];
  edges: GraphEdgeRelation[];
  houses: PoliticalHouse[];
  selectedActorId?: string | null;
  onSelectActor: (actor: GraphNodeActor) => void;
  filterMunicipality?: string;
  filterHouseId?: string;
  filterLevel?: HierarchyLevel | 'all';
}

interface NodePosition {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export const PoliticalHouse2DGraph: React.FC<PoliticalHouse2DGraphProps> = ({
  nodes,
  edges,
  houses,
  selectedActorId,
  onSelectActor,
  filterMunicipality = 'all',
  filterHouseId = 'all',
  filterLevel = 'all'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState<number>(0.9);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hoveredActor, setHoveredActor] = useState<GraphNodeActor | null>(null);
  const [layoutMode, setLayoutMode] = useState<'hierarchy' | 'clusters' | 'radial'>('clusters');

  // Filtrado de nodos
  const filteredNodes = useMemo(() => {
    return nodes.filter(node => {
      const matchMuni = filterMunicipality === 'all' || node.municipality.toLowerCase() === filterMunicipality.toLowerCase();
      const matchHouse = filterHouseId === 'all' || node.houseId === filterHouseId;
      const matchLevel = filterLevel === 'all' || node.level === filterLevel;
      return matchMuni && matchHouse && matchLevel;
    });
  }, [nodes, filterMunicipality, filterHouseId, filterLevel]);

  const filteredNodeIds = useMemo(() => new Set(filteredNodes.map(n => n.id)), [filteredNodes]);

  // Filtrado de aristas visibles
  const visibleEdges = useMemo(() => {
    return edges.filter(e => filteredNodeIds.has(e.source) && filteredNodeIds.has(e.target));
  }, [edges, filteredNodeIds]);

  // Mapa de colores por Casa Política
  const houseColorMap = useMemo(() => {
    const map = new Map<string, string>();
    houses.forEach(h => map.set(h.id, h.color));
    return map;
  }, [houses]);

  // Algoritmo de posicionamiento determinista y estético
  const nodePositions = useMemo(() => {
    const positions = new Map<string, { x: number; y: number }>();
    const houseIndexMap = new Map<string, number>();
    houses.forEach((h, idx) => houseIndexMap.set(h.id, idx));

    const totalHouses = Math.max(houses.length, 1);
    const width = 1100;
    const height = 750;
    const centerX = width / 2;
    const centerY = height / 2;

    filteredNodes.forEach((node, i) => {
      if (layoutMode === 'clusters') {
        // Agrupación por Casas Políticas alrededor de centros de gravedad
        const hIdx = houseIndexMap.get(node.houseId) ?? (i % totalHouses);
        const angle = (hIdx / totalHouses) * 2 * Math.PI;
        const clusterRadius = 260;
        const clusterCenterX = centerX + Math.cos(angle) * clusterRadius;
        const clusterCenterY = centerY + Math.sin(angle) * clusterRadius;

        // Distribución según nivel jerárquico dentro del cluster
        const levelRadius = (node.level - 1) * 38;
        const nodeSubAngle = ((i * 137.5) % 360) * (Math.PI / 180);
        positions.set(node.id, {
          x: clusterCenterX + Math.cos(nodeSubAngle) * levelRadius,
          y: clusterCenterY + Math.sin(nodeSubAngle) * levelRadius
        });
      } else if (layoutMode === 'hierarchy') {
        // Capas horizontales según nivel jerárquico (Nivel 1 arriba, Nivel 5 abajo)
        const layerY = 90 + (node.level - 1) * 140;
        const sameLevelNodes = filteredNodes.filter(n => n.level === node.level);
        const indexInLevel = sameLevelNodes.findIndex(n => n.id === node.id);
        const totalInLevel = sameLevelNodes.length;
        const spacing = width / (totalInLevel + 1);
        const nodeX = spacing * (indexInLevel + 1);

        positions.set(node.id, {
          x: nodeX,
          y: layerY
        });
      } else {
        // Modo radial: Nivel 1 en el centro, niveles 2 a 5 en anillos concéntricos
        if (node.level === 1) {
          const l1Nodes = filteredNodes.filter(n => n.level === 1);
          const idx = l1Nodes.findIndex(n => n.id === node.id);
          const angle = (idx / Math.max(l1Nodes.length, 1)) * 2 * Math.PI;
          positions.set(node.id, {
            x: centerX + Math.cos(angle) * 70,
            y: centerY + Math.sin(angle) * 70
          });
        } else {
          const ringRadius = 70 + (node.level - 1) * 75;
          const sameLevel = filteredNodes.filter(n => n.level === node.level);
          const idx = sameLevel.findIndex(n => n.id === node.id);
          const angle = (idx / Math.max(sameLevel.length, 1)) * 2 * Math.PI;
          positions.set(node.id, {
            x: centerX + Math.cos(angle) * ringRadius,
            y: centerY + Math.sin(angle) * ringRadius
          });
        }
      }
    });

    return positions;
  }, [filteredNodes, houses, layoutMode]);

  // Manejo de paneo con el mouse
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Nivel de radio de nodo según jerarquía
  const getNodeRadius = (level: HierarchyLevel) => {
    switch (level) {
      case 1: return 22; // Cúpula / Patriarca
      case 2: return 18; // Congreso
      case 3: return 15; // Departamental
      case 4: return 13; // Municipal (Alcaldes/Concejales)
      case 5: return 10; // Operadores de base
      default: return 12;
    }
  };

  // Color y estilo de la arista según el tipo de relación
  const getEdgeStyle = (type: string) => {
    switch (type) {
      case 'jerarquia_directa':
        return { stroke: '#10b981', strokeWidth: 2.2, strokeDasharray: '' }; // Verde sólido
      case 'alianza_electoral':
        return { stroke: '#38bdf8', strokeWidth: 1.8, strokeDasharray: '4,4' }; // Azul discontinuo
      case 'tension_disputa':
        return { stroke: '#f43f5e', strokeWidth: 2.5, strokeDasharray: '3,3' }; // Rojo de tensión
      case 'pacto_bancada':
        return { stroke: '#fbbf24', strokeWidth: 1.5, strokeDasharray: '6,3' }; // Ámbar de trámite
      default:
        return { stroke: '#64748b', strokeWidth: 1.2, strokeDasharray: '' };
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[680px] bg-slate-950/70 backdrop-blur-2xl rounded-3xl border border-white/10 overflow-hidden select-none cursor-grab active:cursor-grabbing shadow-2xl"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Fondo con rejilla táctica cyber-glass */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, #38bdf8 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Controles Flotantes Superiores */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2">
        {/* Selector de Layout */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 p-1 rounded-2xl flex items-center gap-1 shadow-lg">
          <button
            onClick={() => setLayoutMode('clusters')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              layoutMode === 'clusters' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
            title="Agrupación por Casas Políticas"
          >
            <Workflow className="w-3.5 h-3.5" />
            <span>Feudos</span>
          </button>
          <button
            onClick={() => setLayoutMode('hierarchy')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              layoutMode === 'hierarchy' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
            title="Capas Jerárquicas (Extramunicipal a Municipal)"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Jerarquía</span>
          </button>
          <button
            onClick={() => setLayoutMode('radial')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              layoutMode === 'radial' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
            title="Distribución Radial Concéntrica"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Radial</span>
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 p-1 rounded-2xl flex items-center gap-1 shadow-lg">
          <button
            onClick={() => setZoom(prev => Math.min(prev + 0.15, 2.2))}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition"
            title="Acercar"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom(prev => Math.max(prev - 0.15, 0.4))}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition"
            title="Alejar"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => { setZoom(0.9); setPan({ x: 0, y: 0 }); }}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition"
            title="Restablecer Vista"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Leyenda Táctica Flotante Inferior Izquierda */}
      <div className="absolute bottom-4 left-4 z-20 bg-slate-900/80 backdrop-blur-xl border border-white/10 p-3 rounded-2xl shadow-xl text-xs space-y-2 pointer-events-auto max-w-xs">
        <span className="text-[10px] font-mono font-black uppercase tracking-wider text-slate-400 block border-b border-white/10 pb-1">
          Tipos de Aristas Relacionales
        </span>
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 bg-emerald-400 rounded-full" />
            <span className="text-slate-300">Línea de Mando</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 bg-sky-400 border-b border-dashed border-sky-400" />
            <span className="text-slate-300">Alianza Electoral</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 bg-rose-500 rounded-full" />
            <span className="text-rose-300 font-bold">Disputa / Fricción</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 bg-amber-400 rounded-full" />
            <span className="text-slate-300">Pacto de Bancada</span>
          </div>
        </div>
      </div>

      {/* SVG Canvas de Grafos */}
      <svg 
        className="w-full h-full"
        viewBox="0 0 1100 750"
      >
        <defs>
          {/* Marcadores de flechas para relaciones */}
          <marker id="arrow-green" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
          </marker>
          <marker id="arrow-blue" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
          </marker>
          <marker id="arrow-red" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#f43f5e" />
          </marker>

          {/* Filtro de resplandor para nodos activos */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
          {/* Capas de Conexión (Aristas / Edges) */}
          {visibleEdges.map(edge => {
            const srcPos = nodePositions.get(edge.source);
            const tgtPos = nodePositions.get(edge.target);
            if (!srcPos || !tgtPos) return null;

            const isHighlighted = selectedActorId === edge.source || selectedActorId === edge.target;
            const style = getEdgeStyle(edge.type);

            return (
              <g key={edge.id} className="transition-all duration-300">
                <line
                  x1={srcPos.x}
                  y1={srcPos.y}
                  x2={tgtPos.x}
                  y2={tgtPos.y}
                  stroke={style.stroke}
                  strokeWidth={isHighlighted ? style.strokeWidth * 1.8 : style.strokeWidth}
                  strokeDasharray={style.strokeDasharray}
                  strokeOpacity={isHighlighted ? 0.95 : 0.45}
                  markerEnd={edge.type === 'jerarquia_directa' ? 'url(#arrow-green)' : edge.type === 'tension_disputa' ? 'url(#arrow-red)' : 'url(#arrow-blue)'}
                />
                {isHighlighted && (
                  <text
                    x={(srcPos.x + tgtPos.x) / 2}
                    y={(srcPos.y + tgtPos.y) / 2 - 6}
                    fill={style.stroke}
                    fontSize="9"
                    fontWeight="bold"
                    textAnchor="middle"
                    className="font-mono bg-slate-950 px-1"
                  >
                    {edge.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* Nodos de Actores Políticos */}
          {filteredNodes.map(node => {
            const pos = nodePositions.get(node.id);
            if (!pos) return null;

            const radius = getNodeRadius(node.level);
            const color = houseColorMap.get(node.houseId) || '#38bdf8';
            const isSelected = selectedActorId === node.id;
            const isHovered = hoveredActor?.id === node.id;

            return (
              <g
                key={node.id}
                transform={`translate(${pos.x}, ${pos.y})`}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectActor(node);
                }}
                onMouseEnter={() => setHoveredActor(node)}
                onMouseLeave={() => setHoveredActor(null)}
                className="cursor-pointer transition-transform duration-200"
              >
                {/* Resplandor exterior si está seleccionado o en hover */}
                {(isSelected || isHovered) && (
                  <circle
                    r={radius + 8}
                    fill={color}
                    opacity={0.35}
                    filter="url(#glow)"
                  />
                )}

                {/* Anillo de Nivel Jerárquico */}
                <circle
                  r={radius + 3}
                  fill="none"
                  stroke={node.sphere === 'extramunicipal' ? '#38bdf8' : '#e2e8f0'}
                  strokeWidth={node.level === 1 ? 2.5 : 1.2}
                  strokeDasharray={node.sphere === 'mixto' ? '3,3' : ''}
                  opacity={0.8}
                />

                {/* Cuerpo del Nodo */}
                <circle
                  r={radius}
                  fill={color}
                  stroke="#ffffff"
                  strokeWidth={isSelected ? 3 : 1.5}
                  className="transition-all hover:scale-110"
                />

                {/* Inicial o Icono en el centro */}
                <text
                  y="4"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize={radius > 16 ? '11' : '9'}
                  fontWeight="900"
                  pointerEvents="none"
                >
                  {node.level === 1 ? '👑' : node.name.substring(0, 1).toUpperCase()}
                </text>

                {/* Etiqueta del Nodo */}
                <text
                  y={radius + 14}
                  textAnchor="middle"
                  fill="#f8fafc"
                  fontSize="10"
                  fontWeight="bold"
                  className="font-sans drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] pointer-events-none"
                >
                  {node.name.split(' ').slice(0, 2).join(' ')}
                </text>

                {/* Rol o Municipio debajo */}
                <text
                  y={radius + 25}
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize="8"
                  fontFamily="monospace"
                  className="pointer-events-none"
                >
                  {node.municipality} • N{node.level}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};

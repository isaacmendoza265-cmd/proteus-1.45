import React, { useState, useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { 
  RotateCcw, 
  Sparkles, 
  Maximize2, 
  Minimize2, 
  Box, 
  Workflow, 
  Info,
  Compass
} from 'lucide-react';
import { GraphNodeActor, GraphEdgeRelation, PoliticalHouse, HierarchyLevel } from '../../data/politicalHouses/types';

interface PoliticalHouse3DGraphProps {
  nodes: GraphNodeActor[];
  edges: GraphEdgeRelation[];
  houses: PoliticalHouse[];
  selectedActorId?: string | null;
  onSelectActor: (actor: GraphNodeActor) => void;
  filterMunicipality?: string;
  filterHouseId?: string;
  filterLevel?: HierarchyLevel | 'all';
}

/**
 * Representación 3D de un Actor Político en la Constelación
 */
const Actor3DNode: React.FC<{
  node: GraphNodeActor;
  position: [number, number, number];
  color: string;
  isSelected: boolean;
  onSelect: () => void;
}> = ({ node, position, color, isSelected, onSelect }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Radio según jerarquía
  const radius = useMemo(() => {
    switch (node.level) {
      case 1: return 0.75;
      case 2: return 0.60;
      case 3: return 0.48;
      case 4: return 0.40;
      case 5: return 0.32;
      default: return 0.45;
    }
  }, [node.level]);

  return (
    <group position={position}>
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.2}>
        <mesh
          ref={meshRef}
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = 'auto';
          }}
        >
          <sphereGeometry args={[radius, 32, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={isSelected ? 0.9 : hovered ? 0.6 : 0.25}
            roughness={0.2}
            metalness={0.7}
          />
        </mesh>

        {/* Anillo de órbita alrededor de nodos de Cúpula (Nivel 1) */}
        {node.level === 1 && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[radius + 0.35, 0.04, 16, 64]} />
            <meshStandardMaterial
              color="#fbbf24"
              emissive="#fbbf24"
              emissiveIntensity={0.6}
              transparent
              opacity={0.85}
            />
          </mesh>
        )}

        {/* Etiqueta HTML flotante */}
        <Html
          position={[0, radius + 0.35, 0]}
          center
          distanceFactor={18}
          className="pointer-events-none select-none"
        >
          <div className={`px-2 py-0.5 rounded-lg text-center backdrop-blur-md border transition-all whitespace-nowrap ${
            isSelected
              ? 'bg-sky-500/90 text-white font-black border-white text-xs shadow-lg scale-110'
              : hovered
              ? 'bg-slate-900/90 text-sky-300 font-bold border-sky-400 text-[10px]'
              : 'bg-slate-950/70 text-slate-300 border-white/10 text-[9px]'
          }`}>
            <span>{node.name.split(' ').slice(0, 2).join(' ')}</span>
            <span className="block text-[8px] font-mono text-slate-400">
              {node.municipality} • N{node.level}
            </span>
          </div>
        </Html>
      </Float>
    </group>
  );
};

/**
 * Conexión 3D Curva Luminosa entre dos actores
 */
const Relation3DTube: React.FC<{
  start: [number, number, number];
  end: [number, number, number];
  type: string;
  isHighlighted: boolean;
}> = ({ start, end, type, isHighlighted }) => {
  const curve = useMemo(() => {
    const p1 = new THREE.Vector3(...start);
    const p2 = new THREE.Vector3(...end);
    const mid = new THREE.Vector3()
      .addVectors(p1, p2)
      .multiplyScalar(0.5);
    mid.y += (p1.distanceTo(p2) * 0.18); // Arco tridimensional elegante

    return new THREE.QuadraticBezierCurve3(p1, mid, p2);
  }, [start, end]);

  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 20, isHighlighted ? 0.06 : 0.025, 8, false);
  }, [curve, isHighlighted]);

  const color = useMemo(() => {
    switch (type) {
      case 'jerarquia_directa': return '#10b981'; // Verde
      case 'alianza_electoral': return '#38bdf8'; // Azul
      case 'tension_disputa': return '#f43f5e';   // Rojo
      case 'pacto_bancada': return '#fbbf24';     // Ámbar
      default: return '#94a3b8';
    }
  }, [type]);

  return (
    <mesh geometry={tubeGeometry}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={isHighlighted ? 0.8 : 0.3}
        transparent
        opacity={isHighlighted ? 0.95 : 0.45}
        roughness={0.1}
      />
    </mesh>
  );
};

export const PoliticalHouse3DGraph: React.FC<PoliticalHouse3DGraphProps> = ({
  nodes,
  edges,
  houses,
  selectedActorId,
  onSelectActor,
  filterMunicipality = 'all',
  filterHouseId = 'all',
  filterLevel = 'all'
}) => {
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const controlsRef = useRef<any>(null);

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

  // Mapa de color por casa política
  const houseColorMap = useMemo(() => {
    const map = new Map<string, string>();
    houses.forEach(h => map.set(h.id, h.color));
    return map;
  }, [houses]);

  // Posiciones 3D calculadas por constelación orbital
  const node3DPositions = useMemo(() => {
    const positions = new Map<string, [number, number, number]>();
    const houseIndexMap = new Map<string, number>();
    houses.forEach((h, idx) => houseIndexMap.set(h.id, idx));

    const totalHouses = Math.max(houses.length, 1);

    filteredNodes.forEach((node, i) => {
      const hIdx = houseIndexMap.get(node.houseId) ?? (i % totalHouses);
      const houseAngle = (hIdx / totalHouses) * 2 * Math.PI;

      // El nivel define la altura en Y (Nivel 1 arriba, Nivel 5 abajo)
      const heightY = (3 - node.level) * 2.2;

      // Radio orbital del cluster de la casa política
      const clusterDistance = 7.5;
      const clusterX = Math.cos(houseAngle) * clusterDistance;
      const clusterZ = Math.sin(houseAngle) * clusterDistance;

      // Dispersión dentro del cluster según jerarquía
      const subRadius = (node.level - 1) * 1.2;
      const subAngle = ((i * 137.5) % 360) * (Math.PI / 180);

      const posX = clusterX + Math.cos(subAngle) * subRadius;
      const posZ = clusterZ + Math.sin(subAngle) * subRadius;

      positions.set(node.id, [posX, heightY, posZ]);
    });

    return positions;
  }, [filteredNodes, houses]);

  const resetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.object.position.set(0, 10, 18);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  };

  return (
    <div className="relative w-full h-[680px] bg-slate-950/80 backdrop-blur-2xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
      {/* Barra de Controles Flotante */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 p-1 rounded-2xl flex items-center gap-1 shadow-lg text-xs">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 ${
              autoRotate ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{autoRotate ? 'Pausar Giro' : 'Auto-Rotación'}</span>
          </button>
          <button
            onClick={resetCamera}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition"
            title="Centrar Cámara"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Canvas 3D */}
      <Canvas
        camera={{ position: [0, 10, 18], fov: 45 }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.65} />
        <directionalLight position={[15, 20, 15]} intensity={1.2} />
        <pointLight position={[-15, -10, -15]} intensity={0.4} color="#38bdf8" />

        <OrbitControls
          ref={controlsRef}
          autoRotate={autoRotate}
          autoRotateSpeed={0.8}
          enablePan={true}
          enableZoom={true}
          maxDistance={35}
          minDistance={4}
        />

        <Stars radius={50} depth={50} count={2500} factor={4} saturation={0} fade speed={1} />

        <Suspense fallback={null}>
          {/* Renderizado de Aristas 3D */}
          {visibleEdges.map(edge => {
            const startPos = node3DPositions.get(edge.source);
            const endPos = node3DPositions.get(edge.target);
            if (!startPos || !endPos) return null;

            const isHighlighted = selectedActorId === edge.source || selectedActorId === edge.target;

            return (
              <Relation3DTube
                key={edge.id}
                start={startPos}
                end={endPos}
                type={edge.type}
                isHighlighted={isHighlighted}
              />
            );
          })}

          {/* Renderizado de Nodos 3D */}
          {filteredNodes.map(node => {
            const pos = node3DPositions.get(node.id);
            if (!pos) return null;

            const color = houseColorMap.get(node.houseId) || '#38bdf8';
            const isSelected = selectedActorId === node.id;

            return (
              <Actor3DNode
                key={node.id}
                node={node}
                position={pos}
                color={color}
                isSelected={isSelected}
                onSelect={() => onSelectActor(node)}
              />
            );
          })}
        </Suspense>
      </Canvas>
    </div>
  );
};

import React, { useState, useRef, useEffect, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  Html,
  Float
} from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {
  Box,
  RotateCcw,
  Sun,
  Moon,
  Sunset,
  Upload,
  Sparkles,
  Maximize2,
  Minimize2,
  Eye,
  Compass,
  Map,
  Waves,
  AlertTriangle,
  Info,
  CheckCircle2
} from 'lucide-react';
import { ALL_MUNICIPIOS_TERRITORIAL_DATA, AreaTerritorialProfile, MunicipioConfig } from '../data/allMunicipiosTerritorialData';

interface Municipio3DDioramaProps {
  muniId: string;
  selectedAreaId?: string;
  onSelectArea?: (areaId: string) => void;
}

/**
 * Representación 3D de un Hito Urbano o Rural característico
 */
const Iconic3DLandmark: React.FC<{
  type: string;
  name: string;
  position: [number, number, number];
  color: string;
}> = ({ type, name, position, color }) => {
  return (
    <group position={position}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.25}>
        {/* Marcador Pin Flotante */}
        <mesh position={[0, 0.45, 0]}>
          <coneGeometry args={[0.16, 0.38, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.4}
            roughness={0.2}
            metalness={0.7}
          />
        </mesh>
        <mesh position={[0, 0.65, 0]}>
          <sphereGeometry args={[0.14, 16, 16]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive={color}
            emissiveIntensity={0.5}
            roughness={0.1}
          />
        </mesh>
      </Float>

      {/* Geometría 3D simbólica del hito */}
      {type === 'plane' && (
        <group position={[0, 0.15, 0]} rotation={[0, 0.4, 0]}>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.08, 0.1, 0.9, 8]} />
            <meshStandardMaterial color="#FFFFFF" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <boxGeometry args={[0.04, 1.1, 0.22]} />
            <meshStandardMaterial color="#38BDF8" metalness={0.7} />
          </mesh>
        </group>
      )}

      {type === 'building' && (
        <group position={[0, 0.25, 0]}>
          <mesh position={[-0.15, 0, 0]}>
            <boxGeometry args={[0.26, 0.55, 0.26]} />
            <meshStandardMaterial color="#CBD5E1" roughness={0.3} metalness={0.6} />
          </mesh>
          <mesh position={[0.15, 0.1, 0]}>
            <boxGeometry args={[0.24, 0.75, 0.24]} />
            <meshStandardMaterial color="#94A3B8" roughness={0.2} metalness={0.7} />
          </mesh>
        </group>
      )}

      {type === 'mountain' && (
        <group position={[0, 0.3, 0]}>
          <mesh position={[0, 0, 0]}>
            <coneGeometry args={[0.45, 0.65, 6]} />
            <meshStandardMaterial color="#334155" roughness={0.9} />
          </mesh>
          <mesh position={[0.2, -0.1, 0.1]}>
            <coneGeometry args={[0.3, 0.45, 5]} />
            <meshStandardMaterial color="#475569" roughness={0.95} />
          </mesh>
        </group>
      )}

      {type === 'church' && (
        <group position={[0, 0.2, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.35, 0.3, 0.45]} />
            <meshStandardMaterial color="#F8FAFC" roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.28, -0.1]}>
            <coneGeometry args={[0.12, 0.3, 8]} />
            <meshStandardMaterial color="#E2E8F0" roughness={0.3} />
          </mesh>
        </group>
      )}

      {type === 'factory' && (
        <group position={[0, 0.18, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.45, 0.22, 0.35]} />
            <meshStandardMaterial color="#64748B" roughness={0.7} />
          </mesh>
          <mesh position={[0.15, 0.18, 0]}>
            <cylinderGeometry args={[0.05, 0.07, 0.28, 8]} />
            <meshStandardMaterial color="#475569" roughness={0.8} />
          </mesh>
        </group>
      )}
    </group>
  );
};

/**
 * Plataforma 3D individual moldeada con la forma del polígono territorial
 */
const MunicipioSectorMesh: React.FC<{
  area: AreaTerritorialProfile;
  config: MunicipioConfig;
  isSelected: boolean;
  onSelect: (id: string) => void;
  showLabels: boolean;
}> = ({ area, config, isSelected, onSelect, showLabels }) => {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const geomDef = area.geometry3D;

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const targetY = isSelected ? 0.35 : hovered ? 0.15 : 0;
    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      targetY,
      8,
      delta
    );
  });

  const shape = useMemo(() => {
    const s = new THREE.Shape();
    if (!geomDef.points || geomDef.points.length === 0) return s;
    const [firstX, firstY] = geomDef.points[0];
    s.moveTo(
      (firstX - config.centerX3D) * config.scale3D,
      (config.centerY3D - firstY) * config.scale3D
    );

    for (let i = 1; i < geomDef.points.length; i++) {
      const [px, py] = geomDef.points[i];
      s.lineTo(
        (px - config.centerX3D) * config.scale3D,
        (config.centerY3D - py) * config.scale3D
      );
    }
    s.closePath();
    return s;
  }, [geomDef.points, config.centerX3D, config.centerY3D, config.scale3D]);

  const geometry = useMemo(() => {
    return new THREE.ExtrudeGeometry(shape, {
      depth: geomDef.height || 0.4,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.03,
      bevelThickness: 0.03
    });
  }, [shape, geomDef.height]);

  const edgesGeometry = useMemo(() => {
    return new THREE.EdgesGeometry(geometry, 25);
  }, [geometry]);

  const landmark3DPos: [number, number, number] = useMemo(() => {
    const [lx, ly] = geomDef.landmarkPos || [config.centerX3D, config.centerY3D];
    return [
      (lx - config.centerX3D) * config.scale3D,
      geomDef.height + 0.06,
      -(config.centerY3D - ly) * config.scale3D
    ];
  }, [geomDef.landmarkPos, geomDef.height, config.centerX3D, config.centerY3D, config.scale3D]);

  return (
    <group ref={groupRef}>
      <mesh
        geometry={geometry}
        rotation={[-Math.PI / 2, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(area.id);
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
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={area.color}
          roughness={isSelected ? 0.25 : hovered ? 0.35 : 0.6}
          metalness={isSelected ? 0.25 : hovered ? 0.15 : 0.05}
          emissive={isSelected ? area.color : '#000000'}
          emissiveIntensity={isSelected ? 0.25 : 0}
        />
      </mesh>

      {/* Contorno perimetral nítido */}
      <lineSegments
        geometry={edgesGeometry}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <lineBasicMaterial
          color={isSelected ? '#FFFFFF' : '#0F172A'}
          linewidth={isSelected ? 3 : 1.5}
          transparent
          opacity={isSelected ? 0.95 : 0.45}
        />
      </lineSegments>

      {/* Hito 3D icónico */}
      <Iconic3DLandmark
        type={geomDef.icon}
        name={geomDef.landmarkName}
        position={landmark3DPos}
        color={area.color}
      />

      {/* Etiqueta flotante */}
      {showLabels && (
        <Html
          position={[landmark3DPos[0], landmark3DPos[1] + 0.75, landmark3DPos[2]]}
          center
          distanceFactor={15}
          className="pointer-events-none select-none transition-opacity duration-300"
        >
          <div
            className={`px-2.5 py-1 rounded-xl text-center whitespace-nowrap shadow-md border backdrop-blur-md transition-all ${
              isSelected
                ? 'bg-blue-950/95 text-white border-blue-400/80 scale-105 shadow-blue-500/20'
                : hovered
                ? 'bg-slate-900/90 text-slate-100 border-slate-600 scale-100'
                : 'bg-slate-900/75 text-slate-200 border-slate-700/60 scale-90 opacity-90'
            }`}
          >
            <div className="text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1">
              <span
                className="w-2 h-2 rounded-full inline-block shrink-0"
                style={{ backgroundColor: area.color }}
              />
              <span>{area.shortName}</span>
            </div>
            <div className="text-[8px] font-bold text-slate-300">
              {area.populationExactKnown ? `${area.estimatedPopulationNumeric?.toLocaleString()} hab.` : area.populationText}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};

/**
 * Trazado 3D del Río o afluente principal
 */
const RiverPath3D: React.FC<{
  points?: [number, number][];
  centerX: number;
  centerY: number;
  scale: number;
  name: string;
}> = ({ points, centerX, centerY, scale, name }) => {
  const lineGeometry = useMemo(() => {
    if (!points || points.length === 0) return null;
    const curvePoints: THREE.Vector3[] = points.map(([px, py]) => (
      new THREE.Vector3(
        (px - centerX) * scale,
        0.04,
        -(centerY - py) * scale
      )
    ));
    const curve = new THREE.CatmullRomCurve3(curvePoints);
    return new THREE.TubeGeometry(curve, 64, 0.08, 8, false);
  }, [points, centerX, centerY, scale]);

  if (!lineGeometry) return null;

  return (
    <group>
      <mesh geometry={lineGeometry}>
        <meshStandardMaterial
          color="#38BDF8"
          emissive="#0284C7"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
};

export const Municipio3DDiorama: React.FC<Municipio3DDioramaProps> = ({
  muniId,
  selectedAreaId,
  onSelectArea
}) => {
  const config = ALL_MUNICIPIOS_TERRITORIAL_DATA[muniId] || ALL_MUNICIPIOS_TERRITORIAL_DATA['rionegro'];
  const activeArea = config.areas.find(a => a.id === selectedAreaId) || config.areas[0];

  const [lightingMode, setLightingMode] = useState<'day' | 'sunset' | 'night'>('day');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [showRiver, setShowRiver] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<any>(null);

  const resetCamera = (view: 'isometric' | 'top' | 'front') => {
    if (!controlsRef.current) return;
    if (view === 'isometric') {
      controlsRef.current.object.position.set(10, 12, 10);
    } else if (view === 'top') {
      controlsRef.current.object.position.set(0, 18, 0.1);
    } else if (view === 'front') {
      controlsRef.current.object.position.set(0, 6, 15);
    }
    controlsRef.current.target.set(0, 0, 0);
    controlsRef.current.update();
  };

  const lightingParams = useMemo(() => {
    switch (lightingMode) {
      case 'sunset':
        return {
          sunColor: '#FB923C',
          sunIntensity: 2.2,
          sunPosition: [12, 4, 8] as [number, number, number],
          ambientColor: '#FDE68A',
          ambientIntensity: 0.65,
          bgColor: '#1E1B4B'
        };
      case 'night':
        return {
          sunColor: '#38BDF8',
          sunIntensity: 0.65,
          sunPosition: [5, 10, 5] as [number, number, number],
          ambientColor: '#0F172A',
          ambientIntensity: 0.45,
          bgColor: '#020617'
        };
      case 'day':
      default:
        return {
          sunColor: '#FFFBEB',
          sunIntensity: 1.8,
          sunPosition: [10, 15, 10] as [number, number, number],
          ambientColor: '#F8FAFC',
          ambientIntensity: 0.75,
          bgColor: '#0F172A'
        };
    }
  }, [lightingMode]);

  return (
    <div
      ref={containerRef}
      className={`relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 transition-all shadow-sm ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none border-none' : 'h-[640px] w-full'
      }`}
    >
      {/* BARRA SUPERIOR DE HERRAMIENTAS Y CONTROLES */}
      <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        
        {/* Título & Badge institucional */}
        <div className="bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-slate-700/80 shadow-md text-white flex items-center gap-2 pointer-events-auto">
          <div className="p-1.5 bg-blue-600 rounded-xl">
            <Box className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-black tracking-wider uppercase">
                Diorama 3D Georreferenciado
              </h3>
              <span className="text-[9px] font-black bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-400/30">
                Extrusión Real
              </span>
            </div>
            <p className="text-[10px] text-slate-400">
              {config.name} • {config.subregion}
            </p>
          </div>
        </div>

        {/* Toolbar de Controles 3D */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-700/80 shadow-md pointer-events-auto text-xs">
          
          {/* Modos de Iluminación */}
          <div className="flex items-center bg-slate-800/80 p-0.5 rounded-xl border border-slate-700/50">
            <button
              onClick={() => setLightingMode('day')}
              title="Luz Solar de Día"
              className={`p-1.5 rounded-lg transition-all ${
                lightingMode === 'day' ? 'bg-amber-400 text-slate-950 font-bold shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setLightingMode('sunset')}
              title="Atardecer Dorado"
              className={`p-1.5 rounded-lg transition-all ${
                lightingMode === 'sunset' ? 'bg-orange-500 text-white font-bold shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sunset className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setLightingMode('night')}
              title="Modo Nocturno"
              className={`p-1.5 rounded-lg transition-all ${
                lightingMode === 'night' ? 'bg-indigo-600 text-white font-bold shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Vistas de Cámara */}
          <div className="flex items-center bg-slate-800/80 p-0.5 rounded-xl border border-slate-700/50">
            <button
              onClick={() => resetCamera('isometric')}
              title="Vista Isométrica 3D"
              className="px-2 py-1 text-[10px] font-black text-slate-300 hover:text-white rounded-lg hover:bg-slate-700/60"
            >
              Isométrica
            </button>
            <button
              onClick={() => resetCamera('top')}
              title="Vista Cenital (Planta)"
              className="px-2 py-1 text-[10px] font-black text-slate-300 hover:text-white rounded-lg hover:bg-slate-700/60"
            >
              Planta
            </button>
            <button
              onClick={() => resetCamera('front')}
              title="Vista Frontal"
              className="px-2 py-1 text-[10px] font-black text-slate-300 hover:text-white rounded-lg hover:bg-slate-700/60"
            >
              Frontal
            </button>
          </div>

          {/* Switches */}
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            title="Rotación automática"
            className={`p-1.5 rounded-xl border transition-all ${
              autoRotate
                ? 'bg-blue-600 text-white border-blue-500'
                : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setShowLabels(!showLabels)}
            title="Mostrar/Ocultar etiquetas"
            className={`p-1.5 rounded-xl border transition-all ${
              showLabels
                ? 'bg-blue-600 text-white border-blue-500'
                : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setShowRiver(!showRiver)}
            title={`Alternar ${config.riverName}`}
            className={`p-1.5 rounded-xl border transition-all ${
              showRiver
                ? 'bg-cyan-600 text-white border-cyan-500'
                : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white'
            }`}
          >
            <Waves className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            title="Pantalla Completa"
            className="p-1.5 rounded-xl bg-slate-800/80 text-slate-400 border border-slate-700 hover:text-white transition-all"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* CANVAS 3D PRINCIPAL */}
      <Canvas
        shadows
        camera={{ position: [10, 12, 10], fov: 42 }}
        className="w-full h-full"
      >
        <color attach="background" args={[lightingParams.bgColor]} />
        <ambientLight
          color={lightingParams.ambientColor}
          intensity={lightingParams.ambientIntensity}
        />
        <directionalLight
          position={lightingParams.sunPosition}
          color={lightingParams.sunColor}
          intensity={lightingParams.sunIntensity}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-near={0.5}
          shadow-camera-far={40}
          shadow-camera-left={-8}
          shadow-camera-right={8}
          shadow-camera-top={8}
          shadow-camera-bottom={-8}
        />

        <Suspense fallback={null}>
          <group position={[0, -0.3, 0]}>
            {/* Base podio cilíndrica */}
            <mesh position={[0, -0.2, 0]} receiveShadow>
              <cylinderGeometry args={[6.2, 6.5, 0.35, 36]} />
              <meshStandardMaterial color="#020617" roughness={0.4} metalness={0.6} />
            </mesh>

            {/* Malla de sectores */}
            {config.areas.map((area) => (
              <MunicipioSectorMesh
                key={area.id}
                area={area}
                config={config}
                isSelected={area.id === activeArea.id}
                onSelect={(id) => onSelectArea && onSelectArea(id)}
                showLabels={showLabels}
              />
            ))}

            {/* Río o Cuenca Hídrica */}
            {showRiver && config.riverPoints3D && (
              <RiverPath3D
                points={config.riverPoints3D}
                centerX={config.centerX3D}
                centerY={config.centerY3D}
                scale={config.scale3D}
                name={config.riverName}
              />
            )}
          </group>
        </Suspense>

        <OrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.05}
          autoRotate={autoRotate}
          autoRotateSpeed={0.65}
          maxPolarAngle={Math.PI / 2.05}
          minDistance={4}
          maxDistance={25}
        />
      </Canvas>

      {/* TARJETA FLOTANTE INFERIOR DEL SECTOR ACTIVO */}
      <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none flex justify-center">
        <div className="bg-slate-900/95 backdrop-blur-md p-4 rounded-2xl border border-slate-700/80 shadow-xl max-w-2xl w-full text-white pointer-events-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: activeArea.color }}
              />
              <span className="text-[10px] font-black uppercase text-blue-400 tracking-wider">
                {activeArea.type}
              </span>
              <span className="text-[10px] font-bold text-slate-400">
                • Zona {activeArea.zone}
              </span>
            </div>
            <h4 className="text-base font-black text-white tracking-tight">
              {activeArea.name}
            </h4>
            <p className="text-xs text-slate-300 line-clamp-1">
              {activeArea.strategicHighlights?.[0] || activeArea.populationText}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-stretch sm:self-auto justify-between sm:justify-end shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800">
            <div className="text-right">
              <span className="text-[9px] font-bold text-slate-400 block uppercase">Población</span>
              <span className="text-xs font-black text-emerald-400">
                {activeArea.populationText}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[9px] font-bold text-slate-400 block uppercase">Estrato</span>
              <span className="text-xs font-black text-amber-300">
                {activeArea.predominantStrataNumbers?.length > 0 ? `Estrato ${activeArea.predominantStrataNumbers.join('-')}` : 'Sin datos'}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[9px] font-bold text-slate-400 block uppercase">Hito 3D</span>
              <span className="text-xs font-bold text-blue-300">
                {activeArea.geometry3D?.landmarkName || 'Sin datos'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
  Waves
} from 'lucide-react';
import { RIONEGRO_COMMUNE_DETAILED_PROFILES } from '../data/rionegroECV2020Data';

interface Rionegro3DDioramaProps {
  selectedAreaId?: string;
  onSelectArea?: (areaId: string) => void;
}

// Centroide de referencia para centrar el mapa en (0, 0, 0)
const CENTER_X = 280;
const CENTER_Y = 325;
const SCALE = 0.026;

// Definición geométrica oficial de las 8 divisiones político-administrativas de Rionegro
// Derivadas de los límites vectoriales reales de la cartografía municipal
interface SectorGeometryDef {
  name: string;
  shortName: string;
  type: 'Urbana' | 'Rural';
  icon: string;
  landmarkName: string;
  height: number;
  landmarkPos: [number, number]; // [x_svg, y_svg]
  points: [number, number][];     // Polígono exterior cerrado [x_svg, y_svg]
  innerLines?: [number, number][][]; // Líneas divisorias de veredas internas
}

export const RIONEGRO_REAL_SECTORS: Record<string, SectorGeometryDef> = {
  // 1. CORREGIMIENTO JOSÉ MARÍA CÓRDOVA MUÑOZ (OCCIDENTE)
  'rionegro-corr-jose-maria-cordova': {
    name: 'Corregimiento José María Córdova',
    shortName: 'Corr. Occidente',
    type: 'Rural',
    icon: 'plane',
    landmarkName: 'Aeropuerto Int. JMC',
    height: 0.42,
    landmarkPos: [115, 235],
    points: [
      [195, 115],
      [175, 125],
      [140, 145],
      [85, 135],
      [50, 120],
      [55, 160],
      [40, 190],
      [45, 230],
      [65, 260],
      [70, 310],
      [70, 370],
      [85, 410],
      [90, 440],
      [100, 420],
      [140, 370],
      [170, 360],
      [200, 330],
      [200, 270],
      [200, 220],
      [195, 140]
    ],
    innerLines: [
      [[85, 135], [140, 180], [195, 140]],
      [[55, 160], [140, 180], [140, 230], [45, 230]],
      [[140, 230], [200, 220]],
      [[140, 230], [150, 280], [65, 260]],
      [[150, 280], [200, 270]],
      [[150, 280], [155, 350], [70, 310]],
      [[155, 350], [85, 410]]
    ]
  },

  // 2. CORREGIMIENTO CASIMIRO GARCÍA (CENTRO)
  'rionegro-corr-centro': {
    name: 'Corregimiento Centro',
    shortName: 'Corr. Centro',
    type: 'Rural',
    icon: 'factory',
    landmarkName: 'Zona Franca (46 ha)',
    height: 0.38,
    landmarkPos: [260, 205],
    points: [
      [195, 115],
      [245, 80],
      [270, 120],
      [290, 145],
      [320, 200],
      [340, 240],
      [350, 260],
      [330, 280],
      [300, 295],
      [260, 290],
      [200, 285],
      [200, 220],
      [195, 140]
    ],
    innerLines: [
      [[245, 80], [250, 140], [195, 140]],
      [[250, 140], [290, 145]],
      [[250, 140], [245, 220], [200, 220]],
      [[245, 220], [320, 200]],
      [[245, 220], [240, 285]],
      [[240, 285], [290, 260], [340, 240]]
    ]
  },

  // 3. CORREGIMIENTO NÉSTOR ESTEBAN SANÍNT (NORTE)
  'rionegro-corr-norte': {
    name: 'Corregimiento Norte',
    shortName: 'Corr. Norte',
    type: 'Rural',
    icon: 'mountain',
    landmarkName: 'Veredas La Mosca / La Laja',
    height: 0.46,
    landmarkPos: [405, 160],
    points: [
      [270, 120],
      [305, 60],
      [330, 55],
      [410, 50],
      [425, 65],
      [450, 65],
      [470, 85],
      [500, 80],
      [505, 130],
      [515, 150],
      [480, 170],
      [460, 200],
      [440, 220],
      [420, 260],
      [435, 285],
      [415, 300],
      [385, 270],
      [350, 260],
      [340, 240],
      [320, 200],
      [290, 145]
    ],
    innerLines: [
      [[330, 55], [350, 110], [425, 65]],
      [[350, 110], [470, 85]],
      [[350, 110], [320, 200]],
      [[350, 110], [420, 150], [515, 150]],
      [[420, 150], [440, 220]],
      [[440, 220], [385, 270]]
    ]
  },

  // 4. CORREGIMIENTO GILBERTO ECHEVERRI MEJÍA (SUR)
  'rionegro-corr-sur': {
    name: 'Corregimiento Sur',
    shortName: 'Corr. Sur',
    type: 'Rural',
    icon: 'estates',
    landmarkName: 'Llanogrande / Cabeceras',
    height: 0.40,
    landmarkPos: [265, 470],
    points: [
      [85, 410],
      [100, 420],
      [140, 370],
      [170, 360],
      [200, 330],
      [200, 285],
      [260, 290],
      [300, 295],
      [285, 320],
      [310, 335],
      [330, 365],
      [350, 350],
      [380, 340],
      [420, 360],
      [425, 410],
      [385, 415],
      [370, 450],
      [370, 480],
      [375, 510],
      [370, 550],
      [350, 595],
      [320, 575],
      [270, 560],
      [255, 580],
      [210, 590],
      [180, 570],
      [170, 540],
      [140, 500],
      [115, 470]
    ],
    innerLines: [
      [[140, 370], [220, 400], [285, 320]],
      [[220, 400], [250, 470], [170, 540]],
      [[250, 470], [320, 450], [330, 365]],
      [[320, 450], [370, 480]],
      [[250, 470], [270, 560]],
      [[320, 450], [370, 550]],
      [[380, 340], [425, 410]]
    ]
  },

  // 5. COMUNA 4 - EL PORVENIR (URBANA)
  'rionegro-c4-porvenir': {
    name: 'Comuna 4 El Porvenir',
    shortName: 'C4 El Porvenir',
    type: 'Urbana',
    icon: 'university',
    landmarkName: 'Campus UdeA & Estadio',
    height: 0.62,
    landmarkPos: [300, 305],
    points: [
      [260, 290],
      [300, 295],
      [330, 280],
      [345, 305],
      [310, 335],
      [285, 320]
    ]
  },

  // 6. COMUNA 1 - LIBORIO MEJÍA (URBANA - CENTRO HISTÓRICO)
  'rionegro-c1-liborio': {
    name: 'Comuna 1 Liborio Mejía',
    shortName: 'C1 Liborio Mejía',
    type: 'Urbana',
    icon: 'cathedral',
    landmarkName: 'Centro Histórico & Basílica',
    height: 0.66,
    landmarkPos: [358, 285],
    points: [
      [330, 280],
      [350, 260],
      [385, 270],
      [375, 305],
      [345, 305]
    ]
  },

  // 7. COMUNA 2 - SAN ANTONIO DE PEREIRA (URBANA)
  'rionegro-c2-san-antonio': {
    name: 'Comuna 2 San Antonio',
    shortName: 'C2 San Antonio',
    type: 'Urbana',
    icon: 'square',
    landmarkName: 'Parque & Tradición Dulcera',
    height: 0.58,
    landmarkPos: [335, 340],
    points: [
      [310, 335],
      [345, 305],
      [355, 330],
      [350, 365],
      [335, 375],
      [320, 355]
    ]
  },

  // 8. COMUNA 3 - ALFONSO URIBE JARAMILLO (URBANA)
  'rionegro-c3-alfonso-uribe': {
    name: 'Comuna 3 Alfonso Uribe',
    shortName: 'C3 Alfonso Uribe',
    type: 'Urbana',
    icon: 'houses',
    landmarkName: 'Cuatro Esquinas / Santa Ana',
    height: 0.60,
    landmarkPos: [370, 320],
    points: [
      [375, 305],
      [395, 305],
      [380, 340],
      [355, 330],
      [345, 305]
    ]
  }
};

// Traza geográfica real del Río Rionegro / Pantanillo a través del territorio
const RIO_RIONEGRO_COORDS: [number, number][] = [
  [260, 585],
  [275, 530],
  [300, 450],
  [322, 380],
  [330, 365],
  [338, 335],
  [342, 305],
  [348, 285],
  [335, 270],
  [290, 205],
  [290, 140],
  [315, 75]
];

/**
 * Representación 3D de un hito municipal adaptado a escala
 */
const StylizedLandmark: React.FC<{
  type: string;
  position: [number, number, number];
  isSelected: boolean;
}> = ({ type, position, isSelected }) => {
  return (
    <group position={position}>
      {/* Caso Aeropuerto JMC */}
      {type === 'plane' && (
        <group>
          {/* Pista de aterrizaje con demarcación */}
          <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0.4]}>
            <planeGeometry args={[0.55, 2.4]} />
            <meshStandardMaterial color="#1E293B" roughness={0.7} />
          </mesh>
          {/* Torre de control */}
          <mesh position={[0.5, 0.45, -0.3]}>
            <cylinderGeometry args={[0.06, 0.09, 0.9, 8]} />
            <meshStandardMaterial color="#E2E8F0" roughness={0.3} />
          </mesh>
          <mesh position={[0.5, 0.9, -0.3]}>
            <sphereGeometry args={[0.13, 8, 8]} />
            <meshStandardMaterial color="#0284C7" roughness={0.2} metalness={0.6} />
          </mesh>
          {/* Avión estilizado */}
          <Float speed={2} rotationIntensity={0.15} floatIntensity={0.25}>
            <group position={[-0.15, 0.6, 0.3]} rotation={[0, 0.4, 0]}>
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.04, 0.04, 0.45, 8]} />
                <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
              </mesh>
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.6, 0.015, 0.12]} />
                <meshStandardMaterial color="#0284C7" roughness={0.3} />
              </mesh>
            </group>
          </Float>
        </group>
      )}

      {/* Caso Basílica y Centro Histórico (C1) */}
      {type === 'cathedral' && (
        <group scale={0.75}>
          <mesh position={[0, 0.3, 0]}>
            <boxGeometry args={[0.65, 0.55, 0.9]} />
            <meshStandardMaterial color="#F8FAFC" roughness={0.6} />
          </mesh>
          <mesh position={[0, 0.7, 0]} rotation={[0, Math.PI / 4, 0]}>
            <coneGeometry args={[0.45, 0.38, 4]} />
            <meshStandardMaterial color="#DC2626" roughness={0.4} />
          </mesh>
          <mesh position={[-0.26, 0.65, 0.4]}>
            <boxGeometry args={[0.18, 0.8, 0.18]} />
            <meshStandardMaterial color="#CBD5E1" roughness={0.5} />
          </mesh>
          <mesh position={[0.26, 0.65, 0.4]}>
            <boxGeometry args={[0.18, 0.8, 0.18]} />
            <meshStandardMaterial color="#CBD5E1" roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.9, -0.1]}>
            <sphereGeometry args={[0.16, 12, 12]} />
            <meshStandardMaterial color="#D97706" metalness={0.7} roughness={0.2} />
          </mesh>
        </group>
      )}

      {/* Caso Campus UdeA & Estadio (C4) */}
      {type === 'university' && (
        <group scale={0.75}>
          <mesh position={[0, 0.04, 0.2]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.28, 0.55, 16]} />
            <meshStandardMaterial color="#0284C7" roughness={0.6} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, 0.035, 0.2]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.28, 16]} />
            <meshStandardMaterial color="#16A34A" roughness={0.8} />
          </mesh>
          <mesh position={[-0.25, 0.32, -0.35]}>
            <boxGeometry args={[0.65, 0.55, 0.35]} />
            <meshStandardMaterial color="#E0F2FE" roughness={0.3} metalness={0.3} />
          </mesh>
          <mesh position={[0.25, 0.22, -0.35]}>
            <cylinderGeometry args={[0.2, 0.2, 0.44, 12]} />
            <meshStandardMaterial color="#0369A1" roughness={0.4} />
          </mesh>
        </group>
      )}

      {/* Caso Parque Colonial San Antonio (C2) */}
      {type === 'square' && (
        <group scale={0.75}>
          <mesh position={[0, 0.04, 0]}>
            <boxGeometry args={[0.8, 0.05, 0.8]} />
            <meshStandardMaterial color="#FED7AA" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.25, 0]}>
            <cylinderGeometry args={[0.18, 0.2, 0.3, 8]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.48, 0]}>
            <coneGeometry args={[0.26, 0.22, 8]} />
            <meshStandardMaterial color="#B45309" roughness={0.5} />
          </mesh>
          <mesh position={[-0.35, 0.18, 0.3]}>
            <boxGeometry args={[0.25, 0.28, 0.22]} />
            <meshStandardMaterial color="#FFFBEB" />
          </mesh>
          <mesh position={[0.35, 0.18, -0.3]}>
            <boxGeometry args={[0.25, 0.28, 0.22]} />
            <meshStandardMaterial color="#FFFBEB" />
          </mesh>
        </group>
      )}

      {/* Caso Zona Franca de Rionegro (Centro) */}
      {type === 'factory' && (
        <group scale={0.75}>
          <mesh position={[-0.2, 0.25, 0]}>
            <boxGeometry args={[0.6, 0.38, 0.8]} />
            <meshStandardMaterial color="#94A3B8" roughness={0.4} metalness={0.4} />
          </mesh>
          <mesh position={[0.3, 0.22, 0.2]}>
            <boxGeometry args={[0.45, 0.32, 0.5]} />
            <meshStandardMaterial color="#0284C7" roughness={0.5} metalness={0.5} />
          </mesh>
          <mesh position={[0.3, 0.1, -0.25]}>
            <boxGeometry args={[0.2, 0.12, 0.3]} />
            <meshStandardMaterial color="#DC2626" />
          </mesh>
          <mesh position={[0.3, 0.22, -0.25]}>
            <boxGeometry args={[0.2, 0.12, 0.3]} />
            <meshStandardMaterial color="#F59E0B" />
          </mesh>
        </group>
      )}

      {/* Caso Cuatro Esquinas & Santa Ana (C3) */}
      {type === 'houses' && (
        <group scale={0.7}>
          <mesh position={[-0.2, 0.22, -0.15]}>
            <boxGeometry args={[0.35, 0.38, 0.35]} />
            <meshStandardMaterial color="#CBD5E1" />
          </mesh>
          <mesh position={[0.2, 0.26, 0.15]}>
            <boxGeometry args={[0.42, 0.46, 0.38]} />
            <meshStandardMaterial color="#E2E8F0" />
          </mesh>
          <mesh position={[-0.15, 0.18, 0.25]}>
            <boxGeometry args={[0.3, 0.3, 0.3]} />
            <meshStandardMaterial color="#94A3B8" />
          </mesh>
        </group>
      )}

      {/* Caso Llanogrande & Parcelaciones (Sur) */}
      {type === 'estates' && (
        <group scale={0.85}>
          <mesh position={[-0.45, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.5, 16]} />
            <meshStandardMaterial color="#06B6D4" roughness={0.1} metalness={0.6} />
          </mesh>
          <mesh position={[0.4, 0.22, -0.15]}>
            <boxGeometry args={[0.6, 0.26, 0.45]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
          </mesh>
          <mesh position={[0.4, 0.36, -0.15]} rotation={[0.04, 0, 0]}>
            <boxGeometry args={[0.68, 0.04, 0.52]} />
            <meshStandardMaterial color="#1E293B" />
          </mesh>
          {[-0.15, 0.15, 0.5].map((offset, idx) => (
            <mesh key={idx} position={[offset, 0.26, 0.4 + idx * 0.15]}>
              <coneGeometry args={[0.13, 0.45, 6]} />
              <meshStandardMaterial color="#15803D" roughness={0.7} />
            </mesh>
          ))}
        </group>
      )}

      {/* Caso Veredas Norte (Cultivos y Relieve) */}
      {type === 'mountain' && (
        <group scale={0.85}>
          <mesh position={[0.4, 0.45, -0.35]}>
            <coneGeometry args={[0.85, 0.95, 5]} />
            <meshStandardMaterial color="#334155" roughness={0.9} />
          </mesh>
          <mesh position={[-0.5, 0.38, -0.15]}>
            <coneGeometry args={[0.7, 0.78, 5]} />
            <meshStandardMaterial color="#475569" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.16, 0.4]} rotation={[0, 0.2, 0]}>
            <boxGeometry args={[0.9, 0.2, 0.45]} />
            <meshStandardMaterial color="#F8FAFC" opacity={0.75} transparent roughness={0.3} />
          </mesh>
        </group>
      )}

      {/* Anillo de selección en el suelo */}
      {isSelected && (
        <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.7, 0.85, 32]} />
          <meshBasicMaterial color="#38BDF8" side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
};

/**
 * Plataforma 3D individual moldeada con la FORMA REAL de la división político-administrativa
 */
const RealShapeSectorMesh: React.FC<{
  sectorId: string;
  profile: any;
  geomDef: SectorGeometryDef;
  isSelected: boolean;
  onSelect: (id: string) => void;
  showLabels: boolean;
  showVeredas: boolean;
}> = ({ sectorId, profile, geomDef, isSelected, onSelect, showLabels, showVeredas }) => {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);

  // Animación de elevación individual al interactuar (como pieza de maqueta que se levanta)
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const targetY = isSelected ? 0.38 : hovered ? 0.16 : 0;
    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      targetY,
      8,
      delta
    );
  });

  // 1. Construir el Shape 2D a partir del polígono real
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    const [firstX, firstY] = geomDef.points[0];
    s.moveTo((firstX - CENTER_X) * SCALE, (CENTER_Y - firstY) * SCALE);

    for (let i = 1; i < geomDef.points.length; i++) {
      const [px, py] = geomDef.points[i];
      s.lineTo((px - CENTER_X) * SCALE, (CENTER_Y - py) * SCALE);
    }
    s.closePath();
    return s;
  }, [geomDef.points]);

  // 2. Extruir el Shape para convertirlo en bloque 3D con bisel suave
  const geometry = useMemo(() => {
    return new THREE.ExtrudeGeometry(shape, {
      depth: geomDef.height,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.035,
      bevelThickness: 0.035
    });
  }, [shape, geomDef.height]);

  // 3. Generar líneas de contorno perimetral nítidas
  const edgesGeometry = useMemo(() => {
    return new THREE.EdgesGeometry(geometry, 25);
  }, [geometry]);

  // 4. Generar líneas divisorias de veredas internas (si existen)
  const veredaLinesGeometry = useMemo(() => {
    if (!geomDef.innerLines || geomDef.innerLines.length === 0) return null;
    const segments: THREE.Vector3[] = [];

    for (const line of geomDef.innerLines) {
      for (let i = 0; i < line.length - 1; i++) {
        segments.push(
          new THREE.Vector3(
            (line[i][0] - CENTER_X) * SCALE,
            (CENTER_Y - line[i][1]) * SCALE,
            geomDef.height + 0.038
          ),
          new THREE.Vector3(
            (line[i + 1][0] - CENTER_X) * SCALE,
            (CENTER_Y - line[i + 1][1]) * SCALE,
            geomDef.height + 0.038
          )
        );
      }
    }
    return new THREE.BufferGeometry().setFromPoints(segments);
  }, [geomDef.innerLines, geomDef.height]);

  // Coordenadas mundiales del hito (calculadas a partir del punto de referencia en SVG)
  const landmarkWorldX = (geomDef.landmarkPos[0] - CENTER_X) * SCALE;
  const landmarkWorldZ = (geomDef.landmarkPos[1] - CENTER_Y) * SCALE;
  const landmarkWorldY = geomDef.height + 0.035;

  const baseColor = useMemo(() => new THREE.Color(profile.color), [profile.color]);
  const activeColor = useMemo(() => baseColor.clone().offsetHSL(0, 0.08, 0.12), [baseColor]);

  return (
    <group
      ref={groupRef}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(sectorId);
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
      {/* Sólido extruido con la forma real de la división */}
      <mesh
        geometry={geometry}
        rotation={[-Math.PI / 2, 0, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={hovered || isSelected ? activeColor : baseColor}
          roughness={0.4}
          metalness={0.15}
        />
      </mesh>

      {/* Bordes arquitectónicos nítidos de la pieza */}
      <lineSegments geometry={edgesGeometry} rotation={[-Math.PI / 2, 0, 0]}>
        <lineBasicMaterial
          color={isSelected ? '#FFFFFF' : '#0F172A'}
          linewidth={isSelected ? 2 : 1}
          transparent
          opacity={isSelected ? 1 : 0.4}
        />
      </lineSegments>

      {/* Trazos grabados de veredas internas en corregimientos */}
      {showVeredas && veredaLinesGeometry && (
        <lineSegments geometry={veredaLinesGeometry} rotation={[-Math.PI / 2, 0, 0]}>
          <lineBasicMaterial color="#FFFFFF" transparent opacity={0.55} linewidth={1} />
        </lineSegments>
      )}

      {/* Hito 3D ubicado geográficamente dentro del polígono real */}
      <StylizedLandmark
        type={geomDef.icon}
        position={[landmarkWorldX, landmarkWorldY, landmarkWorldZ]}
        isSelected={isSelected}
      />

      {/* Etiqueta flotante 3D sobre el centroide real */}
      {showLabels && (
        <Html
          position={[landmarkWorldX, landmarkWorldY + 1.15, landmarkWorldZ]}
          center
          distanceFactor={14}
        >
          <div
            className={`transition-all duration-200 pointer-events-none select-none px-2.5 py-1 rounded-xl shadow-lg border backdrop-blur-md flex items-center gap-1.5 whitespace-nowrap ${
              isSelected
                ? 'bg-slate-900/95 text-white border-sky-400 scale-110 shadow-sky-500/25 ring-2 ring-sky-400/40'
                : hovered
                ? 'bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/95 text-white border-slate-300 scale-105'
                : 'bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/85 text-white border-white/10 text-xs'
            }`}
          >
            <div
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: profile.color }}
            />
            <div className="flex flex-col">
              <span className="font-black text-[11px] leading-tight">
                {profile.shortName}
              </span>
              <span className={`text-[9px] font-bold ${isSelected ? 'text-sky-300' : 'text-slate-400'}`}>
                {geomDef.landmarkName}
              </span>
            </div>
          </div>
        </Html>
      )}

      {/* Columna de luz zenital cuando está seleccionada */}
      {isSelected && (
        <group position={[landmarkWorldX, landmarkWorldY + 1.8, landmarkWorldZ]}>
          <mesh>
            <cylinderGeometry args={[0.05, 0.35, 3.6, 16]} />
            <meshBasicMaterial color={profile.color} transparent opacity={0.35} />
          </mesh>
        </group>
      )}
    </group>
  );
};

/**
 * Trazo del Río Rionegro / Pantanillo que surca el valle de San Nicolás
 */
const RioRionegroWaterPath: React.FC = () => {
  const riverPoints = useMemo(() => {
    return RIO_RIONEGRO_COORDS.map(([x, y]) => {
      return new THREE.Vector3(
        (x - CENTER_X) * SCALE,
        0.04,
        (y - CENTER_Y) * SCALE
      );
    });
  }, []);

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(riverPoints, false, 'catmullrom', 0.2);
  }, [riverPoints]);

  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 64, 0.12, 8, false);
  }, [curve]);

  return (
    <mesh geometry={tubeGeometry} receiveShadow>
      <meshStandardMaterial
        color="#0284C7"
        roughness={0.1}
        metalness={0.8}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
};

/**
 * Pedestal arquitectónico estilo maqueta de museo
 */
const ArchitecturalPedestal: React.FC = () => {
  return (
    <group position={[0, -0.42, 0]}>
      {/* Plinto principal de madera / pizarra oscura */}
      <mesh position={[0, -0.45, 0]} receiveShadow>
        <boxGeometry args={[15.6, 0.9, 16.6]} />
        <meshStandardMaterial color="#1E293B" roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Base inferior de mármol negro pulido */}
      <mesh position={[0, -0.95, 0]} receiveShadow>
        <boxGeometry args={[16.2, 0.2, 17.2]} />
        <meshStandardMaterial color="#0F172A" roughness={0.25} metalness={0.6} />
      </mesh>

      {/* Rosa de los vientos 3D en la esquina noreste */}
      <group position={[6.0, 0.03, -6.5]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.5, 0.65, 32]} />
          <meshStandardMaterial color="#64748B" roughness={0.3} metalness={0.6} />
        </mesh>
        {/* Flecha Norte */}
        <mesh position={[0, 0.02, -0.35]} rotation={[-Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.15, 0.45, 4]} />
          <meshStandardMaterial color="#38BDF8" roughness={0.3} metalness={0.4} />
        </mesh>
        {/* Flecha Sur */}
        <mesh position={[0, 0.02, 0.35]} rotation={[-Math.PI / 2, 0, Math.PI]}>
          <coneGeometry args={[0.15, 0.45, 4]} />
          <meshStandardMaterial color="#94A3B8" roughness={0.3} />
        </mesh>
        <Html position={[0, 0.2, -0.8]} center>
          <span className="text-[10px] font-black text-sky-400 select-none">N</span>
        </Html>
      </group>

      {/* Placa institucional de bronce/acero al frente */}
      <group position={[0, -0.45, 8.32]}>
        <mesh>
          <boxGeometry args={[7.2, 0.35, 0.04]} />
          <meshStandardMaterial color="#0F172A" roughness={0.3} metalness={0.8} />
        </mesh>
        <Html position={[0, 0, 0.03]} center>
          <div className="text-center font-black tracking-widest text-[9px] text-amber-300 uppercase whitespace-nowrap select-none">
            Municipio de Rionegro • Antioquia • ECV 2020
          </div>
        </Html>
      </group>

      {/* Cuadrícula sutil cartográfica */}
      <gridHelper args={[15, 15, '#475569', '#334155']} position={[0, 0.01, 0]} />
    </group>
  );
};

/**
 * Nubes y vegetación decorativa ambiental
 */
const AmbientAtmosphere: React.FC = () => {
  return (
    <group>
      <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.35}>
        <group position={[-5.5, 4.8, -4]}>
          <mesh>
            <sphereGeometry args={[0.55, 8, 8]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
          </mesh>
          <mesh position={[0.45, -0.08, 0]}>
            <sphereGeometry args={[0.4, 8, 8]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
          </mesh>
          <mesh position={[-0.4, -0.08, 0]}>
            <sphereGeometry args={[0.35, 8, 8]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
          </mesh>
        </group>
      </Float>

      <Float speed={1.4} rotationIntensity={0.1} floatIntensity={0.4}>
        <group position={[5.5, 5.2, 3]}>
          <mesh>
            <sphereGeometry args={[0.65, 8, 8]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
          </mesh>
          <mesh position={[0.5, -0.08, 0]}>
            <sphereGeometry args={[0.45, 8, 8]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
          </mesh>
        </group>
      </Float>
    </group>
  );
};

/**
 * Visor para modelos 3D externos personalizados (.glb / .gltf)
 */
const CustomGLBModelViewer: React.FC<{ modelUrl: string }> = ({ modelUrl }) => {
  const [scene, setScene] = useState<THREE.Group | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loader = new GLTFLoader();

    loader.load(
      modelUrl,
      (gltf) => {
        if (!isMounted) return;

        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 8.5 / (maxDim || 1);

        gltf.scene.position.sub(center.multiplyScalar(scale));
        gltf.scene.scale.setScalar(scale);

        gltf.scene.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        setScene(gltf.scene);
      },
      undefined,
      (error) => {
        console.error('Error cargando modelo GLB:', error);
        if (isMounted) setLoadError('No se pudo procesar el archivo 3D. Asegúrate de que sea un .glb válido.');
      }
    );

    return () => {
      isMounted = false;
    };
  }, [modelUrl]);

  if (loadError) {
    return (
      <Html center>
        <div className="bg-rose-50 text-rose-800 p-4 rounded-xl border border-rose-200 text-xs font-bold max-w-xs text-center shadow-lg">
          {loadError}
        </div>
      </Html>
    );
  }

  if (!scene) {
    return (
      <Html center>
        <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/90 text-white px-4 py-2 rounded-xl shadow-lg border border-white/10 text-xs font-bold flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-600 animate-spin" />
          <span>Cargando diorama 3D...</span>
        </div>
      </Html>
    );
  }

  return (
    <group>
      <primitive object={scene} />
      <mesh position={[0, -0.2, 0]} receiveShadow>
        <cylinderGeometry args={[6, 6.2, 0.4, 32]} />
        <meshStandardMaterial color="#0F172A" roughness={0.3} metalness={0.5} />
      </mesh>
    </group>
  );
};

export const Rionegro3DDiorama: React.FC<Rionegro3DDioramaProps> = ({
  selectedAreaId = 'rionegro-c1-liborio',
  onSelectArea
}) => {
  // Configuración de iluminación y vista
  const [lightingMode, setLightingMode] = useState<'day' | 'sunset' | 'night'>('day');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [showVeredas, setShowVeredas] = useState<boolean>(true);
  const [showRiver, setShowRiver] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<any>(null);

  // Subida de modelo GLB propio
  const [customModelUrl, setCustomModelUrl] = useState<string | null>(null);
  const [customFileName, setCustomFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (customModelUrl) URL.revokeObjectURL(customModelUrl);
      const url = URL.createObjectURL(file);
      setCustomModelUrl(url);
      setCustomFileName(file.name);
    }
  };

  const handleClearCustomModel = () => {
    if (customModelUrl) URL.revokeObjectURL(customModelUrl);
    setCustomModelUrl(null);
    setCustomFileName(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Ajustes de cámara
  const resetCamera = (view: 'isometric' | 'top' | 'front') => {
    if (!controlsRef.current) return;
    if (view === 'isometric') {
      controlsRef.current.object.position.set(11, 13, 11);
    } else if (view === 'top') {
      controlsRef.current.object.position.set(0, 19, 0.1);
    } else if (view === 'front') {
      controlsRef.current.object.position.set(0, 7, 16);
    }
    controlsRef.current.target.set(0, 0, 0);
    controlsRef.current.update();
  };

  // Paleta de iluminación según modo
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
          bgColor: '#F1F5F9'
        };
    }
  }, [lightingMode]);

  const activeSectorProfile = RIONEGRO_COMMUNE_DETAILED_PROFILES[selectedAreaId] || RIONEGRO_COMMUNE_DETAILED_PROFILES['rionegro-c1-liborio'];
  const activeSectorGeom = RIONEGRO_REAL_SECTORS[selectedAreaId] || RIONEGRO_REAL_SECTORS['rionegro-c1-liborio'];

  return (
    <div
      ref={containerRef}
      className={`relative rounded-3xl overflow-hidden border border-white/10 bg-slate-900 transition-all shadow-sm ${
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
                Formas Reales
              </span>
            </div>
            <p className="text-[10px] text-slate-400">
              {customFileName ? `Modelo: ${customFileName}` : 'Límites Político-Administrativos Oficiales • Rionegro'}
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
                lightingMode === 'night' ? 'bg-blue-600 text-white font-bold shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Vistas de Cámara */}
          <div className="flex items-center bg-slate-800/80 p-0.5 rounded-xl border border-slate-700/50">
            <button
              onClick={() => resetCamera('isometric')}
              title="Perspectiva Isométrica 3D"
              className="px-2 py-1 text-[10px] font-bold text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-all"
            >
              Isométrica
            </button>
            <button
              onClick={() => resetCamera('top')}
              title="Vista Cenital (Planta Real)"
              className="px-2 py-1 text-[10px] font-bold text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-all"
            >
              Cenital
            </button>
            <button
              onClick={() => resetCamera('front')}
              title="Vista Frontal"
              className="px-2 py-1 text-[10px] font-bold text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-all"
            >
              Frontal
            </button>
          </div>

          {/* Botón Auto-rotación */}
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            title={autoRotate ? 'Pausar rotación' : 'Activar auto-rotación orbital'}
            className={`px-2 py-1 rounded-xl text-[10px] font-bold transition-all flex items-center gap-1 border ${
              autoRotate
                ? 'bg-blue-600/30 text-blue-300 border-blue-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
            }`}
          >
            <RotateCcw className={`w-3 h-3 ${autoRotate ? 'animate-spin' : ''}`} />
            <span>Giro</span>
          </button>

          {/* Botón Etiquetas */}
          <button
            onClick={() => setShowLabels(!showLabels)}
            title="Alternar etiquetas de hitos y comunas"
            className={`px-2 py-1 rounded-xl text-[10px] font-bold transition-all flex items-center gap-1 border ${
              showLabels
                ? 'bg-emerald-600/30 text-emerald-300 border-emerald-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
            }`}
          >
            <Eye className="w-3 h-3" />
            <span>Nombres</span>
          </button>

          {/* Botón Veredas */}
          <button
            onClick={() => setShowVeredas(!showVeredas)}
            title="Alternar límites internos de veredas"
            className={`px-2 py-1 rounded-xl text-[10px] font-bold transition-all flex items-center gap-1 border ${
              showVeredas
                ? 'bg-purple-600/30 text-purple-300 border-purple-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
            }`}
          >
            <Map className="w-3 h-3" />
            <span>Veredas</span>
          </button>

          {/* Botón Río */}
          <button
            onClick={() => setShowRiver(!showRiver)}
            title="Alternar traza del Río Rionegro"
            className={`px-2 py-1 rounded-xl text-[10px] font-bold transition-all flex items-center gap-1 border ${
              showRiver
                ? 'bg-cyan-600/30 text-cyan-300 border-cyan-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
            }`}
          >
            <Waves className="w-3 h-3" />
            <span>Río</span>
          </button>

          {/* Botón Cargar Modelo Propio */}
          <button
            onClick={() => fileInputRef.current?.click()}
            title="Cargar archivo .glb o .gltf propio"
            className="px-2 py-1 rounded-xl text-[10px] font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all flex items-center gap-1"
          >
            <Upload className="w-3 h-3 text-sky-400" />
            <span>Subir 3D</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".glb,.gltf"
            onChange={handleFileUpload}
            className="hidden"
          />

          {customModelUrl && (
            <button
              onClick={handleClearCustomModel}
              title="Volver a la maqueta oficial de Rionegro"
              className="px-2 py-1 rounded-xl text-[10px] font-bold bg-rose-600/30 text-rose-300 border border-rose-500/40 hover:bg-rose-600/50 transition-all"
            >
              Restablecer
            </button>
          )}

          {/* Botón Pantalla Completa */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? 'Salir de pantalla completa' : 'Ver a pantalla completa'}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl border border-slate-700 transition-all"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* LIENZO CANVAS THREE.JS */}
      <Canvas
        shadows
        camera={{ position: [11, 13, 11], fov: 42 }}
        style={{ background: lightingParams.bgColor }}
      >
        <Suspense fallback={null}>
          <OrbitControls
            ref={controlsRef}
            enableDamping
            dampingFactor={0.05}
            maxPolarAngle={Math.PI / 2 - 0.05}
            minDistance={4}
            maxDistance={25}
            autoRotate={autoRotate}
            autoRotateSpeed={0.8}
          />

          {/* Iluminación de Estudio y Sol */}
          <ambientLight color={lightingParams.ambientColor} intensity={lightingParams.ambientIntensity} />
          <directionalLight
            position={lightingParams.sunPosition}
            intensity={lightingParams.sunIntensity}
            color={lightingParams.sunColor}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-near={0.5}
            shadow-camera-far={40}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          <pointLight position={[-10, 8, -10]} intensity={0.4} color="#60A5FA" />

          {/* Escena 3D */}
          {customModelUrl ? (
            <CustomGLBModelViewer modelUrl={customModelUrl} />
          ) : (
            <group position={[0, 0, 0]}>
              {/* Pedestal Arquitectónico */}
              <ArchitecturalPedestal />

              {/* Atmósfera flotante */}
              <AmbientAtmosphere />

              {/* Río Rionegro */}
              {showRiver && <RioRionegroWaterPath />}

              {/* 8 Divisiones Político-Administrativas con FORMAS REALES extruidas */}
              {Object.entries(RIONEGRO_REAL_SECTORS).map(([sectorId, geomDef]) => {
                const profile = RIONEGRO_COMMUNE_DETAILED_PROFILES[sectorId];
                if (!profile) return null;
                const isSelected = sectorId === selectedAreaId;

                return (
                  <RealShapeSectorMesh
                    key={sectorId}
                    sectorId={sectorId}
                    profile={profile}
                    geomDef={geomDef}
                    isSelected={isSelected}
                    onSelect={(id) => onSelectArea && onSelectArea(id)}
                    showLabels={showLabels}
                    showVeredas={showVeredas}
                  />
                );
              })}
            </group>
          )}
        </Suspense>
      </Canvas>

      {/* TARJETA FLOTANTE INFERIOR: FICHA Y SELECTOR RÁPIDO */}
      {!customModelUrl && activeSectorProfile && activeSectorGeom && (
        <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none flex flex-col sm:flex-row items-end sm:items-center justify-between gap-3">
          
          {/* Ficha de la división activa */}
          <div className="bg-slate-900/90 backdrop-blur-md p-3.5 rounded-2xl border border-slate-700/80 shadow-xl max-w-md w-full pointer-events-auto text-white space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full shrink-0 shadow-xs"
                  style={{ backgroundColor: activeSectorProfile.color }}
                />
                <h4 className="text-sm font-black tracking-tight text-white">
                  {activeSectorProfile.name}
                </h4>
              </div>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                {activeSectorProfile.type}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-snug line-clamp-2">
              {activeSectorProfile.strategicHighlights[0] || activeSectorProfile.populationText}
            </p>

            <div className="grid grid-cols-3 gap-1.5 pt-1 text-[10px]">
              <div className="bg-slate-800/80 p-1.5 rounded-lg border border-slate-700/60">
                <span className="text-slate-400 block text-[9px] uppercase font-bold">Juventud</span>
                <span className="font-black text-sky-400">{activeSectorProfile.youthSharePercentage}%</span>
              </div>
              <div className="bg-slate-800/80 p-1.5 rounded-lg border border-slate-700/60">
                <span className="text-slate-400 block text-[9px] uppercase font-bold">Estratos</span>
                <span className="font-black text-amber-400">{activeSectorProfile.predominantStrataNumbers.join(', ')}</span>
              </div>
              <div className="bg-slate-800/80 p-1.5 rounded-lg border border-slate-700/60">
                <span className="text-slate-400 block text-[9px] uppercase font-bold">Hito Real</span>
                <span className="font-bold text-white truncate block">
                  {activeSectorGeom.landmarkName}
                </span>
              </div>
            </div>
          </div>

          {/* Selector de 8 divisiones */}
          <div className="bg-slate-900/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-700/80 shadow-xl pointer-events-auto flex items-center gap-1 overflow-x-auto max-w-full">
            {Object.values(RIONEGRO_COMMUNE_DETAILED_PROFILES).map((prof) => {
              const isSelected = prof.id === selectedAreaId;
              return (
                <button
                  key={prof.id}
                  onClick={() => onSelectArea && onSelectArea(prof.id)}
                  title={prof.name}
                  className={`px-2 py-1 rounded-xl text-[10px] font-bold transition-all whitespace-nowrap flex items-center gap-1 border ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-400 shadow-xs'
                      : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: prof.color }} />
                  <span>{prof.shortName}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Indicador de ayuda */}
      <div className="absolute bottom-4 right-4 hidden md:flex items-center gap-2 text-[10px] text-slate-400 bg-slate-950/70 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-slate-800/60 pointer-events-none">
        <Compass className="w-3.5 h-3.5 text-blue-400" />
        <span>Arrastra para rotar • Clic en cualquier sector para elevarlo</span>
      </div>
    </div>
  );
};

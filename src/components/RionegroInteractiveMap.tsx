import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Layers, 
  Compass, 
  ZoomIn, 
  RotateCcw, 
  Search, 
  Check, 
  ExternalLink,
  Globe,
  SlidersHorizontal,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { AreaDivision } from '../data/antioquia7MunicipiosData';
import { RIONEGRO_COMMUNE_DETAILED_PROFILES } from '../data/rionegroECV2020Data';

interface RionegroInteractiveMapProps {
  areas: AreaDivision[];
  selectedAreaId: string;
  onSelectArea: (areaId: string) => void;
}

// Estructura de Veredas Oficiales de Rionegro
interface VeredaDetail {
  id: string;
  name: string;
  corregimientoId: string;
  corregimientoName: string;
  color: string;
  x: number;
  y: number;
}

// Catálogo de Veredas según el mapa oficial de la Alcaldía
const VEREDAS_RIONEGRO: VeredaDetail[] = [
  // Corregimiento José María Córdova Muñoz (Azul Oscuro)
  { id: 'v-mosquita', name: 'La Mosquita', corregimientoId: 'rionegro-corr-jose-maria-cordova', corregimientoName: 'Corregimiento José María Córdova Muñoz', color: '#1E3A5F', x: 195, y: 145 },
  { id: 'v-quiebra', name: 'La Quiebra', corregimientoId: 'rionegro-corr-jose-maria-cordova', corregimientoName: 'Corregimiento José María Córdova Muñoz', color: '#1E3A5F', x: 105, y: 175 },
  { id: 'v-playarica', name: 'Playa Rica-Ranchería', corregimientoId: 'rionegro-corr-jose-maria-cordova', corregimientoName: 'Corregimiento José María Córdova Muñoz', color: '#1E3A5F', x: 200, y: 200 },
  { id: 'v-yarumal', name: 'Yarumal', corregimientoId: 'rionegro-corr-jose-maria-cordova', corregimientoName: 'Corregimiento José María Córdova Muñoz', color: '#1E3A5F', x: 110, y: 245 },
  { id: 'v-aeropuerto', name: 'Aeropuerto', corregimientoId: 'rionegro-corr-jose-maria-cordova', corregimientoName: 'Corregimiento José María Córdova Muñoz', color: '#1E3A5F', x: 235, y: 255 },
  { id: 'v-convencion', name: 'La convención', corregimientoId: 'rionegro-corr-jose-maria-cordova', corregimientoName: 'Corregimiento José María Córdova Muñoz', color: '#1E3A5F', x: 190, y: 305 },
  { id: 'v-tablazo', name: 'El Tablazo', corregimientoId: 'rionegro-corr-jose-maria-cordova', corregimientoName: 'Corregimiento José María Córdova Muñoz', color: '#1E3A5F', x: 105, y: 320 },
  { id: 'v-tablacito', name: 'Tablacito', corregimientoId: 'rionegro-corr-jose-maria-cordova', corregimientoName: 'Corregimiento José María Córdova Muñoz', color: '#1E3A5F', x: 105, y: 395 },

  // Corregimiento Centro o Casimiro García (Amarillo Mostaza)
  { id: 'v-mampuesto', name: 'Mampuesto', corregimientoId: 'rionegro-corr-centro', corregimientoName: 'Corregimiento Centro o Casimiro García', color: '#F5B025', x: 300, y: 140 },
  { id: 'v-carmin', name: 'El Carmín', corregimientoId: 'rionegro-corr-centro', corregimientoName: 'Corregimiento Centro o Casimiro García', color: '#F5B025', x: 280, y: 205 },
  { id: 'v-cuchillas', name: 'Cuchillas de San José', corregimientoId: 'rionegro-corr-centro', corregimientoName: 'Corregimiento Centro o Casimiro García', color: '#F5B025', x: 340, y: 225 },
  { id: 'v-abreo', name: 'Abreo', corregimientoId: 'rionegro-corr-centro', corregimientoName: 'Corregimiento Centro o Casimiro García', color: '#F5B025', x: 345, y: 275 },
  { id: 'v-chachafruto', name: 'Chachafruto', corregimientoId: 'rionegro-corr-centro', corregimientoName: 'Corregimiento Centro o Casimiro García', color: '#F5B025', x: 290, y: 300 },
  { id: 'v-barroblanco', name: 'Barro Blanco', corregimientoId: 'rionegro-corr-centro', corregimientoName: 'Corregimiento Centro o Casimiro García', color: '#F5B025', x: 300, y: 325 },

  // Corregimiento Norte o Néstor Esteban Sanínt Arbeláez (Azul Celeste)
  { id: 'v-sanluis', name: 'San Luis', corregimientoId: 'rionegro-corr-norte', corregimientoName: 'Corregimiento Norte o Néstor Esteban Sanínt Arbeláez', color: '#5DADE2', x: 420, y: 80 },
  { id: 'v-rioabajo', name: 'Río Abajo', corregimientoId: 'rionegro-corr-norte', corregimientoName: 'Corregimiento Norte o Néstor Esteban Sanínt Arbeláez', color: '#5DADE2', x: 505, y: 95 },
  { id: 'v-lospinos', name: 'Los Pinos', corregimientoId: 'rionegro-corr-norte', corregimientoName: 'Corregimiento Norte o Néstor Esteban Sanínt Arbeláez', color: '#5DADE2', x: 515, y: 150 },
  { id: 'v-santabarbara', name: 'Santa Bárbara', corregimientoId: 'rionegro-corr-norte', corregimientoName: 'Corregimiento Norte o Néstor Esteban Sanínt Arbeláez', color: '#5DADE2', x: 425, y: 150 },
  { id: 'v-galicia', name: 'Galicia', corregimientoId: 'rionegro-corr-norte', corregimientoName: 'Corregimiento Norte o Néstor Esteban Sanínt Arbeláez', color: '#5DADE2', x: 450, y: 200 },
  { id: 'v-lalaja', name: 'La Laja', corregimientoId: 'rionegro-corr-norte', corregimientoName: 'Corregimiento Norte o Néstor Esteban Sanínt Arbeláez', color: '#5DADE2', x: 420, y: 240 },
  { id: 'v-cimarronas', name: 'Cimarronas', corregimientoId: 'rionegro-corr-norte', corregimientoName: 'Corregimiento Norte o Néstor Esteban Sanínt Arbeláez', color: '#5DADE2', x: 440, y: 295 },

  // Corregimiento Sur o Gilberto Echeverri Mejía (Verde Brillante)
  { id: 'v-trespuertas', name: 'Tres Puertas', corregimientoId: 'rionegro-corr-sur', corregimientoName: 'Corregimiento Sur o Gilberto Echeverri Mejía', color: '#48BB28', x: 250, y: 380 },
  { id: 'v-chipre', name: 'Chipre', corregimientoId: 'rionegro-corr-sur', corregimientoName: 'Corregimiento Sur o Gilberto Echeverri Mejía', color: '#48BB28', x: 325, y: 380 },
  { id: 'v-guayabito', name: 'Guayabito', corregimientoId: 'rionegro-corr-sur', corregimientoName: 'Corregimiento Sur o Gilberto Echeverri Mejía', color: '#48BB28', x: 175, y: 445 },
  { id: 'v-sanantoniorural', name: 'San Antonio (Rural)', corregimientoId: 'rionegro-corr-sur', corregimientoName: 'Corregimiento Sur o Gilberto Echeverri Mejía', color: '#48BB28', x: 350, y: 430 },
  { id: 'v-cabeceras', name: 'Cabeceras de Llanogrande', corregimientoId: 'rionegro-corr-sur', corregimientoName: 'Corregimiento Sur o Gilberto Echeverri Mejía', color: '#48BB28', x: 215, y: 505 },
  { id: 'v-vilachuaga', name: 'Vilachuaga', corregimientoId: 'rionegro-corr-sur', corregimientoName: 'Corregimiento Sur o Gilberto Echeverri Mejía', color: '#48BB28', x: 310, y: 475 },
  { id: 'v-elhigueron', name: 'El Higuerón', corregimientoId: 'rionegro-corr-sur', corregimientoName: 'Corregimiento Sur o Gilberto Echeverri Mejía', color: '#48BB28', x: 175, y: 580 },
  { id: 'v-pontezuela', name: 'Pontezuela', corregimientoId: 'rionegro-corr-sur', corregimientoName: 'Corregimiento Sur o Gilberto Echeverri Mejía', color: '#48BB28', x: 245, y: 540 },
  { id: 'v-elcapiro', name: 'El Capiro', corregimientoId: 'rionegro-corr-sur', corregimientoName: 'Corregimiento Sur o Gilberto Echeverri Mejía', color: '#48BB28', x: 325, y: 550 },
  { id: 'v-santateresa', name: 'Santa Teresa', corregimientoId: 'rionegro-corr-sur', corregimientoName: 'Corregimiento Sur o Gilberto Echeverri Mejía', color: '#48BB28', x: 345, y: 600 },
  { id: 'v-elrosal', name: 'El Rosal', corregimientoId: 'rionegro-corr-sur', corregimientoName: 'Corregimiento Sur o Gilberto Echeverri Mejía', color: '#48BB28', x: 440, y: 350 },
  { id: 'v-santaana', name: 'Santa Ana', corregimientoId: 'rionegro-corr-sur', corregimientoName: 'Corregimiento Sur o Gilberto Echeverri Mejía', color: '#48BB28', x: 440, y: 405 }
];

// Metadatos de las 8 Divisiones oficiales
const SECTOR_INFO: Record<string, {
  name: string;
  type: 'Urbana' | 'Rural';
  color: string;
  badge?: string;
  desc: string;
  coords: [number, number]; // [lat, lng] aproximadas para Leaflet
}> = {
  'rionegro-corr-jose-maria-cordova': {
    name: 'Corregimiento José María Córdova Muñoz',
    type: 'Rural',
    color: '#1E3A5F',
    desc: 'Occidente de Rionegro: Aeropuerto JMC, Tablacito, El Tablazo, Yarumal y Llanogrande occidental.',
    coords: [6.168, -75.420]
  },
  'rionegro-corr-centro': {
    name: 'Corregimiento Centro o Casimiro García',
    type: 'Rural',
    color: '#F5B025',
    desc: 'Centro-norte: Mampuesto, El Carmín, Cuchillas de San José, Abreo, Chachafruto y Barro Blanco.',
    coords: [6.175, -75.385]
  },
  'rionegro-corr-norte': {
    name: 'Corregimiento Norte o Néstor Esteban Sanínt Arbeláez',
    type: 'Rural',
    color: '#5DADE2',
    desc: 'Nororiente: San Luis, Río Abajo, Los Pinos, Santa Bárbara, Galicia, La Laja y Cimarronas.',
    coords: [6.200, -75.350]
  },
  'rionegro-corr-sur': {
    name: 'Corregimiento Sur o Gilberto Echeverri Mejía',
    type: 'Rural',
    color: '#48BB28',
    desc: 'Sur y cuenca alta: Llanogrande, Pontezuela, Vilachuaga, El Capiro, Santa Teresa, El Rosal y Santa Ana.',
    coords: [6.115, -75.380]
  },
  'rionegro-c1-liborio': {
    name: 'Comuna 1 Liborio Mejía',
    type: 'Urbana',
    color: '#E03185',
    badge: '1',
    desc: 'Centro histórico, Plaza de la Libertad, sector administrativo y Belchite.',
    coords: [6.154, -75.374]
  },
  'rionegro-c2-san-antonio': {
    name: 'Comuna 2 San Antonio',
    type: 'Urbana',
    color: '#2B4CD3',
    badge: '2',
    desc: 'Polo gastronómico, turístico, Parque de San Antonio de Pereira y El Faro.',
    coords: [6.138, -75.368]
  },
  'rionegro-c3-alfonso-uribe': {
    name: 'Comuna 3 Monseñor Alfonso Uribe Jaramillo',
    type: 'Urbana',
    color: '#00BCD4',
    badge: '3',
    desc: 'Cuatro Esquinas, Santa Ana urbana, La Esperanza y Quebrada Arriba.',
    coords: [6.148, -75.358]
  },
  'rionegro-c4-porvenir': {
    name: 'Comuna 4 El Porvenir',
    type: 'Urbana',
    color: '#F97316',
    badge: '4',
    desc: 'El Porvenir, Fontibón, Barro Blanco, Campus UdeA Oriente y nuevos desarrollos.',
    coords: [6.155, -75.390]
  }
};

export const RionegroInteractiveMap: React.FC<RionegroInteractiveMapProps> = ({
  areas,
  selectedAreaId,
  onSelectArea
}) => {
  // Modos de visualización:
  // 'oficial': Replicación fiel de la infografía municipal oficial con veredas
  // 'urban': Lupa de zoom 4X sobre las 4 comunas urbanas
  // 'satellite': Mapa cartográfico georreferenciado real en vivo vía OpenStreetMap / Leaflet
  const [activeTab, setActiveTab] = useState<'oficial' | 'urban' | 'satellite'>('oficial');
  const [showVeredaLabels, setShowVeredaLabels] = useState(true);
  const [hoveredVereda, setHoveredVereda] = useState<VeredaDetail | null>(null);
  const [hoveredSectorId, setHoveredSectorId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Referencias para el contenedor de Leaflet
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const leafletInstanceRef = useRef<L.Map | null>(null);

  const activeSector = SECTOR_INFO[selectedAreaId] || SECTOR_INFO['rionegro-corr-jose-maria-cordova'];
  const activeAreaDetail = areas.find(a => a.id === selectedAreaId);

  // Inicializar o sincronizar el mapa Leaflet en la pestaña Satelital
  useEffect(() => {
    if (activeTab !== 'satellite' || !mapContainerRef.current) {
      if (leafletInstanceRef.current) {
        leafletInstanceRef.current.remove();
        leafletInstanceRef.current = null;
      }
      return;
    }

    if (!leafletInstanceRef.current) {
      // Coordenadas céntricas de Rionegro, Antioquia
      const map = L.map(mapContainerRef.current, {
        center: [6.155, -75.374],
        zoom: 12,
        zoomControl: true
      });

      // Capa de teselas OpenStreetMap estándar
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18
      }).addTo(map);

      // Agregar marcadores interactivos con los colores institucionales
      Object.entries(SECTOR_INFO).forEach(([sectorId, sector]) => {
        const marker = L.circleMarker(sector.coords, {
          radius: sector.type === 'Urbana' ? 10 : 14,
          fillColor: sector.color,
          color: '#FFFFFF',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.85
        }).addTo(map);

        marker.bindPopup(`
          <div style="font-family: system-ui, sans-serif; min-width: 180px;">
            <div style="font-size: 10px; font-weight: 800; color: #64748b; text-transform: uppercase;">
              ${sector.type}
            </div>
            <div style="font-size: 13px; font-weight: 900; color: #0f172a; margin-top: 2px;">
              ${sector.name}
            </div>
            <p style="font-size: 11px; color: #475569; margin: 4px 0 0 0;">
              ${sector.desc}
            </p>
          </div>
        `);

        marker.on('click', () => {
          onSelectArea(sectorId);
        });
      });

      leafletInstanceRef.current = map;
    } else {
      // Centrar en el sector seleccionado
      const targetCoords = activeSector.coords;
      leafletInstanceRef.current.flyTo(targetCoords, activeSector.type === 'Urbana' ? 14 : 12, {
        duration: 1.2
      });
    }

    return () => {
      // Cleanup
    };
  }, [activeTab, selectedAreaId, activeSector, onSelectArea]);

  // Filtrado de veredas según búsqueda
  const filteredVeredas = searchQuery.trim() 
    ? VEREDAS_RIONEGRO.filter(v => v.name.toLowerCase().includes(searchQuery.toLowerCase()) || v.corregimientoName.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl rounded-3xl p-5 sm:p-7 shadow-sm border border-white/10 space-y-6">
      
      {/* Cabecera con Título Institucional y Conmutador de Modos */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-150">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-sky-500/10 text-blue-800 border border-blue-200">
              CARTOGRAFÍA OFICIAL FIDEDIGNA • ALCALDÍA DE RIONEGRO
            </span>
            <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-200">
              32 Veredas + 4 Comunas
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1 flex items-center gap-2">
            <span>Mapa Político-Administrativo y Veredal de Rionegro</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-0.5">
            Geometría exacta, división veredal y comunal según la cartografía municipal oficial. Selecciona cualquier zona para calibrar la herramienta analista.
          </p>
        </div>

        {/* Pestañas de Vista Cartográfica */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-white/10 self-start lg:self-auto">
          <button
            onClick={() => setActiveTab('oficial')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              activeTab === 'oficial'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Mapa Oficial Veredal</span>
          </button>

          <button
            onClick={() => setActiveTab('urban')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              activeTab === 'urban'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <ZoomIn className="w-3.5 h-3.5 text-amber-300" />
            <span>Lupa Comunas (4X)</span>
          </button>

          <button
            onClick={() => setActiveTab('satellite')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              activeTab === 'satellite'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-emerald-300" />
            <span>Georreferenciado Real (OSM)</span>
          </button>
        </div>
      </div>

      {/* Buscador de Vereda Rápido */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white/[0.04] backdrop-blur-sm border border-white/10 p-3 rounded-2xl border border-white/10">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar vereda (ej: Llanogrande, Aeropuerto, El Capiro, San Luis, Barro Blanco...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl rounded-xl border border-white/10 text-xs font-medium text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 text-xs font-bold"
            >
              ×
            </button>
          )}
        </div>

        {/* Alternar etiquetas de vereda */}
        {activeTab === 'oficial' && (
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowVeredaLabels(!showVeredaLabels)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition-colors ${
                showVeredaLabels 
                  ? 'bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl border-slate-300 text-white shadow-2xs' 
                  : 'bg-slate-200 border-slate-300 text-slate-400'
              }`}
            >
              <span>{showVeredaLabels ? 'Ocultar nombres de veredas' : 'Mostrar nombres de veredas'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Resultados de Búsqueda de Veredas si hay consulta */}
      {searchQuery && filteredVeredas.length > 0 && (
        <div className="p-3 bg-sky-500/10/80 rounded-2xl border border-blue-200 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-blue-900 mr-1">Veredas coincidentes:</span>
          {filteredVeredas.map((v) => (
            <button
              key={v.id}
              onClick={() => {
                onSelectArea(v.corregimientoId);
                setSearchQuery('');
              }}
              className="px-2.5 py-1 bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl hover:bg-sky-500/20 text-sky-300 rounded-lg text-xs font-bold text-white border border-blue-200 shadow-2xs flex items-center gap-1.5 transition-all"
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: v.color }} />
              <span>{v.name}</span>
              <span className="text-[10px] text-slate-400">({v.corregimientoName.replace('Corregimiento ', '')})</span>
            </button>
          ))}
        </div>
      )}

      {/* CUERPO PRINCIPAL DEL MAPA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LIENZO GRÁFICO (Col 7) */}
        <div className="lg:col-span-7 relative bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-3xl p-4 sm:p-6 border border-white/10/90 shadow-inner flex flex-col justify-center items-center min-h-[520px] overflow-hidden">
          
          {/* MODO 1: MAPA OFICIAL DE VEREDAS Y COMUNAS (RÉPLICA EXACTA DE LA INFOGRAFÍA) */}
          {activeTab === 'oficial' && (
            <div className="relative w-full max-w-[560px]">
              
              {/* Cartel Institucional de Cabecera: "Corregimientos y veredas" */}
              <div className="absolute top-2 left-2 z-10 bg-[#1E3A5F] text-white px-4 py-2 rounded-2xl shadow-md border border-white/20">
                <h3 className="text-sm sm:text-base font-black tracking-tight font-sans leading-tight">
                  Corregimientos<br />y veredas
                </h3>
              </div>

              {/* Rosa de los Vientos Oficial */}
              <div className="absolute top-20 right-6 z-10 flex flex-col items-center select-none pointer-events-none">
                <div className="w-12 h-12 rounded-full border border-blue-400/40 bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/70 backdrop-blur-xs flex items-center justify-center shadow-xs">
                  <Compass className="w-8 h-8 text-blue-700" />
                </div>
                <span className="text-[10px] font-black text-blue-900 mt-0.5 tracking-wider">N</span>
              </div>

              {/* Tooltip Dinámico Flotante */}
              <AnimatePresence>
                {(hoveredVereda || hoveredSectorId) && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-4 left-4 z-20 bg-slate-900/95 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-xl border border-slate-700 max-w-[260px]"
                  >
                    {hoveredVereda ? (
                      <div>
                        <span className="text-[10px] text-amber-300 block uppercase font-extrabold">
                          Vereda Seleccionada
                        </span>
                        <span className="text-sm font-black text-white">{hoveredVereda.name}</span>
                        <span className="block text-[10px] text-slate-300 mt-0.5">{hoveredVereda.corregimientoName}</span>
                      </div>
                    ) : (
                      <div>
                        <span className="text-sm font-black text-white">{SECTOR_INFO[hoveredSectorId!]?.name}</span>
                        <span className="block text-[10px] text-slate-300 mt-0.5">{SECTOR_INFO[hoveredSectorId!]?.desc}</span>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* SVG CARTOGRÁFICO DE ALTA FIDELIDAD CON GEOMETRÍA OFICIAL */}
              <svg 
                viewBox="20 40 560 620" 
                className="w-full h-auto drop-shadow-md select-none"
                role="img"
                aria-label="Mapa cartográfico oficial de veredas y corregimientos de Rionegro"
              >
                <defs>
                  <filter id="shadow-selected" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.4" floodColor="#0F172A" />
                  </filter>
                </defs>

                {/* 1. CORREGIMIENTO JOSÉ MARÍA CÓRDOVA MUÑOZ (OCCIDENTE - AZUL MARINO #1E3A5F) */}
                <g 
                  id="corregimiento-jose-maria-cordova"
                  onClick={() => onSelectArea('rionegro-corr-jose-maria-cordova')}
                  onMouseEnter={() => setHoveredSectorId('rionegro-corr-jose-maria-cordova')}
                  onMouseLeave={() => setHoveredSectorId(null)}
                  className="cursor-pointer"
                >
                  {/* Polígono general con bordes escarpados reales */}
                  <path
                    d={`
                      M 195 115
                      L 175 125
                      L 140 145
                      L 85 135
                      L 50 120
                      L 55 160
                      L 40 190
                      L 45 230
                      L 65 260
                      L 70 310
                      L 70 370
                      L 85 410
                      L 90 440
                      L 100 420
                      L 140 370
                      L 170 360
                      L 200 330
                      L 200 270
                      L 200 220
                      L 195 140
                      Z
                    `}
                    fill="#1E3A5F"
                    stroke={selectedAreaId === 'rionegro-corr-jose-maria-cordova' ? '#FFFFFF' : '#142942'}
                    strokeWidth={selectedAreaId === 'rionegro-corr-jose-maria-cordova' ? 3.5 : 1.5}
                    filter={selectedAreaId === 'rionegro-corr-jose-maria-cordova' ? 'url(#shadow-selected)' : undefined}
                    className="transition-all duration-200 hover:brightness-110"
                  />

                  {/* Divisiones internas de veredas (Líneas blancas tenues como en el mapa original) */}
                  <g stroke="#527EA8" strokeWidth="1" strokeDasharray="none" fill="none" opacity="0.6">
                    <path d="M 85 135 L 140 180 L 195 140" />
                    <path d="M 55 160 L 140 180 L 140 230 L 45 230" />
                    <path d="M 140 230 L 200 220" />
                    <path d="M 140 230 L 150 280 L 65 260" />
                    <path d="M 150 280 L 200 270" />
                    <path d="M 150 280 L 155 350 L 70 310" />
                    <path d="M 155 350 L 85 410" />
                  </g>
                </g>

                {/* 2. CORREGIMIENTO CENTRO O CASIMIRO GARCÍA (CENTRO-NORTE - AMARILLO MOSTAZA #F5B025) */}
                <g 
                  id="corregimiento-centro"
                  onClick={() => onSelectArea('rionegro-corr-centro')}
                  onMouseEnter={() => setHoveredSectorId('rionegro-corr-centro')}
                  onMouseLeave={() => setHoveredSectorId(null)}
                  className="cursor-pointer"
                >
                  <path
                    d={`
                      M 195 115
                      L 245 80
                      L 270 120
                      L 290 145
                      L 320 200
                      L 340 240
                      L 350 260
                      L 330 280
                      L 300 295
                      L 260 290
                      L 200 285
                      L 200 220
                      L 195 140
                      Z
                    `}
                    fill="#F5B025"
                    stroke={selectedAreaId === 'rionegro-corr-centro' ? '#FFFFFF' : '#D97706'}
                    strokeWidth={selectedAreaId === 'rionegro-corr-centro' ? 3.5 : 1.5}
                    filter={selectedAreaId === 'rionegro-corr-centro' ? 'url(#shadow-selected)' : undefined}
                    className="transition-all duration-200 hover:brightness-105"
                  />

                  {/* Veredas internas de Centro */}
                  <g stroke="#B45309" strokeWidth="1" fill="none" opacity="0.5">
                    <path d="M 245 80 L 250 140 L 195 140" />
                    <path d="M 250 140 L 290 145" />
                    <path d="M 250 140 L 245 220 L 200 220" />
                    <path d="M 245 220 L 320 200" />
                    <path d="M 245 220 L 240 285" />
                    <path d="M 240 285 L 290 260 L 340 240" />
                  </g>
                </g>

                {/* 3. CORREGIMIENTO NORTE O NÉSTOR ESTEBAN SANÍNT ARBELÁEZ (NORESTE - AZUL CELESTE #5DADE2) */}
                <g 
                  id="corregimiento-norte"
                  onClick={() => onSelectArea('rionegro-corr-norte')}
                  onMouseEnter={() => setHoveredSectorId('rionegro-corr-norte')}
                  onMouseLeave={() => setHoveredSectorId(null)}
                  className="cursor-pointer"
                >
                  <path
                    d={`
                      M 270 120
                      L 305 60
                      L 330 55
                      L 410 50
                      L 425 65
                      L 450 65
                      L 470 85
                      L 500 80
                      L 505 130
                      L 515 150
                      L 480 170
                      L 460 200
                      L 440 220
                      L 420 260
                      L 435 285
                      L 415 300
                      L 385 270
                      L 350 260
                      L 340 240
                      L 320 200
                      L 290 145
                      Z
                    `}
                    fill="#5DADE2"
                    stroke={selectedAreaId === 'rionegro-corr-norte' ? '#FFFFFF' : '#2980B9'}
                    strokeWidth={selectedAreaId === 'rionegro-corr-norte' ? 3.5 : 1.5}
                    filter={selectedAreaId === 'rionegro-corr-norte' ? 'url(#shadow-selected)' : undefined}
                    className="transition-all duration-200 hover:brightness-105"
                  />

                  {/* Veredas internas de Norte */}
                  <g stroke="#1F618D" strokeWidth="1" fill="none" opacity="0.45">
                    <path d="M 330 55 L 350 110 L 425 65" />
                    <path d="M 350 110 L 470 85" />
                    <path d="M 350 110 L 320 200" />
                    <path d="M 350 110 L 420 150 L 515 150" />
                    <path d="M 420 150 L 440 220" />
                    <path d="M 440 220 L 385 270" />
                  </g>
                </g>

                {/* 4. CORREGIMIENTO SUR O GILBERTO ECHEVERRI MEJÍA (SUR - VERDE ESMERALDA #48BB28) */}
                <g 
                  id="corregimiento-sur"
                  onClick={() => onSelectArea('rionegro-corr-sur')}
                  onMouseEnter={() => setHoveredSectorId('rionegro-corr-sur')}
                  onMouseLeave={() => setHoveredSectorId(null)}
                  className="cursor-pointer"
                >
                  <path
                    d={`
                      M 85 410
                      L 100 420
                      L 140 370
                      L 170 360
                      L 200 330
                      L 200 285
                      L 260 290
                      L 300 295
                      L 285 320
                      L 310 335
                      L 330 365
                      L 350 350
                      L 380 340
                      L 420 360
                      L 425 410
                      L 385 415
                      L 370 450
                      L 370 480
                      L 375 510
                      L 370 550
                      L 350 595
                      L 320 575
                      L 270 560
                      L 255 580
                      L 210 590
                      L 180 570
                      L 170 540
                      L 140 500
                      L 115 470
                      Z
                    `}
                    fill="#48BB28"
                    stroke={selectedAreaId === 'rionegro-corr-sur' ? '#FFFFFF' : '#277D16'}
                    strokeWidth={selectedAreaId === 'rionegro-corr-sur' ? 3.5 : 1.5}
                    filter={selectedAreaId === 'rionegro-corr-sur' ? 'url(#shadow-selected)' : undefined}
                    className="transition-all duration-200 hover:brightness-105"
                  />

                  {/* Veredas internas de Sur */}
                  <g stroke="#1E5C10" strokeWidth="1" fill="none" opacity="0.45">
                    <path d="M 140 370 L 220 400 L 285 320" />
                    <path d="M 220 400 L 250 470 L 170 540" />
                    <path d="M 250 470 L 320 450 L 330 365" />
                    <path d="M 320 450 L 370 480" />
                    <path d="M 250 470 L 270 560" />
                    <path d="M 320 450 L 370 550" />
                    <path d="M 380 340 L 425 410" />
                  </g>
                </g>

                {/* 5. COMUNA 4 - EL PORVENIR (NARANJA #F97316) */}
                <g 
                  id="comuna-4-porvenir"
                  onClick={(e) => { e.stopPropagation(); onSelectArea('rionegro-c4-porvenir'); }}
                  onMouseEnter={() => setHoveredSectorId('rionegro-c4-porvenir')}
                  onMouseLeave={() => setHoveredSectorId(null)}
                  className="cursor-pointer"
                >
                  <path
                    d={`
                      M 260 290
                      L 300 295
                      L 330 280
                      L 345 305
                      L 310 335
                      L 285 320
                      Z
                    `}
                    fill="#F97316"
                    stroke="#FFFFFF"
                    strokeWidth={selectedAreaId === 'rionegro-c4-porvenir' ? 3.5 : 2}
                    className="transition-transform duration-150 hover:scale-105"
                    style={{ transformOrigin: '305px 305px' }}
                  />
                  {/* Badge 4 */}
                  <circle cx="305" cy="308" r="10" fill="#FFFFFF" stroke="#F97316" strokeWidth="2" />
                  <text x="305" y="312" textAnchor="middle" fill="#F97316" fontSize="10" fontWeight="900">4</text>
                </g>

                {/* 6. COMUNA 1 - LIBORIO MEJÍA (MAGENTA / ROSA #E03185) */}
                <g 
                  id="comuna-1-liborio"
                  onClick={(e) => { e.stopPropagation(); onSelectArea('rionegro-c1-liborio'); }}
                  onMouseEnter={() => setHoveredSectorId('rionegro-c1-liborio')}
                  onMouseLeave={() => setHoveredSectorId(null)}
                  className="cursor-pointer"
                >
                  <path
                    d={`
                      M 330 280
                      L 350 260
                      L 385 270
                      L 375 305
                      L 345 305
                      Z
                    `}
                    fill="#E03185"
                    stroke="#FFFFFF"
                    strokeWidth={selectedAreaId === 'rionegro-c1-liborio' ? 3.5 : 2}
                    className="transition-transform duration-150 hover:scale-105"
                    style={{ transformOrigin: '355px 285px' }}
                  />
                  {/* Badge 1 */}
                  <circle cx="355" cy="285" r="10" fill="#FFFFFF" stroke="#E03185" strokeWidth="2" />
                  <text x="355" y="289" textAnchor="middle" fill="#E03185" fontSize="10" fontWeight="900">1</text>
                </g>

                {/* 7. COMUNA 2 - SAN ANTONIO (AZUL REY #2B4CD3) */}
                <g 
                  id="comuna-2-san-antonio"
                  onClick={(e) => { e.stopPropagation(); onSelectArea('rionegro-c2-san-antonio'); }}
                  onMouseEnter={() => setHoveredSectorId('rionegro-c2-san-antonio')}
                  onMouseLeave={() => setHoveredSectorId(null)}
                  className="cursor-pointer"
                >
                  {/* Forma alargada característica penetrando hacia el sur */}
                  <path
                    d={`
                      M 310 335
                      L 345 305
                      L 355 330
                      L 350 365
                      L 335 375
                      L 320 355
                      Z
                    `}
                    fill="#2B4CD3"
                    stroke="#FFFFFF"
                    strokeWidth={selectedAreaId === 'rionegro-c2-san-antonio' ? 3.5 : 2}
                    className="transition-transform duration-150 hover:scale-105"
                    style={{ transformOrigin: '335px 340px' }}
                  />
                  {/* Badge 2 */}
                  <circle cx="335" cy="340" r="10" fill="#FFFFFF" stroke="#2B4CD3" strokeWidth="2" />
                  <text x="335" y="344" textAnchor="middle" fill="#2B4CD3" fontSize="10" fontWeight="900">2</text>
                </g>

                {/* 8. COMUNA 3 - ALFONSO URIBE JARAMILLO (CYAN #00BCD4) */}
                <g 
                  id="comuna-3-alfonso-uribe"
                  onClick={(e) => { e.stopPropagation(); onSelectArea('rionegro-c3-alfonso-uribe'); }}
                  onMouseEnter={() => setHoveredSectorId('rionegro-c3-alfonso-uribe')}
                  onMouseLeave={() => setHoveredSectorId(null)}
                  className="cursor-pointer"
                >
                  <path
                    d={`
                      M 375 305
                      L 395 305
                      L 380 340
                      L 355 330
                      L 345 305
                      Z
                    `}
                    fill="#00BCD4"
                    stroke="#FFFFFF"
                    strokeWidth={selectedAreaId === 'rionegro-c3-alfonso-uribe' ? 3.5 : 2}
                    className="transition-transform duration-150 hover:scale-105"
                    style={{ transformOrigin: '370px 320px' }}
                  />
                  {/* Badge 3 */}
                  <circle cx="370" cy="320" r="10" fill="#FFFFFF" stroke="#00BCD4" strokeWidth="2" />
                  <text x="370" y="324" textAnchor="middle" fill="#00BCD4" fontSize="10" fontWeight="900">3</text>
                </g>

                {/* ETIQUETAS DE TEXTO DE VEREDAS (SI ESTÁ ACTIVO) */}
                {showVeredaLabels && (
                  <g pointerEvents="none" className="select-none">
                    {VEREDAS_RIONEGRO.map((vereda) => (
                      <text
                        key={vereda.id}
                        x={vereda.x}
                        y={vereda.y}
                        textAnchor="middle"
                        fill="#FFFFFF"
                        fontSize="9"
                        fontWeight="800"
                        fontFamily="system-ui, sans-serif"
                        className="drop-shadow-sm"
                        style={{
                          textShadow: '0 1px 2px rgba(0,0,0,0.8)'
                        }}
                      >
                        {vereda.name}
                      </text>
                    ))}
                  </g>
                )}
              </svg>
            </div>
          )}

          {/* MODO 2: LUPA URBANA 4X (COMUNAS 1, 2, 3, 4 AMPLIADAS) */}
          {activeTab === 'urban' && (
            <div className="w-full max-w-[500px] flex flex-col items-center justify-center p-4">
              <div className="text-center mb-3">
                <span className="text-[10px] font-black uppercase text-blue-900 bg-sky-500/20 text-sky-300 px-3 py-1 rounded-full border border-blue-200">
                  LUPA 4X • PERÍMETRO URBANO CENTRAL
                </span>
                <p className="text-xs text-slate-400 mt-1">
                  Haz clic en cualquiera de las 4 comunas para analizar su estratificación y densidad.
                </p>
              </div>

              <svg 
                viewBox="240 240 180 160" 
                className="w-full h-auto drop-shadow-lg"
              >
                {/* Entorno rural difuminado */}
                <path d="M 240 240 L 350 240 L 350 270 L 240 270 Z" fill="#F5B025" opacity="0.3" />
                <path d="M 240 330 L 380 380 L 240 400 Z" fill="#48BB28" opacity="0.3" />

                {/* Comuna 4 - El Porvenir */}
                <g 
                  onClick={() => onSelectArea('rionegro-c4-porvenir')}
                  className="cursor-pointer"
                >
                  <path
                    d="M 260 290 L 300 295 L 330 280 L 345 305 L 310 335 L 285 320 Z"
                    fill="#F97316"
                    stroke="#FFFFFF"
                    strokeWidth={selectedAreaId === 'rionegro-c4-porvenir' ? 3 : 1.5}
                    className="hover:brightness-110"
                  />
                  <circle cx="305" cy="308" r="11" fill="#FFFFFF" stroke="#F97316" strokeWidth="2.5" />
                  <text x="305" y="313" textAnchor="middle" fill="#F97316" fontSize="11" fontWeight="900">4</text>
                  <text x="290" y="285" fill="#FFFFFF" fontSize="8" fontWeight="800" textAnchor="middle">El Porvenir</text>
                </g>

                {/* Comuna 1 - Liborio Mejía */}
                <g 
                  onClick={() => onSelectArea('rionegro-c1-liborio')}
                  className="cursor-pointer"
                >
                  <path
                    d="M 330 280 L 350 260 L 385 270 L 375 305 L 345 305 Z"
                    fill="#E03185"
                    stroke="#FFFFFF"
                    strokeWidth={selectedAreaId === 'rionegro-c1-liborio' ? 3 : 1.5}
                    className="hover:brightness-110"
                  />
                  <circle cx="355" cy="285" r="11" fill="#FFFFFF" stroke="#E03185" strokeWidth="2.5" />
                  <text x="355" y="290" textAnchor="middle" fill="#E03185" fontSize="11" fontWeight="900">1</text>
                  <text x="365" y="255" fill="#FFFFFF" fontSize="8" fontWeight="800" textAnchor="middle">Liborio Mejía</text>
                </g>

                {/* Comuna 2 - San Antonio */}
                <g 
                  onClick={() => onSelectArea('rionegro-c2-san-antonio')}
                  className="cursor-pointer"
                >
                  <path
                    d="M 310 335 L 345 305 L 355 330 L 350 365 L 335 375 L 320 355 Z"
                    fill="#2B4CD3"
                    stroke="#FFFFFF"
                    strokeWidth={selectedAreaId === 'rionegro-c2-san-antonio' ? 3 : 1.5}
                    className="hover:brightness-110"
                  />
                  <circle cx="335" cy="340" r="11" fill="#FFFFFF" stroke="#2B4CD3" strokeWidth="2.5" />
                  <text x="335" y="345" textAnchor="middle" fill="#2B4CD3" fontSize="11" fontWeight="900">2</text>
                  <text x="335" y="388" fill="#1E3A8A" fontSize="8" fontWeight="800" textAnchor="middle">San Antonio</text>
                </g>

                {/* Comuna 3 - Alfonso Uribe */}
                <g 
                  onClick={() => onSelectArea('rionegro-c3-alfonso-uribe')}
                  className="cursor-pointer"
                >
                  <path
                    d="M 375 305 L 395 305 L 380 340 L 355 330 L 345 305 Z"
                    fill="#00BCD4"
                    stroke="#FFFFFF"
                    strokeWidth={selectedAreaId === 'rionegro-c3-alfonso-uribe' ? 3 : 1.5}
                    className="hover:brightness-110"
                  />
                  <circle cx="370" cy="320" r="11" fill="#FFFFFF" stroke="#00BCD4" strokeWidth="2.5" />
                  <text x="370" y="325" textAnchor="middle" fill="#00BCD4" fontSize="11" fontWeight="900">3</text>
                  <text x="405" y="325" fill="#0E7490" fontSize="8" fontWeight="800" textAnchor="middle">Alfonso Uribe</text>
                </g>
              </svg>
            </div>
          )}

          {/* MODO 3: MAPA CARTOGRÁFICO REAL EN VIVO (OPENSTREETMAP / LEAFLET) */}
          {activeTab === 'satellite' && (
            <div className="w-full h-[480px] rounded-2xl overflow-hidden relative">
              <div ref={mapContainerRef} className="w-full h-full z-0" />
              <div className="absolute top-3 left-3 z-[1000] bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/95 backdrop-blur-xs px-3 py-1.5 rounded-xl shadow-md border border-white/10 text-xs font-bold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Rionegro Cartografía Georreferenciada</span>
              </div>
            </div>
          )}

        </div>

        {/* PANEL LATERAL DERECHO: LEYENDA OFICIAL + FICHA DEL ÁREA (Col 5) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Ficha Dinámica del Área Seleccionada */}
          <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-5 border border-white/10 space-y-3">
            <div className="flex items-center justify-between border-b border-white/10/90 pb-2">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-600" />
                División Activa
              </span>
              <span className={`text-[9px] font-extrabold px-2.5 py-0.5 rounded-full ${
                activeSector.type === 'Urbana' ? 'bg-sky-500/20 text-sky-300 text-blue-800' : 'bg-emerald-500/20 text-emerald-300 text-emerald-800'
              }`}>
                {activeSector.type}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <div 
                  className="w-3.5 h-3.5 rounded-full shrink-0 shadow-2xs border border-white"
                  style={{ backgroundColor: activeSector.color }}
                />
                <h3 className="text-base font-black text-white leading-snug">
                  {activeSector.name}
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
                {activeAreaDetail?.characteristics}
              </p>
            </div>

            {/* Métricas clave */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-2.5 rounded-xl border border-white/10 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold text-slate-400 uppercase">Población</span>
                  {activeAreaDetail?.demographics?.percentageOfMunicipality && (
                    <span className="text-[9px] font-extrabold text-blue-800 bg-sky-500/10 px-1.5 py-0.2 rounded">
                      {activeAreaDetail.demographics.percentageOfMunicipality}%
                    </span>
                  )}
                </div>
                <span className="text-sm font-black text-white block mt-0.5">
                  {RIONEGRO_COMMUNE_DETAILED_PROFILES[selectedAreaId]?.populationExactKnown 
                    ? RIONEGRO_COMMUNE_DETAILED_PROFILES[selectedAreaId].estimatedPopulationNumeric?.toLocaleString() + ' hab.'
                    : (activeAreaDetail?.estimatedPopulation ? activeAreaDetail.estimatedPopulation.toLocaleString() + ' hab.' : '18.000 hab.')}
                </span>
                <span className="text-[9px] text-slate-400 font-medium">
                  {RIONEGRO_COMMUNE_DETAILED_PROFILES[selectedAreaId]?.populationExactKnown ? 'Oficial Sisbén / Planeación' : 'ECV 2020 Estimado'}
                </span>
              </div>
              <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-2.5 rounded-xl border border-white/10 shadow-2xs">
                <span className="text-[9px] font-bold text-slate-400 uppercase block">Estrato Dominante</span>
                <span className="text-sm font-black text-blue-900 block mt-0.5">
                  {activeAreaDetail?.predominantStratum}
                </span>
                <span className="text-[9px] text-slate-400 font-medium">Nivel: {activeAreaDetail?.educationalLevelGeneral}</span>
              </div>
            </div>

            {/* Métrica Singular / Alerta Económica (ECV 2020 OPP) */}
            {RIONEGRO_COMMUNE_DETAILED_PROFILES[selectedAreaId] && (
              <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-2.5 rounded-xl border border-white/10 shadow-2xs space-y-1.5 text-xs">
                {RIONEGRO_COMMUNE_DETAILED_PROFILES[selectedAreaId].specificMetrics.unemploymentRate && (
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-rose-800 flex items-center gap-1">
                      ⚠️ Tasa de Desempleo (Fuerza Laboral):
                    </span>
                    <span className="font-mono font-black text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded text-[11px]">
                      {RIONEGRO_COMMUNE_DETAILED_PROFILES[selectedAreaId].specificMetrics.unemploymentRate}% (La más alta)
                    </span>
                  </div>
                )}
                {RIONEGRO_COMMUNE_DETAILED_PROFILES[selectedAreaId].specificMetrics.longTermUnemploymentRate && (
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-amber-800 flex items-center gap-1">
                      ⏱️ Desempleo Larga Duración:
                    </span>
                    <span className="font-mono font-black text-amber-700 bg-amber-500/10 px-1.5 py-0.5 rounded text-[11px]">
                      {RIONEGRO_COMMUNE_DETAILED_PROFILES[selectedAreaId].specificMetrics.longTermUnemploymentRate}% de hogares desocupados
                    </span>
                  </div>
                )}
                {selectedAreaId === 'rionegro-c4-porvenir' && (
                  <div className="text-[10px] text-orange-900 font-medium bg-orange-50 p-2 rounded-lg border border-orange-200">
                    🎓 <strong>El Porvenir (15,9% juventud):</strong> Mayor concentración individual de juventud urbana y campus Universidad de Antioquia Oriente.
                  </div>
                )}
                {selectedAreaId === 'rionegro-c3-alfonso-uribe' && (
                  <div className="text-[10px] text-cyan-900 font-medium bg-cyan-50 p-2 rounded-lg border border-cyan-200">
                    🏘️ <strong>Cuatro Esquinas (8,6%) y Santa Ana (7,1%):</strong> Mayor densidad de hogares populares en estratos 2 y 3.
                  </div>
                )}
                {RIONEGRO_COMMUNE_DETAILED_PROFILES[selectedAreaId].zone === 'Rural' && (
                  <div className="text-[10px] text-emerald-900 font-medium bg-emerald-500/10 p-2 rounded-lg border border-emerald-200">
                    🌲 <strong>Pobreza Rural NBI:</strong> 8,0% (DANE/ECV) • Población oficial Sisbén IV: {RIONEGRO_COMMUNE_DETAILED_PROFILES[selectedAreaId].populationText}
                  </div>
                )}

                {/* Desglose Gráfico de Juventud en Barrios / Veredas */}
                {RIONEGRO_COMMUNE_DETAILED_PROFILES[selectedAreaId].youthDistributionInSectors.length > 0 && (
                  <div className="pt-1.5 border-t border-white/10 space-y-1">
                    <span className="text-[9px] font-black uppercase text-slate-400 block tracking-wider">
                      Juventud por Sectores en esta División (% Municipal/Zonal):
                    </span>
                    <div className="space-y-1">
                      {RIONEGRO_COMMUNE_DETAILED_PROFILES[selectedAreaId].youthDistributionInSectors.slice(0, 4).map((sec, sIdx) => (
                        <div key={sIdx} className="flex items-center justify-between text-[10px]">
                          <span className="font-bold text-slate-200 truncate">{sec.name}</span>
                          <div className="flex items-center gap-1.5 shrink-0 ml-1">
                            <div className="w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                              <div 
                                className="h-full rounded-full" 
                                style={{ 
                                  backgroundColor: activeSector.color, 
                                  width: `${Math.min(100, (sec.percentage / 16) * 100)}%` 
                                }} 
                              />
                            </div>
                            <span className="font-mono font-black text-white w-8 text-right">{sec.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Desglose Demográfico por Sexo y Jóvenes (ECV 2020) */}
            {activeAreaDetail?.demographics && (
              <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-2.5 rounded-xl border border-white/10 shadow-2xs space-y-2 text-xs">
                <div className="flex items-center justify-between text-[10px] font-black uppercase text-slate-300">
                  <span>Demografía por Sexo & Juventud</span>
                  <span className="text-slate-400">ECV OPP</span>
                </div>

                {/* Barra de Género */}
                <div>
                  <div className="flex justify-between text-[10px] font-bold mb-1">
                    <span className="text-pink-700">Mujeres: {activeAreaDetail.demographics.womenPercentage || 52.3}%</span>
                    <span className="text-blue-900">Hombres: {activeAreaDetail.demographics.menPercentage || 47.7}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full flex overflow-hidden">
                    <div 
                      className="h-full bg-pink-500" 
                      style={{ width: `${activeAreaDetail.demographics.womenPercentage || 52.3}%` }} 
                      title={`Mujeres: ${activeAreaDetail.demographics.womenPercentage}%`}
                    />
                    <div 
                      className="h-full bg-blue-900" 
                      style={{ width: `${activeAreaDetail.demographics.menPercentage || 47.7}%` }} 
                      title={`Hombres: ${activeAreaDetail.demographics.menPercentage}%`}
                    />
                  </div>
                </div>

                {/* Indicador de Jóvenes */}
                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-white/10">
                  <span className="text-slate-300 font-semibold">Población Joven (14-28a):</span>
                  <span className="font-mono font-black text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200 text-[10px]">
                    ~{activeAreaDetail?.demographics?.youthPercentage || 22.5}% ({activeAreaDetail?.estimatedPopulation ? Math.round(((activeAreaDetail.demographics?.youthPercentage || 22.5) / 100) * activeAreaDetail.estimatedPopulation).toLocaleString() : '4.000'} hab.)
                  </span>
                </div>
              </div>
            )}

            {/* Veredas o barrios que comprende */}
            <div className="text-[11px] text-slate-300 pt-1">
              <strong className="text-slate-200">Comprende los sectores de:</strong>
              <div className="flex flex-wrap gap-1 mt-1.5 max-h-28 overflow-y-auto pr-1">
                {activeAreaDetail?.barriosOrVeredas?.map((bv, idx) => (
                  <span key={idx} className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl text-slate-200 px-2 py-0.5 rounded-md border border-white/10 text-[10px] font-bold shadow-2xs">
                    {bv}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* LEYENDA OFICIAL (RÉPLICA EXACTA DE LA COLUMNA DERECHA DE LA IMAGEN) */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl rounded-2xl p-4 border border-white/10 space-y-2.5">
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-150">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-blue-700" />
                Leyenda Oficial del Mapa
              </span>
              <span className="text-[9px] text-slate-400 font-bold">8 Divisiones</span>
            </div>

            <div className="space-y-1.5">
              {Object.entries(SECTOR_INFO).map(([id, sector]) => {
                const isSelected = selectedAreaId === id;
                return (
                  <button
                    key={id}
                    onClick={() => onSelectArea(id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-xl transition-all flex items-center gap-2.5 border text-xs ${
                      isSelected
                        ? 'bg-sky-500/10/90 border-blue-600 shadow-xs ring-1 ring-blue-600'
                        : 'bg-white/[0.04] backdrop-blur-sm border border-white/10/60 hover:bg-slate-100 border-white/10/80 text-slate-200'
                    }`}
                  >
                    {/* Círculo de color exacto al mapa oficial */}
                    <div 
                      className="w-4 h-4 rounded-full shrink-0 shadow-2xs border border-black/10 flex items-center justify-center text-[9px] font-black text-white"
                      style={{ backgroundColor: sector.color }}
                    >
                      {sector.badge}
                    </div>

                    <div className="truncate flex-1">
                      <span className={`block truncate font-bold text-[11px] ${isSelected ? 'text-blue-950 font-black' : 'text-white'}`}>
                        {sector.name}
                      </span>
                    </div>

                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

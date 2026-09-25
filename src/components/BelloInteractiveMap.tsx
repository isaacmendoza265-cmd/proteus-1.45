import React, { useState, useEffect, useRef } from 'react';
import { 
  Layers, 
  MapPin, 
  Search, 
  Users, 
  Building2, 
  Globe, 
  Check, 
  TrendingUp, 
  Sparkles, 
  Info,
  Compass,
  ArrowRight,
  ShieldAlert,
  GraduationCap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { AreaDivision, STRATEGIC_MUNICIPALITIES } from '../data/antioquia7MunicipiosData';
import { ALL_MUNICIPIOS_TERRITORIAL_DATA } from '../data/allMunicipiosTerritorialData';

export interface BelloCommuneMeta {
  number: number;
  name: string;
  shortName: string;
  fillColor: string;
  strokeColor: string;
  hoverColor: string;
  textColor: string;
  centerCoordsSVG: [number, number];
  description: string;
  barrios: string[];
}

export const BELLO_COMMUNES_CONFIG: Record<string, BelloCommuneMeta> = {
  'bello-c1': {
    number: 1,
    name: 'París',
    shortName: '1 París',
    fillColor: '#F6D056',
    strokeColor: '#374151',
    hoverColor: '#FDE047',
    textColor: '#1F2937',
    centerCoordsSVG: [100, 545],
    description: 'Zona de ladera noroccidental límite con Medellín. Fuerte arraigo popular, demandas urgentes de seguridad comunitaria, empleo informal y movilidad.',
    barrios: ['París', 'Los Sauces', 'El Cafetal', 'La Pradera', 'La Esmeralda', 'La Maruchenga', 'José Antonio Galán', 'Salvador Allende']
  },
  'bello-c2': {
    number: 2,
    name: 'La Madera',
    shortName: '2 La Madera',
    fillColor: '#8DBF58',
    strokeColor: '#374151',
    hoverColor: '#A3E635',
    textColor: '#1F2937',
    centerCoordsSVG: [265, 495],
    description: 'Corredor residencial consolidado sobre la Autopista Norte y estación Madera del Metro. Nivel de vida medio y alta participación de voto de opinión.',
    barrios: ['Barrio Nuevo', 'La Cabañita', 'La Cabaña', 'La Madera', 'La Florida', 'Gran Avenida', 'San José Obrero']
  },
  'bello-c3': {
    number: 3,
    name: 'Santa Ana',
    shortName: '3 Santa Ana',
    fillColor: '#67ADC4',
    strokeColor: '#374151',
    hoverColor: '#38BDF8',
    textColor: '#1F2937',
    centerCoordsSVG: [235, 395],
    description: 'Crecimiento vertiginoso de unidades residenciales cerradas, familias jóvenes de estratos 3 y 4 con alta conectividad y demanda de espacio público.',
    barrios: ['Santa Ana', 'Serramonte', 'Salento', 'Autopista Norte', 'Guayabal']
  },
  'bello-c4': {
    number: 4,
    name: 'Suárez',
    shortName: '4 Suárez',
    fillColor: '#D8A67B',
    strokeColor: '#374151',
    hoverColor: '#FDBA74',
    textColor: '#1F2937',
    centerCoordsSVG: [305, 310],
    description: 'Corazón cívico, histórico y comercial de Bello. Alta densidad de locales comerciales, transporte público y entidades administrativas.',
    barrios: ['Centro de Bello', 'Suárez', 'Rincón Santo', 'Congolo', 'Central', 'El Rosario']
  },
  'bello-c5': {
    number: 5,
    name: 'La Cumbre',
    shortName: '5 La Cumbre',
    fillColor: '#DDA658',
    strokeColor: '#374151',
    hoverColor: '#FBBF24',
    textColor: '#1F2937',
    centerCoordsSVG: [205, 255],
    description: 'Ladera oriental con retos de servicios públicos, legalización de predios y fuerte necesidad de inversión social juvenil e infraestructura comunitaria.',
    barrios: ['La Cumbre', 'Altamira', 'El Carmelo', 'Buenos Aires', 'Nazareth']
  },
  'bello-c6': {
    number: 6,
    name: 'Bellavista',
    shortName: '6 Bellavista',
    fillColor: '#B499C0',
    strokeColor: '#374151',
    hoverColor: '#C084FC',
    textColor: '#1F2937',
    centerCoordsSVG: [248, 150],
    description: 'Sector histórico de gran concentración poblacional. Prioridad en seguridad comunitaria, convivencia, oportunidades laborales e infraestructura deportiva.',
    barrios: ['Bellavista', 'Pachelly', 'Tierra Adentro', 'San Martín', 'Villa Linda']
  },
  'bello-c7': {
    number: 7,
    name: 'Altos de Niquia',
    shortName: '7 Altos de Niquia',
    fillColor: '#798CBE',
    strokeColor: '#374151',
    hoverColor: '#818CF8',
    textColor: '#1F2937',
    centerCoordsSVG: [365, 175],
    description: 'Zona próxima al Cerro Quitasol con asentamientos populares en expansión y necesidad de protección ambiental y mitigación del riesgo.',
    barrios: ['Altos de Niquía', 'El Mirador', 'Altos de Quitasol', 'La Selva', 'Bifamiliares', 'Los Ángeles']
  },
  'bello-c8': {
    number: 8,
    name: 'Niquia',
    shortName: '8 Niquia',
    fillColor: '#8AB183',
    strokeColor: '#374151',
    hoverColor: '#4ADE80',
    textColor: '#1F2937',
    centerCoordsSVG: [515, 225],
    description: 'Epicentro metropolitano de transporte y comercio moderno (Estación Niquía, Centro Comercial Puerta del Norte), alta clase media consolidada.',
    barrios: ['Niquía Centro', 'Terranova', 'Panamericano', 'La Navarra', 'Ciudad Niquía', 'Camacol']
  },
  'bello-c9': {
    number: 9,
    name: 'Fontidueño',
    shortName: '9 Fontidueño',
    fillColor: '#A7919B',
    strokeColor: '#374151',
    hoverColor: '#F472B6',
    textColor: '#1F2937',
    centerCoordsSVG: [445, 360],
    description: 'Ribera del Río Medellín en el límite oriental. Mezcla de bodegas logísticas industriales, sectores residenciales populares y mejoramiento barrial.',
    barrios: ['Fontidueño', 'La Mina', 'San Gabriel', 'Vegas de la Navarra', 'Guasimalito']
  },
  'bello-c10': {
    number: 10,
    name: 'Acevedo',
    shortName: '10 Acevedo',
    fillColor: '#C8B17B',
    strokeColor: '#374151',
    hoverColor: '#EAB308',
    textColor: '#1F2937',
    centerCoordsSVG: [385, 510],
    description: 'Corredor hacia la autopista Medellín-Bogotá (Zamora / Acevedo). Tránsito vehicular pesado, intensa actividad logística y asentamientos de origen obrero.',
    barrios: ['Zamora', 'Santa Rita', 'Acevedo límite', 'Playas del Norte']
  }
};

interface BelloInteractiveMapProps {
  areas?: AreaDivision[];
  selectedAreaId?: string;
  onSelectArea: (areaId: string) => void;
}

export const BelloInteractiveMap: React.FC<BelloInteractiveMapProps> = ({
  areas,
  selectedAreaId = 'bello-c1',
  onSelectArea
}) => {
  const [activeTab, setActiveTab] = useState<'oficial' | 'satellite' | 'barrios'>('oficial');
  const [hoveredCommuneId, setHoveredCommuneId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const leafletInstanceRef = useRef<L.Map | null>(null);

  const belloAreas = areas || STRATEGIC_MUNICIPALITIES['bello']?.areas || [];
  const activeArea = belloAreas.find(a => a.id === selectedAreaId) || belloAreas[0];
  const activeCommuneMeta = BELLO_COMMUNES_CONFIG[selectedAreaId] || BELLO_COMMUNES_CONFIG['bello-c1'];

  // Sincronización del mapa Leaflet
  useEffect(() => {
    if (activeTab !== 'satellite' || !mapContainerRef.current) {
      if (leafletInstanceRef.current) {
        leafletInstanceRef.current.remove();
        leafletInstanceRef.current = null;
      }
      return;
    }

    if (!leafletInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [6.337, -75.558],
        zoom: 13,
        zoomControl: true
      });

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18
      }).addTo(map);

      // Marcadores en cada comuna
      const territorialData = ALL_MUNICIPIOS_TERRITORIAL_DATA['bello']?.areas || [];
      territorialData.forEach((area) => {
        const isSelected = area.id === selectedAreaId;
        const meta = BELLO_COMMUNES_CONFIG[area.id];
        const color = meta ? meta.fillColor : (area.color || '#3B82F6');

        const marker = L.circleMarker(area.coords, {
          radius: isSelected ? 16 : 12,
          fillColor: color,
          color: isSelected ? '#FFFFFF' : '#1F2937',
          weight: isSelected ? 3.5 : 1.5,
          opacity: 1,
          fillOpacity: isSelected ? 0.95 : 0.8
        }).addTo(map);

        marker.bindTooltip(`
          <div style="font-family: sans-serif; font-size: 12px; font-weight: bold; padding: 2px 4px;">
            <div style="color: #1F2937;">${area.name}</div>
            <div style="color: #64748B; font-size: 10px;">${area.populationText || ''}</div>
          </div>
        `, { permanent: false, direction: 'top' });

        marker.on('click', () => {
          onSelectArea(area.id);
        });
      });

      leafletInstanceRef.current = map;
    }

    return () => {
      if (leafletInstanceRef.current) {
        leafletInstanceRef.current.remove();
        leafletInstanceRef.current = null;
      }
    };
  }, [activeTab, selectedAreaId, onSelectArea]);

  // Búsqueda de barrios para auto-seleccionar o resaltar
  const filteredBarrios = searchQuery.trim()
    ? Object.entries(BELLO_COMMUNES_CONFIG).flatMap(([cId, meta]) => 
        meta.barrios
          .filter(b => b.toLowerCase().includes(searchQuery.toLowerCase()))
          .map(b => ({ barrio: b, communeId: cId, communeName: meta.name, number: meta.number }))
      )
    : [];

  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl rounded-3xl p-5 sm:p-7 shadow-sm border border-white/10 space-y-6">
      
      {/* Cabecera Institucional y Selector de Vista */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-150">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-900 text-white shadow-2xs">
              CARTOGRAFÍA OFICIAL FIDEDIGNA • BELLO
            </span>
            <span className="text-[10px] font-extrabold text-blue-800 bg-sky-500/10 px-2 py-0.5 rounded-full border border-blue-200">
              10 Comunas Urbanas + Río Medellín
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1 flex items-center gap-2">
            <span>Mapa Poligonal Interactivo: Comunas de Bello</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-0.5">
            Correspondencia geométrica y cromática fiel con la cartografía oficial del Municipio de Bello. Selecciona cualquier comuna para segmentar el análisis.
          </p>
        </div>

        {/* Pestañas de Vista */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-white/10 self-start lg:self-auto">
          <button
            onClick={() => setActiveTab('oficial')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              activeTab === 'oficial'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-cyan-300" />
            <span>Mapa Poligonal Oficial</span>
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
            <span>Georreferenciado (OSM)</span>
          </button>

          <button
            onClick={() => setActiveTab('barrios')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              activeTab === 'barrios'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-amber-300" />
            <span>Barrios por Comuna</span>
          </button>
        </div>
      </div>

      {/* Buscador Rápido de Barrios */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white/[0.04] backdrop-blur-sm border border-white/10 p-3 rounded-2xl border border-white/10">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar barrio o sector (ej: Pachelly, Niquía, Serramonte, La Cabañita, Congolo, Zamora, París...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl rounded-xl border border-white/10 text-xs font-medium text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
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
        <div className="text-[11px] font-bold text-slate-400 shrink-0 px-1">
          Comuna activa: <strong className="text-blue-900">{activeCommuneMeta.shortName}</strong>
        </div>
      </div>

      {/* Resultados rápidos de búsqueda */}
      {searchQuery && filteredBarrios.length > 0 && (
        <div className="p-3 bg-sky-500/10/90 rounded-2xl border border-blue-200 flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-blue-900">Coincidencias encontradas:</span>
          {filteredBarrios.slice(0, 8).map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                onSelectArea(item.communeId);
                setSearchQuery('');
              }}
              className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl hover:bg-sky-500/20 text-sky-300 text-blue-950 px-2.5 py-1 rounded-lg border border-blue-300 text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5"
            >
              <span>{item.barrio}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-200 text-blue-900 font-extrabold">
                C{item.number}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* CUERPO PRINCIPAL: MAPA (IZQ) + FICHA DETALLE Y LEYENDA (DER) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* COLUMNA MAPA (8 COLS) */}
        <div className="lg:col-span-8 space-y-3">
          
          {activeTab === 'oficial' && (
            <div className="bg-slate-100/70 rounded-3xl p-3 sm:p-5 border border-white/10 relative overflow-hidden shadow-inner">
              
              {/* Tooltip flotante al pasar el cursor */}
              <AnimatePresence>
                {hoveredCommuneId && BELLO_COMMUNES_CONFIG[hoveredCommuneId] && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute top-4 left-4 z-20 bg-slate-900/90 backdrop-blur-md text-white px-3.5 py-2 rounded-xl shadow-lg border border-slate-700 pointer-events-none text-xs flex items-center gap-2.5"
                  >
                    <div 
                      className="w-3.5 h-3.5 rounded-full border border-white"
                      style={{ backgroundColor: BELLO_COMMUNES_CONFIG[hoveredCommuneId].fillColor }}
                    />
                    <div>
                      <span className="font-black text-[13px] block">
                        Comuna {BELLO_COMMUNES_CONFIG[hoveredCommuneId].number} - {BELLO_COMMUNES_CONFIG[hoveredCommuneId].name}
                      </span>
                      <span className="text-[10px] text-slate-300">Haz clic para calibrar el análisis</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* FIGURA SVG CARTOGRÁFICA CORRESPONDIENTE AL MAPA PROPORCIONADO */}
              <svg 
                viewBox="0 0 800 680" 
                className="w-full h-auto drop-shadow-md select-none"
                role="img"
                aria-label="Mapa cartográfico oficial de comunas de Bello"
              >
                <defs>
                  {/* Sombra de selección para comuna activa */}
                  <filter id="bello-selected-shadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.45" floodColor="#0F172A" />
                  </filter>

                  {/* Gradiente sutil para el Río Medellín */}
                  <linearGradient id="riverGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0033CC" />
                    <stop offset="100%" stopColor="#0055FF" />
                  </linearGradient>
                </defs>

                {/* 0. FONDO Y ÁREA GRIS CIRCUNDANTE (CORREGIMIENTO SAN FÉLIX / LADERAS Y LÍMITES) */}
                {/* Fondo blanco general para Medellín y Capacabana */}
                <rect width="800" height="680" fill="#E2E8F0" rx="20" />
                <path
                  d="M 0 0 L 800 0 L 800 680 L 0 680 Z"
                  fill="#F8FAFC"
                />

                {/* Masa montañosa gris (Oeste, Norte y Copacabana) como en la imagen */}
                <path
                  d={`
                    M 0 0
                    L 800 0
                    L 800 120
                    L 735 80
                    L 700 115
                    L 690 185
                    L 740 185
                    L 800 240
                    L 800 680
                    L 650 680
                    L 580 560
                    L 600 520
                    L 545 375
                    L 535 275
                    L 395 335
                    L 350 420
                    L 310 580
                    L 175 580
                    L 140 570
                    L 68 580
                    L 45 570
                    L 43 540
                    L 35 510
                    L 55 518
                    L 140 350
                    L 190 140
                    L 160 75
                    L 0 75
                    Z
                  `}
                  fill="#C8C9CB"
                  opacity="0.9"
                />

                {/* TÍTULO OFICIAL TAL CUAL APARECE EN LA IMAGEN */}
                <text 
                  x="530" 
                  y="65" 
                  fill="#111827" 
                  fontSize="32" 
                  fontWeight="800" 
                  fontFamily="system-ui, -apple-system, sans-serif"
                  letterSpacing="-0.5px"
                >
                  Comunas de Bello
                </text>

                {/* RÓTULOS DE MUNICIPIOS COLINDANTES SEGÚN LA IMAGEN */}
                {/* Medellín en el borde inferior */}
                <text 
                  x="230" 
                  y="635" 
                  fill="#1E293B" 
                  fontSize="22" 
                  fontWeight="700" 
                  fontFamily="system-ui, -apple-system, sans-serif"
                >
                  Medellín
                </text>

                {/* Capacabana en el borde oriental */}
                <text 
                  x="670" 
                  y="360" 
                  fill="#1E293B" 
                  fontSize="21" 
                  fontWeight="600" 
                  fontFamily="system-ui, -apple-system, sans-serif"
                >
                  Capacabana
                </text>

                {/* ========================================================================= */}
                {/* POLÍGONOS DE LAS 10 COMUNAS URBANAS DE BELLO                              */}
                {/* ========================================================================= */}

                {/* 1. COMUNA 1: PARÍS (Amarillo Oro #F6D056) */}
                <g
                  id="bello-c1"
                  onClick={() => onSelectArea('bello-c1')}
                  onMouseEnter={() => setHoveredCommuneId('bello-c1')}
                  onMouseLeave={() => setHoveredCommuneId(null)}
                  className="cursor-pointer transition-all duration-200"
                >
                  <path
                    d={`
                      M 35 510
                      L 55 518
                      L 70 532
                      L 110 545
                      L 160 555
                      L 175 580
                      L 140 570
                      L 100 585
                      L 68 580
                      L 45 570
                      L 43 540
                      Z
                    `}
                    fill="#F6D056"
                    stroke={selectedAreaId === 'bello-c1' ? '#FFFFFF' : '#374151'}
                    strokeWidth={selectedAreaId === 'bello-c1' ? 4 : 1.5}
                    filter={selectedAreaId === 'bello-c1' ? 'url(#bello-selected-shadow)' : undefined}
                    className="hover:brightness-110"
                  />
                  <text x="100" y="540" textAnchor="middle" fill="#1F2937" fontSize="15" fontWeight="900">1</text>
                  <text x="100" y="558" textAnchor="middle" fill="#1F2937" fontSize="13" fontWeight="800">París</text>
                </g>

                {/* 2. COMUNA 2: LA MADERA (Verde Olivo/Lima #8DBF58) */}
                <g
                  id="bello-c2"
                  onClick={() => onSelectArea('bello-c2')}
                  onMouseEnter={() => setHoveredCommuneId('bello-c2')}
                  onMouseLeave={() => setHoveredCommuneId(null)}
                  className="cursor-pointer transition-all duration-200"
                >
                  <path
                    d={`
                      M 160 555
                      L 190 525
                      L 205 480
                      L 225 470
                      L 255 420
                      L 310 400
                      L 350 420
                      L 345 470
                      L 310 580
                      L 280 560
                      L 250 550
                      L 215 545
                      L 175 580
                      Z
                    `}
                    fill="#8DBF58"
                    stroke={selectedAreaId === 'bello-c2' ? '#FFFFFF' : '#374151'}
                    strokeWidth={selectedAreaId === 'bello-c2' ? 4 : 1.5}
                    filter={selectedAreaId === 'bello-c2' ? 'url(#bello-selected-shadow)' : undefined}
                    className="hover:brightness-110"
                  />
                  <text x="268" y="490" textAnchor="middle" fill="#1F2937" fontSize="16" fontWeight="900">2</text>
                  <text x="268" y="510" textAnchor="middle" fill="#1F2937" fontSize="13" fontWeight="800">La Madera</text>
                </g>

                {/* 3. COMUNA 3: SANTA ANA (Azul Celeste #67ADC4) */}
                <g
                  id="bello-c3"
                  onClick={() => onSelectArea('bello-c3')}
                  onMouseEnter={() => setHoveredCommuneId('bello-c3')}
                  onMouseLeave={() => setHoveredCommuneId(null)}
                  className="cursor-pointer transition-all duration-200"
                >
                  <path
                    d={`
                      M 140 350
                      L 165 365
                      L 145 380
                      L 175 385
                      L 185 425
                      L 170 450
                      L 200 460
                      L 190 500
                      L 205 480
                      L 225 470
                      L 255 420
                      L 310 400
                      L 350 420
                      L 395 335
                      L 365 365
                      L 320 375
                      L 275 340
                      L 210 340
                      L 160 340
                      Z
                    `}
                    fill="#67ADC4"
                    stroke={selectedAreaId === 'bello-c3' ? '#FFFFFF' : '#374151'}
                    strokeWidth={selectedAreaId === 'bello-c3' ? 4 : 1.5}
                    filter={selectedAreaId === 'bello-c3' ? 'url(#bello-selected-shadow)' : undefined}
                    className="hover:brightness-110"
                  />
                  <text x="240" y="388" textAnchor="middle" fill="#1F2937" fontSize="16" fontWeight="900">3</text>
                  <text x="240" y="408" textAnchor="middle" fill="#1F2937" fontSize="13" fontWeight="800">Santa Ana</text>
                </g>

                {/* 4. COMUNA 4: SUÁREZ (Marrón Arcilla/Beige Cálido #D8A67B) */}
                <g
                  id="bello-c4"
                  onClick={() => onSelectArea('bello-c4')}
                  onMouseEnter={() => setHoveredCommuneId('bello-c4')}
                  onMouseLeave={() => setHoveredCommuneId(null)}
                  className="cursor-pointer transition-all duration-200"
                >
                  <path
                    d={`
                      M 210 340
                      L 275 340
                      L 320 375
                      L 365 365
                      L 395 335
                      L 400 305
                      L 355 245
                      L 330 220
                      L 305 200
                      L 265 200
                      L 240 230
                      L 260 260
                      L 250 305
                      L 225 320
                      Z
                    `}
                    fill="#D8A67B"
                    stroke={selectedAreaId === 'bello-c4' ? '#FFFFFF' : '#374151'}
                    strokeWidth={selectedAreaId === 'bello-c4' ? 4 : 1.5}
                    filter={selectedAreaId === 'bello-c4' ? 'url(#bello-selected-shadow)' : undefined}
                    className="hover:brightness-110"
                  />
                  <text x="310" y="305" textAnchor="middle" fill="#1F2937" fontSize="16" fontWeight="900">4</text>
                  <text x="310" y="325" textAnchor="middle" fill="#1F2937" fontSize="13" fontWeight="800">Suárez</text>
                </g>

                {/* 5. COMUNA 5: LA CUMBRE (Ocre Mostaza #DDA658) */}
                <g
                  id="bello-c5"
                  onClick={() => onSelectArea('bello-c5')}
                  onMouseEnter={() => setHoveredCommuneId('bello-c5')}
                  onMouseLeave={() => setHoveredCommuneId(null)}
                  className="cursor-pointer transition-all duration-200"
                >
                  <path
                    d={`
                      M 140 350
                      L 160 330
                      L 140 310
                      L 165 285
                      L 130 280
                      L 150 255
                      L 130 245
                      L 150 220
                      L 120 205
                      L 145 185
                      L 170 160
                      L 190 140
                      L 205 175
                      L 215 210
                      L 265 200
                      L 240 230
                      L 260 260
                      L 250 305
                      L 225 320
                      L 210 340
                      L 160 340
                      Z
                    `}
                    fill="#DDA658"
                    stroke={selectedAreaId === 'bello-c5' ? '#FFFFFF' : '#374151'}
                    strokeWidth={selectedAreaId === 'bello-c5' ? 4 : 1.5}
                    filter={selectedAreaId === 'bello-c5' ? 'url(#bello-selected-shadow)' : undefined}
                    className="hover:brightness-110"
                  />
                  <text x="210" y="248" textAnchor="middle" fill="#1F2937" fontSize="16" fontWeight="900">5</text>
                  <text x="210" y="268" textAnchor="middle" fill="#1F2937" fontSize="13" fontWeight="800">La Cumbre</text>
                </g>

                {/* 6. COMUNA 6: BELLAVISTA (Lavanda Malva #B499C0) */}
                <g
                  id="bello-c6"
                  onClick={() => onSelectArea('bello-c6')}
                  onMouseEnter={() => setHoveredCommuneId('bello-c6')}
                  onMouseLeave={() => setHoveredCommuneId(null)}
                  className="cursor-pointer transition-all duration-200"
                >
                  <path
                    d={`
                      M 190 140
                      L 160 75
                      L 185 55
                      L 215 75
                      L 245 65
                      L 260 75
                      L 285 90
                      L 315 95
                      L 335 120
                      L 345 105
                      L 365 120
                      L 335 150
                      L 305 200
                      L 265 200
                      L 215 210
                      L 205 175
                      Z
                    `}
                    fill="#B499C0"
                    stroke={selectedAreaId === 'bello-c6' ? '#FFFFFF' : '#374151'}
                    strokeWidth={selectedAreaId === 'bello-c6' ? 4 : 1.5}
                    filter={selectedAreaId === 'bello-c6' ? 'url(#bello-selected-shadow)' : undefined}
                    className="hover:brightness-110"
                  />
                  <text x="250" y="145" textAnchor="middle" fill="#1F2937" fontSize="16" fontWeight="900">6</text>
                  <text x="250" y="165" textAnchor="middle" fill="#1F2937" fontSize="13" fontWeight="800">Bellavista</text>
                </g>

                {/* 7. COMUNA 7: ALTOS DE NIQUIA (Azul Periwinkle #798CBE) */}
                <g
                  id="bello-c7"
                  onClick={() => onSelectArea('bello-c7')}
                  onMouseEnter={() => setHoveredCommuneId('bello-c7')}
                  onMouseLeave={() => setHoveredCommuneId(null)}
                  className="cursor-pointer transition-all duration-200"
                >
                  <path
                    d={`
                      M 365 120
                      L 380 130
                      L 395 145
                      L 410 135
                      L 425 160
                      L 440 150
                      L 455 170
                      L 380 200
                      L 355 245
                      L 330 220
                      L 305 200
                      L 335 150
                      Z
                    `}
                    fill="#798CBE"
                    stroke={selectedAreaId === 'bello-c7' ? '#FFFFFF' : '#374151'}
                    strokeWidth={selectedAreaId === 'bello-c7' ? 4 : 1.5}
                    filter={selectedAreaId === 'bello-c7' ? 'url(#bello-selected-shadow)' : undefined}
                    className="hover:brightness-110"
                  />
                  <text x="368" y="170" textAnchor="middle" fill="#1F2937" fontSize="15" fontWeight="900">7</text>
                  <text x="368" y="188" textAnchor="middle" fill="#1F2937" fontSize="12" fontWeight="800">Altos de Niquia</text>
                </g>

                {/* 8. COMUNA 8: NIQUIA (Verde Salvia/Musgo Suave #8AB183) */}
                <g
                  id="bello-c8"
                  onClick={() => onSelectArea('bello-c8')}
                  onMouseEnter={() => setHoveredCommuneId('bello-c8')}
                  onMouseLeave={() => setHoveredCommuneId(null)}
                  className="cursor-pointer transition-all duration-200"
                >
                  <path
                    d={`
                      M 455 170
                      L 480 135
                      L 495 155
                      L 530 150
                      L 560 160
                      L 660 110
                      L 685 100
                      L 735 80
                      L 700 115
                      L 705 155
                      L 690 185
                      L 670 235
                      L 640 260
                      L 585 275
                      L 535 275
                      L 485 305
                      L 440 310
                      L 395 335
                      L 400 305
                      L 355 245
                      L 380 200
                      Z
                    `}
                    fill="#8AB183"
                    stroke={selectedAreaId === 'bello-c8' ? '#FFFFFF' : '#374151'}
                    strokeWidth={selectedAreaId === 'bello-c8' ? 4 : 1.5}
                    filter={selectedAreaId === 'bello-c8' ? 'url(#bello-selected-shadow)' : undefined}
                    className="hover:brightness-110"
                  />
                  <text x="525" y="218" textAnchor="middle" fill="#1F2937" fontSize="16" fontWeight="900">8</text>
                  <text x="525" y="238" textAnchor="middle" fill="#1F2937" fontSize="14" fontWeight="800">Niquia</text>
                </g>

                {/* 9. COMUNA 9: FONTIDUEÑO (Gris Rosáceo/Malva #A7919B) */}
                <g
                  id="bello-c9"
                  onClick={() => onSelectArea('bello-c9')}
                  onMouseEnter={() => setHoveredCommuneId('bello-c9')}
                  onMouseLeave={() => setHoveredCommuneId(null)}
                  className="cursor-pointer transition-all duration-200"
                >
                  <path
                    d={`
                      M 395 335
                      L 440 310
                      L 485 305
                      L 535 275
                      L 530 320
                      L 545 375
                      L 510 355
                      L 495 385
                      L 470 360
                      L 450 395
                      L 420 370
                      L 400 395
                      L 375 365
                      L 365 385
                      L 350 420
                      Z
                    `}
                    fill="#A7919B"
                    stroke={selectedAreaId === 'bello-c9' ? '#FFFFFF' : '#374151'}
                    strokeWidth={selectedAreaId === 'bello-c9' ? 4 : 1.5}
                    filter={selectedAreaId === 'bello-c9' ? 'url(#bello-selected-shadow)' : undefined}
                    className="hover:brightness-110"
                  />
                  <text x="445" y="355" textAnchor="middle" fill="#1F2937" fontSize="16" fontWeight="900">9</text>
                  <text x="445" y="375" textAnchor="middle" fill="#1F2937" fontSize="13" fontWeight="800">Fontidueño</text>
                </g>

                {/* 10. COMUNA 10: ACEVEDO (Trigo Dorado/Arena #C8B17B) */}
                <g
                  id="bello-c10"
                  onClick={() => onSelectArea('bello-c10')}
                  onMouseEnter={() => setHoveredCommuneId('bello-c10')}
                  onMouseLeave={() => setHoveredCommuneId(null)}
                  className="cursor-pointer transition-all duration-200"
                >
                  <path
                    d={`
                      M 350 420
                      L 365 385
                      L 375 365
                      L 400 395
                      L 420 370
                      L 450 395
                      L 470 360
                      L 495 385
                      L 510 355
                      L 545 375
                      L 440 430
                      L 420 470
                      L 445 495
                      L 420 555
                      L 445 630
                      L 415 615
                      L 380 600
                      L 345 590
                      L 310 580
                      L 345 470
                      Z
                    `}
                    fill="#C8B17B"
                    stroke={selectedAreaId === 'bello-c10' ? '#FFFFFF' : '#374151'}
                    strokeWidth={selectedAreaId === 'bello-c10' ? 4 : 1.5}
                    filter={selectedAreaId === 'bello-c10' ? 'url(#bello-selected-shadow)' : undefined}
                    className="hover:brightness-110"
                  />
                  <text x="385" y="505" textAnchor="middle" fill="#1F2937" fontSize="16" fontWeight="900">10</text>
                  <text x="385" y="525" textAnchor="middle" fill="#1F2937" fontSize="13" fontWeight="800">Acevedo</text>
                </g>

                {/* ========================================================================= */}
                {/* LÍNEA VIBRANTE DEL RÍO MEDELLÍN (AZUL INTENSO TAL CUAL LA IMAGEN)         */}
                {/* ========================================================================= */}
                <path
                  d={`
                    M 310 580
                    L 340 475
                    L 348 420
                    L 395 335
                    L 440 310
                    L 485 305
                    L 535 275
                    L 585 275
                    L 640 260
                    L 670 235
                    L 690 185
                    L 715 180
                    L 740 185
                  `}
                  fill="none"
                  stroke="#0033E6"
                  strokeWidth="8.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="drop-shadow-sm"
                />

                {/* TEXTO RÍO MEDELLÍN SOBRE LA TRAYECTORIA DEL RÍO */}
                <text 
                  x="430" 
                  y="300" 
                  fill="#0F172A" 
                  fontSize="10" 
                  fontWeight="800" 
                  fontStyle="italic"
                  transform="rotate(-15 430 300)"
                >
                  Río Medellín
                </text>

                {/* ========================================================================= */}
                {/* ROSA DE LOS VIENTOS (SÍMBOLO DEL NORTE SEGÚN LA IMAGEN)                   */}
                {/* ========================================================================= */}
                <g transform="translate(525, 545)">
                  <circle cx="0" cy="0" r="36" fill="none" stroke="#1F2937" strokeWidth="1.6" />
                  <line x1="0" y1="-46" x2="0" y2="46" stroke="#1F2937" strokeWidth="1.6" />
                  <line x1="-46" y1="0" x2="46" y2="0" stroke="#1F2937" strokeWidth="1.6" />
                  {/* Cuadrante superior derecho sombreado como en el plano */}
                  <path d="M 0 0 L 0 -36 A 36 36 0 0 1 36 0 Z" fill="#1F2937" />
                </g>

              </svg>
            </div>
          )}

          {/* MODO 2: SATELITAL / OPENSTREETMAP LEAFLET */}
          {activeTab === 'satellite' && (
            <div className="w-full h-[520px] rounded-3xl overflow-hidden relative border border-white/10 shadow-sm">
              <div ref={mapContainerRef} className="w-full h-full z-0" />
              <div className="absolute top-3 left-3 z-[1000] bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/95 backdrop-blur-xs px-3 py-1.5 rounded-xl shadow-md border border-white/10 text-xs font-bold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
                <span>Georreferenciación en Vivo • Comunas de Bello</span>
              </div>
            </div>
          )}

          {/* MODO 3: GRILLA COMPLETA DE BARRIOS Y COMUNAS */}
          {activeTab === 'barrios' && (
            <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10/80 rounded-3xl p-5 border border-white/10 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <h4 className="text-xs font-black uppercase text-slate-200 tracking-wider flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-blue-700" />
                  Catálogo Barrial por Comunas de Bello (10 Divisiones)
                </h4>
                <span className="text-[11px] font-bold text-slate-400">Haz clic en cualquier comuna</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[460px] overflow-y-auto pr-1">
                {Object.entries(BELLO_COMMUNES_CONFIG).map(([cId, meta]) => {
                  const isSelected = selectedAreaId === cId;
                  return (
                    <div
                      key={cId}
                      onClick={() => onSelectArea(cId)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-sky-500/10/90 border-blue-600 shadow-sm ring-1 ring-blue-600'
                          : 'bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl hover:bg-white/[0.04] backdrop-blur-sm border border-white/10 border-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-4 h-4 rounded-full border border-black/10 shrink-0 flex items-center justify-center text-[9px] font-black text-white"
                            style={{ backgroundColor: meta.fillColor }}
                          >
                            {meta.number}
                          </div>
                          <span className={`text-xs font-black ${isSelected ? 'text-blue-900' : 'text-white'}`}>
                            Comuna {meta.number} - {meta.name}
                          </span>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-blue-700 shrink-0" />}
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {meta.barrios.map((b, bIdx) => (
                          <span key={bIdx} className="bg-slate-100 text-slate-200 px-2 py-0.5 rounded-md text-[10px] font-medium">
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* COLUMNA LATERAL: FICHA DETALLADA Y LEYENDA (4 COLS) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* FICHA TÉCNICA DE LA COMUNA SELECCIONADA */}
          <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10/80 rounded-2xl p-4 border border-white/10 space-y-3">
            
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-900 bg-sky-500/20 text-sky-300/80 px-2 py-0.5 rounded-md">
                División Seleccionada
              </span>
              <span className="text-[10px] font-extrabold text-slate-400">
                Urbana ({activeArea?.type || 'Comuna'})
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded-full shrink-0 shadow-2xs border border-white"
                  style={{ backgroundColor: activeCommuneMeta.fillColor }}
                />
                <h3 className="text-base font-black text-white leading-snug">
                  Comuna {activeCommuneMeta.number} - {activeCommuneMeta.name}
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
                {activeArea?.characteristics || activeCommuneMeta.description}
              </p>
            </div>

            {/* Métricas clave */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-2.5 rounded-xl border border-white/10 shadow-2xs">
                <span className="text-[9px] font-bold text-slate-400 uppercase block">Población Est.</span>
                <span className="text-sm font-black text-white block mt-0.5">
                  {activeArea?.estimatedPopulation ? activeArea.estimatedPopulation.toLocaleString() + ' hab.' : '50.000 hab.'}
                </span>
                <span className="text-[9px] text-slate-400 font-medium">DANE / Planeación</span>
              </div>
              <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-2.5 rounded-xl border border-white/10 shadow-2xs">
                <span className="text-[9px] font-bold text-slate-400 uppercase block">Estrato Dominante</span>
                <span className="text-sm font-black text-blue-900 block mt-0.5">
                  {activeArea?.predominantStratum || 'Medio (3-4)'}
                </span>
                <span className="text-[9px] text-slate-400 font-medium">Nivel: {activeArea?.educationalLevelGeneral || 'Medio'}</span>
              </div>
            </div>

            {/* Barrios que comprende */}
            <div className="text-[11px] text-slate-300 pt-1">
              <strong className="text-slate-200">Barrios y sectores oficiales:</strong>
              <div className="flex flex-wrap gap-1 mt-1.5 max-h-28 overflow-y-auto pr-1">
                {(activeArea?.barriosOrVeredas || activeCommuneMeta.barrios).map((barrio, idx) => (
                  <span key={idx} className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl text-slate-200 px-2 py-0.5 rounded-md border border-white/10 text-[10px] font-bold shadow-2xs">
                    {barrio}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* LEYENDA OFICIAL CROMÁTICA (10 COMUNAS) */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl rounded-2xl p-4 border border-white/10 space-y-2.5">
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-150">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-blue-700" />
                Leyenda de Comunas
              </span>
              <span className="text-[9px] text-slate-400 font-bold">10 Polígonos</span>
            </div>

            <div className="space-y-1 max-h-[300px] overflow-y-auto pr-1">
              {Object.entries(BELLO_COMMUNES_CONFIG).map(([id, meta]) => {
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
                    <div 
                      className="w-4 h-4 rounded-full shrink-0 shadow-2xs border border-black/10 flex items-center justify-center text-[9px] font-black text-white"
                      style={{ backgroundColor: meta.fillColor }}
                    >
                      {meta.number}
                    </div>

                    <div className="truncate flex-1">
                      <span className={`block truncate font-bold text-[11px] ${isSelected ? 'text-blue-950 font-black' : 'text-white'}`}>
                        C{meta.number} - {meta.name}
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

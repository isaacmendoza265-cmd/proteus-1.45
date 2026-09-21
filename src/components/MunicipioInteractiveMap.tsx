import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  MapPin,
  Layers,
  Search,
  Users,
  Compass,
  Building2,
  Home,
  CheckCircle2,
  AlertTriangle,
  Info,
  GraduationCap,
  Briefcase,
  ExternalLink,
  Filter,
  Eye
} from 'lucide-react';
import { ALL_MUNICIPIOS_TERRITORIAL_DATA, AreaTerritorialProfile } from '../data/allMunicipiosTerritorialData';
import { BelloInteractiveMap } from './BelloInteractiveMap';

interface MunicipioInteractiveMapProps {
  muniId: string;
  selectedAreaId?: string;
  onSelectArea: (areaId: string) => void;
}

export const MunicipioInteractiveMap: React.FC<MunicipioInteractiveMapProps> = ({
  muniId,
  selectedAreaId,
  onSelectArea
}) => {
  if (muniId === 'bello') {
    return (
      <BelloInteractiveMap
        selectedAreaId={selectedAreaId}
        onSelectArea={onSelectArea}
      />
    );
  }

  const config = ALL_MUNICIPIOS_TERRITORIAL_DATA[muniId] || ALL_MUNICIPIOS_TERRITORIAL_DATA['rionegro'];
  const [activeTab, setActiveTab] = useState<'oficial' | 'satellite' | 'barrios'>('oficial');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterZone, setFilterZone] = useState<'all' | 'Urbana' | 'Rural'>('all');

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const leafletInstanceRef = useRef<L.Map | null>(null);

  const activeArea = config.areas.find(a => a.id === selectedAreaId) || config.areas[0];

  // Sincronizar mapa de Leaflet
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
        center: config.centerCoords,
        zoom: config.defaultZoom,
        zoomControl: true
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18
      }).addTo(map);

      // Marcadores en cada área
      config.areas.forEach((area) => {
        const marker = L.circleMarker(area.coords, {
          radius: area.zone === 'Urbana' ? 12 : 15,
          fillColor: area.color,
          color: '#FFFFFF',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.85
        }).addTo(map);

        marker.bindPopup(`
          <div style="font-family: system-ui, sans-serif; min-width: 190px;">
            <div style="font-size: 10px; font-weight: 800; color: #64748b; text-transform: uppercase;">
              ${area.type}
            </div>
            <div style="font-size: 13px; font-weight: 900; color: #0f172a; margin-top: 2px;">
              ${area.name}
            </div>
            <div style="font-size: 11px; color: #1e293b; font-weight: 700; margin-top: 4px;">
              ${area.populationText}
            </div>
            <p style="font-size: 11px; color: #475569; margin: 4px 0 0 0;">
              ${area.barriosList.length > 0 ? `${area.barriosList.length} barrios/veredas registrados` : 'Sin datos de barrios'}
            </p>
          </div>
        `);

        marker.on('click', () => {
          onSelectArea(area.id);
        });
      });

      leafletInstanceRef.current = map;
    } else {
      leafletInstanceRef.current.flyTo(activeArea.coords, activeArea.zone === 'Urbana' ? 14 : 13, {
        duration: 1.0
      });
    }

    return () => {
      // Cleanup
    };
  }, [activeTab, selectedAreaId, config, activeArea, onSelectArea]);

  // Filtrado de áreas
  const filteredAreas = config.areas.filter(a => {
    const matchesZone = filterZone === 'all' || a.zone === filterZone;
    const matchesSearch = searchQuery.trim() === '' ||
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.barriosList.some(b => b.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesZone && matchesSearch;
  });

  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl rounded-3xl p-5 sm:p-7 shadow-sm border border-white/10 space-y-6">
      
      {/* CABECERA DE LA HERRAMIENTA INTERACTIVA */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-150">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-900 text-white shadow-2xs">
              FIGURA CARTOGRÁFICA INTERACTIVA
            </span>
            <span className="text-[10px] font-extrabold text-blue-800 bg-sky-500/10 px-2.5 py-0.5 rounded-full border border-blue-200">
              {config.fullName.toUpperCase()}
            </span>
            <span className="text-[10px] font-bold text-slate-400">
              {config.areas.length} divisiones territoriales
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1.5 flex items-center gap-2">
            <span>Mapa Político-Administrativo e Inspección Territorial</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-3xl mt-0.5">
            Explore las comunas, corregimientos, barrios y veredas de {config.name}. Si algún indicador sociodemográfico no cuenta con desagregación oficial a nivel barrial o comunal, se indica expresamente como <span className="font-bold text-amber-700">"Sin datos"</span>.
          </p>
        </div>

        {/* Selector de Pestañas de Vista */}
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
            <span>Esquema Territorial</span>
          </button>
          <button
            onClick={() => setActiveTab('satellite')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              activeTab === 'satellite'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-cyan-300" />
            <span>Mapa Satelital / GPS</span>
          </button>
          <button
            onClick={() => setActiveTab('barrios')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              activeTab === 'barrios'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Directorio de Barrios</span>
          </button>
        </div>
      </div>

      {/* BARRA DE BÚSQUEDA Y FILTROS */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white/[0.04] backdrop-blur-sm border border-white/10 p-3 rounded-2xl border border-white/10">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar comuna, barrio o vereda..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl border border-white/10 rounded-xl text-xs text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/30"
          />
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            Zona:
          </span>
          <button
            onClick={() => setFilterZone('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              filterZone === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl text-slate-300 hover:bg-slate-200/70 border border-white/10'
            }`}
          >
            Todas ({config.areas.length})
          </button>
          <button
            onClick={() => setFilterZone('Urbana')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              filterZone === 'Urbana'
                ? 'bg-blue-800 text-white'
                : 'bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl text-slate-300 hover:bg-slate-200/70 border border-white/10'
            }`}
          >
            Urbanas ({config.areas.filter(a => a.zone === 'Urbana').length})
          </button>
          <button
            onClick={() => setFilterZone('Rural')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              filterZone === 'Rural'
                ? 'bg-emerald-800 text-white'
                : 'bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl text-slate-300 hover:bg-slate-200/70 border border-white/10'
            }`}
          >
            Rurales ({config.areas.filter(a => a.zone === 'Rural').length})
          </button>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL SEGÚN PESTAÑA */}
      {activeTab === 'satellite' && (
        <div className="space-y-3">
          <div
            ref={mapContainerRef}
            className="h-[520px] w-full rounded-2xl border border-white/10 overflow-hidden shadow-inner z-0"
          />
          <div className="flex items-center justify-between text-[11px] text-slate-400 px-2">
            <span>Haga clic sobre cualquier marcador para centrar e inspeccionar la comuna o vereda.</span>
            <span className="font-bold text-slate-200">OpenStreetMap • Leaflet GPS</span>
          </div>
        </div>
      )}

      {activeTab === 'oficial' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Grilla de sectores interactivos (Col 7) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-white/10">
              <span className="text-xs font-black uppercase tracking-wider text-white">
                Divisiones Territoriales de {config.name}
              </span>
              <span className="text-[10px] text-slate-400 font-bold">
                Mostrando {filteredAreas.length} sectores
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[560px] overflow-y-auto pr-1">
              {filteredAreas.map((area) => {
                const isSelected = area.id === activeArea.id;
                return (
                  <button
                    key={area.id}
                    onClick={() => onSelectArea(area.id)}
                    className={`p-3.5 rounded-2xl text-left transition-all border flex flex-col justify-between space-y-2.5 ${
                      isSelected
                        ? 'bg-blue-900 text-white shadow-md border-blue-950 scale-[1.01]'
                        : 'bg-white/[0.04] backdrop-blur-sm border border-white/10 hover:bg-slate-100 text-white border-white/10/90'
                    }`}
                  >
                    <div className="flex items-start justify-between w-full">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full shrink-0 border border-white/50"
                          style={{ backgroundColor: area.color }}
                        />
                        <span className={`text-[10px] font-black uppercase ${isSelected ? 'text-blue-200' : 'text-slate-400'}`}>
                          {area.type}
                        </span>
                      </div>
                      <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-md ${
                        isSelected ? 'bg-blue-800 text-white' : 'bg-slate-200/80 text-slate-200'
                      }`}>
                        Zona {area.zone}
                      </span>
                    </div>

                    <div>
                      <h4 className={`text-sm font-black leading-tight ${isSelected ? 'text-white' : 'text-white'}`}>
                        {area.name}
                      </h4>
                      <p className={`text-xs mt-0.5 line-clamp-1 ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                        {area.populationText}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/10/50 flex items-center justify-between text-[10px]">
                      <span className={isSelected ? 'text-blue-200' : 'text-slate-300'}>
                        {area.barriosList.length > 0 ? `${area.barriosList.length} barrios / sectores` : 'Sin datos de barrios'}
                      </span>
                      <span className={`font-bold ${isSelected ? 'text-white' : 'text-blue-800'}`}>
                        Ver ficha →
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Ficha de detalle territorial del área seleccionada (Col 5) */}
          <div className="lg:col-span-5 bg-white/[0.04] backdrop-blur-sm border border-white/10/80 p-5 rounded-3xl border border-white/10 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: activeArea.color }}
                    />
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      {activeArea.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-white mt-1">
                    {activeArea.name}
                  </h3>
                  <span className="text-xs text-blue-700 font-extrabold block">
                    Zona {activeArea.zone} • {config.name}
                  </span>
                </div>

                <div className="text-right bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-2 rounded-xl border border-white/10 shadow-2xs">
                  <span className="text-[9px] font-black text-slate-400 block uppercase">Población</span>
                  <span className="text-xs font-black text-white">
                    {activeArea.populationText}
                  </span>
                </div>
              </div>

              {/* Indicadores clave con mención clara de "Sin datos" */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-2.5 rounded-xl border border-white/10 shadow-2xs">
                  <span className="text-[9px] font-bold text-slate-400 uppercase block">Estrato</span>
                  <span className="font-extrabold text-white mt-0.5 block">
                    {activeArea.strataText || (
                      <span className="text-amber-700 font-bold bg-amber-500/10 px-1.5 py-0.5 rounded text-[10px]">
                        Sin datos
                      </span>
                    )}
                  </span>
                </div>

                <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-2.5 rounded-xl border border-white/10 shadow-2xs">
                  <span className="text-[9px] font-bold text-slate-400 uppercase block">Juventud (14-28)</span>
                  <span className="font-extrabold text-white mt-0.5 block">
                    {activeArea.youthSharePercentage !== null && activeArea.youthSharePercentage !== undefined ? (
                      `${activeArea.youthSharePercentage}% del municipio`
                    ) : (
                      <span className="text-amber-700 font-bold bg-amber-500/10 px-1.5 py-0.5 rounded text-[10px]">
                        Sin datos
                      </span>
                    )}
                  </span>
                </div>

                <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-2.5 rounded-xl border border-white/10 shadow-2xs">
                  <span className="text-[9px] font-bold text-slate-400 uppercase block">Educación Comunal</span>
                  <span className="font-extrabold text-white mt-0.5 block">
                    {activeArea.educationLevelText.includes('Sin datos') ? (
                      <span className="text-amber-700 font-bold bg-amber-500/10 px-1.5 py-0.5 rounded text-[10px]">
                        Sin datos
                      </span>
                    ) : (
                      activeArea.educationLevelText
                    )}
                  </span>
                </div>

                <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-2.5 rounded-xl border border-white/10 shadow-2xs">
                  <span className="text-[9px] font-bold text-slate-400 uppercase block">Desempleo Comunal</span>
                  <span className="font-extrabold text-white mt-0.5 block">
                    {activeArea.specificMetrics?.unemploymentRate ? (
                      `${activeArea.specificMetrics.unemploymentRate}%`
                    ) : (
                      <span className="text-amber-700 font-bold bg-amber-500/10 px-1.5 py-0.5 rounded text-[10px]">
                        Sin datos
                      </span>
                    )}
                  </span>
                </div>
              </div>

              {/* Barrios o Veredas componentes */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                    {activeArea.zone === 'Urbana' ? 'Barrios Integrantes' : 'Veredas Integrantes'}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">
                    {activeArea.barriosList.length} registrados
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1 bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl rounded-xl border border-white/10">
                  {activeArea.barriosList.map((b, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-medium px-2 py-0.5 bg-white/[0.04] backdrop-blur-sm border border-white/10 text-slate-200 rounded-md border border-white/10 flex items-center gap-1"
                    >
                      <span>{b.name}</span>
                      {!b.hasData && (
                        <span className="text-[8px] font-black text-amber-700 bg-amber-500/20 text-amber-300/80 px-1 py-0.2 rounded">
                          Sin datos
                        </span>
                      )}
                    </span>
                  ))}
                  {activeArea.barriosList.length === 0 && (
                    <span className="text-xs text-amber-700 italic p-2">
                      Sin datos desagregados de barrios para esta zona.
                    </span>
                  )}
                </div>
              </div>

              {/* Hitos y Caracterización */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                  Hitos Urbanos y Puntos Clave
                </span>
                <div className="space-y-1">
                  {activeArea.specificMetrics?.keyLandmarks?.map((l, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{l}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Aviso metodológico */}
            <div className="bg-amber-500/10/70 p-2.5 rounded-xl border border-amber-200 text-[10px] text-amber-900 flex items-start gap-2">
              <Info className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
              <span>
                Donde no se cuente con microdato censal o encuesta de calidad de vida desagregada por barrio o comuna, el sistema rotula <strong>"Sin datos"</strong> para preservar el rigor estadístico.
              </span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'barrios' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-150">
            <div>
              <h4 className="text-sm font-black text-white uppercase tracking-wider">
                Directorio Completo de Barrios y Veredas ({config.name})
              </h4>
              <p className="text-xs text-slate-400">
                Listado de sectores territoriales reconocidos por planeación municipal con estado de información disponible.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[550px] overflow-y-auto pr-1">
            {config.areas.flatMap(a => 
              a.barriosList.map(b => ({
                ...b,
                areaName: a.name,
                areaType: a.type,
                areaColor: a.color,
                areaId: a.id
              }))
            ).filter(b => searchQuery.trim() === '' || b.name.toLowerCase().includes(searchQuery.toLowerCase()) || b.areaName.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((item, idx) => (
              <div
                key={idx}
                onClick={() => onSelectArea(item.areaId)}
                className="p-3 bg-white/[0.04] backdrop-blur-sm border border-white/10 hover:bg-sky-500/10/60 rounded-xl border border-white/10 hover:border-blue-300 transition-all cursor-pointer flex items-start justify-between gap-2"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: item.areaColor }}
                    />
                    <span className="text-[10px] font-black uppercase text-slate-400">
                      {item.areaName}
                    </span>
                  </div>
                  <div className="text-xs font-black text-white mt-1">
                    {item.name}
                  </div>
                </div>

                <div>
                  {item.hasData ? (
                    <span className="text-[9px] font-black text-emerald-700 bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">
                      {item.percentage}% juventud
                    </span>
                  ) : (
                    <span className="text-[9px] font-black text-amber-800 bg-amber-500/20 text-amber-300/90 border border-amber-200 px-1.5 py-0.5 rounded">
                      Sin datos
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

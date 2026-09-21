import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  ZoomLevelId, 
  ThematicMetricLayer, 
  TerritoryGeoFeature, 
  GEOJSON_LAYERS_BY_ZOOM, 
  ZOOM_LEVELS_CONFIG,
  ANTIOQUIA_125_MUNICIPIOS_GEOJSON
} from '../../data/geojson';
import { Maximize2, Layers, Compass, Sparkles, Map, Building } from 'lucide-react';

interface MultiLevelZoomMapProps {
  currentLevel: ZoomLevelId;
  activeLayer: ThematicMetricLayer;
  searchQuery: string;
  selectedFeature: TerritoryGeoFeature | null;
  onSelectFeature: (feature: TerritoryGeoFeature | null) => void;
  onDrillDown: (targetLevel: ZoomLevelId, featureId: string) => void;
}

export const MultiLevelZoomMap: React.FC<MultiLevelZoomMapProps> = ({
  currentLevel,
  activeLayer,
  searchQuery,
  selectedFeature,
  onSelectFeature,
  onDrillDown
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const geoJsonLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const [hoveredFeature, setHoveredFeature] = useState<TerritoryGeoFeature | null>(null);
  const [mapBaseTheme, setMapBaseTheme] = useState<'dark' | 'voyager'>('dark');
  const [antioquiaViewMode, setAntioquiaViewMode] = useState<'subregiones' | 'municipios'>('municipios');

  // Helper: Color logic by layer
  const getFeatureColor = (feature: TerritoryGeoFeature): string => {
    const p = feature.properties;
    
    if (activeLayer === 'electoral') {
      if (p.winnerParty?.includes('Creemos')) return '#38bdf8';
      if (p.predominantParty?.includes('Centro Democrático') || p.predominantParty?.includes('Creemos')) return '#0284c7';
      if (p.predominantParty?.includes('Liberal')) return '#f43f5e';
      if (p.predominantParty?.includes('Conservador')) return '#3b82f6';
      if (p.predominantParty?.includes('Pacto')) return '#a855f7';
      if (p.predominantParty?.includes('Verde')) return '#10b981';
      return p.colorCode || '#6366f1';
    }

    if (activeLayer === 'demografico') {
      if (p.predominantStratum) {
        if (p.predominantStratum.includes('Alto') || p.predominantStratum.includes('5-6')) return '#10b981';
        if (p.predominantStratum.includes('Medio') || p.predominantStratum.includes('3-4')) return '#06b6d4';
        return '#f59e0b';
      }
      const pop = p.population || 0;
      if (pop > 2000000) return '#6366f1';
      if (pop > 500000) return '#0ea5e9';
      if (pop > 150000) return '#10b981';
      return '#f59e0b';
    }

    if (activeLayer === 'nbi') {
      const nbi = p.nbiPercentage || 0;
      if (nbi > 40) return '#ef4444';
      if (nbi > 25) return '#f97316';
      if (nbi > 15) return '#f59e0b';
      if (nbi > 10) return '#10b981';
      return '#06b6d4';
    }

    if (activeLayer === 'riesgo') {
      const r = p.riskLevel;
      if (r === 'Crítico') return '#ef4444';
      if (r === 'Alto') return '#f97316';
      if (r === 'Medio') return '#f59e0b';
      return '#10b981';
    }

    return p.colorCode || '#38bdf8';
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const currentConfig = GEOJSON_LAYERS_BY_ZOOM[currentLevel];
      const map = L.map(mapContainerRef.current, {
        center: currentConfig.center,
        zoom: currentConfig.defaultZoom,
        zoomControl: false,
        attributionControl: false
      });

      // OpenStreetMap standard tiles (No API key required, reliable)
      const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

      L.tileLayer(tileUrl, {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap'
      }).addTo(map);

      // Dedicated layer group for GeoJSON
      const lg = L.layerGroup().addTo(map);
      geoJsonLayerGroupRef.current = lg;
      mapInstanceRef.current = map;
    }

    return () => {
      // Cleanup on full unmount
    };
  }, []);

  // Update Basemap if theme changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    L.tileLayer(tileUrl, {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap'
    }).addTo(map);
  }, [mapBaseTheme]);

  // Synchronize GeoJSON features and camera transitions when currentLevel, activeLayer, or searchQuery changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layerGroup = geoJsonLayerGroupRef.current;
    if (!map || !layerGroup) return;

    layerGroup.clearLayers();

    let dataset = GEOJSON_LAYERS_BY_ZOOM[currentLevel];
    if (currentLevel === 'departamental' && antioquiaViewMode === 'municipios') {
      dataset = ANTIOQUIA_125_MUNICIPIOS_GEOJSON;
    }
    if (!dataset) return;

    // Filter features if searchQuery is present
    const filteredFeatures = dataset.features.filter((f) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        f.properties.name.toLowerCase().includes(q) ||
        ((f.properties as any).daneCode && (f.properties as any).daneCode.includes(q)) ||
        (f.properties.predominantParty && f.properties.predominantParty.toLowerCase().includes(q)) ||
        (f.properties.subregion && f.properties.subregion.toLowerCase().includes(q))
      );
    });

    const geoJsonData: any = {
      type: 'FeatureCollection',
      features: filteredFeatures
    };

    const leafletGeoJson = L.geoJSON(geoJsonData, {
      style: (feat: any) => {
        const feature = feat as TerritoryGeoFeature;
        const isSelected = selectedFeature?.id === feature.id;
        const color = getFeatureColor(feature);

        return {
          fillColor: color,
          fillOpacity: isSelected ? 0.65 : 0.35,
          color: isSelected ? '#ffffff' : color,
          weight: isSelected ? 3 : 1.5,
          dashArray: isSelected ? '' : '2, 2',
          opacity: 0.95
        };
      },
      onEachFeature: (feat: any, layer: L.Layer) => {
        const feature = feat as TerritoryGeoFeature;
        const p = feature.properties;

        // Hover events
        layer.on({
          mouseover: (e: any) => {
            const l = e.target;
            l.setStyle({
              fillOpacity: 0.7,
              weight: 2.5,
              color: '#38bdf8'
            });
            l.bringToFront();
            setHoveredFeature(feature);
          },
          mouseout: (e: any) => {
            const l = e.target;
            const isSelected = selectedFeature?.id === feature.id;
            const color = getFeatureColor(feature);
            l.setStyle({
              fillColor: color,
              fillOpacity: isSelected ? 0.65 : 0.35,
              color: isSelected ? '#ffffff' : color,
              weight: isSelected ? 3 : 1.5,
              dashArray: isSelected ? '' : '2, 2'
            });
            setHoveredFeature(null);
          },
          click: (e: any) => {
            onSelectFeature(feature);

            // If feature has bounds or layer getBounds, fit smoothly
            if (p.bounds) {
              map.flyToBounds(p.bounds as L.LatLngBoundsExpression, {
                duration: 1.0,
                padding: [40, 40]
              });
            } else if ((layer as any).getBounds) {
              map.flyToBounds((layer as any).getBounds(), {
                duration: 1.0,
                padding: [40, 40]
              });
            }

            // Direct double click drill-down trigger if interactive
            if (p.isInteractiveTarget) {
              const cfg = ZOOM_LEVELS_CONFIG[currentLevel];
              if (cfg.nextLevelId) {
                onDrillDown(cfg.nextLevelId, feature.id);
              }
            }
          }
        });

        // Tooltip
        const metricDisplay = 
          activeLayer === 'electoral' ? `Ganador: ${p.predominantParty || p.winnerCandidate || 'Registrado'}` :
          activeLayer === 'demografico' ? `Pob: ${(p.population || 0).toLocaleString()} hab` :
          activeLayer === 'nbi' ? `NBI: ${p.nbiPercentage}%` :
          `Riesgo: ${p.riskLevel || 'Normal'}`;

        const daneCodeHtml = (p as any).daneCode ? `<div style="color: #38bdf8; font-size: 9px; font-family: monospace;">DIVIPOLA DANE: ${(p as any).daneCode}</div>` : '';
        const subregHtml = p.subregion ? `<div style="color: #94a3b8; font-size: 10px;">Subregión: ${p.subregion}</div>` : '';

        layer.bindTooltip(
          `<div style="font-family: system-ui, sans-serif; font-weight: 700; font-size: 11px;">
            <div style="color: #38bdf8; font-size: 9px; text-transform: uppercase;">${p.level}</div>
            <div style="color: #ffffff; font-size: 12px; font-weight: 900;">${p.name}</div>
            ${daneCodeHtml}
            ${subregHtml}
            <div style="color: #cbd5e1; margin-top: 2px;">${metricDisplay}</div>
            ${p.isInteractiveTarget ? '<div style="color: #34d399; font-size: 9px; margin-top: 3px;">✨ Clic para hacer zoom</div>' : ''}
          </div>`,
          { sticky: true, className: 'leaflet-glass-tooltip' }
        );
      }
    });

    layerGroup.addLayer(leafletGeoJson);

    // Smoothly fly camera to current level dataset default bounds
    map.flyTo(dataset.center, dataset.defaultZoom, {
      duration: 1.2,
      easeLinearity: 0.25
    });

  }, [currentLevel, activeLayer, searchQuery, selectedFeature, antioquiaViewMode]);

  // Recenter helper
  const handleRecenter = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const dataset = (currentLevel === 'departamental' && antioquiaViewMode === 'municipios')
      ? ANTIOQUIA_125_MUNICIPIOS_GEOJSON
      : GEOJSON_LAYERS_BY_ZOOM[currentLevel];
    if (dataset) {
      map.flyTo(dataset.center, dataset.defaultZoom, { duration: 0.8 });
    }
  };

  return (
    <div className="relative w-full h-[620px] rounded-3xl overflow-hidden border border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.3)] bg-slate-950/40 backdrop-blur-xl">
      {/* Map container DOM */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Antioquia Toggle: Subregiones vs 125 Municipios */}
      {currentLevel === 'departamental' && (
        <div className="absolute top-4 left-4 z-10 flex items-center p-1 rounded-2xl bg-slate-950/85 backdrop-blur-2xl border border-white/20 shadow-[0_8px_25px_rgba(0,0,0,0.5)] pointer-events-auto">
          <button
            onClick={() => setAntioquiaViewMode('subregiones')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              antioquiaViewMode === 'subregiones'
                ? 'bg-sky-500/35 text-white border border-sky-400/60 shadow-[0_0_12px_rgba(56,189,248,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Map className="w-3.5 h-3.5 text-sky-400" />
            9 Subregiones
          </button>
          <button
            onClick={() => setAntioquiaViewMode('municipios')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              antioquiaViewMode === 'municipios'
                ? 'bg-emerald-500/35 text-emerald-200 border border-emerald-400/60 shadow-[0_0_12px_rgba(52,211,153,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Building className="w-3.5 h-3.5 text-emerald-400" />
            125 Municipios (DANE Oficial)
          </button>
        </div>
      )}

      {/* Floating Legend Overlay (Bottom Left) */}
      <div className="absolute bottom-4 left-4 z-10 p-3 rounded-2xl bg-slate-950/70 backdrop-blur-2xl border border-white/20 shadow-2xl text-xs max-w-xs pointer-events-auto">
        <div className="flex items-center justify-between gap-2 mb-2 pb-1 border-b border-white/10">
          <span className="font-bold text-white uppercase text-[10px] tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-sky-400" />
            Capa: {activeLayer.toUpperCase()}
          </span>
          <span className="text-[10px] font-mono text-sky-300">
            {ZOOM_LEVELS_CONFIG[currentLevel]?.shortLabel || 'Nivel ' + currentLevel}
          </span>
        </div>
        
        {/* Color scale samples */}
        <div className="space-y-1 text-[11px] text-slate-300 font-medium">
          {activeLayer === 'electoral' && (
            <>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-sky-400 inline-block shadow-[0_0_8px_#38bdf8]" />
                <span>Creemos / Centro Democrático</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                <span>Partido Liberal / Afines</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />
                <span>Partido Conservador</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-500 inline-block" />
                <span>Pacto Histórico / Mov. Sociales</span>
              </div>
            </>
          )}

          {activeLayer === 'demografico' && (
            <>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                <span>Estrato Alto (5-6) / Alta Densidad</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-cyan-400 inline-block" />
                <span>Estrato Medio (3-4)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                <span>Estrato Bajo (1-2)</span>
              </div>
            </>
          )}

          {activeLayer === 'nbi' && (
            <>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-cyan-400 inline-block" />
                <span>NBI &lt; 10% (Bajo)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                <span>NBI 15% - 25% (Medio)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
                <span>NBI &gt; 40% (Crítico)</span>
              </div>
            </>
          )}

          {activeLayer === 'riesgo' && (
            <>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                <span>Bajo (Estabilidad institucional)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                <span>Medio (Monitoreo regular)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
                <span>Alto / Crítico (Alerta temprana)</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Floating Quick Map Controls (Top Right) */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 pointer-events-auto">
        <button
          onClick={handleRecenter}
          className="p-2.5 rounded-xl bg-slate-950/70 hover:bg-slate-900/90 text-slate-300 hover:text-white border border-white/20 backdrop-blur-xl shadow-lg transition"
          title="Centrar mapa en el nivel actual"
        >
          <Compass className="w-4 h-4 text-sky-400" />
        </button>

        <button
          onClick={() => setMapBaseTheme(prev => prev === 'dark' ? 'voyager' : 'dark')}
          className="p-2.5 rounded-xl bg-slate-950/70 hover:bg-slate-900/90 text-slate-300 hover:text-white border border-white/20 backdrop-blur-xl shadow-lg transition text-[10px] font-mono font-bold"
          title="Alternar estilo de mapa base"
        >
          {mapBaseTheme === 'dark' ? '🌙' : '☀️'}
        </button>
      </div>

      {/* Dynamic Hover Banner (Top Center) */}
      {hoveredFeature && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-4 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-2xl border border-sky-400/60 shadow-[0_0_20px_rgba(56,189,248,0.4)] text-white text-xs font-bold flex items-center gap-2 pointer-events-none animate-fadeIn">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
          <span>{hoveredFeature.properties.name}</span>
          {hoveredFeature.properties.isInteractiveTarget && (
            <span className="text-[10px] font-mono text-emerald-300 font-black">
              • Haz clic para hacer Zoom
            </span>
          )}
        </div>
      )}
    </div>
  );
};

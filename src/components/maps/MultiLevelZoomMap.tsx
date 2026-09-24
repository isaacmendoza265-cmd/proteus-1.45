import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  ZoomLevelId, 
  ThematicMetricLayer, 
  TerritoryGeoFeature, 
  TerritoryFeatureCollection,
  GEOJSON_LAYERS_BY_ZOOM, 
  ZOOM_LEVELS_CONFIG,
  ANTIOQUIA_125_MUNICIPIOS_GEOJSON
} from '../../data/geojson';
import { Maximize2, Layers, Compass, Sparkles, Map, Building, Megaphone, ChevronDown, Check } from 'lucide-react';
import { SubregionAggregationEngine } from '../../services/subregionAggregationEngine';
import { ColombiaMunicipalitiesGeoService } from '../../services/colombiaMunicipalitiesGeoService';

export const COLOMBIA_ALL_DEPARTMENTS = [
  'Amazonas', 'Antioquia', 'Arauca', 'Atlántico', 'Bogotá D.C.', 'Bolívar', 'Boyacá', 
  'Caldas', 'Caquetá', 'Casanare', 'Cauca', 'Cesar', 'Chocó', 'Cundinamarca', 'Córdoba', 
  'Guainía', 'Guaviare', 'Huila', 'La Guajira', 'Magdalena', 'Meta', 'Nariño', 
  'Norte de Santander', 'Putumayo', 'Quindío', 'Risaralda', 'San Andrés y Providencia', 
  'Santander', 'Sucre', 'Tolima', 'Valle del Cauca', 'Vaupés', 'Vichada'
];

interface MultiLevelZoomMapProps {
  currentLevel: ZoomLevelId;
  activeLayer: ThematicMetricLayer;
  searchQuery: string;
  selectedFeature: TerritoryGeoFeature | null;
  onSelectFeature: (feature: TerritoryGeoFeature | null) => void;
  onDrillDown: (targetLevel: ZoomLevelId, featureId: string, departmentName?: string) => void;
  onGenerateContent?: (feature: TerritoryGeoFeature) => void;
  selectedDepartmentName?: string;
  onSelectDepartmentName?: (deptName: string) => void;
}

export const MultiLevelZoomMap: React.FC<MultiLevelZoomMapProps> = ({
  currentLevel,
  activeLayer,
  searchQuery,
  selectedFeature,
  onSelectFeature,
  onDrillDown,
  onGenerateContent,
  selectedDepartmentName = 'Antioquia',
  onSelectDepartmentName
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const geoJsonLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const [hoveredFeature, setHoveredFeature] = useState<TerritoryGeoFeature | null>(null);
  const [mapBaseTheme, setMapBaseTheme] = useState<'dark' | 'voyager'>('dark');
  const [antioquiaViewMode, setAntioquiaViewMode] = useState<'subregiones' | 'municipios'>('subregiones');
  const [customDeptDataset, setCustomDeptDataset] = useState<TerritoryFeatureCollection | null>(null);
  const [isLoadingDept, setIsLoadingDept] = useState<boolean>(false);
  const [deptDropdownOpen, setDeptDropdownOpen] = useState<boolean>(false);

  // Cámara: última escala encuadrada y límites de la capa visible
  const lastCameraKeyRef = useRef<string>('');
  const lastLayerBoundsRef = useRef<L.LatLngBounds | null>(null);

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

      // Futuristic Dark Basemap: CartoDB Dark Matter (High-contrast, elegant obsidian aesthetic)
      const tileUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';

      L.tileLayer(tileUrl, {
        subdomains: 'abcd',
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
      }).addTo(map);

      // Dedicated layer group for GeoJSON
      const lg = L.layerGroup().addTo(map);
      geoJsonLayerGroupRef.current = lg;
      mapInstanceRef.current = map;
    }

    return () => {
      // Liberar el mapa de Leaflet al salir de la vista (antes quedaba en memoria)
      mapInstanceRef.current?.remove();
      mapInstanceRef.current = null;
      geoJsonLayerGroupRef.current = null;
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

    const tileUrl = mapBaseTheme === 'dark' 
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

    L.tileLayer(tileUrl, {
      subdomains: 'abcd',
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap &copy; CARTO'
    }).addTo(map);
  }, [mapBaseTheme]);

  // Load department municipalities when selectedDepartmentName is not Antioquia
  useEffect(() => {
    if (currentLevel !== 'departamental') return;
    const dept = selectedDepartmentName || 'Antioquia';
    if (dept.toLowerCase() === 'antioquia') {
      setCustomDeptDataset(null);
      return;
    }

    let active = true;
    setIsLoadingDept(true);
    ColombiaMunicipalitiesGeoService.getDepartmentMunicipalities(dept)
      .then((dataset) => {
        if (active) {
          setCustomDeptDataset(dataset);
          setIsLoadingDept(false);
        }
      })
      .catch((err) => {
        console.error("Error fetching department municipalities:", err);
        if (active) setIsLoadingDept(false);
      });

    return () => {
      active = false;
    };
  }, [currentLevel, selectedDepartmentName]);

  // Synchronize GeoJSON features and camera transitions when currentLevel, activeLayer, or searchQuery changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layerGroup = geoJsonLayerGroupRef.current;
    if (!map || !layerGroup) return;

    layerGroup.clearLayers();

    let dataset = GEOJSON_LAYERS_BY_ZOOM[currentLevel];
    if (currentLevel === 'departamental') {
      const isAntioquia = !selectedDepartmentName || selectedDepartmentName.toLowerCase() === 'antioquia';
      if (isAntioquia) {
        if (antioquiaViewMode === 'subregiones') {
          dataset = SubregionAggregationEngine.buildSubregionDataset();
        } else {
          dataset = ANTIOQUIA_125_MUNICIPIOS_GEOJSON;
        }
      } else if (customDeptDataset) {
        dataset = customDeptDataset;
      }
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

        // 1. Medellín base municipal boundary (Option 3)
        if (feature.id === 'medellin-base-outline') {
          return {
            fillColor: '#0284c7',
            fillOpacity: 0.04,
            color: '#38bdf8',
            weight: 1.5,
            dashArray: '4, 4',
            opacity: 0.7
          };
        }

        // 2. Corregimientos circulares (Option 3)
        if ((feature.properties as any).isCorregimiento || feature.id.includes('correg')) {
          return {
            fillColor: isSelected ? '#fbbf24' : '#f59e0b',
            fillOpacity: isSelected ? 0.75 : 0.42,
            color: isSelected ? '#ffffff' : '#fbbf24',
            weight: isSelected ? 3.5 : 2,
            dashArray: '3, 3',
            opacity: 0.95
          };
        }

        // 3. Subregiones de Antioquia
        const color = (currentLevel === 'departamental' && antioquiaViewMode === 'subregiones' && feature.properties.subregionColor)
          ? feature.properties.subregionColor
          : getFeatureColor(feature);

        return {
          fillColor: color,
          fillOpacity: isSelected ? 0.65 : 0.32,
          color: isSelected ? '#ffffff' : color,
          weight: isSelected ? 3 : 1.2,
          dashArray: '',
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
              fillOpacity: 0.65,
              weight: 2.8,
              color: '#38bdf8'
            });
            l.bringToFront();
            setHoveredFeature(feature);
          },
          mouseout: (e: any) => {
            const l = e.target;
            const isSelected = selectedFeature?.id === feature.id;
            const isCorreg = Boolean((feature.properties as any).isCorregimiento || feature.id.includes('correg'));
            const isOutline = feature.id === 'medellin-base-outline';

            if (isOutline) {
              l.setStyle({
                fillColor: '#0284c7',
                fillOpacity: 0.04,
                color: '#38bdf8',
                weight: 1.5,
                dashArray: '4, 4'
              });
            } else if (isCorreg) {
              l.setStyle({
                fillColor: isSelected ? '#fbbf24' : '#f59e0b',
                fillOpacity: isSelected ? 0.75 : 0.42,
                color: isSelected ? '#ffffff' : '#fbbf24',
                weight: isSelected ? 3.5 : 2,
                dashArray: '3, 3'
              });
            } else {
              const color = (currentLevel === 'departamental' && antioquiaViewMode === 'subregiones' && feature.properties.subregionColor)
                ? feature.properties.subregionColor
                : getFeatureColor(feature);
              l.setStyle({
                fillColor: color,
                fillOpacity: isSelected ? 0.65 : 0.32,
                color: isSelected ? '#ffffff' : color,
                weight: isSelected ? 3 : 1.2,
                dashArray: ''
              });
            }
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

            // Drill down:
            if (currentLevel === 'nacional') {
              // Direct drill down into ANY department in Colombia
              onDrillDown('departamental', feature.id, p.name);
            } else if (p.isInteractiveTarget) {
              const cfg = ZOOM_LEVELS_CONFIG[currentLevel];
              if (cfg.nextLevelId) {
                onDrillDown(cfg.nextLevelId, feature.id);
              }
            }
          }
        });

        // Medellín base boundary tooltip
        if (feature.id === 'medellin-base-outline') {
          layer.bindTooltip(
            `<div style="font-family: system-ui, sans-serif; font-weight: 700; font-size: 11px;">
              <div style="color: #38bdf8; font-size: 9px; text-transform: uppercase;">Límite Municipal Completo</div>
              <div style="color: #ffffff; font-size: 12px; font-weight: 900;">Distrito de Medellín (374.8 km²)</div>
              <div style="color: #cbd5e1; font-size: 10px;">Zona Rural (5 Corregimientos) y Zona Urbana (16 Comunas)</div>
            </div>`,
            { sticky: true, className: 'leaflet-glass-tooltip' }
          );
          return;
        }

        const isCorregimiento = Boolean((feature.properties as any).isCorregimiento || feature.id.includes('correg'));
        const metricDisplay = 
          activeLayer === 'electoral' ? `Ganador: ${p.predominantParty || p.winnerCandidate || 'Registrado'}` :
          activeLayer === 'demografico' ? `Pob: ${(p.population || 0).toLocaleString()} hab` :
          activeLayer === 'nbi' ? `NBI: ${p.nbiPercentage}%` :
          `Riesgo: ${p.riskLevel || 'Normal'}`;

        const daneCodeHtml = (p as any).daneCode ? `<div style="color: #38bdf8; font-size: 9px; font-family: monospace;">DIVIPOLA DANE: ${(p as any).daneCode}</div>` : '';
        const subregHtml = p.subregionCanonical 
          ? `<div style="color: #38bdf8; font-size: 10px; font-weight: bold;">Subregión: ${p.subregionCanonical}</div>`
          : (p.subregion ? `<div style="color: #94a3b8; font-size: 10px;">Subregión: ${p.subregion}</div>` : '');
        const corregimientoHtml = isCorregimiento 
          ? `<div style="color: #fbbf24; font-size: 10px; font-weight: 800; margin-top: 2px;">🏔️ Corregimiento Rural (Centroide Oficial DANE)</div>`
          : '';

        layer.bindTooltip(
          `<div style="font-family: system-ui, sans-serif; font-weight: 700; font-size: 11px;">
            <div style="color: #38bdf8; font-size: 9px; text-transform: uppercase;">${p.level}</div>
            <div style="color: #ffffff; font-size: 12px; font-weight: 900;">${p.name}</div>
            ${daneCodeHtml}
            ${subregHtml}
            ${corregimientoHtml}
            <div style="color: #cbd5e1; margin-top: 2px;">${metricDisplay}</div>
            ${(p.isInteractiveTarget || currentLevel === 'nacional') ? '<div style="color: #34d399; font-size: 9px; margin-top: 3px;">✨ Clic para hacer zoom</div>' : ''}
          </div>`,
          { sticky: true, className: 'leaflet-glass-tooltip' }
        );
      }
    });

    layerGroup.addLayer(leafletGeoJson);

    // Cámara: encuadrar los polígonos reales de la capa, y SOLO cuando cambia la escala
    // o el territorio. Antes volaba a un centro/zoom fijo en cada cambio de capa,
    // búsqueda o selección (cortaba Colombia y deshacía el zoom al elegir un territorio).
    let layerBounds: L.LatLngBounds | null = null;
    try {
      const b = leafletGeoJson.getBounds();
      if (b.isValid()) layerBounds = b;
    } catch {
      layerBounds = null;
    }
    lastLayerBoundsRef.current = layerBounds;

    const cameraKey = [currentLevel, antioquiaViewMode, selectedDepartmentName, customDeptDataset?.name].join('|');
    if (cameraKey !== lastCameraKeyRef.current) {
      lastCameraKeyRef.current = cameraKey;
      if (layerBounds) {
        map.flyToBounds(layerBounds, { duration: 1.2, padding: [30, 30] });
      } else if (dataset.center) {
        map.flyTo(dataset.center, dataset.defaultZoom || 8, { duration: 1.2, easeLinearity: 0.25 });
      }
    }

  }, [currentLevel, activeLayer, searchQuery, selectedFeature, antioquiaViewMode, selectedDepartmentName, customDeptDataset]);

  // Recenter helper
  const handleRecenter = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const dataset = (currentLevel === 'departamental' && antioquiaViewMode === 'municipios')
      ? ANTIOQUIA_125_MUNICIPIOS_GEOJSON
      : GEOJSON_LAYERS_BY_ZOOM[currentLevel];
    if (lastLayerBoundsRef.current) {
      map.flyToBounds(lastLayerBoundsRef.current, { duration: 0.8, padding: [30, 30] });
    } else if (dataset) {
      map.flyTo(dataset.center, dataset.defaultZoom, { duration: 0.8 });
    }
  };

  return (
    <div className="relative w-full h-[620px] rounded-3xl overflow-hidden border border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.3)] bg-slate-950/40 backdrop-blur-xl">
      {/* Map container DOM */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Antioquia Toggle / Department Selector */}
      {currentLevel === 'departamental' && (
        <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-950/85 backdrop-blur-2xl border border-white/20 shadow-[0_8px_25px_rgba(0,0,0,0.5)] pointer-events-auto">
          {(!selectedDepartmentName || selectedDepartmentName.toLowerCase() === 'antioquia') ? (
            <>
              <button
                onClick={() => setAntioquiaViewMode('subregiones')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  antioquiaViewMode === 'subregiones'
                    ? 'bg-sky-500/35 text-white border border-sky-400/60 shadow-[0_0_12px_rgba(56,189,248,0.4)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Map className="w-3.5 h-3.5 text-sky-400" />
                9 Subregiones Agregadas
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
            </>
          ) : (
            <div className="flex items-center gap-2 px-2 py-1">
              <span className="text-xs font-black text-amber-300 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-amber-400" />
                Dpto: {selectedDepartmentName} ({customDeptDataset?.features.length || '...'} Municipios DANE)
              </span>
              {onSelectDepartmentName && (
                <button
                  onClick={() => onSelectDepartmentName('Antioquia')}
                  className="px-2 py-0.5 rounded-lg bg-sky-500/20 hover:bg-sky-500/40 text-sky-300 text-[10px] font-bold border border-sky-400/40 transition"
                  title="Regresar a Antioquia"
                >
                  Volver a Antioquia
                </button>
              )}
            </div>
          )}

          {/* Quick Department Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDeptDropdownOpen(!deptDropdownOpen)}
              className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15 flex items-center gap-1 transition"
              title="Cambiar de Departamento"
            >
              <span>{selectedDepartmentName || 'Antioquia'}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {deptDropdownOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-52 max-h-60 overflow-y-auto rounded-2xl bg-slate-900/95 backdrop-blur-2xl border border-white/20 shadow-2xl p-1 z-30 space-y-0.5">
                <div className="text-[9px] font-mono uppercase text-slate-400 px-2 py-1 font-bold">
                  Seleccionar Departamento
                </div>
                {COLOMBIA_ALL_DEPARTMENTS.map((dept) => {
                  const isCur = (selectedDepartmentName || 'Antioquia').toLowerCase() === dept.toLowerCase();
                  return (
                    <button
                      key={dept}
                      onClick={() => {
                        if (onSelectDepartmentName) {
                          onSelectDepartmentName(dept);
                        }
                        setDeptDropdownOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs flex items-center justify-between transition ${
                        isCur
                          ? 'bg-sky-500/30 text-sky-200 font-bold border border-sky-400/40'
                          : 'text-slate-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <span>{dept}</span>
                      {isCur && <Check className="w-3 h-3 text-sky-400" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
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

      {/* Quick Floating Action: Generate content for selected feature */}
      {selectedFeature && onGenerateContent && (
        <div className="absolute top-4 left-4 z-10 animate-fadeIn pointer-events-auto">
          <button
            onClick={() => onGenerateContent(selectedFeature)}
            className="px-3.5 py-2 rounded-2xl bg-gradient-to-r from-sky-500/90 to-blue-600/90 hover:from-sky-400 hover:to-indigo-500 text-white text-xs font-black shadow-[0_0_20px_rgba(56,189,248,0.5)] border border-white/40 flex items-center gap-2 transition-all transform hover:scale-[1.03] active:scale-95 cursor-pointer backdrop-blur-xl"
            title={`Generar contenido con IA para ${selectedFeature.properties.name}`}
          >
            <Megaphone className="w-4 h-4 text-sky-200" />
            <span>Generar Contenido: {selectedFeature.properties.name}</span>
          </button>
        </div>
      )}

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

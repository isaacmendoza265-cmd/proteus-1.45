import React, { useState } from 'react';
import { 
  ZoomLevelId, 
  ThematicMetricLayer, 
  TerritoryGeoFeature, 
  GEOJSON_LAYERS_BY_ZOOM, 
  ZOOM_LEVELS_CONFIG,
  ORDERED_ZOOM_LEVELS
} from '../../data/geojson';
import { MapBreadcrumb } from '../../components/maps/MapBreadcrumb';
import { MapLayerControls } from '../../components/maps/MapLayerControls';
import { MultiLevelZoomMap } from '../../components/maps/MultiLevelZoomMap';
import { CommuneDeepAnalyticsDrawer } from '../../components/maps/CommuneDeepAnalyticsDrawer';
import { 
  Compass, 
  Shield, 
  Layers, 
  Building2,
  MapPin, 
  Sparkles, 
  Users, 
  Vote, 
  TrendingUp, 
  ArrowRight,
  FileSpreadsheet,
  Network,
  X,
  Megaphone
} from 'lucide-react';
import { E24HistoricalViewer } from '../../components/maps/E24HistoricalViewer';
import { activeTerritoryService } from '../../services/activeTerritoryContextService';

interface TerritorialZoomHubViewProps {
  onNavigateToContentDirector?: (feature?: TerritoryGeoFeature) => void;
  onNavigateToVoterSegmentation?: (feature?: TerritoryGeoFeature) => void;
}

export const TerritorialZoomHubView: React.FC<TerritorialZoomHubViewProps> = ({
  onNavigateToContentDirector,
  onNavigateToVoterSegmentation
}) => {
  const [currentLevel, setCurrentLevel] = useState<ZoomLevelId>('municipal');
  const [activeLayer, setActiveLayer] = useState<ThematicMetricLayer>('electoral');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFeature, setSelectedFeature] = useState<TerritoryGeoFeature | null>(null);
  const [e24ModalOpen, setE24ModalOpen] = useState(false);

  const currentDataset = GEOJSON_LAYERS_BY_ZOOM[currentLevel];
  const currentLevelConfig = ZOOM_LEVELS_CONFIG[currentLevel];

  // Bridge handlers to Content Director and Voter Segmentation
  const handleGenerateContent = (feature: TerritoryGeoFeature) => {
    activeTerritoryService.setFromGeoFeature(feature);
    if (onNavigateToContentDirector) {
      onNavigateToContentDirector(feature);
    }
  };

  const handleSegmentVoters = (feature: TerritoryGeoFeature) => {
    activeTerritoryService.setFromGeoFeature(feature);
    if (onNavigateToVoterSegmentation) {
      onNavigateToVoterSegmentation(feature);
    }
  };

  // Handler for scale-level generation (when no specific feature is selected, or using selected feature)
  const handleTriggerCurrentScaleContent = () => {
    if (selectedFeature) {
      handleGenerateContent(selectedFeature);
    } else if (currentDataset && currentDataset.features.length > 0) {
      handleGenerateContent(currentDataset.features[0]);
    }
  };

  const handleTriggerCurrentScaleSegmentation = () => {
    if (selectedFeature) {
      handleSegmentVoters(selectedFeature);
    } else if (currentDataset && currentDataset.features.length > 0) {
      handleSegmentVoters(currentDataset.features[0]);
    }
  };

  // Handle drill down through scales
  const handleDrillDown = (targetLevel: ZoomLevelId, featureId: string) => {
    setCurrentLevel(targetLevel);
    // Find target feature if exists in new dataset
    const nextDataset = GEOJSON_LAYERS_BY_ZOOM[targetLevel];
    if (nextDataset) {
      const match = nextDataset.features.find(f => f.id === featureId);
      setSelectedFeature(match || null);
    }
  };

  // Handle level change from breadcrumb or cards
  const handleSelectLevel = (level: ZoomLevelId) => {
    setCurrentLevel(level);
    setSelectedFeature(null);
  };

  // Reset to National view
  const handleResetToNational = () => {
    setCurrentLevel('nacional');
    setSelectedFeature(null);
    setSearchQuery('');
  };

  // Calculate aggregated stats for active scale
  const totalPopulation = currentDataset?.features.reduce(
    (acc, f) => acc + (f.properties.population || 0), 
    0
  ) || 0;
  const totalCensus = currentDataset?.features.reduce(
    (acc, f) => acc + (f.properties.electoralCensus || 0), 
    0
  ) || 0;

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* 1. Header Banner with Glassmorphism Frost */}
      <div className="relative overflow-hidden rounded-3xl p-6 bg-slate-950/40 backdrop-blur-3xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1.5px_2px_rgba(255,255,255,0.4)]">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-wider bg-gradient-to-r from-amber-400/20 via-sky-400/20 to-blue-500/30 text-amber-300 border border-amber-400/50 shadow-[0_0_12px_rgba(251,191,36,0.3)] flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Arquitectura de Zoom Continuo • 5 Escalas Jerárquicas GeoJSON
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                4 APLICATIVOS INTEGRADOS EN 1
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              <span>PROTEUS GIS MULTI-ESCALA</span>
              <span className="text-xs px-2.5 py-1 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-400/40 font-mono">
                5 Escalas
              </span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-3xl">
              Navegación jerárquica integrada: <strong className="text-sky-300">Colombia</strong> (32 Departamentos) ➔ <strong className="text-emerald-300">Antioquia</strong> (9 Subregiones) ➔ <strong className="text-indigo-300">Valle de Aburrá</strong> (10 Municipios y Redes de Poder) ➔ <strong className="text-purple-300">Medellín & AMVA</strong> (Comunas de Cabecera) ➔ <strong className="text-amber-300">Comunas y Barrios</strong> (Microdatos E-24 históricos 2015-2023, IPM, Criminalidad y Pirámides DANE).
            </p>
          </div>

          {/* Aggregated KPI badges & E24 Quick Action */}
          <div className="flex flex-wrap lg:flex-col gap-2 shrink-0">
            <button
              onClick={() => setE24ModalOpen(true)}
              className="px-3.5 py-2 rounded-2xl bg-gradient-to-r from-amber-500/25 via-orange-500/25 to-amber-600/30 hover:from-amber-500/40 hover:to-orange-500/40 border border-amber-400/50 hover:border-amber-300 text-amber-200 hover:text-white text-xs font-black shadow-[0_0_20px_rgba(251,191,36,0.3)] flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4 text-amber-400" />
              <span>Matriz E-24 Histórica Oficial</span>
            </button>
            <div className="px-3.5 py-2 rounded-2xl bg-white/05 border border-white/15 backdrop-blur-xl">
              <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">Población en Escala Activa</div>
              <div className="text-base font-black text-sky-300 font-mono">
                {totalPopulation.toLocaleString()} hab.
              </div>
            </div>
            <div className="px-3.5 py-2 rounded-2xl bg-white/05 border border-white/15 backdrop-blur-xl">
              <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">Censo Electoral Consolidado</div>
              <div className="text-base font-black text-emerald-300 font-mono">
                {totalCensus.toLocaleString()} votantes
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Navigation Breadcrumb (5 Steps) */}
      <MapBreadcrumb
        currentLevel={currentLevel}
        onSelectLevel={handleSelectLevel}
        selectedFeatureName={selectedFeature ? selectedFeature.properties.name : null}
        onResetToNational={handleResetToNational}
      />

      {/* 3. Layer Controls (Choropleth Toggles & Search) */}
      <MapLayerControls
        activeLayer={activeLayer}
        onChangeLayer={setActiveLayer}
        searchQuery={searchQuery}
        onChangeSearchQuery={setSearchQuery}
        totalFeaturesCount={currentDataset?.features.length || 0}
      />

      {/* 4. Interactive GIS Map & Deep Analytics Multi-Tab Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        <div className={`${selectedFeature ? 'lg:col-span-8' : 'lg:col-span-12'} transition-all duration-300`}>
          <MultiLevelZoomMap
            currentLevel={currentLevel}
            activeLayer={activeLayer}
            searchQuery={searchQuery}
            selectedFeature={selectedFeature}
            onSelectFeature={setSelectedFeature}
            onDrillDown={handleDrillDown}
            onGenerateContent={handleGenerateContent}
          />
        </div>

        {selectedFeature && (
          <div className="lg:col-span-4 transition-all duration-300 animate-fadeIn">
            <CommuneDeepAnalyticsDrawer
              feature={selectedFeature}
              onClose={() => setSelectedFeature(null)}
              onDrillDown={handleDrillDown}
              onGenerateContent={handleGenerateContent}
              onSegmentVoters={handleSegmentVoters}
            />
          </div>
        )}
      </div>

      {/* 4.5. Fast Campaign Bridge Banner (Conexión Directa con Generador de Contenido y Segmentación) */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-amber-500/15 via-sky-500/15 to-purple-500/15 border border-amber-400/40 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-500/30 border border-amber-400/60 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.3)] shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold">
                Conexión Bidireccional Activa • GIS ➔ Inteligencia de Campaña
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-mono font-bold">
                {selectedFeature ? selectedFeature.properties.name : currentLevelConfig.title}
              </span>
            </div>
            <div className="text-xs text-slate-300 mt-0.5">
              {selectedFeature 
                ? `Transfiere inmediatamente los microdatos de ${selectedFeature.properties.name} (censo, DANE, NBI, liderazgo y problemáticas) al Director de Contenido.`
                : `Explora o selecciona cualquier territorio en el mapa para redactar discursos hiperlocales y segmentar votantes con precisión quirúrgica.`
              }
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 w-full md:w-auto">
          <button
            onClick={handleTriggerCurrentScaleContent}
            className="flex-1 md:flex-none px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-black text-xs shadow-[0_0_20px_rgba(251,191,36,0.4)] flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            <Megaphone className="w-4 h-4" />
            <span>Generar Contenido con IA</span>
          </button>
          <button
            onClick={handleTriggerCurrentScaleSegmentation}
            className="flex-1 md:flex-none px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            <Users className="w-4 h-4 text-sky-400" />
            <span>Segmentar Votantes</span>
          </button>
        </div>
      </div>

      {/* 5. Direct 5-Scale Cards Selector */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-black uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400" />
            Acceso Rápido a las 5 Escalas Territoriales
          </h2>
          <span className="text-[11px] text-slate-400 font-medium">
            Haz clic en cualquier escala para enfocar el mapa inmediatamente
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Level 1: Nacional */}
          <button
            onClick={() => handleSelectLevel('nacional')}
            className={`p-3.5 rounded-3xl text-left transition-all duration-300 relative overflow-hidden group ${
              currentLevel === 'nacional'
                ? 'bg-sky-500/25 border-2 border-sky-400/80 shadow-[0_0_24px_rgba(56,189,248,0.4),inset_0_1px_1px_rgba(255,255,255,0.5)] scale-[1.02]'
                : 'bg-slate-950/35 hover:bg-white/10 border border-white/15'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="p-1.5 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-400/30">
                <Compass className="w-4 h-4" />
              </span>
              <span className="text-[9px] font-mono font-bold text-sky-400 uppercase">Nivel 1</span>
            </div>
            <div className="mt-2.5">
              <div className="text-xs font-black text-white group-hover:text-sky-200">
                Zoom Nacional
              </div>
              <div className="text-[10px] text-slate-300 font-medium mt-0.5">
                Colombia (32 Dptos)
              </div>
              <div className="text-[9px] text-slate-400 mt-1 font-mono">
                Censo: 39.2M
              </div>
            </div>
          </button>

          {/* Level 2: Departamental */}
          <button
            onClick={() => handleSelectLevel('departamental')}
            className={`p-3.5 rounded-3xl text-left transition-all duration-300 relative overflow-hidden group ${
              currentLevel === 'departamental'
                ? 'bg-emerald-500/25 border-2 border-emerald-400/80 shadow-[0_0_24px_rgba(52,211,153,0.4),inset_0_1px_1px_rgba(255,255,255,0.5)] scale-[1.02]'
                : 'bg-slate-950/35 hover:bg-white/10 border border-white/15'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="p-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                <Shield className="w-4 h-4" />
              </span>
              <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase">Nivel 2</span>
            </div>
            <div className="mt-2.5">
              <div className="text-xs font-black text-white group-hover:text-emerald-200">
                Zoom Dptal
              </div>
              <div className="text-[10px] text-slate-300 font-medium mt-0.5">
                Antioquia (9 Subr. / 125 Mpios)
              </div>
              <div className="text-[9px] text-slate-400 mt-1 font-mono">
                Censo: 5.2M • 125 DANE
              </div>
            </div>
          </button>

          {/* Level 3: Metropolitano */}
          <button
            onClick={() => handleSelectLevel('metropolitano')}
            className={`p-3.5 rounded-3xl text-left transition-all duration-300 relative overflow-hidden group ${
              currentLevel === 'metropolitano'
                ? 'bg-indigo-500/25 border-2 border-indigo-400/80 shadow-[0_0_24px_rgba(129,140,248,0.4),inset_0_1px_1px_rgba(255,255,255,0.5)] scale-[1.02]'
                : 'bg-slate-950/35 hover:bg-white/10 border border-white/15'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="p-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                <Layers className="w-4 h-4" />
              </span>
              <span className="text-[9px] font-mono font-bold text-indigo-400 uppercase">Nivel 3</span>
            </div>
            <div className="mt-2.5">
              <div className="text-xs font-black text-white group-hover:text-indigo-200">
                Zoom Metropolitano
              </div>
              <div className="text-[10px] text-slate-300 font-medium mt-0.5">
                Valle de Aburrá (10 Mpios)
              </div>
              <div className="text-[9px] text-slate-400 mt-1 font-mono">
                Censo: 3.0M • Conurbación
              </div>
            </div>
          </button>

          {/* Level 4: Municipal */}
          <button
            onClick={() => handleSelectLevel('municipal')}
            className={`p-3.5 rounded-3xl text-left transition-all duration-300 relative overflow-hidden group ${
              (currentLevel === 'municipal' || currentLevel === 'hiperlocal')
                ? 'bg-purple-500/25 border-2 border-purple-400/80 shadow-[0_0_24px_rgba(192,132,252,0.4),inset_0_1px_1px_rgba(255,255,255,0.5)] scale-[1.02]'
                : 'bg-slate-950/35 hover:bg-white/10 border border-white/15'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="p-1.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-400/30">
                <Building2 className="w-4 h-4" />
              </span>
              <span className="text-[9px] font-mono font-bold text-purple-400 uppercase">Nivel 4</span>
            </div>
            <div className="mt-2.5">
              <div className="text-xs font-black text-white group-hover:text-purple-200">
                Zoom Municipal
              </div>
              <div className="text-[10px] text-slate-300 font-medium mt-0.5">
                Medellín (16 Comunas DANE)
              </div>
              <div className="text-[9px] text-slate-400 mt-1 font-mono">
                16 Comunas + 5 Correg
              </div>
            </div>
          </button>

          {/* Level 5: Comunas y Barrios */}
          <button
            onClick={() => handleSelectLevel('comunas-barrios')}
            className={`p-3.5 rounded-3xl text-left transition-all duration-300 relative overflow-hidden group ${
              currentLevel === 'comunas-barrios'
                ? 'bg-amber-500/25 border-2 border-amber-400/80 shadow-[0_0_24px_rgba(251,191,36,0.4),inset_0_1px_1px_rgba(255,255,255,0.5)] scale-[1.02]'
                : 'bg-slate-950/35 hover:bg-white/10 border border-white/15'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="p-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/30">
                <MapPin className="w-4 h-4" />
              </span>
              <span className="text-[9px] font-mono font-bold text-amber-400 uppercase">Nivel 5</span>
            </div>
            <div className="mt-2.5">
              <div className="text-xs font-black text-white group-hover:text-amber-200">
                Comunas & Barrios
              </div>
              <div className="text-[10px] text-slate-300 font-medium mt-0.5">
                Microdatos E-24 e IPM
              </div>
              <div className="text-[9px] text-slate-400 mt-1 font-mono">
                Barrios & Puestos 2015-2023
              </div>
            </div>
        </div>
      </div>

      {/* Standalone E-24 Historical Matrix Modal */}
      {e24ModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl relative border border-white/20 shadow-2xl">
            <button
              onClick={() => setE24ModalOpen(false)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white transition shadow-lg cursor-pointer"
              title="Cerrar Matriz E-24"
            >
              <X className="w-4 h-4" />
            </button>
            <E24HistoricalViewer />
          </div>
        </div>
      )}
    </div>
  );
};

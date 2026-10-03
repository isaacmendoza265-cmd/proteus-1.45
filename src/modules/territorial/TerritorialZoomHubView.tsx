import { AnalistaTerritorial } from '../../components/territorio/AnalistaTerritorial';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HerramientasUnidad, type AnclaMapa } from '../../components/territorio/HerramientasUnidad';
import type { NavViewId } from '../../components/layout/navigation';
import { 
  ZoomLevelId, 
  ThematicMetricLayer, 
  TerritoryGeoFeature, 
  GEOJSON_LAYERS_BY_ZOOM, 
  ORDERED_ZOOM_LEVELS
} from '../../data/geojson';
import { MapBreadcrumb } from '../../components/maps/MapBreadcrumb';
import { MapLayerControls } from '../../components/maps/MapLayerControls';
import { MultiLevelZoomMap } from '../../components/maps/MultiLevelZoomMap';
import { CommuneDeepAnalyticsDrawer } from '../../components/maps/CommuneDeepAnalyticsDrawer';
import { PollingStationsPanel } from '../../components/maps/PollingStationsPanel';
import { FichaTerritorio, type Seccion } from '../../components/territorio/FichaTerritorio';
import { GeneradorContenido } from '../../components/territorio/GeneradorContenido';
import { AnalisisNarrativoMunicipio } from '../../components/territorio/AnalisisNarrativoMunicipio';
import { NoticiasUnidad } from '../../components/territorio/NoticiasUnidad';
import { EncuestasTerritorio } from '../../components/territorio/EncuestasTerritorio';
import type { SeleccionEncuestas } from '../../components/encuestas/VotoCorrelaciones';
import { SELECCION_GENERAL, nombreSeleccion, seleccionDesdeMapa, type PerfilCandidato } from '../../services/contentGeneratorService';
import { RedDePoder3D } from '../../components/territorio/RedDePoder3D';
import { usePuestosTerritorio, puestosDe, codigosResultadosDe } from '../../components/territorio/usePuestosTerritorio';
import { territorioFicha, tieneFicha, municipioFichaPorDane, MUNICIPIOS_CON_FICHA } from '../../services/territoryProfileService';
import { MUNICIPAL_DIVISIONS_REGISTRY } from '../../data/geojson/municipalDivisions';
import { 
  Compass, 
  Shield, 
  Layers, 
  Building2,
  MapPin, 
  FileSpreadsheet,
  X
} from 'lucide-react';
import { E24HistoricalViewer } from '../../components/maps/E24HistoricalViewer';
import { activeTerritoryService } from '../../services/activeTerritoryContextService';
import { NATIONAL_CENSUS, formatCensusShort, getDepartmentCensus } from '../../services/electoralCensusService';
import { ANTIOQUIA_125_MUNICIPALITIES_MASTER_DATA } from '../../data/antioquia125MunicipalitiesMasterData';

// Censo oficial del Valle de Aburrá (suma de sus 10 municipios)
const VALLE_ABURRA_CENSUS = ANTIOQUIA_125_MUNICIPALITIES_MASTER_DATA.filter((m) => m.subregionId === 'valle-de-aburra').reduce((s, m) => s + m.electoralCensus, 0);

interface TerritorialZoomHubViewProps {
  onNavigateToContentDirector?: (feature?: TerritoryGeoFeature) => void;
  onNavigateToVoterSegmentation?: (feature?: TerritoryGeoFeature) => void;
  /** Abre Electorado › Encuestas 2026 situado en el territorio del mapa */
  onAbrirEncuestas?: (s: SeleccionEncuestas) => void;
  /** Perfil del candidato activo (nombre y estilo, para el generador de contenido) */
  candidato?: PerfilCandidato | null;
  /** Abre otra vista de la app (las herramientas de la columna derecha) */
  onNavigateToView?: (vista: NavViewId) => void;
}

export const TerritorialZoomHubView: React.FC<TerritorialZoomHubViewProps> = ({
  onNavigateToContentDirector,
  onNavigateToVoterSegmentation,
  onAbrirEncuestas,
  candidato,
  onNavigateToView,
}) => {
  const [currentLevel, setCurrentLevel] = useState<ZoomLevelId>('municipal');
  const [activeLayer, setActiveLayer] = useState<ThematicMetricLayer>('electoral');
  // Mapa y ficha comparten la elección (año y tipo) y la capa elige la sección de la ficha:
  // electoral → Política; demográfica y económica → Demografía (que trae también la economía).
  const [eleccion, setEleccion] = useState<string>('alcaldia-2023');
  const [seccionFicha, setSeccionFicha] = useState<Seccion>('politica');
  const cambiarCapa = (capa: ThematicMetricLayer) => {
    setActiveLayer(capa);
    setSeccionFicha(capa === 'electoral' ? 'politica' : 'demografia');
  };
  const cambiarSeccionFicha = (s: Seccion) => {
    setSeccionFicha(s);
    if (s === 'politica') setActiveLayer('electoral');
    else if (s === 'demografia' && activeLayer === 'electoral') setActiveLayer('demografico');
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFeature, setSelectedFeature] = useState<TerritoryGeoFeature | null>(null);
  // Municipio de los niveles 4 y 5 (ver src/data/geojson/municipalDivisions.ts)
  const [selectedMunicipalityId, setSelectedMunicipalityId] = useState<string>('medellin');
  // Comuna abierta: el nivel de barrios muestra solo los suyos
  const [comunaAbierta, setComunaAbierta] = useState<{ id: string; name: string } | null>(null);
  // Subregión elegida en la vista de subregiones de Antioquia (filtra puestos y contenido)
  const [subregionSel, setSubregionSel] = useState<{ id: string; nombre: string } | null>(null);
  const handleSelectComuna = useCallback((feature: TerritoryGeoFeature) => {
    setComunaAbierta({ id: String(feature.id), name: feature.properties.name });
    setSelectedFeature(feature);
    setSearchQuery('');
    setCurrentLevel('comunas-barrios');
  }, []);
  const [selectedDepartmentName, setSelectedDepartmentName] = useState<string>('Antioquia');
  const [e24ModalOpen, setE24ModalOpen] = useState(false);
  // Vista del módulo: mapa con ficha, o red de poder en 3D
  const [vista, setVista] = useState<'mapa' | 'redes'>('mapa');

  // Ficha de 4 secciones (Política, Demografía, Censo electoral, Grupos): hoy, Bello y sus comunas/barrios
  const isMunicipalScale = currentLevel === 'municipal' || currentLevel === 'hiperlocal' || currentLevel === 'comunas-barrios';
  const fichaId: string | null = (() => {
    const id = selectedFeature ? String(selectedFeature.id) : '';
    if (id && tieneFicha(id)) return id;
    const dane = /(\d{5})$/.exec(id)?.[1];
    if (selectedFeature && dane && municipioFichaPorDane(dane)) return municipioFichaPorDane(dane);
    if (!selectedFeature && isMunicipalScale && MUNICIPIOS_CON_FICHA.includes(selectedMunicipalityId)) return selectedMunicipalityId;
    return null;
  })();
  const fichaTerritorio = useMemo(() => (fichaId ? territorioFicha(fichaId) : null), [fichaId]);
  const puestosMuni = usePuestosTerritorio(fichaTerritorio ? municipioFichaPorDane(fichaTerritorio.dane) : null, fichaTerritorio?.municipio);
  const puestosFicha = useMemo(
    () => (fichaTerritorio ? puestosDe(puestosMuni, fichaTerritorio.tipo, fichaTerritorio.id) : []),
    [fichaTerritorio, puestosMuni],
  );
  const codigosResultadosFicha = useMemo(
    () => (fichaTerritorio ? codigosResultadosDe(puestosMuni, fichaTerritorio.tipo, fichaTerritorio.id) : []),
    [fichaTerritorio, puestosMuni],
  );

  // Generador de contenido: territorio elegido en el mapa ("General" si no hay) y los puestos de la ficha
  const seleccionContenido = useMemo(() => {
    const isMunicipal = currentLevel === 'municipal' || currentLevel === 'hiperlocal' || currentLevel === 'comunas-barrios';
    if (!selectedFeature && !isMunicipal) return subregionSel ? { ...SELECCION_GENERAL, subregion: subregionSel.nombre } : SELECCION_GENERAL;
    const id = selectedFeature ? String(selectedFeature.id) : null;
    const dane = selectedFeature ? ((selectedFeature.properties as { daneCode?: string }).daneCode ?? /(\d{5})$/.exec(id!)?.[1] ?? null) : null;
    return seleccionDesdeMapa({ featureId: id, featureName: selectedFeature?.properties.name, muniId: isMunicipal ? selectedMunicipalityId : null, dane });
  }, [selectedFeature, currentLevel, selectedMunicipalityId, subregionSel]);
  // EL MAPA ES LA CONSOLA DE NAVEGACIÓN: cada unidad que se elige aquí pasa a ser el territorio activo de toda la app
  // (barra superior, Segmentos, Publicidad, Multimedia, Redactar, piezas y los selectores propios de las demás
  // herramientas). No se aplica al abrir la pantalla, para no pisar el territorio que el usuario ya tenía.
  const primeraSincronizacion = useRef(true);
  useEffect(() => {
    if (primeraSincronizacion.current) { primeraSincronizacion.current = false; return; }
    activeTerritoryService.setFromMapa(seleccionContenido, selectedFeature);
  }, [seleccionContenido, selectedFeature]);

  // Columna de herramientas: aparece cuando hay una unidad elegida en el mapa
  const fueraDeAntioquia = !!selectedFeature && !seleccionContenido.muniId && !seleccionContenido.subregion
    && (currentLevel === 'nacional' && !/antioquia/i.test(selectedFeature.properties.name ?? ''));
  const hayUnidad = !!selectedFeature || !!subregionSel || isMunicipalScale;
  const nombreUnidad = !hayUnidad ? null
    : fueraDeAntioquia ? selectedFeature!.properties.name
      : nombreSeleccion(seleccionContenido);
  const irAHerramienta = (v: NavViewId) => {
    activeTerritoryService.setFromMapa(seleccionContenido, selectedFeature);
    onNavigateToView?.(v);
  };
  const irAAncla = (a: AnclaMapa) => {
    if (a === 'redes') { setVista('redes'); return; }
    document.getElementById(a === 'generador' ? 'generador-contenido' : a === 'noticias' ? 'noticias-unidad' : 'analista-territorial')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const puestosDeFicha = useMemo(
    () => (fichaTerritorio ? { territorioId: fichaTerritorio.id, codigosResultados: codigosResultadosFicha, codigos2026: puestosFicha.map((p) => p.codPuesto) } : null),
    [fichaTerritorio, codigosResultadosFicha, puestosFicha],
  );

  // Análisis narrativo (debajo del mapa): municipio activo y, en Medellín, la comuna abierta o
  // seleccionada (si no hay ninguna, el análisis es de todo Medellín)
  const daneNarrativa = isMunicipalScale ? MUNICIPAL_DIVISIONS_REGISTRY[selectedMunicipalityId]?.daneCode ?? null : null;
  const comunaNarrativaId = useMemo(() => {
    if (daneNarrativa !== '05001') return null;
    if (fichaTerritorio?.tipo === 'division') return fichaTerritorio.id;
    if (fichaTerritorio?.tipo === 'subdivision') return fichaTerritorio.padreId ?? null;
    return comunaAbierta?.id ?? null;
  }, [daneNarrativa, fichaTerritorio, comunaAbierta]);

  // Unidad del análisis dentro del municipio: la comuna, zona, barrio o vereda elegida (cualquier municipio)
  const unidadNarrativaId = useMemo(() => {
    if (!daneNarrativa) return null;
    if (fichaTerritorio && fichaTerritorio.tipo !== 'municipio' && fichaTerritorio.dane === daneNarrativa) return fichaTerritorio.id;
    return comunaNarrativaId;
  }, [daneNarrativa, fichaTerritorio, comunaNarrativaId]);

  // Encuestas y urnas (debajo del análisis): municipio del mapa o, si no hay, Antioquia. Nunca a barrio.
  const daneEncuestas = useMemo(() => {
    if (daneNarrativa) return daneNarrativa;
    const d = selectedFeature ? ((selectedFeature.properties as { daneCode?: string }).daneCode ?? /(\d{5})$/.exec(String(selectedFeature.id))?.[1]) : null;
    return d && d.startsWith('05') ? d : null;
  }, [daneNarrativa, selectedFeature]);
  const nombreMunicipioEncuestas = daneNarrativa ? MUNICIPAL_DIVISIONS_REGISTRY[selectedMunicipalityId]?.name : selectedFeature?.properties.name;
  const encuestasBajoMunicipio = isMunicipalScale && (currentLevel !== 'municipal' || !!selectedFeature);

  const currentDataset = GEOJSON_LAYERS_BY_ZOOM[currentLevel];

  // Bridge handlers to Content Director and Voter Segmentation
  // "Generar contenido" (drawer, popup y banner) lleva al generador de ESTA pantalla, con el territorio elegido: es el
  // que lee las tres macrofuentes completas. Antes saltaba a Redactar (herramienta vieja).
  const irAlGenerador = () => setTimeout(() => document.getElementById('generador-contenido')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
  const handleGenerateContent = (feature: TerritoryGeoFeature) => {
    // El territorio activo lo actualiza la sincronización con el mapa (efecto de arriba)
    setSelectedFeature(feature);
    irAlGenerador();
  };
  void onNavigateToContentDirector;

  const handleSegmentVoters = (feature: TerritoryGeoFeature) => {
    const dane = (feature.properties as { daneCode?: string }).daneCode ?? /(\d{5})$/.exec(String(feature.id))?.[1] ?? null;
    activeTerritoryService.setFromMapa(seleccionDesdeMapa({ featureId: String(feature.id), featureName: feature.properties.name, muniId: isMunicipalScale ? selectedMunicipalityId : null, dane }), feature);
    if (onNavigateToVoterSegmentation) {
      onNavigateToVoterSegmentation(feature);
    }
  };

  // Handle drill down through scales
  const handleDrillDown = (targetLevel: ZoomLevelId, featureId: string, departmentName?: string) => {
    if (departmentName && targetLevel === 'departamental') {
      setSelectedDepartmentName(departmentName);
    }
    setCurrentLevel(targetLevel);
    setComunaAbierta(null);
    if (targetLevel !== 'departamental') setSubregionSel(null);
    setSearchQuery(''); // el filtro de un nivel no aplica al siguiente (ocultaría sus barrios)
    // Find target feature if exists in new dataset
    const nextDataset = GEOJSON_LAYERS_BY_ZOOM[targetLevel];
    if (nextDataset) {
      const match = nextDataset.features.find(f => f.id === featureId);
      setSelectedFeature(match || null);
    }
  };

  // Handle level change from breadcrumb or cards
  const handleSelectLevel = (level: ZoomLevelId) => {
    // Volver a "Barrios" desde la misma escala conserva la comuna abierta
    if (level !== currentLevel) setComunaAbierta(null);
    if (level !== 'departamental') setSubregionSel(null);
    setCurrentLevel(level);
    setSelectedFeature(null);
  };

  // Reset to National view
  const handleResetToNational = () => {
    setComunaAbierta(null);
    setSubregionSel(null);
    setCurrentLevel('nacional');
    setSelectedFeature(null);
    setSelectedDepartmentName('Antioquia');
    setSearchQuery('');
  };


  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Vista: mapa con ficha o red de poder */}
      <div className="proteus-civico flex items-center gap-3 flex-wrap">
      <div role="tablist" aria-label="Vista del territorio" className="inline-flex p-1 gap-1 rounded-xl bg-[var(--c-sunken)] border border-[var(--c-border)]">
        {([['mapa', 'Mapa'], ['redes', 'Redes de poder']] as const).map(([id, label]) => (
          <button
            key={id}
            role="tab"
            aria-selected={vista === id}
            onClick={() => setVista(id)}
            className={`min-h-9 px-4 rounded-lg text-sm font-semibold ${vista === id ? 'bg-[var(--c-surface)] text-[var(--c-ink)] shadow-sm' : 'text-[var(--c-muted)] hover:text-[var(--c-ink)]'}`}
          >
            {label}
          </button>
        ))}
      </div>
      <span className="grow" />
      <button onClick={() => setE24ModalOpen(true)} className="min-h-9 px-3 rounded-lg border border-[var(--c-border)] bg-[var(--c-surface)] text-sm font-semibold flex items-center gap-2">
        <FileSpreadsheet className="w-4 h-4" strokeWidth={1.7} />Matriz E-24 histórica
      </button>
      </div>

      {vista === 'redes' && (
        <RedDePoder3D
          municipioInicial={fichaTerritorio?.municipio ?? (MUNICIPAL_DIVISIONS_REGISTRY[selectedMunicipalityId]?.name)}
          onVerMunicipio={(nombre) => {
            const entry = Object.values(MUNICIPAL_DIVISIONS_REGISTRY).find((e) => e.name === nombre);
            if (entry) {
              setComunaAbierta(null);
              setSelectedMunicipalityId(entry.id);
              setCurrentLevel('municipal');
              setSelectedFeature(null);
            }
            setVista('mapa');
          }}
        />
      )}

      {vista === 'mapa' && (
      <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_18rem] xl:gap-5 items-start">
      <div className="min-w-0 space-y-6">
      {/* 2. Navigation Breadcrumb (5 Steps) */}
      <MapBreadcrumb
        currentLevel={currentLevel}
        onSelectLevel={handleSelectLevel}
        selectedFeatureName={selectedFeature ? selectedFeature.properties.name : currentLevel === 'departamental' && subregionSel ? `Subregión ${subregionSel.nombre}` : null}
        selectedDepartmentName={selectedDepartmentName}
        selectedMunicipalityName={MUNICIPAL_DIVISIONS_REGISTRY[selectedMunicipalityId]?.name}
        selectedComunaName={currentLevel === 'comunas-barrios' ? comunaAbierta?.name : undefined}
        onResetToNational={handleResetToNational}
      />

      {/* 3. Layer Controls (Choropleth Toggles & Search) */}
      <MapLayerControls
        activeLayer={activeLayer}
        onChangeLayer={cambiarCapa}
        searchQuery={searchQuery}
        onChangeSearchQuery={setSearchQuery}
        totalFeaturesCount={currentDataset?.features.length || 0}
      />

      {/* 4. Interactive GIS Map & Deep Analytics Multi-Tab Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        <div className={`${selectedFeature || fichaTerritorio ? 'lg:col-span-8' : 'lg:col-span-12'} transition-all duration-300`}>
          <MultiLevelZoomMap
            currentLevel={currentLevel}
            activeLayer={activeLayer}
            searchQuery={searchQuery}
            selectedFeature={selectedFeature}
            onSelectFeature={setSelectedFeature}
            onDrillDown={handleDrillDown}
            onGenerateContent={handleGenerateContent}
            selectedDepartmentName={selectedDepartmentName}
            onSelectDepartmentName={setSelectedDepartmentName}
            selectedMunicipalityId={selectedMunicipalityId}
            onSelectMunicipality={(id) => {
              setComunaAbierta(null);
              setSelectedMunicipalityId(id);
              setSelectedFeature(null);
            }}
            comunaFiltroId={comunaAbierta?.id ?? null}
            onSelectComuna={handleSelectComuna}
            eleccion={eleccion}
            onCambiarEleccion={setEleccion}
            subregionSel={subregionSel?.id ?? null}
            onSelectSubregion={setSubregionSel}
          />
          {vista === 'mapa' && (
            <div className="mt-5">
              <AnalisisNarrativoMunicipio dane={daneNarrativa} territorioId={unidadNarrativaId} seleccion={seleccionContenido} />
            </div>
          )}
          {vista === 'mapa' && selectedDepartmentName === 'Antioquia' && (
            <div className="mt-5">
              <NoticiasUnidad seleccion={seleccionContenido} />
            </div>
          )}
          {vista === 'mapa' && selectedDepartmentName === 'Antioquia' && (
            <div className="mt-5">
              <EncuestasTerritorio
                dane={daneEncuestas}
                nombreMunicipio={nombreMunicipioEncuestas}
                bajoMunicipio={encuestasBajoMunicipio}
                onAbrirEncuestas={onAbrirEncuestas}
              />
            </div>
          )}
        </div>

        {fichaTerritorio && (
          <div className="lg:col-span-4 animate-fadeIn">
            <FichaTerritorio
              key={fichaTerritorio.id}
              territorio={fichaTerritorio}
              puestosDentro={puestosFicha}
              codigosResultados={codigosResultadosFicha}
              sinUbicar={puestosMuni.sinUbicar}
              cargandoPuestos={puestosMuni.cargando}
              onVerRed={() => setVista('redes')}
              eleccion={eleccion}
              onCambiarEleccion={setEleccion}
              seccion={seccionFicha}
              onCambiarSeccion={cambiarSeccionFicha}
            />
          </div>
        )}

        {selectedFeature && !fichaTerritorio && (
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

      {/* Herramientas de la unidad (en pantallas medianas, debajo del mapa; en grandes, columna derecha) */}
      <div className="xl:hidden">
        <HerramientasUnidad nombre={nombreUnidad} antioquia={!fueraDeAntioquia} onIr={irAHerramienta} onAncla={irAAncla} enCuadricula />
      </div>

      {/* 4.1. Generador de contenido enlazado a la selección del mapa */}
      <div id="generador-contenido" className="scroll-mt-4" />
      <GeneradorContenido
        seleccionMapa={seleccionContenido}
        eleccionId={eleccion}
        ficha={puestosDeFicha}
        candidato={candidato}
      />

      {/* 4.1.b Analista territorial: preguntas sobre la unidad elegida, con todo lo que Proteus tiene de ella */}
      <div id="analista-territorial" className="scroll-mt-4">
        <AnalistaTerritorial seleccion={seleccionContenido} />
      </div>

      {/* 4.2. Puestos de votación del territorio visible */}
      <PollingStationsPanel
        currentLevel={currentLevel}
        selectedDepartmentName={selectedDepartmentName}
        selectedMunicipalityId={selectedMunicipalityId}
        selectedFeature={selectedFeature}
        comunaAbiertaId={currentLevel === 'comunas-barrios' ? comunaAbierta?.id ?? null : null}
        subregion={currentLevel === 'departamental' ? subregionSel : null}
      />

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
                Censo: {formatCensusShort(NATIONAL_CENSUS.total)}
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
                {selectedDepartmentName === 'Antioquia' ? 'Antioquia (9 Subr. / 125 Mpios)' : `${selectedDepartmentName} (DANE Oficial)`}
              </div>
              <div className="text-[9px] text-slate-400 mt-1 font-mono">
                {getDepartmentCensus(selectedDepartmentName)
                  ? `Censo: ${formatCensusShort(getDepartmentCensus(selectedDepartmentName)!.total)} • ${getDepartmentCensus(selectedDepartmentName)!.municipios} mpios`
                  : `${selectedDepartmentName} • DANE Oficial`}
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
                Censo: {formatCensusShort(VALLE_ABURRA_CENSUS)} • Conurbación
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
          </button>
        </div>
      </div>
      </div>

      {/* Columna derecha: herramientas de generación y análisis para la unidad elegida en el mapa */}
      <aside className="hidden xl:block sticky top-0 max-h-[calc(100vh-6rem)] overflow-y-auto">
        <HerramientasUnidad nombre={nombreUnidad} antioquia={!fueraDeAntioquia} onIr={irAHerramienta} onAncla={irAAncla} />
      </aside>
      </div>
      )}

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

import React, { useEffect, useMemo, useRef, useState } from 'react';
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
import { Maximize2, Layers, Compass, Sparkles, Map, Building, Megaphone, ChevronDown, Check, Vote, Sun, Moon, Satellite, X, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { SubregionAggregationEngine } from '../../services/subregionAggregationEngine';
import { ColombiaMunicipalitiesGeoService } from '../../services/colombiaMunicipalitiesGeoService';
import { MUNICIPAL_DIVISIONS_REGISTRY, resolveMunicipality } from '../../data/geojson/municipalDivisions';
import {
  AsignacionPuestos,
  PuestoVotacion,
  asignarPuestosATerritorios,
  describirCruce,
  getMunicipioConPuestos,
  loadTodosPuestosDepartamento,
  nombreMunicipioPuestos,
  daneMunicipioPuestos,
  loadPuestosDepartamento,
  loadPuestosMunicipio,
  tieneCoordenadas,
  MUNICIPIOS_20K,
} from '../../services/pollingStationsService';
import { ANTIOQUIA_125_MUNICIPALITIES_MASTER_DATA } from '../../data/antioquia125MunicipalitiesMasterData';
import { colorDePartido, COLOR_SIN_DATO, LEYENDA_PARTIDOS } from '../../data/electoral/partidoColors';
import { cargarDemografia, cargarEconomia } from '../../services/territoryProfileService';
import { cargarElecciones, sumarEleccion, tieneResultadosPorPuesto, tipoEleccion, type EleccionPuestos } from '../../services/electionResultsService';
import { cargarGanadores, coloresCandidatos, colorGanador, colorPorCandidato, COLOR_OTRO_CANDIDATO, ganadoresPorTerritorio, type IndiceGanadores } from '../../services/winnersService';
import {
  COLORES_ESTRATO,
  METRICAS_DEMOGRAFICAS,
  METRICAS_ECONOMICAS,
  PALETA_DEMOGRAFICA,
  PALETA_ECONOMICA,
  aniosYTipos,
  colorEstrato,
  colorPorCortes,
  cortesQuintiles,
  eleccionDelAnio,
  puntosEleccion,
  rangosLeyenda,
  valorMunicipio,
  valorSubdivision,
  type MetricaDemografica,
  type MetricaEconomica,
  type ValorTerritorio,
} from '../../services/mapColorService';

// Puestos sin dato para la capa (otros departamentos, o mientras cargan los resultados)
const COLOR_PUESTO_NEUTRO = '#e2e8f0';

// NBI oficial del DANE por municipio (capa de los 125 municipios de Antioquia)
const NBI_POR_DANE = new globalThis.Map<string, number>(
  ANTIOQUIA_125_MUNICIPIOS_GEOJSON.features.map((f) => [String((f.properties as { daneCode?: string }).daneCode), f.properties.nbiPercentage as number]),
);
/** Código DANE de un municipio de la capa (algunas capas no lo traen: se busca por nombre) */
const daneDeFeature = (f: TerritoryGeoFeature): string | undefined =>
  (f.properties as { daneCode?: string }).daneCode ?? /(\d{5})$/.exec(String(f.id))?.[1] ?? resolveMunicipality({ id: String(f.id), name: f.properties.name })?.daneCode;

/** Radio del círculo de un puesto: crece con su censo y se achica al alejar el mapa (zoom < 15) */
const radioPuesto = (habilitados: number, zoom: number) => {
  const base = Math.max(2.5, Math.min(10, Math.sqrt(habilitados) / 12));
  const factor = Math.min(1, Math.max(0.2, 2 ** ((zoom - 15) / 2)));
  return Math.max(1.5, base * factor);
};
/** Grosor del borde: fino al alejar, para que el borde no tape el color del puesto */
const bordePuesto = (zoom: number) => (zoom >= 14 ? 1 : zoom >= 12 ? 0.6 : 0.3);

// Códigos DANE del Valle de Aburrá (nivel metropolitano)
const VALLE_ABURRA_DANE = new Set(
  ANTIOQUIA_125_MUNICIPALITIES_MASTER_DATA.filter((m) => m.subregionId === 'valle-de-aburra').map((m) => m.daneCode),
);

// Mapa base sin API key: servidor de teselas de la Fundación OpenStreetMap. Su política de uso pide
// atribución visible y uso moderado (https://operations.osmfoundation.org/policies/tiles/).
const OSM_TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const OSM_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>';

// Imagen satelital sin API key: Sentinel-2 cloudless 2016 de EOX (licencia CC BY 4.0, atribución obligatoria).
// Resolución de 10 m: nítida a escala de municipio, borrosa a escala de barrio (desde el zoom 16 se amplía).
const SAT_TILE_URL = 'https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless_3857/default/g/{z}/{y}/{x}.jpg';
const SAT_ATTRIBUTION = '<a href="https://s2maps.eu" target="_blank" rel="noopener">Sentinel-2 cloudless 2016</a> de EOX IT Services GmbH (contiene datos modificados de Copernicus Sentinel 2016), CC BY 4.0';

type MapaBase = 'calles' | 'oscuro' | 'satelite';
const MAPAS_BASE: { id: MapaBase; label: string }[] = [
  { id: 'calles', label: 'Calles' },
  { id: 'oscuro', label: 'Calles (oscuro)' },
  { id: 'satelite', label: 'Satélite' },
];

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
const titulo = (s: string) => s.toLowerCase().replace(/(^|[\s(.-])(\S)/g, (_m, a: string, b: string) => a + b.toUpperCase());

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
  /** Municipio de los niveles 4 y 5 (id del registro de divisiones municipales) */
  selectedMunicipalityId?: string;
  onSelectMunicipality?: (muniId: string) => void;
  /** Comuna abierta: en el nivel de barrios solo se muestran los suyos */
  comunaFiltroId?: string | null;
  /** Clic en una comuna (municipios con nivel de comunas): abre sus barrios */
  onSelectComuna?: (feature: TerritoryGeoFeature) => void;
}

/** Comuna a la que pertenece un barrio o vereda (Medellín usa comunaId; los demás, parentId) */
const comunaDe = (f: TerritoryGeoFeature): string | undefined => {
  const p = f.properties as { parentId?: string; comunaId?: string };
  return p.parentId ?? p.comunaId;
};

export const MultiLevelZoomMap: React.FC<MultiLevelZoomMapProps> = ({
  currentLevel,
  activeLayer,
  searchQuery,
  selectedFeature,
  onSelectFeature,
  onDrillDown,
  onGenerateContent,
  selectedDepartmentName = 'Antioquia',
  onSelectDepartmentName,
  selectedMunicipalityId = 'medellin',
  onSelectMunicipality,
  comunaFiltroId = null,
  onSelectComuna
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const geoJsonLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const [hoveredFeature, setHoveredFeature] = useState<TerritoryGeoFeature | null>(null);
  // Por defecto, calles claras: el estilo aprobado (polígonos translúcidos con borde del mismo tono)
  const [mapaBase, setMapaBase] = useState<MapaBase>('calles');
  // Por defecto, los 125 municipios: son los que se colorean según la capa. Las subregiones se pintan
  // con su color propio (no hay un ganador ni un indicador por subregión).
  const [antioquiaViewMode, setAntioquiaViewMode] = useState<'subregiones' | 'municipios'>('municipios');
  const [customDeptDataset, setCustomDeptDataset] = useState<TerritoryFeatureCollection | null>(null);
  const [isLoadingDept, setIsLoadingDept] = useState<boolean>(false);
  const [deptDropdownOpen, setDeptDropdownOpen] = useState<boolean>(false);

  // Niveles 4 y 5 para municipios distintos de Medellín (se cargan bajo demanda)
  const isMunicipalScale = currentLevel === 'municipal' || currentLevel === 'hiperlocal' || currentLevel === 'comunas-barrios';
  const usesCustomMuni = isMunicipalScale && selectedMunicipalityId !== 'medellin';
  const activeMuni = MUNICIPAL_DIVISIONS_REGISTRY[selectedMunicipalityId] ?? MUNICIPAL_DIVISIONS_REGISTRY.medellin;
  const [customMuniDataset, setCustomMuniDataset] = useState<TerritoryFeatureCollection | null>(null);
  const [isLoadingMuni, setIsLoadingMuni] = useState<boolean>(false);
  const [muniDropdownOpen, setMuniDropdownOpen] = useState<boolean>(false);
  // Barra lateral del mapa (territorio, capa, puestos): se oculta para dejar el mapa libre.
  // La preferencia se recuerda en este navegador.
  const [panelAbierto, setPanelAbierto] = useState<boolean>(() => {
    try { return localStorage.getItem('proteus.mapa.panel') !== 'cerrado'; } catch { return true; }
  });
  const alternarPanel = () => setPanelAbierto((v) => {
    try { localStorage.setItem('proteus.mapa.panel', v ? 'cerrado' : 'abierto'); } catch { /* sin almacenamiento */ }
    return !v;
  });
  // Comunas del municipio, para mostrarlas alrededor de la comuna abierta en el nivel de barrios
  const [divisionesMuni, setDivisionesMuni] = useState<TerritoryFeatureCollection | null>(null);
  useEffect(() => {
    setDivisionesMuni(null);
    if (currentLevel !== 'comunas-barrios' || !activeMuni.nivelComunas || !activeMuni.loadDivisions) return;
    let activo = true;
    activeMuni.loadDivisions()
      .then((fc) => { if (activo) setDivisionesMuni(fc); })
      .catch((e) => console.error('[Proteus] No se pudieron cargar las comunas:', e));
    return () => { activo = false; };
  }, [currentLevel, activeMuni]);

  // Puestos de votación (los 125 municipios de Antioquia y los de más de 20.000 votantes del país; ver pollingStationsService)
  const [showPuestos, setShowPuestos] = useState<boolean>(true);
  const [puestos, setPuestos] = useState<PuestoVotacion[]>([]);
  const [puestosScope, setPuestosScope] = useState<string>('');
  const [asignacion, setAsignacion] = useState<AsignacionPuestos | null>(null);
  const puestosLayerRef = useRef<L.LayerGroup | null>(null);
  const puestosRendererRef = useRef<L.Renderer | null>(null);
  // Círculos dibujados con su censo y si son aproximados, para ajustar el tamaño al cambiar el zoom
  const marcadoresPuestosRef = useRef<[L.CircleMarker, number, boolean][]>([]);
  // Ficha de puesto: se abre al hacer clic en un marcador
  const [puestoSeleccionado, setPuestoSeleccionado] = useState<PuestoVotacion | null>(null);
  // Esc cierra la ficha de puesto
  useEffect(() => {
    if (!puestoSeleccionado) return;
    const alTeclear = (e: KeyboardEvent) => { if (e.key === 'Escape') setPuestoSeleccionado(null); };
    window.addEventListener('keydown', alTeclear);
    return () => window.removeEventListener('keydown', alTeclear);
  }, [puestoSeleccionado]);
  const [eleccionesMuni, setEleccionesMuni] = useState<EleccionPuestos[]>([]);
  // Capa "Resultado electoral": elección que se colorea (2015-2026) y su índice de ganadores por municipio
  const [eleccionCapa, setEleccionCapa] = useState<string>('alcaldia-2023');
  const [indiceGanadores, setIndiceGanadores] = useState<IndiceGanadores | null>(null);
  useEffect(() => {
    if (activeLayer !== 'electoral' || indiceGanadores) return;
    let activo = true;
    cargarGanadores().then((i) => { if (activo) setIndiceGanadores(i); }).catch((e) => console.error('[Proteus] Índice de ganadores:', e));
    return () => { activo = false; };
  }, [activeLayer, indiceGanadores]);
  const candidatosCapa = useMemo(() => (indiceGanadores && colorPorCandidato(eleccionCapa) ? coloresCandidatos(indiceGanadores, eleccionCapa) : []), [indiceGanadores, eleccionCapa]);
  const nombreEleccionCapa = indiceGanadores?.elecciones.find((e) => e.id === eleccionCapa)?.nombre ?? 'Alcaldía 2023';

  // Cámara: última escala encuadrada y límites de la capa visible
  const lastCameraKeyRef = useRef<string>('');
  const lastLayerBoundsRef = useRef<L.LatLngBounds | null>(null);

  // Demografía y economía por manzana del municipio abierto (CNPV 2018). Las cargas guardan en una
  // caché de módulo; estos contadores solo fuerzan el redibujado cuando llegan.
  const [economiaLista, setEconomiaLista] = useState(0);
  const [demografiaLista, setDemografiaLista] = useState(0);
  useEffect(() => {
    if (!isMunicipalScale) return;
    let activo = true;
    cargarEconomia(activeMuni.daneCode).then((ok) => { if (activo && ok) setEconomiaLista((n) => n + 1); });
    cargarDemografia(activeMuni.daneCode).then((ok) => { if (activo && ok) setDemografiaLista((n) => n + 1); });
    return () => { activo = false; };
  }, [isMunicipalScale, activeMuni.daneCode]);

  // Capa electoral: año y tipo de elección. En la escala municipal, las elecciones con puestos del
  // municipio; en las demás, las del índice de ganadores por municipio.
  const eleccionesDisponibles = useMemo(
    () => (isMunicipalScale && eleccionesMuni.length
      ? eleccionesMuni.map((e) => ({ id: e.id, nombre: e.nombre }))
      : indiceGanadores?.elecciones ?? [{ id: 'alcaldia-2023', nombre: 'Alcaldía 2023' }]),
    [isMunicipalScale, eleccionesMuni, indiceGanadores],
  );
  const aniosElectorales = useMemo(() => aniosYTipos(eleccionesDisponibles), [eleccionesDisponibles]);
  const anioCapa = Number(/-(\d{4})(?:-\d)?$/.exec(eleccionCapa)?.[1] ?? 0);
  // Si el municipio abierto no tiene la elección elegida, se pasa a la del mismo tipo más parecida
  useEffect(() => {
    if (!eleccionesDisponibles.length || eleccionesDisponibles.some((e) => e.id === eleccionCapa)) return;
    const anio = aniosElectorales.some((a) => a.anio === anioCapa) ? anioCapa : aniosElectorales[0]?.anio;
    const id = anio ? eleccionDelAnio(eleccionesDisponibles, anio, tipoEleccion(eleccionCapa)) : null;
    if (id) setEleccionCapa(id);
  }, [eleccionesDisponibles, aniosElectorales, eleccionCapa, anioCapa]);

  // Capas demográfica y económica: métrica elegida. Las económicas por manzana solo existen a escala
  // municipal; a escala de municipios, el NBI.
  const [metricaDem, setMetricaDem] = useState<MetricaDemografica>('mujeres');
  const [metricaEco, setMetricaEco] = useState<MetricaEconomica>('estrato');
  const metricasEcoEscala = METRICAS_ECONOMICAS.filter((m) => m.escala === (isMunicipalScale ? 'municipal' : 'departamental'));
  const metricaEcoEfectiva: MetricaEconomica = metricasEcoEscala.some((m) => m.id === metricaEco) ? metricaEco : metricasEcoEscala[0].id;
  const metricaActiva = activeLayer === 'demografico' ? metricaDem : metricaEcoEfectiva;
  const nombreMetrica = activeLayer === 'demografico'
    ? METRICAS_DEMOGRAFICAS.find((m) => m.id === metricaDem)!.nombre
    : METRICAS_ECONOMICAS.find((m) => m.id === metricaEcoEfectiva)!.nombre;
  const esCategorica = activeLayer === 'economico' && metricaEcoEfectiva === 'estrato';
  const paletaCapa = activeLayer === 'demografico' ? PALETA_DEMOGRAFICA : PALETA_ECONOMICA;

  /** Dato demográfico o económico de un territorio visible (o "Sin información") */
  const valorDe = (feature: TerritoryGeoFeature): ValorTerritorio => {
    if (activeLayer === 'electoral') return { valor: null, texto: '', fuente: '' };
    if (isMunicipalScale) return valorSubdivision(String(feature.id), activeLayer, metricaActiva);
    const dane = daneDeFeature(feature);
    return dane ? valorDeMunicipio(dane) : { valor: null, texto: 'Sin información', fuente: '' };
  };
  /** Dato de un municipio por su código DANE (proyección 2026 o NBI) */
  const valorDeMunicipio = (dane: string): ValorTerritorio =>
    activeLayer === 'electoral' ? { valor: null, texto: '', fuente: '' } : valorMunicipio(dane, NBI_POR_DANE.get(dane), activeLayer, metricaActiva);

  /** Capa de polígonos de la escala actual (antes de la búsqueda) */
  const datasetActual = (): TerritoryFeatureCollection | null => {
    let dataset: TerritoryFeatureCollection | null = GEOJSON_LAYERS_BY_ZOOM[currentLevel] ?? null;
    if (currentLevel === 'departamental') {
      const isAntioquia = !selectedDepartmentName || selectedDepartmentName.toLowerCase() === 'antioquia';
      if (isAntioquia) dataset = antioquiaViewMode === 'subregiones' ? SubregionAggregationEngine.buildSubregionDataset() : ANTIOQUIA_125_MUNICIPIOS_GEOJSON;
      else if (customDeptDataset) dataset = customDeptDataset;
    }
    if (usesCustomMuni) dataset = customMuniDataset;
    return dataset;
  };

  // Clases de la escala continua: quintiles de los valores de los territorios visibles
  const escalaCapa = useMemo(() => {
    if (activeLayer === 'electoral' || esCategorica) return null;
    // Subregiones: se pintan con su color propio; la escala sirve para los puestos (valor de su municipio)
    const enSubregiones = currentLevel === 'departamental' && antioquiaViewMode === 'subregiones';
    const base = enSubregiones ? ANTIOQUIA_125_MUNICIPIOS_GEOJSON : datasetActual();
    const feats = (base?.features ?? []).filter((f) => !(currentLevel === 'comunas-barrios' && comunaFiltroId && comunaDe(f) !== comunaFiltroId));
    const valores = feats.map((f) => valorDe(f).valor).filter((v): v is number => v !== null);
    return { valores, cortes: cortesQuintiles(valores) };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLayer, esCategorica, metricaActiva, currentLevel, antioquiaViewMode, selectedDepartmentName, customDeptDataset, usesCustomMuni, customMuniDataset, comunaFiltroId, economiaLista, demografiaLista]);

  const colorDeValor = (v: number | null) => (esCategorica ? colorEstrato(v) : colorPorCortes(v, escalaCapa?.cortes ?? [], paletaCapa));

  // Color de cada territorio según la capa
  const getFeatureColor = (feature: TerritoryGeoFeature): string => {
    const p = feature.properties;

    if (activeLayer === 'electoral') {
      // Elección elegida (2015-2026): municipio por municipio, o comuna/barrio/vereda por sus puestos.
      // Presidencia: color por candidato; las demás, por el partido del ganador o de la lista más votada.
      if (indiceGanadores || isMunicipalScale) return colorGanador(eleccionCapa, ganadorDe(feature), candidatosCapa);
      // Mientras carga el índice: Alcaldía 2023 del maestro de municipios
      if (!p.winnerParty && !p.predominantParty) return COLOR_SIN_DATO;
      return colorDePartido(p.predominantParty || p.winnerParty).color;
    }

    return colorDeValor(valorDe(feature).valor);
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
        // La licencia de OpenStreetMap exige mostrar la atribución
        attributionControl: true
      });
      map.attributionControl.setPrefix(false);
      map.attributionControl.setPosition('bottomright');

      // Dedicated layer group for GeoJSON
      const lg = L.layerGroup().addTo(map);
      geoJsonLayerGroupRef.current = lg;

      // Puestos de votación: panel propio por encima de los polígonos. Va en SVG y el panel no
      // recibe clics: solo los círculos. Antes era un canvas que cubría todo el mapa y se quedaba
      // con los clics de comunas y barrios.
      map.createPane('puestos');
      const panelPuestos = map.getPane('puestos')!;
      panelPuestos.style.zIndex = '450';
      panelPuestos.style.pointerEvents = 'none';
      puestosRendererRef.current = L.svg({ pane: 'puestos' });
      puestosLayerRef.current = L.layerGroup().addTo(map);
      // Clic en cualquier otra cosa del mapa (fondo, comuna, barrio, municipio vecino) cierra la
      // ficha de puesto. El clic en un puesto no llega aquí (bubblingMouseEvents: false).
      map.on('click', () => setPuestoSeleccionado(null));
      // Tamaño de los puestos según el zoom: al alejar se achican y su borde se adelgaza
      map.on('zoomend', () => {
        const z = map.getZoom();
        for (const [m, habilitados, aproximado] of marcadoresPuestosRef.current) {
          m.setRadius(radioPuesto(habilitados, z));
          m.setStyle({ weight: bordePuesto(z) * (aproximado ? 1.5 : 1) });
        }
      });
      mapInstanceRef.current = map;
    }

    return () => {
      // Liberar el mapa de Leaflet al salir de la vista (antes quedaba en memoria)
      mapInstanceRef.current?.remove();
      mapInstanceRef.current = null;
      geoJsonLayerGroupRef.current = null;
      puestosLayerRef.current = null;
      puestosRendererRef.current = null;
    };
  }, []);

  // Mapa base: teselas estándar de OpenStreetMap (sin API key). El modo oscuro no usa otro
  // proveedor: oscurece las mismas teselas con un filtro CSS sobre su capa.
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    if (mapaBase === 'satelite') {
      L.tileLayer(SAT_TILE_URL, {
        maxZoom: 19,
        maxNativeZoom: 17,
        attribution: SAT_ATTRIBUTION,
      }).addTo(map);
    } else {
      L.tileLayer(OSM_TILE_URL, {
        maxZoom: 19,
        attribution: OSM_ATTRIBUTION,
        className: mapaBase === 'oscuro' ? 'proteus-basemap-dark' : '',
      }).addTo(map);
    }
  }, [mapaBase]);

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

  // Cargar divisiones (nivel 4) o subdivisiones (nivel 5) del municipio seleccionado
  useEffect(() => {
    setCustomMuniDataset(null);
    if (!usesCustomMuni) return;
    const entry = MUNICIPAL_DIVISIONS_REGISTRY[selectedMunicipalityId];
    // Sin nivel de comunas (regla de niveles en municipalDivisions.ts), el nivel 4 ya muestra barrios/veredas
    const loader = currentLevel === 'comunas-barrios' || entry?.nivelComunas === false
      ? (entry?.loadSubdivisions ?? entry?.loadDivisions)
      : entry?.loadDivisions;
    if (!loader) return;
    let active = true;
    setIsLoadingMuni(true);
    loader()
      .then((fc) => { if (active) setCustomMuniDataset(fc); })
      .catch((e) => console.error('[Proteus] No se pudo cargar la cartografía municipal:', e))
      .finally(() => { if (active) setIsLoadingMuni(false); });
    return () => { active = false; };
  }, [currentLevel, selectedMunicipalityId, usesCustomMuni]);

  // Cargar los puestos del territorio visible: departamento (nivel 2), Valle de Aburrá (nivel 3)
  // o municipio (niveles 4 y 5)
  useEffect(() => {
    let scope = '';
    let load: (() => Promise<PuestoVotacion[]>) | null = null;
    if (currentLevel === 'departamental') {
      const dept = selectedDepartmentName || 'Antioquia';
      scope = `Puestos de ${dept}`;
      load = () => loadTodosPuestosDepartamento(dept);
    } else if (currentLevel === 'metropolitano') {
      const codigos = new Set(MUNICIPIOS_20K.filter((m) => m.dane && VALLE_ABURRA_DANE.has(m.dane)).map((m) => m.codMunicipio));
      scope = 'Puestos del Valle de Aburrá';
      load = () => loadPuestosDepartamento('antioquia').then((l) => l.filter((p) => codigos.has(p.codMunicipio)));
    } else if (isMunicipalScale) {
      const m = getMunicipioConPuestos(activeMuni.name, activeMuni.department);
      if (m) {
        scope = `Puestos de ${activeMuni.name}`;
        load = () => loadPuestosMunicipio(m);
      }
    }
    setPuestosScope(scope);
    setPuestoSeleccionado(null);
    if (!load) {
      setPuestos([]);
      return;
    }
    let active = true;
    load()
      .then((l) => { if (active) setPuestos(l); })
      .catch((e) => console.error('[Proteus] No se pudieron cargar los puestos de votación:', e));
    return () => { active = false; };
  }, [currentLevel, selectedDepartmentName, isMunicipalScale, activeMuni.name, activeMuni.department]);

  // Resultados por puesto (códigos 2026: Congreso y Presidencia comparten código con el censo) para la
  // ficha de puesto que se abre al hacer clic en un marcador.
  useEffect(() => {
    if (!isMunicipalScale) {
      setEleccionesMuni([]);
      return;
    }
    let active = true;
    cargarElecciones(activeMuni.daneCode).then((l) => { if (active) setEleccionesMuni(l); });
    return () => { active = false; };
  }, [isMunicipalScale, activeMuni.daneCode]);

  // Capa electoral fuera de la escala municipal: resultados por puesto de cada municipio visible
  // (solo Antioquia los tiene). Se cargan todos y se dibujan de una vez.
  const [eleccionesPorDane, setEleccionesPorDane] = useState<Record<string, EleccionPuestos[]>>({});
  const [cargandoResultados, setCargandoResultados] = useState(false);
  const danesPuestos = useMemo(
    () => [...new Set(puestos.map((p) => daneMunicipioPuestos(p.codMunicipio)).filter((d): d is string => !!d && tieneResultadosPorPuesto(d)))].sort().join(','),
    [puestos],
  );
  useEffect(() => {
    if (isMunicipalScale || activeLayer !== 'electoral' || !danesPuestos) return;
    const danes = danesPuestos.split(',');
    if (danes.every((d) => eleccionesPorDane[d])) return;
    let activo = true;
    setCargandoResultados(true);
    Promise.all(danes.map((d) => cargarElecciones(d).then((l) => [d, l] as const)))
      .then((pares) => { if (activo) setEleccionesPorDane((prev) => ({ ...prev, ...Object.fromEntries(pares) })); })
      .catch((e) => console.error('[Proteus] Resultados por puesto:', e))
      .finally(() => { if (activo) setCargandoResultados(false); });
    return () => { activo = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMunicipalScale, activeLayer, danesPuestos]);

  // Ubicar los puestos en las comunas, barrios o veredas visibles (solo escala municipal)
  const municipalFeatures = isMunicipalScale ? (usesCustomMuni ? customMuniDataset?.features : GEOJSON_LAYERS_BY_ZOOM[currentLevel]?.features) : undefined;
  // Ganador de la elección elegida en cada comuna/barrio/vereda (suma de los puestos que caen dentro)
  const ganadorTerritorio = useMemo(() => {
    const e = eleccionesMuni.find((x) => x.id === eleccionCapa);
    return e && municipalFeatures?.length ? ganadoresPorTerritorio(e, municipalFeatures, puestos) : {};
  }, [eleccionesMuni, eleccionCapa, municipalFeatures, puestos]);
  const ganadorDe = (feature: TerritoryGeoFeature) => {
    if (isMunicipalScale) return ganadorTerritorio[String(feature.id)];
    const dane = (feature.properties as { daneCode?: string }).daneCode ?? /(\d{5})$/.exec(String(feature.id))?.[1];
    const g = dane ? indiceGanadores?.ganadores[eleccionCapa]?.[dane] : undefined;
    return g ? { ganador: g[0], partido: g[1], pct: g[2], votantes: g[3], puestos: 0 } : undefined;
  };
  useEffect(() => {
    if (!municipalFeatures?.length || !puestos.length) {
      setAsignacion(null);
      return;
    }
    setAsignacion(asignarPuestosATerritorios(puestos, municipalFeatures));
  }, [puestos, municipalFeatures]);

  // Dibujar los puestos
  useEffect(() => {
    const layer = puestosLayerRef.current;
    const renderer = puestosRendererRef.current;
    if (!layer || !renderer) return;
    layer.clearLayers();
    if (!showPuestos) return;
    const featurePorId: Record<string, TerritoryGeoFeature> = {};
    for (const f of municipalFeatures ?? []) featurePorId[String(f.id)] = f;
    const municipioDe = nombreMunicipioPuestos;
    const zoom = mapInstanceRef.current?.getZoom() ?? 12;
    marcadoresPuestosRef.current = [];
    // Borde: blanco si la ubicación es la del puesto; ámbar punteado si es aproximada. El radio y el
    // grosor dependen del zoom (se ajustan en 'zoomend') para que al alejar no tapen los territorios.
    const circulo = (lat: number, lon: number, habilitados: number, fillColor: string, aproximado: boolean) => {
      const m = L.circleMarker([lat, lon], {
        renderer, radius: radioPuesto(habilitados, zoom), fillColor, fillOpacity: 0.9, bubblingMouseEvents: false,
        color: aproximado ? '#f59e0b' : '#f8fafc', dashArray: aproximado ? '2, 2' : undefined, weight: bordePuesto(zoom) * (aproximado ? 1.5 : 1),
      });
      marcadoresPuestosRef.current.push([m, habilitados, aproximado]);
      return m;
    };

    // Capa electoral: los puestos DE ESA ELECCIÓN (los códigos y ubicaciones cambian por elección),
    // coloreados por el ganador en cada puesto. Fuera de la escala municipal, municipio por municipio.
    if (activeLayer === 'electoral') {
      const grupos: { e: EleccionPuestos; puestos2026: PuestoVotacion[]; municipio: string }[] = [];
      if (isMunicipalScale) {
        const e = eleccionesMuni.find((x) => x.id === eleccionCapa);
        if (e) grupos.push({ e, puestos2026: puestos, municipio: activeMuni.name });
      } else {
        const porDane = new globalThis.Map<string, PuestoVotacion[]>();
        for (const p of puestos) {
          const dane = daneMunicipioPuestos(p.codMunicipio);
          if (dane) porDane.set(dane, [...(porDane.get(dane) ?? []), p]);
        }
        for (const [dane, ps] of porDane) {
          const e = eleccionesPorDane[dane]?.find((x) => x.id === eleccionCapa);
          if (e) grupos.push({ e, puestos2026: ps, municipio: titulo(municipioDe(ps[0].codMunicipio)) });
        }
      }
      for (const { e, puestos2026, municipio } of grupos) {
        for (const pt of puntosEleccion(e, puestos2026)) {
          const color = colorGanador(eleccionCapa, pt.ganador ? { ganador: pt.ganador, partido: pt.partido! } : undefined, candidatosCapa);
          const marker = circulo(pt.lat, pt.lon, pt.habilitados, color, pt.aproximado);
          marker.bindTooltip(
            `<div style="font-family: system-ui, sans-serif; font-size: 11px; max-width: 260px;">
              <div style="color: #34d399; font-size: 9px; text-transform: uppercase; font-weight: 800;">Puesto · ${escapeHtml(municipio)} · ${escapeHtml(e.nombre)}</div>
              <div style="color: #ffffff; font-size: 12px; font-weight: 900;">${escapeHtml(titulo(pt.nombre))}</div>
              <div style="color: #ffffff; margin-top: 3px; font-weight: 800;">${pt.ganador ? `${escapeHtml(pt.ganador)}${pt.partido && pt.partido !== pt.ganador ? ` (${escapeHtml(pt.partido)})` : ''} · ${pt.pct!.toFixed(1).replace('.', ',')} %` : 'Sin votos registrados'}</div>
              <div style="color: #cbd5e1;">${pt.habilitados.toLocaleString('es-CO')} habilitados · ${e.tipo === 'preconteo' ? 'preconteo' : 'escrutinio'} de la Registraduría</div>
              ${pt.aproximado ? '<div style="color: #fbbf24; font-size: 9px; margin-top: 2px;">Ubicación aproximada (cabecera o vereda)</div>' : ''}
            </div>`,
            { sticky: true, className: 'leaflet-glass-tooltip' },
          );
          if (pt.puesto2026) marker.on('click', () => setPuestoSeleccionado(pt.puesto2026));
          layer.addLayer(marker);
        }
      }
      if (grupos.length) return;
      // Sin resultados por puesto (otro departamento, o todavía cargando): puestos 2026 en neutro
    }

    for (const p of puestos) {
      if (!tieneCoordenadas(p)) continue;
      const d = p.divipole2023;
      const aproximado = d.cruce === 'aproximado' || d.precision === 'aproximada';
      const territorio = asignacion?.territorioDePuesto[p.codPuesto];
      const fTerritorio = territorio ? featurePorId[territorio] : undefined;
      // Demográfica y económica: % de mujeres del propio puesto (censo 2026); los demás indicadores no
      // existen por puesto y se toma el color del barrio o vereda donde está (escala municipal) o el de
      // su municipio (escalas mayores).
      let fillColor = COLOR_PUESTO_NEUTRO;
      let dato = activeLayer === 'electoral' ? (cargandoResultados ? 'Cargando resultados por puesto…' : 'Sin resultados por puesto de esta elección') : '';
      if (activeLayer !== 'electoral') {
        if (activeLayer === 'demografico' && metricaDem === 'mujeres' && p.mujeres + p.hombres > 0) {
          const v = (100 * p.mujeres) / (p.mujeres + p.hombres);
          fillColor = colorDeValor(v);
          dato = `Mujeres en el censo 2026 del puesto: ${v.toFixed(1).replace('.', ',')} %`;
        } else if (isMunicipalScale) {
          const v = fTerritorio ? valorDe(fTerritorio) : null;
          fillColor = colorDeValor(v?.valor ?? null);
          dato = v ? `${nombreMetrica} del territorio donde está: ${v.texto}` : `${nombreMetrica}: sin información (el puesto no cae en ningún territorio de la capa)`;
        } else {
          const dane = daneMunicipioPuestos(p.codMunicipio);
          const v = dane ? valorDeMunicipio(dane) : null;
          fillColor = colorDeValor(v?.valor ?? null);
          dato = `${nombreMetrica} de su municipio: ${v?.texto ?? 'Sin información'}`;
        }
      }
      const marker = circulo(d.lat, d.lon, p.total, fillColor, aproximado);
      marker.bindTooltip(
        `<div style="font-family: system-ui, sans-serif; font-size: 11px; max-width: 260px;">
          <div style="color: #34d399; font-size: 9px; text-transform: uppercase; font-weight: 800;">Puesto de votación · ${escapeHtml(municipioDe(p.codMunicipio))}</div>
          <div style="color: #ffffff; font-size: 12px; font-weight: 900;">${escapeHtml(p.puesto)}</div>
          ${d.direccion ? `<div style="color: #cbd5e1;">${escapeHtml(d.direccion)}</div>` : ''}
          ${d.comuna ? `<div style="color: #94a3b8;">Registraduría: ${escapeHtml(d.comuna)}</div>` : ''}
          ${fTerritorio ? `<div style="color: #7dd3fc;">En el mapa: ${escapeHtml(fTerritorio.properties.name)}</div>` : ''}
          <div style="color: #ffffff; margin-top: 3px; font-weight: 800;">Censo 2026: ${p.total.toLocaleString('es-CO')} · ${p.mesas} mesas</div>
          ${dato ? `<div style="color: #e2e8f0; margin-top: 2px;">${escapeHtml(dato)}</div>` : ''}
          <div style="color: ${aproximado ? '#fbbf24' : '#94a3b8'}; font-size: 9px; margin-top: 2px;">${escapeHtml(describirCruce(p))}</div>
        </div>`,
        { sticky: true, className: 'leaflet-glass-tooltip' },
      );
      marker.on('click', () => setPuestoSeleccionado(p));
      layer.addLayer(marker);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [puestos, showPuestos, asignacion, municipalFeatures, activeLayer, eleccionCapa, eleccionesMuni, eleccionesPorDane, cargandoResultados, candidatosCapa, isMunicipalScale, escalaCapa, metricaActiva, metricaDem, economiaLista, demografiaLista]);

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
    if (usesCustomMuni) {
      // Municipio sin cartografía (o todavía cargando): no se muestra la capa de Medellín
      if (!customMuniDataset) return;
      dataset = customMuniDataset;
    }
    if (!dataset) return;

    // Comuna abierta: solo sus barrios y veredas
    const verSoloComuna = currentLevel === 'comunas-barrios' && comunaFiltroId;
    // Clic en una comuna abre sus barrios (solo municipios con nivel de comunas)
    const abreBarrios = (currentLevel === 'municipal' || currentLevel === 'hiperlocal') && activeMuni.nivelComunas && !!onSelectComuna;

    // Filter features if searchQuery is present
    const filteredFeatures = dataset.features.filter((f) => {
      if (verSoloComuna && comunaDe(f) !== comunaFiltroId) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        f.properties.name.toLowerCase().includes(q) ||
        ((f.properties as any).daneCode && (f.properties as any).daneCode.includes(q)) ||
        (f.properties.predominantParty && f.properties.predominantParty.toLowerCase().includes(q)) ||
        (f.properties.subregion && f.properties.subregion.toLowerCase().includes(q))
      );
    });

    // Contexto clicable debajo de la capa principal: los demás municipios de Antioquia (abrir otro
    // municipio sin volver a la subregión) y las demás comunas del municipio (cambiar de comuna
    // sin volver al nivel de comunas). No se superponen con lo que se está viendo.
    const estiloContexto: L.PathOptions = { fillColor: '#94a3b8', fillOpacity: 0.06, color: '#64748b', weight: 1, dashArray: '2, 3', opacity: 0.7 };
    const agregarContexto = (features: TerritoryGeoFeature[], etiqueta: string, alHacerClic: (f: TerritoryGeoFeature) => void) => {
      if (!features.length) return;
      layerGroup.addLayer(L.geoJSON({ type: 'FeatureCollection', features } as any, {
        style: () => estiloContexto,
        onEachFeature: (feat: any, layer: L.Layer) => {
          const f = feat as TerritoryGeoFeature;
          layer.bindTooltip(
            `<div style="font-family: system-ui, sans-serif; font-weight: 700; font-size: 11px;">
              <div style="color: #94a3b8; font-size: 9px; text-transform: uppercase;">${etiqueta}</div>
              <div style="color: #ffffff; font-size: 12px; font-weight: 900;">${escapeHtml(f.properties.name)}</div>
              <div style="color: #34d399; font-size: 9px; margin-top: 3px;">Clic para abrir</div>
            </div>`,
            { sticky: true, className: 'leaflet-glass-tooltip' }
          );
          layer.on({
            mouseover: (e: any) => e.target.setStyle({ fillOpacity: 0.2, weight: 2 }),
            mouseout: (e: any) => e.target.setStyle(estiloContexto),
            click: () => alHacerClic(f),
          });
        },
      }));
    };
    if (isMunicipalScale && activeMuni.department === 'Antioquia') {
      agregarContexto(
        ANTIOQUIA_125_MUNICIPIOS_GEOJSON.features.filter((f) => (f.properties as { daneCode?: string }).daneCode !== activeMuni.daneCode),
        'Otro municipio',
        (f) => {
          const muni = resolveMunicipality({ id: f.id, name: f.properties.name, daneCode: (f.properties as { daneCode?: string }).daneCode });
          if (!muni?.disponible) return;
          onSelectMunicipality?.(muni.id);
          onDrillDown('municipal', String(f.id));
        },
      );
    }
    if (verSoloComuna && divisionesMuni && onSelectComuna) {
      agregarContexto(
        divisionesMuni.features.filter((f) => f.id !== comunaFiltroId && f.id !== 'medellin-base-outline'),
        'Otra comuna',
        onSelectComuna,
      );
    }

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

        // 2. Corregimientos: color de la capa, con borde punteado para distinguirlos de las comunas
        if ((feature.properties as any).isCorregimiento || feature.id.includes('correg')) {
          const colorCorreg = getFeatureColor(feature);
          return {
            fillColor: colorCorreg,
            fillOpacity: isSelected ? 0.65 : 0.32,
            color: isSelected ? '#ffffff' : colorCorreg,
            weight: isSelected ? 3 : 2,
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

        // Contorno del distrito de Medellín: solo dibujo. Cubre todas las comunas y, si recibiera
        // eventos, se quedaría con sus clics. (Se fija antes de que la capa entre al mapa.)
        if (feature.id === 'medellin-base-outline') {
          (layer as L.Path).options.interactive = false;
          return;
        }

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

            if (isCorreg) {
              const colorCorreg = getFeatureColor(feature);
              l.setStyle({
                fillColor: colorCorreg,
                fillOpacity: isSelected ? 0.65 : 0.32,
                color: isSelected ? '#ffffff' : colorCorreg,
                weight: isSelected ? 3 : 2,
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
            // Comuna: abrir sus barrios (el encuadre lo hace el cambio de escala)
            if (abreBarrios) {
              onSelectComuna!(feature);
              return;
            }

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

            // Drill down a las divisiones internas de un municipio registrado
            if (currentLevel === 'departamental' || currentLevel === 'metropolitano') {
              const muni = resolveMunicipality({ id: feature.id, name: p.name, daneCode: (p as any).daneCode });
              if (muni?.disponible) {
                onSelectMunicipality?.(muni.id);
                onDrillDown('municipal', feature.id);
                return;
              }
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

        const isCorregimiento = Boolean((feature.properties as any).isCorregimiento || feature.id.includes('correg'));
        const metricDisplay = 
          activeLayer === 'electoral' ? (() => {
            const g = ganadorDe(feature);
            if (g) return `${nombreEleccionCapa}: ${g.ganador}${g.partido !== g.ganador ? ` (${g.partido})` : ''} · ${g.pct.toFixed(1)} %`;
            return `${(p as any).tipo || 'Territorio'}${(p as any).parentName ? ' · ' + (p as any).parentName : ''} · sin puestos de ${nombreEleccionCapa} dentro`;
          })() :
          (() => {
            const v = valorDe(feature);
            return `${escapeHtml(nombreMetrica)}: ${escapeHtml(v.texto)}${v.fuente ? ` · ${escapeHtml(v.fuente)}` : ''}`;
          })();

        const daneCodeHtml = (p as any).daneCode ? `<div style="color: #38bdf8; font-size: 9px; font-family: monospace;">DIVIPOLA DANE: ${(p as any).daneCode}</div>` : '';
        const subregHtml = p.subregionCanonical 
          ? `<div style="color: #38bdf8; font-size: 10px; font-weight: bold;">Subregión: ${p.subregionCanonical}</div>`
          : (p.subregion ? `<div style="color: #94a3b8; font-size: 10px;">Subregión: ${p.subregion}</div>` : '');
        const corregimientoHtml = isCorregimiento 
          ? `<div style="color: #fbbf24; font-size: 10px; font-weight: 800; margin-top: 2px;">Corregimiento (zona rural)</div>`
          : '';

        layer.bindTooltip(
          `<div style="font-family: system-ui, sans-serif; font-weight: 700; font-size: 11px;">
            ${p.level ? `<div style="color: #38bdf8; font-size: 9px; text-transform: uppercase;">${p.level}</div>` : ''}
            <div style="color: #ffffff; font-size: 12px; font-weight: 900;">${p.name}</div>
            ${daneCodeHtml}
            ${subregHtml}
            ${corregimientoHtml}
            <div style="color: #cbd5e1; margin-top: 2px;">${metricDisplay}</div>
            ${asignacion?.porTerritorio[String(feature.id)] ? `<div style="color: #34d399; margin-top: 2px;">Censo en sus puestos: ${asignacion.porTerritorio[String(feature.id)].censo.toLocaleString('es-CO')} · ${asignacion.porTerritorio[String(feature.id)].puestos} puestos</div>` : ''}
            ${abreBarrios
              ? '<div style="color: #34d399; font-size: 9px; margin-top: 3px;">Clic para ver sus barrios</div>'
              : (p.isInteractiveTarget || currentLevel === 'nacional') ? '<div style="color: #34d399; font-size: 9px; margin-top: 3px;">✨ Clic para hacer zoom</div>' : ''}
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

    const cameraKey = [currentLevel, antioquiaViewMode, selectedDepartmentName, customDeptDataset?.name, usesCustomMuni ? selectedMunicipalityId : 'medellin', customMuniDataset?.name, verSoloComuna ? comunaFiltroId : ''].join('|');
    if (cameraKey !== lastCameraKeyRef.current) {
      lastCameraKeyRef.current = cameraKey;
      if (layerBounds) {
        map.flyToBounds(layerBounds, { duration: 1.2, padding: [30, 30] });
      } else if (dataset.center) {
        map.flyTo(dataset.center, dataset.defaultZoom || 8, { duration: 1.2, easeLinearity: 0.25 });
      }
    }

  }, [currentLevel, activeLayer, searchQuery, selectedFeature, antioquiaViewMode, selectedDepartmentName, customDeptDataset, usesCustomMuni, customMuniDataset, asignacion, economiaLista, eleccionCapa, indiceGanadores, ganadorTerritorio, comunaFiltroId, onSelectComuna, divisionesMuni, escalaCapa, metricaActiva, demografiaLista]);

  // Leyenda honesta: cuántos territorios de la escala actual no tienen dato de partido
  // (se pintan con el color de su agrupación territorial, no con un color de partido)
  const legendFeatures = (usesCustomMuni ? customMuniDataset?.features : GEOJSON_LAYERS_BY_ZOOM[currentLevel]?.features) || [];
  const featuresWithoutParty = legendFeatures.filter(
    (f) => !f.properties.winnerParty && !f.properties.predominantParty
  ).length;

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

      {/* Barra lateral ocultable: territorio, contenido, capa y puestos (antes flotaban sobre el mapa) */}
      {!panelAbierto && (
        <button
          onClick={alternarPanel}
          className="absolute top-4 left-4 z-20 px-3 py-2 rounded-xl bg-slate-950/85 hover:bg-slate-900 text-slate-200 hover:text-white border border-white/20 backdrop-blur-xl shadow-lg text-xs font-bold flex items-center gap-2 transition"
          title="Mostrar la barra lateral del mapa"
          aria-expanded={false}
        >
          <PanelLeftOpen className="w-4 h-4 text-sky-400" />
          Capas y leyenda
        </button>
      )}
      <aside
        className={`absolute top-0 left-0 bottom-0 z-20 w-72 max-w-[85%] flex flex-col gap-2 p-2 overflow-y-auto bg-slate-950/90 backdrop-blur-2xl border-r border-white/20 shadow-2xl transition-transform duration-300 ${panelAbierto ? 'translate-x-0' : '-translate-x-full pointer-events-none'}`}
        aria-label="Barra lateral del mapa"
        aria-hidden={!panelAbierto}
      >
        <div className="flex items-center justify-between px-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Capas y leyenda</span>
          <button onClick={alternarPanel} className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white" title="Ocultar la barra lateral" aria-expanded={true}>
            <PanelLeftClose className="w-4 h-4" />
          </button>
        </div>

      {/* Generar contenido para el territorio seleccionado */}
      {selectedFeature && onGenerateContent && (
        <button
          onClick={() => onGenerateContent(selectedFeature)}
          className="w-full px-3 py-2 rounded-xl bg-gradient-to-r from-sky-500/90 to-blue-600/90 hover:from-sky-400 hover:to-indigo-500 text-white text-xs font-black border border-white/40 flex items-center gap-2 transition text-left"
          title={`Generar contenido con IA para ${selectedFeature.properties.name}`}
        >
          <Megaphone className="w-4 h-4 text-sky-200 shrink-0" />
          <span>Generar contenido: {selectedFeature.properties.name}</span>
        </button>
      )}

      {/* Antioquia Toggle / Department Selector */}
      {currentLevel === 'departamental' && (
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-white/5 border border-white/10">
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
              <div className="mt-1.5 w-full max-h-60 overflow-y-auto rounded-xl bg-slate-900/95 border border-white/20 p-1 space-y-0.5">
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

      {/* Selector de municipio (niveles 4 y 5) */}
      {isMunicipalScale && (
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-white/5 border border-white/10">
          <div className="px-2 py-1 text-xs">
            <div className="font-black text-amber-300 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-amber-400" />
              {activeMuni.name}: {currentLevel === 'comunas-barrios' || !activeMuni.nivelComunas ? (activeMuni.subdivisionLabel || activeMuni.divisionLabel) : activeMuni.divisionLabel}
              {isLoadingMuni && <span className="text-slate-400 font-medium">(cargando…)</span>}
            </div>
            <div className={`text-[10px] ${activeMuni.confianza === 'oficial' ? 'text-emerald-300' : 'text-amber-200/80'}`}>
              {activeMuni.confianza === 'oficial' ? 'Fuente oficial' : 'Fuente por verificar'}: {activeMuni.fuente}
            </div>
            {(activeMuni.nota || !activeMuni.disponible) && (
              <div className="text-[10px] text-slate-400 max-w-md">{activeMuni.nota}</div>
            )}
          </div>
          {onSelectMunicipality && (
            <div className="relative">
              <button
                onClick={() => setMuniDropdownOpen(!muniDropdownOpen)}
                className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15 flex items-center gap-1 transition"
                title="Cambiar de municipio"
              >
                <span>Municipio</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
              {muniDropdownOpen && (
                <div className="mt-1.5 w-60 max-w-full max-h-60 overflow-y-auto rounded-xl bg-slate-900/95 border border-white/20 p-1 space-y-0.5">
                  {Object.values(MUNICIPAL_DIVISIONS_REGISTRY).map((m) => {
                    const isCur = m.id === activeMuni.id;
                    return (
                      <button
                        key={m.id}
                        disabled={!m.disponible}
                        onClick={() => {
                          onSelectMunicipality(m.id);
                          setMuniDropdownOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs flex items-center justify-between transition ${
                          isCur
                            ? 'bg-sky-500/30 text-sky-200 font-bold border border-sky-400/40'
                            : m.disponible ? 'text-slate-300 hover:bg-white/10 hover:text-white' : 'text-slate-500 cursor-not-allowed'
                        }`}
                      >
                        <span>{m.name}{!m.disponible && ' (sin cartografía)'}</span>
                        {isCur && <Check className="w-3 h-3 text-sky-400" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Leyenda de la capa temática */}
      <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
        <div className="flex items-center justify-between gap-2 mb-2 pb-1 border-b border-white/10">
          <span className="font-bold text-white uppercase text-[10px] tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-sky-400" />
            Capa {activeLayer === 'electoral' ? 'electoral' : activeLayer === 'demografico' ? 'demográfica' : 'económica'}
          </span>
          <span className="text-[10px] font-mono text-sky-300">
            {isMunicipalScale ? activeMuni.name : (ZOOM_LEVELS_CONFIG[currentLevel]?.shortLabel || 'Nivel ' + currentLevel)}
          </span>
        </div>
        
        {/* Color scale samples */}
        <div className="space-y-1 text-[11px] text-slate-300 font-medium">
          {activeLayer === 'electoral' && (
            <>
              <div className="grid grid-cols-[5rem_1fr] gap-1.5 mb-1">
                <label className="flex flex-col gap-0.5">
                  <span className="text-[10px] text-slate-400">Año</span>
                  <select
                    value={anioCapa}
                    onChange={(e) => {
                      const id = eleccionDelAnio(eleccionesDisponibles, Number(e.target.value), tipoEleccion(eleccionCapa));
                      if (id) setEleccionCapa(id);
                    }}
                    className="text-xs rounded px-1 py-0.5"
                  >
                    {aniosElectorales.map((a) => <option key={a.anio} value={a.anio}>{a.anio}</option>)}
                  </select>
                </label>
                <label className="flex flex-col gap-0.5">
                  <span className="text-[10px] text-slate-400">Tipo de elección</span>
                  <select value={eleccionCapa} onChange={(e) => setEleccionCapa(e.target.value)} className="text-xs rounded px-1 py-0.5">
                    {(aniosElectorales.find((a) => a.anio === anioCapa)?.tipos ?? []).map((t) => <option key={t.id} value={t.id}>{t.nombre}</option>)}
                  </select>
                </label>
              </div>
              {colorPorCandidato(eleccionCapa) ? (
                <>
                  <div className="text-[10px] text-slate-400">Por candidato (sus partidos suelen ser coaliciones sin color propio)</div>
                  {candidatosCapa.map((c) => (
                    <div key={c.nombre} className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full inline-block" style={{ background: c.color }} />
                      <span>{c.nombre}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full inline-block" style={{ background: COLOR_OTRO_CANDIDATO }} />
                    <span>Otro candidato (ganó puestos, no municipios)</span>
                  </div>
                </>
              ) : LEYENDA_PARTIDOS.map((pc) => (
                <div key={pc.etiqueta} className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full inline-block" style={{ background: pc.color }} />
                  <span>{pc.etiqueta}</span>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full inline-block" style={{ background: COLOR_SIN_DATO }} />
                <span>Sin dato</span>
              </div>
              {currentLevel === 'departamental' && antioquiaViewMode === 'subregiones' && (
                <div className="pt-1 mt-1 border-t border-white/10 text-[10px] leading-snug text-amber-200">
                  Las subregiones se pintan con su color propio. Cambia a "125 Municipios" para ver el ganador de cada municipio.
                </div>
              )}
              {featuresWithoutParty > 0 && (
                <div className="pt-1 mt-1 border-t border-white/10 text-[10px] leading-snug text-slate-400">
                  {isMunicipalScale
                    ? 'Cada territorio suma los puestos que caen dentro; los que no tienen puestos de esa elección se pintan en gris.'
                    : `${featuresWithoutParty} territorios sin dato de partido: se pintan en gris.`}
                </div>
              )}
            </>
          )}

          {activeLayer !== 'electoral' && (
            <>
              <label className="flex flex-col gap-0.5 mb-1">
                <span className="text-[10px] text-slate-400">Indicador</span>
                <select
                  value={metricaActiva}
                  onChange={(e) => (activeLayer === 'demografico' ? setMetricaDem(e.target.value as MetricaDemografica) : setMetricaEco(e.target.value as MetricaEconomica))}
                  className="text-xs rounded px-1 py-0.5"
                >
                  {(activeLayer === 'demografico' ? METRICAS_DEMOGRAFICAS : metricasEcoEscala).map((m) => <option key={m.id} value={m.id}>{m.nombre}</option>)}
                </select>
              </label>
              {currentLevel === 'departamental' && antioquiaViewMode === 'subregiones' ? (
                <div className="text-[10px] text-slate-400 leading-snug">Las subregiones se pintan con su color propio. Cambia a "125 Municipios" para ver este indicador.</div>
              ) : esCategorica ? (
                COLORES_ESTRATO.map((c, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full inline-block" style={{ background: c }} />
                    <span>Estrato {i + 1}</span>
                  </div>
                ))
              ) : escalaCapa && escalaCapa.cortes.length ? (
                rangosLeyenda(escalaCapa.valores, escalaCapa.cortes, paletaCapa).map((r) => (
                  <div key={r.texto} className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full inline-block" style={{ background: r.color }} />
                    <span className="tabular-nums">{r.texto}</span>
                  </div>
                ))
              ) : (
                <div className="text-[10px] text-slate-400">Cargando datos…</div>
              )}
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full inline-block" style={{ background: COLOR_SIN_DATO }} />
                <span>Sin información</span>
              </div>
              <div className="pt-1 mt-1 border-t border-white/10 text-[10px] leading-snug text-slate-400">
                {isMunicipalScale
                  ? 'Fuente: DANE, Censo 2018 por manzana, sumado por barrio, vereda o comuna.'
                  : activeLayer === 'demografico' ? 'Fuente: DANE, proyección de población municipal 2026 por sexo y edad.' : 'Fuente: DANE, NBI por municipio. El estrato, el IPM y la educación se ven al abrir un municipio.'}
                {!esCategorica && ' Clases: quintiles de los territorios visibles.'}
                {esCategorica && ' Estrato de la factura de energía reportado en el Censo 2018, no la estratificación vigente.'}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Leyenda de puestos de votación */}
      {showPuestos && puestosScope && (
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-slate-300">
          <div className="font-bold text-white uppercase text-[10px] tracking-wider flex items-center gap-1.5 mb-1">
            <Vote className="w-3.5 h-3.5 text-emerald-400" />
            {puestosScope}
          </div>
          <div className="leading-snug">
            {activeLayer === 'electoral'
              ? `Color: ganador en el puesto. Se muestran los puestos de esa elección, con su ubicación de ese año.${cargandoResultados ? ' Cargando resultados…' : ''}${!isMunicipalScale ? ' Solo Antioquia tiene resultados por puesto.' : ''}`
              : activeLayer === 'demografico' && metricaDem === 'mujeres'
              ? 'Color: % de mujeres en el censo 2026 del puesto (misma escala).'
              : isMunicipalScale
              ? 'Color: el del barrio o vereda donde está el puesto (el indicador no existe por puesto).'
              : 'Color: el de su municipio (el indicador no existe por puesto).'}
            {' '}El tamaño crece con el censo y se reduce al alejar el mapa.
          </div>
          <div className="flex items-center gap-2 mt-1"><span className="w-3 h-3 rounded-full inline-block border border-white bg-slate-400" /> Ubicación del puesto</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full inline-block border-2 border-dashed border-amber-500 bg-slate-400" /> Ubicación aproximada (cabecera o vereda)</div>
          <div className="mt-1 text-[10px] text-slate-400 leading-snug">
            {puestos.filter(tieneCoordenadas).length.toLocaleString('es-CO')} de {puestos.length.toLocaleString('es-CO')} puestos 2026 en el mapa (tamaño = censo).
            {puestos.length - puestos.filter(tieneCoordenadas).length > 0 && ` ${(puestos.length - puestos.filter(tieneCoordenadas).length).toLocaleString('es-CO')} sin ubicar (cuentan solo en el total del municipio).`}
            {asignacion && asignacion.fueraDeLaCapa.length > 0 && ` ${asignacion.fueraDeLaCapa.length} fuera de la capa del municipio.`}
          </div>
          {puestos.length === 0 && isMunicipalScale && (
            <div className="text-[10px] text-slate-400">Este municipio no tiene puestos cargados.</div>
          )}
        </div>
      )}
      </aside>

      {/* Ficha de puesto (clic en un marcador) */}
      {puestoSeleccionado && (() => {
        const p = puestoSeleccionado;
        const d = p.divipole2023;
        const aproximado = d.cruce === 'aproximado' || d.precision === 'aproximada';
        const resultados = eleccionesMuni
          .filter((e) => e.codigos === '2026')
          .map((e) => ({ e, r: sumarEleccion(e, [p.codPuesto]) }))
          .filter((x): x is { e: EleccionPuestos; r: NonNullable<ReturnType<typeof sumarEleccion>> } => x.r !== null);
        return (
          <div className="absolute bottom-4 right-4 z-20 w-80 max-h-[70%] overflow-y-auto p-3.5 rounded-2xl bg-slate-950/90 backdrop-blur-2xl border border-white/20 shadow-2xl text-slate-200 pointer-events-auto">
            <div className="flex items-start justify-between gap-2 mb-1">
              <div>
                <div className="text-[9px] uppercase font-black tracking-wider text-emerald-400">Ficha de puesto de votación</div>
                <div className="text-sm font-black text-white">{titulo(p.puesto)}</div>
              </div>
              <button onClick={() => setPuestoSeleccionado(null)} className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white shrink-0" title="Cerrar">
                <X className="w-4 h-4" />
              </button>
            </div>
            {d.direccion && <div className="text-xs text-slate-400 mb-1">{d.direccion}</div>}
            <div className="grid grid-cols-2 gap-1.5 my-2">
              <div className="px-2 py-1 rounded-lg bg-white/5"><div className="text-[9px] text-slate-400">Censo 2026</div><div className="text-sm font-bold tabular-nums">{p.total.toLocaleString('es-CO')}</div></div>
              <div className="px-2 py-1 rounded-lg bg-white/5"><div className="text-[9px] text-slate-400">Mesas</div><div className="text-sm font-bold tabular-nums">{p.mesas}</div></div>
            </div>
            <div className={`text-[10px] mb-2 ${aproximado ? 'text-amber-300' : 'text-slate-400'}`}>{describirCruce(p)}</div>
            {resultados.length > 0 ? (
              <div className="flex flex-col gap-2">
                <div className="text-[10px] font-black uppercase text-slate-400">Resultados en este puesto</div>
                {resultados.map(({ e, r }) => {
                  const top = e.porCandidato ? r.candidatos.slice(0, 3) : r.partidos.slice(0, 3).map((x) => ({ nombre: x.nombre, pct: x.pct }));
                  return (
                    <div key={e.id} className="pt-1.5 border-t border-white/10">
                      <div className="text-xs font-bold text-white">{e.nombre}</div>
                      {top.map((c, i) => (
                        <div key={c.nombre} className="flex items-center justify-between text-[11px] text-slate-300">
                          <span className="truncate">{i + 1}. {c.nombre}</span>
                          <span className="tabular-nums font-semibold ml-2">{c.pct.toFixed(1)} %</span>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-xs text-slate-400">Sin resultados de Congreso o Presidencia 2026 cargados para este puesto. La Alcaldía y el Concejo 2023 (con otro código de puesto) se ven en la ficha del territorio, no aquí.</div>
            )}
          </div>
        );
      })()}

      {/* Floating Quick Map Controls (Top Right) */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 pointer-events-auto">
        <button
          onClick={handleRecenter}
          className="p-2.5 rounded-xl bg-slate-950/70 hover:bg-slate-900/90 text-slate-300 hover:text-white border border-white/20 backdrop-blur-xl shadow-lg transition"
          title="Centrar mapa en el nivel actual"
        >
          <Compass className="w-4 h-4 text-sky-400" />
        </button>

        {puestosScope && (
          <button
            onClick={() => setShowPuestos((v) => !v)}
            className={`p-2.5 rounded-xl border backdrop-blur-xl shadow-lg transition ${showPuestos ? 'bg-emerald-500/30 border-emerald-400/60 text-emerald-200' : 'bg-slate-950/70 border-white/20 text-slate-300 hover:text-white'}`}
            title={showPuestos ? 'Ocultar puestos de votación' : 'Mostrar puestos de votación'}
          >
            <Vote className="w-4 h-4" />
          </button>
        )}

        <div role="group" aria-label="Mapa de fondo" className="flex flex-col gap-1 p-1 rounded-xl bg-slate-950/70 border border-white/20 backdrop-blur-xl shadow-lg">
          {MAPAS_BASE.map((b) => {
            const Icono = b.id === 'satelite' ? Satellite : b.id === 'oscuro' ? Moon : Sun;
            const activo = mapaBase === b.id;
            return (
              <button
                key={b.id}
                onClick={() => setMapaBase(b.id)}
                aria-pressed={activo}
                aria-label={`Mapa de fondo: ${b.label}`}
                title={`Mapa de fondo: ${b.label}`}
                className={`p-2 rounded-lg transition ${activo ? 'bg-sky-500/30 text-white' : 'text-slate-300 hover:text-white hover:bg-white/10'}`}
              >
                <Icono className="w-4 h-4" />
              </button>
            );
          })}
        </div>
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

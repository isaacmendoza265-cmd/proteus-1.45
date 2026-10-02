/**
 * ACTIVE TERRITORIAL CONTEXT SERVICE
 * Puente bidireccional entre el Zoom Territorial (GIS Multi-Escala) y las herramientas
 * de inteligencia de campaña (Director de Creación de Contenido y Segmentación de Votantes).
 * 
 * Permite que cualquier selección territorial en el mapa (departamento, subregión,
 * municipio, comuna o barrio) alimente inmediatamente los motores de generación de briefs
 * y persuasión cognitiva de Gemini con datos duros e hiperlocales.
 */

import { useState, useEffect } from 'react';
import { TerritoryGeoFeature, ZoomLevelId } from '../data/geojson/types';
import { TerritorialScale } from './territoryHierarchyService';
import { municipalRepository, UnifiedMunicipalityRecord } from './municipalRepositoryService';
import { MEDELLIN_COMUNAS_DATA, METROPOLITAN_MUNICIPALITIES_DATA } from '../data/metropolitanAndMedellinData';
import { ANTIOQUIA_SUBREGIONS_DATA } from '../data/antioquiaSubregionesData';
import { CRIMINALITY_DATA } from '../data/observatorioComunas/criminalityData';
import { IPM_DATA } from '../data/observatorioComunas/ipmData';
import { POPULATION_DATA } from '../data/observatorioComunas/populationData';
import { getDepartmentCensus, getMunicipalCensus } from './electoralCensusService';
import { getDaneMunicipio } from './daneMunicipalService';
import { getResultado2023 } from './electoralResults2023Service';
import { municipioFichaPorDane, territorioFicha } from './territoryProfileService';
import { ANTIOQUIA_125_MUNICIPIOS_GEOJSON } from '../data/geojson';
import type { SeleccionDossier } from './dossierTerritorialService';

export interface ActiveTerritoryState {
  scale: TerritorialScale;
  name: string;
  fullName: string;
  deptId: string;
  subregId: string;
  muniId: string;
  comunaId: string;
  barrioId: string;
  featureId?: string;
  population?: number;
  /** Censo electoral oficial (Registraduría); undefined si no hay dato para esta escala */
  electoralCensus?: number;
  nbiPercentage?: number;
  riskLevel?: 'Bajo' | 'Medio' | 'Alto' | 'Crítico';
  predominantStratum?: string;
  electedMayor?: string;
  winnerParty?: string;
  councilSummary?: string;
  keyProblems: string[];
  strategicOpportunities: string[];
  economicSectors: string[];
  securityDynamics: {
    homicideRate?: string;
    extortionRisk?: string;
    armedPresence?: string;
  };
  source: 'zoom_gis' | 'manual_selector' | 'e24_matrix';
  updatedAt: string;
  /** Campos que vienen de tablas internas sin verificar (datos AUXILIARES: solo llenan vacíos y se dicen como tales) */
  auxiliares?: string[];
  /** De dónde salen las cifras oficiales (DANE, Registraduría) */
  fuentesOficiales?: string;
  /**
   * Unidad exacta elegida en el mapa (la misma que leen el generador y el analista). Si está, manda sobre los ids
   * heredados (muniId, comunaId…), que solo conocen bien Medellín. Se borra cuando otra herramienta cambia el
   * territorio con sus propios selectores.
   */
  unidad?: SeleccionDossier;
}

const STORAGE_KEY = 'proteus_active_territory_context';

// Default initial state: Medellín (Comuna 11 - Laureles)
export const DEFAULT_ACTIVE_TERRITORY: ActiveTerritoryState = {
  scale: 'municipal',
  name: 'Medellín',
  fullName: 'Medellín (Valle de Aburrá, Antioquia)',
  deptId: 'dept-antioquia',
  subregId: 'subreg-valle-de-aburra',
  muniId: 'mpio-05001',
  comunaId: 'comuna-11',
  barrioId: 'all-comuna',
  featureId: 'mpio-05001',
  // Cifras oficiales: las fija oficializar() con el DANE y la Registraduría (antes 2.650.000 habitantes escritos a mano)
  population: undefined,
  electoralCensus: getMunicipalCensus('05001')?.total,
  nbiPercentage: undefined,
  riskLevel: 'Medio',
  predominantStratum: 'Estrato 3 (heterogéneo 1 a 6)',
  electedMayor: 'Federico Andrés Gutiérrez Zuluaga',
  winnerParty: 'Partido Político Creemos',
  councilSummary: 'Creemos (7), Centro Democrático (5), Pacto Histórico (2), Liberal (2)',
  keyProblems: [
    'Congestión vial crónica y movilidad metropolitana',
    'Microtráfico y extorsión por combos barriales',
    'Déficit de vivienda de interés social y gentrificación'
  ],
  strategicOpportunities: [
    'Consolidación como Valle del Software y Distrito de CTI',
    'Seguridad patrimonial y convivencia con tecnología predictiva',
    'Integración férrea Tren del Río y transporte limpio'
  ],
  economicSectors: [
    'Servicios e industrias CTI',
    'Comercio mayorista y minorista',
    'Construcción e inmobiliario',
    'Turismo de negocios'
  ],
  securityDynamics: {
    homicideRate: 'Tasa controlada con monitoreo intensivo SISC',
    extortionRisk: 'Presión en zonas comerciales periféricas',
    armedPresence: 'Combos locales articulados a La Terraza y Los Triana'
  },
  source: 'manual_selector',
  updatedAt: new Date().toISOString()
};

type Listener = (state: ActiveTerritoryState) => void;

/** Texto para lo que no tiene fuente cargada (en vez de "Normal subregional", "Moderado"...) */
export const SIN_FUENTE = 'Sin información (no hay fuente cargada)';

/** Campos que, cuando tienen valor, vienen de tablas internas escritas a mano (no de una fuente oficial cargada) */
const CAMPOS_AUXILIARES: (keyof ActiveTerritoryState)[] = ['keyProblems', 'strategicOpportunities', 'economicSectors', 'securityDynamics', 'riskLevel', 'predominantStratum'];

/**
 * Pone las cifras oficiales donde las hay (DANE 2026 y NBI 2018 por municipio, censo electoral 2026, escrutinio de la
 * Alcaldía y curules del Concejo 2023) y marca como AUXILIAR lo que viene de tablas internas. Nunca inventa: lo que no
 * tiene dato queda vacío.
 */
export function oficializar(s: ActiveTerritoryState): ActiveTerritoryState {
  const dane = /(\d{5})$/.exec(s.muniId)?.[1];
  const out: ActiveTerritoryState = { ...s };
  const fuentes: string[] = [];
  if (dane && s.scale === 'municipal') {
    const d = getDaneMunicipio(dane);
    if (d) { out.population = d.poblacion; out.nbiPercentage = d.nbi2018; fuentes.push('población DANE 2026 y NBI DANE 2018'); }
    const c = getMunicipalCensus(dane)?.total;
    if (c) { out.electoralCensus = c; fuentes.push('censo electoral Registraduría 2026'); }
    const r = getResultado2023(dane);
    if (r) {
      const g = r.alcaldia.candidatos[0];
      if (g) { out.electedMayor = g.nombre; out.winnerParty = g.partido; }
      if (r.concejo) out.councilSummary = r.concejo.curulesPorLista.filter((x) => x.curules).sort((a, b) => b.curules - a.curules).map((x) => `${x.partido} (${x.curules})`).join(', ');
      fuentes.push('escrutinio Alcaldía y Concejo 2023 (Registraduría)');
    }
  }
  const tieneValor = (k: keyof ActiveTerritoryState) => {
    const v = out[k];
    if (Array.isArray(v)) return v.length > 0;
    if (v && typeof v === 'object') return Object.values(v).some((x) => x && x !== SIN_FUENTE);
    return v != null && v !== '';
  };
  out.auxiliares = CAMPOS_AUXILIARES.filter(tieneValor) as string[];
  out.fuentesOficiales = fuentes.join('; ') || undefined;
  return out;
}

/** Unidad del dossier (barrio, comuna, municipio, subregión) que corresponde al territorio activo */
export function seleccionDeEstado(s: ActiveTerritoryState): SeleccionDossier {
  if (s.unidad) return { ...s.unidad };
  const dane = /(\d{5})$/.exec(s.muniId)?.[1];
  const muni = dane ? municipioFichaPorDane(dane) : null;
  const subFeat = ANTIOQUIA_125_MUNICIPIOS_GEOJSON.features.find((f) => (f.properties as { daneCode?: string }).daneCode === dane);
  const nombreSub = (id: string) => {
    const limpio = id.replace('subreg-', '').replace(/-/g, ' ');
    const norm = (x: string) => x.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    return [...new Set(ANTIOQUIA_125_MUNICIPIOS_GEOJSON.features.map((f) => String(f.properties.subregion ?? '')))].find((n) => norm(n) === norm(limpio)) ?? null;
  };
  if (s.scale === 'nacional' || s.scale === 'departamental') return { subregion: null, muniId: null, comunaId: null, barrioId: null };
  if (s.scale === 'subregional') return { subregion: nombreSub(s.subregId), muniId: null, comunaId: null, barrioId: null };
  if (!muni) return { subregion: nombreSub(s.subregId), muniId: null, comunaId: null, barrioId: null };
  const subregion = subFeat ? String(subFeat.properties.subregion ?? '') || null : null;
  const barrio = s.barrioId && s.barrioId !== 'all-comuna' && territorioFicha(s.barrioId)?.dane === dane ? s.barrioId : null;
  const comuna = s.scale !== 'municipal' && territorioFicha(s.comunaId)?.dane === dane ? s.comunaId : null;
  return { subregion, muniId: muni, comunaId: barrio ? null : comuna, barrioId: barrio };
}

class ActiveTerritoryManager {
  private currentState: ActiveTerritoryState;
  private listeners: Set<Listener> = new Set();

  constructor() {
    this.currentState = this.loadInitialState();
  }

  private loadInitialState(): ActiveTerritoryState {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.scale && parsed.name) {
          return oficializar(parsed);
        }
      }
    } catch (e) {
      console.warn('Error loading active territory state:', e);
    }
    return oficializar(DEFAULT_ACTIVE_TERRITORY);
  }

  public getState(): ActiveTerritoryState {
    return this.currentState;
  }

  public setState(newState: Partial<ActiveTerritoryState>) {
    // Si una herramienta cambia el lugar con sus propios selectores, la unidad del mapa deja de valer
    const cambiaLugar = (['scale', 'deptId', 'subregId', 'muniId', 'comunaId', 'barrioId'] as const).some((k) => k in newState);
    this.currentState = {
      ...this.currentState,
      ...(cambiaLugar && !('unidad' in newState) ? { unidad: undefined } : {}),
      ...newState,
      updatedAt: new Date().toISOString()
    };
    this.persist();
    this.notify();
  }

  private persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.currentState));
    } catch (e) {
      console.warn('Error saving active territory state:', e);
    }
  }

  private notify() {
    this.listeners.forEach(l => l(this.currentState));
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Transforma cualquier feature GeoJSON del GIS Multi-Escala en un estado territorial
   * enriquecido para el Director de Contenido y Segmentación.
   */
  public setFromGeoFeature(feature: TerritoryGeoFeature): ActiveTerritoryState {
    return this.confirmar(this.estadoDesdeFeature(feature));
  }

  private confirmar(estado: ActiveTerritoryState): ActiveTerritoryState {
    this.currentState = oficializar(estado);
    this.persist();
    this.notify();
    return this.currentState;
  }

  /**
   * El mapa es la consola de navegación: cada unidad que se elige en él (subregión, municipio, comuna, corregimiento,
   * barrio o vereda, de cualquier municipio con ficha) pasa a ser el territorio activo de todas las herramientas.
   * `unidad` es la misma selección que leen el generador y el analista del mapa.
   */
  public setFromMapa(unidad: SeleccionDossier, feature?: TerritoryGeoFeature | null): ActiveTerritoryState {
    const muni = unidad.muniId ? territorioFicha(unidad.muniId) : null;
    const fina = unidad.barrioId ? territorioFicha(unidad.barrioId) : unidad.comunaId ? territorioFicha(unidad.comunaId) : null;
    const fid = (x: TerritoryGeoFeature | null | undefined) => (x ? String(x.id) : '');
    const geoDe = (sub: string | null) => ANTIOQUIA_125_MUNICIPIOS_GEOJSON.features
      .filter((f) => !sub || String(f.properties.subregion ?? '') === sub)
      .map((f) => String((f.properties as { daneCode?: string }).daneCode));
    let base: ActiveTerritoryState;
    if (muni) {
      const dane = muni.dane;
      // Comunas y barrios de Medellín: la ficha heredada los conoce; el resto parte del municipio
      const esMed = dane === '05001';
      const f = esMed && feature && fina && (fid(feature) === fina.id || fid(feature).startsWith('med-') || fid(feature).startsWith('barrio-')) ? feature : null;
      base = f ? this.estadoDesdeFeature(f) : this.estadoDesdeFeature({ id: `mpio-${dane}`, type: 'Feature', properties: { name: muni.nombre, level: 'municipal' }, geometry: null } as unknown as TerritoryGeoFeature);
      if (fina) {
        const otraDivision = !f;
        base = {
          ...base,
          scale: 'comuna-barrio',
          name: fina.nombre,
          fullName: [fina.nombre, fina.tipo === 'subdivision' && fina.padreId ? territorioFicha(fina.padreId)?.nombre : null, muni.nombre, 'Antioquia'].filter(Boolean).join(', '),
          muniId: `mpio-${dane}`,
          comunaId: unidad.comunaId ?? (fina.tipo === 'division' ? fina.id : fina.padreId ?? ''),
          barrioId: unidad.barrioId ?? 'all-comuna',
          // La población y el censo de la unidad los da el dossier (CNPV por manzana, censo por puesto)
          population: undefined,
          electoralCensus: esMed && /^comuna-\d+$/.test(fina.id) ? base.electoralCensus : undefined,
          nbiPercentage: undefined,
          // Los textos del municipio no describen la comuna o el barrio de otro municipio
          ...(otraDivision ? { keyProblems: [], strategicOpportunities: [], economicSectors: [], riskLevel: undefined, predominantStratum: undefined, securityDynamics: { homicideRate: SIN_FUENTE, extortionRisk: SIN_FUENTE, armedPresence: SIN_FUENTE } } : {}),
        };
      }
    } else if (unidad.subregion) {
      const clave = Object.keys(ANTIOQUIA_SUBREGIONS_DATA).find((k) => {
        const n = (x: string) => x.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+antioquen[oa]$/, '');
        return n(ANTIOQUIA_SUBREGIONS_DATA[k].name) === n(unidad.subregion!);
      });
      base = this.estadoDesdeFeature({ id: `subreg-${clave ?? unidad.subregion}`, type: 'Feature', properties: { name: unidad.subregion, level: 'departamental' }, geometry: null } as unknown as TerritoryGeoFeature);
      const danes = geoDe(unidad.subregion);
      // DANE 2026 y Registraduría, sumados por código DANE
      base = { ...base, population: danes.reduce((a, d) => a + (getDaneMunicipio(d)?.poblacion ?? 0), 0) || undefined, electoralCensus: danes.reduce((a, d) => a + (getMunicipalCensus(d)?.total ?? 0), 0) || undefined, nbiPercentage: undefined };
    } else if (feature && (fid(feature).startsWith('dept-') || feature.properties.level === 'nacional') && !/antioquia/i.test(feature.properties.name ?? '')) {
      // Otro departamento de Colombia: Proteus no tiene su dossier; queda el departamento sin unidad de Antioquia
      return this.confirmar({ ...this.estadoDesdeFeature(feature), unidad: undefined });
    } else {
      const danes = geoDe(null);
      base = {
        ...this.currentState, scale: 'departamental', name: 'Antioquia', fullName: 'Departamento de Antioquia', deptId: 'dept-antioquia',
        subregId: '', muniId: '', comunaId: '', barrioId: 'all-comuna',
        population: danes.reduce((a, d) => a + (getDaneMunicipio(d)?.poblacion ?? 0), 0) || undefined,
        electoralCensus: getDepartmentCensus('antioquia')?.total, nbiPercentage: undefined, riskLevel: undefined, predominantStratum: undefined,
        electedMayor: undefined, winnerParty: undefined, councilSummary: undefined, keyProblems: [], strategicOpportunities: [], economicSectors: [],
        securityDynamics: { homicideRate: SIN_FUENTE, extortionRisk: SIN_FUENTE, armedPresence: SIN_FUENTE },
      };
    }
    return this.confirmar({ ...base, unidad: { ...unidad }, featureId: feature ? fid(feature) : undefined, source: 'zoom_gis', updatedAt: new Date().toISOString() });
  }

  private estadoDesdeFeature(feature: TerritoryGeoFeature): ActiveTerritoryState {
    const p = feature.properties;
    const fid = feature.id;
    const level = p.level || 'municipal';

    let scale: TerritorialScale = 'municipal';
    let name = p.name || 'Territorio Seleccionado';
    let fullName = p.name || 'Territorio Seleccionado';
    let deptId = 'dept-antioquia';
    let subregId = 'subreg-valle-de-aburra';
    let muniId = 'mpio-05001';
    let comunaId = 'comuna-11';
    let barrioId = 'all-comuna';
    let population: number | undefined = p.population || undefined;
    // Nunca se estima el censo a partir de la población: o hay dato oficial o queda sin dato
    let electoralCensus: number | undefined = p.electoralCensus;
    // Sin valores por defecto inventados: lo que no tiene dato queda vacío (antes 50.000 hab., NBI 12 %, "Estrato 2-3")
    let nbiPercentage: number | undefined = p.nbiPercentage || undefined;
    let riskLevel = p.riskLevel || undefined;
    let predominantStratum = p.predominantStratum || undefined;
    let electedMayor = p.electedMayor || undefined;
    let winnerParty = p.winnerParty || undefined;
    let councilSummary: string | undefined;
    let keyProblems: string[] = [];
    let strategicOpportunities: string[] = [];
    let economicSectors: string[] = [];
    let securityDynamics: ActiveTerritoryState['securityDynamics'] = {
      homicideRate: SIN_FUENTE,
      extortionRisk: SIN_FUENTE,
      armedPresence: SIN_FUENTE
    };

    // 1. ESCALA NACIONAL (Departamentos de Colombia)
    if (level === 'nacional' || fid.startsWith('dept-')) {
      scale = 'departamental';
      deptId = fid.startsWith('dept-') ? fid : `dept-${fid}`;
      electoralCensus = getDepartmentCensus(deptId.replace('dept-', ''))?.total ?? getDepartmentCensus(p.name)?.total;
      name = p.name;
      fullName = `Departamento de ${p.name}`;
      keyProblems = [
        `Competitividad y desarrollo productivo en ${p.name}`,
        `Vías troncales y conectividad intermunicipal`,
        `Seguridad territorial y cobertura de salud`
      ];
      strategicOpportunities = [
        `Consolidación de alianzas productivas departamentales`,
        `Fortalecimiento de la red hospitalaria y educativa`,
        `Presencia de la fuerza pública en corredores estratégicos`
      ];
      economicSectors = ['Agropecuario', 'Comercio', 'Servicios'];
    }
    // 2. ESCALA DEPARTAMENTAL: Subregiones de Antioquia
    else if (level === 'departamental' && !fid.startsWith('mpio-')) {
      scale = 'subregional';
      const cleanSubId = fid.replace('subreg-', '');
      subregId = `subreg-${cleanSubId}`;
      name = p.name;
      fullName = `Subregión ${p.name} (Antioquia)`;
      const subInfo = ANTIOQUIA_SUBREGIONS_DATA[cleanSubId];
      if (subInfo) {
        population = subInfo.demographics.totalPopulation;
        electoralCensus = municipalRepository
          .getAll()
          .filter((m) => m.subregionId === cleanSubId)
          .reduce((sum, m) => sum + m.electoralCensus, 0);
        nbiPercentage = subInfo.demographics.nbiAverage;
        keyProblems = [
          subInfo.transversalPains.securityAndOrder,
          subInfo.transversalPains.economyAndEmployment,
          subInfo.transversalPains.connectivityAndMobility,
          subInfo.transversalPains.publicServicesAndHealth
        ].filter(Boolean);
        strategicOpportunities = [
          subInfo.synthesisStrategicProfile || `Desarrollo estratégico para los ${subInfo.totalMunicipalities} municipios de ${subInfo.name}`
        ];
      }
    }
    // 3. ESCALA MUNICIPAL: 125 Municipios de Antioquia
    else if (fid.startsWith('mpio-') || level === 'metropolitano') {
      scale = 'municipal';
      muniId = fid.startsWith('mpio-') ? fid : (fid === 'medellin' ? 'mpio-05001' : fid);
      
      const muniRec = municipalRepository.getMunicipality(muniId) || municipalRepository.getMunicipality(p.name);
      if (muniRec) {
        name = muniRec.name;
        fullName = `${muniRec.name} (${muniRec.subregion}, Antioquia)`;
        subregId = `subreg-${muniRec.subregionId || 'valle-de-aburra'}`;
        population = muniRec.population;
        electoralCensus = muniRec.electoralCensus;
        nbiPercentage = muniRec.nbiPercentage;
        riskLevel = muniRec.riskLevel;
        predominantStratum = muniRec.predominantStratum;
        electedMayor = muniRec.electedMayor;
        winnerParty = muniRec.winnerParty;
        councilSummary = muniRec.councilSeats
          ? muniRec.councilSeats.map(c => `${c.party} (${c.seats})`).join(', ')
          : undefined;
        keyProblems = muniRec.keyProblems || [];
        strategicOpportunities = muniRec.strategicOpportunities || [];
        economicSectors = muniRec.economicSectors || [];
        securityDynamics = {
          homicideRate: muniRec.securityDynamics?.homicideRate || SIN_FUENTE,
          extortionRisk: muniRec.securityDynamics?.extortionRisk || SIN_FUENTE,
          armedPresence: muniRec.securityDynamics?.armedPresence || SIN_FUENTE
        };
      } else {
        name = p.name;
        fullName = `${p.name} (Antioquia)`;
        electoralCensus = getMunicipalCensus(p.name)?.total ?? electoralCensus;
      }
    }
    // 4. ESCALA COMUNAL / CORREGIMENTAL: Comunas y Corregimientos de Medellín
    else if (
      fid.startsWith('med-c') || 
      fid.startsWith('comuna-') || 
      fid.startsWith('med-correg') ||
      level === 'municipal' || 
      level === 'hiperlocal'
    ) {
      scale = 'comuna-barrio';
      muniId = 'mpio-05001';
      subregId = 'subreg-valle-de-aburra';
      comunaId = fid.startsWith('comuna-') ? fid : `comuna-${p.number || fid.replace('med-c', '')}`;
      name = p.comunaName || p.name;
      fullName = `${name}, Medellín`;
      
      // Look up deep commune data
      const cNum = p.number || parseInt(fid.replace('med-c', '').replace('comuna-', '')) || 11;
      const deepC = MEDELLIN_COMUNAS_DATA[fid] || MEDELLIN_COMUNAS_DATA[`med-c${cNum}`];
      const crime = CRIMINALITY_DATA[cNum];
      const ipmList = IPM_DATA[cNum];
      const popP = POPULATION_DATA[cNum];

      if (deepC) {
        // La población por comuna de esta tabla no coincide con ninguna fuente (auditoría): no se usa
        population = undefined;
        electoralCensus = deepC.electoralCensusSource === 'oficial' ? deepC.electoralCensus : undefined;
        predominantStratum = deepC.predominantStratum;
        keyProblems = [
          deepC.keyDynamics || 'Microdinámica barrial y convivencia',
          `Estratificación socioeconómica: ${deepC.predominantStratum}`
        ];
        if (crime) {
          keyProblems.push(`Extorsión a negocios del sector: ${crime.extorsionNegociosPct}%`);
          securityDynamics = {
            homicideRate: `Prioridad territorial en monitoreo CIEF`,
            extortionRisk: `Extorsión a comercios: ${crime.extorsionNegociosPct}% • Extorsión a hogares: ${crime.extorsionHogaresPct}%`,
            armedPresence: crime.bandasDominantes?.join(', ') || 'Combos delincuenciales locales'
          };
        }
        // El IPM de la tabla interna no es NBI: ya no se pasa como NBI (el IPM oficial por manzana está en el dossier)
        void ipmList;
        strategicOpportunities = [
          `Articulación barrial con líderes comunales y comerciantes de ${name}`,
          `Plan de choque contra la extorsión y plazas de vicio`,
          `Recuperación de espacio público e infraestructura juvenil`
        ];
        economicSectors = ['Comercio barrial', 'Servicios locales', 'Emprendimiento'];
      }
    }
    // 5. ESCALA BARRIAL: Barrios de Medellín
    else if (fid.startsWith('barrio-') || level === 'comunas-barrios') {
      scale = 'comuna-barrio';
      muniId = 'mpio-05001';
      barrioId = fid;
      name = p.name;
      fullName = `Barrio ${p.name} (${p.comunaName || 'Medellín'})`;
      comunaId = p.comunaId || 'comuna-11';
      population = p.population || undefined;
      electoralCensus = p.electoralCensus;
      predominantStratum = p.predominantStratum || undefined;
      nbiPercentage = p.nbiPercentage || undefined;
      keyProblems = [
        ...(p.keyLandmark ? [`Hito territorial: ${p.keyLandmark}`] : []),
        ...(p.votingStationsCount ? [`Puestos de votación en el barrio: ${p.votingStationsCount}`] : []),
      ];
      strategicOpportunities = [
        `Contacto puerta a puerta y red de WhatsApp barrial`,
        `Foco electoral en los puestos de votación del barrio`,
        `Resolución de puntos críticos de movilidad e iluminación`
      ];
      economicSectors = ['Comercio vecinal', 'Servicios'];
    }

    return {
      scale,
      name,
      fullName,
      deptId,
      subregId,
      muniId,
      comunaId,
      barrioId,
      featureId: fid,
      population,
      electoralCensus,
      nbiPercentage,
      riskLevel: riskLevel as ActiveTerritoryState['riskLevel'],
      predominantStratum,
      electedMayor,
      winnerParty,
      councilSummary,
      keyProblems,
      strategicOpportunities,
      economicSectors,
      securityDynamics,
      source: 'zoom_gis',
      updatedAt: new Date().toISOString()
    };
  }
}

export const activeTerritoryService = new ActiveTerritoryManager();

/**
 * Hook React para consumir y suscribirse al territorio activo desde cualquier componente
 */
export function useActiveTerritory() {
  const [territory, setTerritory] = useState<ActiveTerritoryState>(() => activeTerritoryService.getState());

  useEffect(() => {
    const unsubscribe = activeTerritoryService.subscribe((updated) => {
      setTerritory(updated);
    });
    return unsubscribe;
  }, []);

  const setActiveTerritory = (partial: Partial<ActiveTerritoryState>) => {
    activeTerritoryService.setState(partial);
  };

  const setFromFeature = (feature: TerritoryGeoFeature) => {
    return activeTerritoryService.setFromGeoFeature(feature);
  };

  return {
    activeTerritory: territory,
    setActiveTerritory,
    setFromFeature
  };
}

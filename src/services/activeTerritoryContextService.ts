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
  population: 2650000,
  electoralCensus: 1908000,
  nbiPercentage: 4.2,
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
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error loading active territory state:', e);
    }
    return DEFAULT_ACTIVE_TERRITORY;
  }

  public getState(): ActiveTerritoryState {
    return this.currentState;
  }

  public setState(newState: Partial<ActiveTerritoryState>) {
    this.currentState = {
      ...this.currentState,
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
    let population = p.population || 50000;
    let electoralCensus = p.electoralCensus || Math.round(population * 0.72);
    let nbiPercentage = p.nbiPercentage || 12.0;
    let riskLevel = p.riskLevel || 'Medio';
    let predominantStratum = p.predominantStratum || 'Estrato 2-3';
    let electedMayor = p.electedMayor || 'Alcaldía Municipal';
    let winnerParty = p.winnerParty || 'Coalición';
    let councilSummary = 'Bancadas multipartidistas';
    let keyProblems: string[] = [];
    let strategicOpportunities: string[] = [];
    let economicSectors: string[] = [];
    let securityDynamics = {
      homicideRate: 'Normal subregional',
      extortionRisk: 'Moderado',
      armedPresence: 'Bajo control institucional'
    };

    // 1. ESCALA NACIONAL (Departamentos de Colombia)
    if (level === 'nacional' || fid.startsWith('dept-')) {
      scale = 'departamental';
      deptId = fid.startsWith('dept-') ? fid : `dept-${fid}`;
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
        electoralCensus = Math.round(population * 0.72);
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
          : 'Bancadas multipartidistas';
        keyProblems = muniRec.keyProblems || [];
        strategicOpportunities = muniRec.strategicOpportunities || [];
        economicSectors = muniRec.economicSectors || [];
        securityDynamics = {
          homicideRate: muniRec.securityDynamics?.homicideRate || 'Normal subregional',
          extortionRisk: muniRec.securityDynamics?.extortionRisk || 'Moderado',
          armedPresence: muniRec.securityDynamics?.armedPresence || 'Vigilancia institucional'
        };
      } else {
        name = p.name;
        fullName = `${p.name} (Antioquia)`;
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
        population = deepC.population;
        electoralCensus = Math.round(deepC.population * 0.78);
        predominantStratum = deepC.predominantStratum;
        keyProblems = [
          deepC.keyDynamics || 'Microdinámica barrial y convivencia',
          `Estratificación socioeconómica: ${deepC.predominantStratum}`
        ];
        if (crime) {
          keyProblems.push(`Extorsión a negocios del sector: ${crime.extorsionNegociosPct}%`);
          securityDynamics = {
            homicideRate: `Prioridad territorial en monitoreo CIEF`,
            extortionRisk: `Extorsión a comercios: ${crime.extorsionNegociosPct}% • Cifra negra: ${crime.cifraNegraPct}%`,
            armedPresence: crime.bandasDominantes?.join(', ') || 'Combos delincuenciales locales'
          };
        }
        if (ipmList && ipmList.length > 0) {
          nbiPercentage = ipmList[ipmList.length - 1].ipm;
        }
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
      population = p.population || 18000;
      electoralCensus = p.electoralCensus || 14000;
      predominantStratum = p.predominantStratum || 'Estrato 3';
      nbiPercentage = p.nbiPercentage || 5.0;
      keyProblems = [
        `Hito territorial: ${p.keyLandmark || 'Sector urbano barrial'}`,
        `Puestos de votación en barrio: ${p.votingStationsCount || 2} mesas electorales`,
        `Seguridad en cuadras comerciales y entornos escolares`
      ];
      strategicOpportunities = [
        `Contacto puerta a puerta y red de WhatsApp barrial`,
        `Foco electoral en los puestos de votación del barrio`,
        `Resolución de puntos críticos de movilidad e iluminación`
      ];
      economicSectors = ['Comercio vecinal', 'Servicios'];
    }

    const newState: ActiveTerritoryState = {
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
      riskLevel: riskLevel as any,
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

    this.currentState = newState;
    this.persist();
    this.notify();
    return newState;
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

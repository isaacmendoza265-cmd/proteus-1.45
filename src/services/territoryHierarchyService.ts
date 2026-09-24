/**
 * PROYECTO PROTEUS 1.2
 * Servicio Unificado de Jerarquía Territorial en 5 Escalas
 * 1. Nacional (Colombia)
 * 2. Departamental (32 Departamentos + Bogotá D.C.)
 * 3. Subregional (9 Subregiones de Antioquia y subregiones departamentales)
 * 4. Municipal (125 Municipios de Antioquia y nodos del país)
 * 5. Comunal / Barrial (16 Comunas, 5 Corregimientos y Barrios de Medellín)
 */

import { COLOMBIA_DEPARTMENTS_GEOJSON } from '../data/geojson/colombiaDepartmentsGeoJson';
import { ANTIOQUIA_SUBREGIONS_DATA, SubregionInfo } from '../data/antioquiaSubregionesData';
import { municipalRepository, UnifiedMunicipalityRecord } from './municipalRepositoryService';
import { COMUNAS_INFO } from '../data/e24/comunasData';
import { MEDELLIN_COMUNAS_DATA } from '../data/metropolitanAndMedellinData';
import { MEDELLIN_BARRIOS_GEOJSON } from '../data/geojson/medellinBarriosGeoJson';

export type TerritorialScale = 'nacional' | 'departamental' | 'subregional' | 'municipal' | 'comuna-barrio';

export interface HierarchyTerritoryNode {
  id: string;
  scale: TerritorialScale;
  name: string;
  fullName: string;
  departmentName?: string;
  subregionName?: string;
  municipalityName?: string;
  comunaName?: string;
  population?: number;
  electoralCensus?: number;
  nbiPercentage?: number;
  predominantStratum?: string;
  municipalityCount?: number;
  keyIssues: string[];
  strategicContext: string;
}

export class TerritoryHierarchyService {
  /**
   * 1. Nivel Nacional: Colombia
   */
  public static getNationalNode(): HierarchyTerritoryNode {
    return {
      id: 'nacional-colombia',
      scale: 'nacional' as const,
      name: 'Colombia (Nivel Nacional)',
      fullName: 'República de Colombia (32 Departamentos y Distrito Capital)',
      departmentName: 'Nacional',
      population: 52215000,
      electoralCensus: 39200000,
      nbiPercentage: 19.6,
      keyIssues: [
        'Crecimiento económico, inflación de alimentos y empleo formal',
        'Seguridad nacional, orden público y lucha contra el crimen organizado',
        'Sostenibilidad pensional y reformas a la salud',
        'Confianza inversionista, seguridad jurídica y libre empresa'
      ],
      strategicContext: 'Ámbito electoral de orden nacional (Presidencia y Senado de la República). Discurso de visión de país, unidad democrática y reactivación integral.'
    };
  }

  /**
   * 2. Nivel Departamental: Lista de 33 departamentos
   */
  public static getDepartments(): HierarchyTerritoryNode[] {
    return COLOMBIA_DEPARTMENTS_GEOJSON.features.map(f => {
      const p = f.properties;
      return {
        id: `dept-${p.id}`,
        scale: 'departamental' as const,
        name: p.name,
        fullName: `Departamento de ${p.name}`,
        departmentName: p.name,
        population: p.population || 1200000,
        electoralCensus: p.electoralCensus || 850000,
        nbiPercentage: p.nbiPercentage || 22.0,
        keyIssues: [
          `Competitividad y desarrollo productivo en ${p.name}`,
          `Vías troncales y conectividad intermunicipal en ${p.name}`,
          `Seguridad territorial y cobertura de salud de alta complejidad`
        ],
        strategicContext: `Circunscripción departamental de ${p.name}. Prioridad para Cámara de Representantes y Gobernación.`
      };
    }).sort((a, b) => a.name.localeCompare(b.name));
  }

  /**
   * 3. Nivel Subregional: Las 9 Subregiones de Antioquia
   */
  public static getSubregions(): HierarchyTerritoryNode[] {
    return Object.values(ANTIOQUIA_SUBREGIONS_DATA).map((s: SubregionInfo) => {
      const pains = s.transversalPains;
      const issues = [
        pains.securityAndOrder,
        pains.economyAndEmployment,
        pains.connectivityAndMobility,
        pains.publicServicesAndHealth
      ].filter(Boolean);

      return {
        id: `subreg-${s.id}`,
        scale: 'subregional' as const,
        name: s.name,
        fullName: `Subregión ${s.name} (Antioquia)`,
        departmentName: 'Antioquia',
        subregionName: s.name,
        population: s.demographics.totalPopulation,
        electoralCensus: Math.round(s.demographics.totalPopulation * 0.72),
        nbiPercentage: s.demographics.nbiAverage,
        municipalityCount: s.totalMunicipalities,
        keyIssues: issues,
        strategicContext: s.synthesisStrategicProfile || `Nodo subregional de ${s.name} con cabecera en ${s.capitalNode}. Agrupa ${s.totalMunicipalities} municipios.`
      };
    }).sort((a, b) => a.name.localeCompare(b.name));
  }

  /**
   * 4. Nivel Municipal: 125 municipios de Antioquia
   */
  public static getMunicipalities(filterSubregion?: string): HierarchyTerritoryNode[] {
    const all = municipalRepository.getAll();
    const filtered = filterSubregion 
      ? all.filter(m => m.subregion.toLowerCase() === filterSubregion.toLowerCase())
      : all;

    return filtered.map(m => ({
      id: m.id,
      scale: 'municipal' as const,
      name: m.name,
      fullName: `${m.name} (${m.subregion}, Antioquia)`,
      departmentName: 'Antioquia',
      subregionName: m.subregion,
      municipalityName: m.name,
      population: m.population,
      electoralCensus: m.electoralCensus,
      nbiPercentage: m.nbiPercentage,
      keyIssues: m.keyProblems || [
        `Generación de ingresos y empleo en ${m.name}`,
        `Mantenimiento de vías terciarias y placas huella`,
        `Seguridad urbana y prevención de microtráfico/extorsión`
      ],
      strategicContext: `Municipio de ${m.name}, subregión ${m.subregion}. Censo de ${m.electoralCensus.toLocaleString('es-CO')} sufragantes y alcalde actual: ${m.electedMayor} (${m.winnerParty}).`
    })).sort((a, b) => a.name.localeCompare(b.name));
  }

  /**
   * 5. Nivel Comunal: 16 Comunas y 5 Corregimientos de Medellín
   */
  public static getComunas(): HierarchyTerritoryNode[] {
    return COMUNAS_INFO.map(c => {
      const comunaKey = `med-c${c.id}`;
      const deepData = MEDELLIN_COMUNAS_DATA[comunaKey];
      const pop = deepData?.population || 135000;
      const censo = Math.round(pop * 0.78);
      const stratum = deepData?.predominantStratum || (c.id === 14 ? 'Estrato 6' : c.id >= 11 ? 'Estrato 4-5' : 'Estrato 1-2');

      return {
        id: `comuna-${c.id}`,
        scale: 'comuna-barrio' as const,
        name: `${c.comunaName} - ${c.officialName}`,
        fullName: `${c.comunaName} (${c.officialName}), Medellín`,
        departmentName: 'Antioquia',
        subregionName: 'Valle de Aburrá',
        municipalityName: 'Medellín',
        comunaName: `${c.comunaName} - ${c.officialName}`,
        population: pop,
        electoralCensus: censo,
        predominantStratum: stratum,
        nbiPercentage: c.id <= 3 ? 18.5 : c.id === 14 ? 1.2 : 7.5,
        keyIssues: [
          deepData?.keyDynamics || `Microdinámica electoral de ${c.officialName}`,
          `Estratificación predominante: ${stratum}`,
          `Zonas de votación registradas: ${c.zones.join(', ')}`
        ],
        strategicContext: `Comuna ${c.id} (${c.officialName}) de Medellín. ${c.description || ''}. Zonas E-24: ${c.zones.join(' y ')}.`
      };
    });
  }

  /**
   * 6. Nivel Barrial: Barrios específicos de Medellín
   */
  public static getBarrios(filterComunaId?: string): HierarchyTerritoryNode[] {
    const features = MEDELLIN_BARRIOS_GEOJSON.features;
    const filtered = filterComunaId
      ? features.filter(f => f.properties.comunaId === filterComunaId || f.properties.comunaName?.includes(filterComunaId))
      : features;

    return filtered.map(f => {
      const p = f.properties;
      return {
        id: p.id,
        scale: 'comuna-barrio' as const,
        name: p.name,
        fullName: `${p.name} (${p.comunaName || 'Medellín'})`,
        departmentName: 'Antioquia',
        subregionName: 'Valle de Aburrá',
        municipalityName: 'Medellín',
        comunaName: p.comunaName,
        population: p.population || 18000,
        electoralCensus: p.electoralCensus || 15000,
        predominantStratum: p.predominantStratum || 'Estrato 3',
        nbiPercentage: p.nbiPercentage || 4.5,
        keyIssues: [
          `Hito territorial: ${p.keyLandmark || 'Sector urbano barrial'}`,
          `Puestos de votación en barrio: ${p.votingStationsCount || 2} mesas`,
          `Ganador 2023 en barrio: ${p.winner2023 || 'Fuerzas afines'}`
        ],
        strategicContext: `Barrio ${p.name}, perteneciente a ${p.comunaName || 'Medellín'}. Nivel micro-territorial de máxima cercanía.`
      };
    }).sort((a, b) => a.name.localeCompare(b.name));
  }

  /**
   * Resuelve el nodo territorial actual según selección
   */
  public static resolveNode(
    scale: TerritorialScale,
    selection: {
      deptId?: string;
      subregId?: string;
      muniId?: string;
      comunaId?: string;
      barrioId?: string;
    }
  ): HierarchyTerritoryNode {
    if (scale === 'nacional') {
      return this.getNationalNode();
    }

    if (scale === 'departamental') {
      const depts = this.getDepartments();
      const found = depts.find(d => d.id === selection.deptId || d.name.toLowerCase() === selection.deptId?.toLowerCase());
      return found || depts.find(d => d.name === 'Antioquia') || depts[0];
    }

    if (scale === 'subregional') {
      const subregs = this.getSubregions();
      const cleanId = (selection.subregId || '').replace('subreg-', '');
      const found = subregs.find(s => s.id === selection.subregId || s.id.replace('subreg-', '') === cleanId);
      return found || subregs.find(s => s.id.includes('valle-de-aburra')) || subregs[0];
    }

    if (scale === 'municipal') {
      const munis = this.getMunicipalities();
      const found = munis.find(m => m.id === selection.muniId || m.name.toLowerCase() === selection.muniId?.toLowerCase());
      return found || munis.find(m => m.id === 'mpio-05001') || munis[0];
    }

    if (scale === 'comuna-barrio') {
      // If barrio selected
      if (selection.barrioId && selection.barrioId !== 'all-comuna') {
        const barrios = this.getBarrios();
        const foundB = barrios.find(b => b.id === selection.barrioId);
        if (foundB) return foundB;
      }

      // If comuna selected
      const comunas = this.getComunas();
      const cleanId = (selection.comunaId || '').replace('comuna-', '');
      const foundC = comunas.find(c => c.id === selection.comunaId || c.id.replace('comuna-', '') === cleanId);
      return foundC || comunas.find(c => c.id === 'comuna-11') || comunas[0];
    }

    return this.getNationalNode();
  }
}

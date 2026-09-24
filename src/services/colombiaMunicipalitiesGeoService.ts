/**
 * SERVICIO CARTOGRÁFICO DE MUNICIPIOS DE COLOMBIA POR DEPARTAMENTO
 * Proyecto Proteus - Cartografía de Precisión Nacional
 * 
 * Permite que el Nivel Departamental funcione no solo para Antioquia,
 * sino para cualquiera de los 32 Departamentos de Colombia (ej. Meta, Cundinamarca,
 * Valle del Cauca, Santander, etc.), cargando la división político-administrativa municipal.
 */

import { ANTIOQUIA_125_MUNICIPIOS_GEOJSON, TerritoryFeatureCollection, TerritoryGeoFeature } from '../data/geojson';

export class ColombiaMunicipalitiesGeoService {
  private static cachedFeatures: TerritoryGeoFeature[] | null = null;
  private static loadPromise: Promise<TerritoryGeoFeature[]> | null = null;

  /**
   * Carga el conjunto completo de municipios de Colombia
   */
  public static async loadAllMunicipalities(): Promise<TerritoryGeoFeature[]> {
    if (this.cachedFeatures) {
      return this.cachedFeatures;
    }

    if (this.loadPromise) {
      return this.loadPromise;
    }

    this.loadPromise = (async () => {
      try {
        const response = await fetch('/data/colombia_municipios_completo.geojson');
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        const data = await response.json();
        const features = (data.features || []) as TerritoryGeoFeature[];
        this.cachedFeatures = features;
        return features;
      } catch (err) {
        console.warn("Error al cargar colombia_municipios_completo.geojson, usando fallback:", err);
        return ANTIOQUIA_125_MUNICIPIOS_GEOJSON.features;
      } finally {
        this.loadPromise = null;
      }
    })();

    return this.loadPromise;
  }

  /**
   * Normaliza nombres de departamento para búsqueda canónica y exacta
   */
  public static normalizeDeptName(name: string): string {
    const raw = name
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""); // Remueve tildes
    
    // Normalizar alias comunes
    if (raw.includes("san andres")) return "san andres";
    if (raw.includes("bogota")) return "bogota";
    return raw;
  }

  /**
   * Obtiene la división político-administrativa en municipios para el departamento solicitado
   */
  public static async getDepartmentMunicipalities(departmentName: string): Promise<TerritoryFeatureCollection> {
    const norm = this.normalizeDeptName(departmentName);

    // Antioquia tiene dataset enriquecido propio
    if (norm === 'antioquia') {
      return ANTIOQUIA_125_MUNICIPIOS_GEOJSON;
    }

    const allFeatures = await this.loadAllMunicipalities();
    const deptFeatures = allFeatures.filter((f) => {
      const fDept = this.normalizeDeptName(f.properties.department || f.properties.dptoName || '');
      return fDept === norm;
    });

    // Colores temáticos por índice
    const palette = ['#0284c7', '#0ea5e9', '#38bdf8', '#06b6d4', '#14b8a6', '#10b981', '#6366f1', '#8b5cf6'];

    const coloredFeatures: TerritoryGeoFeature[] = deptFeatures.map((f, i) => ({
      ...f,
      properties: {
        ...f.properties,
        colorCode: palette[i % palette.length],
        level: 'departamental' as const,
        isInteractiveTarget: false
      }
    }));

    // Calcular centro y bounds del departamento
    let center: [number, number] = [4.5, -73.5];
    if (coloredFeatures.length > 0 && coloredFeatures[0].properties.centroid) {
      const avgLat = coloredFeatures.reduce((acc, f) => acc + (f.properties.centroid?.[0] || 0), 0) / coloredFeatures.length;
      const avgLon = coloredFeatures.reduce((acc, f) => acc + (f.properties.centroid?.[1] || 0), 0) / coloredFeatures.length;
      center = [roundCoord(avgLat), roundCoord(avgLon)];
    }

    return {
      type: 'FeatureCollection',
      name: `${departmentName} - División Político Administrativa en Municipios`,
      level: 'departamental',
      center,
      defaultZoom: 8,
      features: coloredFeatures
    };
  }
}

function roundCoord(num: number): number {
  return Math.round(num * 10000) / 10000;
}

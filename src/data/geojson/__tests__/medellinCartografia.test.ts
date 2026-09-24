import { describe, it, expect } from 'vitest';
import { MEDELLIN_BARRIOS_GEOJSON } from '../medellinBarriosGeoJson';
import { MEDELLIN_16_COMUNAS_OFFICIAL_GEOJSON } from '../medellin16ComunasOfficialGeoJson';
import BOUNDARIES from '../medellinComunas.boundaries.geo.json';

const barrios = MEDELLIN_BARRIOS_GEOJSON.features;
const comunas = MEDELLIN_16_COMUNAS_OFFICIAL_GEOJSON.features;

describe('Cartografía de Medellín (fuente oficial del Distrito)', () => {
  it('tiene los 332 polígonos de barrios y veredas con id único', () => {
    expect(barrios).toHaveLength(332);
    expect(new Set(barrios.map((f) => f.id)).size).toBe(332);
  });

  it('cada barrio pertenece a una comuna o corregimiento del nivel 4', () => {
    const comunaIds = new Set(comunas.map((f) => f.id));
    const sinComuna = barrios.filter((f) => !comunaIds.has(f.properties.comunaId));
    // Solo las 2 franjas "Sin nombre" del límite urbano-rural no tienen comuna asignada
    expect(sinComuna.map((f) => f.properties.tipo)).toEqual(['Sin asignar', 'Sin asignar']);
  });

  it('las 16 comunas y 5 corregimientos usan las fronteras disueltas de sus barrios', () => {
    const b = BOUNDARIES as Record<string, unknown>;
    for (const f of comunas) expect(b[f.id], f.id).toBeDefined();
    expect(Object.keys(b)).toHaveLength(22); // 21 + contorno del distrito
  });

  it('los puntos de etiqueta caen dentro del recuadro de Medellín', () => {
    for (const f of barrios) {
      const [lat, lng] = f.properties.centroid;
      expect(lat).toBeGreaterThan(6.16);
      expect(lat).toBeLessThan(6.38);
      expect(lng).toBeGreaterThan(-75.72);
      expect(lng).toBeLessThan(-75.47);
    }
  });
});

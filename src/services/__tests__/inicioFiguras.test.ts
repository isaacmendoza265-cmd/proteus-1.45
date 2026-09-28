import { describe, expect, it } from 'vitest';
import figuras from '../../data/inicio/figuras.json';
import { getMunicipalCensus } from '../electoralCensusService';

describe('Figuras de Inicio (scripts/build_figuras_inicio.py)', () => {
  it('las etiquetas del mapa 3D son municipios con censo y caen dentro del dibujo', () => {
    expect(figuras.mapa.etiquetas.length).toBeGreaterThanOrEqual(3);
    for (const e of figuras.mapa.etiquetas) {
      expect(getMunicipalCensus(e.dane)?.total).toBeGreaterThan(0);
      expect(e.x).toBeGreaterThan(0);
      expect(e.x).toBeLessThan(figuras.mapa.ancho);
      expect(e.y).toBeGreaterThan(40);
      expect(e.y).toBeLessThan(figuras.mapa.alto);
    }
  });
  it('las capas del territorio son cinco, en orden, con Medellín completo', () => {
    const { centros, alto, comunas, corregimientos, barrios, puestosMedellin } = figuras.capas;
    expect(centros).toHaveLength(5);
    expect([...centros].sort((a, b) => a - b)).toEqual(centros);
    expect(centros[4]).toBeLessThan(alto);
    expect([comunas, corregimientos]).toEqual([16, 5]);
    expect(barrios).toBeGreaterThan(300);
    expect(puestosMedellin).toBeGreaterThan(200);
  });
});

import { describe, expect, it } from 'vitest';
import puestos from '../../data/electoral/puestos2026Municipios20k.json';
import { getMunicipalitiesCensus } from '../electoralCensusService';

describe('Puestos de los municipios con más de 20.000 votantes', () => {
  it('incluye exactamente los municipios con censo > 20.000 y todos sus puestos', () => {
    const esperados = getMunicipalitiesCensus().filter((m) => m.total > 20_000);
    expect(puestos.municipios).toHaveLength(esperados.length);
    for (const m of esperados) {
      const lista = puestos.puestos.filter((p) => p.codMunicipio === m.codigoRegistraduria);
      expect(lista).toHaveLength(m.puestos);
      expect(lista.reduce((s, p) => s + p.total, 0)).toBe(m.total);
    }
  });

  it('las coordenadas que trae están dentro de Colombia', () => {
    for (const p of puestos.puestos) {
      const d = p.divipole2023;
      if (d?.lat == null) continue;
      expect(d.lat).toBeGreaterThan(-4.3);
      expect(d.lat).toBeLessThan(13.6);
      expect(d.lon).toBeGreaterThan(-82);
      expect(d.lon).toBeLessThan(-66.8);
    }
  });
});

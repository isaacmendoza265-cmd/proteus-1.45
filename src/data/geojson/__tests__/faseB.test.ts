import { describe, it, expect } from 'vitest';
import { MUNICIPAL_DIVISIONS_REGISTRY } from '../municipalDivisions';
import { territorioFicha } from '../../../services/territoryProfileService';
import registro from '../municipios/registroFaseB.json';

describe('Cartografía de las fases B (46, más de 20.000 votantes) y C (79, 20.000 o menos) de Antioquia', () => {
  const ids = Object.keys(registro);
  it('están los 125 municipios en el registro, con fuente', () => {
    expect(ids).toHaveLength(122); // 125 - Medellín, Bello y Rionegro, que no usan este registro
    for (const id of ids) {
      expect(MUNICIPAL_DIVISIONS_REGISTRY[id]?.disponible).toBe(true);
      expect(MUNICIPAL_DIVISIONS_REGISTRY[id].fuente.length).toBeGreaterThan(20);
    }
  });
  it('cada subdivisión tiene ficha y su padre existe', async () => {
    for (const id of ids) {
      const e = MUNICIPAL_DIVISIONS_REGISTRY[id];
      const [div, sub] = await Promise.all([e.loadDivisions!(), e.loadSubdivisions!()]);
      const divIds = new Set(div.features.map((f) => String(f.id)));
      // Los municipios más pequeños de la fase C (p. ej. La Pintada) pueden tener solo un puñado de veredas.
      expect(sub.features.length).toBeGreaterThan(0);
      for (const f of sub.features) {
        expect(divIds.has(String(f.properties.parentId))).toBe(true);
        expect(territorioFicha(String(f.id))?.padreId).toBe(f.properties.parentId);
      }
    }
  });
  it('Envigado: 40 barrios oficiales en 9 comunas; Caucasia: barrios del catastro departamental', async () => {
    const sub = await MUNICIPAL_DIVISIONS_REGISTRY.envigado.loadSubdivisions!();
    expect(sub.features.filter((f) => f.properties.tipo === 'Barrio')).toHaveLength(40);
    const div = await MUNICIPAL_DIVISIONS_REGISTRY.envigado.loadDivisions!();
    expect(div.features.filter((f) => f.properties.tipo === 'Comuna')).toHaveLength(9);
    expect(MUNICIPAL_DIVISIONS_REGISTRY.caucasia.fuente).toMatch(/Catastro Departamental/);
  });
});

describe('Demografía CNPV 2018 de la fase B', () => {
  it('Caucasia: el barrio trae personas por sexo y edad y la comuna/municipio suman', async () => {
    const { cargarDemografia, demografia, territorioFicha } = await import('../../../services/territoryProfileService');
    expect(await cargarDemografia('05154')).toBe(true);
    const barrio = demografia(territorioFicha('caucasia-sub-B0515401000001') ?? territorioFicha(Object.keys((await import('../../territorio/indiceTerritorios.json')).default.caucasia.subdivisiones)[0])!);
    expect(barrio.datos).not.toBeNull();
    const muni = demografia(territorioFicha('caucasia')!);
    expect(muni.datos!.personas).toBe(79448); // manzanas del CNPV 2018 dentro de barrios y veredas
  });
});

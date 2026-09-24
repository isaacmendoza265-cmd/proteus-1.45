import { describe, it, expect } from 'vitest';
import { MUNICIPAL_DIVISIONS_REGISTRY, resolveMunicipality } from '../municipalDivisions';

describe('Registro de divisiones municipales', () => {
  it('encuentra municipios por id, nombre con tildes o código DANE', () => {
    expect(resolveMunicipality({ id: 'itagui' })?.id).toBe('itagui');
    expect(resolveMunicipality({ name: 'Itagüí' })?.id).toBe('itagui');
    expect(resolveMunicipality({ id: 'mpio-05615' })?.id).toBe('rionegro');
    expect(resolveMunicipality({ name: 'Bogotá, D.C.' })?.id).toBe('bogota');
    expect(resolveMunicipality({ daneCode: '11001' })?.id).toBe('bogota');
  });

  it('no confunde municipios homónimos de otros departamentos', () => {
    // Rionegro (Santander) tiene código DANE 68615
    expect(resolveMunicipality({ name: 'Rionegro', daneCode: '68615' })).toBeNull();
  });

  const disponibles = Object.values(MUNICIPAL_DIVISIONS_REGISTRY).filter((m) => m.disponible && m.id !== 'medellin');

  it.each(disponibles.map((m) => [m.id, m] as const))('%s: cada subdivisión tiene una división padre válida', async (_id, m) => {
    const divisiones = await m.loadDivisions!();
    const subdivisiones = await m.loadSubdivisions!();
    const ids = new Set(divisiones.features.map((f) => f.id));
    expect(divisiones.features.length).toBeGreaterThan(0);
    const huerfanas = subdivisiones.features.filter((f) => !ids.has(f.properties.parentId));
    // Itagüí: la cabecera del corregimiento El Manzanillo queda fuera de las 7 comunas de la fuente
    expect(huerfanas.map((f) => f.properties.name)).toEqual(m.id === 'itagui' ? ['Cabecera Corregimental'] : []);
  });
});

import { describe, it, expect } from 'vitest';
import { MUNICIPAL_DIVISIONS_REGISTRY, resolveMunicipality, CIUDADES_CON_COMUNAS, nivelesMunicipales } from '../municipalDivisions';

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
    expect(huerfanas.map((f) => f.properties.name)).toEqual([]);
  });
});

describe('Regla de niveles del zoom municipal', () => {
  it('solo las ciudades definidas tienen nivel de comunas', () => {
    for (const m of Object.values(MUNICIPAL_DIVISIONS_REGISTRY)) {
      expect(m.nivelComunas).toBe(CIUDADES_CON_COMUNAS.includes(m.id));
    }
    expect(MUNICIPAL_DIVISIONS_REGISTRY.rionegro.nivelComunas).toBe(false);
  });

  it('municipios con 20.000 votantes o menos: solo cabecera y veredas; los demás, barrios', async () => {
    expect(nivelesMunicipales('abriaqui', 'Abriaquí').ultimoNivel).toBe(false); // 2.029
    expect(nivelesMunicipales('amaga', 'Amagá').ultimoNivel).toBe(true); // 24.772
    for (const m of Object.values(MUNICIPAL_DIVISIONS_REGISTRY)) {
      if (m.department !== 'Antioquia' || nivelesMunicipales(m.id, m.name).ultimoNivel) continue;
      const sub = await m.loadSubdivisions!();
      expect(sub.features.filter((f) => f.properties.tipo === 'Cabecera')).toHaveLength(1);
      expect(sub.features.every((f) => ['Cabecera', 'Vereda'].includes(String(f.properties.tipo)))).toBe(true);
    }
  });

  it('Bello: 12 comunas, 132 barrios y 19 veredas (planos del POT), todos con padre', async () => {
    const b = MUNICIPAL_DIVISIONS_REGISTRY.bello;
    const [div, sub] = await Promise.all([b.loadDivisions!(), b.loadSubdivisions!()]);
    expect(div.features.filter((f) => f.properties.tipo === 'Comuna')).toHaveLength(12);
    expect(div.features.filter((f) => f.properties.tipo === 'Zona rural').map((f) => f.properties.name).sort())
      .toEqual(['Corregimiento San Félix', 'Veredas sin corregimiento']);
    expect(sub.features.filter((f) => f.properties.tipo === 'Barrio')).toHaveLength(132);
    const veredas = sub.features.filter((f) => f.properties.tipo === 'Vereda');
    expect(veredas).toHaveLength(19);
    expect(veredas.filter((f) => f.properties.parentName === 'Corregimiento San Félix')).toHaveLength(10);
    expect(sub.features.every((f) => f.properties.parentId)).toBe(true);
  });
});

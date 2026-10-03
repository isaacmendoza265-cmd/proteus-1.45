import { describe, expect, it } from 'vitest';
import { segmentacionComoTexto, segmentarTerritorio } from '../voterDemographicsService';
import { getDaneMunicipio } from '../daneMunicipalService';
import { getMunicipalCensus } from '../electoralCensusService';

const sel = (muniId: string | null, comunaId: string | null = null, subregion: string | null = null) => ({ subregion, muniId, comunaId, barrioId: null });

describe('Segmentos de población con datos del territorio', () => {
  it('Medellín: 54 cruces que suman las personas de 18 años o más de la proyección DANE 2026', async () => {
    const s = await segmentarTerritorio(sel('medellin'));
    expect(s.cohortes).toHaveLength(54);
    const suma = s.cohortes.reduce((a, c) => a + c.personas, 0);
    expect(Math.abs(suma - s.adultos!)).toBeLessThan(60); // redondeo de 54 cruces
    expect(s.adultos!).toBeLessThan(getDaneMunicipio('05001')!.poblacion);
    expect(s.adultos!).toBeGreaterThan(0.7 * getDaneMunicipio('05001')!.poblacion);
    expect(s.sexoEdad.estado).toBe('oficial');
    expect(s.electoral.censo).toBe(getMunicipalCensus('05001')!.total);
  });

  it('los repartos cambian de un municipio a otro (ya no son pesos fijos)', async () => {
    const [med, rural] = await Promise.all([segmentarTerritorio(sel('medellin')), segmentarTerritorio(sel('abriaqui'))]);
    expect(med.estrato.reparto!.alto).toBeGreaterThan(rural.estrato.reparto!.alto);
    expect(med.educacion.reparto!.superior).toBeGreaterThan(rural.educacion.reparto!.superior);
  });

  it('una comuna de Medellín usa la proyección oficial del Distrito (2026) y trae la proyección a 2030', async () => {
    const s = await segmentarTerritorio(sel('medellin', 'comuna-14'));
    expect(s.sexoEdad.estado).toBe('oficial');
    expect(s.sexoEdad.fuente).toMatch(/Planeación/);
    expect(s.proyeccion2030!.adultos).toBeGreaterThan(s.proyeccion2030!.adultos2026);
    expect(s.proyeccion2030!.porEdad.adulto_mayor).toBeGreaterThan(s.proyeccion2030!.porEdad2026.adulto_mayor);
    expect(s.cohortes).toHaveLength(54);
    expect(s.estrato.reparto!.alto).toBeGreaterThan(0.8); // El Poblado
    expect(s.electoral.alcance).toMatch(/Poblado/);
  });

  it('la subregión suma sus municipios', async () => {
    const s = await segmentarTerritorio(sel(null, null, 'Valle de Aburrá'));
    expect(s.nivel).toBe('subregión');
    const med = await segmentarTerritorio(sel('medellin'));
    expect(s.adultos!).toBeGreaterThan(med.adultos!);
    expect(s.cohortes).toHaveLength(54);
  });

  it('sin votos ni participación por cruce, y el texto para Gemini lo dice', async () => {
    const s = await segmentarTerritorio(sel('medellin'));
    const c = s.cohortes[0] as unknown as Record<string, unknown>;
    for (const k of ['estimatedActualVotes', 'expectedTurnoutRate', 'candidateFitScore', 'tacticalPriority']) expect(c[k]).toBeUndefined();
    const txt = segmentacionComoTexto(s, s.cohortes[0]);
    expect(txt).not.toMatch(/votos reales|miedos no declarados/i);
    expect(txt).toMatch(/no hay votos ni participación por segmento/);
    expect(txt).toMatch(/Estimado, no conteo/);
  });
});

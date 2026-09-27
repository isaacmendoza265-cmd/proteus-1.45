import { describe, expect, it } from 'vitest';
import {
  COLOR_SIN_DATO,
  PALETA_ECONOMICA,
  aniosYTipos,
  colorPorCortes,
  cortesQuintiles,
  eleccionDelAnio,
  nombreTipo,
  puntosEleccion,
  valorDemografico,
  valorMunicipio,
  valorSubdivision,
} from '../mapColorService';
import { cargarDemografia, cargarEconomia } from '../territoryProfileService';
import { cargarElecciones } from '../electionResultsService';
import { cargarGanadores, colorGanador, colorPorCandidato, coloresCandidatos } from '../winnersService';

describe('color del mapa por capa', () => {
  it('quintiles sin cortes repetidos y colores por clase', () => {
    expect(cortesQuintiles([])).toEqual([]);
    expect(cortesQuintiles([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toEqual([2, 4, 6, 8, 10]);
    expect(cortesQuintiles([5, 5, 5])).toEqual([5]);
    const c = cortesQuintiles([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(colorPorCortes(1, c, PALETA_ECONOMICA)).toBe(PALETA_ECONOMICA[0]);
    expect(colorPorCortes(10, c, PALETA_ECONOMICA)).toBe(PALETA_ECONOMICA[4]);
    expect(colorPorCortes(null, c, PALETA_ECONOMICA)).toBe(COLOR_SIN_DATO);
  });

  it('porcentajes demográficos con edades quinquenales y decenales', () => {
    const quinq = new Array(17).fill(10);
    expect(valorDemografico({ hombres: 40, mujeres: 60, edades: quinq }, 'mujeres')).toBe(60);
    expect(valorDemografico({ hombres: 1, mujeres: 1, edades: quinq }, 'jovenes')).toBeCloseTo((100 * 2) / 17);
    expect(valorDemografico({ hombres: 1, mujeres: 1, edades: quinq }, 'mayores')).toBeCloseTo((100 * 5) / 17);
    const dec = new Array(9).fill(10);
    expect(valorDemografico({ hombres: 1, mujeres: 1, edades: dec }, 'jovenes')).toBeCloseTo(100 / 9);
    // Zona anonimizada: sin sexo ni edad no hay porcentaje (no se inventa)
    expect(valorDemografico({ hombres: 0, mujeres: 0, edades: new Array(9).fill(0) }, 'mujeres')).toBeNull();
  });

  it('año y tipo de elección', () => {
    const es = [
      { id: 'presidente-2026-1', nombre: 'Presidencia 2026 · 1.ª vuelta' },
      { id: 'senado-2026', nombre: 'Senado 2026' },
      { id: 'alcaldia-2023', nombre: 'Alcaldía 2023' },
      { id: 'concejo-2023', nombre: 'Concejo 2023' },
      { id: 'alcaldia-2019', nombre: 'Alcaldía 2019' },
    ];
    expect(aniosYTipos(es).map((a) => a.anio)).toEqual([2026, 2023, 2019]);
    expect(nombreTipo('Presidencia 2026 · 1.ª vuelta')).toBe('Presidencia · 1.ª vuelta');
    // Cambiar de año conserva el tipo si existe
    expect(eleccionDelAnio(es, 2019, 'alcaldia')).toBe('alcaldia-2019');
    expect(eleccionDelAnio(es, 2019, 'concejo')).toBe('alcaldia-2019');
    expect(eleccionDelAnio(es, 2010, 'concejo')).toBeNull();
  });

  it('Bello: barrios con datos del CNPV 2018 y municipios con la proyección 2026 y el NBI', async () => {
    await Promise.all([cargarDemografia('05088'), cargarEconomia('05088')]);
    const m = valorSubdivision('bello-div-6', 'demografico', 'mujeres');
    expect(m.valor).toBeGreaterThan(40);
    expect(m.valor).toBeLessThan(60);
    const e = valorSubdivision('bello-div-6', 'economico', 'estrato');
    expect(e.valor).toBeGreaterThanOrEqual(1);
    expect(e.valor).toBeLessThanOrEqual(6);
    expect(valorSubdivision('no-existe', 'economico', 'ipm').valor).toBeNull();
    const pm = valorMunicipio('05088', undefined, 'demografico', 'mayores');
    expect(pm.valor).toBeGreaterThan(5);
    expect(pm.fuente).toContain('2026');
    expect(valorMunicipio('05088', 12.3, 'economico', 'nbi').valor).toBe(12.3);
    expect(valorMunicipio('05088', undefined, 'economico', 'nbi').valor).toBeNull();
  });

  it('Gobernación 2023: cada candidato ganador con su color (no todo el departamento igual)', async () => {
    const indice = await cargarGanadores();
    expect(colorPorCandidato('gobernacion-2023')).toBe(true);
    expect(colorPorCandidato('alcaldia-2023')).toBe(false);
    const cands = coloresCandidatos(indice, 'gobernacion-2023');
    const colores = new Set(Object.values(indice.ganadores['gobernacion-2023']).map(([ganador, partido]) => colorGanador('gobernacion-2023', { ganador, partido }, cands)));
    expect(colores.size).toBe(4);
  });

  it('los puestos de cada elección son los de ese año', async () => {
    const es = await cargarElecciones('05088');
    const al23 = es.find((e) => e.id === 'alcaldia-2023')!;
    const pts = puntosEleccion(al23, []);
    expect(pts.length).toBeGreaterThan(0);
    expect(pts.every((p) => p.puesto2026 === null)).toBe(true);
    expect(pts.some((p) => p.ganador)).toBe(true);
  });
});

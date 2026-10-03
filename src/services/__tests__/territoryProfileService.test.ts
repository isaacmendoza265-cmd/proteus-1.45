import { describe, it, expect, beforeAll } from 'vitest';
import {
  cargarDemografia, territorioBello, territorioFicha, tieneFicha, demografia, censoElectoral, grupos, politica, actoresDeTerritorio, sumarDemografia, ANCLAS_BELLO,
} from '../territoryProfileService';
import type { PuestoVotacion } from '../pollingStationsService';

const puesto = (total: number, mujeres: number, mesas = 10, cod = String(total)): PuestoVotacion => ({
  codMunicipio: '01049', codPuesto: cod, zona: '01', puesto: "PUESTO " + cod, mujeres, hombres: total - mujeres, total, mesas, divipole2023: null,
});

describe('territorios de Bello', () => {
  it('reconoce municipio, comunas, barrios y veredas', () => {
    expect(territorioBello('bello')?.tipo).toBe('municipio');
    expect(territorioBello('bello-div-4')?.clase).toBe('Comuna');
    const b = territorioBello('bello-sub-B001');
    expect(b?.tipo).toBe('subdivision');
    expect(b?.padreId).toBe('bello-div-6');
    expect(tieneFicha('medellin-com-1')).toBe(false);
  });
});

beforeAll(async () => { await cargarDemografia('05088'); });

describe('demografía', () => {
  it('la comuna es la suma de sus barrios', () => {
    const com = demografia(territorioBello('bello-div-6')!);
    expect(com.estado).toBe('oficial');
    // Suma de las manzanas del CNPV 2018 cuyo centro cae en los barrios de la comuna
    expect(com.datos!.personas).toBe(49424);
    expect(com.datos!.hombres + com.datos!.mujeres).toBe(49424);
    expect(com.datos!.etiquetasEdad).toHaveLength(9);
    expect(com.proyeccion.estado).toBe('estimado');
  });
  it('el municipio tiene proyección oficial', () => {
    const m = demografia(territorioBello('bello')!);
    expect(m.proyeccion.estado).toBe('oficial');
    expect(m.proyeccion.valor).toBe(609168);
  });
  it('la zona rural solo cuenta las manzanas (centros poblados) y no tiene proyección', () => {
    const sf = demografia(territorioBello('bello-div-SF')!);
    // 923 desde el 27-sep: ~1.000 personas en manzanas fuera de las veredas del POT se sumaban a la vereda
    // más cercana de San Félix; ahora caen en el sector Ovejas (fuera del corregimiento)
    expect(sf.datos!.personas).toBe(923);
    expect(sf.proyeccion.estado).toBe('sin-informacion');
  });
  it('cuenta aparte las personas anonimizadas', () => {
    const d = sumarDemografia([[10, 5, 5, ...new Array(17).fill(0), 0, 1, 1, 0], [7, 0, 0, ...new Array(17).fill(0), 0, 0, 0, 0]]);
    expect(d.personas).toBe(17);
    expect(d.personasAnonimizadas).toBe(7);
  });
});

describe('censo y grupos', () => {
  const t = territorioBello('bello-div-6')!;
  it('suma los puestos de dentro', () => {
    const c = censoElectoral(t, [puesto(1000, 520), puesto(500, 260)]);
    expect(c.censo).toBe(1500);
    expect(c.mujeres).toBe(780);
    expect(c.puestos[0].total).toBe(1000);
  });
  it('sin puestos no reparte nada', () => {
    const c = censoElectoral(t, []);
    expect(c.estado).toBe('sin-informacion');
    expect(c.nota).toMatch(/No se reparte/);
  });
  it('los votantes estimados suman el censo por sexo', () => {
    const c = censoElectoral(t, [puesto(24015, 12800)]);
    const g = grupos(demografia(t), c);
    expect(g.estado).toBe('estimado');
    const m = g.filas.reduce((s, f) => s + (f.votantesMujeres ?? 0), 0);
    const h = g.filas.reduce((s, f) => s + (f.votantesHombres ?? 0), 0);
    expect(Math.abs(m - 12800)).toBeLessThanOrEqual(3);
    expect(Math.abs(h - 11215)).toBeLessThanOrEqual(3);
    expect(Math.round(g.filas.reduce((s, f) => s + f.pct, 0))).toBe(100);
    expect(g.segmentos).toHaveLength(6);
  });
  it('sin demografía no estima grupos', () => {
    // Rionegro no tiene demografía por barrio cargada
    const c2 = territorioFicha('rionegro-div-C2')!;
    expect(grupos(demografia(c2), censoElectoral(c2, [])).estado).toBe('sin-informacion');
  });
});

describe('política', () => {
  it('el municipio trae la Alcaldía 2023 oficial', () => {
    const p = politica(territorioBello('bello')!);
    expect(p.resultados.estado).toBe('oficial');
    expect(p.resultados.alcaldia!.candidatos[0].nombre).toMatch(/Gonzalez/);
    expect(p.actores.length).toBeGreaterThan(5);
  });
  it('los actores del barrio son los de su comuna y nunca exponen cédulas', () => {
    const barrio = territorioBello('bello-sub-B001')!;
    const comuna = territorioBello('bello-div-6')!;
    expect(actoresDeTerritorio(barrio).map((a) => a.id)).toEqual(actoresDeTerritorio(comuna).map((a) => a.id));
    for (const a of actoresDeTerritorio(territorioBello('bello')!)) expect(Object.keys(a)).not.toContain('cedula');
  });
  it('la comuna 12 no tiene nombre oficial, pero un actor anclado en El Pinar (su único barrio) cae en ella', () => {
    expect(territorioBello('bello-div-12')!.nombre).toBe('Comuna 12');
    expect(ANCLAS_BELLO['bello-div-12']('líderes del asentamiento el pinar')).toBe(true);
    expect(ANCLAS_BELLO['bello-div-12']('comuna 12 de bello')).toBe(true);
    expect(ANCLAS_BELLO['bello-div-1']('líderes de el pinar')).toBe(false);
  });
});

describe('Rionegro (piloto de resultados por puesto)', () => {
  it('tiene ficha de municipio, comuna y vereda', () => {
    expect(territorioFicha('rionegro')?.dane).toBe('05615');
    expect(territorioFicha('rionegro-div-C2')?.clase).toBe('Comuna');
    expect(territorioFicha('rionegro-sub-042')?.padreId).toBe('rionegro-div-C4');
  });
  it('sin DANE por barrio, Rionegro dice que no hay demografía', () => {
    expect(demografia(territorioFicha('rionegro-div-C2')!).estado).toBe('sin-informacion');
  });
});

describe('Medellín', () => {
  it('tiene ficha de comuna, corregimiento y barrio', () => {
    expect(territorioFicha('comuna-11')?.municipio).toBe('Medellín');
    expect(territorioFicha('med-correg-santa-elena')?.clase).toBe('Corregimiento');
    expect(territorioFicha('barrio-0101')?.padreId).toBe('comuna-1');
    expect(territorioFicha('medellin-base-outline')).toBeNull();
  });
});

describe('Medellín: demografía y economía por manzana', () => {
  it('estrato por barrio y demografía decenal', async () => {
    const { cargarDemografia, cargarEconomia, economia } = await import('../territoryProfileService');
    expect(await cargarDemografia('05001')).toBe(true);
    expect(await cargarEconomia('05001')).toBe(true);
    const d = demografia(territorioFicha('barrio-0101')!);
    expect(d.datos!.etiquetasEdad).toHaveLength(9);
    expect(d.datos!.personas).toBeGreaterThan(20000);
    const e = economia(territorioFicha('barrio-0101')!)!;
    expect(e.estratoModa).toBe(2);
    expect(economia(territorioFicha('barrio-1403')!)!.estratoModa).toBe(5);
    expect(economia(territorioFicha('comuna-14')!)!.estratoPromedio!).toBeGreaterThan(4.5);
  });
});

describe('Sexo y edad 2026 (proyección DANE por municipio y área)', () => {
  it('municipio y cabecera cuadran con la proyección oficial; por debajo no se reparte', async () => {
    const { piramide2026, territorioFicha } = await import('../territoryProfileService');
    expect(piramide2026(territorioFicha('medellin')!)!.total).toBe(2526795);
    const cab = piramide2026(territorioFicha('abejorral-sub-CAB')!)!;
    expect(cab.alcance).toBe('cabecera');
    expect(cab.total).toBe(8520);
    expect(cab.hombres).toHaveLength(17);
    expect(piramide2026(territorioFicha('bello-div-4')!)).toBeNull();
  });
});

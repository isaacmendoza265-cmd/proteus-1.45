import { describe, it, expect } from 'vitest';
import {
  territorioBello, tieneFicha, demografia, censoElectoral, grupos, politica, actoresDeTerritorio, sumarDemografia,
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

describe('demografía', () => {
  it('la comuna es la suma de sus barrios', () => {
    const com = demografia(territorioBello('bello-div-6')!);
    expect(com.estado).toBe('oficial');
    expect(com.datos!.personas).toBe(35900);
    expect(com.datos!.hombres + com.datos!.mujeres).toBe(35900);
    expect(com.proyeccion.estado).toBe('estimado');
  });
  it('el municipio tiene proyección oficial', () => {
    const m = demografia(territorioBello('bello')!);
    expect(m.proyeccion.estado).toBe('oficial');
    expect(m.proyeccion.valor).toBe(609168);
  });
  it('una zona anonimizada dice que no hay sexo ni edad', () => {
    const sf = demografia(territorioBello('bello-div-SF')!);
    expect(sf.conDetalle).toBe(false);
    expect(sf.estado).toBe('sin-informacion');
    expect(sf.motivo).toMatch(/anonimiza|rural/);
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
    const sf = territorioBello('bello-div-SF')!;
    expect(grupos(demografia(sf), censoElectoral(sf, [])).estado).toBe('sin-informacion');
  });
});

describe('política', () => {
  it('el municipio trae la Alcaldía 2023 oficial', () => {
    const p = politica(territorioBello('bello')!);
    expect(p.resultados.estado).toBe('oficial');
    expect(p.resultados.alcaldia!.candidatos[0].nombre).toMatch(/Gonzalez/);
    expect(p.actores.length).toBeGreaterThan(5);
  });
  it('una comuna no tiene resultados propios', () => {
    expect(politica(territorioBello('bello-div-4')!).resultados.estado).toBe('sin-informacion');
  });
  it('los actores del barrio son los de su comuna y nunca exponen cédulas', () => {
    const barrio = territorioBello('bello-sub-B001')!;
    const comuna = territorioBello('bello-div-6')!;
    expect(actoresDeTerritorio(barrio).map((a) => a.id)).toEqual(actoresDeTerritorio(comuna).map((a) => a.id));
    for (const a of actoresDeTerritorio(territorioBello('bello')!)) expect(Object.keys(a)).not.toContain('cedula');
  });
});

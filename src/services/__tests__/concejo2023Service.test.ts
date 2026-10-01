import { describe, it, expect } from 'vitest';
import { cargarConcejo2023, concejoDesdeEleccion, normPartido, CONCEJOS_POR_PUESTO, LISTAS_POR_CANDIDATO } from '../concejo2023Service';
import { MUNICIPIOS_CON_RESULTADOS, cargarElecciones, sumarEleccion } from '../electionResultsService';

const ANTIOQUIA = MUNICIPIOS_CON_RESULTADOS.filter((d) => d.startsWith('05'));

describe('Concejo 2023 por candidato', () => {
  it('los 125 municipios tienen archivo: 99 con cifras, 26 sin datos sólidos (sin cifras)', async () => {
    const todos = await Promise.all(ANTIOQUIA.map((d) => cargarConcejo2023(d)));
    expect(todos.every(Boolean)).toBe(true);
    const sin = todos.filter((c) => c!.estado === 'sin-datos');
    expect(todos.length).toBe(125);
    expect(sin.length).toBe(26);
    // Nada inventado donde no hay datos: sin partidos y con el % de mesas del preconteo (< 98 %)
    for (const c of sin) {
      expect(c!.partidos).toEqual([]);
      expect(c!.pctMesas!).toBeLessThan(98);
    }
  });

  it('lista + candidatos = total de cada partido, y la suma de partidos = votos por partidos', async () => {
    for (const d of ANTIOQUIA) {
      const c = (await cargarConcejo2023(d))!;
      for (const p of c.partidos) expect(p.soloLista + p.candidatos.reduce((s, x) => s + x.votos, 0)).toBe(p.total);
      expect(c.partidos.reduce((s, p) => s + p.total, 0)).toBe(c.votosPartidos);
    }
  });

  it('Abejorral (escrutinio E-24): Conservador primero, 5 curules; candidatos ordenados por voto', async () => {
    const c = (await cargarConcejo2023('mpio-05002'))!;
    expect(c.tipo).toBe('escrutinio');
    expect(c.partidos[0].nombre).toBe('Partido Conservador Colombiano');
    expect(c.partidos[0].total).toBe(144 + 2483);
    expect(c.partidos[0].curules).toBe(5);
    const cd = c.partidos.find((p) => /Centro Democr/.test(p.nombre))!;
    expect(cd.soloLista).toBe(184);
    expect(cd.candidatos[0]).toMatchObject({ codigo: '001', nombre: 'Diego Alexander Palacio Osorio', votos: 417 });
  });

  it('las curules por lista cuadran con el escrutinio municipal (cruce de nombres completo)', async () => {
    for (const d of ANTIOQUIA) {
      const c = (await cargarConcejo2023(d))!;
      if (c.estado !== 'solido' || c.totalCurules == null) continue;
      expect(c.partidos.reduce((s, p) => s + (p.curules ?? 0), 0), c.municipio).toBe(c.totalCurules);
    }
  });

  it('el preconteo del libro coincide con el preconteo por puesto de Proteus (Medellín)', async () => {
    const c = (await cargarConcejo2023('05001'))!;
    expect(c.tipo).toBe('preconteo');
    const e = (await cargarElecciones('05001')).find((x) => x.id === 'concejo-2023')!;
    const porPuesto = new Map(sumarEleccion(e, 'todos')!.partidos.map((p) => [normPartido(p.nombre), p.votos]));
    for (const p of c.partidos) expect(porPuesto.get(normPartido(p.nombre)), p.nombre).toBe(p.total);
  });

  it('Pueblorrico queda como incompleto, con su aviso', async () => {
    const c = (await cargarConcejo2023('05576'))!;
    expect(c.estado).toBe('incompleto');
    expect(c.nota).toMatch(/repitió la elección/);
  });

  it('Concejo 2019 y 2015 por candidato desde el escrutinio por puesto: 125 municipios, listas cuadran', async () => {
    for (const d of ANTIOQUIA) {
      const elecciones = await cargarElecciones(d);
      for (const id of CONCEJOS_POR_PUESTO) {
        const e = elecciones.find((x) => x.id === id)!;
        expect(e, `${d} ${id}`).toBeTruthy();
        const c = concejoDesdeEleccion(e, 'todos', d)!;
        expect(c.partidos.length).toBeGreaterThan(0);
        for (const p of c.partidos) {
          const pref = p.candidatos.reduce((s, x) => s + x.votos, 0);
          expect(pref, `${d} ${id} ${p.nombre}`).toBeLessThanOrEqual(p.total);
          expect(p.soloLista + pref).toBe(p.total);
        }
        expect(c.totalCurules).toBeNull();
        expect(c.candidatosParciales).toBe(false);
      }
    }
  });

  it('Girardota 2019 por puestos: listas exactas, candidatos como mínimo y sin voto solo por lista', async () => {
    const e = (await cargarElecciones('05308')).find((x) => x.id === 'concejo-2019')!;
    const total = concejoDesdeEleccion(e, 'todos', 'Girardota')!;
    const puestos = concejoDesdeEleccion(e, Object.keys(e.puestos), 'Girardota')!;
    expect(puestos.candidatosParciales).toBe(true);
    expect(puestos.votosPartidos).toBe(total.votosPartidos);
    expect(puestos.partidos.map((p) => p.total)).toEqual(total.partidos.map((p) => p.total));
    const exacto = new Map(total.partidos.flatMap((p) => p.candidatos.map((c) => [`${p.nombre}|${c.nombre}`, c.votos] as const)));
    for (const p of puestos.partidos) {
      expect(p.soloLista).toBe(0);
      for (const c of p.candidatos) expect(c.votos).toBeLessThanOrEqual(exacto.get(`${p.nombre}|${c.nombre}`)!);
    }
    expect(concejoDesdeEleccion(e, [], 'Girardota')).toBeNull();
  });

  it('Asamblea 2019 y 2015 y Cámara 2022 y 2026 por candidato: 125 municipios, listas cuadran, tipo de fuente', async () => {
    for (const d of ANTIOQUIA) {
      const elecciones = await cargarElecciones(d);
      for (const id of LISTAS_POR_CANDIDATO.filter((x) => !x.startsWith('concejo'))) {
        const e = elecciones.find((x) => x.id === id)!;
        expect(e, `${d} ${id}`).toBeTruthy();
        const c = concejoDesdeEleccion(e, 'todos', d)!;
        expect(c.partidos.some((p) => p.candidatos.length > 0), `${d} ${id}`).toBe(true);
        for (const p of c.partidos) expect(p.soloLista + p.candidatos.reduce((s, x) => s + x.votos, 0)).toBe(p.total);
        expect(c.tipo).toBe(id === 'camara-2026' ? 'preconteo' : 'escrutinio');
      }
    }
  });
});


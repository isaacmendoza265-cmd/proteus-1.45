import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  COMPARACIONES,
  compararOpciones,
  emparejar,
  estimarTerritorio,
  resultadoOficial,
  wilson,
  type Agregados,
} from '../encuestasService';

const ag = JSON.parse(readFileSync(resolve(__dirname, '../../../public/modulos/voto-correlaciones/data/agregados.json'), 'utf8')) as Agregados;

describe('encuestasService', () => {
  it('Wilson da un intervalo que contiene p y se estrecha con n', () => {
    const [lo, hi] = wilson(0.4, 100);
    expect(lo).toBeLessThan(0.4);
    expect(hi).toBeGreaterThan(0.4);
    const [lo2, hi2] = wilson(0.4, 1000);
    expect(hi2 - lo2).toBeLessThan(hi - lo);
  });

  it('trae los acumulados que usa cada comparación', () => {
    for (const c of COMPARACIONES) {
      const e = ag.encuestas.find((x) => x.id === c.acumulado);
      expect(e, c.acumulado).toBeTruthy();
      expect(e!.tablas[`municipio|${c.pregunta}`], c.acumulado).toBeTruthy();
    }
  });

  it('estima Medellín en 1.ª vuelta sobre respuestas válidas (suma 100 %)', () => {
    const est = estimarTerritorio(ag, 'acum-fase-2', 'voto_1v', 'municipio', '05001')!;
    expect(est.territorio).toBe('Medellín');
    expect(est.nEfectivo).toBeGreaterThan(1000);
    const suma = est.opciones.reduce((s, o) => s + o.p, 0);
    expect(suma).toBeCloseTo(1, 6);
    expect(est.opciones.some((o) => o.opcion === 'NS/NR')).toBe(false);
  });

  it('no muestra un municipio con n efectivo menor que 30', () => {
    // Donmatías, Senado en precampaña: 63 casos, n efectivo ≈ 1
    expect(estimarTerritorio(ag, 'acum-fase-1', 'voto_senado', 'municipio', '05237')).toBeNull();
    expect(estimarTerritorio(ag, 'acum-fase-1', 'voto_senado', 'departamento', '05')).not.toBeNull();
  });

  it('empareja nombres de encuesta y de la Registraduría', () => {
    const cand = ['Iván Cepeda Castro', 'Abelardo De La Espriella', 'Óscar Mauricio Lizcano Arango', 'Voto en blanco'];
    expect(emparejar('Iván Cepeda', cand)).toBe('Iván Cepeda Castro');
    expect(emparejar('Abelardo de la Espriella', cand)).toBe('Abelardo De La Espriella');
    expect(emparejar('Mauricio Lizcano', cand)).toBe('Óscar Mauricio Lizcano Arango');
    expect(emparejar('Voto en blanco', cand)).toBe('Voto en blanco');
    const par = ['Partido Centro Democrático', 'Pacto Histórico Senado', 'Ahora Colombia', 'Partido De La Unión Por La Gente - Partido De La U', 'Alianza Por Colombia'];
    expect(emparejar('Centro Democrático', par)).toBe('Partido Centro Democrático');
    expect(emparejar('Pacto Histórico', par)).toBe('Pacto Histórico Senado');
    expect(emparejar('¡Ahora Colombia! (MIRA, NL, Dignidad)', par)).toBe('Ahora Colombia');
    expect(emparejar('Partido de la U', par)).toBe('Partido De La Unión Por La Gente - Partido De La U');
    expect(emparejar('Alianza Verde', par)).toBeNull();
  });

  it('compara Medellín 2.ª vuelta con el escrutinio oficial (dos candidatos, 100 %)', async () => {
    const est = estimarTerritorio(ag, 'acum-fase-3', 'voto_2v', 'municipio', '05001')!;
    const res = (await resultadoOficial(['05001'], 'presidente-2026-2', 'Medellín'))!;
    expect(res.votos).toHaveLength(2);
    expect(res.votos.reduce((s, v) => s + v.pct, 0)).toBeCloseTo(1, 6);
    const filas = compararOpciones(est, res);
    expect(filas.map((f) => f.oficial).sort()).toEqual(['Abelardo De La Espriella', 'Iván Cepeda Castro']);
    for (const f of filas) expect(f.diferencia).not.toBeNull();
  });
});

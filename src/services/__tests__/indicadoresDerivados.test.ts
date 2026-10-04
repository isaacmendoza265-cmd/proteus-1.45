import { describe, expect, it } from 'vitest';
import { cambiosDePeso, indicadoresDerivados } from '../ia/indicadoresDerivados';
import type { EleccionPuestos } from '../electionResultsService';

const fila = (habilitados: number, votantes: number, partidos: [number, number][]) =>
  ({ habilitados, votantes, blanco: 0, nulos: 0, noMarcados: 0, partidos, candidatos: [] }) as never;

const eleccion = (id: string, anio: number, partidos: string[], municipio: never, puestos: Record<string, never>): EleccionPuestos =>
  ({ id, nombre: `Senado ${anio}`, fecha: '', fuente: 'Registraduría', nota: '', tipo: 'escrutinio', porCandidato: false, codigos: '2026', anio, partidos, candidatos: [], municipio, puestos, nombres: {} }) as unknown as EleccionPuestos;

describe('indicadores derivados del dossier', () => {
  const e22 = eleccion('senado-2022', 2022, ['Centro Democrático', 'Pacto Histórico'],
    fila(1000, 500, [[0, 300], [1, 200]]), { a: fila(100, 40, [[0, 20], [1, 20]]) });
  const e26 = eleccion('senado-2026', 2026, ['Centro Democrático', 'Pacto Histórico'],
    fila(1000, 600, [[0, 420], [1, 180]]), { a: fila(100, 50, [[0, 20], [1, 30]]) });

  it('calcula margen, participación, votos en juego y variación frente a la jornada anterior', () => {
    const l = indicadoresDerivados({ elecciones: [e22, e26], codigosDe: () => 'todos', subMunicipal: false, alcance: 'Medellín', municipio: 'Medellín' });
    const txt = l.join('\n');
    expect(txt).toContain('Senado 2026 en Medellín (comparada con Senado 2022)');
    expect(txt).toContain('Centro Democrático saca 40,0 pp y 240 votos a Pacto Histórico');
    expect(txt).toContain('votos en juego (habilitados que no votaron): 400');
    expect(txt).toContain('participación frente a Senado 2022: +10,0 pp');
    expect(txt).toContain('ganan peso: Centro Democrático +10,0 pp (60,0 % → 70,0 %)');
    expect(txt).toContain('Modelo Proteus');
  });

  it('en una unidad menor que el municipio compara contra el municipio en la misma jornada', () => {
    const txt = indicadoresDerivados({ elecciones: [e26], codigosDe: () => ['a'], subMunicipal: true, alcance: 'Comuna 1', municipio: 'Medellín' }).join('\n');
    expect(txt).toContain('participación frente a todo Medellín: −10,0 pp');
    expect(txt).toContain('Pacto Histórico +30,0 pp (aquí 60,0 %, municipio 30,0 %)');
  });

  it('empareja fuerzas por nombre sin tildes ni mayúsculas', () => {
    const c = cambiosDePeso(new Map([['Partido Liberal Colombiano', 5]]), new Map([['PARTIDO LIBERAL COLOMBIANO', 7]]));
    expect(c[0].delta).toBe(2);
  });
});

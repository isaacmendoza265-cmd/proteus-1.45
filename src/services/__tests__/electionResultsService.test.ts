import { describe, it, expect } from 'vitest';
import { cargarElecciones, sumarEleccion, tieneResultadosPorPuesto, MUNICIPIOS_CON_RESULTADOS } from '../electionResultsService';

const total = async (dane: string, id: string) => {
  const e = (await cargarElecciones(dane)).find((x) => x.id === id)!;
  return { e, total: sumarEleccion(e, 'todos')!, suma: sumarEleccion(e, Object.keys(e.puestos))! };
};

describe('resultados por puesto', () => {
  it('Rionegro 2023: la suma de sus 20 puestos reproduce el total del preconteo', async () => {
    const { total: t, suma } = await total('05615', 'alcaldia-2023');
    expect(t.votantes).toBe(83354);
    expect(suma.votantes).toBe(83354);
    expect(t.candidatos[0].nombre).toMatch(/Rivas Urrea/);
    expect(t.candidatos[0].votos).toBe(41092);
  });
  it('Bello y Medellín 2023 cuadran', async () => {
    expect((await total('05088', 'alcaldia-2023')).suma.votantes).toBe(177706);
    const m = await total('05001', 'alcaldia-2023');
    expect(m.suma.votantes).toBe(971537);
    expect(m.total.candidatos[0].nombre).toMatch(/Gutierrez/);
  });
  it('Concejo 2023 suma por partido', async () => {
    const { total: t } = await total('05615', 'concejo-2023');
    expect(t.partidos.length).toBeGreaterThan(5);
    expect(t.candidatos).toEqual([]);
  });
  it('Senado 2026 en Medellín: total municipal = suma de puestos', async () => {
    const { total: t, suma } = await total('05001', 'senado-2026');
    expect(t.votantes).toBe(913680);
    expect(suma.votantes).toBe(t.votantes);
    expect(t.partidos[0].nombre).toMatch(/Centro Democr/);
  });
  it('un territorio suma solo sus puestos y sin puestos no inventa nada', async () => {
    const e = (await cargarElecciones('05615')).find((x) => x.id === 'alcaldia-2023')!;
    expect(sumarEleccion(e, ['01214030201'])!.puestos).toBe(1);
    expect(sumarEleccion(e, [])).toBeNull();
  });
  it('municipio sin resultados (fuera de Antioquia)', async () => {
    expect(tieneResultadosPorPuesto('11001')).toBe(false);
    expect(await cargarElecciones('11001')).toEqual([]);
  });
  it('los 125 municipios de Antioquia tienen Alcaldía, Concejo, Senado y Cámara, y cuadran', async () => {
    expect(MUNICIPIOS_CON_RESULTADOS).toHaveLength(125);
    for (const dane of MUNICIPIOS_CON_RESULTADOS) {
      const es = await cargarElecciones(dane);
      const base = ['alcaldia-2023', 'concejo-2023', 'senado-2026', 'camara-2026'];
      const conPresidencial = es.some((e) => e.id === 'presidente-2026-1');
      expect(es.map((e) => e.id)).toEqual(conPresidencial ? [...base, 'presidente-2026-1', 'presidente-2026-2'] : base);
      for (const e of es) {
        if (e.id === 'concejo-2023') continue;
        expect(sumarEleccion(e, Object.keys(e.puestos))!.votantes).toBe(e.municipio.votantes);
      }
    }
  });
  it('fase C (79 municipios con 20.000 votantes o menos): sin presidencial todavía', async () => {
    const es = await cargarElecciones('05002'); // Abejorral
    expect(es.map((e) => e.id)).toEqual(['alcaldia-2023', 'concejo-2023', 'senado-2026', 'camara-2026']);
  });
  it('Presidencia 2026 en Medellín: escrutinio mesa a mesa, sin cédulas', async () => {
    const es = await cargarElecciones('05001');
    const v2 = es.find((e) => e.id === 'presidente-2026-2')!;
    expect(v2.tipo).toBe('escrutinio');
    expect(v2.porCandidato).toBe(true);
    const t = sumarEleccion(v2, 'todos')!;
    expect(t.votantes).toBe(1283036);
    expect(t.candidatos[0].nombre).toMatch(/Espriella/);
    expect(t.candidatos[0].votos).toBe(819802);
    expect(JSON.stringify(v2)).not.toMatch(/CANCEDULA|cedula/i);
  });
});

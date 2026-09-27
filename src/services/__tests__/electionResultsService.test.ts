import { describe, it, expect } from 'vitest';
import { cargarElecciones, sumarEleccion, tieneResultadosPorPuesto, MUNICIPIOS_CON_RESULTADOS } from '../electionResultsService';

// De la más reciente a la más antigua: 2026, 2023 y la serie histórica 2022-2015
const SERIE = [
  'senado-2026', 'camara-2026', 'presidente-2026-1', 'presidente-2026-2',
  'alcaldia-2023', 'concejo-2023', 'gobernacion-2023', 'asamblea-2023',
  'senado-2022', 'camara-2022', 'presidente-2022-1', 'presidente-2022-2',
  'gobernacion-2019', 'asamblea-2019', 'alcaldia-2019', 'concejo-2019',
  'presidente-2018-1', 'presidente-2018-2',
  'gobernacion-2015', 'asamblea-2015', 'alcaldia-2015', 'concejo-2015',
];

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
  it('los 125 municipios de Antioquia tienen Alcaldía, Concejo, Gobernación, Asamblea, Senado y Cámara, y cuadran', async () => {
    expect(MUNICIPIOS_CON_RESULTADOS).toHaveLength(125);
    for (const dane of MUNICIPIOS_CON_RESULTADOS) {
      const es = await cargarElecciones(dane);
      expect(es.map((e) => e.id)).toEqual(SERIE);
      for (const e of es) {
        const suma = sumarEleccion(e, Object.keys(e.puestos))!;
        const muni = sumarEleccion(e, 'todos')!;
        expect(suma.votantes).toBe(e.municipio.votantes);
        // Los votos por partido de los puestos suman lo mismo que el municipio (en 2023 el sitio repetía
        // cada partido del Concejo por puesto: se corrigió al construir)
        expect(suma.partidos.reduce((t, p) => t + p.votos, 0)).toBe(muni.partidos.reduce((t, p) => t + p.votos, 0));
      }
    }
    // Carga los JSON de los 125 municipios: ~4,5 s sola; con el servidor de desarrollo abierto pasaba de 5 s
  }, 30_000);
  it('Gobernación 2023 en Rionegro: mismo censo que Alcaldía, gobernador electo con más votos', async () => {
    const { e: go, total: t } = await total('05615', 'gobernacion-2023');
    expect(t.votantes).toBe(82751);
    expect(go.porCandidato).toBe(true);
    expect(t.candidatos[0].votos).toBe(39828);
  });
  it('fase C (79 municipios con 20.000 votantes o menos): ya tienen Presidencia 2026 por puesto', async () => {
    const es = await cargarElecciones('05002'); // Abejorral
    expect(es.map((e) => e.id)).toEqual(SERIE);
    const v2 = es.find((e) => e.id === 'presidente-2026-2')!;
    const t = sumarEleccion(v2, 'todos')!;
    expect(t.votantes).toBe(8879);
    expect(t.candidatos[0].nombre).toMatch(/Espriella/);
    expect(t.candidatos[0].votos).toBe(7216);
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
  it('serie histórica: Medellín 2019 y 2015, Antioquia 2018; sin habilitados ni cédulas', async () => {
    const q = await total('05001', 'alcaldia-2019');
    expect(q.total.candidatos[0].nombre).toMatch(/Quintero/);
    expect(q.total.candidatos[0].votos).toBe(304034);
    expect(q.suma.votantes).toBe(q.total.votantes);
    expect(q.e.tipo).toBe('escrutinio');
    expect(q.total.habilitados).toBe(0);
    const f = await total('05001', 'alcaldia-2015');
    expect(f.total.candidatos[0].nombre).toMatch(/Gutierrez/);
    const d = await total('05001', 'presidente-2018-2');
    expect(d.total.candidatos[0].nombre).toBe('Ivan Duque');
    expect(d.total.partidos[0].nombre).toMatch(/Centro Democr/);
    for (const e of await cargarElecciones('05001')) expect(JSON.stringify(e.candidatos)).not.toMatch(/\d{7,}/);
  });
  it('los puestos históricos llevan ubicación propia (en Antioquia, la gran mayoría ubicados)', async () => {
    let total = 0, ubicados = 0;
    for (const dane of MUNICIPIOS_CON_RESULTADOS) {
      const e19 = (await cargarElecciones(dane)).find((e) => e.id === 'alcaldia-2019')!;
      expect(e19.codigos).toBe('2019');
      total += Object.keys(e19.puestos).length;
      ubicados += Object.keys(e19.puestos).filter((c) => e19.ubicaciones?.[c]).length;
    }
    expect(ubicados / total).toBeGreaterThan(0.9);
  });
});

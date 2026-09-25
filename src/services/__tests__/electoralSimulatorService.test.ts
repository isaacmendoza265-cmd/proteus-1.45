import { describe, it, expect } from 'vitest';
import { computeThreshold, ElectoralSimulatorService, SimulatorParty } from '../electoralSimulatorService';

/**
 * Implementación de referencia (oráculo) del método D'Hondt, escrita aparte
 * del servicio: asigna una curul a la vez al partido con el mayor cociente V/(s+1).
 */
function dhondtOracle(votes: Record<string, number>, seats: number): Record<string, number> {
  const won: Record<string, number> = Object.fromEntries(Object.keys(votes).map((k) => [k, 0]));
  for (let s = 0; s < seats; s++) {
    let best = '';
    let bestQ = -1;
    for (const [id, v] of Object.entries(votes)) {
      const q = v / (won[id] + 1);
      if (q > bestQ) {
        bestQ = q;
        best = id;
      }
    }
    won[best]++;
  }
  return won;
}

const party = (id: string, baseVotes: number): SimulatorParty => ({
  id,
  name: `Partido ${id}`,
  shortName: id,
  color: '#000000',
  baseVotes,
});

// Con censo 100.000, participación 100 % y 0 % en blanco, el servicio calcula
// nulos = 4.500 (4,5 %) y válidos = 95.500. Si los baseVotes suman 95.500 el
// factor de escala es 1 y los votos de cada partido no se alteran.
const BASE = [party('A', 40000), party('B', 32000), party('C', 12000), party('D', 8000), party('E', 3500)];
const run = (parties: SimulatorParty[] = BASE, seats = 7, corp: 'senado' | 'camara' = 'senado') =>
  ElectoralSimulatorService.runSimulation(100000, 100, 0, parties, seats, corp);

const seatsOf = (out: ReturnType<typeof run>) =>
  Object.fromEntries(out.results.map((r) => [r.partyId, r.seatsWon]));

describe('ElectoralSimulatorService.runSimulation', () => {
  it("reparte curules con D'Hondt (ejemplo verificable a mano)", () => {
    const out = run();
    expect(out.totalValidVotes).toBe(95500);
    expect(out.nullVotes).toBe(4500);
    // Cocientes ganadores: 40000A, 32000B, 20000A, 16000B, 13333A, 12000C, 10667B
    expect(seatsOf(out)).toEqual({ A: 3, B: 3, C: 1, D: 0, E: 0 });
    expect(out.cifraRepartidora).toBe(10667);
  });

  it('la suma de curules asignadas es igual al total de curules', () => {
    for (let seats = 1; seats <= 17; seats++) {
      const out = run(BASE, seats);
      const total = out.results.reduce((acc, r) => acc + r.seatsWon, 0);
      expect(total).toBe(seats);
    }
  });

  it('las listas por debajo del umbral no reciben curules', () => {
    // E queda con 2.000 votos, por debajo del umbral (3 % de 95.500 = 2.865)
    const parties = [party('A', 41500), party('B', 32000), party('C', 12000), party('D', 8000), party('E', 2000)];
    const out = run(parties, 17);
    expect(out.thresholdVotes).toBe(2865);
    const e = out.results.find((r) => r.partyId === 'E')!;
    expect(e.aboveThreshold).toBe(false);
    expect(e.seatsWon).toBe(0);
  });

  it('calcula el mínimo exacto de votos para arrebatar la curul marginal', () => {
    const out = run();
    const m = out.marginalSeatInfo;
    expect(m.lastSeatPartyId).toBe('B'); // B gana la 7.ª curul con 32000/3 = 10666,67
    expect(m.runnerUpPartyId).toBe('A'); // A es el siguiente con 40000/4 = 10000
    // A necesita V/4 > 10666,67  =>  V >= 42667  =>  2.667 votos más
    expect(m.votesNeededForRunnerUp).toBe(2667);

    const others = { B: 32000, C: 12000, D: 8000, E: 3500 };
    const withNeeded = dhondtOracle({ A: 40000 + m.votesNeededForRunnerUp, ...others }, 7);
    const withOneLess = dhondtOracle({ A: 40000 + m.votesNeededForRunnerUp - 1, ...others }, 7);
    expect(withNeeded.A).toBe(4);
    expect(withOneLess.A).toBe(3);
  });

  it("coincide con el oráculo D'Hondt en 200 escenarios aleatorios", () => {
    // Generador pseudoaleatorio con semilla fija (resultados reproducibles)
    let seed = 20260924;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };
    const int = (min: number, max: number) => Math.floor(min + rand() * (max - min + 1));

    for (let c = 0; c < 200; c++) {
      const nParties = int(3, 10);
      const parties = Array.from({ length: nParties }, (_, i) => party(`P${i}`, int(1000, 500000)));
      const seats = int(5, 20);
      const out = ElectoralSimulatorService.runSimulation(int(500000, 5000000), int(30, 70), int(1, 6), parties, seats);

      const eligible = Object.fromEntries(
        out.results.filter((r) => r.aboveThreshold).map((r) => [r.partyId, r.totalVotes]),
      );
      const expected = dhondtOracle(eligible, seats);
      for (const r of out.results) {
        expect(r.seatsWon).toBe(r.aboveThreshold ? expected[r.partyId] : 0);
      }
    }
  });
});

describe('Umbral por corporación (Art. 263 C.P.)', () => {
  it('Senado: 3 % de los votos válidos', () => {
    expect(computeThreshold('senado', 1_000_000, 100).votes).toBe(30_000);
  });

  it('Cámara con más de 2 curules: 50 % del cociente electoral', () => {
    // Antioquia, 17 curules: cociente = 1.700.000 / 17 = 100.000  ->  umbral 50.000 (≈ 2,94 %)
    expect(computeThreshold('camara', 1_700_000, 17).votes).toBe(50_000);
  });

  it('Cámara con 2 curules: 30 % del cociente electoral', () => {
    expect(computeThreshold('camara', 200_000, 2).votes).toBe(30_000);
  });

  it('el simulador aplica la regla de la corporación', () => {
    const parties = [party('A', 41500), party('B', 32000), party('C', 12000), party('D', 8000), party('E', 2000)];
    const camara = run(parties, 17, 'camara'); // cociente = 95.500 / 17 = 5.617,6 -> umbral 2.809
    expect(camara.thresholdVotes).toBe(2809);
    expect(camara.thresholdRule).toMatch(/50 %/);
    expect(run(parties, 17, 'senado').thresholdVotes).toBe(2865);
  });
});

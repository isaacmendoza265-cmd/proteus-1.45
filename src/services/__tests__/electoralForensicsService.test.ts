import { describe, it, expect } from 'vitest';
import { ElectoralForensicsService } from '../electoralForensicsService';

// Fórmulas de Benford calculadas aquí, de forma independiente al servicio
const p2 = (k: number) =>
  Array.from({ length: 9 }, (_, j) => Math.log10(1 + 1 / (10 * (j + 1) + k))).reduce((a, b) => a + b, 0);
const p1 = (k: number) => Math.log10(1 + 1 / k);

/** Números de dos cifras cuyo 2.º dígito sigue exactamente la proporción de Benford */
function benfordSecondDigitSample(n: number): number[] {
  const out: number[] = [];
  for (let k = 0; k <= 9; k++) {
    const count = Math.round(n * p2(k));
    for (let i = 0; i < count; i++) out.push(10 + k + 10 * (i % 9)); // 1k, 2k, ... 9k
  }
  return out;
}

describe('ElectoralForensicsService.calculateBenfordDistribution', () => {
  it('usa las probabilidades teóricas correctas del 2.º dígito', () => {
    const res = ElectoralForensicsService.calculateBenfordDistribution([12, 34], 2);
    for (const d of res.distribution) {
      expect(d.theoreticalPercentage).toBeCloseTo(p2(d.digit) * 100, 1);
    }
  });

  it('usa las probabilidades teóricas correctas del 1.er dígito', () => {
    const res = ElectoralForensicsService.calculateBenfordDistribution([1, 2], 1);
    for (const d of res.distribution) {
      expect(d.theoreticalPercentage).toBeCloseTo(p1(d.digit) * 100, 1);
    }
  });

  it('no marca como anómalos datos que siguen la ley de Benford', () => {
    const sample = benfordSecondDigitSample(10000);
    const res = ElectoralForensicsService.calculateBenfordDistribution(sample, 2);
    expect(res.totalNumbersAnalyzed).toBe(sample.length);
    expect(res.chiSquare).toBeLessThan(1);
    expect(res.isAnomalous).toBe(false);
  });

  it('marca como anómalos datos con un 2.º dígito fabricado', () => {
    const res = ElectoralForensicsService.calculateBenfordDistribution(Array(500).fill(15), 2);
    expect(res.isAnomalous).toBe(true);
    expect(res.chiSquare).toBeGreaterThan(res.criticalValue95);
  });

  it('descarta ceros, negativos, NaN y (para el 2.º dígito) números de una cifra', () => {
    const res = ElectoralForensicsService.calculateBenfordDistribution([0, -12, NaN, 7, 25], 2);
    expect(res.totalNumbersAnalyzed).toBe(1);
  });

  it('usa los grados de libertad y valores críticos correctos', () => {
    const r2 = ElectoralForensicsService.calculateBenfordDistribution([12], 2);
    const r1 = ElectoralForensicsService.calculateBenfordDistribution([12], 1);
    expect(r2.degreesOfFreedom).toBe(9);
    expect(r2.criticalValue95).toBeCloseTo(16.919, 1);
    expect(r1.degreesOfFreedom).toBe(8);
    expect(r1.criticalValue95).toBeCloseTo(15.507, 1);
  });
});

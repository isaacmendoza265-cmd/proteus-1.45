import { describe, it, expect } from 'vitest';
import { HolisticAdvertisingIntelligenceService as H } from '../holisticAdvertisingIntelligenceService';

describe('HolisticAdvertisingIntelligenceService.calculateAdvertisingVotesEfficiency', () => {
  it('calcula votos y costo por voto con la tasa base y el multiplicador', () => {
    const r = H.calculateAdvertisingVotesEfficiency(10_000_000, 1.6);
    expect(r.baseVotesExpected).toBe(750); // 10 millones x 75 votos por millón
    expect(r.holisticVotesExpected).toBe(1200); // 750 x 1,6
    expect(r.extraVotesGained).toBe(450);
    expect(r.costPerPersuadedVoteBase).toBe(13333);
    expect(r.costPerPersuadedVoteHolistic).toBe(8333);
    expect(r.savingsPercentage).toBe(38);
  });

  it('reparte el 100 % del presupuesto entre canales', () => {
    const budget = 37_500_000;
    const r = H.calculateAdvertisingVotesEfficiency(budget, 1.75);
    const shares = r.recommendedChannelMix.reduce((a, c) => a + c.sharePercent, 0);
    const spend = r.recommendedChannelMix.reduce((a, c) => a + c.recommendedSpendCOP, 0);
    expect(shares).toBe(100);
    expect(Math.abs(spend - budget)).toBeLessThanOrEqual(r.recommendedChannelMix.length);
  });

  it('no produce NaN ni infinitos con presupuesto cero', () => {
    const r = H.calculateAdvertisingVotesEfficiency(0, 1.75);
    for (const v of [r.costPerPersuadedVoteBase, r.costPerPersuadedVoteHolistic, r.savingsPercentage]) {
      expect(Number.isFinite(v)).toBe(true);
    }
  });
});

import { describe, it, expect, vi, afterEach } from 'vitest';
import { HolisticAdvertisingIntelligenceService } from '../holisticAdvertisingIntelligenceService';
import { AdTargetingOptimizerService } from '../adTargetingOptimizerService';
import { ADVERTISING_ARCHETYPES_DATA } from '../../data/advertising/adTargetingModelData';

afterEach(() => vi.unstubAllGlobals());

describe('publicidad sin cifras inventadas', () => {
  it('Itagüí: participación del escrutinio 2023; indecisos y voto volátil sin información; supuestos rotulados', async () => {
    const intel = await HolisticAdvertisingIntelligenceService.getTerritoryIntelligence('Itagüí', 'X');
    expect(intel.heatmapProfile.undecidedYouthPercentage).toBeNull();
    expect(intel.heatmapProfile.swingVotersPotential).toBeNull();
    expect(intel.heatmapProfile.voterTurnoutExpected).not.toBe(54.8); // valor viejo escrito a mano
    expect(intel.heatmapProfile.voterTurnoutExpected).toBeGreaterThan(30);
    expect(intel.heatmapProfile.fuente).toMatch(/Registraduría/);
    expect(intel.budgetSaturationMetrics?.supuestos).toMatch(/no medidos/);
  }, 60_000);

  it('la generación lleva tarea redactar y no tiene respaldo estático disfrazado de IA', async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({ error: 'cuota' }), { status: 429 }));
    vi.stubGlobal('fetch', fetchMock);
    await expect(AdTargetingOptimizerService.generateCreativesWithAI(ADVERTISING_ARCHETYPES_DATA[0], 'Ana', 'Itagüí')).rejects.toThrow();
    const body = JSON.parse(String((fetchMock.mock.calls[0] as unknown as [string, RequestInit])[1].body));
    expect(String(body.config.systemInstruction)).toMatch(/TAREA: REDACTAR/);
    expect(String(body.contents[0].parts[0].text)).not.toMatch(/42[.,]5|3[.]?850/);
  }, 60_000);
});

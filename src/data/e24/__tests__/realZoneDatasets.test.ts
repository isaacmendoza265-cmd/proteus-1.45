import { describe, it, expect } from 'vitest';
import { getTerritorialMunicipalSummary, getTerritorialComunaAggregations } from '../territorialData';
import { SENADO_2022_MUNICIPAL_SUMMARY, SENADO_2022_COMUNA_AGGREGATIONS } from '../senado2022Data';
import { MUNICIPAL_SUMMARY_PRESIDENCIA_2022_2V } from '../presidenciaData';

describe('Visor E-24 de Medellín con resultados reales por zona', () => {
  it('Alcaldía 2019: gana Quintero y las comunas suman el total de la ciudad', () => {
    const mun = getTerritorialMunicipalSummary('alcaldia', 2019);
    expect(mun.sortedParties[0].shortName).toMatch(/Quintero/);
    expect(mun.sortedParties[0].totalPartyVotes).toBe(304034);
    const comunas = Object.values(getTerritorialComunaAggregations('alcaldia', 2019));
    expect(comunas.reduce((s, c) => s + c.totalVotos, 0)).toBe(mun.totalVotos);
  });
  it('los tres años territoriales tienen datos distintos (ya no se reparten con pesos fijos)', () => {
    const w = (y: number) => getTerritorialComunaAggregations('alcaldia', y)[14].winnerPartyName;
    expect(new Set([w(2015), w(2019), w(2023)]).size).toBeGreaterThan(1);
  });
  it('Senado 2022: votos por candidato reales y lista + candidatos = total', () => {
    const cd = SENADO_2022_MUNICIPAL_SUMMARY.parties['0011'];
    const suma = Object.values(cd.candidateVotes).reduce((a, b) => a + b, 0) + cd.partyOnly;
    expect(suma).toBe(cd.totalPartyVotes);
    expect(Object.keys(SENADO_2022_COMUNA_AGGREGATIONS[14].parties['0011'].candidateVotes).length).toBeGreaterThan(3);
  });
  it('Presidencia 2022, 2.ª vuelta: Rodolfo Hernández gana Medellín', () => {
    expect(MUNICIPAL_SUMMARY_PRESIDENCIA_2022_2V.sortedParties[0].shortName).toMatch(/Rodolfo/);
  });
});

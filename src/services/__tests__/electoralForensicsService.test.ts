import { describe, it, expect } from 'vitest';
import { ElectoralForensicsService } from '../electoralForensicsService';
import { POLLING_STATIONS_MASTER_DATA } from '../../data/electoralAudit/electoralAuditMasterData';

describe('ElectoralForensicsService.generateReclamationDraft', () => {
  const station = POLLING_STATIONS_MASTER_DATA.find((s) => s.tables.some((t) => t.discrepancy !== 0))!;
  const table = station.tables.find((t) => t.discrepancy !== 0)!;
  const draft = ElectoralForensicsService.generateReclamationDraft(table, station, 'Candidato de prueba');

  it('cita las cifras E-14 y E-24 de la mesa y el descuadre', () => {
    const hechos = draft.descripcionHechos.join(' ');
    expect(hechos).toContain(String(table.votesE14Claveros));
    expect(hechos).toContain(String(table.votesE24Comision));
    expect(hechos).toContain(String(Math.abs(table.discrepancy)));
    expect(draft.tableNumber).toBe(table.tableNumber);
    expect(draft.municipality).toBe(station.municipality);
  });

  it('no menciona la Ley de Benford (eliminada por decisión del candidato)', () => {
    expect(JSON.stringify(draft)).not.toMatch(/benford/i);
  });
});

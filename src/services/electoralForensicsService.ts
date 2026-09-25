/**
 * SERVICIO DE AUDITORÍA ELECTORAL: descuadres E-14 vs E-24 y borradores de reclamación (PA-002)
 * Proyecto Proteus - Unidad de Automejora
 *
 * Decisión de Isaac (25-sep-2026): se eliminó la prueba de la Ley de Benford. No se reintroduce.
 */

import { 
  PollingStationRecord, 
  PollingTableRecord, 
  ElectoralReclamationDraft 
} from '../data/schemas/electoralMicrodata';

export class ElectoralForensicsService {

  /**
   * Genera el borrador formal de reclamación legal para la Comisión Escrutadora (Art. 192 Código Electoral)
   */
  static generateReclamationDraft(
    table: PollingTableRecord,
    station: PollingStationRecord,
    candidateName: string = 'Isaac Mendoza'
  ): ElectoralReclamationDraft {
    const tableNum = table.tableNumber;
    const diff = table.discrepancy;
    const votesE14 = table.votesE14Claveros;
    const votesE24 = table.votesE24Comision;

    const hechos: string[] = [
      `1. En la mesa Nº ${tableNum} del puesto de votación "${station.stationName}" (${station.municipality}, ${station.zone}), según el formulario oficial E-14 (ejemplar de Claveros), se consignó un total de ${votesE14} votos para las distintas listas y opciones.`,
      `2. Al efectuarse la consolidación e incorporación en el acta E-24 de la respectiva comisión escrutadora, se registraron únicamente ${votesE24} votos, presentándose una discrepancia numérica lesiva de ${Math.abs(diff)} votos en detrimento de la verdad electoral.`,
      `3. Dicha inconsistencia afecta directamente el caudal de votos de la lista que respalda la candidatura de ${candidateName}, distorsionando la cifra repartidora y la curul en disputa.`
    ];

    if (table.reclamationLegalBasis) {
      hechos.push(`4. Hallazgo específico: ${table.reclamationLegalBasis}.`);
    }

    const pretensiones = `SOLICITO a los señores Miembros de la Comisión Escrutadora: PRIMERO: Disponer la apertura inmediata del sobre cerrado de Claveros correspondiente a la mesa Nº ${tableNum} del puesto "${station.stationName}". SEGUNDO: Efectuar el reconteo físico voto a voto (escrutinio de mesa) y corregir en el acta E-24 la cifra original de ${votesE14} sufragios legítimos. TERCERO: Expedir copia auténtica del acta modificatoria.`;

    const fundamentoJuridico = `Fundamento la presente solicitud en los artículos 192 (Causales 1, 7 y 11) y concordantes del Código Electoral Colombiano (Decreto 2241 de 1986) y la Circular Conjunta CNE-Registraduría sobre garantías de escrutinio.`;

    const pruebasAportadas = [
      `Copia física/digital del Formulario E-14 ejemplar Claveros suscrito por los jurados de la mesa Nº ${tableNum}.`,
      `Copia del formulario E-24 parcial emitido por la Comisión Escrutadora donde se evidencia el error numérico.`,
      `Dictamen del Informe Forense Digital del aplicativo Proteus con registro de discrepancia y score de anomalía.`
    ];

    return {
      id: `REC-${station.id}-M${tableNum}-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      candidateName,
      municipality: station.municipality,
      stationName: station.stationName,
      tableNumber: tableNum,
      commissionName: `Comisión Escrutadora Auxiliar / Municipal de ${station.municipality}`,
      causalCodigoElectoral: 'Artículo 192, Causales 1 y 7 del Código Electoral',
      descripcionHechos: hechos,
      cuantificacionPerdida: Math.abs(diff),
      pretensiones,
      fundamentoJuridico,
      pruebasAportadas
    };
  }
}

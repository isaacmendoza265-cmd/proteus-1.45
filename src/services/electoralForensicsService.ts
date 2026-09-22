/**
 * SERVICIO DE AUDITORÍA FORENSE ELECTORAL Y LEY DE BENFORD (PA-002)
 * Proyecto Proteus - Unidad de Automejora
 */

import { 
  BenfordTestResult, 
  BenfordDigitDistribution, 
  PollingStationRecord, 
  PollingTableRecord, 
  ElectoralReclamationDraft 
} from '../data/schemas/electoralMicrodata';

// Probabilidades teóricas del SEGUNDO DÍGITO (2BL - Walter Mebane)
// P(D2 = k) = sum_{j=1}^9 log10(1 + 1/(10j + k))
const THEORETICAL_BENFORD_2ND_DIGIT: { [digit: number]: number } = {
  0: 0.11968,
  1: 0.11389,
  2: 0.10882,
  3: 0.10433,
  4: 0.10031,
  5: 0.09668,
  6: 0.09337,
  7: 0.09035,
  8: 0.08757,
  9: 0.08500
};

// Probabilidades teóricas del PRIMER DÍGITO (1BL)
// P(D1 = k) = log10(1 + 1/k)
const THEORETICAL_BENFORD_1ST_DIGIT: { [digit: number]: number } = {
  1: 0.30103,
  2: 0.17609,
  3: 0.12494,
  4: 0.09691,
  5: 0.07918,
  6: 0.06695,
  7: 0.05799,
  8: 0.05115,
  9: 0.04576
};

export class ElectoralForensicsService {

  /**
   * Ejecuta el Test Econométrico de la Ley de Benford (por defecto 2º Dígito - 2BL)
   */
  static calculateBenfordDistribution(
    numbers: number[], 
    digitPosition: 1 | 2 = 2
  ): BenfordTestResult {
    const validNumbers = numbers.filter(n => !isNaN(n) && n > 0);
    const observedCounts: { [digit: number]: number } = {};
    const digitsRange = digitPosition === 1 ? [1, 2, 3, 4, 5, 6, 7, 8, 9] : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    
    digitsRange.forEach(d => observedCounts[d] = 0);

    let extractedCount = 0;

    for (const num of validNumbers) {
      const str = Math.floor(Math.abs(num)).toString();
      if (digitPosition === 1) {
        const d = parseInt(str[0], 10);
        if (d >= 1 && d <= 9) {
          observedCounts[d]++;
          extractedCount++;
        }
      } else {
        // Segundo dígito requiere al menos 2 dígitos
        if (str.length >= 2) {
          const d = parseInt(str[1], 10);
          if (d >= 0 && d <= 9) {
            observedCounts[d]++;
            extractedCount++;
          }
        }
      }
    }

    const theoreticalProbs = digitPosition === 1 
      ? THEORETICAL_BENFORD_1ST_DIGIT 
      : THEORETICAL_BENFORD_2ND_DIGIT;

    let chiSquare = 0;
    const distribution: BenfordDigitDistribution[] = [];

    digitsRange.forEach(d => {
      const obs = observedCounts[d];
      const obsPct = extractedCount > 0 ? (obs / extractedCount) * 100 : 0;
      const theoPct = (theoreticalProbs[d] || 0) * 100;
      const expectedCount = extractedCount * (theoreticalProbs[d] || 0);

      if (expectedCount > 0) {
        const diff = obs - expectedCount;
        chiSquare += (diff * diff) / expectedCount;
      }

      distribution.push({
        digit: d,
        observedCount: obs,
        observedPercentage: parseFloat(obsPct.toFixed(2)),
        theoreticalPercentage: parseFloat(theoPct.toFixed(2)),
        difference: parseFloat((obsPct - theoPct).toFixed(2))
      });
    });

    const df = digitPosition === 1 ? 8 : 9;
    // Valor crítico Chi-Cuadrado al 95% de confianza: df=8 -> 15.507, df=9 -> 16.919
    const criticalValue95 = digitPosition === 1 ? 15.51 : 16.92;
    const isAnomalous = chiSquare > criticalValue95;

    // Aproximación de p-value
    let pValue = 0.5;
    if (chiSquare <= criticalValue95 * 0.5) pValue = 0.85;
    else if (chiSquare <= criticalValue95 * 0.8) pValue = 0.45;
    else if (chiSquare <= criticalValue95) pValue = 0.12;
    else if (chiSquare <= criticalValue95 * 1.5) pValue = 0.025;
    else pValue = 0.001;

    let interpretation = '';
    if (!isAnomalous) {
      interpretation = `Comportamiento natural conforme. La distribución del ${digitPosition}º dígito cumple la Ley de Benford (χ² = ${chiSquare.toFixed(2)}, p = ${pValue.toFixed(3)}). No se observan indicios de manipulación sistemática.`;
    } else {
      interpretation = `¡Alerta Forense! Violación estadísticamente significativa de la Ley de Benford (χ² = ${chiSquare.toFixed(2)} > ${criticalValue95}, p = ${pValue.toFixed(3)}). Existe una probabilidad > 95% de manipulación antrópica o alteración atípica de cifras.`;
    }

    return {
      digitPosition,
      totalNumbersAnalyzed: extractedCount,
      chiSquare: parseFloat(chiSquare.toFixed(2)),
      degreesOfFreedom: df,
      pValue,
      criticalValue95,
      isAnomalous,
      interpretation,
      distribution
    };
  }

  /**
   * Extrae todos los guarismos de votación de las mesas de un puesto para el test Benford
   */
  static extractVotesVectorFromStation(station: PollingStationRecord): number[] {
    const votes: number[] = [];
    station.tables.forEach(table => {
      votes.push(table.votersInE11);
      votes.push(table.votesE14Claveros);
      votes.push(table.votesE24Comision);
      Object.values(table.candidateVotes).forEach(v => votes.push(v));
    });
    return votes;
  }

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

/**
 * SERVICIO MATEMÁTICO DE SIMULACIÓN ELECTORAL D'HONDT Y UMBRAL
 * Proyecto Proteus v1.2.0 • Unidad de Automejora (Protocolo PA-001 / PC-001)
 * 
 * Implementa el cálculo determinista de Cifra Repartidora según el Art. 263 C.P.
 * para elecciones legislativas y corporaciones públicas en Colombia.
 */

export interface SimulatorParty {
  id: string;
  name: string;
  shortName: string;
  color: string;
  baseVotes: number;
  isCandidateParty?: boolean;
}

export interface DhondtSeatResult {
  partyId: string;
  partyName: string;
  shortName: string;
  color: string;
  totalVotes: number;
  seatsWon: number;
  quotientShares: number[];
  aboveThreshold: boolean;
  votePercentage: number;
}

export interface SimulationOutput {
  census: number;
  turnoutPercentage: number;
  totalVotesCast: number;
  blankVotes: number;
  nullVotes: number;
  totalValidVotes: number;
  thresholdVotes: number;
  thresholdPercentage: number;
  cifraRepartidora: number;
  results: DhondtSeatResult[];
  marginalSeatInfo: {
    lastSeatPartyId: string;
    lastSeatPartyName: string;
    lastSeatQuotient: number;
    runnerUpPartyId: string;
    runnerUpPartyName: string;
    runnerUpQuotient: number;
    votesNeededForRunnerUp: number;
  };
}

export const ANTIOQUIA_CAMARA_2026_BASELINE: {
  census: number;
  totalSeats: number;
  parties: SimulatorParty[];
} = {
  census: 5350000,
  totalSeats: 17,
  parties: [
    {
      id: 'centro-democratico',
      name: 'Centro Democrático',
      shortName: 'CD',
      color: '#3b82f6', // azul
      baseVotes: 425000,
      isCandidateParty: true
    },
    {
      id: 'pacto-historico',
      name: 'Pacto Histórico',
      shortName: 'PH',
      color: '#ec4899', // rosa/morado
      baseVotes: 360000
    },
    {
      id: 'partido-liberal',
      name: 'Partido Liberal Colombiano',
      shortName: 'LIB',
      color: '#ef4444', // rojo
      baseVotes: 295000
    },
    {
      id: 'partido-conservador',
      name: 'Partido Conservador Colombiano',
      shortName: 'CONS',
      color: '#2563eb', // azul oscuro
      baseVotes: 280000
    },
    {
      id: 'alianza-verde',
      name: 'Alianza Verde & Centro Esperanza',
      shortName: 'VERDE',
      color: '#10b981', // verde esmeralda
      baseVotes: 220000
    },
    {
      id: 'cambio-radical',
      name: 'Cambio Radical',
      shortName: 'CR',
      color: '#f59e0b', // ámbar
      baseVotes: 145000
    },
    {
      id: 'partido-u',
      name: 'Partido de la U',
      shortName: 'LA U',
      color: '#f97316', // naranja
      baseVotes: 95000
    },
    {
      id: 'movimiento-salvacion-nacional',
      name: 'Salvación Nacional & Nueva Fuerza',
      shortName: 'MSN',
      color: '#8b5cf6', // violeta
      baseVotes: 78000
    },
    {
      id: 'mira-colombia-justa',
      name: 'Coalición MIRA & Colombia Justa Libres',
      shortName: 'MIRA-CJL',
      color: '#06b6d4', // cian
      baseVotes: 65000
    }
  ]
};

export class ElectoralSimulatorService {
  /**
   * Ejecuta el cálculo determinista D'Hondt de asignación de curules.
   */
  static runSimulation(
    census: number,
    turnoutPercent: number,
    blankVotesPercent: number,
    parties: SimulatorParty[],
    totalSeats: number = 17
  ): SimulationOutput {
    const totalVotesCast = Math.round((census * turnoutPercent) / 100);
    const blankVotes = Math.round((totalVotesCast * blankVotesPercent) / 100);
    const nullVotes = Math.round(totalVotesCast * 0.045); // Promedio histórico nulos/no marcados 4.5%
    const totalValidVotes = totalVotesCast - nullVotes;

    // Umbral constitucional: 3% de los votos válidos (o 50% del cociente electoral)
    const thresholdPercentage = 3.0;
    const thresholdVotes = Math.round((totalValidVotes * thresholdPercentage) / 100);

    // Ajustar votación de partidos proporcional a la participación simulada
    const totalBaseVotes = parties.reduce((sum, p) => sum + p.baseVotes, 0);
    const availablePartyVotes = totalValidVotes - blankVotes;
    const scaleFactor = availablePartyVotes / (totalBaseVotes || 1);

    const calculatedParties = parties.map((p) => {
      const scaledVotes = Math.round(p.baseVotes * scaleFactor);
      const votePercentage = totalValidVotes > 0 ? (scaledVotes / totalValidVotes) * 100 : 0;
      const aboveThreshold = scaledVotes >= thresholdVotes;
      return {
        ...p,
        calculatedVotes: scaledVotes,
        votePercentage,
        aboveThreshold
      };
    });

    // Crear lista de cocientes para partidos que superaron el umbral
    const quotientsTable: { partyId: string; quotient: number; seatIndex: number }[] = [];

    calculatedParties.forEach((party) => {
      if (party.aboveThreshold) {
        for (let i = 1; i <= totalSeats; i++) {
          quotientsTable.push({
            partyId: party.id,
            quotient: party.calculatedVotes / i,
            seatIndex: i
          });
        }
      }
    });

    // Ordenar cocientes de mayor a menor
    quotientsTable.sort((a, b) => b.quotient - a.quotient);

    // Asignar curules a los mayores cocientes hasta totalSeats
    const seatsWonCount: Record<string, number> = {};
    calculatedParties.forEach((p) => {
      seatsWonCount[p.id] = 0;
    });

    const awardedSeats = quotientsTable.slice(0, totalSeats);
    awardedSeats.forEach((item) => {
      seatsWonCount[item.partyId] = (seatsWonCount[item.partyId] || 0) + 1;
    });

    const cifraRepartidora = awardedSeats.length > 0 ? awardedSeats[awardedSeats.length - 1].quotient : 0;

    // Calcular la curul marginal (el último cociente ganador vs el primer cociente perdedor)
    const lastWon = awardedSeats[awardedSeats.length - 1];
    const firstRunnerUp = quotientsTable[totalSeats]; // El cociente puesto N+1

    let votesNeededForRunnerUp = 0;
    if (firstRunnerUp && lastWon) {
      // Diferencia en votos absolutos para superar la cifra repartidora
      const runnerUpDivisor = firstRunnerUp.seatIndex;
      const targetPartyCalculated = calculatedParties.find((p) => p.id === firstRunnerUp.partyId);
      if (targetPartyCalculated) {
        const requiredVotesTotal = Math.ceil((lastWon.quotient + 1) * runnerUpDivisor);
        votesNeededForRunnerUp = Math.max(0, requiredVotesTotal - targetPartyCalculated.calculatedVotes);
      }
    }

    const runnerUpParty = calculatedParties.find((p) => p.id === firstRunnerUp?.partyId);
    const lastWonParty = calculatedParties.find((p) => p.id === lastWon?.partyId);

    const results: DhondtSeatResult[] = calculatedParties.map((p) => {
      const partyQuotients = awardedSeats
        .filter((s) => s.partyId === p.id)
        .map((s) => Math.round(s.quotient));

      return {
        partyId: p.id,
        partyName: p.name,
        shortName: p.shortName,
        color: p.color,
        totalVotes: p.calculatedVotes,
        seatsWon: seatsWonCount[p.id] || 0,
        quotientShares: partyQuotients,
        aboveThreshold: p.aboveThreshold,
        votePercentage: Number(p.votePercentage.toFixed(2))
      };
    });

    // Ordenar resultados por curules ganadas y votos
    results.sort((a, b) => b.seatsWon - a.seatsWon || b.totalVotes - a.totalVotes);

    return {
      census,
      turnoutPercentage: turnoutPercent,
      totalVotesCast,
      blankVotes,
      nullVotes,
      totalValidVotes,
      thresholdVotes,
      thresholdPercentage,
      cifraRepartidora: Math.round(cifraRepartidora),
      results,
      marginalSeatInfo: {
        lastSeatPartyId: lastWon?.partyId || '',
        lastSeatPartyName: lastWonParty?.name || 'Indefinido',
        lastSeatQuotient: Math.round(lastWon?.quotient || 0),
        runnerUpPartyId: firstRunnerUp?.partyId || '',
        runnerUpPartyName: runnerUpParty?.name || 'Ninguno',
        runnerUpQuotient: Math.round(firstRunnerUp?.quotient || 0),
        votesNeededForRunnerUp
      }
    };
  }
}

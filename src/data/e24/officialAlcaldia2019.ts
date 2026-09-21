import { Party, Candidate, ZoneVotes, ZoneId, ComunaPartySummary, ComunaVotesAggregation, MunicipalSummary } from './types';
import { COMUNAS_INFO } from './comunasData';

// Candidates for Alcaldía Medellín 2019 Official E-24 ALC
export const ALCALDIA_2019_CANDIDATES_LIST = [
  { id: '001', number: '001', name: 'JAIRO HERRAN VARGAS', shortName: 'Jairo Herrán', partyName: 'COLOMBIA HUMANA - UP', color: '#e11d48' },
  { id: '002', number: '002', name: 'ALFREDO RAMOS', shortName: 'Alfredo Ramos', partyName: 'CENTRO DEMOCRÁTICO', color: '#2563eb' },
  { id: '003', number: '003', name: 'JUAN CARLOS VELEZ', shortName: 'Juan Carlos Vélez', partyName: 'MEDELLÍN AVANZA', color: '#0ea5e9' },
  { id: '004', number: '004', name: 'LUIS GUILLERMO HOYOS MENESES', shortName: 'Luis Guillermo Hoyos', partyName: 'PARTIDO POLO DEMOCRÁTICO', color: '#ca8a04' },
  { id: '005', number: '005', name: 'DANIEL QUINTERO CALLE', shortName: 'Daniel Quintero', partyName: 'INDEPENDIENTES', color: '#10b981' },
  { id: '006', number: '006', name: 'SANTIAGO GOMEZ', shortName: 'Santiago Gómez', partyName: 'SEGUIMOS CONTANDO CON VOS', color: '#f59e0b' },
  { id: '007', number: '007', name: 'GEMMA MARIA MEJIA IZQUIERDO', shortName: 'Gemma Mejía', partyName: 'COLOMBIA JUSTA LIBRES', color: '#7c3aed' },
  { id: '008', number: '008', name: 'LUIS FERNANDO MUÑOZ RAMIREZ', shortName: 'Luis Fernando Muñoz', partyName: 'PARTIDO ADA', color: '#ec4899' },
  { id: '009', number: '009', name: 'JORGE ORLANDO GUTIERREZ SERNA', shortName: 'Jorge O. Gutiérrez', partyName: 'PARTIDO PRE', color: '#84cc16' },
  { id: '010', number: '010', name: 'BEATRIZ RAVE', shortName: 'Beatriz Rave', partyName: 'PARTIDO ALIANZA VERDE', color: '#16a34a' },
  { id: '011', number: '011', name: 'VICTOR JAVIER CORREA VELEZ', shortName: 'Víctor Correa', partyName: 'POLO DEMOCRÁTICO ALTERNATIVO', color: '#d97706' },
  { id: '012', number: '012', name: 'JUAN DAVID VALDERRAMA LOPEZ', shortName: 'Juan David Valderrama', partyName: 'TODOS JUNTOS', color: '#0284c7' }
];

export const ALCALDIA_2019_PARTIES: Party[] = ALCALDIA_2019_CANDIDATES_LIST.map(c => ({
  id: c.id,
  code: c.number,
  name: `${c.name} (${c.partyName})`,
  shortName: c.shortName,
  preferential: false,
  isPreferential: false,
  color: c.color,
  logoText: c.shortName.substring(0, 3).toUpperCase()
}));

// Raw official data from E-24 ALC (Alcaldía Medellín 2019)
// All zones: 01 to 32, 90, 98, 99
const OFFICIAL_RAW_ZONES_ALCALDIA_2019: Record<ZoneId, {
  candidates: Record<string, number>;
  votosBlanco: number;
  votosNulos: number;
  votosNoMarcados: number;
  totalVotos: number;
}> = {
  // Page 1
  '01': {
    candidates: {
      '001': 87, '002': 3517, '003': 155, '004': 37, '005': 6659, '006': 1902,
      '007': 242, '008': 29, '009': 59, '010': 323, '011': 205, '012': 271
    },
    votosBlanco: 2464, votosNulos: 813, votosNoMarcados: 1486, totalVotos: 18239
  },
  '02': {
    candidates: {
      '001': 55, '002': 3031, '003': 148, '004': 31, '005': 6408, '006': 1702,
      '007': 220, '008': 34, '009': 24, '010': 328, '011': 207, '012': 267
    },
    votosBlanco: 2025, votosNulos: 692, votosNoMarcados: 1037, totalVotos: 16245
  },
  '03': {
    candidates: {
      '001': 81, '002': 2846, '003': 174, '004': 41, '005': 6569, '006': 1760,
      '007': 272, '008': 34, '009': 49, '010': 332, '011': 197, '012': 304
    },
    votosBlanco: 2035, votosNulos: 717, votosNoMarcados: 1145, totalVotos: 16576
  },
  '04': {
    candidates: {
      '001': 47, '002': 2338, '003': 81, '004': 19, '005': 4554, '006': 1699,
      '007': 144, '008': 20, '009': 39, '010': 238, '011': 141, '012': 194
    },
    votosBlanco: 1414, votosNulos: 469, votosNoMarcados: 668, totalVotos: 12073
  },
  '05': {
    candidates: {
      '001': 126, '002': 5212, '003': 347, '004': 58, '005': 9565, '006': 3385,
      '007': 355, '008': 41, '009': 59, '010': 441, '011': 319, '012': 362
    },
    votosBlanco: 3523, votosNulos: 1142, votosNoMarcados: 1513, totalVotos: 26476
  },
  '06': {
    candidates: {
      '001': 51, '002': 3082, '003': 163, '004': 25, '005': 6321, '006': 2139,
      '007': 233, '008': 11, '009': 35, '010': 246, '011': 219, '012': 323
    },
    votosBlanco: 1854, votosNulos: 491, votosNoMarcados: 514, totalVotos: 15709
  },
  '07': {
    candidates: {
      '001': 73, '002': 5629, '003': 240, '004': 37, '005': 11252, '006': 2944,
      '007': 351, '008': 64, '009': 43, '010': 391, '011': 278, '012': 552
    },
    votosBlanco: 2719, votosNulos: 754, votosNoMarcados: 780, totalVotos: 26105
  },
  '08': {
    candidates: {
      '001': 119, '002': 5133, '003': 201, '004': 55, '005': 10751, '006': 2421,
      '007': 416, '008': 39, '009': 49, '010': 457, '011': 384, '012': 467
    },
    votosBlanco: 2816, votosNulos: 769, votosNoMarcados: 887, totalVotos: 25028
  },
  '09': {
    candidates: {
      '001': 140, '002': 5353, '003': 200, '004': 41, '005': 11677, '006': 2777,
      '007': 235, '008': 32, '009': 37, '010': 372, '011': 338, '012': 487
    },
    votosBlanco: 2578, votosNulos: 618, votosNoMarcados: 589, totalVotos: 25371
  },
  '10': {
    candidates: {
      '001': 83, '002': 4754, '003': 164, '004': 30, '005': 10089, '006': 2709,
      '007': 313, '008': 25, '009': 46, '010': 373, '011': 265, '012': 427
    },
    votosBlanco: 2365, votosNulos: 648, votosNoMarcados: 699, totalVotos: 23107
  },
  '11': {
    candidates: {
      '001': 69, '002': 4330, '003': 124, '004': 49, '005': 8990, '006': 2446,
      '007': 465, '008': 37, '009': 48, '010': 385, '011': 227, '012': 422
    },
    votosBlanco: 2509, votosNulos: 737, votosNoMarcados: 1123, totalVotos: 22002
  },
  '12': {
    candidates: {
      '001': 83, '002': 5695, '003': 202, '004': 42, '005': 11996, '006': 3815,
      '007': 381, '008': 36, '009': 53, '010': 404, '011': 306, '012': 558
    },
    votosBlanco: 3051, votosNulos: 1010, votosNoMarcados: 1161, totalVotos: 28806
  },
  '13': {
    candidates: {
      '001': 95, '002': 6375, '003': 205, '004': 47, '005': 13179, '006': 3820,
      '007': 442, '008': 33, '009': 31, '010': 468, '011': 388, '012': 557
    },
    votosBlanco: 3131, votosNulos: 814, votosNoMarcados: 827, totalVotos: 30388
  },
  '14': {
    candidates: {
      '001': 72, '002': 4582, '003': 127, '004': 37, '005': 9432, '006': 2548,
      '007': 294, '008': 19, '009': 29, '010': 358, '011': 277, '012': 389
    },
    votosBlanco: 2355, votosNulos: 540, votosNoMarcados: 559, totalVotos: 21815
  },
  '15': {
    candidates: {
      '001': 79, '002': 5588, '003': 195, '004': 45, '005': 9284, '006': 2667,
      '007': 354, '008': 30, '009': 41, '010': 423, '011': 275, '012': 569
    },
    votosBlanco: 2589, votosNulos: 750, votosNoMarcados: 936, totalVotos: 23809
  },
  '16': {
    candidates: {
      '001': 83, '002': 2707, '003': 153, '004': 22, '005': 4077, '006': 1457,
      '007': 171, '008': 31, '009': 43, '010': 245, '011': 200, '012': 212
    },
    votosBlanco: 1677, votosNulos: 817, votosNoMarcados: 1020, totalVotos: 12716
  },
  '17': {
    candidates: {
      '001': 78, '002': 6796, '003': 215, '004': 31, '005': 11333, '006': 3160,
      '007': 235, '008': 44, '009': 42, '010': 434, '011': 426, '012': 693
    },
    votosBlanco: 2981, votosNulos: 697, votosNoMarcados: 747, totalVotos: 27892
  },

  // Page 2
  '18': {
    candidates: {
      '001': 68, '002': 5998, '003': 180, '004': 23, '005': 8621, '006': 2415,
      '007': 204, '008': 36, '009': 36, '010': 304, '011': 295, '012': 497
    },
    votosBlanco: 2095, votosNulos: 531, votosNoMarcados: 479, totalVotos: 21788
  },
  '19': {
    candidates: {
      '001': 204, '002': 10207, '003': 326, '004': 38, '005': 12298, '006': 3331,
      '007': 365, '008': 76, '009': 46, '010': 509, '011': 571, '012': 674
    },
    votosBlanco: 2618, votosNulos: 557, votosNoMarcados: 644, totalVotos: 32492
  },
  '20': {
    candidates: {
      '001': 98, '002': 7872, '003': 202, '004': 27, '005': 6432, '006': 2122,
      '007': 178, '008': 22, '009': 25, '010': 354, '011': 231, '012': 623
    },
    votosBlanco: 1605, votosNulos: 309, votosNoMarcados: 366, totalVotos: 20297
  },
  '21': {
    candidates: {
      '001': 86, '002': 9777, '003': 158, '004': 23, '005': 8716, '006': 2577,
      '007': 158, '008': 19, '009': 20, '010': 427, '011': 269, '012': 909
    },
    votosBlanco: 1655, votosNulos: 228, votosNoMarcados: 196, totalVotos: 25222
  },
  '22': {
    candidates: {
      '001': 52, '002': 12164, '003': 202, '004': 19, '005': 7268, '006': 2743,
      '007': 89, '008': 12, '009': 11, '010': 375, '011': 178, '012': 997
    },
    votosBlanco: 1481, votosNulos: 134, votosNoMarcados: 132, totalVotos: 25857
  },
  '23': {
    candidates: {
      '001': 87, '002': 9833, '003': 180, '004': 222, '005': 11225, '006': 3474,
      '007': 233, '008': 29, '009': 27, '010': 464, '011': 336, '012': 940
    },
    votosBlanco: 2288, votosNulos: 380, votosNoMarcados: 325, totalVotos: 30043
  },
  '24': {
    candidates: {
      '001': 38, '002': 9288, '003': 168, '004': 21, '005': 7931, '006': 3081,
      '007': 139, '008': 17, '009': 13, '010': 304, '011': 232, '012': 760
    },
    votosBlanco: 1825, votosNulos: 240, votosNoMarcados: 248, totalVotos: 24181
  },
  '25': {
    candidates: {
      '001': 48, '002': 5035, '003': 151, '004': 35, '005': 6920, '006': 2122,
      '007': 231, '008': 33, '009': 28, '010': 280, '011': 204, '012': 367
    },
    votosBlanco: 2086, votosNulos: 503, votosNoMarcados: 732, totalVotos: 18805
  },
  '26': {
    candidates: {
      '001': 62, '002': 4250, '003': 206, '004': 55, '005': 8065, '006': 2344,
      '007': 240, '008': 33, '009': 33, '010': 330, '011': 268, '012': 352
    },
    votosBlanco: 2611, votosNulos: 809, votosNoMarcados: 1121, totalVotos: 20784
  },
  '27': {
    candidates: {
      '001': 9, '002': 12587, '003': 177, '004': 7, '005': 2973, '006': 1942,
      '007': 30, '008': 8, '009': 1, '010': 322, '011': 85, '012': 1635
    },
    votosBlanco: 742, votosNulos: 46, votosNoMarcados: 89, totalVotos: 20669
  },
  '28': {
    candidates: {
      '001': 25, '002': 14145, '003': 237, '004': 9, '005': 5226, '006': 2917,
      '007': 63, '008': 4, '009': 6, '010': 530, '011': 165, '012': 2157
    },
    votosBlanco: 1164, votosNulos: 108, votosNoMarcados: 87, totalVotos: 26925
  },
  '29': {
    candidates: {
      '001': 101, '002': 7953, '003': 178, '004': 33, '005': 8964, '006': 3529,
      '007': 228, '008': 44, '009': 32, '010': 364, '011': 327, '012': 634
    },
    votosBlanco: 2556, votosNulos: 562, votosNoMarcados: 540, totalVotos: 25897
  },
  '30': {
    candidates: {
      '001': 79, '002': 13420, '003': 225, '004': 34, '005': 10238, '006': 3827,
      '007': 204, '008': 56, '009': 19, '010': 488, '011': 321, '012': 1047
    },
    votosBlanco: 2265, votosNulos: 290, votosNoMarcados: 303, totalVotos: 32844
  },
  '31': {
    candidates: {
      '001': 74, '002': 10492, '003': 233, '004': 37, '005': 11176, '006': 4113,
      '007': 289, '008': 32, '009': 33, '010': 506, '011': 318, '012': 1105
    },
    votosBlanco: 2559, votosNulos: 421, votosNoMarcados: 458, totalVotos: 31839
  },
  '32': {
    candidates: {
      '001': 59, '002': 9194, '003': 182, '004': 36, '005': 10009, '006': 3318,
      '007': 228, '008': 28, '009': 33, '010': 526, '011': 265, '012': 844
    },
    votosBlanco: 2574, votosNulos: 406, votosNoMarcados: 606, totalVotos: 28365
  },
  '90': {
    candidates: {
      '001': 66, '002': 6693, '003': 170, '004': 42, '005': 7671, '006': 2603,
      '007': 254, '008': 22, '009': 28, '010': 419, '011': 268, '012': 912
    },
    votosBlanco: 2063, votosNulos: 542, votosNoMarcados: 367, totalVotos: 22040
  },
  '98': {
    candidates: {
      '001': 2, '002': 59, '003': 0, '004': 0, '005': 64, '006': 12,
      '007': 10, '008': 0, '009': 0, '010': 24, '011': 4, '012': 4
    },
    votosBlanco: 37, votosNulos: 22, votosNoMarcados: 16, totalVotos: 279
  },

  // Page 3
  '99': {
    candidates: {
      '001': 248, '002': 9517, '003': 409, '004': 120, '005': 16193, '006': 5206,
      '007': 660, '008': 100, '009': 120, '010': 1021, '011': 687, '012': 859
    },
    votosBlanco: 6498, votosNulos: 1943, votosNoMarcados: 3018, totalVotos: 46599
  }
};

// Generates complete ZoneVotes, ComunaVotesAggregation and MunicipalSummary
export function buildOfficialAlcaldia2019Dataset() {
  const allParties = ALCALDIA_2019_PARTIES;
  const zoneVotesRecord: Record<ZoneId, ZoneVotes> = {} as any;

  (Object.keys(OFFICIAL_RAW_ZONES_ALCALDIA_2019) as ZoneId[]).forEach(z => {
    const raw = OFFICIAL_RAW_ZONES_ALCALDIA_2019[z];
    const partiesVoteRecord: Record<string, { partyOnly: number; candidateVotes: Record<string, number>; totalPartyVotes: number }> = {};

    let totalPartiesValidos = 0;
    allParties.forEach(p => {
      const totalCandVotes = raw.candidates[p.id] || 0;
      totalPartiesValidos += totalCandVotes;

      partiesVoteRecord[p.id] = {
        partyOnly: totalCandVotes,
        candidateVotes: { [p.id]: totalCandVotes },
        totalPartyVotes: totalCandVotes
      };
    });

    const votosValidos = totalPartiesValidos + raw.votosBlanco;

    zoneVotesRecord[z] = {
      zone: z,
      parties: partiesVoteRecord,
      votosBlanco: raw.votosBlanco,
      votosNulos: raw.votosNulos,
      votosNoMarcados: raw.votosNoMarcados,
      votosValidos,
      totalVotos: raw.totalVotos
    };
  });

  // Aggregate by Comunas (1 to 16)
  const comunaAggregations: Record<number, ComunaVotesAggregation> = {};

  COMUNAS_INFO.forEach(comuna => {
    let cValidos = 0;
    let cBlanco = 0;
    let cNulos = 0;
    let cNoMarc = 0;
    let cTotal = 0;

    const partyTotals: Record<string, { partyOnly: number; candidateVotes: Record<string, number>; totalPartyVotes: number }> = {};
    allParties.forEach(p => {
      partyTotals[p.id] = { partyOnly: 0, candidateVotes: {}, totalPartyVotes: 0 };
    });

    comuna.zones.forEach(z => {
      const zv = zoneVotesRecord[z];
      if (zv) {
        cBlanco += zv.votosBlanco;
        cNulos += zv.votosNulos;
        cNoMarc += zv.votosNoMarcados;
        cTotal += zv.totalVotos;

        allParties.forEach(p => {
          const pz = zv.parties[p.id];
          if (pz) {
            partyTotals[p.id].partyOnly += pz.partyOnly;
            partyTotals[p.id].totalPartyVotes += pz.totalPartyVotes;
            cValidos += pz.totalPartyVotes;
            partyTotals[p.id].candidateVotes[p.id] = (partyTotals[p.id].candidateVotes[p.id] || 0) + pz.totalPartyVotes;
          }
        });
      }
    });

    const totalValidosConBlanco = cValidos + cBlanco;

    const partiesSummaries: Record<string, ComunaPartySummary> = {};
    const sortedParties: ComunaPartySummary[] = [];

    allParties.forEach(p => {
      const pt = partyTotals[p.id];
      const pVotes = pt ? pt.totalPartyVotes : 0;
      const pct = totalValidosConBlanco > 0 ? (pVotes / totalValidosConBlanco) * 100 : 0;

      const summary: ComunaPartySummary = {
        partyId: p.id,
        partyName: p.name,
        shortName: p.shortName,
        color: p.color,
        partyOnly: pt ? pt.partyOnly : 0,
        candidateVotes: pt ? pt.candidateVotes : {},
        totalPartyVotes: pVotes,
        percentageValidos: pct,
        municipalPercentage: 0
      };

      partiesSummaries[p.id] = summary;
      sortedParties.push(summary);
    });

    sortedParties.sort((a, b) => b.totalPartyVotes - a.totalPartyVotes);

    const winner = sortedParties[0] || { partyId: '', partyName: 'N/A', shortName: 'N/A', totalPartyVotes: 0, percentageValidos: 0 };
    const runnerUp = sortedParties[1] || { partyId: '', partyName: 'N/A', shortName: 'N/A', totalPartyVotes: 0, percentageValidos: 0 };

    comunaAggregations[comuna.id] = {
      comunaId: comuna.id,
      comunaName: comuna.comunaName,
      officialName: comuna.officialName,
      zones: comuna.zones,
      parties: partiesSummaries,
      sortedParties,
      votosBlanco: cBlanco,
      votosNulos: cNulos,
      votosNoMarcados: cNoMarc,
      votosValidos: totalValidosConBlanco,
      totalVotos: cTotal,
      winnerPartyId: winner.partyId,
      winnerPartyName: winner.shortName,
      winnerPartyVotes: winner.totalPartyVotes,
      winnerPartyPercentage: winner.percentageValidos,
      runnerUpPartyId: runnerUp.partyId,
      runnerUpPartyName: runnerUp.shortName,
      runnerUpPartyVotes: runnerUp.totalPartyVotes,
      runnerUpPartyPercentage: runnerUp.percentageValidos
    };
  });

  // Municipal summary
  const municipalParties: Record<string, any> = {};
  const municipalSorted: any[] = [];
  let munTotalValidos = 0;

  allParties.forEach(p => {
    const totalVotesInCity = Object.values(zoneVotesRecord).reduce((sum, zv) => sum + (zv.parties[p.id]?.totalPartyVotes || 0), 0);
    munTotalValidos += totalVotesInCity;

    const entry = {
      partyId: p.id,
      partyName: p.name,
      shortName: p.shortName,
      color: p.color,
      partyOnly: totalVotesInCity,
      candidateVotes: { [p.id]: totalVotesInCity },
      totalPartyVotes: totalVotesInCity,
      percentageValidos: 0
    };

    municipalParties[p.id] = entry;
    municipalSorted.push(entry);
  });

  const cityBlanco = Object.values(zoneVotesRecord).reduce((sum, zv) => sum + zv.votosBlanco, 0);
  const cityNulos = Object.values(zoneVotesRecord).reduce((sum, zv) => sum + zv.votosNulos, 0);
  const cityNoMarc = Object.values(zoneVotesRecord).reduce((sum, zv) => sum + zv.votosNoMarcados, 0);
  const totalValidosCityConBlanco = munTotalValidos + cityBlanco;

  municipalSorted.forEach(p => {
    p.percentageValidos = totalValidosCityConBlanco > 0 ? (p.totalPartyVotes / totalValidosCityConBlanco) * 100 : 0;
    municipalParties[p.partyId].percentageValidos = p.percentageValidos;
  });

  municipalSorted.sort((a, b) => b.totalPartyVotes - a.totalPartyVotes);

  // Update municipalPercentage in each comuna
  Object.values(comunaAggregations).forEach(c => {
    c.sortedParties.forEach(sp => {
      sp.municipalPercentage = municipalParties[sp.partyId]?.percentageValidos || 0;
      if (c.parties[sp.partyId]) {
        c.parties[sp.partyId].municipalPercentage = sp.municipalPercentage;
      }
    });
  });

  const municipalSummary: MunicipalSummary = {
    totalMesas: 4624,
    mesasEscrutadas: 4624,
    porcentajeEscrutado: 100,
    parties: municipalParties,
    sortedParties: municipalSorted,
    totalPorPartidos: munTotalValidos,
    votosBlanco: cityBlanco,
    votosNulos: cityNulos,
    votosNoMarcados: cityNoMarc,
    votosValidos: totalValidosCityConBlanco,
    totalVotos: totalValidosCityConBlanco + cityNulos + cityNoMarc
  };

  const candidatesRecord: Record<string, Candidate[]> = {};
  ALCALDIA_2019_CANDIDATES_LIST.forEach(c => {
    candidatesRecord[c.id] = [{
      id: c.id,
      number: c.number,
      name: c.name,
      partyId: c.id,
      partyName: c.partyName,
      color: c.color
    }];
  });

  return {
    parties: allParties,
    candidates: candidatesRecord,
    comunaAggregations,
    zoneVotes: zoneVotesRecord,
    municipalSummary
  };
}

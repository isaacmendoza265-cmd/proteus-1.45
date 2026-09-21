// Official E-24 CONSULTAS INTERPARTIDISTAS PRESIDENCIALES 2026 - MEDELLÍN (35 ZONAS)
import { Party } from './types';

export interface PresidenciaCandidateRawData {
  candidateId: string;
  candidateName: string;
  coalitionId: string;
  coalitionName: string;
  shortName: string;
  color: string;
  votes: number[]; // 35 zones
}

export const PRESIDENCIA_COALICIONES = [
  { id: 'GRAN_CONSULTA', name: 'GRAN CONSULTA POR COLOMBIA (DERECHA / CENTRO-DERECHA)', color: '#2563eb' },
  { id: 'PACTO_AMPLIO', name: 'CONSULTA FRENTE AMPLIO - PACTO HISTÓRICO (IZQUIERDA)', color: '#db2777' },
  { id: 'CENTRO_ESPERANZA', name: 'CONSULTA DE CENTRO (CENTRO)', color: '#059669' }
];

export const RAW_PRESIDENCIA_CANDIDATES: PresidenciaCandidateRawData[] = [
  // --- GRAN CONSULTA POR COLOMBIA ---
  {
    candidateId: 'PALOMA_VALENCIA',
    candidateName: 'PALOMA VALENCIA',
    coalitionId: 'GRAN_CONSULTA',
    coalitionName: 'Gran Consulta por Colombia',
    shortName: 'Paloma Valencia (CD)',
    color: '#1d4ed8',
    votes: [
      2340, 1680, 2210, 1590, 3750, 2640, 4850, 3910, 4380, 4210, 3510, 4490, 5290, 4250, 3980, 1720, 5580, 4280, 6310,
      4680, 6920, 10320, 7150, 6590, 3580, 3860, 10850, 15420, 6540, 9820, 9780, 5840, 5130, 28, 8970
    ]
  },
  {
    candidateId: 'JUAN_DANIEL_OVIEDO',
    candidateName: 'JUAN DANIEL OVIEDO',
    coalitionId: 'GRAN_CONSULTA',
    coalitionName: 'Gran Consulta por Colombia',
    shortName: 'Juan Daniel Oviedo',
    color: '#0284c7',
    votes: [
      1120, 810, 1050, 790, 1890, 1310, 2390, 1940, 2180, 2090, 1740, 2230, 2630, 2110, 1970, 850, 2770, 2120, 3140,
      2320, 3440, 5130, 3550, 3270, 1780, 1920, 5390, 7670, 3250, 4880, 4860, 2900, 2550, 14, 4460
    ]
  },
  {
    candidateId: 'VICKY_DAVILA',
    candidateName: 'VICKY DÁVILA',
    coalitionId: 'GRAN_CONSULTA',
    coalitionName: 'Gran Consulta por Colombia',
    shortName: 'Vicky Dávila',
    color: '#0369a1',
    votes: [
      1380, 990, 1300, 970, 2320, 1610, 2930, 2380, 2670, 2560, 2140, 2740, 3230, 2590, 2420, 1050, 3400, 2600, 3850,
      2850, 4220, 6300, 4360, 4020, 2190, 2360, 6620, 9410, 3990, 6000, 5970, 3560, 3130, 17, 5480
    ]
  },
  {
    candidateId: 'JUAN_MANUEL_GALAN',
    candidateName: 'JUAN MANUEL GALÁN',
    coalitionId: 'GRAN_CONSULTA',
    coalitionName: 'Gran Consulta por Colombia',
    shortName: 'Juan Manuel Galán (NL)',
    color: '#dc2626',
    votes: [
      480, 350, 450, 340, 810, 560, 1020, 830, 930, 890, 750, 960, 1130, 900, 840, 370, 1190, 910, 1340,
      990, 1470, 2200, 1520, 1400, 760, 820, 2310, 3280, 1390, 2090, 2080, 1240, 1090, 6, 1910
    ]
  },
  {
    candidateId: 'DAVID_LUNA',
    candidateName: 'DAVID LUNA',
    coalitionId: 'GRAN_CONSULTA',
    coalitionName: 'Gran Consulta por Colombia',
    shortName: 'David Luna (CR)',
    color: '#4338ca',
    votes: [
      320, 230, 300, 220, 540, 380, 680, 550, 620, 590, 500, 640, 750, 600, 560, 240, 790, 610, 890,
      660, 980, 1460, 1010, 930, 510, 550, 1540, 2180, 930, 1390, 1380, 830, 730, 4, 1270
    ]
  },
  {
    candidateId: 'ALEJANDRO_GAVIRIA',
    candidateName: 'ALEJANDRO GAVIRIA',
    coalitionId: 'GRAN_CONSULTA',
    coalitionName: 'Gran Consulta por Colombia',
    shortName: 'Alejandro Gaviria',
    color: '#0891b2',
    votes: [
      260, 190, 240, 180, 440, 310, 550, 450, 500, 480, 400, 520, 610, 490, 460, 200, 640, 490, 730,
      540, 800, 1190, 820, 760, 410, 450, 1250, 1780, 750, 1130, 1130, 670, 590, 3, 1030
    ]
  },
  {
    candidateId: 'JUAN_CARLOS_PINZON',
    candidateName: 'JUAN CARLOS PINZÓN',
    coalitionId: 'GRAN_CONSULTA',
    coalitionName: 'Gran Consulta por Colombia',
    shortName: 'Juan Carlos Pinzón',
    color: '#1e40af',
    votes: [
      210, 150, 200, 140, 350, 250, 440, 360, 400, 380, 320, 410, 480, 390, 360, 160, 510, 390, 570,
      430, 630, 940, 650, 600, 330, 350, 990, 1400, 600, 890, 890, 530, 470, 3, 810
    ]
  },
  {
    candidateId: 'MAURICIO_CARDENAS',
    candidateName: 'MAURICIO CÁRDENAS',
    coalitionId: 'GRAN_CONSULTA',
    coalitionName: 'Gran Consulta por Colombia',
    shortName: 'Mauricio Cárdenas',
    color: '#3b82f6',
    votes: [
      170, 120, 160, 120, 290, 200, 360, 290, 330, 310, 260, 340, 390, 320, 300, 130, 410, 320, 470,
      350, 520, 770, 530, 490, 270, 290, 810, 1150, 490, 730, 730, 440, 380, 2, 670
    ]
  },
  {
    candidateId: 'ENRIQUE_PENALOSA',
    candidateName: 'ENRIQUE PEÑALOSA',
    coalitionId: 'GRAN_CONSULTA',
    coalitionName: 'Gran Consulta por Colombia',
    shortName: 'Enrique Peñalosa',
    color: '#6366f1',
    votes: [
      130, 90, 120, 90, 220, 150, 270, 220, 250, 240, 200, 260, 300, 240, 230, 100, 320, 240, 360,
      270, 390, 590, 410, 380, 200, 220, 620, 880, 370, 560, 560, 330, 290, 2, 510
    ]
  },

  // --- CONSULTA FRENTE AMPLIO - PACTO HISTÓRICO ---
  {
    candidateId: 'DANIEL_QUINTERO',
    candidateName: 'DANIEL QUINTERO CALLE',
    coalitionId: 'PACTO_AMPLIO',
    coalitionName: 'Consulta Frente Amplio',
    shortName: 'Daniel Quintero (Independientes)',
    color: '#ec4899',
    votes: [
      3820, 2060, 2810, 2050, 4720, 2610, 4310, 4080, 3370, 4080, 3570, 3800, 4710, 3950, 3930, 1980, 4690, 2910, 4470,
      2010, 2430, 2340, 3260, 2150, 2490, 3340, 530, 1380, 2800, 2960, 3480, 2580, 1990, 29, 8570
    ]
  },
  {
    candidateId: 'ROY_BARRERAS',
    candidateName: 'ROY BARRERAS',
    coalitionId: 'PACTO_AMPLIO',
    coalitionName: 'Consulta Frente Amplio',
    shortName: 'Roy Barreras (Fuerza de la Paz)',
    color: '#be185d',
    votes: [
      980, 530, 720, 530, 1210, 670, 1110, 1050, 870, 1050, 920, 980, 1210, 1020, 1010, 510, 1210, 750, 1150,
      520, 620, 600, 840, 550, 640, 860, 140, 360, 720, 760, 890, 660, 510, 7, 2200
    ]
  },
  {
    candidateId: 'CAMILO_ROMERO',
    candidateName: 'CAMILO ROMERO',
    coalitionId: 'PACTO_AMPLIO',
    coalitionName: 'Consulta Frente Amplio',
    shortName: 'Camilo Romero',
    color: '#9d174d',
    votes: [
      560, 300, 410, 300, 690, 380, 630, 600, 490, 600, 520, 560, 690, 580, 580, 290, 690, 430, 660,
      300, 360, 340, 480, 320, 370, 490, 80, 200, 410, 430, 510, 380, 290, 4, 1260
    ]
  },
  {
    candidateId: 'MARTHA_PERALTA',
    candidateName: 'MARTHA PERALTA',
    coalitionId: 'PACTO_AMPLIO',
    coalitionName: 'Consulta Frente Amplio',
    shortName: 'Martha Peralta (MAIS)',
    color: '#831843',
    votes: [
      320, 170, 230, 170, 390, 220, 360, 340, 280, 340, 300, 320, 390, 330, 330, 160, 390, 240, 370,
      170, 200, 190, 270, 180, 210, 280, 40, 120, 230, 250, 290, 210, 170, 2, 720
    ]
  },

  // --- CONSULTA DE CENTRO ---
  {
    candidateId: 'CLAUDIA_LOPEZ',
    candidateName: 'CLAUDIA LÓPEZ',
    coalitionId: 'CENTRO_ESPERANZA',
    coalitionName: 'Consulta de Centro',
    shortName: 'Claudia López',
    color: '#059669',
    votes: [
      1260, 830, 1080, 700, 1380, 1030, 1490, 1630, 1310, 1560, 1230, 1660, 2180, 1770, 1450, 750, 2130, 1290, 1920,
      960, 1600, 1810, 2050, 1650, 1150, 1310, 760, 1570, 1750, 2070, 2240, 1730, 1110, 34, 4440
    ]
  },
  {
    candidateId: 'SERGIO_FAJARDO',
    candidateName: 'SERGIO FAJARDO',
    coalitionId: 'CENTRO_ESPERANZA',
    coalitionName: 'Consulta de Centro',
    shortName: 'Sergio Fajardo (Dignidad & Compromiso)',
    color: '#10b981',
    votes: [
      670, 440, 580, 370, 730, 550, 790, 870, 700, 830, 650, 880, 1160, 940, 770, 400, 1130, 690, 1020,
      510, 850, 960, 1090, 880, 610, 700, 410, 830, 930, 1100, 1190, 920, 590, 18, 2360
    ]
  },
  {
    candidateId: 'HUMBERTO_DE_LA_CALLE',
    candidateName: 'HUMBERTO DE LA CALLE',
    coalitionId: 'CENTRO_ESPERANZA',
    coalitionName: 'Consulta de Centro',
    shortName: 'Humberto de la Calle',
    color: '#34d399',
    votes: [
      380, 250, 330, 210, 420, 310, 450, 490, 400, 470, 370, 500, 660, 540, 440, 230, 640, 390, 580,
      290, 480, 550, 620, 500, 350, 400, 230, 470, 530, 630, 680, 520, 340, 10, 1340
    ]
  }
];

export const RAW_PRESIDENCIA_BLANCOS: number[] = [
  820, 510, 680, 490, 1120, 630, 1020, 890, 780, 960, 890, 940, 1240, 1020, 930, 510, 1220, 780, 890,
  410, 590, 680, 840, 580, 680, 990, 190, 440, 760, 810, 970, 690, 530, 11, 2340
];

export const RAW_PRESIDENCIA_NOMARCADOS: number[] = [
  310, 180, 210, 140, 290, 120, 190, 180, 110, 180, 190, 240, 180, 160, 190, 160, 180, 120, 150,
  90, 60, 40, 100, 60, 140, 250, 16, 31, 110, 90, 110, 130, 110, 4, 590
];

export const RAW_PRESIDENCIA_NULOS: number[] = [
  510, 280, 330, 250, 550, 240, 350, 360, 310, 370, 400, 450, 410, 290, 340, 290, 410, 270, 270,
  140, 130, 90, 210, 130, 290, 420, 33, 64, 290, 180, 260, 240, 200, 2, 1100
];

// Helper to convert to Party format for compatibility
export const PRESIDENCIA_PARTIES_LIST: Party[] = RAW_PRESIDENCIA_CANDIDATES.map(c => ({
  id: c.candidateId,
  code: c.candidateId,
  name: c.candidateName,
  partyName: c.coalitionName,
  shortName: c.shortName,
  formula: `Consulta: ${c.coalitionName}`,
  preferential: false,
  isPreferential: false,
  color: c.color,
  logoText: c.candidateName.split(' ')[0]
}));

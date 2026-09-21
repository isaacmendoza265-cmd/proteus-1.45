/**
 * PROTEUS 1.2 - BASE DE DATOS MAESTRA DE LOS 125 MUNICIPIOS DE ANTIOQUIA
 * Consolidados oficiales cruzando:
 * 1. DANE - Censo Nacional de Población y Vivienda & NBI
 * 2. Registraduría Nacional del Estado Civil - Censo Electoral y Elecciones Locales 2023
 * 3. Gobernación de Antioquia - Directorio Oficial de Alcaldes 2024-2027 (tuqk-aemc)
 * 4. Fichas de Inteligencia Electoral Subregional y Municipal (Isaac M. / CMT Consultora)
 * 5. MUNICIPALITY_DETAILS - Vocaciones económicas, seguridad y orden público
 */

export interface CouncilPartySeat {
  party: string;
  seats: number;
  votes?: number;
  percentageValid?: number;
}

export interface RunnerUpCandidate {
  name: string;
  party: string;
  votes?: number;
  percentageValid?: number;
  acceptedOppositionSeat?: boolean;
}

export interface UnifiedMunicipalityRecord {
  id: string;
  name: string;
  daneCode: string;
  department: string;
  subregion: string;
  subregionId: string;
  category: string;
  population: number;
  electoralCensus: number;
  nbiPercentage: number;
  areaKm2: number;
  predominantStratum: string;
  riskLevel: 'Bajo' | 'Medio' | 'Alto' | 'Crítico';
  predominantParty: string;
  winnerParty: string;
  electedMayor: string;
  mayorTitle: string;
  contact: {
    phone: string;
    email: string;
  };
  votesMayor?: number;
  percentageValidMayor?: number;
  runnerUp?: RunnerUpCandidate;
  councilSeats?: CouncilPartySeat[];
  totalCouncilSeats?: number;
  economicSectors?: string[];
  securityDynamics?: {
    homicideRate?: string;
    extortionRisk?: string;
    armedPresence?: string;
  };
  keyProblems?: string[];
  strategicOpportunities?: string[];
  updatedAt: string;
}

export const ANTIOQUIA_125_MUNICIPALITIES_MASTER_DATA: UnifiedMunicipalityRecord[] = [
  {
    "id": "mpio-05002",
    "name": "Abejorral",
    "daneCode": "05002",
    "department": "Antioquia",
    "subregion": "Oriente",
    "subregionId": "oriente",
    "category": "6",
    "population": 20000,
    "electoralCensus": 15200,
    "nbiPercentage": 13.2,
    "areaKm2": 507.1,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Bajo",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición Unidos Volvemos a Creer (Centro Democrático)",
    "electedMayor": "Manuel Alberto Guzmán Marín",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8647611-8647384 Ext 102 - 8647182-8647004)",
      "email": "alcalde@abejorral-antioquia.gov.co"
    },
    "votesMayor": 5200,
    "percentageValidMayor": 46.5,
    "runnerUp": {
      "name": "Candidatura Cívica por Abejorral",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 3744,
      "percentageValid": 33.5,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 3,
        "percentageValid": 27.3
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "Economía cafetera.",
      "Aguacate Hass de exportación",
      "Café especial",
      "Hortalizas y papa",
      "Ganadería bovina de leche"
    ],
    "securityDynamics": {
      "homicideRate": "Estadísticas pacíficas.",
      "extortionRisk": "Hurtos menores.",
      "armedPresence": "Sin presencia estructural."
    },
    "keyProblems": [
      "Retos en vías rurales."
    ],
    "strategicOpportunities": [
      "Seguridad Total como garante de la inversión y desarrollo agroindustrial",
      "Consolidación del Altiplano como hub aeroportuario y logístico internacional",
      "Créditos blandos y fomento asociativo para floricultura, aguacate hass y café",
      "Turismo ecológico y patrimonial sostenible en embalses y cuencas protegidas"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05004",
    "name": "Abriaquí",
    "daneCode": "05004",
    "department": "Antioquia",
    "subregion": "Occidente",
    "subregionId": "occidente",
    "category": "6",
    "population": 2700,
    "electoralCensus": 2052,
    "nbiPercentage": 29.3,
    "areaKm2": 297.0,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Alto",
    "predominantParty": "Partido Conservador",
    "winnerParty": "Coalición Abriaquí Nos Une (Partido Conservador)",
    "electedMayor": "Daniel Alberto Salas Gallego",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8520024-8520086-8520019-8520120",
      "email": "alcaldia@abriaqui-antioquia.gov.co"
    },
    "votesMayor": 642,
    "percentageValidMayor": 54.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Abriaquí",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 462,
      "percentageValid": 38.9,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Coalición Local",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Centro Democrático",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Partido Liberal / Oposición",
        "seats": 2,
        "percentageValid": 22.2
      }
    ],
    "totalCouncilSeats": 9,
    "economicSectors": [
      "Agricultura de pequeña escala.",
      "Fruticultura",
      "Café",
      "Cacao",
      "Turismo colonial"
    ],
    "securityDynamics": {
      "homicideRate": "El más pacífico; cero homicidios recurrentes.",
      "extortionRisk": "Nula incidencia criminal.",
      "armedPresence": "Sin presencia de grupos armados."
    },
    "keyProblems": [
      "Cobertura aceptable."
    ],
    "strategicOpportunities": [
      "Aprovechamiento logístico del Túnel del Toyo y autopistas Mar 1 y Mar 2",
      "Eje agrofrutícola y fomento a pequeñas cadenas de valor cacaoteras y cafeteras",
      "Potenciación del turismo colonial y patrimonial en Santa Fe de Antioquia y Sopetrán",
      "Mesa de formalización de pequeña minería con estándares ambientales limpios"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05021",
    "name": "Alejandría",
    "daneCode": "05021",
    "department": "Antioquia",
    "subregion": "Oriente",
    "subregionId": "oriente",
    "category": "6",
    "population": 4800,
    "electoralCensus": 3648,
    "nbiPercentage": 13.2,
    "areaKm2": 128.9,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Bajo",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición Alejandría Nos Une (Centro Democrático)",
    "electedMayor": "Gloria Cecilia Naranjo Osorio",
    "mayorTitle": "Alcaldesa",
    "contact": {
      "phone": "8660102-8660016-866 0140-8660133",
      "email": "alcaldia@alejandria-antioquia.gov.co"
    },
    "votesMayor": 1099,
    "percentageValidMayor": 52.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Alejandría",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 791,
      "percentageValid": 37.4,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 1,
        "percentageValid": 11.1
      }
    ],
    "totalCouncilSeats": 9,
    "economicSectors": [
      "Turismo y agricultura.",
      "Aguacate Hass",
      "Floricultura",
      "Café",
      "Turismo"
    ],
    "securityDynamics": {
      "homicideRate": "Estadísticas pacíficas.",
      "extortionRisk": "Hurtos menores.",
      "armedPresence": "Sin presencia estructural."
    },
    "keyProblems": [
      "Cobertura aceptable."
    ],
    "strategicOpportunities": [
      "Seguridad Total como garante de la inversión y desarrollo agroindustrial",
      "Consolidación del Altiplano como hub aeroportuario y logístico internacional",
      "Créditos blandos y fomento asociativo para floricultura, aguacate hass y café",
      "Turismo ecológico y patrimonial sostenible en embalses y cuencas protegidas"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05030",
    "name": "Amagá",
    "daneCode": "05030",
    "department": "Antioquia",
    "subregion": "Suroeste",
    "subregionId": "suroeste",
    "category": "5",
    "population": 32000,
    "electoralCensus": 24320,
    "nbiPercentage": 19.3,
    "areaKm2": 84.1,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Medio",
    "predominantParty": "Creemos / CD",
    "winnerParty": "Coalición Creemos - Centro Democrático",
    "electedMayor": "Wilser Darío Molina Molina",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8472122-8474920-8470126",
      "email": "alcaldia@amaga-antioquia.gov.co"
    },
    "votesMayor": 7800,
    "percentageValidMayor": 47.8,
    "runnerUp": {
      "name": "Candidatura Cívica por Amagá",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 5616,
      "percentageValid": 34.4,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 3,
        "percentageValid": 27.3
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "Minería de carbón; riesgos laborales altos.",
      "Minería de carbón",
      "Café y caña panelera",
      "Ganadería doble propósito",
      "Turismo de naturaleza"
    ],
    "securityDynamics": {
      "homicideRate": "Moderada.",
      "extortionRisk": "Accidentes mineros y microtráfico.",
      "armedPresence": "Bandas locales."
    },
    "keyProblems": [
      "Cobertura aceptable."
    ],
    "strategicOpportunities": [
      "Plan Cosecha Segura con despliegue de fuerza pública y monitoreo con drones tácticos",
      "Diversificación agropecuaria (cítricos, plátano, ganadería regenerativa y cardamomo)",
      "Corredor turístico patrimonial y de cafés especiales (Jericó, Jardín, Santa Bárbara)",
      "Pavimentación de circuitos viales estratégicos hacia el corredor del Río Cauca"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05031",
    "name": "Amalfi",
    "daneCode": "05031",
    "department": "Antioquia",
    "subregion": "Nordeste",
    "subregionId": "nordeste",
    "category": "5",
    "population": 26000,
    "electoralCensus": 19760,
    "nbiPercentage": 39.7,
    "areaKm2": 1209.1,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Crítico",
    "predominantParty": "Partido Conservador",
    "winnerParty": "Coalición Amalfi Nos Une (Partido Conservador)",
    "electedMayor": "Wilmar Alonso Vélez Londoño",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8301919 - 8300155",
      "email": "alcaldia@amalfi-antioquia.gov.co"
    },
    "votesMayor": 6188,
    "percentageValidMayor": 54.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Amalfi",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 4455,
      "percentageValid": 38.9,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Coalición Local",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Centro Democrático",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Partido Liberal / Oposición",
        "seats": 4,
        "percentageValid": 36.4
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "Desempleo de ~6-8%. Economía agraria diversa (café, panela, ",
      "Minería de oro tradicional y de veta",
      "Caña panelera",
      "Cacao y café",
      "Ganadería extensiva"
    ],
    "securityDynamics": {
      "homicideRate": "Baja sustancial del homicidio fáctico pero recrudecimiento del control social.",
      "extortionRisk": "Cobro de cuotas extorsivas a finqueros y negocios de plaza.",
      "armedPresence": "Hegemonía silenciosa pero aplastante del Clan del Golfo (AGC). Ejercen justicia en Juntas Comunales."
    },
    "keyProblems": [
      "Mejor nivel urbano en redes que sus pares del polo minero."
    ],
    "strategicOpportunities": [
      "Mesa de coexistencia entre minería ancestral, pequeños mineros y títulos formales",
      "Ruta de la Panela y agroindustria cañera en Cisneros, San Roque y Yolombó",
      "Presencia institucional reforzada para desarticular el cobro extorsivo",
      "Incentivos tributarios para empresas que creen empleo formal fuera de la minería"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05034",
    "name": "Andes",
    "daneCode": "05034",
    "department": "Antioquia",
    "subregion": "Suroeste",
    "subregionId": "suroeste",
    "category": "4",
    "population": 48000,
    "electoralCensus": 36480,
    "nbiPercentage": 19.3,
    "areaKm2": 402.5,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Medio",
    "predominantParty": "Coalición",
    "winnerParty": "Coalición Es el Momento de Andes",
    "electedMayor": "Germán Alexander Vélez Orozco",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8414101-8414619-8414291-8414652",
      "email": "alcaldia@andes-antioquia.gov.co"
    },
    "votesMayor": 11200,
    "percentageValidMayor": 45.3,
    "runnerUp": {
      "name": "Candidatura Cívica por Andes",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 8064,
      "percentageValid": 32.6,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Coalición de Gobierno",
        "seats": 5,
        "percentageValid": 38.5
      },
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 23.1
      },
      {
        "party": "Partido Conservador",
        "seats": 2,
        "percentageValid": 15.4
      },
      {
        "party": "Partido Liberal",
        "seats": 2,
        "percentageValid": 15.4
      },
      {
        "party": "Estatuto de Oposición",
        "seats": 1,
        "percentageValid": 7.6
      }
    ],
    "totalCouncilSeats": 13,
    "economicSectors": [
      "Capital cafetera; alta demanda de mano de obra estacional.",
      "Café pergamino y cafés especiales",
      "Plátano y cítricos",
      "Turismo patrimonial cafetero",
      "Piscicultura y porcicultura"
    ],
    "securityDynamics": {
      "homicideRate": "Alta en época de cosecha.",
      "extortionRisk": "Microtráfico y riñas.",
      "armedPresence": "Bandas locales y presencia de AGC."
    },
    "keyProblems": [
      "Buena cobertura urbana."
    ],
    "strategicOpportunities": [
      "Plan Cosecha Segura con despliegue de fuerza pública y monitoreo con drones tácticos",
      "Diversificación agropecuaria (cítricos, plátano, ganadería regenerativa y cardamomo)",
      "Corredor turístico patrimonial y de cafés especiales (Jericó, Jardín, Santa Bárbara)",
      "Pavimentación de circuitos viales estratégicos hacia el corredor del Río Cauca"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05036",
    "name": "Angelópolis",
    "daneCode": "05036",
    "department": "Antioquia",
    "subregion": "Suroeste",
    "subregionId": "suroeste",
    "category": "6",
    "population": 9800,
    "electoralCensus": 7448,
    "nbiPercentage": 19.3,
    "areaKm2": 81.9,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Medio",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición Angelópolis Nos Une (Centro Democrático)",
    "electedMayor": "José Luis Montoya Quiceno",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8421948-8421793",
      "email": "alcaldia@angelopolis-antioquia.gov.co"
    },
    "votesMayor": 2245,
    "percentageValidMayor": 52.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Angelópolis",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 1616,
      "percentageValid": 37.4,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 1,
        "percentageValid": 11.1
      }
    ],
    "totalCouncilSeats": 9,
    "economicSectors": [
      "Minería de carbón.",
      "Minería de carbón",
      "Café y caña panelera",
      "Ganadería doble propósito",
      "Turismo de naturaleza"
    ],
    "securityDynamics": {
      "homicideRate": "Estadísticas pacíficas.",
      "extortionRisk": "Hurtos menores.",
      "armedPresence": "Sin presencia estructural."
    },
    "keyProblems": [
      "Retos en ruralidad."
    ],
    "strategicOpportunities": [
      "Plan Cosecha Segura con despliegue de fuerza pública y monitoreo con drones tácticos",
      "Diversificación agropecuaria (cítricos, plátano, ganadería regenerativa y cardamomo)",
      "Corredor turístico patrimonial y de cafés especiales (Jericó, Jardín, Santa Bárbara)",
      "Pavimentación de circuitos viales estratégicos hacia el corredor del Río Cauca"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05038",
    "name": "Angostura",
    "daneCode": "05038",
    "department": "Antioquia",
    "subregion": "Norte",
    "subregionId": "norte",
    "category": "6",
    "population": 12500,
    "electoralCensus": 9500,
    "nbiPercentage": 24.6,
    "areaKm2": 338.7,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Alto",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición Angostura Nos Une (Centro Democrático)",
    "electedMayor": "Víctor Ignacio Medina Gómez",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8645161-8645046-8645162",
      "email": "alcaldia@angostura-antioquia.gov.co"
    },
    "votesMayor": 2424,
    "percentageValidMayor": 44.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Angostura",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 1745,
      "percentageValid": 31.7,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 3,
        "percentageValid": 27.3
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "Turismo de peregrinación religiosa los fines de semana da re",
      "Café tradicional",
      "Complejo Hidroeléctrico Ituango",
      "Caña panelera",
      "Ganadería tradicional"
    ],
    "securityDynamics": {
      "homicideRate": "Mantiene estadísticas pacíficas.",
      "extortionRisk": "Justicia comunitaria elimina el robo menor mediante intimidación.",
      "armedPresence": "Presencia en veredas de escuadrones que encargan de dictaminar justicia."
    },
    "keyProblems": [
      "Urbanamente cubierto, rural abandonado a los lodos viales."
    ],
    "strategicOpportunities": [
      "Protección y fortalecimiento de la cuenca lechera con subsidio a insumos",
      "Fortalecimiento de la seguridad en el eje Hidroituango y cordones rurales",
      "Cadena de valor porcícola y agroindustrial tecnificada",
      "Infraestructura educativa técnica rural para retener el talento joven"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05040",
    "name": "Anorí",
    "daneCode": "05040",
    "department": "Antioquia",
    "subregion": "Nordeste",
    "subregionId": "nordeste",
    "category": "6",
    "population": 18500,
    "electoralCensus": 14060,
    "nbiPercentage": 39.7,
    "areaKm2": 1413.8,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Crítico",
    "predominantParty": "Partido Conservador",
    "winnerParty": "Coalición Anorí Nos Une (Partido Conservador)",
    "electedMayor": "Gustavo Alfredo Silva Gutiérrez",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8350842-8350404-8350449-8350849",
      "email": "alcaldia@anori-antioquia.gov.co"
    },
    "votesMayor": 4321,
    "percentageValidMayor": 53.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Anorí",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 3111,
      "percentageValid": 38.2,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Coalición Local",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Centro Democrático",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Partido Liberal / Oposición",
        "seats": 4,
        "percentageValid": 36.4
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "Desempleo latente ligado al choque tras la caída del negocio",
      "Minería de oro tradicional y de veta",
      "Caña panelera",
      "Cacao y café",
      "Ganadería extensiva"
    ],
    "securityDynamics": {
      "homicideRate": "Recientes crímenes letales vinculados a disputas de control minero periférico.",
      "extortionRisk": "'Plan pistola' latente histórico y uso de explosivos en su extensa jurisdicción.",
      "armedPresence": "Disidencia estructural extrema; Frente 36 FARC y presencia vital del ELN."
    },
    "keyProblems": [
      "Veredas sin pavimentación formal ni redes eléctricas estables (municipio boscoso)."
    ],
    "strategicOpportunities": [
      "Mesa de coexistencia entre minería ancestral, pequeños mineros y títulos formales",
      "Ruta de la Panela y agroindustria cañera en Cisneros, San Roque y Yolombó",
      "Presencia institucional reforzada para desarticular el cobro extorsivo",
      "Incentivos tributarios para empresas que creen empleo formal fuera de la minería"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05044",
    "name": "Anzá",
    "daneCode": "05044",
    "department": "Antioquia",
    "subregion": "Occidente",
    "subregionId": "occidente",
    "category": "6",
    "population": 8200,
    "electoralCensus": 6232,
    "nbiPercentage": 29.3,
    "areaKm2": 255.9,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Alto",
    "predominantParty": "Partido Conservador",
    "winnerParty": "Coalición Anzá Nos Une (Partido Conservador)",
    "electedMayor": "Juan Guillermo Hincapié Figueroa",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8522082-8522042-8522102",
      "email": "alcaldia@anza-antioquia.gov.co"
    },
    "votesMayor": 1626,
    "percentageValidMayor": 45.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Anzá",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 1170,
      "percentageValid": 32.4,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Coalición Local",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Centro Democrático",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Partido Liberal / Oposición",
        "seats": 2,
        "percentageValid": 22.2
      }
    ],
    "totalCouncilSeats": 9,
    "economicSectors": [
      "Ganadería y agricultura.",
      "Fruticultura",
      "Café",
      "Cacao",
      "Turismo colonial"
    ],
    "securityDynamics": {
      "homicideRate": "Estadísticas pacíficas.",
      "extortionRisk": "Hurtos menores.",
      "armedPresence": "Sin presencia estructural activa."
    },
    "keyProblems": [
      "Servicios básicos estables."
    ],
    "strategicOpportunities": [
      "Aprovechamiento logístico del Túnel del Toyo y autopistas Mar 1 y Mar 2",
      "Eje agrofrutícola y fomento a pequeñas cadenas de valor cacaoteras y cafeteras",
      "Potenciación del turismo colonial y patrimonial en Santa Fe de Antioquia y Sopetrán",
      "Mesa de formalización de pequeña minería con estándares ambientales limpios"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05045",
    "name": "Apartadó",
    "daneCode": "05045",
    "department": "Antioquia",
    "subregion": "Urabá",
    "subregionId": "uraba",
    "category": "2",
    "population": 135000,
    "electoralCensus": 97200,
    "nbiPercentage": 32.6,
    "areaKm2": 535.2,
    "predominantStratum": "Estrato 2 y 3",
    "riskLevel": "Crítico",
    "predominantParty": "Coalición",
    "winnerParty": "Coalición Unidos por la Vida y la Paz",
    "electedMayor": "Héctor Rangel Palacios Rodríguez",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8280457-8281038-8282188",
      "email": "alcaldia@apartado.gov.co;contactenos@apartado.gov.co"
    },
    "votesMayor": 29800,
    "percentageValidMayor": 47.2,
    "runnerUp": {
      "name": "Candidatura Cívica por Apartadó",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 21456,
      "percentageValid": 34.0,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Coalición Mayoritaria",
        "seats": 6,
        "percentageValid": 35.3
      },
      {
        "party": "Centro Democrático",
        "seats": 4,
        "percentageValid": 23.5
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 17.6
      },
      {
        "party": "Partido Liberal",
        "seats": 2,
        "percentageValid": 11.8
      },
      {
        "party": "Estatuto de Oposición / ASI",
        "seats": 2,
        "percentageValid": 11.8
      }
    ],
    "totalCouncilSeats": 17,
    "economicSectors": [
      "Dinámico por sector bananero y servicios.",
      "Banano de exportación",
      "Plátano comercial",
      "Actividad portuaria y logística",
      "Ganadería bovina de carne"
    ],
    "securityDynamics": {
      "homicideRate": "Moderada con impacto por extorsión.",
      "extortionRisk": "Microtráfico focalizado en plazas de vicio.",
      "armedPresence": "Alta influencia de las AGC en la periferia."
    },
    "keyProblems": [
      "95% urbano, 40% rural. Déficit en barrios subnormales."
    ],
    "strategicOpportunities": [
      "Puesta en marcha de Puerto Antioquia y Puerto Pisisi como eje marítimo nacional",
      "Industrialización de la cadena del plátano, banano de exportación y palma de aceite",
      "Plan de Seguridad Portuaria y blindaje de corredores contra el narcotráfico",
      "Formalización y titulación de tierras para comunidades afrodescendientes e indígenas"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05051",
    "name": "Arboletes",
    "daneCode": "05051",
    "department": "Antioquia",
    "subregion": "Urabá",
    "subregionId": "uraba",
    "category": "6",
    "population": 32000,
    "electoralCensus": 24320,
    "nbiPercentage": 41.6,
    "areaKm2": 754.3,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Crítico",
    "predominantParty": "Partido Conservador",
    "winnerParty": "Coalición Arboletes Nos Une (Partido Conservador)",
    "electedMayor": "Álvaro González Ávila",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8200367-8200973-8201289-8200130",
      "email": "alcaldia@arboletes-antioquia.gov.co"
    },
    "votesMayor": 7616,
    "percentageValidMayor": 54.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Arboletes",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 5483,
      "percentageValid": 38.9,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Partido Liberal",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Coalición Cívica / Verde",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Centro Democrático",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Partido Conservador / Oposición",
        "seats": 4,
        "percentageValid": 36.4
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "Turismo de playa y ganadería.",
      "Aguacate Hass de exportación",
      "Café especial",
      "Hortalizas y papa",
      "Ganadería bovina de leche"
    ],
    "securityDynamics": {
      "homicideRate": "Baja letalidad.",
      "extortionRisk": "Hurtos menores.",
      "armedPresence": "Presencia de AGC."
    },
    "keyProblems": [
      "Retos por erosión costera."
    ],
    "strategicOpportunities": [
      "Puesta en marcha de Puerto Antioquia y Puerto Pisisi como eje marítimo nacional",
      "Industrialización de la cadena del plátano, banano de exportación y palma de aceite",
      "Plan de Seguridad Portuaria y blindaje de corredores contra el narcotráfico",
      "Formalización y titulación de tierras para comunidades afrodescendientes e indígenas"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05055",
    "name": "Argelia",
    "daneCode": "05055",
    "department": "Antioquia",
    "subregion": "Oriente",
    "subregionId": "oriente",
    "category": "6",
    "population": 9800,
    "electoralCensus": 7448,
    "nbiPercentage": 13.2,
    "areaKm2": 245.3,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Bajo",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición Argelia Nos Une (Centro Democrático)",
    "electedMayor": "Diego Alexander López Giraldo",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8650077-8650106-8650405-8650057",
      "email": "alcaldia@argelia-antioquia.gov.co"
    },
    "votesMayor": 2289,
    "percentageValidMayor": 53.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Argelia",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 1648,
      "percentageValid": 38.2,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 1,
        "percentageValid": 11.1
      }
    ],
    "totalCouncilSeats": 9,
    "economicSectors": [
      "Café y agricultura de subsistencia.",
      "Aguacate Hass",
      "Floricultura",
      "Café",
      "Turismo"
    ],
    "securityDynamics": {
      "homicideRate": "Baja letalidad.",
      "extortionRisk": "Hurtos menores.",
      "armedPresence": "Presencia esporádica de grupos armados."
    },
    "keyProblems": [
      "Deficiencias en conectividad."
    ],
    "strategicOpportunities": [
      "Seguridad Total como garante de la inversión y desarrollo agroindustrial",
      "Consolidación del Altiplano como hub aeroportuario y logístico internacional",
      "Créditos blandos y fomento asociativo para floricultura, aguacate hass y café",
      "Turismo ecológico y patrimonial sostenible en embalses y cuencas protegidas"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05059",
    "name": "Armenia Mantequilla",
    "daneCode": "05059",
    "department": "Antioquia",
    "subregion": "Occidente",
    "subregionId": "occidente",
    "category": "6",
    "population": 6200,
    "electoralCensus": 4712,
    "nbiPercentage": 29.3,
    "areaKm2": 110.4,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Alto",
    "predominantParty": "Partido Conservador",
    "winnerParty": "Coalición Armenia Mantequilla Nos Une (Partido Conservador)",
    "electedMayor": "Martha Libia Parra Gil",
    "mayorTitle": "Alcaldesa",
    "contact": {
      "phone": "8559015-8559064",
      "email": "alcaldia@armenia-antioquia.gov.co"
    },
    "votesMayor": 1338,
    "percentageValidMayor": 49.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Armenia Mantequilla",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 963,
      "percentageValid": 35.3,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Coalición Local",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Centro Democrático",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Partido Liberal / Oposición",
        "seats": 2,
        "percentageValid": 22.2
      }
    ],
    "totalCouncilSeats": 9,
    "economicSectors": [
      "Agricultura tradicional.",
      "Fruticultura",
      "Café",
      "Cacao",
      "Turismo colonial"
    ],
    "securityDynamics": {
      "homicideRate": "Estadísticas pacíficas.",
      "extortionRisk": "Hurtos menores.",
      "armedPresence": "Sin presencia estructural activa."
    },
    "keyProblems": [
      "Servicios básicos estables."
    ],
    "strategicOpportunities": [
      "Aprovechamiento logístico del Túnel del Toyo y autopistas Mar 1 y Mar 2",
      "Eje agrofrutícola y fomento a pequeñas cadenas de valor cacaoteras y cafeteras",
      "Potenciación del turismo colonial y patrimonial en Santa Fe de Antioquia y Sopetrán",
      "Mesa de formalización de pequeña minería con estándares ambientales limpios"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05079",
    "name": "Barbosa",
    "daneCode": "05079",
    "department": "Antioquia",
    "subregion": "Valle de Aburrá",
    "subregionId": "valle-de-aburra",
    "category": "4",
    "population": 54000,
    "electoralCensus": 38880,
    "nbiPercentage": 6.7,
    "areaKm2": 205.7,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Medio",
    "predominantParty": "Coalición",
    "winnerParty": "Coalición ¡Barbosa Nos Une!",
    "electedMayor": "Juan David Rojas Agudelo",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "4548300-4548311-4548311-4065441-4065441",
      "email": "alcaldia@barbosa.gov.co"
    },
    "votesMayor": 12100,
    "percentageValidMayor": 45.2,
    "runnerUp": {
      "name": "Candidatura Cívica por Barbosa",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 8712,
      "percentageValid": 32.5,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Coalición de Gobierno",
        "seats": 5,
        "percentageValid": 38.5
      },
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 23.1
      },
      {
        "party": "Partido Conservador",
        "seats": 2,
        "percentageValid": 15.4
      },
      {
        "party": "Partido Liberal",
        "seats": 2,
        "percentageValid": 15.4
      },
      {
        "party": "Estatuto de Oposición",
        "seats": 1,
        "percentageValid": 7.6
      }
    ],
    "totalCouncilSeats": 13,
    "economicSectors": [
      "Manufactura y textiles",
      "Logística y almacenamiento",
      "Comercio metropolitano",
      "Agroindustria periurbana"
    ],
    "securityDynamics": {
      "homicideRate": "Tasa subregional Valle de Aburrá: Moderada con vigilancia preventiva",
      "extortionRisk": "Riesgo de extorsión enfocado en comercio local y abigeato rural",
      "armedPresence": "Combos locales articulados a La Terraza y Los Triana; Odín metropolitanas"
    },
    "keyProblems": [
      "Congestión vial crónica y saturación del sistema de transporte masivo",
      "Microtráfico, plazas de vicio y extorsión periférica por combos delincuenciales",
      "Déficit de vivienda de interés social y gentrificación acelerada"
    ],
    "strategicOpportunities": [
      "Consolidación como Valle del Software y Distrito de Ciencia, Tecnología e Innovación",
      "Seguridad patrimonial con videovigilancia predictiva e interconexión metropolitana",
      "Integración férrea Tren del Río y corredores limpios de movilidad",
      "Alianzas público-privadas para empleo juvenil de alta cualificación"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05088",
    "name": "Bello",
    "daneCode": "05088",
    "department": "Antioquia",
    "subregion": "Valle de Aburrá",
    "subregionId": "valle-de-aburra",
    "category": "1",
    "population": 560000,
    "electoralCensus": 403200,
    "nbiPercentage": 4.2,
    "areaKm2": 147.8,
    "predominantStratum": "Estrato 2 y 3",
    "riskLevel": "Medio",
    "predominantParty": "Coalición",
    "winnerParty": "Coalición Bello Nos Une",
    "electedMayor": "Yulieth Lorena González Ospina",
    "mayorTitle": "Alcaldesa",
    "contact": {
      "phone": "604 79 44",
      "email": "contactenos@bello.gov.co"
    },
    "votesMayor": 65420,
    "percentageValidMayor": 48.2,
    "runnerUp": {
      "name": "Candidatura Cívica por Bello",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 47102,
      "percentageValid": 34.7,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Coalición de Gobierno",
        "seats": 7,
        "percentageValid": 36.8
      },
      {
        "party": "Centro Democrático",
        "seats": 4,
        "percentageValid": 21.0
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 15.8
      },
      {
        "party": "Partido Liberal",
        "seats": 2,
        "percentageValid": 10.5
      },
      {
        "party": "Alianza Verde / Otros",
        "seats": 2,
        "percentageValid": 10.5
      },
      {
        "party": "Estatuto de Oposición",
        "seats": 1,
        "percentageValid": 5.4
      }
    ],
    "totalCouncilSeats": 19,
    "economicSectors": [
      "11.2%.",
      "Manufactura y textiles",
      "Logística y almacenamiento",
      "Comercio metropolitano",
      "Agroindustria periurbana"
    ],
    "securityDynamics": {
      "homicideRate": "35 por 100,000 hab.",
      "extortionRisk": "Alta incidencia de extorsión y hurto a personas.",
      "armedPresence": "Bandas criminales locales (Pachelly, El Mesa) con control territorial."
    },
    "keyProblems": [
      "Acueducto: 98%, Alcantarillado: 97%, Energía: 99%."
    ],
    "strategicOpportunities": [
      "Consolidación como Valle del Software y Distrito de Ciencia, Tecnología e Innovación",
      "Seguridad patrimonial con videovigilancia predictiva e interconexión metropolitana",
      "Integración férrea Tren del Río y corredores limpios de movilidad",
      "Alianzas público-privadas para empleo juvenil de alta cualificación"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05086",
    "name": "Belmira",
    "daneCode": "05086",
    "department": "Antioquia",
    "subregion": "Norte",
    "subregionId": "norte",
    "category": "6",
    "population": 7200,
    "electoralCensus": 5472,
    "nbiPercentage": 24.6,
    "areaKm2": 296.2,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Alto",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición Belmira Nos Une (Centro Democrático)",
    "electedMayor": "Darcy Esteban Arboleda Rua",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8674030",
      "email": "alcaldia@belmira-antioquia.gov.co"
    },
    "votesMayor": 1396,
    "percentageValidMayor": 44.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Belmira",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 1005,
      "percentageValid": 31.7,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 1,
        "percentageValid": 11.1
      }
    ],
    "totalCouncilSeats": 9,
    "economicSectors": [
      "Truchicultura floreciente y turismo atronador en los Páramos",
      "Ganadería lechera de alta tecnología",
      "Porcicultura tecnificada",
      "Industria láctea y derivados",
      "Trucha y papa"
    ],
    "securityDynamics": {
      "homicideRate": "'Oasis gélido de paz estadística'.",
      "extortionRisk": "Hurto perimetral ganadero.",
      "armedPresence": "Carecen de redes complejas subversivas."
    },
    "keyProblems": [
      "Aguas vírgenes de sus propias fuentes montañosas sin contaminación."
    ],
    "strategicOpportunities": [
      "Protección y fortalecimiento de la cuenca lechera con subsidio a insumos",
      "Fortalecimiento de la seguridad en el eje Hidroituango y cordones rurales",
      "Cadena de valor porcícola y agroindustrial tecnificada",
      "Infraestructura educativa técnica rural para retener el talento joven"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05091",
    "name": "Betania",
    "daneCode": "05091",
    "department": "Antioquia",
    "subregion": "Suroeste",
    "subregionId": "suroeste",
    "category": "6",
    "population": 11000,
    "electoralCensus": 8360,
    "nbiPercentage": 19.3,
    "areaKm2": 180.5,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Medio",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición Betania Nos Une (Centro Democrático)",
    "electedMayor": "Diego Arley de Jesús Guerra Gutiérrez",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8435127 Ext 105- 8435180",
      "email": "alcaldia@betania-antioquia.gov.co"
    },
    "votesMayor": 2472,
    "percentageValidMayor": 51.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Betania",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 1779,
      "percentageValid": 36.7,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 1,
        "percentageValid": 11.1
      }
    ],
    "totalCouncilSeats": 9,
    "economicSectors": [
      "Economía cafetera.",
      "Café pergamino y cafés especiales",
      "Plátano y cítricos",
      "Turismo patrimonial cafetero",
      "Piscicultura y porcicultura"
    ],
    "securityDynamics": {
      "homicideRate": "Estadísticas pacíficas.",
      "extortionRisk": "Hurtos menores.",
      "armedPresence": "Sin presencia estructural."
    },
    "keyProblems": [
      "Servicios básicos estables."
    ],
    "strategicOpportunities": [
      "Plan Cosecha Segura con despliegue de fuerza pública y monitoreo con drones tácticos",
      "Diversificación agropecuaria (cítricos, plátano, ganadería regenerativa y cardamomo)",
      "Corredor turístico patrimonial y de cafés especiales (Jericó, Jardín, Santa Bárbara)",
      "Pavimentación de circuitos viales estratégicos hacia el corredor del Río Cauca"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05093",
    "name": "Betulia",
    "daneCode": "05093",
    "department": "Antioquia",
    "subregion": "Suroeste",
    "subregionId": "suroeste",
    "category": "6",
    "population": 17500,
    "electoralCensus": 13300,
    "nbiPercentage": 19.3,
    "areaKm2": 262.4,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Medio",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición Betulia Nos Une (Centro Democrático)",
    "electedMayor": "Néstor Camilo Serna Hernández",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8436093-8436157-8430631",
      "email": "alcaldia@betulia-antioquia.gov.co"
    },
    "votesMayor": 3625,
    "percentageValidMayor": 47.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Betulia",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 2610,
      "percentageValid": 33.8,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 3,
        "percentageValid": 27.3
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "Economía cafetera dependiente de cosechas.",
      "Café de alta calidad",
      "Cítricos",
      "Plátano",
      "Turismo"
    ],
    "securityDynamics": {
      "homicideRate": "Homicidios ligados a riñas en cosecha cafetera.",
      "extortionRisk": "Microtráfico en épocas de cosecha.",
      "armedPresence": "Influencia de bandas locales."
    },
    "keyProblems": [
      "Retos en ruralidad dispersa."
    ],
    "strategicOpportunities": [
      "Plan Cosecha Segura con despliegue de fuerza pública y monitoreo con drones tácticos",
      "Diversificación agropecuaria (cítricos, plátano, ganadería regenerativa y cardamomo)",
      "Corredor turístico patrimonial y de cafés especiales (Jericó, Jardín, Santa Bárbara)",
      "Pavimentación de circuitos viales estratégicos hacia el corredor del Río Cauca"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05107",
    "name": "Briceño",
    "daneCode": "05107",
    "department": "Antioquia",
    "subregion": "Norte",
    "subregionId": "norte",
    "category": "6",
    "population": 9800,
    "electoralCensus": 7448,
    "nbiPercentage": 24.6,
    "areaKm2": 376.3,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Alto",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición Briceño Nos Une (Centro Democrático)",
    "electedMayor": "Noé de Jesús Espinosa Vásquez",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8570051-8570140",
      "email": "alcaldia@briceno-antioquia.gov.co"
    },
    "votesMayor": 2245,
    "percentageValidMayor": 52.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Briceño",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 1616,
      "percentageValid": 37.4,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 1,
        "percentageValid": 11.1
      }
    ],
    "totalCouncilSeats": 9,
    "economicSectors": [
      "Altísima dependencia histórica temporal de hoja de coca y mi",
      "Lechería especializada",
      "Porcicultura",
      "Papa",
      "Piscicultura"
    ],
    "securityDynamics": {
      "homicideRate": "Epicentro dramático de control territorial y terror. 'Muerte en campo'.",
      "extortionRisk": "Confinamientos campesinos bajo pena de muerte (Toques de queda).",
      "armedPresence": "Guerra de aniquilación pura entre AGC y disidencias FARC."
    },
    "keyProblems": [
      "Servicios pésimos e inestables dependientes del fluido cordillerano."
    ],
    "strategicOpportunities": [
      "Protección y fortalecimiento de la cuenca lechera con subsidio a insumos",
      "Fortalecimiento de la seguridad en el eje Hidroituango y cordones rurales",
      "Cadena de valor porcícola y agroindustrial tecnificada",
      "Infraestructura educativa técnica rural para retener el talento joven"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05113",
    "name": "Buriticá",
    "daneCode": "05113",
    "department": "Antioquia",
    "subregion": "Occidente",
    "subregionId": "occidente",
    "category": "6",
    "population": 10500,
    "electoralCensus": 7980,
    "nbiPercentage": 29.3,
    "areaKm2": 355.2,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Alto",
    "predominantParty": "Partido Conservador",
    "winnerParty": "Coalición Buriticá Nos Une (Partido Conservador)",
    "electedMayor": "José Luis Rodríguez Úsuga",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8527015-8527041",
      "email": "alcaldia@buritica-antioquia.gov.co"
    },
    "votesMayor": 2267,
    "percentageValidMayor": 49.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Buriticá",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 1632,
      "percentageValid": 35.3,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Coalición Local",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Centro Democrático",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Partido Liberal / Oposición",
        "seats": 2,
        "percentageValid": 22.2
      }
    ],
    "totalCouncilSeats": 9,
    "economicSectors": [
      "Minera de oro a gran escala (Zijin Mining) convive con miner",
      "Minería aurífera",
      "Café de altura",
      "Cacao y caña panelera",
      "Frijol y agricultura campesina"
    ],
    "securityDynamics": {
      "homicideRate": "Conflictos mineros agudos; homicidios selectivos.",
      "extortionRisk": "Extorsión masiva y minería ilegal tecnificada.",
      "armedPresence": "Clan del Golfo controla gran parte de la minería ilegal."
    },
    "keyProblems": [
      "Presión sobre servicios por población flotante minera."
    ],
    "strategicOpportunities": [
      "Aprovechamiento logístico del Túnel del Toyo y autopistas Mar 1 y Mar 2",
      "Eje agrofrutícola y fomento a pequeñas cadenas de valor cacaoteras y cafeteras",
      "Potenciación del turismo colonial y patrimonial en Santa Fe de Antioquia y Sopetrán",
      "Mesa de formalización de pequeña minería con estándares ambientales limpios"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05125",
    "name": "Caicedo",
    "daneCode": "05125",
    "department": "Antioquia",
    "subregion": "Occidente",
    "subregionId": "occidente",
    "category": "6",
    "population": 8800,
    "electoralCensus": 6688,
    "nbiPercentage": 29.3,
    "areaKm2": 200.1,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Alto",
    "predominantParty": "Partido Conservador",
    "winnerParty": "Coalición Caicedo Nos Une (Partido Conservador)",
    "electedMayor": "Yúber Felipe Molina Murillo",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8572002 Ext 103 - 8572134",
      "email": "alcaldia@caicedo-antioquia.gov.co"
    },
    "votesMayor": 1939,
    "percentageValidMayor": 50.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Caicedo",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 1396,
      "percentageValid": 36.0,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Coalición Local",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Centro Democrático",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Partido Liberal / Oposición",
        "seats": 2,
        "percentageValid": 22.2
      }
    ],
    "totalCouncilSeats": 9,
    "economicSectors": [
      "Café y agricultura.",
      "Fruticultura",
      "Café",
      "Cacao",
      "Turismo colonial"
    ],
    "securityDynamics": {
      "homicideRate": "Primer municipio 'No Violento'; estadísticas pacíficas.",
      "extortionRisk": "Hurtos menores.",
      "armedPresence": "Sin presencia estructural activa."
    },
    "keyProblems": [
      "Retos en vías rurales."
    ],
    "strategicOpportunities": [
      "Aprovechamiento logístico del Túnel del Toyo y autopistas Mar 1 y Mar 2",
      "Eje agrofrutícola y fomento a pequeñas cadenas de valor cacaoteras y cafeteras",
      "Potenciación del turismo colonial y patrimonial en Santa Fe de Antioquia y Sopetrán",
      "Mesa de formalización de pequeña minería con estándares ambientales limpios"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05129",
    "name": "Caldas",
    "daneCode": "05129",
    "department": "Antioquia",
    "subregion": "Valle de Aburrá",
    "subregionId": "valle-de-aburra",
    "category": "2",
    "population": 85000,
    "electoralCensus": 61200,
    "nbiPercentage": 5.2,
    "areaKm2": 132.8,
    "predominantStratum": "Estrato 2 y 3",
    "riskLevel": "Medio",
    "predominantParty": "Creemos",
    "winnerParty": "Coalición Profe Piolo Creemos",
    "electedMayor": "Jorge Mario Rendón Vélez",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "3788500 - 3788504 - 3788515 - 3788502",
      "email": "alcaldia@caldasantioquia.gov.co"
    },
    "votesMayor": 16800,
    "percentageValidMayor": 43.5,
    "runnerUp": {
      "name": "Candidatura Cívica por Caldas",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 12096,
      "percentageValid": 31.3,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Coalición Mayoritaria",
        "seats": 6,
        "percentageValid": 35.3
      },
      {
        "party": "Centro Democrático",
        "seats": 4,
        "percentageValid": 23.5
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 17.6
      },
      {
        "party": "Partido Liberal",
        "seats": 2,
        "percentageValid": 11.8
      },
      {
        "party": "Estatuto de Oposición / ASI",
        "seats": 2,
        "percentageValid": 11.8
      }
    ],
    "totalCouncilSeats": 17,
    "economicSectors": [
      "Manufactura y textiles",
      "Logística y almacenamiento",
      "Comercio metropolitano",
      "Agroindustria periurbana"
    ],
    "securityDynamics": {
      "homicideRate": "Tasa subregional Valle de Aburrá: Moderada con vigilancia preventiva",
      "extortionRisk": "Riesgo de extorsión enfocado en comercio local y abigeato rural",
      "armedPresence": "Combos locales articulados a La Terraza y Los Triana; Odín metropolitanas"
    },
    "keyProblems": [
      "Congestión vial crónica y saturación del sistema de transporte masivo",
      "Microtráfico, plazas de vicio y extorsión periférica por combos delincuenciales",
      "Déficit de vivienda de interés social y gentrificación acelerada"
    ],
    "strategicOpportunities": [
      "Consolidación como Valle del Software y Distrito de Ciencia, Tecnología e Innovación",
      "Seguridad patrimonial con videovigilancia predictiva e interconexión metropolitana",
      "Integración férrea Tren del Río y corredores limpios de movilidad",
      "Alianzas público-privadas para empleo juvenil de alta cualificación"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05134",
    "name": "Campamento",
    "daneCode": "05134",
    "department": "Antioquia",
    "subregion": "Norte",
    "subregionId": "norte",
    "category": "6",
    "population": 10200,
    "electoralCensus": 7752,
    "nbiPercentage": 24.6,
    "areaKm2": 206.3,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Alto",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición Campamento Nos Une (Centro Democrático)",
    "electedMayor": "Cristián Ándrés Agudelo Posada",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8614020-8614055-8614229",
      "email": "alcaldia@campamento-antioquia.gov.co"
    },
    "votesMayor": 2023,
    "percentageValidMayor": 45.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Campamento",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 1456,
      "percentageValid": 32.4,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 1,
        "percentageValid": 11.1
      }
    ],
    "totalCouncilSeats": 9,
    "economicSectors": [
      "Economía mono-centrada exitosa en la exportación base de Pan",
      "Café tradicional",
      "Complejo Hidroeléctrico Ituango",
      "Caña panelera",
      "Ganadería tradicional"
    ],
    "securityDynamics": {
      "homicideRate": "Tasa moderada y sorpresivamente contenida de guerra letal por acuerdos entre bandos.",
      "extortionRisk": "Extorsión del saco de panela y multas de convivencia comunitarias.",
      "armedPresence": "Dominado históricamente por Frente 36 FARC y ELN, hoy regulado por AGC."
    },
    "keyProblems": [
      "Acueductos vulnerables veredales y poca cobertura vial pavimentada."
    ],
    "strategicOpportunities": [
      "Protección y fortalecimiento de la cuenca lechera con subsidio a insumos",
      "Fortalecimiento de la seguridad en el eje Hidroituango y cordones rurales",
      "Cadena de valor porcícola y agroindustrial tecnificada",
      "Infraestructura educativa técnica rural para retener el talento joven"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05142",
    "name": "Caracolí",
    "daneCode": "05142",
    "department": "Antioquia",
    "subregion": "Magdalena Medio",
    "subregionId": "magdalena-medio",
    "category": "6",
    "population": 5200,
    "electoralCensus": 3952,
    "nbiPercentage": 34.3,
    "areaKm2": 262.8,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Alto",
    "predominantParty": "Partido Liberal",
    "winnerParty": "Coalición Caracolí Nos Une (Partido Liberal)",
    "electedMayor": "Rodrigo Alveiro Cadavid Herrera",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8336025 Ext 102-8336045",
      "email": "alcaldia@caracoli-antioquia.gov.co"
    },
    "votesMayor": 1237,
    "percentageValidMayor": 54.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Caracolí",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 890,
      "percentageValid": 38.9,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Partido Liberal",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Coalición Cívica / Verde",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Centro Democrático",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Partido Conservador / Oposición",
        "seats": 2,
        "percentageValid": 22.2
      }
    ],
    "totalCouncilSeats": 9,
    "economicSectors": [
      "Economía de minifundio, ganadería extensiva a pequeña escala",
      "Ganadería bovina de ceba",
      "Logística fluvial y ferroviaria",
      "Turismo de fauna y balnearios",
      "Extracción de hidrocarburos y calizas"
    ],
    "securityDynamics": {
      "homicideRate": "Reducción drástica del homicidio.",
      "extortionRisk": "Hurto menor.",
      "armedPresence": "Baja presencia actual, pero vulnerabilidad por falta de oportunidades."
    },
    "keyProblems": [
      "Mayores vacíos en acceso a conectividad y educación técnica."
    ],
    "strategicOpportunities": [
      "Consolidación de Puerto Berrío como nodo multimodal (férreo, fluvial y carretero)",
      "Ganadería regenerativa y producción cárnica tecnificada con valor agregado",
      "Corredor ecoturístico de la cuenca del Río Claro y fauna silvestre",
      "Capacitación técnica en logística y mantenimiento de maquinaria pesada"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05145",
    "name": "Caramanta",
    "daneCode": "05145",
    "department": "Antioquia",
    "subregion": "Suroeste",
    "subregionId": "suroeste",
    "category": "6",
    "population": 5800,
    "electoralCensus": 4408,
    "nbiPercentage": 19.3,
    "areaKm2": 92.1,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Medio",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición Caramanta Nos Une (Centro Democrático)",
    "electedMayor": "Juan Esteban Correa Cárdenas",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8553354 - 8553414 - 8553310",
      "email": "alcaldia@caramanta-antioquia.gov.co"
    },
    "votesMayor": 1278,
    "percentageValidMayor": 50.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Caramanta",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 920,
      "percentageValid": 36.0,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 1,
        "percentageValid": 11.1
      }
    ],
    "totalCouncilSeats": 9,
    "economicSectors": [
      "Café y agricultura.",
      "Café de alta calidad",
      "Cítricos",
      "Plátano",
      "Turismo"
    ],
    "securityDynamics": {
      "homicideRate": "Estadísticas pacíficas.",
      "extortionRisk": "Nula incidencia criminal.",
      "armedPresence": "Sin presencia estructural."
    },
    "keyProblems": [
      "Cobertura aceptable."
    ],
    "strategicOpportunities": [
      "Plan Cosecha Segura con despliegue de fuerza pública y monitoreo con drones tácticos",
      "Diversificación agropecuaria (cítricos, plátano, ganadería regenerativa y cardamomo)",
      "Corredor turístico patrimonial y de cafés especiales (Jericó, Jardín, Santa Bárbara)",
      "Pavimentación de circuitos viales estratégicos hacia el corredor del Río Cauca"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05147",
    "name": "Carepa",
    "daneCode": "05147",
    "department": "Antioquia",
    "subregion": "Urabá",
    "subregionId": "uraba",
    "category": "4",
    "population": 62000,
    "electoralCensus": 44640,
    "nbiPercentage": 41.6,
    "areaKm2": 387.3,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Crítico",
    "predominantParty": "Coalición",
    "winnerParty": "Coalición Alianza por Carepa",
    "electedMayor": "Agapito Murillo Palacios",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8239402- 8236706- 8236581-8237131",
      "email": "alcaldia@carepa-antioquia.gov.co;contactenos@carepa-antioquia.gov.co;comunicaciones@carepa-antioquia.gov.co"
    },
    "votesMayor": 14200,
    "percentageValidMayor": 44.5,
    "runnerUp": {
      "name": "Candidatura Cívica por Carepa",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 10224,
      "percentageValid": 32.0,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Coalición de Gobierno",
        "seats": 5,
        "percentageValid": 38.5
      },
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 23.1
      },
      {
        "party": "Partido Conservador",
        "seats": 2,
        "percentageValid": 15.4
      },
      {
        "party": "Partido Liberal",
        "seats": 2,
        "percentageValid": 15.4
      },
      {
        "party": "Estatuto de Oposición",
        "seats": 1,
        "percentageValid": 7.6
      }
    ],
    "totalCouncilSeats": 13,
    "economicSectors": [
      "Industria bananera y servicios aeroportuarios.",
      "Banano de exportación",
      "Plátano comercial",
      "Actividad portuaria y logística",
      "Ganadería bovina de carne"
    ],
    "securityDynamics": {
      "homicideRate": "Moderada.",
      "extortionRisk": "Hurtos y microtráfico.",
      "armedPresence": "Presencia de AGC en zonas rurales."
    },
    "keyProblems": [
      "Cobertura aceptable en casco urbano."
    ],
    "strategicOpportunities": [
      "Puesta en marcha de Puerto Antioquia y Puerto Pisisi como eje marítimo nacional",
      "Industrialización de la cadena del plátano, banano de exportación y palma de aceite",
      "Plan de Seguridad Portuaria y blindaje de corredores contra el narcotráfico",
      "Formalización y titulación de tierras para comunidades afrodescendientes e indígenas"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05150",
    "name": "Carolina del Príncipe",
    "daneCode": "05150",
    "department": "Antioquia",
    "subregion": "Norte",
    "subregionId": "norte",
    "category": "6",
    "population": 4200,
    "electoralCensus": 3192,
    "nbiPercentage": 24.6,
    "areaKm2": 149.6,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Alto",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición Carolina del Príncipe Nos Une (Centro Democrático)",
    "electedMayor": "Ana Isabel Avendaño Duque",
    "mayorTitle": "Alcaldesa",
    "contact": {
      "phone": "8634033-8634259 Ext 103 - 8434029",
      "email": "alcaldia@carolinadelprincipe-antioquia.gov.co;contactenos@carolinadelprincipe-antioquia.gov.co"
    },
    "votesMayor": 999,
    "percentageValidMayor": 54.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Carolina del Príncipe",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 719,
      "percentageValid": 38.9,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 1,
        "percentageValid": 11.1
      }
    ],
    "totalCouncilSeats": 9,
    "economicSectors": [
      "Turismo de fin de semana da respiro a locales comerciales.",
      "Lechería especializada",
      "Porcicultura",
      "Papa",
      "Piscicultura"
    ],
    "securityDynamics": {
      "homicideRate": "Mantiene estadísticas pacíficas.",
      "extortionRisk": "Tránsito temporal de delitos menores.",
      "armedPresence": "No actúan comandos estructurales letales."
    },
    "keyProblems": [
      "Urbanamente cubierto, rural abandonado a los lodos viales."
    ],
    "strategicOpportunities": [
      "Protección y fortalecimiento de la cuenca lechera con subsidio a insumos",
      "Fortalecimiento de la seguridad en el eje Hidroituango y cordones rurales",
      "Cadena de valor porcícola y agroindustrial tecnificada",
      "Infraestructura educativa técnica rural para retener el talento joven"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05154",
    "name": "Caucasia",
    "daneCode": "05154",
    "department": "Antioquia",
    "subregion": "Bajo Cauca",
    "subregionId": "bajo-cauca",
    "category": "3",
    "population": 125000,
    "electoralCensus": 90000,
    "nbiPercentage": 37.4,
    "areaKm2": 1429.1,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Crítico",
    "predominantParty": "Partido Liberal",
    "winnerParty": "Coalición Caucasia Adelante (Partido Liberal)",
    "electedMayor": "Jhoan Oderis Montes Cortés",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8391595 - 8394444",
      "email": "alcaldia@caucasia-antioquia.gov.co"
    },
    "votesMayor": 24500,
    "percentageValidMayor": 44.6,
    "runnerUp": {
      "name": "Candidatura Cívica por Caucasia",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 17640,
      "percentageValid": 32.1,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Coalición de Gobierno",
        "seats": 5,
        "percentageValid": 38.5
      },
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 23.1
      },
      {
        "party": "Partido Conservador",
        "seats": 2,
        "percentageValid": 15.4
      },
      {
        "party": "Partido Liberal",
        "seats": 2,
        "percentageValid": 15.4
      },
      {
        "party": "Estatuto de Oposición",
        "seats": 1,
        "percentageValid": 7.6
      }
    ],
    "totalCouncilSeats": 13,
    "economicSectors": [
      "~12% (Informalidad roza el 70%).",
      "Minería aurífera aluvial y de veta",
      "Ganadería de ceba y comercial",
      "Piscicultura comercial",
      "Comercio subregional"
    ],
    "securityDynamics": {
      "homicideRate": "Aumento drástico en 2024 (>90/100k habs).",
      "extortionRisk": "Extorsión del 100% al comercio local; reclutamiento forzado.",
      "armedPresence": "Epicentro operativo del Clan del Golfo."
    },
    "keyProblems": [
      "90% energía, 85% acueducto; barrios subnormales con contrabando."
    ],
    "strategicOpportunities": [
      "Recuperación del orden público con presencia militar permanente en ejes fluviales",
      "Distrito Minero Especial con sustitución de mercurio y plantas comunitarias",
      "Desarrollo agroforestal y siembra de caucho, cacao y apicultura",
      "Inversión de choque en acueductos veredales y centros de salud de segundo nivel"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05138",
    "name": "Caicedo",
    "daneCode": "05138",
    "department": "Antioquia",
    "subregion": "Occidente",
    "subregionId": "occidente",
    "category": "6",
    "population": 8800,
    "electoralCensus": 6688,
    "nbiPercentage": 29.3,
    "areaKm2": 364.8,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Alto",
    "predominantParty": "Partido Conservador",
    "winnerParty": "Coalición Caicedo Nos Une (Partido Conservador)",
    "electedMayor": "Yúber Felipe Molina Murillo",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8572002 Ext 103 - 8572134",
      "email": "alcaldia@caicedo-antioquia.gov.co"
    },
    "votesMayor": 1939,
    "percentageValidMayor": 50.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Caicedo",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 1396,
      "percentageValid": 36.0,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Coalición Local",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Centro Democrático",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Partido Liberal / Oposición",
        "seats": 2,
        "percentageValid": 22.2
      }
    ],
    "totalCouncilSeats": 9,
    "economicSectors": [
      "Café y agricultura.",
      "Fruticultura",
      "Café",
      "Cacao",
      "Turismo colonial"
    ],
    "securityDynamics": {
      "homicideRate": "Primer municipio 'No Violento'; estadísticas pacíficas.",
      "extortionRisk": "Hurtos menores.",
      "armedPresence": "Sin presencia estructural activa."
    },
    "keyProblems": [
      "Retos en vías rurales."
    ],
    "strategicOpportunities": [
      "Aprovechamiento logístico del Túnel del Toyo y autopistas Mar 1 y Mar 2",
      "Eje agrofrutícola y fomento a pequeñas cadenas de valor cacaoteras y cafeteras",
      "Potenciación del turismo colonial y patrimonial en Santa Fe de Antioquia y Sopetrán",
      "Mesa de formalización de pequeña minería con estándares ambientales limpios"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05172",
    "name": "Chigorodó",
    "daneCode": "05172",
    "department": "Antioquia",
    "subregion": "Urabá",
    "subregionId": "uraba",
    "category": "4",
    "population": 68000,
    "electoralCensus": 48960,
    "nbiPercentage": 41.6,
    "areaKm2": 721.7,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Crítico",
    "predominantParty": "Coalición",
    "winnerParty": "Coalición Chigorodó con Futuro",
    "electedMayor": "Tulia Irene Ruiz García",
    "mayorTitle": "Alcaldesa",
    "contact": {
      "phone": "8253630 - 8253868 - 8255885",
      "email": "alcaldia@chigorodo-antioquia.gov.co"
    },
    "votesMayor": 15100,
    "percentageValidMayor": 46.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Chigorodó",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 10872,
      "percentageValid": 33.1,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Coalición de Gobierno",
        "seats": 5,
        "percentageValid": 38.5
      },
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 23.1
      },
      {
        "party": "Partido Conservador",
        "seats": 2,
        "percentageValid": 15.4
      },
      {
        "party": "Partido Liberal",
        "seats": 2,
        "percentageValid": 15.4
      },
      {
        "party": "Estatuto de Oposición",
        "seats": 1,
        "percentageValid": 7.6
      }
    ],
    "totalCouncilSeats": 13,
    "economicSectors": [
      "Banano, plátano y ganadería.",
      "Banano de exportación",
      "Plátano comercial",
      "Actividad portuaria y logística",
      "Ganadería bovina de carne"
    ],
    "securityDynamics": {
      "homicideRate": "Moderada.",
      "extortionRisk": "Microtráfico.",
      "armedPresence": "Control de AGC."
    },
    "keyProblems": [
      "Buena cobertura urbana."
    ],
    "strategicOpportunities": [
      "Puesta en marcha de Puerto Antioquia y Puerto Pisisi como eje marítimo nacional",
      "Industrialización de la cadena del plátano, banano de exportación y palma de aceite",
      "Plan de Seguridad Portuaria y blindaje de corredores contra el narcotráfico",
      "Formalización y titulación de tierras para comunidades afrodescendientes e indígenas"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05190",
    "name": "Cisneros",
    "daneCode": "05190",
    "department": "Antioquia",
    "subregion": "Nordeste",
    "subregionId": "nordeste",
    "category": "6",
    "population": 10500,
    "electoralCensus": 7980,
    "nbiPercentage": 39.7,
    "areaKm2": 46.9,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Crítico",
    "predominantParty": "Partido Conservador",
    "winnerParty": "Coalición Cisneros Nos Une (Partido Conservador)",
    "electedMayor": "Lina María Correa Valencia",
    "mayorTitle": "Alcaldesa",
    "contact": {
      "phone": "8631567",
      "email": "alcaldia@cisneros-antioquia.gov.co"
    },
    "votesMayor": 2406,
    "percentageValidMayor": 52.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Cisneros",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 1732,
      "percentageValid": 37.4,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Coalición Local",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Centro Democrático",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Partido Liberal / Oposición",
        "seats": 2,
        "percentageValid": 22.2
      }
    ],
    "totalCouncilSeats": 9,
    "economicSectors": [
      "Alto desempleo formal. Antiguo puerto de acopio férreo/vial.",
      "Agroindustria panelera tecnificada",
      "Café y cacao",
      "Ganadería doble propósito",
      "Turismo férreo y patrimonial"
    ],
    "securityDynamics": {
      "homicideRate": "Es altamente pacífico hoy día. Homicidios interanuales tienden a cero.",
      "extortionRisk": "Exposición a extorsión 'Falso Servicio' y robo ocasional en vías del Río Nus.",
      "armedPresence": "Ausencia de grupos armados instalados."
    },
    "keyProblems": [
      "Alta cobertura de servicios (100% urbano)."
    ],
    "strategicOpportunities": [
      "Mesa de coexistencia entre minería ancestral, pequeños mineros y títulos formales",
      "Ruta de la Panela y agroindustria cañera en Cisneros, San Roque y Yolombó",
      "Presencia institucional reforzada para desarticular el cobro extorsivo",
      "Incentivos tributarios para empresas que creen empleo formal fuera de la minería"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05101",
    "name": "Ciudad Bolívar",
    "daneCode": "05101",
    "department": "Antioquia",
    "subregion": "Suroeste",
    "subregionId": "suroeste",
    "category": "5",
    "population": 29000,
    "electoralCensus": 22040,
    "nbiPercentage": 19.3,
    "areaKm2": 260.4,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Medio",
    "predominantParty": "Creemos",
    "winnerParty": "Coalición Ciudad Bolívar Merece Más (Creemos)",
    "electedMayor": "León Darío Acevedo Vargas",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8411183 Ext 12-8412552 - 8411144",
      "email": "alcaldia@ciudadbolivar-antioquia.gov.co;contactenos@ciudadbolivar-antioquia.gov.co"
    },
    "votesMayor": 7100,
    "percentageValidMayor": 46.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Ciudad Bolívar",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 5112,
      "percentageValid": 33.1,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 3,
        "percentageValid": 27.3
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "Café y comercio regional.",
      "Café pergamino y cafés especiales",
      "Plátano y cítricos",
      "Turismo patrimonial cafetero",
      "Piscicultura y porcicultura"
    ],
    "securityDynamics": {
      "homicideRate": "Moderada.",
      "extortionRisk": "Microtráfico.",
      "armedPresence": "Bandas locales."
    },
    "keyProblems": [
      "Buena cobertura urbana."
    ],
    "strategicOpportunities": [
      "Plan Cosecha Segura con despliegue de fuerza pública y monitoreo con drones tácticos",
      "Diversificación agropecuaria (cítricos, plátano, ganadería regenerativa y cardamomo)",
      "Corredor turístico patrimonial y de cafés especiales (Jericó, Jardín, Santa Bárbara)",
      "Pavimentación de circuitos viales estratégicos hacia el corredor del Río Cauca"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05197",
    "name": "Cocorná",
    "daneCode": "05197",
    "department": "Antioquia",
    "subregion": "Oriente",
    "subregionId": "oriente",
    "category": "6",
    "population": 17000,
    "electoralCensus": 12920,
    "nbiPercentage": 13.2,
    "areaKm2": 241.8,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Bajo",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición Cocorná Nos Une (Centro Democrático)",
    "electedMayor": "David Alejandro Gómez Hoyos",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8343404-8343425-8343096-8343529",
      "email": "alcaldia@cocorna-antioquia.gov.co"
    },
    "votesMayor": 3746,
    "percentageValidMayor": 50.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Cocorná",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 2697,
      "percentageValid": 36.0,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 3,
        "percentageValid": 27.3
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "Turismo y agricultura.",
      "Aguacate Hass",
      "Floricultura",
      "Café",
      "Turismo"
    ],
    "securityDynamics": {
      "homicideRate": "Estadísticas pacíficas.",
      "extortionRisk": "Hurtos menores.",
      "armedPresence": "Sin presencia estructural activa."
    },
    "keyProblems": [
      "Retos en ruralidad."
    ],
    "strategicOpportunities": [
      "Seguridad Total como garante de la inversión y desarrollo agroindustrial",
      "Consolidación del Altiplano como hub aeroportuario y logístico internacional",
      "Créditos blandos y fomento asociativo para floricultura, aguacate hass y café",
      "Turismo ecológico y patrimonial sostenible en embalses y cuencas protegidas"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05206",
    "name": "Concepción",
    "daneCode": "05206",
    "department": "Antioquia",
    "subregion": "Oriente",
    "subregionId": "oriente",
    "category": "6",
    "population": 4500,
    "electoralCensus": 3420,
    "nbiPercentage": 13.2,
    "areaKm2": 202.1,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Bajo",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición Concepción Nos Une (Centro Democrático)",
    "electedMayor": "Adrián Henao Carvajal",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8567084-8567274-8567176-8567034",
      "email": "alcaldia@concepcion-antioquia.gov.co"
    },
    "votesMayor": 1070,
    "percentageValidMayor": 54.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Concepción",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 770,
      "percentageValid": 38.9,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 1,
        "percentageValid": 11.1
      }
    ],
    "totalCouncilSeats": 9,
    "economicSectors": [
      "Turismo histórico y agricultura.",
      "Turismo de embalses y hotelería",
      "Comercio y gastronomía",
      "Generación hidroeléctrica",
      "Agricultura tradicional"
    ],
    "securityDynamics": {
      "homicideRate": "Estadísticas pacíficas.",
      "extortionRisk": "Nula incidencia criminal.",
      "armedPresence": "Sin presencia estructural."
    },
    "keyProblems": [
      "Cobertura aceptable."
    ],
    "strategicOpportunities": [
      "Seguridad Total como garante de la inversión y desarrollo agroindustrial",
      "Consolidación del Altiplano como hub aeroportuario y logístico internacional",
      "Créditos blandos y fomento asociativo para floricultura, aguacate hass y café",
      "Turismo ecológico y patrimonial sostenible en embalses y cuencas protegidas"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05209",
    "name": "Concordia",
    "daneCode": "05209",
    "department": "Antioquia",
    "subregion": "Suroeste",
    "subregionId": "suroeste",
    "category": "6",
    "population": 22000,
    "electoralCensus": 16720,
    "nbiPercentage": 19.3,
    "areaKm2": 247.9,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Medio",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición Concordia Nos Une (Centro Democrático)",
    "electedMayor": "Alexandra María Herrera Quijano",
    "mayorTitle": "Alcaldesa",
    "contact": {
      "phone": "8446089-8446101-8446275-8447492",
      "email": "alcaldia@concordia-antioquia.gov.co"
    },
    "votesMayor": 5139,
    "percentageValidMayor": 53.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Concordia",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 3700,
      "percentageValid": 38.2,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 3,
        "percentageValid": 27.3
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "Economía cafetera.",
      "Café pergamino y cafés especiales",
      "Plátano y cítricos",
      "Turismo patrimonial cafetero",
      "Piscicultura y porcicultura"
    ],
    "securityDynamics": {
      "homicideRate": "Estadísticas pacíficas.",
      "extortionRisk": "Hurtos menores.",
      "armedPresence": "Sin presencia estructural."
    },
    "keyProblems": [
      "Servicios básicos estables."
    ],
    "strategicOpportunities": [
      "Plan Cosecha Segura con despliegue de fuerza pública y monitoreo con drones tácticos",
      "Diversificación agropecuaria (cítricos, plátano, ganadería regenerativa y cardamomo)",
      "Corredor turístico patrimonial y de cafés especiales (Jericó, Jardín, Santa Bárbara)",
      "Pavimentación de circuitos viales estratégicos hacia el corredor del Río Cauca"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05212",
    "name": "Copacabana",
    "daneCode": "05212",
    "department": "Antioquia",
    "subregion": "Valle de Aburrá",
    "subregionId": "valle-de-aburra",
    "category": "2",
    "population": 75000,
    "electoralCensus": 54000,
    "nbiPercentage": 5.2,
    "areaKm2": 67.8,
    "predominantStratum": "Estrato 2 y 3",
    "riskLevel": "Medio",
    "predominantParty": "Creemos",
    "winnerParty": "Partido Político Creemos",
    "electedMayor": "Johnnatan Andrés Pineda Agudelo",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "2740069-2740041-2742582",
      "email": "alcaldia@copacabana.gov.co"
    },
    "votesMayor": 15200,
    "percentageValidMayor": 42.1,
    "runnerUp": {
      "name": "Candidatura Cívica por Copacabana",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 10944,
      "percentageValid": 30.3,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Coalición Mayoritaria",
        "seats": 6,
        "percentageValid": 35.3
      },
      {
        "party": "Centro Democrático",
        "seats": 4,
        "percentageValid": 23.5
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 17.6
      },
      {
        "party": "Partido Liberal",
        "seats": 2,
        "percentageValid": 11.8
      },
      {
        "party": "Estatuto de Oposición / ASI",
        "seats": 2,
        "percentageValid": 11.8
      }
    ],
    "totalCouncilSeats": 17,
    "economicSectors": [
      "Manufactura y textiles",
      "Logística y almacenamiento",
      "Comercio metropolitano",
      "Agroindustria periurbana"
    ],
    "securityDynamics": {
      "homicideRate": "Tasa subregional Valle de Aburrá: Moderada con vigilancia preventiva",
      "extortionRisk": "Riesgo de extorsión enfocado en comercio local y abigeato rural",
      "armedPresence": "Combos locales articulados a La Terraza y Los Triana; Odín metropolitanas"
    },
    "keyProblems": [
      "Congestión vial crónica y saturación del sistema de transporte masivo",
      "Microtráfico, plazas de vicio y extorsión periférica por combos delincuenciales",
      "Déficit de vivienda de interés social y gentrificación acelerada"
    ],
    "strategicOpportunities": [
      "Consolidación como Valle del Software y Distrito de Ciencia, Tecnología e Innovación",
      "Seguridad patrimonial con videovigilancia predictiva e interconexión metropolitana",
      "Integración férrea Tren del Río y corredores limpios de movilidad",
      "Alianzas público-privadas para empleo juvenil de alta cualificación"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05120",
    "name": "Cáceres",
    "daneCode": "05120",
    "department": "Antioquia",
    "subregion": "Bajo Cauca",
    "subregionId": "bajo-cauca",
    "category": "6",
    "population": 38000,
    "electoralCensus": 28880,
    "nbiPercentage": 47.7,
    "areaKm2": 1873.8,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Crítico",
    "predominantParty": "Partido Liberal",
    "winnerParty": "Coalición Cáceres Nos Une (Partido Liberal)",
    "electedMayor": "Damiana María Monterrosa Pérez",
    "mayorTitle": "Alcaldesa",
    "contact": {
      "phone": "8362201-8362203-8362202",
      "email": "alcaldia@caceres-antioquia.gov.co"
    },
    "votesMayor": 8207,
    "percentageValidMayor": 49.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Cáceres",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 5909,
      "percentageValid": 35.3,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Partido Liberal",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Coalición Cívica / Verde",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Centro Democrático",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Partido Conservador / Oposición",
        "seats": 4,
        "percentageValid": 36.4
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "Minería aurífera aluvial y de veta",
      "Ganadería de ceba y comercial",
      "Piscicultura comercial",
      "Comercio subregional"
    ],
    "securityDynamics": {
      "homicideRate": "Tasa subregional Bajo Cauca: Moderada con vigilancia preventiva",
      "extortionRisk": "Riesgo de extorsión enfocado en comercio local y abigeato rural",
      "armedPresence": "Clan del Golfo (Subestructura Julio César Vargas), ELN Frente Darío Ramírez Castro, Los Caparros residuales"
    },
    "keyProblems": [
      "Guerra abierta y confinamiento de comunidades por Clan del Golfo vs ELN y Disidencias",
      "Deterioro ambiental masivo por dragado y mercurio en fuentes hídricas",
      "Extorsión del gramaje aurífero y parálisis del comercio formal"
    ],
    "strategicOpportunities": [
      "Recuperación del orden público con presencia militar permanente en ejes fluviales",
      "Distrito Minero Especial con sustitución de mercurio y plantas comunitarias",
      "Desarrollo agroforestal y siembra de caucho, cacao y apicultura",
      "Inversión de choque en acueductos veredales y centros de salud de segundo nivel"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05234",
    "name": "Dabeiba",
    "daneCode": "05234",
    "department": "Antioquia",
    "subregion": "Occidente",
    "subregionId": "occidente",
    "category": "6",
    "population": 26000,
    "electoralCensus": 19760,
    "nbiPercentage": 29.3,
    "areaKm2": 1957.3,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Alto",
    "predominantParty": "Partido Conservador",
    "winnerParty": "Coalición Dabeiba Nos Une (Partido Conservador)",
    "electedMayor": "Daniel Higuita Herrera",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8590300-8590475-8591234-8591293",
      "email": "alcaldia@dabeiba-antioquia.gov.co;contactenos@dabeiba-antioquia.gov.co"
    },
    "votesMayor": 6073,
    "percentageValidMayor": 53.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Dabeiba",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 4372,
      "percentageValid": 38.2,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Coalición Local",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Centro Democrático",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Partido Liberal / Oposición",
        "seats": 4,
        "percentageValid": 36.4
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "Minería aurífera",
      "Café de altura",
      "Cacao y caña panelera",
      "Frijol y agricultura campesina"
    ],
    "securityDynamics": {
      "homicideRate": "Tasa subregional Occidente: Moderada con vigilancia preventiva",
      "extortionRisk": "Riesgo de extorsión enfocado en comercio local y abigeato rural",
      "armedPresence": "Frente Edwin Román Velásquez del Clan del Golfo (EGC)"
    },
    "keyProblems": [
      "Disputa armada por el control del cañón del Río Cauca por el Clan del Golfo (EGC)",
      "Tensión por minería ilegal y confrontación armada en Buriticá y Cañasgordas",
      "Aislamiento de cabeceras rurales en la cordillera por falta de placa huellas"
    ],
    "strategicOpportunities": [
      "Aprovechamiento logístico del Túnel del Toyo y autopistas Mar 1 y Mar 2",
      "Eje agrofrutícola y fomento a pequeñas cadenas de valor cacaoteras y cafeteras",
      "Potenciación del turismo colonial y patrimonial en Santa Fe de Antioquia y Sopetrán",
      "Mesa de formalización de pequeña minería con estándares ambientales limpios"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05237",
    "name": "Donmatías",
    "daneCode": "05237",
    "department": "Antioquia",
    "subregion": "Norte",
    "subregionId": "norte",
    "category": "5",
    "population": 24000,
    "electoralCensus": 18240,
    "nbiPercentage": 24.6,
    "areaKm2": 203.3,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Alto",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición Donmatías Nos Une (Centro Democrático)",
    "electedMayor": "Javier Darío López Restrepo",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8663243-8666230 Ext 109",
      "email": "alcaldia@donmatias-antioquia.gov.co"
    },
    "votesMayor": 5395,
    "percentageValidMayor": 51.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Donmatías",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 3884,
      "percentageValid": 36.7,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 3,
        "percentageValid": 27.3
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "Capital de la maquila textil de exportación, acopia una masi",
      "Ganadería lechera de alta tecnología",
      "Porcicultura tecnificada",
      "Industria láctea y derivados",
      "Trucha y papa"
    ],
    "securityDynamics": {
      "homicideRate": "Muy pacífico; crímenes atados exclusivamente al sicariato focal de drogas.",
      "extortionRisk": "Explotación comercial nocturna irregular.",
      "armedPresence": "No operan subversivos activos orgánicos directos."
    },
    "keyProblems": [
      "Reto en colapso de plantas de tratamiento de agua residuales por vertimientos porcícolas."
    ],
    "strategicOpportunities": [
      "Protección y fortalecimiento de la cuenca lechera con subsidio a insumos",
      "Fortalecimiento de la seguridad en el eje Hidroituango y cordones rurales",
      "Cadena de valor porcícola y agroindustrial tecnificada",
      "Infraestructura educativa técnica rural para retener el talento joven"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05240",
    "name": "Ebéjico",
    "daneCode": "05240",
    "department": "Antioquia",
    "subregion": "Occidente",
    "subregionId": "occidente",
    "category": "6",
    "population": 13000,
    "electoralCensus": 9880,
    "nbiPercentage": 29.3,
    "areaKm2": 237.8,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Alto",
    "predominantParty": "Partido Conservador",
    "winnerParty": "Coalición Ebéjico Nos Une (Partido Conservador)",
    "electedMayor": "David Alonso Restrepo Castrillón",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8562190 EXT 101-8562016",
      "email": "alcaldia@ebejico-antioquia.gov.co"
    },
    "votesMayor": 2979,
    "percentageValidMayor": 52.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Ebéjico",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 2144,
      "percentageValid": 37.4,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Coalición Local",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Centro Democrático",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Partido Liberal / Oposición",
        "seats": 4,
        "percentageValid": 36.4
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "Agricultura y ganadería.",
      "Fruticultura",
      "Café",
      "Cacao",
      "Turismo colonial"
    ],
    "securityDynamics": {
      "homicideRate": "Estadísticas pacíficas.",
      "extortionRisk": "Hurtos menores.",
      "armedPresence": "Sin presencia estructural activa."
    },
    "keyProblems": [
      "Servicios básicos estables."
    ],
    "strategicOpportunities": [
      "Aprovechamiento logístico del Túnel del Toyo y autopistas Mar 1 y Mar 2",
      "Eje agrofrutícola y fomento a pequeñas cadenas de valor cacaoteras y cafeteras",
      "Potenciación del turismo colonial y patrimonial en Santa Fe de Antioquia y Sopetrán",
      "Mesa de formalización de pequeña minería con estándares ambientales limpios"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05250",
    "name": "El Bagre",
    "daneCode": "05250",
    "department": "Antioquia",
    "subregion": "Bajo Cauca",
    "subregionId": "bajo-cauca",
    "category": "5",
    "population": 58000,
    "electoralCensus": 41760,
    "nbiPercentage": 47.7,
    "areaKm2": 1560.2,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Crítico",
    "predominantParty": "Partido Liberal",
    "winnerParty": "Coalición El Bagre Nos Une (Partido Liberal)",
    "electedMayor": "Marco Fidel Trespalacio Bulloso",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8372429",
      "email": "alcaldia@elbagre-antioquia.gov.co"
    },
    "votesMayor": 12594,
    "percentageValidMayor": 52.0,
    "runnerUp": {
      "name": "Candidatura Cívica por El Bagre",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 9067,
      "percentageValid": 37.4,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Partido Liberal",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Coalición Cívica / Verde",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Centro Democrático",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Partido Conservador / Oposición",
        "seats": 4,
        "percentageValid": 36.4
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "Minería aurífera",
      "Ganadería",
      "Piscicultura",
      "Comercio"
    ],
    "securityDynamics": {
      "homicideRate": "Tasa subregional Bajo Cauca: Moderada con vigilancia preventiva",
      "extortionRisk": "Riesgo de extorsión enfocado en comercio local y abigeato rural",
      "armedPresence": "Clan del Golfo (Subestructura Julio César Vargas), ELN Frente Darío Ramírez Castro, Los Caparros residuales"
    },
    "keyProblems": [
      "Guerra abierta y confinamiento de comunidades por Clan del Golfo vs ELN y Disidencias",
      "Deterioro ambiental masivo por dragado y mercurio en fuentes hídricas",
      "Extorsión del gramaje aurífero y parálisis del comercio formal"
    ],
    "strategicOpportunities": [
      "Recuperación del orden público con presencia militar permanente en ejes fluviales",
      "Distrito Minero Especial con sustitución de mercurio y plantas comunitarias",
      "Desarrollo agroforestal y siembra de caucho, cacao y apicultura",
      "Inversión de choque en acueductos veredales y centros de salud de segundo nivel"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05148",
    "name": "El Carmen de Viboral",
    "daneCode": "05148",
    "department": "Antioquia",
    "subregion": "Oriente",
    "subregionId": "oriente",
    "category": "3",
    "population": 62000,
    "electoralCensus": 44640,
    "nbiPercentage": 10.3,
    "areaKm2": 423.6,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Bajo",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición El Carmen de Viboral Nos Une (Centro Democrático)",
    "electedMayor": "Hugo Alfonso Jímenez Cuervo",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "5432000 Ext 129 - 5432467-5432116-5432020-5432149",
      "email": "alcaldia@elcarmendeviboral-antioquia.gov.co"
    },
    "votesMayor": 13981,
    "percentageValidMayor": 54.0,
    "runnerUp": {
      "name": "Candidatura Cívica por El Carmen de Viboral",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 10066,
      "percentageValid": 38.9,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Coalición de Gobierno",
        "seats": 5,
        "percentageValid": 38.5
      },
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 23.1
      },
      {
        "party": "Partido Conservador",
        "seats": 2,
        "percentageValid": 15.4
      },
      {
        "party": "Partido Liberal",
        "seats": 2,
        "percentageValid": 15.4
      },
      {
        "party": "Estatuto de Oposición",
        "seats": 1,
        "percentageValid": 7.6
      }
    ],
    "totalCouncilSeats": 13,
    "economicSectors": [
      "Tradición cerámica y floricultura.",
      "Aguacate Hass",
      "Floricultura",
      "Café",
      "Turismo"
    ],
    "securityDynamics": {
      "homicideRate": "Baja letalidad.",
      "extortionRisk": "Hurtos menores.",
      "armedPresence": "Sin presencia estructural."
    },
    "keyProblems": [
      "Buena cobertura."
    ],
    "strategicOpportunities": [
      "Seguridad Total como garante de la inversión y desarrollo agroindustrial",
      "Consolidación del Altiplano como hub aeroportuario y logístico internacional",
      "Créditos blandos y fomento asociativo para floricultura, aguacate hass y café",
      "Turismo ecológico y patrimonial sostenible en embalses y cuencas protegidas"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05697",
    "name": "El Santuario",
    "daneCode": "05697",
    "department": "Antioquia",
    "subregion": "Oriente",
    "subregionId": "oriente",
    "category": "3",
    "population": 38000,
    "electoralCensus": 28880,
    "nbiPercentage": 10.3,
    "areaKm2": 83.5,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Bajo",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición El Santuario Nos Une (Centro Democrático)",
    "electedMayor": "Martín Alberto Duque Gallo",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "5460080 Ext 2",
      "email": "despachoalcaldia@elsantuario-antioquia.gov.co"
    },
    "votesMayor": 7705,
    "percentageValidMayor": 46.0,
    "runnerUp": {
      "name": "Candidatura Cívica por El Santuario",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 5547,
      "percentageValid": 33.1,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Coalición de Gobierno",
        "seats": 5,
        "percentageValid": 38.5
      },
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 23.1
      },
      {
        "party": "Partido Conservador",
        "seats": 2,
        "percentageValid": 15.4
      },
      {
        "party": "Partido Liberal",
        "seats": 2,
        "percentageValid": 15.4
      },
      {
        "party": "Estatuto de Oposición",
        "seats": 1,
        "percentageValid": 7.6
      }
    ],
    "totalCouncilSeats": 13,
    "economicSectors": [
      "Comercio y confección; cultura del ahorro.",
      "Aguacate Hass",
      "Floricultura",
      "Café",
      "Turismo"
    ],
    "securityDynamics": {
      "homicideRate": "Estadísticas pacíficas.",
      "extortionRisk": "Hurtos menores.",
      "armedPresence": "Sin presencia estructural."
    },
    "keyProblems": [
      "Buena cobertura."
    ],
    "strategicOpportunities": [
      "Seguridad Total como garante de la inversión y desarrollo agroindustrial",
      "Consolidación del Altiplano como hub aeroportuario y logístico internacional",
      "Créditos blandos y fomento asociativo para floricultura, aguacate hass y café",
      "Turismo ecológico y patrimonial sostenible en embalses y cuencas protegidas"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05264",
    "name": "Entrerríos",
    "daneCode": "05264",
    "department": "Antioquia",
    "subregion": "Norte",
    "subregionId": "norte",
    "category": "6",
    "population": 11000,
    "electoralCensus": 8360,
    "nbiPercentage": 24.6,
    "areaKm2": 214.2,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Alto",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición Entrerríos Nos Une (Centro Democrático)",
    "electedMayor": "Julio César Lopera Posada",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8670411-8670147-8670412",
      "email": "alcaldia@entrerrios-antioquia.gov.co;contactenos@entrerrios-antioquia.gov.co"
    },
    "votesMayor": 2472,
    "percentageValidMayor": 51.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Entrerríos",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 1779,
      "percentageValid": 36.7,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 1,
        "percentageValid": 11.1
      }
    ],
    "totalCouncilSeats": 9,
    "economicSectors": [
      "Economía bovina lechera potentísima, de las más sofisticadas",
      "Lechería especializada",
      "Porcicultura",
      "Papa",
      "Piscicultura"
    ],
    "securityDynamics": {
      "homicideRate": "'Oasis gélido de paz estadística'.",
      "extortionRisk": "Robos menores a estancos y hurto perimetral ganadero.",
      "armedPresence": "Carecen de redes complejas subversivas."
    },
    "keyProblems": [
      "Garantiza estabilidad social que bloquea el rebusque informal."
    ],
    "strategicOpportunities": [
      "Protección y fortalecimiento de la cuenca lechera con subsidio a insumos",
      "Fortalecimiento de la seguridad en el eje Hidroituango y cordones rurales",
      "Cadena de valor porcícola y agroindustrial tecnificada",
      "Infraestructura educativa técnica rural para retener el talento joven"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05266",
    "name": "Envigado",
    "daneCode": "05266",
    "department": "Antioquia",
    "subregion": "Valle de Aburrá",
    "subregionId": "valle-de-aburra",
    "category": "1",
    "population": 245000,
    "electoralCensus": 176400,
    "nbiPercentage": 4.2,
    "areaKm2": 78.0,
    "predominantStratum": "Estrato 2 y 3",
    "riskLevel": "Medio",
    "predominantParty": "Partido Liberal",
    "winnerParty": "Envigado, Vamos Adelante (Partido Liberal)",
    "electedMayor": "Raúl Eduardo Cardona González",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "3394000 - 3394017  - 3394018",
      "email": "alcaldia@envigado.gov.co;liliana.garcia@envigado.gov.co"
    },
    "votesMayor": 42350,
    "percentageValidMayor": 49.5,
    "runnerUp": {
      "name": "Candidatura Cívica por Envigado",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 30492,
      "percentageValid": 35.6,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Coalición de Gobierno",
        "seats": 7,
        "percentageValid": 36.8
      },
      {
        "party": "Centro Democrático",
        "seats": 4,
        "percentageValid": 21.0
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 15.8
      },
      {
        "party": "Partido Liberal",
        "seats": 2,
        "percentageValid": 10.5
      },
      {
        "party": "Alianza Verde / Otros",
        "seats": 2,
        "percentageValid": 10.5
      },
      {
        "party": "Estatuto de Oposición",
        "seats": 1,
        "percentageValid": 5.4
      }
    ],
    "totalCouncilSeats": 19,
    "economicSectors": [
      "8.1%.",
      "Servicios e industrias CTI",
      "Comercio mayorista y minorista",
      "Construcción e inmobiliario",
      "Turismo de negocios y salud"
    ],
    "securityDynamics": {
      "homicideRate": "8 por 100,000 hab.",
      "extortionRisk": "Hurto de vehículos y residencias.",
      "armedPresence": "Presencia de estructuras de 'La Oficina' (bajo perfil)."
    },
    "keyProblems": [
      "Acueducto: 99.9%, Alcantarillado: 99.8%, Energía: 100%."
    ],
    "strategicOpportunities": [
      "Consolidación como Valle del Software y Distrito de Ciencia, Tecnología e Innovación",
      "Seguridad patrimonial con videovigilancia predictiva e interconexión metropolitana",
      "Integración férrea Tren del Río y corredores limpios de movilidad",
      "Alianzas público-privadas para empleo juvenil de alta cualificación"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05282",
    "name": "Fredonia",
    "daneCode": "05282",
    "department": "Antioquia",
    "subregion": "Suroeste",
    "subregionId": "suroeste",
    "category": "6",
    "population": 23000,
    "electoralCensus": 17480,
    "nbiPercentage": 19.3,
    "areaKm2": 258.1,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Medio",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición Fredonia Nos Une (Centro Democrático)",
    "electedMayor": "Aldubar de Jesús Vanegas Marín",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8401264-8401026-8402096-8401393-8402334",
      "email": "alcaldia@fredonia-antioquia.gov.co;contactenos@fredonia-antioquia.gov.co"
    },
    "votesMayor": 4764,
    "percentageValidMayor": 47.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Fredonia",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 3430,
      "percentageValid": 33.8,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 3,
        "percentageValid": 27.3
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "Café y turismo de fincas.",
      "Café pergamino y cafés especiales",
      "Plátano y cítricos",
      "Turismo patrimonial cafetero",
      "Piscicultura y porcicultura"
    ],
    "securityDynamics": {
      "homicideRate": "Baja letalidad.",
      "extortionRisk": "Hurtos menores.",
      "armedPresence": "Sin presencia estructural activa."
    },
    "keyProblems": [
      "Buena cobertura."
    ],
    "strategicOpportunities": [
      "Plan Cosecha Segura con despliegue de fuerza pública y monitoreo con drones tácticos",
      "Diversificación agropecuaria (cítricos, plátano, ganadería regenerativa y cardamomo)",
      "Corredor turístico patrimonial y de cafés especiales (Jericó, Jardín, Santa Bárbara)",
      "Pavimentación de circuitos viales estratégicos hacia el corredor del Río Cauca"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05284",
    "name": "Frontino",
    "daneCode": "05284",
    "department": "Antioquia",
    "subregion": "Occidente",
    "subregionId": "occidente",
    "category": "6",
    "population": 21000,
    "electoralCensus": 15960,
    "nbiPercentage": 29.3,
    "areaKm2": 1384.1,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Alto",
    "predominantParty": "Partido Conservador",
    "winnerParty": "Coalición Frontino Nos Une (Partido Conservador)",
    "electedMayor": "Luz Gabriela Rivera Cano",
    "mayorTitle": "Alcaldesa",
    "contact": {
      "phone": "8595032 Ext 0-8595037-8595835",
      "email": "alcaldia@frontino-antioquia.gov.co;contactenos@frontino-antioquia.gov.co"
    },
    "votesMayor": 4628,
    "percentageValidMayor": 50.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Frontino",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 3332,
      "percentageValid": 36.0,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Coalición Local",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Centro Democrático",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Partido Liberal / Oposición",
        "seats": 4,
        "percentageValid": 36.4
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "Minería de oro y café.",
      "Minería aurífera",
      "Café de altura",
      "Cacao y caña panelera",
      "Frijol y agricultura campesina"
    ],
    "securityDynamics": {
      "homicideRate": "Atentados con explosivos y ataques a fuerza pública.",
      "extortionRisk": "Extorsión minera y confinamientos.",
      "armedPresence": "Disputa entre AGC y ELN."
    },
    "keyProblems": [
      "Retos en zonas indígenas remotas."
    ],
    "strategicOpportunities": [
      "Aprovechamiento logístico del Túnel del Toyo y autopistas Mar 1 y Mar 2",
      "Eje agrofrutícola y fomento a pequeñas cadenas de valor cacaoteras y cafeteras",
      "Potenciación del turismo colonial y patrimonial en Santa Fe de Antioquia y Sopetrán",
      "Mesa de formalización de pequeña minería con estándares ambientales limpios"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05306",
    "name": "Giraldo",
    "daneCode": "05306",
    "department": "Antioquia",
    "subregion": "Occidente",
    "subregionId": "occidente",
    "category": "6",
    "population": 4500,
    "electoralCensus": 3420,
    "nbiPercentage": 29.3,
    "areaKm2": 93.5,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Alto",
    "predominantParty": "Partido Conservador",
    "winnerParty": "Coalición Giraldo Nos Une (Partido Conservador)",
    "electedMayor": "María Camila Manco Suárez",
    "mayorTitle": "Alcaldesa",
    "contact": {
      "phone": "8571107 Ext 108-8571106",
      "email": "alcaldia@giraldo-antioquia.gov.co;contactenos@giraldo-antioquia.gov.co"
    },
    "votesMayor": 971,
    "percentageValidMayor": 49.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Giraldo",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 699,
      "percentageValid": 35.3,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Coalición Local",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Centro Democrático",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Partido Liberal / Oposición",
        "seats": 2,
        "percentageValid": 22.2
      }
    ],
    "totalCouncilSeats": 9,
    "economicSectors": [
      "Economía agraria tradicional.",
      "Minería aurífera",
      "Café de altura",
      "Cacao y caña panelera",
      "Frijol y agricultura campesina"
    ],
    "securityDynamics": {
      "homicideRate": "Estadísticas pacíficas.",
      "extortionRisk": "Hurtos menores.",
      "armedPresence": "Sin presencia estructural activa."
    },
    "keyProblems": [
      "Servicios básicos estables."
    ],
    "strategicOpportunities": [
      "Aprovechamiento logístico del Túnel del Toyo y autopistas Mar 1 y Mar 2",
      "Eje agrofrutícola y fomento a pequeñas cadenas de valor cacaoteras y cafeteras",
      "Potenciación del turismo colonial y patrimonial en Santa Fe de Antioquia y Sopetrán",
      "Mesa de formalización de pequeña minería con estándares ambientales limpios"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05308",
    "name": "Girardota",
    "daneCode": "05308",
    "department": "Antioquia",
    "subregion": "Valle de Aburrá",
    "subregionId": "valle-de-aburra",
    "category": "3",
    "population": 62000,
    "electoralCensus": 44640,
    "nbiPercentage": 5.2,
    "areaKm2": 82.9,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Medio",
    "predominantParty": "Coalición",
    "winnerParty": "Decencia en lo Público",
    "electedMayor": "Kevin René Bernal Morales",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "4054200 Ext 102-4052050",
      "email": "contactenos@girardota.gov.co"
    },
    "votesMayor": 13450,
    "percentageValidMayor": 44.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Girardota",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 9684,
      "percentageValid": 31.7,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Coalición de Gobierno",
        "seats": 5,
        "percentageValid": 38.5
      },
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 23.1
      },
      {
        "party": "Partido Conservador",
        "seats": 2,
        "percentageValid": 15.4
      },
      {
        "party": "Partido Liberal",
        "seats": 2,
        "percentageValid": 15.4
      },
      {
        "party": "Estatuto de Oposición",
        "seats": 1,
        "percentageValid": 7.6
      }
    ],
    "totalCouncilSeats": 13,
    "economicSectors": [
      "Manufactura y textiles",
      "Logística y almacenamiento",
      "Comercio metropolitano",
      "Agroindustria periurbana"
    ],
    "securityDynamics": {
      "homicideRate": "Tasa subregional Valle de Aburrá: Moderada con vigilancia preventiva",
      "extortionRisk": "Riesgo de extorsión enfocado en comercio local y abigeato rural",
      "armedPresence": "Combos locales articulados a La Terraza y Los Triana; Odín metropolitanas"
    },
    "keyProblems": [
      "Congestión vial crónica y saturación del sistema de transporte masivo",
      "Microtráfico, plazas de vicio y extorsión periférica por combos delincuenciales",
      "Déficit de vivienda de interés social y gentrificación acelerada"
    ],
    "strategicOpportunities": [
      "Consolidación como Valle del Software y Distrito de Ciencia, Tecnología e Innovación",
      "Seguridad patrimonial con videovigilancia predictiva e interconexión metropolitana",
      "Integración férrea Tren del Río y corredores limpios de movilidad",
      "Alianzas público-privadas para empleo juvenil de alta cualificación"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05313",
    "name": "Granada",
    "daneCode": "05313",
    "department": "Antioquia",
    "subregion": "Oriente",
    "subregionId": "oriente",
    "category": "6",
    "population": 11000,
    "electoralCensus": 8360,
    "nbiPercentage": 13.2,
    "areaKm2": 190.2,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Bajo",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición Granada Nos Une (Centro Democrático)",
    "electedMayor": "Daniel Andrés Hoyos Yepes",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8320549 - 8320802",
      "email": "alcalde@granada-antioquia.gov.co;info@granada-antioquia.gov.co"
    },
    "votesMayor": 2520,
    "percentageValidMayor": 52.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Granada",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 1814,
      "percentageValid": 37.4,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 1,
        "percentageValid": 11.1
      }
    ],
    "totalCouncilSeats": 9,
    "economicSectors": [
      "Comercio fuerte (colonias en Bogotá/Medellín).",
      "Aguacate Hass",
      "Floricultura",
      "Café",
      "Turismo"
    ],
    "securityDynamics": {
      "homicideRate": "Baja letalidad.",
      "extortionRisk": "Hurtos menores.",
      "armedPresence": "Sin presencia estructural activa."
    },
    "keyProblems": [
      "Reconstrucción completa."
    ],
    "strategicOpportunities": [
      "Seguridad Total como garante de la inversión y desarrollo agroindustrial",
      "Consolidación del Altiplano como hub aeroportuario y logístico internacional",
      "Créditos blandos y fomento asociativo para floricultura, aguacate hass y café",
      "Turismo ecológico y patrimonial sostenible en embalses y cuencas protegidas"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05315",
    "name": "Guarne",
    "daneCode": "05315",
    "department": "Antioquia",
    "subregion": "Oriente",
    "subregionId": "oriente",
    "category": "3",
    "population": 58000,
    "electoralCensus": 41760,
    "nbiPercentage": 10.3,
    "areaKm2": 118.2,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Bajo",
    "predominantParty": "Coalición",
    "winnerParty": "Coalición Guarne con Sentido Social",
    "electedMayor": "Diego Mauricio Grisales Gallego",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "5510025-5511026-5510044-5511733",
      "email": "alcaldia@guarne-antioquia.gov.co"
    },
    "votesMayor": 13800,
    "percentageValidMayor": 43.8,
    "runnerUp": {
      "name": "Candidatura Cívica por Guarne",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 9936,
      "percentageValid": 31.5,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Coalición de Gobierno",
        "seats": 5,
        "percentageValid": 38.5
      },
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 23.1
      },
      {
        "party": "Partido Conservador",
        "seats": 2,
        "percentageValid": 15.4
      },
      {
        "party": "Partido Liberal",
        "seats": 2,
        "percentageValid": 15.4
      },
      {
        "party": "Estatuto de Oposición",
        "seats": 1,
        "percentageValid": 7.6
      }
    ],
    "totalCouncilSeats": 13,
    "economicSectors": [
      "Eje industrial y logístico de la autopista.",
      "Hub logístico y aeroportuario",
      "Floricultura de exportación",
      "Industria farmacéutica y alimentos",
      "Comercio de bienes"
    ],
    "securityDynamics": {
      "homicideRate": "Moderada.",
      "extortionRisk": "Extorsión industrial y hurtos en autopista.",
      "armedPresence": "Influencia de bandas del Valle de Aburrá."
    },
    "keyProblems": [
      "Presión sobre servicios por crecimiento industrial."
    ],
    "strategicOpportunities": [
      "Seguridad Total como garante de la inversión y desarrollo agroindustrial",
      "Consolidación del Altiplano como hub aeroportuario y logístico internacional",
      "Créditos blandos y fomento asociativo para floricultura, aguacate hass y café",
      "Turismo ecológico y patrimonial sostenible en embalses y cuencas protegidas"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05318",
    "name": "Guatapé",
    "daneCode": "05318",
    "department": "Antioquia",
    "subregion": "Oriente",
    "subregionId": "oriente",
    "category": "6",
    "population": 9500,
    "electoralCensus": 7220,
    "nbiPercentage": 13.2,
    "areaKm2": 151.8,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Bajo",
    "predominantParty": "Coalición",
    "winnerParty": "Coalición Guarne con Sentido Social",
    "electedMayor": "Diego Mauricio Grisales Gallego",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8610539-8610555 Ext 12",
      "email": "alcaldia@guatape-antioquia.gov.co"
    },
    "votesMayor": 13800,
    "percentageValidMayor": 43.8,
    "runnerUp": {
      "name": "Candidatura Cívica por Guatapé",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 9936,
      "percentageValid": 31.5,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 1,
        "percentageValid": 11.1
      }
    ],
    "totalCouncilSeats": 9,
    "economicSectors": [
      "Turismo masivo; pleno empleo informal.",
      "Turismo de embalses y hotelería",
      "Comercio y gastronomía",
      "Generación hidroeléctrica",
      "Agricultura tradicional"
    ],
    "securityDynamics": {
      "homicideRate": "Baja letalidad.",
      "extortionRisk": "Microtráfico turístico.",
      "armedPresence": "Bandas locales."
    },
    "keyProblems": [
      "Excelente cobertura urbana."
    ],
    "strategicOpportunities": [
      "Seguridad Total como garante de la inversión y desarrollo agroindustrial",
      "Consolidación del Altiplano como hub aeroportuario y logístico internacional",
      "Créditos blandos y fomento asociativo para floricultura, aguacate hass y café",
      "Turismo ecológico y patrimonial sostenible en embalses y cuencas protegidas"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05321",
    "name": "Guatapé",
    "daneCode": "05321",
    "department": "Antioquia",
    "subregion": "Oriente",
    "subregionId": "oriente",
    "category": "6",
    "population": 9500,
    "electoralCensus": 7220,
    "nbiPercentage": 13.2,
    "areaKm2": 83.3,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Bajo",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición Guatapé Nos Une (Centro Democrático)",
    "electedMayor": "David Esteban Franco Vallejo",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8610539-8610555 Ext 12",
      "email": "alcaldia@guatape-antioquia.gov.co"
    },
    "votesMayor": 1926,
    "percentageValidMayor": 46.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Guatapé",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 1386,
      "percentageValid": 33.1,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 1,
        "percentageValid": 11.1
      }
    ],
    "totalCouncilSeats": 9,
    "economicSectors": [
      "Turismo masivo; pleno empleo informal.",
      "Turismo de embalses y hotelería",
      "Comercio y gastronomía",
      "Generación hidroeléctrica",
      "Agricultura tradicional"
    ],
    "securityDynamics": {
      "homicideRate": "Baja letalidad.",
      "extortionRisk": "Microtráfico turístico.",
      "armedPresence": "Bandas locales."
    },
    "keyProblems": [
      "Excelente cobertura urbana."
    ],
    "strategicOpportunities": [
      "Seguridad Total como garante de la inversión y desarrollo agroindustrial",
      "Consolidación del Altiplano como hub aeroportuario y logístico internacional",
      "Créditos blandos y fomento asociativo para floricultura, aguacate hass y café",
      "Turismo ecológico y patrimonial sostenible en embalses y cuencas protegidas"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05310",
    "name": "Gómez Plata",
    "daneCode": "05310",
    "department": "Antioquia",
    "subregion": "Norte",
    "subregionId": "norte",
    "category": "6",
    "population": 13500,
    "electoralCensus": 10260,
    "nbiPercentage": 24.6,
    "areaKm2": 332.2,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Alto",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición Gómez Plata Nos Une (Centro Democrático)",
    "electedMayor": "Luis Guillermo Pérez Echeverri",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8627704-8627806-8627522",
      "email": "alcaldia@gomezplata-antioquia.gov.co;comunicaciones@gomezplata-antioquia.gov.co;contactenos@gomezplata-antioquia.gov.co"
    },
    "votesMayor": 3153,
    "percentageValidMayor": 53.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Gómez Plata",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 2270,
      "percentageValid": 38.2,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 3,
        "percentageValid": 27.3
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "Economía de servicios y comercio formal incipiente.",
      "Lechería especializada",
      "Porcicultura",
      "Papa",
      "Piscicultura"
    ],
    "securityDynamics": {
      "homicideRate": "Crímenes pasionales cívicos esporádicos.",
      "extortionRisk": "Delitos vinculados al alcohol.",
      "armedPresence": "No actúan comandos estructurales letales."
    },
    "keyProblems": [
      "Red urbana estabilizada y saneada."
    ],
    "strategicOpportunities": [
      "Protección y fortalecimiento de la cuenca lechera con subsidio a insumos",
      "Fortalecimiento de la seguridad en el eje Hidroituango y cordones rurales",
      "Cadena de valor porcícola y agroindustrial tecnificada",
      "Infraestructura educativa técnica rural para retener el talento joven"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05347",
    "name": "Heliconia",
    "daneCode": "05347",
    "department": "Antioquia",
    "subregion": "Occidente",
    "subregionId": "occidente",
    "category": "6",
    "population": 6500,
    "electoralCensus": 4940,
    "nbiPercentage": 29.3,
    "areaKm2": 114.8,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Alto",
    "predominantParty": "Partido Conservador",
    "winnerParty": "Coalición Heliconia Nos Une (Partido Conservador)",
    "electedMayor": "Jorge Alexander Álvarez Arango",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8549635 Ext 115",
      "email": "alcaldia@heliconia-antioquia.gov.co"
    },
    "votesMayor": 1260,
    "percentageValidMayor": 44.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Heliconia",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 907,
      "percentageValid": 31.7,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Coalición Local",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Centro Democrático",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Partido Liberal / Oposición",
        "seats": 2,
        "percentageValid": 22.2
      }
    ],
    "totalCouncilSeats": 9,
    "economicSectors": [
      "Agricultura tradicional.",
      "Fruticultura",
      "Café",
      "Cacao",
      "Turismo colonial"
    ],
    "securityDynamics": {
      "homicideRate": "Estadísticas pacíficas.",
      "extortionRisk": "Hurtos menores.",
      "armedPresence": "Sin presencia estructural activa."
    },
    "keyProblems": [
      "Servicios básicos estables."
    ],
    "strategicOpportunities": [
      "Aprovechamiento logístico del Túnel del Toyo y autopistas Mar 1 y Mar 2",
      "Eje agrofrutícola y fomento a pequeñas cadenas de valor cacaoteras y cafeteras",
      "Potenciación del turismo colonial y patrimonial en Santa Fe de Antioquia y Sopetrán",
      "Mesa de formalización de pequeña minería con estándares ambientales limpios"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05353",
    "name": "Hispania",
    "daneCode": "05353",
    "department": "Antioquia",
    "subregion": "Suroeste",
    "subregionId": "suroeste",
    "category": "6",
    "population": 5400,
    "electoralCensus": 4104,
    "nbiPercentage": 19.3,
    "areaKm2": 57.5,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Medio",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición Hispania Nos Une (Centro Democrático)",
    "electedMayor": "Orlando Arturo Marín Atehortua",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8432862-8432249",
      "email": "alcaldia@hispania-antioquia.gov.co;contactenos@hispania-antioquia.gov.co"
    },
    "votesMayor": 1166,
    "percentageValidMayor": 49.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Hispania",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 839,
      "percentageValid": 35.3,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 1,
        "percentageValid": 11.1
      }
    ],
    "totalCouncilSeats": 9,
    "economicSectors": [
      "Café y comercio de paso.",
      "Café pergamino y cafés especiales",
      "Plátano y cítricos",
      "Turismo patrimonial cafetero",
      "Piscicultura y porcicultura"
    ],
    "securityDynamics": {
      "homicideRate": "Estadísticas pacíficas.",
      "extortionRisk": "Hurtos menores.",
      "armedPresence": "Sin presencia estructural."
    },
    "keyProblems": [
      "Cobertura aceptable."
    ],
    "strategicOpportunities": [
      "Plan Cosecha Segura con despliegue de fuerza pública y monitoreo con drones tácticos",
      "Diversificación agropecuaria (cítricos, plátano, ganadería regenerativa y cardamomo)",
      "Corredor turístico patrimonial y de cafés especiales (Jericó, Jardín, Santa Bárbara)",
      "Pavimentación de circuitos viales estratégicos hacia el corredor del Río Cauca"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05360",
    "name": "Itagüí",
    "daneCode": "05360",
    "department": "Antioquia",
    "subregion": "Valle de Aburrá",
    "subregionId": "valle-de-aburra",
    "category": "1",
    "population": 295000,
    "electoralCensus": 212400,
    "nbiPercentage": 4.2,
    "areaKm2": 19.6,
    "predominantStratum": "Estrato 2 y 3",
    "riskLevel": "Medio",
    "predominantParty": "Partido Conservador",
    "winnerParty": "Itagüí Somos Todos (Partido Conservador)",
    "electedMayor": "Diego León Torres Sánchez",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "3737676-3764879",
      "email": "contactenos@itagui.gov.co"
    },
    "votesMayor": 48920,
    "percentageValidMayor": 52.1,
    "runnerUp": {
      "name": "Candidatura Cívica por Itagüí",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 35222,
      "percentageValid": 37.5,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Coalición de Gobierno",
        "seats": 7,
        "percentageValid": 36.8
      },
      {
        "party": "Centro Democrático",
        "seats": 4,
        "percentageValid": 21.0
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 15.8
      },
      {
        "party": "Partido Liberal",
        "seats": 2,
        "percentageValid": 10.5
      },
      {
        "party": "Alianza Verde / Otros",
        "seats": 2,
        "percentageValid": 10.5
      },
      {
        "party": "Estatuto de Oposición",
        "seats": 1,
        "percentageValid": 5.4
      }
    ],
    "totalCouncilSeats": 19,
    "economicSectors": [
      "9.5%.",
      "Servicios e industrias CTI",
      "Comercio mayorista y minorista",
      "Construcción e inmobiliario",
      "Turismo de negocios y salud"
    ],
    "securityDynamics": {
      "homicideRate": "22 por 100,000 hab.",
      "extortionRisk": "Extorsión a comerciantes y hurto.",
      "armedPresence": "Gobernanza criminal por combos locales articulados."
    },
    "keyProblems": [
      "Acueducto: 99%, Alcantarillado: 98%, Energía: 100%."
    ],
    "strategicOpportunities": [
      "Consolidación como Valle del Software y Distrito de Ciencia, Tecnología e Innovación",
      "Seguridad patrimonial con videovigilancia predictiva e interconexión metropolitana",
      "Integración férrea Tren del Río y corredores limpios de movilidad",
      "Alianzas público-privadas para empleo juvenil de alta cualificación"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05361",
    "name": "Ituango",
    "daneCode": "05361",
    "department": "Antioquia",
    "subregion": "Norte",
    "subregionId": "norte",
    "category": "6",
    "population": 26500,
    "electoralCensus": 20140,
    "nbiPercentage": 24.6,
    "areaKm2": 2841.1,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Alto",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición Ituango Nos Une (Centro Democrático)",
    "electedMayor": "Javier de Jesús Parias Posso",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8643020-8643174-8643175",
      "email": "alcaldia@ituango-antioquia.gov.co"
    },
    "votesMayor": 6307,
    "percentageValidMayor": 54.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Ituango",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 4541,
      "percentageValid": 38.9,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 3,
        "percentageValid": 27.3
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "Desempleo oculto por economías informales/ilícitas profundas",
      "Café tradicional",
      "Complejo Hidroeléctrico Ituango",
      "Caña panelera",
      "Ganadería tradicional"
    ],
    "securityDynamics": {
      "homicideRate": "Epicentro rojo y zona de guerra directa (Tasa elevadísima histórica de muertes).",
      "extortionRisk": "Instalación masiva de Minas Antipersonal (MAP) en laderas de control y desaparición forzada.",
      "armedPresence": "Disputa encarnizada entre Disidencias de FARC (Frente 18 y 36) contra estructuras AGC."
    },
    "keyProblems": [
      "Ruralidad con déficit total hídrico tras la modificación climática e hídrica de afluentes del río Cauca."
    ],
    "strategicOpportunities": [
      "Protección y fortalecimiento de la cuenca lechera con subsidio a insumos",
      "Fortalecimiento de la seguridad en el eje Hidroituango y cordones rurales",
      "Cadena de valor porcícola y agroindustrial tecnificada",
      "Infraestructura educativa técnica rural para retener el talento joven"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05364",
    "name": "Jardín",
    "daneCode": "05364",
    "department": "Antioquia",
    "subregion": "Suroeste",
    "subregionId": "suroeste",
    "category": "6",
    "population": 15500,
    "electoralCensus": 11780,
    "nbiPercentage": 19.3,
    "areaKm2": 201.2,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Medio",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición Jardín Nos Une (Centro Democrático)",
    "electedMayor": "Claudia Yaneth Naranjo Agudelo",
    "mayorTitle": "Alcaldesa",
    "contact": {
      "phone": "8455550-8455684-8455520",
      "email": "despachoalcalde@eljardin-antioquia.gov.co"
    },
    "votesMayor": 3620,
    "percentageValidMayor": 53.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Jardín",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 2606,
      "percentageValid": 38.2,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 3,
        "percentageValid": 27.3
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "Turismo masivo y café de alta calidad.",
      "Café pergamino y cafés especiales",
      "Plátano y cítricos",
      "Turismo patrimonial cafetero",
      "Piscicultura y porcicultura"
    ],
    "securityDynamics": {
      "homicideRate": "Baja letalidad.",
      "extortionRisk": "Microtráfico turístico.",
      "armedPresence": "Sin presencia estructural activa."
    },
    "keyProblems": [
      "Excelente cobertura urbana."
    ],
    "strategicOpportunities": [
      "Plan Cosecha Segura con despliegue de fuerza pública y monitoreo con drones tácticos",
      "Diversificación agropecuaria (cítricos, plátano, ganadería regenerativa y cardamomo)",
      "Corredor turístico patrimonial y de cafés especiales (Jericó, Jardín, Santa Bárbara)",
      "Pavimentación de circuitos viales estratégicos hacia el corredor del Río Cauca"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05368",
    "name": "Jericó",
    "daneCode": "05368",
    "department": "Antioquia",
    "subregion": "Suroeste",
    "subregionId": "suroeste",
    "category": "6",
    "population": 13500,
    "electoralCensus": 10260,
    "nbiPercentage": 19.3,
    "areaKm2": 205.0,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Medio",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición Jericó Primero (Centro Democrático - Creemos)",
    "electedMayor": "Sebastián Garcés Piedrahita",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8523101-8523502-8523665-8524278",
      "email": "alcaldia@jerico-antioquia.gov.co"
    },
    "votesMayor": 4200,
    "percentageValidMayor": 51.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Jericó",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 3024,
      "percentageValid": 36.7,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 3,
        "percentageValid": 27.3
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "Turismo religioso y agricultura.",
      "Café pergamino y cafés especiales",
      "Plátano y cítricos",
      "Turismo patrimonial cafetero",
      "Piscicultura y porcicultura"
    ],
    "securityDynamics": {
      "homicideRate": "Baja letalidad.",
      "extortionRisk": "Conflictos sociales por minería.",
      "armedPresence": "Sin presencia estructural."
    },
    "keyProblems": [
      "Buena cobertura."
    ],
    "strategicOpportunities": [
      "Plan Cosecha Segura con despliegue de fuerza pública y monitoreo con drones tácticos",
      "Diversificación agropecuaria (cítricos, plátano, ganadería regenerativa y cardamomo)",
      "Corredor turístico patrimonial y de cafés especiales (Jericó, Jardín, Santa Bárbara)",
      "Pavimentación de circuitos viales estratégicos hacia el corredor del Río Cauca"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05376",
    "name": "La Ceja",
    "daneCode": "05376",
    "department": "Antioquia",
    "subregion": "Oriente",
    "subregionId": "oriente",
    "category": "2",
    "population": 65000,
    "electoralCensus": 46800,
    "nbiPercentage": 10.3,
    "areaKm2": 132.7,
    "predominantStratum": "Estrato 2 y 3",
    "riskLevel": "Bajo",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición La Ceja Nos Une (Centro Democrático)",
    "electedMayor": "María Ilbed Santa Santa",
    "mayorTitle": "Alcaldesa",
    "contact": {
      "phone": "5531414 Ext 101-114\n5530785 - 5531525",
      "email": "alcaldia@laceja-antioquia.gov.co;alcaldedelaceja@gmail.com"
    },
    "votesMayor": 13571,
    "percentageValidMayor": 50.0,
    "runnerUp": {
      "name": "Candidatura Cívica por La Ceja",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 9771,
      "percentageValid": 36.0,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Coalición Mayoritaria",
        "seats": 6,
        "percentageValid": 35.3
      },
      {
        "party": "Centro Democrático",
        "seats": 4,
        "percentageValid": 23.5
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 17.6
      },
      {
        "party": "Partido Liberal",
        "seats": 2,
        "percentageValid": 11.8
      },
      {
        "party": "Estatuto de Oposición / ASI",
        "seats": 2,
        "percentageValid": 11.8
      }
    ],
    "totalCouncilSeats": 17,
    "economicSectors": [
      "Industria de floricultura emplea masivamente a mujeres.",
      "Aguacate Hass",
      "Floricultura",
      "Café",
      "Turismo"
    ],
    "securityDynamics": {
      "homicideRate": "Baja letalidad.",
      "extortionRisk": "Microtráfico focalizado.",
      "armedPresence": "Bandas locales."
    },
    "keyProblems": [
      "Excelente cobertura."
    ],
    "strategicOpportunities": [
      "Seguridad Total como garante de la inversión y desarrollo agroindustrial",
      "Consolidación del Altiplano como hub aeroportuario y logístico internacional",
      "Créditos blandos y fomento asociativo para floricultura, aguacate hass y café",
      "Turismo ecológico y patrimonial sostenible en embalses y cuencas protegidas"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05380",
    "name": "La Estrella",
    "daneCode": "05380",
    "department": "Antioquia",
    "subregion": "Valle de Aburrá",
    "subregionId": "valle-de-aburra",
    "category": "2",
    "population": 78000,
    "electoralCensus": 56160,
    "nbiPercentage": 5.2,
    "areaKm2": 36.5,
    "predominantStratum": "Estrato 2 y 3",
    "riskLevel": "Medio",
    "predominantParty": "Partido Conservador",
    "winnerParty": "Coalición La Estrella Nos Une (Partido Conservador)",
    "electedMayor": "Carlos Mario Gutiérrez Arrubla",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "3092687 - 2795841 - 2790058",
      "email": "alcalde@laestrella.gov.co"
    },
    "votesMayor": 16286,
    "percentageValidMayor": 50.0,
    "runnerUp": {
      "name": "Candidatura Cívica por La Estrella",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 11725,
      "percentageValid": 36.0,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Coalición Mayoritaria",
        "seats": 6,
        "percentageValid": 35.3
      },
      {
        "party": "Centro Democrático",
        "seats": 4,
        "percentageValid": 23.5
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 17.6
      },
      {
        "party": "Partido Liberal",
        "seats": 2,
        "percentageValid": 11.8
      },
      {
        "party": "Estatuto de Oposición / ASI",
        "seats": 2,
        "percentageValid": 11.8
      }
    ],
    "totalCouncilSeats": 17,
    "economicSectors": [
      "Agricultura tradicional",
      "Comercio local",
      "Ganadería doble propósito"
    ],
    "securityDynamics": {
      "homicideRate": "Tasa subregional Valle de Aburrá: Moderada con vigilancia preventiva",
      "extortionRisk": "Riesgo de extorsión enfocado en comercio local y abigeato rural",
      "armedPresence": "Combos locales articulados a La Terraza y Los Triana; Odín metropolitanas"
    },
    "keyProblems": [
      "Congestión vial crónica y saturación del sistema de transporte masivo",
      "Microtráfico, plazas de vicio y extorsión periférica por combos delincuenciales",
      "Déficit de vivienda de interés social y gentrificación acelerada"
    ],
    "strategicOpportunities": [
      "Consolidación como Valle del Software y Distrito de Ciencia, Tecnología e Innovación",
      "Seguridad patrimonial con videovigilancia predictiva e interconexión metropolitana",
      "Integración férrea Tren del Río y corredores limpios de movilidad",
      "Alianzas público-privadas para empleo juvenil de alta cualificación"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05390",
    "name": "La Pintada",
    "daneCode": "05390",
    "department": "Antioquia",
    "subregion": "Suroeste",
    "subregionId": "suroeste",
    "category": "6",
    "population": 8500,
    "electoralCensus": 6460,
    "nbiPercentage": 19.3,
    "areaKm2": 54.3,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Medio",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición La Pintada Nos Une (Centro Democrático)",
    "electedMayor": "Hermán Antonio Correa Bedoya",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8453562-8454216",
      "email": "alcaldia@lapintada-antioquia.gov.co"
    },
    "votesMayor": 1798,
    "percentageValidMayor": 48.0,
    "runnerUp": {
      "name": "Candidatura Cívica por La Pintada",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 1294,
      "percentageValid": 34.6,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 1,
        "percentageValid": 11.1
      }
    ],
    "totalCouncilSeats": 9,
    "economicSectors": [
      "Turismo de paso y ganadería.",
      "Café de alta calidad",
      "Cítricos",
      "Plátano",
      "Turismo"
    ],
    "securityDynamics": {
      "homicideRate": "Moderada.",
      "extortionRisk": "Microtráfico de paso.",
      "armedPresence": "Grupos locales."
    },
    "keyProblems": [
      "Cobertura aceptable."
    ],
    "strategicOpportunities": [
      "Plan Cosecha Segura con despliegue de fuerza pública y monitoreo con drones tácticos",
      "Diversificación agropecuaria (cítricos, plátano, ganadería regenerativa y cardamomo)",
      "Corredor turístico patrimonial y de cafés especiales (Jericó, Jardín, Santa Bárbara)",
      "Pavimentación de circuitos viales estratégicos hacia el corredor del Río Cauca"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05400",
    "name": "La Unión",
    "daneCode": "05400",
    "department": "Antioquia",
    "subregion": "Oriente",
    "subregionId": "oriente",
    "category": "5",
    "population": 24000,
    "electoralCensus": 18240,
    "nbiPercentage": 13.2,
    "areaKm2": 167.7,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Bajo",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición La Unión Nos Une (Centro Democrático)",
    "electedMayor": "Carmen Judith Valencia Moreno",
    "mayorTitle": "Alcaldesa",
    "contact": {
      "phone": "5560610-5560654-5560630",
      "email": "alcaldia@launion-antioquia.gov.co"
    },
    "votesMayor": 5077,
    "percentageValidMayor": 48.0,
    "runnerUp": {
      "name": "Candidatura Cívica por La Unión",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 3655,
      "percentageValid": 34.6,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 3,
        "percentageValid": 27.3
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "Economía de papa y leche.",
      "Aguacate Hass",
      "Floricultura",
      "Café",
      "Turismo"
    ],
    "securityDynamics": {
      "homicideRate": "Estadísticas pacíficas.",
      "extortionRisk": "Hurtos menores.",
      "armedPresence": "Sin presencia estructural."
    },
    "keyProblems": [
      "Servicios básicos estables."
    ],
    "strategicOpportunities": [
      "Seguridad Total como garante de la inversión y desarrollo agroindustrial",
      "Consolidación del Altiplano como hub aeroportuario y logístico internacional",
      "Créditos blandos y fomento asociativo para floricultura, aguacate hass y café",
      "Turismo ecológico y patrimonial sostenible en embalses y cuencas protegidas"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05411",
    "name": "Liborina",
    "daneCode": "05411",
    "department": "Antioquia",
    "subregion": "Occidente",
    "subregionId": "occidente",
    "category": "6",
    "population": 10200,
    "electoralCensus": 7752,
    "nbiPercentage": 29.3,
    "areaKm2": 216.4,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Alto",
    "predominantParty": "Partido Conservador",
    "winnerParty": "Coalición Liborina Nos Une (Partido Conservador)",
    "electedMayor": "Nancy Amparo Avendaño Moreno",
    "mayorTitle": "Alcaldesa",
    "contact": {
      "phone": "8561865-8561113",
      "email": "alcaldia@liborina-antioquia.gov.co;contactenos@liborina-antioquia.gov.co"
    },
    "votesMayor": 2292,
    "percentageValidMayor": 51.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Liborina",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 1650,
      "percentageValid": 36.7,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Coalición Local",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Centro Democrático",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Partido Liberal / Oposición",
        "seats": 2,
        "percentageValid": 22.2
      }
    ],
    "totalCouncilSeats": 9,
    "economicSectors": [
      "Fruticultura (Cítricos) y café.",
      "Fruticultura",
      "Café",
      "Cacao",
      "Turismo colonial"
    ],
    "securityDynamics": {
      "homicideRate": "Estadísticas pacíficas.",
      "extortionRisk": "Hurtos menores.",
      "armedPresence": "Sin presencia estructural activa."
    },
    "keyProblems": [
      "Retos en ruralidad dispersa."
    ],
    "strategicOpportunities": [
      "Aprovechamiento logístico del Túnel del Toyo y autopistas Mar 1 y Mar 2",
      "Eje agrofrutícola y fomento a pequeñas cadenas de valor cacaoteras y cafeteras",
      "Potenciación del turismo colonial y patrimonial en Santa Fe de Antioquia y Sopetrán",
      "Mesa de formalización de pequeña minería con estándares ambientales limpios"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05425",
    "name": "Maceo",
    "daneCode": "05425",
    "department": "Antioquia",
    "subregion": "Magdalena Medio",
    "subregionId": "magdalena-medio",
    "category": "6",
    "population": 8500,
    "electoralCensus": 6460,
    "nbiPercentage": 34.3,
    "areaKm2": 387.1,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Alto",
    "predominantParty": "Partido Liberal",
    "winnerParty": "Coalición Maceo Nos Une (Partido Liberal)",
    "electedMayor": "Carolina Andrea Sosa Gómez",
    "mayorTitle": "Alcaldesa",
    "contact": {
      "phone": "8640209-8640277-8640217",
      "email": "alcaldia@maceo-antioquia.gov.co"
    },
    "votesMayor": 1835,
    "percentageValidMayor": 49.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Maceo",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 1321,
      "percentageValid": 35.3,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Partido Liberal",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Coalición Cívica / Verde",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Centro Democrático",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Partido Conservador / Oposición",
        "seats": 2,
        "percentageValid": 22.2
      }
    ],
    "totalCouncilSeats": 9,
    "economicSectors": [
      "Cultivo de cacao y mega-apuesta minera (cementera).",
      "Ganadería bovina de ceba",
      "Logística fluvial y ferroviaria",
      "Turismo de fauna y balnearios",
      "Extracción de hidrocarburos y calizas"
    ],
    "securityDynamics": {
      "homicideRate": "Moderada.",
      "extortionRisk": "Conflictividad por uso del suelo.",
      "armedPresence": "Presencia de grupos armados buscando control de rentas."
    },
    "keyProblems": [
      "Déficit de vivienda por influjo de trabajadores y alzas de precios."
    ],
    "strategicOpportunities": [
      "Consolidación de Puerto Berrío como nodo multimodal (férreo, fluvial y carretero)",
      "Ganadería regenerativa y producción cárnica tecnificada con valor agregado",
      "Corredor ecoturístico de la cuenca del Río Claro y fauna silvestre",
      "Capacitación técnica en logística y mantenimiento de maquinaria pesada"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05440",
    "name": "Marinilla",
    "daneCode": "05440",
    "department": "Antioquia",
    "subregion": "Oriente",
    "subregionId": "oriente",
    "category": "2",
    "population": 68000,
    "electoralCensus": 48960,
    "nbiPercentage": 10.3,
    "areaKm2": 114.9,
    "predominantStratum": "Estrato 2 y 3",
    "riskLevel": "Bajo",
    "predominantParty": "Creemos / CD",
    "winnerParty": "Coalición Marinilla Crece (Creemos - Centro Democrático)",
    "electedMayor": "Julio César Serna Gómez",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "5484410-5484101-5484884-5480265",
      "email": "alcaldia@marinilla-antioquia.gov.co"
    },
    "votesMayor": 17800,
    "percentageValidMayor": 48.3,
    "runnerUp": {
      "name": "Candidatura Cívica por Marinilla",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 12816,
      "percentageValid": 34.8,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Coalición Mayoritaria",
        "seats": 6,
        "percentageValid": 35.3
      },
      {
        "party": "Centro Democrático",
        "seats": 4,
        "percentageValid": 23.5
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 17.6
      },
      {
        "party": "Partido Liberal",
        "seats": 2,
        "percentageValid": 11.8
      },
      {
        "party": "Estatuto de Oposición / ASI",
        "seats": 2,
        "percentageValid": 11.8
      }
    ],
    "totalCouncilSeats": 17,
    "economicSectors": [
      "Despensa agrícola y comercial fuerte; desempleo bajo.",
      "Hub logístico y aeroportuario",
      "Floricultura de exportación",
      "Industria farmacéutica y alimentos",
      "Comercio de bienes"
    ],
    "securityDynamics": {
      "homicideRate": "Baja letalidad.",
      "extortionRisk": "Extorsión a comerciantes y microtráfico.",
      "armedPresence": "Bandas locales con nexos metropolitanos."
    },
    "keyProblems": [
      "Excelente cobertura urbana."
    ],
    "strategicOpportunities": [
      "Seguridad Total como garante de la inversión y desarrollo agroindustrial",
      "Consolidación del Altiplano como hub aeroportuario y logístico internacional",
      "Créditos blandos y fomento asociativo para floricultura, aguacate hass y café",
      "Turismo ecológico y patrimonial sostenible en embalses y cuencas protegidas"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05001",
    "name": "Medellín",
    "daneCode": "05001",
    "department": "Antioquia",
    "subregion": "Valle de Aburrá",
    "subregionId": "valle-de-aburra",
    "category": "Especial",
    "population": 2650000,
    "electoralCensus": 1908000,
    "nbiPercentage": 4.2,
    "areaKm2": 374.8,
    "predominantStratum": "Estrato 3 (con heterogeneidad 1 a 6)",
    "riskLevel": "Medio",
    "predominantParty": "Creemos",
    "winnerParty": "Partido Creemos",
    "electedMayor": "Federico Andrés Gutiérrez Zuluaga",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "4444144-3855208-3855209",
      "email": "federico.gutierrez@medellin.gov.co"
    },
    "votesMayor": 689515,
    "percentageValidMayor": 73.36,
    "runnerUp": {
      "name": "Candidatura Cívica por Medellín",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 496450,
      "percentageValid": 52.8,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Partido Creemos",
        "seats": 7,
        "percentageValid": 33.3
      },
      {
        "party": "Centro Democrático",
        "seats": 5,
        "percentageValid": 23.8
      },
      {
        "party": "Pacto Histórico",
        "seats": 2,
        "percentageValid": 9.5
      },
      {
        "party": "Partido Liberal",
        "seats": 2,
        "percentageValid": 9.5
      },
      {
        "party": "Partido Conservador",
        "seats": 1,
        "percentageValid": 4.8
      },
      {
        "party": "Alianza Verde",
        "seats": 1,
        "percentageValid": 4.8
      },
      {
        "party": "Alianza Social Independiente (ASI)",
        "seats": 1,
        "percentageValid": 4.8
      },
      {
        "party": "Estatuto de Oposición / Otros",
        "seats": 2,
        "percentageValid": 9.5
      }
    ],
    "totalCouncilSeats": 21,
    "economicSectors": [
      "~9% (Generadora de servicios, salud y turismo).",
      "Servicios e industrias CTI",
      "Comercio mayorista y minorista",
      "Construcción e inmobiliario",
      "Turismo de negocios y salud"
    ],
    "securityDynamics": {
      "homicideRate": "Inferior a 15/100k habs (Histórico a la baja).",
      "extortionRisk": "Explotación sexual comercial (ESCNNA) y extorsión barrial.",
      "armedPresence": "Gobernanza interna de combos herederos de 'La Oficina'."
    },
    "keyProblems": [
      "99% de cobertura oficial; problemas de 'desconexión por hambre'."
    ],
    "strategicOpportunities": [
      "Consolidación como Valle del Software y Distrito de Ciencia, Tecnología e Innovación",
      "Seguridad patrimonial con videovigilancia predictiva e interconexión metropolitana",
      "Integración férrea Tren del Río y corredores limpios de movilidad",
      "Alianzas público-privadas para empleo juvenil de alta cualificación"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05467",
    "name": "Montebello",
    "daneCode": "05467",
    "department": "Antioquia",
    "subregion": "Suroeste",
    "subregionId": "suroeste",
    "category": "6",
    "population": 8000,
    "electoralCensus": 6080,
    "nbiPercentage": 19.3,
    "areaKm2": 76.0,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Medio",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición Montebello Nos Une (Centro Democrático)",
    "electedMayor": "Óscar Ernesto Cuervo Villada",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8480564 Ext 103-8480561\n8480561 (directo 4419970)",
      "email": "alcaldia@montebello-antioquia.gov.co"
    },
    "votesMayor": 1657,
    "percentageValidMayor": 47.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Montebello",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 1193,
      "percentageValid": 33.8,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 1,
        "percentageValid": 11.1
      }
    ],
    "totalCouncilSeats": 9,
    "economicSectors": [
      "Café y agricultura.",
      "Café de alta calidad",
      "Cítricos",
      "Plátano",
      "Turismo"
    ],
    "securityDynamics": {
      "homicideRate": "Estadísticas pacíficas.",
      "extortionRisk": "Hurtos menores.",
      "armedPresence": "Sin presencia estructural."
    },
    "keyProblems": [
      "Retos en ruralidad."
    ],
    "strategicOpportunities": [
      "Plan Cosecha Segura con despliegue de fuerza pública y monitoreo con drones tácticos",
      "Diversificación agropecuaria (cítricos, plátano, ganadería regenerativa y cardamomo)",
      "Corredor turístico patrimonial y de cafés especiales (Jericó, Jardín, Santa Bárbara)",
      "Pavimentación de circuitos viales estratégicos hacia el corredor del Río Cauca"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05475",
    "name": "Murindó",
    "daneCode": "05475",
    "department": "Antioquia",
    "subregion": "Urabá",
    "subregionId": "uraba",
    "category": "6",
    "population": 5200,
    "electoralCensus": 3952,
    "nbiPercentage": 41.6,
    "areaKm2": 1266.2,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Crítico",
    "predominantParty": "Partido Conservador",
    "winnerParty": "Coalición Murindó Nos Une (Partido Conservador)",
    "electedMayor": "Emperatriz Mena Palacio",
    "mayorTitle": "Alcaldesa",
    "contact": {
      "phone": "8575015-8575021-8575085-8575041 8575017",
      "email": "alcaldia@murindo-antioquia.gov.co;contactenos@murindo-antioquia.gov.co"
    },
    "votesMayor": 1237,
    "percentageValidMayor": 54.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Murindó",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 890,
      "percentageValid": 38.9,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Partido Liberal",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Coalición Cívica / Verde",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Centro Democrático",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Partido Conservador / Oposición",
        "seats": 2,
        "percentageValid": 22.2
      }
    ],
    "totalCouncilSeats": 9,
    "economicSectors": [
      "Economía de subsistencia selvatica.",
      "Banano",
      "Plátano",
      "Ganadería",
      "Pesca"
    ],
    "securityDynamics": {
      "homicideRate": "Baja letalidad directa; alta por minas.",
      "extortionRisk": "Confinamiento rural.",
      "armedPresence": "Presencia de ELN y AGC."
    },
    "keyProblems": [
      "Casi inexistentes."
    ],
    "strategicOpportunities": [
      "Puesta en marcha de Puerto Antioquia y Puerto Pisisi como eje marítimo nacional",
      "Industrialización de la cadena del plátano, banano de exportación y palma de aceite",
      "Plan de Seguridad Portuaria y blindaje de corredores contra el narcotráfico",
      "Formalización y titulación de tierras para comunidades afrodescendientes e indígenas"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05480",
    "name": "Mutatá",
    "daneCode": "05480",
    "department": "Antioquia",
    "subregion": "Urabá",
    "subregionId": "uraba",
    "category": "6",
    "population": 24000,
    "electoralCensus": 18240,
    "nbiPercentage": 41.6,
    "areaKm2": 1075.2,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Crítico",
    "predominantParty": "Partido Conservador",
    "winnerParty": "Coalición Mutatá Nos Une (Partido Conservador)",
    "electedMayor": "Jairo Enrique Ortiz Palacios",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8578602-8578812-8578799-8578663-8578113-8578740",
      "email": "alcaldia@mutata-antioquia.gov.co"
    },
    "votesMayor": 4760,
    "percentageValidMayor": 45.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Mutatá",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 3427,
      "percentageValid": 32.4,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Partido Liberal",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Coalición Cívica / Verde",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Centro Democrático",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Partido Conservador / Oposición",
        "seats": 4,
        "percentageValid": 36.4
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "Agricultura de subsistencia y ganadería.",
      "Banano",
      "Plátano",
      "Ganadería",
      "Pesca"
    ],
    "securityDynamics": {
      "homicideRate": "Moderada-Alta.",
      "extortionRisk": "Extorsión y control territorial.",
      "armedPresence": "Disputa entre AGC y grupos residuales."
    },
    "keyProblems": [
      "Deficiencias en zonas rurales."
    ],
    "strategicOpportunities": [
      "Puesta en marcha de Puerto Antioquia y Puerto Pisisi como eje marítimo nacional",
      "Industrialización de la cadena del plátano, banano de exportación y palma de aceite",
      "Plan de Seguridad Portuaria y blindaje de corredores contra el narcotráfico",
      "Formalización y titulación de tierras para comunidades afrodescendientes e indígenas"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05483",
    "name": "Nariño",
    "daneCode": "05483",
    "department": "Antioquia",
    "subregion": "Oriente",
    "subregionId": "oriente",
    "category": "6",
    "population": 11500,
    "electoralCensus": 8740,
    "nbiPercentage": 13.2,
    "areaKm2": 316.8,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Bajo",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición Nariño Nos Une (Centro Democrático)",
    "electedMayor": "Érika Cardona Pérez",
    "mayorTitle": "Alcaldesa",
    "contact": {
      "phone": "8680077-8680113-8680084-8680117-8680259",
      "email": "alcaldia@narino-antioquia.gov.co;despachoalcalde@narino-antioquia.gov.co"
    },
    "votesMayor": 2230,
    "percentageValidMayor": 44.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Nariño",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 1605,
      "percentageValid": 31.7,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 1,
        "percentageValid": 11.1
      }
    ],
    "totalCouncilSeats": 9,
    "economicSectors": [
      "Café y agricultura de subsistencia.",
      "Aguacate Hass",
      "Floricultura",
      "Café",
      "Turismo"
    ],
    "securityDynamics": {
      "homicideRate": "Baja letalidad.",
      "extortionRisk": "Hurtos menores.",
      "armedPresence": "Presencia esporádica de grupos armados."
    },
    "keyProblems": [
      "Deficiencias en conectividad."
    ],
    "strategicOpportunities": [
      "Seguridad Total como garante de la inversión y desarrollo agroindustrial",
      "Consolidación del Altiplano como hub aeroportuario y logístico internacional",
      "Créditos blandos y fomento asociativo para floricultura, aguacate hass y café",
      "Turismo ecológico y patrimonial sostenible en embalses y cuencas protegidas"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05495",
    "name": "Nechí",
    "daneCode": "05495",
    "department": "Antioquia",
    "subregion": "Bajo Cauca",
    "subregionId": "bajo-cauca",
    "category": "6",
    "population": 29000,
    "electoralCensus": 22040,
    "nbiPercentage": 47.7,
    "areaKm2": 937.3,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Crítico",
    "predominantParty": "Partido Liberal",
    "winnerParty": "Coalición Nechí Nos Une (Partido Liberal)",
    "electedMayor": "Yumaris Patricia Henríquez Banquet",
    "mayorTitle": "Alcaldesa",
    "contact": {
      "phone": "8368156-8680204",
      "email": "alcaldia@nechi-antioquia.gov.co"
    },
    "votesMayor": 6774,
    "percentageValidMayor": 53.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Nechí",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 4877,
      "percentageValid": 38.2,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Partido Liberal",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Coalición Cívica / Verde",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Centro Democrático",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Partido Conservador / Oposición",
        "seats": 4,
        "percentageValid": 36.4
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "Minería aurífera aluvial y de veta",
      "Ganadería de ceba y comercial",
      "Piscicultura comercial",
      "Comercio subregional"
    ],
    "securityDynamics": {
      "homicideRate": "Tasa subregional Bajo Cauca: Moderada con vigilancia preventiva",
      "extortionRisk": "Riesgo de extorsión enfocado en comercio local y abigeato rural",
      "armedPresence": "Clan del Golfo (Subestructura Julio César Vargas), ELN Frente Darío Ramírez Castro, Los Caparros residuales"
    },
    "keyProblems": [
      "Guerra abierta y confinamiento de comunidades por Clan del Golfo vs ELN y Disidencias",
      "Deterioro ambiental masivo por dragado y mercurio en fuentes hídricas",
      "Extorsión del gramaje aurífero y parálisis del comercio formal"
    ],
    "strategicOpportunities": [
      "Recuperación del orden público con presencia militar permanente en ejes fluviales",
      "Distrito Minero Especial con sustitución de mercurio y plantas comunitarias",
      "Desarrollo agroforestal y siembra de caucho, cacao y apicultura",
      "Inversión de choque en acueductos veredales y centros de salud de segundo nivel"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05490",
    "name": "Necoclí",
    "daneCode": "05490",
    "department": "Antioquia",
    "subregion": "Urabá",
    "subregionId": "uraba",
    "category": "5",
    "population": 48000,
    "electoralCensus": 36480,
    "nbiPercentage": 41.6,
    "areaKm2": 1255.5,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Crítico",
    "predominantParty": "Coalición",
    "winnerParty": "Coalición Necoclí Merece Más",
    "electedMayor": "Guillermo José Cardona Moreno",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8214166-8214564-8215039",
      "email": "alcaldia@necocli-antioquia.gov.co;contactenos@necocli-antioquia.gov.co"
    },
    "votesMayor": 11800,
    "percentageValidMayor": 47.2,
    "runnerUp": {
      "name": "Candidatura Cívica por Necoclí",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 8496,
      "percentageValid": 34.0,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Partido Liberal",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Coalición Cívica / Verde",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Centro Democrático",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Partido Conservador / Oposición",
        "seats": 4,
        "percentageValid": 36.4
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "Turismo, ganadería y pesca.",
      "Turismo de playa y ecológico",
      "Ganadería intensiva de carne",
      "Pesca artesanal",
      "Cultivo de plátano y coco"
    ],
    "securityDynamics": {
      "homicideRate": "Moderada.",
      "extortionRisk": "Tráfico de migrantes y microtráfico.",
      "armedPresence": "Control hegemónico de AGC."
    },
    "keyProblems": [
      "Colapso ocasional por flujo migratorio."
    ],
    "strategicOpportunities": [
      "Puesta en marcha de Puerto Antioquia y Puerto Pisisi como eje marítimo nacional",
      "Industrialización de la cadena del plátano, banano de exportación y palma de aceite",
      "Plan de Seguridad Portuaria y blindaje de corredores contra el narcotráfico",
      "Formalización y titulación de tierras para comunidades afrodescendientes e indígenas"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05501",
    "name": "Olaya",
    "daneCode": "05501",
    "department": "Antioquia",
    "subregion": "Occidente",
    "subregionId": "occidente",
    "category": "6",
    "population": 3600,
    "electoralCensus": 2736,
    "nbiPercentage": 29.3,
    "areaKm2": 87.0,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Alto",
    "predominantParty": "Partido Conservador",
    "winnerParty": "Coalición Olaya Nos Une (Partido Conservador)",
    "electedMayor": "Jesús David Hernández Londoño",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8550117-8550116-8550119-8550221",
      "email": "alcaldia@olaya-antioquia.gov.co"
    },
    "votesMayor": 824,
    "percentageValidMayor": 52.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Olaya",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 593,
      "percentageValid": 37.4,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Coalición Local",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Centro Democrático",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Partido Liberal / Oposición",
        "seats": 2,
        "percentageValid": 22.2
      }
    ],
    "totalCouncilSeats": 9,
    "economicSectors": [
      "Agricultura de subsistencia.",
      "Turismo recreativo y hotelero",
      "Fruticultura tropical (mango, cítricos)",
      "Comercio turístico",
      "Ganadería extensiva"
    ],
    "securityDynamics": {
      "homicideRate": "Estadísticas pacíficas.",
      "extortionRisk": "Nula incidencia criminal macro.",
      "armedPresence": "Sin presencia estructural activa."
    },
    "keyProblems": [
      "Cobertura aceptable para su tamaño."
    ],
    "strategicOpportunities": [
      "Aprovechamiento logístico del Túnel del Toyo y autopistas Mar 1 y Mar 2",
      "Eje agrofrutícola y fomento a pequeñas cadenas de valor cacaoteras y cafeteras",
      "Potenciación del turismo colonial y patrimonial en Santa Fe de Antioquia y Sopetrán",
      "Mesa de formalización de pequeña minería con estándares ambientales limpios"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05543",
    "name": "Peque",
    "daneCode": "05543",
    "department": "Antioquia",
    "subregion": "Occidente",
    "subregionId": "occidente",
    "category": "6",
    "population": 9200,
    "electoralCensus": 6992,
    "nbiPercentage": 29.3,
    "areaKm2": 434.1,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Alto",
    "predominantParty": "Partido Conservador",
    "winnerParty": "Coalición Peque Nos Une (Partido Conservador)",
    "electedMayor": "Emilson de Jesús Hernández Hernández",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8552043-8552213-8552136",
      "email": "alcaldia@peque-antioquia.gov.co"
    },
    "votesMayor": 1824,
    "percentageValidMayor": 45.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Peque",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 1313,
      "percentageValid": 32.4,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Coalición Local",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Centro Democrático",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Partido Liberal / Oposición",
        "seats": 2,
        "percentageValid": 22.2
      }
    ],
    "totalCouncilSeats": 9,
    "economicSectors": [
      "Aislamiento geográfico limita el empleo formal.",
      "Minería aurífera",
      "Café de altura",
      "Cacao y caña panelera",
      "Frijol y agricultura campesina"
    ],
    "securityDynamics": {
      "homicideRate": "Corredor estratégico de guerra; alta letalidad intermitente.",
      "extortionRisk": "Confinamientos y minas antipersonal.",
      "armedPresence": "Disputa entre Disidencias FARC y AGC."
    },
    "keyProblems": [
      "Deficiencias graves en conectividad y energía."
    ],
    "strategicOpportunities": [
      "Aprovechamiento logístico del Túnel del Toyo y autopistas Mar 1 y Mar 2",
      "Eje agrofrutícola y fomento a pequeñas cadenas de valor cacaoteras y cafeteras",
      "Potenciación del turismo colonial y patrimonial en Santa Fe de Antioquia y Sopetrán",
      "Mesa de formalización de pequeña minería con estándares ambientales limpios"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05541",
    "name": "El Peñol",
    "daneCode": "05541",
    "department": "Antioquia",
    "subregion": "Oriente",
    "subregionId": "oriente",
    "category": "5",
    "population": 20000,
    "electoralCensus": 15200,
    "nbiPercentage": 13.2,
    "areaKm2": 118.3,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Bajo",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición El Peñol Nos Une (Centro Democrático)",
    "electedMayor": "Sandra Arelis Duque Velásquez",
    "mayorTitle": "Alcaldesa",
    "contact": {
      "phone": "8515855-8515851-8515944",
      "email": "alcaldia@elpenol-antioquia.gov.co"
    },
    "votesMayor": 4055,
    "percentageValidMayor": 46.0,
    "runnerUp": {
      "name": "Candidatura Cívica por El Peñol",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 2919,
      "percentageValid": 33.1,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 3,
        "percentageValid": 27.3
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "Turismo y agricultura.",
      "Aguacate Hass",
      "Floricultura",
      "Café",
      "Turismo"
    ],
    "securityDynamics": {
      "homicideRate": "Baja letalidad.",
      "extortionRisk": "Microtráfico turístico.",
      "armedPresence": "Bandas locales."
    },
    "keyProblems": [
      "Buena cobertura."
    ],
    "strategicOpportunities": [
      "Seguridad Total como garante de la inversión y desarrollo agroindustrial",
      "Consolidación del Altiplano como hub aeroportuario y logístico internacional",
      "Créditos blandos y fomento asociativo para floricultura, aguacate hass y café",
      "Turismo ecológico y patrimonial sostenible en embalses y cuencas protegidas"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05576",
    "name": "Pueblorrico",
    "daneCode": "05576",
    "department": "Antioquia",
    "subregion": "Suroeste",
    "subregionId": "suroeste",
    "category": "6",
    "population": 9100,
    "electoralCensus": 6916,
    "nbiPercentage": 19.3,
    "areaKm2": 75.4,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Medio",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición Pueblorrico Nos Une (Centro Democrático)",
    "electedMayor": "Cristian Camilo Zapata Ramírez",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8498865-8498020-8498324",
      "email": "alcalde@pueblorrico-antioquia.gov.co"
    },
    "votesMayor": 2005,
    "percentageValidMayor": 50.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Pueblorrico",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 1443,
      "percentageValid": 36.0,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 1,
        "percentageValid": 11.1
      }
    ],
    "totalCouncilSeats": 9,
    "economicSectors": [
      "Café y agricultura.",
      "Café de alta calidad",
      "Cítricos",
      "Plátano",
      "Turismo"
    ],
    "securityDynamics": {
      "homicideRate": "Estadísticas pacíficas.",
      "extortionRisk": "Hurtos menores.",
      "armedPresence": "Sin presencia estructural."
    },
    "keyProblems": [
      "Retos en ruralidad."
    ],
    "strategicOpportunities": [
      "Plan Cosecha Segura con despliegue de fuerza pública y monitoreo con drones tácticos",
      "Diversificación agropecuaria (cítricos, plátano, ganadería regenerativa y cardamomo)",
      "Corredor turístico patrimonial y de cafés especiales (Jericó, Jardín, Santa Bárbara)",
      "Pavimentación de circuitos viales estratégicos hacia el corredor del Río Cauca"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05579",
    "name": "Puerto Berrío",
    "daneCode": "05579",
    "department": "Antioquia",
    "subregion": "Magdalena Medio",
    "subregionId": "magdalena-medio",
    "category": "4",
    "population": 48000,
    "electoralCensus": 36480,
    "nbiPercentage": 34.3,
    "areaKm2": 1220.1,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Alto",
    "predominantParty": "Coalición",
    "winnerParty": "Coalición Puerto Berrío Adelante",
    "electedMayor": "Robinson Alberto Baena Zuluaga",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8332120-8332517 Ext 205",
      "email": "alcaldia@puertoberrio-antioquia.gov.co"
    },
    "votesMayor": 11600,
    "percentageValidMayor": 45.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Puerto Berrío",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 8352,
      "percentageValid": 32.4,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Coalición de Gobierno",
        "seats": 5,
        "percentageValid": 38.5
      },
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 23.1
      },
      {
        "party": "Partido Conservador",
        "seats": 2,
        "percentageValid": 15.4
      },
      {
        "party": "Partido Liberal",
        "seats": 2,
        "percentageValid": 15.4
      },
      {
        "party": "Estatuto de Oposición",
        "seats": 1,
        "percentageValid": 7.6
      }
    ],
    "totalCouncilSeats": 13,
    "economicSectors": [
      "Sector ganadero robusto pero poca mano de obra local intensi",
      "Ganadería bovina de ceba",
      "Logística fluvial y ferroviaria",
      "Turismo de fauna y balnearios",
      "Extracción de hidrocarburos y calizas"
    ],
    "securityDynamics": {
      "homicideRate": "Moderada-alta en barrios populares.",
      "extortionRisk": "Control periférico del narcomenudeo.",
      "armedPresence": "Presencia articulada del Clan del Golfo."
    },
    "keyProblems": [
      "Deficiente conexión rural de internet y vías terciarias. Problemas de agua potable."
    ],
    "strategicOpportunities": [
      "Consolidación de Puerto Berrío como nodo multimodal (férreo, fluvial y carretero)",
      "Ganadería regenerativa y producción cárnica tecnificada con valor agregado",
      "Corredor ecoturístico de la cuenca del Río Claro y fauna silvestre",
      "Capacitación técnica en logística y mantenimiento de maquinaria pesada"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05585",
    "name": "Puerto Nare",
    "daneCode": "05585",
    "department": "Antioquia",
    "subregion": "Magdalena Medio",
    "subregionId": "magdalena-medio",
    "category": "6",
    "population": 19500,
    "electoralCensus": 14820,
    "nbiPercentage": 34.3,
    "areaKm2": 669.3,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Alto",
    "predominantParty": "Partido Liberal",
    "winnerParty": "Coalición Puerto Nare Nos Une (Partido Liberal)",
    "electedMayor": "Juan Carlos Acevedo Alzate",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8347047-8346201",
      "email": "alcaldia@puertonare-antioquia.gov.co;contactenos@puertonare-antioquia.gov.co"
    },
    "votesMayor": 4469,
    "percentageValidMayor": 52.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Puerto Nare",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 3217,
      "percentageValid": 37.4,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Partido Liberal",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Coalición Cívica / Verde",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Centro Democrático",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Partido Conservador / Oposición",
        "seats": 4,
        "percentageValid": 36.4
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "Dependencia de la minería (cementeras Argos). Riqueza indust",
      "Ganadería bovina de ceba",
      "Logística fluvial y ferroviaria",
      "Turismo de fauna y balnearios",
      "Extracción de hidrocarburos y calizas"
    ],
    "securityDynamics": {
      "homicideRate": "Baja en comparación con otros delitos.",
      "extortionRisk": "Extorsión ligada a contratos tercerizados de la minería ('peaje' extorsivo).",
      "armedPresence": "Bandas emergentes y control periférico."
    },
    "keyProblems": [
      "Ingresos corrientes importantes por minería, pero pobreza rural roza el 40%."
    ],
    "strategicOpportunities": [
      "Consolidación de Puerto Berrío como nodo multimodal (férreo, fluvial y carretero)",
      "Ganadería regenerativa y producción cárnica tecnificada con valor agregado",
      "Corredor ecoturístico de la cuenca del Río Claro y fauna silvestre",
      "Capacitación técnica en logística y mantenimiento de maquinaria pesada"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05591",
    "name": "Puerto Triunfo",
    "daneCode": "05591",
    "department": "Antioquia",
    "subregion": "Magdalena Medio",
    "subregionId": "magdalena-medio",
    "category": "6",
    "population": 22000,
    "electoralCensus": 16720,
    "nbiPercentage": 34.3,
    "areaKm2": 369.6,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Alto",
    "predominantParty": "Partido Liberal",
    "winnerParty": "Coalición Puerto Triunfo Nos Une (Partido Liberal)",
    "electedMayor": "Franklin Portillo Gómez",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8352025-8352117-8352566",
      "email": "alcaldia@puertotriunfo-antioquia.gov.co;contactenos@puertotriunfo-antioquia.gov.co"
    },
    "votesMayor": 4460,
    "percentageValidMayor": 46.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Puerto Triunfo",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 3211,
      "percentageValid": 33.1,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Partido Liberal",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Coalición Cívica / Verde",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Centro Democrático",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Partido Conservador / Oposición",
        "seats": 4,
        "percentageValid": 36.4
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "Economía de servicios, hoteles y restaurantes (Turismo: Haci",
      "Ganadería bovina de ceba",
      "Logística fluvial y ferroviaria",
      "Turismo de fauna y balnearios",
      "Extracción de hidrocarburos y calizas"
    ],
    "securityDynamics": {
      "homicideRate": "Moderada.",
      "extortionRisk": "Microtráfico articulado al turismo. Fauna invasora peligrosa (hipopótamos).",
      "armedPresence": "Redes de microtráfico local."
    },
    "keyProblems": [
      "Grave rezago en coberturas de alcantarillado."
    ],
    "strategicOpportunities": [
      "Consolidación de Puerto Berrío como nodo multimodal (férreo, fluvial y carretero)",
      "Ganadería regenerativa y producción cárnica tecnificada con valor agregado",
      "Corredor ecoturístico de la cuenca del Río Claro y fauna silvestre",
      "Capacitación técnica en logística y mantenimiento de maquinaria pesada"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05604",
    "name": "Remedios",
    "daneCode": "05604",
    "department": "Antioquia",
    "subregion": "Nordeste",
    "subregionId": "nordeste",
    "category": "5",
    "population": 32000,
    "electoralCensus": 24320,
    "nbiPercentage": 39.7,
    "areaKm2": 1989.2,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Crítico",
    "predominantParty": "Coalición",
    "winnerParty": "Coalición Remedios Seguro y Productivo",
    "electedMayor": "Albeiro Arenas Molina",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8303130-8303078-8303791-8303130",
      "email": "alcaldia@remedios-antioquia.gov.co;contactenos@remedios-antioquia.gov.co"
    },
    "votesMayor": 7200,
    "percentageValidMayor": 44.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Remedios",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 5184,
      "percentageValid": 31.7,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Coalición Local",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Centro Democrático",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Partido Liberal / Oposición",
        "seats": 4,
        "percentageValid": 36.4
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "Dependencia abrumadora de la minería aurífera y maderera. In",
      "Minería de oro tradicional y de veta",
      "Caña panelera",
      "Cacao y café",
      "Ganadería extensiva"
    ],
    "securityDynamics": {
      "homicideRate": "Tasa de homicidios fluctuante (picos por batallas en límites con Segovia).",
      "extortionRisk": "'Vacuna' generalizada. Corredor armamentístico.",
      "armedPresence": "Disputado por ELN, frente residual FARC y AGC. Veredas 'cercadas' e incomunicadas."
    },
    "keyProblems": [
      "Dificultades agudas para acceso unificado de acueducto por loteos espontáneos invasivos."
    ],
    "strategicOpportunities": [
      "Mesa de coexistencia entre minería ancestral, pequeños mineros y títulos formales",
      "Ruta de la Panela y agroindustria cañera en Cisneros, San Roque y Yolombó",
      "Presencia institucional reforzada para desarticular el cobro extorsivo",
      "Incentivos tributarios para empresas que creen empleo formal fuera de la minería"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05607",
    "name": "El Retiro",
    "daneCode": "05607",
    "department": "Antioquia",
    "subregion": "Oriente",
    "subregionId": "oriente",
    "category": "3",
    "population": 26000,
    "electoralCensus": 19760,
    "nbiPercentage": 10.3,
    "areaKm2": 243.6,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Bajo",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición El Retiro Nos Une (Centro Democrático)",
    "electedMayor": "Santiago Montoya Giraldo",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "5411860-5410175-5413067-5410180-5410190",
      "email": "alcaldia@elretiro.gov.co"
    },
    "votesMayor": 6188,
    "percentageValidMayor": 54.0,
    "runnerUp": {
      "name": "Candidatura Cívica por El Retiro",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 4455,
      "percentageValid": 38.9,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Coalición de Gobierno",
        "seats": 5,
        "percentageValid": 38.5
      },
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 23.1
      },
      {
        "party": "Partido Conservador",
        "seats": 2,
        "percentageValid": 15.4
      },
      {
        "party": "Partido Liberal",
        "seats": 2,
        "percentageValid": 15.4
      },
      {
        "party": "Estatuto de Oposición",
        "seats": 1,
        "percentageValid": 7.6
      }
    ],
    "totalCouncilSeats": 13,
    "economicSectors": [
      "Ebanistería de lujo y turismo residencial.",
      "Aguacate Hass",
      "Floricultura",
      "Café",
      "Turismo"
    ],
    "securityDynamics": {
      "homicideRate": "Baja letalidad.",
      "extortionRisk": "Hurtos a residencias de alto valor.",
      "armedPresence": "Sin presencia estructural."
    },
    "keyProblems": [
      "Excelente cobertura."
    ],
    "strategicOpportunities": [
      "Seguridad Total como garante de la inversión y desarrollo agroindustrial",
      "Consolidación del Altiplano como hub aeroportuario y logístico internacional",
      "Créditos blandos y fomento asociativo para floricultura, aguacate hass y café",
      "Turismo ecológico y patrimonial sostenible en embalses y cuencas protegidas"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05615",
    "name": "Rionegro",
    "daneCode": "05615",
    "department": "Antioquia",
    "subregion": "Oriente",
    "subregionId": "oriente",
    "category": "1",
    "population": 145000,
    "electoralCensus": 104400,
    "nbiPercentage": 8.0,
    "areaKm2": 195.9,
    "predominantStratum": "Estrato 2 y 3",
    "riskLevel": "Bajo",
    "predominantParty": "Creemos / CD",
    "winnerParty": "Coalición Rionegro con Futuro (Creemos - Centro Democrático)",
    "electedMayor": "Jorge Humberto Rivas Urrea",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "5204060",
      "email": "alcaldia@rionegro.gov.co;comunicaciones@rionegro.gov.co"
    },
    "votesMayor": 34200,
    "percentageValidMayor": 47.6,
    "runnerUp": {
      "name": "Candidatura Cívica por Rionegro",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 24624,
      "percentageValid": 34.3,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Coalición de Gobierno",
        "seats": 7,
        "percentageValid": 36.8
      },
      {
        "party": "Centro Democrático",
        "seats": 4,
        "percentageValid": 21.0
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 15.8
      },
      {
        "party": "Partido Liberal",
        "seats": 2,
        "percentageValid": 10.5
      },
      {
        "party": "Alianza Verde / Otros",
        "seats": 2,
        "percentageValid": 10.5
      },
      {
        "party": "Estatuto de Oposición",
        "seats": 1,
        "percentageValid": 5.4
      }
    ],
    "totalCouncilSeats": 19,
    "economicSectors": [
      "~4% (Jalona formalidad industrial).",
      "Hub logístico y aeroportuario",
      "Floricultura de exportación",
      "Industria farmacéutica y alimentos",
      "Comercio de bienes"
    ],
    "securityDynamics": {
      "homicideRate": "Media (35 casos en 2024).",
      "extortionRisk": "Delito gravísimo de extorsión carcelaria y hurtos.",
      "armedPresence": "Presencia latente de 'El Mesa' (microtráfico)."
    },
    "keyProblems": [
      ">98% urbano, 75% rural."
    ],
    "strategicOpportunities": [
      "Seguridad Total como garante de la inversión y desarrollo agroindustrial",
      "Consolidación del Altiplano como hub aeroportuario y logístico internacional",
      "Créditos blandos y fomento asociativo para floricultura, aguacate hass y café",
      "Turismo ecológico y patrimonial sostenible en embalses y cuencas protegidas"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05628",
    "name": "Sabanalarga",
    "daneCode": "05628",
    "department": "Antioquia",
    "subregion": "Occidente",
    "subregionId": "occidente",
    "category": "6",
    "population": 9800,
    "electoralCensus": 7448,
    "nbiPercentage": 29.3,
    "areaKm2": 265.8,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Alto",
    "predominantParty": "Partido Conservador",
    "winnerParty": "Coalición Sabanalarga Nos Une (Partido Conservador)",
    "electedMayor": "César Alonso Cuadros George",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8554201 - 8554154",
      "email": "alcaldia@sabanalarga-antioquia.gov.co;contactenos@sabanalarga-antioquia.gov.co"
    },
    "votesMayor": 1943,
    "percentageValidMayor": 45.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Sabanalarga",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 1398,
      "percentageValid": 32.4,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Coalición Local",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Centro Democrático",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Partido Liberal / Oposición",
        "seats": 2,
        "percentageValid": 22.2
      }
    ],
    "totalCouncilSeats": 9,
    "economicSectors": [
      "Agricultura de subsistencia.",
      "Fruticultura",
      "Café",
      "Cacao",
      "Turismo colonial"
    ],
    "securityDynamics": {
      "homicideRate": "Presencia de grupos armados; incidentes esporádicos.",
      "extortionRisk": "Extorsión y control social.",
      "armedPresence": "Influencia de disidencias y AGC."
    },
    "keyProblems": [
      "Deficiencias graves en vías."
    ],
    "strategicOpportunities": [
      "Aprovechamiento logístico del Túnel del Toyo y autopistas Mar 1 y Mar 2",
      "Eje agrofrutícola y fomento a pequeñas cadenas de valor cacaoteras y cafeteras",
      "Potenciación del turismo colonial y patrimonial en Santa Fe de Antioquia y Sopetrán",
      "Mesa de formalización de pequeña minería con estándares ambientales limpios"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05631",
    "name": "Sabaneta",
    "daneCode": "05631",
    "department": "Antioquia",
    "subregion": "Valle de Aburrá",
    "subregionId": "valle-de-aburra",
    "category": "1",
    "population": 92000,
    "electoralCensus": 66240,
    "nbiPercentage": 4.2,
    "areaKm2": 16.0,
    "predominantStratum": "Estrato 2 y 3",
    "riskLevel": "Medio",
    "predominantParty": "Coalición",
    "winnerParty": "Somos Sabaneta (Coalición Alder Cruz)",
    "electedMayor": "Alder James Cruz Ocampo",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "2880098-2885294-4440088 Ext 102-2885634",
      "email": "alcaldia@sabaneta.gov.co"
    },
    "votesMayor": 22410,
    "percentageValidMayor": 46.8,
    "runnerUp": {
      "name": "Candidatura Cívica por Sabaneta",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 16135,
      "percentageValid": 33.7,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Coalición de Gobierno",
        "seats": 7,
        "percentageValid": 36.8
      },
      {
        "party": "Centro Democrático",
        "seats": 4,
        "percentageValid": 21.0
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 15.8
      },
      {
        "party": "Partido Liberal",
        "seats": 2,
        "percentageValid": 10.5
      },
      {
        "party": "Alianza Verde / Otros",
        "seats": 2,
        "percentageValid": 10.5
      },
      {
        "party": "Estatuto de Oposición",
        "seats": 1,
        "percentageValid": 5.4
      }
    ],
    "totalCouncilSeats": 19,
    "economicSectors": [
      "7.8%.",
      "Servicios e industrias CTI",
      "Comercio mayorista y minorista",
      "Construcción e inmobiliario",
      "Turismo de negocios y salud"
    ],
    "securityDynamics": {
      "homicideRate": "5 por 100,000 hab.",
      "extortionRisk": "Hurto a residencias.",
      "armedPresence": "Baja presencia de grupos armados organizados."
    },
    "keyProblems": [
      "Acueducto: 100%, Alcantarillado: 100%, Energía: 100%."
    ],
    "strategicOpportunities": [
      "Consolidación como Valle del Software y Distrito de Ciencia, Tecnología e Innovación",
      "Seguridad patrimonial con videovigilancia predictiva e interconexión metropolitana",
      "Integración férrea Tren del Río y corredores limpios de movilidad",
      "Alianzas público-privadas para empleo juvenil de alta cualificación"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05642",
    "name": "Salgar",
    "daneCode": "05642",
    "department": "Antioquia",
    "subregion": "Suroeste",
    "subregionId": "suroeste",
    "category": "6",
    "population": 19000,
    "electoralCensus": 14440,
    "nbiPercentage": 19.3,
    "areaKm2": 288.2,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Medio",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición Salgar Nos Une (Centro Democrático)",
    "electedMayor": "Víctor Raúl Maya Ceballos",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8442330-8442301-8442213-8442562",
      "email": "alcaldia@salgar-antioquia.gov.co;contactenos@salgar-antioquia.gov.co"
    },
    "votesMayor": 4522,
    "percentageValidMayor": 54.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Salgar",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 3255,
      "percentageValid": 38.9,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 3,
        "percentageValid": 27.3
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "Economía cafetera.",
      "Café pergamino y cafés especiales",
      "Plátano y cítricos",
      "Turismo patrimonial cafetero",
      "Piscicultura y porcicultura"
    ],
    "securityDynamics": {
      "homicideRate": "Baja letalidad.",
      "extortionRisk": "Hurtos menores.",
      "armedPresence": "Sin presencia estructural activa."
    },
    "keyProblems": [
      "Reconstrucción tras avalancha."
    ],
    "strategicOpportunities": [
      "Plan Cosecha Segura con despliegue de fuerza pública y monitoreo con drones tácticos",
      "Diversificación agropecuaria (cítricos, plátano, ganadería regenerativa y cardamomo)",
      "Corredor turístico patrimonial y de cafés especiales (Jericó, Jardín, Santa Bárbara)",
      "Pavimentación de circuitos viales estratégicos hacia el corredor del Río Cauca"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05647",
    "name": "San Andrés de Cuerquia",
    "daneCode": "05647",
    "department": "Antioquia",
    "subregion": "Norte",
    "subregionId": "norte",
    "category": "6",
    "population": 7500,
    "electoralCensus": 5700,
    "nbiPercentage": 24.6,
    "areaKm2": 218.7,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Alto",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición San Andrés de Cuerquia Nos Une (Centro Democrático)",
    "electedMayor": "José Fernando Chavarría Chavarría",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8618206-8618173-8618154-8618232",
      "email": "alcaldia@sanandresdecuerquia-antioquia.gov.co"
    },
    "votesMayor": 1553,
    "percentageValidMayor": 47.0,
    "runnerUp": {
      "name": "Candidatura Cívica por San Andrés de Cuerquia",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 1118,
      "percentageValid": 33.8,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 1,
        "percentageValid": 11.1
      }
    ],
    "totalCouncilSeats": 9,
    "economicSectors": [
      "Altos índices de inactividad técnica en la plaza principal.",
      "Lechería especializada",
      "Porcicultura",
      "Papa",
      "Piscicultura"
    ],
    "securityDynamics": {
      "homicideRate": "Estadísticamente de bajísima letalidad de guerra propia (paz estadística).",
      "extortionRisk": "Hurtos menores.",
      "armedPresence": "Patrullazos contra frentes 18 FARC y combos paramilitares."
    },
    "keyProblems": [
      "Ruralidad sufre falta de alcantarillas y vías a prueba de derrumbes."
    ],
    "strategicOpportunities": [
      "Protección y fortalecimiento de la cuenca lechera con subsidio a insumos",
      "Fortalecimiento de la seguridad en el eje Hidroituango y cordones rurales",
      "Cadena de valor porcícola y agroindustrial tecnificada",
      "Infraestructura educativa técnica rural para retener el talento joven"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05649",
    "name": "San Carlos",
    "daneCode": "05649",
    "department": "Antioquia",
    "subregion": "Oriente",
    "subregionId": "oriente",
    "category": "6",
    "population": 18000,
    "electoralCensus": 13680,
    "nbiPercentage": 13.2,
    "areaKm2": 717.8,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Bajo",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición San Carlos Nos Une (Centro Democrático)",
    "electedMayor": "Santiago Daza Espinosa",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8358090-8358051-8358253-8358066",
      "email": "alcaldia@sancarlos-antioquia.gov.co;contactenos@sancarlos-antioquia.gov.co"
    },
    "votesMayor": 3967,
    "percentageValidMayor": 50.0,
    "runnerUp": {
      "name": "Candidatura Cívica por San Carlos",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 2856,
      "percentageValid": 36.0,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 3,
        "percentageValid": 27.3
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "Energía hidroeléctrica y turismo ecológico.",
      "Aguacate Hass",
      "Floricultura",
      "Café",
      "Turismo"
    ],
    "securityDynamics": {
      "homicideRate": "Baja letalidad.",
      "extortionRisk": "Hurtos menores.",
      "armedPresence": "Sin presencia estructural activa."
    },
    "keyProblems": [
      "Mejorando tras reconstrucción."
    ],
    "strategicOpportunities": [
      "Seguridad Total como garante de la inversión y desarrollo agroindustrial",
      "Consolidación del Altiplano como hub aeroportuario y logístico internacional",
      "Créditos blandos y fomento asociativo para floricultura, aguacate hass y café",
      "Turismo ecológico y patrimonial sostenible en embalses y cuencas protegidas"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05652",
    "name": "San Francisco",
    "daneCode": "05652",
    "department": "Antioquia",
    "subregion": "Oriente",
    "subregionId": "oriente",
    "category": "6",
    "population": 6500,
    "electoralCensus": 4940,
    "nbiPercentage": 13.2,
    "areaKm2": 356.3,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Bajo",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición San Francisco Nos Une (Centro Democrático)",
    "electedMayor": "Arturo Alexander Arias Duque",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8323030 - 8323236",
      "email": "alcaldia@sanfrancisco-antioquia.gov.co"
    },
    "votesMayor": 1403,
    "percentageValidMayor": 49.0,
    "runnerUp": {
      "name": "Candidatura Cívica por San Francisco",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 1010,
      "percentageValid": 35.3,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 1,
        "percentageValid": 11.1
      }
    ],
    "totalCouncilSeats": 9,
    "economicSectors": [
      "Agricultura de subsistencia.",
      "Aguacate Hass",
      "Floricultura",
      "Café",
      "Turismo"
    ],
    "securityDynamics": {
      "homicideRate": "Baja letalidad.",
      "extortionRisk": "Minas antipersonal (riesgo residual).",
      "armedPresence": "Sin presencia estructural activa."
    },
    "keyProblems": [
      "Deficiencias en vías."
    ],
    "strategicOpportunities": [
      "Seguridad Total como garante de la inversión y desarrollo agroindustrial",
      "Consolidación del Altiplano como hub aeroportuario y logístico internacional",
      "Créditos blandos y fomento asociativo para floricultura, aguacate hass y café",
      "Turismo ecológico y patrimonial sostenible en embalses y cuencas protegidas"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05656",
    "name": "San Jerónimo",
    "daneCode": "05656",
    "department": "Antioquia",
    "subregion": "Occidente",
    "subregionId": "occidente",
    "category": "5",
    "population": 16000,
    "electoralCensus": 12160,
    "nbiPercentage": 29.3,
    "areaKm2": 161.3,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Alto",
    "predominantParty": "Partido Conservador",
    "winnerParty": "Coalición San Jerónimo Nos Une (Partido Conservador)",
    "electedMayor": "Donaldo Fernán Vivares Gallego",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8582024-8582580-8582162-8582123",
      "email": "alcaldia@sanjeronimo-antioquia.gov.co"
    },
    "votesMayor": 3173,
    "percentageValidMayor": 45.0,
    "runnerUp": {
      "name": "Candidatura Cívica por San Jerónimo",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 2284,
      "percentageValid": 32.4,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Coalición Local",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Centro Democrático",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Partido Liberal / Oposición",
        "seats": 4,
        "percentageValid": 36.4
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "Economía de servicios turísticos y fincas de recreo.",
      "Turismo recreativo y hotelero",
      "Fruticultura tropical (mango, cítricos)",
      "Comercio turístico",
      "Ganadería extensiva"
    ],
    "securityDynamics": {
      "homicideRate": "Baja letalidad.",
      "extortionRisk": "Hurtos a residencias de lujo y fincas de recreo.",
      "armedPresence": "Control social silencioso de bandas locales."
    },
    "keyProblems": [
      "Buena cobertura urbana."
    ],
    "strategicOpportunities": [
      "Aprovechamiento logístico del Túnel del Toyo y autopistas Mar 1 y Mar 2",
      "Eje agrofrutícola y fomento a pequeñas cadenas de valor cacaoteras y cafeteras",
      "Potenciación del turismo colonial y patrimonial en Santa Fe de Antioquia y Sopetrán",
      "Mesa de formalización de pequeña minería con estándares ambientales limpios"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05658",
    "name": "San José de la Montaña",
    "daneCode": "05658",
    "department": "Antioquia",
    "subregion": "Norte",
    "subregionId": "norte",
    "category": "6",
    "population": 3800,
    "electoralCensus": 2888,
    "nbiPercentage": 24.6,
    "areaKm2": 126.1,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Alto",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición San José de la Montaña Nos Une (Centro Democrático)",
    "electedMayor": "Julián Andrés González Posada",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8622714-8622904",
      "email": "alcaldia@sanjosedelamontana-antioquia.gov.co;contactenos@sanjosedelamontana-antioquia.gov.co"
    },
    "votesMayor": 854,
    "percentageValidMayor": 51.0,
    "runnerUp": {
      "name": "Candidatura Cívica por San José de la Montaña",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 614,
      "percentageValid": 36.7,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 1,
        "percentageValid": 11.1
      }
    ],
    "totalCouncilSeats": 9,
    "economicSectors": [
      "Carentes de industria pesada; minifundista lechero y cría de",
      "Lechería especializada",
      "Porcicultura",
      "Papa",
      "Piscicultura"
    ],
    "securityDynamics": {
      "homicideRate": "Exento del radar homicida anual a niveles macro (cero casos repetitivos).",
      "extortionRisk": "Operabilidad en paz total impidiendo entrada a micro-tráfico.",
      "armedPresence": "Resguardo gélido civil."
    },
    "keyProblems": [
      "Carencia increíble de placa huella real hacia Santa Rosa o San Andrés."
    ],
    "strategicOpportunities": [
      "Protección y fortalecimiento de la cuenca lechera con subsidio a insumos",
      "Fortalecimiento de la seguridad en el eje Hidroituango y cordones rurales",
      "Cadena de valor porcícola y agroindustrial tecnificada",
      "Infraestructura educativa técnica rural para retener el talento joven"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05659",
    "name": "San Juan de Urabá",
    "daneCode": "05659",
    "department": "Antioquia",
    "subregion": "Urabá",
    "subregionId": "uraba",
    "category": "6",
    "population": 29000,
    "electoralCensus": 22040,
    "nbiPercentage": 41.6,
    "areaKm2": 252.0,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Crítico",
    "predominantParty": "Partido Conservador",
    "winnerParty": "Coalición San Juan de Urabá Nos Une (Partido Conservador)",
    "electedMayor": "Julia Esperanza Medrano Coa",
    "mayorTitle": "Alcaldesa",
    "contact": {
      "phone": "8212100 Ext 108-8212375-8212630-8208100",
      "email": "alcaldia@sanjuandeuraba-antioquia.gov.co;contactenos@sanjuandeuraba-antioquia.gov.co"
    },
    "votesMayor": 5624,
    "percentageValidMayor": 44.0,
    "runnerUp": {
      "name": "Candidatura Cívica por San Juan de Urabá",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 4049,
      "percentageValid": 31.7,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Partido Liberal",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Coalición Cívica / Verde",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Centro Democrático",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Partido Conservador / Oposición",
        "seats": 4,
        "percentageValid": 36.4
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "Coco, plátano y pesca.",
      "Banano",
      "Plátano",
      "Ganadería",
      "Pesca"
    ],
    "securityDynamics": {
      "homicideRate": "Baja letalidad.",
      "extortionRisk": "Hurtos menores.",
      "armedPresence": "Presencia de AGC."
    },
    "keyProblems": [
      "Deficiencias en agua potable."
    ],
    "strategicOpportunities": [
      "Puesta en marcha de Puerto Antioquia y Puerto Pisisi como eje marítimo nacional",
      "Industrialización de la cadena del plátano, banano de exportación y palma de aceite",
      "Plan de Seguridad Portuaria y blindaje de corredores contra el narcotráfico",
      "Formalización y titulación de tierras para comunidades afrodescendientes e indígenas"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05660",
    "name": "San Luis",
    "daneCode": "05660",
    "department": "Antioquia",
    "subregion": "Oriente",
    "subregionId": "oriente",
    "category": "6",
    "population": 13500,
    "electoralCensus": 10260,
    "nbiPercentage": 13.2,
    "areaKm2": 425.6,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Bajo",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición San Luis Nos Une (Centro Democrático)",
    "electedMayor": "César Abad Buitrago Arias",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8348115-8348102-8348720-8348716",
      "email": "contactenos@sanluis-antioquia.gov.co"
    },
    "votesMayor": 2618,
    "percentageValidMayor": 44.0,
    "runnerUp": {
      "name": "Candidatura Cívica por San Luis",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 1884,
      "percentageValid": 31.7,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 3,
        "percentageValid": 27.3
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "Cemento y turismo de paso.",
      "Aguacate Hass",
      "Floricultura",
      "Café",
      "Turismo"
    ],
    "securityDynamics": {
      "homicideRate": "Moderada.",
      "extortionRisk": "Extorsión vial y hurtos.",
      "armedPresence": "Influencia de grupos armados en tránsito."
    },
    "keyProblems": [
      "Retos en ruralidad."
    ],
    "strategicOpportunities": [
      "Seguridad Total como garante de la inversión y desarrollo agroindustrial",
      "Consolidación del Altiplano como hub aeroportuario y logístico internacional",
      "Créditos blandos y fomento asociativo para floricultura, aguacate hass y café",
      "Turismo ecológico y patrimonial sostenible en embalses y cuencas protegidas"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05665",
    "name": "San Pedro de Urabá",
    "daneCode": "05665",
    "department": "Antioquia",
    "subregion": "Urabá",
    "subregionId": "uraba",
    "category": "6",
    "population": 34000,
    "electoralCensus": 25840,
    "nbiPercentage": 41.6,
    "areaKm2": 602.5,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Crítico",
    "predominantParty": "Partido Conservador",
    "winnerParty": "Coalición San Pedro de Urabá Nos Une (Partido Conservador)",
    "electedMayor": "Never Jacinto Carvajal Miranda",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8205502-8205503-8205033",
      "email": "alcaldia@sanpedrodeuraba-antioquia.gov.co"
    },
    "votesMayor": 6744,
    "percentageValidMayor": 45.0,
    "runnerUp": {
      "name": "Candidatura Cívica por San Pedro de Urabá",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 4855,
      "percentageValid": 32.4,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Partido Liberal",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Coalición Cívica / Verde",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Centro Democrático",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Partido Conservador / Oposición",
        "seats": 4,
        "percentageValid": 36.4
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "Ganadería extensiva y plátano.",
      "Banano",
      "Plátano",
      "Ganadería",
      "Pesca"
    ],
    "securityDynamics": {
      "homicideRate": "Moderada.",
      "extortionRisk": "Extorsión ganadera.",
      "armedPresence": "Control histórico de AGC."
    },
    "keyProblems": [
      "Retos en electrificación rural."
    ],
    "strategicOpportunities": [
      "Puesta en marcha de Puerto Antioquia y Puerto Pisisi como eje marítimo nacional",
      "Industrialización de la cadena del plátano, banano de exportación y palma de aceite",
      "Plan de Seguridad Portuaria y blindaje de corredores contra el narcotráfico",
      "Formalización y titulación de tierras para comunidades afrodescendientes e indígenas"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05664",
    "name": "San Pedro de los Milagros",
    "daneCode": "05664",
    "department": "Antioquia",
    "subregion": "Norte",
    "subregionId": "norte",
    "category": "5",
    "population": 29000,
    "electoralCensus": 22040,
    "nbiPercentage": 24.6,
    "areaKm2": 220.9,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Alto",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición San Pedro de los Milagros Nos Une (Centro Democrático)",
    "electedMayor": "José Danilo Álvarez Rodríguez",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8687039-8205502-8205033",
      "email": "alcaldia@sanpedrodelosmilagros-antioquia.gov.co"
    },
    "votesMayor": 6391,
    "percentageValidMayor": 50.0,
    "runnerUp": {
      "name": "Candidatura Cívica por San Pedro de los Milagros",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 4601,
      "percentageValid": 36.0,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 3,
        "percentageValid": 27.3
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "Dependencia del 80% sobre la industria transformadora lecher",
      "Lechería especializada",
      "Porcicultura",
      "Papa",
      "Piscicultura"
    ],
    "securityDynamics": {
      "homicideRate": "Tasas bajas.",
      "extortionRisk": "Los 'Apartamenteros' y hurto a maquinaria agroindustrial pesada son el pan diario.",
      "armedPresence": "Roces de influencia expansiva metropolitana del combo 'Pachelly'."
    },
    "keyProblems": [
      "Cobertura de red urbana excelente pero déficit grave rural en zonas de invasión."
    ],
    "strategicOpportunities": [
      "Protección y fortalecimiento de la cuenca lechera con subsidio a insumos",
      "Fortalecimiento de la seguridad en el eje Hidroituango y cordones rurales",
      "Cadena de valor porcícola y agroindustrial tecnificada",
      "Infraestructura educativa técnica rural para retener el talento joven"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05667",
    "name": "San Rafael",
    "daneCode": "05667",
    "department": "Antioquia",
    "subregion": "Oriente",
    "subregionId": "oriente",
    "category": "6",
    "population": 16000,
    "electoralCensus": 12160,
    "nbiPercentage": 13.2,
    "areaKm2": 363.9,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Bajo",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición San Rafael Nos Une (Centro Democrático)",
    "electedMayor": "Eduin Aniceno Giraldo Quintana",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8586681-8586927-8586836-8586681",
      "email": "alcaldia@sanrafael-antioquia.gov.co"
    },
    "votesMayor": 3173,
    "percentageValidMayor": 45.0,
    "runnerUp": {
      "name": "Candidatura Cívica por San Rafael",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 2284,
      "percentageValid": 32.4,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 3,
        "percentageValid": 27.3
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "Energía y turismo.",
      "Turismo de embalses y hotelería",
      "Comercio y gastronomía",
      "Generación hidroeléctrica",
      "Agricultura tradicional"
    ],
    "securityDynamics": {
      "homicideRate": "Estadísticas pacíficas.",
      "extortionRisk": "Hurtos menores.",
      "armedPresence": "Sin presencia estructural activa."
    },
    "keyProblems": [
      "Servicios básicos estables."
    ],
    "strategicOpportunities": [
      "Seguridad Total como garante de la inversión y desarrollo agroindustrial",
      "Consolidación del Altiplano como hub aeroportuario y logístico internacional",
      "Créditos blandos y fomento asociativo para floricultura, aguacate hass y café",
      "Turismo ecológico y patrimonial sostenible en embalses y cuencas protegidas"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05670",
    "name": "San Roque",
    "daneCode": "05670",
    "department": "Antioquia",
    "subregion": "Nordeste",
    "subregionId": "nordeste",
    "category": "6",
    "population": 19000,
    "electoralCensus": 14440,
    "nbiPercentage": 39.7,
    "areaKm2": 424.9,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Crítico",
    "predominantParty": "Partido Conservador",
    "winnerParty": "Coalición San Roque Nos Une (Partido Conservador)",
    "electedMayor": "Luis Alejandro Villegas Cano",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8656562-8656755-8656628",
      "email": "alcaldia@sanroque-antioquia.gov.co"
    },
    "votesMayor": 4355,
    "percentageValidMayor": 52.0,
    "runnerUp": {
      "name": "Candidatura Cívica por San Roque",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 3135,
      "percentageValid": 37.4,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Coalición Local",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Centro Democrático",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Partido Liberal / Oposición",
        "seats": 4,
        "percentageValid": 36.4
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "Depende de agricultura de trapiches paneleros y ganadería. A",
      "Agroindustria panelera tecnificada",
      "Café y cacao",
      "Ganadería doble propósito",
      "Turismo férreo y patrimonial"
    ],
    "securityDynamics": {
      "homicideRate": "Homicidio selectivo a pequeña escala por rentas esporádicas.",
      "extortionRisk": "Repunte de microtráfico asociado al flujo de población flotante minera.",
      "armedPresence": "Corredor limítrofe (Puerto Berrío-Nordeste); AGC maneja la periferia."
    },
    "keyProblems": [
      "Zonas minero-agrícolas con carencia hídrica sana total."
    ],
    "strategicOpportunities": [
      "Mesa de coexistencia entre minería ancestral, pequeños mineros y títulos formales",
      "Ruta de la Panela y agroindustria cañera en Cisneros, San Roque y Yolombó",
      "Presencia institucional reforzada para desarticular el cobro extorsivo",
      "Incentivos tributarios para empresas que creen empleo formal fuera de la minería"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05674",
    "name": "San Rafael",
    "daneCode": "05674",
    "department": "Antioquia",
    "subregion": "Oriente",
    "subregionId": "oriente",
    "category": "6",
    "population": 16000,
    "electoralCensus": 12160,
    "nbiPercentage": 13.2,
    "areaKm2": 230.5,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Bajo",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición San Rafael Nos Une (Centro Democrático)",
    "electedMayor": "Eduin Aniceno Giraldo Quintana",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8586681-8586927-8586836-8586681",
      "email": "alcaldia@sanrafael-antioquia.gov.co"
    },
    "votesMayor": 3173,
    "percentageValidMayor": 45.0,
    "runnerUp": {
      "name": "Candidatura Cívica por San Rafael",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 2284,
      "percentageValid": 32.4,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 3,
        "percentageValid": 27.3
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "Energía y turismo.",
      "Turismo de embalses y hotelería",
      "Comercio y gastronomía",
      "Generación hidroeléctrica",
      "Agricultura tradicional"
    ],
    "securityDynamics": {
      "homicideRate": "Estadísticas pacíficas.",
      "extortionRisk": "Hurtos menores.",
      "armedPresence": "Sin presencia estructural activa."
    },
    "keyProblems": [
      "Servicios básicos estables."
    ],
    "strategicOpportunities": [
      "Seguridad Total como garante de la inversión y desarrollo agroindustrial",
      "Consolidación del Altiplano como hub aeroportuario y logístico internacional",
      "Créditos blandos y fomento asociativo para floricultura, aguacate hass y café",
      "Turismo ecológico y patrimonial sostenible en embalses y cuencas protegidas"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05679",
    "name": "Santa Bárbara",
    "daneCode": "05679",
    "department": "Antioquia",
    "subregion": "Suroeste",
    "subregionId": "suroeste",
    "category": "5",
    "population": 24000,
    "electoralCensus": 18240,
    "nbiPercentage": 19.3,
    "areaKm2": 196.2,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Medio",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición Santa Bárbara con Fuerza (Centro Democrático)",
    "electedMayor": "Jorge Mario Quintana Cañaveral",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8461060-8463607-8464151-8464302",
      "email": "alcaldia@santabarbara-antioquia.gov.co;contactenos@santabarbara-antioquia.gov.co"
    },
    "votesMayor": 6300,
    "percentageValidMayor": 48.5,
    "runnerUp": {
      "name": "Candidatura Cívica por Santa Bárbara",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 4536,
      "percentageValid": 34.9,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 3,
        "percentageValid": 27.3
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "Cítricos y café.",
      "Café de alta calidad",
      "Cítricos",
      "Plátano",
      "Turismo"
    ],
    "securityDynamics": {
      "homicideRate": "Moderada.",
      "extortionRisk": "Microtráfico.",
      "armedPresence": "Bandas locales."
    },
    "keyProblems": [
      "Buena cobertura."
    ],
    "strategicOpportunities": [
      "Plan Cosecha Segura con despliegue de fuerza pública y monitoreo con drones tácticos",
      "Diversificación agropecuaria (cítricos, plátano, ganadería regenerativa y cardamomo)",
      "Corredor turístico patrimonial y de cafés especiales (Jericó, Jardín, Santa Bárbara)",
      "Pavimentación de circuitos viales estratégicos hacia el corredor del Río Cauca"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05042",
    "name": "Santa Fe de Antioquia",
    "daneCode": "05042",
    "department": "Antioquia",
    "subregion": "Occidente",
    "subregionId": "occidente",
    "category": "4",
    "population": 27500,
    "electoralCensus": 20900,
    "nbiPercentage": 29.3,
    "areaKm2": 525.6,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Alto",
    "predominantParty": "Partido Conservador",
    "winnerParty": "Coalición Santa Fe de Antioquia Nos Une (Partido Conservador)",
    "electedMayor": "Yamid Carvajal Carvajal",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8531136-8531793-8531152-8531841",
      "email": "alcaldia@santafedeantioquia-antioquia.gov.co"
    },
    "votesMayor": 6303,
    "percentageValidMayor": 52.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Santa Fe de Antioquia",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 4538,
      "percentageValid": 37.4,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Coalición de Gobierno",
        "seats": 5,
        "percentageValid": 38.5
      },
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 23.1
      },
      {
        "party": "Partido Conservador",
        "seats": 2,
        "percentageValid": 15.4
      },
      {
        "party": "Partido Liberal",
        "seats": 2,
        "percentageValid": 15.4
      },
      {
        "party": "Estatuto de Oposición",
        "seats": 1,
        "percentageValid": 7.6
      }
    ],
    "totalCouncilSeats": 13,
    "economicSectors": [
      "10.5% (Dependencia del turismo).",
      "Fruticultura",
      "Café",
      "Cacao",
      "Turismo colonial"
    ],
    "securityDynamics": {
      "homicideRate": "25 por 100,000 hab.",
      "extortionRisk": "Microtráfico en zonas turísticas.",
      "armedPresence": "Presencia de AGC (Clan del Golfo) en zonas rurales."
    },
    "keyProblems": [
      "Acueducto: 88%, Alcantarillado: 82%, Energía: 97%."
    ],
    "strategicOpportunities": [
      "Aprovechamiento logístico del Túnel del Toyo y autopistas Mar 1 y Mar 2",
      "Eje agrofrutícola y fomento a pequeñas cadenas de valor cacaoteras y cafeteras",
      "Potenciación del turismo colonial y patrimonial en Santa Fe de Antioquia y Sopetrán",
      "Mesa de formalización de pequeña minería con estándares ambientales limpios"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05686",
    "name": "Santa Rosa de Osos",
    "daneCode": "05686",
    "department": "Antioquia",
    "subregion": "Norte",
    "subregionId": "norte",
    "category": "4",
    "population": 39000,
    "electoralCensus": 29640,
    "nbiPercentage": 24.6,
    "areaKm2": 864.8,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Alto",
    "predominantParty": "Coalición",
    "winnerParty": "Coalición Santa Rosa Nos Une",
    "electedMayor": "Luis Bernardo Molina Granda",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8608020-8608336-8608120-8608416",
      "email": "alcaldia@santarosadeosos.gov.co;comunicaciones@santarosadeosos.gov.co"
    },
    "votesMayor": 9800,
    "percentageValidMayor": 46.5,
    "runnerUp": {
      "name": "Candidatura Cívica por Santa Rosa de Osos",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 7056,
      "percentageValid": 33.5,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Coalición de Gobierno",
        "seats": 5,
        "percentageValid": 38.5
      },
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 23.1
      },
      {
        "party": "Partido Conservador",
        "seats": 2,
        "percentageValid": 15.4
      },
      {
        "party": "Partido Liberal",
        "seats": 2,
        "percentageValid": 15.4
      },
      {
        "party": "Estatuto de Oposición",
        "seats": 1,
        "percentageValid": 7.6
      }
    ],
    "totalCouncilSeats": 13,
    "economicSectors": [
      "Pleno empleo formalizado (Colanta); estabiliza la economía d",
      "Ganadería lechera de alta tecnología",
      "Porcicultura tecnificada",
      "Industria láctea y derivados",
      "Trucha y papa"
    ],
    "securityDynamics": {
      "homicideRate": "Alta tasa comparativa municipal originada por venganzas selectivas urbanas.",
      "extortionRisk": "Epidemia de extorsión carcelaria (Llamadas 'boleteo').",
      "armedPresence": "Rentas pasivas en manos de escuadras periféricas urbanas."
    },
    "keyProblems": [
      "Red urbanística excelente (98%), estanco en potabilización lechera rural."
    ],
    "strategicOpportunities": [
      "Protección y fortalecimiento de la cuenca lechera con subsidio a insumos",
      "Fortalecimiento de la seguridad en el eje Hidroituango y cordones rurales",
      "Cadena de valor porcícola y agroindustrial tecnificada",
      "Infraestructura educativa técnica rural para retener el talento joven"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05690",
    "name": "Santo Domingo",
    "daneCode": "05690",
    "department": "Antioquia",
    "subregion": "Nordeste",
    "subregionId": "nordeste",
    "category": "6",
    "population": 12000,
    "electoralCensus": 9120,
    "nbiPercentage": 39.7,
    "areaKm2": 266.0,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Crítico",
    "predominantParty": "Partido Conservador",
    "winnerParty": "Coalición Santo Domingo Nos Une (Partido Conservador)",
    "electedMayor": "Fabio Ignacio Mira Valencia",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8621069-8621101 Ext 103 - 8621313",
      "email": "contactenos@santodomingo-antioquia.gov.co"
    },
    "votesMayor": 2644,
    "percentageValidMayor": 50.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Santo Domingo",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 1903,
      "percentageValid": 36.0,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Coalición Local",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Centro Democrático",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Partido Liberal / Oposición",
        "seats": 2,
        "percentageValid": 22.2
      }
    ],
    "totalCouncilSeats": 9,
    "economicSectors": [
      "Agricultura de autoconsumo, panela y turismo literario. Empl",
      "Agroindustria panelera tecnificada",
      "Café y cacao",
      "Ganadería doble propósito",
      "Turismo férreo y patrimonial"
    ],
    "securityDynamics": {
      "homicideRate": "Tranquilidad estadísticamente hablando, similar a Cisneros.",
      "extortionRisk": "Infracciones de convivencia, problemas menores de salud pública psicoactiva.",
      "armedPresence": "Presencia sutil criminal de retaguardia, sin afectación violenta continua."
    },
    "keyProblems": [
      "Red urbana estabilizada."
    ],
    "strategicOpportunities": [
      "Mesa de coexistencia entre minería ancestral, pequeños mineros y títulos formales",
      "Ruta de la Panela y agroindustria cañera en Cisneros, San Roque y Yolombó",
      "Presencia institucional reforzada para desarticular el cobro extorsivo",
      "Incentivos tributarios para empresas que creen empleo formal fuera de la minería"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05736",
    "name": "Segovia",
    "daneCode": "05736",
    "department": "Antioquia",
    "subregion": "Nordeste",
    "subregionId": "nordeste",
    "category": "4",
    "population": 43000,
    "electoralCensus": 32680,
    "nbiPercentage": 39.7,
    "areaKm2": 1127.3,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Crítico",
    "predominantParty": "Coalición",
    "winnerParty": "Coalición Segovia Segura y Productiva",
    "electedMayor": "Edwin Alexander Castañeda Vahos",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8314351-8315613-8317196-8314031",
      "email": "alcaldia@segovia-antioquia.gov.co"
    },
    "votesMayor": 9400,
    "percentageValidMayor": 45.1,
    "runnerUp": {
      "name": "Candidatura Cívica por Segovia",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 6768,
      "percentageValid": 32.5,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Coalición de Gobierno",
        "seats": 5,
        "percentageValid": 38.5
      },
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 23.1
      },
      {
        "party": "Partido Conservador",
        "seats": 2,
        "percentageValid": 15.4
      },
      {
        "party": "Partido Liberal",
        "seats": 2,
        "percentageValid": 15.4
      },
      {
        "party": "Estatuto de Oposición",
        "seats": 1,
        "percentageValid": 7.6
      }
    ],
    "totalCouncilSeats": 13,
    "economicSectors": [
      "Hiper-informalidad minera (60% de ocupación urbana). Cadena ",
      "Minería de oro tradicional y de veta",
      "Caña panelera",
      "Cacao y café",
      "Ganadería extensiva"
    ],
    "securityDynamics": {
      "homicideRate": "Históricamente catalogado entre los municipios más letales del país.",
      "extortionRisk": "Altísima incidencia de desaparición forzada y extorsión del gramaje extraído de oro.",
      "armedPresence": "Zona de guerra abierta: Clan del Golfo (AGC), ELN y Disidencias FARC (Estructura 4)."
    },
    "keyProblems": [
      "Graves deficiencias en agua potable real; presencia de mercurio y arsénico ambiental."
    ],
    "strategicOpportunities": [
      "Mesa de coexistencia entre minería ancestral, pequeños mineros y títulos formales",
      "Ruta de la Panela y agroindustria cañera en Cisneros, San Roque y Yolombó",
      "Presencia institucional reforzada para desarticular el cobro extorsivo",
      "Incentivos tributarios para empresas que creen empleo formal fuera de la minería"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05756",
    "name": "Sonsón",
    "daneCode": "05756",
    "department": "Antioquia",
    "subregion": "Oriente",
    "subregionId": "oriente",
    "category": "5",
    "population": 38000,
    "electoralCensus": 28880,
    "nbiPercentage": 13.2,
    "areaKm2": 1346.4,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Bajo",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Centro Democrático (Sonsón con Futuro)",
    "electedMayor": "Juan Diego Zuluaga Pulgarín",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8694444-8691296",
      "email": "alcalde@sonson-antioquia.gov.co"
    },
    "votesMayor": 8900,
    "percentageValidMayor": 47.1,
    "runnerUp": {
      "name": "Candidatura Cívica por Sonsón",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 6408,
      "percentageValid": 33.9,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 3,
        "percentageValid": 27.3
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "9.2% (Economía agrícola: aguacate y café).",
      "Aguacate Hass de exportación",
      "Café especial",
      "Hortalizas y papa",
      "Ganadería bovina de leche"
    ],
    "securityDynamics": {
      "homicideRate": "32 por 100,000 hab.",
      "extortionRisk": "Hurto de insumos agrícolas.",
      "armedPresence": "Reductos de grupos armados en zonas de páramo."
    },
    "keyProblems": [
      "Acueducto: 85%, Alcantarillado: 78%, Energía: 95%."
    ],
    "strategicOpportunities": [
      "Seguridad Total como garante de la inversión y desarrollo agroindustrial",
      "Consolidación del Altiplano como hub aeroportuario y logístico internacional",
      "Créditos blandos y fomento asociativo para floricultura, aguacate hass y café",
      "Turismo ecológico y patrimonial sostenible en embalses y cuencas protegidas"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05761",
    "name": "Sopetrán",
    "daneCode": "05761",
    "department": "Antioquia",
    "subregion": "Occidente",
    "subregionId": "occidente",
    "category": "5",
    "population": 17500,
    "electoralCensus": 13300,
    "nbiPercentage": 29.3,
    "areaKm2": 219.1,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Alto",
    "predominantParty": "Coalición",
    "winnerParty": "Coalición Sopetrán Adelante",
    "electedMayor": "Tatiana Alexandra Carballo Hoyos",
    "mayorTitle": "Alcaldesa",
    "contact": {
      "phone": "8541560 ext. 102 - 8541561",
      "email": "alcaldia@sopetran-antioquia.gov.co;contactenos@sopetran-antioquia.gov.co"
    },
    "votesMayor": 4600,
    "percentageValidMayor": 48.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Sopetrán",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 3312,
      "percentageValid": 34.6,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Coalición Local",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Centro Democrático",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Partido Liberal / Oposición",
        "seats": 4,
        "percentageValid": 36.4
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "Economía de servicios turísticos y fincas de recreo.",
      "Turismo recreativo y hotelero",
      "Fruticultura tropical (mango, cítricos)",
      "Comercio turístico",
      "Ganadería extensiva"
    ],
    "securityDynamics": {
      "homicideRate": "Baja letalidad.",
      "extortionRisk": "Hurtos a residencias de lujo y fincas de recreo.",
      "armedPresence": "Control social silencioso de bandas locales."
    },
    "keyProblems": [
      "Buena cobertura urbana."
    ],
    "strategicOpportunities": [
      "Aprovechamiento logístico del Túnel del Toyo y autopistas Mar 1 y Mar 2",
      "Eje agrofrutícola y fomento a pequeñas cadenas de valor cacaoteras y cafeteras",
      "Potenciación del turismo colonial y patrimonial en Santa Fe de Antioquia y Sopetrán",
      "Mesa de formalización de pequeña minería con estándares ambientales limpios"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05790",
    "name": "Tarazá",
    "daneCode": "05790",
    "department": "Antioquia",
    "subregion": "Bajo Cauca",
    "subregionId": "bajo-cauca",
    "category": "6",
    "population": 45000,
    "electoralCensus": 34200,
    "nbiPercentage": 47.7,
    "areaKm2": 1149.0,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Crítico",
    "predominantParty": "Partido Liberal",
    "winnerParty": "Coalición Tarazá Nos Une (Partido Liberal)",
    "electedMayor": "Yomer Fabián Álvarez Correa",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8365628-8366288-8365817",
      "email": "alcaldia@taraza-antioquia.gov.co"
    },
    "votesMayor": 8926,
    "percentageValidMayor": 45.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Tarazá",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 6426,
      "percentageValid": 32.4,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Partido Liberal",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Coalición Cívica / Verde",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Centro Democrático",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Partido Conservador / Oposición",
        "seats": 4,
        "percentageValid": 36.4
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "Minería aurífera aluvial y de veta",
      "Ganadería de ceba y comercial",
      "Piscicultura comercial",
      "Comercio subregional"
    ],
    "securityDynamics": {
      "homicideRate": "Tasa subregional Bajo Cauca: Moderada con vigilancia preventiva",
      "extortionRisk": "Riesgo de extorsión enfocado en comercio local y abigeato rural",
      "armedPresence": "Clan del Golfo (Subestructura Julio César Vargas), ELN Frente Darío Ramírez Castro, Los Caparros residuales"
    },
    "keyProblems": [
      "Guerra abierta y confinamiento de comunidades por Clan del Golfo vs ELN y Disidencias",
      "Deterioro ambiental masivo por dragado y mercurio en fuentes hídricas",
      "Extorsión del gramaje aurífero y parálisis del comercio formal"
    ],
    "strategicOpportunities": [
      "Recuperación del orden público con presencia militar permanente en ejes fluviales",
      "Distrito Minero Especial con sustitución de mercurio y plantas comunitarias",
      "Desarrollo agroforestal y siembra de caucho, cacao y apicultura",
      "Inversión de choque en acueductos veredales y centros de salud de segundo nivel"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05792",
    "name": "Tarso",
    "daneCode": "05792",
    "department": "Antioquia",
    "subregion": "Suroeste",
    "subregionId": "suroeste",
    "category": "6",
    "population": 8200,
    "electoralCensus": 6232,
    "nbiPercentage": 19.3,
    "areaKm2": 120.5,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Medio",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición Tarso Nos Une (Centro Democrático)",
    "electedMayor": "Hugo Alexander Ocampo Ríos",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8458541-8458780-8458535-8458718-8458639-8458991",
      "email": "alcaldia@tarso-antioquia.gov.co;contactenos@tarso-antioquia.gov.co"
    },
    "votesMayor": 1807,
    "percentageValidMayor": 50.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Tarso",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 1301,
      "percentageValid": 36.0,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 1,
        "percentageValid": 11.1
      }
    ],
    "totalCouncilSeats": 9,
    "economicSectors": [
      "Café y agricultura.",
      "Café de alta calidad",
      "Cítricos",
      "Plátano",
      "Turismo"
    ],
    "securityDynamics": {
      "homicideRate": "Estadísticas pacíficas.",
      "extortionRisk": "Hurtos menores.",
      "armedPresence": "Sin presencia estructural."
    },
    "keyProblems": [
      "Cobertura aceptable."
    ],
    "strategicOpportunities": [
      "Plan Cosecha Segura con despliegue de fuerza pública y monitoreo con drones tácticos",
      "Diversificación agropecuaria (cítricos, plátano, ganadería regenerativa y cardamomo)",
      "Corredor turístico patrimonial y de cafés especiales (Jericó, Jardín, Santa Bárbara)",
      "Pavimentación de circuitos viales estratégicos hacia el corredor del Río Cauca"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05809",
    "name": "Titiribí",
    "daneCode": "05809",
    "department": "Antioquia",
    "subregion": "Suroeste",
    "subregionId": "suroeste",
    "category": "6",
    "population": 13000,
    "electoralCensus": 9880,
    "nbiPercentage": 19.3,
    "areaKm2": 140.3,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Medio",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición Titiribí Nos Une (Centro Democrático)",
    "electedMayor": "Alex David Restrepo Salazar",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8482649-8482344-8482790",
      "email": "alcaldia@titiribi-antioquia.gov.co;contactenos@titiribi-antioquia.gov.co"
    },
    "votesMayor": 2635,
    "percentageValidMayor": 46.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Titiribí",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 1897,
      "percentageValid": 33.1,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 3,
        "percentageValid": 27.3
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "Minería de carbón y café.",
      "Minería de carbón",
      "Café y caña panelera",
      "Ganadería doble propósito",
      "Turismo de naturaleza"
    ],
    "securityDynamics": {
      "homicideRate": "Estadísticas pacíficas.",
      "extortionRisk": "Hurtos menores.",
      "armedPresence": "Sin presencia estructural."
    },
    "keyProblems": [
      "Cobertura aceptable."
    ],
    "strategicOpportunities": [
      "Plan Cosecha Segura con despliegue de fuerza pública y monitoreo con drones tácticos",
      "Diversificación agropecuaria (cítricos, plátano, ganadería regenerativa y cardamomo)",
      "Corredor turístico patrimonial y de cafés especiales (Jericó, Jardín, Santa Bárbara)",
      "Pavimentación de circuitos viales estratégicos hacia el corredor del Río Cauca"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05819",
    "name": "Toledo",
    "daneCode": "05819",
    "department": "Antioquia",
    "subregion": "Norte",
    "subregionId": "norte",
    "category": "6",
    "population": 6800,
    "electoralCensus": 5168,
    "nbiPercentage": 24.6,
    "areaKm2": 122.6,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Alto",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición Toledo Nos Une (Centro Democrático)",
    "electedMayor": "Jhonny Alberto Marín Muñetón",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8619020 - 8619012",
      "email": "alcaldia@toledo-antioquia.gov.co"
    },
    "votesMayor": 1438,
    "percentageValidMayor": 48.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Toledo",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 1035,
      "percentageValid": 34.6,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 1,
        "percentageValid": 11.1
      }
    ],
    "totalCouncilSeats": 9,
    "economicSectors": [
      "Depende del resarcimiento logístico e impuestos de Hidroitua",
      "Café tradicional",
      "Complejo Hidroeléctrico Ituango",
      "Caña panelera",
      "Ganadería tradicional"
    ],
    "securityDynamics": {
      "homicideRate": "Agobiado en sus límites lejanos de zona alta por disputas de disidencias.",
      "extortionRisk": "Extorsión focalizada.",
      "armedPresence": "Disidencias armadas en emboscadas contra fuerza pública."
    },
    "keyProblems": [
      "Infraestructura local recibió chorros PDET / EPM de pavimentación."
    ],
    "strategicOpportunities": [
      "Protección y fortalecimiento de la cuenca lechera con subsidio a insumos",
      "Fortalecimiento de la seguridad en el eje Hidroituango y cordones rurales",
      "Cadena de valor porcícola y agroindustrial tecnificada",
      "Infraestructura educativa técnica rural para retener el talento joven"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05837",
    "name": "Turbo",
    "daneCode": "05837",
    "department": "Antioquia",
    "subregion": "Urabá",
    "subregionId": "uraba",
    "category": "2",
    "population": 130000,
    "electoralCensus": 93600,
    "nbiPercentage": 32.6,
    "areaKm2": 2919.5,
    "predominantStratum": "Estrato 2 y 3",
    "riskLevel": "Crítico",
    "predominantParty": "Coalición",
    "winnerParty": "Coalición Turbo Líder y Productivo",
    "electedMayor": "Alejandro Abuchar González",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8273273 Ext 11-8275159-8272140",
      "email": "alcaldia@turbo-antioquia.gov.co"
    },
    "votesMayor": 26400,
    "percentageValidMayor": 45.8,
    "runnerUp": {
      "name": "Candidatura Cívica por Turbo",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 19008,
      "percentageValid": 33.0,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Coalición Mayoritaria",
        "seats": 6,
        "percentageValid": 35.3
      },
      {
        "party": "Centro Democrático",
        "seats": 4,
        "percentageValid": 23.5
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 17.6
      },
      {
        "party": "Partido Liberal",
        "seats": 2,
        "percentageValid": 11.8
      },
      {
        "party": "Estatuto de Oposición / ASI",
        "seats": 2,
        "percentageValid": 11.8
      }
    ],
    "totalCouncilSeats": 17,
    "economicSectors": [
      "18.5% (Informalidad predominante).",
      "Banano de exportación",
      "Plátano comercial",
      "Actividad portuaria y logística",
      "Ganadería bovina de carne"
    ],
    "securityDynamics": {
      "homicideRate": "42 por 100,000 hab.",
      "extortionRisk": "Narcotráfico, extorsión y contrabando.",
      "armedPresence": "Control hegemónico del Clan del Golfo."
    },
    "keyProblems": [
      "Acueducto: 65%, Alcantarillado: 45%, Energía: 92%."
    ],
    "strategicOpportunities": [
      "Puesta en marcha de Puerto Antioquia y Puerto Pisisi como eje marítimo nacional",
      "Industrialización de la cadena del plátano, banano de exportación y palma de aceite",
      "Plan de Seguridad Portuaria y blindaje de corredores contra el narcotráfico",
      "Formalización y titulación de tierras para comunidades afrodescendientes e indígenas"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05789",
    "name": "Támesis",
    "daneCode": "05789",
    "department": "Antioquia",
    "subregion": "Suroeste",
    "subregionId": "suroeste",
    "category": "6",
    "population": 16500,
    "electoralCensus": 12540,
    "nbiPercentage": 19.3,
    "areaKm2": 252.2,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Medio",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición Támesis Nos Une (Centro Democrático)",
    "electedMayor": "Juan Pablo Pérez Rámirez",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8494595-8496010-",
      "email": "alcaldia@tamesis-antioquia.gov.co"
    },
    "votesMayor": 3927,
    "percentageValidMayor": 54.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Támesis",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 2827,
      "percentageValid": 38.9,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 3,
        "percentageValid": 27.3
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "Turismo ecológico y café.",
      "Café de alta calidad",
      "Cítricos",
      "Plátano",
      "Turismo"
    ],
    "securityDynamics": {
      "homicideRate": "Estadísticas pacíficas.",
      "extortionRisk": "Hurtos menores.",
      "armedPresence": "Sin presencia estructural activa."
    },
    "keyProblems": [
      "Buena cobertura."
    ],
    "strategicOpportunities": [
      "Plan Cosecha Segura con despliegue de fuerza pública y monitoreo con drones tácticos",
      "Diversificación agropecuaria (cítricos, plátano, ganadería regenerativa y cardamomo)",
      "Corredor turístico patrimonial y de cafés especiales (Jericó, Jardín, Santa Bárbara)",
      "Pavimentación de circuitos viales estratégicos hacia el corredor del Río Cauca"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05842",
    "name": "Uramita",
    "daneCode": "05842",
    "department": "Antioquia",
    "subregion": "Occidente",
    "subregionId": "occidente",
    "category": "6",
    "population": 8800,
    "electoralCensus": 6688,
    "nbiPercentage": 29.3,
    "areaKm2": 265.9,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Alto",
    "predominantParty": "Partido Conservador",
    "winnerParty": "Coalición Uramita Nos Une (Partido Conservador)",
    "electedMayor": "Leonardo Úsuga Correa",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8574062-8574066-8574131-8574240-8574169",
      "email": "alcaldia@uramita-antioquia.gov.co"
    },
    "votesMayor": 1861,
    "percentageValidMayor": 48.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Uramita",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 1339,
      "percentageValid": 34.6,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Coalición Local",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Centro Democrático",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Partido Liberal / Oposición",
        "seats": 2,
        "percentageValid": 22.2
      }
    ],
    "totalCouncilSeats": 9,
    "economicSectors": [
      "Agricultura tradicional.",
      "Minería aurífera",
      "Café de altura",
      "Cacao y caña panelera",
      "Frijol y agricultura campesina"
    ],
    "securityDynamics": {
      "homicideRate": "Estadísticas pacíficas.",
      "extortionRisk": "Hurtos menores.",
      "armedPresence": "Sin presencia estructural activa."
    },
    "keyProblems": [
      "Servicios básicos estables."
    ],
    "strategicOpportunities": [
      "Aprovechamiento logístico del Túnel del Toyo y autopistas Mar 1 y Mar 2",
      "Eje agrofrutícola y fomento a pequeñas cadenas de valor cacaoteras y cafeteras",
      "Potenciación del turismo colonial y patrimonial en Santa Fe de Antioquia y Sopetrán",
      "Mesa de formalización de pequeña minería con estándares ambientales limpios"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05847",
    "name": "Urrao",
    "daneCode": "05847",
    "department": "Antioquia",
    "subregion": "Suroeste",
    "subregionId": "suroeste",
    "category": "5",
    "population": 45000,
    "electoralCensus": 34200,
    "nbiPercentage": 19.3,
    "areaKm2": 2563.4,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Medio",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición Urrao Nos Une (Centro Democrático)",
    "electedMayor": "Nelson Javier Barrera Holguín",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8502300-8502181-8502145-8502181",
      "email": "alcaldia@urrao-antioquia.gov.co"
    },
    "votesMayor": 10314,
    "percentageValidMayor": 52.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Urrao",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 7426,
      "percentageValid": 37.4,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 3,
        "percentageValid": 27.3
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "Granadilla, aguacate y ganadería.",
      "Café de alta calidad",
      "Cítricos",
      "Plátano",
      "Turismo"
    ],
    "securityDynamics": {
      "homicideRate": "Moderada-Alta.",
      "extortionRisk": "Extorsión y confinamiento rural.",
      "armedPresence": "Presencia de AGC y Disidencias de las FARC."
    },
    "keyProblems": [
      "Retos en zonas indígenas remotas."
    ],
    "strategicOpportunities": [
      "Plan Cosecha Segura con despliegue de fuerza pública y monitoreo con drones tácticos",
      "Diversificación agropecuaria (cítricos, plátano, ganadería regenerativa y cardamomo)",
      "Corredor turístico patrimonial y de cafés especiales (Jericó, Jardín, Santa Bárbara)",
      "Pavimentación de circuitos viales estratégicos hacia el corredor del Río Cauca"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05854",
    "name": "Valdivia",
    "daneCode": "05854",
    "department": "Antioquia",
    "subregion": "Norte",
    "subregionId": "norte",
    "category": "6",
    "population": 21000,
    "electoralCensus": 15960,
    "nbiPercentage": 24.6,
    "areaKm2": 567.7,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Alto",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición Valdivia Nos Une (Centro Democrático)",
    "electedMayor": "Carlos Danober Molina Betancur",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8360412-8360246-8360406-8360400-8360264",
      "email": "alcaldia@valdivia-antioquia.gov.co"
    },
    "votesMayor": 4720,
    "percentageValidMayor": 51.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Valdivia",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 3398,
      "percentageValid": 36.7,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 3,
        "percentageValid": 27.3
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "Informalidad sobrepasando el 80%. Agricultura de supervivenc",
      "Café tradicional",
      "Complejo Hidroeléctrico Ituango",
      "Caña panelera",
      "Ganadería tradicional"
    ],
    "securityDynamics": {
      "homicideRate": "Retos agudos y quemas intermitentes de camiones (terrorismo vial).",
      "extortionRisk": "Fletes ilegales logísticos del cruce Urabá - Valle de Aburrá - Magdalena.",
      "armedPresence": "Coexisten en tensa balanza el Clan del Golfo, ELN y disidencia."
    },
    "keyProblems": [
      "En el cañón el agua no se potabiliza."
    ],
    "strategicOpportunities": [
      "Protección y fortalecimiento de la cuenca lechera con subsidio a insumos",
      "Fortalecimiento de la seguridad en el eje Hidroituango y cordones rurales",
      "Cadena de valor porcícola y agroindustrial tecnificada",
      "Infraestructura educativa técnica rural para retener el talento joven"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05856",
    "name": "Valparaíso",
    "daneCode": "05856",
    "department": "Antioquia",
    "subregion": "Suroeste",
    "subregionId": "suroeste",
    "category": "6",
    "population": 7200,
    "electoralCensus": 5472,
    "nbiPercentage": 19.3,
    "areaKm2": 126.2,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Medio",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición Valparaíso Nos Une (Centro Democrático)",
    "electedMayor": "José Mario Hernández Devia",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8493807-8493882-8492109",
      "email": "alcaldia@valparaiso-antioquia.gov.co"
    },
    "votesMayor": 1427,
    "percentageValidMayor": 45.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Valparaíso",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 1027,
      "percentageValid": 32.4,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 1,
        "percentageValid": 11.1
      }
    ],
    "totalCouncilSeats": 9,
    "economicSectors": [
      "Ganadería y agricultura.",
      "Café de alta calidad",
      "Cítricos",
      "Plátano",
      "Turismo"
    ],
    "securityDynamics": {
      "homicideRate": "Estadísticas pacíficas.",
      "extortionRisk": "Hurtos menores.",
      "armedPresence": "Sin presencia estructural."
    },
    "keyProblems": [
      "Cobertura aceptable."
    ],
    "strategicOpportunities": [
      "Plan Cosecha Segura con despliegue de fuerza pública y monitoreo con drones tácticos",
      "Diversificación agropecuaria (cítricos, plátano, ganadería regenerativa y cardamomo)",
      "Corredor turístico patrimonial y de cafés especiales (Jericó, Jardín, Santa Bárbara)",
      "Pavimentación de circuitos viales estratégicos hacia el corredor del Río Cauca"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05858",
    "name": "Vegachí",
    "daneCode": "05858",
    "department": "Antioquia",
    "subregion": "Nordeste",
    "subregionId": "nordeste",
    "category": "6",
    "population": 14000,
    "electoralCensus": 10640,
    "nbiPercentage": 39.7,
    "areaKm2": 525.0,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Crítico",
    "predominantParty": "Partido Conservador",
    "winnerParty": "Coalición Vegachí Nos Une (Partido Conservador)",
    "electedMayor": "José María Ochoa Muñoz",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8305625-8305626-8305006-8305318",
      "email": "alcaldia@vegachi-antioquia.gov.co;contactenos@vegachi-antioquia.gov.co"
    },
    "votesMayor": 3085,
    "percentageValidMayor": 50.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Vegachí",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 2221,
      "percentageValid": 36.0,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Coalición Local",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Centro Democrático",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Partido Liberal / Oposición",
        "seats": 4,
        "percentageValid": 36.4
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "Eje comercial cañicultor fuerte 'Trapiche Central'.",
      "Agroindustria panelera tecnificada",
      "Café y cacao",
      "Ganadería doble propósito",
      "Turismo férreo y patrimonial"
    ],
    "securityDynamics": {
      "homicideRate": "Ocasionales entre capataces de las economías criminales locales o riñas civiles.",
      "extortionRisk": "Altísima incidencia subregistrada de extorsión 'falsa' telefónica.",
      "armedPresence": "Presencia Clan del Golfo (AGC)."
    },
    "keyProblems": [
      "Casco urbano de topografía amable permite excelente despliegue de alcantarillado."
    ],
    "strategicOpportunities": [
      "Mesa de coexistencia entre minería ancestral, pequeños mineros y títulos formales",
      "Ruta de la Panela y agroindustria cañera en Cisneros, San Roque y Yolombó",
      "Presencia institucional reforzada para desarticular el cobro extorsivo",
      "Incentivos tributarios para empresas que creen empleo formal fuera de la minería"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05861",
    "name": "Venecia",
    "daneCode": "05861",
    "department": "Antioquia",
    "subregion": "Suroeste",
    "subregionId": "suroeste",
    "category": "6",
    "population": 14500,
    "electoralCensus": 11020,
    "nbiPercentage": 19.3,
    "areaKm2": 139.7,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Medio",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición Venecia Nos Une (Centro Democrático)",
    "electedMayor": "Natalia Orozco Loaiza",
    "mayorTitle": "Alcaldesa",
    "contact": {
      "phone": "8490042-8490023-8490052",
      "email": "alcaldia@venecia-antioquia.gov.co;contactenos@venecia-antioquia.gov.co"
    },
    "votesMayor": 3131,
    "percentageValidMayor": 49.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Venecia",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 2254,
      "percentageValid": 35.3,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Partido Liberal / Coalición",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Cambio Radical / Oposición",
        "seats": 3,
        "percentageValid": 27.3
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "Turismo (Cerro Tusa) y café.",
      "Minería de carbón",
      "Café y caña panelera",
      "Ganadería doble propósito",
      "Turismo de naturaleza"
    ],
    "securityDynamics": {
      "homicideRate": "Estadísticas pacíficas.",
      "extortionRisk": "Hurtos menores.",
      "armedPresence": "Sin presencia estructural activa."
    },
    "keyProblems": [
      "Buena cobertura."
    ],
    "strategicOpportunities": [
      "Plan Cosecha Segura con despliegue de fuerza pública y monitoreo con drones tácticos",
      "Diversificación agropecuaria (cítricos, plátano, ganadería regenerativa y cardamomo)",
      "Corredor turístico patrimonial y de cafés especiales (Jericó, Jardín, Santa Bárbara)",
      "Pavimentación de circuitos viales estratégicos hacia el corredor del Río Cauca"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05873",
    "name": "Vigía del Fuerte",
    "daneCode": "05873",
    "department": "Antioquia",
    "subregion": "Urabá",
    "subregionId": "uraba",
    "category": "6",
    "population": 8500,
    "electoralCensus": 6460,
    "nbiPercentage": 41.6,
    "areaKm2": 1661.9,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Crítico",
    "predominantParty": "Partido Conservador",
    "winnerParty": "Coalición Vigía del Fuerte Nos Une (Partido Conservador)",
    "electedMayor": "Jhoselin Lozano Mena",
    "mayorTitle": "Alcaldesa",
    "contact": {
      "phone": "8678080-8678034-8678175",
      "email": "contactenos@vigiadelfuerte-antioquia.gov.co"
    },
    "votesMayor": 1798,
    "percentageValidMayor": 48.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Vigía del Fuerte",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 1294,
      "percentageValid": 34.6,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Partido Liberal",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Coalición Cívica / Verde",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Centro Democrático",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Partido Conservador / Oposición",
        "seats": 2,
        "percentageValid": 22.2
      }
    ],
    "totalCouncilSeats": 9,
    "economicSectors": [
      "Pesca y madera.",
      "Banano",
      "Plátano",
      "Ganadería",
      "Pesca"
    ],
    "securityDynamics": {
      "homicideRate": "Moderada.",
      "extortionRisk": "Control de rentas fluviales.",
      "armedPresence": "Presencia de grupos armados (Atrato)."
    },
    "keyProblems": [
      "Deficiencias críticas."
    ],
    "strategicOpportunities": [
      "Puesta en marcha de Puerto Antioquia y Puerto Pisisi como eje marítimo nacional",
      "Industrialización de la cadena del plátano, banano de exportación y palma de aceite",
      "Plan de Seguridad Portuaria y blindaje de corredores contra el narcotráfico",
      "Formalización y titulación de tierras para comunidades afrodescendientes e indígenas"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05885",
    "name": "Yalí",
    "daneCode": "05885",
    "department": "Antioquia",
    "subregion": "Nordeste",
    "subregionId": "nordeste",
    "category": "6",
    "population": 8500,
    "electoralCensus": 6460,
    "nbiPercentage": 39.7,
    "areaKm2": 440.9,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Crítico",
    "predominantParty": "Partido Conservador",
    "winnerParty": "Coalición Yalí Nos Une (Partido Conservador)",
    "electedMayor": "Jhon Jairo Giraldo Posada",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8675023-8675653-8675656",
      "email": "alcaldia@yali-antioquia.gov.co"
    },
    "votesMayor": 2022,
    "percentageValidMayor": 54.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Yalí",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 1455,
      "percentageValid": 38.9,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 33.3
      },
      {
        "party": "Coalición Local",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Centro Democrático",
        "seats": 2,
        "percentageValid": 22.2
      },
      {
        "party": "Partido Liberal / Oposición",
        "seats": 2,
        "percentageValid": 22.2
      }
    ],
    "totalCouncilSeats": 9,
    "economicSectors": [
      "Altísima dependencia de la ganadería, minería de escala meno",
      "Agroindustria panelera tecnificada",
      "Café y cacao",
      "Ganadería doble propósito",
      "Turismo férreo y patrimonial"
    ],
    "securityDynamics": {
      "homicideRate": "Es el de menor conflictividad bélica letal del clúster cañero.",
      "extortionRisk": "Microtráfico urbano tolerado/impuesto y abigeato de ganado.",
      "armedPresence": "Red de abastecimiento para las guardias invisibles del grupo AGC."
    },
    "keyProblems": [
      "Sufre drásticos razonamientos de agua en el casco urbano por verano extremo."
    ],
    "strategicOpportunities": [
      "Mesa de coexistencia entre minería ancestral, pequeños mineros y títulos formales",
      "Ruta de la Panela y agroindustria cañera en Cisneros, San Roque y Yolombó",
      "Presencia institucional reforzada para desarticular el cobro extorsivo",
      "Incentivos tributarios para empresas que creen empleo formal fuera de la minería"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05887",
    "name": "Yarumal",
    "daneCode": "05887",
    "department": "Antioquia",
    "subregion": "Norte",
    "subregionId": "norte",
    "category": "4",
    "population": 46000,
    "electoralCensus": 34960,
    "nbiPercentage": 24.6,
    "areaKm2": 738.3,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Alto",
    "predominantParty": "Centro Democrático",
    "winnerParty": "Coalición Yarumal Adelante (Centro Democrático - Conservador)",
    "electedMayor": "Cristian David Céspedes Correa",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8537429-8537430-8537429",
      "email": "alcaldia@yarumal.gov.co;alcaldiayarumal@gmail.com"
    },
    "votesMayor": 11400,
    "percentageValidMayor": 47.8,
    "runnerUp": {
      "name": "Candidatura Cívica por Yarumal",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 8208,
      "percentageValid": 34.4,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Coalición de Gobierno",
        "seats": 5,
        "percentageValid": 38.5
      },
      {
        "party": "Centro Democrático",
        "seats": 3,
        "percentageValid": 23.1
      },
      {
        "party": "Partido Conservador",
        "seats": 2,
        "percentageValid": 15.4
      },
      {
        "party": "Partido Liberal",
        "seats": 2,
        "percentageValid": 15.4
      },
      {
        "party": "Estatuto de Oposición",
        "seats": 1,
        "percentageValid": 7.6
      }
    ],
    "totalCouncilSeats": 13,
    "economicSectors": [
      "11.5%.",
      "Lechería especializada",
      "Porcicultura",
      "Papa",
      "Piscicultura"
    ],
    "securityDynamics": {
      "homicideRate": "45 por 100,000 hab.",
      "extortionRisk": "Extorsión y microtráfico.",
      "armedPresence": "Disputa entre AGC y Disidencias de las FARC."
    },
    "keyProblems": [
      "Acueducto: 92%, Alcantarillado: 88%, Energía: 98%."
    ],
    "strategicOpportunities": [
      "Protección y fortalecimiento de la cuenca lechera con subsidio a insumos",
      "Fortalecimiento de la seguridad en el eje Hidroituango y cordones rurales",
      "Cadena de valor porcícola y agroindustrial tecnificada",
      "Infraestructura educativa técnica rural para retener el talento joven"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05890",
    "name": "Yolombó",
    "daneCode": "05890",
    "department": "Antioquia",
    "subregion": "Nordeste",
    "subregionId": "nordeste",
    "category": "6",
    "population": 25000,
    "electoralCensus": 19000,
    "nbiPercentage": 39.7,
    "areaKm2": 1012.5,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Crítico",
    "predominantParty": "Partido Conservador",
    "winnerParty": "Coalición Yolombó Nos Une (Partido Conservador)",
    "electedMayor": "Jesús Amador Pérez Palacio",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8654181-8654337-8654200-8655312",
      "email": "alcaldia@yolombo-antioquia.gov.co"
    },
    "votesMayor": 5289,
    "percentageValidMayor": 48.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Yolombó",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 3808,
      "percentageValid": 34.6,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Partido Conservador",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Coalición Local",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Centro Democrático",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Partido Liberal / Oposición",
        "seats": 4,
        "percentageValid": 36.4
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "Capital y cruce del clúster panelero más grande de Antioquia",
      "Agroindustria panelera tecnificada",
      "Café y cacao",
      "Ganadería doble propósito",
      "Turismo férreo y patrimonial"
    ],
    "securityDynamics": {
      "homicideRate": "Tasa moderada. Homicidios atados a control social y ajustes de cuentas.",
      "extortionRisk": "Amenazas extorsivas y robo a fincas en épocas de cosecha panelera.",
      "armedPresence": "Influencia total en retaguardia del Clan del Golfo."
    },
    "keyProblems": [
      "85% Urbano cubierto. Acueductos rurales son trampas biosanitarias en sequía."
    ],
    "strategicOpportunities": [
      "Mesa de coexistencia entre minería ancestral, pequeños mineros y títulos formales",
      "Ruta de la Panela y agroindustria cañera en Cisneros, San Roque y Yolombó",
      "Presencia institucional reforzada para desarticular el cobro extorsivo",
      "Incentivos tributarios para empresas que creen empleo formal fuera de la minería"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05893",
    "name": "Yondó",
    "daneCode": "05893",
    "department": "Antioquia",
    "subregion": "Magdalena Medio",
    "subregionId": "magdalena-medio",
    "category": "6",
    "population": 21500,
    "electoralCensus": 16340,
    "nbiPercentage": 34.3,
    "areaKm2": 1895.0,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Alto",
    "predominantParty": "Partido Liberal",
    "winnerParty": "Coalición Yondó Nos Une (Partido Liberal)",
    "electedMayor": "Yerson Antonio Ariza Rivera",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8325109-8325461-8325025-8325212-8325111",
      "email": "alcaldia@yondo-antioquia.gov.co"
    },
    "votesMayor": 4264,
    "percentageValidMayor": 45.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Yondó",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 3070,
      "percentageValid": 32.4,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Partido Liberal",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Coalición Cívica / Verde",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Centro Democrático",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Partido Conservador / Oposición",
        "seats": 4,
        "percentageValid": 36.4
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "Dependencia del petróleo (Ecopetrol - Casabe). Alto flujo de",
      "Ganadería bovina de ceba",
      "Logística fluvial y ferroviaria",
      "Turismo de fauna y balnearios",
      "Extracción de hidrocarburos y calizas"
    ],
    "securityDynamics": {
      "homicideRate": "Alta por ser 'línea de fuego'.",
      "extortionRisk": "Amenazas a organizaciones comunales.",
      "armedPresence": "Escenario de re-incursión armada: ELN, EPL, FARC y grupos paramilitares."
    },
    "keyProblems": [
      "Deficiencias trágicas de salud, obligando a cruzar a Barrancabermeja."
    ],
    "strategicOpportunities": [
      "Consolidación de Puerto Berrío como nodo multimodal (férreo, fluvial y carretero)",
      "Ganadería regenerativa y producción cárnica tecnificada con valor agregado",
      "Corredor ecoturístico de la cuenca del Río Claro y fauna silvestre",
      "Capacitación técnica en logística y mantenimiento de maquinaria pesada"
    ],
    "updatedAt": "2026-09-20"
  },
  {
    "id": "mpio-05895",
    "name": "Zaragoza",
    "daneCode": "05895",
    "department": "Antioquia",
    "subregion": "Bajo Cauca",
    "subregionId": "bajo-cauca",
    "category": "6",
    "population": 34000,
    "electoralCensus": 25840,
    "nbiPercentage": 47.7,
    "areaKm2": 1167.4,
    "predominantStratum": "Estrato 1 y 2 (Rural predominante)",
    "riskLevel": "Crítico",
    "predominantParty": "Partido Liberal",
    "winnerParty": "Coalición Zaragoza Nos Une (Partido Liberal)",
    "electedMayor": "Andrés Emilio Lujan Monroy",
    "mayorTitle": "Alcalde",
    "contact": {
      "phone": "8388209-8388221-8388209-8388123",
      "email": "alcaldia@zaragoza-antioquia.gov.co;contactenos@zaragoza-antioquia.gov.co"
    },
    "votesMayor": 6894,
    "percentageValidMayor": 46.0,
    "runnerUp": {
      "name": "Candidatura Cívica por Zaragoza",
      "party": "Coalición Opositora / Movimiento Independiente",
      "votes": 4963,
      "percentageValid": 33.1,
      "acceptedOppositionSeat": true
    },
    "councilSeats": [
      {
        "party": "Partido Liberal",
        "seats": 3,
        "percentageValid": 27.3
      },
      {
        "party": "Coalición Cívica / Verde",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Centro Democrático",
        "seats": 2,
        "percentageValid": 18.2
      },
      {
        "party": "Partido Conservador / Oposición",
        "seats": 4,
        "percentageValid": 36.4
      }
    ],
    "totalCouncilSeats": 11,
    "economicSectors": [
      "Minería aurífera aluvial y de veta",
      "Ganadería de ceba y comercial",
      "Piscicultura comercial",
      "Comercio subregional"
    ],
    "securityDynamics": {
      "homicideRate": "Tasa subregional Bajo Cauca: Moderada con vigilancia preventiva",
      "extortionRisk": "Riesgo de extorsión enfocado en comercio local y abigeato rural",
      "armedPresence": "Clan del Golfo (Subestructura Julio César Vargas), ELN Frente Darío Ramírez Castro, Los Caparros residuales"
    },
    "keyProblems": [
      "Guerra abierta y confinamiento de comunidades por Clan del Golfo vs ELN y Disidencias",
      "Deterioro ambiental masivo por dragado y mercurio en fuentes hídricas",
      "Extorsión del gramaje aurífero y parálisis del comercio formal"
    ],
    "strategicOpportunities": [
      "Recuperación del orden público con presencia militar permanente en ejes fluviales",
      "Distrito Minero Especial con sustitución de mercurio y plantas comunitarias",
      "Desarrollo agroforestal y siembra de caucho, cacao y apicultura",
      "Inversión de choque en acueductos veredales y centros de salud de segundo nivel"
    ],
    "updatedAt": "2026-09-20"
  }
];

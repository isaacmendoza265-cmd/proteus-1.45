/**
 * SERVICIO DE INTELIGENCIA PUBLICITARIA HOLÍSTICA (PROTOCOLO PA-011)
 * Articula la Capa de Inteligencia Territorial (Casas Políticas, Monitoreo Multinivel,
 * Mapas de Calor y Variables Integradas) con la Capa de Conversión Publicitaria
 * para maximizar la relación Publicidad / Votos del candidato.
 */

import { POLITICAL_HOUSES_DATA } from '../data/politicalHouses/politicalHousesMasterData';
import { PoliticalHouse } from '../data/politicalHouses/types';
import { getGobernacionStatus, GobernacionStatus } from './gobernacionService';

export interface HeatmapVoterProfile {
  highDensityZones: string[];
  undecidedYouthPercentage: number;
  socioeconomicStrataFocus: string;
  voterTurnoutExpected: number;
  swingVotersPotential: number; // Porcentaje de votantes volátiles captables
}

export interface TerritoryMonitoringContext {
  gobernacionConnected: boolean;
  totalAlertasOcurrencias: number;
  activeAgendas: string[];
  subregionalTrend: string;
  sourceLabel: string;
}

export type TacticalAdPosture = 
  | 'Confrontación Directa' 
  | 'Cooptación de Base' 
  | 'Capitalización de Fractura' 
  | 'Consolidación de Bastión';

export interface TerritoryGeopoliticalIntelligence {
  territory: string;
  dominantHouse: PoliticalHouse | null;
  competingHouses: PoliticalHouse[];
  tacticalPosture: TacticalAdPosture;
  tacticalPostureDescription: string;
  advertisingToVotesMultiplier: number; // Ej: 1.85x de rendimiento
  estimatedVotesPerMillionCOP: number;  // Estimación de sufragios netos generados
  standardVotesPerMillionCOP: number;   // Línea base de campaña genérica
  geopoliticalHooks: string[];          // Ganchos contextuales para creatividades
  institutionalVulnerabilities: string[]; // Grietas de la maquinaria para atacar en pauta
  heatmapProfile: HeatmapVoterProfile;
  monitoringContext: TerritoryMonitoringContext;
}

export interface AdvertisingEfficiencyCalculation {
  budgetCOP: number;
  baseVotesExpected: number;
  holisticVotesExpected: number;
  extraVotesGained: number;
  costPerPersuadedVoteBase: number;
  costPerPersuadedVoteHolistic: number;
  savingsPercentage: number;
  recommendedChannelMix: {
    channel: string;
    sharePercent: number;
    recommendedSpendCOP: number;
  }[];
}

// Catálogo territorial estructurado con datos demográficos y geoespaciales
const TERRITORY_HEATMAP_REGISTRY: Record<string, HeatmapVoterProfile> = {
  'Itagüí': {
    highDensityZones: ['Comuna 1 (Ditaires - San Pío)', 'Comuna 3 (Bariloche - Calatrava)', 'Comuna 6 (La Florida)'],
    undecidedYouthPercentage: 42.5,
    socioeconomicStrataFocus: 'Estratos 2 y 3 (Comercio y manufactura)',
    voterTurnoutExpected: 54.8,
    swingVotersPotential: 34.0
  },
  'Bello': {
    highDensityZones: ['Comuna 4 (Suárez - Salento)', 'Comuna 8 (Niquía - La Selva)', 'Comuna 10 (Fontidueño)'],
    undecidedYouthPercentage: 48.0,
    socioeconomicStrataFocus: 'Estratos 1, 2 y 3 (Clase trabajadora y madres cabeza de hogar)',
    voterTurnoutExpected: 47.2,
    swingVotersPotential: 38.5
  },
  'Envigado': {
    highDensityZones: ['Zona 1 (Las Vegas - San Marcos)', 'Zona 6 (El Dorado - San Rafael)', 'Zona 9 (La Sebastiana)'],
    undecidedYouthPercentage: 33.0,
    socioeconomicStrataFocus: 'Estratos 3, 4 y 5 (Clase media consolidada y profesionales)',
    voterTurnoutExpected: 61.5,
    swingVotersPotential: 26.0
  },
  'Medellín': {
    highDensityZones: ['Comuna 7 (Robledo)', 'Comuna 13 (San Javier)', 'Comuna 16 (Belén)', 'Comuna 10 (La Candelaria)'],
    undecidedYouthPercentage: 45.2,
    socioeconomicStrataFocus: 'Estratos 1 a 4 (Población estudiantil, comerciantes independientes)',
    voterTurnoutExpected: 52.6,
    swingVotersPotential: 36.2
  },
  'Sabaneta': {
    highDensityZones: ['Calle Larga - Holanda', 'Prados de Sabaneta', 'María Auxiliadora'],
    undecidedYouthPercentage: 35.8,
    socioeconomicStrataFocus: 'Estratos 3 y 4 (Jóvenes profesionales y condominios)',
    voterTurnoutExpected: 59.4,
    swingVotersPotential: 29.5
  },
  'La Estrella': {
    highDensityZones: ['Cabecera Urbana - Ancón', 'La Tablaza - San José'],
    undecidedYouthPercentage: 41.0,
    socioeconomicStrataFocus: 'Estratos 2 y 3 (Población industrial)',
    voterTurnoutExpected: 51.0,
    swingVotersPotential: 32.5
  },
  'Caldas': {
    highDensityZones: ['Centro - Olaya Herrera', 'La Inmaculada', 'Felipe Mesa'],
    undecidedYouthPercentage: 39.5,
    socioeconomicStrataFocus: 'Estratos 2 y 3 (Arraigo cerámico y comercial)',
    voterTurnoutExpected: 53.2,
    swingVotersPotential: 31.0
  },
  'Copacabana': {
    highDensityZones: ['San Juan de la Tasajera', 'La Asunción - El Pedregal'],
    undecidedYouthPercentage: 43.0,
    socioeconomicStrataFocus: 'Estratos 2 y 3 (Zona norte metropolitana)',
    voterTurnoutExpected: 49.8,
    swingVotersPotential: 35.0
  },
  'Girardota': {
    highDensityZones: ['Centro Histórico - El Llano', 'Juan Cojo - Montecarlo'],
    undecidedYouthPercentage: 38.0,
    socioeconomicStrataFocus: 'Estratos 2 y 3 (Sector rural e industrial)',
    voterTurnoutExpected: 56.1,
    swingVotersPotential: 28.0
  },
  'Barbosa': {
    highDensityZones: ['Peñolcito - Cabecera', 'Hatillo - La Cejita'],
    undecidedYouthPercentage: 44.0,
    socioeconomicStrataFocus: 'Estratos 1 y 2 (Comunidad campesina y peajes)',
    voterTurnoutExpected: 50.5,
    swingVotersPotential: 37.0
  },
  'Antioquia': {
    highDensityZones: ['Valle de Aburrá', 'Oriente Antioqueño (Rionegro - Marinilla)', 'Urabá (Apartadó - Turbo)'],
    undecidedYouthPercentage: 41.8,
    socioeconomicStrataFocus: 'Multiestrato Departamental',
    voterTurnoutExpected: 53.0,
    swingVotersPotential: 33.5
  }
};

export class HolisticAdvertisingIntelligenceService {
  /**
   * Resuelve la casa política predominante para un municipio dado
   */
  public static findDominantHouseForTerritory(territoryName: string): PoliticalHouse | null {
    const cleanTerritory = territoryName.trim().toLowerCase();
    
    // Búsqueda por sede central
    const byHeadquarters = POLITICAL_HOUSES_DATA.find(
      h => h.headquarters.toLowerCase().includes(cleanTerritory) || cleanTerritory.includes(h.headquarters.toLowerCase())
    );
    if (byHeadquarters) return byHeadquarters;

    // Búsqueda por municipios bajo influencia
    const byInfluence = POLITICAL_HOUSES_DATA.find(
      h => h.municipalitiesUnderInfluence.some(m => m.toLowerCase().includes(cleanTerritory) || cleanTerritory.includes(m.toLowerCase()))
    );
    if (byInfluence) return byInfluence;

    // Default para Antioquia general
    return POLITICAL_HOUSES_DATA[0] || null;
  }

  /**
   * Identifica casas rivales o en disputa en el mismo territorio
   */
  public static findCompetingHouses(territoryName: string, dominantHouseId?: string): PoliticalHouse[] {
    const cleanTerritory = territoryName.trim().toLowerCase();
    return POLITICAL_HOUSES_DATA.filter(h => {
      if (dominantHouseId && h.id === dominantHouseId) return false;
      const inHQ = h.headquarters.toLowerCase().includes(cleanTerritory) || cleanTerritory.includes(h.headquarters.toLowerCase());
      const inInfluence = h.municipalitiesUnderInfluence.some(m => m.toLowerCase().includes(cleanTerritory) || cleanTerritory.includes(m.toLowerCase()));
      return inHQ || inInfluence;
    });
  }

  /**
   * Construye el diagnóstico geopolítico y los ganchos de persuasión publicitaria
   */
  public static async getTerritoryIntelligence(
    territoryName: string,
    candidateName: string = 'Isaac Mendoza'
  ): Promise<TerritoryGeopoliticalIntelligence> {
    const normalizedTerritory = Object.keys(TERRITORY_HEATMAP_REGISTRY).find(
      t => t.toLowerCase() === territoryName.toLowerCase()
    ) || (territoryName.includes('Medellín') ? 'Medellín' : 'Antioquia');

    const heatmapProfile = TERRITORY_HEATMAP_REGISTRY[normalizedTerritory] || TERRITORY_HEATMAP_REGISTRY['Antioquia'];
    const dominantHouse = this.findDominantHouseForTerritory(normalizedTerritory);
    const competingHouses = this.findCompetingHouses(normalizedTerritory, dominantHouse?.id);

    // Monitoreo de Gobernación & Proyecto Independencia
    let gobernacionStatus: GobernacionStatus | null = null;
    try {
      gobernacionStatus = await getGobernacionStatus();
    } catch {
      gobernacionStatus = null;
    }

    // Determinación de la Postura Táctica de Publicidad
    let tacticalPosture: TacticalAdPosture = 'Cooptación de Base';
    let tacticalPostureDescription = '';
    let multiplier = 1.35;
    const hooks: string[] = [];
    const vulnerabilities: string[] = [];

    if (dominantHouse) {
      vulnerabilities.push(...dominantHouse.keyInstitutionsControlled.map(inst => `Control burocrático de ${inst}`));
      vulnerabilities.push(dominantHouse.dialecticalSummary.antithesis);

      if (dominantHouse.headquarters.toLowerCase() === normalizedTerritory.toLowerCase()) {
        // En el feudo central de la casa
        tacticalPosture = 'Confrontación Directa';
        tacticalPostureDescription = `En ${normalizedTerritory}, la ${dominantHouse.name} ostenta hegemonía institucional. La pauta debe ofrecer una alternativa limpia sin tocar los beneficios sociales de la comunidad.`;
        multiplier = 1.85;

        hooks.push(`"¿Cansado de que en ${normalizedTerritory} los mismos de siempre decidan por tu familia? ${candidateName} propone romper el monopolio clientelar con meritocracia real."`);
        hooks.push(`"Los contratos de ${dominantHouse.keyInstitutionsControlled[0] || 'la alcaldía'} deben ser para la gente trabajadora, no para financiar maquinarias electorales."`);
        hooks.push(`"${candidateName} defiende el empleo local sin exigir favores ni votos amarrados a contratistas."`);
      } else {
        // En zona de influencia o periferia
        tacticalPosture = 'Capitalización de Fractura';
        tacticalPostureDescription = `Zona en disputa entre ${dominantHouse.name} y fuerzas emergentes. La pauta debe capitalizar el descontento de los sectores olvidados por la maquinaria central.`;
        multiplier = 1.60;

        hooks.push(`"A ${normalizedTerritory} no la mandan desde afuera. ${candidateName} representa la verdadera voz independiente en el Congreso."`);
        hooks.push(`"Más presupuesto para obras en ${normalizedTerritory} y cero peajes burocráticos para las familias emprendedoras."`);
      }
    } else {
      tacticalPosture = 'Cooptación de Base';
      tacticalPostureDescription = `Territorio abierto con alta dispersión del voto. Enfoque prioritario en jóvenes indecisos y comerciantes independientes.`;
      multiplier = 1.40;
      hooks.push(`"Una política seria que cuida tu bolsillo y fomenta el emprendimiento en todo el territorio."`);
      hooks.push(`"${candidateName}: La opción técnica y transparente para transformar Antioquia."`);
    }

    // Estimación de métricas de conversión
    const standardVotesPerMillionCOP = 75; // Campaña tradicional difusa sin inteligencia (1 voto / ~$13.333 COP)
    const estimatedVotesPerMillionCOP = Math.round(standardVotesPerMillionCOP * multiplier);

    const monitoringContext: TerritoryMonitoringContext = {
      gobernacionConnected: !!gobernacionStatus?.connected,
      totalAlertasOcurrencias: gobernacionStatus?.totalNoticias || 142,
      activeAgendas: [
        'Financiación y desentrabe de Vías 4G / Túnel del Toyo',
        'Seguridad metropolitana y control territorial en comunas',
        'Incentivos fiscales para mipymes y empleo juvenil departamental'
      ],
      subregionalTrend: normalizedTerritory === 'Antioquia' 
        ? 'Tensión fiscal por recorte de transferencias nacionales' 
        : `Demanda de autonomía presupuestal frente a la Gobernación central`,
      sourceLabel: gobernacionStatus?.connected ? 'Gobernación Sync Activa' : 'Sensor Independencia Local'
    };

    return {
      territory: normalizedTerritory,
      dominantHouse,
      competingHouses,
      tacticalPosture,
      tacticalPostureDescription,
      advertisingToVotesMultiplier: multiplier,
      estimatedVotesPerMillionCOP,
      standardVotesPerMillionCOP,
      geopoliticalHooks: hooks,
      institutionalVulnerabilities: vulnerabilities,
      heatmapProfile,
      monitoringContext
    };
  }

  /**
   * Simula la eficiencia del gasto publicitario comparando el enfoque genérico vs holístico
   */
  public static calculateAdvertisingVotesEfficiency(
    budgetCOP: number,
    multiplier: number = 1.75
  ): AdvertisingEfficiencyCalculation {
    const baseRatePerMillion = 75; // votos por millón COP en pauta ciega
    const millions = budgetCOP / 1_000_000;

    const baseVotesExpected = Math.round(millions * baseRatePerMillion);
    const holisticVotesExpected = Math.round(millions * baseRatePerMillion * multiplier);
    const extraVotesGained = holisticVotesExpected - baseVotesExpected;

    const costPerPersuadedVoteBase = budgetCOP > 0 && baseVotesExpected > 0 
      ? Math.round(budgetCOP / baseVotesExpected) 
      : 13333;
    const costPerPersuadedVoteHolistic = budgetCOP > 0 && holisticVotesExpected > 0 
      ? Math.round(budgetCOP / holisticVotesExpected) 
      : Math.round(13333 / multiplier);

    const savingsPercentage = Math.round(((costPerPersuadedVoteBase - costPerPersuadedVoteHolistic) / costPerPersuadedVoteBase) * 100);

    // Mix recomendado de canales según eficiencia holística
    const recommendedChannelMix = [
      { channel: 'Meta Ads (Instagram / Facebook Segmentado)', sharePercent: 45, recommendedSpendCOP: Math.round(budgetCOP * 0.45) },
      { channel: 'TikTok Ads (Video 15s Hook Territorial)', sharePercent: 30, recommendedSpendCOP: Math.round(budgetCOP * 0.30) },
      { channel: 'Micro-WhatsApp Barrial y Líderes de Base', sharePercent: 15, recommendedSpendCOP: Math.round(budgetCOP * 0.15) },
      { channel: 'Pauta Radial Hiperlocal / Vallas Estratégicas', sharePercent: 10, recommendedSpendCOP: Math.round(budgetCOP * 0.10) }
    ];

    return {
      budgetCOP,
      baseVotesExpected,
      holisticVotesExpected,
      extraVotesGained,
      costPerPersuadedVoteBase,
      costPerPersuadedVoteHolistic,
      savingsPercentage,
      recommendedChannelMix
    };
  }

  /**
   * Retorna los territorios con inteligencia geopolítica modelada en el aplicativo
   */
  public static getAvailableTerritories(): string[] {
    return Object.keys(TERRITORY_HEATMAP_REGISTRY);
  }
}

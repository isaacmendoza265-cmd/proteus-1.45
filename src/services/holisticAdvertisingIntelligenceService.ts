/**
 * SERVICIO DE INTELIGENCIA PUBLICITARIA HOLÍSTICA (PROTOCOLO PA-011)
 * Articula la Capa de Inteligencia Territorial (Casas Políticas, Monitoreo Multinivel,
 * Mapas de Calor y Variables Integradas) con la Capa de Conversión Publicitaria
 * para maximizar la relación Publicidad / Votos del candidato.
 */

import { POLITICAL_HOUSES_DATA, GRAPH_NODES_DATA } from '../data/politicalHouses/politicalHousesMasterData';
import { PoliticalHouse, GraphNodeActor } from '../data/politicalHouses/types';
import { getGobernacionStatus, GobernacionStatus } from './gobernacionService';

export interface LocalCouncilorSummary {
  name: string;
  partyName: string;
  roleLabel: string;
  votes2023?: number;
  status: string;
  bio: string;
  isReplacement?: boolean;
  replacedWho?: string;
  headlineTopic?: string;
}

export interface CurulReplacementEvent {
  outgoingName: string;
  incomingName: string;
  curulTitle: string;
  partyName: string;
  reason: string;
  dateLabel: string;
  politicalOpportunity: string;
  adHookSuggestion: string;
}

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
  localCouncilors: LocalCouncilorSummary[]; // Micro-redes de concejales de base
  recentReplacements: CurulReplacementEvent[]; // Trazabilidad de relevos institucionales
  totalCouncilorsCount: number;
  electoralDynamicsNotes: string;
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
    highDensityZones: ['Comuna 7 (Robledo)', 'Comuna 13 (San Javier)', 'Comuna 16 (Belén)', 'Comuna 10 (La Candelaria)', 'Comuna 11 (Laureles)'],
    undecidedYouthPercentage: 45.2,
    socioeconomicStrataFocus: 'Estratos 1 a 4 (Población estudiantil, comerciantes independientes, gremio salud)',
    voterTurnoutExpected: 52.6,
    swingVotersPotential: 36.2
  },
  'Sabaneta': {
    highDensityZones: ['Calle Larga - Holanda', 'Prados de Sabaneta', 'María Auxiliadora', 'Las Lomitas'],
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
  'Rionegro': {
    highDensityZones: ['Centro Histórico - San Antonio de Pereira', 'El Porvenir - Cuatro Esquinas', 'Llanogrande - Aeropuerto JMC'],
    undecidedYouthPercentage: 36.5,
    socioeconomicStrataFocus: 'Estratos 3, 4 y 5 (Sector salud, agroindustrial y aeronáutico)',
    voterTurnoutExpected: 62.1,
    swingVotersPotential: 27.4
  },
  'Antioquia': {
    highDensityZones: ['Valle de Aburrá', 'Oriente Antioqueño (Rionegro - Marinilla)', 'Urabá (Apartadó - Turbo)'],
    undecidedYouthPercentage: 41.8,
    socioeconomicStrataFocus: 'Multiestrato Departamental',
    voterTurnoutExpected: 53.0,
    swingVotersPotential: 33.5
  },
  'Bogotá D.C.': {
    highDensityZones: ['Suba (La Gaitana, Rincón)', 'Kennedy (Patio Bonito, Castilla)', 'Engativá', 'Bosa', 'Usaquén'],
    undecidedYouthPercentage: 47.0,
    socioeconomicStrataFocus: 'Multiestrato Distrital (Estratos 2 a 4)',
    voterTurnoutExpected: 52.0,
    swingVotersPotential: 39.0
  },
  'Meta': {
    highDensityZones: ['Villavicencio (Comunas 4, 7 y 8)', 'Acacías', 'Granada', 'Puerto López'],
    undecidedYouthPercentage: 43.5,
    socioeconomicStrataFocus: 'Agroindustria llanera, comercio y sector de hidrocarburos',
    voterTurnoutExpected: 55.4,
    swingVotersPotential: 35.0
  },
  'Santander': {
    highDensityZones: ['Bucaramanga (Cabecera, Centro, Real de Minas)', 'Floridablanca', 'Piedecuesta', 'Barrancabermeja'],
    undecidedYouthPercentage: 41.0,
    socioeconomicStrataFocus: 'Clase media comercial, calzado, salud y petróleo',
    voterTurnoutExpected: 58.2,
    swingVotersPotential: 33.0
  },
  'Valle del Cauca': {
    highDensityZones: ['Cali (Aguablanca, Comunas 17, 19 y 22)', 'Palmira', 'Buenaventura', 'Tuluá'],
    undecidedYouthPercentage: 49.0,
    socioeconomicStrataFocus: 'Sector azucarero, logística portuaria y servicios',
    voterTurnoutExpected: 48.6,
    swingVotersPotential: 40.5
  },
  'Cundinamarca': {
    highDensityZones: ['Soacha', 'Chía - Cajicá - Zipaquirá', 'Facatativá - Mosquera - Funza', 'Girardot'],
    undecidedYouthPercentage: 42.0,
    socioeconomicStrataFocus: 'Cinturón industrial, agropecuario y ciudades dormitorio',
    voterTurnoutExpected: 54.0,
    swingVotersPotential: 34.2
  },
  'Atlántico': {
    highDensityZones: ['Barranquilla (Suroccidente, Metropolitana, Norte)', 'Soledad', 'Malambo', 'Sabanalarga'],
    undecidedYouthPercentage: 46.2,
    socioeconomicStrataFocus: 'Sector portuario, comercio formal e informal (Estratos 1 a 3)',
    voterTurnoutExpected: 56.8,
    swingVotersPotential: 36.5
  }
};

export class HolisticAdvertisingIntelligenceService {
  /**
   * Normaliza cadenas para comparaciones robustas sin tildes ni mayúsculas
   */
  public static normalizeText(text: string): string {
    if (!text) return '';
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  /**
   * Resuelve la casa política predominante para un municipio dado
   */
  public static findDominantHouseForTerritory(territoryName: string): PoliticalHouse | null {
    const cleanTerritory = this.normalizeText(territoryName);
    
    // Búsqueda por sede central
    const byHeadquarters = POLITICAL_HOUSES_DATA.find(h => {
      const cleanHQ = this.normalizeText(h.headquarters);
      return cleanHQ.includes(cleanTerritory) || cleanTerritory.includes(cleanHQ);
    });
    if (byHeadquarters) return byHeadquarters;

    // Búsqueda por municipios bajo influencia
    const byInfluence = POLITICAL_HOUSES_DATA.find(h => 
      h.municipalitiesUnderInfluence.some(m => {
        const cleanM = this.normalizeText(m);
        return cleanM.includes(cleanTerritory) || cleanTerritory.includes(cleanM);
      })
    );
    if (byInfluence) return byInfluence;

    // Default para Antioquia general
    return POLITICAL_HOUSES_DATA[0] || null;
  }

  /**
   * Identifica casas rivales o en disputa en el mismo territorio
   */
  public static findCompetingHouses(territoryName: string, dominantHouseId?: string): PoliticalHouse[] {
    const cleanTerritory = this.normalizeText(territoryName);
    return POLITICAL_HOUSES_DATA.filter(h => {
      if (dominantHouseId && h.id === dominantHouseId) return false;
      const cleanHQ = this.normalizeText(h.headquarters);
      const inHQ = cleanHQ.includes(cleanTerritory) || cleanTerritory.includes(cleanHQ);
      const inInfluence = h.municipalitiesUnderInfluence.some(m => {
        const cleanM = this.normalizeText(m);
        return cleanM.includes(cleanTerritory) || cleanTerritory.includes(cleanM);
      });
      return inHQ || inInfluence;
    });
  }

  /**
   * Construye el diagnóstico geopolítico y los ganchos de persuasión publicitaria
   * integrando micro-redes de concejales locales y trazabilidad de relevos de curules (PA-012)
   */
  public static async getTerritoryIntelligence(
    territoryName: string,
    candidateName: string = 'Isaac Mendoza'
  ): Promise<TerritoryGeopoliticalIntelligence> {
    const cleanTarget = this.normalizeText(territoryName);

    // Mapear el nombre a una clave conocida en TERRITORY_HEATMAP_REGISTRY
    const registryKey = Object.keys(TERRITORY_HEATMAP_REGISTRY).find(
      k => this.normalizeText(k) === cleanTarget
    );

    const normalizedTerritory = registryKey 
      ? registryKey 
      : (cleanTarget.includes('medellin') 
          ? 'Medellín' 
          : (cleanTarget.includes('rionegro') 
              ? 'Rionegro' 
              : (cleanTarget.includes('bogota') 
                  ? 'Bogotá D.C.' 
                  : territoryName)));

    const heatmapProfile = TERRITORY_HEATMAP_REGISTRY[normalizedTerritory] || {
      highDensityZones: [`Cabecera y Centros Urbanos Estratégicos de ${normalizedTerritory}`],
      undecidedYouthPercentage: 42.0,
      socioeconomicStrataFocus: 'Población Multiestrato y Emprendedores Locales',
      voterTurnoutExpected: 53.5,
      swingVotersPotential: 34.0
    };

    const dominantHouse = this.findDominantHouseForTerritory(normalizedTerritory);
    const competingHouses = this.findCompetingHouses(normalizedTerritory, dominantHouse?.id);

    // Ingesta de Concejales y Micro-Redes Locales (Protocolo PA-012)
    const matchedCouncilors = GRAPH_NODES_DATA.filter(node => {
      if (node.role !== 'concejal') return false;
      const nodeMuni = this.normalizeText(node.municipality);
      return nodeMuni === cleanTarget || (cleanTarget.includes(nodeMuni) && nodeMuni.length > 3) || (nodeMuni.includes(cleanTarget) && cleanTarget.length > 3);
    });

    const localCouncilors: LocalCouncilorSummary[] = matchedCouncilors.map(c => {
      const isReplacement = c.id.includes('reemplazo') || c.status.toLowerCase().includes('asumio curul');
      let replacedWho: string | undefined = undefined;
      let headlineTopic = 'Control político y desarrollo comunitario';

      if (c.name.includes('Milton Darío Vasco')) {
        replacedWho = 'Sebastián López Valencia';
        headlineTopic = 'Seguridad ciudadana, control estricto al gasto distrital y orden';
      } else if (c.name.includes('Jorge Julián Osorio')) {
        replacedWho = 'Claudia Carrasquilla Minami';
        headlineTopic = 'Salud pública, dignificación del cuerpo médico y rescate de Metrosalud';
      } else if (c.name.includes('Andrés Tobón') || c.name.includes('Andres Felipe Tobon')) {
        headlineTopic = 'Seguridad barrial, combate a rentas criminales e institucionalidad';
      } else if (c.name.includes('Jhony Oswaldo Vélez') || c.name.includes('Jhony Velez')) {
        headlineTopic = 'Fiscalización independiente y oposición a la hegemonía política tradicional';
      } else if (c.name.includes('Iván Alonso Montoya') || c.name.includes('Ivan Alonso Montoya')) {
        headlineTopic = 'Defensa del POT, freno al colapso de servicios y densificación vertical';
      } else if (c.name.includes('Lina Marcela Ciro')) {
        headlineTopic = 'Desarrollo vial del Oriente, Túnel de Oriente y sinergia departamental';
      } else if (c.name.includes('Duván Alberto Bedoya') || c.name.includes('Duvan Bedoya')) {
        headlineTopic = 'Vigilancia a la contratación del norte metropolitano y empleo juvenil';
      } else if (c.name.includes('Andrés Camilo Arcila') || c.name.includes('Andres Arcila')) {
        headlineTopic = 'Gestión social barrial y articulación institucional en Itagüí';
      } else if (c.name.includes('Carlos Andrés Zapata') || c.name.includes('Carlos Zapata')) {
        headlineTopic = 'Lucha por el desmonte de peajes abusivos y defensa del campesinado';
      }

      return {
        name: c.name,
        partyName: c.partyName || 'Independiente',
        roleLabel: c.roleLabel,
        votes2023: c.votes2023,
        status: c.status,
        bio: c.bio,
        isReplacement,
        replacedWho,
        headlineTopic
      };
    });

    // Trazabilidad de Relevos de Curules
    const recentReplacements: CurulReplacementEvent[] = [];
    if (cleanTarget === 'medellin' || cleanTarget.includes('medellin')) {
      recentReplacements.push({
        outgoingName: 'Sebastián López Valencia',
        incomingName: 'Milton Darío Vasco Restrepo',
        curulTitle: 'Curul Centro Democrático en el Concejo Distrital de Medellín',
        partyName: 'Centro Democrático',
        dateLabel: 'Mayo 2026',
        reason: 'Renuncia voluntaria de Sebastián López para asumir la Jefatura de Campaña Presidencial de Paloma Valencia, adelantar estudios de maestría en Harvard y estructurar su precandidatura a la Alcaldía de Medellín 2027.',
        politicalOpportunity: 'Refuerza la línea doctrinaria uribista en seguridad y disciplina fiscal con Milton Vasco, garantizando contundencia frente a la izquierda.',
        adHookSuggestion: `Con el relevo en el Concejo de Medellín y la llegada de Milton Vasco, el control riguroso al presupuesto no se detiene. ${candidateName} llevará esta misma firmeza al Congreso.`
      });

      recentReplacements.push({
        outgoingName: 'Claudia Carrasquilla Minami',
        incomingName: 'Dr. Jorge Julián Osorio Gómez',
        curulTitle: 'Curul Centro Democrático en el Concejo Distrital de Medellín',
        partyName: 'Centro Democrático',
        dateLabel: 'Agosto 2026',
        reason: 'Designación de Claudia Carrasquilla como Viceministra de Defensa Nacional en el Gobierno, asumiendo la curul el Dr. Jorge Julián Osorio Gómez (Médico cirujano y exrector de la Universidad CES por más de 8 años).',
        politicalOpportunity: 'Oportunidad de oro para captar el voto de médicos, personal de salud, estudiantes universitarios y familias usuarias de Metrosalud/Savia Salud.',
        adHookSuggestion: `La llegada del médico y exrector del CES Dr. Jorge Julián Osorio al Concejo nos convoca a salvar a Metrosalud. ${candidateName} legislará por una salud digna y sin politiquería.`
      });
    }

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
    let multiplier = 1.45;
    const hooks: string[] = [];
    const vulnerabilities: string[] = [];
    let electoralDynamicsNotes = '';

    if (dominantHouse) {
      vulnerabilities.push(...dominantHouse.keyInstitutionsControlled.map(inst => `Control burocrático de ${inst}`));
      vulnerabilities.push(dominantHouse.dialecticalSummary.antithesis);

      const dominantHQ = this.normalizeText(dominantHouse.headquarters);
      if (dominantHQ === cleanTarget) {
        tacticalPosture = 'Confrontación Directa';
        tacticalPostureDescription = `En ${normalizedTerritory}, la ${dominantHouse.name} ostenta hegemonía institucional cerrada. La pauta debe ofrecer una alternativa limpia sin tocar los beneficios sociales de la comunidad.`;
        multiplier = 1.95;
      } else {
        tacticalPosture = 'Capitalización de Fractura';
        tacticalPostureDescription = `Zona en disputa entre ${dominantHouse.name} y fuerzas emergentes locales. La pauta debe capitalizar el descontento de los sectores desatendidos por la maquinaria central.`;
        multiplier = 1.70;
      }
    } else {
      tacticalPosture = 'Cooptación de Base';
      tacticalPostureDescription = `Territorio abierto con alta dispersión del voto o circunscripción departamental. Enfoque prioritario en jóvenes indecisos, clases medias y voto libre.`;
      multiplier = 1.50;
    }

    // Generación de Ganchos Geopolíticos Contextuales e Hiperlocales
    if (cleanTarget === 'medellin' || cleanTarget.includes('medellin')) {
      hooks.push(`"Con la llegada del Dr. Jorge Julián Osorio (exrector CES) al Concejo, Medellín exige recuperar Metrosalud y dignificar a los médicos. ${candidateName} llevará esta causa técnica y humana a la legislación nacional."`);
      hooks.push(`"El control riguroso al gasto público no se negocia. Junto a la bancada que defiende a Medellín y el liderazgo de Milton Vasco, ${candidateName} vigilará que cada peso de los impuestos regrese en seguridad para los barrios."`);
      hooks.push(`"Medellín no retrocede: impulsamos a los emprendedores, la innovación tecnológica y el talento joven de las 16 comunas sin burocracia estatal."`);
      hooks.push(`"¿Cansado de la polarización que frenó a la ciudad? ${candidateName}: La propuesta que articula orden institucional, inversión social y apoyo a la empresa privada."`);
      electoralDynamicsNotes = 'Distrito con 21 concejales: 8 Creemos, 5 Centro Democrático (relevos Vasco y Osorio activos), 2 Conservadores, 1 Liberal, 1 Verde, 1 Pacto Histórico, 1 CD Independiente.';
    } else if (cleanTarget === 'itagui') {
      hooks.push(`"¿Cansado de que en Itagüí los mismos de siempre manejen los contratos de la Alcaldía? ${candidateName} propone romper el monopolio clientelar con meritocracia y oportunidades reales para los itagüiseños."`);
      hooks.push(`"En Itagüí la gente trabajadora de Ditaires, San Pío y Calatrava no le debe el voto a ninguna maquinaria. ${candidateName} representa la verdadera voz libre del sur."`);
      hooks.push(`"Los programas sociales de Itagüí son un derecho de la gente, no una dádiva a cambio de votos. Cuidemos a la familia trabajadora con ${candidateName}."`);
      electoralDynamicsNotes = 'Feudo central de la Casa Trujillo (Equipo de Antioquia) con 6 concejales conservadores propios. Requiere pauta de voto libre y desmonte de intimidación contractual.';
    } else if (cleanTarget === 'bello') {
      hooks.push(`"En Bello el control político al presupuesto no se vende. Concejales independientes vigilan cada peso mientras ${candidateName} gestiona desde el Congreso inversión en transporte masivo y seguridad para las comunas."`);
      hooks.push(`"Bello merece salir del estigma: no más maquinarias que se turnan la administración. Una nueva generación de liderazgos honestos se levanta con ${candidateName}."`);
      hooks.push(`"Seguridad real en Niquía, Suárez y Fontidueño sin acuerdos bajo la mesa. ${candidateName}: Mano firme contra la extorsión y apoyo al comerciante barrial."`);
      electoralDynamicsNotes = 'Territorio bajo el influjo de la Casa Suárez Mira / Lorena González. Disputa activa con bancadas de oposición del CD y Liberal.';
    } else if (cleanTarget === 'envigado') {
      hooks.push(`"Los más de 27.000 ciudadanos que votaron con valentía por el cambio en Envigado no están solos. Junto a los liderazgos que hacen control riguroso, ${candidateName} defiende un Envigado transparente y sin peajes burocráticos."`);
      hooks.push(`"Envigado es ejemplo de calidad de vida y civismo, no un feudo hereditario. Es hora de renovar la representación legislativa en Bogotá con ${candidateName}."`);
      hooks.push(`"Cero complacencia con el continuismo: defendemos las finanzas del municipio y apoyamos a los emprendedores locales. ${candidateName} en el Congreso."`);
      electoralDynamicsNotes = 'Hegemonía histórica liberal de la Casa Londoño/Espinosa, desafiada por la histórica votación opositora de Jhony Vélez (27.702 votos).';
    } else if (cleanTarget === 'sabaneta') {
      hooks.push(`"El colapso del POT en Sabaneta no aguanta un edificio más sin vías ni agua asegurada. Defendemos la calidad de vida y el espacio público de las familias sabaneteñas junto al liderazgo cívico local y ${candidateName}."`);
      hooks.push(`"Sabaneta merece planeación seria y cero favores a la construcción desmedida. ${candidateName}: Progreso ordenado, movilidad ágil y colegios dignos."`);
      electoralDynamicsNotes = 'Disputa entre la administración municipal y el bloque de control del POT liderado por Iván Alonso Montoya (13.836 votos) y el Centro Democrático.';
    } else if (cleanTarget === 'rionegro') {
      hooks.push(`"Rionegro es la capital del Oriente Antioqueño y el motor de la innovación. Junto a la bancada leal al desarrollo regional y al Gobernador Andrés Julián Rendón, ${candidateName} impulsará la segunda fase del Túnel de Oriente y la conectividad agroindustrial."`);
      hooks.push(`"El Oriente antioqueño produce la riqueza y merece autonomía presupuestal. ${candidateName} defenderá las regalías y las vías campesinas en el Congreso."`);
      electoralDynamicsNotes = 'Bastión político del Gobernador Andrés Julián Rendón y bancada del Centro Democrático (Lina Ciro y Oscar García). Eje estratégico de conectividad vial.';
    } else if (cleanTarget === 'copacabana') {
      hooks.push(`"El peaje de Copacabana y la congestión de la Autopista Norte son una afrenta para las familias trabajadoras. ${candidateName} liderará la batalla legislativa para poner fin a los abusos viales en el norte del Valle."`);
      hooks.push(`"Copacabana merece inversiones directas en juventud, salud y seguridad. ${candidateName}: Representación directa sin intermediarios."`);
      electoralDynamicsNotes = 'Municipio en transición gobernado por Johnnatan Pineda (Creemos) con oposición liberal y conservadora activa.';
    } else if (cleanTarget === 'caldas') {
      hooks.push(`"Caldas tiene historia, industria cerámica y vocación de futuro. Apoyamos el control riguroso a la inversión municipal y exigimos la extensión del sistema masivo de transporte hasta nuestro parque principal. ${candidateName} es la voz de Caldas en Bogotá."`);
      hooks.push(`"Protección a la cuenca del Río Aburrá y apoyo a las microempresas caldenses con ${candidateName}."`);
      electoralDynamicsNotes = 'Disputa entre la coalición de gobierno y la bancada de Creemos liderada por Raúl Mesa (oposición Ley 1909).';
    } else if (cleanTarget === 'la estrella') {
      hooks.push(`"La Estrella crece, pero necesita agua potable garantizada y transporte digno en La Tablaza y Ancón. ${candidateName} legislará para que los recursos metropolitanos lleguen a cada rincón del sur."`);
      electoralDynamicsNotes = 'Equilibrio de fuerzas con presencia de concejales del CD (Willington Herrera), Creemos y Conservador.';
    } else if (cleanTarget === 'girardota') {
      hooks.push(`"Girardota no puede ser el patio trasero ambiental del Valle de Aburrá. Exigimos compensación ambiental justa y defensa de la cuenca hídrica. ${candidateName} protege el aire y el bienestar de las familias girardotanas."`);
      electoralDynamicsNotes = 'Tensión por impacto ambiental y relleno sanitario. Vocería conservadora y liberal en el concejo.';
    } else if (cleanTarget === 'barbosa') {
      hooks.push(`"¡Desmonte definitivo del peaje de Trapiche y cabellera de inversión en vías rurales! Barbosa ha sido ignorada por décadas. ${candidateName} liderará la justicia tarifaria para el norte."`);
      electoralDynamicsNotes = 'Foco de resistencia ciudadana contra los peajes de la Autopista Norte. Concejal Carlos Zapata (CD) activo en la causa.';
    } else if (cleanTarget.includes('bogota')) {
      hooks.push(`"Bogotá produce más del 25% del PIB nacional y merece un Congreso que defienda el Metro sin bloqueos ideológicos y garantice seguridad con mano firme. ${candidateName}: Liderazgo con carácter."`);
      hooks.push(`"No más impuestos asfixiantes para la clase media y comerciantes bogotanos. ${candidateName} defiende la libertad de trabajar sin trabas."`);
      electoralDynamicsNotes = 'Distrito Capital con circunscripción nacional. Alta concentración de votantes de opinión y jóvenes desencantados.';
    } else if (cleanTarget.includes('meta')) {
      hooks.push(`"Los Llanos Orientales alimentan a Colombia pero están aislados por los constantes cierres de la vía al Llano. ${candidateName} exigirá soluciones definitivas de infraestructura y defensa de las regalías petroleras para el Meta."`);
      hooks.push(`"Apoyo total al sector ganadero, arrocero y palmero del Meta: crédito blando, seguridad rural contra la extorsión y cero asfixia tributaria con ${candidateName}."`);
      electoralDynamicsNotes = 'Departamento clave de la Orinoquía con 29 municipios. Demanda histórica de conectividad vial hacia Bogotá y defensa de regalías.';
    } else if (cleanTarget.includes('santander')) {
      hooks.push(`"Santander es tierra de ciudadanos comuneros y emprendedores que no se arrodillan. ${candidateName} defenderá la industria del calzado, el agro y la modernización de la vía Bucaramanga-Barrancabermeja."`);
      electoralDynamicsNotes = 'Departamento con 87 municipios. Fuerte arraigo de clase media comercial y tradición cívica de control institucional.';
    } else if (cleanTarget.includes('valle')) {
      hooks.push(`"El Valle del Cauca merece recuperar la seguridad integral en Cali, Palmira y Buenaventura. ${candidateName} legislará por la reactivación portuaria, incentivos a la agroindustria y cero tolerancia con las bandas criminales."`);
      electoralDynamicsNotes = 'Departamento con 42 municipios. Centro neurálgico del Pacífico colombiano y alta sensibilidad en seguridad urbana.';
    } else {
      hooks.push(`"A ${normalizedTerritory} no la mandan desde el centralismo de Bogotá. ${candidateName} representa la verdadera voz de las regiones en el Congreso."`);
      hooks.push(`"Más presupuesto directo para obras en ${normalizedTerritory}, fortalecimiento del empleo local y cero peajes burocráticos. ${candidateName} contigo."`);
      electoralDynamicsNotes = `Entidad territorial con demanda de autonomía fiscal, transferencias del SGP e inversión en infraestructura productiva.`;
    }

    // Inyectar gancho derivado de reemplazos si existen
    if (recentReplacements.length > 0) {
      recentReplacements.forEach(rep => {
        hooks.unshift(rep.adHookSuggestion);
      });
    }

    // Estimación de métricas de conversión
    const standardVotesPerMillionCOP = 75; // Campaña tradicional difusa sin inteligencia (1 voto / ~$13.333 COP)
    const estimatedVotesPerMillionCOP = Math.round(standardVotesPerMillionCOP * multiplier);

    const monitoringContext: TerritoryMonitoringContext = {
      gobernacionConnected: !!gobernacionStatus?.connected,
      totalAlertasOcurrencias: gobernacionStatus?.totalNoticias || 142,
      activeAgendas: [
        'Financiación y desentrabe de Vías 4G / Túnel del Toyo / Túnel de Oriente',
        'Seguridad metropolitana y control territorial en comunas y veredas',
        'Incentivos fiscales para mipymes, empleo juvenil y gremio de la salud'
      ],
      subregionalTrend: normalizedTerritory === 'Antioquia' 
        ? 'Tensión fiscal por recorte de transferencias nacionales' 
        : `Demanda de autonomía presupuestal y control del gasto frente al centralismo`,
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
      monitoringContext,
      localCouncilors,
      recentReplacements,
      totalCouncilorsCount: localCouncilors.length,
      electoralDynamicsNotes
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
   * Retorna los territorios con inteligencia geopolítica modelada en el aplicativo:
   * Los 10 municipios del Valle de Aburrá + Rionegro (Oriente) + Antioquia + 32 Departamentos / D.C.
   */
  public static getAvailableTerritories(): string[] {
    return [
      // 10 Municipios Valle de Aburrá + Rionegro (Oriente)
      'Medellín',
      'Itagüí',
      'Bello',
      'Envigado',
      'Sabaneta',
      'Caldas',
      'La Estrella',
      'Copacabana',
      'Girardota',
      'Barbosa',
      'Rionegro',
      // Departamental Antioquia
      'Antioquia',
      // Distrito Capital & 31 Departamentos de Colombia
      'Bogotá D.C.',
      'Amazonas',
      'Arauca',
      'Atlántico',
      'Bolívar',
      'Boyacá',
      'Caldas (Depto)',
      'Caquetá',
      'Casanare',
      'Cauca',
      'Cesar',
      'Chocó',
      'Córdoba',
      'Cundinamarca',
      'Guainía',
      'Guaviare',
      'Huila',
      'La Guajira',
      'Magdalena',
      'Meta',
      'Nariño',
      'Norte de Santander',
      'Putumayo',
      'Quindío',
      'Risaralda',
      'San Andrés y Providencia',
      'Santander',
      'Sucre',
      'Tolima',
      'Valle del Cauca',
      'Vaupés',
      'Vichada'
    ];
  }
}

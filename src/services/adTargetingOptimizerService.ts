/**
 * SERVICIO OPTIMIZADOR DE PUBLICIDAD ELECTORAL SEGMENTADA (PA-010)
 * Proyecto Proteus - Unidad de Automejora
 */

import { 
  AdvertisingResonanceProfile, 
  ADVERTISING_ARCHETYPES_DATA,
  AdvertisingChannel 
} from '../data/advertising/adTargetingModelData';
import { callGeminiApi, formatAiError } from './geminiService';

export interface BudgetPacingResult {
  totalBudget: number;
  totalEstimatedImpressions: number;
  totalEstimatedClicks: number;
  totalEstimatedPersuadedVoters: number;
  averageCPVP: number;
  archetypeAllocations: {
    archetype: AdvertisingResonanceProfile;
    allocatedBudget: number;
    budgetSharePercent: number;
    estimatedImpressions: number;
    estimatedClicks: number;
    estimatedPersuadedVoters: number;
  }[];
}

export interface GeneratedCreativeSet {
  videoReel: {
    hookSeconds0to2: string;
    coreMessageSeconds3to10: string;
    callToActionSeconds11to15: string;
    onScreenText: string;
    audioMoodSuggestion: string;
  };
  whatsAppP2P: {
    senderGreeting: string;
    bodyText: string;
    sharePrompt: string;
  };
  outdoorBillboard: {
    headlineMax7Words: string;
    subheadline: string;
    visualArtDirection: string;
  };
}

export class AdTargetingOptimizerService {

  static getAllProfiles(): AdvertisingResonanceProfile[] {
    return ADVERTISING_ARCHETYPES_DATA;
  }

  static getProfileById(id: string): AdvertisingResonanceProfile | undefined {
    return ADVERTISING_ARCHETYPES_DATA.find(p => p.id === id);
  }

  /**
   * Simula la distribución presupuestal óptima y el retorno electoral de pauta
   */
  static simulateBudgetPacing(
    totalBudgetCop: number,
    selectedArchetypeIds: string[]
  ): BudgetPacingResult {
    const profiles = selectedArchetypeIds.length > 0
      ? ADVERTISING_ARCHETYPES_DATA.filter(p => selectedArchetypeIds.includes(p.id))
      : ADVERTISING_ARCHETYPES_DATA;

    if (profiles.length === 0 || totalBudgetCop <= 0) {
      return {
        totalBudget: totalBudgetCop,
        totalEstimatedImpressions: 0,
        totalEstimatedClicks: 0,
        totalEstimatedPersuadedVoters: 0,
        averageCPVP: 0,
        archetypeAllocations: []
      };
    }

    // Ponderación basada en eficiencia (menor CPVP recibe mayor peso relativo de pauta)
    const invertedCpupScores = profiles.map(p => 1 / p.estimatedCPVP);
    const sumInverted = invertedCpupScores.reduce((a, b) => a + b, 0);

    let totalImpressions = 0;
    let totalClicks = 0;
    let totalPersuaded = 0;

    const allocations = profiles.map((p, idx) => {
      const weight = invertedCpupScores[idx] / sumInverted;
      const allocated = Math.round(totalBudgetCop * weight);
      const impressions = Math.round((allocated / p.estimatedCPM) * 1000);
      const clicks = Math.round(impressions * (p.expectedCTR / 100));
      const persuaded = Math.round(allocated / p.estimatedCPVP);

      totalImpressions += impressions;
      totalClicks += clicks;
      totalPersuaded += persuaded;

      return {
        archetype: p,
        allocatedBudget: allocated,
        budgetSharePercent: Math.round(weight * 100),
        estimatedImpressions: impressions,
        estimatedClicks: clicks,
        estimatedPersuadedVoters: persuaded
      };
    });

    const averageCPVP = totalPersuaded > 0 ? Math.round(totalBudgetCop / totalPersuaded) : 0;

    return {
      totalBudget: totalBudgetCop,
      totalEstimatedImpressions: totalImpressions,
      totalEstimatedClicks: totalClicks,
      totalEstimatedPersuadedVoters: totalPersuaded,
      averageCPVP,
      archetypeAllocations: allocations
    };
  }

  /**
   * Genera creatividades publicitarias segmentadas con IA (Gemini 3.8 Flash)
   */
  static async generateCreativesWithAI(
    profile: AdvertisingResonanceProfile,
    candidateName: string = 'Isaac Mendoza',
    territoryName: string = 'Antioquia'
  ): Promise<GeneratedCreativeSet> {
    const prompt = `
Eres el Director de Publicidad Electoral y Neuro-Copywriter de la campaña de ${candidateName} en ${territoryName}.
Tu objetivo es MAXIMIZAR LA EFICACIA PUBLICITARIA para el siguiente segmento de votantes:
SEGMENTO: ${profile.name} (${profile.description})
CANAL PRIMARIO: ${profile.primaryChannel}
CANAL SECUNDARIO: ${profile.secondaryChannel}
GANCHO EMOCIONAL BASE: "${profile.emotionalHook}"
ENFOQUE DE GANANCIA: "${profile.gainFramingAngle}"
ENFOQUE DE PÉRDIDA/PROTECCIÓN: "${profile.lossFramingAngle}"
PALABRAS PODEROSAS: ${profile.powerKeywords.join(', ')}
PALABRAS TÓXICAS A EVITAR OBLIGATORIAMENTE: ${profile.toxicWordsToAvoid.join(', ')}

Genera exactamente un objeto JSON estructurado con estas 3 piezas publicitarias:
{
  "videoReel": {
    "hookSeconds0to2": "Frase de gancho disruptivo en pantalla y voz (máximo 12 palabras)",
    "coreMessageSeconds3to10": "Argumento persuasivo central articulado con la propuesta de ${candidateName} (máx 35 palabras)",
    "callToActionSeconds11to15": "Llamado a la acción contundente para votar y compartir",
    "onScreenText": "Texto visual corto en mayúsculas de alto contraste",
    "audioMoodSuggestion": "Descripción del fondo sonoro (ej. Beat urbano enérgico, piano acústico inspirador)"
  },
  "whatsAppP2P": {
    "senderGreeting": "Saludo natural y cálido de activista barrial",
    "bodyText": "Mensaje conversacional de 3 párrafos cortos con emojis estratégicos explicando el beneficio directo para este segmento",
    "sharePrompt": "Instrucción de reenvío a 5 vecinos o amigos"
  },
  "outdoorBillboard": {
    "headlineMax7Words": "Titular de valla o volante de MÁXIMO 7 PALABRAS",
    "subheadline": "Bajada de 1 línea con el nombre de ${candidateName}",
    "visualArtDirection": "Descripción visual de la foto/gráfica y colorimetría institucional"
  }
}
Responde ÚNICAMENTE con el bloque JSON válido, sin introducciones ni marcas markdown fuera del JSON.
`;

    try {
      const responseText = await callGeminiApi({
        promptText: prompt
      });

      // Parse JSON from response
      const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed: GeneratedCreativeSet = JSON.parse(cleanJson);
      return parsed;
    } catch (error) {
      console.warn("Fallback local para creatividades publicitarias:", error);
      // Fallback estático de alta calidad basado en el catálogo del perfil
      return {
        videoReel: {
          hookSeconds0to2: profile.emotionalHook,
          coreMessageSeconds3to10: profile.sampleCopyVariantA,
          callToActionSeconds11to15: profile.callToAction,
          onScreenText: profile.powerKeywords.slice(0, 3).join(' • ').toUpperCase(),
          audioMoodSuggestion: profile.category === 'Joven' ? 'Beat dinámico Lo-Fi / Synthwave' : 'Música acústica inspiracional'
        },
        whatsAppP2P: {
          senderGreeting: `¡Hola vecina/o! Te comparto esto porque sé lo mucho que te importa el futuro de nuestra comunidad:`,
          bodyText: `${profile.sampleCopyVariantB}\n\nCon ${candidateName} tenemos una propuesta real y sin ataduras para respaldar a ${profile.name}.`,
          sharePrompt: `Reenvíalo a las personas de tu cuadra para que este domingo votemos con decisión.`
        },
        outdoorBillboard: {
          headlineMax7Words: `${profile.powerKeywords[0]} para ${territoryName}: ${candidateName}`,
          subheadline: profile.sampleCopyVariantA.slice(0, 70) + '...',
          visualArtDirection: `Foto de ${candidateName} en territorio dialogando con integrantes de ${profile.name}, luz natural cálida.`
        }
      };
    }
  }
}

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
   * Genera creatividades publicitarias segmentadas con IA (Gemini 3.8 Flash)
   */
  static async generateCreativesWithAI(
    profile: AdvertisingResonanceProfile,
    candidateName: string = 'el candidato del perfil',
    territoryName: string = 'Antioquia'
  ): Promise<GeneratedCreativeSet> {
    const prompt = `
Eres el Director de Publicidad Electoral y Neuro-Copywriter de la campaña de ${candidateName} en ${territoryName}.
Usa la voz, los ejes, la postura y los límites del PERFIL DEL CANDIDATO; ancla cada pieza en 1 o 2 datos de los DATOS DEL APLICATIVO de la unidad (con su año) y respeta el marco (frases prohibidas, regla 9). No inventes cifras.
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
        promptText: prompt,
        proteus: { tarea: 'redactar' },
      });

      // Parse JSON from response
      const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed: GeneratedCreativeSet = JSON.parse(cleanJson);
      return parsed;
    } catch (error) {
      // Sin respaldo estático: antes devolvía textos del catálogo como si los hubiera escrito la IA
      throw new Error(formatAiError(error));
    }
  }
}

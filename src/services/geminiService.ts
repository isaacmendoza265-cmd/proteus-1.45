import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || "";
export const ai = new GoogleGenAI({ apiKey });

export interface GeminiCallOptions {
  promptText?: string;
  prompt?: string;
  model?: string;
  systemInstruction?: string;
  useSearch?: boolean;
  temperature?: number;
  maxTokens?: number;
}

export const formatAiError = (error: any): string => {
  let errorMessage = "";
  if (typeof error === 'string') {
    errorMessage = error;
  } else if (error?.error?.message) {
    errorMessage = error.error.message;
  } else if (error?.message) {
    errorMessage = error.message;
  } else {
    try {
      errorMessage = JSON.stringify(error);
    } catch {
      errorMessage = String(error);
    }
  }

  const lower = errorMessage.toLowerCase();
  if (
    lower.includes("429") || 
    lower.includes("resource_exhausted") || 
    lower.includes("quota") ||
    lower.includes("exceeded your current quota") ||
    lower.includes("rate-limits") ||
    lower.includes("rate limit") ||
    lower.includes("too many requests")
  ) {
    return "⚠️ Límite de cuota del servicio de IA alcanzado (429). El sistema Gemini está procesando un volumen alto de solicitudes. Por favor, espera un minuto e intenta nuevamente.";
  }
  return "Error al procesar la solicitud con Inteligencia Artificial. Por favor, intenta de nuevo en unos momentos.";
};

export const callGeminiApi = async (options: GeminiCallOptions): Promise<string> => {
  const modelName = options.model || "gemini-3.8-flash";
  const prompt = options.promptText || options.prompt || "";
  
  // Try with Google Search grounding tool if requested
  if (options.useSearch) {
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          ...(options.systemInstruction ? { systemInstruction: options.systemInstruction } : {}),
          tools: [{ googleSearch: {} }]
        }
      });
      if (response.text) return response.text;
    } catch (searchErr: any) {
      console.warn("Búsqueda web con Gemini limitada o no disponible, realizando generación directa como respaldo:", searchErr?.message || searchErr);
    }
  }

  // Fallback to standard generation
  const response = await ai.models.generateContent({
    model: modelName,
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    ...(options.systemInstruction ? { config: { systemInstruction: options.systemInstruction } } : {})
  });
  
  return response.text || "";
};

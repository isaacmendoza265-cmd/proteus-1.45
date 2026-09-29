// La clave de Gemini nunca vive en el navegador: toda llamada pasa por /api/gemini/generar
// (server.ts), que la lee de sus propias variables de entorno.
export interface GeminiCallOptions {
  promptText: string;
  model?: string;
  systemInstruction?: string;
  useSearch?: boolean;
}

export interface GenerateContentParams {
  model?: string;
  contents: unknown;
  config?: Record<string, unknown>;
}

export interface GenerateContentResult {
  text: string;
  candidates: any[] | null;
  usageMetadata: unknown;
}

export const generateContent = async (params: GenerateContentParams): Promise<GenerateContentResult> => {
  const r = await fetch('/api/gemini/generar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error || `El servidor respondió ${r.status}.`);
  return { text: String(j.text ?? ''), candidates: j.candidates ?? null, usageMetadata: j.usageMetadata ?? null };
};

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
  const contents = [{ role: 'user', parts: [{ text: options.promptText }] }];

  // Try with Google Search grounding tool if requested
  if (options.useSearch) {
    try {
      const response = await generateContent({
        model: modelName,
        contents,
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
  const response = await generateContent({
    model: modelName,
    contents,
    ...(options.systemInstruction ? { config: { systemInstruction: options.systemInstruction } } : {})
  });

  return response.text || "";
};

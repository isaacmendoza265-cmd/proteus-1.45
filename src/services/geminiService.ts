// La clave de Gemini nunca vive en el navegador: toda llamada pasa por /api/gemini/generar
// (server.ts), que la lee de sus propias variables de entorno.
//
// TRES MACROFUENTES: antes de salir, cada llamada antepone a su instrucción de sistema el bloque de
// src/services/ia/macrofuentes.ts (datos del aplicativo de la unidad territorial activa, perfil del candidato y marco
// teórico completo, con la jerarquía de fuentes). Una herramienta solo lo omite con `proteus: { sinMacrofuentes: true }`
// (p. ej., una búsqueda web pura o una herramienta técnica).
import type { TareaIA } from './ia/macrofuentes';
import type { SeleccionDossier } from './dossierTerritorialService';

export interface OpcionesProteus {
  /** Tarea de la tubería (decide qué parte del marco va) */
  tarea?: TareaIA;
  /** Unidad territorial (por defecto, la activa) */
  seleccion?: SeleccionDossier;
  /** false si la herramienta ya manda el dossier en su instrucción */
  incluirDatos?: boolean;
  sinMacrofuentes?: boolean;
}

export interface GeminiCallOptions {
  promptText: string;
  model?: string;
  systemInstruction?: string;
  useSearch?: boolean;
  proteus?: OpcionesProteus;
}

export interface GenerateContentParams {
  model?: string;
  contents: unknown;
  config?: Record<string, unknown>;
  proteus?: OpcionesProteus;
}

/** Antepone las tres macrofuentes a la instrucción de sistema (texto o Content de Gemini) */
async function conMacrofuentes(params: GenerateContentParams): Promise<Omit<GenerateContentParams, 'proteus'>> {
  const { proteus, ...resto } = params;
  if (proteus?.sinMacrofuentes) return resto;
  const { armarMacrofuentes, sistemaConMacrofuentes, anotarLlamada } = await import('./ia/macrofuentes');
  const tarea = proteus?.tarea ?? 'general';
  const m = await armarMacrofuentes({ tarea, seleccion: proteus?.seleccion, incluirDatos: proteus?.incluirDatos });
  const previo = resto.config?.systemInstruction;
  const textoPrevio = typeof previo === 'string' ? previo
    : previo && typeof previo === 'object' && Array.isArray((previo as { parts?: { text?: string }[] }).parts)
      ? (previo as { parts: { text?: string }[] }).parts.map((x) => x.text ?? '').join('\n') : '';
  anotarLlamada({ tarea, territorio: m.territorio, caracteres: m.caracteres, cuando: new Date().toISOString() });
  return { ...resto, config: { ...(resto.config ?? {}), systemInstruction: sistemaConMacrofuentes(m, textoPrevio) } };
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
    body: JSON.stringify(await conMacrofuentes(params)),
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
        proteus: options.proteus,
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
    proteus: options.proteus,
    ...(options.systemInstruction ? { config: { systemInstruction: options.systemInstruction } } : {})
  });

  return response.text || "";
};

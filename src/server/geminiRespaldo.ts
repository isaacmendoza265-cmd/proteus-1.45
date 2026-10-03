// Cadena de respaldo de Gemini: si el modelo principal está saturado, se reintenta una vez y luego se baja de
// versión (3.8 → 3.7 → 3.6 → 3.5). Decisión de Isaac del 3-oct-2026, tras ver 503 "high demand" en producción.
// Cada respuesta dice qué modelo contestó de verdad.

export const CADENA_GEMINI = ['gemini-3.8-flash', 'gemini-3.7-flash', 'gemini-3.6-flash', 'gemini-3.5-flash'];

/** Saturación, cuota o falla pasajera de Google: vale reintentar y, si no, bajar de modelo */
const PASAJERO = new Set([429, 500, 502, 503, 504]);
/** El modelo no existe o la clave no tiene acceso a él: se salta sin reintentar */
const MODELO_AUSENTE = 404;

const ESPERA_REINTENTO_MS = 1500;

/** Código HTTP de un error de @google/genai (viene en err.status o como JSON dentro del mensaje) */
export function statusGemini(err: unknown): number {
  const e = err as { status?: unknown; message?: unknown };
  try {
    const code = Number(JSON.parse(String(e?.message ?? ''))?.error?.code);
    if (code) return code;
  } catch { /* el mensaje no era JSON */ }
  return Number(e?.status) || 500;
}

/** La cadena desde el modelo pedido (si no está en la cadena, solo ese modelo) */
export function cadenaDesde(modelo: string | undefined): string[] {
  if (!modelo) return CADENA_GEMINI;
  const i = CADENA_GEMINI.indexOf(modelo);
  return i < 0 ? [modelo] : CADENA_GEMINI.slice(i);
}

export async function generarConRespaldo<T>(
  generar: (modelo: string) => Promise<T>,
  opciones: { cadena?: string[]; dormir?: (ms: number) => Promise<void> } = {},
): Promise<{ respuesta: T; modelo: string }> {
  const cadena = opciones.cadena ?? CADENA_GEMINI;
  const dormir = opciones.dormir ?? ((ms: number) => new Promise<void>((r) => setTimeout(r, ms)));
  // Si todos fallan se informa la última saturación (no el 404 de un modelo inexistente al final de la cadena)
  let ultimo: unknown;
  let ultimoPasajero: unknown;
  for (const modelo of cadena) {
    for (let intento = 0; intento < 2; intento++) {
      try {
        return { respuesta: await generar(modelo), modelo };
      } catch (err) {
        ultimo = err;
        const status = statusGemini(err);
        if (status === MODELO_AUSENTE) break;
        if (!PASAJERO.has(status)) throw err;
        ultimoPasajero = err;
        console.warn(`Gemini ${modelo} respondió ${status} (intento ${intento + 1}).`);
        if (intento === 0) await dormir(ESPERA_REINTENTO_MS);
      }
    }
  }
  const final = ultimoPasajero ?? ultimo;
  throw Object.assign(final instanceof Error ? final : new Error(String(final)), { modelosIntentados: cadena });
}

/**
 * HISTORIAL DEL CANDIDATO en los datos del aplicativo (parte de la macrofuente 2).
 *
 * - Electoral: busca su nombre en TODAS las elecciones cargadas del municipio de la unidad (candidatos de Alcaldía,
 *   Concejo, Gobernación, Asamblea, Cámara, Senado, Presidencia, 2015-2026) y en el libro del Concejo 2023. El cruce es
 *   por nombre (todas las palabras del nombre del perfil, sin tildes): puede haber homónimos, y se dice.
 * - Campaña: las piezas ya analizadas (Ajustes › Análisis de piezas) con su puntaje, si el servidor las entrega.
 * Nada de esto reemplaza la trayectoria que el equipo escribe en el perfil: la complementa con datos.
 */
import { cargarElecciones, type EleccionPuestos } from '../../electionResultsService';
import type { SeleccionDossier } from '../../dossierTerritorialService';

const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z ]/g, ' ').replace(/\s+/g, ' ').trim();
const n = (v: number) => Math.round(v).toLocaleString('es-CO');

/** ¿El nombre del candidato de los datos corresponde al del perfil? Todas las palabras (≥ 2) del perfil deben estar */
export function coincideNombre(perfil: string, candidato: string): boolean {
  const p = norm(perfil).split(' ').filter((x) => x.length > 2);
  if (p.length < 2) return false;
  const c = new Set(norm(candidato).split(' '));
  return p.every((x) => c.has(x));
}

function enEleccion(e: EleccionPuestos, nombre: string): string | null {
  const idx = e.candidatos.findIndex((c) => coincideNombre(nombre, c.n));
  if (idx < 0) return null;
  // En 2023 la lista de candidatos es común a Alcaldía y Gobernación: solo cuenta si tiene votos en ESTA elección
  const fila = e.municipio.candidatos?.find(([i]) => i === idx);
  if (!fila || !fila[1]) return null;
  const votos = fila[1];
  const ranking = [...(e.municipio.candidatos ?? [])].sort((a, b) => b[1] - a[1]).findIndex(([i]) => i === idx) + 1;
  return `${e.nombre}: ${e.candidatos[idx].n} (${e.partidos[e.candidatos[idx].p] ?? 'sin partido'}), ${n(votos)} votos en el municipio${ranking ? `, puesto ${ranking} entre ${e.municipio.candidatos?.length ?? 0} candidatos` : ''} (Registraduría, ${e.tipo}).`;
}

export async function historialCandidato(nombre: string | undefined, sel: SeleccionDossier, dane: string | null): Promise<string[]> {
  const out: string[] = [];
  if (nombre && dane) {
    const es = await cargarElecciones(dane).catch(() => [] as EleccionPuestos[]);
    const hallazgos = [...es].sort((a, b) => b.anio - a.anio).map((e) => enEleccion(e, nombre)).filter(Boolean) as string[];
    out.push(hallazgos.length
      ? `Historial electoral en los datos del aplicativo (cruce por nombre; descarta homónimos si no es el mismo candidato):\n${hallazgos.map((h) => `  - ${h}`).join('\n')}`
      : `Historial electoral: el nombre "${nombre}" no aparece entre los candidatos de las elecciones cargadas de este municipio (2015-2026).`);
  } else if (nombre) {
    out.push('Historial electoral: se busca por municipio; elige un municipio, comuna o barrio para cruzarlo.');
  }
  void sel;
  try {
    if (typeof fetch === 'function' && typeof window !== 'undefined') {
      const r = await fetch('/api/datos/piezas');
      if (r.ok) {
        const { piezas } = await r.json() as { piezas: { nombre: string; tipo: string; canal: string; fecha: string; propia: boolean; ia?: { global: number | null } | null }[] };
        const propias = (piezas ?? []).filter((p) => p.propia);
        if (propias.length) out.push(`Piezas propias ya analizadas (${propias.length}; puntaje del libro de reglas de 1 a 5): ${propias.slice(0, 10).map((p) => `${p.nombre} (${p.tipo}, ${p.canal}, ${p.fecha.slice(0, 10)}${p.ia?.global != null ? `, ${p.ia.global.toFixed(1)}` : ''})`).join('; ')}.`);
      }
    }
  } catch { /* sin servidor (pruebas) o sin sesión: no hay historial de piezas */ }
  return out;
}

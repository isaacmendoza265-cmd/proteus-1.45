/**
 * MARCO METODOLÓGICO DE PROTEUS (4 capas, ingestado por bloques)
 *
 * Lee los bloques que dejó scripts/ingestar_marco.mjs (src/data/marco/registro.json y los .md de
 * cada capa) y extrae su estructura: secciones, reglas, verbos epistémicos, frases prohibidas y
 * fichas de fuentes. La fuente de verdad es el .md ingestado: al volver a ingestar una versión, la
 * aplicación la toma sin tocar código. Si un bloque cambia de forma y el lector ya no encuentra su
 * estructura, las pruebas (marcoService.test.ts) lo detectan.
 */
import rawRegistro from '../data/marco/registro.json';
import { CAPAS, type IdCapa } from '../data/marco/capas';

export interface BloqueMarco {
  id: string;
  capa: 0 | IdCapa;
  titulo: string;
  familia: string | null;
  version: string | null;
  estado: 'bruto' | 'revisado' | 'publicado';
  archivo: string;
  sha256: string;
  ingestado: string;
  texto: string;
  caracteres: number;
}

export const BLOQUES: BloqueMarco[] = (rawRegistro as { bloques: BloqueMarco[] }).bloques;
export { CAPAS };

const TEXTOS = import.meta.glob<string>('../data/marco/capa*/*.md', { query: '?raw', import: 'default', eager: true });
const SEMILLAS = import.meta.glob<string>('../data/marco/semilla/*.md', { query: '?raw', import: 'default', eager: true });

/** Texto del bloque, sin el comentario de ingesta */
export function textoBloque(b: BloqueMarco): string {
  return (TEXTOS[`../data/marco/${b.texto}`] ?? '').replace(/^<!--[\s\S]*?-->\s*/, '');
}

export const bloquesDeCapa = (capa: 0 | IdCapa) => BLOQUES.filter((b) => b.capa === capa);
/** Líneas del texto, sin la viñeta de lista que agrega la ingesta ("- ") */
const lineas = (t: string) => t.split('\n').map((l) => l.trim().replace(/^- /, ''));

// --- Reglamento de interpretación (Capa 1) --------------------------------------------------------

export interface SeccionReglamento { numero: number; titulo: string; lineas: string[] }
export interface Regla { numero: number; titulo: string; texto: string[] }
export interface Verbo { verbo: string; oficio: string; ejemplo: string }

export interface Reglamento {
  bloque: BloqueMarco;
  secciones: SeccionReglamento[];
  reglas: Regla[];
  verbos: Verbo[];
  frasesProhibidas: string[];
  frasesPermitidas: string[];
  instruccionFinal: string[];
}

const VERBOS = ['observa', 'deduce', 'hipotetiza', 'apuesta', 'no afirma'];

export function leerReglamento(b: BloqueMarco): Reglamento {
  // El documento termina con el diagrama de capas: se corta ahí (ese diagrama es su propio bloque)
  const todas = lineas(textoBloque(b));
  const fin = todas.findIndex((l) => /Distinción por capas/i.test(l));
  const ls = fin >= 0 ? todas.slice(0, fin) : todas;

  const secciones: SeccionReglamento[] = [];
  for (const l of ls) {
    const m = /^(\d{1,2})\.\s+(\S.*)$/.exec(l);
    if (m && Number(m[1]) === secciones.length) secciones.push({ numero: Number(m[1]), titulo: m[2], lineas: [] });
    else if (secciones.length && l) secciones[secciones.length - 1].lineas.push(l);
  }

  const reglas: Regla[] = [];
  for (const l of secciones.find((s) => s.numero === 5)?.lineas ?? []) {
    const m = /^Regla\s+(\d+)\s+[—–-]\s+(.+)$/.exec(l);
    if (m) reglas.push({ numero: Number(m[1]), titulo: m[2], texto: [] });
    else if (reglas.length) reglas[reglas.length - 1].texto.push(l);
  }

  const verbos: Verbo[] = [];
  for (const l of secciones.find((s) => s.numero === 2)?.lineas ?? []) {
    const celdas = l.startsWith('|') ? l.split('|').slice(1, -1).map((c) => c.trim()) : [];
    if (celdas.length >= 3 && VERBOS.includes(celdas[0].toLowerCase())) verbos.push({ verbo: celdas[0], oficio: celdas[1], ejemplo: celdas[2] });
  }

  const s8 = secciones.find((s) => s.numero === 8)?.lineas ?? [];
  const iPerm = s8.findIndex((l) => /^Frases permitidas/i.test(l));
  return {
    bloque: b,
    secciones,
    reglas,
    verbos,
    frasesProhibidas: iPerm >= 0 ? s8.slice(0, iPerm) : s8,
    frasesPermitidas: iPerm >= 0 ? s8.slice(iPerm + 1) : [],
    instruccionFinal: secciones.find((s) => s.numero === 10)?.lineas ?? [],
  };
}

// --- Dossiers de fuentes (Capa 1, por familia de correlación) --------------------------------

export interface FichaFuente {
  numero: number;
  titulo: string;
  referencia: string;
  escala: string;
  afirma: string;
  dato: string;
  variable: string;
  limite: string;
  /** El propio dossier la marca como débil o con autoría sin verificar */
  debil: boolean;
}

export interface Dossier {
  bloque: BloqueMarco;
  alcance: string;
  advertencia: string;
  fichas: FichaFuente[];
  portables: string[];
  locales: string[];
  debates: string[];
  vacios: string;
}

export function leerDossier(b: BloqueMarco): Dossier {
  const ls = lineas(textoBloque(b)).filter(Boolean);
  const campo = (l: string, k: string) => (l.toLowerCase().startsWith(k.toLowerCase()) ? l.slice(k.length).trim() : null);
  const fichas: FichaFuente[] = [];
  let alcance = '', advertencia = '', vacios = '';
  const listas = { portables: [] as string[], locales: [] as string[], debates: [] as string[] };
  let lista: keyof typeof listas | null = null;
  let enCierre = false;

  for (const l of ls) {
    if (/^Cierre$/i.test(l)) { enCierre = true; continue; }
    if (enCierre) {
      if (/enunciados portables/i.test(l)) { lista = 'portables'; continue; }
      if (/enunciados locales/i.test(l)) { lista = 'locales'; continue; }
      if (/debates abiertos/i.test(l)) { lista = 'debates'; continue; }
      const v = campo(l, 'Vacíos:');
      if (v !== null) { vacios = v; lista = null; continue; }
      if (lista) listas[lista].push(l);
      continue;
    }
    const a = campo(l, 'Alcance:'); if (a !== null) { alcance = a; continue; }
    const adv = /^Advertencia estructural[^:]*:\s*(.*)$/i.exec(l); if (adv) { advertencia = adv[1]; continue; }
    const f = /^(\d+)\.\s+(.+)$/.exec(l);
    if (f && !l.includes(':')) {
      fichas.push({ numero: Number(f[1]), titulo: f[2], referencia: '', escala: '', afirma: '', dato: '', variable: '', limite: '', debil: false });
      continue;
    }
    const x = fichas[fichas.length - 1];
    if (!x) continue;
    const pares: [keyof FichaFuente, string][] = [['referencia', 'Referencia:'], ['escala', 'Escala:'], ['afirma', 'Qué afirma:'], ['dato', 'Dato:'], ['limite', 'Límite:']];
    let usado = false;
    for (const [k, pref] of pares) {
      const v = campo(l, pref);
      if (v !== null) { (x as unknown as Record<string, string>)[k] = v; usado = true; break; }
    }
    if (!usado) {
      const v = /^Variable[^:]*:\s*(.*)$/i.exec(l);
      if (v) x.variable = v[1];
    }
  }
  for (const x of fichas) x.debil = /\bdébil\b|no verificada/i.test(`${x.limite} ${x.referencia}`);
  return { bloque: b, alcance, advertencia, fichas, ...listas, vacios };
}

// --- Lo que usan otros módulos ----------------------------------------------------------------

/** Reglamento vigente de la Capa 1 (el de versión más alta) */
export function reglamentoVigente(): Reglamento | null {
  const b = bloquesDeCapa(1).filter((x) => x.id.startsWith('reglamento')).sort((a, b2) => (b2.version ?? '').localeCompare(a.version ?? '', 'es', { numeric: true }))[0];
  return b ? leerReglamento(b) : null;
}

export const dossiersCapa1 = () => bloquesDeCapa(1).filter((b) => b.id.startsWith('dossier')).map(leerDossier);

/**
 * Reglas del piso 3 (pieza y frase de ficha) del reglamento vigente, para instrucciones a una IA
 * que redacta piezas: verbos, regla 9 (año, fuente y contienda) y frases prohibidas.
 */
export function reglasPiso3(): string {
  const r = reglamentoVigente();
  if (!r) return '';
  const regla9 = r.reglas.find((x) => x.numero === 9);
  return [
    `MARCO DE PROTEUS (reglamento de interpretación v${r.bloque.version ?? '?'}, piso 3: pieza y frase de ficha):`,
    '- Verbos: cada afirmación analítica usa uno y la pieza lo respeta. ' + r.verbos.map((v) => `"${v.verbo}" = ${v.oficio}`).join('; ') + '. Una apuesta no se convierte en destino ("va a ganar") ni en sociología.',
    regla9 ? `- Regla 9 — ${regla9.titulo}. ${regla9.texto.join(' ')}` : '',
    '- Frases prohibidas en la pieza:',
    ...r.frasesProhibidas.map((f) => `  · ${f}`),
  ].filter(Boolean).join('\n');
}

/**
 * Semilla del marco: posturas políticas básicas (src/data/marco/semilla/). No viene de un .docx ingestado: reúne lo que
 * antes estaba escrito dentro de varios prompts, para que todas las herramientas lean la misma versión.
 */
export function semillaPosturas(): string {
  return Object.values(SEMILLAS).map((t) => t.replace(/^<!--[\s\S]*?-->\s*/, '').trim()).join('\n\n');
}

/** Texto completo del reglamento vigente (Capa 1), como lo escribió Isaac */
export function textoReglamentoVigente(): string {
  const r = reglamentoVigente();
  return r ? textoBloque(r.bloque) : '';
}

/** Dossiers de fuentes de la Capa 1 (literatura; se mandan solo a las tareas de análisis) */
export function textoDossiersCapa1(): string {
  return bloquesDeCapa(1).filter((b) => b.id.startsWith('dossier')).map((b) => `### ${b.titulo}\n${textoBloque(b)}`).join('\n\n');
}

/** Capas 2, 3 y 4 ingestadas (vacías hasta que Isaac las entregue) */
export function textoCapas234(): string {
  return BLOQUES.filter((b) => b.capa === 2 || b.capa === 3 || b.capa === 4).map((b) => `### Capa ${b.capa}: ${b.titulo}\n${textoBloque(b)}`).join('\n\n');
}

/** TODO lo integrado al marco: cada bloque ingestado de cada capa (0 a 4), con su versión y estado, en orden */
export function textoMarcoCompleto(): string {
  const bloques = [...BLOQUES].sort((a, b) => a.capa - b.capa || a.id.localeCompare(b.id));
  return bloques.map((b) => `### Capa ${b.capa} · ${b.titulo}${b.version ? ` (v${b.version})` : ''} · ${b.estado}\n${textoBloque(b)}`).join('\n\n');
}

/** Inventario del marco para el estado del motor */
export const inventarioMarco = () => BLOQUES.map((b) => ({ id: b.id, capa: b.capa, titulo: b.titulo, version: b.version, estado: b.estado, caracteres: textoBloque(b).length }));

#!/usr/bin/env node
/**
 * INGESTA DEL MARCO METODOLÓGICO DE PROTEUS (4 capas, por bloques)
 *
 * Fuente: documentos .docx que entrega Isaac (marco general, dossiers de fuentes, normas locales...).
 * Salida:
 *   - src/data/marco/capa<N>/<bloque>.md  texto del documento (párrafos y tablas en Markdown)
 *   - src/data/marco/registro.json        registro de bloques (capa, título, archivo, fecha, sha256, estado)
 *   - _originales/marco/<archivo>.docx    copia del original (no se sube: .gitignore)
 *
 * Uso:
 *   node scripts/ingestar_marco.mjs --capa 1 --bloque reglamento-v1-2 --titulo "Reglamento de interpretación v1.2" <archivo.docx>
 *   (--capa 0 = estructura del marco, p. ej. el diagrama de las 4 capas)
 *   Opcionales: --familia "Familia 4: Arrastre"  --version "1.2"  --estado bruto|revisado|publicado
 *
 * El .md es el texto fuente. La versión ESTRUCTURADA (reglas, fichas, verbos) que usa la aplicación
 * vive en src/data/marco/capa<N>/*.ts y la escribe un agente a partir de este .md (ver docs/marco/README.md).
 * Sin dependencias: lee el .docx (ZIP) con zlib de Node. Abre el archivo aunque Word lo tenga abierto.
 */
import { createHash } from 'node:crypto';
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import { inflateRawSync } from 'node:zlib';

const args = process.argv.slice(2);
const opt = (k) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : undefined; };
const archivo = args.filter((a, i) => !a.startsWith('--') && !args[i - 1]?.startsWith('--')).pop();
const capa = Number(opt('capa'));
const bloque = opt('bloque');
const titulo = opt('titulo');
// Capa 0: documentos de estructura del marco (p. ej. el diagrama de las 4 capas)
if (!archivo || ![0, 1, 2, 3, 4].includes(capa) || !bloque || !titulo) {
  console.error('Uso: node scripts/ingestar_marco.mjs --capa <0-4> --bloque <id> --titulo "<título>" [--familia ..] [--version ..] [--estado ..] <archivo.docx>');
  process.exit(1);
}
if (!/^[a-z0-9-]+$/.test(bloque)) { console.error('El id del bloque solo admite minúsculas, números y guiones.'); process.exit(1); }

// --- Lector mínimo de ZIP (directorio central) ------------------------------------------------
function leerEntradaZip(buf, nombre) {
  let eocd = buf.length - 22;
  while (eocd >= 0 && buf.readUInt32LE(eocd) !== 0x06054b50) eocd--;
  if (eocd < 0) throw new Error('El archivo no es un .docx válido (no se encontró el ZIP).');
  const total = buf.readUInt16LE(eocd + 10);
  let p = buf.readUInt32LE(eocd + 16);
  for (let i = 0; i < total; i++) {
    const metodo = buf.readUInt16LE(p + 10);
    const tamComp = buf.readUInt32LE(p + 20);
    const lnNombre = buf.readUInt16LE(p + 28), lnExtra = buf.readUInt16LE(p + 30), lnComent = buf.readUInt16LE(p + 32);
    const local = buf.readUInt32LE(p + 42);
    const n = buf.toString('utf8', p + 46, p + 46 + lnNombre);
    if (n === nombre) {
      const inicio = local + 30 + buf.readUInt16LE(local + 26) + buf.readUInt16LE(local + 28);
      const datos = buf.subarray(inicio, inicio + tamComp);
      return metodo === 0 ? datos.toString('utf8') : inflateRawSync(datos).toString('utf8');
    }
    p += 46 + lnNombre + lnExtra + lnComent;
  }
  throw new Error(`El .docx no trae ${nombre}.`);
}

// --- document.xml → Markdown sencillo ---------------------------------------------------------
const decodificar = (s) => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&');
const textoDe = (xml) => decodificar(xml.replace(/<w:tab\/>/g, '\t').replace(/<w:br\/>/g, '\n').replace(/<[^>]+>/g, '')).trim();

function aMarkdown(xml) {
  const cuerpo = xml.slice(xml.indexOf('<w:body>'), xml.indexOf('</w:body>'));
  const out = [];
  // Bloques de primer nivel: tablas y párrafos, en orden
  const re = /<w:tbl>[\s\S]*?<\/w:tbl>|<w:p[ >][\s\S]*?<\/w:p>/g;
  for (const m of cuerpo.match(re) ?? []) {
    if (m.startsWith('<w:tbl>')) {
      const filas = (m.match(/<w:tr[ >][\s\S]*?<\/w:tr>/g) ?? []).map((tr) =>
        (tr.match(/<w:tc>[\s\S]*?<\/w:tc>/g) ?? []).map((tc) =>
          (tc.match(/<w:p[ >][\s\S]*?<\/w:p>/g) ?? []).map(textoDe).filter(Boolean).join(' <br> ').replace(/\|/g, '\\|')));
      if (!filas.length) continue;
      const ancho = Math.max(...filas.map((f) => f.length));
      const fila = (f) => `| ${Array.from({ length: ancho }, (_, i) => f[i] ?? '').join(' | ')} |`;
      out.push('', fila(filas[0]), `|${' --- |'.repeat(ancho)}`, ...filas.slice(1).map(fila), '');
      continue;
    }
    const t = textoDe(m);
    if (!t) { out.push(''); continue; }
    const estilo = /<w:pStyle w:val="([^"]+)"/.exec(m)?.[1] ?? '';
    const nivel = /^(?:Heading|Ttulo|Titulo)(\d)$/i.exec(estilo)?.[1];
    const lista = /<w:numPr>/.test(m);
    out.push(nivel ? `${'#'.repeat(Math.min(6, Number(nivel) + 1))} ${t}` : lista ? `- ${t}` : t);
  }
  return out.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';
}

// --- Ingesta ----------------------------------------------------------------------------------
const buf = readFileSync(archivo);
const sha256 = createHash('sha256').update(buf).digest('hex');
const md = aMarkdown(leerEntradaZip(buf, 'word/document.xml'));

const raiz = process.cwd();
const dirCapa = join(raiz, 'src', 'data', 'marco', `capa${capa}`);
mkdirSync(dirCapa, { recursive: true });
const rutaMd = join(dirCapa, `${bloque}.md`);
const encabezado = `<!-- Ingestado con scripts/ingestar_marco.mjs el ${new Date().toISOString().slice(0, 10)} desde "${basename(archivo)}" (sha256 ${sha256.slice(0, 12)}). No editar a mano: volver a ingestar. -->\n\n`;
writeFileSync(rutaMd, encabezado + md, 'utf8');

const dirOrig = join(raiz, '_originales', 'marco');
mkdirSync(dirOrig, { recursive: true });
copyFileSync(archivo, join(dirOrig, basename(archivo)));

const rutaReg = join(raiz, 'src', 'data', 'marco', 'registro.json');
const reg = existsSync(rutaReg) ? JSON.parse(readFileSync(rutaReg, 'utf8')) : { bloques: [] };
const entrada = {
  id: bloque, capa, titulo,
  familia: opt('familia') ?? null,
  version: opt('version') ?? null,
  estado: opt('estado') ?? 'bruto',
  archivo: basename(archivo),
  sha256,
  ingestado: new Date().toISOString().slice(0, 10),
  texto: `capa${capa}/${bloque}.md`,
  caracteres: md.length,
};
reg.bloques = [...reg.bloques.filter((b) => b.id !== bloque), entrada].sort((a, b) => a.capa - b.capa || a.id.localeCompare(b.id));
writeFileSync(rutaReg, JSON.stringify(reg, null, 2) + '\n', 'utf8');

console.log(`Capa ${capa} · ${bloque}: ${md.length.toLocaleString('es-CO')} caracteres → ${rutaMd}`);
console.log(`Registro: ${reg.bloques.length} bloques. Original copiado a _originales/marco/.`);

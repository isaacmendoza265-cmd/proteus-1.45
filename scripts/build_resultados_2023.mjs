#!/usr/bin/env node
/**
 * Genera src/data/electoral/resultados2023Antioquia.json con los resultados OFICIALES de las
 * elecciones territoriales del 29-oct-2023 (Alcaldía y Concejo) de los 125 municipios de Antioquia.
 *
 * Fuente: Registraduría Nacional del Estado Civil, "Consulta Histórico de Resultados Electorales"
 * (https://estadisticaselectorales.registraduria.gov.co), consultado municipio por municipio el
 * 25-sep-2026. Crudo en _originales/registraduria/resultados_2023_antioquia.json (ver FUENTE.md).
 *
 * El código de la Registraduría (p. ej. 1004 = Abejorral) se cruza con el código DANE a través de
 * src/data/electoral/censoElectoral2026.json (codigoRegistraduria "01004" -> dane "05002").
 *
 * Uso: node scripts/build_resultados_2023.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const RAW = path.join(ROOT, '_originales', 'registraduria', 'resultados_2023_antioquia.json');
const CENSUS = path.join(ROOT, 'src', 'data', 'electoral', 'censoElectoral2026.json');
const OUT = path.join(ROOT, 'src', 'data', 'electoral', 'resultados2023Antioquia.json');

const raw = JSON.parse(fs.readFileSync(RAW, 'utf8'));
const census = JSON.parse(fs.readFileSync(CENSUS, 'utf8'));
const daneByReg = Object.fromEntries(
  census.municipios.filter((m) => m.departamento === 'antioquia').map((m) => [m.codigoRegistraduria, m.dane]),
);

const titleCase = (s) =>
  String(s).toLowerCase().replace(/(^|[\s(\-"/])([a-záéíóúñü])/g, (_, a, b) => a + b.toUpperCase())
    .replace(/\b(De|Del|La|Las|Los|Y|E|En)\b/g, (w) => w.toLowerCase());

const municipios = {};
for (const r of Object.values(raw.municipios)) {
  const reg = String(r.codigoRegistraduria).padStart(5, '0');
  const dane = daneByReg[reg];
  if (!dane) throw new Error(`Sin código DANE para ${r.municipio} (${reg})`);
  const a = r.alcaldia;
  const c = r.concejo;
  if (!a?.candidatos?.length || !a.censo || !a.votos) throw new Error(`Alcaldía incompleta: ${r.municipio}`);
  // Pueblorrico: el portal no publica las curules del concejo 2023 (se deja sin dato, no se inventa)
  const sinConcejo = !c?.curules?.length;
  const dist = Object.fromEntries(a.distribucion);
  const votosCandidatos = dist['Voto por candidato o lista'] ?? 0;
  const blanco = dist['Voto en blanco'] ?? 0;
  const validos = votosCandidatos + blanco; // el voto en blanco es voto válido
  const candidatos = a.candidatos
    .map(([nombre, partido, votos]) => ({ nombre: titleCase(nombre), partido: partido ?? 'Sin dato', votos, pctValidos: +((100 * votos) / validos).toFixed(2) }))
    .sort((x, y) => y.votos - x.votos);
  const curules = sinConcejo ? [] : c.curules.map(([partido, n]) => ({ partido, curules: n })).sort((x, y) => y.curules - x.curules);
  const votosConcejo = sinConcejo ? [] : [...c.votosPartido].sort((x, y) => y[1] - x[1]);
  municipios[dane] = {
    municipio: r.municipio,
    codigoRegistraduria: reg,
    alcaldia: {
      censo: a.censo,
      votantes: a.votos,
      participacion: +((100 * a.votos) / a.censo).toFixed(2),
      mesas: a.mesas,
      votosValidos: validos,
      votosBlanco: blanco,
      votosNulos: dist['Voto nulo'] ?? 0,
      votosNoMarcados: dist['Voto no marcado'] ?? 0,
      candidatos,
    },
    concejo: sinConcejo ? null : {
      curulesPorLista: curules,
      totalCurulesListas: curules.reduce((s, x) => s + x.curules, 0),
      partidoMasVotado: votosConcejo[0]?.[0] ?? null,
    },
  };
}
if (Object.keys(municipios).length !== 125) throw new Error(`Se esperaban 125 municipios, hay ${Object.keys(municipios).length}`);

fs.writeFileSync(OUT, JSON.stringify({
  meta: {
    fuente: 'Registraduría Nacional del Estado Civil — Consulta Histórico de Resultados Electorales',
    url: 'https://estadisticaselectorales.registraduria.gov.co',
    eleccion: 'Elecciones territoriales 29-oct-2023 (Alcaldía y Concejo)',
    consultado: raw.consultado,
    nota: 'Porcentajes sobre votos válidos (candidatos + voto en blanco). Las curules del concejo son las asignadas a listas; el Estatuto de la Oposición suma una curul al segundo en la alcaldía.',
  },
  municipios: Object.fromEntries(Object.entries(municipios).sort()),
}) + '\n');
const tot = Object.values(municipios).reduce((s, m) => s + m.alcaldia.votantes, 0);
console.log(`OK ${path.relative(ROOT, OUT)}: ${Object.keys(municipios).length} municipios, ${tot.toLocaleString('es-CO')} votantes (alcaldía)`);

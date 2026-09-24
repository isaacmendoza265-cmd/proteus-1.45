#!/usr/bin/env node
/**
 * Genera src/data/electoral/censoElectoral2026.json a partir del censo oficial de la
 * Registraduría (visor "Censo electoral", corte 30-abr-2026), guardado en
 * _originales/censo_electoral/ (ver FUENTE.md allí).
 *
 * Uso: node scripts/build_censo_electoral.mjs
 *
 * - Suma por departamento, municipio y, para Medellín, por zona electoral (las zonas
 *   de la Registraduría se agrupan en comunas: ver src/data/e24/comunasData.ts).
 * - Asigna el código DANE a los 125 municipios de Antioquia cruzando el nombre con
 *   src/data/antioquia125MunicipalitiesMasterData.ts (con alias para los nombres
 *   que la Registraduría escribe distinto). Falla si alguno queda sin cruzar.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC_DIR = path.join(ROOT, '_originales', 'censo_electoral');
const OUT = path.join(ROOT, 'src', 'data', 'electoral', 'censoElectoral2026.json');
const CORTE = '2026-04-30';

/** Mayúsculas, sin tildes ni signos, espacios simples. Debe coincidir con electoralCensusService.ts */
export const norm = (s) =>
  String(s ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, ' ')
    .trim();

// Departamento (nombre Registraduría normalizado) -> id del GeoJSON nacional
const DEPARTAMENTOS = {
  AMAZONAS: 'amazonas', ANTIOQUIA: 'antioquia', ARAUCA: 'arauca', ATLANTICO: 'atlantico',
  'BOGOTA D C': 'bogota', BOLIVAR: 'bolivar', BOYACA: 'boyaca', CALDAS: 'caldas',
  CAQUETA: 'caqueta', CASANARE: 'casanare', CAUCA: 'cauca', CESAR: 'cesar', CHOCO: 'choco',
  CORDOBA: 'cordoba', CUNDINAMARCA: 'cundinamarca', GUAINIA: 'guainia', GUAVIARE: 'guaviare',
  HUILA: 'huila', 'LA GUAJIRA': 'laguajira', MAGDALENA: 'magdalena', META: 'meta',
  NARINO: 'narino', 'NORTE DE SAN': 'nortedesantander', PUTUMAYO: 'putumayo',
  QUINDIO: 'quindio', RISARALDA: 'risaralda', 'SAN ANDRES': 'sanandresyprovidencia',
  SANTANDER: 'santander', SUCRE: 'sucre', TOLIMA: 'tolima', VALLE: 'valle_del_cauca',
  VAUPES: 'vaupes', VICHADA: 'vichada',
};

// Nombre oficial (normalizado) -> nombre Registraduría (normalizado), solo donde difieren
const ALIAS_ANTIOQUIA = {
  'ARMENIA MANTEQUILLA': 'ARMENIA',
  'CAROLINA DEL PRINCIPE': 'CAROLINA',
  'CIUDAD BOLIVAR': 'BOLIVAR',
  DONMATIAS: 'DON MATIAS',
  'EL CARMEN DE VIBORAL': 'CARMEN DE VIBORAL',
  'EL SANTUARIO': 'SANTUARIO',
  'EL PENOL': 'PENOL',
  'PUERTO NARE': 'PUERTO NARE LA MAGDALENA',
  'EL RETIRO': 'RETIRO',
  'SAN ANDRES DE CUERQUIA': 'SAN ANDRES',
  'SAN PEDRO DE LOS MILAGROS': 'SAN PEDRO',
  'SANTA FE DE ANTIOQUIA': 'ANTIOQUIA',
  YONDO: 'YONDO CASABE',
  'SAN VICENTE FERRER': 'SAN VICENTE',
};

// Tres registros del maestro tenían el nombre del vecino; se corrigen en el maestro,
// pero el cruce se hace por código DANE para no depender de ello.
const NOMBRE_POR_DANE = { '05138': 'CANASGORDAS', '05321': 'GUADALUPE', '05674': 'SAN VICENTE' };

function readCsv(file) {
  const text = fs.readFileSync(path.join(SRC_DIR, file), 'utf8').replace(/^﻿/, '');
  const [header, ...lines] = text.trim().split(/\r?\n/);
  const cols = header.split(',');
  return lines.map((line) => {
    const vals = [];
    let cur = '';
    let q = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (q) {
        if (ch === '"' && line[i + 1] === '"') { cur += '"'; i++; }
        else if (ch === '"') q = false;
        else cur += ch;
      } else if (ch === '"') q = true;
      else if (ch === ',') { vals.push(cur); cur = ''; }
      else cur += ch;
    }
    vals.push(cur);
    return Object.fromEntries(cols.map((c, i) => [c, vals[i]]));
  });
}

const num = (v) => Number(v) || 0;
const add = (acc, r) => {
  acc.mujeres += num(r.mujeres);
  acc.hombres += num(r.hombres);
  acc.total += num(r.total);
  acc.mesas += num(r.mesas);
  acc.puestos += 1;
  return acc;
};
const empty = () => ({ mujeres: 0, hombres: 0, total: 0, mesas: 0, puestos: 0 });

const puestos = readCsv('censo_puestos_2026-04-30.csv');
const municipiosCsv = readCsv('censo_municipios_2026-04-30.csv');

const nacional = empty();
const exterior = empty();
const departamentos = {};
const municipios = new Map();
const medellinZonas = {};
// Zona 99 (corregimientos): puestos cuyo nombre ubica el corregimiento sin ambigüedad.
// El resto (El Manzanillo, María Paulina Taborda, Débora Arango, Pacha Mama, El Limonar,
// Héctor Rogelio Montoya) queda "sin asignar" hasta cruzarlo con la Divipole georreferenciada.
const CORREGIMIENTO_POR_PUESTO = (cod) => {
  const p = cod.slice(7);
  if (/^A\d$/.test(p)) return 'san-antonio';
  if (/^B\d$/.test(p)) return 'san-cristobal';
  if (['33', '34', '35', '36'].includes(p)) return 'santa-elena';
  return 'sin-asignar';
};
const medellinCorregimientos = {};

for (const p of puestos) {
  if (p.pais !== 'COLOMBIA') { add(exterior, p); continue; }
  add(nacional, p);
  const depKey = norm(p.departamento);
  const depId = DEPARTAMENTOS[depKey];
  if (!depId) throw new Error(`Departamento sin id: ${p.departamento}`);
  departamentos[depId] ??= { id: depId, nombreRegistraduria: p.departamento, ...empty(), municipios: 0 };
  add(departamentos[depId], p);
  const key = `${depId}|${norm(p.municipio)}`;
  if (!municipios.has(key)) {
    municipios.set(key, {
      departamento: depId,
      nombre: p.municipio,
      codigoRegistraduria: p.cod_puesto.slice(0, 5),
      dane: null,
      ...empty(),
    });
    departamentos[depId].municipios += 1;
  }
  add(municipios.get(key), p);
  if (depId === 'antioquia' && norm(p.municipio) === 'MEDELLIN') {
    const zona = p.cod_puesto.slice(5, 7);
    medellinZonas[zona] ??= empty();
    add(medellinZonas[zona], p);
    if (zona === '99') {
      const c = CORREGIMIENTO_POR_PUESTO(p.cod_puesto);
      medellinCorregimientos[c] ??= empty();
      add(medellinCorregimientos[c], p);
    }
  }
}

// Control cruzado: la suma por puesto debe coincidir con la tabla municipal del visor
for (const m of municipiosCsv.filter((r) => r.pais === 'COLOMBIA')) {
  const depId = DEPARTAMENTOS[norm(m.departamento)];
  const rec = municipios.get(`${depId}|${norm(m.municipio)}`);
  if (!rec || rec.total !== num(m.total) || rec.mesas !== num(m.mesas)) {
    throw new Error(`No cuadra ${m.departamento}/${m.municipio}: puestos=${rec?.total} municipal=${m.total}`);
  }
}

// Códigos DANE de Antioquia desde el maestro
const master = fs.readFileSync(path.join(ROOT, 'src', 'data', 'antioquia125MunicipalitiesMasterData.ts'), 'utf8');
const pares = [...master.matchAll(/"name": "([^"]+)",\s*"daneCode": "(\d{5})"/g)];
if (pares.length !== 125) throw new Error(`Se esperaban 125 municipios en el maestro, hay ${pares.length}`);
const sinCruce = [];
for (const [, nombre, dane] of pares) {
  const oficial = norm(nombre);
  const reg = NOMBRE_POR_DANE[dane] ?? ALIAS_ANTIOQUIA[oficial] ?? oficial;
  const rec = municipios.get(`antioquia|${reg}`);
  if (!rec) { sinCruce.push(`${nombre} (${dane})`); continue; }
  if (rec.dane && rec.dane !== dane) throw new Error(`${reg} cruzado dos veces: ${rec.dane} y ${dane}`);
  rec.dane = dane;
}
if (sinCruce.length) throw new Error(`Municipios de Antioquia sin cruzar: ${sinCruce.join(', ')}`);
const antioquiaSinDane = [...municipios.values()].filter((m) => m.departamento === 'antioquia' && !m.dane);
if (antioquiaSinDane.length) throw new Error(`Censo de Antioquia sin DANE: ${antioquiaSinDane.map((m) => m.nombre)}`);

const out = {
  meta: {
    fuente: 'Registraduría Nacional del Estado Civil – Observatorio Electoral, Visor de censo electoral',
    url: 'https://observatorio.registraduria.gov.co/views/electoral/censo.php',
    corte: CORTE,
    extraido: '2026-09-24',
    nota: 'Potencial electoral (ciudadanos habilitados) por puesto, agregado por municipio y departamento.',
  },
  total: { ...empty(), mujeres: nacional.mujeres + exterior.mujeres, hombres: nacional.hombres + exterior.hombres, total: nacional.total + exterior.total, mesas: nacional.mesas + exterior.mesas, puestos: nacional.puestos + exterior.puestos },
  nacional,
  exterior,
  departamentos,
  municipios: [...municipios.values()].sort((a, b) => a.codigoRegistraduria.localeCompare(b.codigoRegistraduria)),
  medellinZonas,
  medellinCorregimientos,
};

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(out) + '\n');
console.log(
  `OK ${path.relative(ROOT, OUT)}: ${out.municipios.length} municipios, ${Object.keys(departamentos).length} departamentos,` +
    ` total ${out.total.total.toLocaleString('es-CO')} (nacional ${nacional.total.toLocaleString('es-CO')}, exterior ${exterior.total.toLocaleString('es-CO')})`,
);

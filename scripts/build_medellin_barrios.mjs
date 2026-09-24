/**
 * Construye la cartografía de barrios, veredas, comunas y corregimientos de Medellín
 * a partir de la capa oficial del Distrito (Planeac_Barrio_Vereda_DM).
 *
 * Uso:
 *   node scripts/build_medellin_barrios.mjs [ruta_al_geojson_oficial]
 *
 * Por defecto lee _originales/barrios_medellin/Planeac_Barrio_Vereda_DM.geojson
 * (fuente y fecha en _originales/barrios_medellin/FUENTE.md).
 *
 * Genera:
 *   src/data/geojson/medellinBarrios.geo.json            -> nivel 5 (barrios y veredas)
 *   src/data/geojson/medellinComunas.boundaries.geo.json -> geometrías del nivel 4
 *     (16 comunas + 5 corregimientos obtenidos al disolver los barrios, de modo que
 *      las fronteras de comuna coinciden exactamente con las de sus barrios)
 *
 * Requiere Node 18+ y descarga mapshaper con npx la primera vez.
 */
import { execFileSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const SRC = path.resolve(process.argv[2] || path.join(ROOT, '_originales/barrios_medellin/Planeac_Barrio_Vereda_DM.geojson'));
const OUT_DIR = path.join(ROOT, 'src/data/geojson');
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'barrios-'));

// 10 % de los vértices, conservando la topología (bordes compartidos idénticos).
const SIMPLIFY = '10%';

const COMUNAS = {
  '01': { id: 'comuna-1', name: 'Comuna 1 - Popular', color: '#e11d48' },
  '02': { id: 'comuna-2', name: 'Comuna 2 - Santa Cruz', color: '#16a34a' },
  '03': { id: 'comuna-3', name: 'Comuna 3 - Manrique', color: '#2563eb' },
  '04': { id: 'comuna-4', name: 'Comuna 4 - Aranjuez', color: '#d97706' },
  '05': { id: 'comuna-5', name: 'Comuna 5 - Castilla', color: '#64748b' },
  '06': { id: 'comuna-6', name: 'Comuna 6 - Doce de Octubre', color: '#db2777' },
  '07': { id: 'comuna-7', name: 'Comuna 7 - Robledo', color: '#ca8a04' },
  '08': { id: 'comuna-8', name: 'Comuna 8 - Villa Hermosa', color: '#9333ea' },
  '09': { id: 'comuna-9', name: 'Comuna 9 - Buenos Aires', color: '#65a30d' },
  '10': { id: 'comuna-10', name: 'Comuna 10 - La Candelaria', color: '#0891b2' },
  '11': { id: 'comuna-11', name: 'Comuna 11 - Laureles Estadio', color: '#ea580c' },
  '12': { id: 'comuna-12', name: 'Comuna 12 - La América', color: '#4d7c0f' },
  '13': { id: 'comuna-13', name: 'Comuna 13 - San Javier', color: '#0284c7' },
  '14': { id: 'comuna-14', name: 'Comuna 14 - El Poblado', color: '#84cc16' },
  '15': { id: 'comuna-15', name: 'Comuna 15 - Guayabal', color: '#c026d3' },
  '16': { id: 'comuna-16', name: 'Comuna 16 - Belén', color: '#a16207' },
  '50': { id: 'med-correg-palmitas', name: 'Corregimiento San Sebastián de Palmitas', color: '#15803d' },
  '60': { id: 'med-correg-san-cristobal', name: 'Corregimiento San Cristóbal', color: '#0f766e' },
  '70': { id: 'med-correg-altavista', name: 'Corregimiento Altavista', color: '#b45309' },
  '80': { id: 'med-correg-san-antonio-de-prado', name: 'Corregimiento San Antonio de Prado', color: '#7c3aed' },
  '90': { id: 'med-correg-santa-elena', name: 'Corregimiento Santa Elena', color: '#047857' },
};

function mapshaper(args) {
  const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  execFileSync(npx, ['-y', 'mapshaper@0.6', ...args], { stdio: ['ignore', 'ignore', 'inherit'], shell: process.platform === 'win32' });
}

function tipo(p) {
  const code = String(p.codigo || '').trim();
  if (code.startsWith('SN')) return 'Sin asignar';
  if (code.startsWith('AE')) return 'Área de expansión';
  if (p.BARR_DIST === 'A_INST') return 'Área institucional';
  return Number(p.subtipo_ba) === 2 ? 'Vereda' : 'Barrio';
}

const round5 = (v) => Math.round(v * 1e5) / 1e5;

// 1. Limpieza + simplificación con topología; punto interior para etiquetas
const simpl = path.join(TMP, 'barrios.json');
mapshaper([SRC, '-clean', '-simplify', SIMPLIFY, 'keep-shapes',
  '-each', 'lx=this.innerX, ly=this.innerY',
  '-o', simpl, 'precision=0.00001', 'format=geojson', 'geojson-type=FeatureCollection']);

// 2. Comunas y corregimientos = disolver barrios por código de comuna
const comunasTmp = path.join(TMP, 'comunas.json');
mapshaper([simpl, '-filter', '!limitecomu.startsWith("SN")', '-dissolve', 'limitecomu',
  '-o', comunasTmp, 'precision=0.00001', 'format=geojson', 'geojson-type=FeatureCollection']);

// 3. Límite del distrito completo
const outlineTmp = path.join(TMP, 'outline.json');
mapshaper([simpl, '-dissolve', '-o', outlineTmp, 'precision=0.00001', 'format=geojson', 'geojson-type=FeatureCollection']);

// 4. Barrios con propiedades normalizadas para el mapa
const src = JSON.parse(fs.readFileSync(simpl, 'utf8'));
const features = src.features.map((f) => {
  const p = f.properties;
  const code = String(p.codigo).trim();
  const comuna = COMUNAS[p.limitecomu];
  return {
    type: 'Feature',
    id: `barrio-${code}`,
    properties: {
      id: `barrio-${code}`,
      name: String(p.nombre || 'Sin nombre').trim(),
      code,
      tipo: tipo(p),
      comunaCode: p.limitecomu,
      comunaId: comuna?.id ?? null,
      comunaName: comuna?.name ?? 'Sin comuna asignada',
      muniId: 'medellin',
      level: 'comunas-barrios',
      centroid: [round5(p.ly), round5(p.lx)],
      colorCode: comuna?.color ?? '#94a3b8',
      isInteractiveTarget: false,
      fuente: 'Distrito de Medellín - Planeac_Barrio_Vereda_DM',
    },
    geometry: f.geometry,
  };
}).sort((a, b) => a.id.localeCompare(b.id));

const barrios = {
  type: 'FeatureCollection',
  name: 'Nivel 5: Barrios y veredas de Medellín (fuente oficial del Distrito)',
  level: 'comunas-barrios',
  center: [6.2442, -75.5812],
  defaultZoom: 12,
  features,
};
fs.writeFileSync(path.join(OUT_DIR, 'medellinBarrios.geo.json'), JSON.stringify(barrios) + '\n');

// 5. Geometrías de comunas/corregimientos (+ contorno) indexadas por id de la capa del nivel 4
const boundaries = {};
for (const f of JSON.parse(fs.readFileSync(comunasTmp, 'utf8')).features) {
  const c = COMUNAS[f.properties.limitecomu];
  if (c) boundaries[c.id] = f.geometry;
}
boundaries['medellin-base-outline'] = JSON.parse(fs.readFileSync(outlineTmp, 'utf8')).features[0].geometry;
fs.writeFileSync(path.join(OUT_DIR, 'medellinComunas.boundaries.geo.json'), JSON.stringify(boundaries) + '\n');

const count = (t) => features.filter((f) => f.properties.tipo === t).length;
console.log(`Barrios: ${count('Barrio')}, veredas: ${count('Vereda')}, áreas institucionales: ${count('Área institucional')}, ` +
  `áreas de expansión: ${count('Área de expansión')}, sin asignar: ${count('Sin asignar')}`);
console.log(`Comunas/corregimientos: ${Object.keys(boundaries).length - 1}`);
fs.rmSync(TMP, { recursive: true, force: true });

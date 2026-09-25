/**
 * Construye la cartografía de divisiones internas (nivel 4) y subdivisiones (nivel 5)
 * de los municipios que ya tienen fuente de datos. Medellín tiene su propio script
 * (build_medellin_barrios.mjs).
 *
 * Uso:
 *   node scripts/build_divisiones_municipales.mjs            # todos
 *   node scripts/build_divisiones_municipales.mjs bogota     # uno solo
 *
 * Lee _originales/<municipio>/*.geojson (fuentes y fechas en cada FUENTE.md) y escribe
 *   src/data/geojson/municipios/<id>.divisiones.geo.json
 *   src/data/geojson/municipios/<id>.subdivisiones.geo.json
 *
 * Cada subdivisión (barrio, vereda, sector) se asigna a la división (comuna, corregimiento,
 * localidad) que contiene su punto interior, sin confiar en los códigos del archivo fuente.
 * Requiere Node 18+ y descarga mapshaper con npx la primera vez.
 */
import { execFileSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const ORIG = path.join(ROOT, '_originales');
const OUT = path.join(ROOT, 'src/data/geojson/municipios');

const PALETTE = ['#e11d48', '#16a34a', '#2563eb', '#d97706', '#9333ea', '#0891b2', '#ea580c', '#65a30d',
  '#db2777', '#0284c7', '#ca8a04', '#7c3aed', '#059669', '#b45309', '#c026d3', '#4d7c0f', '#0f766e',
  '#be123c', '#1d4ed8', '#a16207'];

const SMALL = new Set(['de', 'del', 'la', 'las', 'los', 'el', 'y', 'e', 'en']);
const titleCase = (s) => String(s).trim().replace(/\s+/g, ' ').toLowerCase()
  .split(' ').map((w, i) => (i > 0 && SMALL.has(w) ? w : w.charAt(0).toUpperCase() + w.slice(1))).join(' ');

/** Configuración por municipio: capas de origen y cómo leer sus campos. */
const MUNICIPIOS = {
  itagui: {
    divisiones: [
      { file: 'itagui/Itagui_Comunas.geojson', tipo: 'Comuna', code: (p) => String(p.COMUNA).replace(/\D/g, ''), name: (p) => p.COMUNA },
    ],
    subdivisiones: [
      { file: 'itagui/Itagui_Barrios.geojson', tipo: 'Barrio', code: (p) => p.BARRIO, name: (p) => String(p.NOM_BARRIO).trim() },
    ],
    simplify: '25%',
  },
  rionegro: {
    divisiones: [
      { file: 'rionegro/Rionegro_Comunas.geojson', tipo: 'Comuna', code: (p) => p.COMUNA, name: (p) => `Comuna ${p.ComunaNPN} - ${String(p.Nombre).replace(/\s+/g, ' ')}` },
      { file: 'rionegro/Rionegro_Corregimientos.geojson', tipo: 'Corregimiento', code: (p) => `K${p.CorregiNPN}`, name: (p) => `Corregimiento ${p.Corregimie}` },
    ],
    subdivisiones: [
      { file: 'rionegro/Rionegro_Barrios_2023.geojson', tipo: 'Barrio', code: (p) => p.barrio, name: (p) => String(p.nom_barrio).trim() },
      { file: 'rionegro/Rionegro_Veredas_Decreto158_2018.geojson', tipo: 'Vereda', code: (p, i) => `V${String(i + 1).padStart(2, '0')}`, name: (p) => titleCase(p.label) },
    ],
    simplify: '15%',
  },
  bogota: {
    divisiones: [
      { file: 'bogota/Bogota_Localidades.geojson', tipo: 'Localidad', code: (p) => p.LOCCODIGO, name: (p) => `Localidad ${p.LOCCODIGO} - ${titleCase(p.LOCNOMBRE)}` },
    ],
    subdivisiones: [
      { file: 'bogota/Bogota_SectoresCatastrales.geojson', tipo: 'Sector catastral', code: (p) => p.SCACODIGO, name: (p) => titleCase(p.SCANOMBRE) },
    ],
    simplify: '6%',
  },
};

function mapshaper(args) {
  const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  execFileSync(npx, ['-y', 'mapshaper@0.6', ...args], { stdio: ['ignore', 'ignore', 'inherit'], shell: process.platform === 'win32' });
}

/** Limpia, simplifica con topología y agrega el punto interior (lx, ly) de cada polígono. */
function prepare(file, simplify, tmp) {
  const out = path.join(tmp, path.basename(file));
  mapshaper([path.join(ORIG, file), '-clean', '-simplify', simplify, 'keep-shapes',
    '-each', 'lx=this.innerX, ly=this.innerY',
    '-o', out, 'precision=0.00001', 'format=geojson', 'geojson-type=FeatureCollection']);
  return JSON.parse(fs.readFileSync(out, 'utf8')).features.filter((f) => f.geometry);
}

// Punto en polígono (ray casting) sobre Polygon / MultiPolygon GeoJSON [lng, lat]
function inRing(x, y, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}
function inGeometry(x, y, g) {
  const polys = g.type === 'Polygon' ? [g.coordinates] : g.type === 'MultiPolygon' ? g.coordinates : [];
  return polys.some((rings) => inRing(x, y, rings[0]) && !rings.slice(1).some((h) => inRing(x, y, h)));
}

const round5 = (v) => Math.round(v * 1e5) / 1e5;

function build(id, cfg) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), `div-${id}-`));
  const divisiones = [];
  for (const src of cfg.divisiones) {
    prepare(src.file, cfg.simplify, tmp).forEach((f) => {
      const code = String(src.code(f.properties)).trim();
      const color = PALETTE[divisiones.length % PALETTE.length];
      divisiones.push({
        type: 'Feature',
        id: `${id}-div-${code}`,
        properties: {
          id: `${id}-div-${code}`, name: src.name(f.properties), code, tipo: src.tipo,
          muniId: id, level: 'municipal', centroid: [round5(f.properties.ly), round5(f.properties.lx)],
          colorCode: color, isInteractiveTarget: true,
        },
        geometry: f.geometry,
      });
    });
  }

  const subdivisiones = [];
  for (const src of cfg.subdivisiones || []) {
    prepare(src.file, cfg.simplify, tmp).forEach((f, i) => {
      const code = String(src.code(f.properties, i)).trim();
      const { lx, ly } = f.properties;
      // Padre = división que contiene el punto interior; si no hay (bordes que no coinciden),
      // la división que contiene más vértices del polígono.
      let parent = divisiones.find((d) => inGeometry(lx, ly, d.geometry));
      if (!parent) {
        const ring = (f.geometry.type === 'Polygon' ? f.geometry.coordinates : f.geometry.coordinates[0])[0];
        let best = 0;
        for (const d of divisiones) {
          const n = ring.filter(([x, y]) => inGeometry(x, y, d.geometry)).length;
          if (n > best) { best = n; parent = d; }
        }
      }
      subdivisiones.push({
        type: 'Feature',
        id: `${id}-sub-${code}`,
        properties: {
          id: `${id}-sub-${code}`, name: src.name(f.properties) || 'Sin nombre', code, tipo: src.tipo,
          parentId: parent?.id ?? null, parentName: parent?.properties.name ?? 'Sin división asignada',
          muniId: id, level: 'comunas-barrios', centroid: [round5(ly), round5(lx)],
          colorCode: parent?.properties.colorCode ?? '#94a3b8', isInteractiveTarget: false,
        },
        geometry: f.geometry,
      });
    });
  }

  const fc = (name, level, features) => ({ type: 'FeatureCollection', name, level, center: divisiones[0].properties.centroid, defaultZoom: 12, features });
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(path.join(OUT, `${id}.divisiones.geo.json`), JSON.stringify(fc(`Divisiones de ${id}`, 'municipal', divisiones)) + '\n');
  if (subdivisiones.length) {
    fs.writeFileSync(path.join(OUT, `${id}.subdivisiones.geo.json`), JSON.stringify(fc(`Subdivisiones de ${id}`, 'comunas-barrios', subdivisiones)) + '\n');
  }
  const huerfanas = subdivisiones.filter((s) => !s.properties.parentId).length;
  console.log(`${id}: ${divisiones.length} divisiones, ${subdivisiones.length} subdivisiones` + (huerfanas ? ` (${huerfanas} sin división)` : ''));
  fs.rmSync(tmp, { recursive: true, force: true });
}

const only = process.argv[2];
for (const [id, cfg] of Object.entries(MUNICIPIOS)) {
  if (!only || only === id) build(id, cfg);
}

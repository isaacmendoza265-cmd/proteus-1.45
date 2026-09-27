#!/usr/bin/env python3
"""
Bello: el plano de veredas del POT (PL14) deja por fuera el sector de Ovejas (noroccidente), que sí está
dentro del límite municipal del DANE (en la vereda La Unión del nivel de referencia de veredas 2024).
Este script agrega ese sector como una subdivisión propia, sin tocar las 19 veredas del POT:
el área de las veredas DANE que no cubre ninguna subdivisión del POT (sin astillas de borde).

Correr después de construir la cartografía de Bello y después de scripts/descargar_mgn_fase_b.py con
[{"slug": "bello", "dane": "05088"}]. Idempotente (reemplaza el sector si ya existe).
Uso: python3 scripts/completar_bello_ovejas.py && python3 scripts/agregar_manzanas.py bello src/data/geojson/municipios/bello.subdivisiones.geo.json
"""
import json
from pathlib import Path
from shapely.geometry import shape, mapping
from shapely.ops import unary_union

ROOT = Path(__file__).resolve().parent.parent
SUB = ROOT / 'src/data/geojson/municipios/bello.subdivisiones.geo.json'
IDX = ROOT / 'src/data/territorio/indiceTerritorios.json'
ID, PADRE = 'bello-sub-OVEJAS', 'bello-div-RUR'

fc = json.load(open(SUB))
fc['features'] = [f for f in fc['features'] if f['id'] != ID]
pot = unary_union([shape(f['geometry']).buffer(0) for f in fc['features']])
dane = unary_union([shape(f['geometry']).buffer(0) for f in json.load(open(ROOT / '_originales/dane_mgn/bello/veredas.geojson'))['features']])
resto = dane.difference(pot.buffer(0.0003)).buffer(0)
partes = [g for g in getattr(resto, 'geoms', [resto]) if g.area > 5e-6]  # > ~0,06 km²: sin astillas de borde
g = unary_union(partes).simplify(0.00025, preserve_topology=True)
c = g.representative_point()
padre = next(f for f in json.load(open(ROOT / 'src/data/geojson/municipios/bello.divisiones.geo.json'))['features'] if f['id'] == PADRE)


def r(x):
    return [round(x[0], 5), round(x[1], 5)] if isinstance(x[0], float) else [r(y) for y in x]


m = mapping(g)
fc['features'].append({'type': 'Feature', 'id': ID, 'geometry': {'type': m['type'], 'coordinates': r(m['coordinates'])}, 'properties': {
    'id': ID, 'name': 'Sector Ovejas (fuera de las veredas del POT)', 'code': 'OVEJAS', 'tipo': 'Vereda', 'parentId': PADRE,
    'parentName': padre['properties']['name'], 'muniId': 'bello', 'level': 'comunas-barrios', 'centroid': [round(c.y, 5), round(c.x, 5)],
    'colorCode': '#94a3b8', 'isInteractiveTarget': False,
    'fuente': 'Área dentro de las veredas DANE 2024 (vereda La Unión) que no cubre el plano de veredas del POT (PL14)'}})
json.dump(fc, open(SUB, 'w'), ensure_ascii=False, separators=(',', ':'))
idx = json.load(open(IDX))
idx['bello']['subdivisiones'][ID] = {'nombre': 'Sector Ovejas (fuera de las veredas del POT)', 'tipo': 'Vereda', 'padre': PADRE}
json.dump(idx, open(IDX, 'w'), ensure_ascii=False, separators=(',', ':'))
print('Sector Ovejas:', round(g.area * 12321, 1), 'km² aprox.,', len(partes), 'parte(s)')

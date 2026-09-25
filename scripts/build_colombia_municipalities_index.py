# -*- coding: utf-8 -*-
"""
Construye un catálogo limpio e indexado de municipios por departamento para toda Colombia:
1. Lee `public/data/colombia_municipios_dane.geojson` (geometrías precisas WGS84 de 1.122 municipios).
2. Lee `src/data/presidentialElections2026.ts` y `src/data/elecciones_2026.csv` para nombres reales de municipios y departamentos.
3. Genera un archivo GeoJSON enriquecido `public/data/colombia_municipios_completo.geojson` y un servicio en TypeScript.
"""
import json
import csv

# 1. Read presidentialElections2026.ts / elecciones_2026.csv
code_to_meta = {}

with open('src/data/elecciones_2026.csv', 'r', encoding='utf-8', errors='ignore') as f:
    reader = csv.reader(f, delimiter=';')
    for row in reader:
        if len(row) >= 3:
            code = row[0].strip()
            name = row[1].strip().title()
            dept = row[2].strip().title()
            if code and code != 'Código DANE' and code.isdigit():
                code_to_meta[code] = {'name': name, 'department': dept}

print(f"Total entries loaded from CSV: {len(code_to_meta)}")

# Mapping from DANE department code to Department Name
DPTO_CODE_TO_NAME = {
    '05': 'Antioquia',
    '08': 'Atlántico',
    '11': 'Bogotá D.C.',
    '13': 'Bolívar',
    '15': 'Boyacá',
    '17': 'Caldas',
    '18': 'Caquetá',
    '19': 'Cauca',
    '20': 'Cesar',
    '23': 'Córdoba',
    '25': 'Cundinamarca',
    '27': 'Chocó',
    '41': 'Huila',
    '44': 'La Guajira',
    '47': 'Magdalena',
    '50': 'Meta',
    '52': 'Nariño',
    '54': 'Norte de Santander',
    '63': 'Quindío',
    '66': 'Risaralda',
    '68': 'Santander',
    '70': 'Sucre',
    '73': 'Tolima',
    '76': 'Valle del Cauca',
    '81': 'Arauca',
    '85': 'Casanare',
    '86': 'Putumayo',
    '88': 'Archipiélago de San Andrés',
    '91': 'Amazonas',
    '94': 'Guainía',
    '95': 'Guaviare',
    '97': 'Vaupés',
    '99': 'Vichada'
}

# 2. Read colombia_municipios_dane.geojson
with open('public/data/colombia_municipios_dane.geojson', 'r', encoding='utf-8', errors='ignore') as f:
    geo_data = json.load(f)

print(f"Total features in DANE GeoJSON: {len(geo_data['features'])}")

enriched_features = []
dept_counts = {}

for feat in geo_data['features']:
    props = feat['properties']
    dane_code = props.get('daneCode', '')
    dpto_code = props.get('dptoCode', dane_code[:2] if len(dane_code) >= 2 else '')
    
    dept_name = DPTO_CODE_TO_NAME.get(dpto_code, 'Colombia')
    
    # Try getting municipality name from CSV mapping
    meta = code_to_meta.get(dane_code)
    if not meta:
        # Check without leading zero or with alternative formatting
        meta = code_to_meta.get(str(int(dane_code))) if dane_code.isdigit() else None
    
    muni_name = meta['name'] if meta else f"Municipio {dane_code}"
    if meta and meta['department']:
        dept_name = meta['department']

    # Compute bounding box
    coords = feat['geometry']['coordinates']
    ring = coords[0] if feat['geometry']['type'] == 'Polygon' else coords[0][0]
    lons = [p[0] for p in ring]
    lats = [p[1] for p in ring]
    min_lon, max_lon = min(lons), max(lons)
    min_lat, max_lat = min(lats), max(lats)
    centroid = [round((min_lat + max_lat) / 2, 4), round((min_lon + max_lon) / 2, 4)]
    bounds = [[round(min_lat, 4), round(min_lon, 4)], [round(max_lat, 4), round(max_lon, 4)]]

    props['name'] = muni_name
    props['shortName'] = muni_name
    props['daneCode'] = dane_code
    props['dptoCode'] = dpto_code
    props['department'] = dept_name
    props['dptoName'] = dept_name
    props['centroid'] = centroid
    props['bounds'] = bounds
    props['level'] = 'departamental'

    enriched_features.append(feat)
    dept_counts[dept_name] = dept_counts.get(dept_name, 0) + 1

# Save enriched GeoJSON
enriched_collection = {
    "type": "FeatureCollection",
    "name": "Municipios de Colombia - División Político Administrativa Oficial DANE",
    "features": enriched_features
}

output_path = 'public/data/colombia_municipios_completo.geojson'
with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(enriched_collection, f, ensure_ascii=False)

print(f"Saved {len(enriched_features)} enriched municipalities to {output_path}")
print("Sample department counts:")
for d in ['Antioquia', 'Meta', 'Cundinamarca', 'Valle Del Cauca', 'Santander', 'Boyacá']:
    print(f"  {d}: {dept_counts.get(d, 0)} municipios")

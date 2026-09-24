# -*- coding: utf-8 -*-
"""
Genera public/data/colombia_municipios_completo.geojson con:
- 1.122 municipios de Colombia en coordenadas GPS WGS84 oficiales del DANE
- Nombres de municipio y departamento limpios, en Title Case y con tildes correctas
- Centroid y Bounding Box calculados
- Soporte para Meta, Cundinamarca, Antioquia, Santander, y los 33 departamentos/distritos.
"""
import json
import re
import os

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

def clean_spanish_title(text: str) -> str:
    if not text:
        return ""
    t = text.title()
    t = re.sub(r'\b(De|Del|La|Las|Los|El|Y)\b', lambda m: m.group(1).lower(), t)
    if t and t[0].islower():
        t = t[0].upper() + t[1:]
    return t

print("Reading temp_geojson/dane_municipios_wgs84.geojson...")
with open('temp_geojson/dane_municipios_wgs84.geojson', 'r', encoding='utf-8') as f:
    source_data = json.load(f)

output_features = []
dept_stats = {}

for feat in source_data['features']:
    props = feat['properties']
    dane_code = props.get('MPIO_CCNCT', '')
    dpto_code = props.get('DPTO_CCDGO', dane_code[:2] if len(dane_code) >= 2 else '')
    dept_name = DPTO_CODE_TO_NAME.get(dpto_code, clean_spanish_title(props.get('DPTO_CNMBR', 'Colombia')))
    raw_muni_name = props.get('MPIO_CNMBR', f'Municipio {dane_code}')
    muni_name = clean_spanish_title(raw_muni_name)

    geom = feat['geometry']
    coords = geom['coordinates']
    ring = coords[0] if geom['type'] == 'Polygon' else coords[0][0]
    lons = [p[0] for p in ring]
    lats = [p[1] for p in ring]
    min_lon, max_lon = min(lons), max(lons)
    min_lat, max_lat = min(lats), max(lats)
    centroid = [round((min_lat + max_lat) / 2, 4), round((min_lon + max_lon) / 2, 4)]
    bounds = [[round(min_lat, 4), round(min_lon, 4)], [round(max_lat, 4), round(max_lon, 4)]]

    feature_id = f"muni-{dane_code}"
    out_props = {
        'id': feature_id,
        'daneCode': dane_code,
        'name': muni_name,
        'shortName': muni_name,
        'department': dept_name,
        'dptoCode': dpto_code,
        'dptoName': dept_name,
        'level': 'departamental',
        'centroid': centroid,
        'bounds': bounds,
        'isInteractiveTarget': False
    }

    output_features.append({
        'type': 'Feature',
        'id': feature_id,
        'properties': out_props,
        'geometry': geom
    })

    dept_stats[dept_name] = dept_stats.get(dept_name, 0) + 1

output_fc = {
    'type': 'FeatureCollection',
    'name': 'Colombia - 1.122 Municipios Oficiales DANE WGS84 por Departamento',
    'features': output_features
}

targets = [
    'public/data/colombia_municipios_completo.geojson',
    'SUBIR_A_GITHUB/public/data/colombia_municipios_completo.geojson'
]

for t in targets:
    os.makedirs(os.path.dirname(t), exist_ok=True)
    with open(t, 'w', encoding='utf-8') as f:
        json.dump(output_fc, f, ensure_ascii=False)
    print(f"Saved: {t}")

print("Total departments mapped:", len(dept_stats))
print("Meta count:", dept_stats.get('Meta', 0))

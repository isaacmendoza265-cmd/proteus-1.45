import json

with open('temp_geojson/dane_municipios_wgs84.geojson', 'r', encoding='utf-8') as f:
    dane = json.load(f)

# Filter Antioquia
antioquia_features = []
for f in dane['features']:
    props = f.get('properties', {})
    dpto_code = str(props.get('DPTO_CCDGO', '')).zfill(2)
    if dpto_code == '05':
        antioquia_features.append(f)

print(f"Total Antioquia municipalities found: {len(antioquia_features)}")
if antioquia_features:
    names = [f['properties']['MPIO_CNMBR'] for f in antioquia_features]
    print(f"Sample names (first 10): {names[:10]}")

# Check Comunas_Medellin from Downloads
with open(r'C:\Users\isaac\Downloads\Comunas_Medellin.geojson', 'r', encoding='utf-8') as f:
    comunas = json.load(f)

print(f"Total Comunas features: {len(comunas.get('features', []))}")
for feat in comunas['features']:
    p = feat.get('properties', {})
    print(f"  Comuna {p.get('Numero_Comuna')}: {p.get('Nombre_Comuna')}")

import json

# Check DANE dptoCodes
with open('public/data/colombia_municipios_dane.geojson', 'r', encoding='utf-8', errors='replace') as f:
    dane_data = json.load(f)

dpto_codes = set(f['properties'].get('dptoCode', '') for f in dane_data['features'])
print("Dpto codes in dane_data:", sorted(dpto_codes))
meta_dane = [f for f in dane_data['features'] if f['properties'].get('dptoCode') == '50']
print("Meta (code 50) count in dane_data:", len(meta_dane))

# Check municipios_colombia_original.geojson
with open('public/data/municipios_colombia_original.geojson', 'r', encoding='utf-8') as f:
    orig_data = json.load(f)

meta_orig = [f for f in orig_data['features'] if f['properties'].get('dpt', '').upper() == 'META']
print("Meta count in orig_data:", len(meta_orig))
if meta_orig:
    print("Meta orig muni names:", [f['properties'].get('name') for f in meta_orig[:5]])
    geom = meta_orig[0]['geometry']
    coords = geom['coordinates'][0] if geom['type'] == 'Polygon' else geom['coordinates'][0][0]
    print("Meta orig first pt:", coords[0])

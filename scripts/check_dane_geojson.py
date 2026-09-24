import json

with open('public/data/colombia_municipios_dane.geojson', 'r', encoding='utf-8') as f:
    dane_data = json.load(f)

print("colombia_municipios_dane.geojson:")
print("Features count:", len(dane_data['features']))
feat0 = dane_data['features'][0]
print("Props 0:", feat0['properties'])
geom0 = feat0['geometry']
print("Geom 0 type:", geom0['type'])
coords0 = geom0['coordinates'][0] if geom0['type'] == 'Polygon' else geom0['coordinates'][0][0]
print("First 3 pts:", coords0[:3])

# Check Meta in dane_data
meta_features = [f for f in dane_data['features'] if f['properties'].get('dptoName', '').upper() == 'META']
print("Meta count in dane_data:", len(meta_features))
if meta_features:
    print("Sample Meta muni:", meta_features[0]['properties'])
    m_geom = meta_features[0]['geometry']
    m_coords = m_geom['coordinates'][0] if m_geom['type'] == 'Polygon' else m_geom['coordinates'][0][0]
    print("Meta muni first pt:", m_coords[0])

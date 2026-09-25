import json

with open('temp_geojson/municipios_GeoJSON.geojson', 'r', encoding='utf-8') as f:
    d = json.load(f)

print("municipios_GeoJSON features count:", len(d.get("features", [])))
print("Sample feature 0:", d["features"][0]["properties"])
print("Sample feature 0 geom:", d["features"][0]["geometry"]["type"])
coords0 = d["features"][0]["geometry"]["coordinates"][0][:3]
print("First 3 coords:", coords0)

# Let's inspect all unique dpt values
dpts = set()
for feat in d.get("features", []):
    dpt = feat.get("properties", {}).get("dpt")
    if dpt:
        dpts.add(dpt)
print(f"Total departments: {len(dpts)}")
print("Departments:", sorted(list(dpts)))

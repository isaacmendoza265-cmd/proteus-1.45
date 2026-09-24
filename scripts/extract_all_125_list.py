import json
import re
import os

root = r"c:\Users\isaac\OneDrive\Documentos\Proyecto Proteus"
geo_path = os.path.join(root, "src", "data", "geojson", "antioquia125MunicipiosGeoJson.ts")

with open(geo_path, encoding="utf-8") as f:
    geo_content = f.read()

# Extract all 125
pattern = r'{\s*"type":\s*"Feature",\s*"id":\s*"(mpio-\d+)",\s*"properties":\s*\{([\s\S]*?)\},\s*"geometry"'
matches = re.findall(pattern, geo_content)
print(f"Total features matched: {len(matches)}")

munis = []
for fid, props_str in matches:
    name_m = re.search(r'"name":\s*"([^"]+)"', props_str)
    code_m = re.search(r'"daneCode":\s*"([^"]+)"', props_str)
    sub_m = re.search(r'"subregion":\s*"([^"]+)"', props_str)
    area_m = re.search(r'"areaKm2":\s*([\d\.]+)', props_str)
    
    munis.append({
        "id": fid,
        "name": name_m.group(1) if name_m else "",
        "daneCode": code_m.group(1) if code_m else "",
        "subregion": sub_m.group(1) if sub_m else "",
        "areaKm2": float(area_m.group(1)) if area_m else 100.0
    })

print("Sample 5:")
for m in munis[:5]:
    print(m)

# Save to json for processing
with open(os.path.join(root, "scripts", "all_125_munis_list.json"), "w", encoding="utf-8") as out:
    json.dump(munis, out, indent=2, ensure_ascii=False)

print(f"Successfully saved {len(munis)} municipalities to all_125_munis_list.json")

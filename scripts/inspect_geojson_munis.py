import json
import re
import os

root = r"c:\Users\isaac\OneDrive\Documentos\Proyecto Proteus"
geo_path = os.path.join(root, "src", "data", "geojson", "antioquia125MunicipiosGeoJson.ts")

with open(geo_path, encoding="utf-8") as f:
    geo_content = f.read()

# Extract properties blocks
matches = re.findall(r'"id":\s*"(mpio-[^"]+)",\s*"name":\s*"([^"]+)",\s*"daneCode":\s*"([^"]+)"[\s\S]*?"subregion":\s*"([^"]+)"', geo_content)
print(f"Total matches: {len(matches)}")
for m in matches[:15]:
    print(m)

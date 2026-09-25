import json

with open('src/data/geojson/medellinComunasGeoJson.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's inspect the features defined in medellinComunasGeoJson.ts
import re
lines = text.split('\n')
for line in lines:
    if "id: 'med-" in line or "name: 'Comuna" in line or "name: 'Corregimiento" in line:
        print(line.strip())

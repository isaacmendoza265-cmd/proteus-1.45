# -*- coding: utf-8 -*-
import json
import re

with open('src/data/geojson/colombiaDepartmentsGeoJson.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Extract properties objects
dept_blocks = re.findall(r'id:\s*[\'"]([^\'"]+)[\'"],\s*properties:\s*(\{[\s\S]*?\}),\s*geometry:', text)
print(f"Extracted {len(dept_blocks)} department metadata blocks from current file.")

metadata_by_name = {}
for dept_id, prop_str in dept_blocks:
    # clean up JS keys to JSON
    cleaned = re.sub(r'(\w+):', r'"\1":', prop_str)
    cleaned = re.sub(r'\'([^\']*)\'', r'"\1"', cleaned)
    cleaned = re.sub(r',\s*\}', r'}', cleaned)
    try:
        data = json.loads(cleaned)
        name = data.get('name', '').lower()
        metadata_by_name[name] = data
        metadata_by_name[dept_id.lower()] = data
    except Exception as e:
        print(f"Error parsing {dept_id}: {e}")

print(f"Loaded metadata for {len(metadata_by_name)} keys.")

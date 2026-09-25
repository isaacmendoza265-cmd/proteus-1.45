# -*- coding: utf-8 -*-
import json
import re

with open('co.json', 'r', encoding='utf-8') as f:
    co_data = json.load(f)

print(f"Total features: {len(co_data['features'])}")
for i, feat in enumerate(co_data['features']):
    p = feat.get('properties', {})
    name = p.get('name')
    geom_type = feat.get('geometry', {}).get('type')
    coords = feat.get('geometry', {}).get('coordinates', [])
    print(f"{i+1:02d}. id={feat.get('id', p.get('id'))} | name='{name}' | geom={geom_type}")

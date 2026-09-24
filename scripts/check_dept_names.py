# -*- coding: utf-8 -*-
import os
import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/geojson/colombiaDepartmentsGeoJson.ts', 'r', encoding='utf-8') as f:
    text = f.read()

names = re.findall(r'"name":\s*"([^"]+)"', text)
print("colombiaDepartmentsGeoJson names:", names[:10])

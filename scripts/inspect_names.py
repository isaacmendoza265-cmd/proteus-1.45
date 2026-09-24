with open('src/data/geojson/antioquia125MunicipiosGeoJson.ts', 'rb') as f:
    raw = f.read()

import re
matches = re.findall(b'"name":\\s*"([^"]+)"', raw)
for m in matches[:10]:
    print(m)

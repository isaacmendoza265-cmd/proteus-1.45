import re

with open('src/data/antioquiaData.ts', encoding='utf-8') as f:
    c = f.read()

# find MUNICIPALITY_DETAILS
idx = c.find('export const MUNICIPALITY_DETAILS')
if idx != -1:
    section = c[idx:idx+250000]
    keys = re.findall(r'^\s*["\']([^"\']+)["\']:\s*\{', section, re.M)
    print(f"Total keys in MUNICIPALITY_DETAILS: {len(keys)}")
    print("Keys sample:", keys[:20])
else:
    print("MUNICIPALITY_DETAILS not found")

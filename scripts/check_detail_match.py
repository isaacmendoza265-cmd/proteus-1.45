import json
import re
import unicodedata

def normalize(s):
    if not s: return ""
    return unicodedata.normalize('NFKD', s).encode('ASCII', 'ignore').decode('utf-8').lower().strip()

with open('scripts/all_125_munis_list.json', encoding='utf-8') as f:
    munis = json.load(f)

with open('src/data/antioquiaData.ts', encoding='utf-8') as f:
    c = f.read()

idx = c.find('export const MUNICIPALITY_DETAILS')
section = c[idx:c.find('export const VOTING_DATA')]
keys = re.findall(r'^\s*["\']([^"\']+)["\']:\s*\{', section, re.M)

muni_details_keys = {normalize(k): k for k in keys}

matched = 0
unmatched = []

for m in munis:
    n = normalize(m['name'])
    if n in muni_details_keys:
        matched += 1
    else:
        unmatched.append((m['id'], m['name'], m['subregion']))

print(f"Matched: {matched}/125")
print(f"Unmatched ({len(unmatched)}):", unmatched)

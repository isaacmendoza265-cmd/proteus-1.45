import json
import unicodedata
import re

def norm(s):
    if not s: return ""
    s = unicodedata.normalize('NFKD', s).encode('ASCII', 'ignore').decode('utf-8').lower().strip()
    s = s.replace("el ", "").replace("la ", "").replace("los ", "").replace("las ", "")
    s = s.replace(" del principe", "").replace(" mantequilla", "")
    return s

with open('scripts/all_125_munis_list.json', encoding='utf-8') as f:
    geo_munis = json.load(f)

with open('src/data/antioquiaSubregionesData.ts', encoding='utf-8') as f:
    c = f.read()

pattern = r"'([a-z\-]+)':\s*\{[\s\S]*?name:\s*'([^']+)'[\s\S]*?municipalities:\s*\[([\s\S]*?)\]\s*,\s*demographics"
sub_munis = {}
for m in re.finditer(pattern, c):
    sub_id = m.group(1)
    sub_name = m.group(2)
    munis_str = m.group(3)
    items = re.findall(r"\{\s*name:\s*'([^']+)',\s*category:\s*'([^']+)',\s*populationApprox:\s*(\d+)", munis_str)
    for name, cat, pop in items:
        sub_munis[name] = {
            "subregionId": sub_id,
            "subregionName": sub_name,
            "category": cat,
            "population": int(pop)
        }

# Match geo to sub_munis
norm_sub = {norm(k): (k, v) for k, v in sub_munis.items()}

matched = []
unmatched = []

for gm in geo_munis:
    g_norm = norm(gm['name'])
    if g_norm in norm_sub:
        orig_name, info = norm_sub[g_norm]
        matched.append((gm['id'], gm['name'], orig_name, info['subregionName'], info['population']))
    else:
        unmatched.append(gm)

print(f"Matched {len(matched)}/125")
if unmatched:
    print("Unmatched:", unmatched)

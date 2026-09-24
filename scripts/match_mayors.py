import json
import unicodedata

def clean(s):
    if not s: return ""
    s = unicodedata.normalize('NFKD', s).encode('ASCII', 'ignore').decode('utf-8').lower().strip()
    s = s.replace("el ", "").replace("la ", "").replace("los ", "").replace("las ", "")
    s = s.replace(" del principe", "").replace(" de los milagros", "").replace(" de cuerquia", "")
    s = s.replace(" de la montana", "").replace(" de antioquia", "").replace(" de uraba", "")
    s = s.replace(" mantequilla", "").replace(", distrito de ciencia, tecnologia e innovacion", "")
    s = s.replace(" de viboral", "")
    return s.strip()

with open("scripts/all_125_munis_list.json", encoding="utf-8") as f:
    geo_munis = json.load(f)

with open("scripts/tuqk_aemc_mayors.json", encoding="utf-8") as f:
    mayors = json.load(f)

mayor_map = {}
for m in mayors:
    k = clean(m.get('municipio', ''))
    mayor_map[k] = m

matched = 0
unmatched = []
for gm in geo_munis:
    k = clean(gm['name'])
    if k in mayor_map:
        matched += 1
    else:
        unmatched.append((gm['id'], gm['name'], k))

print(f"Matched {matched}/125")
if unmatched:
    print("Unmatched:", unmatched)
    print("Available in mayors:", [clean(m.get('municipio', '')) for m in mayors if not any(clean(m.get('municipio', '')) == clean(g['name']) for g in geo_munis)])

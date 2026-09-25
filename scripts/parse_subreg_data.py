with open('src/data/antioquiaSubregionesData.ts', encoding='utf-8') as f:
    c = f.read()

import re
subregions = re.findall(r"'([a-z\-]+)':\s*\{\s*id:\s*'[a-z\-]+',\s*name:\s*'([^']+)'", c)
print("Subregions found:", subregions)

# Let's extract all municipalities from each subregion
all_munis_in_subs = {}
pattern = r"'([a-z\-]+)':\s*\{[\s\S]*?name:\s*'([^']+)'[\s\S]*?municipalities:\s*\[([\s\S]*?)\]\s*,\s*demographics"
for m in re.finditer(pattern, c):
    sub_id = m.group(1)
    sub_name = m.group(2)
    munis_str = m.group(3)
    items = re.findall(r"\{\s*name:\s*'([^']+)',\s*category:\s*'([^']+)',\s*populationApprox:\s*(\d+)", munis_str)
    print(f"\n{sub_name} ({len(items)} munis):")
    for name, cat, pop in items:
        all_munis_in_subs[name] = (sub_name, cat, int(pop))
        print(f"   {name} ({cat}, {pop} hab.)", end="; ")

print(f"\n\nTotal municipalities mapped in ANTIOQUIA_SUBREGIONS_DATA: {len(all_munis_in_subs)}")

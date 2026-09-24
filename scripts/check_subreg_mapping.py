import re
import json
import os

root = r"c:\Users\isaac\OneDrive\Documentos\Proyecto Proteus"
sub_path = os.path.join(root, "src", "data", "antioquiaSubregionesData.ts")

with open(sub_path, encoding="utf-8") as f:
    sub_content = f.read()

# Parse ANTIOQUIA_SUBREGIONS_DATA
subregions = {}
sub_matches = re.findall(r"'([a-z0-9\-]+)':\s*\{[\s\S]*?name:\s*'([^']+)'[\s\S]*?municipalities:\s*\[([\s\S]*?)\]\s*,\s*demographics", sub_content)
for sub_id, sub_name, munis_str in sub_matches:
    muni_list = re.findall(r"name:\s*'([^']+)',\s*category:\s*'([^']+)',\s*populationApprox:\s*(\d+)", munis_str)
    subregions[sub_name] = muni_list

total = sum(len(v) for v in subregions.values())
print(f"Total munis in subregions: {total}")
for sname, mlist in subregions.items():
    print(f"{sname} ({len(mlist)}): {[m[0] for m in mlist[:4]]}...")

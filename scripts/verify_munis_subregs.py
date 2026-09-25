import json
import os

root = r"c:\Users\isaac\OneDrive\Documentos\Proyecto Proteus"
with open(os.path.join(root, "scripts", "all_125_munis_list.json"), encoding="utf-8") as f:
    munis = json.load(f)

print(f"Loaded {len(munis)} municipalities")
subregs = set(m["subregion"] for m in munis)
print("Subregions:", subregs)
for s in sorted(subregs):
    count = sum(1 for m in munis if m["subregion"] == s)
    print(f"  - {s}: {count} municipios")

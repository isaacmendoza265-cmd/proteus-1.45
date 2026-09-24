import re
import os

root = r"c:\Users\isaac\OneDrive\Documentos\Proyecto Proteus"
fpath = os.path.join(root, "src", "data", "antioquiaSubregionesData.ts")

with open(fpath, encoding="utf-8") as f:
    content = f.read()

munis = re.findall(r"name:\s*['\"]([^'\"]+)['\"],\s*category:\s*['\"]([^'\"]+)['\"],\s*populationApprox:\s*(\d+)", content)
print(f"Total municipalities in ANTIOQUIA_SUBREGIONS_DATA: {len(munis)}")
for m in munis[:15]:
    print(m)

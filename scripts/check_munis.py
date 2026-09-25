import re
import os

root = r"c:\Users\isaac\OneDrive\Documentos\Proyecto Proteus"
fpath = os.path.join(root, "src", "data", "antioquiaData.ts")

with open(fpath, encoding="utf-8") as f:
    content = f.read()

# Find keys in MUNICIPALITY_DETAILS
matches = re.findall(r'^\s{2}"([^"]+)":\s*\{', content, re.MULTILINE)
print(f"Total municipalities in MUNICIPALITY_DETAILS: {len(matches)}")
print("Sample:", matches[:15])

# Also check nbiDetailedData.ts
nbi_path = os.path.join(root, "src", "data", "nbiDetailedData.ts")
if os.path.exists(nbi_path):
    with open(nbi_path, encoding="utf-8") as f:
        nbi_content = f.read()
    nbi_matches = re.findall(r'^\s*["\']?([^"\'\:]+)["\']?:\s*\{', nbi_content, re.MULTILINE)
    print(f"Total keys in nbiDetailedData.ts: {len(nbi_matches)}")
    print("NBI Sample:", nbi_matches[:10])

# Check municipalitiesData.ts
muni_path = os.path.join(root, "src", "data", "observatorioAntioquia", "municipalitiesData.ts")
if os.path.exists(muni_path):
    with open(muni_path, encoding="utf-8") as f:
        muni_content = f.read()
    names = re.findall(r"name:\s*['\"]([^'\"]+)['\"]", muni_content)
    print(f"Total names in municipalitiesData.ts: {len(names)}")
    print("Muni names sample:", names[:10])

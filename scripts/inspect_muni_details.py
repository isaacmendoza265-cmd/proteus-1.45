import re
import os
import json

root = r"c:\Users\isaac\OneDrive\Documentos\Proyecto Proteus"
fpath = os.path.join(root, "src", "data", "antioquiaData.ts")

with open(fpath, encoding="utf-8") as f:
    content = f.read()

# Let's search for Abejorral, Abriaqui, etc.
for muni in ["Abejorral", "Abriaquí", "Amagá", "Amalfi", "Apartadó", "Rionegro", "Turbo", "Caucasia"]:
    pattern = rf'"{muni}":\s*(\{{[\s\S]*?\n  \}}),'
    m = re.search(pattern, content)
    if m:
        print(f"=== {muni} ===")
        print(m.group(1)[:400])
        print("...\n")
    else:
        # Try without accent
        muni_no_acc = muni.replace("á", "a").replace("í", "i").replace("ó", "o")
        m2 = re.search(rf'"{muni_no_acc}":\s*(\{{[\s\S]*?\n  \}}),', content)
        if m2:
            print(f"=== {muni_no_acc} ===")
            print(m2.group(1)[:400])
            print("...\n")
        else:
            print(f"NOT FOUND: {muni}")

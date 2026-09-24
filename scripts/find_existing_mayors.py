import re
import os

root = r"c:\Users\isaac\OneDrive\Documentos\Proyecto Proteus"
p = os.path.join(root, "src", "data")

mayors = {}
for r_dir, _, files in os.walk(p):
    for f in files:
        if f.endswith('.ts'):
            fpath = os.path.join(r_dir, f)
            try:
                with open(fpath, encoding='utf-8') as fl:
                    c = fl.read()
                    matches = re.findall(r"electedMayor:\s*['\"]([^'\"]+)['\"][\s\S]*?electedParty:\s*['\"]([^'\"]+)['\"]", c)
                    for m, part in matches:
                        mayors[m] = part
            except Exception:
                pass

print(f"Found {len(mayors)} mayors in src/data/:")
for m, p in list(mayors.items())[:15]:
    print(f"  - {m}: {p}")

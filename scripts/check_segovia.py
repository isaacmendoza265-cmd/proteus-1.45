with open('src/data/antioquiaData.ts', encoding='utf-8') as f:
    c = f.read()

import re
# Let's extract Segovia entry
m = re.search(r'"Segovia":\s*\{([\s\S]*?)\n  \},', c)
if m:
    print("Segovia entry:")
    print(m.group(0)[:1500])

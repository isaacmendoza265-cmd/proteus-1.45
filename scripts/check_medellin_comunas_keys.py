import re

with open('src/data/metropolitanAndMedellinData.ts', 'r', encoding='utf-8') as f:
    text = f.read()

keys = re.findall(r"'((?:med-c\d+|med-correg-[^']+))':\s*\{", text)
print(f"Total keys in MEDELLIN_COMUNAS_DATA: {len(keys)}")
for k in keys:
    print(f"  {k}")

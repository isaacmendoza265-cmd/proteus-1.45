with open('src/data/antioquiaData.ts', encoding='utf-8') as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if l.startswith('export '):
        print(f"L{i+1}: {l.strip()[:100]}")

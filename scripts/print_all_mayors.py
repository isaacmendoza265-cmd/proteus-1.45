import json

with open("scripts/tuqk_aemc_mayors.json", encoding="utf-8") as f:
    mayors = json.load(f)

for m in mayors:
    print(f"{m.get('municipio')}: {m.get('nombre')} ({m.get('titulo')})")

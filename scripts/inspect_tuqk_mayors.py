import json

with open("scripts/tuqk_aemc_mayors.json", encoding="utf-8") as f:
    mayors = json.load(f)

print(f"Total mayors: {len(mayors)}")
for m in mayors[:20]:
    print(f"  {m.get('municipio')} -> {m.get('nombre')} ({m.get('titulo')}) | Email: {m.get('correoelectronico')}")

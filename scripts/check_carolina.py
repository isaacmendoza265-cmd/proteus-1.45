import re

with open("src/data/antioquia125MunicipalitiesMasterData.ts", encoding="utf-8") as f:
    c = f.read()

m = re.search(r'\{\s*"id":\s*"mpio-05150"[\s\S]*?\n  \},', c)
if m:
    print(m.group(0)[:400])

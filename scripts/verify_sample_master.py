import re

with open("src/data/antioquia125MunicipalitiesMasterData.ts", encoding="utf-8") as f:
    c = f.read()

for m in ["Abriaquí", "Abejorral", "Segovia", "Caucasia", "El Bagre", "Carolina del Príncipe", "Medellín", "Rionegro"]:
    idx = c.find(f'"name": "{m}"')
    if idx != -1:
        start = c.rfind('{', 0, idx)
        end = c.find('    }', idx)
        print(f"=== {m} ===")
        snippet = c[start:end+5]
        for line in snippet.splitlines()[:18]:
            print(line)
        print("...\n")
    else:
        print(f"NOT FOUND: {m}")

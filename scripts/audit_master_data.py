# -*- coding: utf-8 -*-
import os
import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

master_path = "src/data/antioquia125MunicipalitiesMasterData.ts"
with open(master_path, "r", encoding="utf-8") as f:
    content = f.read()

# Check for generic mayor names
generic_mayors = re.findall(r'"electedMayor":\s*"([^"]+)"', content)
placeholder_count = sum(1 for m in generic_mayors if "Alcaldía" in m or "Administración" in m or "Municipal" in m)
print(f"Total mayors: {len(generic_mayors)}")
print(f"Placeholder/Generic mayors count: {placeholder_count}")

# Check 48000 population count
pop_48k = content.count('"population": 48000')
print(f"Count of population 48,000: {pop_48k}")

# Check for Abejorral, Abriaquí, Alejandría
for name in ["Abejorral", "Abriaquí", "Alejandría", "Amagá", "Amalfi", "Andes"]:
    m = re.search(r'\{\s*"id":\s*"mpio-\d+"[\s\S]*?"name":\s*"' + name + r'"[\s\S]*?"population":\s*(\d+)[\s\S]*?"electedMayor":\s*"([^"]+)"[\s\S]*?"winnerParty":\s*"([^"]+)"', content)
    if m:
        print(f"{name}: pop={m.group(1)}, mayor={m.group(2)}, party={m.group(3)}")
    else:
        print(f"{name}: NOT MATCHED regex")

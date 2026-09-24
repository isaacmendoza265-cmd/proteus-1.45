import json
import re
import unicodedata
import os

def norm(s):
    if not s: return ""
    s = unicodedata.normalize('NFKD', s).encode('ASCII', 'ignore').decode('utf-8').lower().strip()
    s = s.replace("el ", "").replace("la ", "").replace("los ", "").replace("las ", "")
    s = s.replace(" del principe", "").replace(" de los milagros", "").replace(" de cuerquia", "")
    s = s.replace(" de la montana", "").replace(" de antioquia", "").replace(" de uraba", "")
    s = s.replace(" mantequilla", "").replace(", distrito de ciencia, tecnologia e innovacion", "")
    s = s.replace(" de viboral", "").replace(", distrito portuario, logistico, industrial, turistico y comercial", "")
    return s.strip()

# 1. Load Geo munis
with open("scripts/all_125_munis_list.json", encoding="utf-8") as f:
    geo_munis = json.load(f)

# 2. Load official mayors
with open("scripts/tuqk_aemc_mayors.json", encoding="utf-8") as f:
    official_mayors = json.load(f)

# 3. Load subregion data
with open("src/data/antioquiaSubregionesData.ts", encoding="utf-8") as f:
    sub_content = f.read()

# 4. Load qualitative details from antioquiaData.ts
with open("src/data/antioquiaData.ts", encoding="utf-8") as f:
    antioquia_data = f.read()

print("Files loaded successfully.")

# -*- coding: utf-8 -*-
import os
import sys
import json
import unicodedata

sys.stdout.reconfigure(encoding='utf-8')

def norm(s):
    if not s: return ""
    s = unicodedata.normalize('NFKD', s).encode('ASCII', 'ignore').decode('utf-8').lower().strip()
    s = s.replace("el ", "").replace("la ", "").replace("los ", "").replace("las ", "")
    s = s.replace(" del principe", "").replace(" de los milagros", "").replace(" de cuerquia", "")
    s = s.replace(" de la montana", "").replace(" de antioquia", "").replace(" de uraba", "")
    s = s.replace(" mantequilla", "").replace(", distrito de ciencia, tecnologia e innovacion", "")
    s = s.replace(" de viboral", "").replace(", distrito portuario, logistico, industrial, turistico y comercial", "")
    return s.strip()

with open("scripts/all_125_munis_list.json", encoding="utf-8") as f:
    geo_munis = json.load(f)

for i, gm in enumerate(geo_munis[:8]):
    dane_code = gm["daneCode"]
    geo_name = gm["name"]
    print(f"{i}: id={gm['id']}, dane={dane_code}, geo_name={geo_name}, norm={norm(geo_name)}")

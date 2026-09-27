#!/usr/bin/env python3
"""
Población 2026 por sexo y edad de los 125 municipios de Antioquia (proyección oficial del DANE), para
el cruce sexo x edad que los datos por manzana del CNPV 2018 no traen (el DANE publica la edad por
manzana sin separarla por sexo).

Fuente: DANE, "Proyecciones de población municipal por área, sexo y edades simples 2018-2042"
(actualización post COVID-19), archivo PPED-AreaSexoEdadMun-2018-2042_VP.xlsx, descargado de
https://www.dane.gov.co/files/censo2018/proyecciones-de-poblacion/Municipal/ a
_originales/dane/proyecciones/. Áreas: cabecera municipal, centros poblados y rural disperso, total.
Salida: src/data/dane/proyeccionSexoEdad2026.json
  {dane: {"total"|"cabecera"|"rural": {"h": [...], "m": [...], "mayores18": n}}}, grupos: 0-4, ..., 75-79, 80+ (17)
Uso: python3 scripts/build_proyeccion_sexo_edad.py
"""
import json
from pathlib import Path
import openpyxl

ROOT = Path(__file__).resolve().parent.parent
ANIO = 2026
AREA = {'Total': 'total', 'Cabecera Municipal': 'cabecera', 'Centros Poblados y Rural Disperso': 'rural'}
ws = openpyxl.load_workbook(ROOT / '_originales/dane/proyecciones/PPED-AreaSexoEdadMun-2018-2042_VP.xlsx', read_only=True)['PobMunicipalxÁreaSexoEdad']


def grupos(edades):  # 101 edades simples (0..100+) -> 17 grupos quinquenales, el último 80+
    return [sum(edades[i:i + 5]) for i in range(0, 80, 5)] + [sum(edades[80:])]


out = {}
for r in ws.iter_rows(min_row=10, values_only=True):
    if r[0] != '05' or r[4] != ANIO or r[5] not in AREA:
        continue
    h, m = list(r[9:110]), list(r[110:211])
    assert sum(h) == r[7] and sum(m) == r[8], r[:6]
    out.setdefault(r[2], {})[AREA[r[5]]] = {'h': grupos(h), 'm': grupos(m), 'mayores18': sum(h[18:]) + sum(m[18:])}
meta = {'fuente': f'DANE, proyecciones de población municipal por área, sexo y edad simple 2018-2042 (post COVID-19), año {ANIO}',
        'grupos': [f'{i}-{i + 4}' for i in range(0, 80, 5)] + ['80+']}
json.dump({'meta': meta, 'municipios': out}, open(ROOT / 'src/data/dane/proyeccionSexoEdad2026.json', 'w'), ensure_ascii=False, separators=(',', ':'))
print(len(out), 'municipios')

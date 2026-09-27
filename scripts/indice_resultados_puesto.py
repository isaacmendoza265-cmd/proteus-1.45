"""
Índice de los resultados por puesto cargados: código DANE -> archivo de 2023, de Congreso 2026 y de Presidencia 2026.
Uso: python3 scripts/indice_resultados_puesto.py
"""
import json, os, re, unicodedata

def slug(s):
    s = unicodedata.normalize('NFD', s.lower())
    s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    return re.sub(r'[^a-z0-9]+', '_', s).strip('_')

res = json.load(open('src/data/electoral/puestos/resumen.json'))['municipios']
# resumen.json solo trae los municipios con más de 20.000 votantes (nacional). La fase C agrega los
# 125 municipios de Antioquia (también los de 20.000 o menos), así que se suman como candidatos.
candidatos = [(m['municipio'], m.get('dane')) for m in res]
try:
    todos_ant = json.load(open('scripts/all_125_munis_list.json'))
    candidatos += [(m['name'], m['daneCode']) for m in todos_ant]
except FileNotFoundError:
    pass

out = {}
vistos = set()
for nombre, dane in candidatos:
    if not dane or dane in vistos:
        continue
    s = slug(nombre)
    e = {'nombre': nombre.title()}
    if os.path.exists(f'src/data/electoral/resultadosPuesto2023/{s}.json'): e['2023'] = s
    if os.path.exists(f'src/data/electoral/resultadosPuesto2026/{s}.json'): e['2026'] = s
    if os.path.exists(f'src/data/electoral/resultadosPuestoPresidencial2026/{s}.json'): e['pres2026'] = s
    if len(e) > 1:
        out[dane] = e
        vistos.add(dane)
json.dump(out, open('src/data/electoral/resultadosPuesto/indice.json', 'w'), ensure_ascii=False, indent=1)
print(len(out), 'municipios con resultados por puesto')

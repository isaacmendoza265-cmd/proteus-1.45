"""
Índice de los resultados por puesto cargados: código DANE -> archivo de 2023 y de 2026.
Uso: python3 scripts/indice_resultados_puesto.py
"""
import json, os, re, unicodedata

def slug(s):
    s = unicodedata.normalize('NFD', s.lower())
    s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    return re.sub(r'[^a-z0-9]+', '_', s).strip('_')

res = json.load(open('src/data/electoral/puestos/resumen.json'))['municipios']
out = {}
for m in res:
    if not m.get('dane'):
        continue
    s = slug(m['municipio'])
    e = {'nombre': m['municipio'].title()}
    if os.path.exists(f'src/data/electoral/resultadosPuesto2023/{s}.json'): e['2023'] = s
    if os.path.exists(f'src/data/electoral/resultadosPuesto2026/{s}.json'): e['2026'] = s
    if len(e) > 1:
        out[m['dane']] = e
json.dump(out, open('src/data/electoral/resultadosPuesto/indice.json', 'w'), ensure_ascii=False, indent=1)
print(len(out), 'municipios con resultados por puesto')

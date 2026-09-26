"""
Construye los resultados por puesto (Alcaldía y Concejo 2023; Senado y Cámara 2026) de una lista
de municipios ya descargados y regenera el índice.

Uso: python3 scripts/build_fase_b.py <lista.json> <nomenclator_congreso_2026.json>
La lista es [{slug, reg, c26, n23}]: n23 es el nombre del municipio en la Divipole 2023.
Se salta lo que no esté descargado.
"""
import json, os, subprocess, sys

lista, nom26 = json.load(open(sys.argv[1])), sys.argv[2]
for m in lista:
    s = m['slug']
    if os.path.isdir(f'_originales/registraduria/preconteo2023/{s}'):
        r = subprocess.run(['python3', 'scripts/build_resultados_puesto_2023.py', s, m['reg'], m['n23']], capture_output=True, text=True)
        print(s, '2023', 'ok' if r.returncode == 0 else 'ERROR ' + r.stderr[-300:], r.stdout.strip().splitlines()[-1:] )
    if os.path.isdir(f'_originales/registraduria/congreso2026/{s}'):
        r = subprocess.run(['python3', 'scripts/build_congreso_2026.py', s, m['c26'], nom26], capture_output=True, text=True)
        print(s, '2026', 'ok' if r.returncode == 0 else 'ERROR ' + r.stderr[-300:], r.stdout.strip().splitlines()[-1:])
subprocess.run(['python3', 'scripts/indice_resultados_puesto.py'], check=True)

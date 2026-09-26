"""
Descarga el preconteo del Congreso 2026 (Senado SE y Cámara CA) de un municipio, por puesto, desde
https://resultadospreccongreso2026.registraduria.gov.co/json/ACT/<SE|CA>/<código>.json
Necesita el índice del sitio (/json/nomenclator.json).
Uso: python3 scripts/descargar_congreso_2026.py <carpeta> <nombre municipio> <código departamento 2 dígitos> <nomenclator.json>
Retoma: no vuelve a bajar archivos que ya existen y son JSON válidos.
"""
import json, os, sys, time, urllib.request

carpeta, nombre, dep, nom_path = sys.argv[1:5]
base = f'_originales/registraduria/congreso2026/{carpeta}'
os.makedirs(base, exist_ok=True)
A = json.load(open(nom_path))['amb'][0]['ambitos']
mun = next(a for a in A if a['n'] == nombre and a['l'] == 3 and a['c'].startswith(dep))
puestos = []
def hijos(a, nivel):
    return [i for g in a.get('h', []) if g['l'] == nivel for i in g['p']]
for zi in hijos(mun, 4):
    z = A[zi]
    ps = hijos(z, 6) or [k for ci in hijos(z, 5) for k in hijos(A[ci], 6)]
    for k in ps:
        puestos.append((A[k]['c'], A[k]['n'], z['n']))
json.dump(puestos, open(f'{base}/puestos_nomenclator.json', 'w'), ensure_ascii=False, indent=0)

def valido(p):
    try:
        json.load(open(p)); return True
    except Exception:
        return False

codigos = [mun['c']] + [c for c, _, _ in puestos]
ok = fallos = 0
for corp in ['SE', 'CA']:
    for c in codigos:
        out = f'{base}/{corp}_{c}.json'
        if os.path.exists(out) and valido(out):
            ok += 1; continue
        for intento in range(3):
            try:
                req = urllib.request.Request(f'https://resultadospreccongreso2026.registraduria.gov.co/json/ACT/{corp}/{c}.json', headers={'User-Agent': 'Proteus/1.0'})
                data = urllib.request.urlopen(req, timeout=60).read()
                json.loads(data)
                open(out, 'wb').write(data); ok += 1
                break
            except Exception:
                time.sleep(1 + intento)
        else:
            fallos += 1; print('fallo', out)
        time.sleep(0.15)
print(carpeta, 'puestos', len(puestos), 'archivos ok', ok, 'fallos', fallos)

"""
Descarga el preconteo 2023 (Alcaldía y Concejo) de un municipio, por puesto, desde
https://resultadosprec2023.registraduria.gov.co/json/ACT/<AL|CO>/<código>.json
Necesita el índice del sitio (/json/nomenclator.json) guardado en la ruta indicada.
Uso: python3 scripts/descargar_preconteo_2023.py <carpeta> <código Registraduría> <nomenclator.json>
Retoma: no vuelve a bajar archivos que ya existen y son JSON válidos.
"""
import json, os, sys, time, urllib.request

carpeta, codmun, nom_path = sys.argv[1], sys.argv[2], sys.argv[3]
base = f'_originales/registraduria/preconteo2023/{carpeta}'
os.makedirs(base, exist_ok=True)
A = json.load(open(nom_path))['ambitos']['3']
r = next(a for a in A if a['c'] == codmun and a['l'] == 3)
puestos = []
for i in r['h']:
    z = A[i]
    if z['l'] != 4:
        continue
    for j in z['h']:
        hijos = [j] if A[j]['l'] == 6 else A[j].get('h', [])
        for k in hijos:
            puestos.append((A[k]['c'], A[k]['n'], z['n']))
json.dump(puestos, open(f'{base}/puestos_nomenclator.json', 'w'), ensure_ascii=False, indent=0)

def valido(p):
    try:
        json.load(open(p))
        return True
    except Exception:
        return False

codigos = [codmun] + [c for c, _, _ in puestos]
ok = fallos = 0
for corp in ['AL', 'CO']:
    for c in codigos:
        out = f'{base}/{corp}_{c}.json'
        if os.path.exists(out) and valido(out):
            ok += 1
            continue
        for intento in range(3):
            try:
                req = urllib.request.Request(f'https://resultadosprec2023.registraduria.gov.co/json/ACT/{corp}/{c}.json', headers={'User-Agent': 'Proteus/1.0'})
                data = urllib.request.urlopen(req, timeout=30).read()
                json.loads(data)
                open(out, 'wb').write(data)
                ok += 1
                break
            except Exception as e:
                time.sleep(1 + intento)
        else:
            fallos += 1
            print('fallo', out)
        time.sleep(0.15)
print(carpeta, 'puestos', len(puestos), 'archivos ok', ok, 'fallos', fallos)

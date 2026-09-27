"""
Descarga Gobernación y Asamblea 2023 por puesto de un municipio, desde
https://resultadosprec2023.registraduria.gov.co/json/ACT/<GO|AS>/<código>.json
(misma jornada del 29-oct-2023 que Alcaldía/Concejo: reutiliza el nomenclátor de puestos ya
descargado por scripts/descargar_preconteo_2023.py, no vuelve a pedirlo).
Uso: python3 scripts/descargar_gobernacion_asamblea_2023.py <carpeta>
Retoma: no vuelve a bajar archivos que ya existen y son JSON válidos.
"""
import json, os, sys, time, urllib.request

carpeta = sys.argv[1]
base = f'_originales/registraduria/preconteo2023/{carpeta}'
puestos = json.load(open(f'{base}/puestos_nomenclator.json'))
codmun = puestos[0][0][:5]

def valido(p):
    try:
        json.load(open(p))
        return True
    except Exception:
        return False

codigos = [codmun] + [c for c, _, _ in puestos]
ok = fallos = 0
for corp in ['GO', 'AS']:
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

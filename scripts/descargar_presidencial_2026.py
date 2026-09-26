"""
Descarga el escrutinio de la Presidencia 2026 (1.ª y 2.ª vuelta), mesa a mesa, de una lista de
municipios. Fuente: sitios "Consulta Documentos de Escrutinio" de la Registraduría; el archivo
MMV (mesa a mesa, votos) de la comisión escrutadora MUNICIPAL trae todas las mesas del municipio.

Uso: python3 scripts/descargar_presidencial_2026.py <lista.json>   (lista: [{slug, nombre}], nombre como en la Divipole)
Guarda en _originales/registraduria/presidencial2026/{v1,v2}/<slug>.csv (+ manifiestos).
"""
import json, os, sys, time, unicodedata, urllib.request

SITIOS = {'v1': 'https://escrutiniospresidente2026.registraduria.gov.co',
          'v2': 'https://escrutinios2vueltapresidente2026.registraduria.gov.co'}
BASE = '_originales/registraduria/presidencial2026'

def get(url, intentos=4):
    for i in range(intentos):
        try:
            with urllib.request.urlopen(url, timeout=120) as r:
                datos = r.read()
            if not datos: raise ValueError('respuesta vacía')
            if url.endswith('.json'): json.loads(datos)
            return datos
        except Exception as e:
            if i == intentos - 1: raise
            time.sleep(3 * (i + 1))

def norm(s):
    s = unicodedata.normalize('NFD', s.upper()); s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    return ' '.join(s.replace('.', ' ').split())

lista = json.load(open(sys.argv[1]))
for v, sitio in SITIOS.items():
    os.makedirs(f'{BASE}/{v}', exist_ok=True)
    idx = json.loads(get(f'{sitio}/data/index.json'))
    json.dump(idx, open(f'{BASE}/{v}/index.json', 'w'))
    com = json.loads(get(f"{sitio}/data/esc/v1/comision/{idx['data/esc/v1/comision/']}"))
    json.dump(com, open(f'{BASE}/{v}/comisiones.json', 'w'), ensure_ascii=False)
    munis = {norm(m['etiqueta']): m['codigo'] for m in com['1000']['municipales'].values()}
    for m in lista:
        destino = f"{BASE}/{v}/{m['slug']}.csv"
        if os.path.exists(destino): continue
        cod = munis.get(norm(m['nombre']))
        if not cod:
            print(v, m['slug'], 'SIN COMISIÓN'); continue
        docs = json.loads(get(f"{sitio}/data/esc/v1/documentos-publicados/documentos/comision/{cod}/{idx[f'data/esc/v1/documentos-publicados/documentos/comision/{cod}/']}"))
        mmv = [d for d in docs if d['tipoDocumento'] == 'MMV' and d.get('publicado')]
        if not mmv:
            print(v, m['slug'], 'SIN MMV'); continue
        datos = get(sitio + mmv[0]['urlArchivo'])
        open(destino, 'wb').write(datos)
        print(v, m['slug'], cod, len(datos), flush=True)

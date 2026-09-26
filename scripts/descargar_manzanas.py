"""
Datos por manzana del Geoportal DANE (servicios ArcGIS REST públicos), solo atributos:
- cnpv: Censo 2018 integrado al MGN 2018 (capa 808): personas, sexo, edad decenal, viviendas por
  estrato (energía), servicios, educación, uso de las unidades. Trae el centro de la manzana (LATITUD/LONGITUD).
- ipm: Índice de Pobreza Multidimensional por manzana (CNPV 2018, MGN 2020).
- ue: conteo de unidades económicas por manzana y sector (MGN 2020), con el centroide de la manzana.
Uso: python3 scripts/descargar_manzanas.py <slug> <dane5>. Guarda en _originales/dane_manzanas/<slug>/.
"""
import json, os, sys, time
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'lib'))
from dane_arcgis import curl_json, B

slug, dane = sys.argv[1], sys.argv[2]
CAPAS = {
    'cnpv': ('MARCO_INTEGRADO/Serv_DatosCNPV2018_Integrados_MGN2018/MapServer/808', f"MPIO_CDPMP='{dane}'", {}),
    'ipm': ('POBREZA_MULTIDIMENSIONAL/Serv_MGN2020_Integrado_IPM/FeatureServer/325', f"COD_MPIO='{dane}'", {}),
    'ue': ('CONTEO_UNIDADES_ECONOMICAS/Serv_MGN2020_Integrado_ConteoUE_Agrupado/FeatureServer/4', f"COD_MPIO='{dane}'", {'returnCentroid': 'true', 'outSR': '4326'}),
}
os.makedirs(f'_originales/dane_manzanas/{slug}', exist_ok=True)
for nombre, (capa, where, extra) in CAPAS.items():
    destino = f'_originales/dane_manzanas/{slug}/{nombre}.json'
    if os.path.exists(destino): continue
    filas, off = [], 0
    while True:
        p = {'where': where, 'outFields': '*', 'returnGeometry': 'false', 'f': 'json', 'orderByFields': 'OBJECTID', 'resultOffset': off, 'resultRecordCount': 2000, **extra}
        d = curl_json(f'{B}/{capa}/query', p)
        lote = d.get('features', [])
        for f in lote:
            a = f['attributes']
            if 'centroid' in f: a['_lon'], a['_lat'] = f['centroid']['x'], f['centroid']['y']
            filas.append(a)
        if len(lote) < 2000 and not d.get('exceededTransferLimit'): break
        off += len(lote); time.sleep(0.5)
    json.dump(filas, open(destino, 'w'), ensure_ascii=False, separators=(',', ':'))
    print(slug, nombre, len(filas), os.path.getsize(destino) // 1000, 'KB', flush=True)

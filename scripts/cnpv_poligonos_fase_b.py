"""
Población del Censo 2018 (DANE) por barrio, sección/sector y vereda de los municipios de la fase B,
con la misma consulta del Geoportal DANE usada para Bello (indicadordatospoligonos.php: suma las
manzanas del CNPV 2018 dentro del polígono). Cada parte de un multipolígono se consulta aparte y se suma.

Uso: python3 scripts/cnpv_poligonos_fase_b.py <lista.json>
Crudos: _originales/dane_cnpv_fase_b/<slug>.json. App: src/data/dane/cnpv2018/<slug>.json
(formato de belloCnpv2018Barrios.json).
"""
import json, os, subprocess, sys, time
from shapely.geometry import shape

URL = 'https://geoportal.dane.gov.co/laboratorio/serviciosjson/poblacion/indicadordatospoligonos.php?coordendas='
CAMPOS = ['TOTAL_PERSONAS', 'TOTAL_HOMBRES', 'TOTAL_MUJERES', 'PERSONAS_EDAD_0A4_ANNOS', 'PERSONAS_EDAD_5A9_ANNOS', 'PERSONAS_EDAD_10A14_ANNOS',
          'PERSONAS_EDAD_15A20_ANNOS', 'PERSONAS_EDAD_29A24_ANNOS', 'PERSONAS_EDAD_25A29_ANNOS', 'PERSONAS_EDAD_30A34_ANNOS', 'PERSONAS_EDAD_35A39_ANNOS',
          'PERSONAS_EDAD_40A44_ANNOS', 'PERSONAS_EDAD_45A49_ANNOS', 'PERSONAS_EDAD_50A54_ANNOS', 'PERSONAS_EDAD_55A59_ANNOS', 'PERSONAS_EDAD_60A64_ANNOS',
          'PERSONAS_EDAD_65A69_ANNOS', 'PERSONAS_EDAD_70A74_ANNOS', 'PERSONAS_EDAD_75A79_ANNOS', 'PERSONAS_EDAD_80_O_MAS_ANNOS', 'PERSONAS_EDAD_NO_INFORMA',
          'TOTAL_DE_VIVIENDAS', 'TOTAL_DE_HOGARES', 'TOTAL_UNIDADES_ECONOMICAS']
NOMBRES = ['TOTAL_PERSONAS', 'TOTAL_HOMBRES', 'TOTAL_MUJERES', 'E0_4', 'E5_9', 'E10_14', 'E15_19', 'E20_24', 'E25_29', 'E30_34', 'E35_39', 'E40_44',
           'E45_49', 'E50_54', 'E55_59', 'E60_64', 'E65_69', 'E70_74', 'E75_79', 'E80_MAS', 'EDAD_NO_INFORMA', 'VIVIENDAS', 'HOGARES', 'UNIDADES_ECONOMICAS']

def consulta(pg):
    """El servicio responde 503 con URLs largas: se simplifica el polígono (≤ 110 vértices, y menos si falla)."""
    for maximo in (110, 110, 70, 45, 30):
        r = _consulta(anillo(pg, maximo))
        if r is not None: return r
        time.sleep(3)
    raise RuntimeError('consulta fallida')

def _consulta(ring):
    s = ','.join(f'{x:.6f},{y:.6f}' for x, y in ring)
    for i in range(2):
        out = subprocess.run(['curl', '-s', '-m', '120', URL + s], capture_output=True).stdout
        try:
            d = json.loads(out)
            if not d: return [0] * len(CAMPOS)
            return [int(float(d[0].get(c) or 0)) for c in CAMPOS]
        except Exception:
            time.sleep(3 * (i + 1))
    return None

def anillo(pg, maximo=110):
    tol = 0.00002
    while len(pg.exterior.coords) > maximo:
        pg = pg.simplify(tol, preserve_topology=True); tol *= 1.6
    return list(pg.exterior.coords)

os.makedirs('_originales/dane_cnpv_fase_b', exist_ok=True)
os.makedirs('src/data/dane/cnpv2018', exist_ok=True)
for m in json.load(open(sys.argv[1])):
    s = m['slug']
    crudo = f'_originales/dane_cnpv_fase_b/{s}.json'
    res = json.load(open(crudo)) if os.path.exists(crudo) else {}
    feats = json.load(open(f'src/data/geojson/municipios/{s}.subdivisiones.geo.json'))['features']
    for f in feats:
        if f['id'] in res: continue
        g = shape(f['geometry'])
        tot = [0] * len(CAMPOS)
        for pg in getattr(g, 'geoms', [g]):
            if pg.area < 1e-9: continue
            tot = [a + b for a, b in zip(tot, consulta(pg))]
            time.sleep(0.3)
        res[f['id']] = tot
        json.dump(res, open(crudo, 'w'))
    app = {'meta': {'fuente': 'DANE, Censo Nacional de Población y Vivienda 2018: personas censadas por manzana (datos anonimizados), consulta por polígono en el Geoportal DANE (indicadordatospoligonos), 26-sep-2026',
                    'nota': 'Suma de las manzanas dentro de cada barrio, sección o vereda. No incluye la población rural dispersa ni corrige la omisión censal. Cuando el DANE anonimiza una zona solo entrega el total de personas.',
                    'campos': NOMBRES},
           'porTerritorio': {k: res[k] for k in (f['id'] for f in feats) if k in res}}
    json.dump(app, open(f'src/data/dane/cnpv2018/{s}.json', 'w'), ensure_ascii=False, separators=(',', ':'))
    print(s, len(feats), 'personas', sum(v[0] for v in app['porTerritorio'].values()), flush=True)

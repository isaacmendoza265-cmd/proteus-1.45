"""
Suma los datos por manzana del DANE (scripts/descargar_manzanas.py) en cada barrio/vereda del municipio,
según el territorio que contiene el centro de cada manzana. Salida: src/data/dane/manzanas/<slug>.json
Campos por territorio (conteos, no porcentajes):
  p: personas · v: viviendas · h: hogares
  e: viviendas por estrato [1,2,3,4,5,6,sin estrato] (estrato de la factura de energía, CNPV 2018)
  s: viviendas con servicio [energía, acueducto, alcantarillado, gas, recolección, internet] y base (viviendas que respondieron)
  ed: personas por nivel educativo alcanzado [ninguno, primaria, secundaria, superior, posgrado, no informa]
  ipm: [suma de ipm×personas, personas con ipm, manzanas]  → IPM ponderado por población
  ue: unidades económicas [total, comercio, industria, servicios, transporte, construcción, no aplica] (conteo DANE, MGN 2020)
  tv: viviendas por tipo [casa, apartamento, cuarto, otro]
Uso: python3 scripts/agregar_manzanas.py <slug> <archivo de subdivisiones .geo.json>
"""
import json, os, sys
from shapely.geometry import shape, Point
from shapely.strtree import STRtree

slug, ruta = sys.argv[1], sys.argv[2]
base = f'_originales/dane_manzanas/{slug}'
feats = json.load(open(ruta))['features']
geoms = [shape(f['geometry']).buffer(0) for f in feats]
tree = STRtree(geoms)
def territorio(lon, lat):
    pt = Point(lon, lat)
    for i in tree.query(pt):
        if geoms[i].contains(pt): return feats[i]['id']
    # manzana en un borde o en un hueco entre polígonos: el territorio más cercano (≤ 150 m)
    i = tree.nearest(pt)
    return feats[i]["id"] if geoms[i].distance(pt) < 0.0015 else None

n = lambda x: int(x or 0)
out, sin, dem = {}, 0, {}
def reg(t):
    dem.setdefault(t, [0] * 15)
    return out.setdefault(t, {'p': 0, 'v': 0, 'h': 0, 'e': [0] * 7, 's': [0] * 7, 'ed': [0] * 6, 'ipm': [0, 0, 0], 'ue': [0] * 7, 'tv': [0] * 4})
ipm = {r['COD_DANE']: r for r in json.load(open(f'{base}/ipm.json'))}
for r in json.load(open(f'{base}/cnpv.json')):
    if r.get('LATITUD') is None: continue
    t = territorio(r['LONGITUD'], r['LATITUD'])
    if not t: sin += 1; continue
    o = reg(t)
    o['p'] += n(r['TP27_PERSO']); o['v'] += n(r['TVIVIENDA']); o['h'] += n(r['TP16_HOG'])
    fila = [n(r['TP27_PERSO']), n(r['TP32_1_SEX']), n(r['TP32_2_SEX'])] + [n(r[f'TP34_{i}_EDA']) for i in range(1, 10)] + \
           [n(r['TVIVIENDA']), n(r['TP16_HOG']), n(r['TP9_2_USO']) + n(r['TP9_3_USO'])]
    dem[t] = [a + b for a, b in zip(dem[t], fila)]
    for i, k in enumerate(['TP19_EE_E1', 'TP19_EE_E2', 'TP19_EE_E3', 'TP19_EE_E4', 'TP19_EE_E5', 'TP19_EE_E6', 'TP19_EE_E9']): o['e'][i] += n(r[k])
    for i, k in enumerate(['TP19_EE_1', 'TP19_ACU_1', 'TP19_ALC_1', 'TP19_GAS_1', 'TP19_RECB1', 'TP19_INTE1']): o['s'][i] += n(r[k])
    o['s'][6] += n(r['TP19_EE_1']) + n(r['TP19_EE_2'])
    for i, k in enumerate(['TP51_13_ED', 'TP51PRIMAR', 'TP51SECUND', 'TP51SUPERI', 'TP51POSTGR', 'TP51_99_ED']): o['ed'][i] += n(r[k])
    o['tv'][0] += n(r['TP14_1_TIP']); o['tv'][1] += n(r['TP14_2_TIP']); o['tv'][2] += n(r['TP14_3_TIP'])
    o['tv'][3] += n(r['TP14_4_TIP']) + n(r['TP14_5_TIP']) + n(r['TP14_6_TIP'])
    m = ipm.get(r['COD_DANE_A'])
    if m and m.get('ipm') is not None and n(r['TP27_PERSO']):
        o['ipm'][0] += float(m['ipm']) * n(r['TP27_PERSO']); o['ipm'][1] += n(r['TP27_PERSO']); o['ipm'][2] += 1
sin_ue = 0
for r in json.load(open(f'{base}/ue.json')):
    if r.get('_lat') is None: continue
    t = territorio(r['_lon'], r['_lat'])
    if not t: sin_ue += 1; continue
    o = reg(t)
    o['ue'][0] += n(r['abs_ue'])
    for i in range(1, 7): o['ue'][i] += n(r[f'CE_TEMA0_{i}'])
for o in out.values(): o['ipm'][0] = round(o['ipm'][0], 1)
meta = {'fuente': 'DANE, Geoportal: CNPV 2018 integrado al MGN 2018 por manzana; Índice de Pobreza Multidimensional por manzana (CNPV 2018); conteo de unidades económicas por manzana (MGN 2020). Consultado el 26-sep-2026.',
        'nota': 'Cada manzana se suma en el barrio o vereda que contiene su centro. El estrato es el de la factura de energía que reportó cada hogar en el Censo 2018, no la estratificación oficial vigente. El IPM se pondera por las personas de cada manzana. En zonas con reserva estadística el DANE entrega algunos datos en cero.'}
os.makedirs('src/data/dane/manzanas', exist_ok=True)
json.dump({'meta': meta, 'porTerritorio': out}, open(f'src/data/dane/manzanas/{slug}.json', 'w'), ensure_ascii=False, separators=(',', ':'))
# Demografía (formato de src/data/dane/cnpv2018, con edades decenales)
json.dump({'meta': {'fuente': 'DANE, CNPV 2018 integrado al MGN 2018: datos por manzana (Geoportal DANE), sumados por barrio/vereda. Consultado el 26-sep-2026.',
                    'nota': 'Cada manzana se suma en el territorio que contiene su centro. El DANE publica la edad por manzana en grupos de 10 años. No incluye la población rural dispersa ni corrige la omisión censal.',
                    'campos': ['TOTAL_PERSONAS', 'TOTAL_HOMBRES', 'TOTAL_MUJERES', 'E0_9', 'E10_19', 'E20_29', 'E30_39', 'E40_49', 'E50_59', 'E60_69', 'E70_79', 'E80_MAS', 'VIVIENDAS', 'HOGARES', 'UNIDADES_ECONOMICAS']},
           'porTerritorio': dem}, open(f'src/data/dane/cnpv2018/{slug}.json', 'w'), ensure_ascii=False, separators=(',', ':'))
print(slug, 'territorios', len(out), 'manzanas sin territorio', sin, 'UE sin territorio', sin_ue, os.path.getsize(f'src/data/dane/manzanas/{slug}.json') // 1000, 'KB')

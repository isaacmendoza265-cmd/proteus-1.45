"""
Resultados 2023 por puesto de votación (preconteo de la Registraduría).

Entrada: _originales/registraduria/preconteo2023/<municipio>/{AL,CO}_<código>.json, descargados de
https://resultadosprec2023.registraduria.gov.co/json/ACT/<AL|CO>/<código>.json, más el índice
nomenclator.json del mismo sitio (nombres de partidos). También, si existen (descargados con
scripts/descargar_gobernacion_asamblea_2023.py), {GO,AS}_<código>.json (Gobernación y Asamblea,
misma jornada): GO se trata como AL (candidato único, gobernador) y AS como CO (partido con voto
preferente); si un municipio no los tiene descargados todavía, el archivo sale igual, sin esas dos
claves (compatibilidad hacia atrás).
Salida: src/data/electoral/resultadosPuesto2023/<municipio>.json

Los códigos de puesto CAMBIAN entre elecciones (en Bello, 36 de 42 puestos de 2023 tienen otro
código en el censo 2026), así que los resultados NO se cruzan con los puestos 2026 por código.
Cada puesto de 2023 se ubica con las coordenadas de la Divipole 2023 georreferenciada
(_originales/divipole/), buscando su nombre dentro del mismo municipio; la app lo asigna luego a
la comuna o barrio que lo contiene.
No se guardan cédulas de candidatos.
Uso: python3 scripts/build_resultados_puesto_2023.py rionegro 01214 RIONEGRO
"""
import json, sys, os, glob, csv, re, unicodedata, difflib

muni, codmun, nombre_divipole = sys.argv[1], sys.argv[2], sys.argv[3]

def norm(t):
    t = unicodedata.normalize('NFD', t.upper())
    t = ''.join(c for c in t if unicodedata.category(c) != 'Mn')
    return ' '.join(re.sub(r'[^A-Z0-9 ]', ' ', t).split())

divipole = [r for r in csv.DictReader(open('_originales/divipole/divipole_2023_georreferenciada.csv', encoding='utf-8'))
            if r['departamento'] == 'ANTIOQUIA' and r['municipio'] == nombre_divipole]
def ubicar(nombre):
    n = norm(nombre)
    exactos = [r for r in divipole if norm(r['puesto']) == n]
    if len(exactos) == 1:
        r, sim = exactos[0], 1.0
    else:
        cand = sorted(((difflib.SequenceMatcher(None, n, norm(r['puesto'])).ratio(), i) for i, r in enumerate(divipole)), reverse=True)
        if not cand or cand[0][0] < 0.85:
            return None
        sim, r = cand[0][0], divipole[cand[0][1]]
    try:
        lat, lon = float(r['latitud']), float(r['longitud'])
    except ValueError:
        return None
    return {'lat': round(lat, 6), 'lon': round(lon, 6), 'similitud': round(sim, 2), 'divipole': r['puesto']}
nombres = {c: nm for c, nm, _ in json.load(open(f'_originales/registraduria/preconteo2023/{muni}/puestos_nomenclator.json'))}
base = f'_originales/registraduria/preconteo2023/{muni}'
nom = json.load(open('_originales/registraduria/preconteo2023/nomenclator_partidos.json'))
# En los resultados, "codpar" es el índice "i" del nomenclátor (no su campo codpar)
par_nombre = {p['i']: p['nombre'] for p in nom}

def i(x):
    try: return int(str(x).replace('.', ''))
    except ValueError: return 0

candidatos, cand_idx = [], {}
partidos, par_idx = [], {}

def cid(c, codpar):
    nombre = ' '.join(x for x in [c['nomcan'], c['nomcan2'], c['apecan'], c['apecan2']] if x).strip().title()
    k = (codpar, c['codcan'])
    if k not in cand_idx:
        cand_idx[k] = len(candidatos)
        candidatos.append({'n': nombre, 'p': pid(codpar)})
    return cand_idx[k]

def pid(codpar):
    if codpar not in par_idx:
        par_idx[codpar] = len(partidos)
        partidos.append(par_nombre.get(codpar, f'Partido {codpar}').title())
    return par_idx[codpar]

def leer(corp, codigo):
    d = json.load(open(f'{base}/{corp}_{codigo}.json'))
    t = d['totales']['act']
    cam = d['camaras'][0]
    ct = cam['totales']['act']
    out = {'habilitados': i(t['centota']), 'mesas': i(t['metota']), 'votantes': i(t['votant']), 'blanco': i(ct['votbla']),
           'nulos': i(t['votnul']), 'noMarcados': i(t['votnma'])}
    if corp in ('AL', 'GO'):
        out['candidatos'] = sorted(([cid(c, p['act']['codpar']), i(c['vot'])] for p in cam['partotabla'] for c in p['act']['cantotabla']), key=lambda x: -x[1])
    else:
        out['partidos'] = sorted(([pid(p['act']['codpar']), i(p['act']['vot'])] for p in cam['partotabla']), key=lambda x: -x[1])
    return out, d['mdhm'], d['numact']

def leer_si_existe(corp, codigo):
    if not os.path.exists(f'{base}/{corp}_{codigo}.json'):
        return None
    return leer(corp, codigo)[0]

municipio_al, mdhm, numact = leer('AL', codmun)
municipio_co, _, _ = leer('CO', codmun)
municipio_go = leer_si_existe('GO', codmun)
municipio_as = leer_si_existe('AS', codmun)
puestos = {}
for f in sorted(glob.glob(f'{base}/AL_{codmun}?*.json')):
    code = os.path.basename(f)[3:-5]
    u = ubicar(nombres.get(code, ''))
    p = {'n': nombres.get(code, code).title(), 'ubicacion': u, 'alcaldia': leer('AL', code)[0], 'concejo': leer('CO', code)[0]}
    go, asa = leer_si_existe('GO', code), leer_si_existe('AS', code)
    if go is not None: p['gobernacion'] = go
    if asa is not None: p['asamblea'] = asa
    puestos[code] = p

municipio = {'alcaldia': municipio_al, 'concejo': municipio_co}
if municipio_go is not None: municipio['gobernacion'] = municipio_go
if municipio_as is not None: municipio['asamblea'] = municipio_as

out = {
    'meta': {
        'fuente': 'Registraduría Nacional del Estado Civil, preconteo de las elecciones territoriales del 29-oct-2023 (resultadosprec2023.registraduria.gov.co)',
        'tipo': 'preconteo',
        'boletin': numact, 'corte': mdhm,
        'nota': 'Preconteo: conteo de la noche electoral. Puede diferir levemente del escrutinio (E-24). Cada puesto se ubica con la Divipole 2023 (por nombre); los códigos de 2023 no son los del censo 2026.',
    },
    'municipio': municipio,
    'candidatos': candidatos, 'partidos': partidos, 'puestos': puestos,
}
json.dump(out, open(f'src/data/electoral/resultadosPuesto2023/{muni}.json', 'w'), ensure_ascii=False, separators=(',', ':'))
suma = sum(p['alcaldia']['votantes'] for p in puestos.values())
sin = [p['n'] for p in puestos.values() if not p['ubicacion']]
print(muni, len(puestos), 'puestos; votantes suma', suma, 'municipio', municipio_al['votantes'], '; sin ubicar', len(sin), sin[:10])

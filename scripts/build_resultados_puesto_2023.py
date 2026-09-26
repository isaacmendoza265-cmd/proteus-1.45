"""
Resultados 2023 por puesto de votación (preconteo de la Registraduría).

Entrada: _originales/registraduria/preconteo2023/<municipio>/{AL,CO}_<código>.json, descargados de
https://resultadosprec2023.registraduria.gov.co/json/ACT/<AL|CO>/<código>.json, más el índice
nomenclator.json del mismo sitio (nombres de partidos).
Salida: src/data/electoral/resultadosPuesto2023/<municipio>.json

El código de puesto del preconteo tiene 11 caracteres (municipio 5 + zona 2 + comuna 2 + puesto 2);
el de la app tiene 9 (municipio + zona + puesto): se quita la comuna.
No se guardan cédulas de candidatos.
Uso: python3 scripts/build_resultados_puesto_2023.py rionegro 01214
"""
import json, sys, os, glob

muni, codmun = sys.argv[1], sys.argv[2]
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
    if corp == 'AL':
        out['candidatos'] = sorted(([cid(c, p['act']['codpar']), i(c['vot'])] for p in cam['partotabla'] for c in p['act']['cantotabla']), key=lambda x: -x[1])
    else:
        out['partidos'] = sorted(([pid(p['act']['codpar']), i(p['act']['vot'])] for p in cam['partotabla']), key=lambda x: -x[1])
    return out, d['mdhm'], d['numact']

municipio_al, mdhm, numact = leer('AL', codmun)
municipio_co, _, _ = leer('CO', codmun)
puestos = {}
for f in sorted(glob.glob(f'{base}/AL_{codmun}?*.json')):
    code = os.path.basename(f)[3:-5]
    app = code[:7] + code[9:]
    puestos[app] = {'alcaldia': leer('AL', code)[0], 'concejo': leer('CO', code)[0]}

out = {
    'meta': {
        'fuente': 'Registraduría Nacional del Estado Civil, preconteo de las elecciones territoriales del 29-oct-2023 (resultadosprec2023.registraduria.gov.co)',
        'tipo': 'preconteo',
        'boletin': numact, 'corte': mdhm,
        'nota': 'Preconteo: conteo de la noche electoral. Puede diferir levemente del escrutinio (E-24).',
    },
    'municipio': {'alcaldia': municipio_al, 'concejo': municipio_co},
    'candidatos': candidatos, 'partidos': partidos, 'puestos': puestos,
}
json.dump(out, open(f'src/data/electoral/resultadosPuesto2023/{muni}.json', 'w'), ensure_ascii=False, separators=(',', ':'))
suma = sum(p['alcaldia']['votantes'] for p in puestos.values())
print(muni, len(puestos), 'puestos; votantes suma', suma, 'municipio', municipio_al['votantes'])

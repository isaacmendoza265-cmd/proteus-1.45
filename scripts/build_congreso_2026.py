"""
Senado y Cámara 2026 por puesto (preconteo de la Registraduría).

Entrada: _originales/registraduria/congreso2026/<municipio>/{SE,CA}_<código>.json, descargados con
scripts/descargar_congreso_2026.py, y el índice nomenclator.json del sitio (nombres de partidos).
Salida: src/data/electoral/resultadosPuesto2026/<municipio>.json

- Circunscripción principal: Senado nacional (cam 0) y Cámara territorial (cam 1). Las especiales
  (indígenas, afro) no se incluyen.
- El código de puesto del sitio (13 caracteres: depto 2 + municipio 5 + zona 2 + comuna 2 + puesto 2,
  con el municipio rellenado) se convierte al del censo 2026 de la app (9: depto 2 + municipio 3 +
  zona 2 + puesto 2). Son la misma jornada, así que los códigos coinciden con el censo.
- Por puesto se guardan los votos por partido y los candidatos con voto preferente (los que suman
  el 97 % de los votos preferentes del puesto, como máximo 25). No se guardan cédulas.
Uso: python3 scripts/build_congreso_2026.py medellin 0100001 <nomenclator.json>
"""
import json, sys, os, glob

muni, codmun, nom_path = sys.argv[1], sys.argv[2], sys.argv[3]
base = f'_originales/registraduria/congreso2026/{muni}'
par_nombre = {p['i']: p['nombre'] for p in json.load(open(nom_path))['partidos']}
CAM = {'SE': '0', 'CA': '1'}

def i(x):
    try: return int(str(x).replace('.', ''))
    except ValueError: return 0
def app(c):
    return c if len(c) != 13 else c[0:2] + c[4:7] + c[7:9] + c[11:13]

def construir(corp):
    partidos, pidx, candidatos, cidx = [], {}, [], {}
    def pid(cod):
        if cod not in pidx:
            pidx[cod] = len(partidos); partidos.append(par_nombre.get(cod, f'Partido {cod}').title())
        return pidx[cod]
    def cid(cod, c):
        k = (cod, c['codcan'])
        if k not in cidx:
            nombre = ' '.join(x for x in [c['nomcan'], c['nomcan2'], c['apecan'], c['apecan2']] if x).strip().title()
            cidx[k] = len(candidatos); candidatos.append({'n': nombre, 'p': pid(cod)})
        return cidx[k]
    def leer(codigo, completo=False):
        d = json.load(open(f'{base}/{corp}_{codigo}.json'))
        cam = next(c for c in d['camaras'] if c['cam'] == CAM[corp])
        ct = cam['totales']['act']
        fila = {'habilitados': i(d['totales']['act']['centota']), 'mesas': i(d['totales']['act']['metota']),
                'votantes': i(ct['votant']), 'blanco': i(ct['votbla']), 'nulos': i(ct['votnul']), 'noMarcados': i(ct['votnma'])}
        ps, cs = [], []
        for p in cam['partotabla']:
            a = p['act']
            ps.append([pid(a['codpar']), i(a['vot'])])
            for c in a.get('cantotabla', []):
                v = i(c['vot'])
                if v > 0 and c['codcan'] != '0':
                    cs.append([cid(a['codpar'], c), v])
        fila['partidos'] = sorted(ps, key=lambda x: -x[1])
        cs.sort(key=lambda x: -x[1])
        if not completo:
            tot, acc, keep = sum(v for _, v in cs), 0, []
            for c in cs:
                if len(keep) >= 25 or (tot and acc >= 0.97 * tot): break
                keep.append(c); acc += c[1]
            cs = keep
        fila['candidatos'] = cs
        return fila, d['mdhm'], d['numact']
    municipio, mdhm, numact = leer(codmun, completo=True)
    puestos = {}
    for f in sorted(glob.glob(f'{base}/{corp}_{codmun}?*.json')):
        code = os.path.basename(f)[3:-5]
        puestos[app(code)] = leer(code)[0]
    return {'partidos': partidos, 'candidatos': candidatos, 'municipio': municipio, 'puestos': puestos, 'corte': mdhm, 'boletin': numact}

se, ca = construir('SE'), construir('CA')
nombres = {app(c): nm.title() for c, nm, _ in json.load(open(f'{base}/puestos_nomenclator.json'))}
se['nombres'] = nombres
ca['nombres'] = nombres
out = {
    'meta': {
        'fuente': 'Registraduría Nacional del Estado Civil, preconteo de las elecciones de Congreso del 8-mar-2026 (resultadospreccongreso2026.registraduria.gov.co)',
        'tipo': 'preconteo',
        'nota': 'Preconteo: puede diferir del escrutinio. Senado: circunscripción nacional; Cámara: circunscripción territorial de Antioquia. Candidatos por puesto: los que suman el 97 % del voto preferente (máx. 25).',
        'codigos': 'Código de puesto del censo 2026 (misma jornada).',
    },
    'elecciones': {'senado-2026': dict(se, nombre='Senado 2026'), 'camara-2026': dict(ca, nombre='Cámara 2026 (Antioquia)')},
}
os.makedirs('src/data/electoral/resultadosPuesto2026', exist_ok=True)
json.dump(out, open(f'src/data/electoral/resultadosPuesto2026/{muni}.json', 'w'), ensure_ascii=False, separators=(',', ':'))
for k, e in out['elecciones'].items():
    s = sum(p['votantes'] for p in e['puestos'].values())
    print(k, len(e['puestos']), 'puestos; votantes suma', s, 'municipio', e['municipio']['votantes'], '; partidos', len(e['partidos']), 'candidatos', len(e['candidatos']))
print(os.path.getsize(f'src/data/electoral/resultadosPuesto2026/{muni}.json') / 1e3, 'KB')

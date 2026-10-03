#!/usr/bin/env python3
"""
Fiscalía General de la Nación, datos abiertos del SPOA (datos.gov.co, API Socrata), por municipio de Antioquia y año del
hecho, 2018-2026. Solo consultas agregadas (conteos): ningún registro individual ni dato personal.

Conjuntos:
  dbdv-iihs  Procesos V3 (noticias criminales): cod_dane_hecho, a_o_hecho, delito, titulo_delito
  hr73-zqjf  Víctimas V3: cod_dane_hecho_origen, a_o_hecho_origen, ddhh (defensor de DD. HH. / líder), periodista, delito

Indicadores:
  electorales      procesos por delitos contra mecanismos de participación democrática (constreñimiento y corrupción
                   al sufragante, fraude en la inscripción de cédulas, voto fraudulento, alteración de resultados...)
  extorsion        procesos por extorsión (Art. 244 y agravadas; no incluye secuestro extorsivo)
  desplazamiento   procesos por desplazamiento forzado (Art. 180 y agravados)
  menores          procesos por reclutamiento ilícito (Art. 162) o uso de menores para delinquir (Art. 188D)
  defensores       víctimas registradas como defensoras de DD. HH. o líderes, por cualquier delito
  periodistas      víctimas registradas como periodistas, por cualquier delito

Descargado el 2-oct-2026 con permiso de Isaac (lote Fiscalía). Respuestas de la API en _originales/fiscalia/.
Salida: src/data/motor/fiscalia-spoa.json (motor de análisis, nivel oficial, categoría seguridad).
Son DENUNCIAS (noticias criminales), no hechos comprobados: hay subregistro y el año es el del hecho denunciado.

Uso: python3 scripts/importar_fiscalia.py [--local]
"""
import json
import re
import sys
import time
import urllib.parse
import urllib.request
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ORIG = ROOT / '_originales/fiscalia'
API = 'https://www.datos.gov.co/resource/{}.json'
ANIOS = list(range(2018, 2027))

PROCESOS = {
    'electorales': "titulo_delito = 'Delitos Contra Mecanismos De Participacion Democratica'",
    'extorsion': "upper(delito) like 'EXTORSION%'",
    'desplazamiento': "upper(delito) like 'DESPLAZAMIENTO FORZADO%'",
    'menores': "(upper(delito) like 'RECLUTAMIENTO ILICITO%' OR upper(delito) like 'USO DE MENORES%')",
}
VICTIMAS = {'defensores': "ddhh = 'Si'", 'periodistas': "periodista = 'Si'"}
TITULOS = {
    'electorales': 'Delitos electorales denunciados (contra mecanismos de participación democrática)',
    'extorsion': 'Procesos por extorsión',
    'desplazamiento': 'Procesos por desplazamiento forzado',
    'menores': 'Procesos por reclutamiento o uso de menores',
    'defensores': 'Víctimas defensoras de DD. HH. o líderes (cualquier delito)',
    'periodistas': 'Víctimas periodistas (cualquier delito)',
}


def consultar(conjunto, params, intentos=4):
    url = API.format(conjunto) + '?' + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Proteus importador)'})
    for i in range(intentos):
        try:
            with urllib.request.urlopen(req, timeout=300) as r:
                return json.load(r)
        except Exception as e:  # la API corta las consultas pesadas de Víctimas: reintentar
            if i == intentos - 1:
                raise
            print('  reintento', i + 1, type(e).__name__)
            time.sleep(5 * (i + 1))


PARCIAL = ORIG / 'fiscalia_parcial.json'


def guardar_parcial(datos):
    json.dump(datos, open(PARCIAL, 'w'), ensure_ascii=False)


def descargar():
    """Reanudable: cada consulta terminada se guarda en fiscalia_parcial.json y no se repite."""
    ORIG.mkdir(parents=True, exist_ok=True)
    datos = json.load(open(PARCIAL)) if PARCIAL.exists() else {}
    for k, cond in PROCESOS.items():
        if k in datos:
            continue
        datos[k] = consultar('dbdv-iihs', {
            '$select': 'cod_dane_hecho as dane, a_o_hecho as anio, count(*) as n',
            '$where': f"departamento_hecho = 'Antioquia' AND a_o_hecho >= '2018' AND {cond}",
            '$group': 'dane, anio', '$limit': 50000})
        print(k, len(datos[k]), flush=True)
        guardar_parcial(datos)
    # Víctimas: una consulta por año (la tabla es muy grande) que trae defensores y periodistas con su delito
    for a in ANIOS:
        if f'vict:{a}' in datos:
            continue
        datos[f'vict:{a}'] = consultar('hr73-zqjf', {
            '$select': 'cod_dane_hecho_origen as dane, ddhh, periodista, delito, count(*) as n',
            '$where': f"departamento_hecho_origen = 'Antioquia' AND a_o_hecho_origen = '{a}' AND (ddhh = 'Si' OR periodista = 'Si')",
            '$group': 'dane, ddhh, periodista, delito', '$limit': 50000})
        print('víctimas', a, len(datos[f'vict:{a}']), flush=True)
        guardar_parcial(datos)
    for k, campo in (('defensores', 'ddhh'), ('periodistas', 'periodista')):
        datos[k] = [{'dane': x.get('dane'), 'anio': str(a), 'n': x['n']} for a in ANIOS for x in datos[f'vict:{a}'] if x.get(campo) == 'Si']
    det = Counter()
    for a in ANIOS:
        for x in datos[f'vict:{a}']:
            if x.get('ddhh') == 'Si':
                det[x['delito']] += int(x['n'])
    datos['detalle_defensores'] = [{'delito': k, 'n': n} for k, n in det.most_common(12)]
    if 'detalle_electorales' not in datos:  # qué delitos electorales se denuncian en Antioquia 2018-2026
        datos['detalle_electorales'] = consultar('dbdv-iihs', {
            '$select': 'delito, count(*) as n',
            '$where': f"departamento_hecho = 'Antioquia' AND a_o_hecho >= '2018' AND {PROCESOS['electorales']}",
            '$group': 'delito', '$order': 'n desc', '$limit': 12})
        guardar_parcial(datos)
    datos['corte'] = consultar('dbdv-iihs', {'$select': 'max(fecha_corte_datos) as c'})[0]['c']
    datos = {k: v for k, v in datos.items() if ':' not in k}
    json.dump(datos, open(ORIG / 'fiscalia_agregados.json', 'w'), ensure_ascii=False)


if '--local' not in sys.argv:
    descargar()
d = json.load(open(ORIG / 'fiscalia_agregados.json'))

dane = json.load(open(ROOT / 'src/data/dane/antioquiaDane.json'))['municipios']
POB = {k: v['poblacion'] for k, v in dane.items()}
NOMBRE = {k: v['nombre'] for k, v in dane.items()}
SUB = dict(re.findall(r'"daneCode":\s*"(\d{5})",[\s\S]*?"subregion":\s*"([^"]+)"',
                      (ROOT / 'src/data/antioquia125MunicipalitiesMasterData.ts').read_text()))

serie = {k: defaultdict(Counter) for k in TITULOS}
fuera = 0
for k in TITULOS:
    for f in d[k]:
        m = (f.get('dane') or '').zfill(5)
        try:
            a = int(f['anio'])
        except (KeyError, ValueError):
            continue
        if m not in POB:
            fuera += int(f['n'])
            continue
        if a in ANIOS:
            serie[k][m][a] += int(f['n'])

fmt = lambda n: f'{round(n):,}'.replace(',', '.')
dec = lambda x: f'{x:.1f}'.replace('.', ',')
corte = d['corte']  # dd/mm/aaaa


def lineas(miembros, nombre):
    out, sin = [], []
    for k, titulo in TITULOS.items():
        s = {a: sum(serie[k][m][a] for m in miembros) for a in ANIOS}
        if not any(s.values()):
            sin.append(titulo.split(' (')[0].lower())
            continue
        hist = ' · '.join(f'{a} {fmt(s[a])}' for a in ANIOS[:-1]) + f' · 2026 (al corte) {fmt(s[2026])}'
        l = f'{titulo}: {hist}.'
        if k == 'electorales':
            l += f' Años de elecciones territoriales: 2019 {fmt(s[2019])} y 2023 {fmt(s[2023])}.'
        if k in ('extorsion', 'desplazamiento'):
            pob = sum(POB[m] for m in miembros)
            l += f' 2025: {dec(100000 * s[2025] / pob)} por 100.000 habitantes.'
        out.append(l)
    if sin:
        out.append(f'Sin denuncias 2018-2026 en {nombre} de: {", ".join(sin)}.')
    return out


municipios = {m: {'lineas': lineas([m], NOMBRE[m])} for m in sorted(POB)}
subregiones = {}
for s in sorted(set(SUB.values())):
    miembros = [m for m in POB if SUB.get(m) == s]
    ls = lineas(miembros, s)
    top = Counter({m: sum(serie['electorales'][m][a] for a in ANIOS) for m in miembros}).most_common(5)
    if top and top[0][1]:
        ls.append('Municipios de la subregión con más delitos electorales denunciados 2018-2026: ' + '; '.join(f'{NOMBRE[m]} {fmt(n)}' for m, n in top if n) + '.')
    top = Counter({m: sum(serie['defensores'][m][a] for a in ANIOS) for m in miembros}).most_common(5)
    if top and top[0][1]:
        ls.append('Municipios de la subregión con más víctimas defensoras de DD. HH. o líderes 2018-2026: ' + '; '.join(f'{NOMBRE[m]} {fmt(n)}' for m, n in top if n) + '.')
    subregiones[s] = {'lineas': ls}

todos = sorted(POB)
dep = lineas(todos, 'Antioquia')
dep.append('Delitos electorales más denunciados en Antioquia 2018-2026: ' + '; '.join(f"{x['delito']} {fmt(int(x['n']))}" for x in d['detalle_electorales'][:8]) + '.')
dep.append('Delitos más denunciados contra defensores de DD. HH. y líderes en Antioquia 2018-2026: ' + '; '.join(f"{x['delito']} {fmt(int(x['n']))}" for x in d['detalle_defensores'][:6] if x['delito'] != 'Sin Información') + '.')
top = Counter({m: sum(serie['electorales'][m][a] for a in ANIOS) for m in todos}).most_common(10)
dep.append('Municipios con más delitos electorales denunciados 2018-2026: ' + '; '.join(f'{NOMBRE[m]} {fmt(n)}' for m, n in top) + '.')

motor = {
    'meta': {
        'titulo': 'Fiscalía: denuncias por delitos electorales, extorsión, desplazamiento, menores, líderes y periodistas (2018-2026)',
        'fuente': 'Fiscalía General de la Nación, datos abiertos del SPOA (Procesos V3 y Víctimas V3, datos.gov.co)',
        'nivel': 'oficial',
        'categoria': 'seguridad',
        'corte': '-'.join(reversed(corte.split('/'))) if '/' in corte else corte,
        'nota': ('Son denuncias (noticias criminales), no hechos comprobados: hay subregistro y una denuncia puede seguir en '
                 'indagación o archivarse. Municipio y año del hecho denunciado. Defensores y periodistas son víctimas así '
                 'registradas por la Fiscalía, por cualquier delito. No se atribuye a un barrio ni se cruza con su voto'),
    },
    'municipios': municipios,
    'subregiones': subregiones,
    'departamento': {'lineas': dep},
}
json.dump(motor, open(ROOT / 'src/data/motor/fiscalia-spoa.json', 'w'), ensure_ascii=False, indent=0)
print('corte', corte, '· registros fuera de los 125 municipios (sin código o de otro depto.):', fuera)
print(*municipios['05001']['lineas'], sep='\n')
print(*dep[-3:], sep='\n')

#!/usr/bin/env python3
"""
Seguridad por municipio de Antioquia, 2018-2026, desde la estadística delictiva de la Policía Nacional / Ministerio de
Defensa publicada en datos.gov.co (API abierta Socrata). Una consulta agregada por delito (municipio × año), sin
registros individuales ni datos personales.

Conjuntos (datos.gov.co):
  m8fd-ahd9  Homicidio                         cod_muni, fecha_hecho, cantidad
  q2ib-t9am  Extorsión                         cod_muni, fecha_hecho, cantidad
  d7zw-hpf4  Secuestro                         cod_muni, fecha_hecho, cantidad
  u8eq-92tb  Masacres                          cod_muni, fecha_hecho, casos, victimas
  yi5j-5fe9  Terrorismo                        cod_muni, fecha_hecho, cantidad
  8rpn-wpty  Afectación a la fuerza pública    cod_muni, fecha_hecho, accion (MUERTO/HERIDO), cantidad
  meew-mguv  Amenazas                          codigo_dane (8 díg.), fecha_hecho 'dd/mm/aaaa', cantidad

Descargado el 2-oct-2026 con permiso de Isaac (lote de seguridad). Las respuestas crudas de la API quedan en
_originales/seguridad/policia_<conjunto>.json para reproducir el cálculo sin volver a consultar.

Salida: src/data/motor/seguridad-policia.json (motor de análisis: entra al dossier de cada municipio, de su subregión y
de Antioquia, y con él a todas las herramientas de IA). Tasa por 100.000 habitantes con la población DANE 2026
(antioquiaDane.json); la de 2025 es aproximada porque usa la población de 2026.

Uso: python3 scripts/importar_seguridad.py            (consulta la API y guarda los crudos)
     python3 scripts/importar_seguridad.py --local    (solo recalcula desde _originales/)
"""
import json
import sys
import urllib.parse
import urllib.request
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ORIG = ROOT / '_originales/seguridad'
API = 'https://www.datos.gov.co/resource/{}.json'
ANIOS = list(range(2018, 2027))
FUENTE = 'Policía Nacional y Ministerio de Defensa, estadística delictiva (datos.gov.co)'

DELITOS = [  # clave, conjunto, nombre, campo sumado
    ('homicidio', 'm8fd-ahd9', 'Homicidios', 'cantidad'),
    ('extorsion', 'q2ib-t9am', 'Extorsiones denunciadas', 'cantidad'),
    ('secuestro', 'd7zw-hpf4', 'Secuestros', 'cantidad'),
    ('masacre', 'u8eq-92tb', 'Masacres', 'casos'),
    ('terrorismo', 'yi5j-5fe9', 'Actos de terrorismo', 'cantidad'),
    ('fuerza_publica', '8rpn-wpty', 'Miembros de la fuerza pública asesinados o heridos', 'cantidad'),
]


def consultar(conjunto, params):
    url = API.format(conjunto) + '?' + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Proteus importador)'})
    with urllib.request.urlopen(req, timeout=120) as r:
        return json.load(r)


def descargar():
    ORIG.mkdir(parents=True, exist_ok=True)
    for clave, conjunto, _, campo in DELITOS:
        extra = ', sum(victimas) as victimas' if clave == 'masacre' else ''
        grupo = 'cod_muni, anio' + (', accion' if clave == 'fuerza_publica' else '')
        sel = f'cod_muni, date_extract_y(fecha_hecho) as anio, sum({campo}) as n{extra}' + (', accion' if clave == 'fuerza_publica' else '')
        filas = consultar(conjunto, {'$select': sel, '$where': "cod_depto='05' AND fecha_hecho >= '2018-01-01T00:00:00'",
                                     '$group': grupo, '$limit': 50000})
        # Mismo periodo enero-agosto de 2025 y 2026 (comparación interanual con el corte de 2026)
        ytd = consultar(conjunto, {'$select': f'cod_muni, date_extract_y(fecha_hecho) as anio, sum({campo}) as n',
                                   '$where': "cod_depto='05' AND date_extract_m(fecha_hecho) <= 8 AND fecha_hecho >= '2025-01-01T00:00:00'",
                                   '$group': 'cod_muni, anio', '$limit': 50000})
        corte = consultar(conjunto, {'$select': 'max(fecha_hecho) as corte'})[0]['corte'][:10]
        json.dump({'conjunto': conjunto, 'corte': corte, 'filas': filas, 'ene_ago': ytd}, open(ORIG / f'policia_{conjunto}.json', 'w'), ensure_ascii=False)
        print(clave, len(filas), 'filas; corte', corte)
    # Amenazas: otro esquema (código de 8 dígitos y fecha en texto)
    filas = consultar('meew-mguv', {'$select': 'codigo_dane, fecha_hecho, sum(cantidad) as n',
                                    '$where': "starts_with(codigo_dane,'05')", '$group': 'codigo_dane, fecha_hecho', '$limit': 50000})
    json.dump({'conjunto': 'meew-mguv', 'filas': filas}, open(ORIG / 'policia_meew-mguv.json', 'w'), ensure_ascii=False)
    print('amenazas', len(filas), 'filas')


if '--local' not in sys.argv:
    descargar()

# --- Población y subregión ---------------------------------------------------------------------------
dane = json.load(open(ROOT / 'src/data/dane/antioquiaDane.json'))['municipios']
POB = {k: v['poblacion'] for k, v in dane.items()}
NOMBRE = {k: v['nombre'] for k, v in dane.items()}
txt = (ROOT / 'src/data/antioquia125MunicipalitiesMasterData.ts').read_text()
import re
SUB = dict(re.findall(r'"daneCode":\s*"(\d{5})",[\s\S]*?"subregion":\s*"([^"]+)"', txt))
assert len(SUB) == 125, len(SUB)

# --- Series ------------------------------------------------------------------------------------------
serie = defaultdict(lambda: defaultdict(lambda: defaultdict(float)))  # delito -> dane -> año -> n
victimas = defaultdict(lambda: defaultdict(float))                     # masacres: dane -> año -> víctimas
fp_muertos = defaultdict(lambda: defaultdict(float))                   # fuerza pública: muertos
eneago = defaultdict(lambda: defaultdict(lambda: defaultdict(float)))  # delito -> dane -> año (ene-ago)
cortes = {}
for clave, conjunto, _, _ in DELITOS:
    d = json.load(open(ORIG / f'policia_{conjunto}.json'))
    cortes[clave] = d['corte']
    for f in d['filas']:
        m, a = f['cod_muni'], int(f['anio'])
        if m not in POB:
            continue
        serie[clave][m][a] += float(f['n'])
        if clave == 'masacre':
            victimas[m][a] += float(f.get('victimas') or 0)
        if clave == 'fuerza_publica' and (f.get('accion') or '').upper() in ('ASESINADO', 'MUERTO'):
            fp_muertos[m][a] += float(f['n'])
    for f in d['ene_ago']:
        if f['cod_muni'] in POB:
            eneago[clave][f['cod_muni']][int(f['anio'])] += float(f['n'])
for f in json.load(open(ORIG / 'policia_meew-mguv.json'))['filas']:
    m, a = f['codigo_dane'][:5], int(f['fecha_hecho'][-4:])
    if m in POB and a in ANIOS:
        serie['amenaza'][m][a] += float(f['n'])
DELITOS.append(('amenaza', 'meew-mguv', 'Amenazas denunciadas', 'cantidad'))
CORTE = max(cortes.values())

fmt = lambda n: f'{round(n):,}'.replace(',', '.')
dec = lambda x: f'{x:.1f}'.replace('.', ',')


def tasa(n, pob):
    return 100000 * n / pob if pob else 0


def lineas(miembros, nombre):
    """Líneas para un municipio o para la suma de varios (subregión, departamento)."""
    pob = sum(POB[m] for m in miembros)
    out = []
    sin = []
    for clave, _, titulo, _ in DELITOS:
        s = {a: sum(serie[clave][m][a] for m in miembros) for a in ANIOS}
        if not any(s.values()):
            sin.append(titulo.lower())
            continue
        corte_txt = '2026 (enero-agosto)' if clave != 'amenaza' else '2026 (parcial)'
        hist = ' · '.join(f'{a} {fmt(s[a])}' for a in ANIOS[:-1]) + f' · {corte_txt} {fmt(s[2026])}'
        l = f'{titulo}: {hist}.'
        if clave in ('extorsion', 'secuestro', 'amenaza') or (clave == 'homicidio' and len(miembros) > 1):
            l += f' Tasa 2025: {dec(tasa(s[2025], pob))} por 100.000 habitantes.'
        if clave == 'masacre':
            v = sum(victimas[m][a] for m in miembros for a in ANIOS)
            l += f' Víctimas de masacres 2018-2026: {fmt(v)}.'
        if clave == 'fuerza_publica':
            mu = sum(fp_muertos[m][a] for m in miembros for a in ANIOS)
            l += f' De ellos, asesinados 2018-2026: {fmt(mu)}.'
        if clave in eneago:
            e25 = sum(eneago[clave][m][2025] for m in miembros)
            e26 = sum(eneago[clave][m][2026] for m in miembros)
            if e25 or e26:
                cambio = f'{(100 * (e26 - e25) / e25):+.0f} %'.replace('.', ',') if e25 else 'sin base de comparación'
                l += f' Enero-agosto: {fmt(e25)} en 2025 y {fmt(e26)} en 2026 ({cambio}).'
        out.append(l)
    if sin:
        out.append(f'Sin registros 2018-2026 en {nombre}: {", ".join(sin)}.')
    return out


# Tasa de homicidio 2025 de Antioquia, para comparar
TODOS = sorted(POB)
t_ant = tasa(sum(serie['homicidio'][m][2025] for m in TODOS), sum(POB.values()))
municipios = {}
for m in TODOS:
    ls = lineas([m], NOMBRE[m])
    t = tasa(serie['homicidio'][m][2025], POB[m])
    rel = 'por encima' if t > t_ant * 1.1 else 'por debajo' if t < t_ant * 0.9 else 'cerca'
    ls.insert(0, f'Tasa de homicidio 2025: {dec(t)} por 100.000 habitantes, {rel} de la de Antioquia ({dec(t_ant)}).' if rel != 'cerca'
              else f'Tasa de homicidio 2025: {dec(t)} por 100.000 habitantes, cerca de la de Antioquia ({dec(t_ant)}).')
    municipios[m] = {'lineas': ls}

subregiones = {}
for s in sorted(set(SUB.values())):
    miembros = [m for m in TODOS if SUB.get(m) == s]
    ls = lineas(miembros, s)
    rank = sorted(miembros, key=lambda m: -tasa(serie['homicidio'][m][2025], POB[m]))[:5]
    ls.append('Municipios de la subregión con mayor tasa de homicidio 2025: ' +
              '; '.join(f'{NOMBRE[m]} {dec(tasa(serie["homicidio"][m][2025], POB[m]))}' for m in rank) + '.')
    subregiones[s] = {'lineas': ls}

dep = lineas(TODOS, 'Antioquia')
rank = sorted(TODOS, key=lambda m: -serie['homicidio'][m][2025])[:10]
dep.append('Municipios con más homicidios en 2025: ' + '; '.join(f'{NOMBRE[m]} {fmt(serie["homicidio"][m][2025])}' for m in rank) + '.')
rank = sorted((m for m in TODOS if POB[m] >= 20000), key=lambda m: -tasa(serie['homicidio'][m][2025], POB[m]))[:10]
dep.append('Mayor tasa de homicidio 2025 (municipios de 20.000 habitantes o más): ' +
           '; '.join(f'{NOMBRE[m]} {dec(tasa(serie["homicidio"][m][2025], POB[m]))}' for m in rank) + '.')

motor = {
    'meta': {
        'titulo': 'Seguridad: delitos registrados por la Policía (2018-2026)',
        'fuente': FUENTE,
        'nivel': 'oficial',
        'categoria': 'seguridad',
        'corte': CORTE,
        'nota': ('Municipio donde ocurrió el hecho. Extorsión y amenazas son denuncias (hay subregistro). '
                 'Tasas con la población DANE 2026 (la de 2025 es aproximada). 2026 llega hasta el corte. '
                 'Es un dato del municipio: no se atribuye a un barrio ni se cruza con su voto sin la advertencia de falacia ecológica'),
    },
    'municipios': municipios,
    'subregiones': subregiones,
    'departamento': {'lineas': dep},
}
json.dump(motor, open(ROOT / 'src/data/motor/seguridad-policia.json', 'w'), ensure_ascii=False, indent=0)
print('corte', CORTE, '· tasa homicidio Antioquia 2025', dec(t_ant))
print('Medellín:', *municipios['05001']['lineas'], sep='\n  ')

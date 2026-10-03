#!/usr/bin/env python3
"""
Alertas tempranas de la Defensoría del Pueblo (Sistema de Alertas Tempranas, SAT) que tocan municipios de Antioquia.

Fuente: https://alertastempranas.defensoria.gov.co/Alerta/Reporte (tabla pública de todas las alertas desde 2017) y la
ficha de cada alerta en /Alerta/Details/{id}: tipo (inminencia o estructural), fecha, tema clave, economías ilegales,
grupos armados que nombra, municipios, conductas vulneratorias advertidas o identificadas y advertencias previas.

Descargado el 2-oct-2026 con permiso de Isaac (lote de seguridad). Originales en _originales/defensoria/:
  alertas_reporte_<fecha>.html     la tabla completa
  detalles/<id>.html               la ficha de cada alerta de Antioquia

Salida: src/data/motor/alertas-tempranas-defensoria.json (motor de análisis; nivel oficial, categoría seguridad).
Lo que la alerta dice de los grupos armados es la afirmación de la Defensoría, no un dato medido: así se rotula.

Uso: python3 scripts/importar_alertas_defensoria.py            (descarga las fichas que falten)
     python3 scripts/importar_alertas_defensoria.py --local    (solo recalcula)
"""
import html
import json
import re
import sys
import time
import unicodedata
import urllib.request
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ORIG = ROOT / '_originales/defensoria'
BASE = 'https://alertastempranas.defensoria.gov.co'
MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']


def limpio(x):
    return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', ' ', x))).strip()


def norm(s):
    s = unicodedata.normalize('NFD', s).encode('ascii', 'ignore').decode().lower()
    return re.sub(r'[^a-z0-9]', '', s)


def bajar(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Proteus importador)'})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read().decode('utf-8')


reporte = sorted(ORIG.glob('alertas_reporte_*.html'))[-1]
s = reporte.read_text(encoding='utf-8')
alertas = []
for fila in re.findall(r'<tr[^>]*>([\s\S]*?)</tr>', s):
    celdas = [limpio(c) for c in re.findall(r'<td[^>]*>([\s\S]*?)</td>', fila)]
    enlace = re.search(r'href="(/Alerta/Details/(\d+))"', fila)
    if not enlace or len(celdas) < 5 or '(Antioquia)' not in celdas[4]:
        continue
    alertas.append({'codigo': celdas[0], 'tipo': celdas[1], 'fecha': celdas[2], 'resumen': celdas[3],
                    'id': enlace.group(2), 'url': BASE + enlace.group(1)})
print(len(alertas), 'alertas de Antioquia en', reporte.name)

det_dir = ORIG / 'detalles'
det_dir.mkdir(parents=True, exist_ok=True)
for a in alertas:
    f = det_dir / f"{a['id']}.html"
    if not f.exists() and '--local' not in sys.argv:
        f.write_text(bajar(a['url']), encoding='utf-8')
        time.sleep(0.5)


def seccion(d, titulo):
    m = re.search(r'<h2[^>]*>\s*' + titulo + r'\s*</h2>([\s\S]*?)</article>', d)
    return m.group(1) if m else ''


for a in alertas:
    d = (det_dir / f"{a['id']}.html").read_text(encoding='utf-8')
    a['economias'] = [x for x in (limpio(y) for y in re.split(r';', limpio(seccion(d, 'Econom&#237;as ilegales') or seccion(d, 'Economías ilegales')))) if x]
    grupos = seccion(d, 'Grupos armados ilegales')
    a['grupos'] = [x for x in (limpio(y) for y in re.split(r'<br\s*/?>', grupos)) if x]
    lugar = seccion(d, 'Lugar de advertencia')
    a['municipios'] = []
    for tr in re.findall(r'<tr>([\s\S]*?)</tr>', lugar):
        tds = [limpio(c) for c in re.findall(r'<td[^>]*>([\s\S]*?)</td>', tr)]
        if len(tds) >= 2 and norm(tds[0]) == 'antioquia':
            a['municipios'].append(tds[1])
    cond = seccion(d, 'Conductas vulneratorias e infracciones al D.I.H.')
    a['conductas'] = []
    for tr in re.findall(r'<tr>([\s\S]*?)</tr>', cond):
        tds = [limpio(c) for c in re.findall(r'<td[^>]*>([\s\S]*?)</td>', tr)]
        if len(tds) >= 3 and 'X' in tds[1:]:
            a['conductas'].append(tds[0])
    tema = seccion(d, 'Tema clave')
    if tema:
        a['resumen'] = limpio(tema) or a['resumen']

# Municipios por nombre -> DANE
dane = json.load(open(ROOT / 'src/data/dane/antioquiaDane.json'))['municipios']
POR_NOMBRE = {norm(v['nombre']): k for k, v in dane.items()}
ALIAS = {'sanvicente': 'sanvicenteferrer', 'santafedeantioquia': 'santafedeantioquia', 'elcarmen': 'elcarmendeviboral',
         'carmendeviboral': 'elcarmendeviboral', 'yondocasabe': 'yondo', 'santuario': 'elsantuario',
         'donmatias': 'donmatias', 'sanpedro': 'sanpedrodelosmilagros', 'elretiro': 'retiro', 'elpenol': 'penol'}


def a_dane(nombre):
    n = norm(nombre)
    n = ALIAS.get(n, n)
    if n in POR_NOMBRE:
        return POR_NOMBRE[n]
    cand = [k for nn, k in POR_NOMBRE.items() if nn.startswith(n) or n.startswith(nn)]
    return cand[0] if len(cand) == 1 else None


sin_dane = set()
por_muni = defaultdict(list)
for a in alertas:
    a['dane'] = []
    for m in a['municipios']:
        k = a_dane(m)
        if k:
            a['dane'].append(k)
            por_muni[k].append(a)
        else:
            sin_dane.add(m)
assert not sin_dane, f'municipios sin código DANE: {sin_dane}'


def fecha(f):
    y, m, d = f.split('-')
    return f'{int(d)}-{MESES[int(m) - 1]}-{y}'


def corto(t, n=420):
    return t if len(t) <= n else t[:n].rsplit(' ', 1)[0] + '…'


def linea(a, detalle=True):
    l = f"Alerta {a['codigo']} ({a['tipo'].lower()}, {fecha(a['fecha'])})"
    if len(a['dane']) > 1:
        l += f", {len(a['dane'])} municipios"
    if a['grupos']:
        l += f". Grupos que nombra la Defensoría: {', '.join(a['grupos'])}"
    if a['economias']:
        l += f". Economías ilegales: {', '.join(a['economias']).lower()}"
    if detalle:
        if a['conductas']:
            l += f". Conductas advertidas: {', '.join(c.lower() for c in a['conductas'][:8])}{', entre otras' if len(a['conductas']) > 8 else ''}"
        l += f". Escenario: {corto(a['resumen'])}"
    return l + f" ({a['url']})"


RECIENTE = '2023-01-01'
GENERAL = 20  # una alerta con 20 o más municipios de Antioquia es general (nacional o departamental): electoral, líderes, etc.
for a in alertas:
    a['general'] = len(a['dane']) >= GENERAL


def etiqueta_general(a):
    return f"{a['codigo']} ({a['tipo'].lower()}, {fecha(a['fecha'])}, {len(a['dane'])} municipios): {corto(a['resumen'], 160)}"


municipios = {}
for k, lst in por_muni.items():
    lst = sorted(lst, key=lambda a: a['fecha'], reverse=True)
    esp = [a for a in lst if not a['general']]
    gen = [a for a in lst if a['general']]
    ls = []
    if esp:
        rec = [a for a in esp if a['fecha'] >= RECIENTE]
        ls.append(f"{len(esp)} alerta(s) temprana(s) de la Defensoría desde 2017 sobre {dane[k]['nombre']} y su zona; la más reciente es del "
                  f"{fecha(esp[0]['fecha'])}" + (f"; {len(rec)} desde 2023." if rec else '; ninguna desde 2023.'))
        ls += [linea(a, detalle=a['fecha'] >= RECIENTE or a is esp[0]) for a in esp]
    else:
        ls.append(f"Ninguna alerta temprana específica de la Defensoría sobre {dane[k]['nombre']} desde 2017 (solo las generales).")
    if gen:
        ls.append(f"Además lo incluyen {len(gen)} alertas generales, de alcance nacional o departamental (sus grupos y conductas no son "
                  f"específicos de {dane[k]['nombre']}): " + ' | '.join(etiqueta_general(a) for a in gen) + '.')
    municipios[k] = {'lineas': ls}

txt = (ROOT / 'src/data/antioquia125MunicipalitiesMasterData.ts').read_text()
SUB = dict(re.findall(r'"daneCode":\s*"(\d{5})",[\s\S]*?"subregion":\s*"([^"]+)"', txt))


def resumen(alerts, miembros, nombre):
    alerts = sorted({a['id']: a for a in alerts}.values(), key=lambda a: a['fecha'], reverse=True)
    gen = [a for a in alerts if a['general']]
    alerts = [a for a in alerts if not a['general']]
    pie = ([f'Alertas generales (nacionales o departamentales) que incluyen municipios de {nombre}: ' + ' | '.join(etiqueta_general(a) for a in gen) + '.'] if gen else [])
    if not alerts:
        return [f'Ninguna alerta temprana específica de la Defensoría desde 2017 sobre municipios de {nombre}.'] + pie
    g = Counter(x for a in alerts for x in a['grupos'])
    c = Counter(x.lower() for a in alerts for x in a['conductas'])
    con = Counter(k for a in alerts for k in a['dane'] if k in miembros)
    rec = [a for a in alerts if a['fecha'] >= RECIENTE]
    out = [f'{len(alerts)} alertas tempranas específicas de la Defensoría desde 2017 sobre municipios de {nombre} ({len(rec)} desde 2023).',
           'Municipios con más alertas: ' + '; '.join(f"{dane[k]['nombre']} {n}" for k, n in con.most_common(10)) + '.']
    if g:
        out.append('Grupos armados más nombrados en esas alertas (afirmación de la Defensoría): ' + '; '.join(f'{x} ({n})' for x, n in g.most_common(8)) + '.')
    if c:
        out.append('Conductas más advertidas: ' + '; '.join(f'{x} ({n})' for x, n in c.most_common(8)) + '.')
    out += ['Reciente: ' + linea(a, detalle=False) for a in rec[:6]]
    return out + pie


subregiones = {}
for s in sorted(set(SUB.values())):
    miembros = {k for k, v in SUB.items() if v == s}
    subregiones[s] = {'lineas': resumen([a for a in alertas if set(a['dane']) & miembros], miembros, s)}

motor = {
    'meta': {
        'titulo': 'Alertas tempranas de la Defensoría del Pueblo (2017-2026)',
        'fuente': 'Defensoría del Pueblo, Sistema de Alertas Tempranas (alertastempranas.defensoria.gov.co)',
        'nivel': 'oficial',
        'categoria': 'seguridad',
        'corte': max(a['fecha'] for a in alertas),
        'nota': ('Alertas que incluyen el municipio, con su escenario de riesgo. Los grupos armados y las conductas son lo '
                 'que advierte la Defensoría (riesgo de violaciones de DD. HH.), no un conteo de hechos. Las fichas completas '
                 'están en el enlace de cada alerta'),
    },
    'municipios': municipios,
    'subregiones': subregiones,
    'departamento': {'lineas': resumen(alertas, set(dane), 'Antioquia')},
}
json.dump(motor, open(ROOT / 'src/data/motor/alertas-tempranas-defensoria.json', 'w'), ensure_ascii=False, indent=0)
print(len(municipios), 'municipios con alertas; corte', motor['meta']['corte'])
print(*motor['departamento']['lineas'][:4], sep='\n')
print(*municipios[POR_NOMBRE['caceres']]['lineas'][:2], sep='\n')

"""
Presidencia 2026 (1.ª vuelta 31-may y 2.ª vuelta 21-jun) por puesto, a partir del ESCRUTINIO mesa a
mesa (archivo MMV de la comisión escrutadora municipal, descargado con
scripts/descargar_presidencial_2026.py).

Salida: src/data/electoral/resultadosPuestoPresidencial2026/<municipio>.json con el mismo formato de
elecciones que resultadosPuesto2026 (claves = código de puesto del censo 2026: depto 2 + municipio 3 +
zona 2 + puesto 2).
- Votantes = total de votos de las mesas (candidatos + blanco + nulos + no marcados).
- Habilitados = censo electoral 2026 del puesto (src/data/electoral/puestos/antioquia.json); el MMV
  no trae habilitados.
- No se guardan cédulas (el MMV las trae: se descartan).
Uso: python3 scripts/build_presidencial_2026.py <lista.json>   (lista: [{slug, reg}])
"""
import csv, json, os, sys
from collections import defaultdict

BASE = '_originales/registraduria/presidencial2026'
SALIDA = 'src/data/electoral/resultadosPuestoPresidencial2026'
VUELTAS = {'v1': ('presidente-2026-1', 'Presidencia 2026 · 1.ª vuelta', '31-may-2026', 'escrutiniospresidente2026.registraduria.gov.co'),
           'v2': ('presidente-2026-2', 'Presidencia 2026 · 2.ª vuelta', '21-jun-2026', 'escrutinios2vueltapresidente2026.registraduria.gov.co')}
censo = defaultdict(dict)
for p in json.load(open('src/data/electoral/puestos/antioquia.json')):
    censo[p['codMunicipio']][p['codPuesto']] = p

def construir(ruta, reg):
    filas = list(csv.DictReader(open(ruta, encoding='utf-8-sig'), delimiter=';'))
    candidatos, cidx, partidos, pidx = [], {}, [], {}
    def pid(n):
        if n not in pidx: pidx[n] = len(partidos); partidos.append(n)
        return pidx[n]
    puestos, nombres, mesas = {}, {}, defaultdict(set)
    for f in filas:
        assert f['DEP'] + f['MUN'] == reg, (f['DEP'], f['MUN'], reg)
        cod = f['DEP'] + f['MUN'] + f['ZONA'] + f['PUESTO']
        nombres[cod] = f['PUESNOMBRE'].strip().title()
        mesas[cod].add(f['MESA'])
        p = puestos.setdefault(cod, {'votantes': 0, 'blanco': 0, 'nulos': 0, 'noMarcados': 0, 'c': defaultdict(int)})
        v, can = int(f['VOTOS']), f['CAN']
        p['votantes'] += v
        if can == '996': p['blanco'] += v
        elif can == '997': p['nulos'] += v
        elif can == '998': p['noMarcados'] += v
        else:
            k = (can, f['CANNOMBRE'].strip())
            if k not in cidx:
                cidx[k] = len(candidatos)
                candidatos.append({'n': f['CANNOMBRE'].strip().title(), 'p': pid(f['PARNOMBRE'].strip().title())})
            p['c'][cidx[k]] += v
    def fila(p, hab, nmesas):
        cs = sorted(p['c'].items(), key=lambda x: -x[1])
        par = defaultdict(int)
        for i, v in cs: par[candidatos[i]['p']] += v
        return {'habilitados': hab, 'mesas': nmesas, 'votantes': p['votantes'], 'blanco': p['blanco'], 'nulos': p['nulos'], 'noMarcados': p['noMarcados'],
                'candidatos': [[i, v] for i, v in cs if v], 'partidos': sorted(([k, v] for k, v in par.items() if v), key=lambda x: -x[1])}
    cen = censo[reg]
    out = {c: fila(p, cen.get(c, {}).get('total', 0), len(mesas[c])) for c, p in puestos.items()}
    tot = {'votantes': 0, 'blanco': 0, 'nulos': 0, 'noMarcados': 0, 'c': defaultdict(int)}
    for p in puestos.values():
        for k in ('votantes', 'blanco', 'nulos', 'noMarcados'): tot[k] += p[k]
        for i, v in p['c'].items(): tot['c'][i] += v
    municipio = fila(tot, sum(x['total'] for x in cen.values()), sum(len(m) for m in mesas.values()))
    sin_censo = [c for c in puestos if c not in cen]
    return {'partidos': partidos, 'candidatos': candidatos, 'municipio': municipio, 'puestos': out, 'nombres': nombres}, sin_censo

os.makedirs(SALIDA, exist_ok=True)
for m in json.load(open(sys.argv[1])):
    elecciones = {}
    for v, (id_, nombre, fecha, sitio) in VUELTAS.items():
        ruta = f"{BASE}/{v}/{m['slug']}.csv"
        if not os.path.exists(ruta): continue
        e, sin_censo = construir(ruta, m['reg'])
        e.update(nombre=nombre, fecha=fecha, fuente=f'Registraduría Nacional del Estado Civil, escrutinio mesa a mesa de la comisión municipal ({sitio})')
        elecciones[id_] = e
        s = sum(p['votantes'] for p in e['puestos'].values())
        print(m['slug'], v, len(e['puestos']), 'puestos', e['municipio']['mesas'], 'mesas; votantes', s, '; sin censo', sin_censo)
    out = {'meta': {'tipo': 'escrutinio',
                    'nota': 'Escrutinio oficial (comisión escrutadora municipal), sumado mesa a mesa. Habilitados = censo electoral 2026 del puesto.'},
           'elecciones': elecciones}
    json.dump(out, open(f"{SALIDA}/{m['slug']}.json", 'w'), ensure_ascii=False, separators=(',', ':'))

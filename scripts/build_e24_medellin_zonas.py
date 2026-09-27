#!/usr/bin/env python3
"""
Visor E-24 de Medellín: resultados REALES por zona electoral (01-32, 90, 98, 99) para Alcaldía,
Concejo, Gobernación y Asamblea de 2015, 2019 y 2023, y Presidencia 2022 (1.ª y 2.ª vuelta). Reemplaza el modelo anterior, que repartía
totales municipales entre zonas con pesos de censo y "afinidades" inventadas por zona.

Fuentes (las mismas de la app, por puesto; la zona es la del código del puesto ese año):
- 2015 y 2019: src/data/electoral/resultadosPuestoHistorico/<año>/medellin.json (escrutinio mesa a mesa)
- 2023: src/data/electoral/resultadosPuesto2023/medellin.json (preconteo)
En Concejo y Asamblea solo se guardan votos por partido (los archivos por puesto no traen todos los
candidatos de cada lista). En Alcaldía y Gobernación cada candidato es una "lista" con un candidato.
Uso: python3 scripts/build_e24_medellin_zonas.py
Salida: src/data/e24/medellinZonasReales.json
"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
E = ROOT / 'src/data/electoral'
out = {}


def zona(cod):
    return cod[5:7]


def agregar(clave, fuente, tipo, nombres_partidos, candidatos, puestos, uninominal):
    # "listas": en uninominal, cada candidato; si no, cada partido
    if uninominal:
        listas = [{'id': str(i), 'name': f"{c['n']} ({nombres_partidos[c['p']]})", 'shortName': c['n'], 'party': nombres_partidos[c['p']]} for i, c in enumerate(candidatos)]
    else:
        listas = [{'id': str(i), 'name': n, 'shortName': n, 'party': n} for i, n in enumerate(nombres_partidos)]
    zonas = {}
    for cod, f in puestos.items():
        z = zonas.setdefault(zona(cod), {'p': {}, 'b': 0, 'n': 0, 'm': 0, 'mesas': 0})
        z['b'] += f.get('blanco', 0); z['n'] += f.get('nulos', 0); z['m'] += f.get('noMarcados', 0); z['mesas'] += f.get('mesas', 0)
        for i, v in (f['candidatos'] if uninominal else f['partidos']):
            z['p'][str(i)] = z['p'].get(str(i), 0) + v
    usadas = {k for z in zonas.values() for k in z['p']}
    out[clave] = {'fuente': fuente, 'tipo': tipo, 'uninominal': uninominal, 'listas': [l for l in listas if l['id'] in usadas], 'zonas': zonas}


for anio in ('2015', '2019'):
    a = json.load(open(E / f'resultadosPuestoHistorico/{anio}/medellin.json'))
    for tipo in ('alcaldia', 'gobernacion', 'concejo', 'asamblea'):
        e = a['elecciones'][f'{tipo}-{anio}']
        agregar(f'{tipo}-{anio}', f'Registraduría, escrutinio mesa a mesa {e["fecha"]} (Observatorio, histórico de resultados)', 'escrutinio',
                e['partidos'], e['candidatos'], e['puestos'], e['porCandidato'])

a = json.load(open(E / 'resultadosPuestoHistorico/2022/medellin.json'))
for v in ('1', '2'):
    e = a['elecciones'][f'presidente-2022-{v}']
    agregar(f'presidente-2022-{v}', f'Registraduría, escrutinio mesa a mesa {e["fecha"]} (Observatorio, histórico de resultados)', 'escrutinio',
            e['partidos'], e['candidatos'], e['puestos'], True)

# Senado y Cámara 2022: directo del MMV (completo: votos solo por la lista y por cada candidato)
import csv, io, zipfile
H = ROOT / '_originales/registraduria/historico'
cong = {}
with zipfile.ZipFile(H / 'MMV_CONGRESO_2022_ANTIOQUIA.zip') as zf:
    nombre = next(n for n in zf.namelist() if n.endswith('.csv'))
    for x in csv.reader(io.TextIOWrapper(zf.open(nombre), encoding='utf-16')):
        if x[2] != '001' or x[0] != '01':
            continue
        clave = 'senado-2022' if (x[11], x[12]) == ('SENADO', '01') else 'camara-2022' if (x[11], x[12]) == ('CAMARA', '02') else None
        if not clave:
            continue
        C = cong.setdefault(clave, {'listas': {}, 'cand': {}, 'zonas': {}})
        z = C['zonas'].setdefault(x[4], {'p': {}, 'c': {}, 'po': {}, 'b': 0, 'n': 0, 'm': 0, 'mesas': set()})
        z['mesas'].add((x[5], x[7]))
        par, can, v = x[16], x[18], int(x[20] or 0)
        if int(can or 0) in (996, 997, 998) and int(par or 0) == 0:
            z[{996: 'b', 997: 'n', 998: 'm'}[int(can)]] += v
            continue
        pid = str(int(par)).zfill(4)  # mismo código de 4 dígitos que usa el resto del visor
        # El resto del visor (serie histórica de Senado) usa los códigos del E-24 transcrito para dos listas
        if clave == 'senado-2022':
            pid = {'0255': '0256', '0292': '0290'}.get(pid, pid)
        C['listas'].setdefault(pid, ' '.join(x[17].split()).title())
        z['p'][pid] = z['p'].get(pid, 0) + v
        if int(can) == 0:
            z['po'][pid] = z['po'].get(pid, 0) + v
        else:
            cid = f'{pid}-{int(can)}'
            C['cand'].setdefault(cid, (pid, ' '.join(x[19].split()).title()))
            z['c'][cid] = z['c'].get(cid, 0) + v
for clave, C in cong.items():
    for z in C['zonas'].values():
        z['mesas'] = len(z['mesas'])
    out[clave] = {'fuente': 'Registraduría, escrutinio mesa a mesa 13-mar-2022 (Observatorio, histórico de resultados)', 'tipo': 'escrutinio', 'uninominal': False,
                  'listas': [{'id': k, 'name': n, 'shortName': n, 'party': n} for k, n in C['listas'].items()],
                  'candidatos': [{'id': k, 'partyId': p_, 'name': n} for k, (p_, n) in C['cand'].items()],
                  'zonas': C['zonas']}

a = json.load(open(E / 'resultadosPuesto2023/medellin.json'))
for tipo, k, un in (('alcaldia', 'alcaldia', True), ('concejo', 'concejo', False), ('gobernacion', 'gobernacion', True), ('asamblea', 'asamblea', False)):
    puestos = {c: p[k] for c, p in a['puestos'].items() if k in p}
    agregar(f'{tipo}-2023', 'Registraduría, preconteo 29-oct-2023', 'preconteo', a['partidos'], a['candidatos'], puestos, un)

json.dump(out, open(ROOT / 'src/data/e24/medellinZonasReales.json', 'w'), ensure_ascii=False, separators=(',', ':'))
for k, v in out.items():
    tot = sum(sum(z['p'].values()) + z['b'] + z['n'] + z['m'] for z in v['zonas'].values())
    print(k, len(v['listas']), 'listas', len(v['zonas']), 'zonas', tot, 'votos')

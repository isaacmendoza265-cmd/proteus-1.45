#!/usr/bin/env python3
"""
Concejo y Asamblea 2023 por candidato y por puesto: escrutinio mesa a mesa (MMV) de la Registraduría.

Fuente: Registraduría Nacional del Estado Civil, Observatorio, "Histórico de resultados electorales"
(observatorio.registraduria.gov.co/views/electoral/historicos-resultados.php), archivo de votación mesa a
mesa del escrutinio de las elecciones territoriales del 29-oct-2023, Antioquia:
  _originales/registraduria/historico/comprimidos/MMV_TERRITORIALES2023_ANTIOQUIA.zip
  (MMV_2023_01_ANTIOQUIA.csv, 449 MB; trae Gobernación, Asamblea, Alcaldía, Concejo y JAL)

Por qué existe: el preconteo 2023 por puesto (resultadosPuesto2023/) trae el Concejo y la Asamblea solo
por partido. Este archivo agrega, para los municipios pedidos, el voto por candidato de cada puesto,
sumando sus mesas, con la lista COMPLETA de candidatos en cada puesto (sin el recorte del 97 % de la
serie histórica), para que las sumas por comuna o barrio sean exactas.

Reglas:
- No se guardan cédulas (el MMV no las trae). JAL no se incluye.
- Código de puesto = el del preconteo 2023 (depto 2 + municipio 3 + zona 2 + comuna 2 + puesto 2), así
  que cada puesto toma el nombre y la ubicación (Divipole 2023) que ya tiene resultadosPuesto2023/.
- Votantes = votos de la corporación en sus mesas (candidatos + listas + blanco + nulos + no marcados).
- Habilitados: el MMV no los trae; se toman del preconteo del mismo puesto (Alcaldía 2023, mismas mesas).
- Candidato 0 = voto solo por la lista (cuenta en la lista, no en un candidato).

Uso:
  python3 scripts/build_resultados_2023_mmv.py            # los 10 municipios del Valle de Aburrá
  python3 scripts/build_resultados_2023_mmv.py --todos    # los 125 de Antioquia
Salida: src/data/electoral/resultadosPuesto2023Escrutinio/<slug>.json (formato de resultadosPuestoHistorico)
"""
import collections, csv, io, json, sys, zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ZIP = ROOT / '_originales/registraduria/historico/comprimidos/MMV_TERRITORIALES2023_ANTIOQUIA.zip'
PRE = ROOT / 'src/data/electoral/resultadosPuesto2023'
OUT = ROOT / 'src/data/electoral/resultadosPuesto2023Escrutinio'
FUENTE = ('Registraduría Nacional del Estado Civil, Observatorio: histórico de resultados, votación mesa a mesa '
          'del escrutinio (MMV) de las elecciones territoriales del 29-oct-2023')
# Valle de Aburrá (DANE): Medellín, Barbosa, Bello, Caldas, Copacabana, Envigado, Girardota, Itagüí, La Estrella, Sabaneta
AMVA = {'05001', '05079', '05088', '05129', '05212', '05266', '05308', '05360', '05380', '05631'}
ELECCIONES = {'CONCEJO': ('concejo-2023', 'Concejo 2023'), 'ASAMBLEA': ('asamblea-2023', 'Asamblea 2023')}
ESPECIAL = {996: 'blanco', 997: 'nulos', 998: 'noMarcados'}


def titulo(s):
    return ' '.join(str(s or '').split()).title()


def nuevo_puesto():
    return {'votantes': 0, 'blanco': 0, 'nulos': 0, 'noMarcados': 0, 'mesas': set(),
            'par': collections.Counter(), 'can': collections.Counter()}


def main(todos):
    censo = json.load(open(ROOT / 'src/data/electoral/censoElectoral2026.json'))['municipios']
    dane_de = {m['codigoRegistraduria']: m['dane'] for m in censo if m['departamento'] == 'antioquia'}
    indice = json.load(open(ROOT / 'src/data/electoral/resultadosPuesto/indice.json'))
    pedidos = {reg for reg, d in dane_de.items() if todos or d in AMVA}

    acc = collections.defaultdict(lambda: {e: {'partidos': {}, 'candidatos': {}, 'puestos': collections.defaultdict(nuevo_puesto)}
                                           for e, _ in ELECCIONES.values()})
    nombres_mmv = collections.defaultdict(dict)
    with zipfile.ZipFile(ZIP) as z:
        r = csv.reader(io.TextIOWrapper(z.open('MMV_2023_01_ANTIOQUIA.csv'), encoding='utf-8'))
        next(r)
        for x in r:
            corp = ELECCIONES.get(x[11])
            reg = x[0] + x[2]
            if not corp or reg not in pedidos:
                continue
            cod = reg + x[4] + x[8] + x[5]  # zona + comuna + puesto, como el preconteo
            nombres_mmv[reg][cod] = x[6]
            E = acc[reg][corp[0]]
            P = E['puestos'][cod]
            votos = int(x[17] or 0)
            P['votantes'] += votos
            P['mesas'].add(x[7])
            par, can = int(x[13] or 0), int(x[15] or 0)
            if par == 0 and can in ESPECIAL:
                P[ESPECIAL[can]] += votos
                continue
            E['partidos'].setdefault(par, titulo(x[14]))
            P['par'][par] += votos
            if can:
                E['candidatos'].setdefault((par, can), titulo(x[16]))
                P['can'][(par, can)] += votos

    OUT.mkdir(parents=True, exist_ok=True)
    for reg, elecciones in sorted(acc.items()):
        dane = dane_de[reg]
        slug = indice[dane]['2023']
        pre = json.load(open(PRE / f'{slug}.json'))
        hab = {c: p['alcaldia']['habilitados'] for c, p in pre['puestos'].items()}
        todos_cod = set().union(*[E['puestos'].keys() for E in elecciones.values()])
        sin_pre = sorted(todos_cod - set(pre['puestos']))
        nombres = {c: (pre['puestos'][c]['n'] if c in pre['puestos'] else titulo(nombres_mmv[reg][c])) for c in sorted(todos_cod)}
        ubic = {c: {'lat': u['lat'], 'lon': u['lon']} for c in sorted(todos_cod)
                if c in pre['puestos'] and (u := pre['puestos'][c].get('ubicacion'))}
        out_e = {}
        for e, nombre in ELECCIONES.values():
            E = elecciones[e]
            pidx = {k: i for i, k in enumerate(E['partidos'])}
            cidx = {k: i for i, k in enumerate(E['candidatos'])}

            def fila(P, habilitados):
                return {'habilitados': habilitados, 'mesas': len(P['mesas']), 'votantes': P['votantes'], 'blanco': P['blanco'],
                        'nulos': P['nulos'], 'noMarcados': P['noMarcados'],
                        'partidos': sorted(([pidx[k], v] for k, v in P['par'].items() if v), key=lambda t: -t[1]),
                        'candidatos': sorted(([cidx[k], v] for k, v in P['can'].items() if v), key=lambda t: -t[1])}
            tot = nuevo_puesto()
            for P in E['puestos'].values():
                for k in ('votantes', 'blanco', 'nulos', 'noMarcados'):
                    tot[k] += P[k]
                tot['par'].update(P['par']); tot['can'].update(P['can'])
            mun = fila(tot, pre['municipio']['alcaldia']['habilitados'])
            mun['mesas'] = sum(len(P['mesas']) for P in E['puestos'].values())
            out_e[e] = {
                'nombre': nombre, 'fecha': '29-oct-2023', 'porCandidato': False,
                'partidos': list(E['partidos'].values()),
                'candidatos': [{'n': n, 'p': pidx[k[0]]} for k, n in E['candidatos'].items()],
                'municipio': mun,
                'puestos': {c: fila(P, hab.get(c, 0)) for c, P in sorted(E['puestos'].items())},
            }
        json.dump({
            'meta': {'fuente': FUENTE, 'tipo': 'escrutinio', 'codigos': '2023', 'candidatosCompletos': True,
                     'nota': 'Escrutinio mesa a mesa sumado por puesto, con todos los candidatos en cada puesto. Códigos, nombres y '
                             'ubicaciones de puesto: los del preconteo 2023 (Divipole 2023). Habilitados: los del preconteo del mismo puesto.'},
            'nombres': nombres,
            'ubicaciones': ubic,
            'elecciones': out_e,
        }, open(OUT / f'{slug}.json', 'w'), ensure_ascii=False, separators=(',', ':'))
        tam = (OUT / f'{slug}.json').stat().st_size
        print(f"{slug}: {len(todos_cod)} puestos ({len(sin_pre)} sin cruce con el preconteo {sin_pre[:3]}), "
              f"concejo {out_e['concejo-2023']['municipio']['votantes']} votos, asamblea {out_e['asamblea-2023']['municipio']['votantes']}, {tam // 1024} KB")


if __name__ == '__main__':
    main('--todos' in sys.argv)

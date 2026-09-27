#!/usr/bin/env python3
"""
Puestos de votación (censo 2026 por puesto + coordenadas de la Divipole 2023) de los 79 municipios
de Antioquia con 20.000 votantes o menos (fase C).

Usa exactamente el mismo cruce por nombre que scripts/build_puestos_20k.py (mismas fuentes: censo
electoral por puesto y Divipole 2023 georreferenciada), reutilizando sus funciones. Se guarda en un
archivo APARTE (src/data/electoral/puestos/antioquia_fase_c.json), sin tocar build_puestos_20k.py
ni su salida (resumen.json / MUNICIPIOS_20K): ese archivo sigue significando "más de 20.000 votantes
en todo el país" en el resto de la app. Con este archivo, Antioquia queda con sus 125 municipios con
puesto + coordenadas, sin cambiar el criterio nacional ni afectar a ningún otro departamento.

La app (pollingStationsService) todavía no consume este archivo: hoy solo sirve para adjuntar
coordenadas a los resultados 2026 (Congreso, Cámara, Presidencia) de estos 79 municipios, igual que
build_resultados_puesto_2023.py hace por su cuenta para 2023. Conectarlo al mapa (marcadores de
puesto, agregación por comuna/barrio) es un paso de UI aparte, no incluido aquí.

Uso: python3 scripts/build_puestos_fase_c_antioquia.py
Salida: src/data/electoral/puestos/antioquia_fase_c.json
"""
import collections
import csv
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from build_puestos_20k import ROOT, CENSO, DIVIPOLE, CENSO_JSON, norm, cruzar, coordenadas  # noqa: E402

OUT = ROOT / 'src/data/electoral/puestos/antioquia_fase_c.json'
UMBRAL = 20_000


def main():
    censo = [r for r in csv.DictReader(CENSO.open(encoding='utf-8-sig')) if r['pais'] == 'COLOMBIA']
    divipole = list(csv.DictReader(DIVIPOLE.open(encoding='utf-8')))
    oficial = json.loads(CENSO_JSON.read_text(encoding='utf-8'))
    info = {m['codigoRegistraduria']: m for m in oficial['municipios']}

    por_mun = collections.defaultdict(list)
    for r in censo:
        por_mun[r['cod_puesto'][:5]].append(r)
    divi_mun = collections.defaultdict(list)
    for d in divipole:
        divi_mun[(norm(d['departamento']), norm(d['municipio']))].append(d)

    municipios, puestos, stats = [], [], collections.Counter()
    for cod in sorted(por_mun):
        m = info.get(cod)
        if not m or m['departamento'].lower() != 'antioquia' or m['total'] > UMBRAL:
            continue
        filas = por_mun[cod]
        divi = divi_mun.get((norm(filas[0]['departamento']), norm(filas[0]['municipio'])), [])
        if not divi:
            raise SystemExit(f"Municipio sin Divipole: {m['nombre']}")
        cruce = cruzar(filas, divi)
        con_coord = 0
        for c in sorted(filas, key=lambda r: r['cod_puesto']):
            x = cruce.get(c['cod_puesto'])
            d = divi[x[0]] if x else None
            stats[x[1] if x else 'sin_divipole'] += 1
            con_coord += bool(d and d.get('latitud') and coordenadas(d)['lat'] is not None)
            puestos.append({
                'codMunicipio': cod,
                'codPuesto': c['cod_puesto'],
                'zona': c['cod_puesto'][5:7],
                'puesto': c['puesto'].strip(),
                'mujeres': int(c['mujeres']), 'hombres': int(c['hombres']),
                'total': int(c['total']), 'mesas': int(c['mesas']),
                'divipole2023': None if not d else {
                    'puesto': d['puesto'].strip(),
                    'direccion': d['direccion'].strip() or None,
                    **coordenadas(d),
                    'cruce': x[1], 'similitud': x[2],
                },
            })
        municipios.append({
            'codMunicipio': cod, 'departamento': m['departamento'], 'municipio': m['nombre'],
            'dane': m['dane'], 'censo': m['total'], 'mesas': m['mesas'], 'puestos': len(filas),
            'puestosConCoordenadas': con_coord,
        })

    dump = lambda obj: json.dumps(obj, ensure_ascii=False, separators=(',', ':')) + '\n'
    OUT.write_text(dump({
        'meta': {
            'criterio': 'Municipios de Antioquia con censo electoral <= 20.000 (fase C), aparte del '
                        'umbral nacional de scripts/build_puestos_20k.py (> 20.000 en todo el país).',
            'fuentes': [
                'Registraduría, censo electoral por puesto, corte 30-abr-2026',
                'Registraduría, Divipole Elecciones Territoriales 2023 con georreferenciación (datos.gov.co mv2e-prx5)',
            ],
            'nota': 'Mismo cruce por nombre que build_puestos_20k.py. Los puestos sin divipole2023 no '
                    'se pudieron cruzar (en su mayoría, creados después de 2023).',
            'cruce': dict(stats),
        },
        'municipios': municipios, 'puestos': puestos,
    }), encoding='utf-8')
    print(f'OK {OUT.relative_to(ROOT)}: {len(municipios)} municipios, {len(puestos)} puestos, cruce {dict(stats)}')


if __name__ == '__main__':
    main()

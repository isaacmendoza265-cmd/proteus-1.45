#!/usr/bin/env python3
"""
Serie del censo electoral (habilitados) por municipio de Antioquia: 2018, 2019, 2022, 2023 y 2026.

Fuente: Registraduría Nacional del Estado Civil, "Consulta Histórico de Resultados Electorales"
(https://estadisticaselectorales.registraduria.gov.co, enlazada desde el Observatorio). Es el censo de CADA jornada:
lo que la página muestra como "Censo electoral" (con hombres, mujeres y mesas). Crudos y extractor en
_originales/censo_electoral/ (municipios_raw.json, FUENTE.md). 2026: censoElectoral2026.json (corte 30-abr-2026).

Por qué: los archivos mesa a mesa (MMV) de 2015-2022 no traen habilitados, así que la app no podía calcular la
participación de esos años. Con el censo de la misma jornada, la participación municipal es comparable entre años.
2015 no está en la fuente (queda sin censo). Congreso y Presidencia del mismo año tienen censos distintos: cada
elección usa el de su jornada; la 2.ª vuelta presidencial no está en la fuente y queda sin censo.

Uso: python3 scripts/build_censo_historico.py
Salida: src/data/electoral/censoHistorico.json
"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
RAW = ROOT / '_originales/censo_electoral/municipios_raw.json'
# jornada de la fuente -> elecciones de Proteus que la comparten
JORNADAS = {
    'presidente-1v-2018': ['presidente-2018-1'],
    'alcaldia-2019': ['gobernacion-2019', 'asamblea-2019', 'alcaldia-2019', 'concejo-2019'],
    'senado-2022': ['senado-2022', 'camara-2022'],
    'presidente-1v-2022': ['presidente-2022-1'],
    'alcaldia-2023': ['alcaldia-2023', 'concejo-2023', 'gobernacion-2023', 'asamblea-2023'],
}
ETIQUETA = {'presidente-1v-2018': 'Presidencia 2018 (1.ª v.)', 'alcaldia-2019': 'Territoriales 2019', 'senado-2022': 'Congreso 2022',
            'presidente-1v-2022': 'Presidencia 2022 (1.ª v.)', 'alcaldia-2023': 'Territoriales 2023'}


def main():
    raw = json.load(open(RAW))
    censo26 = json.load(open(ROOT / 'src/data/electoral/censoElectoral2026.json'))['municipios']
    dane_de = {m['codigoRegistraduria']: m['dane'] for m in censo26 if m['departamento'] == 'antioquia'}
    out = {}
    for jornada in JORNADAS:
        for idm, v in raw[jornada].items():
            if idm.startswith('_') or not v.get('censo'):
                continue
            dane = dane_de['01' + idm[1:].zfill(3)]
            out.setdefault(dane, {})[jornada] = {'censo': v['censo'], 'mujeres': v['mujeres'], 'hombres': v['hombres'], 'mesas': v.get('mesas')}
    for m in censo26:
        if m['departamento'] == 'antioquia':
            out.setdefault(m['dane'], {})['censo-2026'] = {'censo': m['total'], 'mujeres': m.get('mujeres'), 'hombres': m.get('hombres'), 'mesas': m.get('mesas')}
    assert len(out) == 125 and all(len(v) == 6 for v in out.values()), {k: len(v) for k, v in out.items() if len(v) != 6}
    json.dump({
        'meta': {
            'fuente': 'Registraduría Nacional del Estado Civil, Consulta Histórico de Resultados Electorales (estadisticaselectorales.registraduria.gov.co), censo de cada jornada; 2026: censo electoral con corte al 30-abr-2026',
            'extraido': '2026-10-01',
            'jornadas': {**ETIQUETA, 'censo-2026': 'Censo 2026 (corte 30-abr)'},
            'elecciones': JORNADAS,
            'nota': '2015 y la 2.ª vuelta presidencial no están en la fuente. Congreso y Presidencia del mismo año tienen censos distintos.',
        },
        'municipios': dict(sorted(out.items())),
    }, open(ROOT / 'src/data/electoral/censoHistorico.json', 'w'), ensure_ascii=False, separators=(',', ':'))
    print(len(out), 'municipios; Antioquia', {j: sum(v[j]['censo'] for v in out.values()) for j in [*JORNADAS, 'censo-2026']})


if __name__ == '__main__':
    main()

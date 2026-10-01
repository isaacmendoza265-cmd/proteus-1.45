#!/usr/bin/env python3
"""
Censo electoral (habilitados) por PUESTO para las elecciones mesa a mesa 2018-2022, municipio por municipio.

Fuente: Registraduría Nacional del Estado Civil, "Consulta Histórico de Resultados Electorales"
(https://estadisticaselectorales.registraduria.gov.co): el "Censo electoral" que la página muestra para cada puesto
y jornada. El sitio no tiene descarga; se lee con las mismas peticiones que usa la página (getMaps por puesto).
Crudos: _originales/censo_electoral/puestos/<idMunicipio>.json (un archivo por municipio; extractor y notas en
_originales/censo_electoral/FUENTE.md; extractores extraer_censo_puestos.py y rellenar_censo_puestos.py). Hoy: los 10
municipios del Valle de Aburrá (y Abejorral, de la prueba). Para extenderlo, correr los extractores por municipio.

Códigos: la fuente usa municipio(5) + comuna(2) + zona(2) + puesto(2), con los códigos de ESA elección.
  - 2018, 2019 y 2022 (resultadosPuestoHistorico): municipio + zona + puesto (se quita la comuna).
  - 2023 (resultadosPuesto2023): municipio + zona + comuna + puesto. Ya trae habilitados; se usa para VALIDAR el cruce
    (deben coincidir puesto a puesto) y no se escribe.
Jornadas: Presidencia 2018 1.ª v., Territoriales 2019 (las 4 elecciones), Congreso 2022 (Senado y Cámara),
Presidencia 2022 1.ª v. La 2.ª vuelta y 2015 no están en la fuente.
Un puesto sin censo en la fuente queda sin él (la app no calcula participación en un territorio si le falta algún puesto).

Uso: python3 scripts/build_censo_puesto_historico.py
Salida: src/data/electoral/censoPuestoHistorico/<slug>.json  {meta, jornadas: {jornada: {codigo: habilitados}}}
"""
import glob, json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CRUDOS = ROOT / '_originales/censo_electoral/puestos'
OUT = ROOT / 'src/data/electoral/censoPuestoHistorico'
JORNADAS = {  # jornada de la fuente -> (año del archivo histórico, elección con la que se valida el cruce)
    'presidente-1v-2018': ('2018', 'presidente-2018-1'),
    'alcaldia-2019': ('2019', 'alcaldia-2019'),
    'senado-2022': ('2022', 'senado-2022'),
    'presidente-1v-2022': ('2022', 'presidente-2022-1'),
}


def main():
    censo26 = json.load(open(ROOT / 'src/data/electoral/censoElectoral2026.json'))['municipios']
    dane_de = {m['codigoRegistraduria']: m['dane'] for m in censo26 if m['departamento'] == 'antioquia'}
    indice = json.load(open(ROOT / 'src/data/electoral/resultadosPuesto/indice.json'))
    OUT.mkdir(parents=True, exist_ok=True)
    for f in sorted(glob.glob(str(CRUDOS / '*.json'))):
        raw = json.load(open(f))
        reg = '01' + str(raw['municipio']['id'])[1:].zfill(3)
        slug = indice[dane_de[reg]]['2023']
        ps = raw['puestos']
        # Validación con 2023: el preconteo trae habilitados por puesto con otro orden de códigos
        pre = json.load(open(ROOT / f'src/data/electoral/resultadosPuesto2023/{slug}.json'))['puestos']
        v23 = {k[:5] + k[7:9] + k[5:7] + k[9:]: v['alcaldia-2023']['censo'] for k, v in ps.items() if 'alcaldia-2023' in v}
        cruce = [k for k in v23 if k in pre]
        iguales = sum(1 for k in cruce if pre[k]['alcaldia']['habilitados'] == v23[k])
        assert not cruce or iguales >= 0.95 * len(cruce), (slug, iguales, len(cruce))
        out, resumen = {}, []
        for jornada, (anio, eleccion) in JORNADAS.items():
            m = {k[:5] + k[7:]: v[jornada]['censo'] for k, v in ps.items() if jornada in v and v[jornada].get('censo')}
            try:
                hist = json.load(open(ROOT / f'src/data/electoral/resultadosPuestoHistorico/{anio}/{slug}.json'))['elecciones'][eleccion]['puestos']
            except (FileNotFoundError, KeyError):
                continue
            m = {k: c for k, c in sorted(m.items()) if k in hist}
            out[jornada] = m
            resumen.append(f'{jornada} {len(m)}/{len(hist)}')
        json.dump({'meta': {
            'fuente': 'Registraduría Nacional del Estado Civil, Consulta Histórico de Resultados Electorales (estadisticaselectorales.registraduria.gov.co), censo electoral por puesto de cada jornada',
            'extraido': '2026-10-01',
            'validacion2023': f'{iguales} de {len(cruce)} puestos con los mismos habilitados que el preconteo 2023',
        }, 'jornadas': out}, open(OUT / f'{slug}.json', 'w'), ensure_ascii=False, separators=(',', ':'))
        print(slug, f'2023 {iguales}/{len(cruce)} iguales;', '; '.join(resumen))


if __name__ == '__main__':
    main()

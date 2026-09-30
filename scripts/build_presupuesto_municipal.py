#!/usr/bin/env python3
"""
Genera src/data/municipal/presupuestoMunicipal.json: presupuesto de gastos de la alcaldía (administración
central del municipio) de los 125 municipios de Antioquia, programado y ejecutado.

Fuente: Contraloría General de la República, CUIPO (Categoría Única de Información del Presupuesto
Ordinario), publicado en datos abiertos (Socrata, datos.gov.co):
  - "OVCF - CUIPO - Programación de Gastos" (d9mu-h6ar): apropiación inicial y definitiva.
  - "OVCF - CUIPO - Ejecución de Gastos"   (4f7r-epif): compromisos, obligaciones y pagos.
Lote aprobado por el equipo el 29-sep-2026 (4 consultas agregadas, < 1 MB en total).

Qué se suma (por municipio):
  - Entidad: código CUIPO de 9 dígitos que empieza por "21" (entidad territorial) y cuyos 5 últimos dígitos
    son el código DANE del municipio (p. ej. 210105001 = Medellín). Los códigos de 8 dígitos son
    corporaciones autónomas y se excluyen. No incluye descentralizados (EPM, empresas, institutos).
  - Cuenta "2" (GASTOS, el total), vigencia del gasto "1" (VIGENCIA ACTUAL), todas las secciones
    presupuestales (administración central, concejo, personería, contraloría, salud, educación).
    No se suman reservas, cuentas por pagar ni vigencias futuras.
  - Periodos: 2025 cierre (20251201) y 2026 al último corte publicado (se toma el más reciente).

Crudos: _originales/contraloria/cuipo/<dataset>_<periodo>.json (respuestas tal cual de la API).

Uso: python scripts/build_presupuesto_municipal.py [--descargar]
  --descargar: vuelve a consultar la API (si no, usa los crudos ya guardados).
"""
from __future__ import annotations

import json
import sys
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
RAW = ROOT / '_originales' / 'contraloria' / 'cuipo'
INDICE = ROOT / 'src' / 'data' / 'electoral' / 'resultadosPuesto' / 'indice.json'
DANE = ROOT / 'src' / 'data' / 'dane' / 'antioquiaDane.json'
OUT = ROOT / 'src' / 'data' / 'municipal' / 'presupuestoMunicipal.json'
API = 'https://www.datos.gov.co/resource/{}.json'
PROG, EJEC = 'd9mu-h6ar', '4f7r-epif'
CAMPOS = {PROG: 'sum(apropiacion_inicial) AS inicial, sum(apropiacion_definitiva) AS definitivo',
          EJEC: 'sum(compromisos) AS compromisos, sum(obligaciones) AS obligaciones, sum(pagos) AS pagos'}


def consultar(dataset: str, soql: str) -> list[dict]:
    url = API.format(dataset) + '?' + urllib.parse.urlencode({'$query': soql})
    req = urllib.request.Request(url, headers={'User-Agent': 'Proteus/1.0 (datos abiertos)'})
    with urllib.request.urlopen(req, timeout=180) as r:
        return json.loads(r.read().decode('utf-8'))


def ultimo_periodo(anio: int) -> str:
    filas = consultar(PROG, f'SELECT periodo WHERE starts_with(periodo, "{anio}") GROUP BY periodo ORDER BY periodo DESC LIMIT 1')
    return filas[0]['periodo']


def crudo(dataset: str, periodo: str, descargar: bool) -> list[dict]:
    f = RAW / f'{dataset}_{periodo}.json'
    if descargar or not f.exists():
        soql = (f'SELECT codigo_entidad, nombre_entidad, {CAMPOS[dataset]} '
                f'WHERE periodo="{periodo}" AND cuenta="2" AND cod_vigencia_del_gasto="1" '
                f'AND starts_with(codigo_entidad, "21") GROUP BY codigo_entidad, nombre_entidad LIMIT 50000')
        RAW.mkdir(parents=True, exist_ok=True)
        f.write_text(json.dumps(consultar(dataset, soql), ensure_ascii=False, indent=1), encoding='utf-8')
    return json.loads(f.read_text(encoding='utf-8'))


def por_municipio(filas: list[dict], danes: set[str]) -> dict[str, dict]:
    out: dict[str, dict] = {}
    for x in filas:
        cod = x['codigo_entidad']
        if len(cod) != 9 or cod[-5:] not in danes:
            continue
        if cod[-5:] in out:
            raise SystemExit(f'Dos entidades CUIPO para el mismo municipio: {cod} y {out[cod[-5:]]["codigo"]}')
        out[cod[-5:]] = {'codigo': cod, 'nombre': x['nombre_entidad'],
                         **{k: round(float(v)) for k, v in x.items() if k not in ('codigo_entidad', 'nombre_entidad')}}
    return out


def main() -> None:
    descargar = '--descargar' in sys.argv
    indice = json.loads(INDICE.read_text(encoding='utf-8'))
    danes = {k for k in indice if k.startswith('05')}
    poblacion = {k: v['poblacion'] for k, v in json.loads(DANE.read_text(encoding='utf-8'))['municipios'].items()}
    marcador = RAW / 'periodos.json'
    if descargar or not marcador.exists():
        periodos = {'2025': '20251201', '2026': ultimo_periodo(2026)}
        RAW.mkdir(parents=True, exist_ok=True)
        marcador.write_text(json.dumps(periodos), encoding='utf-8')
    periodos = json.loads(marcador.read_text(encoding='utf-8'))

    municipios: dict[str, dict] = {d: {} for d in sorted(danes)}
    for anio, periodo in periodos.items():
        prog = por_municipio(crudo(PROG, periodo, descargar), danes)
        ejec = por_municipio(crudo(EJEC, periodo, descargar), danes)
        faltan = danes - set(prog)
        if faltan:
            raise SystemExit(f'{anio}: municipios sin programación en CUIPO: {sorted(faltan)}')
        for d in danes:
            p, e = prog[d], ejec.get(d, {})
            if p['definitivo'] <= 0:
                raise SystemExit(f'{anio}: presupuesto definitivo no positivo en {d}')
            municipios[d][anio] = {
                'corte': periodo,
                'inicial': p['inicial'], 'definitivo': p['definitivo'],
                'compromisos': e.get('compromisos'), 'pagos': e.get('pagos'),
                'porHabitante': round(p['definitivo'] / poblacion[d]),
            }
            # Tal como lo reporta el municipio; si no cuadra, se avisa (no se corrige)
            if e.get('compromisos') and e['compromisos'] > p['definitivo']:
                municipios[d][anio]['alerta'] = ('Los compromisos reportados superan el presupuesto definitivo: '
                                                 'dato del reporte CUIPO del municipio, sin corregir.')
            municipios[d]['entidad'] = p['nombre']
    out = {
        'meta': {
            'fuente': 'Contraloría General de la República, CUIPO (datos.gov.co: Programación de Gastos d9mu-h6ar y '
                      'Ejecución de Gastos 4f7r-epif)',
            'que': 'Presupuesto de gastos de la alcaldía (administración central, con concejo, personería, contraloría, '
                   'salud y educación), vigencia actual. Sin descentralizados, reservas, cuentas por pagar ni vigencias futuras.',
            'porHabitante': 'Presupuesto definitivo / población DANE 2026 (proyección 2018-2042, actualización jul-2025).',
            'periodos': periodos,
            'nota2026': f'2026 va al corte {periodos["2026"]}: la ejecución es parcial del año.',
        },
        'municipios': municipios,
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(out, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
    med = municipios['05001']['2025']['definitivo']
    print(f'{len(municipios)} municipios -> {OUT.relative_to(ROOT)}; periodos {periodos}; Medellín 2025: {med / 1e12:.2f} billones')


if __name__ == '__main__':
    main()

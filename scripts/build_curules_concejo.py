#!/usr/bin/env python3
"""
Genera src/data/municipal/curulesConcejo.json: número de curules (concejales) a proveer en cada concejo
municipal de Antioquia, por elección.

Fuente 2023: Registraduría Nacional del Estado Civil, "Elecciones territoriales 2023 - Curules para concejo
municipal" (https://www.registraduria.gov.co/IMG/pdf/20230719_curules-concejo.pdf, 19-jul-2023).
Crudo: _originales/registraduria/20230719_curules-concejo.pdf (bajado desde un navegador: el sitio pide
verificación de Cloudflare y no deja descargar desde scripts). Se lee con `pdftotext -layout` (poppler).

Norma: Ley 136 de 1994, art. 22: el número de concejales depende de la población (7 hasta 5.000 habitantes,
9, 11, 13, 15, 17, 19 y 21 para más de 1.000.000); la Registraduría lo fija con la población que certifica
el DANE para la elección. No depende de la categoría del municipio.

Controles (el script falla si alguno no se cumple):
  - las filas de ANTIOQUIA se cruzan con los 125 municipios (src/data/electoral/resultadosPuesto/indice.json);
  - cada número es uno de los de la Ley 136 (7, 9, ..., 21);
  - frente al escrutinio 2023 que ya tiene Proteus (curules repartidas a listas, resultados2023Antioquia.json),
    la cifra de la Registraduría es igual o una más (lo habitual: la del Estatuto de la Oposición, Ley 1909
    de 2018, art. 25);
    Pueblorrico, sin concejo publicado, se exceptúa.

Uso: python scripts/build_curules_concejo.py
"""
from __future__ import annotations

import json
import re
import subprocess
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PDF_2023 = ROOT / '_originales' / 'registraduria' / '20230719_curules-concejo.pdf'
INDICE = ROOT / 'src' / 'data' / 'electoral' / 'resultadosPuesto' / 'indice.json'
ESCRUTINIO_2023 = ROOT / 'src' / 'data' / 'electoral' / 'resultados2023Antioquia.json'
OUT = ROOT / 'src' / 'data' / 'municipal' / 'curulesConcejo.json'

LEY_136 = {7, 9, 11, 13, 15, 17, 19, 21}
# Nombres de la Registraduría que no coinciden con el índice de Proteus
ALIAS = {
    'puerto nare la magdalena': 'puerto nare',
    'don matias': 'donmatias',
    'yondo casabe': 'yondo',
    'san andres': 'san andres de cuerquia',
    'san vicente': 'san vicente ferrer',
    'el carmen de viboral': 'carmen de viboral',
    'santa fe de antioquia': 'antioquia',
}


def norm(s: str) -> str:
    s = unicodedata.normalize('NFD', str(s).lower())
    s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    return ' '.join(re.sub(r'[^a-z0-9 ]', ' ', s).split())


def leer_pdf(pdf: Path) -> list[tuple[str, int]]:
    if not pdf.exists():
        raise SystemExit(f'Falta el crudo {pdf.relative_to(ROOT)} (bajarlo desde el navegador, ver docstring)')
    texto = subprocess.run(['pdftotext', '-layout', str(pdf), '-'], check=True, capture_output=True, text=True).stdout
    filas = []
    for linea in texto.splitlines():
        m = re.match(r'^\s*ANTIOQUIA\s+(.+?)\s+(\d{1,2})\s*$', linea)
        if m:
            filas.append((m.group(1).strip(), int(m.group(2))))
    return filas


def main() -> None:
    indice = json.loads(INDICE.read_text(encoding='utf-8'))
    por_nombre = {norm(v['nombre']): k for k, v in indice.items() if k.startswith('05')}
    escrutinio = json.loads(ESCRUTINIO_2023.read_text(encoding='utf-8'))['municipios']

    curules: dict[str, dict] = {d: {} for d in sorted(por_nombre.values())}
    filas = leer_pdf(PDF_2023)
    vistos = set()
    for nombre, n in filas:
        clave = ALIAS.get(norm(nombre), norm(nombre))
        if clave not in por_nombre:
            raise SystemExit(f'2023: municipio sin cruce: {nombre}')
        if n not in LEY_136:
            raise SystemExit(f'2023: {nombre} con {n} curules, que no es un número de la Ley 136')
        dane = por_nombre[clave]
        if dane in vistos:
            raise SystemExit(f'2023: {nombre} aparece dos veces')
        vistos.add(dane)
        registro = {'curules': n}
        c = escrutinio[dane].get('concejo')
        if c:
            dif = n - c['totalCurulesListas']
            if dif not in (0, 1):
                raise SystemExit(f'2023: {nombre}: Registraduría {n} vs {c["totalCurulesListas"]} repartidas a listas')
            registro['aListas'] = c['totalCurulesListas']
        curules[dane]['2023'] = registro
    faltan = set(curules) - vistos
    if faltan:
        raise SystemExit(f'2023: faltan municipios en el PDF: {sorted(faltan)}')

    out = {
        'meta': {
            'fuentes': {'2023': 'Registraduría Nacional del Estado Civil, "Curules para concejo municipal", '
                                 'elecciones territoriales 2023 (20230719_curules-concejo.pdf)'},
            'norma': 'Ley 136 de 1994, art. 22: el número de concejales depende de la población del municipio '
                     '(certificada por el DANE para cada elección), no de su categoría.',
            'aListas': 'Curules repartidas a listas en el escrutinio (resultados2023Antioquia.json). Cuando es una menos, '
                       'lo habitual es que la otra sea la del segundo en la alcaldía (Estatuto de la Oposición, Ley 1909 '
                       'de 2018, art. 25); no se verificó municipio por municipio.',
        },
        'municipios': curules,
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(out, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
    mas_uno = sum(1 for v in curules.values() if v['2023'].get('aListas') is not None and v['2023']['curules'] > v['2023']['aListas'])
    print(f'2023: {len(vistos)} municipios; en {mas_uno} la Registraduría suma una curul a las repartidas a listas')


if __name__ == '__main__':
    main()

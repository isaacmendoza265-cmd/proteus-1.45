#!/usr/bin/env python3
"""
Genera src/data/municipal/categoriaMunicipal.json: categoría de cada uno de los 125 municipios de Antioquia
por vigencia (2003-2026).

Fuente: Contaduría General de la Nación, "Categorización de departamentos, distritos y municipios",
archivo "Históricos hasta vigencia 2025" (HISTORICOS.xlsx, hoja HISTORIA-CAT-MUNIC), que ya incluye la
vigencia 2026 (Resolución 338 del 28-nov-2025). Página: https://www.contaduria.gov.co/categorizacion-de-departamentos-distritos-y-municipios
Crudo: _originales/contaduria/HISTORICOS.xlsx (bajado desde un navegador: desde la nube la conexión se corta).

La categoría (Ley 136 de 1994, art. 6, modificado por la Ley 617 de 2000, la Ley 1551 de 2012 y el Decreto
Ley 2106 de 2019) combina población e ingresos corrientes de libre destinación (ICLD). Especial, 1.ª a 6.ª.
"Categorizado por": AUTOCAT (el municipio se categorizó) o INFO CGR / CGN (la categorizó la Contaduría con
la información de la Contraloría porque el municipio no lo hizo).

Controles: los 125 municipios aparecen (código DIVIPOLA); cada valor es E, 1-6 o vacío ("SIN"); la vigencia
2025 tiene 100 municipios de sexta, como el listado de sexta categoría 2025 del IDEA.

Uso: python scripts/build_categoria_municipal.py   (requiere openpyxl)
"""
from __future__ import annotations

import json
from pathlib import Path

import openpyxl

ROOT = Path(__file__).resolve().parent.parent
RAW = ROOT / '_originales' / 'contaduria' / 'HISTORICOS.xlsx'
INDICE = ROOT / 'src' / 'data' / 'electoral' / 'resultadosPuesto' / 'indice.json'
OUT = ROOT / 'src' / 'data' / 'municipal' / 'categoriaMunicipal.json'
VALIDAS = {'E', '1', '2', '3', '4', '5', '6'}


def main() -> None:
    indice = json.loads(INDICE.read_text(encoding='utf-8'))
    danes = {k for k in indice if k.startswith('05')}
    wb = openpyxl.load_workbook(RAW, read_only=True, data_only=True)
    filas = list(wb['HISTORIA-CAT-MUNIC'].iter_rows(values_only=True))
    # Fila 6 (índice 5): "Vigencia" seguida del año; la categoría va en la misma columna de "Vigencia"
    cabecera = filas[5]
    columnas = {str(cabecera[i + 1]).strip(): i for i, v in enumerate(cabecera)
                if v == 'Vigencia' and i + 1 < len(cabecera) and cabecera[i + 1] is not None}
    ultima = max(columnas)
    municipios: dict[str, dict] = {}
    for f in filas[7:]:
        if not f[3] or 'ANTIOQUIA' not in str(f[3]).upper() or f[2] is None:
            continue
        dane = str(int(f[2])).zfill(5)
        if dane not in danes:
            raise SystemExit(f'DIVIPOLA sin cruce: {f[2]} {f[4]}')
        reg: dict[str, str] = {}
        for vig, col in columnas.items():
            v = f[col]
            v = '' if v is None else str(v).strip().upper()
            if v in ('', 'SIN'):
                continue
            v = 'E' if v.startswith('ESP') else v
            if v not in VALIDAS:
                raise SystemExit(f'{f[4]} {vig}: categoría no válida {f[col]!r}')
            reg[vig] = v
        por = f[columnas[ultima] + 1]
        por = str(por).strip().upper() if por else ''
        reg['por'] = 'INFO CGR' if por in ('IFN CGR', 'INF CGR', 'INFO CGR') else por  # la fuente lo escribe de 3 formas
        municipios[dane] = reg
    faltan = danes - set(municipios)
    if faltan:
        raise SystemExit(f'Municipios sin fila: {sorted(faltan)}')
    sexta_2025 = sum(1 for v in municipios.values() if v.get('2025') == '6')
    if sexta_2025 != 100:
        raise SystemExit(f'Vigencia 2025: {sexta_2025} de sexta; el listado del IDEA tiene 100')
    out = {
        'meta': {
            'fuente': f'Contaduría General de la Nación, historial de categorización de municipios (vigencias '
                      f'{min(columnas)}-{ultima}; {ultima}: Resolución 338 del 28-nov-2025)',
            'norma': 'Ley 136 de 1994, art. 6 (Ley 617 de 2000, Ley 1551 de 2012, Decreto Ley 2106 de 2019): '
                     'población + ingresos corrientes de libre destinación.',
            'categorias': 'E = especial; 1 a 6 = primera a sexta.',
            'por': f'Quién la categorizó en {ultima}: AUTOCAT (el municipio) o INFO CGR (la Contaduría, con datos de la Contraloría).',
        },
        'municipios': dict(sorted(municipios.items())),
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(out, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
    from collections import Counter
    print(f'{len(municipios)} municipios, vigencias {min(columnas)}-{ultima}; {ultima}:',
          dict(sorted(Counter(v.get(ultima, '—') for v in municipios.values()).items())))


if __name__ == '__main__':
    main()

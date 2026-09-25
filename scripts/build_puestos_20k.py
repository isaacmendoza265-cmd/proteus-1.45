#!/usr/bin/env python3
"""
Puestos de votación de los municipios con más de 20.000 personas en el censo electoral.

Fuentes (ver _originales/divipole/FUENTE.md):
- Censo electoral por puesto, Registraduría, corte 30-abr-2026
  (_originales/censo_electoral/censo_puestos_2026-04-30.csv): código, nombre, censo y mesas.
- Divipole 2023 georreferenciada, Registraduría, datos.gov.co mv2e-prx5
  (_originales/divipole/divipole_2023_georreferenciada.csv): dirección, comuna y coordenadas.

La Divipole 2023 no trae el código del puesto, así que se cruza por departamento, municipio y
nombre del puesto: exacto, normalizado (sin palabras genéricas como "IE", "sede", "escuela") o
aproximado (similitud >= 0,9, o >= 0,75 con una palabra distintiva en común). Lo que no cruza
queda sin dirección ni coordenadas; en su mayoría son puestos creados después de 2023.

Uso: python3 scripts/build_puestos_20k.py
Salida: src/data/electoral/puestos/resumen.json (municipios) y
        src/data/electoral/puestos/<departamento>.json (puestos, se cargan bajo demanda)
"""
import collections
import csv
import difflib
import json
import re
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CENSO = ROOT / '_originales/censo_electoral/censo_puestos_2026-04-30.csv'
DIVIPOLE = ROOT / '_originales/divipole/divipole_2023_georreferenciada.csv'
CENSO_JSON = ROOT / 'src/data/electoral/censoElectoral2026.json'
OUT_DIR = ROOT / 'src/data/electoral/puestos'
UMBRAL = 20_000


def norm(s):
    s = unicodedata.normalize('NFD', str(s)).encode('ascii', 'ignore').decode().upper()
    return re.sub(r'[^A-Z0-9]+', ' ', s).strip()


GENERICAS = set('''I E IE IEM IED IER INST INSTITUCION EDUCATIVA EDUC EDU EDUCATIVO COL COLEGIO ESC ESCUELA
SEC SEDE SD CENTRO CE CER C R RURAL URBANA MIXTA DEPARTAMENTAL DPTAL NAL NACIONAL OFICIAL DE DEL
LA LAS LOS EL Y NO N PUESTO CONCENTRACION CONC CONCEN ESCOLAR BASICA PRIMARIA PRINCIPAL TECNICA
TEC TECNICO SECCION'''.split())


def canon(s):
    return ' '.join(w for w in norm(s).split() if w not in GENERICAS)


def similitud(a, b):
    if not a or not b:
        return 0.0
    sa, sb = set(a.split()), set(b.split())
    return max(len(sa & sb) / len(sa | sb), difflib.SequenceMatcher(None, a, b).ratio())


def distintivas(s):
    return {w for w in canon(s).split() if len(w) >= 4}


MARCA = re.compile(r'^(I{1,3}|IV|VI{0,3}|IX|X|[A-H]|\d+)$')


def marca_final(s):
    """'SEDE A', 'ANTONIA SANTOS II', 'SECTOR 3': la última marca distingue puestos hermanos."""
    t = norm(s).split()
    return t[-1] if t and MARCA.match(t[-1]) and len(t) > 1 else None


def aceptable(c, d, s):
    mc, md = marca_final(c), marca_final(d)
    if mc and md and mc != md:
        return False
    return s >= 0.9 or (s >= 0.75 and distintivas(c) & distintivas(d))


def coordenadas(d):
    """Coordenadas de la Divipole; las que caen fuera de Colombia (errores de digitación) se anulan."""
    lat, lon = float(d['latitud']), float(d['longitud'])
    if -4.3 <= lat <= 13.6 and -82 <= lon <= -66.8:
        return {'lat': lat, 'lon': lon}
    return {'lat': None, 'lon': None, 'coordenadaInvalida': f"{d['latitud']}, {d['longitud']}"}


def cruzar(censo, divi):
    """Devuelve {cod_puesto: (indice divipole, tipo, similitud)} para un municipio."""
    usados, cruce = set(), {}
    for tipo, clave in (('exacto', norm), ('normalizado', canon)):
        indice = collections.defaultdict(list)
        for i, d in enumerate(divi):
            if i not in usados:
                indice[clave(d['puesto'])].append(i)
        for c in censo:
            k = clave(c['puesto'])
            if c['cod_puesto'] in cruce or not k:
                continue
            libres = [i for i in indice.get(k, []) if i not in usados]
            if len(libres) == 1:
                cruce[c['cod_puesto']] = (libres[0], tipo, 1.0)
                usados.add(libres[0])
    candidatos = []
    for c in censo:
        if c['cod_puesto'] in cruce:
            continue
        cc = canon(c['puesto'])
        for i, d in enumerate(divi):
            if i not in usados:
                s = similitud(cc, canon(d['puesto']))
                if s >= 0.75 and aceptable(c['puesto'], d['puesto'], s):
                    candidatos.append((s, c['cod_puesto'], i))
    for s, cod, i in sorted(candidatos, reverse=True):
        if cod not in cruce and i not in usados:
            cruce[cod] = (i, 'aproximado', round(s, 2))
            usados.add(i)
    return cruce


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
        m = info[cod]
        if m['total'] <= UMBRAL:
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
                    'comuna': re.sub(r'^\d+', '', d['comuna']).strip() or None,
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

    municipios.sort(key=lambda x: -x['censo'])
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for f in OUT_DIR.glob('*.json'):
        f.unlink()
    dump = lambda obj: json.dumps(obj, ensure_ascii=False, separators=(',', ':')) + '\n'
    (OUT_DIR / 'resumen.json').write_text(dump({
        'meta': {
            'criterio': f'Municipios con censo electoral > {UMBRAL:,} (corte 30-abr-2026)'.replace(',', '.'),
            'fuentes': [
                'Registraduría, censo electoral por puesto, corte 30-abr-2026',
                'Registraduría, Divipole Elecciones Territoriales 2023 con georreferenciación (datos.gov.co mv2e-prx5)',
            ],
            'nota': 'Dirección, comuna y coordenadas vienen de la Divipole 2023, cruzada por nombre de puesto. '
                    'Los puestos sin divipole2023 no se pudieron cruzar (en su mayoría, creados después de 2023).',
            'cruce': dict(stats),
        },
        'municipios': municipios,
    }), encoding='utf-8')
    dep_de = {m['codMunicipio']: m['departamento'] for m in municipios}
    por_dep = collections.defaultdict(list)
    for p in puestos:
        por_dep[dep_de[p['codMunicipio']]].append(p)
    for dep, lista in por_dep.items():
        (OUT_DIR / f'{dep}.json').write_text(dump(lista), encoding='utf-8')
    print(f'OK {OUT_DIR.relative_to(ROOT)}: {len(municipios)} municipios, {len(puestos)} puestos en '
          f'{len(por_dep)} departamentos, cruce {dict(stats)}')

if __name__ == '__main__':
    main()

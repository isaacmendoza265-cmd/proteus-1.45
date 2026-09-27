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

Ubicación aproximada (regla de Isaac, 27-sep-2026: en estos municipios solo se distingue cabecera
de veredas). Los puestos que no cruzan con la Divipole 2023 se ubican así, marcados 'aproximada':
- zona urbana (00-89) o 90/98: en la cabecera (punto interior del polígono de la cabecera);
- zona 99 (rural): en el centro poblado del DANE que nombra el puesto, o en la vereda cuyo nombre
  aparece en el nombre del puesto ("CER GUAYABAL",
  "SD EL PITAL I.E. ..."), o en el corregimiento si es el nombre del corregimiento el que aparece;
- lo demás queda sin ubicar (cuenta solo en el total del municipio).

Uso: python3 scripts/build_puestos_fase_c_antioquia.py   (después de build_cartografia_fase_b.py)
Salida: src/data/electoral/puestosFaseC/resumen.json (municipios) y antioquia.json (puestos)
"""
import collections
import csv
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from build_puestos_20k import ROOT, CENSO, DIVIPOLE, CENSO_JSON, norm, canon, cruzar, coordenadas, cargar_osm_antioquia, ubicacion_osm  # noqa: E402
from shapely.geometry import shape, Point  # noqa: E402
from shapely.ops import unary_union  # noqa: E402

OUT_DIR = ROOT / 'src/data/electoral/puestosFaseC'
GENERICAS_RURALES = set('VDA VEREDA VDAS CORREG CORREGIMIENTO INSPECCION INSP POLICIA SD IER CER CEDR ER EU E U CASETA COMUNAL SALON ESCUELA'.split())
FUENTE_APROX = 'Ubicación aproximada: cabecera o vereda del municipio según la zona y el nombre del puesto (sin coordenadas en la Divipole 2023)'


def tokens(s):
    return [w for w in canon(s).split() if w not in GENERICAS_RURALES]


def cargar_territorios(slug):
    ruta_s = ROOT / f'src/data/geojson/municipios/{slug}.subdivisiones.geo.json'
    ruta_d = ROOT / f'src/data/geojson/municipios/{slug}.divisiones.geo.json'
    subs = json.loads(ruta_s.read_text(encoding='utf-8'))['features']
    divs = json.loads(ruta_d.read_text(encoding='utf-8'))['features']
    cab = next((f for f in subs if f['properties']['tipo'] == 'Cabecera'), None)
    ver = [(tokens(f['properties']['name']), f) for f in subs if f['properties']['tipo'] == 'Vereda']
    cor = [(tokens(f['properties']['name'].replace('Corregimiento ', '')), f) for f in divs if f['properties']['tipo'] == 'Corregimiento']
    return cab, [v for v in ver if v[0]], [c for c in cor if c[0]]


_CPOB = {}


def centro_poblado(slug, t):
    """Centro poblado del DANE (MGN 2018, zona urbana: NOM_CPOB) cuyo nombre aparece en el nombre del
    puesto (tokens t), o que contiene todo el nombre del puesto si es el único. -> (lat, lon, nombre) o None"""
    if slug not in _CPOB:
        ruta = ROOT / f'_originales/dane_mgn/{slug}/zona_urbana.geojson'
        feats = json.loads(ruta.read_text(encoding='utf-8'))['features'] if ruta.exists() else []
        cp = [f for f in feats if f.get('geometry') and f['properties'].get('NOM_CPOB') and f['properties'].get('CLAS_CCDGO', '2') != '1']
        _CPOB[slug] = [(tokens(f['properties']['NOM_CPOB']), f) for f in cp if tokens(f['properties']['NOM_CPOB'])]
    lista = _CPOB[slug]
    if not t:
        return None
    hits = [(len(n), f) for n, f in lista if contiene(n, t)]
    if not hits:
        inv = [(len(n), f) for n, f in lista if contiene(t, n)]
        hits = inv if len(inv) == 1 else []
    if not hits:
        return None
    f = max(hits, key=lambda x: x[0])[1]
    p = shape(f['geometry']).representative_point()
    return round(p.y, 6), round(p.x, 6), f['properties']['NOM_CPOB'].title()


def punto(f):
    p = shape(f['geometry']).representative_point()
    return round(p.y, 6), round(p.x, 6)


def contiene(nombre_tok, puesto_tok):
    """Todas las palabras del territorio aparecen seguidas en el nombre del puesto."""
    n = len(nombre_tok)
    return any(puesto_tok[i:i + n] == nombre_tok for i in range(len(puesto_tok) - n + 1))


def ubicar_aproximado(p, cab, veredas, corrs, slug=None):
    if p['zona'] != '99':
        if not cab:
            return None
        lat, lon = punto(cab)
        return {'tipo': 'cabecera', 'lat': lat, 'lon': lon, 'territorio': cab['properties']['name']}
    t = tokens(p['puesto'])
    if slug:
        cp = centro_poblado(slug, t)
        if cp:
            return {'tipo': 'centro poblado', 'lat': cp[0], 'lon': cp[1], 'territorio': cp[2]}
    for lista, tipo in ((veredas, 'vereda'), (corrs, 'corregimiento')):
        cands = [(len(n), f) for n, f in lista if contiene(n, t)]
        if cands:
            f = max(cands, key=lambda x: x[0])[1]
            lat, lon = punto(f)
            return {'tipo': tipo, 'lat': lat, 'lon': lon, 'territorio': f['properties']['name']}
    return None
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
        # Puestos rurales que en 2026 llevan el nombre del lugar más el de la escuela
        # ("CHAGUALAL IER ZOILA DUQUE BAENA") y en la Divipole 2023 solo el del lugar ("CHAGUALAL")
        usados = {x[0] for x in cruce.values()}
        for c in filas:
            if c['cod_puesto'] in cruce or c['cod_puesto'][5:7] != '99':
                continue
            t = tokens(c['puesto'])
            cands = [(len(tokens(d['puesto'])), i) for i, d in enumerate(divi)
                     if i not in usados and tokens(d['puesto']) and contiene(tokens(d['puesto']), t)]
            if cands:
                i = max(cands)[1]
                cruce[c['cod_puesto']] = (i, 'lugar', 1.0)
                usados.add(i)
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

    # Ubicación aproximada de los que no cruzaron (cabecera / vereda / corregimiento)
    slug_de = {v['dane']: k for k, v in json.loads((ROOT / 'src/data/territorio/indiceTerritorios.json').read_text(encoding='utf-8')).items()}
    dane_de = {m['codMunicipio']: m['dane'] for m in municipios}
    terr, limites = {}, {}
    osm = cargar_osm_antioquia()
    for p in puestos:
        cod = p['codMunicipio']
        if cod not in terr:
            terr[cod] = cargar_territorios(slug_de[dane_de[cod]])
            subs = json.loads((ROOT / f'src/data/geojson/municipios/{slug_de[dane_de[cod]]}.subdivisiones.geo.json').read_text(encoding='utf-8'))['features']
            limites[cod] = unary_union([shape(f['geometry']).buffer(0) for f in subs]).buffer(0.005)
        d = p['divipole2023']
        if d and d.get('lat') is not None:
            if limites[cod].contains(Point(d['lon'], d['lat'])):
                continue
            # Coordenada de la Divipole fuera del municipio (error de la fuente): se descarta
            stats['divipole_fuera_del_municipio'] += 1
            stats[d['cruce']] -= 1
            stats['sin_divipole'] += 1
            p['divipole2023'] = None
        if p['codPuesto'] in osm:  # coordenada de OpenStreetMap, mejor que el centro de la cabecera o de la vereda
            stats['osm'] += 1
            if p['divipole2023'] is None:
                stats['sin_divipole'] -= 1
            p['divipole2023'] = ubicacion_osm(p, osm[p['codPuesto']])
            p['divipole2023'].pop('comuna')
            continue
        u = ubicar_aproximado(p, *terr[cod], slug=slug_de[dane_de[cod]])
        if not u:
            stats['sin_ubicar'] += 1
            continue
        stats['aprox_' + u['tipo']] += 1
        if p['divipole2023'] is None:
            stats['sin_divipole'] -= 1
        p['divipole2023'] = {'puesto': p['puesto'], 'direccion': None, 'lat': u['lat'], 'lon': u['lon'],
                             'cruce': u['tipo'], 'similitud': 1.0, 'precision': 'aproximada',
                             'territorio': u['territorio'], 'fuente': FUENTE_APROX}
    for m in municipios:
        m['puestosConCoordenadas'] = sum(1 for p in puestos if p['codMunicipio'] == m['codMunicipio'] and (p['divipole2023'] or {}).get('lat') is not None)
    stats.pop('sin_divipole', None) if stats.get('sin_divipole') == 0 else None

    dump = lambda obj: json.dumps(obj, ensure_ascii=False, separators=(',', ':')) + '\n'
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    (OUT_DIR / 'antioquia.json').write_text(dump(puestos), encoding='utf-8')
    (OUT_DIR / 'resumen.json').write_text(dump({
        'meta': {
            'criterio': 'Municipios de Antioquia con censo electoral <= 20.000 (fase C), aparte del '
                        'umbral nacional de scripts/build_puestos_20k.py (> 20.000 en todo el país).',
            'fuentes': [
                'Registraduría, censo electoral por puesto, corte 30-abr-2026',
                'Registraduría, Divipole Elecciones Territoriales 2023 con georreferenciación (datos.gov.co mv2e-prx5)',
            ],
            'nota': 'Mismo cruce por nombre que build_puestos_20k.py. Los que no cruzan se ubican de forma '
                    'aproximada en la cabecera o en su vereda (precision: aproximada). Los que tampoco así se '
                    'ubican quedan sin coordenadas y cuentan solo en el total del municipio.',
            'cruce': dict(stats),
        },
        'municipios': municipios,
    }), encoding='utf-8')
    print(f'OK {OUT_DIR.relative_to(ROOT)}: {len(municipios)} municipios, {len(puestos)} puestos, cruce {dict(stats)}')


if __name__ == '__main__':
    main()

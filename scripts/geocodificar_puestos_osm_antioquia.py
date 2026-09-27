#!/usr/bin/env python3
"""
Antioquia: coordenadas de OpenStreetMap para los puestos de votación que la Divipole 2023 no georreferencia.

Entradas (descargadas desde el computador de Isaac el 27-sep-2026; desde la nube OSM está bloqueado):
- _originales/osm/antioquia_lugares_2026-09-27.json: extracto Overpass de Antioquia (colegios, escuelas,
  casas de la cultura, coliseos, casetas comunales, iglesias, centros de salud, veredas/caseríos...).
- _originales/osm/nominatim_puestos_2026-09-27.json y nominatim_puestos_2_2026-09-27.json: candidatos de Nominatim por
  puesto (nombre completo + municipio, y luego cada parte del nombre) para los 111 puestos que estaban sin ubicar.

Regla de aceptación (conservadora, para no poner un puesto en el sitio equivocado):
1. El punto cae dentro del polígono del municipio.
2. El nombre OSM contiene las palabras distintivas del nombre del puesto (todas si son 1-2; si son más,
   al menos 2 y dos tercios) y el tipo es compatible (un "I.E." / "C.E.R." / "ESC" solo con un colegio o
   escuela; un coliseo con un coliseo; etc.).
3. Zona: un puesto rural (zona 99) no puede caer en la cabecera municipal del DANE, y uno urbano debe
   caer en ella (con un margen de ~300 m).
4. Si hay dos candidatos igual de buenos a más de 2 km entre sí (5 km en lo rural), es ambiguo y se descarta.
Si nada de eso resulta pero el nombre del puesto es el de un caserío/vereda de OSM, se usa ese punto con
precisión 'aproximada'. Un colegio o edificio con nombre queda con precisión 'osm' en lo urbano y 'aproximada' en lo rural
(contra la Divipole 2023, en lo rural el colegio de OSM queda a veces a varios km del puesto).

Salida: src/data/electoral/puestosOsmAntioquia.json  {codPuesto: {lat, lon, nombreOsm, tipoOsm, precision}}
Los builders (build_puestos_20k.py, build_puestos_fase_c_antioquia.py) la usan SOLO para puestos sin
coordenadas de la Divipole 2023 (en lugar de la ubicación aproximada por cabecera/vereda, o de ninguna).
Datos © colaboradores de OpenStreetMap, ODbL.
Uso: python3 scripts/geocodificar_puestos_osm_antioquia.py
"""
import collections
import json
import math
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from build_puestos_20k import ROOT, norm, GENERICAS  # noqa: E402
from shapely.geometry import shape, Point  # noqa: E402
from shapely.ops import unary_union  # noqa: E402
from shapely.prepared import prep  # noqa: E402

OSM = ROOT / '_originales/osm/antioquia_lugares_2026-09-27.json'
NOMINATIM = [ROOT / '_originales/osm/nominatim_puestos_2026-09-27.json', ROOT / '_originales/osm/nominatim_puestos_2_2026-09-27.json']
OUT = ROOT / 'src/data/electoral/puestosOsmAntioquia.json'

# Palabras que no distinguen un puesto de otro (tipo de lugar, artículos, abreviaturas), además de GENERICAS
GEN = GENERICAS | set('''CDI RUR INST ED EU ER U T LICEO INDUSTRIAL AGRICOLA URBANO SAN SANTA SANTO NTRA NUESTRA SRA SENORA
A EN S STA STO PBRO PRESBITERO MONSENOR MONS BARRIO
COLISEO CASETA COMUNAL SALON CASA CULTURA PUESTO SALUD INSPECCION POLICIA LOCAL ANTIGUO TIENDA PARROQUIAL CAPILLA'''.split())
ESCOLARES = set('I C E IE CE CER IER CDI ESC ESCUELA COL COLEGIO LICEO INSTITUCION CONCENTRACION SD SEDE EU ER'.split())
TIPOS_ESCOLARES = {'school', 'college', 'kindergarten', 'university'}
OTROS = [  # (frase en el puesto, tipos OSM compatibles)
    ('COLISEO', {'sports_centre', 'stadium', 'sports_hall'}),
    ('CASA DE LA CULTURA', {'arts_centre', 'library', 'community_centre'}),
    ('CASETA', {'community_centre'}), ('SALON', {'community_centre', 'place_of_worship'}),
    ('PUESTO DE SALUD', {'clinic', 'hospital'}), ('INSPECCION', {'police', 'townhall'}),
    ('IGLESIA', {'place_of_worship'}), ('PARROQUIA', {'place_of_worship'}), ('CAPILLA', {'place_of_worship'}),
]
LUGARES = {'village', 'hamlet', 'neighbourhood', 'locality', 'isolated_dwelling', 'suburb', 'quarter'}


def distintivas(s):
    return [w for w in norm(s).split() if w not in GEN and len(w) > 1 and not w.isdigit()]


def km(a, b):
    return math.hypot((a[0] - b[0]) * 111.0, (a[1] - b[1]) * 111.0 * math.cos(math.radians(a[0])))


def tipo_de(tags):
    for k in ('amenity', 'leisure', 'building', 'place'):
        if k in tags:
            return tags[k]
    return None


def segmentos(nombre):
    """Nombres a buscar, en orden: la sede ("SD TOMASA MENDEZ I.E.R. AGRICOLA" -> "TOMASA MENDEZ", que es donde se vota),
    luego el nombre completo, luego cada parte ("CER VILLA FATIMA - SEDE VEINTE DE JULIO" -> "VILLA FATIMA")."""
    n = ' ' + norm(nombre) + ' '
    corte = re.compile(r' (?:SD|SEDE|IE|IER|CER|CE|CDI|I E R|I E T I|I E|C E R|C E|E R|E U I|E U) ')
    partes = []
    for trozo in re.split(r'\s-\s|-', str(nombre)):
        partes += [x.strip() for x in corte.split(' ' + norm(trozo) + ' ') if x.strip()]
    sede = [x.strip() for x in re.findall(r' (?:SD|SEDE) (.+?)(?= (?:IE|IER|I E|CER|C E)(?= )|$)', n.rstrip()) if x.strip()]
    orden = sede + [norm(nombre)] + partes
    return list(dict.fromkeys(orden))


def compatibles(nombre_puesto):
    e = ' ' + norm(nombre_puesto) + ' '
    for frase, tipos in OTROS:
        if f' {frase} ' in e:
            return tipos
    if set(e.split()) & ESCOLARES:
        return TIPOS_ESCOLARES
    return None  # nombre sin tipo reconocible: se acepta cualquier edificio con nombre (no un caserío)


def puntaje(t, nombre):
    """Fracción de palabras distintivas del puesto que están en el nombre OSM (una palabra de 4+ letras
    también vale como prefijo: "CHAV" -> "CHAVARRIAGA"). Deben estar todas; con 4 o más, puede faltar una."""
    n = distintivas(nombre)
    comun = sum(1 for w in t if w in n or (len(w) >= 4 and any(x.startswith(w) for x in n)))
    return comun / len(t) if t and comun >= len(t) - (1 if len(t) >= 4 else 0) else 0


def main():
    indice = json.loads((ROOT / 'src/data/territorio/indiceTerritorios.json').read_text(encoding='utf-8'))
    slug_de = {v['dane']: k for k, v in indice.items()}
    mun = {f['properties']['daneCode']: prep(shape(f['geometry']).buffer(0.002))
           for f in json.loads((ROOT / 'src/data/geojson/antioquia125Municipios.geo.json').read_text(encoding='utf-8'))['features']}
    cabeceras = {}

    def cabecera(dane):
        if dane not in cabeceras:
            ruta = ROOT / f'_originales/dane_mgn/{slug_de.get(dane, "")}/zona_urbana.geojson'
            g = None
            if ruta.exists():
                fs = [shape(f['geometry']).buffer(0) for f in json.loads(ruta.read_text(encoding='utf-8'))['features']
                      if f.get('geometry') and f['properties'].get('COD_CLAS') == '1']
                g = prep(unary_union(fs).buffer(0.003)) if fs else None
            cabeceras[dane] = g
        return cabeceras[dane]

    # Todos los puestos de Antioquia (los 46 municipios grandes + los 79 de fase C)
    nac = json.loads((ROOT / 'src/data/electoral/puestos/antioquia.json').read_text(encoding='utf-8'))
    fc = json.loads((ROOT / 'src/data/electoral/puestosFaseC/antioquia.json').read_text(encoding='utf-8'))
    res20 = json.loads((ROOT / 'src/data/electoral/puestos/resumen.json').read_text(encoding='utf-8'))
    resfc = json.loads((ROOT / 'src/data/electoral/puestosFaseC/resumen.json').read_text(encoding='utf-8'))
    dane_de = {m['codMunicipio']: m['dane'] for m in res20['municipios'] + resfc['municipios'] if m['departamento'] == 'antioquia'}
    puestos = [p for p in nac + fc if p['codMunicipio'] in dane_de]

    # Candidatos OSM: Overpass (todo Antioquia) + Nominatim (por puesto)
    osm = []
    for e in json.loads(OSM.read_text(encoding='utf-8'))['elements']:
        c = (e['lat'], e['lon']) if 'lat' in e else ((e['center']['lat'], e['center']['lon']) if 'center' in e else None)
        tags = e.get('tags', {})
        if c and tags.get('name'):
            osm.append({'lat': c[0], 'lon': c[1], 'nombre': tags['name'], 'tipo': tipo_de(tags), 'lugar': 'place' in tags})
    nomi = collections.defaultdict(list)
    for ruta in NOMINATIM:
        for cod, cs in json.loads(ruta.read_text(encoding='utf-8')).items():
            nomi[cod] += [{'lat': c['lat'], 'lon': c['lon'], 'nombre': c['nombre'], 'tipo': c['tipo'], 'lugar': c['cat'] == 'place'}
                          for c in cs if c.get('nombre')]

    salida, stats = {}, collections.Counter()
    for p in puestos:
        dane = dane_de[p['codMunicipio']]
        comp = compatibles(p['puesto'])
        rural = p['zona'] == '99'
        cab = cabecera(dane)
        cands = osm + nomi.get(p['codPuesto'], [])

        def buscar(t):
            buenos, lugares = [], []
            for c in cands:
                s = puntaje(t, c['nombre'])
                if not s or not mun[dane].contains(Point(c['lon'], c['lat'])):
                    continue
                if cab is not None:
                    en_cab = cab.contains(Point(c['lon'], c['lat']))
                    if rural and en_cab or (not rural and p['zona'] not in ('90', '98') and not en_cab):
                        continue
                if c['lugar']:
                    if rural and c['tipo'] in LUGARES:
                        lugares.append((s, c))
                elif comp is None or c['tipo'] in comp:
                    buenos.append((s, c))
            for lista, precision in ((buenos, 'osm'), (lugares, 'aproximada')):
                if lista:
                    mejor = max(s for s, _ in lista)
                    top = [c for s, c in lista if s == mejor]
                    if any(km((a['lat'], a['lon']), (b['lat'], b['lon'])) > (5 if rural else 2) for a in top for b in top):
                        return 'ambiguo_' + precision, None
                    # validado contra la Divipole: en lo rural el colegio OSM puede estar a varios km del puesto
                    return ('aproximada' if rural else precision), top[0]
            return None, None

        for t in [distintivas(seg) for seg in segmentos(p['puesto'])]:
            if not t:
                continue
            estado, c = buscar(t)
            if estado:
                stats[estado] += 1
                if c:
                    salida[p['codPuesto']] = {'lat': round(c['lat'], 6), 'lon': round(c['lon'], 6), 'nombreOsm': c['nombre'],
                                              'tipoOsm': c['tipo'], 'precision': estado}
                break
    meta = {'fuente': 'OpenStreetMap (Overpass y Nominatim, consultados el 27-sep-2026). Datos © colaboradores de OpenStreetMap, ODbL.',
            'regla': 'Nombre distintivo del puesto contenido en el nombre OSM, tipo compatible, dentro del municipio y de la zona '
                     '(rural fuera de la cabecera, urbano dentro); se descartan los ambiguos. Solo se usa para puestos sin '
                     'coordenadas de la Divipole 2023.',
            'conteo': dict(stats)}
    OUT.write_text(json.dumps({'meta': meta, 'puestos': dict(sorted(salida.items()))}, ensure_ascii=False, separators=(',', ':')) + '\n', encoding='utf-8')
    print('OK', OUT.relative_to(ROOT), dict(stats))


if __name__ == '__main__':
    main()

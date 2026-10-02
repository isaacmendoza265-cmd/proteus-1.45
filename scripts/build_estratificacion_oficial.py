#!/usr/bin/env python3
"""
Estratificación socioeconómica OFICIAL del municipio, sumada por barrio y vereda.

Fuentes (crudos en _originales/estratificacion/<municipio>/, procedencia en _originales/estratificacion/_FUENTES.md):
- Sabaneta: capa "Estratificacion" de la Alcaldía de Sabaneta (ArcGIS Online, item e0a0c77ac1d544739cc9c8e1d53860e8,
  modificada el 30-ene-2023): un punto por predio residencial con su estrato (campo SUBCATEGOR, 1 a 6).
  https://services7.arcgis.com/OsNfmcCXlLRPMVA8/arcgis/rest/services/Estratificacion/FeatureServer/0
  Descargada el 1-oct-2026 (f=geojson, outSR=4326): sabaneta/sabaneta_estratificacion_predios.geojson.

- Medellín: capa "Estrato Socioeconómico" de la Secretaría de Gestión y Control Territorial (MapServer
  vivienda_ciudad_terri/VC_Catastro_VCT/10, actualización diaria, CC BY-SA 4.0), una MANZANA por registro con su
  estrato. El servidor rechaza descargas automáticas: el 1-oct-2026 se consultó desde el navegador del usuario el
  conteo de manzanas por barrio y estrato (outStatistics, agrupado por codigo_barrio y estrato) y se guardó en
  medellin/medellin_estrato_manzanas_por_barrio.txt ("barrio,estrato,manzanas,área m²;..."; 32.384 manzanas,
  verificado con suma de control). El barrio se cruza por código (el mismo del Distrito); las manzanas de códigos
  que Proteus no tiene como barrio (áreas institucionales, sectores de corregimiento) cuentan en su comuna o
  corregimiento (los dos primeros dígitos) y en el municipio.

Por qué: el estrato que Proteus ya muestra es el que declararon los hogares en el censo DANE 2018 (factura de
energía), por manzana. Esta es la estratificación vigente que adopta la alcaldía, predio por predio.
Los demás municipios del Valle de Aburrá no publican la suya (Medellín sí, pero su servidor rechaza la descarga
automática: ver _FUENTES.md). El "estrato predominante por manzana 2018" de Esri Colombia es el mismo censo DANE
que ya está en la app, así que no se agrega.

Método: cada predio se asigna al barrio o vereda (src/data/geojson/municipios/<slug>.subdivisiones.geo.json) que
lo contiene (o, en el borde, al más cercano a menos de 50 m); los demás se cuentan solo en el municipio como
"sin ubicar". No se estima nada.

Uso: python3 scripts/build_estratificacion_oficial.py
Salida: src/data/estratificacion/<slug>.json
"""
import collections, json
from pathlib import Path
from shapely.geometry import shape, Point
from shapely.strtree import STRtree

ROOT = Path(__file__).resolve().parent.parent
CRUDOS = ROOT / '_originales/estratificacion'
OUT = ROOT / 'src/data/estratificacion'
TOLERANCIA = 50 / 111_000  # 50 m en grados (cerca del ecuador)

FUENTES = {
    'sabaneta': {
        'archivo': 'sabaneta/sabaneta_estratificacion_predios.geojson',
        'campo': 'SUBCATEGOR',
        'meta': {
            'fuente': 'Alcaldía de Sabaneta, capa oficial de estratificación (ArcGIS Online, actualizada el 30-ene-2023)',
            'url': 'https://services7.arcgis.com/OsNfmcCXlLRPMVA8/arcgis/rest/services/Estratificacion/FeatureServer/0',
            'unidad': 'predios residenciales',
            'corte': '2023-01-30',
            'descarga': '2026-10-01',
        },
    },
}


DIVISION_MEDELLIN = {**{f'{i:02d}': f'comuna-{i}' for i in range(1, 17)}, '50': 'med-correg-palmitas', '60': 'med-correg-san-cristobal',
                     '70': 'med-correg-altavista', '80': 'med-correg-san-antonio-de-prado', '90': 'med-correg-santa-elena'}


def medellin():
    """Manzanas por estrato y barrio (consulta agregada de la capa oficial del Distrito)."""
    filas = [r.split(',') for r in (CRUDOS / 'medellin/medellin_estrato_manzanas_por_barrio.txt').read_text().strip().split(';')]
    feats = json.load(open(ROOT / 'src/data/geojson/medellinBarrios.geo.json'))['features']
    id_de = {f['properties']['code']: f['properties']['id'] for f in feats}
    total, por, por_div, sin_cruce = [0] * 6, collections.defaultdict(lambda: [0] * 6), collections.defaultdict(lambda: [0] * 6), 0
    for cod, e, n, _area in filas:
        e, n = int(e), int(n)
        total[e - 1] += n
        por_div[DIVISION_MEDELLIN[cod[:2]]][e - 1] += n
        if cod in id_de:
            por[id_de[cod]][e - 1] += n
        else:
            sin_cruce += n
    assert sum(total) == 32384, sum(total)
    meta = {
        'fuente': 'Distrito de Medellín, capa oficial "Estrato Socioeconómico" (Secretaría de Gestión y Control Territorial, actualizada a diario)',
        'url': 'https://www.medellin.gov.co/servidormapas/rest/services/vivienda_ciudad_terri/VC_Catastro_VCT/MapServer/10',
        'unidad': 'manzanas', 'corte': '2026-10-01', 'descarga': '2026-10-01', 'licencia': 'CC BY-SA 4.0',
        'nota': (f'Manzanas por estrato de cada barrio (código del Distrito). {sin_cruce} manzanas de áreas institucionales o '
                 'sectores sin barrio en Proteus cuentan solo en su comuna o corregimiento.'),
    }
    json.dump({'meta': meta, 'municipio': total, 'sinUbicar': sin_cruce, 'porTerritorio': dict(sorted(por.items())),
               'porDivision': dict(sorted(por_div.items()))},
              open(OUT / 'medellin.json', 'w'), ensure_ascii=False, separators=(',', ':'))
    print('medellin manzanas', sum(total), 'por estrato', total, 'barrios', len(por), 'sin barrio en Proteus', sin_cruce)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    medellin()
    for slug, f in FUENTES.items():
        subs = json.load(open(ROOT / f'src/data/geojson/municipios/{slug}.subdivisiones.geo.json'))['features']
        geoms = [shape(s['geometry']).buffer(0) for s in subs]
        arbol = STRtree(geoms)
        por = collections.defaultdict(lambda: [0] * 6)
        total, sin_ubicar, fuera_de_rango, cercanos = [0] * 6, 0, 0, 0
        for p in json.load(open(CRUDOS / f['archivo']))['features']:
            e = p['properties'].get(f['campo'])
            if not isinstance(e, int) or not 1 <= e <= 6:
                fuera_de_rango += 1
                continue
            total[e - 1] += 1
            pt = Point(p['geometry']['coordinates'])
            dentro = [i for i in arbol.query(pt) if geoms[i].covers(pt)]
            if not dentro:  # borde: el barrio o vereda más cercano a menos de 50 m (las capas no casan al milímetro)
                i = arbol.nearest(pt)
                if geoms[i].distance(pt) <= TOLERANCIA:
                    dentro = [i]
                    cercanos += 1
            if dentro:
                por[subs[dentro[0]]['properties']['id']][e - 1] += 1
            else:
                sin_ubicar += 1
        meta = dict(f['meta'], nota=(f'Predios por estrato asignados al barrio o vereda que los contiene ({cercanos} al más cercano, a menos '
                                     f'de 50 m del borde). {sin_ubicar} predios caen fuera de los barrios y veredas que tiene Proteus y '
                                     f'solo cuentan en el total del municipio.'))
        json.dump({'meta': meta, 'municipio': total, 'sinUbicar': sin_ubicar, 'porTerritorio': dict(sorted(por.items()))},
                  open(OUT / f'{slug}.json', 'w'), ensure_ascii=False, separators=(',', ':'))
        print(slug, 'predios', sum(total), 'por estrato', total, 'barrios/veredas', len(por), 'por cercanía', cercanos, 'sin ubicar', sin_ubicar, 'descartados', fuera_de_rango)


if __name__ == '__main__':
    main()

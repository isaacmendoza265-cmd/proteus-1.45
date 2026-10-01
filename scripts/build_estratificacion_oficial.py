#!/usr/bin/env python3
"""
Estratificación socioeconómica OFICIAL del municipio, sumada por barrio y vereda.

Fuentes (crudos en _originales/estratificacion/<municipio>/, procedencia en _originales/estratificacion/_FUENTES.md):
- Sabaneta: capa "Estratificacion" de la Alcaldía de Sabaneta (ArcGIS Online, item e0a0c77ac1d544739cc9c8e1d53860e8,
  modificada el 30-ene-2023): un punto por predio residencial con su estrato (campo SUBCATEGOR, 1 a 6).
  https://services7.arcgis.com/OsNfmcCXlLRPMVA8/arcgis/rest/services/Estratificacion/FeatureServer/0
  Descargada el 1-oct-2026 (f=geojson, outSR=4326): sabaneta/sabaneta_estratificacion_predios.geojson.

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


def main():
    OUT.mkdir(parents=True, exist_ok=True)
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

#!/usr/bin/env python3
"""
Valor del suelo por barrio y vereda: Mapa de Valores de Suelo Metropolitano del Área Metropolitana del Valle de Aburrá.

Fuente: AMVA, Observatorio Inmobiliario Catastral (idem.metropol.gov.co/mapa-de-valores-de-suelo-metropolitano),
capa "Valores Suelo Metropolitano" (749 zonas con valor por m², fecha sep-2022, "según vigencia de cada municipio",
licencia CC BY 4.0):
  https://portalidem.metropol.gov.co/server/rest/services/Valores_Usos_Suelo_Metropolitano/MapServer/0
Descargada el 1-oct-2026 (f=geojson, outSR=4326): _originales/valores_suelo_amva/valores_suelo_metropolitano.geojson

Por qué: es el sustituto de la estratificación oficial en los municipios del Valle de Aburrá que no la publican
(Bello, Itagüí, Envigado, La Estrella, Caldas, Copacabana, Girardota, Barbosa). Medellín y Sabaneta usan su capa
oficial de estratos (decisión del 1-oct-2026), así que aquí no se calculan.

Ojo: cada municipio reporta UN tipo de valor. Copacabana y La Estrella, valor COMERCIAL; los demás, valor CATASTRAL
(más bajo que el comercial). No se comparan entre sí municipios de tipo distinto; dentro de un municipio, sí.

Método: cada zona de valor se cruza con los barrios y veredas de Proteus (src/data/geojson/municipios/<slug>.
subdivisiones.geo.json). Por territorio se guarda el área cubierta por zonas con valor (m²) y la suma valor × área,
para que comunas, cabecera o zona rural se agreguen como promedio ponderado por área. Zonas con valor 0 = sin dato.

Uso: python3 scripts/build_valores_suelo_amva.py
Salida: src/data/valoresSuelo/<slug>.json
"""
import json, math
from pathlib import Path
from shapely.geometry import shape
from shapely.strtree import STRtree

ROOT = Path(__file__).resolve().parent.parent
CRUDO = ROOT / '_originales/valores_suelo_amva/valores_suelo_metropolitano.geojson'
OUT = ROOT / 'src/data/valoresSuelo'
MUNICIPIOS = {'Bello': 'bello', 'Itagui': 'itagui', 'Envigado': 'envigado', 'La Estrella': 'la_estrella', 'Caldas': 'caldas',
              'Copacabana': 'copacabana', 'Girardota': 'girardota', 'Barbosa': 'barbosa'}


def m2(geom):
    """Área aproximada en m² de una geometría en grados (escala local por la latitud del centroide)."""
    lat = math.radians(geom.centroid.y)
    return geom.area * 111_320 * math.cos(lat) * 110_574


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    zonas = json.load(open(CRUDO))['features']
    for muni, slug in MUNICIPIOS.items():
        zs = [(shape(z['geometry']).buffer(0), z['properties']) for z in zonas if z['properties']['MUNICIPIO'] == muni]
        tipos = {p['TIPO_VALOR'].replace('_', ' ') for _, p in zs}
        assert len(tipos) == 1, (muni, tipos)
        tipo = tipos.pop().replace('Valor ', '').lower()
        con_valor = [(g, p['VALOR_M2']) for g, p in zs if p['VALOR_M2']]
        arbol = STRtree([g for g, _ in con_valor])
        subs = json.load(open(ROOT / f'src/data/geojson/municipios/{slug}.subdivisiones.geo.json'))['features']
        por = {}
        for s in subs:
            g = shape(s['geometry']).buffer(0)
            area, suma = 0.0, 0.0
            for i in arbol.query(g):
                zg, v = con_valor[i]
                inter = g.intersection(zg)
                if not inter.is_empty:
                    a = m2(inter)
                    area += a
                    suma += a * v
            if area:
                por[s['properties']['id']] = {'area': round(area), 'suma': round(suma), 'areaTotal': round(m2(g))}
        area_mun = sum(m2(g) for g, _ in con_valor)
        suma_mun = sum(m2(g) * v for g, v in con_valor)
        json.dump({
            'meta': {
                'fuente': 'Área Metropolitana del Valle de Aburrá, Mapa de Valores de Suelo Metropolitano (Observatorio Inmobiliario Catastral, sep-2022, según la vigencia catastral de cada municipio)',
                'url': 'https://portalidem.metropol.gov.co/server/rest/services/Valores_Usos_Suelo_Metropolitano/MapServer/0',
                'licencia': 'CC BY 4.0', 'descarga': '2026-10-01', 'tipo': tipo, 'zonas': len(zs),
                'nota': 'Promedio del valor por m² de las zonas, ponderado por el área que cada zona ocupa en el territorio.',
            },
            'municipio': {'area': round(area_mun), 'suma': round(suma_mun)},
            'porTerritorio': dict(sorted(por.items())),
        }, open(OUT / f'{slug}.json', 'w'), ensure_ascii=False, separators=(',', ':'))
        print(slug, tipo, len(zs), 'zonas;', f'{len(por)}/{len(subs)} territorios;', 'promedio municipal', round(suma_mun / area_mun))


if __name__ == '__main__':
    main()

"""
Descarga los barrios oficiales de los municipios de la fase B, cada uno desde su fuente (ver la tabla
FUENTES) y los corregimientos de la Gobernación. Guarda GeoJSON WGS84 en _originales/barrios_fase_b/.
Uso: python3 scripts/descargar_barrios_fase_b.py
"""
import json, os, subprocess, time, urllib.parse

OUT = '_originales/barrios_fase_b'
CAT = 'https://geoags1.catastroantioquia-mas.com/arcgis/rest/services/Regiones_M/M{m}/MapServer/13'
AMVA = 'https://portalidem.metropol.gov.co/server/rest/services/{s}_Catastro/MapServer/2'
GOB_CATASTRO = ['apartado', 'turbo', 'caucasia', 'la_ceja', 'chigorodo', 'carepa', 'carmen_de_viboral', 'guarne', 'el_bagre',
                'necocli', 'andes', 'yarumal', 'puerto_berrio', 'segovia', 'san_pedro_de_uraba', 'santa_rosa_de_osos', 'sonson',
                'urrao', 'taraza', 'remedios', 'bolivar', 'arboletes', 'santa_barbara', 'san_juan_de_uraba', 'caceres', 'dabeiba']
FUENTES = {
    'envigado': ('https://services7.arcgis.com/vAISUooSGCM0wKQp/arcgis/rest/services/Barrios_DA/FeatureServer/0', 'Municipio de Envigado (organización ArcGIS del municipio), capa Barrios_DA; mismos 40 barrios del catastro publicado por el AMVA'),
    'copacabana': (AMVA.format(s='Copacabana'), 'Alcaldía de Copacabana, Catastro (publicado por el AMVA, Observatorio Inmobiliario Catastral)'),
    'barbosa': (AMVA.format(s='Barbosa'), 'Alcaldía de Barbosa, Catastro (publicado por el AMVA, Observatorio Inmobiliario Catastral)'),
    'caldas': ('https://services8.arcgis.com/JfgyATSrmZQLc8UY/arcgis/rest/services/Informacion_GENERAL/FeatureServer/29', 'Municipio de Caldas (cuenta Municipio_Caldas_Oficial), capa de barrios'),
}
lista = {m['slug']: m['dane'] for m in json.load(open('/tmp/mgn_lista.json'))}
for s in GOB_CATASTRO:
    FUENTES[s] = (CAT.format(m=lista[s][2:]), 'Gobernación de Antioquia, Catastro Departamental (Cartografía básica predial, capa Barrios)')
FUENTES['corregimientos'] = ('https://services5.arcgis.com/K90UQIB09TmTjUL8/arcgis/rest/services/Corregimientos_Antioquia_WFL1/FeatureServer/5', 'Gobernación de Antioquia, Corregimientos de Antioquia (2025)')

def get(url, params):
    for i in range(4):
        out = subprocess.run(['curl', '-s', '-m', '180', url + '?' + urllib.parse.urlencode(params)], capture_output=True).stdout
        try:
            d = json.loads(out)
            if 'error' not in d: return out, d
        except Exception:
            pass
        time.sleep(3 * (i + 1))
    raise RuntimeError(url)

def esri_a_geojson(d):
    """Convierte la respuesta f=json (anillos Esri) a GeoJSON; algunas capas fallan con f=geojson."""
    from shapely.geometry import LinearRing, Polygon, MultiPolygon, mapping
    feats = []
    for f in d['features']:
        ext, holes = [], []
        for r in (f.get('geometry') or {}).get('rings', []):
            if len(r) < 4: continue
            (holes if LinearRing(r).is_ccw else ext).append(r)
        polys = [[e] for e in ext]
        for h in holes:
            for pg in polys:
                if Polygon(pg[0]).contains(Polygon(h).representative_point()):
                    pg.append(h); break
        geom = MultiPolygon([Polygon(pg[0], pg[1:]) for pg in polys]) if polys else None
        feats.append({'type': 'Feature', 'properties': f['attributes'], 'geometry': mapping(geom) if geom else None})
    return json.dumps({'type': 'FeatureCollection', 'features': feats}).encode()

os.makedirs(OUT, exist_ok=True)
meta = {}
for s, (url, desc) in FUENTES.items():
    destino = f'{OUT}/{s}.geojson'
    params = {'where': '1=1', 'outFields': '*', 'returnGeometry': 'true', 'outSR': '4326', 'f': 'geojson'}
    if s == 'corregimientos':
        params['where'] = "COD_MPIO LIKE '05%'"
    if not os.path.exists(destino):
        try:
            out, d = get(url + '/query', params)
        except RuntimeError:
            out, d = get(url + '/query', dict(params, f='json'))
            out = esri_a_geojson(d)
        open(destino, 'wb').write(out)
    d = json.load(open(destino))
    meta[s] = {'url': url, 'fuente': desc, 'n': len(d['features'])}
    print(s, len(d['features']), flush=True)
# La Estrella: datos abiertos de la Alcaldía (barrios y veredas en un solo conjunto)
destino = f'{OUT}/la_estrella.geojson'
if not os.path.exists(destino):
    out = subprocess.run(['curl', '-s', '-m', '180', 'https://www.datos.gov.co/resource/5h8y-kv4j.geojson?$limit=500'], capture_output=True).stdout
    open(destino, 'wb').write(out)
meta['la_estrella'] = {'url': 'https://www.datos.gov.co/resource/5h8y-kv4j', 'fuente': 'Municipio de La Estrella, Planeación: División político administrativa (datos.gov.co, 2023)', 'n': len(json.load(open(destino))['features'])}
print('la_estrella', meta['la_estrella']['n'])
json.dump(meta, open(f'{OUT}/fuentes.json', 'w'), ensure_ascii=False, indent=1)

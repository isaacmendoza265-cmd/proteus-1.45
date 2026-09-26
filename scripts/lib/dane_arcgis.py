"""Consultas a los servicios ArcGIS REST públicos del Geoportal DANE (con curl, a ritmo moderado)."""
import json, subprocess, time, urllib.parse

B = 'https://geoportal.dane.gov.co/mparcgis/rest/services'

def curl_json(url, data=None, intentos=4):
    for i in range(intentos):
        cmd = ['curl', '-s', '-m', '180', url] if data is None else ['curl', '-s', '-m', '180', '--data', urllib.parse.urlencode(data), url]
        out = subprocess.run(cmd, capture_output=True).stdout
        try:
            d = json.loads(out)
            if 'error' in d: raise ValueError(d['error'])
            return d
        except Exception as e:
            if i == intentos - 1: raise RuntimeError(f'{url}: {e} {out[:200]!r}')
            time.sleep(3 * (i + 1))

def query(capa, where, campos='*', geometria=True, paso=1000, extra=None, oid='OBJECTID'):
    """Todas las entidades (paginando). Geometría en WGS84 (GeoJSON)."""
    feats, off = [], 0
    while True:
        p = {'where': where, 'outFields': campos, 'returnGeometry': 'true' if geometria else 'false', 'outSR': '4326',
             'f': 'geojson' if geometria else 'json', 'orderByFields': oid}
        if paso: p.update(resultOffset=off, resultRecordCount=paso)
        if extra: p.update(extra)
        d = curl_json(f'{B}/{capa}/query', p)
        lote = d.get('features', [])
        feats += lote
        if not paso: break
        if len(lote) < paso and not d.get('exceededTransferLimit') and not d.get('properties', {}).get('exceededTransferLimit'): break
        off += len(lote)
        time.sleep(0.5)
    return feats

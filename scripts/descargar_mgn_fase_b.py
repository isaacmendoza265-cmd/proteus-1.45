"""
Descarga del Geoportal DANE (servicios ArcGIS REST públicos) la cartografía interna de una lista de
municipios: sectores urbanos del MGN 2018, zona urbana (cabeceras y
centros poblados), comunas (DANE 2018) y veredas (nivel de referencia de veredas 2024).

Uso: python3 scripts/descargar_mgn_fase_b.py <lista.json>   (lista: [{slug, dane}])
Guarda GeoJSON (WGS84) en _originales/dane_mgn/<slug>/.
"""
import json, os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'lib'))
from dane_arcgis import query

CAPAS = {
    # Las capas integradas con el CNPV (MARCO_INTEGRADO 806/802) no devuelven geometría: se guardan sus
    # atributos (…_cnpv.json) y la geometría sale de las capas del MGN 2018 (mismo código SETU_CCNCT).
    'sectores_urbanos': ('MGN2018/Serv_CapaSectorUrbanoInt_2018/MapServer/0', "MPIO_CDPMP='{d}'", 'OBJECTID'),
    'zona_urbana': ('MGN2018/Serv_CapasMGN_2018/FeatureServer/305', "COD_MPIO='{d}'", 'OBJECTID'),
    'comunas': ('Comuna_Localidad/Serv_Comuna_Localidad_2018/FeatureServer/0', "COD_MPIO='{d}'", 'OBJECTID'),
    'veredas': ('NIVEL_DE_REFERENCIA_DE_VEREDAS/Serv_CapasNivelReferenciaVeredas_2024/FeatureServer/1', "DPTOMPIO='{d}'", 'OBJECTID_1'),
}
lista = json.load(open(sys.argv[1]))
for m in lista:
    base = f"_originales/dane_mgn/{m['slug']}"
    os.makedirs(base, exist_ok=True)
    for nombre, (capa, where, oid) in CAPAS.items():
        destino = f'{base}/{nombre}.geojson'
        if os.path.exists(destino): continue
        feats = query(capa, where.format(d=m['dane']), extra={'maxAllowableOffset': 0.00003, 'geometryPrecision': 6}, oid=oid,
                      paso=None if nombre == 'zona_urbana' else 1000)  # esa capa no admite paginación
        json.dump({'type': 'FeatureCollection', 'features': feats}, open(destino, 'w'), ensure_ascii=False)
        print(m['slug'], nombre, len(feats), os.path.getsize(destino), flush=True)

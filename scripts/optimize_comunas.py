import json
import math

def point_line_distance(pt, start, end):
    if start == end:
        return math.hypot(pt[0] - start[0], pt[1] - start[1])
    n = abs((end[1] - start[1]) * pt[0] - (end[0] - start[0]) * pt[1] + end[0] * start[1] - end[1] * start[0])
    d = math.hypot(end[1] - start[1], end[0] - start[0])
    return n / d if d != 0 else 0

def ramer_douglas_peucker(points, epsilon):
    if len(points) <= 2:
        return points
    dmax = 0
    index = 0
    end = len(points) - 1
    for i in range(1, end):
        d = point_line_distance(points[i], points[0], points[end])
        if d > dmax:
            index = i
            dmax = d
    if dmax > epsilon:
        rec1 = ramer_douglas_peucker(points[:index+1], epsilon)
        rec2 = ramer_douglas_peucker(points[index:], epsilon)
        return rec1[:-1] + rec2
    else:
        return [points[0], points[end]]

def simplify_ring(ring, epsilon=0.00015):
    # Epsilon 0.00015 degrees is approx 16 meters
    if len(ring) <= 4:
        return ring
    # ensure closed ring
    is_closed = ring[0] == ring[-1]
    res = ramer_douglas_peucker(ring[:-1] if is_closed else ring, epsilon)
    if len(res) < 3:
        res = ring[:4]
    if is_closed:
        res.append(res[0])
    return [[round(p[0], 5), round(p[1], 5)] for p in res]

def simplify_coords(coords, epsilon=0.00015):
    if not coords:
        return coords
    if isinstance(coords[0], (int, float)):
        return coords
    if isinstance(coords[0][0], (int, float)):
        return simplify_ring(coords, epsilon)
    return [simplify_coords(sub, epsilon) for sub in coords]

def optimize_medellin_comunas():
    with open(r'C:\Users\isaac\Downloads\Comunas_Medellin.geojson', 'r', encoding='utf-8') as f:
        comunas_raw = json.load(f)

    comunas_features = []
    total_raw_pts = 0
    total_opt_pts = 0

    for feat in comunas_raw.get('features', []):
        p = feat.get('properties', {})
        num_comuna = p.get('Numero_Comuna')
        nombre = p.get('Nombre_Comuna', '')
        geom = feat.get('geometry', {})
        raw_coords = geom.get('coordinates', [])
        
        # count raw pts
        def count_pts(c):
            if isinstance(c, list) and len(c) >= 2 and isinstance(c[0], (int, float)):
                return 1
            if isinstance(c, list):
                return sum(count_pts(sub) for sub in c)
            return 0
        total_raw_pts += count_pts(raw_coords)

        # Simplify
        opt_coords = simplify_coords(raw_coords, epsilon=0.00012)
        total_opt_pts += count_pts(opt_coords)

        comuna_props = {
            'comunaId': f'comuna-{num_comuna}',
            'number': num_comuna,
            'name': f"Comuna {num_comuna} - {nombre}",
            'shortName': nombre,
            'municipality': 'Medellín',
            'department': 'Antioquia',
            'subregion': 'Valle de Aburrá',
            'source': 'Alcaldía de Medellín / CNMH Oficial'
        }

        comunas_features.append({
            'type': 'Feature',
            'id': f'comuna-{num_comuna}',
            'properties': comuna_props,
            'geometry': {
                'type': geom.get('type'),
                'coordinates': opt_coords
            }
        })

    comunas_features.sort(key=lambda x: x['properties']['number'])

    print(f"Medellin comunas points reduced from {total_raw_pts} to {total_opt_pts} ({(1 - total_opt_pts/total_raw_pts)*100:.1f}% reduction)")

    ts_content = f"""// GeoJSON Oficial de las 16 Comunas Urbanas de Medellín (WGS84 EPSG:4326)
// Límites cartográficos oficiales georreferenciados (CNMH / Alcaldía de Medellín)
// Optimizado para renderizado ultra-rápido en Vite / Google AI Studio
import {{ GeoJsonFeatureCollection }} from './types';

export const medellin16ComunasOfficialGeoJson: GeoJsonFeatureCollection = {json.dumps({
    'type': 'FeatureCollection',
    'features': comunas_features
}, ensure_ascii=False, indent=2)};
"""
    with open('src/data/geojson/medellin16ComunasOfficialGeoJson.ts', 'w', encoding='utf-8') as f:
        f.write(ts_content)

    new_size = len(ts_content.encode('utf-8'))
    print(f"New file size: {new_size / 1024:.1f} KB")

if __name__ == '__main__':
    optimize_medellin_comunas()

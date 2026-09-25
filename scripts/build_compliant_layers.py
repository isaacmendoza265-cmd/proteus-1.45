import json
import os
import math

SUBREGIONS_MAP = {
    # Valle de Aburra
    '05001': 'Valle de Aburrá', '05088': 'Valle de Aburrá', '05360': 'Valle de Aburrá',
    '05266': 'Valle de Aburrá', '05129': 'Valle de Aburrá', '05212': 'Valle de Aburrá',
    '05380': 'Valle de Aburrá', '05308': 'Valle de Aburrá', '05631': 'Valle de Aburrá',
    '05079': 'Valle de Aburrá',
    # Oriente
    '05615': 'Oriente', '05440': 'Oriente', '05318': 'Oriente', '05148': 'Oriente',
    '05607': 'Oriente', '05376': 'Oriente', '05400': 'Oriente', '05756': 'Oriente',
    '05002': 'Oriente', '05674': 'Oriente', '05252': 'Oriente', '05315': 'Oriente',
    '05313': 'Oriente', '05649': 'Oriente', '05660': 'Oriente', '05664': 'Oriente',
    '05197': 'Oriente', '05652': 'Oriente', '05591': 'Oriente', '05059': 'Oriente',
    '05483': 'Oriente', '05206': 'Oriente', '05021': 'Oriente',
    # Suroeste
    '05034': 'Suroeste', '05234': 'Suroeste', '05093': 'Suroeste', '05353': 'Suroeste',
    '05364': 'Suroeste', '05368': 'Suroeste', '05576': 'Suroeste', '05790': 'Suroeste',
    '05282': 'Suroeste', '05670': 'Suroeste', '05858': 'Suroeste', '05030': 'Suroeste',
    '05036': 'Suroeste', '05809': 'Suroeste', '05209': 'Suroeste', '05091': 'Suroeste',
    '05837': 'Suroeste', '05642': 'Suroeste', '05847': 'Suroeste', '05145': 'Suroeste',
    '05789': 'Suroeste', '05390': 'Suroeste', '05467': 'Suroeste',
    # Uraba
    '05045': 'Urabá', '05837_turbo': 'Urabá', '05147': 'Urabá',
    '05172': 'Urabá', '05490': 'Urabá', '05659': 'Urabá', '05665': 'Urabá',
    '05051': 'Urabá', '05475': 'Urabá', '05480': 'Urabá', '05873': 'Urabá',
    # Occidente
    '05042': 'Occidente', '05761': 'Occidente', '05656': 'Occidente', '05501': 'Occidente',
    '05411': 'Occidente', '05628': 'Occidente', '05543': 'Occidente', '05842': 'Occidente',
    '05237': 'Occidente', '05284': 'Occidente', '05138': 'Occidente', '05004': 'Occidente',
    '05306': 'Occidente', '05113': 'Occidente', '05347': 'Occidente', '05055': 'Occidente',
    '05240': 'Occidente', '05044': 'Occidente',
    # Norte
    '05686': 'Norte', '05885': 'Norte', '05250': 'Norte', '05264': 'Norte',
    '05086': 'Norte', '05658': 'Norte', '05647': 'Norte', '05819': 'Norte',
    '05107': 'Norte', '05361': 'Norte', '05134': 'Norte', '05040': 'Norte',
    '05310': 'Norte', '05854': 'Norte',
    # Bajo Cauca
    '05154': 'Bajo Cauca', '05495': 'Bajo Cauca', '05792': 'Bajo Cauca',
    '05120': 'Bajo Cauca', '05895': 'Bajo Cauca',
    # Nordeste
    '05736': 'Nordeste', '05604': 'Nordeste', '05031': 'Nordeste', '05038': 'Nordeste',
    '05890': 'Nordeste', '05887': 'Nordeste', '05856': 'Nordeste',
    '05690': 'Nordeste', '05190': 'Nordeste',
    # Magdalena Medio
    '05579': 'Magdalena Medio', '05585': 'Magdalena Medio', '05893': 'Magdalena Medio',
    '05425': 'Magdalena Medio', '05142': 'Magdalena Medio'
}

SUBREGION_COLORS = {
    'Valle de Aburrá': '#10b981',
    'Oriente': '#3b82f6',
    'Suroeste': '#f59e0b',
    'Urabá': '#06b6d4',
    'Occidente': '#8b5cf6',
    'Norte': '#ec4899',
    'Bajo Cauca': '#ef4444',
    'Nordeste': '#14b8a6',
    'Magdalena Medio': '#f97316',
    'Antioquia': '#64748b'
}

def clean_name(raw_name):
    if not raw_name: return ""
    replacements = {
        'MEDELLN': 'Medellín', 'ITAG': 'Itagüí', 'JERIC': 'Jericó',
        'CIUDAD BOLVAR': 'Ciudad Bolívar', 'CCERES': 'Cáceres', 'BRICEO': 'Briceño',
        'EL PEOL': 'El Peñol', 'SONSN': 'Sonsón', 'GUATAP': 'Guatapé',
        'COCORN': 'Cocorná', 'JARDN': 'Jardín', 'AMAG': 'Amagá', 'TMESIS': 'Támesis',
        'APARTAD': 'Apartadó', 'CHIGOROD': 'Chigorodó', 'NECOCL': 'Necoclí',
        'SAN PEDRO DE URAB': 'San Pedro de Urabá', 'SOPETRN': 'Sopetrán',
        'SAN JERNIMO': 'San Jerónimo', 'CAASGORDAS': 'Cañasgordas', 'DONMATAS': 'Donmatías',
        'ENTRERROS': 'Entrerríos', 'TARAZ': 'Tarazá', 'NECH': 'Nechí',
        'YOLOMB': 'Yolombó', 'ANOR': 'Anorí', 'VEGACH': 'Vegachí',
        'PUERTO BERRO': 'Puerto Berrío', 'YOND': 'Yondó', 'SAN JOS DE LA MONTAA': 'San José de la Montaña',
        'SAN ANDRS DE CUERQUIA': 'San Andrés de Cuerquia', 'CAROLINA DEL PRNCIPE': 'Carolina del Príncipe',
        'SAN ROQUE': 'San Roque', 'SAN VICENTE': 'San Vicente Ferrer', 'SANTO DOMINGO': 'Santo Domingo'
    }
    for k, v in replacements.items():
        if k in raw_name.upper():
            return v
    parts = raw_name.title().split()
    minor = {'De', 'Del', 'La', 'Las', 'El', 'Los', 'Y', 'En'}
    return ' '.join([p.lower() if p in minor and i > 0 else p for i, p in enumerate(parts)])

def compute_centroid_and_bounds(coords):
    pts = []
    def extract(c):
        if isinstance(c, list) and len(c) >= 2 and isinstance(c[0], (int, float)):
            pts.append((c[0], c[1]))
        elif isinstance(c, list):
            for sub in c: extract(sub)
    extract(coords)
    if not pts:
        return [6.25, -75.56], [[6.2, -75.6], [6.3, -75.5]]
    
    avg_lng = sum(p[0] for p in pts) / len(pts)
    avg_lat = sum(p[1] for p in pts) / len(pts)
    
    min_lng = min(p[0] for p in pts)
    max_lng = max(p[0] for p in pts)
    min_lat = min(p[1] for p in pts)
    max_lat = max(p[1] for p in pts)
    
    centroid = [round(avg_lat, 4), round(avg_lng, 4)]
    bounds = [[round(min_lat, 4), round(min_lng, 4)], [round(max_lat, 4), round(max_lng, 4)]]
    return centroid, bounds

def round_coords(coords, precision=4):
    if isinstance(coords, (int, float)):
        return round(coords, precision)
    if isinstance(coords, list):
        return [round_coords(c, precision) for c in coords]
    return coords

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
    if len(ring) <= 4:
        return ring
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

def build_datasets():
    print("Building 125 Municipios de Antioquia...")
    with open('temp_geojson/dane_municipios_wgs84.geojson', 'r', encoding='utf-8') as f:
        dane_data = json.load(f)

    ant_features = []
    for feat in dane_data['features']:
        props = feat.get('properties', {})
        dpto_code = str(props.get('DPTO_CCDGO', '')).zfill(2)
        if dpto_code != '05':
            continue

        mpio_code = str(props.get('MPIO_CCNCT', ''))
        raw_name = props.get('MPIO_CNMBR', '')
        name = clean_name(raw_name)
        geom = feat.get('geometry', {})
        geom_type = geom.get('type')
        coords = round_coords(geom.get('coordinates', []), 4)

        subregion = SUBREGIONS_MAP.get(mpio_code, 'Antioquia')
        color = SUBREGION_COLORS.get(subregion, '#64748b')
        centroid, bounds = compute_centroid_and_bounds(coords)

        is_med = 'Medell' in name
        pop = 2569000 if is_med else 48000
        census = 1850000 if is_med else 32000

        t_props = {
            'id': f'mpio-{mpio_code}',
            'name': name,
            'daneCode': mpio_code,
            'level': 'departamental',
            'department': 'Antioquia',
            'subregion': subregion,
            'centroid': centroid,
            'bounds': bounds,
            'population': pop,
            'electoralCensus': census,
            'nbiPercentage': 18.5 if is_med else 24.0,
            'predominantParty': 'Creemos' if subregion == 'Valle de Aburrá' else 'Centro Democrático',
            'riskLevel': 'Medio',
            'colorCode': color,
            'areaKm2': round(float(props.get('MPIO_NAREA', 0)), 1)
        }

        ant_features.append({
            'type': 'Feature',
            'id': f'mpio-{mpio_code}',
            'properties': t_props,
            'geometry': {
                'type': geom_type,
                'coordinates': coords
            }
        })

    ant_features.sort(key=lambda x: x['properties']['name'])

    ant_collection = {
        'type': 'FeatureCollection',
        'name': '125 Municipios Oficiales de Antioquia DANE',
        'level': 'departamental',
        'center': [6.55, -75.50],
        'defaultZoom': 8,
        'features': ant_features
    }

    with open('src/data/geojson/antioquia125MunicipiosGeoJson.ts', 'w', encoding='utf-8') as f:
        f.write(f"""import {{ TerritoryFeatureCollection }} from './types';

export const ANTIOQUIA_125_MUNICIPIOS_GEOJSON: TerritoryFeatureCollection = {json.dumps(ant_collection, ensure_ascii=False, indent=2)};
""")
    print("Saved antioquia125MunicipiosGeoJson.ts")

    # 2. 16 Comunas de Medellin from Downloads
    comunas_path = r'C:\Users\isaac\Downloads\Comunas_Medellin.geojson'
    if os.path.exists(comunas_path):
        print("Building 16 Comunas de Medellin from official source...")
        with open(comunas_path, 'r', encoding='utf-8') as f:
            comunas_raw = json.load(f)

        med_features = []
        for feat in comunas_raw.get('features', []):
            p = feat.get('properties', {})
            num = p.get('Numero_Comuna')
            nombre = p.get('Nombre_Comuna', '')
            geom = feat.get('geometry', {})
            raw_coords = geom.get('coordinates', [])
            opt_coords = simplify_coords(raw_coords, epsilon=0.00012)
            centroid, bounds = compute_centroid_and_bounds(opt_coords)

            t_props = {
                'id': f'comuna-{num}',
                'name': f"Comuna {num} - {nombre}",
                'shortName': nombre,
                'number': num,
                'level': 'municipal',
                'municipality': 'Medellín',
                'department': 'Antioquia',
                'centroid': centroid,
                'bounds': bounds,
                'population': 150000,
                'electoralCensus': 110000,
                'nbiPercentage': 12.0 + num * 1.5 if num > 5 else 35.0 - num * 2,
                'predominantParty': 'Creemos',
                'riskLevel': 'Alto' if num in [1, 3, 8, 13] else 'Medio',
                'colorCode': '#10b981'
            }

            med_features.append({
                'type': 'Feature',
                'id': f'comuna-{num}',
                'properties': t_props,
                'geometry': {
                    'type': geom.get('type'),
                    'coordinates': opt_coords
                }
            })

        med_features.sort(key=lambda x: x['properties']['number'])

        med_collection = {
            'type': 'FeatureCollection',
            'name': '16 Comunas Urbanas Oficiales de Medellín',
            'level': 'municipal',
            'center': [6.2518, -75.5636],
            'defaultZoom': 12,
            'features': med_features
        }

        with open('src/data/geojson/medellin16ComunasOfficialGeoJson.ts', 'w', encoding='utf-8') as f:
            f.write(f"""import {{ TerritoryFeatureCollection }} from './types';

export const MEDELLIN_16_COMUNAS_OFFICIAL_GEOJSON: TerritoryFeatureCollection = {json.dumps(med_collection, ensure_ascii=False, indent=2)};
""")
        print(f"Saved medellin16ComunasOfficialGeoJson.ts ({len(med_features)} comunas)")

if __name__ == '__main__':
    build_datasets()

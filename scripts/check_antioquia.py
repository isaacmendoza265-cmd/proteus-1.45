import json

with open(r'C:\Users\isaac\Downloads\Municipios de Antioquia.geojson', 'r', encoding='utf-8') as f:
    d = json.load(f)

print("CRS:", d.get("crs"))
for i, feat in enumerate(d.get("features", [])[:5]):
    props = feat.get("properties")
    geom = feat.get("geometry") or {}
    coords = geom.get("coordinates", [])
    
    def get_first(c):
        if isinstance(c, list):
            if len(c) >= 2 and isinstance(c[0], (int, float)):
                return c
            for sub in c:
                res = get_first(sub)
                if res:
                    return res
        return None

    first_pt = get_first(coords)
    print(f"Feature {i}: properties={props}")
    print(f"  first point: {first_pt}")

import json

with open(r'C:\Users\isaac\Downloads\Comunas_Medellin.geojson', 'r', encoding='utf-8') as f:
    d = json.load(f)

print("Comunas features count:", len(d.get("features", [])))
if d.get("features"):
    feat0 = d["features"][0]
    print("Props:", feat0.get("properties"))
    geom = feat0.get("geometry", {})
    print("Geom type:", geom.get("type"))
    coords = geom.get("coordinates", [])
    def get_pt(c):
        if isinstance(c, list) and len(c) >= 2 and isinstance(c[0], (int, float)):
            return c
        if isinstance(c, list):
            for s in c:
                res = get_pt(s)
                if res: return res
        return None
    print("First coord:", get_pt(coords))

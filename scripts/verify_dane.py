import json

with open('temp_geojson/dane_municipios_wgs84.geojson', 'r', encoding='utf-8') as f:
    data = json.load(f)

print("Total features in DANE WGS84:", len(data.get("features", [])))
first = data["features"][0]
print("First feature properties:", first.get("properties"))

# Check Antioquia
ant = [f for f in data["features"] if f.get("properties", {}).get("DPTO_CCDGO") == "05" or "ANTIOQUIA" in str(f.get("properties", {}).get("DPTO_CNMBR", "")).upper()]
print("Antioquia municipalities count:", len(ant))

# Check Medellin
med = [f for f in ant if "MEDELL" in f.get("properties", {}).get("MPIO_CNMBR", "").upper()]
if med:
    print("Medellin properties:", med[0]["properties"])
    coords = med[0]["geometry"]["coordinates"]
    def get_sample(c):
        if isinstance(c, list) and len(c) >= 2 and isinstance(c[0], (int, float)):
            return c
        if isinstance(c, list) and len(c) > 0:
            return get_sample(c[0])
        return None
    print("Medellin sample coordinate:", get_sample(coords))

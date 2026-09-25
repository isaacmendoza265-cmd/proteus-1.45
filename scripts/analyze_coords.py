import json

with open('temp_geojson/municipios_GeoJSON.geojson', 'r', encoding='utf-8') as f:
    d = json.load(f)

# Let's inspect the entire file to see if there are other keys, comments, or metadata
print("Keys:", list(d.keys()))
for k in d.keys():
    if k != 'features':
        print(f"{k}: {d[k]}")

# Let's check bounding box of the entire dataset
all_xs = []
all_ys = []

for feat in d['features']:
    geom = feat.get('geometry') or {}
    coords = geom.get('coordinates', [])
    def extract_pts(c):
        if isinstance(c, list) and len(c) >= 2 and isinstance(c[0], (int, float)):
            all_xs.append(c[0])
            all_ys.append(c[1])
        elif isinstance(c, list):
            for sub in c:
                extract_pts(sub)
    extract_pts(coords)

print(f"Total points: {len(all_xs)}")
print(f"X range: min={min(all_xs):.4f}, max={max(all_xs):.4f}, center={(min(all_xs)+max(all_xs))/2:.4f}, span={max(all_xs)-min(all_xs):.4f}")
print(f"Y range: min={min(all_ys):.4f}, max={max(all_ys):.4f}, center={(min(all_ys)+max(all_ys))/2:.4f}, span={max(all_ys)-min(all_ys):.4f}")

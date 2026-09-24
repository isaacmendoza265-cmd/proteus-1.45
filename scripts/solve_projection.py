import json

# Known real centroids (WGS84 Lon, Lat) of capital cities
capitals_real = {
    'BOGOTA, D.C.': (-74.0817, 4.6097),
    'MEDELLIN': (-75.5636, 6.2518),
    'CALI': (-76.5320, 3.4516),
    'BARRANQUILLA': (-74.7964, 10.9685),
    'CARTAGENA': (-75.5144, 10.3997),
    'BUCARAMANGA': (-73.1198, 7.1254),
    'CUCUTA': (-72.5078, 7.8939),
    'PASTO': (-77.2811, 1.2136),
    'LETICIA': (-69.9406, -4.2153),
    'ARAUCA': (-70.7587, 7.0847),
    'QUIBDO': (-76.6583, 5.6947),
    'RIOHACHA': (-72.9072, 11.5444),
    'SANTA MARTA': (-74.2110, 11.2408),
    'MONTERIA': (-75.8814, 8.7480),
    'SINCELEJO': (-75.3978, 9.3047),
    'VALLEDUPAR': (-73.2532, 10.4631),
    'POPAYAN': (-76.6063, 2.4448),
    'NEIVA': (-75.2819, 2.9273),
    'IBAGUE': (-75.2322, 4.4389),
    'MANIZALES': (-75.5174, 5.0689),
    'ARMENIA': (-75.6811, 4.5339),
    'PEREIRA': (-75.6961, 4.8133),
    'TUNJA': (-73.3678, 5.5353),
    'FLORENCIA': (-75.6062, 1.6144),
    'YOPAL': (-72.4045, 5.3378),
    'VILLAVICENCIO': (-73.6377, 4.1420),
    'PUERTO CARREÑO': (-67.4859, 6.1890),
    'INIRIDA': (-67.9239, 3.8653),
    'MITU': (-70.1733, 1.1983),
    'MOCOA': (-76.6521, 1.1478),
    'SAN JOSE DEL GUAVIARE': (-72.6459, 2.5729)
}

with open('temp_geojson/municipios_GeoJSON.geojson', 'r', encoding='utf-8') as f:
    d = json.load(f)

matched = []

for feat in d['features']:
    name = feat.get('properties', {}).get('name', '').strip()
    if name in capitals_real:
        geom = feat.get('geometry') or {}
        coords = geom.get('coordinates', [])
        xs, ys = [], []
        def get_all(c):
            if isinstance(c, list) and len(c) >= 2 and isinstance(c[0], (int, float)):
                xs.append(c[0])
                ys.append(c[1])
            elif isinstance(c, list):
                for sub in c:
                    get_all(sub)
        get_all(coords)
        if xs:
            cx = sum(xs) / len(xs)
            cy = sum(ys) / len(ys)
            rlon, rlat = capitals_real[name]
            matched.append((name, cx, cy, rlon, rlat))

print(f"Matched {len(matched)} capitals.")

# Let's test an affine transformation:
# [rlon, rlat, 1] = [cx, cy, 1] * M
# or [cx, cy, 1] = [rlon, rlat, 1] * M
# Let's solve using least squares in pure python:
# Ax = b
# We want to find:
# rlon = a * cx + b * cy + c
# rlat = d * cx + e * cy + f

# Normal equations: (X^T * X) * beta = X^T * y
X_mat = [[cx, cy, 1.0] for name, cx, cy, rlon, rlat in matched]
Y_lon = [rlon for name, cx, cy, rlon, rlat in matched]
Y_lat = [rlat for name, cx, cy, rlon, rlat in matched]

def solve_3x3(A, b):
    # A is 3x3, b is 3x1
    # Cramers rule
    def det3(m):
        return (m[0][0]*(m[1][1]*m[2][2] - m[1][2]*m[2][1])
              - m[0][1]*(m[1][0]*m[2][2] - m[1][2]*m[2][0])
              + m[0][2]*(m[1][0]*m[2][1] - m[1][1]*m[2][0]))
    D = det3(A)
    res = []
    for col in range(3):
        m_copy = [row[:] for row in A]
        for row in range(3):
            m_copy[row][col] = b[row]
        res.append(det3(m_copy) / D)
    return res

# Compute X^T * X
XTX = [[0.0]*3 for _ in range(3)]
XT_ylon = [0.0]*3
XT_ylat = [0.0]*3

for row, (cx, cy, _) in enumerate(X_mat):
    r = [cx, cy, 1.0]
    for i in range(3):
        for j in range(3):
            XTX[i][j] += r[i] * r[j]
        XT_ylon[i] += r[i] * Y_lon[row]
        XT_ylat[i] += r[i] * Y_lat[row]

beta_lon = solve_3x3(XTX, XT_ylon)
beta_lat = solve_3x3(XTX, XT_ylat)

print("Beta lon:", beta_lon)
print("Beta lat:", beta_lat)

max_err_lon = 0
max_err_lat = 0
for name, cx, cy, rlon, rlat in matched:
    pred_lon = beta_lon[0]*cx + beta_lon[1]*cy + beta_lon[2]
    pred_lat = beta_lat[0]*cx + beta_lat[1]*cy + beta_lat[2]
    err_lon = abs(pred_lon - rlon)
    err_lat = abs(pred_lat - rlat)
    max_err_lon = max(max_err_lon, err_lon)
    max_err_lat = max(max_err_lat, err_lat)

print(f"Max error across all {len(matched)} capitals: lon={max_err_lon:.4f} degrees, lat={max_err_lat:.4f} degrees")
for name, cx, cy, rlon, rlat in matched[:5]:
    pred_lon = beta_lon[0]*cx + beta_lon[1]*cy + beta_lon[2]
    pred_lat = beta_lat[0]*cx + beta_lat[1]*cy + beta_lat[2]
    print(f"{name:15}: Real=({rlon:.2f}, {rlat:.2f}), Pred=({pred_lon:.2f}, {pred_lat:.2f})")

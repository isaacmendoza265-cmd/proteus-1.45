import math

# D3 spherical rotation formula:
# In D3, rotation [lambda0, phi0, gamma0] applies:
# 1. Rotate longitude by lambda0
# 2. Rotate latitude by phi0
# 3. Rotate by roll gamma0
# Specifically, for rotation [a, b] (gamma=0):
# Given spherical point (lon, lat) in radians:
# x = cos(phi) * cos(lon)
# y = cos(phi) * sin(lon)
# z = sin(phi)
#
# D3 rotation uses:
# R = Ry(b) * Rz(a)
# Let's test standard D3 inverse rotation!

def to_rad(d): return d * math.pi / 180.0
def to_deg(r): return r * 180.0 / math.pi

def d3_rotate_invert(x_deg, y_deg, a_deg, b_deg, g_deg=0):
    # D3 geoRotation: forward is:
    # point -> R(point)
    # invert is:
    # point -> R^-1(point)
    #
    # In D3:
    # forward:
    # lambda += a
    # then rotate around Y axis by -b (or +b)
    # Let's check D3 source code for geoRotation:
    # function rotateRadians(deltaLambda, deltaPhi, deltaGamma)
    #   cosDeltaPhi = cos(deltaPhi), sinDeltaPhi = sin(deltaPhi)
    #   cosDeltaGamma = cos(deltaGamma), sinDeltaGamma = sin(deltaGamma)
    #   ...
    pass

# Let's check using python with scipy or custom 3D rotation matrix
import json

# Let's test against our 31 known capital points:
with open('temp_geojson/municipios_GeoJSON.geojson', 'r', encoding='utf-8') as f:
    d = json.load(f)

# Find Medellin and Bogota in d:
med = None
bog = None
for f in d['features']:
    if f['properties']['name'] == 'MEDELLIN':
        med = f
    elif 'BOGOTA' in f['properties']['name']:
        bog = f

def get_center(feat):
    coords = feat['geometry']['coordinates']
    xs, ys = [], []
    def get_all(c):
        if isinstance(c, list) and len(c) >= 2 and isinstance(c[0], (int, float)):
            xs.append(c[0]); ys.append(c[1])
        elif isinstance(c, list):
            for s in c: get_all(s)
    get_all(coords)
    return sum(xs)/len(xs), sum(ys)/len(ys)

print("Medellin coords in file:", get_center(med))
print("Bogota coords in file:", get_center(bog))

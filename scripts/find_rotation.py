import math, json

# D3 rotation definition:
# Given Euler angles: rotate([alpha, beta, gamma])
# In D3.js:
# function rotateRadians(deltaLambda, deltaPhi, deltaGamma) {
#   return deltaLambda || deltaPhi || deltaGamma
#       ? compose(
#           deltaLambda ? rotationLambda(deltaLambda) : identity,
#           deltaPhi ? rotationPhi(deltaPhi) : identity,
#           deltaGamma ? rotationGamma(deltaGamma) : identity)
#       : identity;
# }
#
# Let's write the 3D rotation:
# Point on unit sphere:
# X = cos(lat) * cos(lon)
# Y = cos(lat) * sin(lon)
# Z = sin(lat)

def spherical_to_cartesian(lon_deg, lat_deg):
    lon = math.radians(lon_deg)
    lat = math.radians(lat_deg)
    return (
        math.cos(lat) * math.cos(lon),
        math.cos(lat) * math.sin(lon),
        math.sin(lat)
    )

def cartesian_to_spherical(x, y, z):
    # normalize
    r = math.sqrt(x*x + y*y + z*z)
    if r == 0: return 0.0, 0.0
    x, y, z = x/r, y/r, z/r
    lat = math.asin(max(-1.0, min(1.0, z)))
    lon = math.atan2(y, x)
    return math.degrees(lon), math.degrees(lat)

# Let's test the rotation angles:
# If the original coords (lon_orig, lat_orig) were rotated by (a, b, g) to get (lon_file, lat_file):
# Then (lon_orig, lat_orig) can be recovered by inverse rotation!
# Let's test different candidate angles [a, b, g] or optimize them!

# Reference points:
refs = [
    ('SANTAFE DE BOGOTA D.C.', -74.0817, 4.6097),
    ('MEDELLIN', -75.5636, 6.2518),
    ('CALI', -76.5320, 3.4516),
    ('BARRANQUILLA', -74.7964, 10.9685),
    ('LETICIA', -69.9406, -4.2153),
    ('PASTO', -77.2811, 1.2136),
    ('CUCUTA', -72.5078, 7.8939),
    ('ARAUCA', -70.7587, 7.0847),
    ('QUIBDO', -76.6583, 5.6947),
]

with open('temp_geojson/municipios_GeoJSON.geojson', 'r', encoding='utf-8') as f:
    d = json.load(f)

file_pts = {}
for feat in d['features']:
    name = feat.get('properties', {}).get('name', '').strip()
    for ref_name, rlon, rlat in refs:
        if name == ref_name:
            coords = feat['geometry']['coordinates']
            xs, ys = [], []
            def get_all(c):
                if isinstance(c, list) and len(c) >= 2 and isinstance(c[0], (int, float)):
                    xs.append(c[0]); ys.append(c[1])
                elif isinstance(c, list):
                    for s in c: get_all(s)
            get_all(coords)
            file_pts[ref_name] = (sum(xs)/len(xs), sum(ys)/len(ys))

print("Found file points for refs:")
for name, rlon, rlat in refs:
    print(f"  {name:15}: file={file_pts[name]}, real=({rlon}, {rlat})")

# Let's test standard D3 rotation matrix Ry(beta) * Rz(alpha)
# Forward:
# [x']   [ cos(b)  0  -sin(b) ] [ cos(a) -sin(a) 0 ] [x]
# [y'] = [   0     1     0    ] [ sin(a)  cos(a) 0 ] [y]
# [z']   [ sin(b)  0   cos(b) ] [   0       0    1 ] [z]
#
# Let's test grid search over alpha and beta:
best_loss = 1e9
best_angles = None

for a_deg in range(-180, 181, 2):
    a = math.radians(a_deg)
    ca, sa = math.cos(a), math.sin(a)
    for b_deg in range(-90, 91, 2):
        b = math.radians(b_deg)
        cb, sb = math.cos(b), math.sin(b)
        
        # Test forward on refs:
        loss = 0
        for name, rlon, rlat in refs:
            fx, fy = file_pts[name]
            # Real unit vec:
            rx, ry, rz = spherical_to_cartesian(rlon, rlat)
            # Apply Rz(a):
            x1 = ca * rx - sa * ry
            y1 = sa * rx + ca * ry
            z1 = rz
            # Apply Ry(b):
            x2 = cb * x1 - sb * z1
            y2 = y1
            z2 = sb * x1 + cb * z1
            
            plon, plat = cartesian_to_spherical(x2, y2, z2)
            dlon = plon - fx
            dlat = plat - fy
            loss += dlon*dlon + dlat*dlat
        
        if loss < best_loss:
            best_loss = loss
            best_angles = (a_deg, b_deg)

print(f"Best coarse angles: a={best_angles[0]}, b={best_angles[1]} with loss={best_loss:.2f}")

# Fine search
a_coarse, b_coarse = best_angles
for da in [x*0.1 for x in range(-25, 26)]:
    a = math.radians(a_coarse + da)
    ca, sa = math.cos(a), math.sin(a)
    for db in [x*0.1 for x in range(-25, 26)]:
        b = math.radians(b_coarse + db)
        cb, sb = math.cos(b), math.sin(b)
        loss = 0
        for name, rlon, rlat in refs:
            fx, fy = file_pts[name]
            rx, ry, rz = spherical_to_cartesian(rlon, rlat)
            x1 = ca * rx - sa * ry
            y1 = sa * rx + ca * ry
            z1 = rz
            x2 = cb * x1 - sb * z1
            y2 = y1
            z2 = sb * x1 + cb * z1
            plon, plat = cartesian_to_spherical(x2, y2, z2)
            loss += (plon - fx)**2 + (plat - fy)**2
        if loss < best_loss:
            best_loss = loss
            best_angles = (a_coarse + da, b_coarse + db)

print(f"Best fine angles: alpha={best_angles[0]:.2f}, beta={best_angles[1]:.2f} with RMSE={math.sqrt(best_loss/len(refs)):.4f} deg")

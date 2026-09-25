# -*- coding: utf-8 -*-
import json
import math

# Load antioquia125MunicipiosGeoJson.ts
with open('src/data/geojson/antioquia125MunicipiosGeoJson.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Extract json inside ANTIOQUIA_125_MUNICIPIOS_GEOJSON = { ... }
start_pos = text.find('{')
end_pos = text.rfind('};')
json_str = text[start_pos:end_pos+1]
data = json.loads(json_str)

medellin_feat = None
for feat in data['features']:
    if feat['properties']['name'] == 'Medellín':
        medellin_feat = feat
        break

print("Medellín feature found:", medellin_feat is not None)
if medellin_feat:
    coords = medellin_feat['geometry']['coordinates']
    print("Geometry type:", medellin_feat['geometry']['type'], "coord rings:", len(coords), "pts in ring 0:", len(coords[0]))

# Function to generate a smooth circular polygon (32 points) given centroid and radius in km
def make_circle_polygon(lat, lon, radius_km, num_points=32):
    coords = []
    # 1 deg lat = ~111 km
    lat_deg_per_km = 1.0 / 110.574
    # 1 deg lon = ~111 * cos(lat) km
    lon_deg_per_km = 1.0 / (111.320 * math.cos(math.radians(lat)))
    
    for i in range(num_points):
        angle = 2.0 * math.pi * i / num_points
        d_lat = radius_km * math.sin(angle) * lat_deg_per_km
        d_lon = radius_km * math.cos(angle) * lon_deg_per_km
        coords.append([round(lon + d_lon, 6), round(lat + d_lat, 6)])
    # Close polygon
    coords.append(coords[0])
    return [coords]

corregs = [
    {
        "id": "med-correg-palmitas",
        "name": "Corregimiento San Sebastián de Palmitas",
        "shortName": "Palmitas",
        "number": 50,
        "centroid": [6.335, -75.685],
        "radius_km": 2.8,
        "population": 9450,
        "electoralCensus": 6230,
        "nbiPercentage": 14.8,
        "predominantParty": "Creemos",
        "predominantStratum": "Bajo (1-2)",
        "winnerParty": "Creemos",
        "winnerCandidate": "Federico Gutiérrez",
        "riskLevel": "Bajo",
        "colorCode": "#14b8a6"
    },
    {
        "id": "med-correg-san-cristobal",
        "name": "Corregimiento San Cristóbal",
        "shortName": "San Cristóbal",
        "number": 60,
        "centroid": [6.285, -75.635],
        "radius_km": 2.5,
        "population": 112450,
        "electoralCensus": 68910,
        "nbiPercentage": 10.6,
        "predominantParty": "Creemos",
        "predominantStratum": "Bajo-Medio (1-3)",
        "winnerParty": "Creemos",
        "winnerCandidate": "Federico Gutiérrez",
        "riskLevel": "Medio",
        "colorCode": "#06b6d4"
    },
    {
        "id": "med-correg-altavista",
        "name": "Corregimiento Altavista",
        "shortName": "Altavista",
        "number": 70,
        "centroid": [6.215, -75.635],
        "radius_km": 2.2,
        "population": 41250,
        "electoralCensus": 24510,
        "nbiPercentage": 12.3,
        "predominantParty": "Creemos",
        "predominantStratum": "Bajo (1-2)",
        "winnerParty": "Creemos",
        "winnerCandidate": "Federico Gutiérrez",
        "riskLevel": "Medio",
        "colorCode": "#0284c7"
    },
    {
        "id": "med-correg-san-antonio-de-prado",
        "name": "Corregimiento San Antonio de Prado",
        "shortName": "San Antonio de Prado",
        "number": 80,
        "centroid": [6.185, -75.645],
        "radius_km": 2.5,
        "population": 154210,
        "electoralCensus": 92450,
        "nbiPercentage": 8.7,
        "predominantParty": "Creemos",
        "predominantStratum": "Medio-Bajo (2-3)",
        "winnerParty": "Creemos",
        "winnerCandidate": "Federico Gutiérrez",
        "riskLevel": "Bajo",
        "colorCode": "#3b82f6"
    },
    {
        "id": "med-correg-santa-elena",
        "name": "Corregimiento Santa Elena",
        "shortName": "Santa Elena",
        "number": 90,
        "centroid": [6.225, -75.495],
        "radius_km": 3.0,
        "population": 26450,
        "electoralCensus": 18920,
        "nbiPercentage": 9.9,
        "predominantParty": "Creemos",
        "predominantStratum": "Mixto (2-5)",
        "winnerParty": "Creemos",
        "winnerCandidate": "Federico Gutiérrez",
        "riskLevel": "Bajo",
        "colorCode": "#10b981"
    }
]

print("Generated circles test:")
for c in corregs:
    poly = make_circle_polygon(c['centroid'][0], c['centroid'][1], c['radius_km'])
    print(c['shortName'], "points:", len(poly[0]), "first pt:", poly[0][0])

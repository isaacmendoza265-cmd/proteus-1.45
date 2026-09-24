import json

corregs_data = [
    {
        "id": "med-correg-palmitas",
        "name": "Corregimiento San Sebastián de Palmitas",
        "shortName": "Palmitas",
        "number": 50,
        "level": "municipal",
        "municipality": "Medellín",
        "department": "Antioquia",
        "zone": "Rural",
        "centroid": [6.335, -75.685],
        "bounds": [[6.305, -75.720], [6.365, -75.650]],
        "population": 9450,
        "electoralCensus": 6230,
        "nbiPercentage": 14.8,
        "predominantParty": "Creemos",
        "predominantStratum": "Bajo (1-2)",
        "winnerParty": "Creemos",
        "winnerCandidate": "Federico Gutiérrez",
        "riskLevel": "Bajo",
        "colorCode": "#14b8a6",
        "coordinates": [
            [
                [-75.718, 6.362], [-75.652, 6.358], [-75.655, 6.310],
                [-75.715, 6.312], [-75.718, 6.362]
            ]
        ]
    },
    {
        "id": "med-correg-san-cristobal",
        "name": "Corregimiento San Cristóbal",
        "shortName": "San Cristóbal",
        "number": 60,
        "level": "municipal",
        "municipality": "Medellín",
        "department": "Antioquia",
        "zone": "Rural",
        "centroid": [6.285, -75.635],
        "bounds": [[6.260, -75.665], [6.315, -75.605]],
        "population": 112450,
        "electoralCensus": 68910,
        "nbiPercentage": 10.6,
        "predominantParty": "Creemos",
        "predominantStratum": "Bajo-Medio (1-3)",
        "winnerParty": "Creemos",
        "winnerCandidate": "Federico Gutiérrez",
        "riskLevel": "Medio",
        "colorCode": "#06b6d4",
        "coordinates": [
            [
                [-75.662, 6.312], [-75.608, 6.308], [-75.612, 6.262],
                [-75.665, 6.265], [-75.662, 6.312]
            ]
        ]
    },
    {
        "id": "med-correg-altavista",
        "name": "Corregimiento Altavista",
        "shortName": "Altavista",
        "number": 70,
        "level": "municipal",
        "municipality": "Medellín",
        "department": "Antioquia",
        "zone": "Rural",
        "centroid": [6.230, -75.640],
        "bounds": [[6.210, -75.665], [6.255, -75.615]],
        "population": 41250,
        "electoralCensus": 24510,
        "nbiPercentage": 10.2,
        "predominantParty": "Creemos",
        "predominantStratum": "Bajo (1-2)",
        "winnerParty": "Creemos",
        "winnerCandidate": "Federico Gutiérrez",
        "riskLevel": "Medio",
        "colorCode": "#0284c7",
        "coordinates": [
            [
                [-75.662, 6.252], [-75.618, 6.250], [-75.620, 6.212],
                [-75.664, 6.215], [-75.662, 6.252]
            ]
        ]
    },
    {
        "id": "med-correg-san-antonio-de-prado",
        "name": "Corregimiento San Antonio de Prado",
        "shortName": "San Antonio de Prado",
        "number": 80,
        "level": "municipal",
        "municipality": "Medellín",
        "department": "Antioquia",
        "zone": "Rural",
        "centroid": [6.185, -75.635],
        "bounds": [[6.160, -75.665], [6.210, -75.605]],
        "population": 154210,
        "electoralCensus": 92450,
        "nbiPercentage": 7.9,
        "predominantParty": "Creemos",
        "predominantStratum": "Medio-Bajo (2-3)",
        "winnerParty": "Creemos",
        "winnerCandidate": "Federico Gutiérrez",
        "riskLevel": "Medio",
        "colorCode": "#3b82f6",
        "coordinates": [
            [
                [-75.662, 6.208], [-75.608, 6.205], [-75.610, 6.162],
                [-75.665, 6.164], [-75.662, 6.208]
            ]
        ]
    },
    {
        "id": "med-correg-santa-elena",
        "name": "Corregimiento Santa Elena",
        "shortName": "Santa Elena",
        "number": 90,
        "level": "municipal",
        "municipality": "Medellín",
        "department": "Antioquia",
        "zone": "Rural",
        "centroid": [6.225, -75.495],
        "bounds": [[6.190, -75.535], [6.260, -75.460]],
        "population": 26450,
        "electoralCensus": 18920,
        "nbiPercentage": 9.9,
        "predominantParty": "Creemos",
        "predominantStratum": "Mixto (2-5)",
        "winnerParty": "Creemos",
        "winnerCandidate": "Federico Gutiérrez",
        "riskLevel": "Bajo",
        "colorCode": "#10b981",
        "coordinates": [
            [
                [-75.532, 6.258], [-75.462, 6.254], [-75.465, 6.192],
                [-75.535, 6.195], [-75.532, 6.258]
            ]
        ]
    }
]

with open('SUBIR_A_GITHUB/src/data/geojson/medellin16ComunasOfficialGeoJson.ts', 'r', encoding='utf-8') as f:
    orig = f.read()

# Find the start of the object after '= {'
start = orig.find('= {') + 2
end = orig.rfind('}') + 1
base_json = json.loads(orig[start:end])

# Append the 5 corregimientos
for c in corregs_data:
    feat = {
        "type": "Feature",
        "id": c["id"],
        "properties": {
            "id": c["id"],
            "name": c["name"],
            "shortName": c["shortName"],
            "number": c["number"],
            "level": c["level"],
            "municipality": c["municipality"],
            "department": c["department"],
            "zone": c["zone"],
            "centroid": c["centroid"],
            "bounds": c["bounds"],
            "population": c["population"],
            "electoralCensus": c["electoralCensus"],
            "nbiPercentage": c["nbiPercentage"],
            "predominantParty": c["predominantParty"],
            "predominantStratum": c["predominantStratum"],
            "winnerParty": c["winnerParty"],
            "winnerCandidate": c["winnerCandidate"],
            "riskLevel": c["riskLevel"],
            "colorCode": c["colorCode"]
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": c["coordinates"]
        }
    }
    base_json["features"].append(feat)

base_json["name"] = "Medellín - 16 Comunas Urbanas y 5 Corregimientos Rurales"

# Write out cleanly
header = "import { TerritoryFeatureCollection } from './types';\n\nexport const MEDELLIN_16_COMUNAS_OFFICIAL_GEOJSON: TerritoryFeatureCollection = "
with open('src/data/geojson/medellin16ComunasOfficialGeoJson.ts', 'w', encoding='utf-8') as f:
    f.write(header + json.dumps(base_json, indent=2, ensure_ascii=False) + ';\n')

print(f"Success! Total features: {len(base_json['features'])}")

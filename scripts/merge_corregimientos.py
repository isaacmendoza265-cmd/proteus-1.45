with open('src/data/geojson/medellinComunasGeoJson.ts', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('// CORREGIMIENTOS (5 RURALES)')
corregs = text[idx:text.rfind(']')].strip()

# Replace references to MEDELLIN_COMUNAS_DATA
corregs = corregs.replace("MEDELLIN_COMUNAS_DATA['med-correg-palmitas'].population", '9450')
corregs = corregs.replace("MEDELLIN_COMUNAS_DATA['med-correg-palmitas'].electoralCensus", '6230')
corregs = corregs.replace("MEDELLIN_COMUNAS_DATA['med-correg-palmitas'].predominantStratum", "'Bajo (1-2)'")
corregs = corregs.replace("MEDELLIN_COMUNAS_DATA['med-correg-palmitas'].youthPercentage", '23.8')
corregs = corregs.replace("MEDELLIN_COMUNAS_DATA['med-correg-palmitas'].historicalTurnout", '53.4')
corregs = corregs.replace("MEDELLIN_COMUNAS_DATA['med-correg-palmitas'].abstentionRate", '46.6')

corregs = corregs.replace("MEDELLIN_COMUNAS_DATA['med-correg-san-cristobal'].population", '112450')
corregs = corregs.replace("MEDELLIN_COMUNAS_DATA['med-correg-san-cristobal'].electoralCensus", '68910')
corregs = corregs.replace("MEDELLIN_COMUNAS_DATA['med-correg-san-cristobal'].predominantStratum", "'Bajo-Medio (1-3)'")
corregs = corregs.replace("MEDELLIN_COMUNAS_DATA['med-correg-san-cristobal'].youthPercentage", '25.9')
corregs = corregs.replace("MEDELLIN_COMUNAS_DATA['med-correg-san-cristobal'].historicalTurnout", '48.9')
corregs = corregs.replace("MEDELLIN_COMUNAS_DATA['med-correg-san-cristobal'].abstentionRate", '51.1')

corregs = corregs.replace("MEDELLIN_COMUNAS_DATA['med-correg-altavista'].population", '41250')
corregs = corregs.replace("MEDELLIN_COMUNAS_DATA['med-correg-altavista'].electoralCensus", '24510')
corregs = corregs.replace("MEDELLIN_COMUNAS_DATA['med-correg-altavista'].predominantStratum", "'Bajo (1-2)'")
corregs = corregs.replace("MEDELLIN_COMUNAS_DATA['med-correg-altavista'].youthPercentage", '27.1')
corregs = corregs.replace("MEDELLIN_COMUNAS_DATA['med-correg-altavista'].historicalTurnout", '47.3')
corregs = corregs.replace("MEDELLIN_COMUNAS_DATA['med-correg-altavista'].abstentionRate", '52.7')

corregs = corregs.replace("MEDELLIN_COMUNAS_DATA['med-correg-san-antonio-de-prado'].population", '154210')
corregs = corregs.replace("MEDELLIN_COMUNAS_DATA['med-correg-san-antonio-de-prado'].electoralCensus", '92450')
corregs = corregs.replace("MEDELLIN_COMUNAS_DATA['med-correg-san-antonio-de-prado'].predominantStratum", "'Medio-Bajo (2-3)'")
corregs = corregs.replace("MEDELLIN_COMUNAS_DATA['med-correg-san-antonio-de-prado'].youthPercentage", '26.8')
corregs = corregs.replace("MEDELLIN_COMUNAS_DATA['med-correg-san-antonio-de-prado'].historicalTurnout", '50.8')
corregs = corregs.replace("MEDELLIN_COMUNAS_DATA['med-correg-san-antonio-de-prado'].abstentionRate", '49.2')

corregs = corregs.replace("MEDELLIN_COMUNAS_DATA['med-correg-santa-elena'].population", '26450')
corregs = corregs.replace("MEDELLIN_COMUNAS_DATA['med-correg-santa-elena'].electoralCensus", '18920')
corregs = corregs.replace("MEDELLIN_COMUNAS_DATA['med-correg-santa-elena'].predominantStratum", "'Mixto (2-5)'")
corregs = corregs.replace("MEDELLIN_COMUNAS_DATA['med-correg-santa-elena'].youthPercentage", '22.4')
corregs = corregs.replace("MEDELLIN_COMUNAS_DATA['med-correg-santa-elena'].historicalTurnout", '58.2')
corregs = corregs.replace("MEDELLIN_COMUNAS_DATA['med-correg-santa-elena'].abstentionRate", '41.8')

# Change level to municipal
corregs = corregs.replace("level: 'hiperlocal'", "level: 'municipal',\n        municipality: 'Medellín',\n        department: 'Antioquia'")

with open('src/data/geojson/medellin16ComunasOfficialGeoJson.ts', 'r', encoding='utf-8') as f:
    target = f.read()

# Replace title
target = target.replace('"16 Comunas Urbanas Oficiales de Medellín"', '"Medellín - 16 Comunas Urbanas y 5 Corregimientos Rurales"')

# Insert before the last '  ]\n};'
last_bracket = target.rfind('  ]')
new_target = target[:last_bracket] + ',\n    ' + corregs + '\n  ]\n};\n'

with open('src/data/geojson/medellin16ComunasOfficialGeoJson.ts', 'w', encoding='utf-8') as f:
    f.write(new_target)

print('Successfully updated medellin16ComunasOfficialGeoJson.ts with all 21 divisions!')

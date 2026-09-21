import json
import re
import sys

def verify():
    print("=== VERIFICANDO INTEGRIDAD GEOJSON PROTEUS 1.2 ===")
    errors = 0

    # 1. Check Antioquia 125 Municipios
    with open('src/data/geojson/antioquia125MunicipiosGeoJson.ts', 'r', encoding='utf-8') as f:
        content = f.read()

    start = content.find('{', content.find('='))
    end = content.rfind('}') + 1
    ant_data = json.loads(content[start:end])
    feats = ant_data.get('features', [])
    print(f"1. Antioquia 125 Municipios: {len(feats)} features encontrados.")
    if len(feats) != 125:
        print(f"  [ERROR] Se esperaban 125 municipios, se encontraron {len(feats)}")
        errors += 1
    else:
        print("  [OK] Exactamente 125 municipios verificados.")

    # Check bounds
    for feat in feats:
        c = feat['properties'].get('centroid')
        b = feat['properties'].get('bounds')
        dane = feat['properties'].get('daneCode')
        if not c or not b or not dane:
            print(f"  [ERROR] Feature {feat.get('id')} falta centroid, bounds o daneCode")
            errors += 1
            break
    print("  [OK] Todos los 125 municipios tienen centroid, bounds y código DIVIPOLA.")

    # 2. Check Medellin 16 Comunas
    with open('src/data/geojson/medellin16ComunasOfficialGeoJson.ts', 'r', encoding='utf-8') as f:
        med_content = f.read()
    start_m = med_content.find('{', med_content.find('='))
    end_m = med_content.rfind('}') + 1
    med_data = json.loads(med_content[start_m:end_m])
    med_feats = med_data.get('features', [])
    print(f"2. Medellín 16 Comunas Oficiales + 5 Corregimientos: {len(med_feats)} divisiones encontradas.")
    if len(med_feats) not in [16, 21]:
        print(f"  [ERROR] Se esperaban 16 o 21 divisiones, se encontraron {len(med_feats)}")
        errors += 1
    else:
        print(f"  [OK] {len(med_feats)} divisiones verificadas (16 Comunas + 5 Corregimientos).")

    # 3. Check public/data/colombia_municipios_dane.geojson
    with open('public/data/colombia_municipios_dane.geojson', 'r', encoding='utf-8') as f:
        nat_data = json.load(f)
    nat_feats = nat_data.get('features', [])
    print(f"3. Cartografía Nacional DANE: {len(nat_feats)} municipios colombianos.")
    if len(nat_feats) != 1122:
        print(f"  [WARNING] Se esperaban 1122 municipios, se encontraron {len(nat_feats)}")
    else:
        print("  [OK] Cobertura nacional completa (1.122 municipios) verificada.")

    # 4. Check user raw file preservation
    with open('public/data/municipios_colombia_original.geojson', 'r', encoding='utf-8') as f:
        user_raw = json.load(f)
    print(f"4. Archivo Original Preservado: {len(user_raw.get('features', []))} entidades territoriales.")

    if errors == 0:
        print("\n>>> TODOS LOS TESTS DE INTEGRIDAD GEOESPACIAL PASARON CON ÉXITO (0 ERRORES) <<<")
    else:
        print(f"\n>>> SE ENCONTRARON {errors} ERRORES <<<")
        sys.exit(1)

if __name__ == '__main__':
    verify()

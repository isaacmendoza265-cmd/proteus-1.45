import os
import shutil
import re

BASE_DIR = r"c:\Users\isaac\OneDrive\Documentos\Proyecto Proteus"
E24_SRC = r"C:\Users\isaac\antigravity\Resultados-Electorales-E-24-Medellín\src"
COMUNAS_SRC = r"C:\Users\isaac\antigravity\Observatorio-de-Comunas-de-Medellín\src"
ANTIOQUIA_SRC = r"C:\Users\isaac\antigravity\Observatorio-Electoral-Antioquia-2023\src"

DATA_TARGET = os.path.join(BASE_DIR, "src", "data")
E24_TARGET = os.path.join(DATA_TARGET, "e24")
COMUNAS_TARGET = os.path.join(DATA_TARGET, "observatorioComunas")
ANTIOQUIA_TARGET = os.path.join(DATA_TARGET, "observatorioAntioquia")

os.makedirs(E24_TARGET, exist_ok=True)
os.makedirs(COMUNAS_TARGET, exist_ok=True)
os.makedirs(ANTIOQUIA_TARGET, exist_ok=True)

print("1. Migrating E-24 Medellín Data...")
# Copy E24 types
shutil.copy(os.path.join(E24_SRC, "types.ts"), os.path.join(E24_TARGET, "types.ts"))

# Copy all files from e24 data folder
for f in os.listdir(os.path.join(E24_SRC, "data")):
    if f.endswith(".ts"):
        src_path = os.path.join(E24_SRC, "data", f)
        dst_path = os.path.join(E24_TARGET, f)
        with open(src_path, "r", encoding="utf-8") as file:
            content = file.read()
        # Fix imports: '../types' -> './types'
        content = content.replace("from '../types'", "from './types'")
        content = content.replace('from "../types"', 'from "./types"')
        with open(dst_path, "w", encoding="utf-8") as file:
            file.write(content)
        print(f"  Copied {f}")

print("\n2. Migrating Observatorio de Comunas Data...")
shutil.copy(os.path.join(COMUNAS_SRC, "types.ts"), os.path.join(COMUNAS_TARGET, "types.ts"))
for f in os.listdir(os.path.join(COMUNAS_SRC, "data")):
    if f.endswith(".ts"):
        src_path = os.path.join(COMUNAS_SRC, "data", f)
        dst_path = os.path.join(COMUNAS_TARGET, f)
        with open(src_path, "r", encoding="utf-8") as file:
            content = file.read()
        content = content.replace("from '../types'", "from './types'")
        content = content.replace('from "../types"', 'from "./types"')
        with open(dst_path, "w", encoding="utf-8") as file:
            file.write(content)
        print(f"  Copied {f}")

print("\n3. Migrating Observatorio Electoral Antioquia Data...")
shutil.copy(os.path.join(ANTIOQUIA_SRC, "types.ts"), os.path.join(ANTIOQUIA_TARGET, "types.ts"))
for f in os.listdir(os.path.join(ANTIOQUIA_SRC, "data")):
    if f.endswith(".ts"):
        src_path = os.path.join(ANTIOQUIA_SRC, "data", f)
        dst_path = os.path.join(ANTIOQUIA_TARGET, f)
        with open(src_path, "r", encoding="utf-8") as file:
            content = file.read()
        content = content.replace("from '../types'", "from './types'")
        content = content.replace('from "../types"', 'from "./types"')
        with open(dst_path, "w", encoding="utf-8") as file:
            file.write(content)
        print(f"  Copied {f}")

print("\nMigration completed successfully!")

# -*- coding: utf-8 -*-
import os
import json
import re

print("=== CHECKING MUNICIPAL MASTER DATA IN ROOT & SUBIR_A_GITHUB ===")

def inspect_file(filepath):
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        return
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    print(f"\n--- Inspecting {filepath} ({len(content):,} chars) ---")
    
    # Search for Abejorral
    m = re.search(r'\{\s*"id":\s*"mpio-05002"[\s\S]*?\n  \},', content)
    if m:
        print("Found Abejorral:")
        print(m.group(0))
    else:
        print("Abejorral NOT found in master data!")

inspect_file("src/data/antioquia125MunicipalitiesMasterData.ts")
inspect_file("SUBIR_A_GITHUB/src/data/antioquia125MunicipalitiesMasterData.ts")

# Check if MunicipalRepositoryExplorerView uses municipalRepository
with open("src/modules/repository/MunicipalRepositoryExplorerView.tsx", "r", encoding="utf-8") as f:
    repo_view = f.read()

print("\n--- In MunicipalRepositoryExplorerView.tsx ---")
print("allRecords count logic:", "municipalRepository.getAll()" in repo_view)

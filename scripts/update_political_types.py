# -*- coding: utf-8 -*-
"""
Script para enriquecer politicalHousesMasterData.ts:
1. Agrega partyId y partyName a los nodos.
2. Agrega los concejales y agentes políticos locales ausentes para cada partido.
3. Agrega las aristas de jerarquía hacia los líderes de sus respectivos partidos.
"""

# Let's inspect the types file first to ensure partyId and partyName are present
with open('src/data/politicalHouses/types.ts', 'r', encoding='utf-8') as f:
    types_code = f.read()

if 'partyId?: string;' not in types_code:
    types_code = types_code.replace(
        "roleLabel: string;        // 'Senador de la República (2022-2026)', etc.",
        "roleLabel: string;        // 'Senador de la República (2022-2026)', etc.\n  partyId?: string;\n  partyName?: string;"
    )
    with open('src/data/politicalHouses/types.ts', 'w', encoding='utf-8') as f:
        f.write(types_code)
    print("Updated types.ts with partyId and partyName!")
else:
    print("types.ts already has partyId!")

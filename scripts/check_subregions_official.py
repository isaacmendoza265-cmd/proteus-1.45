with open('src/data/antioquiaSubregionesData.ts', encoding='utf-8') as f:
    c = f.read()

import re
subregions = re.findall(r'id:\s*["\']sub-([^"\']+)["\'],\s*name:\s*["\']([^"\']+)["\'][\s\S]*?municipalities:\s*\[([\s\S]*?)\]', c)
print(f"Found {len(subregions)} subregions:")
all_sub_munis = {}
for sid, sname, munis_str in subregions:
    m_list = re.findall(r'["\']([^"\']+)["\']', munis_str)
    print(f"  - {sname}: {len(m_list)} municipalities -> {m_list[:4]}...")
    for m in m_list:
        all_sub_munis[m] = sname

print(f"\nTotal municipalities listed across subregions: {len(all_sub_munis)}")

with open("src/data/antioquiaData.ts", "r", encoding="utf-8") as f:
    lines = f.readlines()

in_nm = False
keys = []
for l in lines:
    if "export const NATIONAL_MUNICIPALITIES" in l:
        in_nm = True
        continue
    if in_nm:
        if l.startswith('  "') and l.strip().endswith('{'):
            keys.append(l.strip())
        elif l.startswith('};'):
            break

print("Total keys in NATIONAL_MUNICIPALITIES:", len(keys))
for k in keys:
    print("  ", k)

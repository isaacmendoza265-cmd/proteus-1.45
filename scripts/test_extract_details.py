import json
import re
import unicodedata

def norm(s):
    if not s: return ""
    s = unicodedata.normalize('NFKD', s).encode('ASCII', 'ignore').decode('utf-8').lower().strip()
    s = s.replace("el ", "").replace("la ", "").replace("los ", "").replace("las ", "")
    s = s.replace(" del principe", "").replace(" de los milagros", "").replace(" de cuerquia", "")
    s = s.replace(" de la montana", "").replace(" de antioquia", "").replace(" de uraba", "")
    s = s.replace(" mantequilla", "").replace(", distrito de ciencia, tecnologia e innovacion", "")
    s = s.replace(" de viboral", "").replace(", distrito portuario, logistico, industrial, turistico y comercial", "")
    return s.strip()

with open("src/data/antioquiaData.ts", encoding="utf-8") as f:
    antioquia_data = f.read()

# Extract MUNICIPALITY_DETAILS keys and bodies
muni_details = {}
pattern = r'^\s*["\']([^"\']+)["\']:\s*\{([\s\S]*?)\n\s*\},'
# We look between MUNICIPALITY_DETAILS and VOTING_DATA
start = antioquia_data.find('export const MUNICIPALITY_DETAILS')
end = antioquia_data.find('export const VOTING_DATA')
section = antioquia_data[start:end]

for m in re.finditer(r'^\s*["\']([^"\']+)["\']:\s*\{([\s\S]*?)\n  \},', section, re.M):
    m_name = m.group(1)
    body = m.group(2)
    muni_details[norm(m_name)] = {
        "raw_name": m_name,
        "body": body
    }

print(f"Extracted {len(muni_details)} detailed entries from MUNICIPALITY_DETAILS")

# Test extracting fields from a sample body
sample = list(muni_details.values())[0]
print("Sample raw name:", sample["raw_name"])
# Extract security
sec_m = re.search(r'security:\s*\{([\s\S]*?)\}', sample["body"])
if sec_m:
    print("Security found:", sec_m.group(1)[:200])

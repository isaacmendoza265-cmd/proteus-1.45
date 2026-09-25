import zipfile
import xml.etree.ElementTree as ET
import json

doc_path = r"c:\Users\isaac\OneDrive\Documentos\Informe electoral Antioquia Paloma Valencia.docx"
z = zipfile.ZipFile(doc_path)
tree = ET.fromstring(z.read('word/document.xml'))

paras = []
for p in tree.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p'):
    texts = [t.text for t in p.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t') if t.text]
    if texts:
        paras.append(''.join(texts))

# Find all subregions
subreg_paras = {}
cur_sub = None
for p in paras:
    p_strip = p.strip()
    if p_strip.startswith("Subregi") or "Valle de Aburr" in p_strip:
        for sname in ["Magdalena Medio", "Nordeste", "Norte", "Occidente", "Oriente", "Suroeste", "Urab", "Bajo Cauca", "Valle de Aburr"]:
            if sname.lower() in p_strip.lower():
                cur_sub = sname
                subreg_paras[cur_sub] = []
                break
    elif cur_sub:
        subreg_paras[cur_sub].append(p_strip)

print("Subregions extracted:", list(subreg_paras.keys()))
for s, p_list in subreg_paras.items():
    print(f"\n=== {s} ({len(p_list)} paras) ===")
    proposals = [p for p in p_list if any(kw in p.lower() for kw in ["propuesta", "seguridad", "agro", "salud", "infraestructura", "enfoque", "votos", "electoral"])]
    for p in proposals[:4]:
        print("  *", p[:120])

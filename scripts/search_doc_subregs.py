import zipfile
import xml.etree.ElementTree as ET

doc_path = r"c:\Users\isaac\OneDrive\Documentos\Informe electoral Antioquia Paloma Valencia.docx"
z = zipfile.ZipFile(doc_path)
tree = ET.fromstring(z.read('word/document.xml'))

paras = []
for p in tree.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p'):
    texts = [t.text for t in p.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t') if t.text]
    if texts:
        paras.append(''.join(texts))

# Find headings or sections
for i, p in enumerate(paras):
    if len(p) < 80 and any(keyword in p.lower() for keyword in ["subregi", "oriente", "uraba", "norte", "nordeste", "bajo cauca", "magdalena", "suroeste", "occidente", "valle de aburr"]):
        print(f"[{i}] {p}")

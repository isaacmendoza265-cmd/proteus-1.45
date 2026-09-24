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

print("\n--- PARAS 79 to 92 (Oriente) ---")
for i in range(79, min(93, len(paras))):
    print(f"[{i}] {paras[i][:150]}")

import zipfile
import xml.etree.ElementTree as ET
import os

doc_path = r"c:\Users\isaac\OneDrive\Documentos\Informe electoral Antioquia Paloma Valencia.docx"
z = zipfile.ZipFile(doc_path)
tree = ET.fromstring(z.read('word/document.xml'))

# Extract paragraphs
paragraphs = []
for p in tree.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p'):
    texts = [t.text for t in p.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t') if t.text]
    if texts:
        paragraphs.append(''.join(texts))

print(f"Total paragraphs: {len(paragraphs)}")
for i, p in enumerate(paragraphs[:40]):
    print(f"[{i}] {p[:120]}")

import zipfile
import xml.etree.ElementTree as ET

def read_docx(path):
    z = zipfile.ZipFile(path)
    tree = ET.fromstring(z.read('word/document.xml'))
    paras = []
    for p in tree.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p'):
        texts = [t.text for t in p.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t') if t.text]
        if texts:
            paras.append(''.join(texts))
    return paras

path1 = r"C:\Users\isaac\OneDrive\Documentos\INFORME DE CONSOLIDADO ELECTORAL ANTIOQUIA 2026 POR SUBREGIONES.docx"
p1 = read_docx(path1)
print(f"File 1: {len(p1)} paras")
for p in p1[:25]:
    print("  ", p[:120])

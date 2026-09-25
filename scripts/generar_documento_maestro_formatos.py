# -*- coding: utf-8 -*-
"""
Script para compilar el Documento Maestro de Proteus v1.4.5 en:
1. HTML Ejecutivo Autónomo con diseño Glassmorphism Táctico Slate-950
2. PDF Imprimible de Alta Calidad vía Microsoft Edge Headless
3. Respaldo directo en el directorio de Artifacts de Antigravity Brain
"""

import os
import subprocess
import shutil
import sys

try:
    sys.stdout.reconfigure(encoding='utf-8')
except Exception:
    pass

BASE_DIR = r"c:\Users\isaac\OneDrive\Documentos\Proyecto Proteus"
MD_PATH = os.path.join(BASE_DIR, "docs", "DOCUMENTO_MAESTRO_PROTEUS.md")
HTML_PATH = os.path.join(BASE_DIR, "docs", "DOCUMENTO_MAESTRO_PROTEUS.html")
PDF_PATH = os.path.join(BASE_DIR, "docs", "DOCUMENTO_MAESTRO_PROTEUS.pdf")

BRAIN_DIR = r"C:\Users\isaac\.gemini\antigravity\brain\b209cb26-34b6-4816-a521-88fe8d93d74b"
BRAIN_HTML = os.path.join(BRAIN_DIR, "DOCUMENTO_MAESTRO_PROTEUS.html")
BRAIN_PDF = os.path.join(BRAIN_DIR, "DOCUMENTO_MAESTRO_PROTEUS.pdf")

EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if not os.path.exists(EDGE_PATH):
    EDGE_PATH = r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"

with open(MD_PATH, 'r', encoding='utf-8') as f:
    md_content = f.read()

# Convert markdown to basic HTML or render in executive container
import re

def render_md_to_html(md_text):
    # Escape simple HTML
    text = md_text
    
    # Pre-formatting blocks
    code_blocks = []
    def save_code(match):
        code_blocks.append(match.group(1))
        return f"<!--CODE_BLOCK_{len(code_blocks)-1}-->"
    text = re.sub(r'```(?:[a-zA-Z0-9_\-]+)?\n(.*?)```', save_code, text, flags=re.DOTALL)
    
    # Inline code
    text = re.sub(r'`([^`]+)`', r'<code class="inline-code">\1</code>', text)
    
    # Headers
    text = re.sub(r'^# (.+)$', r'<h1 class="doc-h1">\1</h1>', text, flags=re.MULTILINE)
    text = re.sub(r'^## (.+)$', r'<h2 class="doc-h2">\1</h2>', text, flags=re.MULTILINE)
    text = re.sub(r'^### (.+)$', r'<h3 class="doc-h3">\1</h3>', text, flags=re.MULTILINE)
    text = re.sub(r'^#### (.+)$', r'<h4 class="doc-h4">\1</h4>', text, flags=re.MULTILINE)
    
    # Bold & Italic
    text = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', text)
    text = re.sub(r'\*(.+?)\*', r'<em>\1</em>', text)
    
    # Horizontal rules
    text = re.sub(r'^---$', r'<hr class="doc-hr">', text, flags=re.MULTILINE)
    
    # Restore code blocks
    for idx, cb in enumerate(code_blocks):
        clean_cb = cb.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
        html_cb = f'<pre class="code-box"><code>{clean_cb}</code></pre>'
        text = text.replace(f"<!--CODE_BLOCK_{idx}-->", html_cb)
        
    # Paragraphs (simple separation)
    paragraphs = text.split('\n\n')
    processed_p = []
    for p in paragraphs:
        p = p.strip()
        if not p: continue
        if p.startswith('<h') or p.startswith('<pre') or p.startswith('<hr'):
            processed_p.append(p)
        elif p.startswith('- ') or p.startswith('* '):
            # List item
            items = p.split('\n')
            lis = "".join([f"<li>{item[2:].strip()}</li>" for item in items if item.strip().startswith(('- ', '* '))])
            processed_p.append(f'<ul class="doc-ul">{lis}</ul>')
        elif p.startswith(('1. ', '2. ', '3. ', '4. ', '5. ', '6. ', '7. ', '8. ', '9. ')):
            items = p.split('\n')
            lis = "".join([f"<li>{re.sub(r'^[0-9]+\.\s*', '', item)}</li>" for item in items if item.strip()])
            processed_p.append(f'<ol class="doc-ol">{lis}</ol>')
        else:
            processed_p.append(f'<p class="doc-p">{p.replace(chr(10), "<br>")}</p>')
            
    return "\n".join(processed_p)

body_html = render_md_to_html(md_content)

FULL_HTML = f"""<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DOCUMENTO MAESTRO - PROYECTO PROTEUS v1.4.5</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600;700&display=swap');
    
    :root {{
      --bg-body: #060913;
      --bg-card: rgba(15, 23, 42, 0.85);
      --border-card: rgba(255, 255, 255, 0.12);
      --accent-gold: #f59e0b;
      --accent-sky: #38bdf8;
      --accent-emerald: #10b981;
      --accent-rose: #f43f5e;
      --accent-purple: #a855f7;
      --text-main: #f1f5f9;
      --text-muted: #94a3b8;
    }}

    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    
    body {{
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: radial-gradient(circle at 50% 0%, #1e1b4b 0%, #060913 70%);
      color: var(--text-main);
      line-height: 1.7;
      padding: 40px 20px;
    }}

    .container {{
      max-width: 1100px;
      margin: 0 auto;
      background: var(--bg-card);
      backdrop-filter: blur(20px);
      border: 1px solid var(--border-card);
      border-radius: 24px;
      padding: 60px 50px;
      box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.8), inset 0 1px 1px 0 rgba(255,255,255,0.2);
    }}

    .top-banner {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 25px;
      margin-bottom: 35px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    }}

    .badge-master {{
      background: rgba(245, 158, 11, 0.15);
      color: var(--accent-gold);
      border: 1px solid rgba(245, 158, 11, 0.4);
      padding: 6px 14px;
      border-radius: 9999px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
    }}

    .doc-h1 {{
      font-size: 32px;
      font-weight: 900;
      color: #ffffff;
      line-height: 1.25;
      margin-bottom: 12px;
      background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 50%, #94a3b8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }}

    .doc-h2 {{
      font-size: 22px;
      font-weight: 800;
      color: var(--accent-gold);
      margin-top: 45px;
      margin-bottom: 18px;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(245, 158, 11, 0.25);
      letter-spacing: -0.5px;
    }}

    .doc-h3 {{
      font-size: 18px;
      font-weight: 800;
      color: var(--accent-sky);
      margin-top: 35px;
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      gap: 8px;
    }}

    .doc-h4 {{
      font-size: 14px;
      font-weight: 700;
      color: #e2e8f0;
      margin-top: 20px;
      margin-bottom: 8px;
      font-family: 'JetBrains Mono', monospace;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }}

    .doc-p {{
      color: #cbd5e1;
      font-size: 15px;
      margin-bottom: 16px;
      text-align: justify;
    }}

    .doc-ul, .doc-ol {{
      margin-left: 24px;
      margin-bottom: 20px;
      color: #cbd5e1;
      font-size: 14.5px;
    }}

    .doc-ul li, .doc-ol li {{
      margin-bottom: 8px;
      padding-left: 6px;
    }}

    .inline-code {{
      font-family: 'JetBrains Mono', monospace;
      background: rgba(255, 255, 255, 0.08);
      color: #38bdf8;
      padding: 2px 6px;
      border-radius: 6px;
      font-size: 13px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }}

    .code-box {{
      font-family: 'JetBrains Mono', monospace;
      background: #090d16;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 12px;
      padding: 18px;
      margin: 20px 0;
      overflow-x: auto;
      font-size: 13px;
      color: #38bdf8;
      line-height: 1.5;
    }}

    .doc-hr {{
      border: none;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      margin: 40px 0;
    }}

    .tool-card {{
      background: rgba(30, 41, 59, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 24px;
      margin-bottom: 30px;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
    }}

    @media print {{
      body {{ background: #ffffff !important; color: #0f172a !important; padding: 0 !important; }}
      .container {{ max-width: 100% !important; border: none !important; box-shadow: none !important; background: transparent !important; padding: 20px !important; }}
      .doc-h1 {{ -webkit-text-fill-color: #0f172a !important; color: #0f172a !important; }}
      .doc-h2 {{ color: #b45309 !important; border-bottom-color: #cbd5e1 !important; }}
      .doc-h3 {{ color: #0369a1 !important; }}
      .doc-h4 {{ color: #1e293b !important; }}
      .doc-p, .doc-ul, .doc-ol {{ color: #334155 !important; }}
      .code-box {{ background: #f8fafc !important; color: #0f172a !important; border-color: #cbd5e1 !important; }}
      .inline-code {{ background: #f1f5f9 !important; color: #0284c7 !important; border-color: #cbd5e1 !important; }}
    }}
  </style>
</head>
<body>
  <div class="container">
    <div class="top-banner">
      <span class="badge-master">Documento Maestro Oficial • Proteus v1.4.5</span>
      <span style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--text-muted);">CMT Proteus Intelligence Core</span>
    </div>
    
    {body_html}
    
    <div style="margin-top: 50px; padding-top: 25px; border-top: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; font-size: 12px; color: var(--text-muted); font-family: 'JetBrains Mono', monospace;">
      <span>Proyecto Proteus — Inteligencia Electoral & Conversión</span>
      <span>Impreso / Generado: Septiembre 2026</span>
    </div>
  </div>
</body>
</html>
"""

with open(HTML_PATH, 'w', encoding='utf-8') as f:
    f.write(FULL_HTML)

with open(BRAIN_HTML, 'w', encoding='utf-8') as f:
    f.write(FULL_HTML)

print(f"✓ HTML generado exitosamente en:\n - {HTML_PATH}\n - {BRAIN_HTML}")

# Intentar compilar a PDF con Edge Headless
if os.path.exists(EDGE_PATH):
    cmd = [
        EDGE_PATH,
        "--headless",
        "--disable-gpu",
        "--no-pdf-header-footer",
        f"--print-to-pdf={PDF_PATH}",
        HTML_PATH
    ]
    try:
        subprocess.run(cmd, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, timeout=25)
        if os.path.exists(PDF_PATH):
            shutil.copyfile(PDF_PATH, BRAIN_PDF)
            print(f"✓ PDF generado exitosamente en:\n - {PDF_PATH}\n - {BRAIN_PDF}")
    except Exception as e:
        print(f"Aviso: No se pudo generar PDF automáticamente ({e}), pero el HTML es 100% imprimible.")
else:
    print("Edge no encontrado en ruta habitual. El archivo HTML está listo para imprimir a PDF en cualquier navegador.")

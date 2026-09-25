import os
import json
import urllib.request

def get_key():
    with open(".env", "r", encoding="utf-8") as f:
        for line in f:
            if line.startswith("GEMINI_API_KEY="):
                return line.split("=", 1)[1].strip().strip('"').strip("'")

key = get_key()
url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={key}"

prompt = """
Actúa como Director de Arte de Proyecto Proteus.
Genera una guía de 5 puntos clave para unificar la estética de la presentación en todo el aplicativo:
1. Paleta de fondo obsidiana (#030712) y orbes bioluminiscentes.
2. Tipografía: Plus Jakarta Sans (body) y JetBrains Mono (código y badges).
3. Paneles de cristal Glassmorphism Frost (background: rgba(15, 23, 42, 0.65), backdrop-blur-28px, border: 1px solid rgba(255,255,255,0.12)).
4. Badges neon: Sky, Amber, Emerald, Indigo.
5. Botones y micro-interacciones con glow sutil.
Provee las directrices concisas y limpias.
"""

body = {
    "contents": [{"parts": [{"text": prompt}]}]
}

req = urllib.request.Request(
    url,
    data=json.dumps(body).encode("utf-8"),
    headers={"Content-Type": "application/json"}
)

try:
    with urllib.request.urlopen(req, timeout=20) as resp:
        res = json.loads(resp.read().decode("utf-8"))
        text = res["candidates"][0]["content"]["parts"][0]["text"]
        print("GEMINI_RESPONSE_OK")
        with open("scripts/gemini_aesthetic_directives.md", "w", encoding="utf-8") as f:
            f.write(text)
except Exception as e:
    print("ERROR:", e)

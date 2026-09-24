# -*- coding: utf-8 -*-
import os
import json
import urllib.request

def get_api_key():
    env_path = ".env"
    if os.path.exists(env_path):
        with open(env_path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line.startswith("GEMINI_API_KEY="):
                    return line.split("=", 1)[1].strip().strip('"').strip("'")
    return os.environ.get("GEMINI_API_KEY", "")

def call_gemini(prompt, system_inst="Eres el Director de UI/UX y Diseño de Proyecto Proteus."):
    key = get_api_key()
    models = ["gemini-2.5-flash", "gemini-3.8-flash"]
    for m in models:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{m}:generateContent?key={key}"
        body = {
            "contents": [{"parts": [{"text": prompt}]}],
            "systemInstruction": {"parts": [{"text": system_inst}]}
        }
        for attempt in range(2):
            try:
                req = urllib.request.Request(
                    url,
                    data=json.dumps(body).encode("utf-8"),
                    headers={"Content-Type": "application/json"}
                )
                with urllib.request.urlopen(req, timeout=60) as resp:
                    res = json.loads(resp.read().decode("utf-8"))
                    return res["candidates"][0]["content"]["parts"][0]["text"], m
            except Exception as e:
                print(f"Intento {attempt+1} con {m} falló: {e}")
    return "", None

prompt = """
Actúa como Director de Arte y Diseñador UI/UX Principal de Proyecto Proteus.
Hemos diseñado una presentación en HTML que cautivó al usuario por su estética Glassmorphism Frost / Modern Aero:
- Fondo profundo: #030712 (obsidiana / noche profunda).
- Orbes de luz ambiental bioluminiscente: sky-500/35, indigo-600/30, amber-500/20 con blur de 120px.
- Tarjetas de cristal translúcido (Glassmorphism Frost):
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(28px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.2);
- Tipografía: 'Plus Jakarta Sans' para todo el cuerpo y títulos, 'JetBrains Mono' para métricas, badges y datos duros.
- Badges neon con código de color:
  * Sky: bg-sky-500/20 text-sky-300 border-sky-400/30
  * Amber: bg-amber-500/20 text-amber-300 border-amber-400/30
  * Emerald: bg-emerald-500/20 text-emerald-300 border-emerald-400/30
  * Indigo: bg-indigo-500/20 text-indigo-300 border-indigo-400/30

Define las reglas CSS exactas y directrices para unificar el archivo `index.html`, `src/index.css` y los componentes principales del aplicativo para que tengan exactamente esta estética sin romper ninguna funcionalidad interactiva.
"""

response, model = call_gemini(prompt)
print(f"Gemini ({model}) responded with {len(response)} chars.")
with open("scripts/gemini_aesthetic_recommendation.md", "w", encoding="utf-8") as f:
    f.write(response)
print("Saved recommendation to scripts/gemini_aesthetic_recommendation.md")

import os
import json
import urllib.request

def get_key():
    with open(".env", "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line.startswith("GEMINI_API_KEY="):
                return line.split("=", 1)[1].strip().strip('"').strip("'")

def query_gemini(prompt, system_inst=None):
    key = get_key()
    models = ["gemini-2.5-flash", "gemini-3.8-flash"]
    last_err = None
    for m in models:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{m}:generateContent?key={key}"
        body = {
            "contents": [{
                "parts": [{"text": prompt}]
            }]
        }
        if system_inst:
            body["systemInstruction"] = {
                "parts": [{"text": system_inst}]
            }
        try:
            req = urllib.request.Request(
                url,
                data=json.dumps(body).encode("utf-8"),
                headers={"Content-Type": "application/json"}
            )
            with urllib.request.urlopen(req, timeout=30) as resp:
                res = json.loads(resp.read().decode("utf-8"))
                text = res["candidates"][0]["content"]["parts"][0]["text"]
                print(f"Generated successfully with {m} ({len(text)} chars)")
                return text, m
        except Exception as e:
            print(f"Failed with {m}: {e}")
            last_err = e
    raise last_err

test_prompt = "Genera un resumen ejecutivo de 3 lÃ­neas sobre Proyecto Proteus 1.2."
res, model = query_gemini(test_prompt)
print("Model used:", model)
print("Response preview:", res[:150])

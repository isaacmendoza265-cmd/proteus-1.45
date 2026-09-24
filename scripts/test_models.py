import os
import json
import urllib.request

def get_key():
    with open(".env", "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line.startswith("GEMINI_API_KEY="):
                return line.split("=", 1)[1].strip().strip('"').strip("'")

key = get_key()
models_to_test = ["gemini-3.8-flash", "gemini-2.5-flash", "gemini-2.0-flash"]

for m in models_to_test:
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{m}:generateContent?key={key}"
    req_data = {
        "contents": [{
            "parts": [{"text": "Di 'MODEL_OK'"}]
        }]
    }
    try:
        req = urllib.request.Request(
            url,
            data=json.dumps(req_data).encode("utf-8"),
            headers={"Content-Type": "application/json"}
        )
        with urllib.request.urlopen(req) as resp:
            res = json.loads(resp.read().decode("utf-8"))
            print(f"Model {m}: SUCCESS -> {res['candidates'][0]['content']['parts'][0]['text'].strip()}")
    except Exception as e:
        print(f"Model {m}: FAILED -> {e}")

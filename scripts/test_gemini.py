import os
import json
import urllib.request

def get_key():
    if os.path.exists(".env"):
        with open(".env", "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line.startswith("GEMINI_API_KEY="):
                    return line.split("=", 1)[1].strip().strip('"').strip("'")
    return os.environ.get("GEMINI_API_KEY", "")

key = get_key()
print("API Key available:", bool(key), "Length:", len(key))

url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={key}"
# Also test gemini-3.8-flash if available, or gemini-2.5-flash / gemini-1.5-flash
req_data = {
    "contents": [{
        "parts": [{"text": "Responde en una palabra: 'OK'"}]
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
        print("API Response:", res["candidates"][0]["content"]["parts"][0]["text"])
except Exception as e:
    print("Error calling Gemini API:", e)

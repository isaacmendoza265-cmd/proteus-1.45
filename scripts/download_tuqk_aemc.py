import urllib.request
import json

url = "https://www.datos.gov.co/resource/tuqk-aemc.json?$limit=200"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req, timeout=15) as resp:
        data = json.loads(resp.read().decode('utf-8'))
        print(f"Total rows fetched: {len(data)}")
        if data:
            print("First row keys:", list(data[0].keys()))
            print("Sample row:", data[0])
            with open("scripts/tuqk_aemc_mayors.json", "w", encoding="utf-8") as out:
                json.dump(data, out, indent=2, ensure_ascii=False)
            print("Saved to scripts/tuqk_aemc_mayors.json")
except Exception as e:
    print("Error:", e)

import urllib.request
import re

url = "https://es.wikipedia.org/wiki/Elecciones_regionales_de_Antioquia_de_2023"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'})
try:
    with urllib.request.urlopen(req, timeout=10) as resp:
        html = resp.read().decode('utf-8')
        print(f"Success! Fetched {len(html)} bytes")
        with open("scripts/wiki_elecciones_antioquia.html", "w", encoding="utf-8") as out:
            out.write(html)
except Exception as e:
    print("Error:", e)

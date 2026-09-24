import urllib.request
import re

url = "https://www.elcolombiano.com/antioquia/quienes-son-los-125-alcaldes-electos-de-antioquia-para-el-periodo-2024-2027-DB22818552"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
try:
    with urllib.request.urlopen(req, timeout=10) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
        print(f"Success! {len(html)} bytes")
        with open("scripts/elcolombiano_125.html", "w", encoding="utf-8") as out:
            out.write(html)
except Exception as e:
    print("Error:", e)

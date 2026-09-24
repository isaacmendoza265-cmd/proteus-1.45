import urllib.request
import json

# Search datos.gov.co catalog for 'Alcaldes Antioquia'
url = "https://www.datos.gov.co/api/views?q=Alcaldes%20Antioquia&limit=5"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req, timeout=10) as resp:
        data = json.loads(resp.read().decode('utf-8'))
        for item in data.get('results', []):
            view = item.get('view', {})
            print(f"ID: {view.get('id')} | Name: {view.get('name')} | Updated: {view.get('rowsUpdatedAt')}")
except Exception as e:
    print("Error:", e)

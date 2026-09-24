import re

with open(r'C:\Users\isaac\.gemini\antigravity\brain\b209cb26-34b6-4816-a521-88fe8d93d74b\.system_generated\steps\1308\content.md', 'r', encoding='utf-8') as f:
    text = f.read()

raw_urls = re.findall(r'href="([^"]+/raw/[^"]+)"', text)
for u in set(raw_urls):
    print("Found raw url:", u)

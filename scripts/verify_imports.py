import os
import re

errors = []
src_dir = "src"

for root, dirs, files in os.walk(src_dir):
    for f in files:
        if f.endswith(".tsx") or f.endswith(".ts"):
            path = os.path.join(root, f)
            with open(path, "r", encoding="utf-8") as file:
                content = file.read()
            
            imports = re.findall(r'from\s+[\'"](\.[^\'"]+)[\'"]', content)
            for imp in imports:
                cur_dir = os.path.dirname(path)
                target = os.path.normpath(os.path.join(cur_dir, imp))
                
                exists = (
                    os.path.exists(target + ".ts") or 
                    os.path.exists(target + ".tsx") or 
                    os.path.exists(os.path.join(target, "index.ts")) or 
                    os.path.exists(os.path.join(target, "index.tsx")) or
                    os.path.exists(target)
                )
                if not exists:
                    errors.append(f"In {path}: cannot resolve {imp} (looked at {target})")

if errors:
    print("IMPORT ERRORS FOUND:")
    for e in errors:
        print(" - " + e)
else:
    print("ALL RELATIVE IMPORTS RESOLVED SUCCESSFULLY!")

"""Empaqueta Proteus para Google AI Studio (PROTEUS_ACTUALIZADO_AI_STUDIO.zip).

Uso:  python scripts/make_aistudio_zip.py
Toma los archivos desde la raiz del proyecto (la carpeta que contiene /scripts).
"""
import os
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUTPUT_ZIP = ROOT / "PROTEUS_ACTUALIZADO_AI_STUDIO.zip"

INCLUDE_DIRS = ["src", "scripts", "public", "protocolos_de_automejora", "docs"]
INCLUDE_FILES = [
    "package.json",
    "package-lock.json",
    "tsconfig.json",
    "vite.config.ts",
    "server.ts",
    "index.html",
    "metadata.json",
    ".env.example",
    "README.md",
]
EXCLUDE_EXTS = (".pyc", ".zip", ".pdf", ".backup.tsx")
EXCLUDE_DIRS = {"__pycache__", "node_modules", ".git"}

with zipfile.ZipFile(OUTPUT_ZIP, "w", zipfile.ZIP_DEFLATED) as zipf:
    for fname in INCLUDE_FILES:
        fpath = ROOT / fname
        if fpath.exists():
            zipf.write(fpath, fname)
    for dname in INCLUDE_DIRS:
        dpath = ROOT / dname
        if not dpath.exists():
            continue
        for current, dirs, files in os.walk(dpath):
            dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS and not d.startswith("_")]
            for f in files:
                if f.endswith(EXCLUDE_EXTS):
                    continue
                full = Path(current) / f
                zipf.write(full, full.relative_to(ROOT).as_posix())

print(f"ZIP creado: {OUTPUT_ZIP}")
print(f"Tamano: {OUTPUT_ZIP.stat().st_size / (1024 * 1024):.2f} MB")

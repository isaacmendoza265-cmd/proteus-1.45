"""
Importa el módulo de encuestas <voto-correlaciones> a Proteus.

Fuente: el paquete que construye el proyecto voto-demografia-2026 (`construir.py` -> dist/voto-correlaciones-<versión>/
o su .zip). Contiene solo AGREGADOS ponderados (Σw, Σw², n por celda; celdas con n < 30 suprimidas en origen) de los
microdatos que las firmas publican en el Registro Nacional de Encuestas del CNE (Ley 2494 de 2025, art. 12).
Proteus no recibe ni guarda microdatos.

Copia a public/modulos/voto-correlaciones/:
  voto-correlaciones.js, manifest.json, INTEGRACION.md, esquema_armonizado.md, data/agregados.json, data/territorial/*
y verifica que estén todos los archivos que lista manifest.json y, si el manifiesto trae "sha256", su suma
(si algo falta o no coincide, no copia nada).

Uso:
  python scripts/importar_voto_correlaciones.py <carpeta dist/voto-correlaciones-X.Y.Z | archivo .zip>
"""
import hashlib
import json
import shutil
import sys
import tempfile
import zipfile
from pathlib import Path

DESTINO = Path(__file__).resolve().parent.parent / "public" / "modulos" / "voto-correlaciones"
SUELTOS = ["voto-correlaciones.js", "manifest.json", "INTEGRACION.md", "esquema_armonizado.md"]


def sha256(p: Path) -> str:
    h = hashlib.sha256()
    with p.open("rb") as f:
        for b in iter(lambda: f.read(1 << 20), b""):
            h.update(b)
    return h.hexdigest()


def raiz_paquete(origen: Path, tmp: Path) -> Path:
    if origen.suffix == ".zip":
        with zipfile.ZipFile(origen) as z:
            z.extractall(tmp)
        candidatos = [p.parent for p in tmp.rglob("manifest.json")]
        if not candidatos:
            sys.exit("El .zip no trae manifest.json")
        return candidatos[0]
    return origen


def main() -> None:
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    with tempfile.TemporaryDirectory() as t:
        src = raiz_paquete(Path(sys.argv[1]).resolve(), Path(t))
        manifest = json.loads((src / "manifest.json").read_text(encoding="utf-8"))
        sumas = manifest.get("sha256", {})
        archivos = [f for f in manifest.get("archivos", []) if f.startswith("data/")] + SUELTOS
        malos = []
        for rel in archivos:
            p = src / rel
            if not p.exists():
                malos.append(f"falta {rel}")
            elif rel in sumas and sha256(p) != sumas[rel]:
                malos.append(f"sha256 distinto en {rel}")
        if malos:
            sys.exit("No se importó nada:\n  " + "\n  ".join(malos))
        if DESTINO.exists():
            shutil.rmtree(DESTINO)
        for rel in archivos:
            (DESTINO / rel).parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(src / rel, DESTINO / rel)
        print(f"voto-correlaciones {manifest.get('version')} ({manifest.get('encuestas')} encuestas, datos "
              f"{manifest.get('datos_generados')}) -> {DESTINO} ({len(archivos)} archivos)")


if __name__ == "__main__":
    main()

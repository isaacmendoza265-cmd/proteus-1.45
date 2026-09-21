import os
import zipfile

src_dir = r"c:\Users\isaac\OneDrive\Documentos\Proyecto Proteus"
output_zip = os.path.join(src_dir, "PROTEUS_ACTUALIZADO_AI_STUDIO.zip")

include_dirs = ["src", "scripts"]
include_files = [
    "package.json",
    "tsconfig.json",
    "vite.config.ts",
    "server.ts",
    "index.html",
    "metadata.json",
    ".env.example"
]

# Excluded extensions and patterns
exclude_exts = [".pyc", ".zip", ".backup.tsx"]

with zipfile.ZipFile(output_zip, "w", zipfile.ZIP_DEFLATED) as zipf:
    # Add root files
    for fname in include_files:
        fpath = os.path.join(src_dir, fname)
        if os.path.exists(fpath):
            zipf.write(fpath, fname)
            print(f"Added file: {fname}")

    # Add directories
    for dname in include_dirs:
        dpath = os.path.join(src_dir, dname)
        if os.path.exists(dpath):
            for root, dirs, files in os.walk(dpath):
                for f in files:
                    if any(f.endswith(ext) for ext in exclude_exts):
                        continue
                    full_path = os.path.join(root, f)
                    rel_path = os.path.relpath(full_path, src_dir)
                    zipf.write(full_path, rel_path)

print(f"\nZIP package created successfully at: {output_zip}")
print(f"Size: {os.path.getsize(output_zip) / (1024 * 1024):.2f} MB")

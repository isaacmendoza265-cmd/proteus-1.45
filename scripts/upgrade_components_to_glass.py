import os
import re

target_dir = "src/components"

replacements = [
    (r'\bbg-white\b', 'bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl'),
    (r'\bbg-slate-50\b', 'bg-white/[0.04] backdrop-blur-sm border border-white/10'),
    (r'\bbg-gray-50\b', 'bg-white/[0.04] backdrop-blur-sm border border-white/10'),
    (r'\bborder-slate-200\b', 'border-white/10'),
    (r'\bborder-slate-100\b', 'border-white/10'),
    (r'\bborder-gray-200\b', 'border-white/10'),
    (r'\btext-slate-900\b', 'text-white'),
    (r'\btext-slate-800\b', 'text-white'),
    (r'\btext-gray-900\b', 'text-white'),
    (r'\btext-gray-800\b', 'text-white'),
    (r'\btext-slate-700\b', 'text-slate-200'),
    (r'\btext-slate-600\b', 'text-slate-300'),
    (r'\btext-slate-500\b', 'text-slate-400'),
    (r'\bbg-blue-50\b', 'bg-sky-500/10'),
    (r'\bbg-blue-100\b', 'bg-sky-500/20 text-sky-300'),
    (r'\bbg-emerald-50\b', 'bg-emerald-500/10'),
    (r'\bbg-emerald-100\b', 'bg-emerald-500/20 text-emerald-300'),
    (r'\bbg-amber-50\b', 'bg-amber-500/10'),
    (r'\bbg-amber-100\b', 'bg-amber-500/20 text-amber-300')
]

modified_count = 0

for root, dirs, files in os.walk(target_dir):
    for f in files:
        if f.endswith('.tsx') and not f.endswith('.backup.tsx'):
            fpath = os.path.join(root, f)
            with open(fpath, 'r', encoding='utf-8') as file:
                content = file.read()

            new_content = content
            for pat, rep in replacements:
                new_content = re.sub(pat, rep, new_content)

            if new_content != content:
                with open(fpath, 'w', encoding='utf-8') as file:
                    file.write(new_content)
                modified_count += 1
                print(f"Transformed to Glassmorphism Frost: {fpath}")

print(f"\nTotal components upgraded to Glassmorphism Frost: {modified_count}")

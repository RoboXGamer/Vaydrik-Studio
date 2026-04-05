import os

orig_dir = r"c:\Users\A5IN\Coding\Repos\Vaydrik-Studio\public\assets"
comp_dir = r"c:\Users\A5IN\Coding\Repos\Vaydrik-Studio\public\assets_compressed"

orig_files = set()
for root, dirs, files in os.walk(orig_dir):
    for f in files:
        rel = os.path.relpath(os.path.join(root, f), orig_dir)
        orig_files.add(rel)

comp_files = set()
for root, dirs, files in os.walk(comp_dir):
    for f in files:
        rel = os.path.relpath(os.path.join(root, f), comp_dir)
        comp_files.add(rel)

missing = orig_files - comp_files
extra = comp_files - orig_files

print(f"Original Files: {len(orig_files)}")
print(f"Compressed Files: {len(comp_files)}")
print("\nMissing in compressed:")
for m in sorted(list(missing)):
    print(f"- {m}")

print("\nExtra in compressed (if any):")
for e in sorted(list(extra)):
    print(f"- {e}")

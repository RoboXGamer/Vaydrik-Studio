import os

base_dir = r"c:\Users\A5IN\Coding\Repos\Vaydrik-Studio\public\assets"
for root, dirs, files in os.walk(base_dir):
    for f in files:
        if f.endswith(('.mp4', '.jpg', '.jpeg', '.png')):
            p = os.path.join(root, f)
            print(f"{os.path.relpath(p, base_dir)}: {os.path.getsize(p) / 1024**2:.2f} MB")

import os

base_dir = r"c:\Users\A5IN\Coding\Repos\Vaydrik-Studio\public\assets"
large_files = []
extensions = ('.mp4', '.jpg', '.jpeg', '.png', '.JPG', '.PNG')

for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.endswith(extensions):
            file_path = os.path.join(root, file)
            size = os.path.getsize(file_path)
            if size > 25 * 1024 * 1024: # 25 MB
                large_files.append((os.path.relpath(file_path, base_dir), size / (1024 * 1024)))

large_files.sort(key=lambda x: x[1], reverse=True)

print("Files larger than 25MB:")
for name, size in large_files:
    print(f"{name:<60} | {size:>10.2f} MB")

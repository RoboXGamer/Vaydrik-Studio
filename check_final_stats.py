import os

base_dir = r"c:\Users\A5IN\Coding\Repos\Vaydrik-Studio\public\assets_compressed"
total_size_bytes = 0
file_count = 0

for root, dirs, files in os.walk(base_dir):
    for file in files:
        size = os.path.getsize(os.path.join(root, file))
        total_size_bytes += size
        file_count += 1

print(f"Compressed Assets - Final Stats:")
print(f"Total Files: {file_count}")
print(f"Total Size: {total_size_bytes / (1024 * 1024):.2f} MB")
print(f"Total Size: {total_size_bytes / (1024 * 1024 * 1024):.3f} GB")

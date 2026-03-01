import os

base_dir = r"c:\Users\A5IN\Coding\Repos\Vaydrik-Studio\public\assets"
total_size_bytes = 0
file_count = 0
extensions = ('.mp4', '.jpg', '.jpeg', '.png', '.JPG', '.PNG')

print(f"{'File Path':<80} | {'Size (MB)':>10}")
print("-" * 95)

for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.endswith(extensions):
            file_path = os.path.join(root, file)
            size = os.path.getsize(file_path)
            total_size_bytes += size
            file_count += 1
            print(f"{os.path.relpath(file_path, base_dir):<80} | {size / (1024 * 1024):>10.2f}")

print("-" * 95)
print(f"Total Files: {file_count}")
print(f"Total Size: {total_size_bytes / (1024 * 1024):.2f} MB")
print(f"Total Size: {total_size_bytes / (1024 * 1024 * 1024):.2f} GB")

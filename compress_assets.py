import os
import subprocess
import shutil

# Correcting paths to match current state:
# originals are in assets_old, target is assets
base_dir = r"c:\Users\A5IN\Coding\Repos\Vaydrik-Studio\public\assets_old"
output_dir = r"c:\Users\A5IN\Coding\Repos\Vaydrik-Studio\public\assets"

def compress_video(input_path, output_path):
    if os.path.exists(output_path):
        # Additional check: skip if file exists
        return True
    
    print(f"Compressing {input_path}...")
    cmd = [
        'ffmpeg', '-y', '-i', input_path,
        '-vcodec', 'libx264',
        '-crf', '30',
        '-preset', 'fast',
        '-vf', "scale='min(1280,iw)':-2",
        '-acodec', 'aac',
        '-b:a', '128k',
        output_path
    ]
    try:
        subprocess.run(cmd, check=True, capture_output=True)
        return True
    except subprocess.CalledProcessError:
        return False

def convert_and_compress_image(input_path, output_path):
    actual_output = os.path.splitext(output_path)[0] + ".jpg"
    if os.path.exists(actual_output):
        return True

    print(f"Converting/Optimizing {input_path} -> {actual_output}...")
    cmd = [
        'ffmpeg', '-y', '-i', input_path,
        '-q:v', '5',
        actual_output
    ]
    try:
        subprocess.run(cmd, check=True, capture_output=True)
        return True
    except subprocess.CalledProcessError:
        return False

print("Verifying assets in /public/assets/ using /public/assets_old/ as source...")
processed_count = 0
skipped_count = 0

for root, dirs, files in os.walk(base_dir):
    for file in files:
        if ".trashed" in file:
            continue
            
        rel_path = os.path.relpath(os.path.join(root, file), base_dir)
        dest_path = os.path.join(output_dir, rel_path)
        os.makedirs(os.path.dirname(dest_path), exist_ok=True)
        
        ext = file.lower()
        if ext.endswith('.mp4'):
            if os.path.exists(dest_path):
                skipped_count += 1
            else:
                compress_video(os.path.join(root, file), dest_path)
                processed_count += 1
        elif ext.endswith(('.jpg', '.jpeg', '.png')):
            actual_jpg = os.path.splitext(dest_path)[0] + ".jpg"
            if os.path.exists(actual_jpg):
                skipped_count += 1
            else:
                convert_and_compress_image(os.path.join(root, file), dest_path)
                processed_count += 1
        else:
            if not os.path.exists(dest_path):
                shutil.copy2(os.path.join(root, file), dest_path)
                processed_count += 1
            else:
                skipped_count += 1

print(f"\nVerification complete!")
print(f"Files already optimized (skipped): {skipped_count}")
print(f"New files processed: {processed_count}")

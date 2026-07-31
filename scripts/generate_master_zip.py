import os
import shutil
import zipfile

ZIP_NAME = 'MEHERAH-AI-COMPLETE-BACKUP.zip'
ROOT_BACKUP_NAME = 'MEHERAH-AI-BACKUP'

print("Generating clean master repository backup...")

if os.path.exists(ZIP_NAME):
    os.remove(ZIP_NAME)

EXCLUDE_DIRS = {'node_modules', '.git', 'dist', '__pycache__', 'coverage', '.cache', 'google_drive_mock', 'MEHERAH-AI-BACKUP'}
EXCLUDE_FILES = {ZIP_NAME, '.DS_Store', 'bun.lock'}

count = 0
with zipfile.ZipFile(ZIP_NAME, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk('.'):
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        for file in files:
            if file in EXCLUDE_FILES or file.endswith('.zip') or file.endswith('.pyc'):
                continue
            
            filepath = os.path.join(root, file)
            # Remove leading ./
            clean_path = os.path.normpath(filepath)
            
            # Archive under MEHERAH-AI-BACKUP directory prefix
            arc_path = os.path.join(ROOT_BACKUP_NAME, clean_path)
            
            try:
                zipf.write(clean_path, arc_path)
                count += 1
            except Exception as e:
                print(f"Skipped {clean_path}: {e}")

# Copy to public folder for direct client browser download
os.makedirs("public", exist_ok=True)
shutil.copy2(ZIP_NAME, os.path.join("public", ZIP_NAME))

print(f"MASTER_ZIP_SUCCESS: Packaged {count} files into {ZIP_NAME} (~{os.path.getsize(ZIP_NAME)/(1024*1024):.2f} MB)")

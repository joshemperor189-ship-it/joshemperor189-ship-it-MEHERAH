import os
import zipfile

ZIP_NAME = "MEHERAH-AI-COMPLETE-BACKUP.zip"

print("Creating clean zip archive directly...")

EXCLUDE_DIRS = {'node_modules', '.git', 'dist', '__pycache__', 'coverage', '.cache', 'google_drive_mock'}
EXCLUDE_FILES = {ZIP_NAME, '.DS_Store', 'bun.lock'}

with zipfile.ZipFile(ZIP_NAME, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk('.'):
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        for file in files:
            if file in EXCLUDE_FILES or file.endswith('.pyc') or file.endswith('.zip'):
                continue
            filepath = os.path.join(root, file)
            relpath = os.path.normpath(filepath)
            # Map into MEHERAH-AI-BACKUP/ folder structure in zip
            arcname = os.path.join("MEHERAH-AI-BACKUP", relpath)
            try:
                zipf.write(filepath, arcname)
            except Exception as e:
                print(f"Skip {filepath}: {e}")

# Copy to public
import shutil
os.makedirs("public", exist_ok=True)
shutil.copy2(ZIP_NAME, f"public/{ZIP_NAME}")

print("ZIP_DIRECT_SUCCESS")

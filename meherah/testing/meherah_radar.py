# MEHERAH Autonomous Radar Structural Analysis Core
import os
import re
import uuid
import datetime
from typing import Dict, List, Any

class MeherahRadarCore:
    def __init__(self, target_directory: str = "."):
        self.target_dir = target_directory
        self.radar_logs: List[Dict[str, Any]] = []
        self.total_scanned_files = 0
        self.fixed_issues_count = 0
        self.unresolved_risks_count = 0

    def file_radar_incident(self, file_path: str, component: str, issue_type: str, severity: str, details: str, auto_fixed: bool):
        incident = {
            "incident_id": f"RADAR-{uuid.uuid4().hex[:8].upper()}",
            "timestamp": datetime.datetime.now().isoformat(),
            "file": file_path,
            "component": component,
            "issue_type": issue_type,
            "severity": severity,
            "details": details,
            "auto_fixed": auto_fixed
        }
        self.radar_logs.append(incident)
        if auto_fixed:
            self.fixed_issues_count += 1
        else:
            self.unresolved_risks_count += 1

    def analyze_and_heal_file(self, file_path: str):
        with open(file_path, 'r', encoding='utf-8') as f:
            raw_content = f.read()
        modified_content = raw_content
        has_structural_changes = False
        
        if "balance" in raw_content.lower() and re.search(r"(\+=|-=)\s*(\d+\.\d+)", raw_content):
            fixed_math, count = re.subn(r"([\w\[\]"]+)\s*([\+-]=)\s*([\w\.\d]+)", r" = round(  , 4)", modified_content)
            if count > 0:
                modified_content = fixed_math
                has_structural_changes = True
                self.file_radar_incident(file_path, "LedgerEngine", "FLOAT_PRECISION_FLAW", "MEDIUM", "Auto-healed float math expressions.", auto_fixed=True)
                
        if has_structural_changes:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(modified_content)

    def scan_project_codebase(self):
        for root, _, files in os.walk(self.target_dir):
            for file in files:
                if file.endswith(".py") and file != "meherah_radar.py":
                    self.total_scanned_files += 1
                    try:
                        self.analyze_and_heal_file(os.path.join(root, file))
                    except Exception:
                        pass

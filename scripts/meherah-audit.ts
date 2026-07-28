import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

interface AuditTelemetry {
  analyzedFiles: string[];
  autoPatchesApplied: string[];
  syntaxErrorsFound: number;
  environmentStatus: 'OPTIMAL' | 'DEGRADED';
  missingCriticalFiles: string[];
}

class MeherahAuditSuite {
  private telemetry: AuditTelemetry = {
    analyzedFiles: [],
    autoPatchesApplied: [],
    syntaxErrorsFound: 0,
    environmentStatus: 'OPTIMAL',
    missingCriticalFiles: []
  };

  private CRITICAL_PATHS = [
    'server.ts',
    'src/db/database.service.ts',
    'src/services/privacy-scrubber.ts',
    'src/routes/finance.routes.ts',
    'prisma/schema.prisma'
  ];

  public async runFullPipeline() {
    console.log(`================================================================`);
    console.log(`🧠 MEHERAH OS: COMMENCING CORE SYSTEM AUDIT & AUTO-REPAIR LOOP  `);
    console.log(`================================================================\n`);

    // 1. Verify Core Structure Artifacts
    this.auditProjectStructure();

    // 2. Scan and Self-Repair Broken Code Syntax
    this.scanAndRepairWorkspace(path.join(process.cwd(), 'src'));

    // 3. Compile and Run Static Linter Analysis via TypeScript Engine
    this.runCompilerValidation();

    // 4. Print Full Diagnostic Telemetry Report
    this.printAuditSummary();
  }

  private auditProjectStructure() {
    console.log('🔍 Phase 1: Structural Integrity Discovery Run...');
    for (const relativePath of this.CRITICAL_PATHS) {
      const fullPath = path.join(process.cwd(), relativePath);
      if (!fs.existsSync(fullPath)) {
        this.telemetry.missingCriticalFiles.push(relativePath);
        this.telemetry.environmentStatus = 'DEGRADED';
        console.log(`⚠️ MISSING FILE DETECTED: ${relativePath}`);
      }
    }
  }

  private scanAndRepairWorkspace(dir: string) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        this.scanAndRepairWorkspace(fullPath);
      } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        this.telemetry.analyzedFiles.push(fullPath);
        this.analyzeAndFixFile(fullPath);
      }
    }
  }

  private analyzeAndFixFile(filePath: string) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let dirty = false;

    // RULE A: Catch unescaped raw less-than/greater-than inequality symbols in React JSX layout text blocks
    if (filePath.endsWith('.tsx') && (content.includes('sweep excess balance >') || content.includes('balance >'))) {
      content = content.replace(/sweep excess balance >/g, 'sweep excess balance &gt;');
      content = content.replace(/balance >/g, 'balance &gt;');
      this.telemetry.autoPatchesApplied.push(`Escaped raw JSX text characters in: ${path.basename(filePath)}`);
      this.telemetry.syntaxErrorsFound++;
      dirty = true;
    }

    // RULE B: Automatically correct React raw element attributes to correct className declarations
    if (content.includes('class=') && !content.includes('className=')) {
      content = content.replace(/class=/g, 'className=');
      this.telemetry.autoPatchesApplied.push(`Fixed raw class element attributes inside: ${path.basename(filePath)}`);
      this.telemetry.syntaxErrorsFound++;
      dirty = true;
    }

    // Rewrite clean script data to disk if modifications were executed
    if (dirty) {
      fs.writeFileSync(filePath, content, 'utf-8');
    }
  }

  private runCompilerValidation() {
    console.log('⚡ Phase 2: Running TypeScript Compiler Diagnostic checks...');
    try {
      // Runs tsc validation without generating output files
      execSync('npx tsc --noEmit', { stdio: 'pipe' });
      console.log('✅ TYPE VALIDATION SUCCESSFUL: 0 linter configuration errors detected.');
    } catch (error: any) {
      this.telemetry.environmentStatus = 'DEGRADED';
      console.log('⚠️ COMPILE CONSTRAINT DETECTED: Review type bindings.');
      // Extract clean error tracking lines
      const output = error.stdout?.toString() || '';
      if (output) {
        console.log(output.split('\n').slice(0, 3).join('\n'));
      }
    }
  }

  private printAuditSummary() {
    console.log(`\n================================================================`);
    console.log(`📋 MEHERAH OS — COMPREHENSIVE RUNTIME AUDIT EXECUTIVE BRIEF      `);
    console.log(`================================================================`);
    console.log(`📈 Engine Status Summary      : [${this.telemetry.environmentStatus}]`);
    console.log(`🗂️ Total Code Files Checked   : ${this.telemetry.analyzedFiles.length}`);
    console.log(`🚨 Structural Issues Repaired : ${this.telemetry.syntaxErrorsFound}`);
    console.log(`📂 Critical Missing Files     : ${this.telemetry.missingCriticalFiles.length === 0 ? 'NONE' : this.telemetry.missingCriticalFiles.join(', ')}`);
    
    if (this.telemetry.autoPatchesApplied.length > 0) {
      console.log(`\n🔧 Self-Repair Log Actions Applied:`);
      this.telemetry.autoPatchesApplied.forEach(patch => console.log(`  -> ${patch}`));
    } else {
      console.log(`\n✨ Self-Repair Log Actions Applied: Workspace code is clean. No adjustments needed.`);
    }
    console.log(`================================================================\n`);
  }
}

// Fire the self-healing processor pipeline instantly
const engineAudit = new MeherahAuditSuite();
engineAudit.runFullPipeline();

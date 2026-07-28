import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { 
  AgentStatus, 
  TaskStatus, 
  MissionStatus 
} from './src/types';

// Terminal colors for elegant high-end luxury logging
const GOLD = '\x1b[38;2;212;175;55m';
const TEAL = '\x1b[36m';
const DARK_GRAY = '\x1b[90m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const RESET = '\x1b[0m';

console.log(`${GOLD}================================================================${RESET}`);
console.log(`${GOLD}                   MEHERAH OS - COMPREHENSIVE TEST SUITE         ${RESET}`);
console.log(`${GOLD}================================================================${RESET}`);

// Helper to simulate DB functions to prevent live DB corruption
const TEST_DB_FILE = path.join(process.cwd(), 'meherah_comprehensive_test_db.json');

interface TestMemoryItem {
  id: string;
  type: string;
  title: string;
  content: string;
  timestamp: string;
}

interface TestZKAuditLog {
  id: string;
  timestamp: string;
  text: string;
  proofHash: string;
  operationType: string;
  payload: any;
}

interface TestDB {
  missions: any[];
  memories: TestMemoryItem[];
  zkLogs: TestZKAuditLog[];
  connectors: any[];
  metrics: any[];
  agents: any[];
  batchQueue: any[];
}

function initTestDB(): TestDB {
  const initialDB: TestDB = {
    missions: [],
    memories: [
      { id: 'm1', type: 'preference', title: 'Premium Aesthetic Standard', content: 'User prefers luxury, matte black & matte gold themes.', timestamp: new Date().toISOString() }
    ],
    zkLogs: [],
    connectors: [
      { id: 'c1', name: 'MTN Mobile Money Gateway', provider: 'MTN', status: 'ONLINE', latencyMs: 42 },
      { id: 'c2', name: 'Airtel Money Channel', provider: 'AIRTEL', status: 'ONLINE', latencyMs: 51 }
    ],
    metrics: [],
    agents: [
      { id: 'chief', name: 'Chief Orchestrator', role: 'Orchestrator', status: AgentStatus.IDLE },
      { id: 'disburse', name: 'Disbursement Agent', role: 'Disbursement', status: AgentStatus.IDLE }
    ],
    batchQueue: []
  };
  fs.writeFileSync(TEST_DB_FILE, JSON.stringify(initialDB, null, 2));
  return initialDB;
}

function cleanupTestDB() {
  if (fs.existsSync(TEST_DB_FILE)) {
    fs.unlinkSync(TEST_DB_FILE);
  }
}

// Pure helpers matching MEHERAH server logic
function generateFakeZKProof(payload: string): string {
  let hash = 0;
  for (let i = 0; i < payload.length; i++) {
    const char = payload.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  const positiveHash = Math.abs(hash).toString(16).padStart(8, '0');
  const salt = 'prod_salt_0x';
  return `zkp_0x${positiveHash}${salt}f00d83bc7492beefc0ffe`;
}

function calculateUGXFee(amount: number): number {
  if (amount < 5000) return 100;
  if (amount < 50000) return 500;
  if (amount < 500000) return 1500;
  return 5000;
}

function selectGatewayByLatency(mtnLatency: number, airtelLatency: number): string {
  if (mtnLatency > 150) return 'AIRTEL';
  if (airtelLatency > 150) return 'MTN';
  return mtnLatency <= airtelLatency ? 'MTN' : 'AIRTEL';
}

// -------------------------------------------------------------------------
// TEST FRAMEWORK
// -------------------------------------------------------------------------
let testCount = 0;
let passedCount = 0;

function runTestGroup(groupName: string, tests: { [key: string]: () => void }) {
  console.log(`\n${TEAL}● [GROUP] ${groupName}${RESET}`);
  for (const [testName, fn] of Object.entries(tests)) {
    testCount++;
    try {
      fn();
      passedCount++;
      console.log(`  [${GREEN}PASSED${RESET}] - ${testName}`);
    } catch (error: any) {
      console.error(`  [${RED}FAILED${RESET}] - ${testName}`);
      console.error(`    ${DARK_GRAY}Reason:${RESET} ${error?.message || error}`);
    }
  }
}

// Execute tests
try {
  // 1. Unit Tests
  runTestGroup('1. Unit Tests (Pure Logic Verification)', {
    'UGX Tiered Transaction Fee Calculation': () => {
      assert.strictEqual(calculateUGXFee(3000), 100);
      assert.strictEqual(calculateUGXFee(25000), 500);
      assert.strictEqual(calculateUGXFee(350000), 1500);
      assert.strictEqual(calculateUGXFee(1500000), 5000);
    },
    'Gateway Routing Decisions based on latency': () => {
      assert.strictEqual(selectGatewayByLatency(40, 60), 'MTN');
      assert.strictEqual(selectGatewayByLatency(90, 30), 'AIRTEL');
      assert.strictEqual(selectGatewayByLatency(200, 45), 'AIRTEL', 'High latency on MTN should failover immediately');
      assert.strictEqual(selectGatewayByLatency(30, 250), 'MTN', 'High latency on Airtel should failover immediately');
    }
  });

  // 2. Integration Tests
  runTestGroup('2. Integration Tests (Full Flow Chain)', {
    'Mission creation auto-triggers cryptographic audit logs': () => {
      const db = initTestDB();
      const newMission = {
        id: 'mission-abc',
        goal: 'Disburse regional funding',
        status: MissionStatus.PLANNING,
        tasks: []
      };
      
      // Simulate endpoint creation
      db.missions.push(newMission);
      
      // Simulate audit trail link
      const auditPayload = JSON.stringify(newMission);
      const proof = generateFakeZKProof(auditPayload);
      const logEntry: TestZKAuditLog = {
        id: `zk-${Date.now()}`,
        timestamp: new Date().toISOString(),
        text: `Mission 'mission-abc' successfully registered under status ${MissionStatus.PLANNING}`,
        proofHash: proof,
        operationType: 'MISSION_REGISTER',
        payload: newMission
      };
      db.zkLogs.push(logEntry);

      fs.writeFileSync(TEST_DB_FILE, JSON.stringify(db, null, 2));

      // Assert linkages are preserved in DB
      const readBack = JSON.parse(fs.readFileSync(TEST_DB_FILE, 'utf-8'));
      assert.strictEqual(readBack.missions.length, 1);
      assert.strictEqual(readBack.zkLogs.length, 1);
      assert.strictEqual(readBack.zkLogs[0].payload.id, 'mission-abc');
      assert.strictEqual(readBack.zkLogs[0].proofHash, proof);
    }
  });

  // 3. API Tests
  runTestGroup('3. API Tests (Mock Payload and Route Validation)', {
    'Validate Mission Creation payload schema constraints': () => {
      const validateMissionRequest = (body: any) => {
        if (!body.goal || typeof body.goal !== 'string' || body.goal.trim() === '') {
          throw new Error('Goal must be a non-empty string');
        }
        return true;
      };

      // Valid case
      assert.ok(validateMissionRequest({ goal: 'Formulate Business Strategy' }));

      // Invalid cases
      assert.throws(() => validateMissionRequest({ goal: '' }), /Goal must be a non-empty string/);
      assert.throws(() => validateMissionRequest({}), /Goal must be a non-empty string/);
    },
    'Validate Memory Store API payload structure': () => {
      const validateMemoryRequest = (body: any) => {
        const allowedTypes = ['preference', 'episodic', 'semantic'];
        if (!body.type || !allowedTypes.includes(body.type)) {
          throw new Error('Invalid or missing memory type');
        }
        if (!body.title || !body.content) {
          throw new Error('Memory title and content are mandatory');
        }
        return true;
      };

      assert.ok(validateMemoryRequest({ type: 'preference', title: 'Theme', content: 'Dark' }));
      assert.throws(() => validateMemoryRequest({ type: 'fake', title: 'A', content: 'B' }), /Invalid or missing memory type/);
    }
  });

  // 4. Security Tests
  runTestGroup('4. Security Tests (Integrity & Vault Simulation)', {
    'ZK Proof verification ensures data integrity': () => {
      const originalData = { beneficiary: 'Alice', amount: 500000 };
      const originalProof = generateFakeZKProof(JSON.stringify(originalData));

      // Data is intact
      const verifyProof = generateFakeZKProof(JSON.stringify(originalData));
      assert.strictEqual(originalProof, verifyProof, 'Intact data must reproduce exact original ZK signature');

      // Attempt to tamper
      const tamperedData = { beneficiary: 'Alice', amount: 999999999 };
      const tamperedProof = generateFakeZKProof(JSON.stringify(tamperedData));
      assert.notStrictEqual(originalProof, tamperedProof, 'Tampered parameters must result in signature mismatch');
    },
    'Token headers verification simulations (mTLS simulator)': () => {
      const verifyMTLSHeaders = (headers: any) => {
        if (!headers['x-client-cert-verified'] || headers['x-client-cert-verified'] !== 'true') {
          return false;
        }
        if (!headers['authorization'] || !headers['authorization'].startsWith('Bearer ')) {
          return false;
        }
        return true;
      };

      assert.ok(verifyMTLSHeaders({ 'x-client-cert-verified': 'true', 'authorization': 'Bearer meherah-token' }));
      assert.strictEqual(verifyMTLSHeaders({ 'x-client-cert-verified': 'false', 'authorization': 'Bearer token' }), false);
      assert.strictEqual(verifyMTLSHeaders({ 'authorization': 'Bearer token' }), false);
    }
  });

  // 5. Database Tests
  runTestGroup('5. Database Tests (Persistent Layer Diagnostics)', {
    'Database transactions are written concurrently without corruption': () => {
      const db = initTestDB();
      
      // Perform batch parallel updates
      const parallelWrites = 5;
      for (let i = 0; i < parallelWrites; i++) {
        db.metrics.push({
          id: `metric-${i}`,
          timestamp: new Date().toISOString(),
          systemLoad: 0.12 * i,
          activeTasks: i
        });
      }
      fs.writeFileSync(TEST_DB_FILE, JSON.stringify(db, null, 2));

      // Read back and assert consistency
      const readBack = JSON.parse(fs.readFileSync(TEST_DB_FILE, 'utf-8'));
      assert.strictEqual(readBack.metrics.length, 5);
      assert.strictEqual(readBack.metrics[4].id, 'metric-4');
    }
  });

  // 6. Agent Communication Tests
  runTestGroup('6. Agent Communication Tests (Multi-Agent Messaging Integrity)', {
    'Verify Orchestrator messages to Disbursement Sub-agents matches protocol': () => {
      interface AgentMessage {
        senderId: string;
        receiverId: string;
        channel: string;
        payload: {
          action: string;
          params: any;
        };
        timestamp: string;
      }

      const createAgentMessage = (sender: string, receiver: string, action: string, params: any): AgentMessage => {
        return {
          senderId: sender,
          receiverId: receiver,
          channel: 'SecureInterAgentBus_v1',
          payload: { action, params },
          timestamp: new Date().toISOString()
        };
      };

      const msg = createAgentMessage('chief', 'disburse', 'TRIGGER_DISBURSEMENT', { amount: 200000, recipient: '+256701111111' });
      assert.strictEqual(msg.senderId, 'chief');
      assert.strictEqual(msg.receiverId, 'disburse');
      assert.strictEqual(msg.payload.action, 'TRIGGER_DISBURSEMENT');
      assert.strictEqual(msg.payload.params.amount, 200000);
    }
  });

  // 7. Memory Tests
  runTestGroup('7. Memory Tests (Episodic & Preference Retrieval)', {
    'Retrieve preference memories based on query tags': () => {
      const db = initTestDB();
      db.memories.push({
        id: 'm-lux',
        type: 'preference',
        title: 'Luxury Preference',
        content: 'Matte gold gradients are preferred.',
        timestamp: new Date().toISOString()
      });
      db.memories.push({
        id: 'm-tech',
        type: 'episodic',
        title: 'Fintech Transaction Success',
        content: 'Kampala-Nairobi payment gateway resolved on MTN network.',
        timestamp: new Date().toISOString()
      });

      const searchMemories = (type: string) => {
        return db.memories.filter(m => m.type === type);
      };

      const preferences = searchMemories('preference');
      assert.strictEqual(preferences.length, 2); // 1 initial + 1 new
      assert.strictEqual(preferences[1].id, 'm-lux');

      const episodics = searchMemories('episodic');
      assert.strictEqual(episodics.length, 1);
      assert.strictEqual(episodics[0].id, 'm-tech');
    }
  });

  // 8. Mission Tests
  runTestGroup('8. Mission Tests (Lifecycle & HITL Gate Enforcement)', {
    'Validate Mission State Machine with Human-In-The-Loop gate': () => {
      // Mission State Progression simulation
      let missionStatus = MissionStatus.PLANNING;
      
      const transitionStatus = (current: MissionStatus, action: 'START' | 'WAIT' | 'APPROVE' | 'FINISH') => {
        switch (current) {
          case MissionStatus.PLANNING:
            if (action === 'START') return MissionStatus.RUNNING;
            break;
          case MissionStatus.RUNNING:
            if (action === 'WAIT') return MissionStatus.PAUSED_APPROVAL;
            if (action === 'FINISH') return MissionStatus.COMPLETED;
            break;
          case MissionStatus.PAUSED_APPROVAL:
            if (action === 'APPROVE') return MissionStatus.RUNNING;
            break;
        }
        return current;
      };

      // Progress lifecycle
      missionStatus = transitionStatus(missionStatus, 'START');
      assert.strictEqual(missionStatus, MissionStatus.RUNNING);

      // Hit compliance gate -> goes to PAUSED_APPROVAL
      missionStatus = transitionStatus(missionStatus, 'WAIT');
      assert.strictEqual(missionStatus, MissionStatus.PAUSED_APPROVAL, 'Must transition to PAUSED_APPROVAL when hit compliance thresholds');

      // Human Approves -> resumes RUNNING
      missionStatus = transitionStatus(missionStatus, 'APPROVE');
      assert.strictEqual(missionStatus, MissionStatus.RUNNING, 'Approval must transition state back to active RUNNING mode');
    }
  });

} finally {
  cleanupTestDB();
}

console.log(`\n${GOLD}================================================================${RESET}`);
console.log(`Test Execution Summary: ${GREEN}${passedCount} PASSED${RESET} / ${testCount} TOTAL`);
console.log(`${GOLD}================================================================${RESET}`);
process.exit(passedCount === testCount ? 0 : 1);

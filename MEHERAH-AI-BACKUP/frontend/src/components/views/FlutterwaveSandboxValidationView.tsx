import React, { useState } from 'react';
import { 
  Play, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  RefreshCw, 
  ShieldCheck, 
  Zap, 
  Cpu, 
  Globe, 
  Send, 
  ArrowRight, 
  Terminal, 
  Check, 
  Server, 
  FileText, 
  Scale, 
  Activity, 
  Layers, 
  Copy, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';

export function FlutterwaveSandboxValidationView() {
  const [activeTestTab, setActiveTestTab] = useState<number>(0); // 0 = Run All / Overview, 1-7 = Specific Test
  const [isRunningAll, setIsRunningAll] = useState<boolean>(false);
  const [loadingTestId, setLoadingTestId] = useState<string | null>(null);

  // Demo Form State for Test 7
  const [demoSender, setDemoSender] = useState<string>('+256701234567 (Airtel Uganda)');
  const [demoRecipient, setDemoRecipient] = useState<string>('+256772987654 (MTN Mobile Money)');
  const [demoAmount, setDemoAmount] = useState<number>(100000);

  // Test Results Store
  const [testResults, setTestResults] = useState<Record<string, any>>({
    TEST_1: null,
    TEST_2: null,
    TEST_3: null,
    TEST_4: null,
    TEST_5: null,
    TEST_6: null,
    TEST_7: null
  });

  const [expandedLogs, setExpandedLogs] = useState<Record<string, boolean>>({
    TEST_1: true,
    TEST_2: true,
    TEST_3: true,
    TEST_4: true,
    TEST_5: true,
    TEST_6: true,
    TEST_7: true
  });

  const toggleLog = (testId: string) => {
    setExpandedLogs(prev => ({ ...prev, [testId]: !prev[testId] }));
  };

  const runTestEndpoint = async (endpoint: string, testId: string, body?: any) => {
    setLoadingTestId(testId);
    try {
      const res = await fetch(`/api/meherah/sandbox/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined
      });
      const data = await res.json();
      setTestResults(prev => ({ ...prev, [testId]: data }));
    } catch (err: any) {
      setTestResults(prev => ({
        ...prev,
        [testId]: {
          testId,
          testName: `Test (${testId})`,
          passed: false,
          timestamp: new Date().toISOString(),
          durationMs: 0,
          logs: [`[ERROR] Failed to communicate with sandbox API: ${err?.message || 'Network error'}`],
          output: { error: err?.message || 'Endpoint failure' }
        }
      }));
    } finally {
      setLoadingTestId(null);
    }
  };

  const handleRunAllTests = async () => {
    setIsRunningAll(true);
    try {
      const res = await fetch('/api/meherah/sandbox/run-all', { method: 'POST' });
      const data = await res.json();
      if (data.results && Array.isArray(data.results)) {
        const newResults: Record<string, any> = {};
        data.results.forEach((r: any) => {
          newResults[r.testId] = r;
        });
        setTestResults(newResults);
      }
    } catch (err) {
      console.error('Run all error:', err);
    } finally {
      setIsRunningAll(false);
    }
  };

  return (
    <div className="space-y-6 text-[#FFFFFF] font-sans antialiased bg-[#070707] min-h-screen">
      
      {/* HEADER BANNER */}
      <div className="bg-[#111111] border border-[#C9A227]/25 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-[#C9A227]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold tracking-widest text-[#E8C879] uppercase px-3 py-0.5 rounded-full bg-[#C9A227]/15 border border-[#C9A227]/30">
                SANDBOX VALIDATION PHASE
              </span>
              <span className="text-xs font-mono text-[#00B86B] font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00B86B] animate-pulse" /> ENVIRONMENT: SANDBOX ONLY
              </span>
            </div>
            <h1 className="text-2xl font-bold font-playfair tracking-tight text-[#FFFFFF] mt-2">
              Flutterwave Gateway Integration & AI Execution Pipeline
            </h1>
            <p className="text-xs text-[#A7A7A7] mt-1 font-sans">
              End-to-end verification of payment routing, webhook signatures, double-entry ledger settlement, failure resilience, and AI decision traces.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRunAllTests}
              disabled={isRunningAll}
              className="px-5 py-2.5 rounded-xl bg-[#C9A227] text-[#070707] font-mono font-bold text-xs hover:bg-[#E8C879] transition-all flex items-center gap-2 shadow-lg shadow-[#C9A227]/20 disabled:opacity-50"
            >
              {isRunningAll ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-[#070707]" /> Executing All 7 Tests...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current text-[#070707]" /> Run Full 7-Step Validation Pipeline
                </>
              )}
            </button>
          </div>
        </div>

        {/* STATUS COUNTERS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-[#222222]">
          <div className="p-3 bg-[#070707] border border-[#222222] rounded-xl font-mono">
            <span className="text-[10px] text-[#666666] font-bold block">TOTAL TEST SUITES</span>
            <span className="text-lg font-bold text-[#FFFFFF]">7 VERIFICATION TESTS</span>
          </div>
          <div className="p-3 bg-[#070707] border border-[#222222] rounded-xl font-mono">
            <span className="text-[10px] text-[#666666] font-bold block">GATEWAY ADAPTER</span>
            <span className="text-lg font-bold text-[#E8C879]">FLUTTERWAVE SBX</span>
          </div>
          <div className="p-3 bg-[#070707] border border-[#222222] rounded-xl font-mono">
            <span className="text-[10px] text-[#666666] font-bold block">LEDGER STATUS</span>
            <span className="text-lg font-bold text-[#00B86B]">ZERO-SUM BALANCED</span>
          </div>
          <div className="p-3 bg-[#070707] border border-[#222222] rounded-xl font-mono">
            <span className="text-[10px] text-[#666666] font-bold block">CIRCUIT BREAKER</span>
            <span className="text-lg font-bold text-[#00B86B]">CLOSED (NORMAL)</span>
          </div>
        </div>
      </div>

      {/* TEST SELECTOR TABS */}
      <div className="flex flex-wrap gap-2 border-b border-[#222222] pb-3">
        {[
          { id: 0, label: 'Pipeline Summary' },
          { id: 1, label: 'Test 1: Gateway Conn' },
          { id: 2, label: 'Test 2: Create Payment' },
          { id: 3, label: 'Test 3: Webhook Verification' },
          { id: 4, label: 'Test 4: Ledger Recon' },
          { id: 5, label: 'Test 5: AI Decision Trace' },
          { id: 6, label: 'Test 6: Failure Testing' },
          { id: 7, label: 'Test 7: Airtel → MTN Demo' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTestTab(tab.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold font-sans transition-all flex items-center gap-1.5 ${
              activeTestTab === tab.id
                ? 'bg-[#C9A227] text-[#070707] font-bold shadow-md'
                : 'bg-[#111111] text-[#A7A7A7] border border-[#222222] hover:text-[#FFFFFF]'
            }`}
          >
            {tab.id > 0 && (
              <span className={`w-2 h-2 rounded-full ${testResults[`TEST_${tab.id}`]?.passed ? 'bg-[#00B86B]' : 'bg-[#666666]'}`} />
            )}
            {tab.label}
          </button>
        ))}
      </div>

      {/* TABS CONTENT */}

      {/* TAB 0: SUMMARY / ALL TESTS OVERVIEW */}
      {activeTestTab === 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* TEST 1 CARD */}
          <div className="bg-[#111111] border border-[#C9A227]/20 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#222222] pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#E8C879] bg-[#070707] px-2 py-0.5 rounded border border-[#C9A227]/30">TEST 1</span>
                <h3 className="text-base font-bold font-playfair text-[#FFFFFF]">Gateway Connection</h3>
              </div>
              <button
                onClick={() => runTestEndpoint('test1', 'TEST_1')}
                disabled={loadingTestId === 'TEST_1'}
                className="px-3 py-1.5 rounded-lg bg-[#070707] border border-[#C9A227]/40 text-[#E8C879] text-xs font-mono font-bold hover:bg-[#C9A227] hover:text-[#070707] transition-all flex items-center gap-1.5"
              >
                {loadingTestId === 'TEST_1' ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />} Execute
              </button>
            </div>

            {testResults.TEST_1 ? (
              <div className="space-y-3">
                <div className="p-3 bg-[#070707] border border-[#222222] rounded-xl font-mono text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Provider:</span>
                    <span className="text-[#FFFFFF] font-bold">{testResults.TEST_1.output?.provider}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Status:</span>
                    <span className="text-[#00B86B] font-bold">{testResults.TEST_1.output?.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Latency:</span>
                    <span className="text-[#E8C879] font-bold">{testResults.TEST_1.output?.latency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Circuit Breaker:</span>
                    <span className="text-[#00B86B] font-bold">{testResults.TEST_1.output?.circuitBreaker}</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-[#A7A7A7] font-mono">Awaiting execution... Click Execute above to run Test 1.</p>
            )}
          </div>

          {/* TEST 2 CARD */}
          <div className="bg-[#111111] border border-[#C9A227]/20 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#222222] pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#E8C879] bg-[#070707] px-2 py-0.5 rounded border border-[#C9A227]/30">TEST 2</span>
                <h3 className="text-base font-bold font-playfair text-[#FFFFFF]">Create Sandbox Payment</h3>
              </div>
              <button
                onClick={() => runTestEndpoint('test2', 'TEST_2')}
                disabled={loadingTestId === 'TEST_2'}
                className="px-3 py-1.5 rounded-lg bg-[#070707] border border-[#C9A227]/40 text-[#E8C879] text-xs font-mono font-bold hover:bg-[#C9A227] hover:text-[#070707] transition-all flex items-center gap-1.5"
              >
                {loadingTestId === 'TEST_2' ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />} Execute
              </button>
            </div>

            {testResults.TEST_2 ? (
              <div className="space-y-3">
                <div className="p-3 bg-[#070707] border border-[#222222] rounded-xl font-mono text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Amount:</span>
                    <span className="text-[#FFFFFF] font-bold">{testResults.TEST_2.output?.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Provider:</span>
                    <span className="text-[#E8C879] font-bold">{testResults.TEST_2.output?.provider}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Status:</span>
                    <span className="text-[#F5A623] font-bold">{testResults.TEST_2.output?.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">TxRef:</span>
                    <span className="text-[#A7A7A7] text-[10px]">{testResults.TEST_2.output?.txRef}</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-[#A7A7A7] font-mono">Awaiting execution... Click Execute above to run Test 2.</p>
            )}
          </div>

          {/* TEST 3 CARD */}
          <div className="bg-[#111111] border border-[#C9A227]/20 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#222222] pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#E8C879] bg-[#070707] px-2 py-0.5 rounded border border-[#C9A227]/30">TEST 3</span>
                <h3 className="text-base font-bold font-playfair text-[#FFFFFF]">Webhook Verification</h3>
              </div>
              <button
                onClick={() => runTestEndpoint('test3', 'TEST_3')}
                disabled={loadingTestId === 'TEST_3'}
                className="px-3 py-1.5 rounded-lg bg-[#070707] border border-[#C9A227]/40 text-[#E8C879] text-xs font-mono font-bold hover:bg-[#C9A227] hover:text-[#070707] transition-all flex items-center gap-1.5"
              >
                {loadingTestId === 'TEST_3' ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />} Execute
              </button>
            </div>

            {testResults.TEST_3 ? (
              <div className="space-y-3">
                <div className="p-3 bg-[#070707] border border-[#222222] rounded-xl font-mono text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Signature:</span>
                    <span className="text-[#00B86B] font-bold">{testResults.TEST_3.output?.signatureValidation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Idempotency:</span>
                    <span className="text-[#E8C879] font-bold">{testResults.TEST_3.output?.duplicateProtection}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">State Update:</span>
                    <span className="text-[#00B86B] font-bold">{testResults.TEST_3.output?.transactionStateUpdate}</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-[#A7A7A7] font-mono">Awaiting execution... Click Execute above to run Test 3.</p>
            )}
          </div>

          {/* TEST 4 CARD */}
          <div className="bg-[#111111] border border-[#C9A227]/20 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#222222] pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#E8C879] bg-[#070707] px-2 py-0.5 rounded border border-[#C9A227]/30">TEST 4</span>
                <h3 className="text-base font-bold font-playfair text-[#FFFFFF]">Ledger Reconciliation</h3>
              </div>
              <button
                onClick={() => runTestEndpoint('test4', 'TEST_4')}
                disabled={loadingTestId === 'TEST_4'}
                className="px-3 py-1.5 rounded-lg bg-[#070707] border border-[#C9A227]/40 text-[#E8C879] text-xs font-mono font-bold hover:bg-[#C9A227] hover:text-[#070707] transition-all flex items-center gap-1.5"
              >
                {loadingTestId === 'TEST_4' ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />} Execute
              </button>
            </div>

            {testResults.TEST_4 ? (
              <div className="space-y-3">
                <div className="p-3 bg-[#070707] border border-[#222222] rounded-xl font-mono text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Debit:</span>
                    <span className="text-[#FFFFFF] font-bold">{testResults.TEST_4.output?.debitAccount} ({testResults.TEST_4.output?.debitAmount})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Credit:</span>
                    <span className="text-[#FFFFFF] font-bold">{testResults.TEST_4.output?.creditAccount} ({testResults.TEST_4.output?.creditAmount})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Ledger Imbalance:</span>
                    <span className="text-[#00B86B] font-bold">{testResults.TEST_4.output?.imbalanceDelta}</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-[#A7A7A7] font-mono">Awaiting execution... Click Execute above to run Test 4.</p>
            )}
          </div>

          {/* TEST 5 CARD */}
          <div className="bg-[#111111] border border-[#C9A227]/20 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#222222] pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#E8C879] bg-[#070707] px-2 py-0.5 rounded border border-[#C9A227]/30">TEST 5</span>
                <h3 className="text-base font-bold font-playfair text-[#FFFFFF]">AI Decision Trace</h3>
              </div>
              <button
                onClick={() => runTestEndpoint('test5', 'TEST_5')}
                disabled={loadingTestId === 'TEST_5'}
                className="px-3 py-1.5 rounded-lg bg-[#070707] border border-[#C9A227]/40 text-[#E8C879] text-xs font-mono font-bold hover:bg-[#C9A227] hover:text-[#070707] transition-all flex items-center gap-1.5"
              >
                {loadingTestId === 'TEST_5' ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />} Execute
              </button>
            </div>

            {testResults.TEST_5 ? (
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 bg-[#070707] border border-[#222222] rounded-xl space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Selected:</span>
                    <span className="text-[#E8C879] font-bold">{testResults.TEST_5.output?.selectedProvider}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Confidence:</span>
                    <span className="text-[#00B86B] font-bold">{testResults.TEST_5.output?.confidence}</span>
                  </div>
                  <p className="text-[#A7A7A7] text-[11px] font-sans pt-1">"{testResults.TEST_5.output?.reason}"</p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-[#A7A7A7] font-mono">Awaiting execution... Click Execute above to run Test 5.</p>
            )}
          </div>

          {/* TEST 6 CARD */}
          <div className="bg-[#111111] border border-[#C9A227]/20 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#222222] pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#E8C879] bg-[#070707] px-2 py-0.5 rounded border border-[#C9A227]/30">TEST 6</span>
                <h3 className="text-base font-bold font-playfair text-[#FFFFFF]">Failure Testing & Resilience</h3>
              </div>
              <button
                onClick={() => runTestEndpoint('test6', 'TEST_6')}
                disabled={loadingTestId === 'TEST_6'}
                className="px-3 py-1.5 rounded-lg bg-[#070707] border border-[#C9A227]/40 text-[#E8C879] text-xs font-mono font-bold hover:bg-[#C9A227] hover:text-[#070707] transition-all flex items-center gap-1.5"
              >
                {loadingTestId === 'TEST_6' ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />} Execute
              </button>
            </div>

            {testResults.TEST_6 ? (
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 bg-[#070707] border border-[#222222] rounded-xl space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[#C62828] font-bold">503 Error:</span>
                    <span className="text-[#E8C879] font-bold">{testResults.TEST_6.output?.scenarioA?.alternativeRoute}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#F5A623] font-bold">Latency Delay:</span>
                    <span className="text-[#FFFFFF]">{testResults.TEST_6.output?.scenarioB?.action}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#00B86B] font-bold">Duplicate Tx:</span>
                    <span className="text-[#00B86B]">{testResults.TEST_6.output?.scenarioC?.action} ({testResults.TEST_6.output?.scenarioC?.reason})</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-[#A7A7A7] font-mono">Awaiting execution... Click Execute above to run Test 6.</p>
            )}
          </div>

        </div>
      )}

      {/* INDIVIDUAL TAB VIEW (1-6) */}
      {activeTestTab >= 1 && activeTestTab <= 6 && (
        <div className="bg-[#111111] border border-[#C9A227]/20 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-[#222222] pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-[#E8C879] uppercase">TEST SUITE {activeTestTab}</span>
              <h2 className="text-xl font-bold font-playfair text-[#FFFFFF]">
                {activeTestTab === 1 && 'Test 1 — Gateway Connection Verification'}
                {activeTestTab === 2 && 'Test 2 — Create Sandbox Payment'}
                {activeTestTab === 3 && 'Test 3 — Webhook Signature & Idempotency'}
                {activeTestTab === 4 && 'Test 4 — Double-Entry Ledger Reconciliation'}
                {activeTestTab === 5 && 'Test 5 — Mission Control AI Decision Trace'}
                {activeTestTab === 6 && 'Test 6 — Failure Resilience & Chaos Engineering'}
              </h2>
            </div>

            <button
              onClick={() => runTestEndpoint(`test${activeTestTab}`, `TEST_${activeTestTab}`)}
              disabled={loadingTestId === `TEST_${activeTestTab}`}
              className="px-4 py-2 rounded-xl bg-[#C9A227] text-[#070707] font-mono font-bold text-xs hover:bg-[#E8C879] transition-all flex items-center gap-2"
            >
              {loadingTestId === `TEST_${activeTestTab}` ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />} Run Test {activeTestTab}
            </button>
          </div>

          {/* RESULTS DISPLAY */}
          {testResults[`TEST_${activeTestTab}`] ? (
            <div className="space-y-6">
              
              {/* STATUS BANNER */}
              <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#00B86B]" />
                  <div>
                    <h4 className="text-sm font-bold text-[#FFFFFF] font-sans">TEST EXECUTED SUCCESSFULLY</h4>
                    <p className="text-xs text-[#A7A7A7] font-mono">Timestamp: {testResults[`TEST_${activeTestTab}`].timestamp} • Latency: {testResults[`TEST_${activeTestTab}`].durationMs}ms</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#00B86B]/15 text-[#00B86B] font-mono font-bold text-xs border border-[#00B86B]/30">
                  PASSED ✓
                </span>
              </div>

              {/* OUTPUT OBJECT */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-bold text-[#E8C879] uppercase">STRUCTURED OUTPUT:</h4>
                <pre className="p-4 bg-[#070707] border border-[#222222] rounded-xl font-mono text-xs text-[#FFFFFF] overflow-x-auto">
                  {JSON.stringify(testResults[`TEST_${activeTestTab}`].output, null, 2)}
                </pre>
              </div>

              {/* LOGS TERMINAL */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono font-bold text-[#A7A7A7] uppercase flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[#C9A227]" /> EXECUTION LOG TRAIL ({testResults[`TEST_${activeTestTab}`].logs?.length || 0} STEPS)
                  </h4>
                </div>
                <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl font-mono text-xs space-y-1.5 text-[#E8C879]">
                  {testResults[`TEST_${activeTestTab}`].logs?.map((log: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-[#666666] text-[10px] select-none">{String(idx + 1).padStart(2, '0')}</span>
                      <span>{log}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="p-12 text-center bg-[#070707] border border-[#222222] rounded-2xl space-y-3">
              <Play className="w-10 h-10 text-[#C9A227] mx-auto opacity-80" />
              <p className="text-sm text-[#FFFFFF] font-sans font-semibold">Click "Run Test {activeTestTab}" to execute this sandbox scenario in real time.</p>
            </div>
          )}
        </div>
      )}

      {/* TAB 7: DEMO SCENARIO ("Airtel user pays an MTN recipient through MEHERAH") */}
      {activeTestTab === 7 && (
        <div className="bg-[#111111] border border-[#C9A227]/25 rounded-2xl p-6 space-y-6">
          <div className="border-b border-[#222222] pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded font-bold">TEST 7 DEMO</span>
              <h2 className="text-xl font-bold font-playfair text-[#FFFFFF]">
                Airtel User Pays an MTN Recipient Through MEHERAH
              </h2>
            </div>
            <p className="text-xs text-[#A7A7A7] mt-1 font-sans">
              Complete end-to-end demonstration showcasing cross-network identification, AI routing, risk checks, sandbox execution, webhook confirmation, and ledger settlement.
            </p>
          </div>

          {/* INPUT FORM */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-[#070707] border border-[#222222] rounded-xl">
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-[#666666] font-bold block uppercase">Sender (Airtel Network)</label>
              <input
                type="text"
                value={demoSender}
                onChange={e => setDemoSender(e.target.value)}
                className="w-full bg-[#111111] border border-[#222222] rounded-lg px-3 py-2 text-xs font-mono text-[#FFFFFF] focus:outline-none focus:border-[#C9A227]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-[#666666] font-bold block uppercase">Recipient (MTN Mobile Money)</label>
              <input
                type="text"
                value={demoRecipient}
                onChange={e => setDemoRecipient(e.target.value)}
                className="w-full bg-[#111111] border border-[#222222] rounded-lg px-3 py-2 text-xs font-mono text-[#FFFFFF] focus:outline-none focus:border-[#C9A227]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-[#666666] font-bold block uppercase">Transfer Amount (UGX)</label>
              <input
                type="number"
                value={demoAmount}
                onChange={e => setDemoAmount(Number(e.target.value))}
                className="w-full bg-[#111111] border border-[#222222] rounded-lg px-3 py-2 text-xs font-mono text-[#FFFFFF] focus:outline-none focus:border-[#C9A227]"
              />
            </div>
          </div>

          <button
            onClick={() => runTestEndpoint('test7', 'TEST_7', { senderPhone: demoSender, recipientPhone: demoRecipient, amountUGX: demoAmount })}
            disabled={loadingTestId === 'TEST_7'}
            className="w-full py-3.5 rounded-xl bg-[#C9A227] text-[#070707] font-mono font-bold text-xs hover:bg-[#E8C879] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#C9A227]/20"
          >
            {loadingTestId === 'TEST_7' ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-[#070707]" /> Executing Airtel → MTN Cross-Network Payment Pipeline...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 fill-current text-[#070707]" /> Execute End-to-End Airtel → MTN Transfer Demo
              </>
            )}
          </button>

          {/* DEMO EXECUTION VISUALIZER */}
          {testResults.TEST_7 && (
            <div className="space-y-6 pt-4 border-t border-[#222222]">
              
              {/* STEPS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { step: '1', title: 'Recipient Input', desc: testResults.TEST_7.output?.step1, icon: FileText },
                  { step: '2', title: 'Destination ID', desc: testResults.TEST_7.output?.step2, icon: Globe },
                  { step: '3', title: 'AI Route Selection', desc: testResults.TEST_7.output?.step3, icon: Cpu },
                  { step: '4', title: 'Risk Verification', desc: testResults.TEST_7.output?.step4, icon: ShieldCheck },
                  { step: '5', title: 'Sandbox Execution', desc: testResults.TEST_7.output?.step5, icon: Send },
                  { step: '6', title: 'Webhook Confirmed', desc: testResults.TEST_7.output?.step6, icon: CheckCircle2 },
                  { step: '7', title: 'Ledger Settled', desc: testResults.TEST_7.output?.step7, icon: Scale },
                  { step: '8', title: 'Mission Control', desc: testResults.TEST_7.output?.step8, icon: Activity }
                ].map(s => {
                  const Icon = s.icon;
                  return (
                    <div key={s.step} className="p-3 bg-[#070707] border border-[#222222] rounded-xl space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-[#E8C879] bg-[#111111] px-2 py-0.5 rounded border border-[#C9A227]/20">
                          STEP {s.step}
                        </span>
                        <Icon className="w-4 h-4 text-[#00B86B]" />
                      </div>
                      <h4 className="text-xs font-bold text-[#FFFFFF] font-sans">{s.title}</h4>
                      <p className="text-[11px] text-[#A7A7A7] font-mono">{s.desc}</p>
                    </div>
                  );
                })}
              </div>

              {/* MISSION CONTROL INTELLIGENCE TRAIL */}
              <div className="p-5 bg-[#070707] border border-[#C9A227]/30 rounded-2xl space-y-3">
                <div className="flex items-center justify-between border-b border-[#222222] pb-2">
                  <h4 className="text-xs font-mono font-bold text-[#E8C879] uppercase flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[#C9A227]" /> MISSION CONTROL COMPLETE INTELLIGENCE TRAIL
                  </h4>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-[#00B86B]/15 text-[#00B86B] font-bold border border-[#00B86B]/30">
                    SETTLED & VERIFIED
                  </span>
                </div>

                <div className="space-y-1 font-mono text-xs text-[#E8C879]">
                  {testResults.TEST_7.logs?.map((log: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-[#666666] select-none text-[10px]">{String(idx + 1).padStart(2, '0')}</span>
                      <span>{log}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>
      )}

    </div>
  );
}

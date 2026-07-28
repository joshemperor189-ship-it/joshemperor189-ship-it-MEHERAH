import React, { useState, useEffect } from 'react';
import { ToggleLeft, ToggleRight, Settings, FileText, Send, Layers, RefreshCw, Eye } from 'lucide-react';
import { ToolConnector } from '../enterprise_types';

export default function ConnectorsTab() {
  const [connectors, setConnectors] = useState<ToolConnector[]>([]);
  const [selectedConnectorId, setSelectedConnectorId] = useState<string>('tc10'); // fs by default
  const [fsFilename, setFsFilename] = useState<string>('meherah_sandbox.txt');
  const [fsContent, setFsContent] = useState<string>('Authorized payload signed by MEHERAH OS core.');
  const [fsAction, setFsAction] = useState<"read_file" | "write_file">("write_file");
  const [restUrl, setRestUrl] = useState<string>('https://httpbin.org/get');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [execOutput, setExecOutput] = useState<string>('');

  const fetchConnectors = async () => {
    try {
      const res = await fetch('/api/connectors');
      if (res.ok) {
        const data = await res.json();
        setConnectors(data);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    fetchConnectors();
  }, []);

  const handleToggle = async (id: string) => {
    try {
      const res = await fetch('/api/connectors/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if (res.ok) {
        fetchConnectors();
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const handleExecute = async () => {
    setIsExecuting(true);
    setExecOutput('');
    try {
      let payload = {};
      let action = "run";

      if (selectedConnectorId === "tc10") {
        action = fsAction;
        payload = { filename: fsFilename, content: fsContent };
      } else if (selectedConnectorId === "tc8") {
        action = "get";
        payload = { url: restUrl };
      } else {
        action = "mock_sync";
        payload = { trigger: "visual_test" };
      }

      const res = await fetch('/api/connectors/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          connectorId: selectedConnectorId,
          action,
          payload
        })
      });
      if (res.ok) {
        const data = await res.json();
        setExecOutput(data.output);
        fetchConnectors(); // refresh logs
      }
    } catch (e: any) {
      setExecOutput("Execution failure: " + e.message);
    } finally {
      setIsExecuting(false);
    }
  };

  const activeConnector = connectors.find(c => c.id === selectedConnectorId);

  return (
    <div className="space-y-6" id="connectors_panel">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Connectors Status and Config */}
        <div className="lg:col-span-7 border border-zinc-800 bg-zinc-950 p-6 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-500" /> Modular Connector Registry
            </h3>
            <button onClick={fetchConnectors} className="text-zinc-500 hover:text-zinc-300 transition-colors">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2.5 h-[360px] overflow-y-auto pr-1 custom-scrollbar">
            {connectors.map(c => (
              <div 
                key={c.id} 
                onClick={() => setSelectedConnectorId(c.id)}
                className={`p-3 border rounded-lg flex items-center justify-between cursor-pointer transition-all ${
                  c.id === selectedConnectorId ? 'bg-amber-500/5 border-amber-500/30' : 'bg-zinc-900/10 border-zinc-900 hover:border-zinc-800'
                }`}
              >
                <div>
                  <h4 className="text-xs font-bold text-zinc-200">{c.name}</h4>
                  <div className="flex gap-2 mt-1">
                    <span className="text-[9px] font-mono bg-zinc-900 text-zinc-500 px-1 rounded uppercase">{c.category}</span>
                    <span className="text-[9px] font-mono text-amber-400">Perms: {c.permissions.join(', ')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                  <span className={`text-[10px] font-mono ${c.status === 'CONNECTED' ? 'text-emerald-400' : 'text-zinc-600'}`}>
                    {c.status}
                  </span>
                  <button onClick={() => handleToggle(c.id)} className="text-zinc-400 hover:text-zinc-200 transition-colors">
                    {c.status === 'CONNECTED' ? (
                      <ToggleRight className="w-6 h-6 text-emerald-500" />
                    ) : (
                      <ToggleLeft className="w-6 h-6 text-zinc-600" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real Tool Connector Playground */}
        <div className="lg:col-span-5 border border-zinc-800 bg-zinc-950 p-6 rounded-xl flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2 mb-2">
              <Settings className="w-5 h-5 text-amber-500" /> Connector Playground
            </h3>
            <p className="text-xs text-zinc-500 mb-4">
              Select any connector on the left to trigger real local file I/O operations or external network REST webhooks.
            </p>

            {activeConnector ? (
              <div className="space-y-4">
                <div className="p-3 bg-zinc-900/40 border border-zinc-900 rounded-lg">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">ACTIVE PLAYGROUND NODE:</span>
                  <p className="text-xs font-bold text-zinc-300 mt-0.5">{activeConnector.name}</p>
                </div>

                {activeConnector.id === "tc10" && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => setFsAction("write_file")}
                        className={`py-1.5 font-mono text-[10px] font-bold rounded border ${fsAction === "write_file" ? "bg-amber-500/10 text-amber-300 border-amber-500/20" : "bg-zinc-900 text-zinc-500 border-zinc-900"}`}
                      >
                        WRITE FILE
                      </button>
                      <button 
                        onClick={() => setFsAction("read_file")}
                        className={`py-1.5 font-mono text-[10px] font-bold rounded border ${fsAction === "read_file" ? "bg-amber-500/10 text-amber-300 border-amber-500/20" : "bg-zinc-900 text-zinc-500 border-zinc-900"}`}
                      >
                        READ FILE
                      </button>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-zinc-500 mb-1">FILENAME:</label>
                      <input 
                        type="text" 
                        value={fsFilename}
                        onChange={(e) => setFsFilename(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1.5 text-xs font-mono text-zinc-300 outline-none"
                      />
                    </div>

                    {fsAction === "write_file" && (
                      <div>
                        <label className="block text-[10px] font-mono text-zinc-500 mb-1">CONTENT:</label>
                        <textarea 
                          value={fsContent}
                          onChange={(e) => setFsContent(e.target.value)}
                          rows={3}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1.5 text-xs font-mono text-zinc-300 outline-none resize-none"
                        />
                      </div>
                    )}
                  </div>
                )}

                {activeConnector.id === "tc8" && (
                  <div>
                    <label className="block text-[10px] font-mono text-zinc-500 mb-1">TARGET REST URL endpoint:</label>
                    <input 
                      type="text" 
                      value={restUrl}
                      onChange={(e) => setRestUrl(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1.5 text-xs font-mono text-zinc-300 outline-none"
                    />
                  </div>
                )}

                {activeConnector.id !== "tc10" && activeConnector.id !== "tc8" && (
                  <div className="p-3 border border-dashed border-zinc-900 rounded-lg text-center text-[11px] font-mono text-zinc-500">
                    Active connector operates in compliant secure sandbox mode.
                  </div>
                )}

                <button
                  onClick={handleExecute}
                  disabled={isExecuting}
                  className="w-full py-2 bg-zinc-900 hover:bg-zinc-850 border border-amber-500/30 text-amber-300 hover:text-amber-200 text-xs font-mono font-bold rounded flex items-center justify-center gap-1.5 transition-all"
                >
                  <Send className="w-3.5 h-3.5" /> {isExecuting ? "Executing Connector..." : "Trigger Connector Operation"}
                </button>
              </div>
            ) : (
              <div className="h-40 border border-dashed border-zinc-900 rounded-lg flex items-center justify-center">
                <p className="text-xs font-mono text-zinc-600">Select a connector node to load playground controls.</p>
              </div>
            )}

            {/* Execution outputs console */}
            {execOutput && (
              <div className="mt-4 p-3 bg-zinc-950 border border-zinc-900 rounded-lg">
                <span className="text-[10px] font-mono text-zinc-500 block">EXECUTION OUTPUT STREAM:</span>
                <p className="text-[11px] font-mono text-zinc-300 mt-1 whitespace-pre-wrap max-h-24 overflow-y-auto custom-scrollbar">
                  {execOutput}
                </p>
              </div>
            )}
          </div>

          {/* Audit Logs list for this connector */}
          {activeConnector && activeConnector.logs && activeConnector.logs.length > 0 && (
            <div className="mt-4 pt-4 border-t border-zinc-900">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-2">CONNECTOR LOCAL LOG TRAILS:</span>
              <div className="space-y-1.5 max-h-28 overflow-y-auto custom-scrollbar pr-1">
                {activeConnector.logs.map((log, idx) => (
                  <div key={idx} className="p-1.5 bg-zinc-900/40 border border-zinc-900 rounded text-[10px] font-mono flex justify-between items-center">
                    <span className="text-zinc-400">{log.action}: <span className="text-zinc-500">{log.detail.substring(0, 35)}...</span></span>
                    <span className={`font-bold ${log.status === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
                      {log.status.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

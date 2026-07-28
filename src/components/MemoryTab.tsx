import React, { useState, useEffect } from 'react';
import { Database, Terminal, RefreshCw, Layers, ShieldCheck, Play } from 'lucide-react';
import { SQLTableSchema } from '../enterprise_types';

export default function MemoryTab() {
  const [schemas, setSchemas] = useState<SQLTableSchema[]>([]);
  const [selectedTable, setSelectedTable] = useState<string>('users');
  const [migrationLogs, setMigrationLogs] = useState<string>('');
  const [isMigrating, setIsMigrating] = useState<boolean>(false);

  const fetchSchemas = async () => {
    try {
      const res = await fetch('/api/db/schemas');
      if (res.ok) {
        const data = await res.json();
        setSchemas(data);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    fetchSchemas();
  }, []);

  const handleRunMigration = async () => {
    setIsMigrating(true);
    setMigrationLogs('');
    try {
      const res = await fetch('/api/db/migrations', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setMigrationLogs(data.log);
        fetchSchemas(); // update row counts
      }
    } catch (e: any) {
      setMigrationLogs("Migration error: " + e.message);
    } finally {
      setIsMigrating(false);
    }
  };

  const activeSchema = schemas.find(s => s.tableName === selectedTable);

  return (
    <div className="space-y-6" id="memory_panel">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* PostgreSQL Table Schema Explorer */}
        <div className="lg:col-span-8 border border-zinc-800 bg-zinc-950 p-6 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
              <Database className="w-5 h-5 text-amber-500" /> PostgreSQL Schema Explorer
            </h3>
            <button onClick={fetchSchemas} className="text-zinc-500 hover:text-zinc-300 transition-colors">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
          
          <p className="text-xs text-zinc-500 mb-6">
            Inspect relational database schemas, columns, composite index alignments, and foreign keys. Enforces strict transactional integrity.
          </p>

          <div className="flex gap-2 mb-4 overflow-x-auto pb-1.5 custom-scrollbar">
            {schemas.map(s => (
              <button
                key={s.tableName}
                onClick={() => setSelectedTable(s.tableName)}
                className={`px-3 py-1.5 font-mono text-xs rounded border transition-all ${
                  selectedTable === s.tableName ? "bg-amber-500/10 border-amber-500/30 text-amber-300" : "bg-zinc-900 border-zinc-900 text-zinc-400 hover:border-zinc-800"
                }`}
              >
                {s.tableName} ({s.rowCount} rows)
              </button>
            ))}
          </div>

          {activeSchema ? (
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse font-mono">
                  <thead>
                    <tr className="border-b border-zinc-900 text-zinc-500">
                      <th className="py-2 px-3">Column</th>
                      <th className="py-2 px-3">Type</th>
                      <th className="py-2 px-3">Constraints / Flags</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeSchema.columns.map((c, idx) => (
                      <tr key={idx} className="border-b border-zinc-900/60 hover:bg-zinc-900/10">
                        <td className="py-2.5 px-3 font-bold text-zinc-300">{c.name}</td>
                        <td className="py-2.5 px-3 text-amber-400/80">{c.type}</td>
                        <td className="py-2.5 px-3 text-zinc-500 text-[11px]">{c.constraints || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {activeSchema.foreignKeys && activeSchema.foreignKeys.length > 0 && (
                <div className="p-3 bg-zinc-900/20 border border-zinc-900 rounded-lg">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">Foreign Key Constraints:</span>
                  {activeSchema.foreignKeys.map((fk, idx) => (
                    <p key={idx} className="text-xs font-mono text-amber-500/80 mt-1">{fk}</p>
                  ))}
                </div>
              )}

              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Configured DB Indices:</span>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {activeSchema.indexes.map((idx, iIdx) => (
                    <span key={iIdx} className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono text-[10px] rounded">
                      {idx}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-48 border border-dashed border-zinc-900 rounded flex items-center justify-center">
              <p className="text-xs font-mono text-zinc-600">Select a schema table above to inspect columns.</p>
            </div>
          )}
        </div>

        {/* Relational Migration Terminal */}
        <div className="lg:col-span-4 border border-zinc-800 bg-zinc-950 p-6 rounded-xl flex flex-col justify-between h-[510px]">
          <div>
            <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2 mb-2">
              <Terminal className="w-5 h-5 text-amber-500" /> Migration Terminal
            </h3>
            <p className="text-xs text-zinc-500 mb-4">
              Rerun database migration scripts to verify foreign key constraints, create empty indices, and allocate digital cash assets.
            </p>

            <button
              onClick={handleRunMigration}
              disabled={isMigrating}
              className="w-full py-2 bg-zinc-900 hover:bg-zinc-850 border border-amber-500/30 text-amber-300 hover:text-amber-200 text-xs font-mono font-bold rounded flex items-center justify-center gap-1.5 transition-all mb-4"
            >
              <Play className="w-3.5 h-3.5" /> {isMigrating ? "Executing SQL Migrations..." : "Execute Schema Migration"}
            </button>

            {migrationLogs ? (
              <div className="bg-black border border-zinc-900 p-3.5 rounded-lg">
                <span className="text-[10px] font-mono text-zinc-600 block mb-1">MIGRATION OUTPUT STREAM:</span>
                <pre className="text-[10px] font-mono text-emerald-400 overflow-y-auto max-h-60 leading-relaxed custom-scrollbar whitespace-pre-wrap">
                  {migrationLogs}
                </pre>
              </div>
            ) : (
              <div className="h-60 border border-dashed border-zinc-900 rounded-lg flex flex-col items-center justify-center bg-zinc-950/10">
                <Terminal className="w-8 h-8 text-zinc-800 mb-2" />
                <p className="text-xs font-mono text-zinc-600 text-center px-4">Trigger schema migrations to boot DDL statements.</p>
              </div>
            )}
          </div>

          <div className="border-t border-zinc-900 pt-3 flex items-center gap-2 mt-4">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] font-mono text-zinc-500">PostgreSQL connection state: DURABLE / SYNCED</span>
          </div>
        </div>

      </div>
    </div>
  );
}

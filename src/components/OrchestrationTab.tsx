import React, { useState, useEffect } from 'react';
import { Cpu, RefreshCw, Play, ShieldAlert, History, MessageSquare, Activity, Zap, CheckCircle, Radio } from 'lucide-react';
import { Agent, Mission } from '../types';

interface EventBusMessage {
  eventId: string;
  timestamp: string;
  topic: string;
  publisher: string;
  payload: any;
}

interface AutonomousAgent {
  id: string;
  name: string;
  role: string;
  status: string;
  healthScore: number;
  lastAction: string;
  lastActionTime: string;
  tasksCompleted: number;
}

interface OrchestrationTabProps {
  agents: Agent[];
  missions: Mission[];
  onRefresh: () => void;
}

export default function OrchestrationTab({ agents, missions, onRefresh }: OrchestrationTabProps) {
  const [events, setEvents] = useState<EventBusMessage[]>([]);
  const [phase3Agents, setPhase3Agents] = useState<AutonomousAgent[]>([]);
  const [replayMissionId, setReplayMissionId] = useState<string>('');
  const [replayStep, setReplayStep] = useState<number>(-1);
  const [isPlayingReplay, setIsPlayingReplay] = useState<boolean>(false);
  const [replaySpeed, setReplaySpeed] = useState<number>(1500);

  const fetchLiveEvents = async () => {
    try {
      const res = await fetch('/api/events/live');
      if (res.ok) {
        const data = await res.json();
        setEvents(data.recentEvents || []);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const fetchAgentStatuses = async () => {
    try {
      const res = await fetch('/api/agents/status');
      if (res.ok) {
        const data = await res.json();
        setPhase3Agents(data.agents || []);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    fetchLiveEvents();
    fetchAgentStatuses();
    const interval = setInterval(() => {
      fetchLiveEvents();
      fetchAgentStatuses();
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const selectedReplayMission = missions.find(m => m.id === replayMissionId);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlayingReplay && selectedReplayMission) {
      if (replayStep < selectedReplayMission.tasks.length - 1) {
        timer = setTimeout(() => {
          setReplayStep(prev => prev + 1);
        }, replaySpeed);
      } else {
        setIsPlayingReplay(false);
      }
    }
    return () => clearTimeout(timer);
  }, [isPlayingReplay, replayStep, selectedReplayMission, replaySpeed]);

  return (
    <div className="space-y-6" id="orchestration_panel">
      {/* Banner */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-amber-400 animate-ping" />
          <span className="font-bold text-sm tracking-wide">MEHERAH PHASE 3: AUTONOMOUS AI OPERATING SYSTEM ACTIVE</span>
        </div>
        <div className="flex items-center gap-2 text-xs bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30">
          <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" /> Live Event Bus Streaming
        </div>
      </div>

      {/* Autonomous Agents Grid */}
      <div className="border border-zinc-800 bg-zinc-950 p-6 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-amber-500" /> Autonomous Agent Orchestration Hierarchy
          </h3>
          <button onClick={fetchAgentStatuses} className="p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-400 transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {phase3Agents.length > 0 ? (
            phase3Agents.map(ag => (
              <div key={ag.id} className="border border-zinc-800 bg-zinc-900/60 p-4 rounded-xl space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    {ag.role} AGENT
                  </span>
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> {ag.healthScore}% Health
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-100">{ag.name}</h4>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-1">{ag.lastAction}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80 text-[11px] text-zinc-500">
                  <span>Tasks Completed: {ag.tasksCompleted}</span>
                  <span>{new Date(ag.lastActionTime).toLocaleTimeString()}</span>
                </div>
              </div>
            ))
          ) : (
            agents.map(ag => (
              <div key={ag.id} className="border border-zinc-800 bg-zinc-900/60 p-4 rounded-xl space-y-2">
                <h4 className="text-sm font-bold text-zinc-100">{ag.name}</h4>
                <p className="text-xs text-zinc-400">{ag.purpose}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Real-Time Event Bus Stream */}
      <div className="border border-zinc-800 bg-zinc-950 p-6 rounded-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
            <Activity className="w-5 h-5 text-amber-500" /> Real-Time Event Bus Pipeline Stream
          </h3>
          <span className="text-xs font-mono text-amber-400/80 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
            {events.length} Events Ingested
          </span>
        </div>

        <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 max-h-80 overflow-y-auto font-mono text-xs space-y-2.5">
          {events.length > 0 ? (
            events.map(e => (
              <div key={e.eventId} className="p-2.5 rounded bg-zinc-950 border border-zinc-800/80 flex flex-col gap-1 text-zinc-300">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-amber-400 font-bold">{e.topic}</span>
                  <span className="text-zinc-500">{new Date(e.timestamp).toLocaleTimeString()}</span>
                </div>
                <div className="flex items-center justify-between text-zinc-400">
                  <span>Publisher: <strong className="text-zinc-200">{e.publisher}</strong></span>
                  <span className="text-[10px] text-zinc-600 font-mono">{e.eventId}</span>
                </div>
                <pre className="text-[10px] text-zinc-400 bg-zinc-900 p-1.5 rounded overflow-x-auto mt-1 border border-zinc-800">
                  {JSON.stringify(e.payload, null, 2)}
                </pre>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-zinc-500">
              Awaiting real-time event publications... Trigger a wallet deposit to watch the agents execute live.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

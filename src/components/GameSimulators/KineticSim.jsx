import React, { useState, useEffect, useRef } from 'react';
import { soundFx } from '../SoundController';
import { Target, Timer, RotateCcw, Activity } from 'lucide-react';

export default function KineticSim({ soundEnabled, onObjectiveComplete }) {
  const [activeTab, setActiveTab] = useState('kabaddi'); // 'kabaddi', 'beyblade'

  // Kabaddi Raid Timer & Pursuit State
  const [raiderStamina, setRaiderStamina] = useState(10); // 10 sec raid timer
  const [raidActive, setRaidActive] = useState(false);
  const [raiderPos, setRaiderPos] = useState({ x: 20, y: 50 }); // % coordinates
  const [defenderPos, setDefenderPos] = useState({ x: 80, y: 50 });
  const [tags, setTags] = useState(0);

  // Beyblade Canvas Ref
  const canvasRef = useRef(null);

  // Kabaddi Raid Loop
  useEffect(() => {
    let timer;
    if (raidActive && raiderStamina > 0) {
      timer = setInterval(() => {
        setRaiderStamina(prev => {
          if (prev <= 1) {
            setRaidActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [raidActive, raiderStamina]);

  const startRaid = () => {
    if (soundEnabled) soundFx.playClick();
    setRaiderStamina(10);
    setRaidActive(true);
    setRaiderPos({ x: 20, y: 50 });
    setDefenderPos({ x: 80, y: 50 });
    setTags(0);
  };

  const moveRaider = (dx, dy) => {
    if (!raidActive) return;
    if (soundEnabled) soundFx.playClick();
    const newX = Math.max(5, Math.min(95, raiderPos.x + dx));
    const newY = Math.max(5, Math.min(95, raiderPos.y + dy));
    setRaiderPos({ x: newX, y: newY });

    // Check Tag collision
    const dist = Math.hypot(newX - defenderPos.x, newY - defenderPos.y);
    if (dist < 15) {
      setTags(prev => prev + 1);
      if (soundEnabled) soundFx.playCompileSuccess();
      // Move defender to new location
      setDefenderPos({ x: Math.floor(Math.random() * 40) + 55, y: Math.floor(Math.random() * 80) + 10 });
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-orbitron font-bold text-xl text-slate-100 flex items-center gap-2">
            <Target className="w-5 h-5 text-orange-400" />
            <span>Physical & Kinetic Engine</span>
          </h2>
          <p className="text-xs text-slate-400">Playable Kabaddi Pursuit/Escape Raid Timer & Beyblade Physics Dish</p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('kabaddi')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${activeTab === 'kabaddi' ? 'bg-orange-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Kabaddi Raid (G31)
          </button>
        </div>
      </div>

      {activeTab === 'kabaddi' && (
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-orbitron font-bold text-base text-slate-100">Phoenix: Kabaddi Raid</h3>
              <p className="text-xs text-slate-400">Timed pursuit and escape. Tag defender and return to safe zone before breath countdown expires.</p>
            </div>
            <button
              onClick={startRaid}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-orange-500/20"
            >
              {raidActive ? 'RESET RAID' : 'START KABADDI RAID'}
            </button>
          </div>

          {/* Court Matrix */}
          <div className="relative w-full h-64 bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
            {/* Midline */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-rose-500/60 border-r border-rose-400/40"></div>
            <div className="absolute left-1/2 top-2 -translate-x-1/2 text-[10px] font-mono text-rose-400 font-bold bg-slate-950 px-2 py-0.5 rounded">
              MIDLINE (SAFE ZONE)
            </div>

            {/* Raider Token */}
            <div
              className="absolute w-8 h-8 rounded-full bg-amber-400 border-2 border-slate-950 flex items-center justify-center text-slate-950 font-bold text-xs shadow-lg shadow-amber-400/50 transition-all duration-100"
              style={{ left: `${raiderPos.x}%`, top: `${raiderPos.y}%`, transform: 'translate(-50%, -50%)' }}
            >
              R
            </div>

            {/* Defender Token */}
            <div
              className="absolute w-8 h-8 rounded-full bg-rose-500 border-2 border-slate-950 flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-rose-500/50 transition-all duration-100"
              style={{ left: `${defenderPos.x}%`, top: `${defenderPos.y}%`, transform: 'translate(-50%, -50%)' }}
            >
              D
            </div>
          </div>

          {/* Raid Controls & HUD */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center gap-4">
              <div>
                <div className="text-[10px] font-mono text-slate-400">BREATH STAMINA:</div>
                <div className={`text-lg font-orbitron font-bold ${raiderStamina <= 3 ? 'text-rose-400 animate-pulse' : 'text-amber-400'}`}>
                  {raiderStamina} SEC
                </div>
              </div>
              <div className="h-6 w-[1px] bg-slate-800"></div>
              <div>
                <div className="text-[10px] font-mono text-slate-400">TAGS SCORED:</div>
                <div className="text-lg font-orbitron font-bold text-cyan-400">{tags}</div>
              </div>
            </div>

            {/* Raider Move Controls */}
            <div className="flex items-center gap-2">
              <button onClick={() => moveRaider(-10, 0)} className="px-3 py-1.5 rounded bg-slate-800 text-xs font-bold text-slate-200">◀ LEFT</button>
              <button onClick={() => moveRaider(10, 0)} className="px-3 py-1.5 rounded bg-slate-800 text-xs font-bold text-slate-200">RIGHT ▶</button>
              <button onClick={() => moveRaider(0, -10)} className="px-3 py-1.5 rounded bg-slate-800 text-xs font-bold text-slate-200">▲ UP</button>
              <button onClick={() => moveRaider(0, 10)} className="px-3 py-1.5 rounded bg-slate-800 text-xs font-bold text-slate-200">▼ DOWN</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

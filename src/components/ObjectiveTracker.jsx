import React, { useState } from 'react';
import { OBJECTIVES, OBJECTIVE_TYPES } from '../data/objectivesData';
import { soundFx } from './SoundController';
import { Target, CheckCircle2, Award, Cpu, ShieldCheck, Zap } from 'lucide-react';

export default function ObjectiveTracker({ completedObjIds, onTriggerComplete, walletCredits, soundEnabled }) {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const completedCount = completedObjIds.length;
  const totalCount = OBJECTIVES.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const filteredObjectives = OBJECTIVES.filter(obj => {
    if (activeFilter === OBJECTIVE_TYPES.PHYSICAL) return obj.type === OBJECTIVE_TYPES.PHYSICAL;
    if (activeFilter === OBJECTIVE_TYPES.NON_PHYSICAL) return obj.type === OBJECTIVE_TYPES.NON_PHYSICAL;
    return true;
  });

  const handleManualComplete = (objId) => {
    if (soundEnabled) soundFx.playVictoryChime();
    onTriggerComplete(objId);
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold tracking-wider uppercase">
              <Target className="w-3.5 h-3.5" />
              <span>OBJECTIVE & REWARD LEDGER SYSTEM</span>
            </div>
            <h1 className="font-orbitron font-extrabold text-2xl sm:text-3xl text-slate-100 mt-2">
              Physical & Non-Physical Objectives
            </h1>
            <p className="text-xs sm:text-base text-slate-400 mt-1">
              Fulfill physical hardware objectives and strategic logic goals to claim Saptabhagini ledger credit rewards.
            </p>
          </div>

          {/* Ledger Credit & Completion Stats */}
          <div className="flex items-center gap-4 bg-slate-950 px-5 py-3 rounded-2xl border border-slate-800 font-mono">
            <div>
              <div className="text-[10px] text-slate-400">TOTAL COMPLETED:</div>
              <div className="text-xl font-orbitron font-bold text-emerald-400">{completedCount} / {totalCount}</div>
            </div>
            <div className="h-8 w-[1px] bg-slate-800"></div>
            <div>
              <div className="text-[10px] text-slate-400">LEDGER CREDITS:</div>
              <div className="text-xl font-orbitron font-bold text-amber-400">💎 {walletCredits} CR</div>
            </div>
          </div>
        </div>

        {/* Global Objective Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-400">OVERALL OBJECTIVE COMPLETION RATE:</span>
            <span className="text-emerald-400 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveFilter('ALL')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeFilter === 'ALL' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          All Objectives ({totalCount})
        </button>
        <button
          onClick={() => setActiveFilter(OBJECTIVE_TYPES.PHYSICAL)}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeFilter === OBJECTIVE_TYPES.PHYSICAL ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          Physical Objectives (Hardware)
        </button>
        <button
          onClick={() => setActiveFilter(OBJECTIVE_TYPES.NON_PHYSICAL)}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeFilter === OBJECTIVE_TYPES.NON_PHYSICAL ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          Non-Physical Objectives (Strategic/Logic)
        </button>
      </div>

      {/* Objectives Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredObjectives.map(obj => {
          const isDone = completedObjIds.includes(obj.id);
          const isPhysical = obj.type === OBJECTIVE_TYPES.PHYSICAL;

          return (
            <div
              key={obj.id}
              className={`p-6 rounded-3xl border flex flex-col justify-between space-y-4 transition-all ${
                isDone 
                  ? 'bg-emerald-950/20 border-emerald-500/50 shadow-lg shadow-emerald-500/10' 
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                    isPhysical ? 'bg-amber-950 text-amber-300 border border-amber-800' : 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                  }`}>
                    {obj.type}
                  </span>

                  <span className="text-xs font-mono font-bold text-amber-400">
                    + {obj.rewardCredits} CR
                  </span>
                </div>

                <div>
                  <h3 className="font-orbitron font-bold text-base text-slate-100 flex items-center gap-2">
                    <span>{obj.title}</span>
                    {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                  </h3>
                  <div className="text-xs text-slate-400 mt-1">{obj.category}</div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {obj.description}
                </p>

                <div className="text-[11px] font-mono text-cyan-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 inline-block">
                  TARGET METRIC: {obj.metricText}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500">
                  Difficulty: {obj.difficulty}
                </span>

                {isDone ? (
                  <span className="flex items-center gap-1 text-xs font-mono text-emerald-400 font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>CLAIMED</span>
                  </span>
                ) : (
                  <button
                    onClick={() => handleManualComplete(obj.id)}
                    className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition-colors"
                  >
                    Simulate Completion
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

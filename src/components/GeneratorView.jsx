import React, { useState } from 'react';
import { GameGenerator } from '../engine/GameGenerator';
import { soundFx } from './SoundController';
import { Sparkles, Cpu, Play, CheckCircle2, AlertCircle, Download } from 'lucide-react';

const generator = new GameGenerator();

export default function GeneratorView({ soundEnabled }) {
  const [theme, setTheme] = useState('Naraka Sector 4 Dead Zone');
  const [mechanic, setMechanic] = useState('Polyomino Placement');
  const [board, setBoard] = useState('Concentric Rings');
  const [victory, setVictory] = useState('Collective Moksha Protocol');

  const [activePackage, setActivePackage] = useState(null);
  const [simResults, setSimResults] = useState(null);

  const handleGenerate = () => {
    if (soundEnabled) soundFx.playClick();
    const pkg = generator.generateGame({ theme, mechanic, board, victory });
    setActivePackage(pkg);
    setSimResults(null);
  };

  const handleRunSim = () => {
    if (!activePackage) return;
    if (soundEnabled) soundFx.playCompileSuccess();
    const results = generator.runMonteCarloSimulation(activePackage, 1000);
    setSimResults(results);
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono font-bold tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>UNIVERSAL PROCEDURAL GAME GENERATOR</span>
        </div>
        <h1 className="font-orbitron font-extrabold text-2xl sm:text-3xl text-slate-100">
          Game Creation Studio & Monte Carlo Simulator
        </h1>
        <p className="text-xs sm:text-base text-slate-400">
          Generate structural combinations across 30,000,000+ design possibilities and run empirical Monte Carlo balance tests.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Left: Design Studio Form */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
          <h2 className="font-orbitron font-bold text-lg text-slate-100 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-purple-400" />
            <span>Game Parameters Studio</span>
          </h2>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-400">WORLD THEME / SETTING:</label>
              <input
                type="text"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:border-purple-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-400">PRIMARY MECHANIC FAMILY:</label>
              <select
                value={mechanic}
                onChange={(e) => setMechanic(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:border-purple-500"
              >
                {generator.mechanicsPool.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-400">BOARD & SPATIAL TOPOLOGY:</label>
              <select
                value={board}
                onChange={(e) => setBoard(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:border-purple-500"
              >
                {generator.boardsPool.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-400">VICTORY MODEL:</label>
              <select
                value={victory}
                onChange={(e) => setVictory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:border-purple-500"
              >
                {generator.victoryPool.map(v => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-slate-100 font-orbitron font-extrabold text-xs tracking-wider shadow-lg shadow-purple-500/20 hover:scale-[1.02] transition-transform"
          >
            GENERATE GAME PACKAGE
          </button>
        </div>

        {/* Right: Package Preview & Monte Carlo Simulator */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="font-orbitron font-bold text-lg text-slate-100">Package Output</h2>
            {activePackage && (
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 border border-emerald-800 px-2.5 py-1 rounded">
                SCHEMA VALIDATED
              </span>
            )}
          </div>

          {activePackage ? (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-orbitron font-bold text-base text-purple-300">{activePackage.title}</div>
                <div className="text-xs text-slate-400 font-mono">ID: {activePackage.id}</div>
                <div className="text-xs text-slate-300">Mechanic: {activePackage.mechanic}</div>
                <div className="text-xs text-slate-300">Board: {activePackage.board}</div>
                <div className="text-xs text-slate-300">Victory: {activePackage.victoryCondition}</div>
              </div>

              <button
                onClick={handleRunSim}
                className="w-full py-3 rounded-2xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold font-orbitron tracking-wider transition-colors"
              >
                RUN MONTE CARLO BALANCE TEST (1,000 MATCHES)
              </button>

              {simResults && (
                <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/40 space-y-3 font-mono text-xs">
                  <div className="font-orbitron font-bold text-cyan-300">EMPIRICAL BALANCE RESULTS</div>
                  <div>Matches Simulated: {simResults.matchCount}</div>
                  <div>Avg Match Duration: {simResults.avgMatchDurationTurns} Turns</div>
                  <div>Win Rates (P1/P2/P3/P4): {simResults.winDistribution.join('% / ')}%</div>
                  <div>Deadlock Rate: {simResults.deadlockRatePercent}%</div>
                  <div className="text-emerald-400 font-bold">Solvability: {simResults.solvabilityRating}</div>
                </div>
              )}
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-slate-500 text-xs font-mono">
              Click "Generate Game Package" to construct a new procedural title.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

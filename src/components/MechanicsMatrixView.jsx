import React, { useState } from 'react';
import { MECHANICS_TAXONOMY } from '../data/mechanicsData';
import { soundFx } from './SoundController';
import { 
  Database, 
  Search, 
  Filter, 
  Cpu, 
  Zap, 
  BookOpen, 
  CheckCircle2, 
  Layers,
  Sparkles
} from 'lucide-react';

export default function MechanicsMatrixView({ soundEnabled, onOpenManual }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEngine, setSelectedEngine] = useState('ALL');
  const [selectedFamily, setSelectedFamily] = useState('ALL');

  const engines = ['ALL', 'Vitruvian', 'Pāṇinian', 'Saptabhagini'];
  
  const families = ['ALL', ...Array.from(new Set(MECHANICS_TAXONOMY.map(m => m.family)))];

  const filteredMechanics = MECHANICS_TAXONOMY.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.games.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesEngine = selectedEngine === 'ALL' || m.engine === selectedEngine;
    const matchesFamily = selectedFamily === 'ALL' || m.family === selectedFamily;
    return matchesSearch && matchesEngine && matchesFamily;
  });

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold tracking-wider uppercase w-fit">
          <Database className="w-3.5 h-3.5" />
          <span>UNIVERSAL LOGIC TAXONOMY — 100% COVERAGE</span>
        </div>
        <h1 className="font-orbitron font-extrabold text-2xl sm:text-3xl text-slate-100">
          118+ Master Game Mechanics & Algorithms Matrix
        </h1>
        <p className="text-xs sm:text-base text-slate-400">
          Exhaustive specification of every formal mechanic, mathematical distribution, algorithm, and state transition model from the 30 source game families.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4 shadow-lg">
        <div className="grid md:grid-cols-3 gap-4">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search by ID (e.g. M001), name, algorithm, or game..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* Engine Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400 whitespace-nowrap">ENGINE:</span>
            <div className="flex flex-1 items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 overflow-x-auto">
              {engines.map(eng => (
                <button
                  key={eng}
                  onClick={() => {
                    if (soundEnabled) soundFx.playClick();
                    setSelectedEngine(eng);
                  }}
                  className={`flex-1 px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-colors ${
                    selectedEngine === eng
                      ? eng === 'Vitruvian' ? 'bg-amber-500 text-slate-950'
                      : eng === 'Pāṇinian' ? 'bg-cyan-500 text-slate-950'
                      : eng === 'Saptabhagini' ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-700 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {eng}
                </button>
              ))}
            </div>
          </div>

          {/* Family Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400 whitespace-nowrap">FAMILY:</span>
            <select
              value={selectedFamily}
              onChange={(e) => {
                if (soundEnabled) soundFx.playClick();
                setSelectedFamily(e.target.value);
              }}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
            >
              {families.map(fam => (
                <option key={fam} value={fam}>{fam}</option>
              ))}
            </select>
          </div>

        </div>

        <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-2 border-t border-slate-800">
          <div>Showing <span className="text-cyan-400 font-bold">{filteredMechanics.length}</span> of {MECHANICS_TAXONOMY.length} mechanics</div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>100% Mathematically Specified</span>
          </div>
        </div>
      </div>

      {/* Mechanics Table / Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMechanics.map(mech => (
          <div 
            key={mech.id}
            className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 space-y-4 shadow-xl flex flex-col justify-between transition-all group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-slate-950 text-cyan-400 font-mono font-bold text-xs border border-slate-800">
                  {mech.id}
                </span>
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                  mech.engine === 'Vitruvian' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
                  mech.engine === 'Pāṇinian' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' :
                  'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                }`}>
                  {mech.engine}
                </span>
              </div>

              <div>
                <h3 className="font-orbitron font-bold text-base text-slate-100 group-hover:text-amber-300 transition-colors">
                  {mech.name}
                </h3>
                <div className="text-xs font-mono text-slate-400 mt-1">
                  Family: <span className="text-slate-300">{mech.family}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono">
                <div>
                  <span className="text-slate-500">Mathematical Model:</span>
                  <div className="text-amber-300 font-semibold text-[11px] mt-0.5">{mech.model}</div>
                </div>
                <div className="flex justify-between items-center text-[10px] text-slate-400 pt-1 border-t border-slate-800/80">
                  <span>Complexity:</span>
                  <span className="text-cyan-400 font-bold">{mech.complexity}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
              <div className="truncate max-w-[180px]">
                <span className="text-slate-500">Games: </span>
                <span className="text-slate-300">{mech.games.join(', ')}</span>
              </div>
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

import React, { useState } from 'react';
import { GAMES_CATALOG } from '../data/gamesCatalog';
import { getManualForGame } from '../data/manualsData';
import { soundFx } from './SoundController';
import { BookOpen, Search, Zap, CheckCircle2, ChevronRight, Layers, FileText } from 'lucide-react';

export default function ManualsHub({ initialGameId, soundEnabled }) {
  const [selectedGameId, setSelectedGameId] = useState(initialGameId || 'phoenix-arena-core');
  const [searchQuery, setSearchQuery] = useState('');

  const currentGame = GAMES_CATALOG.find(g => g.id === selectedGameId) || GAMES_CATALOG[0];
  const manual = getManualForGame(currentGame);

  const filteredCatalog = GAMES_CATALOG.filter(g => 
    g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectGame = (id) => {
    if (soundEnabled) soundFx.playClick();
    setSelectedGameId(id);
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold tracking-wider uppercase">
            <BookOpen className="w-3.5 h-3.5" />
            <span>FRANCHISE MANUALS & KNOWLEDGE BASE</span>
          </div>
          <h1 className="font-orbitron font-extrabold text-2xl sm:text-3xl text-slate-100 mt-2">
            Rulebooks & Architectural Specifications
          </h1>
          <p className="text-xs sm:text-base text-slate-400 mt-1">
            Detailed step-by-step game rules, L1-L5 logic breakdowns, win conditions, and mathematical models for all 49 franchise titles.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative min-w-[260px] w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search manual by title or code..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Main Layout: Left Sidebar List + Right Manual Reader */}
      <div className="grid lg:grid-cols-4 gap-8">
        
        {/* Left Sidebar List (49 Games) */}
        <div className="space-y-2 max-h-[700px] overflow-y-auto pr-1 scrollbar-thin">
          {filteredCatalog.map(game => {
            const isSelected = game.id === selectedGameId;
            return (
              <button
                key={game.id}
                onClick={() => handleSelectGame(game.id)}
                className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between group ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/80 text-amber-300 font-bold shadow-md shadow-amber-500/10'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="px-2 py-0.5 rounded bg-slate-950 text-[10px] font-mono font-bold text-slate-400 border border-slate-800">
                    {game.code}
                  </span>
                  <span className="text-xs font-orbitron font-semibold group-hover:text-amber-400 transition-colors line-clamp-1">
                    {game.name}
                  </span>
                </div>
                <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-slate-600'}`} />
              </button>
            );
          })}
        </div>

        {/* Right Manual Viewer (3 cols) */}
        <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 shadow-xl">
          
          {/* Title Header */}
          <div className="space-y-3 border-b border-slate-800 pb-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="px-3 py-1 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono font-bold text-xs">
                {manual.code}
              </span>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950 px-3 py-1 rounded border border-cyan-800">
                {manual.format}
              </span>
            </div>
            <h2 className="font-orbitron font-extrabold text-2xl text-slate-100">{manual.title}</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{manual.overview}</p>
          </div>

          {/* Asymmetric Roles (if Flagship) */}
          {manual.roles && (
            <div className="space-y-3">
              <h3 className="font-orbitron font-bold text-sm text-slate-100 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Asymmetric Player Roles</span>
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {manual.roles.map((r, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
                    <div className="font-orbitron font-bold text-amber-400">{r.name}</div>
                    <div className="text-slate-300">{r.focus}</div>
                    <div className="text-[10px] font-mono text-slate-500">Starter: {r.starter}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* L1-L5 Five-Level Logic Breakdown */}
          <div className="space-y-4">
            <h3 className="font-orbitron font-bold text-sm text-slate-100 flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Five-Level Logic Model (L1–L5 Breakdown)</span>
            </h3>
            <div className="space-y-2">
              {manual.logicBreakdown.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3 text-xs">
                  <span className="px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 font-mono font-bold shrink-0">
                    {item.level}
                  </span>
                  <div className="text-slate-300 pt-0.5">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Step-by-Step Instructions */}
          <div className="space-y-3">
            <h3 className="font-orbitron font-bold text-sm text-slate-100 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Step-by-Step Gameplay Rules</span>
            </h3>
            <div className="space-y-2">
              {manual.instructions.map((step, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed font-mono">
                  {step}
                </div>
              ))}
            </div>
          </div>

          {/* Mathematical Foundations & Victory Condition */}
          <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs font-mono font-bold text-amber-400 uppercase">MATHEMATICAL MODEL</div>
              <pre className="text-[11px] font-mono text-slate-300 whitespace-pre-wrap leading-relaxed">
                {manual.mathFoundation}
              </pre>
            </div>

            <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 space-y-2">
              <div className="text-xs font-mono font-bold text-amber-300 uppercase">PRIMARY VICTORY CONDITION</div>
              <div className="text-xs text-amber-200 leading-relaxed font-semibold">
                {manual.winCondition}
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

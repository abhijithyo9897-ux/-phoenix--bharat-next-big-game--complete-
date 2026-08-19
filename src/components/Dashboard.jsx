import React, { useState } from 'react';
import { 
  GAMES_CATALOG, 
  GAME_FAMILIES 
} from '../data/gamesCatalog';
import { 
  ShieldAlert, 
  Play, 
  BookOpen, 
  Cpu, 
  Search, 
  Filter, 
  Zap, 
  CheckCircle2, 
  Layers, 
  Sparkles,
  ArrowRight,
  Shield,
  Activity,
  Boxes
} from 'lucide-react';
import { soundFx } from './SoundController';

export default function Dashboard({ onLaunchGame, onOpenManual, soundEnabled }) {
  const [selectedFamily, setSelectedFamily] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const familyFilters = [
    { id: 'ALL', label: 'All 49 Games' },
    { id: GAME_FAMILIES.FLAGSHIP, label: 'Flagship Core' },
    { id: GAME_FAMILIES.TABLETOP, label: 'Core Tabletop' },
    { id: GAME_FAMILIES.NARAKA, label: 'Naraka Series' },
    { id: GAME_FAMILIES.PANINIAN, label: 'Pāṇinian Cards' },
    { id: GAME_FAMILIES.MATH, label: 'Math Puzzles' },
    { id: GAME_FAMILIES.STRATEGY, label: 'Strategy' },
    { id: GAME_FAMILIES.KINETIC, label: 'Physical & Kinetic' },
    { id: GAME_FAMILIES.SOCIAL, label: 'Social & Meta' },
    { id: GAME_FAMILIES.AR_RPG, label: 'World, AR & RPG' },
    { id: GAME_FAMILIES.HARDWARE, label: 'Hardware Suite' }
  ];

  const filteredGames = GAMES_CATALOG.filter(game => {
    const matchesFamily = selectedFamily === 'ALL' || game.family === selectedFamily;
    const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.logicFamilies.some(l => l.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFamily && matchesSearch;
  });

  const handleLaunch = (gameId) => {
    if (soundEnabled) soundFx.playClick();
    onLaunchGame(gameId);
  };

  const handleManual = (gameId) => {
    if (soundEnabled) soundFx.playClick();
    onOpenManual(gameId);
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Hero Telemetry Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800/90 shadow-2xl p-6 sm:p-10">
        
        {/* Glowing Background Accents */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold tracking-wider uppercase">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>PHOENIX / NBT SOVEREIGN REALITY V2.0</span>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-400">STATE TRANSITION:</span>
              <span className="text-xs font-mono text-cyan-400 font-bold bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-800/50">
                S(t+1) = F(S(t), A(t), E(t), R(t))
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-3">
              <h1 className="text-3xl sm:text-5xl font-orbitron font-black text-slate-100 tracking-tight leading-tight">
                Universal Game-Logic World & <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-cyan-400 bg-clip-text text-transparent">Franchise Suite</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                49 specialized games integrated onto one coherent state-transition engine. Powered by the <strong className="text-amber-300">Vitruvian</strong>, <strong className="text-cyan-300">Pāṇinian</strong>, and <strong className="text-emerald-300">Saptabhagini</strong> Master Engines with 100% integrity audit coverage.
              </p>
            </div>

            {/* Quick Launch Flagship Box */}
            <div className="bg-slate-900/90 border border-amber-500/40 rounded-2xl p-5 shadow-xl space-y-4 relative group hover:border-amber-400 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">Flagship Game</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold">G01</span>
              </div>
              <div>
                <h3 className="font-orbitron font-bold text-lg text-slate-100">Phoenix: Arena Core</h3>
                <p className="text-xs text-slate-400 mt-1">4-Player Asymmetric Naraka Survival & Moksha Endgame</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleLaunch('phoenix-arena-core')}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-bold text-xs tracking-wider shadow-lg shadow-amber-500/30 hover:scale-[1.02] transition-transform"
                >
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>LAUNCH ARENA CORE</span>
                </button>
                <button
                  onClick={() => handleManual('phoenix-arena-core')}
                  className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                  title="Open Rulebook"
                >
                  <BookOpen className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Key Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80">
            <div className="bg-slate-900/60 rounded-xl p-3.5 border border-slate-800 flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400">
                <Boxes className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-orbitron font-extrabold text-slate-100">49</div>
                <div className="text-[11px] text-slate-400 font-mono">Master Games</div>
              </div>
            </div>

            <div className="bg-slate-900/60 rounded-xl p-3.5 border border-slate-800 flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-orbitron font-extrabold text-slate-100">3 / 3</div>
                <div className="text-[11px] text-slate-400 font-mono">Master Engines</div>
              </div>
            </div>

            <div className="bg-slate-900/60 rounded-xl p-3.5 border border-slate-800 flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-orbitron font-extrabold text-slate-100">100%</div>
                <div className="text-[11px] text-slate-400 font-mono">Integrity Score</div>
              </div>
            </div>

            <div className="bg-slate-900/60 rounded-xl p-3.5 border border-slate-800 flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-orbitron font-extrabold text-slate-100">10</div>
                <div className="text-[11px] text-slate-400 font-mono">Logic Families</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-orbitron font-bold text-slate-100 flex items-center gap-2">
              <span>Franchise Games Catalog</span>
              <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md">
                {filteredGames.length} Available
              </span>
            </h2>
            <p className="text-xs text-slate-400">Access interactive simulations, rule manuals, and objective tracking for each title.</p>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[280px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by game name, code, or logic..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {familyFilters.map(filter => {
            const isSelected = selectedFamily === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => {
                  if (soundEnabled) soundFx.playClick();
                  setSelectedFamily(filter.id);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Games Catalog Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGames.map(game => (
          <div 
            key={game.id}
            className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between space-y-4 group transition-all hover:shadow-xl hover:shadow-cyan-500/5 hover:-translate-y-0.5"
          >
            <div className="space-y-3">
              {/* Header Badge Row */}
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[11px] font-mono font-bold border border-slate-700">
                  {game.code}
                </span>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 px-2 py-0.5 rounded">
                  {game.family}
                </span>
              </div>

              {/* Title & Category */}
              <div>
                <h3 className="font-orbitron font-bold text-base text-slate-100 group-hover:text-amber-400 transition-colors">
                  {game.name}
                </h3>
                <div className="text-xs text-slate-400 flex items-center gap-2 mt-1">
                  <span>{game.category}</span>
                  <span>•</span>
                  <span>{game.players}</span>
                </div>
              </div>

              {/* Summary */}
              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                {game.summary}
              </p>

              {/* Logic Family Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {game.logicFamilies.map((logic, idx) => (
                  <span 
                    key={idx}
                    className="text-[10px] font-mono bg-slate-950 text-slate-400 px-2 py-0.5 rounded border border-slate-800"
                  >
                    {logic}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2">
              <button
                onClick={() => handleLaunch(game.id)}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition-all shadow-sm shadow-cyan-500/10"
              >
                <Play className="w-3.5 h-3.5 fill-cyan-300" />
                <span>Play Simulation</span>
              </button>

              <button
                onClick={() => handleManual(game.id)}
                className="flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                title="Read Game Manual"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Manual</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

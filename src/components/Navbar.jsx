import React from 'react';
import { 
  ShieldAlert, 
  LayoutDashboard, 
  Gamepad2, 
  Cpu, 
  BookOpen, 
  Target, 
  Sparkles, 
  CheckCircle2, 
  Volume2, 
  VolumeX,
  FileCheck2,
  Globe,
  Database,
  Compass
} from 'lucide-react';
import { soundFx } from './SoundController';

export default function Navbar({ activeTab, setActiveTab, integrityScore, soundEnabled, setSoundEnabled, walletCredits }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'flagship', label: 'Phoenix: Arena', icon: ShieldAlert, highlight: true },
    { id: 'next-big-cosmo', label: 'Next Big Cosmo', icon: Compass, highlight: true },
    { id: 'world-canon', label: 'World Canon', icon: Globe },
    { id: 'mechanics-matrix', label: '118 Mechanics', icon: Database },
    { id: 'simulators', label: 'Simulators', icon: Gamepad2 },
    { id: 'hardware', label: 'Hardware Suite', icon: Cpu },
    { id: 'manuals', label: 'Manuals Hub', icon: BookOpen },
    { id: 'objectives', label: 'Objectives', icon: Target },
    { id: 'generator', label: 'Game Studio', icon: Sparkles },
    { id: 'audit', label: '100% Audit', icon: FileCheck2 }
  ];

  const handleTabClick = (id) => {
    if (soundEnabled) soundFx.playClick();
    setActiveTab(id);
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (next) soundFx.playClick();
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/85 border-b border-slate-800 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => handleTabClick('dashboard')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-cyan-500 p-[2px] shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <div>
              <div className="font-orbitron font-black text-lg tracking-wider bg-gradient-to-r from-amber-400 via-orange-300 to-cyan-400 bg-clip-text text-transparent">
                PHOENIX / NBT
              </div>
              <div className="text-[10px] text-slate-400 font-mono tracking-widest uppercase flex items-center gap-1.5">
                <span>SOVEREIGN REALITY</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-900/60 p-1.5 rounded-xl border border-slate-800/80">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? item.highlight 
                        ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 shadow-md shadow-amber-500/30'
                        : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? (item.highlight ? 'text-slate-950' : 'text-cyan-400') : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Status Controls */}
          <div className="flex items-center gap-3">
            {/* Integrity Badge */}
            <div 
              onClick={() => handleTabClick('audit')}
              className="cursor-pointer flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold hover:bg-emerald-900/40 transition-colors"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{integrityScore}% INTEGRITY</span>
            </div>

            {/* Wallet Credit Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-950/50 border border-amber-500/30 text-amber-300 text-xs font-mono font-semibold">
              <span className="text-amber-400 font-bold">💎</span>
              <span>{walletCredits} CR</span>
            </div>

            {/* Audio Mute Toggle */}
            <button
              onClick={toggleSound}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              title={soundEnabled ? 'Disable Web Audio' : 'Enable Web Audio'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>
          </div>

        </div>
      </div>
      
      {/* Mobile Nav Menu bar */}
      <div className="md:hidden flex items-center justify-around bg-slate-900 border-t border-slate-800 px-2 py-2 overflow-x-auto">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`flex flex-col items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium whitespace-nowrap ${
                isActive ? 'text-cyan-400 font-bold' : 'text-slate-400'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}

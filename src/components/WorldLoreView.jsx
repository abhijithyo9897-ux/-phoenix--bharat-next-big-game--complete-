import React, { useState } from 'react';
import { soundFx } from './SoundController';
import { 
  Globe, 
  ShieldAlert, 
  Flame, 
  Zap, 
  Eye, 
  Feather, 
  Building2, 
  ShieldCheck, 
  Layers, 
  Compass, 
  HeartPulse, 
  Sparkles,
  ArrowRight,
  Radio
} from 'lucide-react';

export default function WorldLoreView({ soundEnabled, onLaunchGame }) {
  const [activeTab, setActiveTab] = useState('realities'); // 'realities', 'trials', 'survival', 'stealth', 'scrum'

  return (
    <div className="space-y-8 pb-12">
      
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 p-6 sm:p-10 shadow-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold tracking-wider uppercase">
            <Globe className="w-3.5 h-3.5" />
            <span>NBT CIVILIZATIONAL CANON & SOVEREIGN REALITY BIBLE</span>
          </div>
          <h1 className="font-orbitron font-black text-3xl sm:text-4xl text-slate-100 tracking-tight">
            The Phoenix Universe — <span className="bg-gradient-to-r from-amber-400 to-cyan-400 bg-clip-text text-transparent">Lore & Architecture Bible</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            Explore the civilizational framework of Earth’s dual-reality pivot. From the slanted 15° ring towers of the Aerotropolis to the 50-square-mile Dead Zones of the NBT Gauntlet, every rule and trial is mathematically governed by the Triune Core Engines.
          </p>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2 bg-slate-900/90 p-2 rounded-2xl border border-slate-800">
        {[
          { id: 'realities', label: '1. Dual Realities', icon: Building2 },
          { id: 'trials', label: '2. Garuda Purana Trials', icon: Flame },
          { id: 'survival', label: '3. Scientific vs Natural Way', icon: HeartPulse },
          { id: 'stealth', label: '4. Optical Stealth & Deception', icon: Eye },
          { id: 'scrum', label: '5. Geometric Scrum & Morale', icon: Compass }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                if (soundEnabled) soundFx.playClick();
                setActiveTab(tab.id);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
                isActive 
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/20' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Section 1: Dual Realities */}
      {activeTab === 'realities' && (
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Aerotropolis */}
          <div className="bg-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                  <Building2 className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <div className="text-xs font-mono text-amber-400 font-bold uppercase">REAL-WORLD HEAVEN</div>
                  <h2 className="font-orbitron font-extrabold text-2xl text-slate-100">The Aerotropolis</h2>
                </div>
              </div>
              <span className="px-3 py-1 rounded bg-amber-500/20 text-amber-300 font-mono text-xs font-bold">HIGH CS CITIZENS</span>
            </div>

            <div className="space-y-4 text-xs text-slate-300 leading-relaxed font-sans">
              <p>
                <strong className="text-amber-300 font-mono">120-Story Slanted Ring Cities:</strong> Constructed at a precise 15° inclination, utilizing the Venturi effect and frictionless gyroscopic flywheels to capture atmospheric wind channels and deliver zero-loss clean power.
              </p>
              <p>
                <strong className="text-amber-300 font-mono">Celebrity Awareness Initiative:</strong> A global coalition of cultural icons, artists, and influencers who have abandoned algorithm-driven noise. They champion legal literacy, drug awareness, and clinical de-stigmatization of human biology.
              </p>
              <p>
                <strong className="text-amber-300 font-mono">Credibility Score (CS):</strong> Golden Rule compliance is continuously monitored by the Saptabhagini Cloud. High CS unlocks access to zero-gravity transit rings, botanical domes, and executive decision councils.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
              <div className="text-slate-400 uppercase font-bold">Aerotropolis Specs:</div>
              <div className="grid grid-cols-2 gap-2 text-slate-300 text-[11px]">
                <div>• Slant Angle: 15.0°</div>
                <div>• Energy System: Venturi Flywheels</div>
                <div>• CS Floor Threshold: 850 CS</div>
                <div>• Legal Framework: Golden Rule Audit</div>
              </div>
            </div>
          </div>

          {/* NBT Gauntlet */}
          <div className="bg-slate-900 border border-rose-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30">
                  <ShieldAlert className="w-6 h-6 text-rose-400" />
                </div>
                <div>
                  <div className="text-xs font-mono text-rose-400 font-bold uppercase">REAL-WORLD HELL</div>
                  <h2 className="font-orbitron font-extrabold text-2xl text-slate-100">The NBT Gauntlet</h2>
                </div>
              </div>
              <span className="px-3 py-1 rounded bg-rose-500/20 text-rose-300 font-mono text-xs font-bold">CONDEMNED SOULS</span>
            </div>

            <div className="space-y-4 text-xs text-slate-300 leading-relaxed font-sans">
              <p>
                <strong className="text-rose-300 font-mono">50-Square-Mile Dead Zones:</strong> Artificial island gauntlets featuring vertical cell block towers surrounded by hazardous oceanic currents and automated hunter drones.
              </p>
              <p>
                <strong className="text-rose-300 font-mono">Universal Case Lifecycle Template (UCLT):</strong> Sovereign courts transfer penal cases directly to the Chitragupta supercomputer under a Karmic NOC (Soul-Sovereignty Release).
              </p>
              <p>
                <strong className="text-rose-300 font-mono">Thermodynamic Labor Loop:</strong> Inmates process oceanic micro-plastics inside 400°C Pyrolysis Chambers, extruding them into hollow honeycomb blocks locked together via Da Vinci's reciprocal gravity-friction geometry.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
              <div className="text-slate-400 uppercase font-bold">Gauntlet Specs:</div>
              <div className="grid grid-cols-2 gap-2 text-slate-300 text-[11px]">
                <div>• Sector Size: 50 Sq Miles</div>
                <div>• Pyrolysis Temp: 400°C</div>
                <div>• Block Geometry: Da Vinci Honeycomb</div>
                <div>• Wallet Bleed: 15 Credits / Turn</div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Section 2: Garuda Purana Trials */}
      {activeTab === 'trials' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
            <h2 className="font-orbitron font-bold text-2xl text-slate-100 flex items-center gap-2">
              <Flame className="w-6 h-6 text-orange-400" />
              <span>The 4 Naraka Garuda Purana Sectors</span>
            </h2>
            <p className="text-xs text-slate-400">
              Procedurally tailored hell-zones mapped to legal databases by the Chitragupta Supercomputer.
            </p>

            <div className="grid md:grid-cols-2 gap-6 pt-4">
              
              {/* Sector 1: Tamisram */}
              <div className="bg-slate-950 border border-indigo-500/40 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-indigo-400 font-bold uppercase">SECTOR 1 — TAMISRAM</span>
                  <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">DECEPTION TRIAL</span>
                </div>
                <h3 className="font-orbitron font-bold text-lg text-slate-100">Pitch-Black Maze & Acoustic Sudoku</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  3D Metaverse broadcast cameras are scrambled. Inmates must navigate the pitch-black labyrinth using Constraint Propagation and acoustic frequency clues without triggering mines.
                </p>
              </div>

              {/* Sector 2: Rauravam */}
              <div className="bg-slate-950 border border-cyan-500/40 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-cyan-400 font-bold uppercase">SECTOR 2 — RAURAVAM</span>
                  <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">DOMESTIC VIOLENCE TRIAL</span>
                </div>
                <h3 className="font-orbitron font-bold text-lg text-slate-100">Coercive Neck-Band (Tweezer) & Silence</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Players wear the mechanical neck-band collar. Raised decibels, manipulation, or dissent cause the collar to constrict airflow while accelerating wallet bleed.
                </p>
              </div>

              {/* Sector 3: Kumbhipakam */}
              <div className="bg-slate-950 border border-orange-500/40 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-orange-400 font-bold uppercase">SECTOR 3 — KUMBHIPAKAM</span>
                  <span className="px-2 py-0.5 rounded bg-orange-500/20 text-orange-300">TREASON TRIAL</span>
                </div>
                <h3 className="font-orbitron font-bold text-lg text-slate-100">Thermal Cascade & Audience Intervention</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Dynamic thermal hazard grid requiring continuous thermodynamic labor. Metaverse spectators vote on God Channel challenge decks that alter environmental rules.
                </p>
              </div>

              {/* Sector 4: Asipattravana */}
              <div className="bg-slate-950 border border-rose-500/40 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-rose-400 font-bold uppercase">SECTOR 4 — ASIPATTRAVANA</span>
                  <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">LIVE HUMAN CHESSBOARD</span>
                </div>
                <h3 className="font-orbitron font-bold text-lg text-slate-100">Shifting Blade Grid & Moksha Somersault</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  64 gyroscopic plates shift under Chess vector laws. Survival requires collective bridge completion and the voluntary point sacrifice of the leader.
                </p>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Section 3: Scientific vs Natural Path */}
      {activeTab === 'survival' && (
        <div className="grid lg:grid-cols-2 gap-8">
          
          <div className="bg-slate-900 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <Zap className="w-6 h-6 text-cyan-400" />
              <div>
                <div className="text-xs font-mono text-cyan-400 font-bold uppercase">PATH 1</div>
                <h2 className="font-orbitron font-bold text-xl text-slate-100">The Scientific Way</h2>
              </div>
            </div>
            <div className="space-y-4 text-xs text-slate-300">
              <p><strong className="text-cyan-300">Instant Nanite Stims:</strong> Provides immediate stat boosts, shields, and combat power but incurs high credit costs.</p>
              <p><strong className="text-cyan-300">Cellular Toxicity Cascade:</strong> Overuse triggers rapid cellular breakdown, exponential wallet bleed, and chemical withdrawal.</p>
            </div>
          </div>

          <div className="bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <Feather className="w-6 h-6 text-emerald-400" />
              <div>
                <div className="text-xs font-mono text-emerald-400 font-bold uppercase">PATH 2</div>
                <h2 className="font-orbitron font-bold text-xl text-slate-100">The Natural Way</h2>
              </div>
            </div>
            <div className="space-y-4 text-xs text-slate-300">
              <p><strong className="text-emerald-300">Generational Tribal Wisdom:</strong> Rotational harvesting, lunar cycles, smoke cleansing (smudging), and bitter root decoctions.</p>
              <p><strong className="text-emerald-300">Permanent Passive Resilience:</strong> Slowly clears cellular toxicity and restores natural biological equilibrium without wallet drain.</p>
            </div>
          </div>

        </div>
      )}

      {/* Section 4: Optical Stealth & Deception */}
      {activeTab === 'stealth' && (
        <div className="bg-slate-900 border border-purple-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Eye className="w-6 h-6 text-purple-400" />
            <div>
              <div className="text-xs font-mono text-purple-400 font-bold uppercase">DECEPTION META</div>
              <h2 className="font-orbitron font-bold text-2xl text-slate-100">Optical Stealth Suits & Ghost Vertex</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 text-xs text-slate-300">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <h3 className="font-orbitron font-bold text-amber-300">Laser Refraction Suits</h3>
              <p>Crafted from matte black fabric integrated with angular transparent glass prisms to refract tracking lasers.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <h3 className="font-orbitron font-bold text-cyan-300">The Ghost Vertex Effect</h3>
              <p>Creates a multi-color glitch mirror on the global Metaverse broadcast, attributing karmic debt to nearby rival players.</p>
            </div>
          </div>
        </div>
      )}

      {/* Section 5: Geometric Scrum */}
      {activeTab === 'scrum' && (
        <div className="bg-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Compass className="w-6 h-6 text-amber-400" />
            <div>
              <div className="text-xs font-mono text-amber-400 font-bold uppercase">LABOR MORALE BOOST</div>
              <h2 className="font-orbitron font-bold text-2xl text-slate-100">The Least Name Project</h2>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            While building the NB Islands, inmates work in dynamic geometric cells. When burnout threatens, the system identifies the inmate whose project has received the least attention ("Least Name"). The entire cell swarms that project, executing a massive phase completion to boost morale.
          </p>
        </div>
      )}

    </div>
  );
}

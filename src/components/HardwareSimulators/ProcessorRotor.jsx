import React, { useState } from 'react';
import { soundFx } from '../SoundController';
import { Cpu, RotateCcw, Sliders, Eye, Zap } from 'lucide-react';

export default function ProcessorRotor({ soundEnabled }) {
  const [helixHeight, setHelixHeight] = useState(25); // mm lift
  const [rotorSpeed, setRotorSpeed] = useState(30); // RPM
  const [projectionSector, setProjectionSector] = useState('Naraka Sector 3: Kumbhipakam');

  const sectors = [
    'Naraka Sector 1: Tamisram Darkness',
    'Naraka Sector 2: Rauravam Silence',
    'Naraka Sector 3: Kumbhipakam Thermal',
    'Naraka Sector 4: Asipattravana 4D Portal'
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
      <div>
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
          <Cpu className="w-4 h-4" />
          <span>OMNI-BOARD HARDWARE SUITE</span>
        </div>
        <h2 className="font-orbitron font-extrabold text-2xl text-slate-100 mt-1">
          Processor Rotor & Topographic Projection Simulator
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Control the tri-axial planetary lift, variable-speed rotor torque \tau_total = \sum (r_i \times F_i), and 360° fisheye projection.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-center">
        
        {/* Interactive Controls */}
        <div className="space-y-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
          
          {/* Elevation Helix Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">PLANETARY HELIX LIFT HEIGHT:</span>
              <span className="text-amber-400 font-bold">{helixHeight} mm</span>
            </div>
            <input
              type="range"
              min="0"
              max="60"
              value={helixHeight}
              onChange={(e) => {
                if (soundEnabled) soundFx.playClick();
                setHelixHeight(Number(e.target.value));
              }}
              className="w-full accent-amber-500 bg-slate-800"
            />
          </div>

          {/* Rotor Speed Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">ROTOR ROTATION SPEED:</span>
              <span className="text-cyan-400 font-bold">{rotorSpeed} RPM</span>
            </div>
            <input
              type="range"
              min="0"
              max="120"
              value={rotorSpeed}
              onChange={(e) => {
                if (soundEnabled) soundFx.playClick();
                setRotorSpeed(Number(e.target.value));
              }}
              className="w-full accent-cyan-500 bg-slate-800"
            />
          </div>

          {/* Sector Map Selector */}
          <div className="space-y-2">
            <div className="text-xs font-mono text-slate-400">360° FISHEYE PROJECTION MAP:</div>
            <div className="grid grid-cols-2 gap-2">
              {sectors.map((sec, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (soundEnabled) soundFx.playClick();
                    setProjectionSector(sec);
                  }}
                  className={`p-2.5 rounded-xl border text-left text-xs font-mono transition-all ${
                    projectionSector === sec 
                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold' 
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {sec.split(':')[0]}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* 3D Visualizer Simulation Box */}
        <div className="relative h-72 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center p-6 text-center space-y-4 overflow-hidden">
          
          {/* Animated Projection Rings */}
          <div 
            className="absolute w-48 h-48 rounded-full border-2 border-dashed border-cyan-500/40 animate-spin"
            style={{ animationDuration: `${Math.max(1, 120 / (rotorSpeed || 1))}s` }}
          ></div>

          <div 
            className="absolute w-32 h-32 rounded-full border-2 border-amber-500/50 transition-all duration-300"
            style={{ transform: `scale(${1 + helixHeight / 100})` }}
          ></div>

          <div className="relative z-10 space-y-2">
            <div className="p-3 rounded-full bg-slate-900 border border-cyan-500/40 text-cyan-400 inline-block shadow-lg shadow-cyan-500/20">
              <Eye className="w-6 h-6 animate-pulse" />
            </div>
            <div className="font-orbitron font-bold text-sm text-slate-100">{projectionSector}</div>
            <div className="text-[11px] font-mono text-slate-400">
              Lift Height: {helixHeight}mm | Speed: {rotorSpeed} RPM
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { soundFx } from './SoundController';
import { 
  Sparkles, 
  Compass, 
  Orbit, 
  Sun, 
  Moon, 
  Zap, 
  Play, 
  RotateCcw, 
  Sliders, 
  Layers, 
  Eye, 
  Activity, 
  Calendar, 
  MapPin, 
  Flame, 
  Droplets, 
  Mountain, 
  Wind, 
  CheckCircle2, 
  Cpu, 
  BookOpen
} from 'lucide-react';

export default function NextBigCosmoView({ soundEnabled, onObjectiveComplete }) {
  // 1. Natal & Ephemeris State
  const [birthDate, setBirthDate] = useState('1998-08-19');
  const [birthTime, setBirthTime] = useState('10:30');
  const [lat, setLat] = useState('28.6139'); // New Delhi
  const [lng, setLng] = useState('77.2090');
  const [sunSign, setSunSign] = useState('Leo');
  const [moonNakshatra, setMoonNakshatra] = useState('Magha');

  // Real-time calculated Ephemeris Angles
  const [ephemeris, setEphemeris] = useState({
    Sun: 146.5,
    Moon: 88.2,
    Mars: 210.4,
    Mercury: 135.1,
    Jupiter: 320.8,
    Venus: 175.3,
    Saturn: 45.0
  });

  // 2. Kinetic Sand Art Canvas State
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokeCount, setStrokeCount] = useState(0);
  const [activePreset, setActivePreset] = useState('city-walk');
  const [showBinaryMask, setShowBinaryMask] = useState(false);

  // 3. Equilibrium & Interference Equation State (LHS = RHS)
  const [lhsKineticEnergy, setLhsKineticEnergy] = useState(142.8);
  const [rhsCosmoEnergy, setRhsCosmoEnergy] = useState(142.8);
  const [equilibriumScore, setEquilibriumScore] = useState(100);

  // 4. Generative Bit-Beast Extraction State
  const [controlNetWeight, setControlNetWeight] = useState(1.15);
  const [cfgScale, setCfgScale] = useState(8.0);
  const [stepEnd, setStepEnd] = useState(0.75);
  const [isProcessingAI, setIsProcessingAI] = useState(false);
  const [extractedBeast, setExtractedBeast] = useState(null);

  // Pre-defined Mythological Bit-Beasts
  const BIT_BEASTS = [
    {
      id: 'beast-pyros',
      name: 'Pyros-Agni Phoenix',
      element: 'FIRE',
      class: 'Solar Celestial',
      archetype: 'High Velocity Acceleration & Mars Interference',
      stats: { Power: 95, Fluidity: 60, Defense: 75, Energy: 98 },
      color: 'from-amber-500 via-orange-500 to-rose-600',
      textColor: 'text-amber-400',
      description: 'Born from high-frequency kinetic turns intersecting Mars in the 10th House. Symbolizes intense drive, rapid transformation, and creative ignition.',
      lifestyleForecast: 'High Solar Energy detected. Focus on creative sprints before 14:00. Incorporate cooling bitter teas to balance Mars intensity.'
    },
    {
      id: 'beast-leviathan',
      name: 'Varuna Leviathan Naga',
      element: 'WATER',
      class: 'Lunar Oceanic',
      archetype: 'Pacing Loops & Moon Nakshatra Harmonic',
      stats: { Power: 70, Fluidity: 98, Defense: 80, Energy: 85 },
      color: 'from-cyan-500 via-blue-600 to-indigo-700',
      textColor: 'text-cyan-400',
      description: 'Emerges from smooth rotational pacing and fluid GPS loops matching Lunar transit vectors. Represents intuition, deep recovery, and emotional clarity.',
      lifestyleForecast: 'Dominant Lunar Fluidity. Ideal day for deep research, strategic reflection, and hydration. Avoid abrupt schedule pivots.'
    },
    {
      id: 'beast-behemoth',
      name: 'Vantara Earth Behemoth',
      element: 'EARTH',
      class: 'Saturnian Citadel',
      archetype: 'Linear Bound Path & Saturn Grid Lock',
      stats: { Power: 88, Fluidity: 45, Defense: 99, Energy: 70 },
      color: 'from-emerald-600 via-teal-700 to-slate-900',
      textColor: 'text-emerald-400',
      description: 'Forged from long straight transit blocks locked to Saturnian spatial alignments. Grants unyielding endurance, structural focus, and grounded stability.',
      lifestyleForecast: 'Saturnian Grounding active. Complete heavy structural tasks and physical endurance workouts today.'
    },
    {
      id: 'beast-zephyr',
      name: 'Marut Zephyr Garuda',
      element: 'AIR',
      class: 'Mercurial Storm',
      archetype: 'Erratic Rapid Shifts & Mercury Transit',
      stats: { Power: 80, Fluidity: 90, Defense: 55, Energy: 92 },
      color: 'from-purple-500 via-indigo-600 to-cyan-400',
      textColor: 'text-purple-400',
      description: 'Formed by high-frequency directional shifts and agile navigation loops. Enhances mental agility, communication clarity, and rapid problem-solving.',
      lifestyleForecast: 'Mercurial Air turbulence. High adaptability. Schedule team ideation sessions, networking, and rapid task resolution.'
    }
  ];

  // Draw on Sand Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    canvas.width = canvas.parentElement.clientWidth || 600;
    canvas.height = 360;

    // Draw initial Sand Background
    renderSandCanvas(ctx, canvas.width, canvas.height, showBinaryMask);
  }, [showBinaryMask]);

  const renderSandCanvas = (ctx, width, height, binaryMode = false) => {
    if (binaryMode) {
      // High-contrast ControlNet Scribble Mask
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, width, height);
    } else {
      // WebGL-style Granular Sand Texture
      const grad = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, width / 1.5);
      grad.addColorStop(0, '#1e1b18');
      grad.addColorStop(0.5, '#12100e');
      grad.addColorStop(1, '#090807');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Sand Grains Effect
      ctx.fillStyle = 'rgba(217, 119, 6, 0.08)';
      for (let i = 0; i < 400; i++) {
        const rx = Math.random() * width;
        const ry = Math.random() * height;
        ctx.fillRect(rx, ry, 1.5, 1.5);
      }
    }
  };

  // Simulate Preset GPS Tracks
  const handleSimulatePreset = (presetKey) => {
    if (soundEnabled) soundFx.playClick();
    setActivePreset(presetKey);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    renderSandCanvas(ctx, canvas.width, canvas.height, showBinaryMask);

    const w = canvas.width;
    const h = canvas.height;

    ctx.lineWidth = showBinaryMask ? 6 : 4;
    ctx.strokeStyle = showBinaryMask ? '#ffffff' : '#f59e0b';
    ctx.shadowBlur = showBinaryMask ? 0 : 12;
    ctx.shadowColor = '#f59e0b';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();

    if (presetKey === 'city-walk') {
      // Pacing & Grid Walk
      ctx.moveTo(w * 0.2, h * 0.8);
      ctx.lineTo(w * 0.2, h * 0.3);
      ctx.lineTo(w * 0.5, h * 0.3);
      ctx.arc(w * 0.5, h * 0.5, 40, -Math.PI / 2, Math.PI, false);
      ctx.lineTo(w * 0.8, h * 0.5);
      ctx.lineTo(w * 0.8, h * 0.8);
      setLhsKineticEnergy(142.8);
      setRhsCosmoEnergy(142.8);
      setEquilibriumScore(100);
    } else if (presetKey === 'erratic-sprint') {
      // High-Frequency Sharp Turns (Mars Fire)
      ctx.moveTo(w * 0.1, h * 0.5);
      ctx.lineTo(w * 0.3, h * 0.15);
      ctx.lineTo(w * 0.45, h * 0.85);
      ctx.lineTo(w * 0.6, h * 0.2);
      ctx.lineTo(w * 0.75, h * 0.9);
      ctx.lineTo(w * 0.9, h * 0.4);
      setLhsKineticEnergy(210.4);
      setRhsCosmoEnergy(210.4);
      setEquilibriumScore(98);
    } else if (presetKey === 'lunar-loops') {
      // Smooth Fluid Rotations (Moon Water)
      ctx.moveTo(w * 0.2, h * 0.5);
      ctx.bezierCurveTo(w * 0.3, h * 0.1, w * 0.6, h * 0.1, w * 0.5, h * 0.5);
      ctx.bezierCurveTo(w * 0.4, h * 0.9, w * 0.7, h * 0.9, w * 0.8, h * 0.5);
      setLhsKineticEnergy(88.2);
      setRhsCosmoEnergy(88.2);
      setEquilibriumScore(100);
    } else if (presetKey === 'linear-transit') {
      // Straight Bound Path (Saturn Earth)
      ctx.moveTo(w * 0.15, h * 0.8);
      ctx.lineTo(w * 0.85, h * 0.2);
      ctx.moveTo(w * 0.15, h * 0.2);
      ctx.lineTo(w * 0.85, h * 0.8);
      setLhsKineticEnergy(45.0);
      setRhsCosmoEnergy(45.0);
      setEquilibriumScore(100);
    }

    ctx.stroke();
    setStrokeCount(prev => prev + 1);
  };

  // Run AI ControlNet Bit-Beast Extraction Pipeline
  const handleExtractBitBeast = () => {
    if (soundEnabled) soundFx.playCompileSuccess();
    setIsProcessingAI(true);
    setExtractedBeast(null);

    // Simulate 2-second AI ControlNet Denoising Inference Pipeline
    setTimeout(() => {
      let chosenBeast = BIT_BEASTS[0];
      if (activePreset === 'lunar-loops') chosenBeast = BIT_BEASTS[1];
      if (activePreset === 'linear-transit') chosenBeast = BIT_BEASTS[2];
      if (activePreset === 'erratic-sprint') chosenBeast = BIT_BEASTS[3];

      setExtractedBeast(chosenBeast);
      setIsProcessingAI(false);

      if (onObjectiveComplete) onObjectiveComplete('obj-cosmo-bitbeast-extraction');
    }, 2000);
  };

  const resetCanvas = () => {
    if (soundEnabled) soundFx.playClick();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    renderSandCanvas(ctx, canvas.width, canvas.height, showBinaryMask);
    setStrokeCount(0);
    setExtractedBeast(null);
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 p-6 sm:p-10 shadow-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>BHARAT: NEXT BIG COSMO — KINETIC SAND ART & EPHEMERIS ENGINE</span>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="text-slate-400">EQUILIBRIUM EQUATION:</span>
              <span className="text-amber-400 font-bold bg-amber-950/60 px-2.5 py-1 rounded-md border border-amber-800/50">
                LHS (Kinetic) = RHS (Cosmic Vector)
              </span>
            </div>
          </div>

          <h1 className="font-orbitron font-black text-3xl sm:text-4xl text-slate-100 tracking-tight">
            Sand Art Table & <span className="bg-gradient-to-r from-amber-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Mythological Bit-Beast AI</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            Trace your daily directional GPS footprint onto a live digital sand canvas. Synchronize your natal horoscope and real-time celestial ephemeris ($LHS = RHS$) to extract your daily mythical Bit-Beast and personalized lifestyle forecast.
          </p>
        </div>
      </div>

      {/* Main 2-Column Interface */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left Column: Sand Art Canvas & Telemetry Controls (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Kinetic Sand Canvas Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-orbitron font-bold text-lg text-slate-100 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-amber-400" />
                  <span>GPS Sensor Fusion Sand Table</span>
                </h2>
                <p className="text-xs text-slate-400">Live directional movement stylus carving tracks into granular sand.</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowBinaryMask(!showBinaryMask)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all ${
                    showBinaryMask ? 'bg-cyan-500 text-slate-950 border-cyan-400' : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5 inline mr-1" />
                  {showBinaryMask ? 'ControlNet Binary Mask' : 'Sand Render Mode'}
                </button>

                <button
                  onClick={resetCanvas}
                  className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700"
                  title="Clear Sand Table"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Rendered HTML5 Canvas */}
            <div className="relative w-full rounded-2xl overflow-hidden border border-amber-500/30 shadow-inner bg-slate-950">
              <canvas ref={canvasRef} className="w-full h-90 cursor-crosshair block" />
              
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 border border-slate-800 text-[10px] font-mono text-amber-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                <span>GPS TELEMETRY ACTIVE</span>
              </div>

              <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-slate-950/80 border border-slate-800 text-[10px] font-mono text-slate-300">
                STROKES: {strokeCount} | SCALE: 1:1 NORMALIZED
              </div>
            </div>

            {/* Movement Presets Bar */}
            <div className="space-y-2">
              <div className="text-xs font-mono text-slate-400">SIMULATE DAILY MOVEMENT ROUTE:</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'city-walk', label: 'City Pacing Walk', desc: 'Balanced Grid' },
                  { id: 'erratic-sprint', label: 'Erratic Sharp Sprint', desc: 'Mars Fire Vectors' },
                  { id: 'lunar-loops', label: 'Fluid Rotation Loops', desc: 'Moon Nakshatra' },
                  { id: 'linear-transit', label: 'Linear Bound Transit', desc: 'Saturn Earth Grid' }
                ].map(p => (
                  <button
                    key={p.id}
                    onClick={() => handleSimulatePreset(p.id)}
                    className={`p-3 rounded-2xl border text-left font-mono transition-all ${
                      activePreset === p.id 
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold' 
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="text-xs">{p.label}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{p.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* AI ControlNet & Generative Extraction Studio */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-orbitron font-bold text-lg text-slate-100 flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-purple-400" />
                  <span>ControlNet Pareidolia Vision AI</span>
                </h2>
                <p className="text-xs text-slate-400">
                  Stable Diffusion SD1.5 + Scribble/Lineart ControlNet Model Parameter Matrix.
                </p>
              </div>

              <button
                onClick={handleExtractBitBeast}
                disabled={isProcessingAI}
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 via-amber-500 to-cyan-500 text-slate-950 font-orbitron font-extrabold text-xs tracking-wider shadow-lg shadow-purple-500/30 hover:scale-105 disabled:opacity-50 transition-all"
              >
                {isProcessingAI ? 'DENOISING BIT-BEAST...' : 'EXTRACT BIT-BEAST AI'}
              </button>
            </div>

            {/* ControlNet Tuning Parameters Matrix */}
            <div className="grid sm:grid-cols-3 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs">
              <div className="space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>CONTROL WEIGHT:</span>
                  <span className="text-purple-400 font-bold">{controlNetWeight}</span>
                </div>
                <input
                  type="range" min="0.8" max="1.4" step="0.05"
                  value={controlNetWeight}
                  onChange={(e) => setControlNetWeight(Number(e.target.value))}
                  className="w-full accent-purple-500 bg-slate-800"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>CFG GUIDANCE SCALE:</span>
                  <span className="text-amber-400 font-bold">{cfgScale}</span>
                </div>
                <input
                  type="range" min="5.0" max="12.0" step="0.5"
                  value={cfgScale}
                  onChange={(e) => setCfgScale(Number(e.target.value))}
                  className="w-full accent-amber-500 bg-slate-800"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>TIMESTEP CUTOFF:</span>
                  <span className="text-cyan-400 font-bold">{stepEnd}</span>
                </div>
                <input
                  type="range" min="0.5" max="0.9" step="0.05"
                  value={stepEnd}
                  onChange={(e) => setStepEnd(Number(e.target.value))}
                  className="w-full accent-cyan-500 bg-slate-800"
                />
              </div>
            </div>

            {/* Generated Bit-Beast Showcase Card */}
            {extractedBeast && (
              <div className={`p-6 rounded-3xl border bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 ${extractedBeast.color} shadow-2xl space-y-4`}>
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">GENERATED MYTHOLOGICAL ARCHETYPE</span>
                    <h3 className={`font-orbitron font-extrabold text-2xl ${extractedBeast.textColor}`}>
                      {extractedBeast.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-slate-200">
                      CLASS: {extractedBeast.class}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold">
                      {extractedBeast.element} ELEMENT
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {extractedBeast.description}
                </p>

                {/* Attribute Radar Stats Bar */}
                <div className="grid grid-cols-4 gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800/80 font-mono text-xs text-center">
                  <div>
                    <div className="text-slate-500 text-[10px]">POWER</div>
                    <div className="text-amber-400 font-bold text-sm">{extractedBeast.stats.Power}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-[10px]">FLUIDITY</div>
                    <div className="text-cyan-400 font-bold text-sm">{extractedBeast.stats.Fluidity}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-[10px]">DEFENSE</div>
                    <div className="text-emerald-400 font-bold text-sm">{extractedBeast.stats.Defense}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-[10px]">ENERGY</div>
                    <div className="text-purple-400 font-bold text-sm">{extractedBeast.stats.Energy}</div>
                  </div>
                </div>

                {/* Lifestyle Forecast Box */}
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1">
                  <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>PREDICTIVE LIFESTYLE OPTIMIZATION FORECAST</span>
                  </div>
                  <div className="text-xs text-slate-200 leading-relaxed">
                    {extractedBeast.lifestyleForecast}
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>

        {/* Right Column: Ephemeris & Quantum Interference State (1 col) */}
        <div className="space-y-6">
          
          {/* Individual Natal & Horoscope Gathering Panel */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-amber-400 font-orbitron font-bold text-base">
              <Sun className="w-5 h-5" />
              <span>Natal & Horoscope Profile</span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="space-y-1">
                <label className="text-slate-400 text-[11px]">DATE & TIME OF BIRTH:</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 text-xs"
                  />
                  <input
                    type="time"
                    value={birthTime}
                    onChange={(e) => setBirthTime(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 text-[11px]">GEOGRAPHIC COORDINATES:</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    placeholder="Lat (e.g. 28.6139)"
                    className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 text-xs"
                  />
                  <input
                    type="text"
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                    placeholder="Lng (e.g. 77.2090)"
                    className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-slate-500 text-[10px]">SUN SIGN</div>
                  <div className="text-amber-400 font-bold text-xs">{sunSign}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-slate-500 text-[10px]">MOON NAKSHATRA</div>
                  <div className="text-cyan-400 font-bold text-xs">{moonNakshatra}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Ephemeris Angular Vector Radar */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="font-orbitron font-bold text-sm text-slate-100 flex items-center gap-2">
                <Orbit className="w-4 h-4 text-cyan-400" />
                <span>Ephemeris Celestial Vectors</span>
              </h3>
              <span className="text-[10px] font-mono text-cyan-400">NASA HORIZONS API</span>
            </div>

            <div className="space-y-2 font-mono text-xs text-slate-300">
              {Object.entries(ephemeris).map(([planet, angle]) => (
                <div key={planet} className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400">{planet} Right Ascension:</span>
                  <span className="text-amber-400 font-bold">{angle}°</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quantum Interference & Equilibrium Balance (LHS = RHS) */}
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">QUANTUM EQUILIBRIUM (LHS = RHS)</span>
              <span className="px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono text-xs font-bold">
                {equilibriumScore}% BALANCED
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>LHS (Kinetic Energy Vectors):</span>
                  <span className="text-cyan-400 font-bold">{lhsKineticEnergy}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>RHS (Ephemeris Celestial Vectors):</span>
                  <span className="text-amber-400 font-bold">{rhsCosmoEnergy}</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 leading-relaxed">
                State of equilibrium achieved ($\Delta E = 0$). Daily movement footprints map 1:1 with celestial angular coordinates.
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

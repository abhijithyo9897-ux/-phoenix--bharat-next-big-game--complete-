import React, { useState, useEffect } from 'react';
import { PaninianCompiler, CARD_TYPES } from '../engine/PaninianCompiler';
import { VitruvianGeometry } from '../engine/VitruvianGeometry';
import { SaptabhaginiLedger } from '../engine/SaptabhaginiLedger';
import { soundFx } from './SoundController';
import { 
  ShieldAlert, 
  Play, 
  Zap, 
  AlertTriangle, 
  RotateCcw, 
  Layers, 
  CheckCircle2, 
  User, 
  Flame, 
  VolumeX, 
  Sparkles,
  Lock,
  Unlock,
  Shield,
  ArrowRight
} from 'lucide-react';

const paninian = new PaninianCompiler();
const vitruvian = new VitruvianGeometry();
const saptabhagini = new SaptabhaginiLedger();

export default function FlagshipArena({ soundEnabled, onObjectiveComplete }) {
  const [activeSector, setActiveSector] = useState(1); // 1: Tamisram, 2: Rauravam, 3: Kumbhipakam, 4: Asipattravana
  const [players, setPlayers] = useState(saptabhagini.createInitialPlayers());
  const [turn, setTurn] = useState(1);
  const [activePlayerIdx, setActivePlayerIdx] = useState(0);

  // Neural Buffer Hand & Selected Cards
  const [hand, setHand] = useState(paninian.generateStarterHand('Strategist'));
  const [selectedCards, setSelectedCards] = useState([]);
  const [compileOutput, setCompileOutput] = useState(null);

  // Polyomino Runway & Grid State
  const [runway, setRunway] = useState(vitruvian.getRunway(5));
  const [grid, setGrid] = useState(Array.from({ length: 6 }, () => Array(8).fill(0)));
  const [bridgeProgress, setBridgeProgress] = useState(2); // out of 12

  // Moksha Protocol State
  const [mokshaState, setMokshaState] = useState(null);
  const [auditLogs, setAuditLogs] = useState(saptabhagini.auditTrail);

  const activePlayer = players[activePlayerIdx];

  // Naraka Sectors Data
  const sectors = [
    { id: 1, name: 'Tamisram', theme: 'Darkness', rule: 'Hidden Info & CSP', color: 'border-indigo-500/50 bg-indigo-950/20' },
    { id: 2, name: 'Rauravam', theme: 'Silence', rule: 'Silent Spatial Packing', color: 'border-cyan-500/50 bg-cyan-950/20' },
    { id: 3, name: 'Kumbhipakam', theme: 'Thermal Cascade', rule: 'Risk/Reward & God Channel', color: 'border-orange-500/50 bg-orange-950/20' },
    { id: 4, name: 'Asipattravana', theme: '4D Portal Bleed', rule: 'Chess Search & Sacrifice', color: 'border-rose-500/50 bg-rose-950/20' }
  ];

  // Toggle card selection in Neural Buffer
  const handleCardClick = (card) => {
    if (soundEnabled) soundFx.playClick();
    if (selectedCards.some(c => c.id === card.id)) {
      setSelectedCards(selectedCards.filter(c => c.id !== card.id));
    } else {
      if (card.type === CARD_TYPES.CUT) {
        // Cut card selected solo
        setSelectedCards([card]);
      } else {
        setSelectedCards([...selectedCards.filter(c => c.type !== CARD_TYPES.CUT), card]);
      }
    }
  };

  // Execute Pāṇinian Compilation
  const handleCompile = () => {
    const result = paninian.validateSyntax(selectedCards);

    if (result.valid) {
      if (soundEnabled) soundFx.playCompileSuccess();

      if (result.syntax === 'CUT') {
        // Execute The Cut -> Reset tension
        const updatedPlayer = saptabhagini.executeCut(activePlayer);
        updatePlayerInList(updatedPlayer);
        setCompileOutput({ success: true, text: 'THE CUT EXECUTED: Tension reset to 1.' });
      } else {
        // Successful Pāṇinian compile -> Advance bridge & award credits
        const updatedPlayer = {
          ...activePlayer,
          wallet: activePlayer.wallet + 30,
          bridgeProgress: activePlayer.bridgeProgress + 1
        };
        updatePlayerInList(updatedPlayer);
        setBridgeProgress(prev => Math.min(12, prev + 1));
        setCompileOutput({ success: true, text: `SYNTAX COMPILED: [${result.effect}]. +30 Credits & Bridge Advance +1!` });

        // Push interrupt to LIFO stack visualizer
        paninian.pushInterrupt({ player: activePlayer.name, syntax: result.effect });

        // Trigger objective check if LIFO interrupt compiled
        if (onObjectiveComplete) onObjectiveComplete('obj-paninian-lifo-combo');
      }

      // Remove played cards and draw replacements
      const remainingHand = hand.filter(h => !selectedCards.some(s => s.id === h.id));
      setHand([...remainingHand, ...paninian.generateStarterHand(activePlayer.role).slice(0, selectedCards.length)]);
      setSelectedCards([]);
    } else {
      if (soundEnabled) soundFx.playTensionAlert();
      // Syntax compilation failure -> +1 Tension
      const updatedPlayer = saptabhagini.updateTension(activePlayer, 1);
      updatePlayerInList(updatedPlayer);
      setCompileOutput({ success: false, text: `COMPILATION FAILURE: ${result.reason}. Tension +1!` });
    }

    setAuditLogs([...saptabhagini.auditTrail]);
  };

  // Advance to next player turn and process 15-credit Comfort Tax drain
  const handleEndTurn = () => {
    if (soundEnabled) soundFx.playClick();

    // Process Comfort Tax turn drain
    const updatedPlayers = saptabhagini.processTurnDrain(players, turn);
    setPlayers(updatedPlayers);

    // Rotate player
    const nextIdx = (activePlayerIdx + 1) % 4;
    setActivePlayerIdx(nextIdx);

    if (nextIdx === 0) {
      setTurn(prev => prev + 1);
      // Auto-advance Naraka Sector round every 3 turns
      if (turn % 3 === 0) {
        setActiveSector(prev => Math.min(4, prev + 1));
      }
    }

    setCompileOutput(null);
    setSelectedCards([]);
    setAuditLogs([...saptabhagini.auditTrail]);
  };

  // Place Polyomino Piece onto Bridge Grid
  const handlePlacePiece = (pieceIdx) => {
    const piece = runway[pieceIdx];
    if (!piece) return;

    // Find first available cell on grid
    let placed = false;
    const newGrid = grid.map(row => [...row]);

    for (let r = 0; r < newGrid.length; r++) {
      for (let c = 0; c < newGrid[0].length; c++) {
        if (vitruvian.canPlace(newGrid, piece.shape, r, c)) {
          const updatedGrid = vitruvian.placeOnGrid(newGrid, piece.shape, r, c, 1);
          setGrid(updatedGrid);
          placed = true;
          break;
        }
      }
      if (placed) break;
    }

    if (placed) {
      if (soundEnabled) soundFx.playClick();
      vitruvian.drawPiece();
      setRunway(vitruvian.getRunway(5));
      setBridgeProgress(prev => Math.min(12, prev + 1));

      const updatedPlayer = {
        ...activePlayer,
        bridgeProgress: activePlayer.bridgeProgress + 1
      };
      updatePlayerInList(updatedPlayer);
    }
  };

  // Execute Voluntary Point Lead Sacrifice for Moksha Protocol Victory
  const handleVoluntarySacrifice = () => {
    // Set active player wallet to 0 (voluntary sacrifice)
    const sacrificedPlayers = players.map((p, idx) => 
      idx === activePlayerIdx ? { ...p, wallet: 0, debt: 0 } : { ...p, debt: 0 }
    );
    setPlayers(sacrificedPlayers);

    const result = saptabhagini.checkMokshaProtocol(sacrificedPlayers, 12);
    setMokshaState(result);

    if (result.unlocked) {
      if (soundEnabled) soundFx.playVictoryChime();
      if (onObjectiveComplete) onObjectiveComplete('obj-collective-moksha');
    }
  };

  const updatePlayerInList = (updatedPlayer) => {
    setPlayers(players.map(p => p.id === updatedPlayer.id ? updatedPlayer : p));
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Top Sector & Telemetry Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
        
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h1 className="font-orbitron font-extrabold text-2xl text-slate-100 flex items-center gap-2">
                <span>Phoenix: Arena Core</span>
                <span className="text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 rounded-md">
                  G01 FLAGSHIP
                </span>
              </h1>
              <p className="text-xs text-slate-400">4-Player Asymmetric Naraka Survival & Collective Moksha Protocol</p>
            </div>
          </div>

          {/* Turn & Round Telemetry */}
          <div className="flex items-center gap-4 bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800 font-mono text-xs">
            <div>
              <span className="text-slate-400">TURN:</span>
              <span className="text-amber-400 font-bold ml-1.5">{turn}</span>
            </div>
            <div className="h-4 w-[1px] bg-slate-800"></div>
            <div>
              <span className="text-slate-400">SECTOR:</span>
              <span className="text-cyan-400 font-bold ml-1.5">{activeSector} / 4</span>
            </div>
            <div className="h-4 w-[1px] bg-slate-800"></div>
            <div>
              <span className="text-slate-400">ACTIVE:</span>
              <span className="text-slate-100 font-bold ml-1.5">{activePlayer.name} ({activePlayer.role})</span>
            </div>
          </div>
        </div>

        {/* 4 Naraka Sector Round Tracker */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {sectors.map(sec => {
            const isActive = activeSector === sec.id;
            return (
              <div
                key={sec.id}
                onClick={() => setActiveSector(sec.id)}
                className={`cursor-pointer p-3.5 rounded-2xl border transition-all ${
                  isActive 
                    ? `${sec.color} shadow-lg shadow-amber-500/10 border-amber-500/60 ring-1 ring-amber-500/40`
                    : 'bg-slate-950/60 border-slate-800 opacity-60 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono font-bold">
                  <span className={isActive ? 'text-amber-400' : 'text-slate-400'}>ROUND {sec.id}</span>
                  <span className="text-[10px] text-slate-400 uppercase">{sec.theme}</span>
                </div>
                <div className="font-orbitron font-bold text-sm text-slate-100 mt-1">{sec.name}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{sec.rule}</div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Players HUD Bar (4 Roles) */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {players.map((p, idx) => {
          const isTurn = idx === activePlayerIdx;
          const tensionAlert = p.tension >= 8;
          return (
            <div
              key={p.id}
              onClick={() => setActivePlayerIdx(idx)}
              className={`cursor-pointer p-4 rounded-2xl border transition-all space-y-3 ${
                isTurn
                  ? 'bg-slate-900 border-amber-500/80 shadow-xl shadow-amber-500/10 ring-1 ring-amber-500/50'
                  : 'bg-slate-950/80 border-slate-800/80 opacity-75 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className={`w-4 h-4 ${isTurn ? 'text-amber-400' : 'text-slate-400'}`} />
                  <div>
                    <div className="font-orbitron font-bold text-sm text-slate-100">{p.name}</div>
                    <div className="text-[10px] font-mono text-slate-400">{p.role}</div>
                  </div>
                </div>
                {p.neckbandLocked ? (
                  <span className="p-1 rounded bg-rose-950 text-rose-400 border border-rose-800" title="Neck-Band Locked">
                    <Lock className="w-3.5 h-3.5" />
                  </span>
                ) : (
                  <span className="p-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800" title="Neck-Band Unlatched">
                    <Unlock className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>

              {/* Wallet Drain Bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">BLEED WALLET:</span>
                  <span className={`font-bold ${p.wallet < 30 ? 'text-rose-400 animate-pulse' : 'text-amber-400'}`}>
                    {p.wallet} CR
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, p.wallet)}%` }}
                  ></div>
                </div>
              </div>

              {/* Tension Meter (1-10) */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">TENSION METER:</span>
                  <span className={`font-bold ${tensionAlert ? 'text-rose-400 animate-bounce' : 'text-cyan-400'}`}>
                    {p.tension} / 10
                  </span>
                </div>
                <div className="grid grid-cols-10 gap-0.5">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 rounded-sm ${
                        i < p.tension 
                          ? i >= 7 ? 'bg-rose-500' : 'bg-cyan-400' 
                          : 'bg-slate-900 border border-slate-800'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Main Playable Core Interface */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left Column: Pāṇinian Neural Buffer Compiler (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-orbitron font-bold text-lg text-slate-100 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400" />
                  <span>Pāṇinian Syntax Compiler</span>
                </h2>
                <p className="text-xs text-slate-400">
                  Syntax: <strong className="text-amber-300">[Modifier] + [Action] + [Target]</strong> or play <strong className="text-cyan-300">The Cut</strong> to reset tension.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCompile}
                  disabled={selectedCards.length === 0}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 disabled:opacity-40 hover:scale-105 transition-transform"
                >
                  COMPILE PROGRAM
                </button>
                <button
                  onClick={handleEndTurn}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700 transition-colors"
                >
                  END TURN (-15 CR)
                </button>
              </div>
            </div>

            {/* Neural Buffer Hand (9 Slots) */}
            <div className="space-y-3">
              <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
                <span>NEURAL BUFFER HAND (9 CARDS)</span>
                <span>SELECTED: {selectedCards.length} / 3 CARDS</span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-9 gap-2">
                {hand.map((card) => {
                  const isSelected = selectedCards.some(c => c.id === card.id);
                  let typeColor = 'border-purple-500/40 bg-purple-950/30 text-purple-300';
                  if (card.type === CARD_TYPES.ACTION) typeColor = 'border-amber-500/40 bg-amber-950/30 text-amber-300';
                  if (card.type === CARD_TYPES.TARGET) typeColor = 'border-cyan-500/40 bg-cyan-950/30 text-cyan-300';
                  if (card.type === CARD_TYPES.CUT) typeColor = 'border-rose-500/40 bg-rose-950/30 text-rose-300';

                  return (
                    <div
                      key={card.id}
                      onClick={() => handleCardClick(card)}
                      className={`cursor-pointer p-2.5 rounded-xl border flex flex-col justify-between h-24 transition-all ${typeColor} ${
                        isSelected ? 'ring-2 ring-amber-400 scale-105 shadow-lg shadow-amber-500/20' : 'hover:scale-102 opacity-85 hover:opacity-100'
                      }`}
                    >
                      <div className="text-[9px] font-mono font-bold uppercase">{card.type}</div>
                      <div className="font-orbitron font-bold text-xs leading-tight">{card.name}</div>
                      <div className="text-[9px] font-mono text-slate-400">{card.role}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Special Sovereign Actions Panel (Lore Integrated) */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">SPECIAL SOVEREIGN TACTICAL ACTIONS</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => {
                    if (soundEnabled) soundFx.playClick();
                    const updated = { ...activePlayer, tension: Math.max(1, activePlayer.tension - 2), wallet: activePlayer.wallet + 10 };
                    updatePlayerInList(updated);
                    setCompileOutput({ success: true, text: 'NATURAL WAY SMUDGING EXECUTED: Cleared cellular toxicity! Tension -2, Wallet +10 CR.' });
                  }}
                  className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/60 transition-colors text-left font-mono text-[11px]"
                >
                  <div className="font-bold">Natural Smudging</div>
                  <div className="text-[9px] text-slate-400 mt-0.5">Tension -2 | +10 CR</div>
                </button>

                <button
                  onClick={() => {
                    if (soundEnabled) soundFx.playClick();
                    const updated = { ...activePlayer, wallet: activePlayer.wallet + 50, tension: Math.min(10, activePlayer.tension + 2) };
                    updatePlayerInList(updated);
                    setCompileOutput({ success: true, text: 'SCIENTIFIC NANITE STIM: Instant +50 CR gained, but tension increased +2!' });
                  }}
                  className="p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-900/60 transition-colors text-left font-mono text-[11px]"
                >
                  <div className="font-bold">Nanite Stim Inject</div>
                  <div className="text-[9px] text-slate-400 mt-0.5">+50 CR | Tension +2</div>
                </button>

                <button
                  onClick={() => {
                    if (soundEnabled) soundFx.playClick();
                    const updated = { ...activePlayer, tension: Math.max(1, activePlayer.tension - 1) };
                    updatePlayerInList(updated);
                    setCompileOutput({ success: true, text: 'OPTICAL STEALTH SUIT: Refracted tracking lasers via Ghost Vertex!' });
                  }}
                  className="p-2.5 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-300 hover:bg-purple-900/60 transition-colors text-left font-mono text-[11px]"
                >
                  <div className="font-bold">Optical Stealth</div>
                  <div className="text-[9px] text-slate-400 mt-0.5">Ghost Vertex Refract</div>
                </button>

                <button
                  onClick={() => {
                    if (soundEnabled) soundFx.playClick();
                    setBridgeProgress(prev => Math.min(12, prev + 2));
                    setCompileOutput({ success: true, text: 'LEAST NAME PROJECT SWARM: Cell swarmed lowest progress block! Bridge +2!' });
                  }}
                  className="p-2.5 rounded-xl bg-amber-950/60 border border-amber-500/30 text-amber-300 hover:bg-amber-900/60 transition-colors text-left font-mono text-[11px]"
                >
                  <div className="font-bold">Least Name Swarm</div>
                  <div className="text-[9px] text-slate-400 mt-0.5">Bridge Progress +2</div>
                </button>
              </div>
            </div>

            {/* Program Output Banner */}
            {compileOutput && (
              <div className={`p-4 rounded-2xl border text-xs font-mono font-semibold flex items-start gap-3 ${
                compileOutput.success 
                  ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300' 
                  : 'bg-rose-950/60 border-rose-500/40 text-rose-300'
              }`}>
                {compileOutput.success ? <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> : <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />}
                <div>
                  <div className="font-bold text-sm">{compileOutput.success ? 'COMPILATION SUCCESS' : 'COMPILATION ERROR'}</div>
                  <div>{compileOutput.text}</div>
                </div>
              </div>
            )}

            {/* Vitruvian 7-Bag Polyomino Runway & Bridge Grid */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-orbitron font-bold text-sm text-slate-100">Vitruvian Polyomino 7-Bag Runway</h3>
                  <p className="text-xs text-slate-400">Draft polyomino blocks to construct the NB Island Bridge.</p>
                </div>
                <div className="text-xs font-mono text-cyan-400 font-bold bg-cyan-950/60 px-3 py-1 rounded-lg border border-cyan-800">
                  BRIDGE PROGRESS: {bridgeProgress} / 12 NODES
                </div>
              </div>

              {/* 5 Runway Face-Up Pieces */}
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {runway.map((piece, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePlacePiece(idx)}
                    className="p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500 flex flex-col items-center gap-2 group transition-all"
                  >
                    <div className="text-[10px] font-mono text-amber-400 font-bold">{piece.name}</div>
                    <div className="grid gap-0.5 p-1 bg-slate-900 rounded">
                      {piece.shape.map((row, r) => (
                        <div key={r} className="flex gap-0.5">
                          {row.map((cell, c) => (
                            <div
                              key={c}
                              className={`w-3.5 h-3.5 rounded-sm ${cell ? 'bg-cyan-400 shadow-sm shadow-cyan-400/40' : 'bg-transparent'}`}
                            ></div>
                          ))}
                        </div>
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-400 group-hover:text-white">Place Block</span>
                  </button>
                ))}
              </div>

              {/* Interactive Bridge Grid Matrix */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">NB Island Bridge Structural Grid</div>
                <div className="grid gap-1 max-w-md mx-auto">
                  {grid.map((row, r) => (
                    <div key={r} className="flex justify-center gap-1">
                      {row.map((cell, c) => (
                        <div
                          key={c}
                          className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-colors ${
                            cell ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 font-bold text-xs' : 'bg-slate-900/60 border-slate-800'
                          }`}
                        >
                          {cell ? '⬡' : ''}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Right Column: Saptabhagini Ledger & Moksha Victory Panel */}
        <div className="space-y-6">
          
          {/* Voluntary Sacrifice / Moksha Control Box */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/40 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-amber-400 font-orbitron font-bold text-base">
              <Sparkles className="w-5 h-5" />
              <span>Moksha Protocol Endgame</span>
            </div>
            
            <p className="text-xs text-slate-300 leading-relaxed">
              To trigger the Moksha Endgame, complete the NB Island bridge (12 nodes) and have the active point leader execute a <strong className="text-amber-300">Voluntary Point Lead Sacrifice</strong> to unlatch all neck-bands.
            </p>

            <button
              onClick={handleVoluntarySacrifice}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-cyan-500 text-slate-950 font-orbitron font-extrabold text-xs tracking-wider shadow-lg shadow-amber-500/20 hover:scale-[1.02] transition-transform"
            >
              EXECUTE VOLUNTARY SACRIFICE
            </button>

            {mokshaState && (
              <div className={`p-4 rounded-2xl border text-xs font-mono space-y-2 ${
                mokshaState.unlocked 
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300' 
                  : 'bg-slate-950 border-slate-800 text-slate-300'
              }`}>
                <div className="font-bold text-sm font-orbitron">
                  {mokshaState.unlocked ? '✨ MOKSHA ENDGAME ACHIEVED! ✨' : 'MOKSHA STATUS CHECK'}
                </div>
                <div>{mokshaState.reason || 'Sacrifice or bridge condition incomplete.'}</div>
              </div>
            )}
          </div>

          {/* Saptabhagini Audit Log Stream */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="font-orbitron font-bold text-sm text-slate-100">Saptabhagini Audit Trail</h3>
              <span className="text-[10px] font-mono text-emerald-400">100% AUDITABLE</span>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1 text-[11px] font-mono scrollbar-thin">
              {auditLogs.map((log, idx) => (
                <div key={idx} className="p-2 rounded-lg bg-slate-950 border border-slate-800/80 text-slate-300 space-y-0.5">
                  <div className="text-[9px] text-slate-500">{new Date(log.timestamp).toLocaleTimeString()}</div>
                  <div>{log.message}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

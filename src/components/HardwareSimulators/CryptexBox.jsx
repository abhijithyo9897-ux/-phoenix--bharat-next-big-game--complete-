import React, { useState } from 'react';
import { soundFx } from '../SoundController';
import { Unlock, Lock, RotateCcw, CheckCircle2, Cpu, ShieldCheck } from 'lucide-react';

export default function CryptexBox({ soundEnabled, onObjectiveComplete }) {
  // 5 Rings, each with 6 glyph options
  const ringGlyphs = [
    ['Stealth', 'Double', 'Lethal', 'Shared', 'Shielded', 'Rapid'],
    ['Build', 'Extract', 'Strike', 'Heal', 'Nullify', 'Drain'],
    ['Node', 'Rival', 'Core', 'Wallet', 'Tension', 'Bridge'],
    ['Sigil-α', 'Sigil-β', 'Sigil-γ', 'Sigil-δ', 'Sigil-ε', 'Sigil-ζ'],
    ['Code-1', 'Code-2', 'Code-3', 'Code-4', 'Code-5', 'Code-6']
  ];

  // Target alignment code
  const targetCode = [0, 0, 0, 0, 0]; // Index 0 of each ring: Stealth + Build + Node + Sigil-α + Code-1

  const [ringState, setRingState] = useState([2, 4, 1, 3, 5]); // Initial scrambled state
  const [unlocked, setUnlocked] = useState(false);
  const [nfcPayload, setNfcPayload] = useState(null);

  const rotateRing = (ringIdx, direction) => {
    if (unlocked) return;
    if (soundEnabled) soundFx.playCryptexSpin();

    const newPositions = [...ringState];
    const glyphCount = ringGlyphs[ringIdx].length;
    if (direction === 'LEFT') {
      newPositions[ringIdx] = (newPositions[ringIdx] - 1 + glyphCount) % glyphCount;
    } else {
      newPositions[ringIdx] = (newPositions[ringIdx] + 1) % glyphCount;
    }
    setRingState(newPositions);
  };

  const handleVerify = () => {
    if (soundEnabled) soundFx.playClick();

    const isMatched = ringState.every((pos, idx) => pos === targetCode[idx]);

    if (isMatched) {
      setUnlocked(true);
      if (soundEnabled) soundFx.playVictoryChime();
      setNfcPayload({
        seedKey: 'SEED-NBT-7749-CRYPTEX-V2',
        rewardCredits: 250,
        unlockedAt: new Date().toISOString()
      });
      if (onObjectiveComplete) onObjectiveComplete('obj-cryptex-align');
    } else {
      if (soundEnabled) soundFx.playTensionAlert();
      alert('CRYPTEX PIN MISALIGNMENT: Ring sequence does not match target encryption key.');
    }
  };

  const resetCryptex = () => {
    setRingState([2, 4, 1, 3, 5]);
    setUnlocked(false);
    setNfcPayload(null);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
            <Cpu className="w-4 h-4" />
            <span>PHYSICAL HARDWARE PUZZLE PLATFORM</span>
          </div>
          <h2 className="font-orbitron font-extrabold text-2xl text-slate-100 mt-1">
            Cryptex 3D Puzzle Box Simulator
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Rotate the 5 concentric rings to align the target Pāṇinian glyph sequence and trigger NFC verification.
          </p>
        </div>

        <button
          onClick={resetCryptex}
          className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
          title="Scramble Rings"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Target Key Banner */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/30 flex items-center justify-between text-xs font-mono">
        <span className="text-slate-400">ENCRYPTED TARGET ALIGNMENT:</span>
        <span className="text-amber-400 font-bold font-orbitron">
          [ Stealth ] - [ Build ] - [ Node ] - [ Sigil-α ] - [ Code-1 ]
        </span>
      </div>

      {/* 5 Rotating Ring Layers */}
      <div className="space-y-3">
        {ringState.map((pos, ringIdx) => {
          const currentGlyph = ringGlyphs[ringIdx][pos];
          const isTarget = pos === targetCode[ringIdx];

          return (
            <div
              key={ringIdx}
              className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
                isTarget 
                  ? 'bg-emerald-950/30 border-emerald-500/50 shadow-md shadow-emerald-500/10' 
                  : 'bg-slate-950 border-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-900 border border-slate-800 text-slate-400 font-mono font-bold text-xs flex items-center justify-center">
                  R{ringIdx + 1}
                </span>
                <div>
                  <div className="text-[10px] font-mono text-slate-400">RING LAYER {ringIdx + 1}</div>
                  <div className="font-orbitron font-bold text-base text-slate-100">{currentGlyph}</div>
                </div>
              </div>

              {/* Rotate Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => rotateRing(ringIdx, 'LEFT')}
                  disabled={unlocked}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-xs font-mono font-bold text-slate-200 transition-colors disabled:opacity-40"
                >
                  ◄ SPIN LEFT
                </button>
                <span className="text-xs font-mono text-cyan-400 w-12 text-center font-bold">
                  POS {pos + 1}/6
                </span>
                <button
                  onClick={() => rotateRing(ringIdx, 'RIGHT')}
                  disabled={unlocked}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-xs font-mono font-bold text-slate-200 transition-colors disabled:opacity-40"
                >
                  SPIN RIGHT ►
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Verify & Unlock Button */}
      <div className="pt-2 flex justify-center">
        <button
          onClick={handleVerify}
          disabled={unlocked}
          className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-cyan-500 text-slate-950 font-orbitron font-extrabold text-sm tracking-wider shadow-xl shadow-amber-500/20 hover:scale-105 transition-transform disabled:opacity-50"
        >
          {unlocked ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
          <span>{unlocked ? 'CRYPTEX UNLOCKED!' : 'VERIFY ALIGNMENT & NFC HANDSHAKE'}</span>
        </button>
      </div>

      {/* NFC Payload Reveal Banner */}
      {nfcPayload && (
        <div className="p-5 rounded-2xl bg-emerald-950 border border-emerald-500 text-emerald-300 font-mono text-xs space-y-2 animate-fade-in shadow-2xl">
          <div className="flex items-center gap-2 font-orbitron font-bold text-base text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
            <span>NFC CHALLENGE-RESPONSE VERIFIED!</span>
          </div>
          <div>SEED HASH: {nfcPayload.seedKey}</div>
          <div>LEDGER CLAIM: +{nfcPayload.rewardCredits} Credits Distributed to Saptabhagini Account.</div>
        </div>
      )}

    </div>
  );
}

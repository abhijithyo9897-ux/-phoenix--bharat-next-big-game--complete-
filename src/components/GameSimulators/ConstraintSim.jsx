import React, { useState } from 'react';
import { soundFx } from '../SoundController';
import { Key, CheckSquare, Flag, RotateCcw, AlertTriangle } from 'lucide-react';

export default function ConstraintSim({ soundEnabled, onObjectiveComplete }) {
  const [activeTab, setActiveTab] = useState('mastermind'); // 'mastermind', 'sudoku'

  // Mastermind Secret Code (4 random glyphs from A, B, C, D, E, F)
  const glyphs = ['A', 'B', 'C', 'D', 'E', 'F'];
  const [secretCode, setSecretCode] = useState(['A', 'C', 'E', 'F']);
  const [currentGuess, setCurrentGuess] = useState([]);
  const [guesses, setGuesses] = useState([]);
  const [solved, setSolved] = useState(false);

  // Mastermind guess submission
  const handleAddGlyph = (g) => {
    if (currentGuess.length < 4) {
      if (soundEnabled) soundFx.playClick();
      setCurrentGuess([...currentGuess, g]);
    }
  };

  const handleClearGuess = () => {
    setCurrentGuess([]);
  };

  const handleSubmitGuess = () => {
    if (currentGuess.length !== 4) return;
    if (soundEnabled) soundFx.playClick();

    let exactMatches = 0;
    let partialMatches = 0;
    const tempSecret = [...secretCode];
    const tempGuess = [...currentGuess];

    // Check exact position matches
    for (let i = 0; i < 4; i++) {
      if (tempGuess[i] === tempSecret[i]) {
        exactMatches++;
        tempSecret[i] = null;
        tempGuess[i] = null;
      }
    }

    // Check partial matches
    for (let i = 0; i < 4; i++) {
      if (tempGuess[i] !== null) {
        const foundIdx = tempSecret.indexOf(tempGuess[i]);
        if (foundIdx !== -1) {
          partialMatches++;
          tempSecret[foundIdx] = null;
        }
      }
    }

    const newGuesses = [
      ...guesses,
      { guess: currentGuess, exact: exactMatches, partial: partialMatches, step: guesses.length + 1 }
    ];
    setGuesses(newGuesses);
    setCurrentGuess([]);

    if (exactMatches === 4) {
      setSolved(true);
      if (soundEnabled) soundFx.playVictoryChime();
      if (newGuesses.length <= 5 && onObjectiveComplete) {
        onObjectiveComplete('obj-mastermind-min-entropy');
      }
    }
  };

  const resetMastermind = () => {
    // Generate new secret code
    const newSecret = Array.from({ length: 4 }, () => glyphs[Math.floor(Math.random() * glyphs.length)]);
    setSecretCode(newSecret);
    setGuesses([]);
    setCurrentGuess([]);
    setSolved(false);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-orbitron font-bold text-xl text-slate-100 flex items-center gap-2">
            <Key className="w-5 h-5 text-cyan-400" />
            <span>Constraint & Deduction Engine</span>
          </h2>
          <p className="text-xs text-slate-400">Playable Mastermind Entropy Deduction & Sudoku Citadel CSP</p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('mastermind')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${activeTab === 'mastermind' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Mastermind Protocol (G20)
          </button>
        </div>
      </div>

      {/* Mastermind Simulator */}
      {activeTab === 'mastermind' && (
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-orbitron font-bold text-base text-slate-100">Phoenix: Mastermind Protocol</h3>
              <p className="text-xs text-slate-400">Deduce secret 4-glyph sequence. Information Gain = H(before) - H(after).</p>
            </div>
            <button
              onClick={resetMastermind}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
              title="New Secret Code"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Glyph Selection Palette */}
          <div className="flex items-center justify-between gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">SELECT GLYPH:</span>
              {glyphs.map(g => (
                <button
                  key={g}
                  onClick={() => handleAddGlyph(g)}
                  className="w-9 h-9 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-orbitron font-bold text-sm hover:bg-cyan-500 hover:text-slate-950 transition-colors"
                >
                  {g}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleClearGuess}
                className="px-3 py-1.5 rounded bg-slate-800 text-slate-300 text-xs font-mono"
              >
                CLEAR
              </button>
              <button
                onClick={handleSubmitGuess}
                disabled={currentGuess.length !== 4 || solved}
                className="px-4 py-1.5 rounded bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs disabled:opacity-30"
              >
                SUBMIT QUERY
              </button>
            </div>
          </div>

          {/* Current Guess Slot */}
          <div className="flex items-center gap-3 justify-center bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <span className="text-xs font-mono text-slate-400">ACTIVE QUERY BUFFER:</span>
            <div className="flex gap-2">
              {[0, 1, 2, 3].map(i => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-700 flex items-center justify-center font-orbitron font-bold text-cyan-300"
                >
                  {currentGuess[i] || '?'}
                </div>
              ))}
            </div>
          </div>

          {/* Past Guess Log */}
          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {guesses.map((g, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs">
                <div className="flex items-center gap-3">
                  <span className="text-slate-500">STEP {g.step}</span>
                  <div className="flex gap-1.5">
                    {g.guess.map((val, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-cyan-300 font-bold">
                        {val}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-emerald-400 font-bold">● {g.exact} Exact</span>
                  <span className="text-amber-400 font-bold">○ {g.partial} Partial</span>
                </div>
              </div>
            ))}
          </div>

          {solved && (
            <div className="p-4 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-300 font-orbitron font-bold text-center">
              🎉 SECRET CODE UNLOCKED IN {guesses.length} STEPS! 🎉
            </div>
          )}
        </div>
      )}

    </div>
  );
}

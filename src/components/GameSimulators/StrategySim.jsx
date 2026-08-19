import React, { useState } from 'react';
import { soundFx } from '../SoundController';
import { Swords, CheckCircle2, RotateCcw, Zap, Brain, Crosshair } from 'lucide-react';

export default function StrategySim({ soundEnabled, onObjectiveComplete }) {
  const [activeTab, setActiveTab] = useState('nim'); // 'nim', 'connect', 'chess'

  // Nim Heap State
  const [heaps, setHeaps] = useState([3, 5, 7]);
  const [nimMessage, setNimMessage] = useState('Select a heap and tokens to remove.');

  // Connect Grid State (6x7 Matrix)
  const [connectGrid, setConnectGrid] = useState(Array.from({ length: 6 }, () => Array(7).fill(0)));
  const [connectTurn, setConnectTurn] = useState(1); // Player 1 (Amber), Player 2 (Cyan)
  const [connectWinner, setConnectWinner] = useState(null);

  // Calculate Nim-Sum XOR
  const calculateNimSum = (currentHeaps) => {
    return currentHeaps.reduce((xor, count) => xor ^ count, 0);
  };

  // Execute Nim Move
  const handleNimMove = (heapIdx, removeCount) => {
    if (heaps[heapIdx] < removeCount) return;
    if (soundEnabled) soundFx.playClick();

    const newHeaps = [...heaps];
    newHeaps[heapIdx] -= removeCount;
    setHeaps(newHeaps);

    const xor = calculateNimSum(newHeaps);
    if (xor === 0) {
      setNimMessage(`NIM-SUM XOR IS ZERO (0)! Winning terminal state achieved!`);
      if (soundEnabled) soundFx.playVictoryChime();
      if (onObjectiveComplete) onObjectiveComplete('obj-nim-zero-sum');
    } else {
      setNimMessage(`Current Nim-Sum XOR = ${xor}. Opponent turn next.`);
    }
  };

  const resetNim = () => {
    setHeaps([3, 5, 7]);
    setNimMessage('Select a heap and tokens to remove.');
  };

  // Drop token in Connect Grid
  const handleConnectDrop = (colIdx) => {
    if (connectWinner) return;

    // Find lowest empty row in column
    let targetRow = -1;
    for (let r = 5; r >= 0; r--) {
      if (connectGrid[r][colIdx] === 0) {
        targetRow = r;
        break;
      }
    }

    if (targetRow === -1) return; // Column full
    if (soundEnabled) soundFx.playClick();

    const newGrid = connectGrid.map(row => [...row]);
    newGrid[targetRow][colIdx] = connectTurn;
    setConnectGrid(newGrid);

    // Check Win
    if (checkConnectWin(newGrid, targetRow, colIdx, connectTurn)) {
      setConnectWinner(connectTurn);
      if (soundEnabled) soundFx.playVictoryChime();
    } else {
      setConnectTurn(connectTurn === 1 ? 2 : 1);
    }
  };

  const checkConnectWin = (grid, r, c, player) => {
    const directions = [
      [0, 1],  // Horizontal
      [1, 0],  // Vertical
      [1, 1],  // Diagonal down-right
      [1, -1]  // Diagonal down-left
    ];

    for (let [dr, dc] of directions) {
      let count = 1;
      // Check forward
      let nr = r + dr, nc = c + dc;
      while (nr >= 0 && nr < 6 && nc >= 0 && nc < 7 && grid[nr][nc] === player) {
        count++; nr += dr; nc += dc;
      }
      // Check backward
      nr = r - dr; nc = c - dc;
      while (nr >= 0 && nr < 6 && nc >= 0 && nc < 7 && grid[nr][nc] === player) {
        count++; nr -= dr; nc -= dc;
      }
      if (count >= 4) return true;
    }
    return false;
  };

  const resetConnect = () => {
    setConnectGrid(Array.from({ length: 6 }, () => Array(7).fill(0)));
    setConnectTurn(1);
    setConnectWinner(null);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-orbitron font-bold text-xl text-slate-100 flex items-center gap-2">
            <Swords className="w-5 h-5 text-amber-400" />
            <span>Deterministic Strategy Engine</span>
          </h2>
          <p className="text-xs text-slate-400">Playable Nim Ledger (Bouton XOR), Connect Grid & Vector Tactics</p>
        </div>

        {/* Tab selector */}
        <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('nim')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${activeTab === 'nim' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Nim Ledger (G25)
          </button>
          <button
            onClick={() => setActiveTab('connect')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${activeTab === 'connect' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Connect Grid (G26)
          </button>
        </div>
      </div>

      {/* Nim Ledger Simulator */}
      {activeTab === 'nim' && (
        <div className="space-y-6">
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-orbitron font-bold text-base text-slate-100">Phoenix: Nim Ledger</h3>
                <p className="text-xs text-slate-400">Mathematical Game Theory: Nim-Sum XOR = 0 guarantees winning state.</p>
              </div>
              <button
                onClick={resetNim}
                className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
                title="Reset Heaps"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Nim Heaps */}
            <div className="grid grid-cols-3 gap-4">
              {heaps.map((count, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3 text-center">
                  <div className="text-xs font-mono text-amber-400 font-bold">HEAP {idx + 1}</div>
                  <div className="text-3xl font-orbitron font-black text-slate-100">{count}</div>
                  <div className="flex justify-center gap-1 flex-wrap">
                    {Array.from({ length: count }).map((_, i) => (
                      <div key={i} className="w-3.5 h-8 bg-amber-500 rounded-sm shadow-sm shadow-amber-500/40"></div>
                    ))}
                  </div>
                  <div className="flex justify-center gap-2 pt-2">
                    {[1, 2, 3].map(num => (
                      <button
                        key={num}
                        disabled={count < num}
                        onClick={() => handleNimMove(idx, num)}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-xs font-mono font-bold text-slate-200 disabled:opacity-30"
                      >
                        -{num}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Nim Message Banner */}
            <div className="p-4 rounded-xl bg-slate-900 border border-amber-500/40 text-amber-300 font-mono text-xs font-semibold flex items-center justify-between">
              <span>{nimMessage}</span>
              <span className="text-[10px] bg-amber-500/20 px-2 py-0.5 rounded text-amber-400">
                NIM-SUM = {calculateNimSum(heaps)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Connect Grid Simulator */}
      {activeTab === 'connect' && (
        <div className="space-y-6">
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-orbitron font-bold text-base text-slate-100">Phoenix: Connect Grid</h3>
                <p className="text-xs text-slate-400">Drop tokens to align 4 in a row across gravity matrix.</p>
              </div>
              <button
                onClick={resetConnect}
                className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
                title="Reset Board"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Connect 4 Matrix */}
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 max-w-md mx-auto space-y-2">
              {/* Column Drop Buttons */}
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 7 }).map((_, c) => (
                  <button
                    key={c}
                    onClick={() => handleConnectDrop(c)}
                    disabled={Boolean(connectWinner)}
                    className="py-1 rounded bg-slate-800 hover:bg-cyan-500/30 text-[10px] font-mono text-cyan-300 font-bold transition-colors"
                  >
                    ↓
                  </button>
                ))}
              </div>

              {/* Grid Cells */}
              <div className="grid gap-1">
                {connectGrid.map((row, r) => (
                  <div key={r} className="grid grid-cols-7 gap-1">
                    {row.map((cell, c) => (
                      <div
                        key={c}
                        className="w-10 h-10 rounded-full border border-slate-800 bg-slate-950 flex items-center justify-center"
                      >
                        {cell === 1 && <div className="w-8 h-8 rounded-full bg-amber-500 shadow-md shadow-amber-500/50"></div>}
                        {cell === 2 && <div className="w-8 h-8 rounded-full bg-cyan-400 shadow-md shadow-cyan-400/50"></div>}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {connectWinner && (
              <div className="p-4 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-300 font-orbitron font-bold text-center">
                🎉 PLAYER {connectWinner} WINS CONNECT GRID MATCH! 🎉
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

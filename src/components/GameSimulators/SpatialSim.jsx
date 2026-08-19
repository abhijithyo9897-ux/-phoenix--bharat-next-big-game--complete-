import React, { useState } from 'react';
import { soundFx } from '../SoundController';
import { Layers, Maximize2, Move, RotateCcw } from 'lucide-react';

export default function SpatialSim({ soundEnabled, onObjectiveComplete }) {
  const [activeTab, setActiveTab] = useState('2048'); // '2048'

  // 2048 Grid (4x4 Matrix)
  const [grid2048, setGrid2048] = useState([
    [0, 2, 0, 0],
    [0, 0, 4, 0],
    [0, 0, 0, 0],
    [0, 2, 0, 0]
  ]);
  const [score2048, setScore2048] = useState(6);
  const [highestTile, setHighestTile] = useState(4);

  // 2048 Slide Logic
  const handleSlide = (direction) => {
    let moved = false;
    let newScore = score2048;
    let maxTile = highestTile;
    let newGrid = grid2048.map(row => [...row]);

    const rotate = (matrix) => matrix[0].map((_, c) => matrix.map(r => r[c]).reverse());

    // Orient matrix to slide left
    let rotations = 0;
    if (direction === 'UP') rotations = 3;
    if (direction === 'RIGHT') rotations = 2;
    if (direction === 'DOWN') rotations = 1;

    for (let i = 0; i < rotations; i++) newGrid = rotate(newGrid);

    // Slide left and merge
    for (let r = 0; r < 4; r++) {
      let row = newGrid[r].filter(val => val !== 0);
      for (let c = 0; c < row.length - 1; c++) {
        if (row[c] === row[c + 1]) {
          row[c] *= 2;
          newScore += row[c];
          if (row[c] > maxTile) maxTile = row[c];
          row[c + 1] = 0;
          moved = true;
        }
      }
      row = row.filter(val => val !== 0);
      while (row.length < 4) row.push(0);
      if (JSON.stringify(newGrid[r]) !== JSON.stringify(row)) moved = true;
      newGrid[r] = row;
    }

    // Rotate back
    for (let i = 0; i < (4 - rotations) % 4; i++) newGrid = rotate(newGrid);

    if (moved) {
      if (soundEnabled) soundFx.playClick();
      // Add random 2 or 4 tile
      const emptyCells = [];
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
          if (newGrid[r][c] === 0) emptyCells.push({ r, c });
        }
      }
      if (emptyCells.length > 0) {
        const rand = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        newGrid[rand.r][rand.c] = Math.random() < 0.9 ? 2 : 4;
      }
      setGrid2048(newGrid);
      setScore2048(newScore);
      setHighestTile(maxTile);

      if (maxTile >= 512 && onObjectiveComplete) {
        onObjectiveComplete('obj-2048-tile-ascension');
      }
    }
  };

  const reset2048 = () => {
    setGrid2048([
      [0, 2, 0, 0],
      [0, 0, 4, 0],
      [0, 0, 0, 0],
      [0, 2, 0, 0]
    ]);
    setScore2048(6);
    setHighestTile(4);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-orbitron font-bold text-xl text-slate-100 flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" />
            <span>Spatial & Geometric Engine</span>
          </h2>
          <p className="text-xs text-slate-400">Playable 2048 Ascension Exponential Fusion & Polyomino Packing</p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('2048')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${activeTab === '2048' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
          >
            2048 Ascension (G35)
          </button>
        </div>
      </div>

      {activeTab === '2048' && (
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-orbitron font-bold text-base text-slate-100">Phoenix: 2048 Ascension</h3>
              <p className="text-xs text-slate-400">Merge matching exponential energy tiles to reach the 2048 tier node.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-[10px] font-mono text-slate-400">SCORE</div>
                <div className="text-base font-orbitron font-bold text-amber-400">{score2048}</div>
              </div>
              <button
                onClick={reset2048}
                className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 4x4 Grid Matrix */}
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 max-w-xs mx-auto space-y-2">
            <div className="grid grid-cols-4 gap-2">
              {grid2048.map((row, r) => (
                row.map((val, c) => (
                  <div
                    key={`${r}-${c}`}
                    className={`w-16 h-16 rounded-xl border flex items-center justify-center font-orbitron font-extrabold text-base transition-all ${
                      val === 0 
                        ? 'bg-slate-950/60 border-slate-800 text-transparent'
                        : val >= 256
                        ? 'bg-gradient-to-tr from-amber-500 to-orange-500 border-amber-400 text-slate-950 shadow-lg shadow-amber-500/30'
                        : 'bg-cyan-950 border-cyan-500/50 text-cyan-300'
                    }`}
                  >
                    {val || ''}
                  </div>
                ))
              ))}
            </div>

            {/* Controls */}
            <div className="pt-4 flex flex-col items-center gap-2">
              <button onClick={() => handleSlide('UP')} className="px-6 py-2 rounded-lg bg-slate-800 text-xs font-bold text-slate-200 hover:bg-slate-700">▲ UP</button>
              <div className="flex gap-4">
                <button onClick={() => handleSlide('LEFT')} className="px-5 py-2 rounded-lg bg-slate-800 text-xs font-bold text-slate-200 hover:bg-slate-700">◀ LEFT</button>
                <button onClick={() => handleSlide('RIGHT')} className="px-5 py-2 rounded-lg bg-slate-800 text-xs font-bold text-slate-200 hover:bg-slate-700">RIGHT ▶</button>
              </div>
              <button onClick={() => handleSlide('DOWN')} className="px-6 py-2 rounded-lg bg-slate-800 text-xs font-bold text-slate-200 hover:bg-slate-700">▼ DOWN</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

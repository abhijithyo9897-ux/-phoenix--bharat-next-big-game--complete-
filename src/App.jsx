import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import FlagshipArena from './components/FlagshipArena';
import NextBigCosmoView from './components/NextBigCosmoView';
import WorldLoreView from './components/WorldLoreView';
import MechanicsMatrixView from './components/MechanicsMatrixView';
import StrategySim from './components/GameSimulators/StrategySim';
import ConstraintSim from './components/GameSimulators/ConstraintSim';
import SpatialSim from './components/GameSimulators/SpatialSim';
import KineticSim from './components/GameSimulators/KineticSim';
import CryptexBox from './components/HardwareSimulators/CryptexBox';
import ProcessorRotor from './components/HardwareSimulators/ProcessorRotor';
import ManualsHub from './components/ManualsHub';
import ObjectiveTracker from './components/ObjectiveTracker';
import GeneratorView from './components/GeneratorView';
import AuditLogs from './components/AuditLogs';
import { OBJECTIVES } from './data/objectivesData';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedGameManualId, setSelectedGameManualId] = useState('phoenix-arena-core');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Global Ledger State
  const [walletCredits, setWalletCredits] = useState(1250);
  const [completedObjIds, setCompletedObjIds] = useState(['obj-card-matrix-snap']);

  // Handle Objective Completion Payout
  const handleObjectiveComplete = (objId) => {
    if (!completedObjIds.includes(objId)) {
      const obj = OBJECTIVES.find(o => o.id === objId);
      const reward = obj ? obj.rewardCredits : 200;

      setCompletedObjIds(prev => [...prev, objId]);
      setWalletCredits(prev => prev + reward);
    }
  };

  // Launch a game from Dashboard
  const handleLaunchGame = (gameId) => {
    if (gameId === 'phoenix-arena-core') {
      setActiveTab('flagship');
    } else if (gameId === 'next-big-cosmo') {
      setActiveTab('next-big-cosmo');
    } else if (gameId === 'cryptex-trials') {
      setActiveTab('hardware');
    } else {
      setActiveTab('simulators');
    }
  };

  // Open manual for specific game from Dashboard
  const handleOpenManual = (gameId) => {
    setSelectedGameManualId(gameId);
    setActiveTab('manuals');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top Sticky Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        integrityScore={100}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        walletCredits={walletCredits}
      />

      {/* Main App Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {activeTab === 'dashboard' && (
          <Dashboard
            onLaunchGame={handleLaunchGame}
            onOpenManual={handleOpenManual}
            soundEnabled={soundEnabled}
          />
        )}

        {activeTab === 'flagship' && (
          <FlagshipArena
            soundEnabled={soundEnabled}
            onObjectiveComplete={handleObjectiveComplete}
          />
        )}

        {activeTab === 'next-big-cosmo' && (
          <NextBigCosmoView
            soundEnabled={soundEnabled}
            onObjectiveComplete={handleObjectiveComplete}
          />
        )}

        {activeTab === 'world-canon' && (
          <WorldLoreView
            soundEnabled={soundEnabled}
            onLaunchGame={handleLaunchGame}
          />
        )}

        {activeTab === 'mechanics-matrix' && (
          <MechanicsMatrixView
            soundEnabled={soundEnabled}
            onOpenManual={handleOpenManual}
          />
        )}

        {activeTab === 'simulators' && (
          <div className="space-y-10 pb-12">
            <StrategySim soundEnabled={soundEnabled} onObjectiveComplete={handleObjectiveComplete} />
            <ConstraintSim soundEnabled={soundEnabled} onObjectiveComplete={handleObjectiveComplete} />
            <SpatialSim soundEnabled={soundEnabled} onObjectiveComplete={handleObjectiveComplete} />
            <KineticSim soundEnabled={soundEnabled} onObjectiveComplete={handleObjectiveComplete} />
          </div>
        )}

        {activeTab === 'hardware' && (
          <div className="space-y-10 pb-12">
            <CryptexBox soundEnabled={soundEnabled} onObjectiveComplete={handleObjectiveComplete} />
            <ProcessorRotor soundEnabled={soundEnabled} />
          </div>
        )}

        {activeTab === 'manuals' && (
          <ManualsHub
            initialGameId={selectedGameManualId}
            soundEnabled={soundEnabled}
          />
        )}

        {activeTab === 'objectives' && (
          <ObjectiveTracker
            completedObjIds={completedObjIds}
            onTriggerComplete={handleObjectiveComplete}
            walletCredits={walletCredits}
            soundEnabled={soundEnabled}
          />
        )}

        {activeTab === 'generator' && (
          <GeneratorView soundEnabled={soundEnabled} />
        )}

        {activeTab === 'audit' && (
          <AuditLogs />
        )}

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800/80 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            PHOENIX / NBT: THE SOVEREIGN REALITY © 2026 — ALL ENGINES ONLINE
          </div>
          <div className="flex items-center gap-4">
            <span>VITRUVIAN: ACTIVE</span>
            <span>•</span>
            <span>PĀṆINIAN: ACTIVE</span>
            <span>•</span>
            <span>SAPTABHAGINI: ACTIVE</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

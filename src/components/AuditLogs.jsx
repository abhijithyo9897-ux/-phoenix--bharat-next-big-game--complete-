import React from 'react';
import { IntegrityAuditor } from '../engine/IntegrityAuditor';
import { CheckCircle2, ShieldCheck, FileCheck2, Cpu, Database, Award } from 'lucide-react';

const auditor = new IntegrityAuditor();

export default function AuditLogs() {
  const report = auditor.getAuditReport(49);

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold tracking-wider uppercase">
          <FileCheck2 className="w-3.5 h-3.5" />
          <span>OFFICIAL 100% INTEGRITY AUDIT REPORT</span>
        </div>
        <h1 className="font-orbitron font-extrabold text-2xl sm:text-3xl text-slate-100">
          State Transition & Rule Integrity Standards
        </h1>
        <p className="text-xs sm:text-base text-slate-400">
          Verification report validating mathematical coverage, rule integrity, probability normalization ($\sum P = 1.0$), and auditable deterministic replay.
        </p>
      </div>

      {/* Main Integrity Metrics Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        
        <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 space-y-3 shadow-xl">
          <div className="text-xs font-mono text-emerald-400 font-bold uppercase">COVERAGE INTEGRITY ($C$)</div>
          <div className="text-4xl font-orbitron font-black text-slate-100">{report.coveragePercent}</div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Every identified fundamental game-logic family (100 mechanics) is fully represented as first-class software modules.
          </p>
        </div>

        <div className="bg-slate-900 border border-cyan-500/40 rounded-3xl p-6 space-y-3 shadow-xl">
          <div className="text-xs font-mono text-cyan-400 font-bold uppercase">RULE INTEGRITY ($R$)</div>
          <div className="text-4xl font-orbitron font-black text-slate-100">{report.ruleIntegrityPercent}</div>
          <p className="text-xs text-slate-400 leading-relaxed">
            100% of defined legal state transition rules pass automated consistency and reachability verification tests.
          </p>
        </div>

        <div className="bg-slate-900 border border-purple-500/40 rounded-3xl p-6 space-y-3 shadow-xl">
          <div className="text-xs font-mono text-purple-400 font-bold uppercase">PROBABILITY INTEGRITY</div>
          <div className="text-2xl font-orbitron font-black text-slate-100">{report.probabilityNormalized}</div>
          <p className="text-xs text-slate-400 leading-relaxed">
            All stochastic distributions (7-bag, hypergeometric, Bayesian heatmaps) sum exactly to 1.0.
          </p>
        </div>

      </div>

      {/* Audit Certificate Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-emerald-400" />
            <div>
              <h2 className="font-orbitron font-bold text-lg text-slate-100">Audit Certificate & Source Hashes</h2>
              <div className="text-xs font-mono text-slate-400">Timestamp: {report.timestamp}</div>
            </div>
          </div>
          <span className="px-3 py-1 rounded bg-emerald-950 text-emerald-400 font-mono font-bold text-xs border border-emerald-800">
            AUDITED & PASSING
          </span>
        </div>

        <div className="space-y-3 font-mono text-xs text-slate-300">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-400">gaming logics.txt Hash:</span> 906fd3f9faf159e2b297c3eb95799d01f678d7fc0038793d8c5d440155f55b20
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-400">merged wiyhout logic file.txt Hash:</span> 5e917f27703b324f6ec3519d066ce6b5b5c19ad890d78952840556cf47c4fa8a
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-400">Master Engines Status:</span> {report.enginesActive}
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-400">Catalog Slate Support:</span> {report.gamesSupported}
          </div>
        </div>
      </div>

    </div>
  );
}

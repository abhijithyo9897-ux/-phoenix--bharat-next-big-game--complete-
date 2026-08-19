// Saptabhagini Engine — Meta-State, Ledger, Bleed Wallet, Tension & Moksha Protocol

export class SaptabhaginiLedger {
  constructor() {
    this.comfortTaxBaseline = 15; // 15 credits/turn drain
    this.globalKarmicDebt = 120;
    this.mokshaThreshold = 0; // Collective debt must reach 0
    this.auditTrail = [];
  }

  // Initialize initial 4-player state
  createInitialPlayers() {
    return [
      { id: 'p1', name: 'Strategist', role: 'White Knight', wallet: 100, tension: 1, debt: 30, bridgeProgress: 0, neckbandLocked: true },
      { id: 'p2', name: 'Builder', role: 'Black Rook', wallet: 100, tension: 1, debt: 30, bridgeProgress: 0, neckbandLocked: true },
      { id: 'p3', name: 'Healer', role: 'White Bishop', wallet: 100, tension: 1, debt: 30, bridgeProgress: 0, neckbandLocked: true },
      { id: 'p4', name: 'Disruptor', role: 'Black Pawn', wallet: 100, tension: 1, debt: 30, bridgeProgress: 0, neckbandLocked: true }
    ];
  }

  // Process end-of-turn comfort tax bleed drain
  processTurnDrain(players, turnNumber) {
    const updated = players.map(p => {
      const newWallet = Math.max(0, p.wallet - this.comfortTaxBaseline);
      const zeroBleed = newWallet === 0;

      return {
        ...p,
        wallet: newWallet,
        reversalAlert: zeroBleed // Drone alert triggered if wallet hits 0
      };
    });

    this.logEvent(`Turn ${turnNumber}: Processed 15-credit Comfort Tax drain across all players.`);
    return updated;
  }

  // Adjust player neck-band tension (1 to 10 scale)
  updateTension(player, delta) {
    const newTension = Math.max(1, Math.min(10, player.tension + delta));
    const tensionStun = newTension >= 10; // Loss of next turn at 10

    this.logEvent(`Player ${player.name} tension adjusted from ${player.tension} to ${newTension}.${tensionStun ? ' STUN TRIGGERED!' : ''}`);

    return {
      ...player,
      tension: newTension,
      stunned: tensionStun
    };
  }

  // Execute "The Cut" card — resets tension meter
  executeCut(player) {
    this.logEvent(`Player ${player.name} played "The Cut" card. Tension meter reset from ${player.tension} to 1.`);
    return {
      ...player,
      tension: 1
    };
  }

  // Evaluate Collective Moksha Endgame victory condition
  checkMokshaProtocol(players, totalBridgeLength = 12) {
    const totalBridge = players.reduce((sum, p) => sum + p.bridgeProgress, 0);
    const zeroWalletPlayer = players.find(p => p.wallet === 0);
    const collectiveDebt = players.reduce((sum, p) => sum + p.debt, 0);

    // Moksha requirements: Bridge complete + zero wallet voluntary sacrifice + collective debt clean
    const bridgeComplete = totalBridge >= totalBridgeLength;
    const sacrificeAchieved = Boolean(zeroWalletPlayer);
    const debtClear = collectiveDebt <= 20;

    if (bridgeComplete && sacrificeAchieved && debtClear) {
      this.logEvent('MOKSHA PROTOCOL ACTIVATED: Collective sacrifice recognized. All neck-bands unlatched!');
      return {
        unlocked: true,
        reason: 'Voluntary Point Sacrifice & NB Island Bridge Completed!',
        players: players.map(p => ({ ...p, neckbandLocked: false }))
      };
    }

    return {
      unlocked: false,
      bridgeComplete,
      sacrificeAchieved,
      debtClear,
      currentBridge: totalBridge,
      targetBridge: totalBridgeLength
    };
  }

  logEvent(msg) {
    const entry = { timestamp: new Date().toISOString(), message: msg };
    this.auditTrail.unshift(entry);
    if (this.auditTrail.length > 100) this.auditTrail.pop();
  }
}

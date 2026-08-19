// Pāṇinian Compiler Engine — Formal Action Syntax & LIFO Interrupt Processing

export const CARD_TYPES = {
  MODIFIER: 'MODIFIER',
  ACTION: 'ACTION',
  TARGET: 'TARGET',
  CUT: 'CUT'
};

export const SAMPLE_MODIFIERS = ['Stealth', 'Double', 'Lethal', 'Shared', 'Shielded', 'Rapid'];
export const SAMPLE_ACTIONS = ['Build', 'Extract', 'Strike', 'Heal', 'Nullify', 'Drain'];
export const SAMPLE_TARGETS = ['Self', 'Rival', 'NB Island Node', 'Core Hub', 'Wallet', 'Tension Meter'];

export class PaninianCompiler {
  constructor() {
    this.lifoStack = [];
    this.bufferSize = 9;
  }

  // Validates if 3-card sequence follows [Modifier] + [Action] + [Target] or [Action] + [Target]
  validateSyntax(cards) {
    if (!cards || cards.length === 0) {
      return { valid: false, reason: 'Empty sequence' };
    }

    // Cut card is always valid solo
    if (cards.length === 1 && cards[0].type === CARD_TYPES.CUT) {
      return { valid: true, syntax: 'CUT', effect: 'Reset Tension & Skip Turn' };
    }

    if (cards.length === 2) {
      const [c1, c2] = cards;
      if (c1.type === CARD_TYPES.ACTION && c2.type === CARD_TYPES.TARGET) {
        return { valid: true, syntax: 'FAST_ACTION', effect: `${c1.name} -> ${c2.name}` };
      }
      return { valid: false, reason: 'Fast syntax requires [Action] + [Target]' };
    }

    if (cards.length === 3) {
      const [c1, c2, c3] = cards;
      if (c1.type === CARD_TYPES.MODIFIER && c2.type === CARD_TYPES.ACTION && c3.type === CARD_TYPES.TARGET) {
        return { valid: true, syntax: 'FULL_PANINIAN', effect: `${c1.name} ${c2.name} on ${c3.name}` };
      }
      return { valid: false, reason: 'Full Pāṇinian syntax requires [Modifier] + [Action] + [Target]' };
    }

    return { valid: false, reason: 'Syntax must be 1 (Cut), 2 (Fast), or 3 (Full Pāṇinian) cards' };
  }

  // Pushes an action onto the LIFO stack for interrupt resolution
  pushInterrupt(actionObject) {
    this.lifoStack.push({
      ...actionObject,
      timestamp: Date.now(),
      id: Math.random().toString(36).substring(2, 9)
    });
  }

  // Resolves top-of-stack downward
  resolveStack() {
    const executed = [];
    while (this.lifoStack.length > 0) {
      const topAction = this.lifoStack.pop();
      executed.push({
        action: topAction,
        status: 'RESOLVED',
        resolvedAt: new Date().toISOString()
      });
    }
    return executed;
  }

  // Generates starter 9-card neural buffer hand
  generateStarterHand(role = 'Strategist') {
    const hand = [];
    // 3 Modifiers
    for (let i = 0; i < 3; i++) {
      const mod = SAMPLE_MODIFIERS[i % SAMPLE_MODIFIERS.length];
      hand.push({ id: `mod-${i}-${Math.random()}`, name: mod, type: CARD_TYPES.MODIFIER, role });
    }
    // 3 Actions
    for (let i = 0; i < 3; i++) {
      const act = SAMPLE_ACTIONS[i % SAMPLE_ACTIONS.length];
      hand.push({ id: `act-${i}-${Math.random()}`, name: act, type: CARD_TYPES.ACTION, role });
    }
    // 2 Targets
    for (let i = 0; i < 2; i++) {
      const tgt = SAMPLE_TARGETS[i % SAMPLE_TARGETS.length];
      hand.push({ id: `tgt-${i}-${Math.random()}`, name: tgt, type: CARD_TYPES.TARGET, role });
    }
    // 1 Cut card
    hand.push({ id: `cut-0-${Math.random()}`, name: 'The Cut', type: CARD_TYPES.CUT, role });

    return hand;
  }
}

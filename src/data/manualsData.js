// Comprehensive game manuals, rulebooks, mathematical models, and L1-L5 breakdowns for all 49 franchise games
export const MANUALS_DATA = {
  'phoenix-arena-core': {
    title: 'Phoenix: Arena Core — Official Rulebook & Architecture Manual',
    code: 'G01',
    overview: 'The flagship 4-player asymmetric survival & engine-building experience. Set across 4 concentric Naraka sectors, players take on distinct roles to survive the automated 15-credit per turn Comfort Tax, balance Neck-Band tension (1-10), construct polyomino bridges, and attempt the collective Moksha Protocol.',
    format: '4 Players | Asymmetric Roles | Semi-Cooperative Engine Builder | 60–120 min',
    roles: [
      { name: 'Strategist (White Knight)', focus: 'Pāṇinian Compiler & Rule Control', starter: '30 Cards (9 Mod, 9 Action, 9 Target, 3 Cut)' },
      { name: 'Builder (Black Rook)', focus: 'Vitruvian Geometry & Dynamic Quadtree Defense', starter: '30 Cards (Focus on Structural Polyominos)' },
      { name: 'Healer (White Bishop)', focus: 'Natural Way & Karmic Cleansing', starter: '30 Cards (Campfires, Flora, Autophagy)' },
      { name: 'Disruptor (Black Pawn)', focus: 'Scientific Way & Spectator Manipulation', starter: '30 Cards (Nanite Stims, Hacking, Stealth)' }
    ],
    logicBreakdown: [
      { level: 'L1 Primitive', desc: 'Player plays a card or drafts a polyomino piece from the 7-bag runway.' },
      { level: 'L2 Rule', desc: 'Pāṇinian compiler checks [Modifier] + [Action] + [Target] syntax legality.' },
      { level: 'L3 Pattern', desc: 'Valid 3-card sequence compiles into active board shift or structural placement.' },
      { level: 'L4 Strategy', desc: 'Player preserves future card options while minimizing wallet bleed and tension meter.' },
      { level: 'L5 Outcome', desc: 'Bridge advances toward final Naraka sector; collective karmic debt is altered.' }
    ],
    mathFoundation: `
State Transition: S(t+1) = F(S(t), A(t), E(t), R(t))
Wallet Bleed: Wallet(t+1) = Wallet(t) - 15 + Earned(t)
Tension Formula: Tension(t+1) = max(1, min(10, Tension(t) + SyntaxErrors - CutCardsPlayed))
    `,
    winCondition: 'Collective Moksha Endgame: Complete NB Island bridge, enter Naraka Sector 4, and have the point leader voluntarily surrender point lead when wallet reaches 0 to unlatch all neck-bands.',
    instructions: [
      '1. Draw 9 cards into your Neural Buffer (3 Modifier, 3 Action, 3 Target).',
      '2. In the 10-second simultaneous selection phase, lock in your 3-card program [Modifier + Action + Target] or play "The Cut" to reset tension.',
      '3. Pāṇinian compiler resolves LIFO interrupts. Invalid syntax incurs +1 tension and card loss.',
      '4. Pay 15 credits Comfort Tax at turn end. If wallet reaches 0, Reversal Protocol alerts hunting drones.',
      '5. Cooperate to construct polyomino ring bridges across the 4 Naraka Sectors: Tamisram, Rauravam, Kumbhipakam, Asipattravana.'
    ]
  },
  'sovereign-war': {
    title: 'Phoenix: Sovereign War — Geopolitical Strategy Manual',
    code: 'G02',
    overview: 'Geopolitical territory control combining Chess vector attacks, Go surrounding influence, and Risk resource logistics. Players fight for territory across concentric sector rings.',
    format: '4–6 Players | Modular Hex/Ring Board | 90–150 min',
    logicBreakdown: [
      { level: 'L1 Primitive', desc: 'Place influence stone or move tactical knight unit.' },
      { level: 'L2 Rule', desc: 'Unit must follow Chess movement vector; stones require unblocked liberties.' },
      { level: 'L3 Pattern', desc: 'Surround rival node to cut off supply lines.' },
      { level: 'L4 Strategy', desc: 'Balance outward expansion with central Core defense.' },
      { level: 'L5 Outcome', desc: 'Gain economic yield from controlled sectors.' }
    ],
    mathFoundation: 'Influence Score: I(x,y) = sum(PieceValue / distance(Piece, (x,y)))',
    winCondition: 'Hold 60% of ring sectors and secure the central Core Hub.',
    instructions: [
      '1. Draft units using credits earned from controlled territory.',
      '2. Move units along vector grids to attack or establish Go influence perimeters.',
      '3. Form supply lines back to your faction capital.'
    ]
  },
  'ringfall': {
    title: 'Phoenix: Ringfall — Spatial Ring Defense Manual',
    code: 'G03',
    overview: 'Modular city defense where players pack polyominos and balance Sudoku adjacency rules to prevent corruption from collapsing outer rings.',
    format: '2–6 Players | Concentric Ring Board | 45–75 min',
    logicBreakdown: [
      { level: 'L1 Primitive', desc: 'Draft and place a polyomino building onto a ring sector.' },
      { level: 'L2 Rule', desc: 'No two adjacent sectors in the same ring section can share identical element types (Sudoku adjacency).' },
      { level: 'L3 Pattern', desc: 'Complete a full 360° ring arc to lock out corruption.' },
      { level: 'L4 Strategy', desc: 'Prioritize outer ring defense before corruption leaks inward.' },
      { level: 'L5 Outcome', desc: 'Ring locks down and generates energy shields.' }
    ],
    mathFoundation: 'Resonance Formula: R = sum(TileValue) * (1 - AdjacencyViolations)',
    winCondition: 'Lock down all 3 concentric rings before corruption reaches the Core.',
    instructions: [
      '1. Draft 1 polyomino piece per turn.',
      '2. Position piece on ring ensuring no Sudoku element collisions.',
      '3. Clear full line arcs to trigger shield defense.'
    ]
  },
  'naraka-tamisram': {
    title: 'Phoenix: Naraka — Tamisram (Darkness) Manual',
    code: 'G05',
    overview: 'Naraka Sector 1: Navigate a hidden grid using constraint logic and acoustic clues while managing limited vision and wallet bleed.',
    format: '1–4 Players | Hidden Grid | 30–45 min',
    logicBreakdown: [
      { level: 'L1 Primitive', desc: 'Scan adjacent grid cell.' },
      { level: 'L2 Rule', desc: 'Cell reveals acoustic frequency distance to hazard.' },
      { level: 'L3 Pattern', desc: 'Deduce hazard positions using Constraint Propagation.' },
      { level: 'L4 Strategy', desc: 'Route around hazards with minimum move count.' },
      { level: 'L5 Outcome', desc: 'Safely reach extraction portal.' }
    ],
    mathFoundation: 'Information Gain: H(before) - H(after) where H is entropy.',
    winCondition: 'Extract all team members with 0 fatal mine/hazard detonations.',
    instructions: [
      '1. Spend 5 credits to scan a cell.',
      '2. Read acoustic frequency clues (High pitch = hazard within 1 cell).',
      '3. Flag suspected traps and move onto safe tiles.'
    ]
  },
  'paninian-codex': {
    title: 'Pāṇinian Codex — Syntax Programming Duel Manual',
    code: 'G09',
    overview: 'Executable card game where players construct 3-card programs [Modifier + Action + Target]. Opponents can play LIFO stack interrupts to hijack or cancel execution.',
    format: '2–4 Players | Smart Card Deck | 20–40 min',
    logicBreakdown: [
      { level: 'L1 Primitive', desc: 'Place card into Neural Buffer slot.' },
      { level: 'L2 Rule', desc: 'Sequence must match legal syntax: [Modifier] + [Action] + [Target].' },
      { level: 'L3 Pattern', desc: 'Interrupting opponent with LIFO stack card overrides execution order.' },
      { level: 'L4 Strategy', desc: 'Hold counter-modifiers to protect critical attacks.' },
      { level: 'L5 Outcome', desc: 'Target opponent loses wallet credits or structural tiles.' }
    ],
    mathFoundation: 'Combinatorics: C(9,3) = 84 possible 3-card selections from buffer.',
    winCondition: 'Score 5 completed programs or reduce rival wallet to 0.',
    instructions: [
      '1. Load 3 cards into your active program queue.',
      '2. Announce code compilation. Opponents have 5 seconds to declare LIFO interrupt.',
      '3. Resolve top-of-stack downward. Valid programs execute; invalid programs fail and add +1 tension.'
    ]
  },
  'sudoku-citadel': {
    title: 'Phoenix: Sudoku Citadel — Defensive Constraint Manual',
    code: 'G18',
    overview: 'Tower defense puzzle powered by exact constraint satisfaction. Correct number placements reinforce defense walls against breach forces.',
    format: '1–4 Players | 9x9 Constraint Grid | 20–45 min',
    logicBreakdown: [
      { level: 'L1 Primitive', desc: 'Place number 1-9 into grid cell.' },
      { level: 'L2 Rule', desc: 'Number must be unique in row, column, and 3x3 subgrid.' },
      { level: 'L3 Pattern', desc: 'Naked pairs and hidden singles lock in defensive towers.' },
      { level: 'L4 Strategy', desc: 'Solve high-threat sectors before breach countdown reaches 0.' },
      { level: 'L5 Outcome', desc: 'Wall sector fires continuous laser defense.' }
    ],
    mathFoundation: 'Constraint Satisfaction Problem (CSP) solved via backtracking algorithm.',
    winCondition: 'Fill entire 9x9 grid with 0 rule violations.',
    instructions: [
      '1. Select number candidate.',
      '2. Validate row, column, and 3x3 box.',
      '3. Placed numbers generate wall power matching their face value.'
    ]
  },
  'cryptex-trials': {
    title: 'Phoenix: Cryptex Trials — Hardware Puzzle Manual',
    code: 'G48',
    overview: 'Interactive physical and simulated puzzle box featuring 5 concentric rotating rings stamped with Pāṇinian glyphs and polyomino sigils. Aligning rings unlocks the inner code chamber.',
    format: '1–4 Players | 3D Rotating Cylinder | 15–45 min',
    logicBreakdown: [
      { level: 'L1 Primitive', desc: 'Rotate ring layer 1–5 left or right.' },
      { level: 'L2 Rule', desc: 'Glyphs on adjacent rings must form valid Pāṇinian syntax or Magic Square sum.' },
      { level: 'L3 Pattern', desc: 'Full vertical column alignment unlocks central locking pin.' },
      { level: 'L4 Strategy', desc: 'Work inside-out from core ring 1 to outer ring 5.' },
      { level: 'L5 Outcome', desc: 'Cryptex pops open, revealing secret seed key and NFC reward payload.' }
    ],
    mathFoundation: 'Permutations: 5 rings with 8 positions = 8^5 = 32,768 structural states.',
    winCondition: 'Align all 5 rings to match the encrypted challenge sequence.',
    instructions: [
      '1. Inspect target Pāṇinian syntax target.',
      '2. Rotate individual ring layers until glyphs align vertically.',
      '3. Click Unlock to test pin alignment and claim cross-product ledger rewards.'
    ]
  }
};

// Generic manual builder for remaining catalog items to ensure 100% coverage
export const getManualForGame = (game) => {
  if (MANUALS_DATA[game.id]) return MANUALS_DATA[game.id];
  return {
    title: `${game.name} — Official Manual & System Guide`,
    code: game.code,
    overview: `${game.summary} Part of the ${game.family} product family in the Phoenix / NBT Sovereign Reality universe.`,
    format: `${game.players} | ${game.format} | ${game.duration}`,
    logicBreakdown: [
      { level: 'L1 Primitive', desc: `Basic interaction in ${game.name} logic model.` },
      { level: 'L2 Rule', desc: `State validation according to ${game.logicFamilies[0] || 'Phoenix Rules'}.` },
      { level: 'L3 Pattern', desc: 'Structural pattern synthesis across active elements.' },
      { level: 'L4 Strategy', desc: 'Optimization of expected value and tactical position.' },
      { level: 'L5 Outcome', desc: 'Progress toward victory condition and ledger rewards.' }
    ],
    mathFoundation: `Universal State Transition: S(t+1) = F(S(t), A(t), E(t), R(t)). Primary logic families: ${game.logicFamilies.join(', ')}.`,
    winCondition: game.victoryCondition,
    instructions: [
      `1. Initialize ${game.name} state from seed.`,
      `2. Execute legal turns following ${game.logicFamilies[0]} syntax.`,
      `3. Complete objective thresholds to claim victory and ledger credits.`
    ]
  };
};

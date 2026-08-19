export const OBJECTIVE_TYPES = {
  PHYSICAL: 'Physical Objective',
  NON_PHYSICAL: 'Non-Physical Objective'
};

export const OBJECTIVES = [
  // Physical Objectives
  {
    id: 'obj-cryptex-align',
    type: OBJECTIVE_TYPES.PHYSICAL,
    title: 'Cryptex Puzzle Ring Alignment',
    gameId: 'cryptex-trials',
    category: 'Hardware Dexterity & Pattern',
    description: 'Rotate all 5 physical/simulated rings of the Cryptex Box to align the Pāṇinian glyph sequence [Stealth + Build + Node].',
    rewardCredits: 250,
    difficulty: 'Intermediate',
    isCompleted: false,
    metricText: 'Match 5 Ring Glyphs'
  },
  {
    id: 'obj-card-matrix-snap',
    type: OBJECTIVE_TYPES.PHYSICAL,
    title: 'Kinetic Card 180° Spin Choreography',
    gameId: 'phoenix-arena-core',
    category: 'Electromagnetic Hardware',
    description: 'Trigger the kinetic smart card matrix to perform an electromagnetic 180° spin snap sequence during card play.',
    rewardCredits: 180,
    difficulty: 'Casual',
    isCompleted: false,
    metricText: '180° Card Spin Snap'
  },
  {
    id: 'obj-rotor-helix-elevation',
    type: OBJECTIVE_TYPES.PHYSICAL,
    title: 'Processor Rotor Helix Lift Calibration',
    gameId: 'phoenix-arena-core',
    category: 'Mechanical Engineering',
    description: 'Adjust the planetary lift rotor elevation helix to 45mm to project Naraka Sector 3 thermal topographic map.',
    rewardCredits: 300,
    difficulty: 'Advanced',
    isCompleted: false,
    metricText: 'Set Lift Helix to 45mm'
  },
  {
    id: 'obj-carrom-triple-pocket',
    type: OBJECTIVE_TYPES.PHYSICAL,
    title: 'Carrom Precision Strike Vector',
    gameId: 'carrom-strike',
    category: 'Physical Collision',
    description: 'Execute a precision striker collision to pocket 2 carrom tokens and the central Red Queen in a single turn.',
    rewardCredits: 200,
    difficulty: 'Intermediate',
    isCompleted: false,
    metricText: 'Pocket 3 Tokens in 1 Turn'
  },
  {
    id: 'obj-tower-stability-10',
    type: OBJECTIVE_TYPES.PHYSICAL,
    title: 'Polyomino Tower Load-Bearing Stability',
    gameId: 'tower-of-equilibrium',
    category: 'Physical Equilibrium',
    description: 'Construct a 10-tier vertical polyomino tower without exceeding the structural tilt limit of 5 degrees.',
    rewardCredits: 220,
    difficulty: 'Intermediate',
    isCompleted: false,
    metricText: '10-Tier Tower Built'
  },

  // Non-Physical Objectives
  {
    id: 'obj-paninian-lifo-combo',
    type: OBJECTIVE_TYPES.PHYSICAL ? OBJECTIVE_TYPES.NON_PHYSICAL : 'Non-Physical Objective',
    title: 'Pāṇinian LIFO Interrupt Execution',
    gameId: 'paninian-codex',
    category: 'Syntax Compiler',
    description: 'Compile a valid [Modifier + Action + Target] card syntax and intercept an enemy action using LIFO stack priority.',
    rewardCredits: 350,
    difficulty: 'Advanced',
    isCompleted: false,
    metricText: 'Valid 3-Card LIFO Interrupt'
  },
  {
    id: 'obj-wallet-drain-shield',
    type: OBJECTIVE_TYPES.NON_PHYSICAL,
    title: 'Bleed-Wallet Comfort Tax Conservation',
    gameId: 'phoenix-arena-core',
    category: 'Economic Strategy',
    description: 'Maintain your Saptabhagini Bleed-Wallet above 60 credits across 4 consecutive turns while paying the 15-credit/turn Comfort Tax.',
    rewardCredits: 300,
    difficulty: 'Intermediate',
    isCompleted: false,
    metricText: 'Wallet > 60 credits for 4 turns'
  },
  {
    id: 'obj-cosmo-bitbeast-extraction',
    type: OBJECTIVE_TYPES.NON_PHYSICAL,
    title: 'Bharat Next Big Cosmo Bit-Beast AI Extraction',
    gameId: 'next-big-cosmo',
    category: 'Ephemeris & Generative AI',
    description: 'Trace daily kinetic footprint onto the sand canvas, achieve LHS=RHS quantum equilibrium, and extract your daily mythic Bit-Beast via ControlNet Vision AI.',
    rewardCredits: 300,
    difficulty: 'Advanced',
    isCompleted: false,
    metricText: 'Extract 1 Daily Bit-Beast'
  },
  {
    id: 'obj-sudoku-zero-penalty',
    type: OBJECTIVE_TYPES.NON_PHYSICAL,
    title: 'Sudoku Citadel Flawless Constraint Matrix',
    gameId: 'sudoku-citadel',
    category: 'Constraint Propagation',
    description: 'Complete a full 9x9 Sudoku Citadel constraint grid with 0 rule violations or backtracking failures.',
    rewardCredits: 400,
    difficulty: 'Advanced',
    isCompleted: false,
    metricText: '100% Correct Sudoku Grid'
  },
  {
    id: 'obj-mastermind-min-entropy',
    type: OBJECTIVE_TYPES.NON_PHYSICAL,
    title: 'Mastermind Optimal Entropy Deduction',
    gameId: 'mastermind-protocol',
    category: 'Information Entropy',
    description: 'Deduce the secret 4-glyph code in 5 steps or fewer by maximizing information gain $H(before) - H(after)$.',
    rewardCredits: 320,
    difficulty: 'Intermediate',
    isCompleted: false,
    metricText: 'Solve in ≤ 5 turns'
  },
  {
    id: 'obj-collective-moksha',
    type: OBJECTIVE_TYPES.NON_PHYSICAL,
    title: 'Moksha Protocol Collective Sacrifice',
    gameId: 'phoenix-arena-core',
    category: 'Endgame Metaphysics',
    description: 'Voluntarily surrender your individual point lead to reset global karmic debt and trigger collective unlatching of all neck-bands.',
    rewardCredits: 500,
    difficulty: 'Master',
    isCompleted: false,
    metricText: 'Voluntary Lead Sacrifice'
  },
  {
    id: 'obj-nim-zero-sum',
    type: OBJECTIVE_TYPES.NON_PHYSICAL,
    title: 'Nim-Sum XOR Terminal Force',
    gameId: 'nim-ledger',
    category: 'Mathematical Game Theory',
    description: 'Force the opponent into a zero Nim-sum ($XOR = 0$) position to guarantee deterministic victory.',
    rewardCredits: 280,
    difficulty: 'Intermediate',
    isCompleted: false,
    metricText: 'Nim-Sum XOR = 0 achieved'
  },
  {
    id: 'obj-2048-tile-ascension',
    type: OBJECTIVE_TYPES.NON_PHYSICAL,
    title: '2048 Exponential Tile Fusion',
    gameId: '2048-ascension',
    category: 'Spatial Merging',
    description: 'Fuse matching energy tiles to reach the 2048 tier block on the Vitruvian spatial grid.',
    rewardCredits: 260,
    difficulty: 'Casual',
    isCompleted: false,
    metricText: 'Reach 2048 Tier Tile'
  }
];

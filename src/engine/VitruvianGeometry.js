// Vitruvian Engine — Spatial/Structural Engine, 7-Bag Polyomino & Grid Geometry

export const TETROMINOS = {
  I: { shape: [[1, 1, 1, 1]], color: '#06b6d4', name: 'I-Beam' },
  O: { shape: [[1, 1], [1, 1]], color: '#eab308', name: 'O-Block' },
  T: { shape: [[0, 1, 0], [1, 1, 1]], color: '#a855f7', name: 'T-Node' },
  L: { shape: [[1, 0], [1, 0], [1, 1]], color: '#f97316', name: 'L-Corner' },
  J: { shape: [[0, 1], [0, 1], [1, 1]], color: '#3b82f6', name: 'J-Corner' },
  S: { shape: [[0, 1, 1], [1, 1, 0]], color: '#22c55e', name: 'S-Strut' },
  Z: { shape: [[1, 1, 0], [0, 1, 1]], color: '#ef4444', name: 'Z-Strut' }
};

export class VitruvianGeometry {
  constructor() {
    this.bag = [];
    this.refillBag();
  }

  // Refills bag with standard 7 tetromino forms (7-bag system)
  refillBag() {
    const keys = Object.keys(TETROMINOS);
    // Shuffle keys using Fisher-Yates
    for (let i = keys.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [keys[i], keys[j]] = [keys[j], keys[i]];
    }
    this.bag = keys.map(k => ({ type: k, ...TETROMINOS[k] }));
  }

  // Drafts next piece from 7-bag runway
  drawPiece() {
    if (this.bag.length === 0) {
      this.refillBag();
    }
    return this.bag.pop();
  }

  // Peek runway pieces (up to 5 face up)
  getRunway(count = 5) {
    while (this.bag.length < count) {
      const keys = Object.keys(TETROMINOS);
      for (let k of keys) {
        this.bag.unshift({ type: k, ...TETROMINOS[k] });
      }
    }
    return this.bag.slice(-count).reverse();
  }

  // Rotate shape matrix 90 degrees clockwise
  rotateMatrix(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const rotated = Array.from({ length: cols }, () => Array(rows).fill(0));
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        rotated[c][rows - 1 - r] = matrix[r][c];
      }
    }
    return rotated;
  }

  // Check if polyomino fits on grid without collision
  canPlace(grid, shape, startRow, startCol) {
    const numRows = grid.length;
    const numCols = grid[0].length;

    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c] !== 0) {
          const targetR = startRow + r;
          const targetC = startCol + c;

          if (targetR < 0 || targetR >= numRows || targetC < 0 || targetC >= numCols) {
            return false; // Out of bounds
          }
          if (grid[targetR][targetC] !== 0) {
            return false; // Collision with existing tile
          }
        }
      }
    }
    return true;
  }

  // Places polyomino onto grid
  placeOnGrid(grid, shape, startRow, startCol, value = 1) {
    const newGrid = grid.map(row => [...row]);
    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c] !== 0) {
          newGrid[startRow + r][startCol + c] = value;
        }
      }
    }
    return newGrid;
  }

  // Evaluate filled lines or rings
  checkCompletedLines(grid) {
    let completedRows = [];
    for (let r = 0; r < grid.length; r++) {
      if (grid[r].every(cell => cell !== 0)) {
        completedRows.push(r);
      }
    }
    return completedRows;
  }
}

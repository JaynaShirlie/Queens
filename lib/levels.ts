export interface LevelConfig {
  id: number;
  size: number;
  initialQueens: { row: number; col: number }[];
  colorRegions: number[][];
}


export const LEVELS: LevelConfig[] = [
  {
    id: 1,
    size: 4,
    initialQueens: [],
    colorRegions: [
      [0, 0, 1, 1],
      [0, 0, 1, 1],
      [2, 2, 3, 3],
      [2, 2, 3, 3],
    ],
  },
  {
    id: 2,
    size: 4,
    initialQueens: [],
    colorRegions: [
      [0, 0, 0, 1],
      [2, 0, 1, 1],
      [2, 2, 3, 1],
      [2, 3, 3, 3],
    ],
  },
  {
    id: 3,
    size: 5,
    initialQueens: [],
    colorRegions: [
      [0, 0, 1, 1, 1],
      [0, 2, 2, 1, 1],
      [0, 2, 3, 3, 1],
      [4, 2, 3, 3, 3],
      [4, 4, 4, 3, 3],
    ],
  },
  {
    id: 4,
    size: 5,
    initialQueens: [],
    colorRegions: [
      [0, 0, 0, 1, 2],
      [0, 3, 3, 1, 2],
      [4, 3, 3, 1, 2],
      [4, 3, 1, 1, 2],
      [4, 4, 4, 2, 2],
    ],
  },
  {
    id: 5,
    size: 5,
    initialQueens: [],
    colorRegions: [
      [0, 1, 1, 2, 2],
      [0, 1, 2, 2, 3],
      [0, 4, 2, 3, 3],
      [0, 4, 4, 4, 3],
      [0, 0, 4, 3, 3],
    ],
  },
  {
    id: 6,
    size: 6,
    initialQueens: [],
    colorRegions: [
      [0, 0, 1, 1, 2, 2],
      [0, 0, 1, 1, 2, 2],
      [3, 3, 4, 4, 5, 5],
      [3, 3, 4, 4, 5, 5],
      [0, 3, 4, 5, 5, 2],
      [0, 3, 1, 4, 5, 2],
    ],
  },
  {
    id: 7,
    size: 6,
    initialQueens: [],
    colorRegions: [
      [0, 0, 0, 1, 1, 1],
      [0, 2, 2, 3, 3, 1],
      [0, 2, 4, 4, 3, 1],
      [5, 2, 4, 4, 3, 1],
      [5, 5, 4, 3, 3, 1],
      [5, 5, 5, 5, 1, 1],
    ],
  },
  {
    id: 8,
    size: 6,
    initialQueens: [],
    colorRegions: [
      [0, 1, 1, 2, 2, 3],
      [0, 0, 1, 2, 3, 3],
      [4, 0, 1, 2, 3, 5],
      [4, 4, 0, 2, 5, 5],
      [4, 0, 0, 5, 5, 3],
      [4, 4, 0, 0, 5, 3],
    ],
  },
  {
    id: 9,
    size: 7,
    initialQueens: [],
    colorRegions: [
      [0, 0, 0, 1, 2, 2, 2],
      [0, 3, 0, 1, 2, 4, 2],
      [3, 3, 3, 1, 4, 4, 4],
      [3, 5, 3, 1, 4, 6, 4],
      [5, 5, 5, 1, 6, 6, 6],
      [5, 5, 1, 1, 1, 6, 6],
      [5, 5, 5, 6, 6, 6, 6],
    ],
  },
  {
    id: 10,
    size: 7,
    initialQueens: [],
    colorRegions: [
      [0, 0, 1, 1, 2, 2, 3],
      [0, 4, 4, 1, 2, 3, 3],
      [0, 4, 5, 5, 2, 3, 6],
      [0, 4, 5, 2, 2, 6, 6],
      [0, 4, 5, 5, 6, 6, 3],
      [0, 4, 4, 5, 6, 3, 3],
      [0, 0, 4, 5, 5, 3, 3],
    ],
  },
  {
    id: 11,
    size: 7,
    initialQueens: [],
    colorRegions: [
      [0, 1, 1, 1, 2, 2, 3],
      [0, 0, 1, 2, 2, 3, 3],
      [4, 0, 1, 2, 5, 5, 3],
      [4, 0, 6, 6, 5, 3, 3],
      [4, 4, 6, 5, 5, 5, 3],
      [4, 6, 6, 6, 5, 3, 3],
      [4, 4, 4, 6, 6, 3, 3],
    ],
  },
  {
    id: 12,
    size: 8,
    initialQueens: [],
    colorRegions: [
      [0, 0, 0, 1, 1, 2, 2, 3],
      [0, 4, 0, 1, 2, 2, 3, 3],
      [0, 4, 5, 5, 2, 6, 3, 7],
      [4, 4, 5, 2, 2, 6, 7, 7],
      [4, 5, 5, 5, 6, 6, 7, 3],
      [4, 5, 1, 5, 6, 7, 7, 3],
      [4, 4, 1, 5, 6, 6, 7, 3],
      [4, 1, 1, 1, 5, 6, 7, 7],
    ],
  },
  {
    id: 13,
    size: 8,
    initialQueens: [],
    colorRegions: [
      [0, 0, 1, 1, 1, 2, 2, 3],
      [0, 4, 4, 1, 2, 2, 3, 3],
      [0, 4, 5, 5, 2, 6, 3, 7],
      [0, 4, 5, 6, 6, 6, 7, 7],
      [4, 4, 5, 6, 2, 6, 7, 3],
      [4, 5, 5, 5, 6, 6, 7, 3],
      [4, 0, 5, 1, 5, 6, 7, 3],
      [4, 0, 0, 1, 1, 5, 7, 3],
    ],
  },
  {
    id: 14,
    size: 8,
    initialQueens: [],
    colorRegions: [
      [0, 0, 1, 1, 2, 2, 3, 3],
      [0, 4, 4, 1, 2, 5, 5, 3],
      [4, 4, 6, 6, 5, 5, 7, 3],
      [4, 6, 6, 5, 5, 7, 7, 3],
      [4, 6, 2, 2, 5, 7, 3, 3],
      [4, 6, 6, 2, 7, 7, 3, 3],
      [4, 4, 6, 2, 2, 7, 3, 3],
      [4, 4, 4, 2, 7, 7, 7, 3],
    ],
  },
  {
    id: 15,
    size: 8,
    initialQueens: [],
    colorRegions: [
      [0, 1, 1, 2, 2, 3, 3, 4],
      [0, 0, 1, 2, 3, 3, 4, 4],
      [5, 0, 1, 2, 3, 6, 4, 7],
      [5, 5, 1, 2, 6, 6, 7, 7],
      [5, 1, 1, 6, 6, 7, 7, 4],
      [5, 5, 6, 6, 7, 7, 4, 4],
      [5, 5, 5, 6, 7, 4, 4, 4],
      [5, 5, 5, 5, 7, 7, 4, 4],
    ],
  },
  {
    id: 16,
    size: 9,
    initialQueens: [],
    colorRegions: [
      [0, 0, 1, 1, 2, 2, 3, 3, 4],
      [0, 5, 5, 1, 2, 3, 3, 4, 4],
      [0, 5, 6, 6, 2, 3, 7, 4, 8],
      [5, 5, 6, 2, 2, 7, 7, 8, 8],
      [5, 6, 6, 6, 7, 7, 8, 8, 4],
      [5, 5, 6, 7, 7, 8, 8, 4, 4],
      [5, 5, 5, 6, 7, 8, 4, 4, 4],
      [5, 5, 5, 5, 6, 7, 8, 4, 4],
      [5, 5, 5, 5, 5, 6, 7, 8, 8],
    ],
  },
  {
    id: 17,
    size: 9,
    initialQueens: [],
    colorRegions: [
      [0, 0, 0, 1, 1, 2, 2, 3, 3],
      [0, 4, 0, 1, 2, 2, 3, 3, 5],
      [4, 4, 6, 6, 2, 7, 3, 5, 5],
      [4, 6, 6, 2, 2, 7, 7, 5, 8],
      [4, 4, 6, 2, 7, 7, 8, 8, 8],
      [4, 6, 6, 7, 7, 8, 8, 5, 8],
      [4, 4, 6, 7, 8, 8, 5, 5, 8],
      [4, 4, 6, 6, 7, 8, 5, 5, 8],
      [4, 4, 4, 6, 7, 7, 8, 5, 5],
    ],
  },
  {
    id: 18,
    size: 9,
    initialQueens: [],
    colorRegions: [
      [0, 1, 1, 1, 2, 2, 3, 3, 4],
      [0, 0, 1, 2, 2, 3, 3, 4, 4],
      [5, 0, 1, 2, 6, 6, 3, 4, 7],
      [5, 5, 1, 2, 6, 3, 3, 7, 7],
      [5, 1, 1, 6, 6, 3, 7, 7, 4],
      [5, 5, 6, 6, 3, 3, 7, 4, 4],
      [5, 5, 5, 6, 3, 7, 4, 4, 8],
      [5, 5, 5, 5, 6, 7, 8, 8, 8],
      [5, 5, 5, 5, 5, 6, 7, 8, 8],
    ],
  },
  {
    id: 19,
    size: 9,
    initialQueens: [],
    colorRegions: [
      [0, 0, 1, 2, 2, 3, 3, 4, 4],
      [0, 5, 1, 1, 2, 3, 4, 4, 6],
      [0, 5, 5, 1, 7, 3, 4, 6, 6],
      [5, 5, 7, 7, 7, 3, 6, 6, 8],
      [5, 7, 7, 3, 3, 3, 6, 8, 8],
      [5, 5, 7, 3, 6, 6, 8, 8, 4],
      [5, 5, 5, 7, 6, 8, 8, 4, 4],
      [5, 5, 5, 5, 7, 6, 8, 4, 4],
      [5, 5, 5, 5, 5, 7, 6, 8, 8],
    ],
  },
  {
    id: 20,
    size: 10,
    initialQueens: [],
    colorRegions: [
      [0, 0, 1, 1, 2, 2, 3, 3, 4, 4],
      [0, 5, 5, 1, 2, 3, 3, 4, 4, 6],
      [0, 5, 7, 7, 2, 3, 8, 4, 6, 6],
      [5, 5, 7, 2, 2, 8, 8, 6, 6, 9],
      [5, 7, 7, 7, 8, 8, 6, 6, 9, 9],
      [5, 5, 7, 8, 8, 6, 6, 9, 9, 4],
      [5, 5, 5, 7, 8, 6, 9, 9, 4, 4],
      [5, 5, 5, 5, 7, 8, 6, 9, 4, 4],
      [5, 5, 5, 5, 5, 7, 8, 6, 9, 4],
      [5, 5, 5, 5, 5, 5, 7, 8, 6, 9],
    ],
  },
  {
    id: 21,
    size: 10,
    initialQueens: [],
    colorRegions: [
      [0, 0, 0, 1, 1, 2, 2, 3, 3, 4],
      [0, 5, 0, 1, 2, 2, 3, 3, 4, 4],
      [5, 5, 6, 6, 2, 7, 3, 4, 8, 4],
      [5, 6, 6, 2, 2, 7, 7, 8, 8, 4],
      [5, 5, 6, 2, 7, 7, 8, 8, 4, 9],
      [5, 6, 6, 7, 7, 8, 8, 4, 9, 9],
      [5, 5, 6, 7, 8, 8, 4, 9, 9, 4],
      [5, 5, 5, 6, 7, 8, 9, 9, 4, 4],
      [5, 5, 5, 5, 6, 7, 8, 9, 4, 4],
      [5, 5, 5, 5, 5, 6, 7, 8, 9, 9],
    ],
  },
  {
    id: 22,
    size: 10,
    initialQueens: [],
    colorRegions: [
      [0, 1, 1, 2, 2, 3, 3, 4, 4, 5],
      [0, 0, 1, 2, 3, 3, 4, 4, 5, 5],
      [6, 0, 1, 2, 3, 7, 4, 5, 5, 8],
      [6, 6, 1, 2, 7, 7, 5, 5, 8, 8],
      [6, 1, 1, 7, 7, 5, 5, 8, 8, 4],
      [6, 6, 7, 7, 5, 5, 8, 8, 4, 4],
      [6, 6, 6, 7, 5, 8, 8, 4, 4, 9],
      [6, 6, 6, 6, 7, 5, 8, 4, 9, 9],
      [6, 6, 6, 6, 6, 7, 5, 8, 9, 4],
      [6, 6, 6, 6, 6, 6, 7, 5, 8, 9],
    ],
  },
  {
    id: 23,
    size: 10,
    initialQueens: [],
    colorRegions: [
      [0, 0, 1, 1, 1, 2, 2, 3, 3, 4],
      [0, 5, 5, 1, 2, 2, 3, 3, 4, 4],
      [0, 5, 6, 6, 2, 7, 3, 4, 4, 8],
      [5, 5, 6, 2, 2, 7, 7, 4, 8, 8],
      [5, 6, 6, 6, 7, 7, 8, 8, 4, 9],
      [5, 5, 6, 7, 7, 8, 8, 4, 9, 9],
      [5, 5, 5, 6, 7, 8, 4, 9, 9, 9],
      [5, 5, 5, 5, 6, 7, 8, 4, 9, 9],
      [5, 5, 5, 5, 5, 6, 7, 8, 9, 9],
      [5, 5, 5, 5, 5, 5, 6, 7, 8, 9],
    ],
  },
  {
    id: 24,
    size: 11,
    initialQueens: [],
    colorRegions: [
      [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5],
      [0, 6, 6, 1, 2, 3, 3, 4, 4, 5, 5],
      [0, 6, 7, 7, 2, 3, 8, 4, 5, 5, 9],
      [6, 6, 7, 2, 2, 8, 8, 5, 5, 9, 9],
      [6, 7, 7, 7, 8, 8, 5, 5, 9, 9, 4],
      [6, 6, 7, 8, 8, 5, 5, 9, 9, 4, 4],
      [6, 6, 6, 7, 8, 5, 9, 9, 4, 4, 10],
      [6, 6, 6, 6, 7, 8, 5, 9, 4, 10, 10],
      [6, 6, 6, 6, 6, 7, 8, 5, 9, 10, 4],
      [6, 6, 6, 6, 6, 6, 7, 8, 5, 9, 10],
      [6, 6, 6, 6, 6, 6, 6, 7, 8, 5, 9],
    ],
  },
  {
    id: 25,
    size: 11,
    initialQueens: [],
    colorRegions: [
      [0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
      [0, 0, 1, 2, 3, 3, 4, 4, 5, 5, 6],
      [7, 0, 1, 2, 3, 8, 4, 5, 5, 6, 6],
      [7, 7, 1, 2, 8, 8, 5, 5, 6, 6, 9],
      [7, 1, 1, 8, 8, 5, 5, 6, 6, 9, 9],
      [7, 7, 8, 8, 5, 5, 6, 6, 9, 9, 4],
      [7, 7, 7, 8, 5, 6, 6, 9, 9, 4, 4],
      [7, 7, 7, 7, 8, 5, 6, 9, 4, 4, 10],
      [7, 7, 7, 7, 7, 8, 5, 6, 9, 10, 10],
      [7, 7, 7, 7, 7, 7, 8, 5, 6, 9, 10],
      [7, 7, 7, 7, 7, 7, 7, 8, 5, 6, 9],
    ],
  },
];

export const REGION_COLORS = [
  '#FFB3C6', // soft pink
  '#E8A0BF', // dusty rose
  '#FFC8DD', // cotton candy
  '#CDB4DB', // soft lavender
  '#FFD6E7', // pale blush
  '#F2A7C3', // carnation
  '#FADDE1', // whisper pink
  '#FF85A1', // medium pink
  '#D4A5C9', // mauve
  '#F9C6D3', // rose quartz
  '#E6C3D1', // orchid haze
];

export function getSolution(level: LevelConfig): { row: number; col: number }[] | null {
  const n = level.size;
  const queens: { row: number; col: number }[] = [];
  const usedCols = new Set<number>();
  const usedRegions = new Set<number>();

  function isValid(row: number, col: number): boolean {
    for (const q of queens) {
      if (Math.abs(q.row - row) <= 1 && Math.abs(q.col - col) <= 1) return false;
    }
    return true;
  }

  function solve(row: number): boolean {
    if (row === n) return queens.length === n;
    for (let col = 0; col < n; col++) {
      const region = level.colorRegions[row][col];
      if (usedCols.has(col) || usedRegions.has(region)) continue;
      if (!isValid(row, col)) continue;
      queens.push({ row, col });
      usedCols.add(col);
      usedRegions.add(region);
      if (solve(row + 1)) return true;
      queens.pop();
      usedCols.delete(col);
      usedRegions.delete(region);
    }
    return false;
  }

  return solve(0) ? queens : null;
}

export function checkWin(
  placed: { row: number; col: number }[],
  level: LevelConfig,
): { valid: boolean; errors: Set<string> } {
  const n = level.size;
  const errors = new Set<string>();

  if (placed.length !== n) return { valid: false, errors };

  const usedCols = new Map<number, number>();
  const usedRows = new Map<number, number>();
  const usedRegions = new Map<number, string>();

  for (const q of placed) {
    const key = `${q.row},${q.col}`;
    const region = level.colorRegions[q.row][q.col];

    if (usedCols.has(q.col)) {
      errors.add(key);
      const prev = usedCols.get(q.col)!;
      errors.add(`${prev},${q.col}`);
    }
    if (usedRows.has(q.row)) {
      errors.add(key);
      const prev = usedRows.get(q.row)!;
      errors.add(`${q.row},${prev}`);
    }
    if (usedRegions.has(region)) {
      errors.add(key);
      errors.add(usedRegions.get(region)!);
    }

    usedCols.set(q.col, q.row);
    usedRows.set(q.row, q.col);
    usedRegions.set(region, `${q.row},${q.col}`);

    for (const other of placed) {
      if (other === q) continue;
      if (Math.abs(other.row - q.row) <= 1 && Math.abs(other.col - q.col) <= 1) {
        errors.add(key);
        errors.add(`${other.row},${other.col}`);
      }
    }
  }

  return { valid: errors.size === 0 && placed.length === n, errors };
}

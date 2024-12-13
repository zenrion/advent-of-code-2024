import { AdventOfCodeRunner } from "../adventOfCodeRunner.js";

class DayTenRunner extends AdventOfCodeRunner {
  maxRows = 0;
  maxCols = 0;
  map = []

  constructor() {
    super(import.meta.dirname);
    this.initialize();
  }

  initialize() {
    this.maxRows = this.data.length;
    this.maxCols = this.data[0].length;
    this.map = this.data.map((row) => row.split('').map(Number));
  }

  partOne() {
    let count = 0;

    for (let row = 0; row < this.maxRows; ++row) {
      for (let col = 0; col < this.maxCols; ++col) {
        if (this.map[row][col] === 0) {
          count += this.getPathCount(row, col);
        }
      }
    }

    return count;
  }

  partTwo() {
    let count = 0;

    for (let row = 0; row < this.maxRows; ++row) {
      for (let col = 0; col < this.maxCols; ++col) {
        if (this.map[row][col] === 0) {
          count += this.getDisctinctPathCount(row, col);
        }
      }
    }

    return count;
  }

  getPathCount(originRow, originCol) {
    let count = 0;
    const visited = new Set();
    const stack = [[originRow, originCol]];

    while (stack.length > 0) {
      const [row, col] = stack.pop();
      const height = this.map[row][col];

      const directions = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1]
      ];

      for (const [dRow, dCol] of directions) {
        const nextRow = row + dRow;
        const nextCol = col + dCol;
        const key = `${nextRow},${nextCol}`;

        if (visited.has(key) || !this.isInMap(nextRow, nextCol)) continue;

        const nextHeight = this.map[nextRow][nextCol];
        if (nextHeight !== height + 1) continue;
        if (nextHeight === 9) ++count;

        visited.add(key);
        stack.push([nextRow, nextCol]);
      }
    }

    return count;
  }

  getDisctinctPathCount(row, col) {
    const height = this.map[row][col];
    if (height === 9) return 1;

    const directions = [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1]
    ];

    let pathCount = 0;

    for (const [dRow, dCol] of directions) {
      const nextRow = row + dRow;
      const nextCol = col + dCol;

      if (!this.isInMap(nextRow, nextCol)) continue;

      const nextHeight = this.map[nextRow][nextCol];
      if (nextHeight !== height + 1) continue;

      pathCount += this.getDisctinctPathCount(nextRow, nextCol);
    }

    return pathCount;
  }

  isInMap(row, col) {
    return row >= 0 && row < this.maxRows && col >= 0 && col < this.maxCols;
  }
}

const runner = new DayTenRunner();
runner.run();
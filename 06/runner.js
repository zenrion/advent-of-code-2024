import { AdventOfCodeRunner } from "../adventOfCodeRunner.js";
import { Guard } from "./guard.js";
import { Position } from "./position.js";

class DaySixRunner extends AdventOfCodeRunner {
  rowMax = 0;
  colMax = 0;
  obstacles = new Set();
  guard = new Guard();

  constructor() {
    super(import.meta.dirname);
    this.initialize();
  }

  partOne() {
    return this.getPositions().size;
  }

  partTwo() {
    let loops = 0;
    const walkedTiles = this.getPositions();

    for (const tile of walkedTiles) {
      const [row, col] = tile.split(',').map(Number);

      if (this.isGuardTile(row, col, this.guard.position)) continue;

      if (this.canCauseLoop(row, col, this.createMap())) {
        ++loops;
      }
    }

    return loops;
  }

  initialize() {
    this.data = this.data.map((row) => row.split(''));
    this.rowMax = this.data.length;
    this.colMax = this.data[0].length;

    for (let row = 0; row < this.rowMax; ++row) {
      for (let col = 0; col < this.colMax; ++col) {
        const entity = this.data[row][col];

        if (entity === '^') {
          this.guard = new Guard({ row, col })
        }
        else if (entity === '#') {
          this.obstacles.add(new Position(row, col).toString());
        }
      }
    }
  }

  isInsideMap(position) {
    if (position.row < 0 || position.row >= this.rowMax) return false;
    if (position.col < 0 || position.col >= this.colMax) return false;

    return true;
  }

  getPositions() {
    const guard = new Guard({ guard: this.guard });
    const positions = new Set();

    while (this.isInsideMap(guard.position)) {
      const nextPosition = guard.getNextPosition();

      positions.add(guard.position.toString());

      if (!this.isInsideMap(nextPosition)) break;

      if (this.obstacles.has(nextPosition.toString())) {
        guard.changeDirection();
      }
      else {
        guard.moveTo(nextPosition);
      }
    }

    return positions;
  }

  isGuardTile(row, col, guardPosition) {
    return row === guardPosition.row && col === guardPosition.col;
  }

  createMap() {
    return this.data.map((row) => Array.from(row));
  }

  canCauseLoop(row, col, map) {
    const guard = new Guard({ guard: this.guard });
    const positions = new Set();

    map[row][col] = '#';

    while (this.isInsideMap(guard.position)) {
      const currentPositionKey = `${guard.position.toString()},${guard.direction}`
      const nextPosition = guard.getNextPosition();
      const nextPositionKey = `${nextPosition.toString()},${guard.direction}`;

      positions.add(currentPositionKey);

      if (!this.isInsideMap(nextPosition)) break;
      if (positions.has(nextPositionKey)) return true;

      if (map[nextPosition.row][nextPosition.col] === '#') {
        guard.changeDirection();
      }
      else {
        guard.moveTo(nextPosition);
      }
    }

    return false;
  }
}

const runner = new DaySixRunner();
runner.run();
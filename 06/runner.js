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
    const visited = new Set();

    while (this.isInsideMap(this.guard.position)) {
      visited.add(this.guard.position.toString());

      const nextPosition = this.guard.getNextPosition();

      if (this.obstacles.has(nextPosition.toString())) {
        this.guard.changeDirection();
      }
      else {
        this.guard.moveTo(nextPosition);
      }
    }

    visited.add(this.guard.position.toString());

    return visited.size;
  }

  partTwo() {

  }

  initialize() {
    this.data = this.data.map((row) => row.split(''));
    this.rowMax = this.data.length;
    this.colMax = this.data[0].length;

    for (let row = 0; row < this.rowMax; ++row) {
      for (let col = 0; col < this.colMax; ++col) {
        const entity = this.data[row][col];

        if (entity === '^') {
          this.guard = new Guard(row, col)
        }
        else if (entity === '#') {
          this.obstacles.add(new Position(row, col).toString());
        }
      }
    }
  }

  isInsideMap(position) {
    if (position.row <= 0 || position.row >= this.rowMax - 1) return false;
    if (position.col <= 0 || position.col >= this.colMax - 1) return false;

    return true;
  }

  getEntityAtPosition(position) {
    return this.data[position.row][position.col];
  }
}

const runner = new DaySixRunner();
runner.run();
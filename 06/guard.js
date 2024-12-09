import { Position } from './position.js';
import { Directions, changeDirection } from './direction.js';

export class Guard {
  direction = Directions.up;
  position = new Position(0, 0);

  constructor({ row = 0, col = 0, guard } = {}) {
    if (guard) {
      this.position = new Position(guard.position.row, guard.position.col);
      return;
    }

    this.position = new Position(row, col);
  }

  getNextPosition() {
    switch (this.direction) {
      case Directions.up:
        return new Position(this.position.row - 1, this.position.col);

      case Directions.right:
        return new Position(this.position.row, this.position.col + 1);

      case Directions.down:
        return new Position(this.position.row + 1, this.position.col);

      case Directions.left:
        return new Position(this.position.row, this.position.col - 1);
    }
  }

  changeDirection() {
    this.direction = changeDirection(this.direction);
  }

  moveTo(nextPosition) {
    this.position = new Position(nextPosition.row, nextPosition.col);
  }
}
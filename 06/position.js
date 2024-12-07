export class Position {
  row = 0;
  col = 0;

  constructor(row = 0, col = 0) {
    this.row = row;
    this.col = col;
  }

  getPosition() {
    return new Position(this.row, this.col);
  }

  toString() {
    return `${this.row},${this.col}`;
  }
}
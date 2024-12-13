export class Node {
  row = 0;
  col = 0;
  symbol = ''
  freqCount = 0;

  constructor(row = 0, col = 0, symbol = '', freqCount = 0) {
    this.row = row;
    this.col = col;
    this.symbol = symbol;
    this.freqCount = 0;
  }

  toString() {
    return `${this.row},${this.col}`;
  }
}
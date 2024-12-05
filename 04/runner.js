import { AdventOfCodeRunner } from "../adventOfCodeRunner.js";

class DayFourRunner extends AdventOfCodeRunner {
  xmasPattern = /(XMAS)/g;
  xmasReversedPattern = /SAMX/g
  maxRow = 0;
  maxCol = 0;

  constructor() {
    super(import.meta.dirname);

    this.maxRow = this.data.length;
    this.maxCol = this.data[0].length;
  }

  partOne() {
    const rowCount = this.getRowCount(this.data);
    const colCount = this.getColumnCount();
    const diagonalCount = this.getDiagonalCount();

    return rowCount + colCount + diagonalCount;
  }

  partTwo() {
    let count = 0;

    for (let row = 0; row < this.maxRow; ++row) {
      for (let col = 0; col < this.maxCol; ++col) {
        if (this.isCross(row, col)) {
          ++count;
        }
      }
    }

    return count;
  }

  getRowCount(stringArray) {
    let count = 0;

    for (const string of stringArray) {
      count += string.match(this.xmasPattern)?.length ?? 0;
      count += string.match(this.xmasReversedPattern)?.length ?? 0;
    }

    return count;
  }

  getColumnCount() {
    let columnStrings = [];
    let string = '';

    for (let col = 0; col < this.maxCol; ++col) {
      for (const row of this.data) {
        string += row[col];
      }

      columnStrings.push(string.slice());
      string = '';
    }

    return this.getRowCount(columnStrings);
  }

  getDiagonalCount() {
    const leftToRightDiagonals = this.getLeftToRightDiagonals();
    const rightToLeftDiagonals = this.getRightToLeftDiagonals();

    return this.getRowCount(leftToRightDiagonals.concat(rightToLeftDiagonals));
  }

  getLeftToRightDiagonals() {
    const diagonalStrings = [];

    for (let row = 0; row < this.maxRow; ++row) {
      let string = '';
      let dRow = row;
      let col = 0;

      while (dRow >= 0) {
        string += this.data[dRow][col];

        --dRow;
        ++col;
      }

      diagonalStrings.push(string.slice());
      string = '';
    }

    for (let col = 1; col < this.maxCol; ++col) {
      let string = '';
      let row = this.maxRow - 1;
      let dCol = col;

      while (row >= 0 && dCol < this.maxCol) {
        string += this.data[row][dCol];

        --row;
        ++dCol;
      }

      diagonalStrings.push(string.slice());
      string = '';
    }

    return diagonalStrings;
  }

  getRightToLeftDiagonals() {
    const diagonalStrings = [];

    for (let row = 0; row < this.maxRow; ++row) {
      let string = '';
      let dRow = row;
      let col = 0;

      while (dRow < this.maxRow) {
        string += this.data[dRow][col];

        ++dRow;
        ++col;
      }

      diagonalStrings.push(string.slice());
      string = '';
    }

    for (let col = 1; col < this.maxCol; ++col) {
      let string = '';
      let row = 0;
      let dCol = col;

      while (row < this.maxRow && dCol < this.maxCol) {
        string += this.data[row][dCol];

        ++row;
        ++dCol;
      }

      diagonalStrings.push(string.slice());
      string = '';
    }

    return diagonalStrings;
  }

  isCross(row, col) {
    if (row + 2 >= this.maxRow || col + 2 >= this.maxCol) return false;

    const leftToRightString = this.data[row][col] + this.data[row + 1][col + 1] + this.data[row + 2][col + 2];
    const rightToLeftString = this.data[row][col + 2] + this.data[row + 1][col + 1] + this.data[row + 2][col];

    const isLeftToRightStringValid = leftToRightString === 'MAS' || leftToRightString === 'SAM';
    const isRightToLeftStringValid = rightToLeftString === 'SAM' || rightToLeftString === 'MAS';

    return isLeftToRightStringValid && isRightToLeftStringValid;
  }
}

const runner = new DayFourRunner();
runner.run();
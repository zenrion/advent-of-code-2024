import { AdventOfCodeRunner } from "../adventOfCodeRunner.js";
import { Node } from "./node.js";

class DayEightRunner extends AdventOfCodeRunner {
  maxRows = 0;
  maxCols = 0;
  alphanumericRegex = /[A-Za-z0-9]/;
  startingNodes = new Map();

  constructor() {
    super(import.meta.dirname);
    this.initialize();
  }

  initialize() {
    this.maxRows = this.data.length;
    this.maxCols = this.data[0].length;

    for (let row = 0; row < this.maxRows; ++row) {
      for (let col = 0; col < this.maxCols; ++col) {
        const symbol = this.data[row][col];
        const node = new Node(row, col, symbol);

        if (!this.alphanumericRegex.test(node.symbol)) continue;

        this.startingNodes.set(node.toString(), node);
      }
    }
  }

  partOne() {
    const antinodes = new Set();

    for (const node of this.startingNodes.values()) {
      this.findAntinodes(node).forEach((antinode) => antinodes.add(antinode));
    }

    return antinodes.size;
  }

  partTwo() {
    const antinodes = new Set();

    for (const node of this.startingNodes.values()) {
      this.findAntinodesTwo(node).forEach((antinode) => antinodes.add(antinode));
    }

    return antinodes.size;
  }

  findAntinodes(originNode) {
    const antinodes = [];
    const visited = new Set();
    const queue = [originNode];
    const directions = [
      [-1, 0], // up
      [-1, 1], // up-right
      [0, 1], // right
      [1, 1], // down-right
      [1, 0], // down
      [1, -1], //down-left
      [0, -1], // left
      [-1, -1], // up-left
    ];

    while (queue.length > 0) {
      const currentNode = queue.shift();

      if (visited.has(currentNode.toString())) continue;

      visited.add(currentNode.toString());

      for (const [dRow, dCol] of directions) {
        const nextRow = currentNode.row + dRow;
        const nextCol = currentNode.col + dCol;

        if (!this.isInGrid(nextRow, nextCol)) continue;
        if (visited.has(`${nextRow},${nextCol}`)) continue;

        const nextNode = new Node(nextRow, nextCol, this.data[nextRow][nextCol]);

        if (nextNode.symbol === originNode.symbol) {
          const antinode = this.getAntinode(originNode, nextNode);

          if (this.isInGrid(antinode.row, antinode.col)) {
            antinodes.push(antinode.toString());
          }
        }

        queue.push(nextNode);
      }
    }

    return antinodes;
  }

  findAntinodesTwo(originNode) {
    const antinodes = [];
    const visited = new Set();
    const queue = [originNode];
    const directions = [
      [-1, 0], // up
      [-1, 1], // up-right
      [0, 1], // right
      [1, 1], // down-right
      [1, 0], // down
      [1, -1], //down-left
      [0, -1], // left
      [-1, -1], // up-left
    ];

    while (queue.length > 0) {
      const currentNode = queue.shift();

      if (visited.has(currentNode.toString())) continue;

      visited.add(currentNode.toString());

      for (const [dRow, dCol] of directions) {
        const nextRow = currentNode.row + dRow;
        const nextCol = currentNode.col + dCol;

        if (!this.isInGrid(nextRow, nextCol)) continue;
        if (visited.has(`${nextRow},${nextCol}`)) continue;

        const nextNode = new Node(nextRow, nextCol, this.data[nextRow][nextCol], currentNode.freqCount);

        if (nextNode.symbol === originNode.symbol) {
          ++nextNode.freqCount;

          const antinode = new Node(nextRow.row + currentNode.col, nextRow.col + currentNode.row, this);

          if (this.isInGrid(antinode.row, antinode.col) && nextNode.freqCount >= 2) {
            antinodes.push(antinode.toString());
          }
        }

        queue.push(nextNode);
      }
    }

    return antinodes;
  }

  isInGrid(row, col) {
    const isRowInGrid = row >= 0 && row < this.maxRows;
    const isColInGrid = col >= 0 && col < this.maxCols;

    return isRowInGrid && isColInGrid;
  }

  getAntinode(originNode, nextNode) {
    const dRow = nextNode.row - originNode.row;
    const dCol = nextNode.col - originNode.col;

    return new Node(originNode.row - dRow, originNode.col - dCol);
  }
}

const runner = new DayEightRunner();
runner.run();
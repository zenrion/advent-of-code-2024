import { AdventOfCodeRunner } from "../adventOfCodeRunner.js";

class DayThreeRunner extends AdventOfCodeRunner {
  constructor() {
    super(import.meta.dirname);
  }

  partOne() {
    const pattern = /mul\((?<left>(\d+)),(?<right>(\d+))\)/g;
    let sum = 0;

    for (const row of this.data) {
      for (const match of row.matchAll(pattern)) {
        const leftNumber = Number(match.groups['left']);
        const rightNumber = Number(match.groups['right']);

        sum += leftNumber * rightNumber;
      }
    }

    return sum;
  }

  partTwo() {
    const pattern = /mul\((?<left>(\d+)),(?<right>(\d+))\)|(?<instruction>(do\(\))|(don't\(\)))/g;
    let sum = 0;
    let skipInstruction = false;

    for (const row of this.data) {
      for (const match of row.matchAll(pattern)) {
        const instruction = match.groups['instruction'];

        if (instruction && instruction === 'do()') {
          skipInstruction = false;
          continue;
        }

        if (instruction && instruction === "don't()") {
          skipInstruction = true;
          continue;
        }

        if (skipInstruction) continue;

        const leftNumber = Number(match.groups['left']);
        const rightNumber = Number(match.groups['right']);

        sum += leftNumber * rightNumber;
      }
    }

    return sum;
  }
}

const runner = new DayThreeRunner();
runner.run();
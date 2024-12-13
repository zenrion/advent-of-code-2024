import { AdventOfCodeRunner } from "../adventOfCodeRunner.js";
import { Stone } from "./stone.js"

class DayElevenRunner extends AdventOfCodeRunner {
  stones = [];

  constructor() {
    super(import.meta.dirname);
    this.stones = this.data[0].split(' ');
  }

  partOne() {
    let count = 0;
    for (const stone of this.stones) {
      count += this.countStones(stone, 25, {});
    }

    return count;
  }

  partTwo() {
    let count = 0;
    for (const stone of this.stones) {
      count += this.countStones(stone, 75, {});
    }

    return count;
  }

  countStones(stone, blink, memo) {
    const key = `${stone}-${blink}`;

    if (memo[key]) {
      return memo[key];
    }

    let result = 0;

    if (blink === 0) {
      result = 1;
    }
    else if (stone === '0') {
      result = this.countStones(1, blink - 1, memo);
    }
    else if (stone.length % 2 === 0) {
      const mid = stone.length / 2;
      const firstStone = stone.slice(0, mid);
      const secondStone = this.trimLeadingZeros(stone.slice(mid));

      result = this.countStones(firstStone, blink - 1, memo) + this.countStones(secondStone, blink - 1, memo);
    }
    else {
      result = this.countStones('' + Number(stone) * 2024, blink - 1, memo);
    }

    memo[key] = result;

    return result;
  }

  trimLeadingZeros(stone) {
    const parsedStone = stone.replace(/^0+/, '');

    return parsedStone ? parsedStone : '0';
  }
}

const runner = new DayElevenRunner();
runner.run();

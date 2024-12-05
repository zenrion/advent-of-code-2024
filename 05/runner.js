import { AdventOfCodeRunner } from "../adventOfCodeRunner.js";

class DayFiveRunner extends AdventOfCodeRunner {
  orders = [];
  updates = [];

  constructor() {
    super(import.meta.dirname);
    this.initialize();
  }

  initialize() {
    const splitIndex = this.data.indexOf('');

    this.orders = this.data.slice(0, splitIndex);
    this.updates = this.data.slice(splitIndex + 1);
  }

  partOne() {
    let sum = 0;

    for (const update of this.updates) {
      const updateArray = update.split(',');
      const sortedUpdateArray = this.sortUpdate(updateArray);

      if (sortedUpdateArray.join('') !== updateArray.join('')) continue;

      const index = Math.floor(updateArray.length / 2);

      sum += Number(updateArray[index]);
    }

    return sum;
  }

  partTwo() {
    let sum = 0;

    for (const update of this.updates) {
      const updateArray = update.split(',');
      const sortedUpdateArray = this.sortUpdate(updateArray);

      if (sortedUpdateArray.join('') === updateArray.join('')) continue;

      const index = Math.floor(sortedUpdateArray.length / 2);

      sum += Number(sortedUpdateArray[index]);
    }

    return sum;
  }

  sortUpdate(updateArray) {
    return updateArray.toSorted((a, b) => this.compareOrder(a, b, this.orders));
  }

  compareOrder(a, b, orders) {
    const firstOrder = `${a}|${b}`;
    const secondOrder = `${b}|${a}`;

    if (orders.includes(firstOrder)) return -1;
    if (orders.includes(secondOrder)) return 1;

    return 0;
  }
}

const runner = new DayFiveRunner()
runner.run();
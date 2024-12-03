import { AdventOfCodeRunner } from "../adventOfCodeRunner.js";

class DayOneRunner extends AdventOfCodeRunner {
  constructor() {
    super(import.meta.dirname);

    this.data = this.data
      .map((dataRow) => dataRow.split('   '))
      .map((stringArray) => stringArray.map((numberAsString) => Number(numberAsString)))
  }

  partOne() {
    const startingNumbers = this.data.map((array) => array[0]);
    const endingNumbers = this.data.map((array) => array[1]);

    const sortedNumberPairs = this.getSortedNumberPairs(startingNumbers, endingNumbers);
    const distances = sortedNumberPairs.map(([left, right]) => Math.abs(left - right));

    return distances.reduce((sum, curr) => sum + curr, 0);
  }

  partTwo() {
    const startingNumbers = this.data.map((array) => array[0]);
    const endingNumbers = this.data.map((array) => array[1]);
    const setOfStartingNumbers = new Set(startingNumbers);

    const startingNumberOccurences = this.getStartingNumberOccurences(startingNumbers, endingNumbers, setOfStartingNumbers);
    const simularityScore = this.calculateSimularityScore(startingNumbers, startingNumberOccurences);

    return simularityScore;
  }

  getSortedNumberPairs(startingNumbers, endingNumbers) {
    const sortedStartingNumbers = startingNumbers.sort((a, b) => a - b);
    const sortedEndingNumbers = endingNumbers.sort((a, b) => a - b);
    const sortedNumberPairs = [];

    for (let i = 0; i < sortedStartingNumbers.length; ++i) {
      sortedNumberPairs.push([sortedStartingNumbers[i], sortedEndingNumbers[i]]);
    }

    return sortedNumberPairs;
  }

  getStartingNumberOccurences(startingNumbers, endingNumbers, setOfStartingNumbers) {
    const startingNumberOccurences = new Map(startingNumbers.map((number) => [number, 0]));

    for (const number of endingNumbers) {
      if (setOfStartingNumbers.has(number)) {
        startingNumberOccurences.set(number, startingNumberOccurences.get(number) + 1);
      }
    }

    return startingNumberOccurences;
  }

  calculateSimularityScore(startingNumbers, startingNumberOccurences) {
    let simularityScore = 0;

    for (const number of startingNumbers) {
      const occurenceCount = startingNumberOccurences.get(number);

      simularityScore += number * occurenceCount;
    }

    return simularityScore;
  }
}

const runner = new DayOneRunner();
runner.run();

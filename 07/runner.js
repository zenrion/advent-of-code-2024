import { AdventOfCodeRunner } from "../adventOfCodeRunner.js";
import { Calibration } from './calibration.js';

class DaySevenRunner extends AdventOfCodeRunner {
  calibrations = [];

  constructor() {
    super(import.meta.dirname);
    this.initialize();
  }

  initialize() {
    this.calibrations = this.data.map((row) => {
      const [testValue, equationsString] = row.split(': ');
      const equations = equationsString.split(' ').map(Number);

      return new Calibration(Number(testValue), equations);
    });
  }

  partOne() {
    const operators = ['+', '*'];
    let totalCalibrationResult = 0;

    for (const calibration of this.calibrations) {
      if (this.canFormTestValue(calibration.testValue, calibration.equationValues, operators)) {
        totalCalibrationResult += calibration.testValue;
      }
    }

    return totalCalibrationResult;
  }

  partTwo() {
    const operators = ['+', '*', '||'];
    let totalCalibrationResult = 0;

    for (const calibration of this.calibrations) {
      if (this.canFormTestValue(calibration.testValue, calibration.equationValues, operators)) {
        totalCalibrationResult += calibration.testValue;
      }
    }

    return totalCalibrationResult;
  }

  canFormTestValue(target, numbers, operators) {
    const values = new Set();

    function calculateNumber(current, next, operation) {
      switch (operation) {
        case '+':
          return current + next;
        case '*':
          return current * next;
        case '||':
          return Number('' + current + next);
        default:
          return 0;
      }
    }

    function backtrack(currentNumber, index) {
      if (index === numbers.length) {
        values.add(currentNumber);
        return;
      }

      for (const operation of operators) {
        const nextNumber = numbers[index];
        const calculatedNumber = calculateNumber(currentNumber, nextNumber, operation);

        backtrack(calculatedNumber, index + 1);
      }
    }

    backtrack(0, 0);

    return values.has(target);
  }
}

const runner = new DaySevenRunner();
runner.run();
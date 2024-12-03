import { AdventOfCodeRunner } from "../adventOfCodeRunner.js";

class DayTwoRunner extends AdventOfCodeRunner {
  constructor() {
    super(import.meta.dirname);

    this.data = this.data.map((string) => string.split(' ').map(Number));
  }

  partOne() {
    let safeReportCount = 0;

    for (const report of this.data) {
      if (!this.isSafeReport(report)) continue;

      ++safeReportCount;
    }

    return safeReportCount;
  }

  partTwo() {
    let safeReportCount = 0;

    for (const report of this.data) {
      if (this.isSafeReport(report)) {
        ++safeReportCount;
        continue;
      }

      for (let i = 0; i < report.length; ++i) {
        const dampenedReport = report.slice(0, i).concat(report.slice(i + 1));

        if (!this.isSafeReport(dampenedReport)) continue;

        ++safeReportCount;
        break;
      }
    }

    return safeReportCount;
  }

  isSafeReport(report) {
    const isReportIncreasing = report[0] < report[report.length - 1];

    for (let i = 1; i < report.length; ++i) {
      const leftLevel = report[i - 1];
      const rightLevel = report[i];

      let isIncreasing = leftLevel < rightLevel;

      if (isIncreasing !== isReportIncreasing) return false;

      let isUnsafe = isIncreasing
        ? this.isIncreasingDistanceUnsafe(leftLevel, rightLevel)
        : this.isDecreasingDistanceUnsafe(leftLevel, rightLevel)

      if (isUnsafe) return false;
    }

    return true;
  }

  isIncreasingDistanceUnsafe(left, right) {
    const distance = right - left;

    return distance < 1 || distance > 3;
  }

  isDecreasingDistanceUnsafe(left, right) {
    const distance = left - right;

    return distance < 1 || distance > 3;
  }
}

const runner = new DayTwoRunner();
runner.run();
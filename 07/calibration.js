export class Calibration {
  testValue = 0;
  equationValues = [];

  constructor(testValue = 0, equationValues = []) {
    this.testValue = testValue;
    this.equationValues = Array.from(equationValues);
  }
}
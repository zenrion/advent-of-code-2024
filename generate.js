import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { exit } from 'process';

const classString = `import { AdventOfCodeRunner } from "../adventOfCodeRunner.js";

class Day{DAY}Runner extends AdventOfCodeRunner {
  constructor() {
    super(import.meta.dirname);
  }

  partOne() {
  }

  partTwo() {
  }
}

const runner = new Day{DAY}Runner();
runner.run();`

const digitToEnglishMap = new Map([
  [1, 'One'],
  [2, 'Two'],
  [3, 'Three'],
  [4, 'Four'],
  [5, 'Five'],
  [6, 'Six'],
  [7, 'Seven'],
  [8, 'Eight'],
  [9, 'Nine'],
  [10, 'Ten'],
  [11, 'Eleven'],
  [12, 'Twelve'],
  [13, 'Thirteen'],
  [15, 'Fifteen']
]);

const placeToEnglishMap = new Map([
  [20, 'Twenty'],
  [30, 'Thirty']
]);

function getEnglishNameForDay(day) {
  if (digitToEnglishMap.has(day)) {
    return digitToEnglishMap.get(day);
  }

  const place = Math.floor(day / 10);
  const digit = day % 10;

  return getJoinedDayName(place, digit);
}

function getJoinedDayName(place, digit) {
  const placeValue = placeToEnglishMap.get(place);
  const digitValue = digitToEnglishMap.get(digit);

  if (place === 1) return `${digitValue}teen`;
  if (digit === 0) return placeValue;

  return placeValue + digitValue;
}

const args = process.argv.slice(2);
const dayArg = args[1];

const day = dayArg ? Number(dayArg) : new Date().getDate();
const validDayRegex = /^([1-9]|[1-2][0-9]|3[0-1])$/;

if (!validDayRegex.test(day.toString())) {
  console.log('Day must be between 1-31.');
  exit();
}

const folderName = day < 10 ? '0' + day : day.toString();

if (!existsSync(folderName)) {
  mkdirSync(folderName);
}

writeFileSync(`./${folderName}/input.txt`, '');
writeFileSync(`./${folderName}/runner.js`, classString.replaceAll('{DAY}', getEnglishNameForDay(day)));
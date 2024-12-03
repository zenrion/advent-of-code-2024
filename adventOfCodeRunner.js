import { readFileSync } from 'fs';

export class AdventOfCodeRunner {
  #directory = '';
  #data = null;

  constructor(directory) {
    this.#directory = directory;
    this.#data = this.readFile();
  }

  readFile() {
    return readFileSync(`${this.#directory}/input.txt`, 'utf-8').split('\r\n');
  }

  partOne() {
    throw new Error('Method not implemented.');
  }

  partTwo() {
    throw new Error('Method not implemented.');
  }

  run() {
    console.log(this.partOne());
    console.log(this.partTwo());
  }

  get data() {
    return this.#data;
  }

  set data(data) {
    this.#data = data;
  }
}
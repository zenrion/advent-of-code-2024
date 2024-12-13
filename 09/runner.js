import { AdventOfCodeRunner } from "../adventOfCodeRunner.js";
import { Chunk } from "./chunk.js"

class DayNineRunner extends AdventOfCodeRunner {
  diskMap = '';

  constructor() {
    super(import.meta.dirname);

    this.diskMap = this.data[0];
  }

  partOne() {
    const memory = this.getMemory();
    //console.log(memory.join(''));

    const defraggedMemory = this.defrag(memory);
    //console.log(defraggedMemory.join(''));

    return this.calculateChecksum(defraggedMemory);
  }

  partTwo() {
    const memory = this.getMemory();
    //console.log(memory.join(''));

    const defraggedMemory = this.chunkDefrag(memory);
    //console.log(defraggedMemory.join(''));

    return this.calculateChecksum(defraggedMemory);
  }

  getMemory() {
    const memory = [];

    let id = 0;

    for (let i = 0; i < this.diskMap.length; ++i) {
      const space = Number(this.diskMap[i]);

      if (i % 2 == 0) {
        memory.push(...this.getBlocks(id, space));
        ++id;
      }
      else {
        memory.push(...this.getBlocks('.', space));
      }
    }

    return memory;
  }

  getBlocks(value, total) {
    let blocks = [];

    for (let count = 0; count < total; ++count) {
      blocks.push(value);
    }

    return blocks;
  }

  defrag(memory) {
    let left = 0;
    let right = memory.length - 1;

    while (memory[left] !== '.') {
      ++left;
    }

    while (memory[right] === '.') {
      --right;
    }

    while (left < right) {
      memory[left] = memory[right];
      memory[right] = '.';

      while (memory[left] !== '.') {
        ++left;
      }

      while (memory[right] === '.') {
        --right;
      }
    }

    return memory;
  }

  chunkDefrag(memory) {
    const freeChunks = this.getFreeChunks(memory);
    const fileChunks = this.getFileChunks(memory);

    for (const fileChunk of fileChunks) {
      const freeChunk = freeChunks.filter((chunk) => chunk.size >= fileChunk.size)[0];

      if (!freeChunk) continue;
      if (freeChunk.startIndex > fileChunk.startIndex) continue;

      for (let i = 0; i < fileChunk.size; ++i) {
        memory[freeChunk.startIndex + i] = fileChunk.id;
        memory[fileChunk.startIndex + i] = '.'
      }

      freeChunk.startIndex += fileChunk.size;
      freeChunk.size = (freeChunk.endIndex - freeChunk.startIndex) + 1;
    }

    return memory;
  }

  getFreeChunks(memory) {
    const chunks = [];
    let start = memory.indexOf('.');

    while (start < memory.length - 1) {
      let end = start + 1;

      while (memory[end] === '.') {
        ++end;
      }

      chunks.push(new Chunk('.', start, end - 1));

      start = end;

      while (memory[start] !== '.' && start < memory.length - 1) {
        ++start;
      }
    }

    return chunks;
  }

  getFileChunks(memory) {
    const chunks = [];
    let end = memory.length - 1;

    while (memory[end] === '.') {
      --end;
    }

    while (end > 0) {
      const id = memory[end];
      let start = end - 1;

      while (memory[start] !== '.' && memory[start] === id) {
        --start;
      }

      chunks.push(new Chunk(id, start + 1, end));

      end = start;

      while (memory[end] === '.' && end > 0) {
        --end;
      }
    }

    return chunks;
  }

  calculateChecksum(defraggedMemory) {
    return defraggedMemory
      .reduce((checksum, fileId, position) => fileId === '.'
        ? checksum
        : checksum += fileId * position, 0);
  }
}

const runner = new DayNineRunner();
runner.run();
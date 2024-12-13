export class Chunk {
  id = '.';
  size = 0;
  startIndex = 0;
  endIndex = 0;

  constructor(id = '', startIndex = 0, endIndex = 0) {
    this.id = id;
    this.startIndex = startIndex;
    this.endIndex = endIndex;
    this.size = endIndex - startIndex + 1;
  }
}
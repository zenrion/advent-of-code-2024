export const Directions = {
  up: 0,
  down: 1,
  left: 2,
  right: 3
};

export const changeDirection = (direction) => {
  switch (direction) {
    case Directions.up:
      return Directions.right;

    case Directions.right:
      return Directions.down;

    case Directions.down:
      return Directions.left;

    case Directions.left:
      return Directions.up;
  }
}
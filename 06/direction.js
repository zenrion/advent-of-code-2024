export const Directions = {
  up: 'up',
  right: 'right',
  down: 'down',
  left: 'left'
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
export default class Vector2i {
  x = 0;
  y = 0;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  equals(vec) {
    if (vec.x === this.x && vec.y === this.y) {
      return true;
    }

    return false;
  }
}
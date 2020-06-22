import Rectangle from '../core/rectangle.js';

export default class Entity {
  x = 0;
  y = 0;
  width = 0;
  height = 0;
  sprite;
  path;
  depth = 0;

  static nodeSorter = (e0, e1) => {
    if (e1.depth < e0.depth) {
      return 1;
    }

    if (e1.depth > e0.depth) {
      return -1;
    }

    return 0;
  }

  constructor(x, y, width, height, sprite) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.sprite = sprite;
  }

  render(context) {
    context.drawImage(this.sprite, this.x - Camera.x, this.y - Camera.y);
  }

  tick() {

  }

  followPath(path) {
    if (path != null) {
      if (path.length > 0) {
        let target = path[path.length - 1].tile;

        if (this.x < target.x * 16) {
          this.x++;
        } else if (this.x > target.x * 16) {
          this.x--
        }

        if (this.y < target.y * 16) {
          this.y++;
        } else if (this.y > target.y * 16) {
          this.y--;
        }

        if (this.x == target.x * 16 && this.y == target.y * 16) {
          path.pop();
        }
      }
    }
  }


  static isColliding(entity1, entity2) {
    const rect1 = new Rectangle(entity1.x, entity1.y, 16, 16);
    const rect2 = new Rectangle(entity2.x, entity2.y, 16, 16);
    return rect1.intersect(rect2);
  }

}
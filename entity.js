class Entity {
  x = 0;
  y = 0;
  width = 0;
  height = 0;
  sprite;

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

  static isColliding(entity1, entity2) {
    const rect1 = new Rectangle(entity1.x, entity1.y, 16, 16);
    const rect2 = new Rectangle(entity2.x, entity2.y, 16, 16);
    return rect1.intersect(rect2);
  }

}
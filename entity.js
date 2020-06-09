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
    context.drawImage(this.sprite, this.x, this.y);
  }

  tick() {

  }

}
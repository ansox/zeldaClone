class Weapon extends Entity {
  width = 16;
  heigth = 16;
  sprite = spritesheet.getSprite(0, 6 * 16, this.width, this.heigth);

  render(context) {
    context.drawImage(this.sprite, this.x - Camera.x, this.y - Camera.y);
  }

}
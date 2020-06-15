class Enemy extends Entity {
  width = 16;
  heigth = 16;
  sprite = spritesheet.getSprite(16, 5 * 16, this.width, this.heigth);

  render(context) {
    context.drawImage(this.sprite, this.x, this.y);
  }

}

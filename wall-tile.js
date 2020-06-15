class WallTile extends Tile {
  width = 16;
  heigth = 16;
  sprite = spritesheet.getSprite(0, 4 * 16, 16, 16);


  render(context) {

    context.drawImage(this.sprite, this.x - Camera.x, this.y - Camera.y);

  }
}
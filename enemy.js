class Enemy extends Entity {
  width = 16;
  heigth = 16;
  sprite = spritesheet.getSprite(16, 5 * 16, this.width, this.heigth);
  speed = 1;

  render(context) {
    context.drawImage(this.sprite, this.x - Camera.x, this.y - Camera.y);
  }

  tick() {
    if (this.x < player.x && World.isFree(this.x + this.speed, this.y) &&
      !this.isColliding(this.x + this.speed, this.y)) {
      this.x += this.speed;
    } else if (this.x > player.x && World.isFree(this.x - this.speed, this.y) &&
      !this.isColliding(this.x - this.speed, this.y)) {
      this.x -= this.speed;
    } if (this.y < player.y && World.isFree(this.x, this.y + this.speed) &&
      !this.isColliding(this.x, this.y + this.speed)) {
      this.y += this.speed;
    } else if (this.y > player.y && World.isFree(this.x, this.y - this.speed) &&
      !this.isColliding(this.x, this.y - this.speed)) {
      this.y -= this.speed;
    }
  }

  isColliding(xNext, yNext) {
    let enemyCurrent = new Rectangle(xNext, yNext, World.TILE_SIZE, World.TILE_SIZE);

    for (const enemy of enimies) {
      if (enemy === this) {
        continue;
      }

      const targetEnemy = new Rectangle(enemy.x, enemy.y, World.TILE_SIZE, World.TILE_SIZE);

      if (enemyCurrent.intersect(targetEnemy)) {
        return true;
      }
    }

    return false;
  }

}

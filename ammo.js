import Entity from './entity.js';
import Game from './game.js';
import Camera from './camera.js';

export default class Ammo extends Entity {
  width = 16;
  heigth = 16;
  sprite = Game.spritesheet.getSprite(3 * 16, 5 * 16, this.width, this.heigth);

  render(context) {
    context.drawImage(this.sprite, this.x - Camera.x, this.y - Camera.y);
  }

}

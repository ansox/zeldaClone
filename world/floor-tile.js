
import Tile from './tile.js';
import Game from '../game.js';
import Camera from './camera.js';

export default class FloorTile extends Tile {
  width = 16;
  heigth = 16;
  sprite = Game.spritesheet.getSprite(0, 3 * 16, this.width, this.heigth);

  render(context) {
    context.drawImage(this.sprite, this.x - Camera.x, this.y - Camera.y);
  }
}
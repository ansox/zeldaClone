import Tile from './tile.js';
import Game from '../game.js';
import Camera from './camera.js';

export default class WallTile extends Tile {
  width = 16;
  heigth = 16;
  sprite = Game.spritesheet.getSprite(0, 4 * 16, 16, 16);


  render(context) {

    context.drawImage(this.sprite, this.x - Camera.x, this.y - Camera.y);

  }
}
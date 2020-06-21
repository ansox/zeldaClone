import Entity from './entity.js';
import Camera from '../world/camera.js';
import Game from '../game.js';

export default class Bullet extends Entity {
  dx = 0;
  dy = 0;
  speed = 4;
  life = 35;
  curLife = 0;

  constructor(x, y, width, height, sprite, dx, dy) {
    super(x, y, width, height, sprite);
    this.dx = dx;
    this.dy = dy;
  }

  tick() {
    this.x += this.dx * this.speed;
    this.y += this.dy * this.speed;

    this.curLife++;
    if (this.curLife == this.life) {
      Game.bullets = Game.bullets.filter(bullet => bullet != this);
    }
  }

  render(context) {
    context.fillStyle = "rgba(0, 120, 120, 1)";
    context.fillRect(this.x - Camera.x, this.y - Camera.y, 3, 3);
  }
}
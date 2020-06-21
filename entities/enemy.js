import Entity from './entity.js';
import Camera from '../world/camera.js';
import Game from '../game.js';
import Rectangle from '../core/rectangle.js';
import World from '../world/world.js';
import Bullet from './bullet.js';
import Sound from '../core/sound.js';

export default class Enemy extends Entity {
  width = 16;
  height = 16;
  sprite = Game.spritesheet.getSprite(16, 5 * 16, this.width, this.height);
  damage = Game.spritesheet.getSprite(4 * 16, 5 * 16, this.width, this.height);
  speed = 0.4;
  frames = 0;
  maxFrames = 15;
  index = 0;
  maxIndex = 2;
  sprites = [];
  life = 2;
  isDammaged = false;
  dammageFrames = 10;
  dammageCurrent = 0;

  constructor(x, y, width, height, sprite) {
    super(x, y, width, height, sprite);

    for (let i = 0; i < this.maxIndex; i++) {
      this.sprites.push(Game.spritesheet.getSprite(16 + (16 * i), 5 * 16, 16, 16));
    }
  }

  render(context) {
    if (!this.isDammaged) {
      context.drawImage(this.sprites[this.index], this.x - Camera.x, this.y - Camera.y);
    }
    else {
      context.drawImage(this.damage, this.x - Camera.x, this.y - Camera.y);

    }


  }

  tick() {
    if (!this.iscollidingWithPlayer()) {
      if (this.x < Game.player.x && World.isFree(this.x + this.speed, this.y) &&
        !this.isColliding(this.x + this.speed, this.y)) {
        this.x += this.speed;
      } else if (this.x > Game.player.x && World.isFree(this.x - this.speed, this.y) &&
        !this.isColliding(this.x - this.speed, this.y)) {
        this.x -= this.speed;
      } if (this.y < Game.player.y && World.isFree(this.x, this.y + this.speed) &&
        !this.isColliding(this.x, this.y + this.speed)) {
        this.y += this.speed;
      } else if (this.y > Game.player.y && World.isFree(this.x, this.y - this.speed) &&
        !this.isColliding(this.x, this.y - this.speed)) {
        this.y -= this.speed;
      }
    }
    else {
      if (Game.player.life > 0) {
        let r = Math.floor(Math.random(100) * 100);

        if (r < 15) {
          Sound.hitEffect.play();
          Game.player.life--;
          Game.player.isDammage = true;
          console.log('Vida: ' + Game.player.life);
        }
      }
    }

    this.frames++;

    if (this.frames > this.maxFrames) {
      this.frames = 0;
      this.index++;
      if (this.index === this.maxIndex) {
        this.index = 0
      }
    }

    this.collidingBullet();

    if (this.life <= 0) {
      this.destroySelf();
    }

    if (this.isDammaged) {
      this.dammageCurrent++;

      if (this.dammageCurrent == this.dammageFrames) {
        this.dammageCurrent = 0;
        this.isDammaged = false;
      }
    }
  }

  destroySelf() {
    Game.entities = Game.entities.filter(item => item != this);
    Game.enimies = Game.enimies.filter(item => item != this);
  }

  collidingBullet() {
    Game.bullets.forEach(entity => {
      if (entity instanceof Bullet) {
        if (Entity.isColliding(this, entity)) {
          this.isDammaged = true;
          this.life--;
          Game.bullets = Game.bullets.filter(item => item != entity)
        }
      }
    })
  }

  isColliding(xNext, yNext) {
    let enemyCurrent = new Rectangle(xNext, yNext, World.TILE_SIZE, World.TILE_SIZE);

    for (const enemy of Game.enimies) {
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

  iscollidingWithPlayer() {
    let enemyCurrent = new Rectangle(this.x, this.y, World.TILE_SIZE, World.TILE_SIZE);
    let playerCurrent = new Rectangle(Game.player.x, Game.player.y, World.TILE_SIZE, World.TILE_SIZE);

    return enemyCurrent.intersect(playerCurrent);
  }

}

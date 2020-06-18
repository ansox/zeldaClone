import Entity from './entity.js';
import Game from './game.js';
import LifePack from './life-pack.js';
import Ammo from './ammo.js';
import Weapon from './weapon.js';
import Camera from './camera.js';
import World from './world.js';
import Bullet from './bullet.js';

export default class Player extends Entity {
  right = false;
  left = false;
  up = false;
  down = false;
  speed = 2;

  rightDir = 0;
  leftDir = 1;
  dir = this.rightDir;

  rightPlayer = [];
  leftPlayer = [];
  idlePlayer = [];
  dammage;

  frames = 0;
  maxFrames = 6;
  index = 4;
  maxIndex = 6;
  moved = false;
  life = 100;
  maxLife = 100;
  ammo = 0;
  isDammage = false;
  dammageFrame = 0;
  hasWeapon = false;
  shoot = false;
  WEAPON_RIGHT
  WEAPON_LEFT

  constructor(x, y, width, height, sprite) {
    super(x, y, width, height, sprite);

    for (let i = 0; i < this.maxIndex; i++) {
      this.rightPlayer.push(Game.spritesheet.getSprite(0 + (16 * i), 2 * 16, 16, 16));
    }

    for (let i = 0; i < this.maxIndex; i++) {
      this.leftPlayer.push(Game.spritesheet.getSprite(0 + (16 * i), 16, 16, 16));
    }

    this.idlePlayer.push(Game.spritesheet.getSprite(0, 0, 16, 16));

    this.dammage = Game.spritesheet.getSprite(16 * 5, 0, 16, 16);

    this.WEAPON_RIGHT = Game.spritesheet.getSprite(0, 6 * 16, 16, 16);
    this.WEAPON_LEFT = Game.spritesheet.getSprite(16, 6 * 16, 16, 16);
  }

  tick() {
    this.moved = false;
    if (this.right && World.isFree(this.x + this.speed, this.y)) {
      this.moved = true;
      this.x += this.speed;
      this.dir = this.rightDir;
    } else if (this.left && World.isFree(this.x - this.speed, this.y)) {
      this.moved = true;
      this.dir = this.leftDir;
      this.x -= this.speed;
    } else if (this.up && World.isFree(this.x, this.y - this.speed)) {
      this.moved = true;
      this.y -= this.speed;
    } else if (this.down && World.isFree(this.x, this.y + this.speed)) {
      this.moved = true;
      this.y += this.speed;
    }

    if (this.moved) {
      this.frames++;

      if (this.frames > this.maxFrames) {
        this.frames = 0;
        this.index++;
        if (this.index === this.maxIndex) {
          this.index = 0
        }
      }
    }

    this.checkCollisionLifePack();
    this.checkCollisionAmmo();
    this.checkCollisionWeapon();

    if (this.isDammage) {
      this.dammageFrame++;
      if (this.dammageFrame == 5) {
        this.dammageFrame = 0;
        this.isDammage = false;
      }
    }

    if (this.shoot) {
      this.shoot = false;
      if (this.hasWeapon && this.ammo > 0) {
        let dx = 0;
        let px = 0;
        let py = 8;
        if (this.dir == this.rightDir) {
          dx = 1;
          px = 20;
        }
        else {
          dx = -1;
          px = -20;
        }

        const bullet = new Bullet(this.x + px, this.y + py, this.width, this.height, null, dx, 0);
        Game.bullets.push(bullet);
        this.ammo--;
      }
    }

    if (this.life <= 0) {
      Game.gameState = 'GAME_OVER'
    }

    Camera.x = Camera.clamp(this.x - (Game.WIDTH / 2), 0, World.width * 16 - Game.WIDTH);
    Camera.y = Camera.clamp(this.y - (Game.HEIGHT / 2), 0, World.height * 16 - Game.HEIGHT);
  }

  render(context) {
    if (!this.isDammage) {
      if (this.dir == this.rightDir) {
        context.drawImage(this.rightPlayer[this.index], this.x - Camera.x, this.y - Camera.y);
        if (this.hasWeapon) {
          context.drawImage(this.WEAPON_RIGHT, this.x + 11 - Camera.x, this.y + 2 - Camera.y);
        }
      } else if (this.dir == this.leftDir) {
        context.drawImage(this.leftPlayer[this.index], this.x - Camera.x, this.y - Camera.y);

        if (this.hasWeapon) {
          context.drawImage(this.WEAPON_LEFT, this.x - 11 - Camera.x, this.y + 2 - Camera.y);

        }
      }
    }
    else {
      context.drawImage(this.dammage, this.x - Camera.x, this.y - Camera.y);
    }
  }

  checkCollisionWeapon() {
    Game.entities.forEach(entity => {
      if (entity instanceof Weapon) {
        if (Entity.isColliding(this, entity)) {
          this.hasWeapon = true;
          Game.entities = Game.entities.filter(item => item != entity);
        }
      }
    })
  }

  checkCollisionAmmo() {
    Game.entities.forEach(entity => {
      if (entity instanceof Ammo) {
        if (Entity.isColliding(this, entity)) {
          this.ammo += 10;
          Game.entities = Game.entities.filter(item => item != entity);
        }
      }
    })
  }

  checkCollisionLifePack() {
    Game.entities.forEach(entity => {
      if (entity instanceof LifePack) {
        if (Entity.isColliding(this, entity)) {
          this.life += 10;
          Game.entities = Game.entities.filter(item => item != entity);

          this.life = this.life > 100 ? 100 : this.life;
        }
      }
    })
  }
}
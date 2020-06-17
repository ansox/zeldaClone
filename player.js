class Player extends Entity {
  right = false;
  left = false;
  up = false;
  down = false;
  speed = 2;

  rightPlayer = [];
  leftPlayer = [];
  idlePlayer = [];
  dammage;

  frames = 0;
  maxFrames = 6;
  index = 0;
  maxIndex = 6;
  moved = false;
  life = 100;
  maxLife = 100;
  ammo = 0;
  isDammage = false;
  dammageFrame = 0;

  constructor(x, y, width, height, sprite) {
    super(x, y, width, height, sprite);

    for (let i = 0; i < this.maxIndex; i++) {
      this.rightPlayer.push(spritesheet.getSprite(0 + (16 * i), 2 * 16, 16, 16));
    }

    for (let i = 0; i < this.maxIndex; i++) {
      this.leftPlayer.push(spritesheet.getSprite(0 + (16 * i), 16, 16, 16));
    }

    this.idlePlayer.push(spritesheet.getSprite(0, 0, 16, 16));

    this.dammage = spritesheet.getSprite(16 * 5, 0, 16, 16);
  }

  tick() {
    this.moved = false;
    if (this.right && World.isFree(this.x + this.speed, this.y)) {
      this.moved = true;
      this.x += this.speed;
    } else if (this.left && World.isFree(this.x - this.speed, this.y)) {
      this.moved = true;
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

    if (this.isDammage) {
      this.dammageFrame++;
      if (this.dammageFrame == 5) {
        this.dammageFrame = 0;
        this.isDammage = false;
      }

    }

    Camera.x = Camera.clamp(this.x - (WIDTH / 2), 0, World.width * 16 - WIDTH);
    Camera.y = Camera.clamp(this.y - (HEIGHT / 2), 0, World.height * 16 - HEIGHT);
  }

  render(context) {
    if (!this.isDammage) {
      if (this.right) {
        context.drawImage(this.rightPlayer[this.index], this.x - Camera.x, this.y - Camera.y);
      } else if (this.left) {
        context.drawImage(this.leftPlayer[this.index], this.x - Camera.x, this.y - Camera.y);
      } else {
        context.drawImage(this.idlePlayer[0], this.x - Camera.x, this.y - Camera.y);
      }
    }
    else {
      context.drawImage(this.dammage, this.x - Camera.x, this.y - Camera.y);
    }
  }

  checkCollisionAmmo() {
    entities.forEach(entity => {
      if (entity instanceof Ammo) {
        if (Entity.isColliding(this, entity)) {
          this.ammo += 10;
          entities = entities.filter(item => item != entity);
        }
      }
    })
  }

  checkCollisionLifePack() {
    entities.forEach(entity => {
      if (entity instanceof LifePack) {
        if (Entity.isColliding(this, entity)) {
          this.life += 10;
          entities = entities.filter(item => item != entity);

          this.life = this.life > 100 ? 100 : this.life;
        }
      }
    })
  }
}
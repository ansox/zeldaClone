class Player extends Entity {
  right = false;
  left = false;
  up = false;
  down = false;
  speed = 2;

  rightPlayer = [];
  leftPlayer = [];
  idlePlayer = [];
  frames = 0;
  maxFrames = 6;
  index = 0;
  maxIndex = 6;
  moved = false;

  constructor(x, y, width, height, sprite) {
    super(x, y, width, height, sprite);

    for (let i = 0; i < this.maxIndex; i++) {
      this.rightPlayer.push(spritesheet.getSprite(0 + (16 * i), 2 * 16, 16, 16));
    }

    for (let i = 0; i < this.maxIndex; i++) {
      this.leftPlayer.push(spritesheet.getSprite(0 + (16 * i), 16, 16, 16));
    }

    this.idlePlayer.push(spritesheet.getSprite(0, -1, 16, 16));
  }

  tick() {
    this.moved = false;
    if (this.right) {
      this.moved = true;
      this.x += this.speed;
    } else if (this.left) {
      this.moved = true;
      this.x -= this.speed;
    } else if (this.up) {
      this.moved = true;
      this.y -= this.speed;
    } else if (this.down) {
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

    Camera.x = Camera.clamp(this.x - (WIDTH / 2), 0, World.width * 16 - WIDTH);
    Camera.y = Camera.clamp(this.y - (HEIGHT / 2), 0, World.height * 16 - HEIGHT);
  }

  render(context) {
    if (this.right) {
      context.drawImage(this.rightPlayer[this.index], this.x - Camera.x, this.y - Camera.y);
    } else if (this.left) {
      context.drawImage(this.leftPlayer[this.index], this.x - Camera.x, this.y - Camera.y);
    } else {
      context.drawImage(this.idlePlayer[0], this.x - Camera.x, this.y - Camera.y);
    }
  }
}
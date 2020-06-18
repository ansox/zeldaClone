let canvas;
let context;

const WIDTH = 240;
const HEIGHT = 160;
const SCALE = 3;
cur_level = 1;
max_level = 2;

let spritesheet;
let entities = [];
let enimies = [];
let bullets = [];
let player;
let world;
let ui;
let ctxBack;
started = false;
restarting = false;
gameState = 'NORMAL';
framesGameOver = 0;
showMessageGameOver = false;
restartGame = false;

function init() {
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');
  context.canvas.width = WIDTH * SCALE;
  context.canvas.height = HEIGHT * SCALE;

  back = document.getElementById('back');
  ctxBack = back.getContext('2d');
  ctxBack.canvas.width = 800;
  ctxBack.canvas.height = 800;

  context.scale(SCALE, SCALE);

  spritesheet = new Spritesheet();
  spritesheet.loadImage('./imgs/spritesheet.png')
    .then(() => {
      player = new Player(-100, -100, 16, 16, spritesheet.getSprite(0, 0, 16 * 6, (16 * 3)));
      entities.push(player);

      world = new World();
      world.loadImage('./imgs/level1.png')
        .then(() => {
          console.log('ok');
          started = true;
        });

      ui = new UI();

      document.addEventListener('keydown', onKeyDown);
      document.addEventListener('keyup', onKeyUp);

      window.requestAnimationFrame(run);
    })
}

function onKeyDown(e) {
  if (e.code === 'ArrowRight') {
    player.right = true;
  }

  if (e.code === 'ArrowLeft') {
    player.left = true;
  }

  if (e.code === 'ArrowUp') {
    player.up = true;
  }

  if (e.code === 'ArrowDown') {
    player.down = true;
  }
}

function onKeyUp(e) {
  if (e.code === 'ArrowRight') {
    player.right = false;
  }

  if (e.code === 'ArrowLeft') {
    player.left = false;
  }

  if (e.code === 'ArrowUp') {
    player.up = false;
  }

  if (e.code === 'ArrowDown') {
    player.down = false;
  }

  if (e.code === 'Space') {
    player.shoot = true;
  }

  if (e.code === 'Enter') {
    restartGame = true;
  }
}

function run() {
  tick();
  render();
  window.requestAnimationFrame(run);
}

function render() {
  context.fillStyle = "#000"
  context.fillRect(0, 0, WIDTH * SCALE, HEIGHT * SCALE);

  if (!restarting) {
    world.render(context);
    entities.forEach(entity => entity.render(context));
    bullets.forEach(bullet => bullet.render(context));

    ctxBack.globalAlpha = 0.1;
    ctxBack.drawImage(canvas, 0, 0);

    if (gameState === 'GAME_OVER') {
      context.fillStyle = 'rgba(0, 0, 0, 0.5)';
      context.fillRect(0, 0, WIDTH * SCALE, HEIGHT * SCALE);
    }

    ui.render(context);

  }
}

function tick() {
  if (gameState === 'NORMAL') {
    restartGame = false;

    entities.forEach(entity => entity.tick());
    bullets.forEach(bullet => bullet.tick());

    if (enimies.length === 0 && started) {
      started = false;
      restarting = true;
      cur_level++;
      if (cur_level > max_level) {
        cur_level = 1;
      }
      console.log(cur_level);

      let newWorld = `level${cur_level}.png`;
      world.restartGame(newWorld);
    }
  } else if (gameState === 'GAME_OVER') {
    framesGameOver++;
    if (this.framesGameOver == 30) {
      this.framesGameOver = 0;
      this.showMessageGameOver = !this.showMessageGameOver;
    }

    if (restartGame) {
      gameState = 'NORMAL';
      cur_level = 1;
      world.restartGame('level1.png');
    }
  }


}

init();
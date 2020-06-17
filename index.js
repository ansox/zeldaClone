let canvas;
let context;

const WIDTH = 240;
const HEIGHT = 160;
const SCALE = 3;

let spritesheet;
let entities = [];
let enimies = [];
let player;
let world;
let ui;
let reload = false;

function init() {
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');
  context.canvas.width = WIDTH * SCALE;
  context.canvas.height = HEIGHT * SCALE;

  context.scale(SCALE, SCALE);

  spritesheet = new Spritesheet();
  spritesheet.loadImage('./imgs/spritesheet.png')
    .then(() => {
      player = new Player(-100, -100, 16, 16, spritesheet.getSprite(0, 0, 16 * 6, (16 * 3)));
      entities.push(player);

      world = new World();
      world.loadImage('./imgs/map.png')
        .then(() => {
          console.log('ok');

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
}

function run() {
  tick();
  render();
  window.requestAnimationFrame(run);
}

function render() {
  context.fillStyle = "#000"
  context.fillRect(0, 0, WIDTH * SCALE, HEIGHT * SCALE);

  world.render(context);
  entities.forEach(entity => entity.render(context));
  ui.render(context);
}

function tick() {
  if (reload) {
    reload = false;
    document.location.reload(true);
    return;
  }
  entities.forEach(entity => entity.tick());
}


init();
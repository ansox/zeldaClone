import Spritesheet from './core/spritesheet.js';
import Player from './entities/player.js';
import World from './world/world.js';
import UI from './ui/ui.js';
import Menu from './ui/menu.js';

export default class Game {
  canvas;
  context;
  ctxBack;

  static WIDTH = 240;
  static HEIGHT = 160;
  static SCALE = 3;
  cur_level = 1;
  max_level = 2;

  static spritesheet;
  static entities = [];
  static enimies = [];
  static bullets = [];
  static player;
  static world;
  static ui;
  static showMessageGameOver = false;
  static gameState = 'MENU';
  static restarting = false;
  static started = false;

  framesGameOver = 0;
  restartGame = false;

  menu;

  start() {
    this.canvas = document.getElementById('canvas');
    this.context = canvas.getContext('2d');
    this.context.canvas.width = Game.WIDTH * Game.SCALE;
    this.context.canvas.height = Game.HEIGHT * Game.SCALE;

    this.back = document.getElementById('back');
    this.ctxBack = back.getContext('2d');
    this.ctxBack.canvas.width = 800;
    this.ctxBack.canvas.height = 800;

    this.context.scale(Game.SCALE, Game.SCALE);

    Game.spritesheet = new Spritesheet();
    Game.spritesheet.loadImage('./imgs/spritesheet.png')
      .then(() => {
        // Sound.musicBackground.loop();
        Game.player = new Player(-100, -100, 16, 16, Game.spritesheet.getSprite(0, 0, 16 * 6, (16 * 3)));
        Game.entities.push(Game.player);

        Game.world = new World();
        Game.world.loadImage('./imgs/level1.png')
          .then(() => {
            console.log('ok');
            Game.started = true;
          });

        this.ui = new UI();
        this.menu = new Menu();

        document.addEventListener('keydown', this.onKeyDown.bind(this));
        document.addEventListener('keyup', this.onKeyUp.bind(this));

        window.requestAnimationFrame(this.run.bind(this));
      })
  }

  onKeyDown(e) {
    if (e.code === 'ArrowRight') {
      Game.player.right = true;
    }

    if (e.code === 'ArrowLeft') {
      Game.player.left = true;
    }

    if (e.code === 'ArrowUp') {
      Game.player.up = true;

      if (Game.gameState === 'MENU') {
        this.menu.up = true;
      }
    }

    if (e.code === 'ArrowDown') {
      Game.player.down = true;

      if (Game.gameState === 'MENU') {
        this.menu.down = true;
      }
    }

    if (e.code === 'Space') {
      Game.player.shoot = true;
    }

    if (e.code === 'Enter') {
      this.restartGame = true;

      if (Game.gameState === 'MENU') {
        this.menu.enter = true;
      }
    }

    if (e.code === 'Escape') {
      Game.gameState = 'MENU';
      this.menu.pause = true;
    }
  }

  onKeyUp(e) {
    if (e.code === 'ArrowRight') {
      Game.player.right = false;
    }

    if (e.code === 'ArrowLeft') {
      Game.player.left = false;
    }

    if (e.code === 'ArrowUp') {
      Game.player.up = false;
    }

    if (e.code === 'ArrowDown') {
      Game.player.down = false;
    }
  }

  run() {
    this.tick();
    this.render();
    window.requestAnimationFrame(this.run.bind(this));
  }

  render() {
    if (Game.gameState === 'NORMAL' || Game.gameState === 'GAME_OVER') {
      this.context.fillStyle = "#000"
      this.context.fillRect(0, 0, Game.WIDTH * Game.SCALE, Game.HEIGHT * Game.SCALE);

      if (!Game.restarting) {
        Game.world.render(this.context);
        Game.entities.forEach(entity => entity.render(this.context));
        Game.bullets.forEach(bullet => bullet.render(this.context));

        this.ctxBack.globalAlpha = 0.1;
        this.ctxBack.drawImage(this.canvas, 0, 0);

        if (Game.gameState === 'GAME_OVER') {
          this.context.fillStyle = 'rgba(0, 0, 0, 0.5)';
          this.context.fillRect(0, 0, Game.WIDTH * Game.SCALE, Game.HEIGHT * Game.SCALE);
        }

        this.ui.render(this.context);
      }
    } else if (Game.gameState === 'MENU') {
      this.menu.render(this.context);
    }
  }

  tick() {
    if (Game.gameState === 'NORMAL') {
      this.restartGame = false;

      Game.entities.forEach(entity => entity.tick());
      Game.bullets.forEach(bullet => bullet.tick());

      if (Game.enimies.length === 0 && Game.started) {
        Game.started = false;
        Game.restarting = true;
        this.cur_level++;
        if (this.cur_level > this.max_level) {
          this.cur_level = 1;
        }

        let newWorld = `level${this.cur_level}.png`;
        Game.world.restartGame(newWorld);
      }
    } else if (Game.gameState === 'GAME_OVER') {
      this.framesGameOver++;
      if (this.framesGameOver == 30) {
        this.framesGameOver = 0;
        Game.showMessageGameOver = !Game.showMessageGameOver;
      }

      if (this.restartGame) {
        Game.gameState = 'NORMAL';
        this.cur_level = 1;
        Game.world.restartGame('level1.png');
      }
    } else if (Game.gameState === 'MENU') {
      this.menu.tick();
    }

  }
}
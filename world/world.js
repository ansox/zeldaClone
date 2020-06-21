import FloorTile from './floor-tile.js';
import WallTile from './wall-tile.js';
import Enemy from '../entities/enemy.js';
import Game from '../game.js';
import Ammo from '../entities/ammo.js';
import LifePack from '../entities/life-pack.js';
import Weapon from '../entities/weapon.js';
import Camera from './camera.js';
import Player from '../entities/player.js';

export default class World {
  static tiles = [];
  static width;
  static height;
  static TILE_SIZE = 16;

  static isFree(xNext, yNext) {
    let x1 = parseInt(xNext / World.TILE_SIZE);
    let y1 = parseInt(yNext / World.TILE_SIZE);

    let x2 = parseInt((xNext + World.TILE_SIZE - 1) / World.TILE_SIZE);
    let y2 = parseInt(yNext / World.TILE_SIZE);

    let x3 = parseInt(xNext / World.TILE_SIZE);
    let y3 = parseInt((yNext + World.TILE_SIZE - 1) / World.TILE_SIZE);

    let x4 = parseInt((xNext + World.TILE_SIZE - 1) / World.TILE_SIZE);
    let y4 = parseInt((yNext + World.TILE_SIZE - 1) / World.TILE_SIZE);

    return !(World.tiles[x1 + (y1 * this.width)] instanceof WallTile ||
      World.tiles[x2 + (y2 * this.width)] instanceof WallTile ||
      World.tiles[x3 + (y3 * this.width)] instanceof WallTile ||
      World.tiles[x4 + (y4 * this.width)] instanceof WallTile)
  }

  loadImage(path) {
    let map = new Image();
    return new Promise(resolve => {
      map.onload = () => {
        const mapColor = this.getMapColor(map);

        for (let xx = 0; xx < map.width; xx++) {
          for (let yy = 0; yy < map.height; yy++) {
            const color = mapColor[xx + (yy * map.width)];

            World.tiles[xx + (yy * map.width)] = new FloorTile(xx * 16, yy * 16, null);

            if (color === '0, 0, 0') {
              World.tiles[xx + (yy * map.width)] = new FloorTile(xx * 16, yy * 16, null)
            } else if (color === '255, 255, 255') {
              World.tiles[xx + (yy * map.width)] = new WallTile(xx * 16, yy * 16, null)
            }
            else if (color === '255, 205, 210') {
              Game.entities.push(new LifePack(xx * 16, yy * 16, null));
            }
            else if (color === '255, 235, 59') {
              Game.entities.push(new Ammo(xx * 16, yy * 16, null));
            }
            else if (color === '255, 152, 0') {
              Game.entities.push(new Weapon(xx * 16, yy * 16, null));
            }
            else if (color === '33, 150, 243') {
              Game.player.x = xx * 16;
              Game.player.y = yy * 16;

            }
            else if (color === '244, 67, 54') {
              const enemy = new Enemy(xx * 16, yy * 16, null);
              Game.entities.push(enemy);
              Game.enimies.push(enemy);
            }
            else {
              World.tiles[xx + (yy * map.width)] = new FloorTile(xx * 16, yy * 16, null)
            }
          }
        }

        resolve();
      }

      map.src = path;
    })
  }

  getMapColor(map) {
    const canvas = document.createElement('canvas');
    World.width = map.width;
    World.height = map.height;

    canvas.width = World.width;
    canvas.height = World.height;

    const context = canvas.getContext('2d');
    context.drawImage(map, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);

    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    const mapColor = [];

    for (let i = 0; i < imageData.data.length; i += 4) {
      const red = imageData.data[i];
      const green = imageData.data[i + 1];
      const blue = imageData.data[i + 2];
      const color = `${red}, ${green}, ${blue}`;

      mapColor.push(color);
    }

    return mapColor;
  }

  restartGame(level) {
    Game.started = false;
    Game.entities = [];
    Game.enimies = [];
    Game.bullets = [];

    Game.player = new Player(-100, -100, 16, 16, Game.spritesheet.getSprite(0, 0, 16 * 6, (16 * 3)));
    Game.entities.push(Game.player);

    Game.world = new World();
    Game.world.loadImage(`./imgs/${level}`)
      .then(() => {
        Game.restarting = false;
        console.log('ok');
        Game.started = true;
      });
  }

  render(context) {
    if (World.tiles.length > 0) {
      let xStart = parseInt(Camera.x / 16);
      let yStart = parseInt(Camera.y / 16);

      let xFinal = parseInt(xStart + (Game.WIDTH / 16));
      let yFinal = parseInt(yStart + (Game.HEIGHT / 16));

      for (let xx = 0; xx <= xFinal; xx++) {
        for (let yy = 0; yy <= yFinal; yy++) {
          if (xx < 0 || yy < 0 || xx >= World.width || yy >= World.height) {
            continue;
          }
          const tile = World.tiles[xx + (yy * World.width)];
          tile.render(context);
        }
      }
    }

  }
}
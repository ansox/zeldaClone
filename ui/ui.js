import Game from '../game.js';
import World from '../world/world.js';
import WallTile from '../world/wall-tile.js';

export default class UI {

  render(context) {
    context.fillStyle = "rgba(255, 0, 0, 1)";
    context.fillRect(8, 4, 70, 8);

    context.fillStyle = "rgba(0, 255, 0, 1)";
    context.fillRect(8, 4, (Game.player.life / Game.player.maxLife) * 70, 8);

    context.fillStyle = "#fff";
    context.font = "6px Arial";
    context.fillText(`${Game.player.life}/${Game.player.maxLife}`, 32, 10);

    context.fillText(`Ammo: ${Game.player.ammo}`, 200, 10);

    this.renderMap(context);

    if (Game.gameState === 'GAME_OVER') {
      context.fillStyle = "#fff";
      context.font = "15px Arial";
      context.fillText(`GAME OVER`, parseInt(Game.WIDTH / 2) - 50, parseInt((Game.HEIGHT) / 2) + 10);

      if (Game.showMessageGameOver) {
        context.fillText(`Press "Enter" to restart`, parseInt(Game.WIDTH / 2) - 75, parseInt((Game.HEIGHT) / 2) + 30);
      }
    }
  }

  renderMap(context) {
    const canvas = document.createElement('canvas');
    canvas.width = World.width;
    canvas.height = World.height;
    const ctx = canvas.getContext('2d');

    for (let xx = 0; xx < World.width; xx++) {
      for (let yy = 0; yy < World.height; yy++) {
        let index = xx + (yy * World.width);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(xx, yy, 1, 1);

        if (World.tiles[index] instanceof WallTile) {
          ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
          ctx.fillRect(xx, yy, 1, 1);
        }

        let xPlayer = parseInt(Game.player.x / 16);
        let yPlayer = parseInt(Game.player.y / 16);

        if (xPlayer === xx && yPlayer === yy) {
          ctx.fillStyle = 'rgba(0, 0, 255, 1)';
          ctx.fillRect(xx, yy, 1, 1);
        }
      }
    }

    context.drawImage(canvas, 200, 20)
  }
}
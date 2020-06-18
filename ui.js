import Game from './game.js';

export default class UI {

  render(context) {
    context.fillStyle = "rgba(255, 0, 0, 1)";
    context.fillRect(8, 4, 70, 8);

    context.fillStyle = "rgba(0, 255, 0, 1)";
    context.fillRect(8, 4, (Game.player.life / Game.player.maxLife) * 70, 8);

    context.fillStyle = "#fff";
    context.font = "6px Arial";
    context.fillText(`${Game.player.life}/${Game.player.maxLife}`, 32, 10);

    context.fillText(`Ammo: ${Game.player.ammo}`, 200, 10)

    if (Game.gameState === 'GAME_OVER') {
      context.fillStyle = "#fff";
      context.font = "15px Arial";
      context.fillText(`GAME OVER`, parseInt(Game.WIDTH / 2) - 50, parseInt((Game.HEIGHT) / 2) + 10);

      if (Game.showMessageGameOver) {
        context.fillText(`Press "Enter" to restart`, parseInt(Game.WIDTH / 2) - 75, parseInt((Game.HEIGHT) / 2) + 30);
      }
    }
  }
}
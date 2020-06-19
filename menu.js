import Game from './game.js';

export default class Menu {
  options = ['New Game', 'Load Game', 'Quit'];
  resume = 'Resume';

  currentOption = 0;
  maxOption = this.options.length - 1;

  up = false;
  down = false;
  enter = false;
  pause = false;

  tick() {
    if (this.up) {
      this.currentOption--;
      this.up = false;

      if (this.currentOption < 0) {
        this.currentOption = this.maxOption;
      }
    }

    if (this.down) {
      this.currentOption++;
      this.down = false;
      if (this.currentOption > this.maxOption) {
        this.currentOption = 0;
      }
    }

    if (this.enter) {
      this.pause = false;
      this.enter = false;

      if (this.currentOption === 0) {
        Game.gameState = 'NORMAL'
      }
    }
  }

  render(context) {
    context.fillStyle = 'rgba(0, 0, 0, 0.5)';
    context.fillRect(0, 0, Game.WIDTH * Game.SCALE, Game.HEIGHT * Game.SCALE);

    context.fillStyle = 'rgba(255, 0, 0, 1)';
    context.font = "20px Arial";
    context.fillText(`Anso The Dev-Man`, parseInt(Game.WIDTH / 2) - 80, parseInt((Game.HEIGHT) / 2) - 50);

    let y = 0;
    context.font = "15px Arial";
    context.fillStyle = '#fff';

    this.options.forEach((option, index) => {
      if (this.currentOption === index) {
        context.fillText('>', parseInt(Game.WIDTH / 2) - 50, parseInt((Game.HEIGHT) / 2) - 10 + y);
      }

      if (index === 0 && this.pause) {
        context.fillText(this.resume, parseInt(Game.WIDTH / 2) - 25, parseInt((Game.HEIGHT) / 2) - 10 + y);
      }
      else {
        context.fillText(option, parseInt(Game.WIDTH / 2) - 25, parseInt((Game.HEIGHT) / 2) - 10 + y);
      }

      y += 20;
    })
  }
}
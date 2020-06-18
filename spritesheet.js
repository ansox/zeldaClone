export default class Spritesheet {
  spritesheet;
  loaded = false;

  constructor() {
    this.spritesheet = new Image();
  }

  loadImage(path) {
    return new Promise(resolve => {
      this.spritesheet.onload = () => {
        this.loaded = true;
        resolve();
      }

      this.spritesheet.src = path;
    })
  }

  getSprite(x, y, width, height) {
    if (this.loaded) {
      return this.getCanvasImage(x, y, width, height, this.spritesheet);
    }
  }

  getCanvasImage(x, y, width, height, image) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    context.drawImage(image, x, y, width, height, 0, 0, width, height);
    return canvas;
  }
}
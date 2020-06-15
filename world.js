class World {
  tiles = [];
  init = [];
  static width;
  static height;

  loadImage(path) {
    let map = new Image();
    return new Promise(resolve => {
      map.onload = () => {
        const mapColor = this.getMapColor(map);

        for (let xx = 0; xx < map.width; xx++) {
          for (let yy = 0; yy < map.height; yy++) {
            const color = mapColor[xx + (yy * map.width)];

            this.init[xx + (yy * map.width)] = new FloorTile(xx * 16, yy * 16, null)

            if (color === '0, 0, 0') {
              this.tiles[xx + (yy * map.width)] = new FloorTile(xx * 16, yy * 16, null)
            } else if (color === '255, 255, 255') {
              this.tiles[xx + (yy * map.width)] = new WallTile(xx * 16, yy * 16, null)
            }
            else if (color === '255, 205, 210') {
              this.tiles[xx + (yy * map.width)] = new LifePack(xx * 16, yy * 16, null)
            }
            else if (color === '244, 67, 54') {
              this.tiles[xx + (yy * map.width)] = new Enemy(xx * 16, yy * 16, null)

            }
            else {
              this.tiles[xx + (yy * map.width)] = new FloorTile(xx * 16, yy * 16, null)
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

  render(context) {
    if (this.tiles.length > 0) {
      let xStart = parseInt(Camera.x / 16);
      let yStart = parseInt(Camera.y / 16);

      let xFinal = parseInt(xStart + (WIDTH / 16));
      let yFinal = parseInt(yStart + (HEIGHT / 16));

      for (let xx = 0; xx <= xFinal; xx++) {
        for (let yy = 0; yy <= yFinal; yy++) {
          if (xx < 0 || yy < 0 || xx >= World.width || yy >= World.height) {
            continue;
          }
          const tile = this.tiles[xx + (yy * World.width)];
          const init = this.init[xx + (yy * World.width)];
          init.render(context);
          tile.render(context);
        }
      }
    }

  }
}
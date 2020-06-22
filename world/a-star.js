import Node from './node.js';
import World from './world.js';
import Game from '../game.js';
import WallTile from './wall-tile.js';
import Vector2i from './vector2i.js';

export default class AStar {
  static lasttime = new Date();

  static nodeSorter = (n0, n1) => {
    if (n1.fCost < n0.fCost) {
      return 1;
    }

    if (n1.fCost > n0.fCost) {
      return -1;
    }

    return 0;
  }

  clear() {
    if (new Date() - AStar.lasttime >= 1000) {
      return true;
    }

    return false;
  }

  static findPath(world, start, end) {
    AStar.lasttime = new Date();
    let openList = [];
    let closedList = [];

    let current = new Node(start, null, 0, AStar.getDistance(start, end));
    openList.push(current);

    while (openList.length > 0) {
      openList.sort(AStar.nodeSorter);
      current = openList[0];

      if (current.tile.equals(end)) {
        //ponto final
        let path = [];

        while (current.parent != null) {
          path.push(current);
          current = current.parent;
        }
        openList = [];
        closedList = [];
        return path;
      }

      closedList.push(openList.shift());

      for (let i = 0; i < 9; i++) {
        if (i == 4) continue;

        let x = current.tile.x;
        let y = current.tile.y;
        let xi = (i % 3) - 1;
        let yi = parseInt((i / 3)) - 1;

        let tile = World.tiles[x + xi + ((y + yi) * World.width)];

        if (tile == null) continue;
        if (tile instanceof WallTile) continue;

        if (i === 0) {
          let test = World.tiles[x + xi + 1 + ((y + yi) * World.width)];
          let test2 = World.tiles[x + xi + ((y + yi + 1) * World.width)];

          if (test instanceof WallTile || test2 instanceof WallTile) {
            continue;
          }
        } else if (i === 2) {
          let test = World.tiles[x + xi - 1 + ((y + yi) * World.width)];
          let test2 = World.tiles[x + xi + ((y + yi + 1) * World.width)];

          if (test instanceof WallTile || test2 instanceof WallTile) {
            continue;
          }
        } else if (i === 6) {
          let test = World.tiles[x + xi + ((y + yi - 1) * World.width)];
          let test2 = World.tiles[x + xi + 1 + ((y + yi) * World.width)];

          if (test instanceof WallTile || test2 instanceof WallTile) {
            continue;
          }
        } else if (i === 8) {
          let test = World.tiles[x + xi + ((y + yi - 1) * World.width)];
          let test2 = World.tiles[x + xi - 1 + ((y + yi) * World.width)];

          if (test instanceof WallTile || test2 instanceof WallTile) {
            continue;
          }
        }

        const a = new Vector2i(x + xi, y + yi);
        const gCost = current.gCost + AStar.getDistance(current.tile, a);
        const hCost = AStar.getDistance(a, end);

        const node = new Node(a, current, gCost, hCost);

        if (AStar.vecInList(closedList, a) && gCost >= current.gCost) {
          continue;
        }

        if (!AStar.vecInList(openList, a)) {
          openList.push(node);
        } else if (gCost < current.gCost) {
          openList.shift(current);
          openList.push(node);
        }
      }
    }
    closedList = [];
    return null;
  }

  static getDistance(tile, goal) {
    const dx = tile.x - goal.x;
    const dy = tile.y - goal.y;

    return Math.sqrt(dx * dx + dy * dy);
  }

  static vecInList(list, vector) {
    for (let item of list) {
      if (item.tile.equals(vector)) {
        return true;
      }
    }

    return false;
  }

}
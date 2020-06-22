export default class Node {
  tile;
  parent;
  fCost = 0;
  gCost = 0;
  hCost = 0;

  constructor(tile, parent, gCost, hCost) {
    this.tile = tile;
    this.parent = parent;
    this.gCost = gCost;
    this.hCost = hCost;
    this.fCost = gCost + hCost;
  }
}
import Cell from "./cell.js";

class World {
  width: number;
  height: number;
  cells: Cell[][];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;

    this.cells = new Array(width).fill(0).map((_, xi) => {
      return new Array(height).fill(0).map((_, yi) => {
        return new Cell(xi, yi);
      });
    });
  }
}

export default World;

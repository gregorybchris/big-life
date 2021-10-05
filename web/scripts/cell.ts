class Cell {
  x: number;
  y: number;
  alive: boolean;
  id: string;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.alive = false;
    this.id = `cell_${x}_${y}`;
  }
}

export default Cell;

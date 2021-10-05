import Cell from "./cell.js";
import World from "./world.js";

class Game {
  world: World;
  ticks: number;

  constructor(world: World) {
    this.world = world;
    this.ticks = 0;
  }

  onCellClick(cell: Cell) {
    console.log("Clicked", cell);
  }
}

export default Game;

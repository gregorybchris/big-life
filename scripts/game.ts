import Cell from "./cell.js";
import Location from "./location.js";
import Map from "./map.js";
import World from "./world.js";
import { KeyName, KeyNames } from "./io.js";

class Game {
  world: World;
  ticks: number;
  running: boolean;
  step: boolean;

  constructor(world: World) {
    this.world = world;
    this.ticks = 0;
    this.running = true;
    this.step = false;
  }

  onCellClick = (cell: Cell) => {
    this.world.toggleCell(cell);
  };

  onKeyPress = (keyName: KeyName) => {
    if (keyName == KeyNames.SPACE) this.running = !this.running;
    else if (keyName == KeyNames.LETTER_P) this.running = !this.running;
    else if (keyName == KeyNames.LETTER_S) this.step = true;
    else if (keyName == KeyNames.BACKSPACE) this.world.clear();
    else if (keyName == KeyNames.UP) this.world.updateBounds(this.world.bounds.translate(-1, 0));
    else if (keyName == KeyNames.DOWN) this.world.updateBounds(this.world.bounds.translate(1, 0));
    else if (keyName == KeyNames.LEFT) this.world.updateBounds(this.world.bounds.translate(0, -1));
    else if (keyName == KeyNames.RIGHT) this.world.updateBounds(this.world.bounds.translate(0, 1));
  };

  getNumNeighbors(location: Location): number {
    let neighborCount = 0;
    this.getNeighbors(location).forEach((neighborLocation) => {
      if (this.world.get(neighborLocation)) {
        neighborCount++;
      }
    });
    return neighborCount;
  }

  getNeighbors(location: Location): Location[] {
    const [row, col] = location;
    const neighbors = [];
    for (let r = row - 1; r <= row + 1; r++) {
      for (let c = col - 1; c <= col + 1; c++) {
        if (r == row && c == col) continue;
        neighbors.push([r, c]);
      }
    }
    return neighbors;
  }

  updateCell(location: Location, visitMap: Map, changeMap: Map) {
    if (visitMap.get(location)) {
      return;
    }
    visitMap.set(location, true);
    const numNeighbors = this.getNumNeighbors(location);
    const alive = this.world.get(location);
    if (numNeighbors < 2 && alive) {
      changeMap.set(location, true);
    } else if (numNeighbors == 2) {
      return;
    } else if (numNeighbors == 3 && !alive) {
      changeMap.set(location, true);
    } else if (numNeighbors > 3 && alive) {
      changeMap.set(location, true);
    }
  }

  onUpdate = (currentTime: number, deltaTime: number) => {
    if (this.running || this.step) {
      this.ticks++;
      this.step = false;

      const visitMap = new Map();
      const changeMap = new Map();
      this.world.forEachLocation((location) => {
        this.updateCell(location, visitMap, changeMap);
        this.getNeighbors(location).forEach((neighborLocation) => {
          this.updateCell(neighborLocation, visitMap, changeMap);
        });
      });

      changeMap.forEach((location) => {
        this.world.set(location, !this.world.get(location));
      });
    }
  };
}

export default Game;

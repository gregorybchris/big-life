import Cell from "./cell.js";
import Location from "./location.js";
import Map from "./map.js";
import World from "./world.js";

class Game {
  world: World;
  ticks: number;
  time: number;

  constructor(world: World) {
    this.world = world;
    this.ticks = 0;
    this.time = 0;
  }

  onInteract(cell: Cell) {
    console.log("Cell clicked", cell.id);
    cell.setAlive(!cell.alive);
  }

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
    console.log("Location: ", location, "has ", numNeighbors, "neighbors");
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
    this.ticks++;
    this.time += deltaTime;

    if (this.time > 2) {
      this.time = 0;
    } else {
      return;
    }

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
  };
}

export default Game;

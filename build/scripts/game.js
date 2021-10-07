import Map from "./map.js";
import { KeyNames } from "./io.js";
class Game {
    constructor(world) {
        this.onCellClick = (cell) => {
            this.world.toggleCell(cell);
        };
        this.onKeyPress = (keyName) => {
            if (keyName == KeyNames.SPACE)
                this.running = !this.running;
            else if (keyName == KeyNames.LETTER_P)
                this.running = !this.running;
            else if (keyName == KeyNames.LETTER_S)
                this.step = true;
            else if (keyName == KeyNames.UP)
                this.world.updateBounds(this.world.bounds.translate(-1, 0));
            else if (keyName == KeyNames.DOWN)
                this.world.updateBounds(this.world.bounds.translate(1, 0));
            else if (keyName == KeyNames.LEFT)
                this.world.updateBounds(this.world.bounds.translate(0, -1));
            else if (keyName == KeyNames.RIGHT)
                this.world.updateBounds(this.world.bounds.translate(0, 1));
        };
        this.onUpdate = (currentTime, deltaTime) => {
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
        this.world = world;
        this.ticks = 0;
        this.running = true;
        this.step = false;
    }
    getNumNeighbors(location) {
        let neighborCount = 0;
        this.getNeighbors(location).forEach((neighborLocation) => {
            if (this.world.get(neighborLocation)) {
                neighborCount++;
            }
        });
        return neighborCount;
    }
    getNeighbors(location) {
        const [row, col] = location;
        const neighbors = [];
        for (let r = row - 1; r <= row + 1; r++) {
            for (let c = col - 1; c <= col + 1; c++) {
                if (r == row && c == col)
                    continue;
                neighbors.push([r, c]);
            }
        }
        return neighbors;
    }
    updateCell(location, visitMap, changeMap) {
        if (visitMap.get(location)) {
            return;
        }
        visitMap.set(location, true);
        const numNeighbors = this.getNumNeighbors(location);
        const alive = this.world.get(location);
        if (numNeighbors < 2 && alive) {
            changeMap.set(location, true);
        }
        else if (numNeighbors == 2) {
            return;
        }
        else if (numNeighbors == 3 && !alive) {
            changeMap.set(location, true);
        }
        else if (numNeighbors > 3 && alive) {
            changeMap.set(location, true);
        }
    }
}
export default Game;

import Cell from "./cell.js";
import Map from "./map.js";
class World {
    constructor(bounds) {
        this.bounds = bounds;
        this.rows = bounds.rowMax - bounds.rowMin + 1;
        this.cols = bounds.colMax - bounds.colMin + 1;
        this.cells = new Array(this.rows).fill(0).map((_, r) => {
            return new Array(this.cols).fill(0).map((_, c) => {
                return new Cell(r, c);
            });
        });
        this.map = new Map();
    }
    clear() {
        this.map = new Map();
        this.forEachCell((cell) => {
            cell.setAlive(false);
        });
    }
    updateBounds(bounds) {
        this.bounds = bounds;
        this.forEachCell((cell) => {
            const location = [bounds.rowMin + cell.row, bounds.colMin + cell.col];
            cell.setAlive(this.get(location));
        });
    }
    forEachCell(callback) {
        this.cells.forEach((cellRow) => {
            cellRow.forEach((cell) => {
                callback(cell);
            });
        });
    }
    inBounds(location) {
        const [row, col] = location;
        if (row < this.bounds.rowMin)
            return false;
        if (row > this.bounds.rowMax)
            return false;
        if (col < this.bounds.colMin)
            return false;
        if (col > this.bounds.colMax)
            return false;
        return true;
    }
    toggleCell(cell) {
        const location = [this.bounds.rowMin + cell.row, this.bounds.colMin + cell.col];
        const alive = this.map.get(location);
        this.map.set(location, !alive);
        cell.setAlive(!alive);
    }
    getCell(location) {
        const [row, col] = location;
        const cellRow = row - this.bounds.rowMin;
        const cellCol = col - this.bounds.colMin;
        return this.cells[cellRow][cellCol];
    }
    set(location, alive) {
        this.map.set(location, alive);
        if (this.inBounds(location)) {
            this.getCell(location).setAlive(alive);
        }
    }
    get(location) {
        return this.map.get(location);
    }
    forEachLocation(callback) {
        this.map.forEach(callback);
    }
    addEntity(entity) {
        entity.forEach((location) => {
            this.set(location, true);
        });
    }
}
export default World;

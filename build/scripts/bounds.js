class Bounds {
    constructor(rowMin, rowMax, colMin, colMax) {
        this.rowMin = rowMin;
        this.rowMax = rowMax;
        this.colMin = colMin;
        this.colMax = colMax;
    }
    translate(rows, cols) {
        return new Bounds(this.rowMin + rows, this.rowMax + rows, this.colMin + cols, this.colMax + cols);
    }
}
export default Bounds;

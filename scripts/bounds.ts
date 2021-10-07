class Bounds {
  rowMin: number;
  rowMax: number;
  colMin: number;
  colMax: number;

  constructor(rowMin: number, rowMax: number, colMin: number, colMax: number) {
    this.rowMin = rowMin;
    this.rowMax = rowMax;
    this.colMin = colMin;
    this.colMax = colMax;
  }

  translate(rows: number, cols: number) {
    return new Bounds(this.rowMin + rows, this.rowMax + rows, this.colMin + cols, this.colMax + cols);
  }

  // zoom(zoom: number) {
  //   return new Bounds(this.rowMin + zoom, this.rowMax - zoom, this.colMin + zoom, this.colMax - zoom);
  // }
}

export default Bounds;

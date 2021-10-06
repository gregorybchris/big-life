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
}

export default Bounds;

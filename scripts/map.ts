import Location from "./location.js";

class Map {
  data: object;

  constructor() {
    this.data = {};
  }

  forEach(callback: (location: Location) => void) {
    for (const rowString in this.data) {
      const row = parseInt(rowString, 10);
      for (const colString in this.data[row]) {
        const col = parseInt(colString, 10);
        callback([row, col]);
      }
    }
  }

  set(location: Location, value: boolean) {
    const [row, col] = location;
    if (value) {
      if (!this.data.hasOwnProperty(row)) {
        this.data[row] = {};
      }
      this.data[row][col] = value;
    } else {
      if (this.data.hasOwnProperty(row)) {
        if (this.data[row].hasOwnProperty(col)) {
          delete this.data[row][col];
        }
        if (Object.keys(this.data[row]).length == 0) {
          delete this.data[row];
        }
      }
    }
  }

  get(location: Location): boolean {
    const [row, col] = location;
    if (!this.data.hasOwnProperty(row)) {
      return false;
    }
    if (!this.data[row].hasOwnProperty(col)) {
      return false;
    }
    return this.data[row][col];
  }
}

export default Map;

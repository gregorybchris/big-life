import Location from "./location.js";

class Entity {
  name: string;
  locations: Location[];

  constructor(name: string, locations: Location[], entities: Entity[]) {
    this.name = name;
    this.locations = locations;

    entities.forEach((entity) => {
      entity.forEach((location) => {
        this.locations.push(location);
      });
    });
  }

  forEach(callback: (location: Location) => void) {
    this.locations.forEach(callback);
  }

  transform(row: number = 0, col: number = 0, flip: boolean = false, rotate: number = 0): Entity {
    // 1. Flip horizontally
    // 2. Rotate about the origin clockwise by 90˚
    // 3. Translate with rows and cols

    const locations = [];
    this.locations.forEach((location) => {
      let [r, c] = location;

      // Flip
      if (flip) {
        c = -c;
      }

      // Rotate
      const theta = (rotate * Math.PI) / 2;
      const cos = Math.floor(Math.cos(theta));
      const sin = Math.floor(Math.sin(theta));
      [c, r] = [cos * c - sin * r, cos * r + sin * c];

      // Translate
      r += row;
      c += col;

      locations.push([r, c]);
    });
    return new Entity(this.name, locations, []);
  }
}

export default Entity;

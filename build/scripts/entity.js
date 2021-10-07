class Entity {
    constructor(name, locations, entities) {
        this.name = name;
        this.locations = locations;
        entities.forEach((entity) => {
            entity.forEach((location) => {
                this.locations.push(location);
            });
        });
    }
    forEach(callback) {
        this.locations.forEach(callback);
    }
    transform(row = 0, col = 0, flip = false, rotate = 0) {
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

class Cell {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.alive = false;
        this.id = `${row}_${col}`;
        this.subscribers = [];
    }
    setAlive(alive) {
        this.alive = alive;
        this.publish();
    }
    publish() {
        this.subscribers.forEach((subscriber) => {
            subscriber(this);
        });
    }
    subscribe(subscriber) {
        this.subscribers.push(subscriber);
    }
}
export default Cell;

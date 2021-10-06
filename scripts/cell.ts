class Cell {
  row: number;
  col: number;
  alive: boolean;
  id: string;
  subscribers: ((cell: Cell) => void)[];

  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
    this.alive = false;
    this.id = `${row}_${col}`;

    this.subscribers = [];
  }

  setAlive(alive: boolean) {
    this.alive = alive;
    this.publish();
  }

  publish() {
    this.subscribers.forEach((subscriber) => {
      subscriber(this);
    });
  }

  subscribe(subscriber: (cell: Cell) => void) {
    this.subscribers.push(subscriber);
  }
}

export default Cell;

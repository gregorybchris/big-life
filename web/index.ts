import Game from "./scripts/game.js";
import Cell from "./scripts/cell.js";
import World from "./scripts/world.js";
import { initializeGraphics, rerenderGraphics } from "./scripts/graphics.js";

const WIDTH = 50;
const HEIGHT = 25;

const world = new World(WIDTH, HEIGHT);
const game = new Game(world);

const onClick = (cell: Cell) => {
  game.onCellClick(cell);
  rerenderGraphics(game);
};

initializeGraphics(world, onClick);

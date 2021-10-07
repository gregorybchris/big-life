import Bounds from "./scripts/bounds.js";
import Game from "./scripts/game.js";
import Library from "./scripts/library.js";
import World from "./scripts/world.js";
import { initGraphics } from "./scripts/graphics.js";
import { initKeyboard } from "./scripts/io.js";

const COL_MIN = -28;
const COL_MAX = 28;
const ROW_MIN = -15;
const ROW_MAX = 15;

const bounds = new Bounds(ROW_MIN, ROW_MAX, COL_MIN, COL_MAX);
const world = new World(bounds);
world.addEntity(Library.GLIDER_GUN);
world.addEntity(Library.EATER.transform(12, 13, false, -1));
const game = new Game(world);

initGraphics(world, game.onCellClick, game.onUpdate);
initKeyboard(game.onKeyPress);

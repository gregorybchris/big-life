import Bounds from "./scripts/bounds.js";
import Game from "./scripts/game.js";
import Library from "./scripts/library.js";
import World from "./scripts/world.js";
import { initGraphics } from "./scripts/graphics.js";

const COL_MIN = -25;
const COL_MAX = 25;
const ROW_MIN = -13;
const ROW_MAX = 13;

const bounds = new Bounds(ROW_MIN, ROW_MAX, COL_MIN, COL_MAX);
const world = new World(bounds);
world.addEntity(Library.GLIDER_GUN);
const game = new Game(world);

initGraphics(world, game.onInteract, game.onUpdate);

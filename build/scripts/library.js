import Entity from "./entity.js";
function LibraryFactory() {
    this.GLIDER = new Entity("glider", [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, 1],
        [1, 0],
    ], []);
    this.GLIDER_INTERMEDIATE = new Entity("intermediate-glider", [
        [-1, 0],
        [0, 0],
        [0, 1],
        [1, 1],
        [1, -1],
    ], []);
    this.EATER = new Entity("eater", [
        [2, -2],
        [2, -1],
        [1, -1],
        [0, -1],
        [-1, 0],
        [-1, 1],
        [0, 1],
    ], []);
    this.R_PENTOMINO = new Entity("r-pentomino", [
        [1, 0],
        [0, 0],
        [0, -1],
        [-1, 0],
        [-1, 1],
    ], []);
    this.T_TETROMINO = new Entity("t-tetromino", [
        [1, 0],
        [0, 0],
        [0, -1],
        [0, 1],
    ], []);
    this.GLIDER_GUN = new Entity("glider-gun", [], [
        this.GLIDER_INTERMEDIATE.transform(-3, -12, false, 2),
        this.GLIDER.transform(1, -11, false, -1),
        this.GLIDER_INTERMEDIATE.transform(2, -6, true, 0),
        this.GLIDER.transform(3, 0, false, -1),
        this.GLIDER.transform(-5, -20, true, -1),
        this.GLIDER.transform(-1, -18, true, 0),
        this.GLIDER_INTERMEDIATE.transform(-5, 2, false, 2),
        this.GLIDER.transform(-1, 3, false, -1),
        this.GLIDER_INTERMEDIATE.transform(0, 8, true, 0),
        this.GLIDER.transform(6, 19, false, -1),
        this.GLIDER.transform(-7, 14, true, -1),
        this.GLIDER.transform(-3, 16, true, 0),
        this.GLIDER.transform(11, 8, true, 0), // shuttle 1 beehive annihilator glider
    ]);
}
const Library = new LibraryFactory();
export default Library;

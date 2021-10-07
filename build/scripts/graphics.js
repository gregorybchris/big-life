const WORLD_WIDTH = 1000;
const WORLD_HEIGHT = 600;
const CELL_PADDING = 2;
const ALIVE_COLOR = "rgb(150, 150, 150)";
const DEAD_COLOR = "rgb(70, 70, 70)";
const BACKGROUND_COLOR = "rgb(40, 40, 40)";
const getCellColor = (cell) => {
    return cell.alive ? ALIVE_COLOR : DEAD_COLOR;
};
const getUpdate = (onUpdate) => {
    let lastTime = 0;
    const update = (currentTime) => {
        currentTime = currentTime || 0;
        const deltaTime = currentTime - (lastTime || 0);
        lastTime = currentTime;
        onUpdate(currentTime, deltaTime);
        requestAnimationFrame(update);
    };
    return update;
};
const initGraphics = (world, onCellClick, onUpdate) => {
    const canvas = d3
        .select("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", `0 0 ${WORLD_WIDTH} ${WORLD_HEIGHT}`);
    const cellWidth = WORLD_WIDTH / world.cols;
    const cellHeight = cellWidth;
    // Cell squares
    canvas
        .selectAll("rect")
        .data([].concat(...world.cells))
        .enter()
        .append("rect")
        .classed("cell", true)
        .attr("x", (cell) => cell.col * cellWidth)
        .attr("y", (cell) => cell.row * cellHeight)
        .attr("width", cellWidth)
        .attr("height", cellHeight)
        .attr("stroke-width", CELL_PADDING)
        .attr("stroke", BACKGROUND_COLOR)
        .attr("fill", getCellColor)
        .attr("id", (cell) => `cell_${cell.id}`)
        .on("click", (mouseEvent, cell) => onCellClick(cell));
    world.forEachCell((cell) => {
        cell.subscribe((cell) => {
            const cellColor = getCellColor(cell);
            d3.select(`#cell_${cell.id}`).attr("fill", cellColor);
        });
    });
    getUpdate(onUpdate)();
};
export { initGraphics };

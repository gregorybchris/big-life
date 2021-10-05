const CELL_WIDTH = 18;
const CELL_HEIGHT = 18;
const SEPARATOR_WIDTH = 0;
const [WIDTH, HEIGHT] = [1000, 1000];
const [X_PADDING, Y_PADDING] = [10, 10];

const getCellColor = (cell) => {
  if (cell.alive) {
    return "#ffffff";
  }
  return "#404040";
};

const initializeGraphics = (world, onCellClick) => {
  const canvas = d3
    .select("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", `0 0 ${WIDTH} ${HEIGHT}`);

  // Cell squares
  canvas
    .selectAll("rect")
    .data([].concat(...world.cells))
    .enter()
    .append("rect")
    .classed("cell-marker", true)
    .attr("x", (cell) => {
      return cell.x * CELL_WIDTH + X_PADDING;
    })
    .attr("y", (cell) => cell.y * CELL_HEIGHT + Y_PADDING)
    .attr("width", CELL_WIDTH)
    .attr("height", CELL_HEIGHT)
    .attr("stroke-width", SEPARATOR_WIDTH)
    .attr("stroke", "rgb(40, 40, 40)")
    .attr("fill", getCellColor)
    .attr("id", (cell) => `cell_marker_${cell.id}`)
    .on("click", (mouseEvent, cell) => onCellClick(cell));
};

const rerenderGraphics = (game) => {
  game.world.cells.forEach((row) => {
    row.forEach((cell) => {
      // Update cell marker colors
      d3.select(`#cell_marker_${cell.id}`).attr("fill", getCellColor(cell));
    });
  });

  // Update page text
  // d3.select("#score").text(`Score: ${game.score}`);
  // d3.select("#active").text(`Placing: ${game.activeEntity.name}`);
  // d3.select("#turns").text(`Turns: ${game.turns}`);
};

export { initializeGraphics, rerenderGraphics };

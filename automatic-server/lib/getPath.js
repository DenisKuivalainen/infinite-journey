const pf = require("pathfinding");
const matrix = require("../matrix/pathfinding.json");

const getPath = ([a, b], [c, d]) => {
  const grid = new pf.Grid(matrix);

  const finder = new pf.AStarFinder({
    allowDiagonal: true,
  });

  return finder.findPath(a, b, c, d, grid);
};

module.exports = getPath;

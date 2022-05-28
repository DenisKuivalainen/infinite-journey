const pf = require("pathfinding");
const { getPathfinding } = require("./getMatrix");

const getPath = async ([a, b], [c, d]) => {
  const grid = new pf.Grid(await getPathfinding());

  const finder = new pf.AStarFinder({
    allowDiagonal: true,
  });

  return finder.findPath(a, b, c, d, grid);
};

module.exports = getPath;

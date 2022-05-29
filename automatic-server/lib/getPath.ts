import pf from "pathfinding";
import matrix from "./getMatrix";

export default async ([a, b]: [number, number], [c, d]: [number, number]) => {
  const grid = new pf.Grid(await matrix.getPathfinding());

  const finder = new pf.AStarFinder();

  return finder.findPath(a, b, c, d, grid) as [number, number][];
};

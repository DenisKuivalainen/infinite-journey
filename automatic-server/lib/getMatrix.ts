import getters from "./getters";
import pixels from "image-pixels";
import ramda from "ramda";

const splitArr = <T>(arr: T[], chunk: number) =>
  arr.reduce((resultArray: T[][], item: T, index) => {
    const chunkIndex = Math.floor(index / chunk);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new chunk
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);

const calculateSurface = (arr: number[][]) => arr.map(([r, g, b]) => r + g + b);

const getSurfaceMatrix = ({
  data,
  width,
}: {
  data: number[];
  width: number;
}): number[][] =>
  ramda.compose(
    (arr: number[]) => splitArr<number>(arr, width),
    calculateSurface,
    (arr: number[]) => splitArr<number>(arr, 4)
  )(data);

const getSurface = (arr: number[][]): number[][] =>
  arr.map((a) =>
    a.map((c) => {
      switch (c) {
        case 0:
          // Non-walkable
          return 1;
        case 255:
          // Water
          return 2;
        default:
          // Ground
          return 0;
      }
    })
  );

const getPathfindingMatrix = (arr: number[][]): number[][] =>
  arr.map((a) => a.map((c) => (c === 0 ? 1 : 0)));

const _getSurface = async () => {
  const { season } = await getters.getTime();
  return await pixels(`${__dirname}/../../pictures/${season}.png`)
    .then(getSurfaceMatrix)
    .then(getSurface);
};

const getPathfinding = async () => {
  const { season } = await getters.getTime();
  return await pixels(`${__dirname}/../../pictures/${season}.png`)
    .then(getSurfaceMatrix)
    .then(getPathfindingMatrix);
};

export default {
  getSurface: _getSurface,
  getPathfinding,
};

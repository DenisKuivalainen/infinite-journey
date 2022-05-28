const pixels = require("image-pixels");
const ramda = require("ramda");
const fs = require("fs");

const splitArr = (arr, chunk) =>
  arr.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / chunk);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new chunk
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);

const calculateSurface = (arr) => arr.map(([r, g, b]) => r + g + b);

const getSurfaceMatrix = ({ data, width }) =>
  ramda.compose(
    (arr) => splitArr(arr, width),
    calculateSurface,
    (arr) => splitArr(arr, 4)
  )(data);

const getSurface = (arr) =>
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

const getPathfindingMatrix = (arr) =>
  arr.map((a) => a.map((c) => (c === 0 ? 1 : 0)));

const saveToFile = (arr, name) =>
  fs.writeFileSync(`${__dirname}/../matrix/${name}.json`, JSON.stringify(arr));

const recordMatixes = (s) => (arr) => {
  saveToFile(getPathfindingMatrix(arr), `pathfinding/${s}`);
  saveToFile(getSurface(arr), `surface/${s}`);
};

const generate = (s) =>
  pixels(`${__dirname}/../pictures/${s}.png`)
    .then(getSurfaceMatrix)
    .then(recordMatixes(s));

for (let i = 1; i < 20; i++) {
  generate(i);
}

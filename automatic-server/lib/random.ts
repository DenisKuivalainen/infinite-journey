export const weightedRand = (spec: Record<string, number>) => {
  let table: string[] = [];
  for (const i in spec) {
    // The constant 10 below should be computed based on the
    // weights in the spec for a correct and optimal table size.
    // E.g. the spec {0:0.999, 1:0.001} will break this impl.
    for (let j = 0; j < spec[i] * 10; j++) {
      table.push(i);
    }
  }

  return table[Math.floor(Math.random() * table.length)];
};

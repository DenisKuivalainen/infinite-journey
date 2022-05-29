const getSeasonNumber = (day: number) => {
  let d = 0;

  if (day <= 15) {
    d = 15 - day;
  } else {
    const _day = day - 15;
    if (_day <= 183) d = _day;
    else d = 366 + 15 - day;
  }

  if (d <= 40) {
    return 1;
  } else if (d >= 142) {
    return 19;
  } else if (d <= 90) {
    return Math.ceil((d - 40) / 5) + 1;
  } else if (d <= 132) {
    return Math.ceil((d - 90) / 7) + 11;
  } else {
    return 18;
  }
};

const seasonBirth = (n: number) => {
  const b = 10 + n;
  return [b - 10, b];
};

const seasonDeath = (n: number) => {
  const d = 19 - n / 2;
  return [d - 5, d + 5];
};

export default {
  getSeason: (day: number) => getSeasonNumber(day),
  getBirthRatio: (day: number) => seasonBirth(getSeasonNumber(day)),
  getDeathRatio: (day: number) => seasonDeath(getSeasonNumber(day)),
};

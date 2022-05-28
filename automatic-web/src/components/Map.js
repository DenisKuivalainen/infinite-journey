import { useEffect, useState } from "react";
import { useGameTime } from "./Clock";
import { useGame } from "./GameProvider";
import ImageFilter from "react-image-filter";

export default ({ z = 10 }) => {
  const { height, width, game } = useGame();

  const [HH, MM] = useGameTime();
  const [[r, g, b], setFilter] = useState([1, 1, 1]);

  useEffect(() => {
    let now = HH * 60 + MM;
    if(now  >=24 * 60) now -= 24 * 60

    const s = (10 - game.season) * 12
    
    if (now > (19 * 60 - s) && now <= 21 * 60 + 30 - s) {
      const from = 19 * 60 - s + 1;
      console.log((19 * 60 - s + 1)/ 60, HH, s)
      const to = 21 * 60 + 30 - s;
      const k = (0.3 * (now - from)) / (to - from);
      setFilter([1 - k, 1 - k, 1 + k]);
    } else if (now > 21 * 60 + 30 - s || now <= 4 * 60 + s) {
      setFilter([0.7, 0.7, 1.3]);
    } else if (now > 4 * 60+ s && now <= 5 * 60 + s) {
      const from = 4 * 60 + s + 1;
      const to = 5 * 60 + s;
      const k = (0.45 * (now - from)) / (to - from);
      setFilter([0.7 + k, 0.7, 1.3]);
    } else if (now > 5 * 60 + s && now <= 6 * 60 + 30 + s) {
      const from = 5 * 60 + s + 1;
      const to = 6 * 60 + 30 + s;
      const k = (0.3 * (now - from)) / (to - from);
      setFilter([1.15, 0.7 + k, 1.3 - k]);
    } else if (now > 6 * 60 + 30 + s && now <= 7 * 60 + s) {
      const from = 6 * 60 + 31 + s;
      const to = 7 * 60 + s;
      const k = (0.15 * (now - from)) / (to - from);
      setFilter([1.15 - k, 1, 1]);
    }
    if (now > 7 * 60 + s && now <= 19 * 60 - s) {
      setFilter([1, 1, 1]);
    }
  }, [HH, MM]);

  const filter = [r, 0, 0, 0, 0, 0, g, 0, 0, 0, 0, 0, b, 0, 0, 0, 0, 0, 1, 0];

  return (
    <div style={{ width, height, position: "absolute", zIndex: z }}>
      <ImageFilter
        image={`/pictures/map/${game.season}.jpg`}
        filter={filter}
        style={{ width, height }}
      />
    </div>
  );
};

import { useEffect, useState } from "react";
import { useGameTime } from "./Clock";
import { useGame } from "./GameProvider";
import ImageFilter from "react-image-filter";

export default ({ z = 10 }) => {
  const { height, width, loaded } = useGame();

  const [HH, MM] = useGameTime();
  const [[r, g, b], setFilter] = useState([1, 1, 1]);

  useEffect(() => {
    const now = HH * 60 + MM;
    if (now > 19 * 60 && now <= 21 * 60 + 30) {
      const from = 19 * 60 + 1;
      const to = 21 * 60 + 30;
      const k = (0.3 * (now - from)) / (to - from);
      setFilter([1 - k, 1 - k, 1 + k]);
    } else if (now > 21 * 60 + 30 || now <= 4 * 60) {
      setFilter([0.7, 0.7, 1.3]);
    } else if (now > 4 * 60 && now <= 5 * 60) {
      const from = 4 * 60 + 1;
      const to = 5 * 60;
      const k = (0.45 * (now - from)) / (to - from);
      setFilter([0.7 + k, 0.7, 1.3]);
    } else if (now > 5 * 60 && now <= 6 * 60 + 30) {
      const from = 5 * 60 + 1;
      const to = 6 * 60 + 30;
      const k = (0.3 * (now - from)) / (to - from);
      setFilter([1.15, 0.7 + k, 1.3 - k]);
    } else if (now > 6 * 60 + 30 && now <= 7 * 60) {
      const from = 6 * 60 + 31;
      const to = 7 * 60;
      const k = (0.15 * (now - from)) / (to - from);
      setFilter([1.15 - k, 1, 1]);
    }
    if (now > 7 * 60 && now <= 19 * 60) {
      setFilter([1, 1, 1]);
    }
  }, [HH, MM]);

  const filter = [r, 0, 0, 0, 0, 0, g, 0, 0, 0, 0, 0, b, 0, 0, 0, 0, 0, 1, 0];

  return (
    <div style={{ width, height, position: "absolute", zIndex: z }}>
      <ImageFilter
        image="/pictures/map.jpg"
        filter={filter}
        style={{ width, height }}
      />
      {/* <img src="/pictures/map.jpg" alt="map" style={{ width, height }} /> */}
    </div>
  );
};

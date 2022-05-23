import { useEffect, useState } from "react";
import { useGame } from "./GameProvider";

export const useGameTime = () => {
  const { game, loaded } = useGame();
  const time = game?.time,
    timestamp = game?.timestamp;

  const [gameTime, setTime] = useState([0, 0]);
  const [ts, setTs] = useState(0);

  const getTime = (now) => {
    if (!time || !timestamp) return;
    const msPassed = now - timestamp;
    const minsPassed = msPassed / 60000;
    const totalMins = Math.floor(
      time.hours * 60 + time.minutes + minsPassed * 12
    );
    const hours = Math.floor(totalMins / 60);
    const minutes = Math.floor(totalMins - hours * 60);

    setTime([hours, minutes]);
  };

  const loopGetTime = async () => {
    while (true) {
      setTs(Date.now());
      await new Promise((res) => setTimeout(res, 1000));
    }
  };

  useEffect(() => {
    loopGetTime();
  }, []);

  useEffect(() => {
    getTime(ts);
  }, [ts]);

  return gameTime;
};

export default ({ z = 10 }) => {
  const [HH, MM] = useGameTime();
  const { height, width, loaded } = useGame();

  return (
    <div style={{ width, height, position: "absolute", zIndex: z }}>
      {HH < 10 ? `0${HH}` : HH}:{MM < 10 ? `0${MM}` : MM}
    </div>
  );
};

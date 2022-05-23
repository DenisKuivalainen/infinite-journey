import { useGame } from "./components/GameProvider";
import GameWrapper from "./components/GameWrapper";
import Map from "./components/Map";
import Players from "./components/Players";
import Buildings from "./components/Buildings";
import Clock from "./components/Clock";
import Loader from "./components/Loader";
import Info from "./components/Info";

export default () => {
  const { loaded } = useGame();

  return (
    <GameWrapper>
      <Loader z={100} />
      {loaded
        ? [
            <Map z={0} />,
            <Clock z={5} />,
            <Players z={15} />,
            <Buildings.Towns z={10} />,
            <Info z={50} />,
          ]
        : []}
    </GameWrapper>
  );
};

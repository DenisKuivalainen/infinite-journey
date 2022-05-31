import { useGame } from "./components/GameProvider";
import GameWrapper from "./components/GameWrapper";
import Map from "./components/Map";
import Players from "./components/Players";
import Buildings from "./components/Buildings";
import Clock from "./components/Clock";
import Loader from "./components/Loader";
import Info from "./components/Info";
import Travelers from "./components/Travelers";

export default () => {
  const { loaded } = useGame();

  return (
    <GameWrapper>
      <Loader z={600} />
      {loaded
        ? [
            <Map z={0} />,
            <Clock z={5} />,
            <Players z={400} />,
            <Travelers z={100} />,
            <Buildings.Towns z={10} />,
            <Info z={500} />,
          ]
        : []}
    </GameWrapper>
  );
};

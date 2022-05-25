import { useEffect, useState } from "react";
import { useGame } from "./GameProvider";

const PlayerInfo = ({ name }) => <p>{name}</p>;

const TownInfo = ({ name, population }) => (
  <p style={{ textAlign: "center" }}>
    {name}
    <br />
    {population}
  </p>
);

const Clicker = ({ data, onEnter, onLeave }) => {
  const { width, height } = useGame();
  const { id, location } = data;

  return (
    <div
      id={`clicker_${id}`}
      style={{
        position: "absolute",
        transform: `translate(-10px, -10px)`,
        marginLeft: location[0],
        marginTop: location[1],
        height: 20,
        width: 20,
      }}
      onMouseEnter={() => onEnter(id)}
      onMouseLeave={onLeave}
    />
  );
};

const Clickers = ({ data, z, onEnter, onLeave }) => {
  const { width, height } = useGame();

  return (
    <div style={{ width, height, position: "absolute", zIndex: z }}>
      {data.map((d) => (
        <Clicker data={d} onEnter={onEnter} onLeave={onLeave} />
      ))}
    </div>
  );
};

const Info = ({ z, selected, data }) => {
  const { height, width } = useGame();
  if (!selected) return <></>;

  const selectedData = data.filter((d) => d.id === selected)[0];
  const [w, h] = selectedData.size,
    [x, y] = selectedData.location;

  console.log(x, y, w, h, width, height);

  return (
    <div style={{ width, height, zIndex: z }}>
      <div
        style={{
          width: (w * height) / 750,
          height: (h * height) / 750,
          marginLeft:
            x - w / 2 - 30 > 0 && x + w / 2 + 30 < width
              ? x
              : x - w / 2 - 30 <= 0
              ? 30 + w / 2
              : width - w / 2 - 30,
          marginTop:
            y > height / 2
              ? y - 45 /*this is calculated not correct */
              : y + 15,
          position: "absolute",
          transform: `translate(-${w / 2}px, -${h / 2}px)`,
        }}
      >
        {selectedData.component}
      </div>
    </div>
  );
};

export default ({ z = 10 }) => {
  const { map, game, height } = useGame();

  const [data, setData] = useState([]);

  useEffect(() => {
    const townsData = map.towns.map((t) => ({
      id: `town_${t.id}`,
      component: <TownInfo name={t.name} population={t.population} />,
      location: t.location.map((l) => (l * height) / 750),
      size: [100, 10],
    }));

    setData([...townsData]);
  }, []);

  const [selected, setSelected] = useState(undefined);

  return (
    <>
      <Clickers
        z={z + 1}
        data={data}
        onEnter={setSelected}
        onLeave={() => setSelected(undefined)}
      />
      <Info z={z} selected={selected} data={data} />
    </>
  );
};

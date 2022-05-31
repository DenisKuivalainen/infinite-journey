import { useGame } from "./GameProvider";

export default ({ z = 10, showPopup }) => {
  const { game, width, height } = useGame();

  const players = game.travelers.map((p) => {
    return (
      <>
        <div
          key={p.id}
          style={{
            position: "absolute",
            marginLeft: ((p.position[0] || 0) * width) / 1000,
            marginTop: ((p.position[1] || 0) * height) / 750,
            transform: `translate(-${3.5}px, -${6.3}px)`,
            fontSize: 7,
            height: 7,
            width: 7,
          }}
        >
          {p.action === "WALK" ? "🚶🏼‍♂️" : p.action === "SWIM" ? "🚣🏼‍♂️" : "⛺️"}
        </div>
      </>
    );
  });

  return (
    <div style={{ width, height, position: "absolute", zIndex: z }}>
      {players}
    </div>
  );
};

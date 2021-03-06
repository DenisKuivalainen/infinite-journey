import { useGame } from "./GameProvider";

export default ({ z = 10, showPopup }) => {
  const { game, width, height } = useGame();

  const players = game.players.map((p) => {
    return (
      <>
        <div
          style={{
            marginLeft: ((p.position[0] || 0) * width) / 1000,
            marginTop: ((p.position[1] || 0) * height) / 750,
            color: p.color || "red",
            transform: `translate(-${5}px, -${9}px)`,
            fontSize: 10,
            height: 10,
            width: 10,
          }}
        >
          {p.action === "WALK" ? "🚶🏻" : p.action === "SWIM" ? "⛵️" : "⛺️"}
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

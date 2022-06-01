import { useEffect, useState } from "react";
import { useGame } from "./GameProvider";
import pixels from "image-pixels";

const Town = ({t}) => {
  const { height, width } = useGame();
  const pictSrc = `/pictures/${t.country}_${t.size}.png`;

  const [pic, setPic] = useState({})
  const getPic = async () => {
    setPic(await pixels(pictSrc).then(p => ({w: p.width, h: p.height})))
  }
  useEffect(() => {
    getPic()
  }, [])

  const _height =
    ((t.size === "BIG"
      ? 20
      : t.size === "MEDIUM" || t.size === "TOWER"
      ? 15
      : 10) *
      height) /
    750;

  let components = [ 
    <img
      style={{
        position: "absolute",
        transform: `translate(-${_height / 2}px, -${_height * 0.8}px)`,
        marginLeft: (t.location[0] * width) / 1000,
        marginTop: (t.location[1] * height) / 750,
        height: _height,
      }}
      src={pictSrc}
      key={t.id}
      id={t.id}
    />]

      return components
}

const Towns = ({ z = 10, setPopup }) => {
  const { map, height, width } = useGame();

  const towns = map.towns.map((t) => <Town t={t} />);

  return (
    <div style={{ width, height, position: "absolute", zIndex: z }}>
      {towns}
    </div>
  );
};

export default {
  Towns,
};

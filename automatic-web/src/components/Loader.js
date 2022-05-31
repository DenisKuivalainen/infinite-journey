import { useGame } from "./GameProvider";
import "../rotate.css";
import { useEffect, useState } from "react";

export default ({ z = 10 }) => {
  const { width, height, windowHeight, windowWidth, loaded } = useGame();

  const marginTop = loaded ? (windowHeight - height) / 2 : 0,
    marginLeft = loaded ? (windowWidth - width) / 2 : 0;

  const [show, setShow] = useState(true);
  useEffect(() => {
    console.log(show & loaded);
    if (show && loaded) setTimeout(() => setShow(false), 2000);
  }, [loaded]);

  if (!show) return <></>;
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        position: "absolute",
        zIndex: z,
        backgroundColor: "black",
        color: "white",
        opacity: 0,
        ...(loaded ? { opacity: 0, transition: "all 1s linear 1s" } : {}),
      }}
    >
      <div
        style={{
          marginLeft: `calc(50% - ${marginLeft / 2}px)`,
          top: `calc(50% - ${marginTop / 2}px)`,
          position: "absolute",
        }}
      >
        <div
          style={{
            height: 200,
            width: 200,
            transform: "translate(-100px, -100px)",
          }}
        >
          <img
            className="rotating"
            src={"/pictures/loading.png"}
            style={{
              height: 200,
              width: 200,
            }}
          />
        </div>
      </div>
    </div>
  );
};

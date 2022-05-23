import { useGame } from "./GameProvider";
import NoSleep from "nosleep.js";
import { useEffect, Children, cloneElement, useState } from "react";

export default ({ children }) => {
  const { width, height, windowHeight, windowWidth, loaded, map } = useGame();

  const noSleep = new NoSleep();

  useEffect(() => {
    noSleep.enable();
  }, []);

  const [popups, setPopups] = useState([]);
  const setPopup = (data) => setPopups([...popups, data]);

  const [showPopup, setShowPopup] = useState(false);
  const DefaultPopupComponent = () => <></>;
  const [popupProps, setPopupProps] = useState({
    id: "",
    component: <DefaultPopupComponent />,
    location: [0, 0],
    size: [0, 0],
  });

  const _showPopup = (id, component, location, size) => {
    console.log("1");
    const _id = popupProps.id;
    setPopupProps({
      id,
      component,
      location,
      size,
    });
    setShowPopup(id === _id ? false : true);
  };

  const Popup = () => {
    return <></>;
    if (!showPopup) return <></>;
    const [w, h] = popupProps.size,
      [x, y] = popupProps.location;

    console.log(x, y, w, h, width, height);

    return (
      <div style={{ width, height, zIndex: 1000 }}>
        <div
          style={{
            width: w,
            height: h,
            marginLeft:
              x - w / 2 - 30 > 0 && x + w / 2 + 30 < width
                ? x
                : x - w / 2 - 30 <= 0
                ? 30 + w / 2
                : width - w / 2 - 30,
            marginTop: y > height / 2 ? y - 30 : y + 30,
          }}
        >
          {popupProps.component}
        </div>
      </div>
    );
  };

  const marginTop = loaded ? (windowHeight - height) / 2 : 0,
    marginLeft = loaded ? (windowWidth - width) / 2 : 0;

  return (
    <div
      style={{
        height: loaded ? windowHeight : "100vh",
        width: loaded ? windowWidth : "100vw",
      }}
    >
      <div
        style={{
          width: `calc(100% - ${marginLeft}px)`,
          height: `calc(100% - ${marginTop}px)`,
          position: "relative",
          marginTop,
          marginLeft,
        }}
      >
        {/* {children} */}
        {Children.map(children, (ch) =>
          cloneElement(ch, { setPopup: setPopup })
        )}
      </div>
    </div>
  );
};

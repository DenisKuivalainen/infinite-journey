import axios from "axios";
import pixels from "image-pixels";
import { createContext, useContext, useEffect, useState } from "react";
import useDimensions from "../lib/useDimensions";

const GameContext = createContext({});

export const GameProvider = ({ children }) => {
  const url =
    new URL(document.location).searchParams.get("url") ||
    "http://localhost:8080";

  const [gameDataLoaded, setGameDataLoaded] = useState(false);
  const [gameData, setGameData] = useState({});

  const [mapDataLoaded, setMapDataLoaded] = useState(false);
  const [mapData, setMapData] = useState({});

  const [pictureLoaded, setPictureLoaded] = useState(false);

  useEffect(() => {
    axios.get(`${url}/map`).then((res) => {
      setMapData(res.data);
      setMapDataLoaded(true);
    });

    axios.get(url).then((res) => {
      setGameData(res.data);
      setGameDataLoaded(true);
    });
  }, []);

  const loopGetData = async () => {
    while (true) {
      axios.get(url).then((res) => setGameData(res.data));
      await new Promise((res) => setTimeout(res, 60000));
    }
  };

  useEffect(() => {
    loopGetData();
  }, []);

  const { height: windowHeight, width: windowWidth } = useDimensions();
  const [[width, height], setDimensions] = useState([0, 0]);
  const [[pw, ph], setPictureDimentions] = useState([0, 0]);

  useEffect(() => {
    if (!!pw & !!ph & !!windowHeight & !!windowWidth) {
      const pictureSize = pw / ph;
      const windowSize = windowWidth / windowHeight;
      if (pictureSize > windowSize) {
        setDimensions([windowWidth, (windowWidth * ph) / pw]);
      } else {
        setDimensions([(windowHeight * pw) / ph, windowHeight]);
      }
    }
  }, [pw, ph, windowWidth, windowHeight]);

  useEffect(() => {
    pixels("/pictures/map.jpg").then(({ width, height }) => {
      setPictureDimentions([width, height]);
      setPictureLoaded(true);
    });
  }, []);

  return (
    <GameContext.Provider
      value={{
        map: mapData,
        game: gameData,
        height,
        width,
        windowHeight,
        windowWidth,
        loaded: gameDataLoaded && mapDataLoaded && pictureLoaded,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const game = useContext(GameContext);
  return game;
};

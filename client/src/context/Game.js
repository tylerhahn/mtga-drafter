import axios from "axios";
import React, { createContext, useState } from "react";
import { SocketContext } from "./Socket";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [packs, setPacks] = useState([]);
  const [round, setRound] = useState(1);
  const [pick, setPick] = useState(1);
  const { socket } = React.useContext(SocketContext);

  React.useEffect(() => {
    if (socket) {
      socket.on("receivePack", (res) => {
        console.log(res);
        setPacks((packs) => [...packs, res.data]);
      });
    }
  }, [socket]);

  const removePack = () => {
    const currentPacks = [...packs];
    currentPacks.splice(0, 1);
    setPacks(currentPacks);
  };

  return (
    <GameContext.Provider
      value={{
        removePack,
        packs,
        round,
        setPacks,
        setRound,
        pick,
        setPick,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

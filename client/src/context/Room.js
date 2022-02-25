import React, { createContext, useState, useEffect, useContext } from "react";
import { SocketContext } from "./Socket";

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [room, setRoom] = useState();
  const [passDirection, setPassDirection] = useState();

  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if (socket) {
      socket.on("roomData", (res) => {
        console.log(res);
        setRoom(res);
        if (res.round === 1 || res.round === 3) {
          setPassDirection("r");
        } else {
          setPassDirection("l");
        }
      });
    }
  }, [socket]);

  return (
    <RoomContext.Provider
      value={{
        room,
        setRoom,
        passDirection,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

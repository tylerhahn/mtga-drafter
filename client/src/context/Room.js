import React, { createContext, useState, useEffect, useContext } from "react";
import { SocketContext } from "./Socket";

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [room, setRoom] = useState();

  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if (socket) {
      socket.on("roomData", (res) => {
        console.log(res);
        setRoom(res);
      });
    }
  }, [socket]);

  return (
    <RoomContext.Provider
      value={{
        room,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

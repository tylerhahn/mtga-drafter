import React, { createContext, useState, useEffect, useContext } from "react";
import { SocketContext } from "./Socket";

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [room, setRoom] = useState();
  const [passDirection, setPassDirection] = useState();
  const [loading, setLoading] = useState(false);
  const { socket } = useContext(SocketContext);
  const [roomId, setRoomId] = useState();

  useEffect(() => {
    const roomId = window.location.pathname.replace("/room/", "");
    setRoomId(roomId);
    if (socket) {
      socket.on("roomData", (res) => {
        if (loading) {
          setLoading(false);
        }
        setRoom(res);
        if (res.round === 1 || res.round === 3) {
          setPassDirection("r");
        } else {
          setPassDirection("l");
        }
      });
    }
  }, [socket]);

  const leaveRoom = () => {
    socket.disconnect();
    setRoom();
  };

  return (
    <RoomContext.Provider
      value={{
        roomId,
        room,
        loading,
        setLoading,
        setRoom,
        leaveRoom,
        passDirection,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

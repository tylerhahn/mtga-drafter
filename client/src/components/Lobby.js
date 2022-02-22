import React, { useContext, useState } from "react";
import { SocketContext } from "../context/Socket";
import { UserContext } from "../context/User";

const Lobby = () => {
  const { socket } = useContext(SocketContext);
  const [roomId, setRoomId] = useState();

  const { user } = useContext(UserContext);

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const roomId = urlParams.get("roomId");
    if (socket) {
      if (roomId && user) {
        console.log(user);
        setRoomId(roomId);
        socket.emit("join", { user: user, roomId: roomId });
      }
    }
  }, [user, socket]);

  React.useEffect(() => {
    if (socket) {
      socket.on("message", (res) => {
        console.log(res);
      });

      socket.on("roomData", (res) => {
        console.log(res);
      });
    }
  }, [socket]);

  return <div className="">{roomId ? roomId : null}</div>;
};

export default Lobby;

import _ from "lodash";
import React, { useContext, useState } from "react";
import { SocketContext } from "../context/Socket";
import { UserContext } from "../context/User";
import UserPortrait from "./UserPortrait";

const Lobby = () => {
  const { socket } = useContext(SocketContext);
  const [roomId, setRoomId] = useState();
  const [lobby, setLobby] = useState([]);
  const [boosters, setBoosters] = useState([]);

  const { user } = useContext(UserContext);

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const roomId = urlParams.get("roomId");
    if (socket) {
      if (roomId && user) {
        setRoomId(roomId);
        socket.emit("join", { user: user, roomId: roomId });
      }
    }
  }, [user, socket]);

  console.log(lobby);

  React.useEffect(() => {}, [socket]);
  const renderConnectedUsers = () => {
    return _.map(lobby.users, (user, index) => {
      if (user && user.data.cards) {
        return (
          <UserPortrait
            portraitId={user.data.cards[index].grpid}
            name={user.data.player_name}
          />
        );
      }
    });
  };

  return (
    <div className="p-3 relative">
      <div className="">{renderConnectedUsers()}</div>
    </div>
  );
};

export default Lobby;

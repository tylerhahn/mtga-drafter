import React, { useContext, useState } from "react";
import { RoomContext } from "../context/Room";
import { SocketContext } from "../context/Socket";
import { UserContext } from "../context/User";
import _ from "lodash";
import UserPortrait from "./UserPortrait";

const Header = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [credentials, setCredentials] = useState({});
  const { user, saveCredentials, socketUser } = useContext(UserContext);
  const { socket } = useContext(SocketContext);
  const { room } = useContext(RoomContext);
  const [roomId, setRoomId] = useState();

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

  React.useEffect(() => {
    if (user && user.user_id) {
      setCredentials({ userId: user.user_id, playerId: user.player_id });
      setShowLogin(false);
    }
  }, [user]);

  const startDraft = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const roomId = urlParams.get("roomId");
    socket.emit("startDraft", { roomId: roomId });
  };

  const renderConnectedUsers = () => {
    if (room && room.users) {
      return _.map(room.users, (user, index) => {
        if (user && user.data.cards) {
          return (
            <UserPortrait
              key={index}
              portraitId={user.data.cards[index].grpid}
              name={user.data.player_name}
            />
          );
        }
      });
    }
  };

  return (
    <div className="flex m-auto items-center justify-between">
      <div>
        <div className="flex flex-wrap ">{renderConnectedUsers()}</div>
      </div>
      <div>
        <div className="flex items-center">
          <button
            onClick={() => setShowLogin(!showLogin)}
            className="rounded px-3 py-2 border-b-4 border-l-2 shadow-lg bg-green-500 border-blue-900 text-white"
          >
            {user && user.player_name ? user.player_name : "Login"}
          </button>

          {showLogin && (
            <div className="flex items-center">
              <input
                onChange={(e) =>
                  setCredentials({ ...credentials, playerId: e.target.value })
                }
                value={credentials.playerId}
                type="text"
                className="px-3 py-2 rounded placeholder-blue w-full p-0 no-outline text-gray-500 border-b-4 border-l-2 shadow-lg"
                placeholder="Player Id"
              />
              <input
                type="text"
                value={credentials.userId}
                onChange={(e) =>
                  setCredentials({ ...credentials, userId: e.target.value })
                }
                className="px-3 py-2 rounded placeholder-blue w-full p-0 no-outline text-gray-500 border-b-4 border-l-2 shadow-lg"
                placeholder="User Id"
              />
              <button
                onClick={() =>
                  saveCredentials(credentials.userId, credentials.playerId)
                }
                className="rounded px-3 py-2 border-b-4 border-l-2 shadow-lg bg-green-500 border-blue-900 text-white"
              >
                {user && user.name ? user.name : "Save"}
              </button>
            </div>
          )}
          {socketUser && socketUser.user.host && !room.draftActive && (
            <button
              onClick={() => startDraft()}
              className="rounded px-3 py-2 border-b-4 border-l-2 shadow-lg bg-green-500 border-blue-900 text-white"
            >
              Start Draft
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

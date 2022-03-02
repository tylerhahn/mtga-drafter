import React, { useContext, useState } from "react";
import { RoomContext } from "../context/Room";
import { SocketContext } from "../context/Socket";
import { UserContext } from "../context/User";
import _ from "lodash";
import UserPortrait from "./UserPortrait";
import Modal from "./Modal";
import axios from "axios";
import { currentSets } from "../currentSets";
import "tw-elements";
const Header = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [credentials, setCredentials] = useState({});
  const { user, saveCredentials, socketUser } = useContext(UserContext);
  const { socket } = useContext(SocketContext);
  const { room, setRoom } = useContext(RoomContext);
  const [roomId, setRoomId] = useState();
  const [untappedUrl, setUntappedUrl] = useState();
  const [sets, setSets] = useState();
  const [activeSets, setActiveSets] = useState();
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

  const getSet = () => {
    axios
      .get("https://api.scryfall.com/sets")
      .then((res) => {
        const arenaSets = _.filter(res.data.data, (x) => {
          return x.arena_code && x.icon_svg_uri;
        });

        setSets(arenaSets);
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    if (user && user.user_id) {
      setCredentials({ userId: user.user_id, playerId: user.player_id });
      setShowLogin(false);
    }
    getSet();
    setActiveSets(currentSets);
    console.log(currentSets);
  }, [user]);

  const startDraft = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const roomId = urlParams.get("roomId");
    socket.emit("startDraft", { roomId: roomId, activeSets });
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

  const leaveRoom = () => {
    socket.disconnect();
    setRoom();
  };

  const changeSets = (set) => {
    if (activeSets.includes(set)) {
      setActiveSets(
        _.filter(activeSets, (x) => {
          return x != set;
        })
      );
      return;
    } else {
      setActiveSets([...activeSets, set]);
    }
  };

  const renderSets = () => {
    return _.map(sets, (set) => {
      if (parseFloat(set.released_at.split("-")[0]) > 2017) {
        return (
          <div
            onClick={() => changeSets(set.arena_code)}
            className={`rounded m-2 flex items-center p-2 cursor-pointer ${
              activeSets.includes(set.arena_code)
                ? "bg-green-500"
                : "bg-gray-100"
            }`}
          >
            <img
              className=" block"
              style={{ width: 20, height: 20 }}
              src={set.icon_svg_uri}
            />
            <p className="pl-3">{set.name}</p>
          </div>
        );
      }
    });
  };

  return (
    <div className="flex w-11/12 m-auto items-center justify-between">
      <div>
        <div className="flex flex-wrap ">{renderConnectedUsers()}</div>
      </div>
      <div>
        <div className="flex items-baseline">
          {user && room && (
            <div className="flex">
              <button
                onClick={() => leaveRoom()}
                className="rounded px-3 py-2 border-1  shadow-lg border-red-900 mr-3 text-white"
              >
                Leave Room
              </button>
            </div>
          )}

          <button
            onClick={() => setShowLogin(!showLogin)}
            className="rounded px-3 py-2 border-b-4 border-l-2 shadow-lg bg-green-500 border-blue-900 text-white"
          >
            {user && user.player_name ? user.player_name : "Login"}
          </button>

          {showLogin && (
            <div className="flex items-baseline">
              <div className="block">
                <input
                  onChange={(e) => setUntappedUrl(e.target.value)}
                  value={credentials.playerId}
                  type="text"
                  className="px-3 py-2 rounded placeholder-blue w-full p-0 no-outline text-gray-500 border-b-4 border-l-2 shadow-lg"
                  placeholder="Player Id"
                />

                <p className="text-gray-200" style={{ fontSize: 10 }}>
                  Url starts with: https://mtga.untapped.gg/profile/
                </p>
              </div>

              <button
                onClick={() => saveCredentials(untappedUrl)}
                className="rounded px-3 py-2 border-b-4 border-l-2 shadow-lg bg-green-500 border-blue-900 text-white"
              >
                {user && user.name ? user.name : "Save"}
              </button>
            </div>
          )}
          {socketUser && socketUser.user.host && !room.draftActive && (
            <>
              <button
                onClick={() => startDraft()}
                className="rounded px-3 py-2 border-b-4 border-l-2 shadow-lg bg-green-500 border-blue-900 text-white"
              >
                Start Draft
              </button>
              <i className="pl-4 text-gray-100 fa-solid fa-gear"></i>
              <Modal title="Card Pool">
                <div className="flex mb-4">
                  <button
                    onClick={() => setActiveSets(currentSets)}
                    className="mr-4 rounded px-3 py-2 border-b-4 border-l-2 shadow-lg bg-green-500 border-blue-900 text-white"
                  >
                    All
                  </button>
                  <button
                    onClick={() => setActiveSets([])}
                    className="rounded px-3 py-2 border-b-4 border-l-2 shadow-lg bg-green-500 border-blue-900 text-white"
                  >
                    None
                  </button>
                </div>
                <div class="flex justify-center flex-wrap">{renderSets()}</div>
              </Modal>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

import React, { useContext, useState } from "react";
import { UserContext } from "../context/User";
import G from "../assets/G.svg";
import R from "../assets/R.svg";
import U from "../assets/U.svg";
import B from "../assets/B.svg";
import W from "../assets/W.svg";
import { CSSTransition } from "react-transition-group";
import { RoomContext } from "../context/Room";

const Home = () => {
  const [createdRoom, setCreatedRoom] = useState();
  const [credentials, setCredentials] = useState({});
  const [untappedUrl, setUntappedUrl] = useState();
  const { user, loggedIn, saveCredentials } = useContext(UserContext);
  const { leaveRoom } = useContext(RoomContext);

  React.useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]);

  const handleRoomButton = (type) => {
    if (type === "create") {
      window.location.href = `/room/${createdRoom}`;
    }
  };
  return (
    <div className="h-screen bg-gray-900">
      <div className="flex items-center h-full justify-center">
        <div className="flex items-baseline w-2/5 flex-wrap">
          <h1 className="text-white font-bold text-4xl m-auto w-full text-center">
            MTGA Drafter
          </h1>

          <div className="flex p-4 m-auto mb-4">
            <img className="w-10 h-10 mr-5" src={G} alt="" />
            <img className="w-10 h-10 mr-5" src={R} alt="" />
            <img className="w-10 h-10 mr-5" src={U} alt="" />
            <img className="w-10 h-10 mr-5" src={B} alt="" />
            <img className="w-10 h-10 mr-5" src={W} alt="" />
          </div>
          <CSSTransition
            in={!loggedIn}
            unmountOnExit
            timeout={200}
            classNames="dialog"
          >
            <div>
              <div className="block mb-3 flex w-full">
                <div className="w-4/5">
                  <input
                    onChange={(e) => setUntappedUrl(e.target.value)}
                    value={credentials.playerId}
                    type="text"
                    className="px-3 py-2 rounded placeholder-blue w-full p-0 no-outline text-gray-500 border-b-4 border-l-2 shadow-lg"
                    placeholder="Paste untapped.gg profile url here"
                  />
                </div>
                <button
                  onClick={() => saveCredentials(untappedUrl)}
                  className="w-1/5 rounded px-3 py-2 border-b-4 border-l-2 shadow-lg bg-green-500 border-blue-900 text-white"
                >
                  {user && user.name ? user.name : "Login"}
                </button>
              </div>

              <div className="block w-full">
                <a
                  target="_blank"
                  href="https://mtga.untapped.gg/profile/"
                  onClick={() => saveCredentials(untappedUrl)}
                  className="rounded w-full px-3 py-2 border-b-4 border-l-2 shadow-lg bg-green-500 border-blue-900 text-white table text-center"
                >
                  Get Untapped Url
                </a>
                <ul className="text-gray-100 pt-5 m-auto">
                  <li>
                    <h3 className="font-bold text-lg pb-3">Steps</h3>
                  </li>
                  <li>
                    1: Log into
                    <a
                      target="_blank"
                      className="text-green-500 px-1"
                      href="https://mtga.untapped.gg/profile"
                    >
                      https://mtga.untapped.gg/profile
                    </a>
                    and copy the url.
                  </li>
                  <li>2: Paste that url into the field above and hit Login.</li>
                </ul>
              </div>
            </div>
          </CSSTransition>

          <CSSTransition
            in={loggedIn}
            unmountOnExit
            timeout={1000}
            classNames="dialog"
          >
            <div className="w-full max-w-2xl ">
              <div className="mb-3 flex justify-center">
                <input
                  onChange={(e) => setCreatedRoom(e.target.value)}
                  value={createdRoom}
                  type="text"
                  className="col-6 lg:col-5 px-3 py-2 rounded placeholder-blue p-0 no-outline text-gray-500 border-b-4 border-l-2 shadow-lg"
                  placeholder="Enter Room Id"
                />
                <button
                  onClick={() => handleRoomButton("create")}
                  className="col-2 rounded  px-3 py-2 border-b-4 border-l-2 shadow-lg bg-green-500 border-blue-900 text-white"
                >
                  Create
                </button>
                <button
                  onClick={() => handleRoomButton("join")}
                  className="col-2 rounded px-3 py-2 border-b-4 border-l-2 shadow-lg bg-green-500 border-blue-900 text-white"
                >
                  Join
                </button>
              </div>
            </div>
          </CSSTransition>
          <CSSTransition
            in={loggedIn}
            unmountOnExit
            timeout={1000}
            classNames="dialog"
          >
            <div className="flex items-center justify-center m-auto">
              {user ? (
                <h2 className=" text-gray-100 mr-4">{user.player_name}</h2>
              ) : (
                "null"
              )}
              <button
                onClick={() => leaveRoom()}
                className="border-b-2  shadow-lg border-b-red-900 mr-3 text-white"
              >
                Logout
              </button>
            </div>
          </CSSTransition>
        </div>
      </div>
    </div>
  );
};

export default Home;

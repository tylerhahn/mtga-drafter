import React, { useContext, useState } from "react";
import { SocketContext } from "../context/Socket";
import { UserContext } from "../context/User";

const Header = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [credentials, setCredentials] = useState({});
  const { user, saveCredentials } = useContext(UserContext);
  const socket = useContext(SocketContext);

  React.useEffect(() => {
    if (user && user.user_id) {
      console.log(user);

      setCredentials({ userId: user.user_id, playerId: user.player_id });
      setShowLogin(false);
    }
  }, [user]);

  return (
    <div className="bg-gray-500">
      <div className="flex py-3 px-5">
        <div className="flex items-center">
          <button
            onClick={() => setShowLogin(!showLogin)}
            class="rounded px-3 py-2 m-1 border-b-4 border-l-2 shadow-lg bg-green-500 border-blue-900 text-white"
          >
            {user && user.player_name ? user.player_name : "Login"}
          </button>
        </div>
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
              class="rounded px-3 py-2 m-1 border-b-4 border-l-2 shadow-lg bg-green-500 border-blue-900 text-white"
            >
              {user && user.name ? user.name : "Save"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;

import axios from "axios";
import React, { createContext, useContext } from "react";
import { SocketContext } from "./Socket";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState();
  const [socketUser, setSocketUser] = React.useState();
  const [meta, setMeta] = React.useState([]);

  const { socket } = useContext(SocketContext);

  React.useEffect(() => {
    if (socket) {
      socket.on("userData", (res) => {
        setSocketUser(res);
      });
    }
  }, [socket]);

  console.log(socketUser);

  const saveCredentials = (userId, playerId) => {
    if (userId && playerId) {
      let crendentials = { userId: userId, playerId: playerId };
      localStorage.setItem("mtgadCredentials", JSON.stringify(crendentials));
      fetchLocalData();
    }
  };

  const prodUrl = "https://mtga-anywhere.herokuapp.com";

  const fetchLocalData = () => {
    const localCredentials = localStorage.getItem("mtgadCredentials");
    if (localCredentials) {
      const parsedCrendentials = JSON.parse(localCredentials);

      if (parsedCrendentials.playerId && parsedCrendentials.userId) {
        axios
          .get(
            `${prodUrl}/https://api.mtga.untapped.gg/api/v1/account/collections/${parsedCrendentials.playerId}?user_id=${parsedCrendentials.userId}`
          )
          .then((userCollection) => {
            axios
              .get(
                `${prodUrl}/https://api.mtga.untapped.gg/api/v1/profiles/users/${parsedCrendentials.userId}/players/${parsedCrendentials.playerId}/`
              )
              .then((userInfo) => {
                setUser({
                  ...userCollection.data,
                  ...userInfo.data,
                });
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      }
    }
  };

  React.useEffect(() => {
    fetchLocalData();
  }, []);

  return (
    <UserContext.Provider
      value={{
        socketUser,
        user,
        saveCredentials,
        meta,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { SocketContext } from "./Socket";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = React.useState();
  const [socketUser, setSocketUser] = React.useState();
  const [meta, setMeta] = React.useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [draftedCard, setDraftedCard] = useState();

  const { socket } = useContext(SocketContext);
  const updateDraftedCards = (card) => {
    setSelectedCards([...selectedCards, draftedCard]);
    setDraftedCard(null);
  };

  React.useEffect(() => {
    if (socket) {
      socket.on("userData", (res) => {
        setSocketUser(res);
      });
    }
  }, [socket]);

  const saveCredentials = (url) => {
    const baseUrl = url.replace("https://mtga.untapped.gg/profile/", "");

    const userId = baseUrl.split("/")[1];
    const playerId = baseUrl.split("/")[0];

    if (userId && playerId) {
      let crendentials = { playerId: userId, userId: playerId };
      localStorage.setItem("mtgadCredentials", JSON.stringify(crendentials));
      fetchLocalData();
      setLoggedIn(true);
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

  React.useEffect(() => {
    if (user) {
      setLoggedIn(true);
    }
  }, [user]);
  return (
    <UserContext.Provider
      value={{
        socketUser,
        user,
        saveCredentials,
        setSelectedCards,
        setDraftedCard,
        draftedCard,
        selectedCards,
        loggedIn,
        updateDraftedCards,
        meta,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

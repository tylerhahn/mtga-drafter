import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { RoomContext } from "./Room";
import { SocketContext } from "./Socket";
import { UserContext } from "./User";
import _ from "lodash";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [packs, setPacks] = useState([]);
  const [round, setRound] = useState(1);
  const [pick, setPick] = useState(1);
  const { socket } = useContext(SocketContext);
  const { room, passDirection } = useContext(RoomContext);
  const [playerFinished, setPlayerFinished] = useState(false);
  const { draftedCard, updateDraftedCards } = useContext(UserContext);

  React.useEffect(() => {
    if (socket) {
      socket.on("receivePack", (res) => {
        setPacks((packs) => [...packs, res.data]);
      });

      socket.on("draftOver", (res) => {
        setPlayerFinished(true);
      });
    }
  }, [socket]);

  const getPassToId = (userId) => {
    const userIndex = _.findIndex(room.users, { id: userId });

    if (passDirection === "r") {
      if (userIndex === room.users.length - 1) {
        return room.users[0].id;
      } else {
        return room.users[userIndex + 1].id;
      }
    } else if (passDirection === "l") {
      if (userIndex === 0) {
        return room.users[room.users.length - 1].id;
      } else {
        return room.users[userIndex - 1].id;
      }
    }
  };

  const draftCard = async (packId) => {
    if (socket && draftedCard) {
      const passToId = await getPassToId(socket.id);

      if (pick === 15) {
        if (round + 1 >= 4) {
          setPlayerFinished(true);
        } else {
          setRound(round + 1);
          setPick(1);
          socket.emit("draftCard", {
            round: round + 1,
            id: socket.id,
            card: draftedCard,
            packId: packId,
            passToId: passToId,
            freshPack: true,
          });
        }
      } else {
        socket.emit("draftCard", {
          round: round,
          id: socket.id,
          card: draftedCard,
          packId: packId,
          passToId: passToId,
          freshPack: false,
        });
        setPick(pick + 1);
      }
    }

    updateDraftedCards(null);
    removePack();
  };

  const removePack = () => {
    const currentPacks = [...packs];
    currentPacks.splice(0, 1);
    setPacks(currentPacks);
  };

  return (
    <GameContext.Provider
      value={{
        removePack,
        packs,
        round,
        setPacks,
        setRound,
        playerFinished,
        pick,
        draftCard,
        setPick,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

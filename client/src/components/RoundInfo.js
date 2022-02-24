import React, { useContext, useState } from "react";
import { GameContext } from "../context/Game";
import { RoomContext } from "../context/Room";
import { SocketContext } from "../context/Socket";
import { UserContext } from "../context/User";
import _ from "lodash";

const RoundInfo = ({ packId }) => {
  const { room, passDirection } = useContext(RoomContext);
  const { socket } = useContext(SocketContext);
  const { removePack, round, pick, setRound, setPick } =
    useContext(GameContext);
  const { draftedCard, updateDraftedCards } = useContext(UserContext);

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

  const draftCard = async () => {
    if (socket && draftedCard) {
      const passToId = await getPassToId(socket.id);
      if (pick === 15) {
        setRound(round + 1);
        setPick(1);
        socket.emit("draftCard", {
          round: round + 1,
          id: socket.id,
          card: draftedCard,
          packId: packId,
          passToId: passToId,
        });
        console.log("new round");
      } else {
        socket.emit("draftCard", {
          round: round,
          id: socket.id,
          card: draftedCard,
          packId: packId,
          passToId: passToId,
        });
        setPick(pick + 1);
      }

      updateDraftedCards(null);
      removePack();
    }
  };

  console.log(draftedCard);
  if (room && room.draftActive) {
    return (
      <div className="py-5">
        <div className="flex items-center">
          <div className="px-3 text-gray-100 font-bold">Round #{round}</div>
          <div className="px-3 text-gray-100 font-bold">Pick #{pick}</div>
          <button
            disabled={!draftedCard}
            onClick={() => draftCard()}
            className="disabled:bg-gray-200  rounded px-3 py-2 m-1 border-b-4 border-l-2 shadow-lg bg-green-500 border-blue-900 text-white"
          >
            {draftedCard ? "Confirm Pick" : "Select a card"}
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <h4 className="text-gray-100">Waiting for host to start the draft.</h4>
    );
  }
};

export default RoundInfo;

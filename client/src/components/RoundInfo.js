import React, { useContext, useState } from "react";
import { GameContext } from "../context/Game";
import { RoomContext } from "../context/Room";
import { SocketContext } from "../context/Socket";
import { UserContext } from "../context/User";
import _ from "lodash";

const RoundInfo = ({ packId }) => {
  const { room, passDirection } = useContext(RoomContext);
  const { socket } = useContext(SocketContext);
  const [copied, setCopied] = useState(false);
  const {
    removePack,
    playerFinished,
    draftActive,
    round,
    pick,
    setRound,
    setPick,
    draftCard,
  } = useContext(GameContext);
  const { draftedCard, updateDraftedCards, selectedCards } =
    useContext(UserContext);

  const copyCode = () => {
    var cleanCardData = {};

    for (var i = 0; i < selectedCards.length; i++) {
      cleanCardData[selectedCards[i].name] =
        ++cleanCardData[selectedCards[i].name] || 1;
    }

    var copyText = "Deck\n";

    Object.keys(cleanCardData).forEach((name) => {
      copyText += cleanCardData[name] + " " + name.split("//")[0] + "\n";
    });
    setCopied(true);
    return copyText;
  };

  const renderCardInfo = (type) => {
    const matches = _.filter(selectedCards, (x) => {
      return x.type_line.includes(type);
    });

    return matches.length;
  };

  const renderFinishedScreen = () => {
    return (
      <div>
        <h2 className="text-4xl font-bold pb-3">Drafted Finished</h2>
        <button
          onClick={() => navigator.clipboard.writeText(copyCode())}
          className="rounded px-3 py-2 border-b-4 border-l-2 shadow-lg bg-green-500 border-blue-900 text-white"
        >
          {copied ? "Copied" : "Copy Deck to Arena"}
        </button>
      </div>
    );
  };
  if (room && room.draftActive && !playerFinished) {
    return (
      <div className="py-5">
        <div className="flex items-center">
          <div className="px-3 text-gray-100 font-bold">Round #{round}</div>
          <div className="px-3 text-gray-100 font-bold">Pick #{pick}</div>
          <button
            disabled={!draftedCard}
            onClick={() => draftCard(packId)}
            className="disabled:bg-gray-200  rounded px-3 py-2 m-1 border-b-4 border-l-2 shadow-lg bg-green-500 border-blue-900 text-white"
          >
            {draftedCard ? "Confirm Pick" : "Select a card"}
          </button>
          <div className="flex text-sm ml-5">
            <div className="text-gray-100 mr-5 flex ">
              <p className="text-uppercase font-bold pr-2">Creatures</p>{" "}
              <span> {renderCardInfo("Creature")}</span>
            </div>
            <div className="text-gray-100 mr-5 flex">
              <p className="text-uppercase font-bold pr-2">Instants</p>{" "}
              <span> {renderCardInfo("Instant")}</span>
            </div>
            <div className="text-gray-100 mr-5 flex">
              <p className="text-uppercase font-bold pr-2">Sorcerys</p>{" "}
              <span> {renderCardInfo("Sorcery")}</span>
            </div>
            <div className="text-gray-100 mr-5 flex">
              <p className="text-uppercase font-bold pr-2">Planeswalkers</p>{" "}
              <span> {renderCardInfo("Planeswalker")}</span>
            </div>
            <div className="text-gray-100 mr-5 flex">
              <p className="text-uppercase font-bold pr-2">Enchantments</p>{" "}
              <span> {renderCardInfo("Enchantment")}</span>
            </div>
            <div className="text-gray-100 mr-5 flex">
              <p className="text-uppercase font-bold pr-2">Artifacts</p>{" "}
              <span> {renderCardInfo("Artifact")}</span>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <h4 className="text-gray-100 pt-5">
        {playerFinished
          ? renderFinishedScreen()
          : "Waiting for host to start the draft."}
      </h4>
    );
  }
};

export default RoundInfo;

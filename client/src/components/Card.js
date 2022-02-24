import React, { useContext, useState } from "react";
import { UserContext } from "../context/User";
import { returnCardUri } from "../utils";

const Card = ({ card }) => {
  const { draftedCard, setDraftedCard } = useContext(UserContext);

  const renderCard = () => {
    if (card && card.card_faces) {
      return (
        <div className="mtg-card card-glow">
          <div className="side">
            <img
              className={` rounded-xl shadow-xl w-full ${
                draftedCard && draftedCard.arena_id === card.arena_id
                  ? "active-card"
                  : ""
              }`}
              src={returnCardUri(card, "front")}
              alt={card.name}
            />
          </div>
          <div className="side back">
            <img
              className={`  rounded-xl shadow-xl w-full ${
                draftedCard && draftedCard.arena_id === card.arena_id
                  ? "active-card"
                  : ""
              }`}
              src={returnCardUri(card, "back")}
              alt={card.name}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="mtg-cardz">
          <div className="side">
            <img
              className={`card-glow rounded-xl shadow-xl w-full ${
                draftedCard && draftedCard.arena_id === card.arena_id
                  ? "active-card"
                  : ""
              }`}
              src={returnCardUri(card)}
              alt={card.name}
            />
          </div>
        </div>
      );
    }
  };

  return (
    <div
      className="cursor-pointer relative "
      onClick={() => setDraftedCard(card)}
    >
      {renderCard()}
    </div>
  );
};

export default Card;

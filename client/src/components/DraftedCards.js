import _ from "lodash";
import React, { useContext, useState } from "react";
import { UserContext } from "../context/User";
import CardListItem from "./CardListItem";

const DraftedCards = () => {
  const { selectedCards } = useContext(UserContext);

  const renderDraftedCards = () => {
    if (selectedCards) {
      return _.map(selectedCards, (card, i) => {
        return <CardListItem key={i} card={card} />;
      });
    }
  };
  return (
    <div className="">
      <div className="">{renderDraftedCards()}</div>
    </div>
  );
};

export default DraftedCards;

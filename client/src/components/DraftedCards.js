import _ from "lodash";
import React, { useContext, useState } from "react";
import { UserContext } from "../context/User";
import CardListItem from "./CardListItem";

const DraftedCards = () => {
  const { selectedCards } = useContext(UserContext);

  console.log(selectedCards);
  const renderDraftedCards = () => {
    if (selectedCards) {
      const sortedCards = _.orderBy(selectedCards, [
        (card) => card.color_identity.toString(),
      ]);
      return _.map(sortedCards, (card, i) => {
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

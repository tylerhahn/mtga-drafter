import _ from "lodash";
import React, { useState } from "react";
import { GameContext } from "../context/Game";
import { UserContext } from "../context/User";
import Card from "./Card";
import FadeLeft from "./Anime/FadeLeft";
import Header from "./Header";
import RoundInfo from "./RoundInfo";
import DraftedCards from "./DraftedCards";
import { RoomContext } from "../context/Room";
import FadeRight from "./Anime/FadeRight";

const Home = () => {
  const { user } = React.useContext(UserContext);
  const { packs } = React.useContext(GameContext);
  const { passDirection } = React.useContext(RoomContext);

  const renderCards = () => {
    if (packs.length > 0) {
      return _.map(packs[0].pack, (card, index) => {
        if (passDirection === "r") {
          return (
            <FadeLeft key={index} duration={500} delay={250}>
              <Card card={card} />
            </FadeLeft>
          );
        } else {
          return (
            <FadeRight key={index} duration={500} delay={250}>
              <Card card={card} />
            </FadeRight>
          );
        }
      });
    }
  };

  return (
    <div className="p-5 bg-gray-500 min-h-screen">
      <Header />
      <RoundInfo packId={packs.length > 0 ? packs[0].packId : false} />
      <div className="flex items-start justify-between">
        <div className="w-8/12 grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6 grid gap-2 xl:gap-4 2xl:gap-8">
          {renderCards()}
        </div>
        <div
          style={{ maxWidth: 275 }}
          className="rounded-lg w-3/12 p-2 min-h-screen bg-gray-400"
        >
          <DraftedCards />
        </div>
      </div>
    </div>
  );
};

export default Home;

import axios from "axios";
import _ from "lodash";
import React, { useState } from "react";
import { CardContext } from "../context/Cards";
import { UserContext } from "../context/User";
import Card from "./Card";
import UserMeta from "./UserMeta";
import FadeIn from "./Anime/FadeIn";
import Lobby from "./Lobby";
import Header from "./Header";
import { SocketContext } from "../context/Socket";
import RoundInfo from "./RoundInfo";

const Home = () => {
  const { user } = React.useContext(UserContext);
  const { cards } = React.useContext(CardContext);
  const { socket } = React.useContext(SocketContext);

  const [currentCards, setCurrentCards] = React.useState();
  console.log(currentCards);
  React.useEffect(() => {
    if (socket) {
      socket.on("receivePack", (res) => {
        setCurrentCards(res.data.pack);
      });
    }
  }, [socket]);

  const selectCard = (id) => {
    const currentPackCards = [...currentCards];

    _.map(currentPackCards, (card, index) => {
      if (card.arena_id === id) {
        currentPackCards[index].active = true;
      } else {
        currentPackCards[index].active = false;
      }
    });

    setCurrentCards(currentPackCards);
  };

  const renderCards = () => {
    if (currentCards) {
      return _.map(currentCards, (card, index) => {
        return (
          <FadeIn duration={500} delay={250}>
            <Card
              active={card.active}
              selectCard={() => selectCard(card.arena_id)}
              id={card.arena_id}
              image={card.image_uris ? card.image_uris.png : false}
            />
          </FadeIn>
        );
      });
    }
  };

  return (
    <div className="bg-gray-500 min-h-screen">
      <div className="flex">
        <div className="bg-gray-400 ">
          <Lobby />
        </div>

        <div className="py-3 px-5">
          <Header />
          <RoundInfo />
          <div className="grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6 grid gap-2 xl:gap-4 2xl:gap-8">
            {renderCards()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

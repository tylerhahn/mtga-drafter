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

const Home = () => {
  const { user } = React.useContext(UserContext);
  const { cards } = React.useContext(CardContext);

  const [currentCards, setCurrentCards] = React.useState();

  const fetchCurrentCards = async () => {
    let promises = [];
    _.map(user.cards, (card, index) => {
      if (index <= 100) {
        promises.push(
          axios.get(`https://api.scryfall.com/cards/arena/${card.grpid}`)
        );
        if (index === 100) {
          Promise.allSettled(promises)
            .then((res) => {
              let fetchedCards = [];
              _.map(res, (o, i) => {
                if (o.status === "fulfilled") {
                  const cardData = o.value.data;
                  if (!cardData.type_line.includes("Land")) {
                    const matchedCard = _.find(user.cards, {
                      grpid: cardData.arena_id,
                    });

                    fetchedCards.push({
                      ...cardData,
                      quantity: matchedCard.quantity,
                    });
                    if (i === res.length - 1) {
                      setCurrentCards(fetchedCards);
                    }
                  }
                }
              });
            })
            .catch((err) => console.log(err));
        }
      }
    });
  };

  const renderCards = () => {
    if (currentCards) {
      return _.map(currentCards, (card, index) => {
        return (
          <FadeIn duration={500} delay={250}>
            <Card image={card.image_uris ? card.image_uris.png : null} />
          </FadeIn>
        );
      });
    }
  };

  React.useEffect(() => {
    if (user) {
      fetchCurrentCards();
    }
  }, [user]);

  return (
    <div className="bg-gray-500 min-h-screen">
      <div className="flex">
        <div className="bg-gray-400 ">
          <Lobby />
        </div>

        <div className="py-3 px-5">
          <Header />
          <div className="grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6 grid gap-8">
            {renderCards()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

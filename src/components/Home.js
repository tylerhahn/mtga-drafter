import axios from "axios";
import _ from "lodash";
import React, { useState } from "react";
import { CardContext } from "../context/Cards";
import { UserContext } from "../context/User";
import Card from "./Card";
import UserMeta from "./UserMeta";

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
                  console.log(cardData);
                  if (!cardData.type_line.includes("Land")) {
                    const matchedCard = _.find(user.cards, {
                      grpid: cardData.arena_id,
                    });

                    fetchedCards.push({
                      ...cardData,
                      quantity: matchedCard.quantity,
                    });
                    if (i === res.length - 1) {
                      console.log("yo");
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
      return _.map(currentCards, (card) => {
        console.log(card);
        return <Card image={card.image_uris ? card.image_uris.normal : null} />;
      });
    }
  };

  React.useEffect(() => {
    if (user) {
      fetchCurrentCards();
    }
  }, [user]);

  return (
    <div className="bg-gray-500 p-24 ">
      <UserMeta />

      <div className="grid-cols-2 xl:grid-cols-4 2xl:grid-cols-6 grid gap-8">
        {renderCards()}
      </div>
    </div>
  );
};

export default Home;

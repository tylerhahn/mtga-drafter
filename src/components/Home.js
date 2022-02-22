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

  const fetchCurrentCards = () => {
    let promises = [];
    _.map(user.cards, (card, index) => {
      if (index <= 10) {
        promises.push(
          axios.get(`https://api.scryfall.com/cards/arena/${card.grpid}`)
        );
        if (index === 10) {
          Promise.all(promises).then((res) => {
            setCurrentCards(res);
          });
        }
      }
    });
  };

  const renderCards = () => {
    if (currentCards) {
      return _.map(currentCards, (c) => {
        const card = c.data;
        console.log(card);
        return <Card image={card.image_uris.normal} />;
      });
    }
  };

  React.useEffect(() => {
    if (user) {
      fetchCurrentCards();
    }
  }, [user]);

  return (
    <div className="bg-gray-500 p-5 ">
      <UserMeta />

      <div className="grid-cols-2 xl:grid-cols-4 grid gap-10">
        {renderCards()}
      </div>
    </div>
  );
};

export default Home;

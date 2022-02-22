import axios from "axios";
import React, { createContext } from "react";

export const CardContext = createContext();

export const CardProvider = ({ children }) => {
  const [cards, setCards] = React.useState([]);
  const devUrl = "http://localhost:3000";
  const prodUrl = "https://mtga-anywhere.herokuapp.com";

  const fetchCards = () => {
    axios
      .get(`${prodUrl}/https://mtgajson.untapped.gg/v1/4008.913722/cards.json`)
      .then((res) => {
        setCards(res.data);
        console.log(res.data);
      });
  };

  React.useEffect(() => {
    fetchCards();
  }, []);

  return (
    <CardContext.Provider
      value={{
        cards,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

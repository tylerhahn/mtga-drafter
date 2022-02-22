import axios from "axios";
import React, { createContext } from "react";

export const CardContext = createContext();

export const CardProvider = ({ children }) => {
  const [cards, setCards] = React.useState([]);

  return (
    <CardContext.Provider
      value={{
        cards,
        setCards,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

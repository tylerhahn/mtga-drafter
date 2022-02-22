import axios from "axios";
import React, { createContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState({ name: "tyler" });

  const fetchUser = () => {
    axios
      .get(
        "https://mtga-anywhere.herokuapp.com/https://api.mtga.untapped.gg/api/v1/account/collections/UQRZEA3VWFDI5AQV5FSA7H7MSQ?user_id=fe65f2e1-13aa-4196-badb-fe8806dbd76e"
      )
      .then((res) => {
        console.log(res.data);
      });
  };

  React.useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

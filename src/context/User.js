import axios from "axios";
import React, { createContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState({ name: "tyler" });

  const devUrl = "http://localhost:3000";
  const prodUrl = "https://mtga-anywhere.herokuapp.com";

  const fetchUser = () => {
    axios
      .get(
        `${prodUrl}/https://api.mtga.untapped.gg/api/v1/account/collections/UQRZEA3VWFDI5AQV5FSA7H7MSQ?user_id=fe65f2e1-13aa-4196-badb-fe8806dbd76e`
      )
      .then((res) => {
        setUser(res.data);
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

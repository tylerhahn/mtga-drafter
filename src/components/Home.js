import React, { useState } from "react";
import { UserContext } from "../context/User";

const Home = () => {
  const { user } = React.useContext(UserContext);
  return <div className="">{user.name}</div>;
};

export default Home;

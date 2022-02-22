import React, { useContext, useState } from "react";
import { UserContext } from "../context/User";
import SignUp from "./auth/SignUp";

const AuthenticatedRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  if (user) {
    return children;
  } else {
    return <SignUp />;
  }
};

export default AuthenticatedRoute;

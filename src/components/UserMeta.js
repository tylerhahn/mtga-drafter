import React, { useState } from "react";
import { UserContext } from "../context/User";

const UserMeta = () => {
  const { user } = React.useContext(UserContext);

  console.log(user);
  return (
    <div className="text-left pb-5 font-bold text-5xl text-white ">
      TightGenes#04617's Collection
    </div>
  );
};

export default UserMeta;

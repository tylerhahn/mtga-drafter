import React, { useState } from "react";
import { UserContext } from "../context/User";

const UserMeta = () => {
  const { meta } = React.useContext(UserContext);

  return (
    <div className="text-left pb-5 font-bold text-3xl text-white ">
      <h2 className="uppercase tracking-widest">{meta.player_name}</h2>
    </div>
  );
};

export default UserMeta;

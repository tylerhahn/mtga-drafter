import React, { useState } from "react";

const Card = ({ name, image }) => {
  return (
    <div className="">
      <img className=" shadow-xl w-full rounded-2xl" src={image} alt={name} />
    </div>
  );
};

export default Card;

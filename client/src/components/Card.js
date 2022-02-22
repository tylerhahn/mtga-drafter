import React, { useState } from "react";

const Card = ({ name, image, qty }) => {
  return (
    <div className="relative">
      {qty > 0 && (
        <div className="shadow-md bottom-0 right-0 drop-shadow-sm absolute bg-gray-200 text-gray-100 font-bold w-12 h-12 rounded-full z-10 flex items-center justify-center">
          {qty}
        </div>
      )}
      <img className=" shadow-xl w-full rounded-2xl" src={image} alt={name} />
    </div>
  );
};

export default Card;

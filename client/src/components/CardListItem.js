import React, { useState } from "react";
import { returnCardUri } from "../utils";

const CardListItem = ({ card }) => {
  const findColors = (colors) => {
    let cardColors = [];

    // return colors.map((color) => {
    //   console.log(color);
    //   switch (color) {
    //     case "G":
    //       return "#68a05f";
    //     case "U":
    //       return "#d8d2ce";
    //     case "B":
    //       return "#8dbfd3";
    //     default:
    //       return "bg-blue";
    //   }
    // });
  };

  const renderMana = () => {};
  return (
    <div
      //   style={{ backgroundColor: findColors(card.color_identity) }}
      className={`card-parent relative cursor-pointer bg-gray-200 text-white w-full py-1 px-3 m-1 rounded-full font-bold`}
    >
      <div className="flex justify-between">
        <div>{card.name}</div>
        <div>{renderMana()}</div>
      </div>
      <div className="card-hover-preview">
        <img src={returnCardUri(card)} alt="" />
      </div>
    </div>
  );
};

export default CardListItem;

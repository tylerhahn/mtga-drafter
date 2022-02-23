import React, { useState } from "react";
import axios from "axios";

const Card = ({ name, image, qty, id, active, selectCard }) => {
  const [scryfallImage, setScryfallImage] = useState();

  // React.useEffect(() => {
  //   if (!image) {
  //     axios.get(`https://api.scryfall.com/cards/arena/${id}`).then((res) => {
  //       setScryfallImage(res.data.image_uris.png);
  //     });
  //   }
  // }, []);

  return (
    <div className="cursor-pointer relative" onClick={() => selectCard()}>
      <img
        className={`shadow-xl w-full ${
          active ? "border-3 border-green-500" : ""
        }`}
        src={image || scryfallImage}
        alt={name}
      />
    </div>
  );
};

export default Card;

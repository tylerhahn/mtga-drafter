import axios from "axios";
import React, { useState } from "react";

const UserPortrait = ({ name, active, portraitId }) => {
  const [portrait, setPortrait] = useState();
  React.useEffect(() => {
    axios
      .get(`https://api.scryfall.com/cards/arena/${portraitId}`)
      .then((res) => {
        const image = res.data.image_uris.art_crop;
        setPortrait(image);
      });
  }, [portraitId]);
  return (
    <div className="text-center py-2">
      <img
        className={`m-auto rounded-full w-12 h-12 border-2 ${
          active ? "border-red" : "border-green-500"
        }`}
        src={portrait}
        alt=""
      />
      <p className="pt-1 text-gray-200 text-sm">{name}</p>
    </div>
  );
};

export default UserPortrait;

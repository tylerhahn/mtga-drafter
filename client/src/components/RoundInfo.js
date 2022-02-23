import React, { useContext, useState } from "react";
import { RoomContext } from "../context/Room";

const RoundInfo = () => {
  const { room } = useContext(RoomContext);
  console.log(room);
  if (room && room.draftActive) {
    return (
      <div className="py-3">
        <div className="flex items-center">
          <div className="px-3 text-gray-100 font-bold">
            Round #{room.round}
          </div>
          <div className="px-3 text-gray-100 font-bold">Pick #{room.pick}</div>
          <button class="rounded px-3 py-2 m-1 border-b-4 border-l-2 shadow-lg bg-green-500 border-blue-900 text-white">
            Confirm Pick
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <h4 className="text-gray-100">Waiting for host to start the draft.</h4>
    );
  }
};

export default RoundInfo;

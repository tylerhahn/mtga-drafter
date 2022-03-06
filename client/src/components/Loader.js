import React, { useState } from "react";

const Loader = () => {
  return (
    <div className="">
      <div class="flex justify-center items-center space-x-2">
        <div
          class="
      spinner-border
      animate-spin
      inline-block
      w-4
      h-4
      border-4
      rounded-full
      text-green-500
      mr-4
    "
          role="status"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;

import React, { useState, useEffect } from "react";
import Anime from "react-anime";
import { useInView } from "react-intersection-observer";

const FadeRight = ({ children, duration, delay }) => {
  const { ref, inView } = useInView();
  const [autoplay, setAutoplay] = useState(false);

  return (
    <Anime
      easing="easeOutQuint"
      autoplay={true}
      translateX={[300, 0]}
      opacity={[0, 1]}
      duration={duration}
    >
      <div ref={ref}>{children}</div>
    </Anime>
  );
};

export default FadeRight;

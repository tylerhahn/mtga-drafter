import React, { useState, useEffect } from "react";
import Anime from "react-anime";
import { useInView } from "react-intersection-observer";

const FadeLeft = ({ children, duration, delay }) => {
  const { ref, inView } = useInView();
  const [autoplay, setAutoplay] = useState(false);

  return (
    <Anime
      easing="easeOutQuint"
      translateX={[-100, 0]}
      opacity={[0, 1]}
      delay={0}
      duration={duration}
    >
      <div ref={ref}>{children}</div>
    </Anime>
  );
};

export default FadeLeft;

import React, { useState, useEffect } from "react";
import Anime from "react-anime";
import { useInView } from "react-intersection-observer";

const FadeIn = ({ children, duration, delay }) => {
  const { ref, inView } = useInView();
  const [autoplay, setAutoplay] = useState(false);

  useEffect(() => {
    if (inView) {
      setAutoplay(true);
    }
    if (!inView) {
      setAutoplay(false);
    }
  }, [inView]);

  return (
    <Anime
      delay={delay || 0}
      className="opacity-0"
      easing="easeInQuad"
      autoplay={autoplay}
      duration={duration}
      opacity={[0, 1]}
    >
      <div ref={ref}>{children}</div>
    </Anime>
  );
};

export default FadeIn;

import React, { useState, useEffect } from "react";
import Anime, { anime } from "react-anime";
import { useInView } from "react-intersection-observer";

const FadeUp = ({ children, duration, delay }) => {
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
      easing="easeOutQuint"
      autoplay={autoplay}
      translateY={[100, 0]}
      opacity={[0, 1]}
      delay={anime.stagger(delay)}
      duration={duration}
    >
      <div ref={ref}>{children}</div>
    </Anime>
  );
};

export default FadeUp;

import React, { useState, useEffect } from "react";
import Anime from "react-anime";
import { useInView } from "react-intersection-observer";

const FadeDown = ({ children, duration }) => {
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
      translateY={[-100, 0]}
      opacity={[0, 1]}
      duration={duration}
    >
      <div ref={ref}>{children}</div>
    </Anime>
  );
};

export default FadeDown;

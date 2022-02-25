import React, { useState, useEffect } from "react";
import Anime from "react-anime";
import { useInView } from "react-intersection-observer";

const FadeRight = ({ children, duration, delay, cName }) => {
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
      translateX={[300, 0]}
      opacity={[0, 1]}
      delay={delay || 0}
      duration={duration}
    >
      <div className={cName ? cName : ""} ref={ref}>
        {children}
      </div>
    </Anime>
  );
};

export default FadeRight;

import React, { useEffect, useRef, useState } from 'react';
import styles from "./styles.module.css"

const Marquee = ({ text }) => {
  const marqueeRef = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const marqueeElement = marqueeRef.current;
    const marqueeWidth = marqueeElement.offsetWidth;
    const containerWidth = marqueeElement.parentNode.offsetWidth;
    const duration = marqueeWidth / 50; // Ajusta la velocidad de la animación cambiando este valor
    console.log("marqueeWidth:", marqueeWidth , "containerWidth:", containerWidth);

    if (marqueeWidth > containerWidth) {
      setAnimate(true);

      const animation = marqueeElement.animate(
        [
          { transform: 'translateX(0)' },
          { transform: `translateX(-${marqueeWidth}px)` },
        ],
        {
          duration,
          iterations: Infinity,
        }
      );
        console.log("sss");

      return () => {
        animation.cancel();
      };
    } else {
      console.log("s");

      setAnimate(false);
    }
  }, [text]);

  return (
    <div className={styles.marquee} >
      <div className={styles.textContainer}>
        <span ref={marqueeRef} className={styles.text}>{text}</span>
        <span className={styles.text}>{text}</span>
        <span className={styles.text}>{text}</span>
        <span className={styles.text}>{text}</span>
      </div>
    </div>
  );
};

export default Marquee;


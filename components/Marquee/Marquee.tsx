'use client'

import { useEffect, useRef, useState } from 'react';
import styles from "./styles.module.css"

type MarqueeProps = {
  text: string
}

const Marquee = ({ text }: MarqueeProps) => {
  const marqueeRef = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const marqueeElement = marqueeRef.current;
    const marqueeWidth = marqueeElement.offsetWidth;
    const containerWidth = marqueeElement.parentNode.offsetWidth;
    const duration = marqueeWidth / 50;

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

      return () => {
        animation.cancel();
      };
    } else {
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


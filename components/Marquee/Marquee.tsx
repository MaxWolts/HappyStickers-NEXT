'use client'

import { useRef } from 'react'
import { gsap, useGSAP, motionAllowedQuery } from '@lib/gsap'
import styles from './styles.module.css'

const REPEATS_PER_GROUP = 4
const SECONDS_PER_GROUP = 18

type MarqueeProps = {
  text: string
  direction?: 'left' | 'right'
  variant?: 'accent' | 'dark'
}

type MarqueeGroupProps = {
  text: string
  hidden: boolean
}

const MarqueeGroup = ({ text, hidden }: MarqueeGroupProps) => {
  const repeatedTexts = Array.from(
    { length: REPEATS_PER_GROUP },
    (_, repeatIndex) => repeatIndex,
  )

  return (
    <div className={styles.group}>
      {repeatedTexts.map((repeatIndex) => (
        <span
          key={repeatIndex}
          className={styles.entry}
          aria-hidden={hidden || repeatIndex > 0}
        >
          <span className={styles.text}>{text}</span>
          <span className={styles.separator} aria-hidden="true">
            ✦
          </span>
        </span>
      ))}
    </div>
  )
}

const Marquee = ({
  text,
  direction = 'left',
  variant = 'accent',
}: MarqueeProps) => {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const motionMedia = gsap.matchMedia()

      motionMedia.add(motionAllowedQuery, () => {
        gsap.fromTo(
          trackRef.current,
          { xPercent: direction === 'left' ? 0 : -50 },
          {
            xPercent: direction === 'left' ? -50 : 0,
            duration: SECONDS_PER_GROUP,
            ease: 'none',
            repeat: -1,
          },
        )
      })

      return () => motionMedia.revert()
    },
    { scope: marqueeRef, dependencies: [direction] },
  )

  return (
    <div ref={marqueeRef} className={styles.frame}>
      <div className={`${styles.marquee} ${styles[variant]}`}>
        <div ref={trackRef} className={styles.track}>
          <MarqueeGroup text={text} hidden={false} />
          <MarqueeGroup text={text} hidden={true} />
        </div>
      </div>
    </div>
  )
}

export default Marquee

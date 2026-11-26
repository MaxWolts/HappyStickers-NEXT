'use client'

import { useRef } from 'react'
import { gsap, useGSAP, ScrollTrigger, motionAllowedQuery } from '@lib/gsap'
import styles from './styles.module.css'

const REPEATS_PER_GROUP = 4
const SECONDS_PER_GROUP = 18
const MAX_SCROLL_BOOST = 4
const VELOCITY_PER_BOOST_STEP = 600

type MarqueeProps = {
  text: string
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

const Marquee = ({ text }: MarqueeProps) => {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const motionMedia = gsap.matchMedia()

      motionMedia.add(motionAllowedQuery, () => {
        const loop = gsap.to(trackRef.current, {
          xPercent: -50,
          duration: SECONDS_PER_GROUP,
          ease: 'none',
          repeat: -1,
        })

        let speedChange: gsap.core.Timeline | null = null

        ScrollTrigger.create({
          trigger: marqueeRef.current,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            const scrollSpeed = Math.abs(self.getVelocity())
            const boost = Math.min(
              scrollSpeed / VELOCITY_PER_BOOST_STEP,
              MAX_SCROLL_BOOST,
            )
            speedChange?.kill()
            speedChange = gsap
              .timeline()
              .to(loop, { timeScale: 1 + boost, duration: 0.2 })
              .to(loop, { timeScale: 1, duration: 1 })
          },
        })
      })

      return () => motionMedia.revert()
    },
    { scope: marqueeRef },
  )

  return (
    <div ref={marqueeRef} className={styles.frame}>
      <div className={styles.marquee}>
        <div ref={trackRef} className={styles.track}>
          <MarqueeGroup text={text} hidden={false} />
          <MarqueeGroup text={text} hidden={true} />
        </div>
      </div>
    </div>
  )
}

export default Marquee

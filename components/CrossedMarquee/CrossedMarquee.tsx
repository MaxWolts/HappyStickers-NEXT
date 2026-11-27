'use client'

import { useState } from 'react'
import Marquee from '@components/Marquee/Marquee'
import MarqueeToggle from '@components/Marquee/MarqueeToggle'
import styles from './styles.module.css'

const CROSSED_TEXT = '10×10 · Resistentes al agua · Nuevos cada semana'

const CrossedMarquee = () => {
  const [paused, setPaused] = useState(false)

  const togglePaused = () => {
    setPaused((isPaused) => !isPaused)
  }

  return (
    <div className={styles.crossed}>
      <div className={`${styles.band} ${styles.accentBand}`}>
        <Marquee text={CROSSED_TEXT} paused={paused} />
      </div>
      <div className={`${styles.band} ${styles.darkBand}`} aria-hidden="true">
        <Marquee
          text={CROSSED_TEXT}
          direction="right"
          variant="dark"
          paused={paused}
        />
      </div>
      <MarqueeToggle paused={paused} onToggle={togglePaused} />
    </div>
  )
}

export default CrossedMarquee

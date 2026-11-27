'use client'

import { useState } from 'react'
import Marquee from '@components/Marquee/Marquee'
import MarqueeToggle from '@components/Marquee/MarqueeToggle'
import styles from './toggle.module.css'

type MarqueeBandProps = {
  text: string
}

const MarqueeBand = ({ text }: MarqueeBandProps) => {
  const [paused, setPaused] = useState(false)

  const togglePaused = () => {
    setPaused((isPaused) => !isPaused)
  }

  return (
    <div className={styles.band}>
      <Marquee text={text} paused={paused} />
      <MarqueeToggle paused={paused} onToggle={togglePaused} />
    </div>
  )
}

export default MarqueeBand

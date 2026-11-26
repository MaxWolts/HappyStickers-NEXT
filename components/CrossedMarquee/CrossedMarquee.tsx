import Marquee from '@components/Marquee/Marquee'
import styles from './styles.module.css'

const CROSSED_TEXT = '10×10 · Resistentes al agua · Nuevos cada semana'

const CrossedMarquee = () => (
  <div className={styles.crossed}>
    <div className={`${styles.band} ${styles.accentBand}`}>
      <Marquee text={CROSSED_TEXT} />
    </div>
    <div className={`${styles.band} ${styles.darkBand}`} aria-hidden="true">
      <Marquee text={CROSSED_TEXT} direction="right" variant="dark" />
    </div>
  </div>
)

export default CrossedMarquee

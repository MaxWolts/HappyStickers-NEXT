import styles from './toggle.module.css'

type MarqueeToggleProps = {
  paused: boolean
  onToggle: () => void
}

const PauseIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={styles.icon}
    aria-hidden="true"
  >
    <rect x="6" y="5" width="4" height="14" />
    <rect x="14" y="5" width="4" height="14" />
  </svg>
)

const PlayIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={styles.icon}
    aria-hidden="true"
  >
    <path d="M7 4.5v15L19.5 12 7 4.5Z" />
  </svg>
)

const MarqueeToggle = ({ paused, onToggle }: MarqueeToggleProps) => (
  <button
    type="button"
    className={styles.toggle}
    onClick={onToggle}
    aria-label={paused ? 'Reanudar animación' : 'Pausar animación'}
  >
    {paused ? <PlayIcon /> : <PauseIcon />}
  </button>
)

export default MarqueeToggle

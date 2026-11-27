import skewButtonStyles from '@components/SkewButton/styles.module.css'
import styles from './AddButtonLabel.module.css'

type AddButtonLabelProps = {
  isAdded: boolean
}

const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={3}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={styles.icon}
    aria-hidden="true"
  >
    <path d="M4.5 12.75l6 6 9-13.5" />
  </svg>
)

const AddButtonLabel = ({ isAdded }: AddButtonLabelProps) => (
  <span
    className={`${skewButtonStyles.label} ${styles.stack}`}
    aria-hidden="true"
  >
    <span className={styles.state} data-visible={!isAdded}>
      Añadir
    </span>
    <span className={styles.state} data-visible={isAdded}>
      <CheckIcon />
      Añadido
    </span>
  </span>
)

export default AddButtonLabel

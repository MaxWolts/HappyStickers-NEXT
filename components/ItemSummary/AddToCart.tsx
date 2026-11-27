'use client'

import { useState } from 'react'
import { useCartMutations } from '@store/Cart'
import skewButtonStyles from '@components/SkewButton/styles.module.css'
import styles from './styles.module.css'
import { AiFillCheckCircle } from 'react-icons/ai'

const MIN_QUANTITY = 1
const MAX_QUANTITY = 25

type AddToCartProps = {
  product: TItem
}

const addToCartRequest = () =>
  new Promise((resolve) => {
    window.setTimeout(resolve, 600)
  })

const validate = (quantity: number) => {
  let error = ''
  if (quantity < 1) error = "Can't be blank"

  return error
}

const MinusIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth={2.2}
    stroke="currentColor"
    className={styles.stepIcon}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
  </svg>
)

const PlusIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth={2.2}
    stroke="currentColor"
    className={styles.stepIcon}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>
)

const AddToCart = ({ product }: AddToCartProps) => {
  const [error, setError] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [visible, setVisible] = useState(false)
  const { addToCart } = useCartMutations()

  const toggleMessage = () => {
    setTimeout(() => {
      setVisible(false)
    }, 1500)
  }

  const handleSubmit = async () => {
    const error = validate(quantity)
    setError(error)
    if (!error) {
      addToCartRequest()
        .then(() => {
          addToCart(product, quantity)
          setQuantity(quantity)
          setVisible(true)
          toggleMessage()
        })
        .catch((err: Error) => {
          setError(`Error: ${err}` || 'Something went wrong')
        })
    }
  }

  const isAtMin = quantity <= MIN_QUANTITY
  const isAtMax = quantity >= MAX_QUANTITY

  const decreaseQuantity = () => {
    if (isAtMin) return
    setQuantity(quantity - 1)
  }

  const increaseQuantity = () => {
    if (isAtMax) return
    setQuantity(quantity + 1)
  }

  return (
    <div className={styles.purchase} data-entrance-fade data-sticky-purchase>
      <div className={styles.stepper}>
        <button
          type="button"
          className={styles.step}
          onClick={decreaseQuantity}
          aria-label="Quitar uno"
          aria-disabled={isAtMin}
        >
          <MinusIcon />
        </button>
        <label htmlFor="item-quantity" className={styles.visuallyHidden}>
          Cantidad
        </label>
        <output id="item-quantity" className={styles.quantity}>
          {quantity}
        </output>
        <button
          type="button"
          className={styles.step}
          onClick={increaseQuantity}
          aria-label="Añadir uno"
          aria-disabled={isAtMax}
        >
          <PlusIcon />
        </button>
      </div>
      <button
        type="button"
        className={`${skewButtonStyles.button} ${styles.add}`}
        onClick={handleSubmit}
      >
        <span className={skewButtonStyles.label}>Añadir</span>
      </button>
      <div className={styles.feedback} aria-live="polite">
        {error ? <p className={styles.error}>{error}</p> : null}
        {visible ? (
          <p className={styles.added}>
            Añadido
            <AiFillCheckCircle
              className={styles.addedIcon}
              aria-hidden="true"
            />
          </p>
        ) : null}
      </div>
    </div>
  )
}

export default AddToCart

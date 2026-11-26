'use client'

import { useState } from 'react'
import { useCartMutations } from '@store/Cart'
import styles from './styles.module.css'
import { AiFillCheckCircle } from 'react-icons/ai'

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

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(target.value, 10))
  }

  const changeQuantity = (number: number) => {
    if ((number == 1 && quantity < 25) || (quantity > 1 && number < 1))
      setQuantity(quantity + number)
  }

  return (
    <div className={styles.purchase} data-summary-fade>
      <div className={styles.stepper}>
        <button
          type="button"
          className={styles.step}
          onClick={() => changeQuantity(-1)}
          aria-label="Quitar uno"
        >
          <MinusIcon />
        </button>
        <label htmlFor="item-quantity" className={styles.visuallyHidden}>
          Cantidad
        </label>
        <input
          id="item-quantity"
          className={styles.quantity}
          type="number"
          min={1}
          max="25"
          pattern="\d*"
          onChange={handleChange}
          value={quantity}
          readOnly
        />
        <button
          type="button"
          className={styles.step}
          onClick={() => changeQuantity(1)}
          aria-label="Añadir uno"
        >
          <PlusIcon />
        </button>
      </div>
      <button type="button" className={styles.add} onClick={handleSubmit}>
        <span className={styles.addLabel}>Añadir</span>
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

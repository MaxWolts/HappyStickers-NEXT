import React, { useState, useContext } from 'react'
import { useCartMutations } from '@store/Cart'
import styles from './styles.module.css'
import { AiFillCheckCircle } from "react-icons/ai";

type AddToCartProps = {
  product: TItem
}

// Fake a server Response, we don't care on this project
// about data persistency, but you may add it :)
const addToCartRequest = () =>
  new Promise((resolve, reject) => {
    window.setTimeout(resolve, 600)
  })

const validate = (quantity: number) => {
  let error = ''
  if (quantity < 1) error = "Can't be blank"

  return error
}

const AddToCart = ({ product }: AddToCartProps) => {
  const [loading, setLoading] = useState(false)
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
      setLoading(true)
      addToCartRequest()
        .then(() => {
          addToCart(product, quantity)
          setLoading(false)
          setQuantity(quantity)
          setVisible(true)
          toggleMessage()
          console.log(quantity)
        })
        .catch((err: Error) => {
          setError(`Error: ${err}` || 'Something went wrong')
          setLoading(false)
        })
    }
  }

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(target.value, 10))
  }

  const changeQuantity = (number:number) => {
    if (number == 1 || quantity > 1 && number < 1)
      setQuantity(quantity + number)
  }

  return (
    <>
      <div className={styles.inputContainer}>
        <input type="number" min={1} pattern="\d*" onChange={handleChange} value={quantity}/>
        <button className={styles.less} onClick={()=>changeQuantity(-1)}>-</button>
        <button className={styles.more} onClick={()=>changeQuantity(1)}>+</button>
        <button className={styles.add} onClick={handleSubmit}>Añadir</button>
      </div>
      {
      error && (
        <div style={{ color: 'red', position: 'absolute' }}>{error}</div>
      )}
      {visible &&
        <div className={styles.added}>
          Añadido
          <AiFillCheckCircle className={styles.icon}/>
        </div>
      }
    </>
  )
}

export default AddToCart

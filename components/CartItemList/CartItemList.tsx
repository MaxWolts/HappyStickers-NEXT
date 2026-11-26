'use client'

import Image from 'next/image'
import styles from './styles.module.css'
import { useCart, useCartMutations } from '@store/Cart'

const CartItemList = () => {
  const { items } = useCart()
  const { removeFromCart } = useCartMutations()

  if (items.length === 0) {
    return (
      <div className={styles.container}>
        <p className={styles.without}>
          Deberá agregar algunos artículos al carrito antes de poder pagar.
        </p>
      </div>
    )
  }

  const total = items.reduce((sum, item) => sum + item.quantity, 0) * 5

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Carrito</h2>
      {items.map((cartItem) => (
        <div className={styles.item} key={cartItem.id}>
          <Image
            className={styles.image}
            src={cartItem.image}
            alt=""
            width={120}
            height={120}
          />
          <div className={styles.text}>
            <p className={styles.name}>{cartItem.name}</p>
            <p className={styles.price}>
              {cartItem.quantity} x ${cartItem.price}
            </p>
          </div>
          <button
            onClick={() => removeFromCart(cartItem)}
            aria-label={`Quitar ${cartItem.name} del carrito`}
          >
            X
          </button>
        </div>
      ))}
      <div className={styles.total}>
        <p>Total: ${total},00</p>
      </div>
    </div>
  )
}

export default CartItemList

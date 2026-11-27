'use client'

import { useRef } from 'react'
import Image from 'next/image'
import styles from './styles.module.css'
import { useCart, useCartMutations, type CartItemType } from '@store/Cart'

const CartItemList = () => {
  const { items } = useCart()
  const { removeFromCart } = useCartMutations()
  const headingRef = useRef<HTMLHeadingElement>(null)

  const isEmpty = items.length === 0
  const total = items.reduce((sum, item) => sum + item.quantity, 0) * 5

  const handleRemove = (cartItem: CartItemType) => {
    removeFromCart(cartItem)
    headingRef.current?.focus()
  }

  return (
    <div className={styles.container}>
      <h1 ref={headingRef} className={styles.title} tabIndex={-1}>
        Carrito
      </h1>
      {isEmpty ? null : (
        <ul className={styles.list}>
          {items.map((cartItem) => (
            <li className={styles.item} key={cartItem.id}>
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
                type="button"
                onClick={() => handleRemove(cartItem)}
                aria-label={`Quitar ${cartItem.name} del carrito`}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className={styles.status} role="status">
        {isEmpty ? (
          <p className={styles.without}>
            Deberá agregar algunos artículos al carrito antes de poder pagar.
          </p>
        ) : (
          <p className={styles.total}>Total: ${total},00</p>
        )}
      </div>
    </div>
  )
}

export default CartItemList

'use client'

import type { MouseEvent } from 'react'
import { useCartMutations } from '@store/Cart'
import skewButtonStyles from '@components/SkewButton/styles.module.css'
import AddButtonLabel from './AddButtonLabel'
import { useAddToCartFeedback } from './useAddToCartFeedback'
import styles from './styles.module.css'

type AddToCartButtonProps = {
  item: TItem
  className?: string
}

const AddToCartButton = ({ item, className }: AddToCartButtonProps) => {
  const { addToCart } = useCartMutations()
  const { isAdded, showAdded } = useAddToCartFeedback()

  const handleAdd = (event: MouseEvent<HTMLButtonElement>) => {
    addToCart(item)
    showAdded(event.currentTarget)
  }

  const baseClassName = `${skewButtonStyles.button} ${skewButtonStyles.compact} ${styles.button}`
  const buttonClassName = className
    ? `${baseClassName} ${className}`
    : baseClassName

  return (
    <button
      type="button"
      className={buttonClassName}
      onClick={handleAdd}
      aria-label={`Añadir ${item.name} al carrito`}
      data-added={isAdded}
    >
      <AddButtonLabel isAdded={isAdded} />
      <span className={styles.visuallyHidden} aria-live="polite">
        {isAdded ? 'Añadido' : ''}
      </span>
    </button>
  )
}

export default AddToCartButton

'use client'

import { useEffect, useState } from 'react'
import { useCartMutations } from '@store/Cart'
import skewButtonStyles from '@components/SkewButton/styles.module.css'
import styles from './styles.module.css'

const CONFIRMATION_DURATION_MS = 1500

type AddToCartButtonProps = {
  item: TItem
  className?: string
}

const AddToCartButton = ({ item, className }: AddToCartButtonProps) => {
  const { addToCart } = useCartMutations()
  const [justAdded, setJustAdded] = useState(false)

  useEffect(() => {
    if (!justAdded) {
      return
    }
    const timeoutId = window.setTimeout(
      () => setJustAdded(false),
      CONFIRMATION_DURATION_MS,
    )
    return () => window.clearTimeout(timeoutId)
  }, [justAdded])

  const handleAdd = () => {
    addToCart(item)
    setJustAdded(true)
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
      data-added={justAdded}
    >
      <span className={skewButtonStyles.label} aria-live="polite">
        {justAdded ? 'Añadido' : 'Añadir'}
      </span>
    </button>
  )
}

export default AddToCartButton

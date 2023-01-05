import styles from './styles.module.css'

import { CartItemType } from '../../store/Cart'

type CartItemListProps = {
  items: CartItemType[]
  removeFromCart: (product: TItem) => void
  loading?: boolean
}

const CartItemList = ({
  items,
  removeFromCart,
}: CartItemListProps) => {

  if (items.length === 0)
    return (
      <div className={styles.container}>
        <p className={styles.without}>
          Deberá agregar algunos artículos al carrito antes de poder pagar.
        </p>
      </div>
    )

  const mapCartItemsToItems = (items: CartItemType[]) =>
    items.map((cartItem) => {
      const { id, name, quantity, price, image } = cartItem

      return (
        <div className={styles.item}>
          <img className={styles.image} src={image} alt="" />
          <div className={styles.text}>
            <p className={styles.name}>{name}</p>
            <p className={styles.price}>{quantity} x ${price}</p>
          </div>
          <button onClick={() => removeFromCart(cartItem)}>X</button>
        </div>
      )
    })

  return <div className={styles.container}>
    <h2 className={styles.title}>Carrito</h2>
    {mapCartItemsToItems(items)}
    <div className={styles.total}>
      <p>Total: ${items.reduce((sum, item) => sum + item.quantity, 0) * 5},00</p>
    </div>
  </div>
}

export default CartItemList

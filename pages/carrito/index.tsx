import Layout from '@components/Layout/Layout'
import CartItemList from '@components/CartItemList/CartItemList'
import { useCart, useCartMutations } from '@store/Cart'

const carrito = () => {
  const { items, count } = useCart()
  const { removeFromCart } = useCartMutations()
  return (
    <Layout>
      <CartItemList items={items} removeFromCart={removeFromCart}/>
      <div>{items.length}</div>
    </Layout>
  )
}

export default carrito

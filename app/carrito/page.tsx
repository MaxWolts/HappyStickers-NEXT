import type { Metadata } from 'next'
import Layout from '@components/Layout/Layout'
import CartItemList from '@components/CartItemList/CartItemList'

export const metadata: Metadata = {
  title: 'Carrito',
}

const CarritoPage = () => {
  return (
    <Layout>
      <CartItemList />
    </Layout>
  )
}

export default CarritoPage

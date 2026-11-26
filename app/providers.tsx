'use client'

import CartProvider from '@store/Cart'

type ProvidersProps = {
  children: React.ReactNode
}

const Providers = ({ children }: ProvidersProps) => {
  return <CartProvider>{children}</CartProvider>
}

export default Providers

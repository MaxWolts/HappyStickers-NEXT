'use client'

import { useState } from 'react'
import Link from 'next/link'
import Menu from '@components/Menu/Menu'
import { useCart } from '@store/Cart'
import styles from './style.module.css'

const CartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={styles.cartIcon}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
    />
  </svg>
)

const describeCart = (cartCount: number) =>
  cartCount === 1 ? 'Carrito, 1 sticker' : `Carrito, ${cartCount} stickers`

const Header = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const { count: cartCount } = useCart()

  const menuHanddler = () => {
    setOpenMenu(!openMenu)
    if (!openMenu) {
      document.body.classList.add('body-scroll-lock')
    } else {
      document.body.classList.remove('body-scroll-lock')
    }
  }

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        HappyStickers
      </Link>
      <nav className={styles.nav} aria-label="Principal">
        <Link href="/#catalogo" className={styles.navLink}>
          Catálogo
        </Link>
        <Link href="/about" className={styles.navLink}>
          Nosotros
        </Link>
      </nav>
      <div className={styles.actions}>
        <Link
          href="/carrito"
          className={styles.cart}
          aria-label={describeCart(cartCount)}
        >
          <CartIcon />
          {cartCount > 0 ? (
            <span className={styles.count} aria-hidden="true">
              {cartCount}
            </span>
          ) : null}
        </Link>
        <button
          className={styles.menu}
          onClick={menuHanddler}
          aria-label="Abrir menú"
          aria-expanded={openMenu}
        >
          <span className={styles.menuLine} />
          <span className={styles.menuLine} />
        </button>
      </div>
      {openMenu ? <Menu menuHanddler={menuHanddler} /> : null}
    </header>
  )
}

export default Header

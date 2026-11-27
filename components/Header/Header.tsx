'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import CutoutLetters from '@components/CutoutLetters/CutoutLetters'
import Menu, { MENU_ID } from '@components/Menu/Menu'
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
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const { count: cartCount } = useCart()

  const handleMenuOpen = () => {
    setOpenMenu(true)
    document.body.classList.add('body-scroll-lock')
  }

  const handleMenuClose = () => {
    setOpenMenu(false)
    document.body.classList.remove('body-scroll-lock')
    menuButtonRef.current?.focus()
  }

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <CutoutLetters text="HappyStickers" className={styles.logoLetters} />
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
          data-cart-target
        >
          <CartIcon />
          {cartCount > 0 ? (
            <span
              className={
                cartCount >= 10
                  ? `${styles.count} ${styles.countWide}`
                  : styles.count
              }
              aria-hidden="true"
              data-cart-badge
            >
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          ) : null}
        </Link>
        <button
          ref={menuButtonRef}
          type="button"
          className={styles.menu}
          onClick={handleMenuOpen}
          aria-label="Abrir menú"
          aria-expanded={openMenu}
          aria-controls={MENU_ID}
        >
          <span className={styles.menuLine} />
          <span className={styles.menuLine} />
        </button>
      </div>
      <Menu open={openMenu} onClose={handleMenuClose} />
    </header>
  )
}

export default Header

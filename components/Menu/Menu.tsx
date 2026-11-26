'use client'

import { useEffect, useRef, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import menuImage from '@images/menu.png'
import CutoutLetters from '@components/CutoutLetters/CutoutLetters'
import { gsap, useGSAP, motionAllowedQuery } from '@lib/gsap'
import { useCart } from '@store/Cart'
import styles from './styles.module.css'

export const MENU_ID = 'menu-principal'

const HIDDEN_SWEEP = 'polygon(0% 0%, 0% 0%, -30% 100%, -30% 100%)'
const VISIBLE_SWEEP = 'polygon(0% 0%, 130% 0%, 100% 100%, -30% 100%)'

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled])'

type MenuLink = {
  href: string
  label: string
}

const MENU_LINKS: MenuLink[] = [
  { href: '/', label: 'Inicio' },
  { href: '/#catalogo', label: 'Catálogo' },
  { href: '/carrito', label: 'Carrito' },
  { href: '/about', label: 'Nosotros' },
]

const CART_HREF = '/carrito'

const describeCart = (cartCount: number) =>
  cartCount === 1 ? 'Carrito, 1 sticker' : `Carrito, ${cartCount} stickers`

const subscribeToNothing = () => () => {}
const isClientSnapshot = () => true
const isServerSnapshot = () => false

const trapFocus = (
  event: React.KeyboardEvent<HTMLDivElement>,
  dialog: HTMLDivElement,
) => {
  const focusableElements =
    dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]
  const activeElement = document.activeElement

  if (event.shiftKey) {
    if (activeElement === firstElement || activeElement === dialog) {
      event.preventDefault()
      lastElement.focus()
    }
    return
  }

  if (activeElement === lastElement) {
    event.preventDefault()
    firstElement.focus()
  }
}

type MenuProps = {
  open: boolean
  onClose: () => void
}

const CloseIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={3.5}
    strokeLinecap="round"
    className={styles.closeIcon}
    aria-hidden="true"
  >
    <path d="M5 5l14 14M19 5L5 19" />
  </svg>
)

const MenuOverlay = ({ open, onClose }: MenuProps) => {
  const overlayRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const timelineRef = useRef<gsap.core.Timeline>(null)
  const pathname = usePathname()
  const { count: cartCount } = useCart()

  useGSAP(
    () => {
      const overlay = overlayRef.current
      const motionMedia = gsap.matchMedia()

      motionMedia.add(motionAllowedQuery, () => {
        const openTimeline = gsap.timeline({
          paused: true,
          defaults: { ease: 'power4.out' },
          onReverseComplete: () => {
            gsap.set(overlay, { clearProps: 'visibility' })
          },
        })

        openTimeline
          .fromTo(
            '[data-menu-scrim]',
            { opacity: 0 },
            { opacity: 1, duration: 0.3, ease: 'power1.out' },
          )
          .fromTo(
            '[data-menu-sweep]',
            { clipPath: HIDDEN_SWEEP },
            { clipPath: VISIBLE_SWEEP, duration: 0.45, stagger: 0.05 },
            0,
          )
          .from(
            '[data-menu-item]',
            { opacity: 0, x: 160, skewX: -20, duration: 0.5, stagger: 0.06 },
            0.15,
          )
          .from(
            '[data-cutout-letter]',
            {
              opacity: 0,
              yPercent: -80,
              rotation: -30,
              duration: 0.4,
              ease: 'back.out(1.6)',
              stagger: 0.04,
            },
            0.2,
          )
          .from(
            '[data-menu-pop]',
            {
              opacity: 0,
              scale: 0.4,
              duration: 0.5,
              ease: 'back.out(1.6)',
              stagger: 0.08,
            },
            0.25,
          )

        timelineRef.current = openTimeline

        return () => {
          timelineRef.current = null
        }
      })

      return () => motionMedia.revert()
    },
    { scope: overlayRef },
  )

  useGSAP(
    () => {
      const openTimeline = timelineRef.current
      if (openTimeline === null) {
        return
      }

      if (open) {
        openTimeline.play()
      } else if (openTimeline.progress() > 0) {
        gsap.set(overlayRef.current, { visibility: 'visible' })
        openTimeline.reverse()
      }
    },
    { dependencies: [open] },
  )

  useEffect(() => {
    if (open) {
      closeButtonRef.current?.focus()
    }
  }, [open])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
      return
    }

    if (event.key === 'Tab') {
      trapFocus(event, event.currentTarget)
    }
  }

  return (
    <div
      ref={overlayRef}
      id={MENU_ID}
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="Menú"
      aria-hidden={!open}
      inert={!open}
      tabIndex={-1}
      data-open={open}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.scrim} data-menu-scrim />
      <div className={styles.sweep} data-menu-sweep aria-hidden="true">
        <div className={styles.redPanel} />
      </div>
      <div className={styles.sweep} data-menu-sweep aria-hidden="true">
        <div className={styles.slash} />
      </div>
      <div className={styles.sweep} data-menu-sweep aria-hidden="true">
        <div className={styles.halftone} />
      </div>

      <div className={styles.content}>
        <div className={styles.topBar}>
          <CutoutLetters text="MeNÚ" className={styles.title} />
          <button
            ref={closeButtonRef}
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Cerrar menú"
            data-menu-pop
          >
            <CloseIcon />
          </button>
        </div>

        <nav className={styles.nav} aria-label="Menú">
          <ul className={styles.list}>
            {MENU_LINKS.map((menuLink) => (
              <li key={menuLink.href} className={styles.item} data-menu-item>
                <Link
                  href={menuLink.href}
                  className={styles.link}
                  onClick={onClose}
                  aria-current={pathname === menuLink.href ? 'page' : undefined}
                  aria-label={
                    menuLink.href === CART_HREF
                      ? describeCart(cartCount)
                      : undefined
                  }
                >
                  {menuLink.label}
                  {menuLink.href === CART_HREF && cartCount > 0 ? (
                    <span className={styles.badge} aria-hidden="true">
                      {cartCount}
                    </span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.imageFrame} data-menu-pop>
          <Image src={menuImage} alt="" className={styles.image} />
        </div>
      </div>
    </div>
  )
}

const Menu = ({ open, onClose }: MenuProps) => {
  const isClient = useSyncExternalStore(
    subscribeToNothing,
    isClientSnapshot,
    isServerSnapshot,
  )

  return isClient
    ? createPortal(<MenuOverlay open={open} onClose={onClose} />, document.body)
    : null
}

export default Menu

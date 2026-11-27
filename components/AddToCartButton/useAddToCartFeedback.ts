'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@lib/gsap'
import { flyToCart, type CartFlight } from '@components/motion/flyToCart'

const ADDED_DURATION_MS = 1600

export const useAddToCartFeedback = () => {
  const [isAdded, setIsAdded] = useState(false)
  const resetTimeoutRef = useRef<number | undefined>(undefined)
  const flightRef = useRef<CartFlight | null>(null)

  const { contextSafe } = useGSAP(() => {
    return () => {
      window.clearTimeout(resetTimeoutRef.current)
      flightRef.current?.cancel()
    }
  })

  const startFlight = (trigger: HTMLElement) => {
    flightRef.current?.cancel()
    flightRef.current = flyToCart(trigger)
  }

  const showAdded = (trigger: HTMLElement) => {
    setIsAdded(true)
    window.clearTimeout(resetTimeoutRef.current)
    resetTimeoutRef.current = window.setTimeout(
      () => setIsAdded(false),
      ADDED_DURATION_MS,
    )
    contextSafe(startFlight)(trigger)
  }

  return { isAdded, showAdded }
}

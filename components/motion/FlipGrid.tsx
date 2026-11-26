'use client'

import { useState } from 'react'
import { gsap, useGSAP, Flip, motionAllowedQuery } from '@lib/gsap'

type FlipGridProps = {
  children: React.ReactNode
  layoutKey: string
  className?: string
}

type LayoutSnapshot = {
  layoutKey: string
  flipState: Flip.FlipState | null
}

const FlipGrid = ({ children, layoutKey, className }: FlipGridProps) => {
  const [gridElement, setGridElement] = useState<HTMLDivElement | null>(null)
  const [snapshot, setSnapshot] = useState<LayoutSnapshot>({
    layoutKey,
    flipState: null,
  })

  if (snapshot.layoutKey !== layoutKey) {
    const previousFlipState = gridElement
      ? Flip.getState(gridElement.children)
      : null
    setSnapshot({ layoutKey, flipState: previousFlipState })
  }

  useGSAP(
    () => {
      if (!gridElement || !snapshot.flipState) {
        return
      }

      const motionMedia = gsap.matchMedia()

      motionMedia.add(motionAllowedQuery, () => {
        Flip.from(snapshot.flipState, {
          targets: gridElement.children,
          duration: 0.5,
          ease: 'power2.inOut',
          scale: true,
          onEnter: (enteringElements) =>
            gsap.fromTo(
              enteringElements,
              { autoAlpha: 0, scale: 0.9 },
              { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'power2.out' },
            ),
        })
      })

      return () => motionMedia.revert()
    },
    {
      scope: gridElement,
      dependencies: [snapshot, gridElement],
      revertOnUpdate: true,
    },
  )

  return (
    <div ref={setGridElement} className={className}>
      {children}
    </div>
  )
}

export default FlipGrid

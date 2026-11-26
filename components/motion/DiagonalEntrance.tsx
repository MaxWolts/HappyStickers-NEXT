'use client'

import { useRef } from 'react'
import { gsap, useGSAP, motionAllowedQuery } from '@lib/gsap'

const HIDDEN_SWEEP = 'polygon(0% 0%, 0% 0%, -30% 100%, -30% 100%)'
const VISIBLE_SWEEP = 'polygon(0% 0%, 130% 0%, 100% 100%, -30% 100%)'

type DiagonalEntranceProps = {
  children: React.ReactNode
  className?: string
}

const DiagonalEntrance = ({ children, className }: DiagonalEntranceProps) => {
  const entranceRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const motionMedia = gsap.matchMedia()

      motionMedia.add(motionAllowedQuery, () => {
        const popElements = gsap.utils.toArray<HTMLElement>(
          '[data-entrance-pop]',
          entranceRef.current,
        )

        const introTimeline = gsap.timeline({
          defaults: { ease: 'power4.out' },
        })

        introTimeline
          .fromTo(
            '[data-entrance-sweep]',
            { clipPath: HIDDEN_SWEEP },
            { clipPath: VISIBLE_SWEEP, duration: 0.5, stagger: 0.15 },
          )
          .from(
            '[data-entrance-drop]',
            {
              autoAlpha: 0,
              y: -80,
              rotation: -14,
              duration: 0.9,
              ease: 'back.out(1.6)',
            },
            0.15,
          )
          .from(
            '[data-cutout-letter]',
            {
              autoAlpha: 0,
              yPercent: -80,
              rotation: -30,
              duration: 0.5,
              ease: 'back.out(1.6)',
              stagger: 0.03,
            },
            0.3,
          )

        if (popElements.length > 0) {
          introTimeline.from(
            popElements,
            {
              autoAlpha: 0,
              scale: 1.6,
              duration: 0.4,
              ease: 'back.out(1.6)',
            },
            '-=0.2',
          )
        }

        introTimeline.from(
          '[data-entrance-fade]',
          { autoAlpha: 0, y: 24, duration: 0.6, stagger: 0.08 },
          '-=0.2',
        )
      })

      return () => motionMedia.revert()
    },
    { scope: entranceRef },
  )

  return (
    <div ref={entranceRef} className={className}>
      {children}
    </div>
  )
}

export default DiagonalEntrance

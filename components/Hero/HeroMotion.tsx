'use client'

import { useRef } from 'react'
import { gsap, useGSAP, motionAllowedQuery } from '@lib/gsap'

type HeroMotionProps = {
  children: React.ReactNode
  className?: string
}

const HeroMotion = ({ children, className }: HeroMotionProps) => {
  const heroRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const motionMedia = gsap.matchMedia()

      motionMedia.add(motionAllowedQuery, () => {
        const introTimeline = gsap.timeline({
          defaults: { ease: 'power3.out' },
        })

        introTimeline
          .from('[data-hero-word]', {
            yPercent: 110,
            duration: 0.9,
            stagger: 0.08,
          })
          .from(
            '[data-hero-fade]',
            { autoAlpha: 0, y: 24, duration: 0.7, stagger: 0.1 },
            '-=0.5',
          )
          .from(
            '[data-hero-sticker]',
            {
              autoAlpha: 0,
              scale: 0.6,
              duration: 0.9,
              ease: 'back.out(1.6)',
              stagger: 0.06,
            },
            0.1,
          )

        gsap.to('[data-hero-copy]', {
          opacity: 0.2,
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      })

      return () => motionMedia.revert()
    },
    { scope: heroRef },
  )

  return (
    <div ref={heroRef} className={className}>
      {children}
    </div>
  )
}

export default HeroMotion

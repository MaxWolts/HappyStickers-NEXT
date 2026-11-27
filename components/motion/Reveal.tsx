'use client'

import { useRef } from 'react'
import { gsap, useGSAP, motionAllowedQuery } from '@lib/gsap'

type RevealProps = {
  children: React.ReactNode
  className?: string
  stagger?: number
}

const Reveal = ({ children, className, stagger }: RevealProps) => {
  const revealRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const wrapper = revealRef.current
      const revealTargets = stagger ? Array.from(wrapper.children) : wrapper
      const motionMedia = gsap.matchMedia()

      motionMedia.add(motionAllowedQuery, () => {
        gsap.from(revealTargets, {
          autoAlpha: 0,
          y: 40,
          duration: 0.8,
          ease: 'power3.out',
          stagger: stagger ?? 0,
          scrollTrigger: {
            trigger: wrapper,
            start: 'top 85%',
            once: true,
          },
        })
      })

      return () => motionMedia.revert()
    },
    { scope: revealRef },
  )

  return (
    <div ref={revealRef} className={className}>
      {children}
    </div>
  )
}

export default Reveal

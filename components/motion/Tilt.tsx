'use client'

import { useRef } from 'react'
import { gsap, useGSAP, motionAndFinePointerQuery } from '@lib/gsap'
import styles from './Tilt.module.css'

const MAX_TILT_DEGREES = 12
const GLARE_TRAVEL_PERCENT = 25
const FOLLOW_SETTINGS = { duration: 0.4, ease: 'power3.out' }

type TiltProps = {
  children: React.ReactNode
  className?: string
}

const Tilt = ({ children, className }: TiltProps) => {
  const tiltRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)

  useGSAP(
    (_context, contextSafe) => {
      const card = tiltRef.current
      const glare = glareRef.current
      const motionMedia = gsap.matchMedia()

      motionMedia.add(motionAndFinePointerQuery, () => {
        gsap.set(card, { transformPerspective: 800 })

        const createRotationXFollower = () =>
          gsap.quickTo(card, 'rotationX', FOLLOW_SETTINGS)
        const createRotationYFollower = () =>
          gsap.quickTo(card, 'rotationY', FOLLOW_SETTINGS)
        const moveGlareX = gsap.quickTo(glare, 'xPercent', FOLLOW_SETTINGS)
        const moveGlareY = gsap.quickTo(glare, 'yPercent', FOLLOW_SETTINGS)

        let rotateX = createRotationXFollower()
        let rotateY = createRotationYFollower()

        const handlePointerEnter = contextSafe(() => {
          rotateX = createRotationXFollower()
          rotateY = createRotationYFollower()
          gsap.to(glare, { opacity: 1, duration: 0.3, overwrite: 'auto' })
        })

        const handlePointerMove = (event: PointerEvent) => {
          const bounds = card.getBoundingClientRect()
          const horizontal =
            ((event.clientX - bounds.left) / bounds.width) * 2 - 1
          const vertical =
            ((event.clientY - bounds.top) / bounds.height) * 2 - 1
          rotateX(-vertical * MAX_TILT_DEGREES)
          rotateY(horizontal * MAX_TILT_DEGREES)
          moveGlareX(horizontal * GLARE_TRAVEL_PERCENT)
          moveGlareY(vertical * GLARE_TRAVEL_PERCENT)
        }

        const handlePointerLeave = contextSafe(() => {
          gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            duration: 1.2,
            ease: 'elastic.out(1, 0.4)',
            overwrite: true,
          })
          gsap.to(glare, { opacity: 0, duration: 0.4, overwrite: 'auto' })
        })

        card.addEventListener('pointerenter', handlePointerEnter, {
          passive: true,
        })
        card.addEventListener('pointermove', handlePointerMove, {
          passive: true,
        })
        card.addEventListener('pointerleave', handlePointerLeave, {
          passive: true,
        })

        return () => {
          card.removeEventListener('pointerenter', handlePointerEnter)
          card.removeEventListener('pointermove', handlePointerMove)
          card.removeEventListener('pointerleave', handlePointerLeave)
        }
      })

      return () => motionMedia.revert()
    },
    { scope: tiltRef },
  )

  const tiltClassName = className ? `${styles.tilt} ${className}` : styles.tilt

  return (
    <div ref={tiltRef} className={tiltClassName}>
      {children}
      <div className={styles.glareClip} aria-hidden="true">
        <div ref={glareRef} className={styles.glare} />
      </div>
    </div>
  )
}

export default Tilt

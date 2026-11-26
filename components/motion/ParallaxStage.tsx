'use client'

import { useRef } from 'react'
import { gsap, useGSAP, motionAllowedQuery, finePointerQuery } from '@lib/gsap'
import styles from './ParallaxStage.module.css'

const POINTER_DISTANCE_PER_DEPTH = 12
const SCROLL_PERCENT_PER_DEPTH = 8

type ParallaxStageProps = {
  children: React.ReactNode
  className?: string
  scrollDepth?: boolean
}

const readLayerDepth = (layer: HTMLElement) =>
  Number(layer.dataset.parallaxDepth) || 0

const ParallaxStage = ({
  children,
  className,
  scrollDepth = false,
}: ParallaxStageProps) => {
  const stageRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const stage = stageRef.current
      const layers = gsap.utils.toArray<HTMLElement>(
        '[data-parallax-depth]',
        stage,
      )
      const motionMedia = gsap.matchMedia()

      motionMedia.add(
        { motionAllowed: motionAllowedQuery, finePointer: finePointerQuery },
        (context) => {
          const { motionAllowed, finePointer } = context.conditions
          if (!motionAllowed) {
            return
          }

          if (scrollDepth) {
            layers.forEach((layer) => {
              gsap.to(layer, {
                yPercent: -readLayerDepth(layer) * SCROLL_PERCENT_PER_DEPTH,
                ease: 'none',
                scrollTrigger: {
                  trigger: stage,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: true,
                },
              })
            })
          }

          if (!finePointer) {
            return
          }

          const moveLayers = layers.map((layer) => {
            const distance = readLayerDepth(layer) * POINTER_DISTANCE_PER_DEPTH
            const moveX = gsap.quickTo(layer, 'x', {
              duration: 0.6,
              ease: 'power3.out',
            })
            const moveY = gsap.quickTo(layer, 'y', {
              duration: 0.6,
              ease: 'power3.out',
            })
            return (horizontal: number, vertical: number) => {
              moveX(-horizontal * distance)
              moveY(-vertical * distance)
            }
          })

          const handlePointerMove = (event: PointerEvent) => {
            const bounds = stage.getBoundingClientRect()
            const horizontal =
              ((event.clientX - bounds.left) / bounds.width) * 2 - 1
            const vertical =
              ((event.clientY - bounds.top) / bounds.height) * 2 - 1
            moveLayers.forEach((moveLayer) => moveLayer(horizontal, vertical))
          }

          const handlePointerLeave = () => {
            moveLayers.forEach((moveLayer) => moveLayer(0, 0))
          }

          stage.addEventListener('pointermove', handlePointerMove, {
            passive: true,
          })
          stage.addEventListener('pointerleave', handlePointerLeave, {
            passive: true,
          })

          return () => {
            stage.removeEventListener('pointermove', handlePointerMove)
            stage.removeEventListener('pointerleave', handlePointerLeave)
          }
        },
      )

      return () => motionMedia.revert()
    },
    { scope: stageRef, dependencies: [scrollDepth] },
  )

  const stageClassName = className
    ? `${styles.stage} ${className}`
    : styles.stage

  return (
    <div ref={stageRef} className={stageClassName}>
      {children}
    </div>
  )
}

export default ParallaxStage

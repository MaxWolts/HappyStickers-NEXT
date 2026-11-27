'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { gsap, useGSAP, Draggable, motionAllowedQuery } from '@lib/gsap'
import foldStyles from './fold.module.css'
import styles from './styles.module.css'

const RESTING_PEEL = 16
const HINT_PEEL = 34
const FALLING_PEEL = 120
const FULL_PEEL = 200
const DROP_THRESHOLD = 0.35

type PeelStickerProps = {
  src: string
  alt: string
  sizes: string
}

const readPeel = (sticker: HTMLElement) =>
  parseFloat(String(gsap.getProperty(sticker, '--peel')))

const toPeelProgress = (peel: number) =>
  (peel - RESTING_PEEL) / (FULL_PEEL - RESTING_PEEL)

const PeelIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={styles.buttonIcon}
    aria-hidden="true"
  >
    <path d="M4 20 20 4" />
    <path d="M12 4h8v8" />
  </svg>
)

const PeelSticker = ({ src, alt, sizes }: PeelStickerProps) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const stickerRef = useRef<HTMLDivElement>(null)
  const handleRef = useRef<HTMLSpanElement>(null)
  const hintRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [isPeeled, setIsPeeled] = useState(false)

  useGSAP(
    () => {
      const motionMedia = gsap.matchMedia()

      motionMedia.add(motionAllowedQuery, () => {
        const sticker = stickerRef.current
        const handle = handleRef.current
        const button = buttonRef.current
        if (!sticker || !handle || !button) return

        gsap.from('[data-peel-entrance]', {
          autoAlpha: 0,
          scale: 0.6,
          duration: 0.9,
          ease: 'back.out(1.6)',
          delay: 0.1,
        })

        const hintTween = gsap.to(sticker, {
          '--peel': HINT_PEEL,
          duration: 0.45,
          ease: 'power2.inOut',
          yoyo: true,
          repeat: 3,
          delay: 1.5,
        })

        const springBackTween = gsap.to(sticker, {
          '--peel': RESTING_PEEL,
          duration: 0.9,
          ease: 'elastic.out(1, 0.5)',
          paused: true,
        })

        const peelOffTimeline = gsap
          .timeline({ paused: true, onComplete: () => setIsPeeled(true) })
          .to(sticker, {
            '--peel': FALLING_PEEL,
            duration: 0.35,
            ease: 'power1.in',
          })
          .to(hintRef.current, { autoAlpha: 0, duration: 0.2 }, 0)
          .to(sticker, {
            xPercent: 30,
            yPercent: 160,
            rotation: 35,
            autoAlpha: 0,
            duration: 0.8,
            ease: 'power2.in',
          })

        let isFalling = false
        let startX = 0
        let startY = 0
        let startPeel = RESTING_PEEL

        const stopPeelMotion = () => {
          hintTween.kill()
          springBackTween.pause()
        }

        const peelOff = () => {
          if (isFalling) return
          isFalling = true
          stopPeelMotion()
          dragger.disable()
          peelOffTimeline.play()
        }

        const springBack = () => {
          springBackTween.invalidate().restart()
        }

        const [dragger] = Draggable.create(document.createElement('div'), {
          trigger: handle,
          type: 'x,y',
          onPress() {
            stopPeelMotion()
            startX = this.x
            startY = this.y
            startPeel = readPeel(sticker)
          },
          onDrag() {
            const pulledDistance = -(this.x - startX + this.y - startY) / 2
            const pulledPeel = (pulledDistance / sticker.offsetWidth) * 100
            const peel = gsap.utils.clamp(
              RESTING_PEEL,
              FULL_PEEL,
              startPeel + pulledPeel,
            )
            sticker.style.setProperty('--peel', String(peel))
          },
          onRelease() {
            const progress = toPeelProgress(readPeel(sticker))
            if (progress > DROP_THRESHOLD) {
              peelOff()
            } else {
              springBack()
            }
          },
        })

        button.addEventListener('click', peelOff)

        return () => {
          button.removeEventListener('click', peelOff)
          dragger.kill()
          sticker.style.removeProperty('--peel')
        }
      })

      return () => motionMedia.revert()
    },
    { scope: rootRef },
  )

  return (
    <div ref={rootRef} className={styles.peel}>
      <div className={styles.frame} data-peel-entrance>
        <div ref={stickerRef} className={styles.sticker}>
          <div className={`${foldStyles.face} ${styles.face}`}>
            <Image
              src={src}
              alt={alt}
              fill
              sizes={sizes}
              preload
              className={styles.image}
            />
          </div>
          <div
            className={`${foldStyles.flapShadow} ${styles.flapShadow}`}
            aria-hidden="true"
          >
            <div className={`${foldStyles.flap} ${styles.flap}`} />
          </div>
          <span ref={handleRef} className={styles.handle} aria-hidden="true" />
        </div>
      </div>

      <div className={styles.controls}>
        <p ref={hintRef} className={styles.hint} aria-hidden="true">
          ¡Despégame!
        </p>
        <button
          ref={buttonRef}
          type="button"
          className={styles.button}
          aria-disabled={isPeeled}
        >
          <PeelIcon />
          {isPeeled ? 'Sticker despegado' : 'Despegar sticker'}
        </button>
        <p className={styles.visuallyHidden} role="status">
          {isPeeled ? 'Sticker despegado' : ''}
        </p>
      </div>
    </div>
  )
}

export default PeelSticker

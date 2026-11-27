import { gsap, motionAllowedQuery } from '@lib/gsap'
import styles from './flyToCart.module.css'

const ARC_LIFT_PX = 140
const START_ROTATION = -8
const END_ROTATION = 14

export type CartFlight = {
  cancel: () => void
}

const findSourceImage = (trigger: HTMLElement) => {
  const scope = trigger.closest('[data-fly-scope]')
  if (!scope) {
    return null
  }
  return scope.querySelector<HTMLImageElement>('img[data-fly-source]')
}

const isInViewport = (rect: DOMRect) =>
  rect.width > 0 &&
  rect.height > 0 &&
  rect.bottom > 0 &&
  rect.right > 0 &&
  rect.top < window.innerHeight &&
  rect.left < window.innerWidth

const findVisibleCartTarget = () => {
  const target = document.querySelector<HTMLElement>('[data-cart-target]')
  if (!target) {
    return null
  }
  return isInViewport(target.getBoundingClientRect()) ? target : null
}

const getCenter = (rect: DOMRect) => ({
  x: rect.left + rect.width / 2,
  y: rect.top + rect.height / 2,
})

const createClone = (source: HTMLImageElement) => {
  const clone = document.createElement('img')
  clone.src = source.currentSrc || source.src
  clone.alt = ''
  clone.setAttribute('aria-hidden', 'true')
  clone.className = styles.clone
  document.body.append(clone)
  return clone
}

const bumpCartBadge = (target: HTMLElement) => {
  const badge = target.querySelector('[data-cart-badge]')
  if (!badge) {
    return
  }
  gsap.fromTo(
    badge,
    { scale: 1 },
    {
      scale: 1.4,
      duration: 0.14,
      ease: 'power2.out',
      yoyo: true,
      repeat: 1,
      overwrite: true,
      clearProps: 'scale',
    },
  )
}

export const flyToCart = (trigger: HTMLElement): CartFlight | null => {
  if (!window.matchMedia(motionAllowedQuery).matches) {
    return null
  }

  const source = findSourceImage(trigger)
  const target = findVisibleCartTarget()
  if (!source || !target) {
    return null
  }

  const clone = createClone(source)
  const halfSize = clone.offsetWidth / 2
  const start = getCenter(source.getBoundingClientRect())
  const end = getCenter(target.getBoundingClientRect())
  const startPoint = { x: start.x - halfSize, y: start.y - halfSize }
  const endPoint = { x: end.x - halfSize, y: end.y - halfSize }
  const peakPoint = {
    x: (startPoint.x + endPoint.x) / 2,
    y: Math.max(Math.min(startPoint.y, endPoint.y) - ARC_LIFT_PX, 0),
  }

  gsap.set(clone, { ...startPoint, rotation: START_ROTATION })

  const timeline = gsap.timeline({
    onComplete: () => {
      clone.remove()
      bumpCartBadge(target)
    },
  })

  timeline
    .fromTo(
      clone,
      { autoAlpha: 0, scale: 0.6 },
      { autoAlpha: 1, scale: 1, duration: 0.15, ease: 'back.out(2)' },
    )
    .to(clone, {
      motionPath: { path: [startPoint, peakPoint, endPoint], curviness: 1.25 },
      scale: 0.4,
      rotation: END_ROTATION,
      duration: 0.65,
      ease: 'power1.inOut',
    })

  const cancel = () => {
    timeline.kill()
    clone.remove()
  }

  return { cancel }
}

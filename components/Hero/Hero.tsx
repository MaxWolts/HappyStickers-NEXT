import { Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ParallaxStage from '@components/motion/ParallaxStage'
import ParallaxLayer from '@components/motion/ParallaxLayer'
import HeroMotion from './HeroMotion'
import styles from './styles.module.css'

export type HeroSticker = Pick<TItem, 'id' | 'name' | 'image'>

type StickerSlot = {
  left: string
  top: string
  size: string
  rotate: string
}

type HeroLayer = {
  depth: number
  className: string
  sizes: string
  preload: boolean
  slots: StickerSlot[]
}

const HEADLINE_WORDS = ['Stickers', 'nuevos', 'cada', 'semana']

const HERO_LAYERS: HeroLayer[] = [
  {
    depth: 1,
    className: styles.backLayer,
    sizes: '(min-width: 960px) 12vw, 22vw',
    preload: false,
    slots: [
      { left: '4%', top: '6%', size: '20%', rotate: '-12deg' },
      { left: '76%', top: '68%', size: '18%', rotate: '10deg' },
    ],
  },
  {
    depth: 2,
    className: styles.middleLayer,
    sizes: '(min-width: 960px) 16vw, 30vw',
    preload: false,
    slots: [
      { left: '62%', top: '2%', size: '28%', rotate: '7deg' },
      { left: '2%', top: '60%', size: '26%', rotate: '-9deg' },
    ],
  },
  {
    depth: 3,
    className: styles.frontLayer,
    sizes: '(min-width: 960px) 22vw, 42vw',
    preload: true,
    slots: [
      { left: '20%', top: '14%', size: '40%', rotate: '-6deg' },
      { left: '58%', top: '34%', size: '34%', rotate: '9deg' },
      { left: '30%', top: '62%', size: '30%', rotate: '-3deg' },
    ],
  },
]

const toSlotStyle = (slot: StickerSlot) =>
  ({
    '--slot-left': slot.left,
    '--slot-top': slot.top,
    '--slot-size': slot.size,
    '--slot-rotate': slot.rotate,
  }) as React.CSSProperties

const assignStickersToLayers = (stickers: HeroSticker[]) => {
  let nextStickerIndex = 0

  return HERO_LAYERS.map((layer) => {
    const placedStickers = layer.slots
      .map((slot) => {
        const sticker = stickers[nextStickerIndex]
        nextStickerIndex += 1
        return sticker ? { sticker, slot } : null
      })
      .filter((placement) => placement !== null)

    return { layer, placedStickers }
  })
}

type HeroProps = {
  stickers: HeroSticker[]
}

const Hero = ({ stickers }: HeroProps) => {
  const layersWithStickers = assignStickersToLayers(stickers)

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <HeroMotion className={styles.inner}>
        <div className={styles.copy} data-hero-copy>
          <p className={styles.eyebrow} data-hero-fade>
            HappyStickers
          </p>
          <h1 id="hero-title" className={styles.title}>
            {HEADLINE_WORDS.map((word) => (
              <Fragment key={word}>
                <span className={styles.wordMask}>
                  <span className={styles.word} data-hero-word>
                    {word}
                  </span>
                </span>{' '}
              </Fragment>
            ))}
          </h1>
          <p className={styles.lead} data-hero-fade>
            Stickers de 10x10 resistentes al agua, impresos con tinta que no
            pierde color. Elige los tuyos y pégalos donde quieras.
          </p>
          <div className={styles.actions} data-hero-fade>
            <Link href="#catalogo" className={styles.primaryAction}>
              Ver catálogo
            </Link>
            <Link href="/about" className={styles.secondaryAction}>
              Nosotros
            </Link>
          </div>
        </div>

        <div className={styles.stageFrame} aria-hidden="true">
          <ParallaxStage scrollDepth className={styles.stage}>
            {layersWithStickers.map(({ layer, placedStickers }) => (
              <ParallaxLayer
                key={layer.depth}
                depth={layer.depth}
                className={`${styles.layer} ${layer.className}`}
              >
                {placedStickers.map(({ sticker, slot }) => (
                  <div
                    key={sticker.id}
                    className={styles.sticker}
                    style={toSlotStyle(slot)}
                    data-hero-sticker
                  >
                    <Image
                      src={sticker.image}
                      alt=""
                      fill
                      sizes={layer.sizes}
                      preload={layer.preload}
                      className={styles.stickerImage}
                    />
                  </div>
                ))}
              </ParallaxLayer>
            ))}
          </ParallaxStage>
        </div>
      </HeroMotion>
    </section>
  )
}

export default Hero

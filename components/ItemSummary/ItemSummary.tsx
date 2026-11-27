import Image from 'next/image'
import Link from 'next/link'
import CutoutLetters from '@components/CutoutLetters/CutoutLetters'
import DiagonalEntrance from '@components/motion/DiagonalEntrance'
import Tilt from '@components/motion/Tilt'
import { formatPrice } from '@lib/formatPrice'
import AddToCart from './AddToCart'
import styles from './styles.module.css'

type ItemSummaryProps = {
  item: TItem
}

const BackIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={styles.backIcon}
    aria-hidden="true"
  >
    <path d="M15 5l-7 7 7 7" />
  </svg>
)

function ItemSummary({ item }: ItemSummaryProps) {
  return (
    <section className={styles.summary}>
      <DiagonalEntrance className={styles.stage}>
        <div className={styles.backdrop} data-entrance-sweep aria-hidden="true">
          <div className={styles.panel} />
          <div className={styles.halftone} />
        </div>
        <div className={styles.backdrop} data-entrance-sweep aria-hidden="true">
          <div className={styles.slash} />
        </div>

        <Link href="/#catalogo" className={styles.backLink} data-entrance-fade>
          <BackIcon />
          Volver al catálogo
        </Link>

        <div className={styles.media}>
          <div className={styles.imageDrop} data-entrance-drop>
            <Tilt className={styles.tilt}>
              <div className={styles.frame}>
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(min-width: 960px) 30vw, 60vw"
                  preload
                  className={styles.image}
                />
              </div>
            </Tilt>
          </div>
        </div>

        <div className={styles.info}>
          <h1 className={styles.name}>
            <CutoutLetters text={item.name} />
          </h1>
          <p className={styles.price} data-entrance-pop>
            {formatPrice(item.price)}
          </p>
          <p className={styles.description} data-entrance-fade>
            {item.description}
          </p>
          <AddToCart product={item} />
        </div>
      </DiagonalEntrance>
    </section>
  )
}

export default ItemSummary

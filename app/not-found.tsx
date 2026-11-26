import type { Metadata } from 'next'
import Link from 'next/link'
import Layout from '@components/Layout/Layout'
import CutoutLetters from '@components/CutoutLetters/CutoutLetters'
import DiagonalEntrance from '@components/motion/DiagonalEntrance'
import PeelSticker from '@components/PeelSticker/PeelSticker'
import skewButtonStyles from '@components/SkewButton/styles.module.css'
import DB from '@database'
import styles from './styles.module.css'

const TITLE = 'Página no encontrada'
const STICKER_NAME = 'Psyduck'
const STICKER_SIZES = '(min-width: 960px) 380px, 72vw'

export const metadata: Metadata = {
  title: TITLE,
}

const NotFoundPage = async () => {
  const db = new DB()
  const itemList = await db.getAll()
  const sticker = itemList.find((item) => item.name === STICKER_NAME)

  return (
    <Layout>
      <section className={styles.notFound}>
        <DiagonalEntrance className={styles.stage}>
          <div
            className={styles.backdrop}
            data-entrance-sweep
            aria-hidden="true"
          >
            <div className={styles.panel} />
            <div className={styles.halftone} />
          </div>

          <div className={styles.copy}>
            <p className={styles.eyebrow} data-entrance-fade>
              Error 404
            </p>
            <h1 className={styles.title} aria-label={TITLE}>
              <CutoutLetters text={TITLE} />
            </h1>
            <p className={styles.description} data-entrance-fade>
              Este sticker se despegó y se llevó la página. Puede que el enlace
              esté mal o que ya no exista.
            </p>
            <div className={styles.actions} data-entrance-fade>
              <Link href="/" className={skewButtonStyles.button}>
                <span className={skewButtonStyles.label}>Volver al inicio</span>
              </Link>
              <Link href="/#catalogo" className={styles.catalogLink}>
                Ver catálogo
              </Link>
            </div>
          </div>

          <div className={styles.media}>
            <div className={styles.code} data-entrance-drop>
              <CutoutLetters text="404" />
            </div>
            {sticker ? (
              <PeelSticker
                src={sticker.image}
                alt={sticker.name}
                sizes={STICKER_SIZES}
              />
            ) : null}
          </div>
        </DiagonalEntrance>
      </section>
    </Layout>
  )
}

export default NotFoundPage

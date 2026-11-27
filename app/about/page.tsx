import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '@components/Layout/Layout'
import CutoutLetters from '@components/CutoutLetters/CutoutLetters'
import DiagonalEntrance from '@components/motion/DiagonalEntrance'
import ParallaxStage from '@components/motion/ParallaxStage'
import ParallaxLayer from '@components/motion/ParallaxLayer'
import Tilt from '@components/motion/Tilt'
import skewButtonStyles from '@components/SkewButton/styles.module.css'
import image from '@images/about.png'
import styles from './styles.module.css'

const TITLE = 'Quiénes somos'

export const metadata: Metadata = {
  title: 'Nosotros',
}

const AboutPage = () => {
  return (
    <Layout>
      <section className={styles.about}>
        <DiagonalEntrance>
          <ParallaxStage className={styles.stage}>
            <ParallaxLayer depth={1} className={styles.backdrop}>
              <div className={styles.sweep} data-entrance-sweep>
                <div className={styles.panel} />
              </div>
              <div className={styles.sweep} data-entrance-sweep>
                <div className={styles.slash} />
              </div>
            </ParallaxLayer>
            <ParallaxLayer depth={2} className={styles.backdrop}>
              <div className={styles.sweep} data-entrance-sweep>
                <div className={styles.halftone} />
              </div>
            </ParallaxLayer>

            <div className={styles.copy}>
              <h1 className={styles.title}>
                <CutoutLetters text={TITLE} />
              </h1>
              <p className={styles.description} data-entrance-fade>
                Somos una tienda con una trayectoria de más de 5 años
                dedicándonos a hacer los stickers de mayor calidad del mercado.
                Todos nuestros productos utilizan los mejores materiales además
                de pasar por un estricto proceso de calidad.
              </p>
              <div data-entrance-fade>
                <Link href="/#catalogo" className={skewButtonStyles.button}>
                  <span className={skewButtonStyles.label}>Ver catálogo</span>
                </Link>
              </div>
            </div>

            <ParallaxLayer depth={3} className={styles.media}>
              <div className={styles.imageDrop} data-entrance-drop>
                <Tilt>
                  <div className={styles.frame}>
                    <Image
                      src={image}
                      alt="Stickers de muestra"
                      sizes="(min-width: 960px) 300px, 60vw"
                      className={styles.image}
                      preload
                    />
                  </div>
                </Tilt>
              </div>
            </ParallaxLayer>
          </ParallaxStage>
        </DiagonalEntrance>
      </section>
    </Layout>
  )
}

export default AboutPage

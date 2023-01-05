import Image from 'next/image'
import styles from './styles.module.css'
import imageD from '@images/banner.png'

const Banner = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.texts}>
        <p>
          En HappyStickers:
          <strong>¡Stickers nuevos cada semana!</strong>
        </p>
        <a href="#search">¡Ir!</a>
      </div>
      <Image src={imageD} className={styles.image} alt="Stickers de muestra"/>
    </div>
  )
}

export default Banner

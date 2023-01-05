import Image from 'next/image'
import Layout from '@components/Layout/Layout'
import image from '@images/about.png'
import styles from './styles.module.css'
const about = () => {
  return (
    <Layout>
      <div className={styles.about}>
        <div className={styles.description}>
          <h2>Quienes somos</h2>
          <p>Somos una tienda de con una treyectoria de más de 5 años dedicandonos a hacer los stickers de mayor calidad del mercado.

    Todos nuestros productos utilizan los mejores materiales además de pasar por estricto proceso de calidad.
          </p>
        </div>
        <Image src={image} className={styles.image} alt="Stickers de muestra" />
      </div>
    </Layout>
  )
}

export default about

import Image from 'next/image'
import styles from './styles.module.css'

function Item({name, price, image}) {
  return (
    <div className={styles.item} >
      <div className={styles.price}>
        <p>${price}</p>
      </div>
      <Image src={image} className={styles.image} alt="Stickers de muestra" width={400} height={400}/>
      <div className={styles.name}>
        <p>{name}</p>
      </div>
    </div>
  )
}

export default Item

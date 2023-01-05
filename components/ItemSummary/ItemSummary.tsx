import styles from './styles.module.css'
import AddToCart from './AddToCart'

type ItemSummaryProps = {
  item: TItem
}

function ItemSummary({ item }: ItemSummaryProps) {
  return (
    <div className={styles.summary}>
      <div className={styles.container}>
        <div className={styles.item}>
          <img src={item.image} alt="" className={styles.image}/>
          <div className={styles.name}>
            <p>{item.name}</p>
          </div>
        </div>
        <div className={styles.description}>
          <p>{item.description}</p>
          <p><strong>Precio: ${item.price}</strong></p>
          <AddToCart product={item} ></AddToCart>
        </div>
      </div>
    </div>
  )
}

export default ItemSummary

import Item from '@components/Item/Item'
import styles from './styles.module.css'

const FEATURED_IMAGE_SIZES = '(min-width: 720px) 30vw, 90vw'

type FeaturedProps = {
  items: TItem[]
}

const Featured = ({ items }: FeaturedProps) => {
  return (
    <section className={styles.featured} aria-labelledby="featured-title">
      <div className={styles.heading}>
        <h2 id="featured-title" className={styles.title}>
          Destacados
        </h2>
        <p className={styles.lead}>
          Los primeros del catálogo, listos para pegar.
        </p>
      </div>
      <ul className={styles.stack}>
        {items.map((item) => (
          <li key={item.id} className={styles.stackItem}>
            <Item
              item={item}
              imageSizes={FEATURED_IMAGE_SIZES}
              className={styles.card}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Featured

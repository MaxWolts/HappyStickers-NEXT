import Image from 'next/image'
import Link from 'next/link'
import AddToCartButton from '@components/AddToCartButton/AddToCartButton'
import Tilt from '@components/motion/Tilt'
import { formatPrice } from '@lib/formatPrice'
import styles from './styles.module.css'

type ItemProps = {
  item: TItem
  imageSizes: string
  className?: string
}

const Item = ({ item, imageSizes, className }: ItemProps) => {
  const detailHref = `/item/${item.id}`
  const cardClassName = className ? `${styles.card} ${className}` : styles.card

  return (
    <article className={cardClassName}>
      <Tilt className={styles.sticker}>
        <Link
          href={detailHref}
          className={styles.stickerLink}
          tabIndex={-1}
          aria-hidden="true"
        >
          <Image
            src={item.image}
            alt=""
            fill
            sizes={imageSizes}
            className={styles.image}
          />
        </Link>
      </Tilt>
      <div className={styles.details}>
        <h3 className={styles.name}>
          <Link href={detailHref} className={styles.detailLink}>
            {item.name}
          </Link>
        </h3>
        <p className={styles.price}>{formatPrice(item.price)}</p>
      </div>
      <AddToCartButton item={item} className={styles.addButton} />
    </article>
  )
}

export default Item

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Layout from '@components/Layout/Layout'
import ItemSummary from '@components/ItemSummary/ItemSummary'
import Item from '@components/Item/Item'
import Reveal from '@components/motion/Reveal'
import DB from '@database'
import styles from './styles.module.css'

const RELATED_ITEM_COUNT = 4
const RELATED_IMAGE_SIZES =
  '(min-width: 1100px) 22vw, (min-width: 720px) 30vw, 45vw'

type ItemPageProps = {
  params: Promise<{ id: string }>
}

export const dynamicParams = false

const pickRelatedItems = (items: TItem[], currentId: string) => {
  const currentIndex = items.findIndex((item) => item.id === currentId)
  const relatedCount = Math.min(RELATED_ITEM_COUNT, items.length - 1)
  const relatedItems: TItem[] = []

  for (let offset = 1; offset <= relatedCount; offset += 1) {
    relatedItems.push(items[(currentIndex + offset) % items.length])
  }

  return relatedItems
}

export const generateStaticParams = async () => {
  const db = new DB()
  const itemList = await db.getAll()

  return itemList.map((item) => ({
    id: item.id,
  }))
}

export const generateMetadata = async ({
  params,
}: ItemPageProps): Promise<Metadata> => {
  const { id } = await params
  const db = new DB()
  const item = await db.getById(id)

  if (item == null) {
    return { title: 'HappyStickers' }
  }

  return { title: `${item.name} | HappyStickers` }
}

const ItemPage = async ({ params }: ItemPageProps) => {
  const { id } = await params
  const db = new DB()
  const itemList = await db.getAll()
  const item = itemList.find((candidate) => candidate.id === id)

  if (item == null) {
    notFound()
  }

  const relatedItems = pickRelatedItems(itemList, item.id)

  return (
    <Layout>
      <ItemSummary item={item} />
      <section className={styles.related} aria-labelledby="related-title">
        <h2 id="related-title" className={styles.relatedTitle}>
          Más stickers
        </h2>
        <Reveal stagger={0.08} className={styles.grid}>
          {relatedItems.map((relatedItem) => (
            <Item
              key={relatedItem.id}
              item={relatedItem}
              imageSizes={RELATED_IMAGE_SIZES}
            />
          ))}
        </Reveal>
      </section>
    </Layout>
  )
}

export default ItemPage

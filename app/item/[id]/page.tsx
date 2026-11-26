import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Layout from '@components/Layout/Layout'
import ItemSummary from '@components/ItemSummary/ItemSummary'
import DB from '@database'

type ItemPageProps = {
  params: Promise<{ id: string }>
}

export const dynamicParams = false

export const generateStaticParams = async () => {
  const db = new DB()
  const itemList = await db.getAll()

  return itemList.map((item) => ({
    id: item.id,
  }))
}

export const generateMetadata = async ({ params }: ItemPageProps): Promise<Metadata> => {
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
  const item = await db.getById(id)

  if (item == null) {
    notFound()
  }

  return (
    <Layout>
      <ItemSummary item={item} />
    </Layout>
  )
}

export default ItemPage

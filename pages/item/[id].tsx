import { GetStaticProps } from 'next'
import Layout from '@components/Layout/Layout'
import ItemSummary from '@components/ItemSummary/ItemSummary'
import DB from '@database'

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const db = new DB()
  const item = await db.getById(params.id as string)
  return {
    props: {
      item,
    }
  }
}

export const getStaticPaths = async () => {
  const db = new DB()
  const itemList = await db.getAll()

  const paths = itemList.map((item) => ({
    params: {
      id: item.id
    }
  }))

  return {
    paths: paths,
    fallback: false
  }
}

const ItemPage = ({item}: {item: TItem}) => {

  return (
    <Layout>
      {item == null ? null : <ItemSummary item={item} />}
    </Layout>
  )
}

export default ItemPage

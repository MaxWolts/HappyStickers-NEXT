import { server } from '../../config'
import { GetStaticProps } from 'next'
import Layout from '@components/Layout/Layout'
import ItemSummary from '@components/ItemSummary/ItemSummary'

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const response = await fetch(`${server}/api/items/${params.id}`)
  const item: TItem = await response.json()
  return {
    props: {
      item,
    }
  }
}

export const getStaticPaths = async () => {
  const response = await fetch(`${server}/api/items`)
  const { data: itemList }: TAPIItemsResponse = await response.json()

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

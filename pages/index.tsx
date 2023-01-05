import Layout from '@components/Layout/Layout'
import Banner from '@components/Banner/Banner'
import Items from '@components/Items/Items'
import { server } from '../config';

export const getStaticProps = async () => {
  const response = await fetch(`${server}/api/items`)
  const { data: itemList }: TAPIItemsResponse = await response.json()

  return {
    props: {
      itemList,
    }
  }
}

const HomePage = ( { itemList }: {itemList: TItem[]}) => {

  return (
    <Layout>
      <Banner/>
      <Items items={itemList}/>
    </Layout>
  )
}

export default HomePage

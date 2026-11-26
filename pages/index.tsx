import Layout from '@components/Layout/Layout'
import Banner from '@components/Banner/Banner'
import Items from '@components/Items/Items'
import DB from '@database'

export const getStaticProps = async () => {
  const db = new DB()
  const itemList = await db.getAll()

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

import Layout from '@components/Layout/Layout'
import Banner from '@components/Banner/Banner'
import Items from '@components/Items/Items'
import DB from '@database'

const HomePage = async () => {
  const db = new DB()
  const itemList = await db.getAll()

  return (
    <Layout>
      <Banner />
      <Items items={itemList} />
    </Layout>
  )
}

export default HomePage

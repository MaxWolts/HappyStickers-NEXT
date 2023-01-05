import Layout from '@components/Layout/Layout'
import Banner from '@components/Banner/Banner'
import Items from '@components/Items/Items'

import { server } from '../config';
import { useEffect, useState } from 'react';


// export const getStaticProps = async () => {

//   const response = await fetch(`${server}/api/items`)
//   const { data: itemList }: TAPIItemsResponse = await response.json()

//   return {
//     props: {
//       itemList,
//     }
//   }
// }




const HomePage = () => {
  const [itemList, setItemList] = useState<TItem[]>([])

  useEffect(() => {
    window.fetch(`/api/items`)
    .then((response) => response.json())
    .then(({data}: TAPIItemsResponse) => {
      setItemList(data)
    })
  }, [])

  return (
    <Layout>
      <Banner/>
      <Items items={itemList}/>
    </Layout>
  )
}

export default HomePage

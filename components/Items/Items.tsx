import Link from 'next/link'
import Item from "@components/Item/Item"
import styles from './styles.module.css'
import Searcher from '@components/Searcher/Searcher';
import { useState, useEffect } from 'react';

type ItemListProps = {
  items: TItem[]
}

// const mapItemsToCards = (items: TItem[]) =>
//   items.map(({ name, id, price, image }) => (
//     <Link key={id} href="/item/[id]" as={`/item/${id}`} passHref >
//       <Item name={name} price={price} image={image}/>
//     </Link>
//   ))
  const mapItemsToCardsSearcherd = (items: TItem[], searcher: string) => {
    if (searcher) {
      items = items.filter((item) => item.name.toLowerCase().includes(searcher))
    }
    return items.map(({ name, id, price, image }) => (
      <Link href="/item/[id]" as={`/item/${id}`} passHref key={id}>
        <Item name={name} price={price} image={image} />
      </Link>

    ))

  }

function Items({items}: ItemListProps) {
  const [searcher, setSearcher] = useState<string>()

  return (
    <>
      <Searcher setDataSearcher={setSearcher} />
      <div className={styles.items}>
        {mapItemsToCardsSearcherd(items, searcher)}
      </div>
    </>
  )
}


export default Items

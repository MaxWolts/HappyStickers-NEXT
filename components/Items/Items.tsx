'use client'

import { useState } from 'react'
import Link from 'next/link'
import Item from '@components/Item/Item'
import Searcher from '@components/Searcher/Searcher'
import styles from './styles.module.css'

type ItemListProps = {
  items: TItem[]
}

const filterItems = (items: TItem[], searcher: string) => {
  if (!searcher) {
    return items
  }
  return items.filter((item) => item.name.toLowerCase().includes(searcher))
}

function Items({ items }: ItemListProps) {
  const [searcher, setSearcher] = useState<string>('')
  const filteredItems = filterItems(items, searcher)

  return (
    <>
      <Searcher setDataSearcher={setSearcher} />
      <div className={styles.items}>
        {filteredItems.map(({ name, id, price, image }) => (
          <Link href={`/item/${id}`} key={id}>
            <Item name={name} price={price} image={image} />
          </Link>
        ))}
      </div>
    </>
  )
}

export default Items

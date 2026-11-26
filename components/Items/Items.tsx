'use client'

import { useState } from 'react'
import Item from '@components/Item/Item'
import Searcher from '@components/Searcher/Searcher'
import FlipGrid from '@components/motion/FlipGrid'
import Reveal from '@components/motion/Reveal'
import Tilt from '@components/motion/Tilt'
import styles from './styles.module.css'

type SortOrder = 'catalog' | 'name'

const CARD_IMAGE_SIZES =
  '(min-width: 1100px) 22vw, (min-width: 720px) 30vw, 45vw'

type ItemListProps = {
  items: TItem[]
}

const filterItemsByName = (items: TItem[], searchText: string) => {
  const normalizedSearch = searchText.trim().toLowerCase()
  if (!normalizedSearch) {
    return items
  }
  return items.filter((item) =>
    item.name.toLowerCase().includes(normalizedSearch),
  )
}

const sortItems = (items: TItem[], sortOrder: SortOrder) => {
  if (sortOrder === 'name') {
    return items.toSorted((first, second) =>
      first.name.localeCompare(second.name, 'es'),
    )
  }
  return items
}

const describeResultCount = (count: number) =>
  count === 1 ? '1 sticker' : `${count} stickers`

function Items({ items }: ItemListProps) {
  const [searchText, setSearchText] = useState<string>('')
  const [sortOrder, setSortOrder] = useState<SortOrder>('catalog')
  const visibleItems = sortItems(
    filterItemsByName(items, searchText),
    sortOrder,
  )

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value as SortOrder)
  }

  return (
    <section
      id="catalogo"
      className={styles.catalog}
      aria-labelledby="catalogo-title"
    >
      <div className={styles.heading}>
        <h2 id="catalogo-title" className={styles.title}>
          Catálogo
        </h2>
        <p className={styles.resultCount} aria-live="polite">
          {describeResultCount(visibleItems.length)}
        </p>
      </div>

      <div className={styles.toolbar}>
        <Searcher value={searchText} onSearchChange={setSearchText} />
        <div className={styles.sortField}>
          <label htmlFor="sticker-sort" className={styles.sortLabel}>
            Ordenar por
          </label>
          <select
            id="sticker-sort"
            className={styles.sortSelect}
            value={sortOrder}
            onChange={handleSortChange}
          >
            <option value="catalog">Orden del catálogo</option>
            <option value="name">Nombre (A-Z)</option>
          </select>
        </div>
      </div>

      {visibleItems.length === 0 ? (
        <p className={styles.empty}>
          Ningún sticker coincide con «{searchText.trim()}». Prueba con otro
          nombre.
        </p>
      ) : null}

      <Reveal>
        <FlipGrid
          layoutKey={`${searchText}|${sortOrder}`}
          className={styles.grid}
        >
          {visibleItems.map((item) => (
            <Tilt key={item.id} className={styles.tilt}>
              <Item item={item} imageSizes={CARD_IMAGE_SIZES} />
            </Tilt>
          ))}
        </FlipGrid>
      </Reveal>
    </section>
  )
}

export default Items

import Layout from '@components/Layout/Layout'
import Hero, { type HeroSticker } from '@components/Hero/Hero'
import Items from '@components/Items/Items'
import DB from '@database'

const HERO_STICKER_COUNT = 7
const HERO_FIRST_STICKER_INDEX = 4

const pickHeroStickers = (items: TItem[]): HeroSticker[] => {
  const spacing = Math.max(
    1,
    Math.floor((items.length - HERO_FIRST_STICKER_INDEX) / HERO_STICKER_COUNT),
  )
  const heroStickers: HeroSticker[] = []

  for (
    let index = HERO_FIRST_STICKER_INDEX;
    index < items.length && heroStickers.length < HERO_STICKER_COUNT;
    index += spacing
  ) {
    const { id, name, image } = items[index]
    heroStickers.push({ id, name, image })
  }

  return heroStickers
}

const HomePage = async () => {
  const db = new DB()
  const itemList = await db.getAll()
  const heroStickers = pickHeroStickers(itemList)

  return (
    <Layout>
      <Hero stickers={heroStickers} />
      <Items items={itemList} />
    </Layout>
  )
}

export default HomePage

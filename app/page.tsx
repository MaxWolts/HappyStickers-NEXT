import Layout from '@components/Layout/Layout'
import Hero, { type HeroSticker } from '@components/Hero/Hero'
import CrossedMarquee from '@components/CrossedMarquee/CrossedMarquee'
import Featured from '@components/Featured/Featured'
import Items from '@components/Items/Items'
import DB from '@database'

const FEATURED_ITEM_COUNT = 3
const HERO_STICKER_NAMES = [
  'Pikachu :o',
  'Pucca',
  'Psyduck',
  'Jinx',
  'Geralt',
  'Ahri',
  'Syndra',
]

const pickHeroStickers = (items: TItem[]): HeroSticker[] => {
  const heroStickers: HeroSticker[] = []

  for (const stickerName of HERO_STICKER_NAMES) {
    const item = items.find((candidate) => candidate.name === stickerName)
    if (item) {
      heroStickers.push({ id: item.id, name: item.name, image: item.image })
    }
  }

  return heroStickers
}

const HomePage = async () => {
  const db = new DB()
  const itemList = await db.getAll()
  const heroStickers = pickHeroStickers(itemList)
  const featuredItems = itemList.slice(0, FEATURED_ITEM_COUNT)

  return (
    <Layout>
      <Hero stickers={heroStickers} />
      <CrossedMarquee />
      <Featured items={featuredItems} />
      <Items items={itemList} />
    </Layout>
  )
}

export default HomePage

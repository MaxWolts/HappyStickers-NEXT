import allData from './data'

class Database {
  constructor() {}

  async getAll(): Promise<TItem[]> {
    const asArray = Object.values(allData)
    await randomDelay()
    return asArray
  }

  async getById(id: string): Promise<TItem | null> {
    if (!Object.prototype.hasOwnProperty.call(allData, id)) {
      return null
    }

    const entry = allData[id]
    await randomDelay()
    return entry
  }
  async getByName(name: string): Promise<TItem[] | null> {
    if (!Object.prototype.hasOwnProperty.call(allData, name)) {
      return null
    }
    const asArray = Object.values(allData)
    const entry = asArray.filter((item)=>item.name.includes(name))
    await randomDelay()
    return entry
  }
}

// Let's also add a delay to make it a bit closer to reality
const randomDelay = () =>
  new Promise((resolve) => {
    const max = 350
    const min = 100
    const delay = Math.floor(Math.random() * (max - min + 1)) + min

    setTimeout(resolve, delay)
  })

export default Database

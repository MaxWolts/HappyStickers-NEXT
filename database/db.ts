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
  async getByName(name: string): Promise<TItem[]> {
    const searchName = name.toLowerCase()
    const asArray = Object.values(allData)
    const entries = asArray.filter((item) => item.name.toLowerCase().includes(searchName))
    await randomDelay()
    return entries
  }
}

const randomDelay = () =>
  new Promise((resolve) => {
    const max = 350
    const min = 100
    const delay = Math.floor(Math.random() * (max - min + 1)) + min

    setTimeout(resolve, delay)
  })

export default Database

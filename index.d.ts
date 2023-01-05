type TItem = {
  id: TItemId
  name: string
  price: number
  image: Url
  description: string
}
type TItemId = string

type Url = string
type Json =
  | string
  | number
  | boolean
  | null
  | { [property: string]: Json }
  | Json[]

type TAPIITEMSDetailResponse = TItem

type TAPIItemsResponse = {
  length: number
  data: TItem[]
  error?: string
}

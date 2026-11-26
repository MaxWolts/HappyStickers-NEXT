import { NextResponse } from 'next/server'
import DB from '@database'

type RouteContext = {
  params: Promise<{ id: string }>
}

export const GET = async (request: Request, { params }: RouteContext) => {
  const { id } = await params
  const db = new DB()
  const item = await db.getById(id)

  if (item == null) {
    return NextResponse.json({ error: 'Item not found' }, { status: 404 })
  }

  return NextResponse.json(item)
}

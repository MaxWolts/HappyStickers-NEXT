import { NextResponse } from 'next/server'
import DB from '@database'

export const GET = async () => {
  try {
    const db = new DB()
    const allEntries = await db.getAll()

    return NextResponse.json({ length: allEntries.length, data: allEntries })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { length: 0, data: [], error: 'Something went wrong' },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    const listmonkUrl = process.env.LISTMONK_SUBSCRIBE_URL

    if (listmonkUrl) {
      const res = await fetch(listmonkUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) {
        console.error('Listmonk subscription failed:', await res.text())
        return NextResponse.json({ error: 'Subscription failed' }, { status: 500 })
      }
    } else {
      console.log('[Newsletter] Subscription (LISTMONK_SUBSCRIBE_URL not set):', email)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Subscribe route error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

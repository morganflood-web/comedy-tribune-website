import { cookies } from 'next/headers'
import { createHash } from 'crypto'

export function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex')
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const authCookie = cookieStore.get('admin_auth')
  if (!authCookie) return false
  const adminPassword = process.env.ADMIN_PASSWORD || ''
  const expectedHash = hashPassword(adminPassword)
  return authCookie.value === expectedHash
}

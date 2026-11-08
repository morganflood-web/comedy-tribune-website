'use server'

import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createDoc(formData: FormData) {
  const episode_number = formData.get('episode_number') as string
  const subject = formData.get('subject') as string
  const title = formData.get('title') as string
  const thumbnail = formData.get('thumbnail') as string
  const youtube_url = formData.get('youtube_url') as string
  const status = formData.get('status') as string
  const published = formData.get('published') === 'on'

  await sql`
    INSERT INTO docs (episode_number, subject, title, thumbnail, youtube_url, status, published)
    VALUES (${episode_number}, ${subject}, ${title}, ${thumbnail || null}, ${youtube_url || null}, ${status || 'coming_soon'}, ${published})
  `

  revalidatePath('/')
  revalidatePath('/docs')
  redirect('/admin/docs')
}

export async function deleteDoc(id: number) {
  await sql`DELETE FROM docs WHERE id = ${id}`
  revalidatePath('/')
  revalidatePath('/docs')
}

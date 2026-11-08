'use server'

import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createArticle(formData: FormData) {
  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const author_name = formData.get('author_name') as string
  const author_bio = formData.get('author_bio') as string
  const author_headshot = formData.get('author_headshot') as string
  const category = formData.get('category') as string
  const thumbnail = formData.get('thumbnail') as string
  const excerpt = formData.get('excerpt') as string
  const body = formData.get('body') as string
  const published = formData.get('published') === 'on'
  const featured = formData.get('featured') === 'on'

  await sql`
    INSERT INTO articles (title, slug, author_name, author_bio, author_headshot, category, thumbnail, excerpt, body, published, featured)
    VALUES (${title}, ${slug}, ${author_name}, ${author_bio || null}, ${author_headshot || null}, ${category}, ${thumbnail || null}, ${excerpt || null}, ${body || null}, ${published}, ${featured})
  `

  revalidatePath('/')
  revalidatePath('/articles')
  redirect('/admin/articles')
}

export async function updateArticle(formData: FormData) {
  const id = parseInt(formData.get('id') as string, 10)
  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const author_name = formData.get('author_name') as string
  const author_bio = formData.get('author_bio') as string
  const author_headshot = formData.get('author_headshot') as string
  const category = formData.get('category') as string
  const thumbnail = formData.get('thumbnail') as string
  const excerpt = formData.get('excerpt') as string
  const body = formData.get('body') as string
  const published = formData.get('published') === 'on'
  const featured = formData.get('featured') === 'on'

  await sql`
    UPDATE articles
    SET title = ${title}, slug = ${slug}, author_name = ${author_name},
        author_bio = ${author_bio || null}, author_headshot = ${author_headshot || null},
        category = ${category}, thumbnail = ${thumbnail || null},
        excerpt = ${excerpt || null}, body = ${body || null},
        published = ${published}, featured = ${featured}
    WHERE id = ${id}
  `

  revalidatePath('/')
  revalidatePath('/articles')
  revalidatePath(`/articles/${slug}`)
  redirect('/admin/articles')
}

export async function deleteArticle(id: number) {
  await sql`DELETE FROM articles WHERE id = ${id}`
  revalidatePath('/')
  revalidatePath('/articles')
}

export async function toggleArticlePublished(id: number, published: boolean) {
  await sql`UPDATE articles SET published = ${published} WHERE id = ${id}`
  revalidatePath('/')
  revalidatePath('/articles')
}

export async function toggleArticleFeatured(id: number, featured: boolean) {
  if (featured) {
    // Unfeature all others first
    await sql`UPDATE articles SET featured = false`
  }
  await sql`UPDATE articles SET featured = ${featured} WHERE id = ${id}`
  revalidatePath('/')
}

import { sql } from '@vercel/postgres'

export interface Article {
  id: number
  title: string
  slug: string
  author_name: string
  author_bio: string | null
  author_headshot: string | null
  category: string
  thumbnail: string | null
  body: string | null
  excerpt: string | null
  publish_date: string
  published: boolean
  featured: boolean
  created_at: string
}

export interface Doc {
  id: number
  episode_number: string
  subject: string
  title: string
  thumbnail: string | null
  youtube_url: string | null
  status: string
  published: boolean
  created_at: string
}

export async function getFeaturedArticle(): Promise<Article | null> {
  try {
    const result = await sql<Article>`
      SELECT * FROM articles
      WHERE published = true AND featured = true
      ORDER BY publish_date DESC
      LIMIT 1
    `
    return result.rows[0] ?? null
  } catch {
    return null
  }
}

export async function getRecentArticles(limit: number = 10): Promise<Article[]> {
  try {
    const result = await sql<Article>`
      SELECT * FROM articles
      WHERE published = true
      ORDER BY publish_date DESC
      LIMIT ${limit}
    `
    return result.rows
  } catch {
    return []
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const result = await sql<Article>`
      SELECT * FROM articles
      WHERE slug = ${slug} AND published = true
      LIMIT 1
    `
    return result.rows[0] ?? null
  } catch {
    return null
  }
}

export async function getArticlesByCategory(category: string): Promise<Article[]> {
  try {
    const result = await sql<Article>`
      SELECT * FROM articles
      WHERE published = true AND category = ${category}
      ORDER BY publish_date DESC
    `
    return result.rows
  } catch {
    return []
  }
}

export async function getAllPublishedDocs(): Promise<Doc[]> {
  try {
    const result = await sql<Doc>`
      SELECT * FROM docs
      WHERE published = true
      ORDER BY created_at DESC
    `
    return result.rows
  } catch {
    return []
  }
}

export async function getArticleCount(): Promise<number> {
  try {
    const result = await sql<{ count: string }>`
      SELECT COUNT(*) as count FROM articles
    `
    return parseInt(result.rows[0]?.count ?? '0', 10)
  } catch {
    return 0
  }
}

export async function getDocCount(): Promise<number> {
  try {
    const result = await sql<{ count: string }>`
      SELECT COUNT(*) as count FROM docs
    `
    return parseInt(result.rows[0]?.count ?? '0', 10)
  } catch {
    return 0
  }
}

export async function getAllArticlesAdmin(): Promise<Article[]> {
  try {
    const result = await sql<Article>`
      SELECT * FROM articles
      ORDER BY created_at DESC
    `
    return result.rows
  } catch {
    return []
  }
}

export async function getArticleByIdAdmin(id: number): Promise<Article | null> {
  try {
    const result = await sql<Article>`
      SELECT * FROM articles WHERE id = ${id} LIMIT 1
    `
    return result.rows[0] ?? null
  } catch {
    return null
  }
}

export async function getAllDocsAdmin(): Promise<Doc[]> {
  try {
    const result = await sql<Doc>`
      SELECT * FROM docs ORDER BY created_at DESC
    `
    return result.rows
  } catch {
    return []
  }
}

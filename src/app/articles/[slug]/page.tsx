import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getArticleBySlug, getRecentArticles } from '@/lib/db'
import { ArticleCardLarge } from '@/components/ArticleCard'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import ShareBox from '@/components/ShareBox'

export const revalidate = 60

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return { title: 'Not Found' }
  return {
    title: `${article.title} — The Comedy Tribune`,
    description: article.excerpt ?? undefined,
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()

  const recent = await getRecentArticles(10)
  const related = recent.filter(a => a.id !== article.id).slice(0, 3)

  return (
    <div style={{ backgroundColor: '#F5F0E8' }} className="min-h-screen pt-16 sm:pt-20">
      {/* Full-width hero image */}
      {article.thumbnail && (
        <div className="relative w-full h-[50vh] min-h-[300px] max-h-[520px]">
          <Image
            src={article.thumbnail}
            alt={article.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F5F0E8] via-transparent to-transparent" />
        </div>
      )}

      {/* Article content */}
      <div className="max-w-[720px] mx-auto px-4 sm:px-6 py-10">
        {/* Category tag */}
        <div className="mb-4">
          <Link
            href={`/articles?category=${encodeURIComponent(article.category)}`}
            className="inline-block font-inter text-xs font-semibold tracking-widest uppercase text-[#5B9BD5] hover:opacity-80"
          >
            {article.category}
          </Link>
        </div>

        {/* Headline */}
        <h1 className="font-barlow text-5xl sm:text-6xl font-extrabold italic text-[#1A1A1A] leading-tight mb-6">
          {article.title}
        </h1>

        {/* Byline */}
        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-[#E5E5E5]">
          {article.author_headshot && (
            <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={article.author_headshot}
                alt={article.author_name}
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
          )}
          <div>
            <p className="font-inter text-sm font-semibold text-[#5B9BD5]">
              {article.author_name}
            </p>
            <p className="font-inter text-xs text-[#666666]">
              {formatDate(article.publish_date)}
            </p>
          </div>
        </div>

        {/* Body */}
        {article.body && (
          <div className="mb-10">
            <MarkdownRenderer content={article.body} />
          </div>
        )}

        {/* Share / referral box */}
        <ShareBox title={article.title} slug={article.slug} />

        {/* Author card */}
        <div
          className="rounded p-6 mb-10 flex gap-4 items-start"
          style={{ backgroundColor: '#EDE8DF' }}
        >
          {article.author_headshot && (
            <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={article.author_headshot}
                alt={article.author_name}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
          )}
          <div>
            <p className="font-inter text-sm font-semibold text-[#5B9BD5] mb-1">
              {article.author_name}
            </p>
            {article.author_bio && (
              <p className="font-inter text-sm text-[#666666] leading-relaxed">
                {article.author_bio}
              </p>
            )}
          </div>
        </div>

        {/* Comments placeholder */}
        <div className="mb-14 py-8 border-t border-b border-[#E5E5E5] text-center">
          <p className="font-inter text-sm text-[#666666] italic">
            Comments coming soon.
          </p>
        </div>
      </div>

      {/* Related Stories */}
      {related.length > 0 && (
        <section style={{ backgroundColor: '#FFFFFF' }} className="py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-barlow text-xs font-bold uppercase tracking-widest text-[#666666] mb-6 pb-2 border-b border-[#E5E5E5]">
              Related Stories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {related.map(a => (
                <ArticleCardLarge key={a.id} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

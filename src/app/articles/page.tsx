import Link from 'next/link'
import { getRecentArticles, getArticlesByCategory } from '@/lib/db'
import { ArticleListItem } from '@/components/ArticleCard'

export const revalidate = 60

const CATEGORIES = ['All', 'Opinion', 'Industry', 'Interviews', 'Behind the Series', 'Docs']

interface ArticlesPageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const params = await searchParams
  const activeCategory = params.category || 'All'

  const articles =
    activeCategory === 'All'
      ? await getRecentArticles(50)
      : await getArticlesByCategory(activeCategory)

  return (
    <div className="pt-16 sm:pt-20 min-h-screen" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8 pb-4 border-b border-[#E5E5E5]">
          <h1 className="font-barlow text-5xl font-extrabold italic text-[#1A1A1A] mb-2">
            Articles
          </h1>
          <p className="font-inter text-sm text-[#666666]">
            Comedy history, industry analysis, and insider perspective.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(cat => (
            <Link
              key={cat}
              href={cat === 'All' ? '/articles' : `/articles?category=${encodeURIComponent(cat)}`}
              className={`px-4 py-1.5 rounded font-inter text-xs font-medium tracking-wide uppercase transition-colors ${
                activeCategory === cat
                  ? 'bg-[#5B9BD5] text-white'
                  : 'bg-[#F8F8F8] text-[#666666] hover:bg-[#E5E5E5]'
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Articles list */}
        {articles.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-inter text-[#666666]">No articles found in this category yet.</p>
          </div>
        ) : (
          <div>
            {articles.map(article => (
              <ArticleListItem key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

import { getFeaturedArticle, getRecentArticles, getAllPublishedDocs } from '@/lib/db'
import HeroSection from '@/components/HeroSection'
import { ArticleCardLarge, ArticleListItem } from '@/components/ArticleCard'
import DocCard from '@/components/DocCard'
import NewsletterSignup from '@/components/NewsletterSignup'

export const revalidate = 60

export default async function HomePage() {
  const [featured, recent, docs] = await Promise.all([
    getFeaturedArticle(),
    getRecentArticles(10),
    getAllPublishedDocs(),
  ])

  // Filter out the featured article from recent list
  const filteredRecent = recent.filter(a => !featured || a.id !== featured.id)
  const nextUpArticles = filteredRecent.slice(0, 2)
  const feedArticles = filteredRecent.slice(2)

  return (
    <div className="pt-16 sm:pt-20">
      {/* Hero */}
      <HeroSection article={featured} />

      {/* NEXT UP — 2-col grid */}
      {nextUpArticles.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h2 className="font-barlow text-xs font-bold uppercase tracking-widest text-[#666666] mb-6 pb-2 border-b border-[#E5E5E5]">
            Next Up
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {nextUpArticles.map(article => (
              <ArticleCardLarge key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* MORE FROM THE TRIBUNE — list feed */}
      {feedArticles.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
          <h2 className="font-barlow text-xs font-bold uppercase tracking-widest text-[#666666] mb-2 pb-2 border-b border-[#E5E5E5]">
            More From The Tribune
          </h2>
          <div>
            {feedArticles.map(article => (
              <ArticleListItem key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* DOCS STRIP */}
      {docs.length > 0 && (
        <section style={{ backgroundColor: '#2D2D2D' }} className="py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-barlow text-xs font-bold uppercase tracking-widest text-gray-500 mb-6 pb-2 border-b border-gray-700">
              The Comedy Tribune Docs
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {docs.slice(0, 3).map(doc => (
                <DocCard key={doc.id} doc={doc} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* MISSION STRIP */}
      <section style={{ backgroundColor: '#F8F8F8' }} className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="font-barlow text-3xl sm:text-4xl font-extrabold italic text-[#1A1A1A] leading-tight mb-4"
            style={{ borderLeft: '4px solid #5B9BD5', paddingLeft: '1.5rem', textAlign: 'left' }}
          >
            "Comedy history deserves the same seriousness as music or film history."
          </div>
          <p className="font-inter text-sm text-[#666666] text-left pl-8 mt-4">
            The Comedy Tribune — read in 100+ countries. Produced under Macaw Studios.
          </p>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <NewsletterSignup />
        </div>
      </section>
    </div>
  )
}

import Image from 'next/image'
import Link from 'next/link'
import { Article } from '@/lib/db'

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

interface HeroSectionProps {
  article: Article | null
}

export default function HeroSection({ article }: HeroSectionProps) {
  if (!article) {
    return (
      <section className="relative w-full h-[70vh] min-h-[500px] flex items-end" style={{ backgroundColor: '#2D2D2D' }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <span className="inline-block font-inter text-xs font-medium tracking-widest uppercase text-[#5B9BD5] mb-3">
            Featured
          </span>
          <h1 className="font-barlow text-5xl sm:text-7xl font-extrabold italic text-white leading-tight max-w-4xl">
            The Comedy Tribune
          </h1>
          <p className="font-inter text-lg text-gray-300 mt-4 max-w-2xl">
            Serious coverage of comedy history, the business of comedy, and the legends who built the art form.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="relative w-full h-[75vh] min-h-[550px] flex items-end group">
      {/* Background image */}
      {article.thumbnail ? (
        <Image
          src={article.thumbnail}
          alt={article.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      ) : (
        <div className="absolute inset-0" style={{ backgroundColor: '#2D2D2D' }} />
      )}

      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 w-full">
        <span className="inline-block font-inter text-xs font-medium tracking-widest uppercase text-[#5B9BD5] mb-3">
          {article.category}
        </span>
        <h1 className="font-barlow text-5xl sm:text-6xl lg:text-7xl font-extrabold italic text-white leading-tight max-w-4xl mb-4">
          {article.title}
        </h1>
        {article.excerpt && (
          <p className="font-inter text-base sm:text-lg text-gray-300 max-w-2xl mb-6 line-clamp-3">
            {article.excerpt}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-inter text-sm font-semibold text-[#5B9BD5]">
              {article.author_name}
            </span>
            <span className="text-gray-500">·</span>
            <span className="font-inter text-sm text-gray-400">
              {formatDate(article.publish_date)}
            </span>
          </div>
          <Link
            href={`/articles/${article.slug}`}
            className="inline-block px-6 py-2.5 bg-[#5B9BD5] text-white font-inter text-sm font-medium rounded hover:bg-[#4a89c3] transition-colors"
          >
            Read More →
          </Link>
        </div>
      </div>
    </section>
  )
}

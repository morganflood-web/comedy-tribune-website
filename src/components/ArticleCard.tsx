import Image from 'next/image'
import Link from 'next/link'
import { Article } from '@/lib/db'

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

interface ArticleCardLargeProps {
  article: Article
}

export function ArticleCardLarge({ article }: ArticleCardLargeProps) {
  return (
    <Link href={`/articles/${article.slug}`} className="group block">
      <div className="relative w-full aspect-video rounded overflow-hidden mb-3">
        {article.thumbnail ? (
          <Image
            src={article.thumbnail}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#2D2D2D] to-[#5B9BD5]" />
        )}
      </div>
      <div>
        <span className="inline-block font-inter text-xs font-medium tracking-widest uppercase text-[#5B9BD5] mb-2">
          {article.category}
        </span>
        <h3 className="font-barlow text-2xl font-extrabold italic text-[#1A1A1A] group-hover:text-[#5B9BD5] transition-colors leading-tight mb-2">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="font-inter text-sm text-[#666666] line-clamp-2 mb-3">
            {article.excerpt}
          </p>
        )}
        <div className="flex items-center gap-2">
          <span className="font-inter text-sm font-semibold text-[#5B9BD5]">
            {article.author_name}
          </span>
          <span className="text-[#E5E5E5]">·</span>
          <span className="font-inter text-xs text-[#666666]">
            {formatDate(article.publish_date)}
          </span>
        </div>
      </div>
    </Link>
  )
}

interface ArticleListItemProps {
  article: Article
}

export function ArticleListItem({ article }: ArticleListItemProps) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group flex gap-4 py-4 border-b border-[#E5E5E5] last:border-b-0 hover:opacity-80 transition-opacity"
    >
      {/* Thumbnail */}
      <div className="relative flex-shrink-0 w-40 h-24 rounded overflow-hidden">
        {article.thumbnail ? (
          <Image
            src={article.thumbnail}
            alt={article.title}
            fill
            className="object-cover"
            sizes="160px"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#2D2D2D] to-[#5B9BD5]" />
        )}
      </div>
      {/* Text */}
      <div className="flex-1 min-w-0">
        <span className="inline-block font-inter text-xs font-medium tracking-widest uppercase text-[#5B9BD5] mb-1">
          {article.category}
        </span>
        <h3 className="font-barlow text-xl font-extrabold italic text-[#1A1A1A] group-hover:text-[#5B9BD5] transition-colors leading-tight mb-1 line-clamp-2">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="font-inter text-xs text-[#666666] line-clamp-2 mb-2">
            {article.excerpt}
          </p>
        )}
        <div className="flex items-center gap-2">
          <span className="font-inter text-xs font-semibold text-[#5B9BD5]">
            {article.author_name}
          </span>
          <span className="text-[#E5E5E5] text-xs">·</span>
          <span className="font-inter text-xs text-[#666666]">
            {formatDate(article.publish_date)}
          </span>
        </div>
      </div>
    </Link>
  )
}

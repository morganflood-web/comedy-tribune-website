import Link from 'next/link'
import { getArticleCount, getDocCount } from '@/lib/db'

export default async function AdminDashboardPage() {
  const [articleCount, docCount] = await Promise.all([
    getArticleCount(),
    getDocCount(),
  ])

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-barlow text-4xl font-extrabold italic text-[#1A1A1A]">
          Dashboard
        </h1>
        <p className="font-inter text-sm text-[#666666] mt-1">
          Comedy Tribune editorial overview
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        <div className="rounded p-6 bg-white border border-[#E5E5E5]">
          <p className="font-inter text-xs font-medium tracking-widest uppercase text-[#666666] mb-1">
            Total Articles
          </p>
          <p className="font-barlow text-5xl font-extrabold italic text-[#1A1A1A]">
            {articleCount}
          </p>
        </div>
        <div className="rounded p-6 bg-white border border-[#E5E5E5]">
          <p className="font-inter text-xs font-medium tracking-widest uppercase text-[#666666] mb-1">
            Documentary Episodes
          </p>
          <p className="font-barlow text-5xl font-extrabold italic text-[#1A1A1A]">
            {docCount}
          </p>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mb-8">
        <h2 className="font-barlow text-xs font-bold uppercase tracking-widest text-[#666666] mb-4 pb-2 border-b border-[#E5E5E5]">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/articles/new"
            className="px-5 py-2.5 bg-[#5B9BD5] text-white font-inter text-sm font-medium rounded hover:bg-[#4a89c3] transition-colors"
          >
            + New Article
          </Link>
          <Link
            href="/admin/docs/new"
            className="px-5 py-2.5 bg-[#2D2D2D] text-white font-inter text-sm font-medium rounded hover:bg-black transition-colors"
          >
            + New Doc Episode
          </Link>
          <Link
            href="/admin/articles"
            className="px-5 py-2.5 bg-white text-[#1A1A1A] border border-[#E5E5E5] font-inter text-sm font-medium rounded hover:bg-[#F8F8F8] transition-colors"
          >
            Manage Articles
          </Link>
          <Link
            href="/admin/docs"
            className="px-5 py-2.5 bg-white text-[#1A1A1A] border border-[#E5E5E5] font-inter text-sm font-medium rounded hover:bg-[#F8F8F8] transition-colors"
          >
            Manage Docs
          </Link>
        </div>
      </div>
    </div>
  )
}

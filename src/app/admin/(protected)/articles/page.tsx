import Link from 'next/link'
import { getAllArticlesAdmin } from '@/lib/db'
import { deleteArticle, toggleArticlePublished, toggleArticleFeatured } from './actions'

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export default async function AdminArticlesPage() {
  const articles = await getAllArticlesAdmin()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-barlow text-4xl font-extrabold italic text-[#1A1A1A]">Articles</h1>
          <p className="font-inter text-sm text-[#666666] mt-1">{articles.length} total</p>
        </div>
        <Link
          href="/admin/articles/new"
          className="px-4 py-2 bg-[#5B9BD5] text-white font-inter text-sm font-medium rounded hover:bg-[#4a89c3] transition-colors"
        >
          + New Article
        </Link>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-16 bg-white rounded border border-[#E5E5E5]">
          <p className="font-inter text-[#666666]">No articles yet.</p>
          <Link href="/admin/articles/new" className="text-[#5B9BD5] font-inter text-sm mt-2 inline-block">
            Create the first one →
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded border border-[#E5E5E5] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: '#F8F8F8' }} className="border-b border-[#E5E5E5]">
                <th className="text-left px-4 py-3 font-inter text-xs font-semibold uppercase tracking-wider text-[#666666]">Title</th>
                <th className="text-left px-4 py-3 font-inter text-xs font-semibold uppercase tracking-wider text-[#666666] hidden sm:table-cell">Category</th>
                <th className="text-left px-4 py-3 font-inter text-xs font-semibold uppercase tracking-wider text-[#666666] hidden md:table-cell">Date</th>
                <th className="text-center px-4 py-3 font-inter text-xs font-semibold uppercase tracking-wider text-[#666666]">Pub</th>
                <th className="text-center px-4 py-3 font-inter text-xs font-semibold uppercase tracking-wider text-[#666666]">Feat</th>
                <th className="text-right px-4 py-3 font-inter text-xs font-semibold uppercase tracking-wider text-[#666666]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article, i) => (
                <tr
                  key={article.id}
                  className={`border-b border-[#E5E5E5] last:border-0 hover:bg-[#F8F8F8] transition-colors ${i % 2 === 1 ? 'bg-[#FAFAFA]' : ''}`}
                >
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-inter text-sm font-medium text-[#1A1A1A] line-clamp-1">{article.title}</p>
                      <p className="font-inter text-xs text-[#666666]">{article.slug}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="inline-block font-inter text-xs font-medium px-2 py-0.5 rounded bg-[#F0F0F0] text-[#666666]">
                      {article.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-inter text-xs text-[#666666] hidden md:table-cell">
                    {formatDate(article.publish_date)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <form action={toggleArticlePublished.bind(null, article.id, !article.published)}>
                      <button
                        type="submit"
                        className={`w-10 h-5 rounded-full transition-colors ${
                          article.published ? 'bg-[#5B9BD5]' : 'bg-gray-300'
                        }`}
                        title={article.published ? 'Published — click to unpublish' : 'Draft — click to publish'}
                      >
                        <span className={`block w-4 h-4 rounded-full bg-white shadow mx-auto transition-transform ${article.published ? 'translate-x-2' : '-translate-x-2'}`} />
                      </button>
                    </form>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <form action={toggleArticleFeatured.bind(null, article.id, !article.featured)}>
                      <button
                        type="submit"
                        className={`font-inter text-xs font-medium px-2 py-0.5 rounded transition-colors ${
                          article.featured
                            ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                        }`}
                        title={article.featured ? 'Featured — click to unfeature' : 'Click to feature'}
                      >
                        {article.featured ? '★' : '☆'}
                      </button>
                    </form>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/articles/${article.id}/edit`}
                        className="font-inter text-xs text-[#5B9BD5] hover:underline"
                      >
                        Edit
                      </Link>
                      <form action={deleteArticle.bind(null, article.id)}>
                        <button
                          type="submit"
                          className="font-inter text-xs text-red-500 hover:text-red-700 transition-colors"
                          onClick={(e) => {
                            if (!confirm(`Delete "${article.title}"?`)) e.preventDefault()
                          }}
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

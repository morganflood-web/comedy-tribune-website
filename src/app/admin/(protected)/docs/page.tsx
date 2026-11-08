import Link from 'next/link'
import { getAllDocsAdmin } from '@/lib/db'
import { deleteDoc } from './actions'

function statusLabel(status: string): string {
  switch (status) {
    case 'in_production': return 'In Production'
    case 'available': return 'Available'
    default: return 'Coming Soon'
  }
}

export default async function AdminDocsPage() {
  const docs = await getAllDocsAdmin()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-barlow text-4xl font-extrabold italic text-[#1A1A1A]">Docs</h1>
          <p className="font-inter text-sm text-[#666666] mt-1">{docs.length} episodes</p>
        </div>
        <Link
          href="/admin/docs/new"
          className="px-4 py-2 bg-[#2D2D2D] text-white font-inter text-sm font-medium rounded hover:bg-black transition-colors"
        >
          + New Episode
        </Link>
      </div>

      {docs.length === 0 ? (
        <div className="text-center py-16 bg-white rounded border border-[#E5E5E5]">
          <p className="font-inter text-[#666666]">No doc episodes yet.</p>
          <Link href="/admin/docs/new" className="text-[#5B9BD5] font-inter text-sm mt-2 inline-block">
            Add the first one →
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded border border-[#E5E5E5] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: '#F8F8F8' }} className="border-b border-[#E5E5E5]">
                <th className="text-left px-4 py-3 font-inter text-xs font-semibold uppercase tracking-wider text-[#666666]">Episode</th>
                <th className="text-left px-4 py-3 font-inter text-xs font-semibold uppercase tracking-wider text-[#666666]">Title</th>
                <th className="text-left px-4 py-3 font-inter text-xs font-semibold uppercase tracking-wider text-[#666666] hidden sm:table-cell">Status</th>
                <th className="text-left px-4 py-3 font-inter text-xs font-semibold uppercase tracking-wider text-[#666666] hidden md:table-cell">Published</th>
                <th className="text-right px-4 py-3 font-inter text-xs font-semibold uppercase tracking-wider text-[#666666]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {docs.map((doc) => (
                <tr key={doc.id} className="border-b border-[#E5E5E5] last:border-0 hover:bg-[#F8F8F8] transition-colors">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-inter text-sm font-medium text-[#1A1A1A]">{doc.episode_number}</p>
                      <p className="font-inter text-xs text-[#666666]">{doc.subject}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-inter text-sm text-[#1A1A1A] line-clamp-1">{doc.title}</p>
                    {doc.youtube_url && (
                      <a
                        href={doc.youtube_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-inter text-xs text-[#5B9BD5] hover:underline"
                      >
                        YouTube →
                      </a>
                    )}
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="inline-block font-inter text-xs font-medium px-2 py-0.5 rounded bg-[#F0F0F0] text-[#666666]">
                      {statusLabel(doc.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className={`font-inter text-xs ${doc.published ? 'text-green-600' : 'text-gray-400'}`}>
                      {doc.published ? 'Yes' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <form action={deleteDoc.bind(null, doc.id)}>
                      <button
                        type="submit"
                        className="font-inter text-xs text-red-500 hover:text-red-700 transition-colors"
                        onClick={(e) => {
                          if (!confirm(`Delete "${doc.title}"?`)) e.preventDefault()
                        }}
                      >
                        Delete
                      </button>
                    </form>
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

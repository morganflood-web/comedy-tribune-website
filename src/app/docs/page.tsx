import { getAllPublishedDocs } from '@/lib/db'
import DocCard from '@/components/DocCard'

export const revalidate = 60

export default async function DocsPage() {
  const docs = await getAllPublishedDocs()

  return (
    <div style={{ backgroundColor: '#2D2D2D' }} className="min-h-screen pt-16 sm:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Header */}
        <div className="mb-10 pb-4 border-b border-gray-700">
          <span className="font-inter text-xs font-medium tracking-widest uppercase text-[#5B9BD5] mb-2 block">
            Macaw Studios
          </span>
          <h1 className="font-barlow text-5xl sm:text-6xl font-extrabold italic text-white leading-tight">
            The Comedy Tribune Docs
          </h1>
          <p className="font-inter text-sm text-gray-400 mt-3 max-w-xl">
            Mini-documentary series. 10–15 minutes. Real comedians. Real history. Coming to YouTube.
          </p>
        </div>

        {docs.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-barlow text-3xl font-extrabold italic text-gray-500">
              Episodes coming soon.
            </p>
            <p className="font-inter text-sm text-gray-600 mt-3">
              Subscribe to the newsletter to be first to know.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {docs.map(doc => (
              <DocCard key={doc.id} doc={doc} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

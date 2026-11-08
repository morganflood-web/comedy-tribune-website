import Image from 'next/image'
import { Doc } from '@/lib/db'

function statusLabel(status: string): string {
  switch (status) {
    case 'in_production': return 'In Production'
    case 'available': return 'Watch Now'
    default: return 'Coming Soon'
  }
}

function statusColor(status: string): string {
  switch (status) {
    case 'in_production': return 'bg-yellow-500 text-black'
    case 'available': return 'bg-[#5B9BD5] text-white'
    default: return 'bg-gray-600 text-gray-200'
  }
}

interface DocCardProps {
  doc: Doc
}

export default function DocCard({ doc }: DocCardProps) {
  return (
    <div className="group flex flex-col rounded overflow-hidden" style={{ backgroundColor: '#3D3D3D' }}>
      {/* Thumbnail */}
      <div className="relative w-full aspect-video">
        {doc.thumbnail ? (
          <Image
            src={doc.thumbnail}
            alt={doc.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1A1A1A] to-[#5B9BD5] flex items-center justify-center">
            <span className="font-barlow text-5xl font-extrabold italic text-white/20">
              {doc.episode_number}
            </span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className={`inline-block font-inter text-xs font-semibold px-2 py-1 rounded ${statusColor(doc.status)}`}>
            {statusLabel(doc.status)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <span className="font-inter text-xs font-medium text-gray-500 uppercase tracking-widest mb-1">
          {doc.episode_number} · {doc.subject}
        </span>
        <h3 className="font-barlow text-2xl font-extrabold italic text-white leading-tight mb-3">
          {doc.title}
        </h3>
        {doc.youtube_url && doc.status === 'available' && (
          <a
            href={doc.youtube_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-block font-inter text-sm font-medium text-[#5B9BD5] hover:text-blue-300 transition-colors"
          >
            Watch on YouTube →
          </a>
        )}
        {doc.status !== 'available' && (
          <p className="mt-auto font-inter text-xs text-gray-500">
            {doc.status === 'in_production' ? 'Currently in production' : 'Coming soon to YouTube'}
          </p>
        )}
      </div>
    </div>
  )
}

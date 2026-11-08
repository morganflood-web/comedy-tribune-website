import { createDoc } from '../actions'

const STATUS_OPTIONS = [
  { value: 'coming_soon', label: 'Coming Soon' },
  { value: 'in_production', label: 'In Production' },
  { value: 'available', label: 'Available (Watch Now)' },
]

export default function NewDocPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="font-barlow text-4xl font-extrabold italic text-[#1A1A1A]">New Doc Episode</h1>
      </div>

      <div className="bg-white rounded border border-[#E5E5E5] p-6 max-w-2xl">
        <form action={createDoc} className="space-y-5">
          {/* Episode number + Subject */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-inter text-xs font-semibold uppercase tracking-wider text-[#666666] mb-1.5">
                Episode Number *
              </label>
              <input
                name="episode_number"
                type="text"
                required
                className="w-full px-3 py-2 border border-[#E5E5E5] rounded font-inter text-sm text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#5B9BD5]"
                placeholder="EP01"
              />
            </div>
            <div>
              <label className="block font-inter text-xs font-semibold uppercase tracking-wider text-[#666666] mb-1.5">
                Subject *
              </label>
              <input
                name="subject"
                type="text"
                required
                className="w-full px-3 py-2 border border-[#E5E5E5] rounded font-inter text-sm text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#5B9BD5]"
                placeholder="e.g. John Candy"
              />
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block font-inter text-xs font-semibold uppercase tracking-wider text-[#666666] mb-1.5">
              Episode Title *
            </label>
            <input
              name="title"
              type="text"
              required
              className="w-full px-3 py-2 border border-[#E5E5E5] rounded font-inter text-sm text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#5B9BD5]"
              placeholder="The Man Who Couldn't Say No"
            />
          </div>

          {/* Thumbnail + YouTube */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-inter text-xs font-semibold uppercase tracking-wider text-[#666666] mb-1.5">
                Thumbnail URL
              </label>
              <input
                name="thumbnail"
                type="url"
                className="w-full px-3 py-2 border border-[#E5E5E5] rounded font-inter text-sm focus:outline-none focus:ring-2 focus:ring-[#5B9BD5]"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block font-inter text-xs font-semibold uppercase tracking-wider text-[#666666] mb-1.5">
                YouTube URL
              </label>
              <input
                name="youtube_url"
                type="url"
                className="w-full px-3 py-2 border border-[#E5E5E5] rounded font-inter text-sm focus:outline-none focus:ring-2 focus:ring-[#5B9BD5]"
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block font-inter text-xs font-semibold uppercase tracking-wider text-[#666666] mb-1.5">
              Status
            </label>
            <select
              name="status"
              defaultValue="coming_soon"
              className="w-full px-3 py-2 border border-[#E5E5E5] rounded font-inter text-sm text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#5B9BD5] bg-white"
            >
              {STATUS_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Published */}
          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                name="published"
                type="checkbox"
                className="w-4 h-4 rounded accent-[#5B9BD5]"
              />
              <span className="font-inter text-sm text-[#1A1A1A]">Published (visible on site)</span>
            </label>
          </div>

          {/* Submit */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#2D2D2D] text-white font-inter text-sm font-medium rounded hover:bg-black transition-colors"
            >
              Create Episode
            </button>
            <a
              href="/admin/docs"
              className="px-6 py-2.5 bg-white text-[#666666] border border-[#E5E5E5] font-inter text-sm font-medium rounded hover:bg-[#F8F8F8] transition-colors"
            >
              Cancel
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}

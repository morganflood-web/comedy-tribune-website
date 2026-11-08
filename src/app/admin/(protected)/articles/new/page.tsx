import { createArticle } from '../actions'

const CATEGORIES = ['Opinion', 'Industry', 'Interviews', 'Behind the Series', 'Docs']

export default function NewArticlePage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="font-barlow text-4xl font-extrabold italic text-[#1A1A1A]">New Article</h1>
      </div>

      <div className="bg-white rounded border border-[#E5E5E5] p-6 max-w-3xl">
        <form action={createArticle} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block font-inter text-xs font-semibold uppercase tracking-wider text-[#666666] mb-1.5">
              Title *
            </label>
            <input
              name="title"
              type="text"
              required
              className="w-full px-3 py-2 border border-[#E5E5E5] rounded font-inter text-sm text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#5B9BD5]"
              placeholder="Article headline"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block font-inter text-xs font-semibold uppercase tracking-wider text-[#666666] mb-1.5">
              Slug *
            </label>
            <input
              name="slug"
              type="text"
              required
              className="w-full px-3 py-2 border border-[#E5E5E5] rounded font-inter text-sm text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#5B9BD5]"
              placeholder="url-friendly-slug"
            />
            <p className="font-inter text-xs text-[#666666] mt-1">Used in the URL: /articles/[slug]</p>
          </div>

          {/* Author */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-inter text-xs font-semibold uppercase tracking-wider text-[#666666] mb-1.5">
                Author Name *
              </label>
              <input
                name="author_name"
                type="text"
                required
                className="w-full px-3 py-2 border border-[#E5E5E5] rounded font-inter text-sm focus:outline-none focus:ring-2 focus:ring-[#5B9BD5]"
                placeholder="Author full name"
              />
            </div>
            <div>
              <label className="block font-inter text-xs font-semibold uppercase tracking-wider text-[#666666] mb-1.5">
                Author Headshot URL
              </label>
              <input
                name="author_headshot"
                type="url"
                className="w-full px-3 py-2 border border-[#E5E5E5] rounded font-inter text-sm focus:outline-none focus:ring-2 focus:ring-[#5B9BD5]"
                placeholder="https://..."
              />
            </div>
          </div>

          {/* Author Bio */}
          <div>
            <label className="block font-inter text-xs font-semibold uppercase tracking-wider text-[#666666] mb-1.5">
              Author Bio
            </label>
            <textarea
              name="author_bio"
              rows={2}
              className="w-full px-3 py-2 border border-[#E5E5E5] rounded font-inter text-sm focus:outline-none focus:ring-2 focus:ring-[#5B9BD5] resize-y"
              placeholder="Short bio"
            />
          </div>

          {/* Category + Thumbnail */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-inter text-xs font-semibold uppercase tracking-wider text-[#666666] mb-1.5">
                Category *
              </label>
              <select
                name="category"
                required
                className="w-full px-3 py-2 border border-[#E5E5E5] rounded font-inter text-sm text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#5B9BD5] bg-white"
              >
                <option value="">Select category</option>
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
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
          </div>

          {/* Excerpt */}
          <div>
            <label className="block font-inter text-xs font-semibold uppercase tracking-wider text-[#666666] mb-1.5">
              Excerpt
            </label>
            <textarea
              name="excerpt"
              rows={3}
              className="w-full px-3 py-2 border border-[#E5E5E5] rounded font-inter text-sm focus:outline-none focus:ring-2 focus:ring-[#5B9BD5] resize-y"
              placeholder="Short summary shown in article cards"
            />
          </div>

          {/* Body */}
          <div>
            <label className="block font-inter text-xs font-semibold uppercase tracking-wider text-[#666666] mb-1.5">
              Body (Markdown)
            </label>
            <textarea
              name="body"
              rows={20}
              className="w-full px-3 py-2 border border-[#E5E5E5] rounded font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#5B9BD5] resize-y"
              placeholder="## Headline&#10;&#10;Body content in Markdown format. Use > for pull quotes."
            />
          </div>

          {/* Toggles */}
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                name="published"
                type="checkbox"
                className="w-4 h-4 rounded accent-[#5B9BD5]"
              />
              <span className="font-inter text-sm text-[#1A1A1A]">Published</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                name="featured"
                type="checkbox"
                className="w-4 h-4 rounded accent-[#5B9BD5]"
              />
              <span className="font-inter text-sm text-[#1A1A1A]">Featured (homepage hero)</span>
            </label>
          </div>

          {/* Submit */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#5B9BD5] text-white font-inter text-sm font-medium rounded hover:bg-[#4a89c3] transition-colors"
            >
              Create Article
            </button>
            <a
              href="/admin/articles"
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

'use client'

import { useState } from 'react'

interface ShareBoxProps {
  title: string
  slug: string
}

export default function ShareBox({ title, slug }: ShareBoxProps) {
  const [copied, setCopied] = useState(false)
  const url = `https://thecomedytribune.com/articles/${slug}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }

  return (
    <div
      className="rounded p-6 mb-10 text-center"
      style={{ backgroundColor: '#F8F8F8', border: '1px solid #E5E5E5' }}
    >
      <p className="font-barlow text-xl font-bold italic text-[#1A1A1A] mb-2">
        Share this story
      </p>
      <p className="font-inter text-sm text-[#666666] mb-4">
        If you found this worth your time, forward it to someone who cares about comedy.
      </p>
      <div className="flex justify-center gap-3">
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-[#5B9BD5] text-white font-inter text-xs font-medium rounded hover:bg-[#4a89c3] transition-colors"
        >
          Share on X
        </a>
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-transparent text-[#5B9BD5] border border-[#5B9BD5] font-inter text-xs font-medium rounded hover:bg-[#5B9BD5] hover:text-white transition-colors"
        >
          {copied ? 'Copied!' : 'Copy link'}
        </button>
      </div>
    </div>
  )
}

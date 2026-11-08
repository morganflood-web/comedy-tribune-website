'use client'

import ReactMarkdown from 'react-markdown'

interface MarkdownRendererProps {
  content: string
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      components={{
        h2: ({ children }) => (
          <h2 className="font-barlow text-3xl font-extrabold italic text-[#1A1A1A] mt-10 mb-4 leading-tight">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="font-barlow text-2xl font-bold italic text-[#1A1A1A] mt-8 mb-3">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="font-serif-body text-lg text-[#1A1A1A] leading-[1.8] mb-6">
            {children}
          </p>
        ),
        blockquote: ({ children }) => (
          <blockquote
            className="font-serif-body text-[22px] italic text-[#1A1A1A] my-8 py-2"
            style={{
              borderLeft: '4px solid #5B9BD5',
              paddingLeft: '1.5rem',
              color: '#2D2D2D',
            }}
          >
            {children}
          </blockquote>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-[#1A1A1A]">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="italic">{children}</em>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#5B9BD5] underline hover:text-[#4a89c3] transition-colors"
          >
            {children}
          </a>
        ),
        ul: ({ children }) => (
          <ul className="font-serif-body text-lg text-[#1A1A1A] leading-[1.8] mb-6 list-disc pl-6 space-y-2">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="font-serif-body text-lg text-[#1A1A1A] leading-[1.8] mb-6 list-decimal pl-6 space-y-2">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="font-serif-body text-lg text-[#1A1A1A]">{children}</li>
        ),
        hr: () => (
          <hr className="my-10 border-[#E5E5E5]" />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

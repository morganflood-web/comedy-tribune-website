'use client'

import { useState, FormEvent } from 'react'

interface NewsletterSignupProps {
  dark?: boolean
}

export default function NewsletterSignup({ dark = false }: NewsletterSignupProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
        setMessage('You\'re in. Welcome to the Tribune.')
        setEmail('')
      } else {
        setStatus('error')
        setMessage('Something went wrong. Try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Try again.')
    }
  }

  const textColor = dark ? 'text-white' : 'text-[#1A1A1A]'
  const mutedColor = dark ? 'text-gray-400' : 'text-[#666666]'
  const inputBg = dark ? 'bg-[#3D3D3D] border-gray-600 text-white placeholder-gray-500' : 'bg-white border-[#E5E5E5] text-[#1A1A1A] placeholder-gray-400'

  return (
    <div className="w-full">
      <h3 className={`font-barlow text-2xl font-bold uppercase tracking-wide mb-1 ${textColor}`}>
        The Comedy Tribune Newsletter
      </h3>
      <p className={`font-inter text-sm mb-4 ${mutedColor}`}>
        Comedy history, industry analysis, and documentary updates — in your inbox.
      </p>
      {status === 'success' ? (
        <p className="text-[#5B9BD5] font-inter text-sm font-medium">{message}</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className={`flex-1 px-4 py-2.5 border rounded font-inter text-sm focus:outline-none focus:ring-2 focus:ring-[#5B9BD5] ${inputBg}`}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-2.5 bg-[#5B9BD5] text-white font-inter text-sm font-medium rounded hover:bg-[#4a89c3] transition-colors disabled:opacity-60 whitespace-nowrap"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      )}
      {status === 'error' && (
        <p className="text-red-400 font-inter text-xs mt-2">{message}</p>
      )}
    </div>
  )
}

'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        router.push('/admin')
      } else {
        setStatus('error')
        setErrorMessage('Incorrect password.')
      }
    } catch {
      setStatus('error')
      setErrorMessage('Something went wrong. Try again.')
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/logo.png"
            alt="The Comedy Tribune"
            width={200}
            height={60}
            className="object-contain"
            priority
          />
        </div>

        {/* Form card */}
        <div
          className="rounded p-8"
          style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}
        >
          <h1 className="font-barlow text-2xl font-extrabold italic text-[#1A1A1A] mb-1">
            Admin Access
          </h1>
          <p className="font-inter text-sm text-[#666666] mb-6">
            The Comedy Tribune editorial dashboard.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block font-inter text-xs font-medium text-[#666666] uppercase tracking-wider mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full px-4 py-2.5 border border-[#E5E5E5] rounded font-inter text-sm text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#5B9BD5] bg-white"
                placeholder="Enter admin password"
              />
            </div>

            {status === 'error' && (
              <p className="font-inter text-sm text-red-600">{errorMessage}</p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-2.5 bg-[#5B9BD5] text-white font-inter text-sm font-medium rounded hover:bg-[#4a89c3] transition-colors disabled:opacity-60"
            >
              {status === 'loading' ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center font-inter text-xs text-[#666666] mt-6">
          <a href="/" className="text-[#5B9BD5] hover:opacity-80">← Back to site</a>
        </p>
      </div>
    </div>
  )
}

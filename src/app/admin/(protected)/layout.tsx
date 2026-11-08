import { redirect } from 'next/navigation'
import Link from 'next/link'
import { isAuthenticated } from '@/lib/auth'

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F8F8' }}>
      {/* Admin nav bar */}
      <nav
        className="sticky top-0 z-50 w-full px-4 sm:px-6 py-3 flex items-center justify-between"
        style={{ backgroundColor: '#2D2D2D', borderBottom: '1px solid #444' }}
      >
        <div className="flex items-center gap-6">
          <span className="font-barlow text-lg font-extrabold italic text-white tracking-wide">
            TRIBUNE ADMIN
          </span>
          <div className="flex items-center gap-4">
            <Link
              href="/admin/articles"
              className="font-inter text-xs font-medium tracking-widest uppercase text-gray-400 hover:text-white transition-colors"
            >
              Articles
            </Link>
            <Link
              href="/admin/docs"
              className="font-inter text-xs font-medium tracking-widest uppercase text-gray-400 hover:text-white transition-colors"
            >
              Docs
            </Link>
          </div>
        </div>
        <Link
          href="/"
          className="font-inter text-xs text-gray-500 hover:text-gray-300 transition-colors"
        >
          ← View site
        </Link>
      </nav>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {children}
      </div>
    </div>
  )
}

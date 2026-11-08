import Image from 'next/image'
import Link from 'next/link'
import NewsletterSignup from './NewsletterSignup'

const navLinks = [
  { href: '/articles', label: 'Articles' },
  { href: '/docs', label: 'Docs' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#2D2D2D' }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mobile: newsletter first */}
        <div className="block md:hidden mb-10">
          <NewsletterSignup dark />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Col 1: Logo + Mission */}
          <div>
            <Image
              src="/logo.png"
              alt="The Comedy Tribune"
              width={160}
              height={48}
              className="object-contain mb-4"
            />
            <p className="font-inter text-sm text-gray-400 leading-relaxed mb-3">
              Serious coverage of comedy history, the business of comedy, and the legends who built the art form.
            </p>
            <a
              href="mailto:thecomedytribune@gmail.com"
              className="font-inter text-sm text-[#5B9BD5] hover:text-blue-300 transition-colors"
            >
              thecomedytribune@gmail.com
            </a>
          </div>

          {/* Col 2: Nav Links */}
          <div>
            <h4 className="font-barlow text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
              Navigate
            </h4>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-inter text-sm text-gray-300 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3: Newsletter (desktop) */}
          <div className="hidden md:block">
            <NewsletterSignup dark />
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="font-inter text-xs text-gray-500">
            © {new Date().getFullYear()} The Comedy Tribune / Macaw Studios. All rights reserved.
          </p>
          <p className="font-inter text-xs text-gray-600">
            Produced under Macaw Studios
          </p>
        </div>
      </div>
    </footer>
  )
}

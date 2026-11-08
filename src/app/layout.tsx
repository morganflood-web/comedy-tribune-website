import type { Metadata } from 'next'
import { Barlow_Condensed, Source_Serif_4, Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-barlow-condensed',
  display: 'swap',
})

const sourceSerif4 = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-source-serif',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'The Comedy Tribune',
  description: 'Serious coverage of comedy history, the business of comedy, and the legends who built the art form.',
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID
  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${sourceSerif4.variable} ${inter.variable}`}
    >
      <body>
        {GA4_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA4_ID}');
            `}</Script>
          </>
        )}
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

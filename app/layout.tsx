import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { PageTransition } from '@/components/page-transition'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-geist-mono'
})

export const metadata: Metadata = {
  title: {
    default: 'Xcel Pure Gas LTD | Nitrogen Gas Solutions',
    template: '%s | Xcel Pure Gas LTD'
  },
  description: 'Leading provider of high-purity nitrogen gas solutions in Nigeria. Delivering innovation, safety, and reliability across Oil & Gas, Manufacturing, Food & Beverage, Pharmaceuticals, and Energy industries.',
  keywords: ['nitrogen gas', 'industrial gas', 'Nigeria', 'oil and gas', 'pipeline purging', 'nitrogen supply'],
  authors: [{ name: 'Xcel Pure Gas LTD' }],
  openGraph: {
    title: 'Xcel Pure Gas LTD | Nitrogen Gas Solutions',
    description: 'Leading provider of high-purity nitrogen gas solutions in Nigeria.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#2e7d32',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        <Navigation />
        <PageTransition>
          <main className="min-h-screen">
            {children}
          </main>
        </PageTransition>
        <Footer />
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}

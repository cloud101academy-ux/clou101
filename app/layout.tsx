import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Salesforce Admin & Developer Training | Cloud101 Academy',
  description:
    'Master Salesforce in 10-18 weeks with live instructor-led training. Admin, Developer, or combined tracks. Job-ready skills + placement support.',
  metadataBase: new URL('https://cloud101.in'),
  openGraph: {
    title: 'Master Salesforce in 12 Weeks | Cloud101 Academy',
    description:
      'Industry-led Salesforce training. Instructor-led batches, real projects, placement support.',
    type: 'website',
    url: 'https://cloud101.in/',
    siteName: 'Cloud101 Academy',
    images: [
      { url: '/og-image.png', width: 1200, height: 630, alt: 'Cloud101 Academy — Salesforce training' },
      { url: '/og-image-alt.png', width: 1200, height: 630, alt: 'Cloud101 Academy — hands-on Salesforce training' },
    ],
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Master Salesforce in 12 Weeks | Cloud101 Academy',
    description: 'Instructor-led Salesforce batches, hands-on labs, and placement support.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32' },
      { url: '/favicon-16x16.png', sizes: '16x16' },
      { url: '/logo.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      {/* REQUIRED for metadata injection */}
      <head />

      <body className="font-sans antialiased">
        {children}
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BVWFZ8DSC6"
          strategy="afterInteractive"
        />

        <Script id="ga4-init" strategy="afterInteractive">
          {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-BVWFZ8DSC6', {
        page_path: window.location.pathname,
      });
    `}
        </Script>
        <Analytics />
      </body>
    </html>
  )
}
